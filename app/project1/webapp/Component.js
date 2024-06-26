/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
	[
		"sap/ui/core/UIComponent",
		"sap/ui/Device",
		"sap/ui/core/util/MockServer",
		"sap/ui/model/odata/v2/ODataModel",
		"sap/ui/model/BindingMode",
		"sap/ui/model/json/JSONModel",
		"project1/model/models",
	],
	function (
		UIComponent,
		Device,
		MockServer,
		ODataModel,
		BindingMode,
		JSONModel,
		models
	) {
		"use strict";

		return UIComponent.extend("project1.Component", {
			metadata: {
				manifest: "json",
			},

			/**
			 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
			 * @public
			 * @override
			 */
			init: function () {
				var oRouter;

				// call the base component's init function
				UIComponent.prototype.init.apply(this, arguments);

				// set the device model
				this.setModel(models.createDeviceModel(), "device");

				// enable routing
				oRouter = this.getRouter();
				oRouter.initialize();
			},

			getContentDensityClass: function () {
				if (!this._sContentDensityClass) {
					if (Device.support.touch) {
						this._sContentDensityClass = "sapUiSizeCozy";
					} else {
						this._sContentDensityClass = "sapUiSizeCompact";
					}
				}
				return this._sContentDensityClass;
			},
		});
	}
);
