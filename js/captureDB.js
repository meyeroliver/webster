/**
 * TODO
 * - this should be called once as it is the database setup...
 */
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
        /**
     * TODO
     * - explain to user that the database connection is faulty 
     */
    };

    openRequest.onsuccess = function () {
        let db = openRequest.result;
        console.log('successfully open db')

        return openRequest;
    }

    return openRequest;
})
/**
 * TODO
 * - check the best way to do this
 * - it should on first page,
 * - will need to restrict pages insupport of getting db set up
 */
//(function () {
/* 'use strict';

//check for support
if (!('indexedDB' in window)) {
    alert('This browser doesn\'t support IndexedDB')
    console.log('This browser doesn\'t support IndexedDB');
    //return;
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
}; */
/* 
openRequest.onsuccess = function () {
    let db = openRequest.result;
    console.log('successfully open db')
 */
// continue to work with database using db object

/* var transaction = db.transaction('customers', 'readwrite')
var customersStore = transaction.objectStore('customers')

let mockCustomer = {
    cID: 2,
    name: 'awwe',
    surname: 'soulo',
    cellphone: '0000000001',
    email: 'fake1.email@gmial.com'
};

let transRequest = customersStore.add(mockCustomer); // (3)

transRequest.onsuccess = function () { // (4)
    console.log("A customer was added to the objectStore [Table]", transRequest.result);
};

transRequest.onerror = function () {
    console.log("Error", transRequest.error.message);
};

transaction.oncomplete = function () {
    console.log("closing connection to database")
    db.close();
} */
//};
//})();