using {
  Currency,
  managed,
  cuid,
  sap
} from '@sap/cds/common';

namespace sap.capire.bookshop;

entity Books : managed, cuid {
  title    : localized String(111)  @mandatory;
  descr    : localized String(1111);
  author   : Association to Authors @mandatory;
  genre    : Association to Genres;
  stock    : Integer;
  price    : Decimal;
  currency : Currency;
}

entity Authors : managed, cuid {
  name         : String(111) @mandatory;
  dateOfBirth  : Date;
  dateOfDeath  : Date;
  placeOfBirth : String;
  placeOfDeath : String;
  books        : Association to many Books
                   on books.author = $self;
}

/** Hierarchically organized Code List for Genres */
entity Genres : sap.common.CodeList {
  key ID       : Integer;
      parent   : Association to Genres;
      children : Composition of many Genres
                   on children.parent = $self;
}

// entity Managers : managed, cuid {
//   name       : String(50) @mandatory;
//   age        : Integer;
//   phone      : String(10);
//   department : String(50);
//   employees  : Composition of many Employees on employees.manager = $self;
// }

// entity Employees : managed, cuid{
//   empname : String(50)@mandatory;
//   age : Integer;
//   phone: String(10);
//   manager : Association to Managers

// }

entity Managers : managed, cuid {
  name       : String(50);
  age        : Integer;
  phone      : String(10);
  department : String(50);
  employees  : Association to many Employees
                 on employees.manager = $self;
}

entity Employees : managed, cuid {
  empname  : String(50);
  age      : Integer;
  phone    : String(10);
  manager  : Association to Managers;
  salaries : Association to many Salary
               on salaries.employee = $self;
}

entity Salary : managed, cuid {
  salary      : Integer;
  salarydate  : Date;
  employee    : Association to Employees;
  manager     : Association to Managers;
  status      : String(10);
  criticality : Integer

}

entity Status : managed, cuid {
  status1 : String(1);
  status2 : String(1);
  status3 : String(1);
}
