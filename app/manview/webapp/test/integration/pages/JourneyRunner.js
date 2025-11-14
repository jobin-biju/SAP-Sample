sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"manview/test/integration/pages/ManagersList",
	"manview/test/integration/pages/ManagersObjectPage"
], function (JourneyRunner, ManagersList, ManagersObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('manview') + '/test/flp.html#app-preview',
        pages: {
			onTheManagersList: ManagersList,
			onTheManagersObjectPage: ManagersObjectPage
        },
        async: true
    });

    return runner;
});

