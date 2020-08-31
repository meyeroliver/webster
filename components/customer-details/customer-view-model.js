define([
    "knockout",
    "text!/components/customer-details/customer-details-template.html",
    "customerDoa",
], function (ko, customerTemplate, customerDoa) {
    var customerViewModel = function (params) {
        var self = this;

        /* self.customerName = ko.observable();
        self.customerCellPhone = ko.observable();
        self.customerEmail = ko.observable();
        self.meterList = ko.observableArray() */
        self.customerList = ko.observableArray();

        async function testicle() {
            return await customerDoa.getAllCustomers();
        }
        testicle()
            .then((customers) => {
                // self.customerName(customer.name);
                // self.customerCellPhone(customer.cellphone);
                // self.customerEmail(customer.email);
                //TODO: revist this, does not apply to large array
                //  self.meterList.push.apply(self.meterList, customer.meterList)
                //self.meterList.push(customer.meterList[1])
                self.customerList.push.apply(self.customerList, customers)
                console.log(self.customerList())
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