
cbrRiskRadarModule.controller("riskRadarNavigationController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$interval", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $interval) {
    $scope.riskRadarTemplate = 'riskRadarPeerGroupTemplate';
    $scope.SelectedTab = 'Peer Group';
    $scope.BankName = '';

    var chartsRenderingStatus = {
        riskRadarKRI1ExportComplete: false
    }

    $scope.FavoriteBanks = [];
    $scope.BankProfileIntroductionData = {};
    $scope.BankProfileDetailsQtd = [];
    $scope.BankProfileDetailsYtd = [];
    $scope.BankProfileDetails = [];
    $scope.YtdHeaders = {};
    $scope.QtrHeaders = {};
    $scope.TableHeaders = {};
    $rootScope.ActiveBankProfileTab = 'QTD';

    $rootScope.InstitutionKey = 0;
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.ChartBase64Reps = {
        riskRadarKRI1: ''
    };

    $scope.GoToDashboard = function () {
        window.location.href = '/';
    }

    var initialize = function () {
        $scope.BankName = $location.search().instkey;
        $rootScope.InstitutionKey = $location.search().instkey;
    };

    $scope.toggleSuccessMessageBoxModal = function (message) {
        $scope.SuccessMessageText = message;
        $scope.showSuccessMessageModal = !$scope.showSuccessMessageModal;
    };

    $scope.toggleErrorMessageBoxModal = function (message) {
        if (message === '') {
            $scope.ErrorMessageText = message;
            $scope.showDashboardErrorMessageModal = false;
        }
        else if (message !== '' && $scope.showDashboardErrorMessageModal === true) {
            $scope.showDashboardErrorMessageModal = false;
            $scope.ErrorMessageText = $scope.ErrorMessageText + "\n" + message;
            $scope.showDashboardErrorMessageModal = true;
        }
        else {
            $scope.ErrorMessageText = message;
            $scope.showDashboardErrorMessageModal = !$scope.showDashboardErrorMessageModal;
        }
    };

    $scope.getChartImagePresence = function (exportfile) {
        document.getElementById('overlay').style.display = '';
        var req = {
            method: 'GET',
            url: '/api/RiskRadarApi/GetChartImagePresence',
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
                if (exportfile === 'pdf') {
                    DownloadPdf();
                }
                else if (exportfile === 'excel') {
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

    var DownloadPdf = function () {
        document.getElementById('overlay').style.display = '';
        $scope.ChartBase64Reps.riskRadarKRI1 = $scope.ChartBase64Reps.riskRadarKRI1.replace("data:image/png;base64,", "");

        var profParams = {
            InstitutionKey: $rootScope.InstitutionKey,
            Period: ''

        };

        if ($rootScope.ActiveBankProfileTab === 'QTD') {
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
        $.fileDownload('/api/RiskRadarApi/GetPdfOfRiskRadarProfile', req);
    }

    var DownloadExcel = function () {
        document.getElementById('overlay').style.display = '';
        $scope.ChartBase64Reps.riskRadarKRI1 = $scope.ChartBase64Reps.riskRadarKRI1.replace("data:image/png;base64,", "");
        var profParams = {
            InstitutionKey: $scope.InstitutionKey
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
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to download the Excel. Please send an e-mail to castellonf@stifel.com.');
            },
            cookiePath: '/',
            cookieDomain: window.location.hostname
        };

        $.fileDownload('/api/RiskRadarApi/GetExcelOfRiskRadarProfile', req);

    }

    initialize();
}]);

cbrRiskRadarModule.controller("riskRadarPeerGroup", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {

    $scope.PerformanceIndexData = [];
    //KRI Metric Data
    $scope.KRIMetricData = [];
    // $scope.KRIMetricSelectedData = [];
    $scope.SelectedKRIMetricData = {};

    $scope.RRTableHeaders = [];
    $scope.RRHeaderScoreInformation = [];
    $scope.RRHeaderScoreBgrdCellcolor = [];
    $scope.RRKRIValues = [];
    $scope.RiskRadarData = [];
    $scope.RRInstitutionAssetSize = '';
    $scope.RiskRadarRiskLevel = [];
    $scope.RiskRadarViewDetails = [];
    $scope.RRInstitutionAssetSize = '';
    $scope.RRInstitutionPeerGroup = '';
    $scope.CheckDefaultKRI = true;

    var BindRiskRadarData = function (riskRadarData) {
        var rrData = null;
        if ($rootScope.ActiveBankProfileTab === 'QTD') {
            rrData = riskRadarData.quarterlyData;
        }
        else {
            rrData = riskRadarData.yearlyData;
        }
        $scope.RRInstitutionAssetSize = rrData.assetSize;
        $scope.RRInstitutionPeerGroup = rrData.kriValues[0].peerGroup;
        $scope.RRHeaderScoreInformation = rrData.headerScoreInformation;
        $scope.RRHeaderScoreBgrdCellcolor = rrData.rRHeaderScoreBgrdCellcolor;
        $scope.RRKRIValues = rrData.kriValues;
        angular.forEach($scope.RRKRIValues, function (item) {
            item.currentMinus4KRIValue.currentDataValue = getDataValue(item.currentMinus4KRIValue?.currentDataValue);
            item.currentMinus3KRIValue.currentDataValue = getDataValue(item.currentMinus3KRIValue?.currentDataValue);
            item.currentMinus2KRIValue.currentDataValue = getDataValue(item.currentMinus2KRIValue?.currentDataValue);
            item.currentMinus1KRIValue.currentDataValue = getDataValue(item.currentMinus1KRIValue?.currentDataValue);
            item.currentKRIValue.currentDataValue = getDataValue(item.currentKRIValue?.currentDataValue);

            item.currentMinus4KRIValue.currentPeerGroupAvgValue = getDataValue(item.currentMinus4KRIValue?.currentPeerGroupAvgValue);
            item.currentMinus3KRIValue.currentPeerGroupAvgValue = getDataValue(item.currentMinus3KRIValue?.currentPeerGroupAvgValue);
            item.currentMinus2KRIValue.currentPeerGroupAvgValue = getDataValue(item.currentMinus2KRIValue?.currentPeerGroupAvgValue);
            item.currentMinus1KRIValue.currentPeerGroupAvgValue = getDataValue(item.currentMinus1KRIValue?.currentPeerGroupAvgValue);
            item.currentKRIValue.currentPeerGroupAvgValue = getDataValue(item.currentKRIValue?.currentPeerGroupAvgValue);
        });
        $scope.RRTableHeaders = rrData.timePeriodHeaderLabels.categoryLabels;
    }

    var getDataValue = function (dataValue) {
        let parsedData = null;
        if (dataValue !== null && dataValue !== "") {
            parsedData = parseFloat(dataValue).toFixed(2);
        }
        return parsedData;
    }

    var BindRiskRadarChartData = function (riskRadarTimePeriodData) {
        var chartData = null;
        if ($rootScope.ActiveBankProfileTab === 'QTD') {
            chartData = riskRadarTimePeriodData.quarterlyData;
        }
        else {
            chartData = riskRadarTimePeriodData.yearlyData;
        }
        for (var i = 0; i < chartData.length; i++) {
            angular.element(document.querySelector('#chart-container-' + (i + 1))).removeClass('hidden');
            angular.element(document.querySelector('#chart-loader')).addClass('hidden');
            //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
            $scope.QuarterlyChartData = chartData[i].lineBarChartData.quarterlyChartData;
            $scope.YearlyChartData = chartData[i].lineBarChartData.yearlyChartData;

            if ($scope.ActiveChartTab === 'QTD') {
                renderBarAndLineChart($scope.QuarterlyChartData, 'chart-container-' + (i + 1), i + 1);
            }
            else {
                renderBarAndLineChart($scope.YearlyChartData, 'chart-container-' + (i + 1), i + 1);
            }

            angular.element(document.querySelector('#' + 'chartUbprDesc' + (i + 1))).addClass('active');
            $scope.SelectedUBPRColId = 'chartUbprDesc';
        }
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
            if (result.data !== null && result.data.length > 0) {
                $scope.FavoriteBanks = result.data;
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get favorite banks. Please send an e-mail to castellonf@stifel.com.');
        });
    }

    $scope.ToggleQtdYtd = function () {
        if (angular.element(document.querySelector('#rrQtdYtdToggle')).prop('checked') === true) {
            $scope.BankProfileDetails = $scope.BankProfileDetailsYtd;
            $scope.TableHeaders = $scope.YtdHeaders;
            $rootScope.ActiveBankProfileTab = 'QTD';
        }
        else {
            $scope.TableHeaders = $scope.QtrHeaders;
            $scope.BankProfileDetails = $scope.BankProfileDetailsQtd;
            $rootScope.ActiveBankProfileTab = 'YTD';
        }
        BindRiskRadarData($scope.RiskRadarData);
        BindRiskRadarChartData($scope.RiskRadarViewDetails);
    }

    $scope.ToggleDataOnBankChange = function ($event, favoriteBank) {
        $rootScope.ShowBankProfileForInstitutionKey = favoriteBank.institutionKey;
        $rootScope.InstitutionKey = favoriteBank.institutionKey;

        FusionCharts.items.riskRadarKRI1.setChartData([]);
        FusionCharts.items.riskRadarKRI2.setChartData([]);
        FusionCharts.items.riskRadarKRI3.setChartData([]);
        FusionCharts.items.riskRadarKRI4.setChartData([]);
        FusionCharts.items.riskRadarKRI5.setChartData([]);
        FusionCharts.items.riskRadarKRI6.setChartData([]);
        FusionCharts.items.riskRadarKRI7.setChartData([]);
        FusionCharts.items.riskRadarKRI8.setChartData([]);
        FusionCharts.items.riskRadarKRI9.setChartData([]);
        FusionCharts.items.riskRadarKRI10.setChartData([]);

        angular.element(document.querySelector('#rrDetailsSpinner')).removeClass('hidden');
        angular.element(document.querySelector('#divRiskRadarCharts')).addClass('hidden');

        getBankProfileIntroductionData();
    }

    var getBankProfileIntroductionData = function () {
        var profParams = {
            InstitutionKey: $rootScope.InstitutionKey
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
            if (result.data !== null) {
                $scope.BankProfileIntroductionData = result.data;
                if ($scope.BankProfileIntroductionData.subchapterS === 0)
                    $scope.BankProfileIntroductionData.subchapterS = 'No';
                else
                    $scope.BankProfileIntroductionData.subchapterS = 'Yes';

                $scope.BankProfileIntroductionData.established = new Date($scope.BankProfileIntroductionData.established).toLocaleDateString('en-US');
                $rootScope.InstitutionKey = $scope.BankProfileIntroductionData.institutionKey;
                getRiskRadarChartData();
                $rootScope.ShowBankProfileForInstitutionKey = 0;
            }
            else {
                $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                // angular.element(document.querySelector('#chart-container-1')).html('<span>No data available to render chart.</span>')
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get basic data about the bank. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var riskRadarKRIChartRenderCompleteHandler = function (eve) {
        setTimeout(function () {
            let url = window.location.protocol + "//" + (window.location.hostname.includes('localhost') ? (window.location.hostname + ':44361') : window.location.hostname) + "/FCExporter.aspx"
            FusionCharts.items[eve.sender.id].exportChart({
                "exportFormat": "jpg",
                "exportHandler": url,
                "exportAction": "save",
                "exportFileName": eve.sender.id
            });

            FusionCharts.items[eve.sender.id].removeEventListener("rendered", riskRadarKRIChartRenderCompleteHandler);
        }, 3000);

    }

    var getRiskRadarChartData = function () {
        var riskRadarChartParams = {
            InstitutionKey: $rootScope.InstitutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/RiskRadarApi/GetRiskRadarViewDetailsData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: riskRadarChartParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.RiskRadarViewDetails = result.data;
                    $scope.RiskRadarData = result.data.riskRadarData;
                    BindRiskRadarChartData($scope.RiskRadarViewDetails);
                    BindRiskRadarData($scope.RiskRadarData);
                    angular.element(document.querySelector('#rrDetailsSpinner')).addClass('hidden');
                    angular.element(document.querySelector('#divRiskRadarCharts')).removeClass('hidden');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for chart. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    // Render the Charts for KRI's
    var renderBarAndLineChart = function (chartData, chartContainer, index) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": '',
                    "showPlotBorder": "0",
                    "plotBorderAlpha": "0",
                    "subCaption": "",
                    "xAxisname": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "showBorder": "0",
                    "showValues": "0",
                    "paletteColors": "#003057,#ed7d31",
                    "anchorBgColor": "#ed7d31",
                    "bgColor": "#ffffff",
                    "showCanvasBorder": "0",
                    "canvasBgColor": "#ffffff",
                    "captionFontSize": "14",
                    "subcaptionFontBold": "0",
                    "subcaptionFontSize": "14",
                    "divlineColor": "#999999",
                    "divLineDashed": "1",
                    "divLineDashLen": "1",
                    "divLineGapLen": "1",
                    "showAlternateHGridColor": "0",
                    "usePlotGradientColor": "0",
                    "toolTipColor": "#ffffff",
                    "toolTipBorderThickness": "0",
                    "toolTipBgColor": "#000000",
                    "toolTipBgAlpha": "80",
                    "toolTipBorderRadius": "2",
                    "toolTipPadding": "5",
                    "legendBgColor": "#ffffff",
                    "legendBorderAlpha": "0",
                    "legendShadow": "0",
                    "legendItemFontSize": "10",
                    "legendItemFontColor": "#666666",
                    "decimals": "2",
                    "forceDecimals": "1",
                    "valueFontColor": "#000000",
                    "valueBorderColor": "#ffffff",
                    "valueBgColor": "#ffffff",
                    "valueFontBold": 1,
                    "showLegend": "1",
                    "legendBorderThickness": "0",
                    "showLabels": "1",
                    "showYAxisValues": false,
                    "chartTopMargin": "0",
                    "chartBottomMargin": "0",
                    "placeValuesInside": "1",
                    "exportenabled": "1",
                    "exportShowMenuItem": "0"
                },
                "categories": [
                    {
                        "category": chartData.categories ? chartData.categories.category.categoryLabels : []
                    }
                ],
                "dataset": chartData.dataSetList
            };
            //setTimeout(function () {
            var renderAtContainerId = 'riskRadarKRI' + index;
            var chartContainerDiv = $('#' + chartContainer);
            if (chartContainerDiv !== null) {
                if (chartData.dataSetList[0].data.every(x => x.value === null)) {
                    $('#' + chartContainer).css("height", "204px");
                    chartContainerDiv.html("No data to display");
                }
                var riskRadarChart = FusionCharts.items['riskRadarKRI' + index];
                if (typeof riskRadarChart === 'undefined') {
                    riskRadarChart = new FusionCharts({
                        type: 'mscombi2d',
                        id: renderAtContainerId,
                        renderAt: chartContainer,
                        width: '100%',
                        height: '200',
                        dataFormat: 'json',
                        dataSource: dSource
                    });
                    riskRadarChart.addEventListener("rendered", riskRadarKRIChartRenderCompleteHandler.bind(index));
                    riskRadarChart.render();
                }
                else {
                    riskRadarChart.addEventListener("rendered", riskRadarKRIChartRenderCompleteHandler.bind(index));
                    riskRadarChart.setChartData(dSource, 'json');
                    riskRadarChart.render();
                }
            } // if block ends here
            //}, 5000);
        });
    }

    // Bind KRI RiskLevels Master data from API
    var getRiskRadarRiskLevel = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskRadarApi/GetRiskRadarRiskLevelData',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.RiskRadarRiskLevel = result.data;
                }
            },
            function (e) {
                console.log(e)
                $scope.ErrorMessageText = 'An error occurred while trying to get data for chart data.Please connect with system administrator.';
            });
    }

    // Start of KRI Data Modal Popup
    $scope.ShowKRIDataModal = function ($event) {
        var req = {
            method: 'GET',
            url: '/api/RiskRadarApi/GetKRIMetricMasterData',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.KRIMetricData = result.data;
                    console.log($scope.KRIMetricData);
                    checkIfKRIIsDefault();
                    $('#div-KRI-Modal').drawer().show();
                }
            },
            function (e) {
                console.log(e)
                $scope.ErrorMessageText = 'An error occurred while trying to get data for chart data.Please connect with system administrator.';
                $("#errorModal").modal();
            });
    }

    $scope.HideKRIDataModal = function () {
        $('#div-KRI-Modal').drawer().hide();
    }

    $scope.ToggleKRIValueChange = function ($event) {
        checkIfKRIIsDefault();
    }

    $scope.SaveOrUpdateKRIModal = function () {
        const data = [];
        const log = [];

        angular.forEach($scope.KRIMetricData, function (value, key) {
            data.push({
                name: value.kriGroup,
                value: value.kriSelected.kriMetricId
            });
        }, log);

        var req = {
            method: 'POST',
            url: '/api/RiskRadarApi/SaveOrUpdateKRIData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    console.log("success");
                    getRiskRadarChartData();
                    $scope.HideKRIDataModal();
                    angular.element(document.querySelector('#rrDetailsSpinner')).removeClass('hidden');
                    angular.element(document.querySelector('#divRiskRadarCharts')).addClass('hidden');

                }
            },
            function (e) {
                console.log(e)
                $scope.ErrorMessageText = 'An error occurred while trying to get data for chart data.Please connect with system administrator.';
                $("#errorModal").modal();
            });

    }

    $scope.ToggleKRIToDefault = function () {
        if ($scope.CheckDefaultKRI === true) {
            const log = [];
            angular.forEach($scope.KRIMetricData, function (value, key) {
                value.kriSelected = value.kriValueData.find(k => { return k.isDefault === true });
            }, log);
        }
    }

    var checkIfKRIIsDefault = function () {
        var isNotDefaultCount = $scope.KRIMetricData.filter(f => f.kriSelected.isDefault === false);
        if (isNotDefaultCount.length > 0) {
            $scope.CheckDefaultKRI = false;
        }
        else {
            $scope.CheckDefaultKRI = true;
        }
    }
    // End of KRI Data Modal Popup

    var initialize = function () {
        getFavoriteBanks();
        getRiskRadarRiskLevel();
        $rootScope.InstitutionKey = $location.search().instkey;
        getBankProfileIntroductionData();
    };

    initialize();

    $('#rrQtdYtdToggle').bootstrapToggle({
        on: 'YTD',
        off: 'QTD'
    });
}]);

angular.bootstrap(document.getElementById("riskRadar"), ['cbrRiskRadar']);
