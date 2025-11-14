sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
  "use strict";

  return Controller.extend("ui5sample.controller.dpr", {
    onInit: function () {
      var oJSONModel = new JSONModel();
      this.getView().setModel(oJSONModel, "empModel");

      var oODataModel = this.getOwnerComponent().getModel();

      // 🔹 Important: For OData V4, use 'bindList' or 'requestObject'
      var oBinding = oODataModel.bindList("/Employees");

      oBinding.requestContexts().then(function (aContexts) {
        var aEmployees = aContexts.map(function (oContext) {
          return oContext.getObject();
        });

        oJSONModel.setData({ Employees: aEmployees });
        MessageToast.show("Employees data loaded successfully!");
        console.log("Fetched Employees:", aEmployees);
      }).catch(function (oError) {
        MessageToast.show("Error fetching Employees data!");
        console.error("OData fetch error:", oError);
      });
    }
  });
});
