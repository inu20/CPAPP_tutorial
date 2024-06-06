sap.ui.define([
	"sap/ui/model/json/JSONModel",
  "project1/controller/BaseController",
], function (JSONModel, BaseController) {
	"use strict";

	return BaseController.extend("project1.controller.employee.EmployeeDetailInfo", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel('_ColumnLayout');

			this.oRouter.getRoute("employeeDetailInfo").attachPatternMatched(this._onPatternMatch, this);
		},

		_onPatternMatch: function (oEvent) {
			this._supplier = oEvent.getParameter("arguments").supplier || this._supplier || "0";
			this._product = oEvent.getParameter("arguments").product || this._product || "0";

			this.getView().bindElement({
				path: "/ProductCollectionStats/Filters/1/values/" + this._supplier,
				model: "products"
			});
		},

		onExit: function () {
			this.oRouter.getRoute("employeeDetailInfo").detachPatternMatched(this._onPatternMatch, this);
		}
	});
});