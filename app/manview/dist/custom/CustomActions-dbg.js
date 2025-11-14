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

                    // Create formatted list
                    const oList = new List({
                        headerText: "Employee Salaries (Ascending Order)",
                        items: sortedData.map(item => new StandardListItem({
                            title: "📅 Date: " + new Date(item.salarydate).toLocaleDateString(),
                            description: "💰 Salary: ₹" + item.salary.toLocaleString()
                        }))
                    });

                    // Create dialog
                    const oDialog = new Dialog({
                        title: "Sorted Salary Data",
                        content: [oList],
                        beginButton: new Button({
                            text: "Submit First ID",
                            type: "Emphasized",
                            press: function () {
                                if (sortedData.length === 0) {
                                    MessageToast.show("No salary data available!");
                                    return;
                                }

                                const firstID = sortedData[0].ID;
                                BusyIndicator.show(100);

                                // Send first ID to CAP backend (uploadByID action)
                                $.ajax({
                                    url: "/odata/v4/manager/uploadByID",
                                    type: "POST",
                                    contentType: "application/json",
                                    data: JSON.stringify({ ID: firstID }),
                                    success: function (response) {
                                        BusyIndicator.hide();
                                        console.log("UploadByID Response:", response);
                                        MessageBox.success(
                                            `✅ Lowest salary record submitted successfully!\n\nSubmitted ID: ${firstID}`
                                        );
                                        oDialog.close();
                                    },
                                    error: function (xhr, status, error) {
                                        BusyIndicator.hide();
                                        console.error("POST Error:", error);
                                        MessageBox.error("❌ Failed to submit data: " + error);
                                    }
                                });
                            }
                        }),
                        endButton: new Button({
                            text: "Close",
                            press: function () {
                                oDialog.close();
                            }
                        }),
                        afterClose: function () {
                            oDialog.destroy();
                        }
                    });

                    oDialog.open();
                },
                error: function (xhr, status, error) {
                    BusyIndicator.hide();
                    console.error("GET Error:", error);
                    MessageToast.show("❌ Failed to fetch salary data.");
                }
            });
        }
    };
});
