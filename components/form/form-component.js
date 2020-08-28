define(['knockout', 'text!/components/form/form-template.html', 'customerDoa'],
    function (ko, formTemplate, customerDoa) {

        var userDetailsViewModel = function () {

            /**
             * Text Input
             */
            var self = this

            self.customer = {
                name: ko.observable(),
                surname: ko.observable(),
                cellphone: ko.observable(),
                email: ko.observable(),
                address: ko.observable(),
                standNo: ko.observable(),
                accountNo: ko.observable(),
                billingAddress1: ko.observable(),
                billingAddress2: ko.observable(),
                billingAddress3: ko.observable(),
                postalCode: ko.observable(),
                //O vat number
                tenant: {
                    name: ko.observable(),
                    surname: ko.observable(),
                    cellphone: ko.observable(),
                    email: ko.observable(),
                },
            }

            /**
             * Checkbox
             */
            this.hasTenant = ko.observable()
            /**
             * TODO
             * -> Check a bit deeper into subscribers maybe for validations
             */
            this.showTenantContainer = ko.computed(function () {
                return this.hasTenant()
            }, this)

            /**
             * IndexedDB
             */
            saveFormData = async function () {

                let dbCustomer = {
                    name: self.customer.name(),
                    surname: self.customer.surname(),
                    cellphone: self.customer.cellphone(),
                    email: self.customer.email(),
                    accountNo: self.customer.accountNo(),
                    standNo: self.customer.standNo(),
                    standDescription: self.customer.address(),
                    billingAddress1: self.customer.billingAddress1(),
                    billingAddress2: self.customer.billingAddress2(),
                    billingAddress3: self.customer.billingAddress3(),
                    postalCode: self.customer.postalCode(),
                    tenant: {
                        name: self.customer.tenant.name(),
                        surname: self.customer.tenant.surname(),
                        cellNumber: self.customer.tenant.cellphone(),
                        email: self.customer.tenant.email(),
                    },
                    meterList: []

                };
                await customerDoa.insertCustomer(dbCustomer)
            }
        }
        return {
            viewModel: userDetailsViewModel,
            template: formTemplate
        }
    })