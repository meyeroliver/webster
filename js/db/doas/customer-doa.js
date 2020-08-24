define(['knockout', 'captureDB'], function (ko, dbConn) {
    
    //TODO: return something that can be used as a reference for later
    //TODO: convert to promise base
    var custumerDoa = {
        insert: function(data) {
            let db = dbConn.result
            var transaction = db.transaction('customers', 'readwrite')
            var customersStore = transaction.objectStore('customers')

            let transRequest = customersStore.add(data); // (3)

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
        },
        updateByCustomerId: function(cID, data) {
            console.log('this will be use to update the customer');
        }
        ,
        getCustomerById: function(cID) {
            let db = dbConn.result;

                var transaction = db.transaction('customers', 'readonly')
                var customersStore = transaction.objectStore('customers')

                let transRequest = customersStore.get(cID); // (3)

                transRequest.onsuccess = function () { // (4)
                    console.log(transRequest.result);
                };

                transRequest.onerror = function () {
                    console.log("Error", transRequest.error.message);
                };

                transaction.oncomplete = function () {
                    console.log("closing connection to database")
                    //db.close();
                }
        },
        getAllCustomers: function() {
            let db = dbConn.result;

                var transaction = db.transaction('customers', 'readonly')
                var customersStore = transaction.objectStore('customers')
                //todo : use queries on the get all, eg ready-for-upload
                let transRequest = customersStore.getAll(); // (3)

                transRequest.onsuccess = function () { // (4)
                    console.log(transRequest.result);
                };

                transRequest.onerror = function () {
                    console.log("Error", transRequest.error.message);
                };

                transaction.oncomplete = function () {
                    console.log("closing connection to database")
                    //db.close();
                }
        },
        deleteCustomerById: function(cID) {
            console.log('this will be use to delete the customer');
        }
    }
    
    return custumerDoa;
})