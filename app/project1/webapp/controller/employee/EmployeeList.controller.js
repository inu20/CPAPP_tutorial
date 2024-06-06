sap.ui.define([
	"project1/controller/BaseController"
], function(
	BaseController
) {
	"use strict";

	return BaseController.extend("project1.controller.employee.EmployeeList", {
		onListItemPressed: function(oEvent) {
			var oItem, oCtx;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
            
			this.getRouter().navTo("employee",{
				employeeId : oCtx.getProperty("ID")
			});
			
		}
	});
});