define([
    "knockout",
    "text!/components/customer-details/customer-details-template.html",
    "customerDoa",
], function (ko, customerTemplate, customerDoa) {
    var customerViewModel = function (params) {
        var self = this;
        self.customerName = ko.observable();
        self.customerCellPhone = ko.observable();
        self.customerEmail = ko.observable();

        self.meterType = ko.observable();
        self.consumptionType = ko.observable();
        self.serialNo = ko.observable();

        async function testicle() {
            return await customerDoa.getCustomerById(1);
        }
        testicle()
            .then((customer) => {
                self.customerName(customer.customerName);
                self.customerCellPhone(customer.customerCellphone);
                self.customerEmail(customer.customerEmail);
                self.meterType(customer.meterType);
                self.consumptionType(customer.consumptionType);
                self.serialNo(customer.serialNo);

                console.log(customer);

            })
            .catch((err) => {
                console.log(err);
            });
    };
    return {
        viewModel: customerViewModel,
        template: customerTemplate,
    };
});