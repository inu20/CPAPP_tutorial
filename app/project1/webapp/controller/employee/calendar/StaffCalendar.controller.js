sap.ui.define([
    "project1/controller/BaseController",
	"sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel) {
        "use strict";

        return BaseController.extend("project1.controller.employee.calendar.StaffCalendar", {
            onInit: function () {
            },

        });
    });
