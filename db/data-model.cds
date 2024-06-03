namespace my.database;

using {
  Country,
  managed
} from '@sap/cds/common';

entity SCountries {
  key code    : String(3); //> ISO 3166-1 alpha-2 codes (or alpha-3)
      name    : String;
      Offices : Association to many Offices
                  on Offices.Country = $self;
}

entity Offices : managed {
  key ID      : Integer;
      Name    : String @mandatory;
      Email   : String;
      Country : Association to SCountries default 'TW';
      Staff   : Association to many Users
                  on Staff.Office = $self;
      Status  : UInt8 enum {
        open   = 0;
        closed = 1;
      } default 0;
}

entity Users : managed {
  key ID             : Integer;
      Forename       : String;
      Surname        : type of Forename;
      Full_name      : String = (
        Forename || ' ' || Surname
      ) stored;
      Email          : String;
      Office         : Association to Offices default 0;
      isManager      : Boolean default false;
      Enabled        : Boolean default true;
}

entity Students : managed {
  key ID                 : Integer;
      Forename           : String @mandatory;
      Surname            : type of Forename;
      Full_name          : String = (
        Forename || ' ' || Surname
      ) stored;
      Gender             : String(2) enum {
        Male                      = 'M';
        Female                    = 'F';
        NotToSay                  = 'NA';
      };
      Office             : Association to Offices;
      Advisor            : Association to Users;
      Planned_study_date : Date;
      CRM_Status         : UInt8 enum {
        CS                        = 1;
        DC                        = 2;
        AP                        = 3;
        FC                        = 4;
        LF                        = 5;
      } default 3;
}
