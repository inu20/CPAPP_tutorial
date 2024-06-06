sap.ui.define([
	'./BaseController',
	'sap/m/ResponsivePopover',
	'sap/m/MessagePopover',
	'sap/m/ActionSheet',
	'sap/m/Button',
	'sap/m/Link',
	'sap/m/NotificationListItem',
	'sap/m/MessageItem',
	'sap/ui/core/CustomData',
	'sap/m/MessageToast',
	'sap/ui/Device',
    'sap/ui/core/Theming',
	'sap/ui/core/syncStyleClass',
	'sap/m/library',
    "sap/ui/model/json/JSONModel"
], function(
	BaseController,
	ResponsivePopover,
	MessagePopover,
	ActionSheet,
	Button,
	Link,
	NotificationListItem,
	MessageItem,
	CustomData,
	MessageToast,
	Device,
    Theming,
	syncStyleClass,
	mobileLibrary,
    JSONModel
) {
	"use strict";

	// shortcut for sap.m.PlacementType
	var PlacementType = mobileLibrary.PlacementType;

	// shortcut for sap.m.VerticalPlacementType
	var VerticalPlacementType = mobileLibrary.VerticalPlacementType;

	// shortcut for sap.m.ButtonType
	var ButtonType = mobileLibrary.ButtonType;


	return BaseController.extend("project1.controller.App", {

		_bExpanded: true,

		onInit: function() {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            this.setModel({
                            FullName    : "Anne Wu",
                            Firstname   : "Anne",
                            Surame      : "Wu",
                            InitName    : "AW",
                            PhotoSrc    : "images/Anne.png"
                        }, "_UserLoginInfo");

			// if the app starts on desktop devices with small or medium screen size, collaps the side navigation
			if (Device.resize.width <= 1024) {
				this.onSideNavButtonPress();
			}

			Device.media.attachHandler(this._handleWindowResize, this);
			this.getRouter().attachRouteMatched(this.onRouteChange.bind(this));

            this._initTheme();
		},

		onExit: function() {
			Device.media.detachHandler(this._handleWindowResize, this);
		},

        /* */
        onMenuSelected: function (oEvent) {
            let oItem = oEvent.getParameter("item");
            
            this.getRouter().navTo( oItem.getKey() );
            
        },
		onRouteChange: function (oEvent) {
            let sName = oEvent.getParameter('name');
            let oModel = this.getModel('navigation');
                oModel.setProperty('/selectedKey', sName );
                
            let oData = oModel.getProperty('/navigation'),
                sPageTitle = oModel.getProperty('/CurrentPage').title,
                sIndexPath = '',
                oSelItem = null;

            oData.forEach(obj => {
                if( oSelItem ) return false

                if( obj.key===sName ){
                    oSelItem = obj;
                }
                if( obj.items?.length>0 ){
                    obj.items.forEach(_obj =>{
                        if( _obj.key===sName ){
                            oSelItem = _obj;
                        }
                    })
                }
            });

            if( oSelItem ){
              sPageTitle =( oSelItem.PageTitle || oSelItem.title );
            }
            
            oModel.setProperty('/CurrentPage',{
                    title:( sPageTitle || '')
                });
            
            if (Device.system.phone) {
                this.onSideNavButtonPress();
            }
		},
		onDisplayNotFound: function(oEvent) {
			//display the "NotFound" target without changing the hash
			this.getRouter().getTargets().display("NotFound", {
				fromTarget : "home"
			});
		},

        /* */
		onUserNamePress: function(oEvent) {
			const oButton = oEvent.getSource()
            let oView = this.getView();

            this._pUserMenuMenu =( this._pUserMenuMenu || this.loadFragment("project1.fragments.UserMenu") );
            this._pUserMenuMenu.then(function (oPopover) {
                oView.addDependent(oPopover);
				oPopover.openBy(oButton);
			});
		},

        onAppThemePress: function(oEvent) {
            const oButton = oEvent.getSource();
            let oView = this.getView();
            
            this._pAppThemeMenu =( this._pAppThemeMenu || this.loadFragment("project1.fragments.ThemeMenu") );
            this._pAppThemeMenu.then(function (oPopover) {
				oPopover.openBy(oButton);
			});

        },
        onThemeSelected: function(oEvent) {
            let sTheme = '';
            if( typeof oEvent==='string' ){
                sTheme = oEvent;
            }
            else{
                let oItem = oEvent.getParameter('item');
                    sTheme = oItem.getKey();
            }
            this._setTheme(sTheme);
        },
        _setTheme: function (sTheme) {
            if( typeof sTheme==='string' && sTheme && sTheme!==Theming.getTheme() ) {
                sap.ui.core.BusyIndicator.show(0)
                
                Theming.setTheme(sTheme)
                localStorage.setItem("sTheme", sTheme)
                
                setTimeout(()=>{
                    sap.ui.core.BusyIndicator.hide()
                }, 800 );
            }
        },
        _initTheme: function () {
            const sTheme = localStorage.getItem("sTheme");
            if (sTheme) {
                this._setTheme(sTheme)
            }
            
            this._setSideNav();
        },

        /** */
		onSideNavButtonPress: function() {
            let oToolPage = this.byId("app"),
                bSideExpanded =!oToolPage.getSideExpanded();

            this._setSideNav( bSideExpanded );
		},
        _setSideNav: function(bSideExpanded) {
            var oToolPage = this.byId("app"),
                _bExpanded = oToolPage.getSideExpanded();
                bSideExpanded =( bSideExpanded ?? localStorage.getItem("bSideExpanded")==='true' ?? _bExpanded );
            
            if ( bSideExpanded!==_bExpanded ) {
                oToolPage.setSideExpanded( bSideExpanded );
                localStorage.setItem("bSideExpanded", bSideExpanded )
            }
        },

		_setToggleButtonTooltip : function(bSideExpanded) {
			var oToggleButton = this.byId('sideNavigationToggleButton');
			// this.getBundleText(bSideExpanded ? "expandMenuButtonText" : "collpaseMenuButtonText").then(function(sTooltipText){
			// 	oToggleButton.setTooltip(sTooltipText);
			// });
		},

		// Errors Pressed
		onMessagePopoverPress: function (oEvent) {
			var oMessagePopoverButton = oEvent.getSource();
			if (!this.byId("errorMessagePopover")) {
				this.getModel("i18n").getResourceBundle().then(function(oBundle){
					var oMessagePopover = new MessagePopover(this.getView().createId("errorMessagePopover"), {
						placement: VerticalPlacementType.Bottom,
						items: {
							path: 'alerts>/alerts/errors',
							factory: this._createError.bind(this, oBundle)
						},
						afterClose: function () {
							oMessagePopover.destroy();
						}
					});
					this.byId("app").addDependent(oMessagePopover);
					// forward compact/cozy style into dialog
					syncStyleClass(this.getView().getController().getOwnerComponent().getContentDensityClass(), this.getView(), oMessagePopover);
					oMessagePopover.openBy(oMessagePopoverButton);
				}.bind(this));
			}
		},

		/**
		 * Event handler for the notification button
		 * @param {sap.ui.base.Event} oEvent the button press event
		 * @public
		 */
		onNotificationPress: function (oEvent) {
			var oSource = oEvent.getSource();
			this.getModel("i18n").getResourceBundle().then(function(oBundle){
				// close message popover
				var oMessagePopover = this.byId("errorMessagePopover");
				if (oMessagePopover && oMessagePopover.isOpen()) {
					oMessagePopover.destroy();
				}
				var oButton = new Button({
					text: oBundle.getText("notificationButtonText"),
					press: function (oEvent) {
						MessageToast.show(oBundle.getText("clickHandlerMessage", [oEvent.getSource().getText()]));
					}
				});
				var oNotificationPopover = new ResponsivePopover(this.getView().createId("notificationMessagePopover"), {
					title: oBundle.getText("notificationTitle"),
					contentWidth: "300px",
					endButton : oButton,
					placement: PlacementType.Bottom,
					content: {
						path: 'alerts>/alerts/notifications',
						factory: this._createNotification.bind(this)
					},
					afterClose: function () {
						oNotificationPopover.destroy();
					}
				});
				this.byId("app").addDependent(oNotificationPopover);
				// forward compact/cozy style into dialog
				syncStyleClass(this.getView().getController().getOwnerComponent().getContentDensityClass(), this.getView(), oNotificationPopover);
				oNotificationPopover.openBy(oSource);
			}.bind(this));
		},

		/**
		 * Factory function for the notification items
		 * @param {string} sId The id for the item
		 * @param {sap.ui.model.Context} oBindingContext The binding context for the item
		 * @returns {sap.m.NotificationListItem} The new notification list item
		 * @private
		 */
		_createNotification: function (sId, oBindingContext) {
			var oBindingObject = oBindingContext.getObject();
			var oNotificationItem = new NotificationListItem({
				title: oBindingObject.title,
				description: oBindingObject.description,
				priority: oBindingObject.priority,
				close: function (oEvent) {
					var sBindingPath = oEvent.getSource().getCustomData()[0].getValue();
					var sIndex = sBindingPath.split("/").pop();
					var aItems = oEvent.getSource().getModel("alerts").getProperty("/alerts/notifications");
					aItems.splice(sIndex, 1);
					oEvent.getSource().getModel("alerts").setProperty("/alerts/notifications", aItems);
					oEvent.getSource().getModel("alerts").updateBindings("/alerts/notifications");
					this.getBundleText("notificationMessageDeleted").then(function(sMessageText){
						MessageToast.show(sMessageText);
					});
				}.bind(this),
				datetime: oBindingObject.date,
				authorPicture: oBindingObject.icon,
				press: function () {
					this.getModel("i18n").getResourceBundle().then(function(oBundle){
						MessageToast.show(oBundle.getText("notificationItemClickedMessage", [oBindingObject.title]));
					});
				},
				customData : [
					new CustomData({
						key : "path",
						value : oBindingContext.getPath()
					})
				]
			});
			return oNotificationItem;
		},

		_createError: function (oBundle, sId, oBindingContext) {
			var oBindingObject = oBindingContext.getObject();
			var oLink = new Link("moreDetailsLink", {
				text: oBundle.getText("moreDetailsButtonText"),
				press: function(oEvent) {
					this.getBundleText("clickHandlerMessage", [oEvent.getSource().getText()]).then(function(sClickHandlerMessage){
						MessageToast.show(sClickHandlerMessage);
					});
				}.bind(this)
			});

			var oMessageItem = new MessageItem({
				title: oBindingObject.title,
				subtitle: oBindingObject.subTitle,
				description: oBindingObject.description,
				counter: oBindingObject.counter,
				link: oLink
			});
			return oMessageItem;
		},

		/**
		 * Returns a promise which resolves with the resource bundle value of the given key <code>sI18nKey</code>
		 *
		 * @public
		 * @param {string} sI18nKey The key
		 * @param {string[]} [aPlaceholderValues] The values which will repalce the placeholders in the i18n value
		 * @returns {Promise<string>} The promise
		 */
		getBundleText: function(sI18nKey, aPlaceholderValues){
			return this.getBundleTextByModel(sI18nKey, this.getModel("i18n"), aPlaceholderValues);
		},

		_handleWindowResize: function (oDevice) {
			if ((oDevice.name === "Tablet" && this._bExpanded) || oDevice.name === "Desktop") {
				this.onSideNavButtonPress();
				// set the _bExpanded to false on tablet devices
				// extending and collapsing of side navigation should be done when resizing from
				// desktop to tablet screen sizes)
				this._bExpanded = (oDevice.name === "Desktop");
			}
		}

	});
});