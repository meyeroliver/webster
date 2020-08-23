define(['knockout', 'text!/components/form/form-template.html'], function (ko, formTemplate) {


    /**
     * TODO
     * - check the best way to do this
     * - it should on first page,
     * - will need to restrict pages insupport of getting db set up
     */
    (function () {
        'use strict';

        //check for support
        if (!('indexedDB' in window)) {
            alert('This browser doesn\'t support IndexedDB')
            console.log('This browser doesn\'t support IndexedDB');
            return;
        }

        let openRequest = indexedDB.open('legit-it-db', 1);

        openRequest.onupgradeneeded = function () {
            // triggers if the client had no database
            // ...perform initialization...
            console.log('Upgraded needed!')
            let db = openRequest.result;
            if (!db.objectStoreNames.contains('customers')) {
                //creating customers object store [table]
                var customersStore = db.createObjectStore('customers', {
                    keyPath: 'cID'
                })

                // define indexes to do searches on
                customersStore.createIndex("cID", "cID", {
                    unique: true
                });

                customersStore.createIndex("cellphone", "cellphone", {
                    unique: true
                });

                customersStore.createIndex("address", "address", {
                    unique: true
                });
            }
        };

        openRequest.onerror = function () {
            console.error("Error", openRequest.error);
        };

        openRequest.onsuccess = function () {
            let db = openRequest.result;
            console.log('successfully open db')

            // continue to work with database using db object

            var transaction = db.transaction('customers', 'readwrite')
            var customersStore = transaction.objectStore('customers')

            let mockCustomer = {
                cID: 2,
                name: 'awwe',
                surname: 'soulo',
                cellphone: '0000000001',
                email: 'fake1.email@gmial.com'
            };

            let transRequest = customersStore.put(mockCustomer); // (3)

            transRequest.onsuccess = function () { // (4)
                console.log("A customer was added to the objectStore [Table]", transRequest.result);
            };

            transRequest.onerror = function () {
                console.log("Error", transRequest.error.message);
            };

            transaction.oncomplete = function () {
                console.log("closing connection to database")
                db.close();
            }
        };

    })();

    var userDetailsViewModel = function (params) {
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
        this.tenantName = ko.observable(params.tenantName)
        this.tenantSurname = ko.observable(params.tenantSurname)
        this.tenantCellphone = ko.observable(params.tenantCellphone)
        this.tenantEmail = ko.observable(params.tenantEmail)


        this.hasTenant = ko.observable()
        /**
         * TODO
         * -> Check a bit deeper into subscribers
         */

        this.showTenantContainer = ko.computed(function () {

            return this.hasTenant()
        }, this)
    }
    return {
        viewModel: userDetailsViewModel,
        template: formTemplate
    }
})