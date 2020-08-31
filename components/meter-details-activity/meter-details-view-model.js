define([
    "knockout",
    "text!/components/meter-details-activity/meter-details-template.html",
    "customerDoa",
], function (ko, customerTemplate, customerDoa) {
    var customerViewModel = function () {
        var self = this;

        self.meterFormList = ko.observableArray()
        self.meter = {
            takeImage: ko.observable(true),
            meterType: ko.observable(),
            consumptionType: ko.observable(),
            serialNo: ko.observable(),
        }
        self.meterFormList.push(self.meter)

        self.testicle = ko.computed(function () {
            console.log(self.meterFormList())
        }, this)
        /* self.customerList = ko.observableArray();

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
            }); */
    };
    return {
        viewModel: customerViewModel,
        template: customerTemplate,
    };
});