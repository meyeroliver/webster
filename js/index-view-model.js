 define(['knockout', 'jquery'], function (ko, $) {
     ko.components.register('landing', {
         template: {
             element: 'redirect-button-template'
         },
         viewModel: function () { //may be a function or an object

             this.clickListener = function () {
                 console.log('clicky me')
             }
         }
     })

     //$(document).ready(function () {
     if (document.readyState === 'complete') {
         ko.applyBindings();
         var temp = document.getElementById("redirect-button-template")
        /*  var clone = temp.content.cloneNode(true) */

         /* document.body.appendChild(clone) */
     }
     //});

 });