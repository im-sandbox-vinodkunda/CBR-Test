cbrBankAnalyticsModule.directive('cbrReturnPress', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13 && attrs.cbrReturnPress !== '') {
                angular.element(document.querySelector('#' + attrs.cbrReturnPress)).focus();
                event.preventDefault();
            }
        });
    };
});

cbrBankAnalyticsModule.controller("gapAnalyzer", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.gapAnalyzerSubTab = 'gapAnalyzerFinancialHighlights';
    $scope.ToggleGapAnalyzerTabs = function (tabId) {
        $scope.gapAnalyzerSubTab = tabId;
        if (tabId === 'gapAnalyzerFinancialHighlights') {
            angular.element(document.querySelector('#lnkFinancialHighlights')).addClass('active');
            angular.element(document.querySelector('#lnkLoansLeases')).removeClass('active');
        }
        else {
            angular.element(document.querySelector('#lnkFinancialHighlights')).removeClass('active');
            angular.element(document.querySelector('#lnkLoansLeases')).addClass('active');
        }
        renderVarianceChart($scope.chartdata, $scope.chartCaption, $scope.chartColors);
    }

    $scope.ChangeScreen = function (templateId) {
        if (templateId === 'bankAnalyticsDashboard') {
            $rootScope.GaLlSelectedBank = {};
        }
        window.location.href = '/';
    }

}]);

cbrBankAnalyticsModule.controller("gapAnalyzerFinancialHeights", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.AllCustomPeerGroups = [];
    $scope.Institutions = [];
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $rootScope.GaSelectedInstitution = {};
    $scope.SelectedCustomPeerGroup = {};
    $scope.SelectedPeriod = {};
    $scope.Periods = [];
    $scope.SelectedPeriod = {};
    $scope.FinancialHighlightsData = {};

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
        else if (boxType === 'ClearBenchmarkConfirmation') {
            $scope.toggleClearBenchmarkConfirmationModal();
        }
        else {
            $scope.toggleErrorMessageBoxModal('');
        }
    }

    $scope.toggleClearBenchmarkConfirmationModal = function (message) {
        $scope.AlertMessageText = message;
        $scope.showConfirmationModalClearBenchmark = !$scope.showConfirmationModalClearBenchmark;
    };

    var getAllPeerGroupsForUser = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskProfilesApi/GetCustomPeerGroupsForUser',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data != null && result.data.length > 0) {

                    $scope.AllCustomPeerGroups = result.data;
                    var defaultPeerGroup = $scope.AllCustomPeerGroups.filter(function (obj) {
                        return obj.isDefault === true;
                    })[0];
                    $scope.SelectedCustomPeerGroup = defaultPeerGroup;
                    getPastFiveQuarters();
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('There are no custom peer groups. Please create custom peer groups by going to "Manage Profiles" screen.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getInstitutionList = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskProfilesApi/GetInstitutionsForUser',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data != null && result.data.length > 0) {


                    $scope.Institutions = result.data;
                    var defaultInstitution = $scope.Institutions.filter(function (obj) {
                        return obj.isDefault === true;
                    })[0];

                    if (typeof $rootScope.GaLlSelectedBank !== 'undefined' && typeof $rootScope.GaLlSelectedBank.institutionName !== 'undefined') {
                        $rootScope.GaSelectedInstitution = $rootScope.GaLlSelectedBank;
                    }

                    if (typeof $rootScope.GaSelectedInstitution.institutionName === 'undefined')
                        $rootScope.GaSelectedInstitution = defaultInstitution;
                    angular.element(document.querySelector('#financialHighlightsBankSectionLoader')).addClass('hidden');
                    getAllPeerGroupsForUser();
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch favorite institutions. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.ToggleDataOnPeerGroupChange = function (peerGroup) {
        $scope.SelectedCustomPeerGroup = peerGroup;
        $scope.FinancialHighlightsData = {};
        angular.element(document.querySelector('#financialHighlightsDataLoader')).removeClass('hidden');
        getFinancialHighlightsData();
    }

    $scope.ToggleDataOnInstitutionChange = function (institution) {
        $rootScope.GaSelectedInstitution = institution;
        $scope.FinancialHighlightsData = {};
        angular.element(document.querySelector('#financialHighlightsDataLoader')).removeClass('hidden');
        getFinancialHighlightsData();
    }

    var getFinancialHighlightsData = function () {
        angular.element(document.querySelector('#financialHighlightsDataLoader')).removeClass('hidden');
        var gapAnalyzerParams = {
            InstitutionKey: $rootScope.GaSelectedInstitution.institutionKey,
            Period: $scope.SelectedPeriod.value,
            CustomPeerGroupKey: $scope.SelectedCustomPeerGroup.key,
            StandardPeerGroupKey: $rootScope.GaSelectedInstitution.stdPeerGroupKey
        };

        var req = {
            method: 'POST',
            url: '/api/GapAnalyzerApi/GetFinancialHighlightsData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: gapAnalyzerParams
        };

        $http(req).then(
            function (result) {
                if (result.data != null) {


                    angular.element(document.querySelector('#financialHighlightsDataLoader')).addClass('hidden');
                    $scope.FinancialHighlightsData = result.data;
                }
            },
            function () {
                angular.element(document.querySelector('#financialHighlightsDataLoader')).addClass('hidden');
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch financial highlights data. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.ResetBenchmark = function () {
        $scope.toggleClearBenchmarkConfirmationModal();
        angular.element(document.querySelector('#financialHighlightsDataLoader')).removeClass('hidden');
        var gapAnalyzerParams = {
            InstitutionKey: $rootScope.GaSelectedInstitution.institutionKey,
        };

        var req = {
            method: 'POST',
            url: '/api/GapAnalyzerApi/ResetBenchmarks',
            headers: {
                'Content-Type': 'application/json'
            },
            data: gapAnalyzerParams
        };

        $http(req).then(
            function (result) {
                if (result.data != null) {


                    if (result.data === true) {
                        angular.element(document.querySelector('#financialHighlightsDataLoader')).addClass('hidden');
                        $scope.FinancialHighlightsData = {};
                        getFinancialHighlightsData();
                    }
                }
            },
            function () {
                angular.element(document.querySelector('#financialHighlightsDataLoader')).addClass('hidden');
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to reset benchmarks. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getPastFiveQuarters = function () {
        //angular.element(document.querySelector('#loaderCramDashboard')).removeClass('hidden');
        var req = {
            method: 'GET',
            url: '/api/BankToBankAnalyzer/GetLastFiveQuarters',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {


                $scope.Periods = result.data;
                $scope.SelectedPeriod = $scope.Periods[0];
                getFinancialHighlightsData();
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while loading the financial periods. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    $scope.UpdateBenchmark = function (earningsAndPerfItem) {
        angular.element(document.querySelector('#financialHighlightsDataLoader')).removeClass('hidden');
        var gapAnalyzerParams = {
            InstitutionKey: $rootScope.GaSelectedInstitution.institutionKey,
            FinancialHighlightsData: $scope.FinancialHighlightsData
        };

        if (gapAnalyzerParams.BenchmarkValue === '')
            gapAnalyzerParams.BenchmarkValue = -1;

        var req = {
            method: 'POST',
            url: '/api/GapAnalyzerApi/UpdateBenchmark',
            headers: {
                'Content-Type': 'application/json'
            },
            data: gapAnalyzerParams
        };

        $http(req).then(
            function (result) {
                if (result.data != null && result.data === true) {


                    if (result.data === true) {
                        $scope.FinancialHighlightsData = {};
                        getFinancialHighlightsData();
                    }
                }
            },
            function () {
                angular.element(document.querySelector('#financialHighlightsDataLoader')).addClass('hidden');
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to update benchmark. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.ToggleDataOnPeriodChange = function (period) {
        $scope.SelectedPeriod = period;
        $scope.FinancialHighlightsData = {};
        angular.element(document.querySelector('#financialHighlightsDataLoader')).removeClass('hidden');
        getFinancialHighlightsData();
    }

    var setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        var domain = "domain=" + window.location.hostname + ";";
        document.cookie = cname + "=" + cvalue + "; " + expires + "; " + domain;
    }

    $scope.ExportToExcelGapAnalyzer = function () {
        setCookie('fileDownload', true, 1);
        document.getElementById('overlay').style.display = '';
        var gapAnalyzerParams = {
            InstitutionKey: $rootScope.GaSelectedInstitution.institutionKey,
            Period: $scope.SelectedPeriod.value,
            CustomPeerGroupKey: $scope.SelectedCustomPeerGroup.key,
            StandardPeerGroupKey: $rootScope.GaSelectedInstitution.stdPeerGroupKey,
            QtdOrYtd: "QTD"
            //QtdorYtd: gapAnalyzerService.getQtdorYtd(),
            //gapAnalyzerService:setreportPeriod(Period)
        };
        var req = {
            httpMethod: 'POST',
            checkInterval: 500,
            data: gapAnalyzerParams,
            successCallback: function (url) {
                if (url === '/Account/Login') {
                    window.location.href = url;
                }

                document.getElementById('overlay').style.display = 'none';
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to download the Excel. Please send an e-mail to admin@cb-resource.com.');
            },
            cookiePath: '/',
            cookieDomain: window.location.hostname
        };
        $.fileDownload('/api/GapAnalyzerApi/GetGapAnalyzerExporttoExcel', req);
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;
        if (isIE === true || isEdge === true) {
            setTimeout(function () {
                document.getElementById('overlay').style.display = 'none';
            }, 2000);
        }
    }

    var initialize = function () {
        getInstitutionList();
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("gapAnalyzerLoansAndLeases", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.AllCustomPeerGroups = [];
    $scope.Institutions = [];
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.SelectedCustomPeerGroup = {};
    $scope.SelectedPeriod = {};
    $scope.LoansLeasesData = [];
    $scope.PeriodType = 'QTD';
    $scope.StrengthWeaknessData = {};
    $scope.LoansLeasesChartData = {};
    $scope.idSelectedDataItem = '';
    $rootScope.GaLlSelectedBank = {};

    var getCurrentPeriod = function () {
        var req = {
            method: 'GET',
            url: '/api/GapAnalyzerApi/GetCurrentPeriod',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data != null) {


                    $scope.CurrentPeriod = result.data;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get current period date. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        var domain = "domain=" + window.location.hostname + ";";
        document.cookie = cname + "=" + cvalue + "; " + expires + "; " + domain;
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === 'N/A')
            return 'N/A';
        else
            return $filter('number')(numericValue, fractionSize);
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

    var getAllPeerGroupsForUser = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskProfilesApi/GetCustomPeerGroupsForUser',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data != null && result.data.length > 0) {


                    $scope.AllCustomPeerGroups = result.data;
                    var defaultPeerGroup = $scope.AllCustomPeerGroups.filter(function (obj) {
                        return obj.isDefault === true;
                    })[0];
                    $scope.SelectedCustomPeerGroup = defaultPeerGroup;
                    getLoansLeasesData();
                    getStrengthWeaknessData();
                    getLoansLeasesChartData();
                }
                else {
                    angular.element(document.querySelector('#loansLeasesBankSectionLoader')).addClass('hidden');
                    $scope.toggleSuccessMessageBoxModal('There are no custom peer groups. Please create custom peer groups by going to "Manage Profiles" screen.');
                }
            },
            function () {
                angular.element(document.querySelector('#loansLeasesBankSectionLoader')).addClass('hidden');
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getInstitutionList = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskProfilesApi/GetInstitutionsForUser',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data != null && result.data.length > 0) {


                    $scope.Institutions = result.data;
                    var defaultInstitution = $scope.Institutions.filter(function (obj) {
                        return obj.isDefault === true;
                    })[0];
                    if (typeof $rootScope.GaSelectedInstitution.institutionName === 'undefined') {
                        $rootScope.GaSelectedInstitution = defaultInstitution;
                        $rootScope.GaLlSelectedBank = defaultInstitution;
                    }
                    else {
                        $rootScope.GaLlSelectedBank = $rootScope.GaSelectedInstitution;
                    }
                    angular.element(document.querySelector('#loansLeasesBankSectionLoader')).addClass('hidden');
                    getAllPeerGroupsForUser();
                }
                else {
                    angular.element(document.querySelector('#loansLeasesBankSectionLoader')).addClass('hidden');
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                }
            },
            function () {
                angular.element(document.querySelector('#loansLeasesBankSectionLoader')).addClass('hidden');
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch favorite institutions. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.ToggleDataOnPeerGroupChange = function (peerGroup) {
        $scope.SelectedCustomPeerGroup = peerGroup;
        $scope.LoansLeasesData = [];
        getLoansLeasesData();
        $scope.StrengthWeaknessData = {};
        getStrengthWeaknessData();
        getLoansLeasesChartData();
        angular.element(document.querySelector('#loansLeasesDataLoader')).removeClass('hidden');
    }

    $scope.ToggleDataOnInstitutionChange = function (institution) {
        $rootScope.GaSelectedInstitution = institution;
        $rootScope.GaLlSelectedBank = institution;
        $scope.LoansLeasesData = [];
        getLoansLeasesData();
        $scope.StrengthWeaknessData = {};
        getStrengthWeaknessData();
        getLoansLeasesChartData();
        angular.element(document.querySelector('#loansLeasesDataLoader')).removeClass('hidden');
    }

    var getLoansLeasesData = function () {
        var gapAnalyzerParams = {
            InstitutionKey: $rootScope.GaSelectedInstitution.institutionKey,
            CustomPeerGroupKey: $scope.SelectedCustomPeerGroup.key,
            QtdOrYtd: $scope.PeriodType
        };

        var req = {
            method: 'POST',
            url: '/api/GapAnalyzerApi/GetLoansLeasesData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: gapAnalyzerParams
        };

        $http(req).then(
            function (result) {
                if (result.data != null) {


                    angular.element(document.querySelector('#loansLeasesDataLoader')).addClass('hidden');
                    $scope.LoansLeasesData = result.data;
                }
            },
            function () {
                angular.element(document.querySelector('#loansLeasesDataLoader')).addClass('hidden');
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch loand and leases data. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getLoansLeasesChartData = function () {
        var gapAnalyzerParams = {
            InstitutionKey: $rootScope.GaSelectedInstitution.institutionKey,
            CustomPeerGroupKey: $scope.SelectedCustomPeerGroup.key,
            QtdOrYtd: $scope.PeriodType
        };

        var req = {
            method: 'POST',
            url: '/api/GapAnalyzerApi/GetChartData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: gapAnalyzerParams
        };

        $http(req).then(
            function (result) {
                if (result.data != null) {


                    angular.element(document.querySelector('#loansLeasesDataLoader')).addClass('hidden');
                    $scope.LoansLeasesChartData = result.data;
                    var chartColors = "";
                    var firstKeyValue = Object.keys($scope.LoansLeasesChartData)[0];
                    var ubprDesc = '';
                    for (i = 0; i < $scope.LoansLeasesData.length; i++) {
                        if ($scope.LoansLeasesData[i].ubprConceptCode === firstKeyValue.toUpperCase()) {
                            ubprDesc = $scope.LoansLeasesData[i].description;
                            break;
                        }
                    }

                    for (j = 0; j < $scope.LoansLeasesChartData.ubprE420.length; j++) {
                        if ($scope.LoansLeasesChartData.ubprE420[j].value > 0) {
                            if (chartColors.length > 0)
                                chartColors += ",#008000";
                            else
                                chartColors += "#008000";
                        }
                        else {
                            if (chartColors.length > 0)
                                chartColors += ",#A71D23";
                            else
                                chartColors += "#A71D23";
                        }
                    }
                    angular.element(document.querySelector('#ll0')).addClass('active');
                    renderVarianceChart($scope.LoansLeasesChartData.ubprE420, ubprDesc, chartColors);
                }
            },
            function () {
                angular.element(document.querySelector('#loansLeasesDataLoader')).addClass('hidden');
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch loand and leases data. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.ToggleChart = function (ubprObj) {
        var noChartData = [];
        $scope.idSelectedDataItem = ubprObj.ubprConceptCode;
        renderVarianceChart(noChartData, '', '');
        var chartColors = "";
        var dictKey = ubprObj.ubprConceptCode.substring(4, ubprObj.ubprConceptCode.length);
        if (dictKey.indexOf("F") >= 0)
            dictKey = 'f' + dictKey.substring(dictKey.indexOf('B'), ubprObj.ubprConceptCode.length);

        for (j = 0; j < $scope.LoansLeasesChartData['ubpr' + dictKey].length; j++) {
            if ($scope.LoansLeasesChartData['ubpr' + dictKey][j].value > 0) {
                if (chartColors.length > 0)
                    chartColors += ",#008000";
                else
                    chartColors += "#008000";
            }
            else {
                if (chartColors.length > 0)
                    chartColors += ",#A71D23";
                else
                    chartColors += "#A71D23";
            }
        }
        renderVarianceChart($scope.LoansLeasesChartData['ubpr' + dictKey], ubprObj.description, chartColors);
    }

    var renderVarianceChart = function (chartData, chartCaption, chartColors) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "animation": "0",
                    "caption": chartCaption,
                    "subCaption": "",
                    "showBorder": "1",
                    "borderColor": "#cccccc",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": chartColors,
                    "bgColor": "#ffffff",
                    "borderAlpha": "20",
                    "canvasBorderAlpha": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "rotatevalues": "0",
                    "valueFontColor": "#000000",
                    "valueBorderColor": "#ffffff",
                    "valueBgColor": "#ffffff",
                    "valueFontBold": 1,
                    "showXAxisLine": "1",
                    "xAxisLineColor": "#999999",
                    "divlineColor": "#999999",
                    "divLineDashed": "1",
                    "showAlternateHGridColor": "1",
                    "subcaptionFontBold": "0",
                    "subcaptionFontSize": "14",
                    "decimals": "2",
                    "forceDecimals": "1",
                    "showValues": "1",
                    "useEllipsesWhenOverflow": "1",
                    "placeValuesInside": "1",
                    "exportEnabled": "1",
                    "formatNumber": "1",
                    "formatNumberScale": "0",
                    "decimals": "0"
                },
                "data": chartData
            };
            var chartContainer = $('#gapAnalyzerChartContainer');
            if (chartContainer != null) {
                var varianceChart = FusionCharts.items.varianceChart;
                if (typeof varianceChart === 'undefined') {
                    varianceChart = new FusionCharts({
                        type: 'column2d',
                        id: 'varianceChart',
                        renderAt: 'gapAnalyzerChartContainer',
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });
                    varianceChart.addEventListener("rendered", varianceChartRenderCompleteHandler);

                    varianceChart.render();
                }
                else {
                    //setChartBase64StringToObject(assetGrowthChart);

                    varianceChart.addEventListener("rendered", varianceChartRenderCompleteHandler);

                    varianceChart.setChartData(dSource, 'json');
                    varianceChart.render();
                }
            } // if block ends here
        });
    }

    var varianceChartRenderCompleteHandler = function (e) {
        FusionCharts.items.varianceChart.exportChart({
            "exportFormat": "jpg",
            "exportHandler": window.location.protocol + "//" + window.location.hostname + "/FCExporter.aspx",
            "exportAction": "save",
            "exportFileName": "varianceChart"
        });

        FusionCharts.items.varianceChart.removeEventListener("rendered", varianceChartRenderCompleteHandler);
    }

    var getStrengthWeaknessData = function () {
        var gapAnalyzerParams = {
            InstitutionKey: $rootScope.GaSelectedInstitution.institutionKey,
            CustomPeerGroupKey: $scope.SelectedCustomPeerGroup.key,
            QtdOrYtd: $scope.PeriodType
        };

        var req = {
            method: 'POST',
            url: '/api/GapAnalyzerApi/GetStrengthWeaknessData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: gapAnalyzerParams
        };

        $http(req).then(
            function (result) {
                if (result.data != null) {


                    $scope.StrengthWeaknessData = result.data;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch loand and leases data. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.ToggleQtdYtd = function () {
        if (angular.element(document.querySelector('#gapAnalyzerQtdYtdToggle')).prop('checked') === true) {
            $scope.PeriodType = 'YTD';
            $scope.LoansLeasesData = [];
            getLoansLeasesData();
            $scope.StrengthWeaknessData = {};
            getStrengthWeaknessData();
            renderVarianceChart(null, null, null);
            getLoansLeasesChartData();
            angular.element(document.querySelector('#loansLeasesDataLoader')).removeClass('hidden');
            angular.element(document.querySelector('#chartTypeLabel')).html('<h4 class="panel-title"><strong>Variance: 5 Year Trend </strong></h4>');
        }
        else {
            $scope.PeriodType = 'QTD';
            $scope.LoansLeasesData = [];
            getLoansLeasesData();
            $scope.StrengthWeaknessData = {};
            getStrengthWeaknessData();
            renderVarianceChart(null, null, null);
            getLoansLeasesChartData();
            angular.element(document.querySelector('#loansLeasesDataLoader')).removeClass('hidden');
            angular.element(document.querySelector('#chartTypeLabel')).html('<h4 class="panel-title"><strong>Variance: 5 Quarter Trend </strong></h4>');
        }
    }

    $scope.GetClassForTabOrder = function (dataItem) {
        if (dataItem.tabOrder === 1)
            return 'onelefttab';
        else if (dataItem.tabOrder === 2)
            return 'twolefttab';
        else
            return '';
    }

    $scope.ExportToExcelGapAnalyzer = function () {
        setCookie('fileDownload', true, 1);
        document.getElementById('overlay').style.display = '';
        //angular.element(document.querySelector('#financialHighlightsDataLoader')).removeClass('hidden');
        var gapAnalyzerParams = {
            InstitutionKey: $rootScope.GaSelectedInstitution.institutionKey,
            Period: $scope.CurrentPeriod,
            CustomPeerGroupKey: $scope.SelectedCustomPeerGroup.key,
            StandardPeerGroupKey: $rootScope.GaSelectedInstitution.stdPeerGroupKey,
            QtdOrYtd: $scope.PeriodType
        };
        var req = {
            httpMethod: 'POST',
            checkInterval: 500,
            data: gapAnalyzerParams,
            successCallback: function (url) {
                if (url === '/Account/Login') {
                    window.location.href = url;
                }

                document.getElementById('overlay').style.display = 'none';
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to download the Excel. Please send an e-mail to admin@cb-resource.com.');
            },
            cookiePath: '/',
            cookieDomain: window.location.hostname
        };
        $.fileDownload('/api/GapAnalyzerApi/GetGapAnalyzerExporttoExcel', req);
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;
        if (isIE === true || isEdge === true) {
            setTimeout(function () {
                document.getElementById('overlay').style.display = 'none';
            }, 2000);
        }
    }

    var initialize = function () {
        $('#gapAnalyzerQtdYtdToggle').bootstrapToggle({
            on: 'QTD',
            off: 'YTD'
        });
        angular.element(document.querySelector('#chartTypeLabel')).html('<h4 class="panel-title"><strong>Variance: 5 Quarter Trend </strong></h4>');
        getInstitutionList();
        getCurrentPeriod();
    }

    initialize();
}]);

//cbrBankAnalyticsModule.service('gapAnalyzerService', function () {
//    this.period = { reportPeriod: 0 };

//    this.setQtdorYtd = function (QtdorYtd) {
//        this.period.QtdorYtd = QtdorYtd;
//    };

//    this.getQtdorYtd = function() {
//        return this.period.QtdorYtd;
//    };

//    this.setreportPeriod = function(reportPeriod) {
//        this.period.reportPeriod = reportPeriod;
//    };

//    this.getreportPeriod = function() {
//        return this.period.reportPeriod;
//    };
//});
