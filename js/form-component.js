 define(['knockout', 'jquery'], function (ko, $) {

     ko.components.register('user-details-form', {
         template: {
             element: 'user-details-form-template'
         },
         viewModel: function (params) {
             this.firstname = ko.observable(params.firstname)
             this.lastname = ko.observable(params.lastname)
             this.email = ko.observable(params.email)

             console.log(params)

         }
     })

     if (document.readyState === 'complete') {
         ko.applyBindings();
         /* var temp = document.getElementById('user-details-form-template')
         var clone = temp.content.cloneNode(true)
         document.getElementsByTagName("form")[0].appendChild(clone)
 */
     }
 })