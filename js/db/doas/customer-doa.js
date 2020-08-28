define(["captureDB"], function (dbConn) {
  //TODO: return something that can be used as a reference for later
  //TODO: convert to promise base
  /*   var custumerDoa = {
      insert: function (data) {
        let db = dbConn.result;
        var transaction = db.transaction("customers", "readwrite");
        var customersStore = transaction.objectStore("customers");

        let transRequest = customersStore.add(data); // (3)

        transRequest.onsuccess = function () {
          // (4)
          console.log(
            "A customer was added to the objectStore [Table]",
            transRequest
          );
        };

        transRequest.onerror = function () {
          console.log("Error", transRequest.error.message);
        };

        transaction.oncomplete = function () {
          console.log("closing connection to database");
          //db.close();
        };
      },
      updateByCustomerId: function (meter, cId) {
        let db = dbConn.result;
        var transaction = db.transaction("customers", "readwrite");
        var customersStore = transaction.objectStore("customers");
        console.log(meter);
        let getRequest = customersStore.get(cId); // (3)

        getRequest.onsuccess = function () {
          // (4)
          var customer = getRequest.result;
          console.log(customer);
          customer.meterType = meter.meterType;
          customer.consumptionType = meter.consumptionType;
          customer.serialNo = meter.serialNo;
          customer.meterImage = meter.meterImage;

          let updateRequest = customersStore.put(customer, cId);

          updateRequest.onsuccess = function () {
            console.log(updateRequest.result);
            console.log(
              "A customer was update to the objectStore [Table]",
              updateRequest
            );
          };
          updateRequest.onerror = function () {
            console.log("Error", updateRequest.error.message);
          };
        };

        getRequest.onerror = function () {
          console.log("Error", getRequest.error.message);
        };

        transaction.oncomplete = function () {
          console.log("closing connection to database");
          //db.close();
        };
      },
      getCustomerById: function (cID) {
        let db = dbConn.result;

        var transaction = db.transaction("customers", "readonly");
        var customersStore = transaction.objectStore("customers");

        let transRequest = customersStore.get(cID); // (3)

        transRequest.onsuccess = function () {
          // (4)
          console.log(transRequest.result);
        };

        transRequest.onerror = function () {
          console.log("Error", transRequest.error.message);
        };

        transaction.oncomplete = function () {
          console.log("closing connection to database");
          //db.close();
        };
      },
      promiseGetCustomerById: async (cId) =>
        await new Promise((resolve, reject) => {
          let db = dbConn.result;
          var transaction = db.transaction("customers", "readonly");
          var customersStore = transaction.objectStore("customers");

          let transRequest = customersStore.get(cId); // (3)

          transRequest.onsuccess = function (e) {
            if (transRequest.result == undefined || transRequest.result == null) {
              reject("Record does not exist in the Object Store");
            }

            resolve(transRequest.result);
          };
          transRequest.onerror = function () {
            console.log("Error", transRequest.error.message);
            reject(transRequest.error.message);
          };
          transaction.oncomplete = function () {
            console.log("closing connection to database");
            //db.close();
          };
        }),
      getAllCustomers: function () {
        let db = dbConn.result;

        var transaction = db.transaction("customers", "readonly");
        var customersStore = transaction.objectStore("customers");
        //todo : use queries on the get all, eg ready-for-upload
        let transRequest = customersStore.getAll(); // (3)

        transRequest.onsuccess = function () {
          // (4)
          console.log(transRequest.result);
        };

        transRequest.onerror = function () {
          console.log("Error", transRequest.error.message);
        };

        transaction.oncomplete = function () {
          console.log("closing connection to database");
          //db.close();
        };
      },
      deleteCustomerById: function (cID) {
        console.log("this will be use to delete the customer");
      },
    }; */

  //console.log(dbConn.openDB('capture-db'))
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
    }
  }

  return customerDoa;
});