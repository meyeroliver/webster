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
        self.meterList = ko.observableArray()

        async function testicle() {
            return await customerDoa.getCustomerById(1);
        }
        testicle()
            .then((customer) => {
                self.customerName(customer.name);
                self.customerCellPhone(customer.cellphone);
                self.customerEmail(customer.email);
                //TODO: revist this, does not apply to large array
                self.meterList.push.apply(self.meterList, customer.meterList)
                //self.meterList.push(customer.meterList[1])

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