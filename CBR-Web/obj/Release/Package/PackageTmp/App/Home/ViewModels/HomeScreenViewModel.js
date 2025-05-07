cbrHomeModule.directive('modal', function () {
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
                if (value == true) {
                    if(scope.title === 'Alert')
                        angular.element(document.querySelector('#alertMessageBox')).removeClass('hideGreenBox');
                    else if (scope.title === 'Success')
                        angular.element(document.querySelector('#successMessageBox')).removeClass('hideGreenBox');
                    else
                        angular.element(document.querySelector('#errorMessageBox')).removeClass('hideGreenBox');

                    $(element).modal('show');
                }
                else {
                    $(element).modal('hide');
                }
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

cbrHomeModule.controller("homeScreenViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope","$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope,$filter) {
    $scope.YtdHeaders = [];
    $scope.Table1Data = [];
    $scope.Table2Data = [];
    $scope.Chart1Data = [];
    $scope.Chart2Data = [];
    $scope.AllHomeScreenData = {};
    $scope.AllHomeScreenChartData = {};
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

    $scope.HideUnhide = function(hideOrUnhide)
    {
        if (hideOrUnhide === false)
            return 'hideGreenBox';
        else
            return 'unhideGreenBox';
    }

    $scope.toggleSuccessMessageBoxModal = function (message) {
        $scope.SuccessMessageText = message;
        $scope.showSuccessMessageModal = !$scope.showSuccessMessageModal;
    };

    $scope.toggleErrorMessageBoxModal = function (message) {
        if (message === '') {
            $scope.ErrorMessageText = message;
            $scope.showErrorMessageModal = !$scope.showErrorMessageModal;
        }
        else if (message !== '' && $scope.showErrorMessageModal === true) {
            $scope.ErrorMessageText = $scope.ErrorMessageText + "\n" + message;
        }
        else {
            $scope.ErrorMessageText = message;
            $scope.showErrorMessageModal = !$scope.showErrorMessageModal;
        }
    };

    $scope.Ok = function ($event, boxType) {
        if (boxType === 'Success') {
            $scope.toggleSuccessMessageBoxModal('');
        }
        else {
            $scope.toggleErrorMessageBoxModal('');
        }
    }
    $scope.Close= function ($event, boxType) {
        if (boxType === 'Close') {
            $scope.showAlertMessageModal = false;
        }      
    }

    $scope.ToggleTab = function ($event, tabId)
    {
        if (tabId == 'earnings') {
            if (typeof $scope.AllHomeScreenData.ubprE013 != 'undefined' && typeof $scope.AllHomeScreenData.ubprE630 != 'undefined') {
                $scope.Table1Data = $scope.AllHomeScreenData.ubprE013;
                $scope.Table2Data = $scope.AllHomeScreenData.ubprE630;
                angular.element(document.querySelector('#firstDataSectionTitle')).html('<h5>ROAA<small>(%)</small></h5><div ibox-tools=""></div>');
                angular.element(document.querySelector('#secondDataSectionTitle')).html('<h5>ROAE<small>(%)</small></h5><div ibox-tools=""></div>');
                renderBankProfileBarChart('chart1', $scope.AllHomeScreenChartData.ubprE013, '');
                renderBankProfileBarChart('chart2', $scope.AllHomeScreenChartData.ubprE630, '');
            }
        }
        else if (tabId == 'growth') {
            if (typeof $scope.AllHomeScreenData.calC0007 != 'undefined' && typeof $scope.AllHomeScreenData.calC0008 != 'undefined') {
                $scope.Table1Data = $scope.AllHomeScreenData.calC0007;
                $scope.Table2Data = $scope.AllHomeScreenData.calC0008;
                angular.element(document.querySelector('#firstDataSectionTitle')).html('<h5>Loans & Leases Growth Rate (YTD)<small>(%)</small></h5><div ibox-tools=""></div>');
                angular.element(document.querySelector('#secondDataSectionTitle')).html('<h5>Deposit Growth Rate (YTD)<small>(%)</small></h5><div ibox-tools=""></div>');
                renderBankProfileBarChart('chart1', $scope.AllHomeScreenChartData.calC0007, '');
                renderBankProfileBarChart('chart2', $scope.AllHomeScreenChartData.calC0008, '');
            }
        }
        else if (tabId == 'asset-quality') {
            if (typeof $scope.AllHomeScreenData.calC0001 != 'undefined' && typeof $scope.AllHomeScreenData.ubpR7414 != 'undefined') {
                $scope.Table1Data = $scope.AllHomeScreenData.calC0001;
                $scope.Table2Data = $scope.AllHomeScreenData.ubpR7414;
                angular.element(document.querySelector('#firstDataSectionTitle')).html('<h5>Non-Performing Assets/Total Assets<small>(%)</small></h5><div ibox-tools=""></div>');
                angular.element(document.querySelector('#secondDataSectionTitle')).html('<h5>Total Non-Current Loans & Leases/Total Loans & Leases<small>(%)</small></h5><div ibox-tools=""></div>');
                renderBankProfileBarChart('chart1', $scope.AllHomeScreenChartData.calC0001, '');
                renderBankProfileBarChart('chart2', $scope.AllHomeScreenChartData.ubpR7414, '');
            }
        }
        else {
            if (typeof $scope.AllHomeScreenData.ubprE091 != 'undefined' && typeof $scope.AllHomeScreenData.ubprE115 != 'undefined') {
                $scope.Table1Data = $scope.AllHomeScreenData.ubprE091;
                $scope.Table2Data = $scope.AllHomeScreenData.ubprE115;
                angular.element(document.querySelector('#firstDataSectionTitle')).html('<h5>Yield on Total Loans & Leases (TE)<small>(%)</small></h5><div ibox-tools=""></div>');
                angular.element(document.querySelector('#secondDataSectionTitle')).html('<h5>Cost of All Interest-Bearing Funds<small>(%)</small></h5><div ibox-tools=""></div>');
                renderBankProfileBarChart('chart1', $scope.AllHomeScreenChartData.ubprE091, '');
                renderBankProfileBarChart('chart2', $scope.AllHomeScreenChartData.ubprE115, '');
            }
        }
    }

    $scope.BindNumber = function (numericValue) {
        if (numericValue === null)
            return 'N/A';
        else
            return $filter('number')(numericValue, 2);
    }

    var getHomeScreenData = function()
    {
        var req = {
            method: 'GET',
            url: '/api/HomeApi/GetHomeScreenData',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                getHomeScreenChartData();
                $scope.AllHomeScreenData = result.data;
                $scope.Table1Data = $scope.AllHomeScreenData.ubprE013;
                $scope.Table2Data = $scope.AllHomeScreenData.ubprE630;
                angular.element(document.querySelector('#firstSectionLoader')).html('');
                angular.element(document.querySelector('#secondSectionLoader')).html('');
                angular.element(document.querySelector('#table1')).removeClass('hidden');
                angular.element(document.querySelector('#table2')).removeClass('hidden');
            }
            else {
                $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                angular.element(document.querySelector('#firstSectionLoader')).html('');
                angular.element(document.querySelector('#secondSectionLoader')).html('');
            }
        },
        function () {
            alert('failure');
        });
    }

    var getHomeScreenChartData = function()
    {
        var req = {
            method: 'GET',
            url: '/api/HomeApi/GetHomeScreenChartData',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            $scope.AllHomeScreenChartData = result.data;
            renderBankProfileBarChart('chart1', $scope.AllHomeScreenChartData.ubprE013, '');
            renderBankProfileBarChart('chart2', $scope.AllHomeScreenChartData.ubprE630, '');
        },
        function () {
            alert('failure');
        });
    }

    var getYearToDateHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/HomeApi/GetYtdHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            $scope.YtdHeaders = result.data;
        },
        function () {
            alert('failure');
        });
    }

    var renderBankProfileBarChart = function (chartContainerName, chartData, yAxisLabel) {
        FusionCharts.ready(function () {
            var chartContainer = $('#' + chartContainerName);
            if (chartContainer != null) {
                var homeScreenLineChart = new FusionCharts({
                    type: 'msline',
                    renderAt: chartContainerName,
                    width: '100%',
                    height: '250',
                    dataFormat: 'json',
                    dataSource: {
                        "chart": {
                            "caption": "",
                            "subCaption": "",
                            "captionFontSize": "14",
                            "subcaptionFontSize": "14",
                            "subcaptionFontBold": "0",
                            "paletteColors": "#A71D23",
                            "bgcolor": "#ffffff",
                            "showBorder": "0",
                            "showShadow": "0",
                            "showCanvasBorder": "0",
                            "usePlotGradientColor": "0",
                            "legendBorderAlpha": "0",
                            "legendShadow": "0",
                            "showAxisLines": "0",
                            "showAlternateHGridColor": "0",
                            "divlineThickness": "1",
                            "divLineDashed": "1",
                            "divLineDashLen": "1",
                            "divLineGapLen": "1",
                            "xAxisName": "",
                            "showValues": "0",
                            "decimals":"2",
                            "forceDecimals":"1"
                        },
                        "categories": [
                            {
                                "category": chartData.categories.category.categoryLabels
                            }
                        ],
                        "dataset": chartData.dataSetList
                    }
                });

                homeScreenLineChart.render();
            } // if block ends here
        });
    }

    $scope.toggleAlertMessageBoxModal = function (message) {       
        $scope.AlertMessageText = message;
        $scope.showAlertMessageModal = !$scope.showAlertMessageModal;
    };

    getYearToDateHeaders();
    getHomeScreenData();
    
}]);

angular.bootstrap(document.getElementById("home"), ['cbrhome']);
