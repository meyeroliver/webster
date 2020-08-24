define(['knockout', 'captureDB'], function (ko, dbConn) {
    
    var custumerDoa = {
        insert: function(data) {
            let db = dbConn.result;
                // continue to work with database using db object

                var transaction = db.transaction('customers', 'readwrite')
                var customersStore = transaction.objectStore('customers')

                /* let mockCustomer = {
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

                }; */

                let transRequest = customersStore.put(data); // (3)

                transRequest.onsuccess = function () { // (4)
                    console.log("A customer was added to the objectStore [Table]", transRequest);
                };

                transRequest.onerror = function () {
                    console.log("Error", transRequest.error.message);
                };

                transaction.oncomplete = function () {
                    console.log("closing connection to database")
                    //db.close();
                }
        }
    }
    
    return custumerDoa;
})