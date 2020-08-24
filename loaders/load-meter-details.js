define(['knockout'], function (ko) {
    ko.components.register('meter-card', {
        require: '/components/meter/meter-view-model.js'
    })
    /**
     * TODO 
     * - see if it is possible to require multiple components
     */
    if (document.readyState === 'complete') {
        ko.applyBindings();
    }
})