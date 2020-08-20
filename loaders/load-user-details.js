define(['knockout', 'jquery'], function (ko, $) {
    ko.components.register('user-details-form', {
        require: 'js/form-component'
    })
    /**
     * TODO 
     * - see if it is possible to require multiple components
     */
    ko.applyApplyBindings();
})