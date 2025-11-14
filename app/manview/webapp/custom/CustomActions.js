// sap.ui.define([
//     "sap/ui/core/BusyIndicator",
//     "sap/m/MessageToast",
//     "sap/m/MessageBox"
// ], function (BusyIndicator, MessageToast, MessageBox) {
//     "use strict";

//     return {

//         // ===== GET Salary Data =====
//         view: function () {
//             BusyIndicator.show(100);

//             $.ajax({
//                 url: "/odata/v4/manager/Salary",
//                 type: "GET",
//                 dataType: "json",
//                 success: function (data) {
//                     BusyIndicator.hide();
//                     console.log("Fetched Data:", data.value);
//                     MessageToast.show("Data fetched successfully!");
//                 },
//                 error: function (xhr, status, error) {
//                     BusyIndicator.hide();
//                     console.error("GET Error:", error);
//                     MessageToast.show("Failed to fetch data.");
//                 }
//             });
//         },

//         // ===== POST (CAP Action) =====
//         postData: function () {
//             BusyIndicator.show(100);

//             const payload = {
//                 ID: "1154ab",
//                 reason: "hello"
//             };

//             $.ajax({
//                 url: "/odata/v4/manager/uploadData",
//                 type: "POST",
//                 contentType: "application/json",
//                 data: JSON.stringify(payload),
//                 success: function (response) {
//                     BusyIndicator.hide();
//                     console.log("POST Response:", response);
//                     MessageBox.success(response.value || "Data uploaded successfully!");
//                 },
//                 error: function (xhr, status, error) {
//                     BusyIndicator.hide();
//                     console.error("POST Error:", error);
//                     MessageBox.error("Failed to upload data: " + error);
//                 }
//             });
//         }
//     };
// });


sap.ui.define([
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/List",
    "sap/m/StandardListItem"
], function (BusyIndicator, MessageToast, MessageBox, Dialog, Button, List, StandardListItem) {
    "use strict";

    return {

        // ========================
        // 1️⃣  GET Salary Data
        // ========================
            view: function () {
                BusyIndicator.show(100);

                $.ajax({
                    url: "/odata/v4/manager/Salary",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        BusyIndicator.hide();
                        console.log("Fetched Salary Data:", data.value);
                        MessageToast.show("✅ Data fetched successfully!");
                    },
                    error: function (xhr, status, error) {
                        BusyIndicator.hide();
                        console.error("GET Error:", error);
                        MessageToast.show("❌ Failed to fetch data.");
                    }
                });
            },

        // ========================
        // 2️⃣  POST Data (uploadData Action)
        // ========================
        postData: function () {
            BusyIndicator.show(100);

            const payload = {
                ID: "1154ab",
                reason: "Testing data upload from UI"
            };

            $.ajax({
                url: "/odata/v4/manager/uploadData",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(payload),
                success: function (response) {
                    BusyIndicator.hide();
                    console.log("POST Response:", response);
                    MessageBox.success(response.value || "✅ Data uploaded successfully!");
                },
                error: function (xhr, status, error) {
                    BusyIndicator.hide();
                    console.error("POST Error:", error);
                    MessageBox.error("❌ Failed to upload data: " + error);
                }
            });
        },

        // ========================
        // 3️⃣  SHOW DATA IN DIALOGUE (Sorted Ascending)
        // ========================
        dialogue: function () {
    BusyIndicator.show(100);

    $.ajax({
        url: "/odata/v4/manager/Salary",
        type: "GET",
        dataType: "json",
        success: function (data) {
            BusyIndicator.hide();

            // Sort salaries ascending
            const sortedData = data.value.sort((a, b) => a.salary - b.salary);

            // Create JSON model
            const oModel = new sap.ui.model.json.JSONModel({
                Salaries: sortedData
            });

            // 🟡 Toolbar with salary + date filter
            const oToolbar = new sap.m.Toolbar({
                content: [
                    new sap.m.Label({ text: "Filter by Minimum Salary:" }),
                    new sap.m.Input({
                        id: "minSalaryInput",
                        type: "Number",
                        width: "120px",
                        placeholder: "e.g. 30000"
                    }),
                    new sap.m.ToolbarSeparator(),
                    new sap.m.Label({ text: "Filter by Date (≥):" }),
                    new sap.m.DatePicker({
                        id: "filterDateInput",
                        width: "160px",
                        placeholder: "Select Date"
                    }),
                    new sap.m.ToolbarSpacer(),
                    new sap.m.Button({
                        text: "Apply Filter",
                        icon: "sap-icon://filter",
                        type: "Emphasized",
                        press: function () {
                            const minSalary = parseFloat(
                                sap.ui.getCore().byId("minSalaryInput").getValue()
                            );
                            const selectedDate = sap.ui
                                .getCore()
                                .byId("filterDateInput")
                                .getDateValue();

                            // Apply filter
                            let filteredData = sortedData;

                            if (!isNaN(minSalary)) {
                                filteredData = filteredData.filter(
                                    (item) => item.salary >= minSalary
                                );
                            }

                            if (selectedDate) {
                                filteredData = filteredData.filter((item) => {
                                    const itemDate = new Date(item.salarydate);
                                    return itemDate >= selectedDate;
                                });
                            }

                            oModel.setData({ Salaries: filteredData });

                            sap.m.MessageToast.show(
                                `Showing ${
                                    filteredData.length
                                } record(s) based on filters.`
                            );
                        }
                    }),
                    new sap.m.Button({
                        text: "Reset",
                        icon: "sap-icon://refresh",
                        press: function () {
                            sap.ui.getCore().byId("minSalaryInput").setValue("");
                            sap.ui.getCore().byId("filterDateInput").setValue("");
                            oModel.setData({ Salaries: sortedData });
                            sap.m.MessageToast.show("Filters reset – showing all records.");
                        }
                    })
                ]
            });

            // 🧾 Create Table
            const oTable = new sap.m.Table({
                headerText: "Employee Salaries (Ascending Order)",
                columns: [
                    new sap.m.Column({ header: new sap.m.Label({ text: "Salary Date" }) }),
                    new sap.m.Column({ header: new sap.m.Label({ text: "Salary (₹)" }) })
                ]
            });

            // Bind items
            oTable.bindItems({
                path: "/Salaries",
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({
                            text: {
                                path: "salarydate",
                                formatter: function (v) {
                                    return new Date(v).toLocaleDateString();
                                }
                            }
                        }),
                        new sap.m.Text({
                            text: {
                                path: "salary",
                                formatter: function (v) {
                                    return "₹" + v.toLocaleString();
                                }
                            }
                        })
                    ]
                })
            });

            // 🪟 Dialog
            const oDialog = new sap.m.Dialog({
                title: "Sorted Salary Data",
                contentWidth: "600px",
                contentHeight: "auto",
                resizable: true,
                draggable: true,
                content: [oToolbar, oTable],
                buttons: [
                    new sap.m.Button({
                        text: "Submit First ID",
                        type: "Emphasized",
                        press: function () {
                            const data = oModel.getData().Salaries;
                            if (data.length === 0) {
                                sap.m.MessageToast.show("No salary data available!");
                                return;
                            }

                            const firstID = data[0].ID;
                            BusyIndicator.show(100);

                            $.ajax({
                                url: "/odata/v4/manager/uploadByID",
                                type: "POST",
                                contentType: "application/json",
                                data: JSON.stringify({ ID: firstID }),
                                success: function (response) {
                                    BusyIndicator.hide();
                                    sap.m.MessageBox.success(
                                        `✅ Lowest salary record submitted!\nSubmitted ID: ${firstID}`
                                    );
                                    oDialog.close();
                                },
                                error: function (xhr, status, error) {
                                    BusyIndicator.hide();
                                    sap.m.MessageBox.error(
                                        "❌ Failed to submit data: " + error
                                    );
                                }
                            });
                        }
                    }),
                    new sap.m.Button({
                        text: "Close",
                        press: function () {
                            oDialog.close();
                        }
                    })
                ],
                afterClose: function () {
                    oDialog.destroy();
                }
            });

            oDialog.setModel(oModel);
            oDialog.open();
        },
        error: function (xhr, status, error) {
            BusyIndicator.hide();
            console.error("GET Error:", error);
            sap.m.MessageToast.show("❌ Failed to fetch salary data.");
        }
    });
},
addemployee: function (oEvent, oExtensionAPI) {
            try {
                // --- SAFE CONTEXT FETCH ---
                const oBindingContext =
                    oExtensionAPI.getView().getBindingContext() ||
                    oEvent.getSource().getBindingContext();

                if (!oBindingContext) {
                    MessageToast.show("No manager context found.");
                    return;
                }

                const oManager = oBindingContext.getObject();

                // --- BUILD CONTENT ---
                const oVBox = new VBox({
                    items: [
                        new Text({ text: "Full Name: " + (oManager.name || "") }),
                        new Text({ text: "Department: " + (oManager.department || "") }),
                        new Text({ text: "Age: " + (oManager.age || "") }),
                        new Text({ text: "Phone: " + (oManager.phone || "") }),
                        new Text({
                            text: "Employees under manager: " +
                                ((oManager.employees && oManager.employees.length) || 0)
                        })
                    ]
                }).addStyleClass("sapUiSmallMargin");

                // --- CREATE POPOVER ---
                const oPopover = new Popover({
                    title: "Manager Details",
                    contentWidth: "300px",
                    content: oVBox,
                    placement: "Auto",
                    showHeader: true
                });

                // --- OPEN NEXT TO BUTTON ---
                oPopover.openBy(oEvent.getSource());
            } catch (e) {
                console.error(e);
                MessageToast.show("Error opening popover: " + e.message);
            }
        }



    };
});
