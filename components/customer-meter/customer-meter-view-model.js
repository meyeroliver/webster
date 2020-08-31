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
        self.meter = params.meter
    }
    return {
        viewModel: customerMeterViewModel,
        template: customerMeterTemplate,
    };
})