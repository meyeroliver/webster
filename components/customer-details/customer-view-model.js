define([
    "knockout",
    "text!/components/customer-details/customer-details-template.html",
    "customerDoa",
], function (ko, customerTemplate, customerDoa) {
    var customerViewModel = function (params) {
        var self = this;
        self.customerName = ko.observable("awe")

        async function testicle() {
            return await customerDoa
                .promiseGetCustomerById(1)
                .then((data) => {
                    console.log(data);
                    self.customerName(data.customerName)
                    return data;
                }).then((data) => {
                    self.customer(data)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        testicle()

    }
    return {
        viewModel: customerViewModel,
        template: customerTemplate
    }
})