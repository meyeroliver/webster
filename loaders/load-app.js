define(['knockout', '/components/app/app-view-model.js', '/components/form/form-component.js'], function (ko, app, form) {
    /*   ko.components.register('application', {
          require: 'components/app/app-view-model.js'
      }) */


    console.log(app)

    ko.components.register('application', {
        viewModel: app.viewModel,
        template: app.template
    })

    console.log(document.getElementById("lolo"))
    //  ko.applyBindings( /* app.viewModel, document.getElementById("lolo") */ )

    /**
     * CUSTOMER FORM COMPONENT
     */
    //console.log(form)

    ko.components.register('user-details-form', {
        require: '/components/form/form-component.js'
    })

    //console.log(document.getElementById("isjah"))
    //ko.applyBindings(form, document.getElementById("isjah"))


    /**
     * METER COMPONENT
     */
    ko.components.register('meter-details', {
        require: '/components/meter-details-activity/meter-details-view-model.js'
    })

    ko.components.register('meter-card', {
        require: '/components/meter/meter-view-model.js'
    })


    /**
     * CONFIRM CUSTOMER DETAILS COMPONENT
     */
    ko.components.register('confirm-details', {
        require: '/components/confirm-details-activity/confirm-details-view-models.js'
    })

    ko.components.register('customer-detail', {
        require: '/components/customer-details/customer-view-model.js'
    })

    ko.components.register('customer-meter', {
        require: '/components/customer-meter/customer-meter-view-model.js'
    })


    if (document.readyState === 'complete') {
        ko.applyBindings();
    }
})