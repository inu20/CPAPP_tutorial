sap.ui.define(
	[
		"project1/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/Sorter",
		"sap/m/MessageBox",
		"sap/f/library",
	],
	function (
		BaseController,
		JSONModel,
		Filter,
		FilterOperator,
		Sorter,
		MessageBox,
		fioriLibrary
	) {
		"use strict";

		return BaseController.extend("project1.controller.employee.EmployeeList2", {
			onInit: function () {
				this.oView = this.getView();
				this._bDescendingSort = false;
				this.oProductsTable = this.oView.byId("productsTable");
				this.oRouter = this.getOwnerComponent().getRouter();
			},

			onSearch: function (oEvent) {
				var oTableSearchState = [],
					sQuery = oEvent.getParameter("query");

				if (sQuery && sQuery.length > 0) {
					oTableSearchState = [
						new Filter("Name", FilterOperator.Contains, sQuery),
					];
				}

				this.oProductsTable
					.getBinding("items")
					.filter(oTableSearchState, "Application");
			},

			onAdd: function () {
				MessageBox.information("This functionality is not ready yet.", {
					title: "Aw, Snap!",
				});
			},

			onSort: function () {
				this._bDescendingSort = !this._bDescendingSort;
				var oBinding = this.oProductsTable.getBinding("items"),
					oSorter = new Sorter("Name", this._bDescendingSort);

				oBinding.sort(oSorter);
			},

			onListItemPress: function (oEvent) {
				var productPath = oEvent
						.getSource()
						.getBindingContext("products")
						.getPath(),
					product = productPath.split("/").slice(-1).pop();

        var oFCL = this.oView.getParent().getParent();
            oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);

				this.oRouter.navTo("employeeDetail", {
					layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
					product: product,
				});
			},
		});
	}
);
