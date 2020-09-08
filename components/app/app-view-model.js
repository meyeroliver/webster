define(['knockout', 'text!/components/app/app-template.html', 'customerDoa', 'c'],
    function (ko, appTemplate, customerDoa, c) {

        var viewModel = function () {
            var self = this;
            self.app = {
                pageCount: ko.observable(0),
                testing: ko.observable(false),
                customerDoa: customerDoa,
                customerId: ko.observable() // give children access to databse without having to require the file, test see if works
            }

            function increment() {
                var currentPage = self.app.pageCount()
                if (currentPage != 4)
                    self.app.pageCount(currentPage + 1)

                return self.app.pageCount()
            }

            function decrement() {
                var currentPage = self.app.pageCount()
                if (currentPage != 0)
                    self.app.pageCount(currentPage - 1)
                return self.app.pageCount()
            }

            self.backButtonClick = function () {

                console.log(decrement())
            }

            self.nextButtonClick = function () {
                console.log(increment())
            }

        }
        return {
            viewModel: viewModel,
            template: appTemplate
        }
    })