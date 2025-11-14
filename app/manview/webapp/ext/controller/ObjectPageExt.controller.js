sap.ui.define([
    'sap/ui/core/mvc/ControllerExtension',
    'sap/m/MessageToast'
], function(ControllerExtension, MessageToast) {
    'use strict';

    return ControllerExtension.extend('yournamespace.ext.controller.ObjectPageExt', {
        
        // Override lifecycle methods (optional)
        override: {
            onInit: function() {
                // Custom initialization logic
            },
            onAfterRendering: function() {
                // Logic after page renders
            }
        },

        // Your custom button handler
        onAddEmployee: function(oEvent) {
            const oContext = this.base.getView().getBindingContext();
            const sManagerName = oContext.getProperty("FullName");
            
            MessageToast.show("Adding employee for: " + sManagerName);
            
            // Your custom logic here
        }
    });
});
