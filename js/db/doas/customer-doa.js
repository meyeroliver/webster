define(["captureDB"], function (dbConn) {
  //console.log(dbConn.openDB('awe'))
  var customerDoa = {
    insertCustomer: function (customer) {
      return new Promise(async (resolve, reject) => {
        // Start a database transaction and get the notes object store
        let tx = await dbConn.openDB('capture-db').then((db) => {

          return db.transaction(['customers'], 'readwrite');
        })
        let store = tx.objectStore('customers');

        store.add(customer);

        // Wait for the database transaction to complete. If it is successful,
        // resolve. Otherwise, reject with our error message.
        tx.oncomplete = resolve('Successfully inserted');
        tx.onerror = function (event) {
          reject(`error storing note ${event.target.errorCode}`);
        }
      });
    },
    updateCustomersMeter: function (meter, cId) {
      return new Promise(async (resolve, reject) => {
        // Start a database transaction and get the notes object store
        let tx = await dbConn.openDB('capture-db').then((db) => {
          return db.transaction(['customers'], 'readwrite');
        })
        let store = tx.objectStore('customers');

        let getRequest = store.get(cId);
        getRequest.onsuccess = function () {
          // (4)
          var customer = getRequest.result;
          customer.meterList.push(meter)

          let updateRequest = store.put(customer, cId);

          /* updateRequest.onsuccess = function () {
            console.log(updateRequest.result);
            console.log(
              "A customer was update to the objectStore [Table]",
              updateRequest
            );
          }; */
          updateRequest.onerror = function () {
            console.log("Error", updateRequest.error.message);
          };
        };


        // Wait for the database transaction to complete. If it is successful,
        // resolve. Otherwise, reject with our error message.
        tx.oncomplete = resolve('Successfully updated');
        tx.onerror = function (event) {
          reject(`error storing note ${event.target.errorCode}`);
        }
      });
    },
    getCustomerById: function (cId) {
      return new Promise(async (resolve, reject) => {
        // Start a database transaction and get the notes object store
        //    console.log(dbConn.openDB())
        let tx = await dbConn.openDB('capture-db').then((db) => {
          return db.transaction(['customers'], 'readonly');
        })
        let store = tx.objectStore('customers');

        var customerReq = store.get(cId);
        var customer = null
        customerReq.onsuccess = function () {
          //resolve(customerReq.result)
          customer = customerReq.result
          //console.log(customerReq.result)
        }

        // Wait for the database transaction to complete. If it is successful,
        // resolve. Otherwise, reject with our error message.
        tx.oncomplete = function () {
          console.log(customerReq.result)
          resolve(customerReq.result)
          //console.log(customer)
        }
        tx.onerror = function (event) {
          reject(`error storing note ${event.target.errorCode}`);
        }
      });
    },
    getAllCustomers: function () {
      return new Promise(async (resolve, reject) => {
        // Start a database transaction and get the notes object store
        //    console.log(dbConn.openDB())
        let tx = await dbConn.openDB('capture-db').then((db) => {
          return db.transaction(['customers'], 'readonly');
        })
        let store = tx.objectStore('customers');

        var customerReq = store.getAll();
        var customer = null
        customerReq.onsuccess = function () {
          customer = customerReq.result
        }

        // Wait for the database transaction to complete. If it is successful,
        // resolve. Otherwise, reject with our error message.
        tx.oncomplete = function () {
          console.log(customerReq.result)
          resolve(customerReq.result)
        }
        tx.onerror = function (event) {
          reject(`error storing note ${event.target.errorCode}`);
        }
      });
    }
  }

  return customerDoa;
});