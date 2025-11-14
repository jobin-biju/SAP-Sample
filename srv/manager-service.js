const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {

    const { Salary } = this.entities;

    // =========================
    // Event: uploadData
    // =========================
    this.on("uploadData", async (req) => {
        const { ID, reason } = req.data;
        console.log("📩 uploadData:", ID, reason);
        return `Data received: ID=${ID}, reason=${reason}`;
    });

    // =========================
    // Event: uploadByID
    // =========================
    this.on("uploadByID", async (req) => {
        const { ID } = req.data;
        console.log("📩 uploadByID:", ID);
        return `Received salary record with ID: ${ID}`;
    });

    // =========================
    // After READ hook for Salary
    // =========================
    this.after('READ', Salary, each => {
        switch (each.status) {
            case 'A':
                each.status = 'Approved';
                each.criticality = 3; 
                break;
            case 'R':
                each.status = 'Rejected';
                each.criticality = 1; 
                break;
            case 'P':
                each.status = 'Pending';
                each.criticality = 2; 
                break;
            default:
                each.status = 'Unknown';
                each.criticality = 0;
        }
    });

});
