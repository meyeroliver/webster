define(['knockout', 'text!/components/meter/meter-template.html', 'captureDB'],
    function (ko, meterTemplate, dbConn) {

        var meterViewModel = function (params) {
            var self = this
            self.takeImage = ko.observable(true)
            this.meterType = ko.observable(params.meterType)
            this.consumptionType = ko.observable(params.consumptionType)
            this.serialNo = ko.observable(params.serialNo)

            saveMeter = function () {
                alert('awe, Save Meter was clicked')
            }

            removeMeter = function () {
                alert('awe, Remove Meter was clicked')
            }

            const inpFile = document.getElementById("meter-image")
            const imgContainer = document.getElementById("imagePreview")
            const capturedImg = imgContainer.querySelector(".captured-image")

            var hideImgIcon = this.takeImage()

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








        }
        return {
            viewModel: meterViewModel,
            template: meterTemplate
        }
    })