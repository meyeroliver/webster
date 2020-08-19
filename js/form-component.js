 define(['knockout', 'jquery'], function (ko, $) {

     var userDetailsViewModel = function () {

         this.firstname = ko.observable("Oliver")
         this.lastname = ko.observable("Meyer")
         this.email = ko.observable("oliver.meyer@netelek.co.za")

     }

     if (document.readyState === 'complete') {
         ko.applyBindings(userDetailsViewModel);
     }
 })

 /* define(['knockout', 'jquery'], function (ko, $) {

     ko.components.register('user-details-form', {
         template: '<div class="row"> ' +
             '<div class="col-6">' +
             '<label for="first-name" class="label-form">First name:</label>' +
             '</div>' +
             '<div class="col-6">' +
             '<input type="text" id="first-name" name="first-name"' +
             'class="text-input-form text-input-border-form" data-bind="value:firstname">' +
             '</div>' +
             '</div>' +

             '<div class="row">' +
             '<div class="col-6">' +
             '<label for="lastname" class="label-form">Lastname:</label>' +
             '</div>' +
             '<div class="col-6">' +
             '<input type="text" id="lastname" name="lastname" class="text-input-form text-input-border-form"' +
             'data-bind="value:lastname">' +
             '</div>' +
             '</div>' +

             '<div class="row">' +
             '<div class="col-6">' +
             '<label for="email" class="label-form">Email:</label>' +
             '</div>' +
             '<div class="col-6">' +
             '<input type="text" id="email" name="email" class="text-input-form text-input-border-form"' +
             'data-bind="value:email">' +
             '</div>' +
             '</div>',
         viewModel: function (params) {
             this.firstname = ko.observable(params.firstname)
             this.lastname = ko.observable(params.lastname)
             this.email = ko.observable(params.email)

             console.log(params)

         }
     })

     if (document.readyState === 'complete') {
         ko.applyBindings( /* userDetailsViewModel 
 );
 }
 }) */