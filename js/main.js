/* window.onload = function () {
    var size1 = new google.maps.Size(12, 12);
    var standIcon = {
        url: '/icons/assets/1-blue.png',
        scaledSize: size1,
        anchor: new google.maps.Point(0, 0),
        labelOrigin: new google.maps.Point(4, 18)
    };
    var standIcon2 = {
        url: '/icons/assets/1-green.png',
        scaledSize: size1,
        anchor: new google.maps.Point(0, 0),
        labelOrigin: new google.maps.Point(4, 18)
    };
    var host = ""; //https://test2.netelek.co.za";

    function AppViewModel() {
        var self = this;

        this.mapDone = false;
        this.location = {
            lat: null,
            lng: null
        };
        this.pos = null;
        this.map;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                self.location.lat = position.coords.latitude;
                self.location.lng = position.coords.longitude;
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                //lat = -24.51483576172885;//override for testing purposes
                //long = 28.700478531305293;//override for testing purposes
                var accuracy = position.coords.accuracy;

                var latlng = new google.maps.LatLng(lat, long);
                var myOptions = {
                    zoom: 20,
                    minZoom: 17,
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.MAP,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                        position: google.maps.ControlPosition.TOP_CENTER
                    },
                    fullscreenControl: false
                };
                self.loader(true);
                self.map = new google.maps.Map(document.getElementById("map_container"), myOptions);
                self.loader(false);
                self.map.addListener('click', function (e) {
                    self.resetStandMarkerIcons();
                    self.info.standId(null);
                    self.info.standLatitude(e.latLng.lat());
                    self.info.standLongitude(e.latLng.lng());

                    self.pos = new google.maps.Marker({
                        position: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
                        map: self.map,
                        title: "Current Pos"
                    }); //just indicate current pos
                });
                self.map.addListener('idle', function () {
                    self.getStandsForView();
                });
            });
            navigator.geolocation.watchPosition(function (position) {
                self.location.lat = position.coords.latitude;
                self.location.lng = position.coords.longitude;
            });
        } else {
            console.log("Geolocation is not supported by this browser."); //TODO use knockout
        }

        this.standMarkers = [];
        this.page = ko.observable(1);
        this.backVis = ko.observable(false);
        this.nextVis = ko.observable(true);

        this.next = function () {
            self.page(self.page() + 1);
            if (self.page() >= 2)
                self.backVis(true);
            if (self.page() === 4)
                self.drawPicture(0);
            if (self.page() === 5)
                self.nextVis(false);
        };
        this.back = function () {
            self.page(self.page() - 1);
            if (self.page() === 1)
                self.backVis(false);

            if (self.page() === 4) //&& self.nextVis() === false
                self.nextVis(true);
        };
        this.getStandsForView = function () {
            //todo we should only do this call if the map is zoommed in quite a bit
            self.loader(true);
            ko.utils.arrayMap(self.standMarkers, function (standMarker) {
                standMarker.setMap(null);
            });
            self.standMarkers = [];

            var bounds = self.map.getBounds();
            var ne = bounds.getNorthEast(); // LatLng of the north-east corner
            var sw = bounds.getSouthWest(); // LatLng of the south-west corder

            var url = host + "/netbill/webresources/billing/company/0/network/0/stand?latNe={latNe}&lonNe={lonNe}&latSw={latSw}&lonSw={lonSw}";
            url = url.replace("{latNe}", ne.lat()).replace("{lonNe}", ne.lng()).replace("{latSw}", sw.lat()).replace("{lonSw}", sw.lng());
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    self.loader(false);
                    if (this.status === 200) {
                        var data = JSON.parse(xhttp.responseText);
                        if (data.length === 0)
                            console.log('we don;t have any geographic info for your area!');
                        else
                            ko.utils.arrayForEach(data, function (stand) {
                                self.createMarkerForStand(stand);
                            });
                    }
                }
            };
            xhttp.open("GET", url, true);
            xhttp.setRequestHeader('Accept', 'application/json');
            xhttp.setRequestHeader('Authorization', 'Basic bGVnaXRpdHN0YW5kc3JlYWQ6cGFzc3dvcmQ='); //todo creare readonly netuser with this single method
            xhttp.send();
        };

        this.createMarkerForStand = function (stand) {
            var m = {
                stand: stand,
                position: new google.maps.LatLng(parseFloat(stand.latitude), parseFloat(stand.longitude)),
                map: self.map,
                title: "id:" + stand.id + "\ndescription:" + stand.description + "\nnumber:" + stand.number,
                icon: standIcon

            };
            if (stand.number !== null)
                m.label = {
                    text: stand.number,
                    fontSize: "9px"
                };

            var marker = new google.maps.Marker(m);
            self.standMarkers[self.standMarkers.length] = marker;
            marker.addListener('click', function (evt) {
                self.resetStandMarkerIcons();
                console.log(this.stand);
                self.info.standDescription(this.stand.description);
                self.info.standNumber(this.stand.number)
                self.info.standId(this.stand.id);
                self.info.standLatitude(null);
                self.info.standLongitude(null);
                this.setIcon(standIcon2);
            });
        };
        this.resetStandMarkerIcons = function () {
            //clear stand info
            self.info.standDescription(null);
            self.info.standNumber(null)
            self.info.standId(null);

            console.log("Clicked Stand");

            if (self.pos !== null)
                self.pos.setMap(null);
            ko.utils.arrayMap(self.standMarkers, function (standMarker) {
                standMarker.setIcon(standIcon)
            });

        };

        this.loadImg = function (ix) {
            self.drawOnCanvas(document.getElementById("cap-image" + ix).files[0], ix);
        };

        this.drawOnCanvas = function (file, index) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataURL = e.target.result,
                    c = document.getElementById('canvas' + index), // see Example 4
                    ctx = c.getContext('2d'),
                    img = new Image();

                img.onload = function () {
                    c.width = img.width;
                    c.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    ctx.canvas.toBlob((blob) => {
                        var f = new File([blob], "fileName", {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        self.info.meterList()[index].file = f;
                    }, 'image/jpeg', 0.5);
                };
                img.src = dataURL;
            };
            reader.readAsDataURL(file);
        };

        this.takePicture = function (index) {
            document.getElementById("cap-image" + index).click();
        };

        //ctx.font = "10px Arial, Helvetica, sans-serif";
        //ctx.fillText("Tap for camera!", 100, 135);


        this.drawPicture = function (index) {
            var canvas = document.getElementById('canvas' + index);
            var context = canvas.getContext("2d");

            var img = new Image();
            img.onload = function () {
                context.drawImage(img, 5, 5, canvas.width - 10, canvas.height - 10);
                context.font = "14pt Arial, Helvetica, sans-serif";
                context.fillText("Tap for camera", 85, 140);
            };
            img.src = '/capture/photo_camera-24px.svg';
        };



        this.makeMeter = function () {
            return {
                serialNumber: ko.observable(),
                file: null,
                meterApplication: ko.observable(),
                meterCategory: ko.observable(),
                meterReading: ko.observable()
            };
        };
        this.info = {
            accountNumber: ko.observable(null),
            standNumber: ko.observable(null),
            standDescription: ko.observable(null),
            standId: ko.observable(null),
            standLatitude: ko.observable(null),
            standLongitude: ko.observable(null),
            customerName: ko.observable(null),
            customerSurname: ko.observable(null),
            customerCellNumber: ko.observable(null),
            customerEmail: ko.observable(null),
            tenantName: ko.observable(null),
            tenantSurname: ko.observable(null),
            tenantCellNumber: ko.observable(null),
            tenantEmail: ko.observable(null),
            billingAddress1: ko.observable(null),
            billingAddress2: ko.observable(null),
            billingAddress3: ko.observable(null),
            postalCode: ko.observable(null),
            vatNo: ko.observable(null),
            meterList: ko.observableArray([self.makeMeter()])
        };

        this.nextBtn = ko.computed(function () {
            if (this.page() === 2) {
                if (this.info.standId() !== null || (this.info.standLatitude() !== null && this.info.standLongitude() !== null))
                    return true;
                else
                    return false;
            } else
                return true;
        }, self);
        this.addMeter = function () {
            self.info.meterList.push(self.makeMeter());
            self.drawPicture(self.info.meterList().length - 1);
        };
        this.removeMeter = function (meter) {
            self.info.meterList.remove(meter);
        };

        this.loader = ko.observable(false);
        this.upload = function () {
            var formData = new FormData();
            for (var x = 0; x < self.info.meterList().length; x++) {
                formData.append('file' + x, self.info.meterList()[x].file);
                formData.append('meterSerialNo' + x, self.info.meterList()[x].serialNumber());
                formData.append('meterCategory' + x, self.info.meterList()[x].meterCategory());
                formData.append('meterApplication' + x, self.info.meterList()[x].meterApplication());
                formData.append('meterReading' + x, self.info.meterList()[x].meterReading());
            }

            function atfdINN(field, value) {
                if (value !== null)
                    formData.append(field, value);

            }

            atfdINN('accountNo', self.info.accountNumber());
            atfdINN('customerName', self.info.customerName());
            atfdINN('customerSurname', self.info.customerSurname());
            atfdINN('customerCellNumber', self.info.customerCellNumber());
            atfdINN('customerEmail', self.info.customerEmail());
            atfdINN('tenantName', self.info.tenantName());
            atfdINN('tenantSurname', self.info.tenantSurname());
            atfdINN('tenantCellNumber', self.info.tenantCellNumber());
            atfdINN('tenantEmail', self.info.tenantEmail());
            atfdINN('billingAddress1', self.info.billingAddress1());
            atfdINN('billingAddress2', self.info.billingAddress2());
            atfdINN('billingAddress3', self.info.billingAddress3());
            atfdINN('billingCode', self.info.postalCode());
            atfdINN('vatNo', self.info.vatNo());
            atfdINN('standDescription', self.info.standDescription());
            atfdINN('standNumber', self.info.standNumber());
            atfdINN('standLatitude', self.info.standLatitude());
            atfdINN('standLongitude', self.info.standLongitude());
            atfdINN('standId', self.info.standId());

            atfdINN('latitude', self.location.lat);
            atfdINN('longitude', self.location.lng);
            //tODO
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                self.loader(true);
                console.log('state change');
                if (this.readyState === 4)
                    if (this.status === 200) {
                        self.loader(false);
                        self.page(self.page() + 1);
                        self.backVis(false);
                    } else {
                        self.loader(false);
                        self.page(7);
                        self.backVis(false);
                    }
            };
            xhr.open('POST', '/netbill/webresources/legitit/fileupload', true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send(formData);

        };

        this.tenantTickBox = ko.observable(false);

        this.loader = ko.observable(false);

        this.testDialog = function () {
            self.page(self.page() - 2);
        };

    }

    var model = new AppViewModel();
    ko.applyBindings(model);

}; */