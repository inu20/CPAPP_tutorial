using my.database as db from '../db/data-model';

service GlobalService @(path: '/global') {
  @readonly
  entity Offices         as
    select
      *,
      Country.name as Country_Name

    from db.Offices;

  entity Users           as projection on db.Users;

  @readonly
  entity SCountries      as projection on db.SCountries;

  entity OfficeCountries as
    select distinct
            SCountries.code,
            SCountries.name

    from SCountries
    where
      Offices.ID is not null;

  entity OfficeManagers  as
    select
      Users.ID,
      Users.Full_name,
      Users.isManager,
      Users.Office.ID           as Office_ID,
      Users.Office.Name         as Office_Name,
      Users.Office.Email        as Office_Email,
      Users.Office.Country.code as Country_Code,
      Users.Office.Country_Name

    from Users
    where Users.isManager = true;


  entity Students        as
    select from db.Students {
      *
    }
    excluding {
      Password
    };
}

@protocol: 'rest'
service AdminService @(path: '/admin') {
  @open
  type object {};

  // action CREATE_NewUser(req: object) returns object;
  action CREATE_NewUser(Forename : String, Surname : String, Email : String, Office_ID : Integer, Status : Integer) returns object;
  action UPDATE_User(User : object)                                                                                 returns object;
  action DELETE_User(ID : object)                                                                                   returns object;
  action UPDATE_Student_CRM_Status(ID : Integer, Status : Integer)                                                  returns object;

}
