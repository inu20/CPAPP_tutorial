sap.ui.define(
	[
		"project1/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"project1/model/formatter",
		"project1/config/Config",
	],
	function (
		BaseController,
		JSONModel,
		Filter,
		FilterOperator,
		MessageToast,
		Fragment,
		formatter,
		Config
	) {
		"use strict";
        
		return BaseController.extend("project1.controller.WorkList", {
			formatter: formatter,

			onInit: function () {
				this.setModel(
					new JSONModel({
						Results_cnt: 0,
						CRM_Status_cnt: null,
						CRM_Status: {
							1: {
								key: "1",
								text: "CS",
								icon: "sap-icon://information",
								iconColor: "Default",
								cnt: null,
							},
							2: {
								key: "2",
								text: "DC",
								icon: "sap-icon://begin",
								iconColor: "Positive",
								cnt: null,
							},
							3: {
								key: "3",
								text: "AP",
								icon: "sap-icon://documents",
								iconColor: "Positive",
								cnt: null,
							},
							4: {
								key: "4",
								text: "FC",
								icon: "sap-icon://favorite",
								iconColor: "Critical",
								cnt: null,
							},
							5: {
								key: "5",
								text: "LF",
								icon: "sap-icon://cancel",
								iconColor: "Negative",
								cnt: null,
							},
						},
					}),
					"_PageElements"
				);

                this.updateCRM_Status_cnt();

			},

			onTableUpdateFinshed: function () {
			},
			updateCRM_Status_cnt: function (bForce) {
				var oModal = this.getModel("_PageElements"),
					oCRM_Status_cnt = oModal.getProperty("/CRM_Status_cnt");
				if (oCRM_Status_cnt !== null && !bForce) return false;
                
				oCRM_Status_cnt = {};
                this.CallAPI("/global/Students",
                    {
                        "$count"    : true,
                        "$filter"   : 'CRM_Status ne 0',
                        "$apply"    : 'groupby((CRM_Status),aggregate($count as COUNT))'
                    },
                    'GET')
                .then((data) => {
                    // Handle the response data
                    Object.values( oModal.getProperty("/CRM_Status") ).forEach((v,i) => {
                        oCRM_Status_cnt[i] = 0;
                        oModal.setProperty("/CRM_Status/"+i+"/cnt", 0)
                    })
                    data.value.forEach((v) => {
                        oCRM_Status_cnt[v.CRM_Status] = v.COUNT;
                        oModal.setProperty("/CRM_Status/"+v.CRM_Status+"/cnt", v.COUNT)
                    })
                    oModal.setProperty("/CRM_Status_cnt", oCRM_Status_cnt)
                });

			},

			onTableResultChange: function (oEvent) {
				const iCnt = oEvent.getSource().getLength();
				this.getModel("_PageElements").setProperty("/Results_cnt", iCnt);
			},

			onFilterSelect: function (oEvent) {
				var oBinding = this.byId("CRM_Table").getBinding("items"),
					sKey = oEvent.getParameter("key");
                // Array to combine filters
				var aFilters = [];

				if (parseInt(sKey) && $.isNumeric(parseInt(sKey))) {
					aFilters.push(new Filter("CRM_Status", "EQ", sKey));
				} else {
					aFilters = null;
				}

				oBinding.filter(aFilters);
			},

			onRefresh: function (silence = false) {
				var oBinding = this.byId("CRM_Table").getBinding("items");
				// console.log( this._oTable.$().find(':Button') );
				if (oBinding) {
					// if (oBinding.hasPendingChanges()) {

					// }
					oBinding.refresh();
					if (!silence)
						MessageToast.show(this._getText("refreshSuccessMessage"));
				}
			},

			onPressCRM_Status: function (oEvent) {
                // Get the pressed MicroProcessFlowItem element
                var oPressedItem = oEvent.getSource();
                var iStudentID  = oPressedItem.getBindingContext().getProperty("ID"),
                    iStatus     = parseInt(oPressedItem.getKey());
                
                // Check if the item has already been clicked
                if (this.bCRM_StatusClicked) { return; }
                // Set the flag to true to prevent further clicks
                this.bCRM_StatusClicked = true;

                if (!iStudentID ) {
                    MessageToast.show(`Student not found`);
                }

				if (iStatus == 3) {
					if (!this._AddUserFragment) {
						Fragment.load({
							name: "project1.fragments.AddUser",
							id: "AddUserDialog",
							controller: this,
						}).then(
							function (oPopover) {
								this._AddUserFragment = oPopover;
								this.getView().addDependent(oPopover);
								oPopover.open();
							}.bind(this)
						);
					} else {
						this._AddUserFragment.open();
					}

					// return;
				}

				let oPostData = {
					ID: iStudentID,
					Status: iStatus,
				};
                this.CallAPI("/admin/UPDATE_Student_CRM_Status", oPostData)
					.then((data) => {
						// Handle the response data
						console.log("data", data);
						if (data.error?.code) {
							MessageToast.show(``);
						} else {
							MessageToast.show(`Status updated`);
						}
					})
					.then((data) => {
						this.onRefresh(true);
                        this.updateCRM_Status_cnt(true);
                        // Set the flag to true to prevent further clicks
						this.bCRM_StatusClicked = false;
					});
			},
		});
	}
);
