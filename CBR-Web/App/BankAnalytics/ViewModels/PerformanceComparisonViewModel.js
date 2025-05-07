cbrBankAnalyticsModule.controller("performanceComparisonViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.BankPerformanceMetrics = [];
    $scope.BankName = '';
    $scope.CertNumber = '';
    $scope.Location = 'Select a Location';
    $scope.AssetSize = 'Asset Size';
    $scope.Percentile = 'Select Percentile';
    $scope.FdicCertNumber = '';
    $scope.TopBanks = [];
    $scope.BottomBanks = [];
    $scope.BankStateName = '';
    $scope.FavoriteSearches = [];
    $scope.InstitutionKey = 0;
    $scope.BottomPerformingTableHeaders = [];
    $scope.TopPerformingTableHeaders = [];
    $scope.SelectedMetric = {};

    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.Institutions = [];

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

    angular.element(document.querySelector('#performanceTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
    angular.element(document.querySelector('#topPerfTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
    angular.element(document.querySelector('#bottomPerfTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');

    var clearChart = function (message) {
        angular.element(document.querySelector('#chart-container')).html(message);
    }

    $scope.GoToBankProfile = function ($event, rankDataObj) {
        $rootScope.ShowBankProfileForInstitutionKey = rankDataObj.institutionKey;
        $rootScope.template = 'ProfileOverview';
    }

    $scope.BindNumber = function (numericValue) {
        if (numericValue === null)
            return 'N/A';
        else
            return $filter('number')(numericValue, 2);
    }

    $scope.AddToFavorite = function ($event) {
        document.getElementById('overlay').style.display = '';
        var addToFavoriteParam = {
            InstitutionKey: $scope.InstitutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/PeerGroupsApi/AddBankToFavoriteBanks',
            headers: {
                'Content-Type': 'application/json'
            },
            data: addToFavoriteParam
        };

        $http(req).then(function (result) {

            document.getElementById('overlay').style.display = 'none';
        }, function () {
            alert('An error occurred while trying to add the bank as favorite bank. Please send an e-mail to castellonf@stifel.com.');
            document.getElementById('overlay').style.display = 'none';
        });
    }

    $scope.GoToProfileOverview = function ($event) {
        $rootScope.ShowBankProfileForInstitutionKey = $scope.InstitutionKey;
        $rootScope.template = 'ProfileOverview';
    }

    $scope.SaveAsFavoriteSearch = function () {
        document.getElementById('overlay').style.display = '';

        var favoriteSearchParams = {
            Location: '',
            AssetSize: '',
            Percentile: ''
        }

        favoriteSearchParams.Location = $scope.Location;
        favoriteSearchParams.AssetSize = $scope.AssetSize;
        favoriteSearchParams.Percentile = $scope.Percentile;

        var req = {
            method: 'POST',
            url: '/api/PerformanceComparisonApi/SaveFavoriteSearch',
            headers: {
                'Content-Type': 'application/json'
            },
            data: favoriteSearchParams
        };

        $http(req).then(
            function (result) {

                $scope.toggleSuccessMessageBoxModal(result.data);
                document.getElementById('overlay').style.display = 'none';
                $scope.FavoriteSearches = [];
                getFavoriteSearchesForUser();
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to save favorite search criteria. Please send an e-mail to castellonf@stifel.com.');
                document.getElementById('overlay').style.display = 'none';
            });
    }

    $scope.RefreshOnFavortiteSeachSelection = function ($event, searchObj) {
        angular.element(document.querySelector('#performanceTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#topPerfTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#bottomPerfTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');

        $scope.Location = searchObj.location;
        $scope.Percentile = searchObj.percentile
        $scope.AssetSize = searchObj.assetSize;
        $scope.BankPerformanceMetrics = [];
        $scope.TopBanks = [];
        $scope.BottomBanks = [];
        getBankPerformanceMetricData($scope.CertNumber, $scope.Location, $scope.AssetSize, $scope.Percentile);
    }

    $scope.FormatFavoriteSearch = function (searchObj) {
        var searchMessage = '';
        searchMessage = searchObj.percentile + ' OF BANKS IN ' + searchObj.location + ' with ';
        var assetsPart = '';
        if (searchObj.assetSize === 'Asset Size')
            assetsPart = 'asset class All Banks';
        else {
            if (searchObj.assetSize === 'Banks Less Than $100M')
                assetsPart = 'asset class less than $100M';
            else if (searchObj.assetSize === 'Banks Over $100B')
                assetsPart = 'asset class over $100B';
            else if (searchObj.assetSize === 'All Banks')
                assetsPart = 'asset class All Banks';
            else {
                var assetClass = searchObj.assetSize;
                var parts = assetClass.split('-');
                var firstPart = parts[0].replace('Banks ', '');
                assetsPart = 'assets between ' + firstPart + ' and ' + parts[1];
            }
        }

        searchMessage = searchMessage + assetsPart;

        return searchMessage;
    }

    var getFavoriteSearchesForUser = function () {
        var req = {
            method: 'GET',
            url: '/api/PerformanceComparisonApi/GetFavoriteSearchesOfUser',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data !== null && result.data.length > 0) {

                    $scope.FavoriteSearches = result.data;
                    angular.element(document.querySelector('#savedPerformanceAnalyzerQueries')).removeAttr('disabled');
                }
                else {
                    angular.element(document.querySelector('#savedPerformanceAnalyzerQueries')).attr('disabled', '');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get favorite search criteria for you. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    $scope.AssetClass = function () {
        if ($scope.AssetSize == 'Asset Size')
            return 'asset class All Banks';
        else {
            if ($scope.AssetSize == 'Banks Less Than $100M')
                return 'asset class less than $100M';
            else if ($scope.AssetSize == 'Banks Over $100B')
                return 'asset class over $100B';
            else if ($scope.AssetSize == 'TRUST PG')
                return 'asset class TRUST PG';
            else if ($scope.AssetSize == 'All Banks')
                return 'asset class All Banks';
            else {
                var assetClass = $scope.AssetSize;
                var parts = assetClass.split('-');
                var firstPart = parts[0].replace('Banks ', '');
                return 'assets between ' + firstPart + ' and ' + parts[1];
            }
        }
    }

    $scope.ToggleAccordion = function ($event, divName) {
        if (angular.element(document.querySelector('#' + divName)).hasClass('in'))
            angular.element(document.querySelector('#' + divName)).removeClass('in');
        else
            angular.element(document.querySelector('#' + divName)).addClass('in');
    }

    $scope.ChangeScreen = function (templateId) {
        window.location.href = '/';
    }

    $scope.FilterOnLocation = function ($event) {
        $scope.BankPerformanceMetrics = [];
        $scope.TopBanks = [];
        $scope.BottomBanks = [];
        getBankPerformanceMetricData($scope.CertNumber, $scope.Location, $scope.AssetSize, $scope.Percentile);
    }

    $scope.FilterOnAssetSize = function ($event) {
        $scope.BankPerformanceMetrics = [];
        $scope.TopBanks = [];
        $scope.BottomBanks = [];
        $scope.AssetClass();
        getBankPerformanceMetricData($scope.CertNumber, $scope.Location, $scope.AssetSize, $scope.Percentile);
    }

    $scope.FilterOnPercentile = function ($event) {
        $scope.BankPerformanceMetrics = [];
        $scope.TopBanks = [];
        $scope.BottomBanks = [];
        getBankPerformanceMetricData($scope.CertNumber, $scope.Location, $scope.AssetSize, $scope.Percentile);
    }

    $scope.SearchBasedOnCertNumber = function ($event) {
        if ($scope.FdicCertNumber == '' || isNaN($scope.FdicCertNumber))
            $scope.toggleErrorMessageBoxModal('Please enter a valid FDIC certificate number to search.');
        else {
            $scope.BankPerformanceMetrics = [];
            $scope.TopBanks = [];
            $scope.BottomBanks = [];
            clearChart('Loading chart...');
            getBankPerformanceIntroData($scope.FdicCertNumber);
        }
    }

    $scope.RefreshTopBottomBanksOnKpi = function ($event, metric) {
        clearChart('Loading chart...');
        var chartData = [{ "label": "Bank", "value": metric.bank }, { "label": "Top", "value": metric.top }, { "label": "Bottom", "value": metric.bottom }];
        renderBarChart("chart-container", chartData, metric.ubprConceptDesc);
        var perfMetricParams = {
            InstitutionKey: $scope.CertNumber,
            Location: $scope.Location,
            AssetSize: $scope.AssetSize,
            Percentile: $scope.Percentile,
            KPIName: metric.ubprConceptDesc,
            RankTableSortOrder: metric.rankTableSortOrder
        };

        $scope.SelectedMetric = metric;

        var req = {
            method: 'POST',
            url: '/api/PerformanceComparisonApi/GetBankPerformanceKpi',
            headers: {
                'Content-Type': 'application/json'
            },
            data: perfMetricParams
        };

        $http(req).then(
            function (result) {


                if (result.data.topBanks?.length > 0) {
                    $scope.TopBanks = result.data.topBanks;
                    angular.element(document.querySelector('#topPerfTableSpinner')).html('');
                }

                if (result.data.bottomBanks?.length > 0) {
                    $scope.BottomBanks = result.data.bottomBanks;
                    angular.element(document.querySelector('#bottomPerfTableSpinner')).html('');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get top/bottom performaing banks for selected KPI. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var getBankPerformanceMetricData = function (institutionKey, location, assetSize, percentile) {
        angular.element(document.querySelector('#performanceTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#topPerfTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#bottomPerfTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        clearChart('Loading chart...');

        var perfMetricParams = {
            InstitutionKey: institutionKey,
            Location: location,
            AssetSize: assetSize,
            Percentile: percentile,
            KPIName: null
        };

        var req = {
            method: 'POST',
            url: '/api/PerformanceComparisonApi/GetBankPerformanceMetrices',
            headers: {
                'Content-Type': 'application/json'
            },
            data: perfMetricParams
        };

        $http(req).then(
            function (result) {
                if (result.data != null && result.data.length > 0) {


                    $scope.BankPerformanceMetrics = result.data;
                    $scope.RefreshTopBottomBanksOnKpi(null, $scope.BankPerformanceMetrics[0]);
                    $scope.SelectedMetric = $scope.BankPerformanceMetrics[0];
                    angular.element(document.querySelector('#performanceTableSpinner')).html('');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get bank performance metrices. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var getBankPerformanceIntroData = function (certNumber) {
        var perfMetricParams = {
            CertNumber: certNumber
        };

        var req = {
            method: 'POST',
            url: '/api/PerformanceComparisonApi/GetBankPerformanceIntroductionData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: perfMetricParams
        };

        $http(req).then(
            function (result) {


                if (result.data == null) {
                    if (perfMetricParams.CertNumber > 0) {
                        $scope.toggleErrorMessageBoxModal('No institution exists with this FDIC certificate number or it may not be an active institution. Please enter a valid FDIC certificate number.');
                        angular.element(document.querySelector('#performanceTableSpinner')).html('');
                        angular.element(document.querySelector('#topPerfTableSpinner')).html('');
                        angular.element(document.querySelector('#bottomPerfTableSpinner')).html('');
                        clearChart('No data to chart.');
                        angular.element(document.querySelector('#performanceTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
                        angular.element(document.querySelector('#topPerfTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
                        angular.element(document.querySelector('#bottomPerfTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
                        getBankPerformanceIntroData(0);
                    }
                    else {
                        $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                        clearChart('No data available to render chart.');
                        angular.element(document.querySelector('#performanceTableSpinner')).html('<span>No data available to render performance metrices.</span>');
                        angular.element(document.querySelector('#topPerfTableSpinner')).html('<span>No data available to render top banks.</span>');
                        angular.element(document.querySelector('#bottomPerfTableSpinner')).html('<span>No data available to render bottom banks.</span>');
                    }
                }
                else {
                    $scope.BankName = result.data.name;
                    $scope.CertNumber = result.data.certNumber;
                    $scope.BankStateName = result.data.bankState;
                    $scope.InstitutionKey = result.data.institutionKey;

                    $scope.Location = $scope.BankStateName;
                    if ($scope.AssetSize === 'Asset Size')
                        $scope.AssetSize = 'All Banks';

                    if ($scope.Percentile === 'Select Percentile')
                        $scope.Percentile = 'Top/Bottom 10%';

                    getBankPerformanceMetricData($scope.CertNumber, $scope.Location, $scope.AssetSize, $scope.Percentile);
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get bank performance data by bank FDIC number. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var getBottomPerformingBankHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/PerformanceComparisonApi/GetBottomBankQtrHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {


            $scope.BottomPerformingTableHeaders = result.data.qtrRankTableHeaders;
            angular.element(document.querySelector('#bottomPerfTableSpinner')).html('');
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get top performing bank. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var getTopPerformingBankHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/PerformanceComparisonApi/GetTopBankQtrHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {


            $scope.TopPerformingTableHeaders = result.data.qtrRankTableHeaders;
            angular.element(document.querySelector('#topPerfTableSpinner')).html('');
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get bottom performing bank. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var renderBarChart = function (chartContainerName, chartData, caption) {
        FusionCharts.ready(function () {
            var chartContainer = $('#' + chartContainerName);
            if (chartContainer != null) {
                var bankProfileChart = new FusionCharts({
                    type: 'column2d',
                    renderAt: chartContainerName,
                    width: '100%',
                    height: '250',
                    dataFormat: 'json',
                    dataSource: {
                        "chart": {
                            "caption": caption,
                            "subCaption": "",
                            "showBorder": "1",
                            "borderColor": "#cccccc",
                            "xAxisName": "",
                            "yAxisName": "",
                            "numberPrefix": "",
                            "paletteColors": "#173967,#008C48,#A71D23",
                            "bgColor": "#ffffff",
                            "borderAlpha": "20",
                            "canvasBorderAlpha": "0",
                            "usePlotGradientColor": "0",
                            "plotBorderAlpha": "10",
                            "placeValuesInside": "1",
                            "rotatevalues": "0",
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
                            "valueFontColor": "#000000",
                            "valueBorderColor": "#ffffff",
                            "valueBgColor": "#ffffff",
                            "valueFontBold": 1,
                            "exportEnabled": "1"
                        },
                        "data": chartData
                    }
                });
                bankProfileChart.render();
            } // if block ends here
        });
    }
    var cookieIntervalID = null;
    var getCookie = function (name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        }
        else {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
                end = dc.length;
            }
        }
        return unescape(dc.substring(begin + prefix.length, end));
    }

    var isFileDownloaded = function () {
        var myCookie = getCookie("fileDownloaded");

        if (myCookie == null) {
            cookieIntervalID = setTimeout(function () { isFileDownloaded(); }, 500);
        }
        else {
            $scope.$apply(function () {
                $scope.serchbox = false;
                $scope.serchbtn = false;
            });
            document.getElementById('overlay').style.display = 'none';
            document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            clearTimeout(cookieIntervalID);
        }
    }

    $scope.ExportToExcel = function () {
        var perfMetricParams = {
            BankName: $scope.BankName,
            InstitutionKey: $scope.CertNumber,
            Location: $scope.Location,
            AssetSize: $scope.AssetSize,
            Percentile: $scope.Percentile,
            KPIName: $scope.SelectedMetric.ubprConceptDesc,
            RankTableSortOrder: $scope.SelectedMetric.rankTableSortOrder
        };
        perfMetricParams.KPIName = perfMetricParams.KPIName.replace('&', '%26');
        var link = "/Project/DownloadPerformanceAnalysis?"
            + "perfAnalysisParameters=" + JSON.stringify(perfMetricParams);

        var hif = document.getElementById("downloadperfiframe");
        hif.src = link;
        $scope.serchbox = true;
        $scope.serchbtn = true;
        document.getElementById('overlay').style.display = '';
        cookieIntervalID = setTimeout(function () { isFileDownloaded(); }, 500);
    };

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
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    $scope.ToggleDataOnInstitutionChange = function ($event, institution) {
        getBankPerformanceIntroData(institution.fdicCert);
    }

    var initialize = function () {
        getBankPerformanceIntroData(0);
        getFavoriteSearchesForUser();
        getTopPerformingBankHeaders();
        getBottomPerformingBankHeaders();
        getInstitutionList();
    }

    initialize();
}]);

angular.bootstrap(document.getElementById("bankanalytics"), ['cbrbankanalytics']);
