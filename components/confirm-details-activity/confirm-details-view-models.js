define([
    "knockout",
    "text!/components/confirm-details-activity/confirm-details-template.html",
    "customerDoa",
], function (ko, customerTemplate, customerDoa) {
    var customerViewModel = function (params) {
        var self = this;

        self.customerList = ko.observableArray();
        self.pager = params.pager


        ko.computed(function () {
            if (self.pager() == 2) {
                console.log(self.pager())
                if (self.customerList().length == 0)
                    testicle()
                    .then((customers) => {
                        console.log(customers)
                        //TODO: get customer by Id
                        self.customerList.push.apply(self.customerList, customers.slice(-1))
                        console.log(self.customerList())
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

        }, this)

        async function testicle() {
            return await customerDoa.getAllCustomers();
        }


    };
    return {
        viewModel: customerViewModel,
        template: customerTemplate,
    };
});