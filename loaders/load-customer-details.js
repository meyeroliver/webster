define(['knockout'], function (ko) {
    ko.components.register('customer-detail', {
        require: '/components/customer-details/customer-view-model.js'
    })

    ko.components.register('customer-meter', {
        require: '/components/customer-meter/customer-meter-view-model.js'
    })

    /**
     * TODO 
     * - see if it is possible to require multiple components
     */
    if (document.readyState === 'complete') {
        ko.applyBindings();
    }
})