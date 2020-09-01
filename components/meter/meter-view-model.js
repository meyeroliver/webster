define([
  "knockout",
  "text!/components/meter/meter-template.html",
  "customerDoa",
], function (ko, meterTemplate, customerDoa) {
  var meterViewModel = function (params) {
    var self = this;

    self.addNew = params.meter
    console.log(params)

    self.meter = {
      takeImage: ko.observable(true),
      meterType: ko.observable(),
      consumptionType: ko.observable(),
      serialNo: ko.observable(),
    }

    var globalFile = null;
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
            self.meter.takeImage(false)
            capturedImg.setAttribute("src", this.result);
            globalFile = file;
          });
        }
      });
    }

    self.saveMeter = async function () {

      let mockMeter = {
        meterType: self.meter.meterType(),
        consumptionType: self.meter.consumptionType(),
        serialNo: self.meter.serialNo(),
        meterImage: globalFile,
      };



      self.meter = {
        takeImage: ko.observable(true),
        meterType: ko.observable(),
        consumptionType: ko.observable(),
        serialNo: ko.observable(),
      }
      params.meterFormList.push(mockMeter)
      //params.meterFormList.push(self.meter)
      console.log(params.meterFormList())
      console.log(mockMeter)
      await customerDoa.updateCustomersMeter(mockMeter, 2);

    };

    /**
     * TODO: remove from observable array and the indexeddb
     */
    self.removeMeter = function (data, event, index) {
      //alert("awe, Remove Meter was clicked");

      if (event.type === 'click') {
        if (index != params.meterFormList().length - 1) {

          console.log(event.type)
          console.log(index)
          console.log(params.meterFormList().length)
          var itemToRemove = params.meterFormList()[index]
          //        console.log(params.meterFormList())
          console.log(itemToRemove)
          console.log(params.meterFormList.remove(itemToRemove))
          //      console.log(params.meterFormList.remove(itemToRemove))

        }
      }
      /* console.log(mockMeter)
      console.log(params.meterFormList.indexOf(mockMeter)) */
      //if (self.meter.index != 0) {
      // var itemToRemove = params.meterFormList()[index]
      /*  console.log(self.meter.index)
      console.log(itemToRemove)
      console.log(params.meterFormList)
      console.log(params.meterFormList())
      // console.log(params.meterFormList()[index])
      // console.log(params.meterFormList())*/
      //console.log(params.meterFormList.remove(itemToRemove))

      // console.log(params.meterFormList.remove(itemToRemove))

      // }
      /* customerDoa
        .promiseGetCustomerById(1)
        .then((customer) => {
          console.log(customer);
        })
        .catch((err) => {
          console.log(err);
        }); */
    };
  };
  return {
    viewModel: meterViewModel,
    template: meterTemplate,
  };
});