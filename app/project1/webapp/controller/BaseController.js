sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
  	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
	"project1/config/Config",
], function(
	Controller, History, UIComponent, Fragment,
	JSONModel,
    MessageToast,
    MessageBox,
	Config,
) {
	"use strict";

	return Controller.extend("project1.controller.BaseController", {
		onInit: function () {
		},

		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel : function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel : function (oModel, sName) {
            if ( oModel!==undefined && typeof oModel.dataLoaded !=='function' ) {
                oModel = new JSONModel(oModel);
            }
            return this.getView().setModel(oModel, sName);
		},

		/**
		 * Returns a promises which resolves with the resource bundle value of the given key <code>sI18nKey</code>
		 *
		 * @public
		 * @param {string} sI18nKey The key
		 * @param {sap.ui.core.model.ResourceModel} oResourceModel The resource model
		 * @param {string[]} [aPlaceholderValues] The values which will repalce the placeholders in the i18n value
		 * @returns {Promise<string>} The promise
		 */
		getBundleTextByModel: function(sI18nKey, oResourceModel, aPlaceholderValues){
			return oResourceModel.getResourceBundle().then(function(oBundle){
				return oBundle.getText(sI18nKey, aPlaceholderValues);
			});
		},

		onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined || window.history.length>0 ) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("home", {}, true /*no history*/);
			}
		},

		onCopyText: function (oEvent) {
			let sVal = oEvent.getSource().getValue();
			if( typeof sVal==='string' && sVal ){
				if( navigator.clipboard.writeText( sVal ) ){
					MessageToast.show(`Copy to clipboard:\n${sVal}`);
				}
				else{
					MessageToast.show(`Faild to copy to clipboard.`);
				}
			}
		},

		geti18nText: function ( sTextName ) {
          var sObjNum = this.getOwnerComponent().getModel("i18n").getResourceBundle();
          return sObjNum.getText(sTextName);
		},

        loadFragment: function ( sPath ){
            return Fragment.load({
                    id: this.getView().getId(),
                    name: sPath,
                    controller: this
				});
        },

		CallAPI: async function ( sUrl, oPostData={}, sMethod='POST', oSettings={} ) {
			return fetch( sUrl, {
				method	:( oSettings.method  || sMethod || 'POST' ),
				headers	:( oSettings.headers ||{
					"Content-Type": "application/json",
				} ),
				body: JSON.stringify(oPostData),
			})
			.then(response => response.json())
		},

        // ...
		handleDeleteUser: async function (aUser_id, fnSuccess=function(){}, fnFailed=function(){}) {
          if(!aUser_id ) return

		  if( typeof aUser_id!=='object' ){
		  	aUser_id = [aUser_id]
		  }

          var oPostData ={
              ID : aUser_id
            }
          
		  this.CallAPI(Config.baseUrl+"/admin/DELETE_User", oPostData )
			.then(data => {
				// Handle the response data
				console.log("user", data);
				if( data.error?.code ){
					MessageToast.show(`${data.error.code}: ${data.error.target}\n${data.error.message}`);
					fnFailed(data)
				}
				else{
					MessageToast.show(`User DELETED:\n${data.user.Forename} (${data.ID})`);
					fnSuccess(data)
				}
			})
        },

		
	});
});