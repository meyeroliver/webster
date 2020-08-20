define(['knockout', 'jquery'], function (ko, $) {
    ko.components.register('user-details-form', {
        require: '/components/form/form-component.js'
    })
    /**
     * TODO 
     * - see if it is possible to require multiple components
     */
    if (document.readyState === 'complete') {
        ko.applyBindings();
    }
})