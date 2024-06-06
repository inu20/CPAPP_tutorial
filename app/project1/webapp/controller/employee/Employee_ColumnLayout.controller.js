sap.ui.define([
    "sap/ui/model/json/JSONModel",
		"sap/f/library",
    "project1/controller/BaseController",
],
function (JSONModel, fioriLibrary, BaseController) {
  "use strict";

  return BaseController.extend("project1.controller.employee.Employee_ColumnLayout",{
    onInit: function () {
      var oModel, oProductsModel;

      oModel = new JSONModel({
          layout: fioriLibrary.LayoutType.OneColumn
        });
      this.setModel(oModel, '_ColumnLayout');
      
      // set products demo model on this sample
      oProductsModel = new JSONModel(
        sap.ui.require.toUrl("mock") + "/products.json"
      );
      oProductsModel.setSizeLimit(1000);
      this.setModel(oProductsModel, "products");

      this.oOwnerComponent = this.getOwnerComponent();
      this.oRouter = this.oOwnerComponent.getRouter();
      this.oRouter.attachRouteMatched(this.onRouteMatched, this);
      this.oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
    },

    onRouteMatched: function (oEvent) {
      var sRouteName = oEvent.getParameter("name"),
          oArguments = oEvent.getParameter("arguments");

      // Save the current route name
      this.currentRouteName = sRouteName;
      this.currentProduct = oArguments.product;
			this.currentSupplier = oArguments.supplier;
    },

    _onBeforeRouteMatched: function(oEvent) {
      var oModel = this.getModel('_ColumnLayout'),
          sLayout = oEvent.getParameters().arguments.layout;

      // If there is no layout parameter, set a default layout (normally OneColumn)
      if (!sLayout) {
        sLayout = fioriLibrary.LayoutType.OneColumn;
      }
      oModel.setProperty("/layout", sLayout);
    },

    onStateChanged: function (oEvent) {
      var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
          sLayout = oEvent.getParameter("layout");

        // Replace the URL with the new layout if a navigation arrow was used
        if (bIsNavigationArrow) {
          this.oRouter.navTo(this.currentRouteName, {layout: sLayout, product: this.currentProduct, supplier: this.currentSupplier}, true);
        }
    },

    onExit: function () {
      this.oRouter.detachRouteMatched(this.onRouteMatched, this);
    },
  });
});
