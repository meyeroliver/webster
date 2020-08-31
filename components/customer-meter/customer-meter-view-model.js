define([
    "knockout",
    "text!/components/customer-meter/customer-meter-template.html",
], function (ko, customerMeterTemplate) {

    var customerMeterViewModel = function (params) {
        var self = this;
        /**
         * TODO:create a meter and a customer object, extract meter [object] from customer 
         * TODO: make sure meterList is observable
         */
        self.meterList = params.meterList

        /* self.meterType = ko.observable();
        self.consumptionType = ko.observable();
        self.serialNo = ko.observable();
        self.test = ko.computed(function () {
            var tempMeterList = self.meterList()
            if (tempMeterList.length != 0) {
                self.meterType(tempMeterList[1].meterType)
                self.consumptionType(tempMeterList[1].consumptionType)
                self.serialNo(tempMeterList[1].serialNo)
            }

        }, self.meterList) */

    }
    return {
        viewModel: customerMeterViewModel,
        template: customerMeterTemplate,
    };
})