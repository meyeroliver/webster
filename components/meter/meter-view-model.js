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
      /* index: index */
    }

    const inpFile = document.getElementById("meter-image");
    const imgContainer = document.getElementById("imagePreview");
    const capturedImg = imgContainer.querySelector(".captured-image");

    var hideImgIcon = self.meter.takeImage();

    var globalFile = null;

    inpFile.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        /**
         *waits for image to finish loading
         */
        reader.addEventListener("load", function () {
          /**
           *This sets the captured image to the element
           */
          self.meter.takeImage(false);
          capturedImg.setAttribute("src", this.result);
          /**
           * TODO
           * - convert image to blob and save into index db under the current customer
           * - allow for persistence across reloads
           */
          globalFile = file;
        });
      }
      // console.log(file);
    });

    saveMeter = async function () {
      //console.log(globalFile);
      self.meter = {
        takeImage: ko.observable(true),
        meterType: ko.observable(),
        consumptionType: ko.observable(),
        serialNo: ko.observable(),
      }
      params.meterFormList.push(self.meter)


      let mockMeter = {
        meterType: self.meter.meterType(),
        consumptionType: self.meter.consumptionType(),
        serialNo: self.meter.serialNo(),
        meterImage: globalFile,
      };

      // await customerDoa.updateCustomersMeter(mockMeter, 2);
    };

    /* removeMeter = function () {
      //alert("awe, Remove Meter was clicked");
      customerDoa
        .promiseGetCustomerById(1)
        .then((customer) => {
          console.log(customer);
        })
        .catch((err) => {
          console.log(err);
        });
    }; */
  };
  return {
    viewModel: meterViewModel,
    template: meterTemplate,
  };
});