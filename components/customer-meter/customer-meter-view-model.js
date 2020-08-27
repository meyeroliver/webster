define([
    "knockout",
    "text!/components/customer-meter/customer-meter-template.html",
    "customerDoa",
], function (ko, customerMeterTemplate, customerDoa) {

    var customerMeterViewModel = function (params) {
        var self = this;
        /* TODO create a meter and a customer object, extract meter [object] from customer */
        self.customer = ko.observable(params.customer);
        //console.log(self.customer())
        self.meterType = ko.observable();
        self.consumptionType = ko.observable();
        self.serialNo = ko.observable();
        async function testicle() {
            return await customerDoa.getCustomerById(1);
        }
        testicle()
            .then((customer) => {
                self.meterType(customer.meterType);
                self.consumptionType(customer.consumptionType);
                self.serialNo(customer.serialNo);

                console.log(customer);

            })
            .catch((err) => {
                console.log(err);
            });


        /*  self.meterType = ko.observable();
         self.consumptionType = ko.observable();
         self.serialNo = ko.observable();
         console.log(self.customer()) */
    }
    return {
        viewModel: customerMeterViewModel,
        template: customerMeterTemplate,
    };
})