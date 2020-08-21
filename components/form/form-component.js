 define(['knockout', 'text!/components/form/form-template.html'], function (ko, formTemplate) {

     var userDetailsViewModel = function (params) {
         this.firstname = ko.observable(params.firstname)
         this.lastname = ko.observable(params.lastname)
         this.cellphone = ko.observable(params.cellphone)
         this.email = ko.observable(params.email)
         this.address = ko.observable(params.address)
         this.standNo = ko.observable(params.standNo)
         this.accountNo = ko.observable(params.accountNo)
         this.billingAddress1 = ko.observable(params.billingAddress1)
         this.billingAddress2 = ko.observable(params.billingAddress2)
         this.billingAddress3 = ko.observable(params.billingAddress3)
         this.postalCode = ko.observable(params.postalCode)
         this.tenantName = ko.observable(params.tenantName)
         this.tenantSurname = ko.observable(params.tenantSurname)
         this.tenantCellphone = ko.observable(params.tenantCellphone)
         this.tenantEmail = ko.observable(params.tenantEmail)


         this.hasTenant = ko.observable()
         /**
          * TODO
          * -> Check a bit deeper into subscribers
          */
         /* this.hasTenant.subscribe(function (hasTentantValue) {
             if (hasTentantValue) {
                 alert("awe awe awe")
                 self.showTenantContainer(true)
             }
         }) */
         this.showTenantContainer = ko.computed(function () {
             return this.hasTenant()
         }, this)
     }
     return {
         viewModel: userDetailsViewModel,
         template: formTemplate
     }
 })