define([
  "knockout",
  "text!/components/meter/meter-template.html",
  "customerDoa",
], function (ko, meterTemplate, customerDoa) {


  var meterViewModel = function (params) {
    var self = this;

    self.meter = {
      meterType: ko.observable(),
      consumptionType: ko.observable(),
      serialNo: ko.observable(),
      showButton: ko.observable(true),
      meterImage: ko.observable(),
      imageLabel: ko.observable(false)
    }


    self.testicle = function (index) {
      const inpFile = document.getElementById("meter-image-" + index);
      const labelInpFile = document.getElementById("label-meter-image-" + index);
      inpFile.addEventListener("change", function () {

        const capturedImg = document.getElementById("captured-image-" + index);

        const file = this.files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener("load", function () {
            labelInpFile.style.display = 'none'
            capturedImg.setAttribute("src", this.result);
            self.meter.imageLabel(true)
            self.meter.meterImage(file);
          });
        }
      });
    }

    self.saveMeter = async function (cusomerId) {

      self.meter.showButton(false)

      let mockMeter = {
        meterType: self.meter.meterType(),
        consumptionType: self.meter.consumptionType(),
        serialNo: self.meter.serialNo(),
        meterImage: self.meter.meterImage(),
      };

      /**
       * TODO: 
       * 
       * ? - look up the most recent customer entry
       * ? - get the customerId
       * ? - use this to update the meterlist of the customer
       */
      params.meterFormList.push(mockMeter)
      await customerDoa.updateCustomersMeter(mockMeter, 1);
    };

    /**
     * TODO: remove from observable array and the indexeddb
     */
    self.removeMeter = function (data, event, index) {
      if (event.type === 'click') {
        if (index != params.meterFormList().length - 1) {
          var itemToRemove = params.meterFormList()[index]
          params.meterFormList.remove(itemToRemove)
          /**
           * TODO:
           * 
           * ? - remove meter from the indexedDB as well
           */
        }
      }
    };
  };
  return {
    viewModel: meterViewModel,
    template: meterTemplate,
  };
});