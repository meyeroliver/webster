define(['knockout', 'text!/components/meter/meter-template.html', 'customerDoa'],
    function (ko, meterTemplate, customerDoa) {

        var meterViewModel = function (params) {
            var self = this
            self.takeImage = ko.observable(true)
            self.meterType = ko.observable(params.meterType)
            self.consumptionType = ko.observable(params.consumptionType)
            self.serialNo = ko.observable(params.serialNo)

            const inpFile = document.getElementById("meter-image")
            const imgContainer = document.getElementById("imagePreview")
            const capturedImg = imgContainer.querySelector(".captured-image")

            var hideImgIcon = self.takeImage()

            inpFile.addEventListener("change", function () {
                const file = this.files[0]
                if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file)
                    /**
                     *waits for image to finish loading
                     */
                    reader.addEventListener("load", function () {
                        /**
                         *This sets the captured image to the element
                         */
                        self.takeImage(false)
                        capturedImg.setAttribute("src", this.result)
                        /**
                         * TODO
                         * - convert image to blob and save into index db under the current customer
                         * - allow for persistence across reloads
                         */
                    })
                }
                console.log(file)
            })

            saveMeter = function () {

                let mockMeter = {
                    meterType: self.meterType(),
                    consumptionType: self.consumptionType(),
                    serialNo: self.serialNo()

                };

                customerDoa.updateByCustomerId(mockMeter, 2)
            }

            removeMeter = function () {
                alert('awe, Remove Meter was clicked')
            }

        }
        return {
            viewModel: meterViewModel,
            template: meterTemplate
        }
    })