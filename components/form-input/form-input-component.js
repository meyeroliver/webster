 define(['knockout', 'text!/components/form/form-template.html'], function (ko, formTemplate) {

     var userDetailsViewModel = function (params) {
         this.firstname = ko.observable(params.firstname)
         this.lastname = ko.observable(params.lastname)
         this.email = ko.observable(params.email)
         /* this.email = ko.pureComputed(function () {
             return this.firstname() + " " + this.lastname()
         }, this)
 */
     }
     return {
         viewModel: userDetailsViewModel,
         template: formTemplate
     }
 })