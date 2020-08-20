 define(['knockout', 'jquery'], function (ko, $) {

     var userDetailsViewModel = function (params) {
         this.firstname = ko.observable(params.firstname)
         this.lastname = ko.observable(params.lastname)
         this.email = ko.observable(params.email)

         console.log(params)
     }

     ko.components.register('user-details-form', {
         template: {
             element: 'user-details-form-template'
         },
         viewModel: userDetailsViewModel
     })

     if (document.readyState === 'complete') {
         ko.applyBindings(userDetailsViewModel);
         /* var temp = document.getElementById('user-details-form-template')
         var clone = temp.content.cloneNode(true)
         document.getElementsByTagName("form")[0].appendChild(clone)
 */
     }
 })