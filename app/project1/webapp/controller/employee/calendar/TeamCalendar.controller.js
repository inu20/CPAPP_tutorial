sap.ui.define([
    "project1/controller/BaseController",
    'sap/m/MessageToast',
	"sap/ui/model/json/JSONModel",
    'sap/ui/core/library',
    'sap/ui/core/Fragment',
    'sap/ui/core/date/UI5Date',
	"project1/model/calendar_formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageToast, JSONModel, coreLibrary, Fragment, UI5Date, CalendarFormatter) {
        "use strict";

        var ValueState = coreLibrary.ValueState;
        var dToday = new Date(),
            iYear = dToday.getFullYear(),
            iMonth= dToday.getMonth(),
            iDate = dToday.getDate();

        
        return BaseController.extend("project1.controller.employee.calendar.TeamCalendar", {

		    myformatter : CalendarFormatter,
            imagePath : '',

            onInit: function () {
				var oModel = new JSONModel();
				oModel.setData({
					startDate: UI5Date.getInstance(iYear, iMonth, iDate, "8", "0"),
					minDate: UI5Date.getInstance(iYear, iMonth, iDate, "8", "0"),
					people: [
                    {
						pic: "images/John_Miller.png",
						name: "John",
						role: "team member",
						appointments: [
							{
								start: UI5Date.getInstance(iYear, iMonth, "8", "08", "30"),
								end: UI5Date.getInstance(iYear, iMonth, "8", "09", "30"),
								title: "Meet Max Mustermann",
								type: "Type02",
								pic: "sap-icon://flight",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "11", "10", "0"),
								end: UI5Date.getInstance(iYear, iMonth, "11", "12", "0"),
								title: "Team meeting",
								info: "room 1",
								type: "Type01",
								pic: "sap-icon://family-care",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "12", "11", "30"),
								end: UI5Date.getInstance(iYear, iMonth, "12", "13", "30"),
								title: "Lunch",
								info: "canteen",
								type: "Type03",
								tentative: true
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, iDate, "08", "30"),
								end: UI5Date.getInstance(iYear, iMonth, iDate, "09", "30"),
								title: "Meet Max Mustermann",
								type: "Type02",
								pic: "sap-icon://flight",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, iDate, "10", "0"),
								end: UI5Date.getInstance(iYear, iMonth, iDate, "12", "0"),
								title: "Team meeting",
								info: "room 1",
								type: "Type01",
								pic: "sap-icon://family-care",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, iDate, "11", "30"),
								end: UI5Date.getInstance(iYear, iMonth, iDate, "13", "30"),
								title: "Lunch",
								type: "Type03",
								tentative: true
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, iDate, "13", "30"),
								end: UI5Date.getInstance(iYear, iMonth, iDate, "17", "30"),
								title: "Discussion with clients",
								info: "online meeting",
								type: "Type02",
								pic: "sap-icon://call",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "16", "04", "00"),
								end: UI5Date.getInstance(iYear, iMonth, "16", "22", "30"),
								title: "Discussion of the plan",
								info: "Online meeting",
								type: "Type04",
								pic: "sap-icon://call",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "18", "08", "30"),
								end: UI5Date.getInstance(iYear, iMonth, "18", "09", "30"),
								title: "Meeting with the manager",
								type: "Type02",
								pic: "sap-icon://flight",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "18", "11", "30"),
								end: UI5Date.getInstance(iYear, iMonth, "18", "13", "30"),
								title: "Lunch",
								info: "canteen",
								type: "Type03",
								tentative: true
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "18", "1", "0"),
								end: UI5Date.getInstance(iYear, iMonth, "18", "22", "0"),
								title: "Team meeting",
								info: "regular",
								type: "Type01",
								pic: "sap-icon://family-care",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "21", "00", "30"),
								end: UI5Date.getInstance(iYear, iMonth, "21", "23", "30"),
								title: "New Product",
								info: "room 105",
								type: "Type03",
								tentative: true
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "25", "11", "30"),
								end: UI5Date.getInstance(iYear, iMonth, "25", "13", "30"),
								title: "Lunch",
								type: "Type03",
								tentative: true
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "29", "10", "0"),
								end: UI5Date.getInstance(iYear, iMonth, "29", "12", "0"),
								title: "Team meeting",
								info: "room 1",
								type: "Type01",
								pic: "sap-icon://family-care",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "30", "08", "30"),
								end: UI5Date.getInstance(iYear, iMonth, "30", "09", "30"),
								title: "Meet Max Mustermann",
								type: "Type02",
								pic: "sap-icon://flight",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "30", "10", "0"),
								end: UI5Date.getInstance(iYear, iMonth, "30", "12", "0"),
								title: "Team meeting",
								info: "room 1",
								type: "Type01",
								pic: "sap-icon://family-care",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "30", "11", "30"),
								end: UI5Date.getInstance(iYear, iMonth, "30", "13", "30"),
								title: "Lunch",
								type: "Type03",
								tentative: true
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "30", "13", "30"),
								end: UI5Date.getInstance(iYear, iMonth, "30", "17", "30"),
								title: "Discussion with clients",
								type: "Type02",
								pic: "sap-icon://call",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, "31", "10", "00"),
								end: UI5Date.getInstance(iYear, iMonth, "31", "11", "30"),
								title: "Discussion of the plan",
								info: "Online meeting",
								type: "Type04",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth+1, "3", "08", "30"),
								end: UI5Date.getInstance(iYear, iMonth+1, "13", "09", "30"),
								title: "Meeting with the manager",
								type: "Type02",
								pic: "sap-icon://flight",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth+1, "4", "10", "0"),
								end: UI5Date.getInstance(iYear, iMonth+1, "4", "12", "0"),
								title: "Team meeting",
								info: "room 1",
								type: "Type01",
								pic: "sap-icon://family-care",
								tentative: false
							},
							{
								start: UI5Date.getInstance(iYear, iMonth+2, "30", "10", "0"),
								end: UI5Date.getInstance(iYear, iMonth+4, "33", "12", "0"),
								title: "Working out of the building",
								type: "Type07",
								pic: "sap-icon://family-care",
								tentative: false
							}
						],
						headers: [
							{
								start: UI5Date.getInstance(iYear, iMonth, iDate, "8", "0"),
								end: UI5Date.getInstance(iYear, iMonth, iDate, "10", "0"),
								title: "Reminder",
								type: "Type06"
							},
							{
								start: UI5Date.getInstance(iYear, iMonth, iDate, "17", "0"),
								end: UI5Date.getInstance(iYear, iMonth, iDate, "19", "0"),
								title: "Reminder",
								type: "Type06"
							},
							{
								start: UI5Date.getInstance(iYear, iMonth+8, "1", "0", "0"),
								end: UI5Date.getInstance(iYear, iMonth+10, "30", "23", "59"),
								title: "New quarter",
								type: "Type10",
								tentative: false
							},
							{
								start: UI5Date.getInstance("2018", "1", "1", "0", "0"),
								end: UI5Date.getInstance("2018", "3", "30", "23", "59"),
								title: "New quarter",
								type: "Type10",
								tentative: false
							}
						]
					},
						{
							pic: "images/Donna_Moore.jpg",
							name: "Donna",
							role: "team member",
							appointments: [
								{
									start: UI5Date.getInstance(iYear, iMonth, "10", "18", "00"),
									end: UI5Date.getInstance(iYear, iMonth, "10", "19", "10"),
									title: "Discussion of the plan",
									info: "Online meeting",
									type: "Type04",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, "9", "10", "0"),
									end: UI5Date.getInstance(iYear, iMonth, "13", "12", "0"),
									title: "Workshop out of the country",
									type: "Type07",
									pic: "sap-icon://family-care",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, iDate, "08", "00"),
									end: UI5Date.getInstance(iYear, iMonth, iDate, "09", "30"),
									title: "Discussion of the plan",
									info: "Online meeting",
									type: "Type04",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, iDate, "10", "0"),
									end: UI5Date.getInstance(iYear, iMonth, iDate, "12", "0"),
									title: "Team meeting",
									type: "Type01",
									pic: "sap-icon://family-care",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, iDate, "18", "00"),
									end: UI5Date.getInstance(iYear, iMonth, iDate, "19", "10"),
									title: "Discussion of the plan",
									info: "Online meeting",
									type: "Type04",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, "16", "10", "0"),
									end: UI5Date.getInstance(iYear, iMonth, "31", "12", "0"),
									title: "Workshop out of the country",
									type: "Type07",
									pic: "sap-icon://family-care",
									tentative: false
								},
								{
									start: UI5Date.getInstance("2018", "0", "1", "0", "0"),
									end: UI5Date.getInstance("2018", "2", "31", "23", "59"),
									title: "New quarter",
									type: "Type10",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth+1, "11", "10", "0"),
									end: UI5Date.getInstance(iYear, iMonth+2, "20", "12", "0"),
									title: "Team collaboration",
									info: "room 1",
									type: "Type01",
									pic: "sap-icon://family-care",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth+3, "01", "10", "0"),
									end: UI5Date.getInstance(iYear, iMonth+3, "31", "12", "0"),
									title: "Workshop out of the country",
									type: "Type07",
									pic: "sap-icon://family-care",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth+4, "01", "10", "0"),
									end: UI5Date.getInstance(iYear, iMonth+4, "31", "12", "0"),
									title: "Out of the office",
									type: "Type08",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, "7", "1", "0", "0"),
									end: UI5Date.getInstance(iYear, "7", "31", "23", "59"),
									title: "Vacation",
									info: "out of office",
									type: "Type04",
									tentative: false
								}
							],
							headers: [
								{
									start: UI5Date.getInstance(iYear, iMonth, iDate, "9", "0"),
									end: UI5Date.getInstance(iYear, iMonth, iDate, "10", "0"),
									title: "Payment reminder",
									type: "Type06"
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, iDate, "16", "30"),
									end: UI5Date.getInstance(iYear, iMonth, iDate, "18", "00"),
									title: "Private appointment",
									type: "Type06"
								}
							]
						},
						{
							pic: "sap-icon://employee",
							name: "Maxie",
							role: "team member",
							appointments: [
								{
									start: UI5Date.getInstance(iYear, iMonth, iDate, "08", "30"),
									end: UI5Date.getInstance(iYear, iMonth, iDate, "09", "30"),
									title: "Meet John Miller",
									type: "Type02",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, iDate, "10", "0"),
									end: UI5Date.getInstance(iYear, iMonth, iDate, "12", "0"),
									title: "Team meeting",
									info: "room 1",
									type: "Type01",
									pic: "sap-icon://family-care",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, iDate, "13", "00"),
									end: UI5Date.getInstance(iYear, iMonth, iDate, "16", "00"),
									title: "Discussion with clients",
									info: "online",
									type: "Type02",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, "16", "0", "0"),
									end: UI5Date.getInstance(iYear, iMonth, "16", "23", "59"),
									title: "Vacation",
									info: "out of office",
									type: "Type04",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, "17", "1", "0"),
									end: UI5Date.getInstance(iYear, iMonth, "18", "22", "0"),
									title: "Workshop",
									info: "regular",
									type: "Type07",
									pic: "sap-icon://family-care",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, "19", "08", "30"),
									end: UI5Date.getInstance(iYear, iMonth, "19", "18", "30"),
									title: "Meet John Doe",
									type: "Type02",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, "19", "10", "0"),
									end: UI5Date.getInstance(iYear, iMonth, "19", "16", "0"),
									title: "Team meeting",
									info: "room 1",
									type: "Type01",
									pic: "sap-icon://family-care",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, "19", "07", "00"),
									end: UI5Date.getInstance(iYear, iMonth, "19", "17", "30"),
									title: "Discussion with clients",
									type: "Type02",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, "20", "0", "0"),
									end: UI5Date.getInstance(iYear, iMonth, "20", "23", "59"),
									title: "Vacation",
									info: "out of office",
									type: "Type04",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, iMonth, "22", "07", "00"),
									end: UI5Date.getInstance(iYear, iMonth, "27", "17", "30"),
									title: "Discussion with clients",
									info: "out of office",
									type: "Type02",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, "2", "13", "9", "0"),
									end: UI5Date.getInstance(iYear, "2", "17", "10", "0"),
									title: "Payment week",
									type: "Type06"
								},
								{
									start: UI5Date.getInstance(iYear, iMonth+3, "10", "0", "0"),
									end: UI5Date.getInstance(iYear, iMonth+5, "16", "23", "59"),
									title: "Vacation",
									info: "out of office",
									type: "Type04",
									tentative: false
								},
								{
									start: UI5Date.getInstance(iYear, "07", "1", "0", "0"),
									end: UI5Date.getInstance(iYear, "09", "31", "23", "59"),
									title: "New quarter",
									type: "Type10",
									tentative: false
								}
							],
							headers: [
								{
									start: UI5Date.getInstance(iYear, iMonth, "16", "0", "0"),
									end: UI5Date.getInstance(iYear, iMonth, "16", "23", "59"),
									title: "Private",
									type: "Type05"
								}
							]
						}
					]
				});
				this.getView().setModel(oModel, 'calendar');
        this._oModel = this.getView().getModel('calendar');
            this.byId("PlanningCalendar").setCustomAppointmentsSorterCallback(true);
        },

			roles: {
				donna: "Donna Moore",
				manager: "manager",
				admin: "admin"
			},

			handleRoleChange: function () {
				this._oModel.refresh(true);
			},

			getUserRole: function() {
				return this.roles.manager;
                return this.roles[this.byId("userRole").getSelectedKey()];
			},

			canModifyAppointments: function(sRole) {
				return true;
                var sUserRole = this.getUserRole();

				if (sUserRole === this.roles.manager || sUserRole === this.roles.admin || sUserRole === sRole) {
					return true;
				}
			},

			handleAppointmentDragEnter: function(oEvent) {
				if (this.isAppointmentOverlap(oEvent, oEvent.getParameter("calendarRow"))) {
					oEvent.preventDefault();
				}
			},
			handleAppointmentAddWithContext: function (oEvent) {
				this.oClickEventParameters = oEvent.getParameters();
				this._arrangeDialogFragment(this._aDialogTypes[1].type);
			},

			handleAppointmentDrop: function (oEvent) {
				var oAppointment = oEvent.getParameter("appointment"),
					oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate"),
					oCalendarRow = oEvent.getParameter("calendarRow"),
					bCopy = oEvent.getParameter("copy"),
					sTitle = oAppointment.getTitle(),
					oModel = this._oModel,
					oAppBindingContext = oAppointment.getBindingContext('calendar'),
					oRowBindingContext = oCalendarRow.getBindingContext('calendar'),
					handleAppointmentDropBetweenRows = function () {
						var aPath = oAppBindingContext.getPath().split("/"),
							iIndex = aPath.pop(),
							sRowAppointmentsPath = aPath.join("/");

						oRowBindingContext.getObject().appointments.push(
							oModel.getProperty(oAppBindingContext.getPath())
						);

						oModel.getProperty(sRowAppointmentsPath).splice(iIndex, 1);
					};

				if (bCopy) { // "copy" appointment
					var oProps = Object.assign({}, oModel.getProperty(oAppointment.getBindingContext('calendar').getPath()));
					oProps.start = oStartDate;
					oProps.end = oEndDate;

					oRowBindingContext.getObject().appointments.push(oProps);
				} else { // "move" appointment
					oModel.setProperty("start", oStartDate, oAppBindingContext);
					oModel.setProperty("end", oEndDate, oAppBindingContext);

					if (oAppointment.getParent() !== oCalendarRow) {
						handleAppointmentDropBetweenRows();
					}
				}

				oModel.refresh(true);

				MessageToast.show(oCalendarRow.getTitle() + "'s '" + "Appointment '" + sTitle + "' now starts at \n" + oStartDate + "\n and end at \n" + oEndDate + ".");
			},

			handleAppointmentResize: function (oEvent) {
				var oAppointment = oEvent.getParameter("appointment"),
					oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate");

				if (!this.isAppointmentOverlap(oEvent, oAppointment.getParent())) {
					MessageToast.show("Appointment '" + oAppointment.getTitle() + "' now starts at \n" + oStartDate + "\n and end at \n" + oEndDate + ".");

					oAppointment
						.setStartDate(oStartDate)
						.setEndDate(oEndDate);
				} else {
					MessageToast.show("As a manager you can not resize events if they overlap with another events");
				}
			},

			handleAppointmentCreate: function (oEvent) {
				var oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate"),
					oPlanningCalendarRow = oEvent.getParameter("calendarRow"),
					oModel = this._oModel,
					sPath = oPlanningCalendarRow.getBindingContext('calendar').getPath();

				oModel.getProperty(sPath).appointments.push({
					title: "New Appointment",
					start: oStartDate,
					end: oEndDate
				});

				MessageToast.show("New Appointment is created at \n" + oStartDate + "\n and end at \n" + oEndDate + ".");

				oModel.refresh(true);
			},

			isAppointmentOverlap: function (oEvent, oCalendarRow) {
				return false;
                
                var oAppointment = oEvent.getParameter("appointment"),
					oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate"),
					bAppointmentOverlapped;

				if (this.getUserRole() === this.roles.manager) {
					bAppointmentOverlapped = oCalendarRow.getAppointments().some(function (oCurrentAppointment) {
						if (oCurrentAppointment === oAppointment) {
							return;
						}

						var oAppStartTime = oCurrentAppointment.getStartDate().getTime(),
							oAppEndTime = oCurrentAppointment.getEndDate().getTime();

						if (oAppStartTime <= oStartDate.getTime() && oStartDate.getTime() < oAppEndTime) {
							return true;
						}

						if (oAppStartTime < oEndDate.getTime() && oEndDate.getTime() <= oAppEndTime) {
							return true;
						}

						if (oStartDate.getTime() <= oAppStartTime && oAppStartTime < oEndDate.getTime()) {
							return true;
						}
					});
				}

				return bAppointmentOverlapped;
			},


            /*  */
			_aDialogTypes: [
				{ title: "Create Appointment", type: "create_appointment" },
				{ title: "Create Appointment", type: "create_appointment_with_context"},
				{ title: "Edit Appointment", type: "edit_appointment" }],

			handleAppointmentSelect: function (oEvent) {
				var oAppointment = oEvent.getParameter("appointment");
				if (oAppointment) {
					this._handleSingleAppointment(oAppointment);
				} else {
					this._handleGroupAppointments(oEvent);
				}
			},
      _handleSingleAppointment: function (oAppointment) {
				var oView = this.getView();
				if (oAppointment === undefined) {
					return;
				}
                
				if (!oAppointment.getSelected() && this._pDetailsPopover) {
					this._pDetailsPopover.then(function(oDetailsPopover){
						oDetailsPopover.close();
					});
					return;
				}

				if (!this._pDetailsPopover) {
					this._pDetailsPopover = Fragment.load({
						id: oView.getId(),
						name: "project1.fragments.calendar.details",
						controller: this
					}).then(function(oDetailsPopover){
						oView.addDependent(oDetailsPopover);
						return oDetailsPopover;
					});
				}

				this._pDetailsPopover.then(function(oDetailsPopover){
					this._setDetailsDialogContent(oAppointment, oDetailsPopover);
				}.bind(this));
			},
			_setDetailsDialogContent: function(oAppointment, oDetailsPopover){
				oDetailsPopover.setBindingContext(oAppointment.getBindingContext('calendar'), 'calendar');
				oDetailsPopover.openBy(oAppointment);
			},

            /*  */
			handleAppointmentCreate: function () {
				this._arrangeDialogFragment(this._aDialogTypes[0].type);
			},

			handleDeleteAppointment: function(){
				var oDetailsPopover = this.byId("detailsPopover"),
					oBindingContext = oDetailsPopover.getBindingContext('calendar'),
					oAppointment = oBindingContext.getObject(),
					iPersonIdStartIndex = oBindingContext.getPath().indexOf("/people/") + "/people/".length,
					iPersonId = oBindingContext.getPath()[iPersonIdStartIndex];

				this._removeAppointment(oAppointment, iPersonId);
				oDetailsPopover.close();
			},

			handleEditButton: function(){
				var oDetailsPopover = this.byId("detailsPopover");
				this.sPath = oDetailsPopover.getBindingContext('calendar').getPath();
				oDetailsPopover.close();
				this._arrangeDialogFragment(this._aDialogTypes[2].type);

			},

			_arrangeDialogFragment: function (iDialogType) {
				var oView = this.getView();

				if (!this._pNewAppointmentDialog) {
					this._pNewAppointmentDialog = Fragment.load({
						id: oView.getId(),
						name: "project1.fragments.calendar.create",
						controller: this
					}).then(function(oDialog) {
						oView.addDependent(oDialog);
						return oDialog;
					});
				}
				this._pNewAppointmentDialog.then(function(oDialog) {
					this._arrangeDialog(iDialogType, oDialog);
				}.bind(this));
			},

			updateButtonEnabledState: function (oDialog) {
				var oStartDate = this.byId("startDate"),
					oEndDate = this.byId("endDate"),
					bEnabled = oStartDate.getValueState() !== ValueState.Error
					&& oStartDate.getValue() !== ""
					&& oEndDate.getValue() !== ""
					&& oEndDate.getValueState() !== ValueState.Error;

					oDialog.getBeginButton().setEnabled(bEnabled);
			},

			handleCreateChange: function (oEvent) {
				var oDateTimePickerStart = this.byId("startDate"),
					oDateTimePickerEnd = this.byId("endDate");

				if (oEvent.getParameter("valid")) {
					this._validateDateTimePicker(oDateTimePickerStart, oDateTimePickerEnd);
				} else {
					oEvent.getSource().setValueState(ValueState.Error);
				}

				this.updateButtonEnabledState(this.byId("createDialog"));
			},
            
			_removeAppointment: function(oAppointment, sPersonId){
				var oModel = this.getView().getModel('calendar'),
					sTempPath,
					aPersonAppointments,
					iIndexForRemoval;

				if (!sPersonId){
					sTempPath = this.sPath.slice(0,this.sPath.indexOf("appointments/") + "appointments/".length);
				} else {
					sTempPath = "/people/" + sPersonId + "/appointments";
				}

				aPersonAppointments = oModel.getProperty(sTempPath);
				iIndexForRemoval = aPersonAppointments.indexOf(oAppointment);

				if (iIndexForRemoval !== -1){
					aPersonAppointments.splice(iIndexForRemoval, 1);
				}

				oModel.setProperty(sTempPath, aPersonAppointments);
			},

			handleDeleteAppointment: function(){
				var oDetailsPopover = this.byId("detailsPopover"),
					oBindingContext = oDetailsPopover.getBindingContext('calendar'),
					oAppointment = oBindingContext.getObject(),
					iPersonIdStartIndex = oBindingContext.getPath().indexOf("/people/") + "/people/".length,
					iPersonId = oBindingContext.getPath()[iPersonIdStartIndex];

				this._removeAppointment(oAppointment, iPersonId);
				oDetailsPopover.close();
			},

			handleEditButton: function(){
				var oDetailsPopover = this.byId("detailsPopover");
				this.sPath = oDetailsPopover.getBindingContext('calendar').getPath();
				oDetailsPopover.close();
				this._arrangeDialogFragment(this._aDialogTypes[2].type);

			},

			_validateDateTimePicker: function (oDateTimePickerStart, oDateTimePickerEnd) {
				var oStartDate = oDateTimePickerStart.getDateValue(),
					oEndDate = oDateTimePickerEnd.getDateValue(),
					sValueStateText = "Start date should be before End date";

				if (oStartDate && oEndDate && oEndDate.getTime() <= oStartDate.getTime()) {
					oDateTimePickerStart.setValueState(ValueState.Error);
					oDateTimePickerEnd.setValueState(ValueState.Error);
					oDateTimePickerStart.setValueStateText(sValueStateText);
					oDateTimePickerEnd.setValueStateText(sValueStateText);
				} else {
					oDateTimePickerStart.setValueState(ValueState.None);
					oDateTimePickerEnd.setValueState(ValueState.None);
				}
			},

            
			_arrangeDialog: function(sDialogType, oDialog) {
				var sTempTitle = "";
				oDialog._sDialogType = sDialogType;
				if (sDialogType === "edit_appointment"){
					this._setEditAppointmentDialogContent(oDialog);
					sTempTitle = this._aDialogTypes[2].title;
				} else if (sDialogType === "create_appointment_with_context"){
					this._setCreateWithContextAppointmentDialogContent();
					sTempTitle = this._aDialogTypes[1].title;
				} else if (sDialogType === "create_appointment"){
					this._setCreateAppointmentDialogContent();
					sTempTitle = this._aDialogTypes[0].title;
				} else {
					Log.error("Wrong dialog type.");
				}

				this.updateButtonEnabledState(oDialog);
				oDialog.setTitle(sTempTitle);
				oDialog.open();
			},

			handleDialogCancelButton: function(){
				this.byId("createDialog").close();
			},

            handleDialogSaveButton: function(){
				var oStartDate = this.byId("startDate"),
					oEndDate = this.byId("endDate"),
					sInfoValue = this.byId("moreInfo").getValue(),
					sInputTitle = this.byId("inputTitle").getValue(),
					iPersonId = this.byId("selectPerson").getSelectedIndex(),
					oModel = this.getView().getModel('calendar'),
					bIsIntervalAppointment = this.byId("isIntervalAppointment").getSelected(),
					oNewAppointmentDialog = this.byId("createDialog"),
					oNewAppointment;

					if (oStartDate.getValueState() !== ValueState.Error
					&& oEndDate.getValueState() !== ValueState.Error){
						if (this.sPath && oNewAppointmentDialog._sDialogType === "edit_appointment") {
							this._editAppointment({
								title: sInputTitle,
								info: sInfoValue,
								type: this.byId("detailsPopover").getBindingContext('calendar').getObject().type,
								start: oStartDate.getDateValue(),
								end: oEndDate.getDateValue()}, bIsIntervalAppointment, iPersonId, oNewAppointmentDialog);
						} else {
							if (bIsIntervalAppointment) {
								oNewAppointment = {
									title: sInputTitle,
									start: oStartDate.getDateValue(),
									end: oEndDate.getDateValue()
								};
							} else {
								oNewAppointment = {
									title: sInputTitle,
									info: sInfoValue,
									start: oStartDate.getDateValue(),
									end: oEndDate.getDateValue()
								};
							}
							this._addNewAppointment(oNewAppointment);
					}

					oModel.updateBindings();

					oNewAppointmentDialog.close();
				}
			},

			_convertToHeader: function(oAppointment, oNewAppointmentDialog){
				var sPersonId = this.byId("selectPerson").getSelectedIndex().toString();

				this._removeAppointment(oNewAppointmentDialog.getModel('calendar').getProperty(this.sPath), sPersonId);
				this._addNewAppointment({start: oAppointment.start, end: oAppointment.end, title: oAppointment.title, type: oAppointment.type});
			},

			_addNewAppointment: function(oAppointment){
				var oModel = this.getView().getModel('calendar'),
					sPath = "/people/" + this.byId("selectPerson").getSelectedIndex().toString(),
					oPersonAppointments;

				if (this.byId("isIntervalAppointment").getSelected()){
					sPath += "/headers";
				} else {
					sPath += "/appointments";
				}

				oPersonAppointments = oModel.getProperty(sPath);

				oPersonAppointments.push(oAppointment);

				oModel.setProperty(sPath, oPersonAppointments);
			},

			_editAppointment: function(oAppointment, bIsIntervalAppointment, iPersonId, oNewAppointmentDialog){
				var sAppointmentPath = this._appointmentOwnerChange(oNewAppointmentDialog),
					oModel = this.getView().getModel('calendar');

				if (bIsIntervalAppointment) {
					this._convertToHeader(oAppointment, oNewAppointmentDialog);
				} else {
					if (this.sPath !== sAppointmentPath) {
						this._addNewAppointment(oNewAppointmentDialog.getModel('calendar').getProperty(this.sPath));
						this._removeAppointment(oNewAppointmentDialog.getModel('calendar').getProperty(this.sPath));
					}
					oModel.setProperty(sAppointmentPath + "/title", oAppointment.title);
					oModel.setProperty(sAppointmentPath + "/info", oAppointment.info);
					oModel.setProperty(sAppointmentPath + "/type", oAppointment.type);
					oModel.setProperty(sAppointmentPath + "/start", oAppointment.start);
					oModel.setProperty(sAppointmentPath + "/end", oAppointment.end);
				}
			},

			_appointmentOwnerChange: function(oNewAppointmentDialog){
				var iSpathPersonId = this.sPath[this.sPath.indexOf("/people/") + "/people/".length],
					iSelectedPerson = this.byId("selectPerson").getSelectedIndex(),
					sTempPath = this.sPath,
					iLastElementIndex = oNewAppointmentDialog.getModel('calendar').getProperty("/people/" + iSelectedPerson.toString() + "/appointments/").length.toString();

				if (iSpathPersonId !== iSelectedPerson.toString()){
					sTempPath = "".concat("/people/", iSelectedPerson.toString(), "/appointments/", iLastElementIndex.toString());
				}

				return sTempPath;
			},

			_setCreateAppointmentDialogContent: function(){
				var oAppointmentType = this.byId("isIntervalAppointment"),
					oDateTimePickerStart = this.byId("startDate"),
					oDateTimePickerEnd =  this.byId("endDate"),
					oTitleInput = this.byId("inputTitle"),
					oMoreInfoInput = this.byId("moreInfo"),
					oPersonSelected = this.byId("selectPerson");

				//Set the person in the first row as selected.
				oPersonSelected.setSelectedItem(this.byId("selectPerson").getItems()[0]);
				oDateTimePickerStart.setValue("");
				oDateTimePickerEnd.setValue("");
				oDateTimePickerStart.setValueState(ValueState.None);
				oDateTimePickerEnd.setValueState(ValueState.None);
				oTitleInput.setValue("");
				oMoreInfoInput.setValue("");
				oAppointmentType.setSelected(false);
			},

			_setCreateWithContextAppointmentDialogContent: function(){
				var aPeople = this.getView().getModel('calendar').getProperty('/people/'),
					oSelectedIntervalStart = this.oClickEventParameters.startDate,
					oStartDate = this.byId("startDate"),
					oSelectedIntervalEnd = this.oClickEventParameters.endDate,
					oEndDate = this.byId("endDate"),
					oDateTimePickerStart = this.byId("startDate"),
					oDateTimePickerEnd =  this.byId("endDate"),
					oAppointmentType = this.byId("isIntervalAppointment"),
					oTitleInput = this.byId("inputTitle"),
					oMoreInfoInput = this.byId("moreInfo"),
					sPersonName,
					oPersonSelected;

				if (this.oClickEventParameters.row){
					sPersonName = this.oClickEventParameters.row.getTitle();
					oPersonSelected = this.byId("selectPerson");

					oPersonSelected.setSelectedIndex(aPeople.indexOf(aPeople.filter(function(oPerson){return  oPerson.name === sPersonName;})[0]));

				}

				oStartDate.setDateValue(oSelectedIntervalStart);

				oEndDate.setDateValue(oSelectedIntervalEnd);

				oTitleInput.setValue("");

				oMoreInfoInput.setValue("");

				oAppointmentType.setSelected(false);

				oDateTimePickerStart.setValueState(ValueState.None);
				oDateTimePickerEnd.setValueState(ValueState.None);

				delete this.oClickEventParameters;
			},

			_setEditAppointmentDialogContent: function(oDialog){
				var oAppointment = oDialog.getModel('calendar').getProperty(this.sPath),
					oSelectedIntervalStart = oAppointment.start,
					oSelectedIntervalEnd = oAppointment.end,
					oDateTimePickerStart = this.byId("startDate"),
					oDateTimePickerEnd = this.byId("endDate"),
					sSelectedInfo = oAppointment.info,
					sSelectedTitle = oAppointment.title,
					iSelectedPersonId = this.sPath[this.sPath.indexOf("/people/") + "/people/".length],
					oPersonSelected = this.byId("selectPerson"),
					oStartDate = this.byId("startDate"),
					oEndDate = this.byId("endDate"),
					oMoreInfoInput = this.byId("moreInfo"),
					oTitleInput = this.byId("inputTitle"),
					oAppointmentType = this.byId("isIntervalAppointment");

				oPersonSelected.setSelectedIndex(iSelectedPersonId);

				oStartDate.setDateValue(oSelectedIntervalStart);

				oEndDate.setDateValue(oSelectedIntervalEnd);

				oMoreInfoInput.setValue(sSelectedInfo);

				oTitleInput.setValue(sSelectedTitle);

				oDateTimePickerStart.setValueState(ValueState.None);
				oDateTimePickerEnd.setValueState(ValueState.None);

				oAppointmentType.setSelected(false);
			},


        });
    });
