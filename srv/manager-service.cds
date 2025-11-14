using {sap.capire.bookshop as my} from '../db/schema';

service ManagerService {
    entity Managers  as projection on my.Managers;
    entity Employees as projection on my.Employees;
    entity Salary    as projection on my.Salary;
    entity Status    as projection on my.Status;
    action uploadData(ID: String, reason: String(120)) returns String;
    action uploadByID(ID: String)                      returns String;
}
