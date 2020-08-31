define([
    "knockout",
    "text!/components/confirm-details-activity/confirm-details-template.html",
    "customerDoa",
], function (ko, customerTemplate, customerDoa) {
    var customerViewModel = function () {
        var self = this;

        self.customerList = ko.observableArray();

        async function testicle() {
            return await customerDoa.getAllCustomers();
        }
        testicle()
            .then((customers) => {
                //TODO: revist this, does not apply to large array
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