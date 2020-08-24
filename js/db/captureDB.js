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
                autoIncrement:true
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