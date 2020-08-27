/**
 * TODO
 * - this should be called once as it is the database setup...
 */
/* 
define([], function () {
    //check for support
    if (!('indexedDB' in window)) {
        alert('This browser doesn\'t support IndexedDB')
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }

    let openRequest = indexedDB.open('capture-db', 1);

    openRequest.onupgradeneeded = function () {
        // triggers if the client had no database
        // ...perform initialization...
        console.log('Upgraded needed!')
        let db = openRequest.result;
        if (!db.objectStoreNames.contains('customers')) {
            //creating customers object store [table]
            var customersStore = db.createObjectStore('customers', {
                autoIncrement: true
            })

            customersStore.createIndex("cellphone", "cellphone", {
                unique: true
            });

            customersStore.createIndex("address", "address", {
                unique: true
            });
        }
    };

    openRequest.onerror = function () {
        console.error("Error", openRequest.error); */
/**
 * TODO
 * - explain to user that the database connection is faulty 
 */
/*     };

    openRequest.onsuccess = function () {
        let db = openRequest.result;
        console.log('successfully open db')

        return openRequest;
    }

    return openRequest;
})
 */

define([], function () {
    let db;
    let dbNamespace;

    return {
        openDB: function (nameSpace) {
            return new Promise(async function (resolve, reject) {
                if (nameSpace != dbNamespace) {
                    db = null
                }
                dbNamespace = nameSpace
                // If setupDB has already been run and the database was set up, no need to
                // open the database again; just resolve and return!
                if (db) {
                    resolve(db);
                    return;
                }

                let dbName = nameSpace == '' ? 'myDatabase' : nameSpace;
                let dbReq = indexedDB.open(dbName, 1);

                // Fires when the version of the database goes up, or the database is
                // created for the first time
                dbReq.onupgradeneeded = function (event) {
                    db = event.target.result;

                    // Create an object store named notes, or retrieve it if it already
                    // exists. Object stores in databases are where data are stored.
                    let customers;
                    if (!db.objectStoreNames.contains('customers')) {
                        customers = db.createObjectStore('customers', {
                            autoIncrement: true
                        });
                        customers.createIndex("cellphone", "cellphone", {
                            unique: true
                        });

                        customers.createIndex("address", "address", {
                            unique: true
                        });
                    } else {
                        customers = dbReq.transaction.objectStore('customers');
                    }
                }

                // Fires once the database is opened (and onupgradeneeded completes, if
                // onupgradeneeded was called)
                dbReq.onsuccess = function (event) {
                    // Set the db variable to our database so we can use it!
                    db = event.target.result;
                    resolve(db);
                }

                // Fires when we can't open the database
                dbReq.onerror = function (event) {
                    reject(`error opening database ${event.target.errorCode}`);
                }
            });
        }
    }
})