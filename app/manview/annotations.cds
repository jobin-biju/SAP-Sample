// using ManagerService as service from '../../srv/manager-service';
// annotate service.Managers with @(
//     UI.FieldGroup #GeneratedGroup : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'name',
//                 Value : name,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'age',
//                 Value : age,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'phone',
//                 Value : phone,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'department',
//                 Value : department,
//             },
//         ],
//     },
//     UI.Facets : [
//         {
//             $Type : 'UI.ReferenceFacet',
//             ID : 'GeneratedFacet1',
//             Label : 'General Information',
//             Target : '@UI.FieldGroup#GeneratedGroup',
//         },
//     ],
//     UI.LineItem : [
//         {
//             $Type : 'UI.DataField',
//             Label : 'name',
//             Value : name,
//         },
//         {
//             $Type : 'UI.DataField',
//             Label : 'age',
//             Value : age,
//         },
//         {
//             $Type : 'UI.DataField',
//             Label : 'phone',
//             Value : phone,
//         },
//         {
//             $Type : 'UI.DataField',
//             Label : 'department',
//             Value : department,
//         },
//     ],
// );

using ManagerService as service from '../../srv/manager-service';

// =============================
// MANAGERS ANNOTATIONS
// =============================
annotate service.Managers with @(
    UI.HeaderInfo : {
        TypeName       : 'Manager',
        TypeNamePlural : 'Managers',
        Title          : { $Type : 'UI.DataField', Value : name },
        Description    : { $Type : 'UI.DataField', Value : department }
    },

    UI.Facets : [
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'Overview',
            Label  : 'Manager Overview',
            Target : '@UI.FieldGroup#MainInfo'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'ContactDetails',
            Label  : 'Contact Details',
            Target : '@UI.FieldGroup#Contact'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'EmployeeList',
            Label  : 'Employees Under Manager',
            Target : 'employees/@UI.LineItem'
        }
    ],

    UI.FieldGroup #MainInfo : {
        $Type : 'UI.FieldGroupType',
        Label : 'General Information',
        Data  : [
            { $Type : 'UI.DataField', Label : 'Full Name', Value : name },
            { $Type : 'UI.DataField', Label : 'Department', Value : department },
            { $Type : 'UI.DataField', Label : 'Age', Value : age }
        ]
    },

    UI.FieldGroup #Contact : {
        $Type : 'UI.FieldGroupType',
        Label : 'Contact Information',
        Data  : [
            { $Type : 'UI.DataField', Label : 'Phone Number', Value : phone }
        ]
    },

    UI.LineItem : [
        { $Type : 'UI.DataField', Label : 'Manager Name', Value : name, Width : '10rem' },
        { $Type : 'UI.DataField', Label : 'Department', Value : department, Width : '10rem' },
        { $Type : 'UI.DataField', Label : 'Age', Value : age, Width : '10rem' },
        { $Type : 'UI.DataField', Label : 'Phone', Value : phone, Width : '10rem' }
    ],

    UI.SelectionFields : [ name, department, phone, age ]
);


// =============================
// EMPLOYEES ANNOTATIONS
// =============================
annotate service.Employees with @(
    UI.HeaderInfo : {
        TypeName       : 'Employee',
        TypeNamePlural : 'Employees',
        Title          : { $Type : 'UI.DataField', Value : empname },
        Description    : { $Type : 'UI.DataField', Label : 'Managers', Value : manager.name }

    }, 

    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneralInfo',
            Label : 'Employee Details',
            Target: '@UI.FieldGroup#GeneralInfo'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'SalaryDetails',
            Label : 'Salary Details',
            Target: 'salaries/@UI.LineItem'
        }
    ],

    UI.FieldGroup #GeneralInfo : {
        $Type : 'UI.FieldGroupType',
        Label : 'Employee Information',
        Data  : [
            { $Type : 'UI.DataField', Label : 'Name', Value : empname },
            { $Type : 'UI.DataField', Label : 'Age', Value : age },
            { $Type : 'UI.DataField', Label : 'Phone', Value : phone },
            { $Type : 'UI.DataField', Label : 'Manager', Value : manager.name }
        ]
    },

    UI.LineItem : [
        { $Type : 'UI.DataField', Label : 'Employee Name', Value : empname },
        { $Type : 'UI.DataField', Label : 'Age', Value : age },
        { $Type : 'UI.DataField', Label : 'Phone', Value : phone },
        { $Type : 'UI.DataField', Label : 'Manager', Value : manager.name }
    ],

    UI.SelectionFields : [ empname, manager ]
);


// =============================
// EMPLOYEE SALARY ANNOTATIONS
// =============================
annotate service.Salary with @(
    UI.HeaderInfo : {
        TypeName       : 'Salary Record',
        TypeNamePlural : 'Employee Salaries',
        Title          : { $Type : 'UI.DataField', Value : employee.empname },
        Description    : { $Type : 'UI.DataField', Value : salarydate }
    },

    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'SalaryInfo',
            Label : 'Salary Information',
            Target: '@UI.FieldGroup#SalaryInfo'
        }
    ],

    UI.FieldGroup #SalaryInfo : {
        $Type : 'UI.FieldGroupType',
        Label : 'Salary Details',
        Data  : [
            { $Type : 'UI.DataField', Label : 'Employee Name', Value : employee.empname },
            { $Type : 'UI.DataField', Label : 'Salary Amount', Value : salary },
            { $Type : 'UI.DataField', Label : 'Salary Date', Value : salarydate },
            { 
                $Type : 'UI.DataFieldForAnnotation',
                Label : 'Status',
                Target : '@UI.DataPoint#Status'
            }
        ]
    },

    UI.DataPoint #Status : {
        Value : status,
        Criticality : criticality
    },

    // Displayed in salary table (List)
    UI.LineItem : [
        { $Type : 'UI.DataField', Label : 'Employee', Value : employee.empname },
        { $Type : 'UI.DataField', Label : 'Salary', Value : salary },
        { $Type : 'UI.DataField', Label : 'Date', Value : salarydate },
        { 
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : status,
            Criticality : criticality
        }
    ],

    UI.SelectionFields : [ employee, salarydate, status ]
);
