sap.ui.define(
  [
    "project1/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/model/Sorter",
    "sap/ui/model/json/JSONModel",
    "sap/m/ViewSettingsDialog",
    "sap/m/ViewSettingsItem",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
  	"sap/ui/core/Fragment",
    "sap/ui/core/Element",
		'sap/m/Token',

	"project1/config/Config",
  ],
  function (
    BaseController,
    Filter,
    FilterOperator,
    FilterType,
    Sorter,
    JSONModel,
    ViewSettingsDialog,
    ViewSettingsItem,
    MessageToast,
    MessageBox,
    Fragment,
    Element,
    Token,
    Config,
  ) {
    "use strict";
    
    return BaseController.extend(
      "project1.controller.employee.overview.EmployeeOverviewContent",
      {
        onInit: function () {

          this._oPage = this.byId("page");
          this._oView = this.getView();
          this._oTable = this.byId("employeesTable");
          this._oVSD = null;
          this._sSortField = null;
          this._bSortDescending = false;
          this._aValidSortFields = ["ID", "Forename", "LastName"];
          this._sSearchQuery = null;

          this._oView.setModel(new JSONModel({
                                Results_cnt : 0,
                                Selected_cnt: 0
                              }), "_PageElements");
          
          this._initViewSettingsDialog();
          this.onRefresh(false);
        },

        createTableTitle: function (iTotal=0, iFilter=0) {
          var sTotalResults = this.geti18nText("TotalResults"),
              oTitle = this.byId('tblTitle'),
              sTitle = `${sTotalResults} ({/Users/$count})`;
          
          this.byId('tblTitle').setTitle(sTitle);
          return sTitle
        },

        onTableResultChange: function (oEvent) {
          const iCnt = oEvent.getSource().getLength();
          this._oView.getModel("_PageElements").setProperty('/Results_cnt', iCnt);
        },

        onRefresh: function (silence=false) {
          var oBinding = this._oTable.getBinding("items");
          // console.log( this._oTable.$().find(':Button') );
          if( oBinding ){
            // if (oBinding.hasPendingChanges()) {
              
            // }
            oBinding.refresh();
            if(!silence) MessageToast.show(this._getText("refreshSuccessMessage"));
          }
        },

        _getText : function (sTextID, Args) {
          return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sTextID, Args);
        },

        onLiveSearch: function (oEvent) {
          // add filter for search
          var aFilters=[],
              oFilter, oBinding;
          var sQuery = oEvent.getSource().getValue().trim();
          if (sQuery && sQuery.length > 0) {
            var filter;
            ['Forename', 'Surname', 'Email',
              'Office/Country_code',
              'Office/Country_Name',
              'Office/Name',
              ''].forEach((col)=>{
                if(!col) return;

                filter = new Filter( col, FilterOperator.Contains, sQuery);
                aFilters.push(filter);
              });

            oFilter = new Filter({ filters: aFilters, and: false, caseSensitive: false }); // OR filter
          }

          // update list binding
          var oUploadSet = this.byId("employeesTable");
          var oBinding = oUploadSet.getBinding("items");
              oBinding.filter(oFilter, "Application");
        },

        getGroupHeader: function (oGroup) {
          var oItem = new Item({
            key: "GROUP#" + oGroup.key,
            text: oGroup.key
          });
          oItem.data("isFakeGroup", "true", true);
          return oItem;
        },
        
        onOfficeValueHelpRequest: function (oEvent) {
          var oView = this._oView;

          if (!this._pValueHelpDialog) {
            this._pValueHelpDialog = Fragment.load({
              id: oView.getId(),
              name: "project1.view.fragment.OfficeValueHelp",
              controller: this
            }).then(function (oValueHelpDialog){
              oView.addDependent(oValueHelpDialog);
              return oValueHelpDialog;
            });

            oView.setModel(new JSONModel({ Selected: [] }), "_OfficeValueHelp");
          }

          this._pValueHelpDialog.then(function(oValueHelpDialog){
            this._configValueHelpDialog();
            oValueHelpDialog.open();
          }.bind(this));
        },

        onTokenUpdate: function (oEvent) {
          var oMultiInput = this.byId("Office_ID_Input"),
              sType = oEvent.getParameter("type");

          if (sType === "removed") {
              let oModel = this.getView().getModel("_OfficeValueHelp"),
                  aData = oModel.getProperty("/Selected");
              let removeTokens = oEvent.getParameter("removedTokens");
                  removeTokens.forEach(function (i, Token) {
                    oMultiInput.removeToken( Token );
                  });
              
              
              var sKey = oEvent.getParameter("removedTokens")[0].getProperty("key");

              oMultiInput.removeToken( oEvent.getParameter("removedTokens")[0] );

              for (var i = 0, len = aData.length; i < len; i++) {
                  var idx;
                  console.log(sKey + "-" + aData[i].key);
                  if (aData[i].key === sKey) {
                      idx = i;
                  }
              }
              aData.splice(idx, 1);
              oModel.setProperty("/Selected", aData);
              oMultiInput.data("myData", aData);
          }
        },

        _configValueHelpDialog: function (oEvent) {
          var oMultiInput = this.byId("Office_ID_Input"),
              sInputValue = oMultiInput.getValue(),
              aSelected =( oMultiInput.getTokens() || [] );

            var oModel = this._oView.getModel("_OfficeValueHelp"),
                aData = oModel.getProperty("/Selected");
            console.log( aSelected, aData );
        },

        onValueHelpDialogClose: function (oEvent) {
          var aSelectedItems = oEvent.getParameter("selectedItems"),
              oMultiInput = this.byId("Office_ID_Input");

            oMultiInput.removeAllTokens();
          if (aSelectedItems && aSelectedItems.length > 0) {
              aSelectedItems.forEach(function (oItem) {
                oMultiInput.addToken(new Token({
                  text: oItem.getTitle(),
                }));
              });
          }
          else{
            return;
          }
        },

        // onSort : function () {
        //   var oView = this.getView(),
        //       aStates =[undefined, "asc", "desc"],
        //       aStateTextIDs =["sortNone", "sortAscending", "sortDescending"],
        //       sMessage,
        //       iOrder = oView.getModel("appView").getProperty("/order");

        //   iOrder =(iOrder + 1) % aStates.length;
        //   var sOrder = aStates[iOrder];
          
        //   oView.getModel("appView").setPorperty("/order", iOrder);
        //   oView.byId("employeesTable").getBinding("items").sort(sOrder && new Sorter("LastName", sOrder=="desc") );
        //   sMessage = this._getText("sortMessege", [this._getText(aStateTextIDs[iOrder])]);
        //   MessageToast.show(sMessage);
        // },

        // ...
        onListItemPressed: function(oEvent) {
          var oItem, oCtx;
          oItem = oEvent.getSource();
          oCtx = oItem.getBindingContext();
                
          this.getRouter().navTo("employee",{
            employeeId : oCtx.getProperty("ID")
          });
          
        },


        _isValidName: function () {
          var InputForename = Element.getElementById('AddUserDialog--Forename-Input'),
          sName = InputForename.getValue(),
          bHasError = false;
          if (!sName) {
            InputForename.setValueState('Error');
            InputForename.setValueStateText('Text is either empty or contains special characters');
            bHasError = true;
          } else {
            InputForename.setValueState('None');
            bHasError = false;
          }
          return !bHasError;
        },
        _validateAddOrEditUrlDialog:  function ( data ) {
          var InputForename = Element.getElementById('AddUserDialog--Forename-Input'),
              sFName = data.Forename,
              sSName = data.Surname,
              sEmail = data.Email,
              bFormHasError = !this._isValidName();

          if (!sFName ) { // || !this._isValidUrl(sFName)
            InputForename.setValueState('Error');
            InputForename.setValueStateText('Enter Valid Name');
            bFormHasError = true;
          } else {
            InputForename.setValueState('None');
          }

          return {
            error: bFormHasError
          };
        },
        handleAddUser: async function (oEvent) {
          var oPostData ={
                "Forename"  : "",
                "Surname"   : "",
                "Email"     : "",
                "Status"    : 0,
                "Office_ID" : 1
              };

          Object.keys(oPostData).forEach((i)=>{
            let oControl = Element.getElementById('AddUserDialog--'+i+'-Input'),
                val = oPostData[i],
                type= typeof val;
                
            if( oControl ){
              let sType = oControl.getMetadata().getName();
              switch( sType ){
                case 'sap.m.ComboBox':
                  val = oControl.getSelectedKey();
                  break;

                case 'sap.m.RadioButtonGroup':
                  val = oControl.getSelectedIndex();
                  break;

                default:
                  val = oControl.getValue()
              }

              if (val || val === 0) {
                switch (type) {
                  case 'number':
                    if( val===parseInt(val) ) val = parseInt(val);
                    else val = parseFloat(val);
                    break;
                
                  default:
                    break;
                }
              }
              oPostData[i] = val;
            }
          })

          var oValidateObject = this._validateAddOrEditUrlDialog( oPostData );
          if( oValidateObject.error ){
            MessageToast.show("Please complete the form.");
            return
          }

          // let oPostData ={
          //       "Forename": "Test59663",
          //       "Surname" : "AnneWu",
          //       "Email"   : "AnneWu@idp.com",
          //       "Office_ID": 1
          //     }

          fetch("/admin/CREATE_NewUser", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(oPostData),
          })
          .then(response => response.json())
          .then(data => {
              // Handle the response data
              console.log("user", data);
              if( data.error?.code ){
                MessageToast.show(`${data.error.code}: ${data.error.target}\n${data.error.message}`);
              }
              else{
                MessageToast.show(`New User ADDED:\n ${data.user.Full_name} (${data.ID})`);
                this.getRouter().navTo("employee",{
                  employeeId : data.ID
                });
              }
          })
          .then(data => {
              setTimeout(()=>{
                this.onRefresh(true)
                this.closeAddUserFragment()
              }, 1000)
          })
          
        },
        // ***
        openAddUserFragment: async function () {
          if (!this._AddUserFragment){
            Fragment.load({
              name: "project1.fragments.AddUser",
              id: "AddUserDialog",
              controller: this
            })
            .then(function (oPopover) {
              this._AddUserFragment = oPopover;
              this._oView.addDependent(oPopover);
              oPopover.open();
              return

              // if edit is clicked
              var editFileInfo = this.oEditDocumentInfo;
              var renameFileInfo = this.oRenameDocumentInfo;
              if (this.bEditDocument && this.oEditDocumentInfo) {
                Element.getElementById('AddUserDialog--AddUserDialog').setTitle("Edit URL");
                Element.getElementById('AddUserDialog--addDocumentBtn').setText("Apply");
                Element.getElementById('AddUserDialog--urlInput').setValue(editFileInfo.url);
                Element.getElementById('AddUserDialog--nameInput').setValue(editFileInfo.name);
                Element.getElementById('AddUserDialog--urlInputLabel').setRequired(false);
                Element.getElementById('AddUserDialog--urlInput').setVisible(true);

              }
              if (this.bRenameDocument && renameFileInfo) {
                Element.getElementById('AddUserDialog--AddUserDialog').setTitle("Rename");
                Element.getElementById('AddUserDialog--AddUserDialog').setContentHeight("7rem");
                Element.getElementById('AddUserDialog--addDocumentBtn').setText("Apply");
                Element.getElementById('AddUserDialog--nameInput').setValue(renameFileInfo.name);
                Element.getElementById('AddUserDialog--urlInput').setVisible(false);
              }
              oPopover.open();
            }.bind(this));
          } else {
            this._AddUserFragment.open();
          }
        },
        closeAddUserFragment: function () {
          // this.bEditDocument = false;
          // this.oEditDocumentInfo = null;
          // this.bRenameDocument = false;
          // this.oRenameDocumentInfo = null;
          this._AddUserFragment.destroy();
          this._AddUserFragment = null;
        },

        onRemoveUsersPressed: function(oEvent) {
          var oItem, oCtx;
              oItem = oEvent.getSource();
              oCtx = oItem.getBindingContext();
              
          MessageBox.warning(
            "Are you sure you want to remove the user" + " " + oCtx.getProperty("Forename") + " (" + oCtx.getProperty("ID") + ") " + "?",
            {
              icon: MessageBox.Icon.WARNING,
              actions: ["Remove", MessageBox.Action.CANCEL],
              emphasizedAction: "Remove",
              styleClass: "sapMUSTRemovePopoverContainer",
              initialFocus: MessageBox.Action.CANCEL,
              onClose:(sAction)=> {
                if (sAction !== "Remove") {
                  return;
                }

                this.handleDeleteUser( parseInt(oCtx.getProperty("ID")), ()=>{
                  console.log('callback');
                  this.onRefresh(true)
                })
                  return;
                var spath = oItem.getBindingContext().sPath;
                if (spath.split("/")[2]) {
                  var index = spath.split("/")[2];
                  var data = oModel.getProperty("/items");
                  data.splice(index, 1);
                  oModel.refresh(true);
                  if (oUploadSet && oUploadSet.removeSelections) {
                    oUploadSet.removeSelections();
                  }
                }
              }
            }
          );
        },

        onSelectionChange: function(oEvent) {
          var oTable = oEvent.getSource();
          var aSelectedItems = oTable.getSelectedItems();
          var BulkUpdateMenu = this.byId("BulkUpdateMenu"),
              oBulkRemoveBtn = this.byId("Bulk_RemoveUsersButton");
          var oEditUrlBtn = this.byId("editUrlButton");
          var oRenameBtn = this.byId("renameButton");
          var oRemoveDocumentBtn = this.byId("removeDocumentButton");

          let EnabledBtn =(aSelectedItems.length>0)
          // BulkUpdateMenu.setEnabled(EnabledBtn);
          oBulkRemoveBtn.setEnabled( EnabledBtn );
          if( Boolean(EnabledBtn)!==Boolean(this._oPage.getShowFooter()) ){
            this._oPage.setShowFooter( EnabledBtn );
          }

          this.getView().getModel("_PageElements").setProperty('/Selected_cnt', aSelectedItems.length);
          return

          if (aSelectedItems.length === 1){
            oEditUrlBtn.setEnabled(true);
            oRenameBtn.setEnabled(true);
            oRemoveDocumentBtn.setEnabled(true);
          } else {
            oRenameBtn.setEnabled(false);
            oEditUrlBtn.setEnabled(false);
            oRemoveDocumentBtn.setEnabled(false);
          }
        },

        onBulkRemoveUsersPressed: function (oEvent) {
          var oUploadSet = this._oTable;
          var aSelectedItems =( oUploadSet && oUploadSet.getSelectedItems ? oUploadSet.getSelectedItems() : []);
          
          if( aSelectedItems.length>0 ){
            var IDs =[]
            aSelectedItems.forEach((oItem)=>{
              let oCtx = oItem.getBindingContext();
              IDs.push( oCtx.getProperty('ID') )
            })

            this.handleDeleteUser( IDs, ()=>{
              console.log('callback');
              this.onRefresh(true)
            })
          }

        },

        // ***
        onSortButtonPressed: function () {
          this._oVSD.open();
        },


        _initViewSettingsDialog: function () {
          this._oVSD = new ViewSettingsDialog("vsd", {
            confirm: function (oEvent) {
              var oSortItem = oEvent.getParameter("sortItem");
              this._applySorter(
                oSortItem.getKey(),
                oEvent.getParameter("sortDescending")
              );
            }.bind(this),
          });

          // init sorting (with simple sorters as custom data for all fields)
          this._oVSD.addSortItem(
            new ViewSettingsItem({
              key: "ID",
              text: "Employee ID",
              selected: true, // by default the MockData is sorted by EmployeeID
            })
          );

          this._oVSD.addSortItem(
            new ViewSettingsItem({
              key: "Forename",
              text: "First Name",
              selected: false,
            })
          );

          this._oVSD.addSortItem(
            new ViewSettingsItem({
              key: "LastName",
              text: "Last Name",
              selected: false,
            })
          );
        },

        onSearchEmployeesTable_form: function (oEvent) {
          this._applySearchFilter_form('-Search');
        },
        onClearSearch_form: function (oEvent) {
          this._clearSearchFilter_form('-Search');
        },
        onSearchEmployeesTable2: function (oEvent) {
          this._applySearchFilter_form('_Input');
        },
        onClearSearch_form2: function (oEvent) {
          this._clearSearchFilter_form('_Input');
        },

        _applySearchFilter_form: function ( sAppend ) {
          // add filter for search
          var aFilters=[],
              oFilter, oBinding;

          var oPostData ={
                "Forename"  : "",
                "Surname"   : "",
                "Email"     : "",
                "Status"    : 0,
                "Office_ID" : 1
              };

          let _this = this;
          Object.keys(oPostData).forEach(( col )=>{
            let oControl = _this.byId( col+sAppend),
                _val = oPostData[col],
                type= typeof _val,
                val = null;
               
            if( oControl ){
              let sType = oControl.getMetadata().getName();
              console.log(sType, type, oControl);
              switch( sType ){
                case 'sap.m.ComboBox':
                  val = oControl.getSelectedKey();
                  break;

                case 'sap.m.RadioButtonGroup':
                  val = oControl.getSelectedIndex();
                  break;

                default:
                  val = oControl.getValue()
              }

              if (val || val === 0) {
                var filter;
                switch (type) {
                  case 'number':
                    if( _val===parseInt(val) ) val = parseInt(val);
                    else val = parseFloat(val);
                    break;
                
                  default:
                    break;
                }
                filter = new Filter( col, FilterOperator.Contains, val);
                aFilters.push(filter);
              }
              oPostData[col] = val;
            }
          })
          
          if (aFilters && aFilters.length > 0) {
            oFilter = new Filter({ filters: aFilters, and: true, caseSensitive: false }); // OR filter
          }

          // update list binding
          var oBinding = this._oTable.getBinding("items");
              oBinding.filter(oFilter, "Application");
          
        },
        _clearSearchFilter_form: function ( sAppend ) {
          var oPostData ={
                "Forename"  : "",
                "Surname"   : "",
                "Email"     : "",
                "Status"    : 0,
                "Office_ID" : 1
              };

          let _this = this;
          Object.keys(oPostData).forEach(( col )=>{
            let oControl = _this.byId( col+sAppend),
                _val = oPostData[col],
                type= typeof _val,
                val = null;
               
            if( oControl ){
              oControl.setValue(null);
            }

            var oBinding = this._oTable.getBinding("items");
                oBinding.filter(null, "Application");
          })
        },


        onSearchEmployeesTable: function (oEvent) {
          this._applySearchFilter(oEvent.getSource().getValue());
        },

        _applySearchFilter: function (sSearchQuery) {
          var aFilters, oFilter, oBinding;

          // first check if we already have this search value
          if (this._sSearchQuery === sSearchQuery) {
            return;
          }
          this._sSearchQuery = sSearchQuery;
          this.byId("searchField").setValue(sSearchQuery);

          // add filters for search
          aFilters = [];
          if (sSearchQuery && sSearchQuery.length > 0) {
            aFilters.push(
              new Filter("Forename", FilterOperator.Contains, sSearchQuery)
            );
            aFilters.push(
              new Filter("Surname", FilterOperator.Contains, sSearchQuery)
            );
            oFilter = new Filter({ filters: aFilters, and: false }); // OR filter
          } else {
            oFilter = null;
          }

          // update list binding
          oBinding = this._oTable.getBinding("items");
          oBinding.filter(oFilter, "Application");
        },

        /**
         * Applies sorting on our table control.
         * @param {string} sSortField		the name of the field used for sorting
         * @param {string} sortDescending	true or false as a string or boolean value to specify a descending sorting
         * @private
         */
        _applySorter: function (sSortField, sortDescending) {
          var bSortDescending, oBinding, oSorter;

          // only continue if we have a valid sort field
          if (sSortField && this._aValidSortFields.indexOf(sSortField) > -1) {
            // convert  the sort order to a boolean value
            if (typeof sortDescending === "string") {
              bSortDescending = sortDescending === "true";
            } else if (typeof sortDescending === "boolean") {
              bSortDescending = sortDescending;
            } else {
              bSortDescending = false;
            }

            // sort only if the sorter has changed
            if (
              this._sSortField &&
              this._sSortField === sSortField &&
              this._bSortDescending === bSortDescending
            ) {
              return;
            }

            this._sSortField = sSortField;
            this._bSortDescending = bSortDescending;
            oSorter = new Sorter(sSortField, bSortDescending);

            // sync with View Settings Dialog
            this._syncViewSettingsDialogSorter(sSortField, bSortDescending);

            oBinding = this._oTable.getBinding("items");
            oBinding.sort(oSorter);
          }
        },

        _syncViewSettingsDialogSorter: function (sSortField, bSortDescending) {
          // the possible keys are: "EmployeeID" | "FirstName" | "LastName"
          // Note: no input validation is implemented here
          this._oVSD.setSelectedSortItem(sSortField);
          this._oVSD.setSortDescending(bSortDescending);
        },
      }
    );
  }
);
