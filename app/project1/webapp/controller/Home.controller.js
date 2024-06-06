sap.ui.define([
	'./BaseController',
	'sap/ui/model/json/JSONModel',
	'sap/ui/Device',
    "sap/m/MessageToast",
    "sap/m/MessageBox",
	"sap/ui/core/library",
  	"sap/ui/core/Fragment",
	"project1/config/Config",
], function (BaseController, JSONModel, Device, MessageToast, MessageBox, coreLibrary, Fragment, Config) {
	"use strict";
	return BaseController.extend("project1.controller.Home", {
		onInit: function () {
			var oViewModel = new JSONModel({
				isPhone : Device.system.phone
			});
			this.getView().setModel(oViewModel, "view");
			Device.media.attachHandler(function (oDevice) {
				this.getView().getModel("view").setProperty("/isPhone", oDevice.name === "Phone");
			}.bind(this));
		},

        onRefresh: function (silence=false) {
          var oBinding = this.byId("CRM_Table").getBinding("items");
          // console.log( this._oTable.$().find(':Button') );
          if( oBinding ){
            // if (oBinding.hasPendingChanges()) {
              
            // }
            oBinding.refresh();
            if(!silence) MessageToast.show(this._getText("refreshSuccessMessage"));
          }
        },

		onPressCRM_Status : function (iStudentID, iStatus) {
			console.log(iStudentID, iStatus);


            if( iStatus==3 ){
                if (!this._AddUserFragment){
                    Fragment.load({
                        name: "project1.fragments.AddUser",
                        id: "AddUserDialog",
                        controller: this
                    })
                    .then(function (oPopover) {
                        this._AddUserFragment = oPopover;
                        this.getView().addDependent(oPopover);
                        oPopover.open();
                    }.bind(this));
                } else {
                    this._AddUserFragment.open();
                }
                
                return
            }
			let oPostData = {
				ID 		: iStudentID,
				Status 	: iStatus
			};
			fetch(Config.baseUrl+"/admin/UPDATE_Student_CRM_Status", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(oPostData),
			})
			.then(res =>{ return res.json(); })
			.then(data => {
				// Handle the response data
				console.log("data", data);
				if( data.error?.code ){
					// MessageToast.show(``);
				}
				else{
					// MessageToast.show(`Status updated`);
				}
			})
            .then(data => {
                this.onRefresh(true)
            })
		}
	});
});