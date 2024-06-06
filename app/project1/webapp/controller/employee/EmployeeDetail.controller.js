sap.ui.define([
  "project1/controller/BaseController",
	'sap/f/library'
],
/**
  * @param {typeof sap.ui.core.mvc.Controller} Controller
  */
function (BaseController, fioriLibrary) {
  "use strict";

  return BaseController.extend("project1.controller.employee.EmployeeDetail", {
    onInit: function () {
      var oOwnerComponent = this.getOwnerComponent();

      this.oRouter = oOwnerComponent.getRouter();
      this.oModel = oOwnerComponent.getModel('_ColumnLayout');

      this.oRouter.getRoute("employeeList2").attachPatternMatched(this._onProductMatched, this);
      this.oRouter.getRoute("employeeDetail").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("employeeDetailInfo").attachPatternMatched(this._onProductMatched, this);
    },

    _onProductMatched: function (oEvent) {
      this._product = oEvent.getParameter("arguments").product || this._product || "0";
      this.getView().bindElement({
        path: "/ProductCollection/" + this._product,
        model: "products"
      });
    },

		onSupplierPress: function (oEvent) {
			var supplierPath = oEvent.getSource().getBindingContext("products").getPath(),
				supplier = supplierPath.split("/").slice(-1).pop();

			this.oRouter.navTo("employeeDetailInfo", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, supplier: supplier, product: this._product});
		},
    onEditToggleButtonPress: function() {
      var oObjectPage = this.getView().byId("ObjectPageLayout"),
        bCurrentShowFooterState = oObjectPage.getShowFooter();

      oObjectPage.setShowFooter(!bCurrentShowFooterState);
    },

    onExit: function () {
      this.oRouter.getRoute("employeeList2").detachPatternMatched(this._onProductMatched, this);
      this.oRouter.getRoute("employeeDetail").detachPatternMatched(this._onProductMatched, this);
    }
  });
});
