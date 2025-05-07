cbrBankAnalyticsModule.controller("profileOverviewViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$interval", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $interval) {
    // This is the parent controller/viewmodel for 'customerModule' and its $scope is accesible
    // down controllers set by the routing engine. This controller is bound to the Customer.cshtml in the
    // Home view-folder.
    var chartsRenderingStatus = {
        loadCompositionStackChartExportComplete: false,
        depositCompositionStackChartExportComplete: false,
        assetGrowthBarChartExportComplete: false,
        loansLeasesGrowthBarChartExportComplete: false,
        depositGrowthBarChartExportComplete: false,
        equityGrowthBarChartExportComplete: false
    }

    $scope.FavoriteBanks = [];
    $scope.BankProfileIntroductionData = {};
    $scope.BankProfileDetailsQtd = [];
    $scope.BankProfileDetailsYtd = [];
    $scope.BankProfileDetails = [];
    $scope.YtdHeaders = {};
    $scope.QtrHeaders = {};
    $scope.TableHeaders = {};
    $scope.ActiveBankProfileTab = 'YTD';
    $scope.AssetGrowthRateChartData = [];
    $scope.LoansLeasesGrowthRateChartData = [];
    $scope.DepositGrowthRateChartData = [];
    $scope.EquityCapitalGrowthRateChartData = [];

    $scope.AssetGrowthRateChartDataQtr = [];
    $scope.LoansLeasesGrowthRateChartDataQtr = [];
    $scope.DepositGrowthRateChartDataQtr = [];
    $scope.EquityCapitalGrowthRateChartDataQtr = [];

    $scope.AssetGrowthRateChartDataYtd = [];
    $scope.LoansLeasesGrowthRateChartDataYtd = [];
    $scope.DepositGrowthRateChartDataYtd = [];
    $scope.EquityCapitalGrowthRateChartDataYtd = [];
    $scope.LoadCompStackChartDataQtd = [];
    $scope.LoadCompStackChartDataYtd = [];
    $scope.DepositCompStackChartDataQtd = [];
    $scope.DepositCompStackChartDataYtd = [];
    $scope.StackChartCategoriesQtd = [];
    $scope.StackChartCategoriesYtd = [];
    $scope.InstitutionKey = 0;
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.ChartBase64Reps = {
        assetGrowthBarChart: '',
        loansLeasesGrowthBarChart: '',
        depositGrowthBarChart: '',
        equityGrowthBarChart: '',
        loadCompositionStackChart: '',
        depositCompositionStackChart: ''
    };

    var cookieIntervalID = null;

    var setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        var domain = "domain=" + window.location.hostname + ";";
        document.cookie = cname + "=" + cvalue + "; " + expires + "; " + domain;
    }

    $scope.ChangeScreen = function () {
        window.location.href = '/';
    }

    $scope.getChartImagePresence = function (exportfile) {
        document.getElementById('overlay').style.display = '';
        var req = {
            method: 'GET',
            url: '/api/BankProfileOverviewApi/GetChartImagePresence',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data === true) {
                var isIE = /*@cc_on!@*/false || !!document.documentMode;
                if (isIE === true) {
                    setCookie('fileDownload', true, 1);
                }
                if (exportfile == 'pdf') {
                    DownloadPdf();
                }
                else if (exportfile == 'excel') {
                    DownloadExcel();
                };

            }
            else {
                document.getElementById('overlay').style.display = 'none';
                $scope.toggleErrorMessageBoxModal('Chart images are not present on export server yet. Please try again in few minutes. If it does not work then please connect with system administrator.');
            }
        }, function () {
            //angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to check availability of chart images on export server. Please send an e-mail to castellonf@stifel.com.');
        });
    }

    var getFavoriteBanks = function () {
        //angular.element(document.querySelector('#incomeStatementDataLoader')).removeClass('hidden');
        var req = {
            method: 'GET',
            url: '/api/PeerGroupsApi/GetFavoriteBanksForCurrentUser',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            var resultData = result.data;
            if (result.data != null && result.data.length > 0) {

                //angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
                $scope.FavoriteBanks = result.data;
            }
        }, function () {
            //angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get favorite banks. Please send an e-mail to castellonf@stifel.com.');
        });
    }

    $scope.ToggleDataOnBankChange = function ($event, favoriteBank) {
        $rootScope.ShowBankProfileForInstitutionKey = favoriteBank.institutionKey;
        $scope.InstitutionKey = favoriteBank.institutionKey;
        FusionCharts.items.assetGrowthBarChart.setChartData([]);
        FusionCharts.items.loansLeasesGrowthBarChart.setChartData([]);
        FusionCharts.items.depositGrowthBarChart.setChartData([]);
        FusionCharts.items.equityGrowthBarChart.setChartData([]);
        FusionCharts.items.depositCompositionStackChart.setChartData([]);
        FusionCharts.items.loadCompositionStackChart.setChartData([]);

        //$scope.AssetGrowthRateChartData = [];
        //$scope.LoansLeasesGrowthRateChartData = [];
        //$scope.DepositGrowthRateChartData = [];
        //$scope.EquityCapitalGrowthRateChartData = [];

        angular.element(document.querySelector('#bankProfileDetailsSpinner')).removeClass('hidden');
        getBankProfileIntroductionData();
    }

    $scope.MakeDefault = function ($event) {
        document.getElementById('overlay').style.display = '';
        var makeDefaultParam = {
            InstitutionKey: $scope.InstitutionKey
        };

        if ($rootScope.ShowBankProfileForInstitutionKey > 0)
            makeDefaultParam.InstitutionKey = $rootScope.ShowBankProfileForInstitutionKey;
        else
            makeDefaultParam.InstitutionKey = $scope.InstitutionKey;

        var req = {
            method: 'POST',
            url: '/api/PeerGroupsApi/MakeDefault',
            headers: {
                'Content-Type': 'application/json'
            },
            data: makeDefaultParam
        };

        $http(req).then(function (result) {

            document.getElementById('overlay').style.display = 'none';
            if (result.data != null && result.data === true) {
                $scope.toggleSuccessMessageBoxModal('Successfully made the bank your default bank.');
                $scope.FavoriteBanks = [];
                //angular.element(document.querySelector('#favoriteBankLoader')).attr('style', 'display:block');
                getFavoriteBanks();
            }
            else {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to make the bank your default bank or this bank is already your default bank. Please send an e-mail to castellonf@stifel.com.');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to make the bank your default bank. Please send an e-mail to castellonf@stifel.com.');
            document.getElementById('overlay').style.display = 'none';
        });
    }

    $scope.AddToFavorite = function ($event) {
        document.getElementById('overlay').style.display = '';

        var addToFavoriteParam = {
            InstitutionKey: 0
        };

        if ($rootScope.ShowBankProfileForInstitutionKey > 0)
            addToFavoriteParam.InstitutionKey = $rootScope.ShowBankProfileForInstitutionKey;
        else
            addToFavoriteParam.InstitutionKey = $scope.InstitutionKey;

        var req = {
            method: 'POST',
            url: '/api/PeerGroupsApi/AddBankToFavoriteBanks',
            headers: {
                'Content-Type': 'application/json'
            },
            data: addToFavoriteParam
        };

        $http(req).then(function (result) {

            $scope.toggleSuccessMessageBoxModal(result.data);
            document.getElementById('overlay').style.display = 'none';
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to add the bank as favorite bank. Please send an e-mail to castellonf@stifel.com.');
            document.getElementById('overlay').style.display = 'none';
        });
    }

    var DownloadPdf = function () {
        document.getElementById('overlay').style.display = '';
        $scope.ChartBase64Reps.assetGrowthBarChart = $scope.ChartBase64Reps.assetGrowthBarChart.replace("data:image/png;base64,", "");
        $scope.ChartBase64Reps.loansLeasesGrowthBarChart = $scope.ChartBase64Reps.loansLeasesGrowthBarChart.replace("data:image/png;base64,", "");
        $scope.ChartBase64Reps.depositGrowthBarChart = $scope.ChartBase64Reps.depositGrowthBarChart.replace("data:image/png;base64,", "");
        $scope.ChartBase64Reps.equityGrowthBarChart = $scope.ChartBase64Reps.equityGrowthBarChart.replace("data:image/png;base64,", "");
        $scope.ChartBase64Reps.loadCompositionStackChart = $scope.ChartBase64Reps.loadCompositionStackChart.replace("data:image/png;base64,", "");
        $scope.ChartBase64Reps.depositCompositionStackChart = $scope.ChartBase64Reps.depositCompositionStackChart.replace("data:image/png;base64,", "");

        var profParams = {
            InstitutionKey: $scope.InstitutionKey,
            Period: '',
            assetGrowthBarChart: $scope.ChartBase64Reps.assetGrowthBarChart,
            loansLeasesGrowthBarChart: $scope.ChartBase64Reps.loansLeasesGrowthBarChart,
            depositGrowthBarChart: $scope.ChartBase64Reps.depositGrowthBarChart,
            equityGrowthBarChart: $scope.ChartBase64Reps.equityGrowthBarChart,
            loadCompositionStackChart: $scope.ChartBase64Reps.loadCompositionStackChart,
            depositCompositionStackChart: $scope.ChartBase64Reps.depositCompositionStackChart
        };

        if ($scope.ActiveBankProfileTab === 'QTD') {
            profParams.Period = 'QTD';
        }
        else {
            profParams.Period = 'YTD';
        }

        var req = {
            httpMethod: 'POST',
            checkInterval: 500,
            data: profParams,
            successCallback: function (url) {
                document.getElementById('overlay').style.display = 'none';
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to download the PDF. Please send an e-mail to castellonf@stifel.com.');
            },
            cookiePath: '/',
            cookieDomain: window.location.hostname
        };

        $.fileDownload('/api/BankProfileOverviewApi/GetPdfOfBankProfile', req);

        /*var link = "/Project/DownloadSingleBankProfile?"
           + "downloadBankProfileParams=" + JSON.stringify(profParams);

        var hif = document.getElementById("hiddeniframe");
        hif.src = link;
        $("body").css({ "opacity": 0.4, "z-index": 1000 });

        cookieIntervalID = $interval(isFileDownloaded, 500);*/
    }

    var DownloadExcel = function () {
        document.getElementById('overlay').style.display = '';
        $scope.ChartBase64Reps.assetGrowthBarChart = $scope.ChartBase64Reps.assetGrowthBarChart.replace("data:image/png;base64,", "");
        $scope.ChartBase64Reps.loansLeasesGrowthBarChart = $scope.ChartBase64Reps.loansLeasesGrowthBarChart.replace("data:image/png;base64,", "");
        $scope.ChartBase64Reps.depositGrowthBarChart = $scope.ChartBase64Reps.depositGrowthBarChart.replace("data:image/png;base64,", "");
        $scope.ChartBase64Reps.equityGrowthBarChart = $scope.ChartBase64Reps.equityGrowthBarChart.replace("data:image/png;base64,", "");
        $scope.ChartBase64Reps.loadCompositionStackChart = $scope.ChartBase64Reps.loadCompositionStackChart.replace("data:image/png;base64,", "");
        $scope.ChartBase64Reps.depositCompositionStackChart = $scope.ChartBase64Reps.depositCompositionStackChart.replace("data:image/png;base64,", "");

        var profParams = {
            InstitutionKey: $scope.InstitutionKey,
            Period: '',
            assetGrowthBarChart: $scope.ChartBase64Reps.assetGrowthBarChart,
            loansLeasesGrowthBarChart: $scope.ChartBase64Reps.loansLeasesGrowthBarChart,
            depositGrowthBarChart: $scope.ChartBase64Reps.depositGrowthBarChart,
            equityGrowthBarChart: $scope.ChartBase64Reps.equityGrowthBarChart,
            loadCompositionStackChart: $scope.ChartBase64Reps.loadCompositionStackChart,
            depositCompositionStackChart: $scope.ChartBase64Reps.depositCompositionStackChart
        };

        if ($scope.ActiveBankProfileTab == 'QTD') {
            profParams.Period = 'QTD';
        }
        else {
            profParams.Period = 'YTD';
        }

        var req = {
            httpMethod: 'POST',
            checkInterval: 500,
            data: profParams,
            successCallback: function (url) {
                document.getElementById('overlay').style.display = 'none';
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to download the Excel. Please send an e-mail to castellonf@stifel.com.');
            },
            cookiePath: '/',
            cookieDomain: window.location.hostname
        };

        $.fileDownload('/api/BankProfileOverviewApi/GetExcelOfBankProfile', req);

    }


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
        }
        else {
            $("body")[0].style.opacity = 1;
            document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            clearInterval(cookieIntervalID);
        }
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

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null)
            return 'N/A';
        else
            return $filter('number')(numericValue, fractionSize);
    }

    var setLabel = function (id, label) {
        angular.element(document.querySelector('#' + id)).html(label);
    }

    $scope.ToggleBankProfileTabs = function ($event, tabToShow) {
        if (tabToShow == 'QTD') {
            angular.element(document.querySelector('#linkBankProfileQtr')).addClass('active');
            angular.element(document.querySelector('#linkBankProfileYtd')).removeClass('active');
            $scope.TableHeaders = $scope.QtrHeaders;
            $scope.BankProfileDetails = $scope.BankProfileDetailsQtd;
            $scope.ActiveBankProfileTab = 'QTD';
            $scope.AssetGrowthRateChartData = $scope.AssetGrowthRateChartDataQtr;
            $scope.LoansLeasesGrowthRateChartData = $scope.LoansLeasesGrowthRateChartDataQtr;
            $scope.DepositGrowthRateChartData = $scope.DepositGrowthRateChartDataQtr;
            $scope.EquityCapitalGrowthRateChartData = $scope.EquityCapitalGrowthRateChartDataQtr;
            //setLabel('assetGrowthChartContainerLabel', '<h5><strong>Asset Growth Rate (QTD)</strong>');
            //setLabel('loansLeasesGrowthChartContainerLabel', '<h5><strong>Loans &amp; Leases Growth Rate (QTD)</strong></h5>');
            //setLabel('depositGrowthChartContainerLabel', '<h5><strong>Deposit Growth Rate (QTD)</strong></h5>');
            //setLabel('equityGrowthChartContainerLabel', '<h5><strong>Bank Equity Capital Growth Rate (QTD)</strong>');
            renderLoadCompositionChart('loadCompChart', $scope.LoadCompStackChartDataQtd, $scope.StackChartCategoriesQtd, 'Loan Composition (%)');
            renderDepositCompositionChart('depositCompChart', $scope.DepositCompStackChartDataQtd, $scope.StackChartCategoriesQtd, 'Deposit Composition (%)');
            renderAssetGrowthBarChart('assetGrowthChart', $scope.AssetGrowthRateChartData, 'Asset Growth Rate (QTD)');
            renderLoansLeasesGrowthBarChart('loansLeasesGrowthChart', $scope.LoansLeasesGrowthRateChartData, 'Loans & Leases Growth Rate (QTD)');
            renderDepositGrowthBarChart('depositGrowthChart', $scope.DepositGrowthRateChartData, 'Deposits Growth Rate (QTD)');
            renderEquityCapitalGrowthBarChart('equityCapitalGrowthChart', $scope.EquityCapitalGrowthRateChartData, 'Bank Equity Capital Growth Rate (QTD)');
        }
        else {
            angular.element(document.querySelector('#linkBankProfileQtr')).removeClass('active');
            angular.element(document.querySelector('#linkBankProfileYtd')).addClass('active');
            $scope.BankProfileDetails = $scope.BankProfileDetailsYtd;
            $scope.TableHeaders = $scope.YtdHeaders;
            $scope.ActiveBankProfileTab = 'YTD';
            $scope.AssetGrowthRateChartData = $scope.AssetGrowthRateChartDataYtd;
            $scope.LoansLeasesGrowthRateChartData = $scope.LoansLeasesGrowthRateChartDataYtd;
            $scope.DepositGrowthRateChartData = $scope.DepositGrowthRateChartDataYtd;
            $scope.EquityCapitalGrowthRateChartData = $scope.EquityCapitalGrowthRateChartDataYtd;
            //setLabel('assetGrowthChartContainerLabel', '<h5><strong>Asset Growth Rate (YTD)</strong>');
            //setLabel('loansLeasesGrowthChartContainerLabel', '<h5><strong>Loans &amp; Leases Growth Rate (YTD)</strong></h5>');
            //setLabel('depositGrowthChartContainerLabel', '<h5><strong>Deposit Growth Rate (YTD)</strong></h5>');
            //setLabel('equityGrowthChartContainerLabel', '<h5><strong>Bank Equity Capital Growth Rate (YTD)</strong>');
            renderLoadCompositionChart('loadCompChart', $scope.LoadCompStackChartDataYtd, $scope.StackChartCategoriesYtd, 'Loan Composition (%)');
            renderDepositCompositionChart('depositCompChart', $scope.DepositCompStackChartDataYtd, $scope.StackChartCategoriesYtd, 'Deposit Composition (%)');
            renderAssetGrowthBarChart('assetGrowthChart', $scope.AssetGrowthRateChartData, 'Asset Growth Rate (YTD)');
            renderLoansLeasesGrowthBarChart('loansLeasesGrowthChart', $scope.LoansLeasesGrowthRateChartData, 'Loans & Leases Growth Rate (YTD)');
            renderDepositGrowthBarChart('depositGrowthChart', $scope.DepositGrowthRateChartData, 'Deposits Growth Rate (YTD)');
            renderEquityCapitalGrowthBarChart('equityCapitalGrowthChart', $scope.EquityCapitalGrowthRateChartData, 'Bank Equity Capital Growth Rate (YTD)');
        }
    }

    var loadCompositionStackChartRenderCompleteHandler = function (e) {
        FusionCharts.items.loadCompositionStackChart.exportChart({
            "exportFormat": "jpg",
            "exportHandler": window.location.protocol + "//" + window.location.hostname + "/FCExporter.aspx",
            "exportAction": "save",
            "exportFileName": "loadCompositionStackChart"
        });

        FusionCharts.items.loadCompositionStackChart.removeEventListener("rendered", loadCompositionStackChartRenderCompleteHandler);
    }

    var depositCompositionStackChartRenderCompleteHandler = function (e) {
        FusionCharts.items.depositCompositionStackChart.exportChart({
            "exportFormat": "jpg",
            "exportHandler": window.location.protocol + "//" + window.location.hostname + "/FCExporter.aspx",
            "exportAction": "save",
            "exportFileName": "depositCompositionStackChart"
        });

        FusionCharts.items.depositCompositionStackChart.removeEventListener("rendered", depositCompositionStackChartRenderCompleteHandler);
    }

    var assetGrowthBarChartRenderCompleteHandler = function (e) {
        FusionCharts.items.assetGrowthBarChart.exportChart({
            "exportFormat": "jpg",
            "exportHandler": window.location.protocol + "//" + (window.location.hostname.includes('localhost') ? (window.location.hostname + ':44361') : window.location.hostname) + "/FCExporter.aspx",
            "exportAction": "save",
            "exportFileName": "assetGrowthBarChart"
        });

        FusionCharts.items.assetGrowthBarChart.removeEventListener("rendered", assetGrowthBarChartRenderCompleteHandler);
    }

    var loansLeasesGrowthBarChartRenderCompleteHandler = function (e) {
        FusionCharts.items.loansLeasesGrowthBarChart.exportChart({
            "exportFormat": "jpg",
            "exportHandler": window.location.protocol + "//" + window.location.hostname + "/FCExporter.aspx",
            "exportAction": "save",
            "exportFileName": "loansLeasesGrowthBarChart"
        });

        FusionCharts.items.loansLeasesGrowthBarChart.removeEventListener("rendered", loansLeasesGrowthBarChartRenderCompleteHandler);
    }

    var depositGrowthBarChartRenderCompleteHandler = function (e) {
        FusionCharts.items.depositGrowthBarChart.exportChart({
            "exportFormat": "jpg",
            "exportHandler": window.location.protocol + "//" + window.location.hostname + "/FCExporter.aspx",
            "exportAction": "save",
            "exportFileName": "depositGrowthBarChart"
        });

        FusionCharts.items.depositGrowthBarChart.removeEventListener("rendered", depositGrowthBarChartRenderCompleteHandler);
    }

    var equityGrowthBarChartRenderCompleteHandler = function (e) {
        FusionCharts.items.equityGrowthBarChart.exportChart({
            "exportFormat": "jpg",
            "exportHandler": window.location.protocol + "//" + window.location.hostname + "/FCExporter.aspx",
            "exportAction": "save",
            "exportFileName": "equityGrowthBarChart"
        });

        FusionCharts.items.equityGrowthBarChart.removeEventListener("rendered", equityGrowthBarChartRenderCompleteHandler);
    }

    var renderLoadCompositionChart = function (chartContainerName, chartData, categoriesData, chartCaption) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "theme": "zune",
                    "baseFont": "lato,sans-serif",
                    "baseFontColor": "#666766",
                    "animation": "0",
                    "caption": chartCaption,
                    "subCaption": "Percent of Gross Loans",
                    "subcaptionfont": "arial narrow",
                    "numvisibleplot": "5",
                    "bgColor": "#ffffff",
                    "usePlotGradientColor": "0",
                    "showBorder": "0",
                    "use3DLighting": "0",
                    "showShadow": "1",
                    "enableSmartLabels": "0",
                    "startingAngle": "0",
                    "showPercentValues": "0",
                    "showPercentInTooltip": "0",
                    "decimals": "2",
                    "captionFontSize": "14",
                    "subcaptionFontSize": "14",
                    "subcaptionFontBold": "0",
                    "toolTipColor": "#ffffff",
                    "toolTipBorderThickness": "0",
                    "toolTipBgColor": "#000000",
                    "toolTipBgAlpha": "80",
                    "toolTipBorderRadius": "2",
                    "toolTipPadding": "5",
                    "showHoverEffect": "1",
                    "showLegend": "1",
                    "legendBgColor": "#ffffff",
                    "legendShadow": "1",
                    "legendItemFontSize": "9",
                    "legendItemFontColor": "#666766",
                    "legendBorderThickness": ".5",
                    "legendBorderAlpha": "50",
                    "showLabels": "1",
                    "minimiseWrappingInLegend": "1",
                    "chartTopMargin": "10",
                    "forceDecimals": "1",
                    "exportEnabled": "1",
                    "valueFont": "Fira Sans, sans-serif",
                    "valueFontSize": "12",
                    "valueBGcolor": "#FFFFFF",
                    "valueBGalpha": "50",
                    "valuefontcolor": "#000000",
                    "valuefontbold": "0",
                    "transposeAxis": "0",
                    "showPlotBorder": "0"
                },
                "categories": [
                    {
                        "category": categoriesData.category.categoryLabels
                    }
                ],
                "dataset": chartData
            };
            var chartContainer = $('#' + chartContainerName);
            if (chartContainer != null) {
                var loadCompositionChart = FusionCharts.items.loadCompositionStackChart;
                if (typeof loadCompositionChart === 'undefined') {
                    loadCompositionChart = new FusionCharts({
                        type: 'scrollstackedcolumn2d',
                        id: 'loadCompositionStackChart',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '500',
                        dataFormat: 'json',
                        dataSource: dSource
                    });

                    // setChartBase64StringToObject(loadCompositionChart);
                    loadCompositionChart.addEventListener("rendered", loadCompositionStackChartRenderCompleteHandler);
                    loadCompositionChart.render();
                }
                else {
                    //  setChartBase64StringToObject(loadCompositionChart);
                    loadCompositionChart.addEventListener("rendered", loadCompositionStackChartRenderCompleteHandler);
                    loadCompositionChart.setChartData(dSource, 'json');
                    loadCompositionChart.render();
                }
            } // if block ends here
        });
    }

    var renderDepositCompositionChart = function (chartContainerName, chartData, categoriesData, chartCaption) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "theme": "zune",
                    "baseFont": "lato,sans-serif",
                    "baseFontColor": "#666766",
                    "animation": "0",
                    "caption": chartCaption,
                    "subCaption": "Percent of Total Deposits",
                    "subcaptionfont": "arial narrow",
                    "numvisibleplot": "5",
                    "bgColor": "#ffffff",
                    "usePlotGradientColor": "0",
                    "showBorder": "0",
                    "use3DLighting": "0",
                    "showShadow": "1",
                    "enableSmartLabels": "0",
                    "startingAngle": "0",
                    "showPercentValues": "0",
                    "showPercentInTooltip": "0",
                    "decimals": "2",
                    "captionFontSize": "14",
                    "subcaptionFontSize": "14",
                    "subcaptionFontBold": "0",
                    "toolTipColor": "#ffffff",
                    "toolTipBorderThickness": "0",
                    "toolTipBgColor": "#000000",
                    "toolTipBgAlpha": "80",
                    "toolTipBorderRadius": "2",
                    "toolTipPadding": "5",
                    "showHoverEffect": "1",
                    "showLegend": "1",
                    "legendBgColor": "#ffffff",
                    "legendShadow": "1",
                    "legendItemFontSize": "9",
                    "legendItemFontColor": "#666766",
                    "legendBorderThickness": ".5",
                    "legendBorderAlpha": "50",
                    "showLabels": "1",
                    "minimiseWrappingInLegend": "1",
                    "chartTopMargin": "10",
                    "forceDecimals": "1",
                    "exportEnabled": "1",
                    "valueFont": "Fira Sans, sans-serif",
                    "valueFontSize": "12",
                    "valueBGcolor": "#FFFFFF",
                    "valueBGalpha": "50",
                    "valuefontcolor": "#000000",
                    "valuefontbold": "0",
                    "alignLegendWithCanvas": "1",
                    // "legendNumColumns": "5", #19743 bug fix
                    "showPlotBorder": "1",
                    "plotHighlightEffect": "fadeout"
                },
                "categories": [
                    {
                        "category": categoriesData.category.categoryLabels
                    }
                ],
                "dataset": chartData
            };
            var chartContainer = $('#' + chartContainerName);
            if (chartContainer != null) {
                var depositCompositionChart = FusionCharts.items.depositCompositionStackChart;
                if (typeof depositCompositionChart === 'undefined') {
                    depositCompositionChart = new FusionCharts({
                        type: 'scrollstackedcolumn2d',
                        id: 'depositCompositionStackChart',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '500',
                        dataFormat: 'json',
                        dataSource: dSource
                    });

                    // setChartBase64StringToObject(depositCompositionChart);
                    depositCompositionChart.addEventListener("rendered", depositCompositionStackChartRenderCompleteHandler);
                    depositCompositionChart.render();
                }
                else {
                    // setChartBase64StringToObject(depositCompositionChart);
                    depositCompositionChart.addEventListener("rendered", depositCompositionStackChartRenderCompleteHandler);
                    depositCompositionChart.setChartData(dSource, 'json');
                    depositCompositionChart.render();
                }


            } // if block ends here
        });
    }

    var renderAssetGrowthBarChart = function (chartContainerName, chartData, chartCaption) {
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
                    "paletteColors": "#003057",
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
                    "exportEnabled": "1"
                },
                "data": chartData
            };
            var chartContainer = $('#' + chartContainerName);

            if (chartContainer != null) {
                var assetGrowthChart = FusionCharts.items.assetGrowthBarChart;
                if (typeof assetGrowthChart === 'undefined') {
                    assetGrowthChart = new FusionCharts({
                        type: 'column2d',
                        id: 'assetGrowthBarChart',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });

                    //  setChartBase64StringToObject(assetGrowthChart);
                    assetGrowthChart.addEventListener("rendered", assetGrowthBarChartRenderCompleteHandler);
                    assetGrowthChart.render();
                }
                else {
                    //setChartBase64StringToObject(assetGrowthChart);
                    assetGrowthChart.addEventListener("rendered", assetGrowthBarChartRenderCompleteHandler);
                    assetGrowthChart.setChartData(dSource, 'json');
                    assetGrowthChart.render();
                }
            } // if block ends here
        });
    }

    var renderLoansLeasesGrowthBarChart = function (chartContainerName, chartData, yAxisLabel) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "animation": "0",
                    "caption": yAxisLabel,
                    "subCaption": "",
                    "showBorder": "1",
                    "borderColor": "#cccccc",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": "#003057",
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
                    "exportEnabled": "1"
                },
                "data": chartData
            };

            var chartContainer = $('#' + chartContainerName);

            if (chartContainer != null) {
                var loansLeasesGrowthChart = FusionCharts.items.loansLeasesGrowthBarChart;
                if (typeof loansLeasesGrowthChart === 'undefined') {
                    loansLeasesGrowthChart = new FusionCharts({
                        type: 'column2d',
                        id: 'loansLeasesGrowthBarChart',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });

                    //setChartBase64StringToObject(loansLeasesGrowthChart);
                    loansLeasesGrowthChart.addEventListener("rendered", loansLeasesGrowthBarChartRenderCompleteHandler);
                    loansLeasesGrowthChart.render();
                }
                else {
                    // setChartBase64StringToObject(loansLeasesGrowthChart);
                    loansLeasesGrowthChart.addEventListener("rendered", loansLeasesGrowthBarChartRenderCompleteHandler);
                    loansLeasesGrowthChart.setChartData(dSource, 'json');
                    loansLeasesGrowthChart.render();
                }
            } // if block ends here
        });
    }

    var renderDepositGrowthBarChart = function (chartContainerName, chartData, yAxisLabel) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "animation": "0",
                    "caption": yAxisLabel,
                    "subCaption": "",
                    "showBorder": "1",
                    "borderColor": "#cccccc",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": "#003057",
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
                    "exportEnabled": "1"
                },
                "data": chartData
            };

            var chartContainer = $('#' + chartContainerName);

            if (chartContainer != null) {
                var depositGrowthChart = FusionCharts.items.depositGrowthBarChart;
                if (typeof depositGrowthChart === 'undefined') {
                    depositGrowthChart = new FusionCharts({
                        type: 'column2d',
                        id: 'depositGrowthBarChart',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });
                    //setChartBase64StringToObject(depositGrowthChart);
                    depositGrowthChart.addEventListener("rendered", depositGrowthBarChartRenderCompleteHandler);
                    depositGrowthChart.render();
                }
                else {
                    //setChartBase64StringToObject(depositGrowthChart);
                    depositGrowthChart.addEventListener("rendered", depositGrowthBarChartRenderCompleteHandler);
                    depositGrowthChart.setChartData(dSource, 'json');
                    depositGrowthChart.render();
                }
            } // if block ends here
        });
    }

    var renderEquityCapitalGrowthBarChart = function (chartContainerName, chartData, yAxisLabel) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "animation": "0",
                    "caption": yAxisLabel,
                    "subCaption": "",
                    "showBorder": "1",
                    "borderColor": "#cccccc",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": "#003057",
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
                    "exportEnabled": "1"
                },
                "data": chartData
            };

            var chartContainer = $('#' + chartContainerName);

            if (chartContainer != null) {
                var equityGrowthChart = FusionCharts.items.equityGrowthBarChart;
                if (typeof equityGrowthChart === 'undefined') {
                    equityGrowthChart = new FusionCharts({
                        type: 'column2d',
                        id: 'equityGrowthBarChart',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });
                    //setChartBase64StringToObject(equityGrowthChart);
                    equityGrowthChart.addEventListener("rendered", equityGrowthBarChartRenderCompleteHandler);
                    equityGrowthChart.render();
                }
                else {
                    //setChartBase64StringToObject(equityGrowthChart);
                    equityGrowthChart.addEventListener("rendered", equityGrowthBarChartRenderCompleteHandler);
                    equityGrowthChart.setChartData(dSource, 'json');
                    equityGrowthChart.render();
                }
            } // if block ends here
        });
    }

    var setChartBase64StringToObject = function (chartObject) {
        chartObject.addEventListener("rendered", function (e) {
            var canvas = document.getElementById("chart-canvas");
            canvas.setAttribute("width", chartObject.width + "px");
            canvas.setAttribute("height", chartObject.height + "px");
            canvg(canvas, chartObject.getSVGString(), {
                ignoreMouse: true,
                ignoreAnimation: true
            });

            $scope.ChartBase64Reps[chartObject.id] = canvas.toDataURL();
        });
    }

    var getPieChartData = function () {
        var profParams = {
            InstitutionKey: $scope.InstitutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/BankProfileOverviewApi/GetBankProfilePieChartData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: profParams
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                $scope.LoadCompStackChartDataQtd = result.data.loadCompositionStackChartDataQtd;
                $scope.LoadCompStackChartDataYtd = result.data.loadCompositionStackChartDataYtd;
                $scope.DepositCompStackChartDataQtd = result.data.depositCompositionStackChartDataQtd;
                $scope.DepositCompStackChartDataYtd = result.data.depositCompositionStackChartDataYtd;
                $scope.StackChartCategoriesQtd = result.data.categoriesQtd;
                $scope.StackChartCategoriesYtd = result.data.categoriesYtd;
            }

            if ($scope.ActiveBankProfileTab === 'QTD') {
                renderLoadCompositionChart('loadCompChart', $scope.LoadCompStackChartDataQtd, $scope.StackChartCategoriesQtd, 'Loan Composition (%)');
                renderDepositCompositionChart('depositCompChart', $scope.DepositCompStackChartDataQtd, $scope.StackChartCategoriesQtd, 'Deposit Composition (%)');
            }
            else {
                renderLoadCompositionChart('loadCompChart', $scope.LoadCompStackChartDataYtd, $scope.StackChartCategoriesYtd, 'Loan Composition (%)');
                renderDepositCompositionChart('depositCompChart', $scope.DepositCompStackChartDataYtd, $scope.StackChartCategoriesYtd, 'Deposit Composition (%)');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get load composition and deposit composition chart data. Please send an e-mail to castellonf@stifel.com.');
        });
    }

    var getBarChartData = function () {
        var profParams = {
            InstitutionKey: $scope.InstitutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/BankProfileOverviewApi/GetBankProfileBarChartData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: profParams
        };

        $http(req).then(function (result) {

            $scope.AssetGrowthRateChartDataQtr = result.data.assetGrowthRateQtr;
            $scope.LoansLeasesGrowthRateChartDataQtr = result.data.loansLeasesGrowthRateQtr;
            $scope.DepositGrowthRateChartDataQtr = result.data.depositGrowthRateQtr;
            $scope.EquityCapitalGrowthRateChartDataQtr = result.data.equityCapitalGrowthRateQtr;

            $scope.AssetGrowthRateChartDataYtd = result.data.assetGrowthRateYtd;
            $scope.LoansLeasesGrowthRateChartDataYtd = result.data.loansLeasesGrowthRateYtd;
            $scope.DepositGrowthRateChartDataYtd = result.data.depositGrowthRateYtd;
            $scope.EquityCapitalGrowthRateChartDataYtd = result.data.equityCapitalGrowthYtd;

            if ($scope.ActiveBankProfileTab == 'QTD') {
                $scope.AssetGrowthRateChartData = $scope.AssetGrowthRateChartDataQtr;
                $scope.LoansLeasesGrowthRateChartData = $scope.LoansLeasesGrowthRateChartDataQtr;
                $scope.DepositGrowthRateChartData = $scope.DepositGrowthRateChartDataQtr;
                $scope.EquityCapitalGrowthRateChartData = $scope.EquityCapitalGrowthRateChartDataQtr;
                //setLabel('assetGrowthChartContainerLabel', '<h5><strong>Asset Growth Rate (QTR)</strong>');
                //setLabel('loansLeasesGrowthChartContainerLabel', '<h5><strong>Loans &amp; Leases Growth Rate (QTR)</strong></h5>');
                //setLabel('depositGrowthChartContainerLabel', '<h5><strong>Deposit Growth Rate (QTR)</strong></h5>');
                //setLabel('equityGrowthChartContainerLabel', '<h5><strong>Bank Equity Capital Growth Rate (QTR)</strong>');
                renderAssetGrowthBarChart('assetGrowthChart', $scope.AssetGrowthRateChartData, 'Asset Growth Rate (QTD)');
                renderLoansLeasesGrowthBarChart('loansLeasesGrowthChart', $scope.LoansLeasesGrowthRateChartData, 'Loans & Leases Growth Rate (QTD)');
                renderDepositGrowthBarChart('depositGrowthChart', $scope.DepositGrowthRateChartData, 'Deposits Growth Rate (QTD)');
                renderEquityCapitalGrowthBarChart('equityCapitalGrowthChart', $scope.EquityCapitalGrowthRateChartData, 'Bank Equity Capital Growth Rate (QTD)');
            }
            else {
                $scope.AssetGrowthRateChartData = $scope.AssetGrowthRateChartDataYtd;
                $scope.LoansLeasesGrowthRateChartData = $scope.LoansLeasesGrowthRateChartDataYtd;
                $scope.DepositGrowthRateChartData = $scope.DepositGrowthRateChartDataYtd;
                $scope.EquityCapitalGrowthRateChartData = $scope.EquityCapitalGrowthRateChartDataYtd;
                //setLabel('assetGrowthChartContainerLabel', '<h5><strong>Asset Growth Rate (YTD)</strong>');
                //setLabel('loansLeasesGrowthChartContainerLabel', '<h5><strong>Loans &amp; Leases Growth Rate (YTD)</strong></h5>');
                //setLabel('depositGrowthChartContainerLabel', '<h5><strong>Deposit Growth Rate (YTD)</strong></h5>');
                //setLabel('equityGrowthChartContainerLabel', '<h5><strong>Bank Equity Capital Growth Rate (YTD)</strong>');
                renderAssetGrowthBarChart('assetGrowthChart', $scope.AssetGrowthRateChartData, 'Asset Growth Rate (YTD)');
                renderLoansLeasesGrowthBarChart('loansLeasesGrowthChart', $scope.LoansLeasesGrowthRateChartData, 'Loans & Leases Growth Rate (YTD)');
                renderDepositGrowthBarChart('depositGrowthChart', $scope.DepositGrowthRateChartData, 'Deposits Growth Rate (YTD)');
                renderEquityCapitalGrowthBarChart('equityCapitalGrowthChart', $scope.EquityCapitalGrowthRateChartData, 'Bank Equity Capital Growth Rate (YTD)');
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get chart data for asset growth, loans growth, deposit growth and equity capital growth. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var getYearToDateHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/BankProfileOverviewApi/GetYtdHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {

            $scope.YtdHeaders = result.data;
            if ($scope.ActiveBankProfileTab == 'YTD') {
                $scope.TableHeaders = $scope.YtdHeaders;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get YTD headers for table. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var getQuarterToDateHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/BankProfileOverviewApi/GetQtrHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {

            $scope.QtrHeaders = result.data;
            if ($scope.ActiveBankProfileTab == 'QTR') {
                $scope.TableHeaders = $scope.QtrHeaders;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get QTD headers for table. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var getBankProfileIntroductionData = function () {
        if ($rootScope.ShowBankProfileForInstitutionKey > 0)
            $scope.InstitutionKey = $rootScope.ShowBankProfileForInstitutionKey;

        var profParams = {
            InstitutionKey: $scope.InstitutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/BankProfileOverviewApi/GetBankProfileIntroductionData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: profParams
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                $scope.BankProfileIntroductionData = result.data;
                if ($scope.BankProfileIntroductionData.subchapterS == 0)
                    $scope.BankProfileIntroductionData.subchapterS = 'No';
                else
                    $scope.BankProfileIntroductionData.subchapterS = 'Yes';

                $scope.BankProfileIntroductionData.established = new Date($scope.BankProfileIntroductionData.established).toLocaleDateString('en-US');
                $scope.InstitutionKey = $scope.BankProfileIntroductionData.institutionKey;
                getBankProfileData();
                getBarChartData();
                getPieChartData();
                $rootScope.ShowBankProfileForInstitutionKey = 0;
            }
            else {
                $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                angular.element(document.querySelector('#bankProfileDetailsSpinner')).html('No data available to render tables.');
                angular.element(document.querySelector('#assetGrowthChart')).html('<span>No data available to render chart.</span>');
                angular.element(document.querySelector('#loansLeasesGrowthChart')).html('<span>No data available to render chart.</span>');
                angular.element(document.querySelector('#depositGrowthChart')).html('<span>No data available to render chart.</span>');
                angular.element(document.querySelector('#equityCapitalGrowthChart')).html('<span>No data available to render chart.</span>');
                angular.element(document.querySelector('#loadCompChart')).html('<span>No data available to render chart.</span>');
                angular.element(document.querySelector('#depositCompChart')).html('<span>No data available to render chart.</span>');
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get basic data about the bank. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var getBankProfileData = function () {
        var profParams = {
            InstitutionKey: $scope.InstitutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/BankProfileOverviewApi/GetBankProfileDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            data: profParams
        };

        $http(req).then(function (result) {

            $scope.BankProfileDetailsQtd = result.data.bankProfileDataSections.quarterlyProfileData;
            $scope.BankProfileDetailsYtd = result.data.bankProfileDataSections.yearlyProfileData;
            if ($scope.ActiveBankProfileTab == 'QTD') {
                angular.element(document.querySelector('#linkBankProfileQtr')).addClass('active');
                angular.element(document.querySelector('#linkBankProfileYtd')).removeClass('active');
                $scope.BankProfileDetails = $scope.BankProfileDetailsQtd;
            }
            else {
                angular.element(document.querySelector('#linkBankProfileQtr')).removeClass('active');
                angular.element(document.querySelector('#linkBankProfileYtd')).addClass('active');
                $scope.BankProfileDetails = $scope.BankProfileDetailsYtd;
            }

            angular.element(document.querySelector('#bankProfileDetailsSpinner')).addClass('hidden');
            $rootScope.ShowBankProfileForInstitutionKey = 0;
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get bank profile data. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    $scope.ToggleQtdYtd = function ($event) {
        if (angular.element(document.querySelector('#qtdYtdToggle')).prop('checked') === true) {
            angular.element(document.querySelector('#linkBankProfileQtr')).removeClass('active');
            angular.element(document.querySelector('#linkBankProfileYtd')).addClass('active');
            $scope.BankProfileDetails = $scope.BankProfileDetailsYtd;
            $scope.TableHeaders = $scope.YtdHeaders;
            $scope.ActiveBankProfileTab = 'YTD';
            $scope.AssetGrowthRateChartData = $scope.AssetGrowthRateChartDataYtd;
            $scope.LoansLeasesGrowthRateChartData = $scope.LoansLeasesGrowthRateChartDataYtd;
            $scope.DepositGrowthRateChartData = $scope.DepositGrowthRateChartDataYtd;
            $scope.EquityCapitalGrowthRateChartData = $scope.EquityCapitalGrowthRateChartDataYtd;
            //setLabel('assetGrowthChartContainerLabel', '<h5><strong>Asset Growth Rate (YTD)</strong>');
            //setLabel('loansLeasesGrowthChartContainerLabel', '<h5><strong>Loans &amp; Leases Growth Rate (YTD)</strong></h5>');
            //setLabel('depositGrowthChartContainerLabel', '<h5><strong>Deposit Growth Rate (YTD)</strong></h5>');
            //setLabel('equityGrowthChartContainerLabel', '<h5><strong>Bank Equity Capital Growth Rate (YTD)</strong>');
            renderLoadCompositionChart('loadCompChart', $scope.LoadCompStackChartDataYtd, $scope.StackChartCategoriesYtd, 'Loan Composition (%)');
            renderDepositCompositionChart('depositCompChart', $scope.DepositCompStackChartDataYtd, $scope.StackChartCategoriesYtd, 'Deposit Composition (%)');
            renderAssetGrowthBarChart('assetGrowthChart', $scope.AssetGrowthRateChartData, 'Asset Growth Rate (YTD)');
            renderLoansLeasesGrowthBarChart('loansLeasesGrowthChart', $scope.LoansLeasesGrowthRateChartData, 'Loans & Leases Growth Rate (YTD)');
            renderDepositGrowthBarChart('depositGrowthChart', $scope.DepositGrowthRateChartData, 'Deposits Growth Rate (YTD)');
            renderEquityCapitalGrowthBarChart('equityCapitalGrowthChart', $scope.EquityCapitalGrowthRateChartData, 'Bank Equity Capital Growth Rate (YTD)');
        }
        else {
            angular.element(document.querySelector('#linkBankProfileQtr')).addClass('active');
            angular.element(document.querySelector('#linkBankProfileYtd')).removeClass('active');
            $scope.TableHeaders = $scope.QtrHeaders;
            $scope.BankProfileDetails = $scope.BankProfileDetailsQtd;
            $scope.ActiveBankProfileTab = 'QTD';
            $scope.AssetGrowthRateChartData = $scope.AssetGrowthRateChartDataQtr;
            $scope.LoansLeasesGrowthRateChartData = $scope.LoansLeasesGrowthRateChartDataQtr;
            $scope.DepositGrowthRateChartData = $scope.DepositGrowthRateChartDataQtr;
            $scope.EquityCapitalGrowthRateChartData = $scope.EquityCapitalGrowthRateChartDataQtr;
            //setLabel('assetGrowthChartContainerLabel', '<h5><strong>Asset Growth Rate (QTD)</strong>');
            //setLabel('loansLeasesGrowthChartContainerLabel', '<h5><strong>Loans &amp; Leases Growth Rate (QTD)</strong></h5>');
            //setLabel('depositGrowthChartContainerLabel', '<h5><strong>Deposit Growth Rate (QTD)</strong></h5>');
            //setLabel('equityGrowthChartContainerLabel', '<h5><strong>Bank Equity Capital Growth Rate (QTD)</strong>');
            renderLoadCompositionChart('loadCompChart', $scope.LoadCompStackChartDataQtd, $scope.StackChartCategoriesQtd, 'Loan Composition (%)');
            renderDepositCompositionChart('depositCompChart', $scope.DepositCompStackChartDataQtd, $scope.StackChartCategoriesQtd, 'Deposit Composition (%)');
            renderAssetGrowthBarChart('assetGrowthChart', $scope.AssetGrowthRateChartData, 'Asset Growth Rate (QTD)');
            renderLoansLeasesGrowthBarChart('loansLeasesGrowthChart', $scope.LoansLeasesGrowthRateChartData, 'Loans & Leases Growth Rate (QTD)');
            renderDepositGrowthBarChart('depositGrowthChart', $scope.DepositGrowthRateChartData, 'Deposits Growth Rate (QTD)');
            renderEquityCapitalGrowthBarChart('equityCapitalGrowthChart', $scope.EquityCapitalGrowthRateChartData, 'Bank Equity Capital Growth Rate (QTD)');
        }
    }

    getBankProfileIntroductionData();
    getQuarterToDateHeaders();
    getYearToDateHeaders();
    getFavoriteBanks();
    $('[data-toggle="tooltip"]').tooltip();
    $('#qtdYtdToggle').bootstrapToggle({
        on: 'QTD',
        off: 'YTD'
    });
}]);
