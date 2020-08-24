define(['knockout', 'text!/components/form/form-template.html', 'customerDoa'],
    function (ko, formTemplate, customerDoa) {

        var userDetailsViewModel = function (params) {

            /**
             * Text Input
             */

            this.firstname = ko.observable(params.firstname)
            this.lastname = ko.observable(params.lastname)
            this.cellphone = ko.observable(params.cellphone)
            this.email = ko.observable(params.email)
            this.address = ko.observable(params.address)
            this.standNo = ko.observable(params.standNo)
            this.accountNo = ko.observable(params.accountNo)
            this.billingAddress1 = ko.observable(params.billingAddress1)
            this.billingAddress2 = ko.observable(params.billingAddress2)
            this.billingAddress3 = ko.observable(params.billingAddress3)
            this.postalCode = ko.observable(params.postalCode)
            //TODO vat number
            this.tenantName = ko.observable(params.tenantName)
            this.tenantSurname = ko.observable(params.tenantSurname)
            this.tenantCellphone = ko.observable(params.tenantCellphone)
            this.tenantEmail = ko.observable(params.tenantEmail)
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
            saveFormData = function () {
                console.log('awe, I have been clicked')
                
                let mockCustomer = {
                    cID: Math.floor(100 * Math.random()),
                    customerName: this.firstname(),
                    customerSurname: this.lastname(),
                    customerCellphone: this.cellphone(),
                    customerEmail: this.email(),
                    accountNumber: this.accountNo(),
                    standNumber: this.standNo(),
                    standDescription: this.address(),
                    billingAddress1: this.billingAddress1(),
                    billingAddress2: this.billingAddress2(),
                    billingAddress3: this.billingAddress3(),
                    postalCode: this.postalCode(),
                    vatNo: 100 * Math.random(),
                    tenantName: this.tenantName(),
                    tenantSurname: this.tenantSurname(),
                    tenantCellNumber: this.tenantCellphone(),
                    tenantEmail: this.tenantEmail(),

                };

                
                customerDoa.insert(mockCustomer)
                /* let db = dbConn.result;
                // continue to work with database using db object

                var transaction = db.transaction('customers', 'readwrite')
                var customersStore = transaction.objectStore('customers')

                let mockCustomer = {
                    cID: Math.floor(100 * Math.random()),
                    customerName: this.firstname(),
                    customerSurname: this.lastname(),
                    customerCellphone: this.cellphone(),
                    customerEmail: this.email(),
                    accountNumber: this.accountNo(),
                    standNumber: this.standNo(),
                    standDescription: this.address(),
                    billingAddress1: this.billingAddress1(),
                    billingAddress2: this.billingAddress2(),
                    billingAddress3: this.billingAddress3(),
                    postalCode: this.postalCode(),
                    vatNo: 100 * Math.random(),
                    tenantName: this.tenantName(),
                    tenantSurname: this.tenantSurname(),
                    tenantCellNumber: this.tenantCellphone(),
                    tenantEmail: this.tenantEmail(),

                };

                let transRequest = customersStore.put(mockCustomer); // (3)

                transRequest.onsuccess = function () { // (4)
                    console.log("A customer was added to the objectStore [Table]", transRequest);
                };

                transRequest.onerror = function () {
                    console.log("Error", transRequest.error.message);
                };

                transaction.oncomplete = function () {
                    console.log("closing connection to database")
                    //db.close();
                } */

            }
        }
        return {
            viewModel: userDetailsViewModel,
            template: formTemplate
        }
    })