issueCdModule.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

issueCdModule.directive('phoneInput', function ($filter, $browser) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {
            var listener = function () {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function (viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function () {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function (event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function () {
                $browser.defer(listener);
            });
        }

    };
});

issueCdModule.filter('tel', function () {
    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if (number) {
            if (number.length > 3) {
                number = number.slice(0, 3) + '-' + number.slice(3, 7);
            }
            else {
                number = number;
            }

            return ("(" + city + ")-" + number).trim();
        }
        else {
            return "(" + city;
        }

    };
});

issueCdModule.controller("issueCdController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs) {
    $scope.OrderArray = [];
    $scope.OrderDate = new Date();
    $scope.InstitutionName = '';
    $scope.InstitutionKey = '';
    $scope.OrderBy = '';
    $scope.ContactPhone = '';
    $scope.Term = '';
    $scope.Callable = 'No';
    $scope.CallFrequency = '';
    $scope.Rate = '';
    $scope.Amount = '';
    $scope.SettleDate = '';
    $scope.Frequency = '';
    $scope.RowCount = 0;
    $scope.phoneMask = "(999) 999-9999";
    $scope.MessageText = '';
    $scope.ModalTitle = '';
    $scope.showSuccessMessageModal = false;
    $scope.Rates = [];
    $scope.ExistingOrders = [];
    $scope.PageNumbers = [];
    $scope.PageSize = 10;
    $scope.CurrentPage = 1;
    $scope.SelectedPageSize = '10';
    $scope.Monday = '';
    $scope.RatesLastUpdatedDate = '';
    $scope.ValidPhonePattern = "^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$";
    $scope.ValidRatePattern = "(?=[^\0])(?=^([0-9]+){0,1}(\.[0-9]{1,2}){0,1}$)";
    $scope.DisableNextClick = false;

    $scope.placeMask = function () {
        $scope.phoneMask = "(999) 999-9999";
    };

    $scope.orderByField = 'orderDate';
    $scope.reverseSort = true;

    var fillPageNumbersArray = function (length) {
        $scope.PageNumbers = [];
        var numberOfPages = 0;
        if (length > 0 && length <= $scope.PageSize)
            numberOfPages = 1;
        else if (length > 0 && length > $scope.PageSize) {
            var remainder = length % $scope.PageSize;
            if (remainder > 0) {
                numberOfPages = Math.floor(length / $scope.PageSize) + 1;
            }
            else {
                numberOfPages = length / $scope.PageSize;
            }
        }
        var pagesToDisplay = 0;

        if (numberOfPages > 5)
            pagesToDisplay = 5;
        else
            pagesToDisplay = numberOfPages;

        if (numberOfPages > 5)
            $scope.PageNumbers.push({ id: 'previous', value: '<<' });

        if (pagesToDisplay > 1) {
            for (i = 1; i <= pagesToDisplay; i++) {
                $scope.PageNumbers.push({ id: ('pageNumber' + i), value: i });
            }
        }

        if (numberOfPages > 5)
            $scope.PageNumbers.push({ id: 'next', value: '>>' });
    };

    $scope.addRow = function () {
        var cdOrder = {};
        $scope.RowCount = $scope.RowCount + 1;
        cdOrder.rowId = $scope.RowCount; 
        cdOrder.orderDate = $scope.OrderDate;
        cdOrder.orderBy = $scope.OrderBy;
        cdOrder.contactPhone = $scope.ContactPhone;
        cdOrder.term = $scope.Term;
        cdOrder.callable = $scope.Callable;
        cdOrder.callfrequency = $scope.CallFrequency;
        cdOrder.rate = $scope.Rate;
        cdOrder.amount = $scope.Amount;
        cdOrder.settleDate = $scope.SettleDate;
        cdOrder.frequency = $scope.Frequency;
        cdOrder.validrate = '';
        cdOrder.numericamount = '';
        cdOrder.notes = '';

        if ($scope.OrderArray.length < 10)
            $scope.OrderArray.push(cdOrder);
        
        setTimeout(function () {
            $('#termholder' + cdOrder.rowId).selectpicker();
            $('#termholder' + cdOrder.rowId).selectpicker('refresh');

            $('#callable' + cdOrder.rowId).selectpicker();
            $('#callable' + cdOrder.rowId).selectpicker('refresh');

            $('#frequency' + cdOrder.rowId).selectpicker();
            $('#frequency' + cdOrder.rowId).selectpicker('refresh');

            $('#settledate' + cdOrder.rowId).datepicker({ todayHighlight: true, startDate: 'd', daysOfWeekDisabled: '06' }).on('changeDate', function (e) {
                $(this).datepicker('hide');
            });

            $('#settledate' + cdOrder.rowId).datepicker("setDate", add_business_days(14));
            $scope.EnableDisableCallFrequency(cdOrder);

            $('[data-toggle="tooltip"]').tooltip(); 
        }, 500);
    };

    $scope.removeRow = function (orderObj) {
        for (i = 0; i < $scope.OrderArray.length; i++) {
            if ($scope.OrderArray[i].rowId === orderObj.rowId) {
                $scope.OrderArray.splice(i, 1);
                break;
            }
        }
    };

    $scope.submitOrder = function (outerForm) {
        var cdOrdersData = [];

        if (typeof $scope.OrderArray !== 'undefined' && $scope.OrderArray.length > 0) {
            if (CallableRateAvailability() === true) {
                document.getElementById('overlay').style.display = '';
                for (i = 0; i < $scope.OrderArray.length; i++) {
                    document.getElementById('overlayLoadingText').innerText = 'Processing order: ' + $scope.OrderArray[i].rowId;
                    var cdOrderObject = {
                        OrderKey: 0,
                        OrderDate: '',
                        InstitutionKey: 0,
                        OrderedBy: '',
                        ContactPhone: '',
                        Term: '',
                        Callable: '',
                        CallFrequency: '',
                        Rate: '',
                        Amount: '',
                        SettleDate: '',
                        InterestPaymentFrequency: '',
                        Status: '',
                        Notes:''
                    };

                    cdOrderObject.OrderKey = 0;
                    cdOrderObject.OrderDate = $scope.OrderArray[i].orderDate;
                    cdOrderObject.InstitutionKey = $scope.InstitutionKey;
                    cdOrderObject.OrderedBy = $scope.OrderBy;
                    cdOrderObject.ContactPhone = $scope.OrderArray[i].contactPhone;
                    cdOrderObject.Term = $scope.OrderArray[i].term;
                    cdOrderObject.Callable = $scope.OrderArray[i].callable;
                    cdOrderObject.CallFrequency = $scope.OrderArray[i].callfrequency;
                    cdOrderObject.Rate = $scope.OrderArray[i].rate;
                    cdOrderObject.Amount = $scope.OrderArray[i].amount;
                    cdOrderObject.SettleDate = $scope.OrderArray[i].settleDate;
                    cdOrderObject.InterestPaymentFrequency = $scope.OrderArray[i].frequency;
                    cdOrderObject.Status = 'Pending';
                    cdOrderObject.Notes = $scope.OrderArray[i].notes;
                    cdOrdersData.push(cdOrderObject);
                }

                var req = {
                    method: 'POST',
                    url: '/api/CdApi/CreateOrders',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: cdOrdersData
                };

                document.getElementById('overlayLoadingText').innerText = 'Sending orders for processing...';

                $http(req).then(
                    function (result) {
                        if (result.data !== null && result.data > 0) {
                            document.getElementById('overlay').style.display = 'none';
                            document.getElementById('overlayLoadingText').innerText = 'Loading...';
                            dlg = dialogs.notify('Success!', 'Your CD Issue(s) has been accepted for review and processing. CD Issues are not complete until agreements are executed. If you do not have a contract with Finance 500, you will be contacted by a representative to initiate the process.');
                            $scope.OrderArray = [];
                            $scope.getCdOrders({ id: 'pageNumber1', value: 1 });
                            initializeOrderForm();
                        }
                        else {
                            document.getElementById('overlay').style.display = 'none';
                            document.getElementById('overlayLoadingText').innerText = 'Loading...';
                            dlg = dialogs.error('An error occurred while processing your orders. Please contact system administrator.');
                            $scope.OrderArray = [];
                            initializeOrderForm();
                        }
                    },
                    function () {
                        document.getElementById('overlay').style.display = 'none';
                        document.getElementById('overlayLoadingText').innerText = 'Loading...';
                        dlg = dialogs.error('An error occurred while processing your orders. Please contact system administrator.');
                        $scope.OrderArray = [];
                        initializeOrderForm();
                    });
            }
            else {
                dlg = dialogs.notify('Info', 'You have chosen callable rate(s) which are not available. Please choose rates which available and then try and place the order.');
            }
        }
        else {
            dlg = dialogs.notify('Info','Please create order(s) by clicking + button to the left of the screen.');
        }
    };

    var getLoggedInUserDetails = function () {
        document.getElementById('overlay').style.display = '';
        var req = {
            method: 'GET',
            url: '/api/CdApi/GetLoggedInUserDetails',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                $scope.InstitutionKey = result.data.institutionKey;
                $scope.InstitutionName = result.data.institutionName;
                $scope.OrderBy = result.data.userName;
                document.getElementById('overlay').style.display = 'none';
                getCdRates();
            }
            else {
                document.getElementById('overlay').style.display = 'none';
                dlg = dialogs.error('An error occurred while trying to get your details. Please send an e-mail to castellonf@stifel.com.');
            }
        }, function () {
            document.getElementById('overlay').style.display = 'none';
            dlg = dialogs.error('An error occurred while trying to get your details. Please send an e-mail to castellonf@stifel.com.');
        });
    };

    var getCdRates = function () {
        document.getElementById('overlay').style.display = '';
        var req = {
            method: 'GET',
            url: '/api/CdApi/GetCdRates',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                document.getElementById('overlay').style.display = 'none';
                $scope.Rates = result.data;
                initializeOrderForm();
            }
            else {
                document.getElementById('overlay').style.display = 'none';
                dlg = dialogs.error('An error occurred while trying to get rates. Please send an e-mail to castellonf@stifel.com.');
            }
        }, function () {
            document.getElementById('overlay').style.display = 'none';
            dlg = dialogs.error('An error occurred while trying to get rates. Please send an e-mail to castellonf@stifel.com.');
        });
    };

    $scope.getCdOrders = function (pageNumber) {
        document.getElementById('overlay').style.display = '';
        var params = {
            PageSize: $scope.SelectedPageSize,
            PageNumber: pageNumber.value
        };

        if (pageNumber.value === '<<') {
            if ($scope.CurrentPage > 1) {
                $scope.CurrentPage = $scope.CurrentPage - 1;
                $scope.DisableNextClick = false;
            }
        }
        else if (pageNumber.value === '>>') {
            if ($scope.CurrentPage < ($scope.ExistingOrders[0].totalOrders / $scope.PageSize)) {
                $scope.CurrentPage = $scope.CurrentPage + 1;
                $scope.DisableNextClick = false;
            }
            else {
                $scope.DisableNextClick = true;
            }
        }
        else {
            $scope.DisableNextClick = false;
            $scope.CurrentPage = pageNumber.value;
        }

        params.PageNumber = $scope.CurrentPage;

        var req = {
            method: 'POST',
            url: '/api/CdApi/GetOrders',
            headers: {
                'Content-Type': 'application/json'
            },
            data: params

        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                document.getElementById('overlay').style.display = 'none';
                $scope.ExistingOrders = result.data;

                if (typeof $scope.ExistingOrders !== 'undefined' && $scope.ExistingOrders.length > 0)
                    fillPageNumbersArray($scope.ExistingOrders[0].totalOrders);

                setTimeout(function () {
                    $('.notes').bind('mouseenter', function () {
                        var $this = $(this);
                        if (this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
                            $this.attr('title', $this.text());
                        }
                    });
                }, 100);
            }
            else {
                document.getElementById('overlay').style.display = 'none';
                dlg = dialogs.error('An error occurred while trying to get existing orders. Please send an e-mail to castellonf@stifel.com.');
            }
        }, function () {
            document.getElementById('overlay').style.display = 'none';
            dlg = dialogs.error('An error occurred while trying to get existing orders. Please send an e-mail to castellonf@stifel.com.');
        });
    };

    $scope.GoToHome = function () {
        window.location.href = '/';
    };

    var initialize = function () {
        getLoggedInUserDetails();
        getMonday();
        getRatesLastUpdatedDate();
        $scope.getCdOrders({ id: 'pageNumber1', value: 1 });
    };

    $scope.SetRates = function (orderObj) {
        for (i = 0; i < $scope.Rates.length; i++) {
            if ($scope.Rates[i].term === orderObj.term) {
                if (orderObj.callable === 'No') {
                    if ($scope.Rates[i].fixedRate === '-' || $scope.Rates[i].fixedRate === '') {
                        orderObj.rate = 'Rate Not Available';
                        orderObj.validrate = '';
                    }
                    else {
                        orderObj.rate = $scope.Rates[i].fixedRate;
                        orderObj.validrate = $scope.Rates[i].fixedRate;
                    }
                }
                else {
                    if ($scope.Rates[i].callable === '-' || $scope.Rates[i].callable === '') {
                        orderObj.rate = 'Callable Rate Not Available';
                        orderObj.validrate = '';
                        $("#callfrequencyholder" + orderObj.rowId).val("").selectpicker("refresh");
                        $("#callfrequencyholder" + orderObj.rowId).prop("disabled", true);
                        $("#callfrequencyholder" + orderObj.rowId).selectpicker("refresh");
                        $(".selectpicker[data-id='callfrequencyholder" + orderObj.rowId + "']").addClass("disabled");
                        $("#callfrequencyholder" + orderObj.rowId).selectpicker("refresh");
                    }
                    else {
                        orderObj.rate = $scope.Rates[i].callable;
                        orderObj.validrate = $scope.Rates[i].callable;
                        if (orderObj.rate !== 'Callable Rate Not Available') {
                            $("#callfrequencyholder" + orderObj.rowId).prop("disabled", false);
                            $("#callfrequencyholder" + orderObj.rowId).selectpicker("refresh");
                            $(".selectpicker[data-id='callfrequencyholder" + orderObj.rowId + "']").removeClass("disabled");
                            $("#callfrequencyholder" + orderObj.rowId).selectpicker("refresh");
                        }
                    }
                }
                break;
            }
        }
    };

    $scope.LoadOrders = function () {
        $scope.PageSize = parseInt($scope.SelectedPageSize);
        $scope.PageNumbers = [];
        $scope.ExistingOrders = [];
        $scope.getCdOrders({ id: 'pageNumber1', value: 1 });
    };

    $scope.EnableDisableCallFrequency = function (order) {
        if (order.callable === 'Yes') {
            if (order.term !== '') {
                $scope.SetRates(order);            
            }

            if (order.rate !== 'Callable Rate Not Available') {
                $("#callfrequencyholder" + order.rowId).prop("disabled", false);
                $(".selectpicker[data-id='callfrequencyholder" + order.rowId + "']").removeClass("disabled");
            }
        }
        else {
            if (order.term !== '') {
                $scope.SetRates(order);
            }

            order.callfrequency = '';
            $("#callfrequencyholder" + order.rowId).val("").selectpicker("refresh");
            $("#callfrequencyholder" + order.rowId).prop("disabled", true);
            $(".selectpicker[data-id='callfrequencyholder" + order.rowId + "']").addClass("disabled");
        }
    };

    var CallableRateAvailability = function () {
        for (i = 0; i < $scope.OrderArray.length; i++) {
            if ($scope.OrderArray[i].rate === 'Callable Rate Not Available') {
                return false;
            }
        }

        return true;
    };

    $scope.UpdateNumericAmount = function (order) {
        order.numericamount = parseInt(order.amount);
    };

    function add_business_days(days) {
        var now = new Date();
        var dayOfTheWeek = now.getDay();
        var calendarDays = days;
        var deliveryDay = dayOfTheWeek + days;
        if (deliveryDay >= 6) {
            //deduct this-week days
            days -= 6 - dayOfTheWeek;
            //count this coming weekend
            calendarDays += 2;
            //how many whole weeks?
            deliveryWeeks = Math.floor(days / 5);
            //two days per weekend per week
            calendarDays += deliveryWeeks * 2;
        }
        now.setTime(now.getTime() + calendarDays * 24 * 60 * 60 * 1000);
        return now;
    }

    var getMonday = function () {
        var d = new Date();
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        $scope.Monday = new Date(d.setDate(diff));
    };

    var getRatesLastUpdatedDate = function () {
        document.getElementById('overlay').style.display = '';
        var req = {
            method: 'GET',
            url: '/api/CdApi/GetDateRatesLastUpdates',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                document.getElementById('overlay').style.display = 'none';
                $scope.RatesLastUpdatedDate = result.data;
            }
            else {
                document.getElementById('overlay').style.display = 'none';
                dlg = dialogs.error('An error occurred while trying to get date when rates were last updated. Please send an e-mail to castellonf@stifel.com.');
            }
        }, function () {
            document.getElementById('overlay').style.display = 'none';
            dlg = dialogs.error('An error occurred while trying to get date when rates were last updated. Please send an e-mail to castellonf@stifel.com.');
        });
    };

    var initializeOrderForm = function () {
        var cdOrder = {};
        $scope.RowCount = 0;
        $scope.RowCount = $scope.RowCount + 1;
        cdOrder.rowId = $scope.RowCount;
        cdOrder.orderDate = $scope.OrderDate;
        cdOrder.orderBy = $scope.OrderBy;
        cdOrder.contactPhone = $scope.ContactPhone;
        cdOrder.term = $scope.Term;
        cdOrder.callable = $scope.Callable;
        cdOrder.callfrequency = $scope.CallFrequency;
        cdOrder.rate = $scope.Rate;
        cdOrder.amount = $scope.Amount;
        cdOrder.settleDate = $scope.SettleDate;
        cdOrder.frequency = $scope.Frequency;
        cdOrder.validrate = '';
        cdOrder.numericamount = '';
        cdOrder.notes = '';

        $scope.OrderArray.push(cdOrder);

        setTimeout(function () {
            $('#termholder' + cdOrder.rowId).selectpicker();
            $('#termholder' + cdOrder.rowId).selectpicker('refresh');

            $('#callable' + cdOrder.rowId).selectpicker();
            $('#callable' + cdOrder.rowId).selectpicker('refresh');

            $('#frequency' + cdOrder.rowId).selectpicker();
            $('#frequency' + cdOrder.rowId).selectpicker('refresh');

            $('#settledate' + cdOrder.rowId).datepicker({ todayHighlight: true, startDate: 'd', daysOfWeekDisabled:'06'}).on('changeDate', function (e) {
                $(this).datepicker('hide');
            });

            $('#settledate' + cdOrder.rowId).datepicker("setDate", add_business_days(14));
            
            $scope.EnableDisableCallFrequency($scope.OrderArray[0]);

            $('[data-toggle="tooltip"]').tooltip(); 
        }, 500);
    };

    initialize();

}]);

angular.bootstrap(document.getElementById("issuecd"), ['issuecd']);