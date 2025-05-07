cbrBankAnalyticsModule.controller("callReportAnalyzer", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.c_r_data0 = [];
    $scope.c_r_data0_2 = [];
    $scope.c_r_data1 = [];
    $scope.c_r_data2 = [];
    $scope.c_r_data2_2 = [];
    $scope.c_r_data2_3 = [];
    $scope.c_r_data3 = [];
    $scope.c_r_data3_2 = [];
    $scope.c_r_data3_3 = [];
    $scope.c_r_data4 = [];
    $scope.c_r_data5 = [];
    $scope.c_r_data6 = [];
    $scope.c_r_data7 = [];
    $scope.c_r_data8 = [];
    $scope.c_r_data8_2 = [];
    $scope.c_r_data8_3 = [];
    $scope.c_r_data8_4 = [];
    $scope.c_r_data9 = [];
    $scope.c_r_data10 = [];
    $scope.c_r_data10_2 = [];
    $scope.c_r_data11 = [];
    $scope.c_r_data12 = [];
    $scope.c_r_data13 = [];
    $scope.c_r_data13_2 = [];
    $scope.c_r_data14 = [];
    $scope.c_r_data14_2 = [];
    $scope.c_r_data15 = [];
    $scope.c_r_data15_2 = [];
    $scope.c_r_data16 = [];
    $scope.c_r_data16_2 = [];
    $scope.c_r_data16_3 = [];
    $scope.c_r_data17 = [];
    $scope.c_r_data18 = [];
    $scope.c_r_data19 = [];
    $scope.c_r_data19_2 = [];
    $scope.c_r_data20 = [];
    $scope.c_r_data20_2 = [];
    $scope.c_r_data21 = [];
    $scope.c_r_data21_2 = [];
    $scope.c_r_data21_3 = [];
    $scope.c_r_data21_4 = [];
    $scope.c_r_data22 = [];
    $scope.c_r_data22_2 = [];
    $scope.c_r_data22_3 = [];
    $scope.c_r_data23 = [];
    $scope.c_r_data24 = [];
    $scope.c_r_data24_2 = [];
    $scope.c_r_data24_3 = [];
    $scope.c_r_data24_4 = [];
    $scope.c_r_data24_5 = [];
    $scope.c_r_data25 = [];
    $scope.c_r_data25_2 = [];
    $scope.c_r_data25_3 = [];
    $scope.my_tree = tree = [];
    $scope.SelectedSchedule = "0";
    $scope.TabTitle = 'Select Schedule';
    $scope.SelectedTab = '';
    $scope.SelectedBank = {};
    $scope.FavoriteBanks = [];
    $scope.SelectedSchedules = [];
    $scope.Period = 'QTD';
    $scope.SelectedTabs = [];

    var getFavoriteBanks = function () {
        //angular.element(document.querySelector('#loaderCramDashboard')).removeClass('hidden');
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
                for (i = 0; i < $scope.FavoriteBanks.length; i++) {
                    if ($scope.FavoriteBanks[i].isDefaultBank === true) {
                        $scope.SelectedBank = $scope.FavoriteBanks[i];
                        break;
                    }
                }
            }
        }, function () {
            //angular.element(document.querySelector('#loaderDashboardLinks')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get favorite banks. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    $scope.MoveToDashboard = function () {
        window.location.href = '/';
    }
    
    $scope.ToggleBank = function(bankObj)
    {
        $scope.SelectedBank = bankObj;
        $scope.GetCallReportData();
    }

    $scope.GetCallReportData = function()
    {
        var params = {
            TabName: $scope.SelectedTab,
            InstitutionKey: $scope.SelectedBank.institutionKey,
            QtdOrYtd: $scope.Period
        };

        var req = {
            method: 'POST',
            url: '/api/CallReportAnalyzerApi/GetCallReportData',
            headers: {
                'Content-Type': 'application/json'
            },
            data:params
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                switch($scope.SelectedTab)
                {
                    case 'RI #1':
                        $scope.c_r_data0 = result.data;
                        break;
                    case 'RI #2':
                        $scope.c_r_data0_2 = result.data;
                        break;
                    case 'RC':
                        $scope.c_r_data6 = result.data;
                        break;
                    case 'RC-C #1':
                        $scope.c_r_data8 = result.data;
                        break;
                    case 'RC-C #2':
                        $scope.c_r_data8_2 = result.data;
                        break;
                    case 'RC-C #3':
                        $scope.c_r_data8_3 = result.data;
                        break;
                    case 'RC-C #4':
                        $scope.c_r_data8_4 = result.data;
                        break;
                    case 'RC-E #1':
                        $scope.c_r_data10 = result.data;
                        break;
                    case 'RC-E #2':
                        $scope.c_r_data10_2 = result.data;
                        break;
                    case 'RC-N #1':
                        $scope.c_r_data16 = result.data;
                        break;
                    case 'RC-N #2':
                        $scope.c_r_data16_2 = result.data;
                        break;
                    case 'RC-N #3':
                        $scope.c_r_data16_3 = result.data;
                        break;
                    case 'RC-R #1':
                        $scope.c_r_data20 = result.data;
                        break;
                    case 'RI-A':
                        $scope.c_r_data1 = result.data;
                        break;
                    case 'RI-B #1':
                        $scope.c_r_data2 = result.data;
                        break;
                    case 'RI-B #2':
                        $scope.c_r_data2_2 = result.data;
                        break;
                    case 'RI-B #3':
                        $scope.c_r_data2_3 = result.data;
                        break;
                    case 'RI-C #1':
                        $scope.c_r_data3 = result.data;
                        break;
                    case 'RI-C #2':
                        $scope.c_r_data3_2 = result.data;
                        break;
                    case 'RI-C #3':
                        $scope.c_r_data3_3 = result.data;
                        break;
                    case 'RI-D':
                        $scope.c_r_data4 = result.data;
                        break;
                    case 'RI-E':
                        $scope.c_r_data5 = result.data;
                        break;
                    case 'RC-A':
                        $scope.c_r_data7 = result.data;
                        break;
                    case 'RC-D':
                        $scope.c_r_data9 = result.data;
                        break;
                    case 'RC-F+G':
                        $scope.c_r_data11 = result.data;
                        break;
                    case 'RC-K':
                        $scope.c_r_data12 = result.data;
                        break;
                    case 'RC-L #1':
                        $scope.c_r_data14 = result.data;
                        break;
                    case 'RC-L #2':
                        $scope.c_r_data14_2 = result.data;
                        break;
                    case 'RC-M':
                        $scope.c_r_data13 = result.data;
                        break;
                    case 'RC-M #2':
                        $scope.c_r_data13_2 = result.data;
                        break;
                    case 'RC-O':
                        $scope.c_r_data17 = result.data;
                        break;
                    case 'RC-P':
                        $scope.c_r_data18 = result.data;
                        break;
                    case 'RC-Q #1':
                        $scope.c_r_data19 = result.data;
                        break;
                    case 'RC-Q #2':
                        $scope.c_r_data19_2 = result.data;
                        break;
                    case 'RC-R #2':
                        $scope.c_r_data20_2 = result.data;
                        break;
                    case 'RC-S #1':
                        $scope.c_r_data21 = result.data;
                        break;
                    case 'RC-S #2':
                        $scope.c_r_data21_2 = result.data;
                        break;
                    case 'RC-S #3':
                        $scope.c_r_data21_3 = result.data;
                        break;
                    case 'RC-S #4':
                        $scope.c_r_data21_4 = result.data;
                        break;
                    case 'RC-T #1':
                        $scope.c_r_data22 = result.data;
                        break;
                    case 'RC-T #2':
                        $scope.c_r_data22_2 = result.data;
                        break;
                    case 'RC-T #3':
                        $scope.c_r_data22_3 = result.data;
                        break;
                    case 'RC-V':
                        $scope.c_r_data23 = result.data;
                        break;
                    case 'RC-B #1':
                        $scope.c_r_data24 = result.data;
                        break;
                    case 'RC-B #2':
                        $scope.c_r_data24_2 = result.data;
                        break;
                    case 'RC-B #3':
                        $scope.c_r_data24_3 = result.data;
                        break;
                    case 'RC-B #4':
                        $scope.c_r_data24_4 = result.data;
                        break;
                    case 'RC-B #5':
                        $scope.c_r_data24_5 = result.data;
                        break;
                    case 'RC-R2 #1':
                        $scope.c_r_data25 = result.data;
                        break;
                    case 'RC-R2 #2':
                        $scope.c_r_data25_2 = result.data;
                        break;
                    case 'RC-R2 #3':
                        $scope.c_r_data25_3 = result.data;
                        break;
                }
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get call report data. Please send an e-mail to admin@cb-resource.com.');
                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
        });
    }
    
    $scope.ToggleIncomeStatementSubTabs = function(tabName)
    {
        if (tabName == 'c_r_data0')
        {
            $scope.SelectedTab = 'RI #1';
            angular.element(document.querySelector('#c_r_data0')).addClass('active');
            angular.element(document.querySelector('#c_r_data0_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data0')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data0_2')).removeClass('active');
            $scope.GetCallReportData();
        }
        else
        {
            $scope.SelectedTab = 'RI #2';
            angular.element(document.querySelector('#c_r_data0')).removeClass('active');
            angular.element(document.querySelector('#c_r_data0_2')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data0')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data0_2')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.ToggleLoansAndLeases = function(tabName)
    {
        if (tabName == 'c_r_data8') {
            $scope.SelectedTab = 'RC-C #1';
            angular.element(document.querySelector('#c_r_data8')).addClass('active');
            angular.element(document.querySelector('#c_r_data8_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data8_3')).removeClass('active');
            angular.element(document.querySelector('#c_r_data8_4')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data8')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data8_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data8_3')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data8_4')).removeClass('active');
            $scope.GetCallReportData();
        }
        else if (tabName == 'c_r_data8_2') {
            $scope.SelectedTab = 'RC-C #2';
            angular.element(document.querySelector('#c_r_data8')).removeClass('active');
            angular.element(document.querySelector('#c_r_data8_2')).addClass('active');
            angular.element(document.querySelector('#c_r_data8_3')).removeClass('active');
            angular.element(document.querySelector('#c_r_data8_4')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data8')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data8_2')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data8_3')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data8_4')).removeClass('active');
            $scope.GetCallReportData();
        }
        else if (tabName == 'c_r_data8_3') {
            $scope.SelectedTab = 'RC-C #3';
            angular.element(document.querySelector('#c_r_data8')).removeClass('active');
            angular.element(document.querySelector('#c_r_data8_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data8_3')).addClass('active');
            angular.element(document.querySelector('#c_r_data8_4')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data8')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data8_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data8_3')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data8_4')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RC-C #4';
            angular.element(document.querySelector('#c_r_data8')).removeClass('active');
            angular.element(document.querySelector('#c_r_data8_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data8_3')).removeClass('active');
            angular.element(document.querySelector('#c_r_data8_4')).addClass('active');

            angular.element(document.querySelector('#lnkc_r_data8')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data8_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data8_3')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data8_4')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.ToggleDeposits = function (tabName) {
        if (tabName == 'c_r_data10') {
            $scope.SelectedTab = 'RC-E #1';
            angular.element(document.querySelector('#c_r_data10')).addClass('active');
            angular.element(document.querySelector('#c_r_data10_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data10')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data10_2')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RC-E #2';
            angular.element(document.querySelector('#c_r_data10')).removeClass('active');
            angular.element(document.querySelector('#c_r_data10_2')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data10')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data10_2')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.TogglePastDueAndNonAccrual = function (tabName)
    {
        if (tabName == 'c_r_data16') {
            $scope.SelectedTab = 'RC-N #1';
            angular.element(document.querySelector('#c_r_data16')).addClass('active');
            angular.element(document.querySelector('#c_r_data16_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data16_3')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data16')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data16_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data16_3')).removeClass('active');
            $scope.GetCallReportData();
        }
        else if (tabName == 'c_r_data16_2') {
            $scope.SelectedTab = 'RC-N #2';
            angular.element(document.querySelector('#c_r_data16')).removeClass('active');
            angular.element(document.querySelector('#c_r_data16_2')).addClass('active');
            angular.element(document.querySelector('#c_r_data16_3')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data16')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data16_2')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data16_3')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RC-N #3';
            angular.element(document.querySelector('#c_r_data16')).removeClass('active');
            angular.element(document.querySelector('#c_r_data16_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data16_3')).addClass('active');

            angular.element(document.querySelector('#lnkc_r_data16')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data16_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data16_3')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.ToggleDisaggregatedData = function (tabName) {
        if (tabName == 'c_r_data3') {
            $scope.SelectedTab = 'RI-C #1';
            angular.element(document.querySelector('#c_r_data3')).addClass('active');
            angular.element(document.querySelector('#c_r_data3_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data3_3')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data3')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data3_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data3_3')).removeClass('active');
            $scope.GetCallReportData();
        }
        else if (tabName == 'c_r_data3_2') {
            $scope.SelectedTab = 'RI-C #2';
            angular.element(document.querySelector('#c_r_data3')).removeClass('active');
            angular.element(document.querySelector('#c_r_data3_2')).addClass('active');
            angular.element(document.querySelector('#c_r_data3_3')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data3')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data3_2')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data3_3')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RI-C #3';
            angular.element(document.querySelector('#c_r_data3')).removeClass('active');
            angular.element(document.querySelector('#c_r_data3_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data3_3')).addClass('active');

            angular.element(document.querySelector('#lnkc_r_data3')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data3_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data3_3')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.ToggleChargeOffsAndRecoveries = function (tabName) {
        if (tabName == 'c_r_data2') {
            $scope.SelectedTab = 'RI-B #1';
            angular.element(document.querySelector('#c_r_data2')).addClass('active');
            angular.element(document.querySelector('#c_r_data2_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data2_3')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data2')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data2_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data2_3')).removeClass('active');
            $scope.GetCallReportData();
        }
        else if (tabName == 'c_r_data2_2') {
            $scope.SelectedTab = 'RI-B #2';
            angular.element(document.querySelector('#c_r_data2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data2_2')).addClass('active');
            angular.element(document.querySelector('#c_r_data2_3')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data2_2')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data2_3')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RI-B #3';
            angular.element(document.querySelector('#c_r_data2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data2_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data2_3')).addClass('active');

            angular.element(document.querySelector('#lnkc_r_data2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data2_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data2_3')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.ToggleOffBalanceSheetItems = function (tabName) {
        if (tabName == 'c_r_data14') {
            $scope.SelectedTab = 'RC-L #1';
            angular.element(document.querySelector('#c_r_data14')).addClass('active');
            angular.element(document.querySelector('#c_r_data14_2')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data14')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data14_2')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RC-L #2';
            angular.element(document.querySelector('#c_r_data14')).removeClass('active');
            angular.element(document.querySelector('#c_r_data14_2')).addClass('active');

            angular.element(document.querySelector('#lnkc_r_data14')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data14_2')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.ToggleMemoranda = function (tabName) {
        if (tabName == 'c_r_data13') {
            $scope.SelectedTab = 'RC-M';
            angular.element(document.querySelector('#c_r_data13')).addClass('active');
            angular.element(document.querySelector('#c_r_data13_2')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data13')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data13_2')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RC-M #2';
            angular.element(document.querySelector('#c_r_data13')).removeClass('active');
            angular.element(document.querySelector('#c_r_data13_2')).addClass('active');

            angular.element(document.querySelector('#lnkc_r_data13')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data13_2')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.ToggleAssetsLiabilitiesAtFairValue = function (tabName) {
        if (tabName == 'c_r_data19') {
            $scope.SelectedTab = 'RC-Q #1';
            angular.element(document.querySelector('#c_r_data19')).addClass('active');
            angular.element(document.querySelector('#c_r_data19_2')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data19')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data19_2')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RC-Q #2';
            angular.element(document.querySelector('#c_r_data19')).removeClass('active');
            angular.element(document.querySelector('#c_r_data19_2')).addClass('active');

            angular.element(document.querySelector('#lnkc_r_data19')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data19_2')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.TogglePartOneRegulatoryCapital = function (tabName) {
        if (tabName == 'c_r_data20') {
            $scope.SelectedTab = 'RC-R #1';
            angular.element(document.querySelector('#c_r_data20')).addClass('active');
            angular.element(document.querySelector('#c_r_data20_2')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data20')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data20_2')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RC-R #2';
            angular.element(document.querySelector('#c_r_data20')).removeClass('active');
            angular.element(document.querySelector('#c_r_data20_2')).addClass('active');

            angular.element(document.querySelector('#lnkc_r_data20')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data20_2')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.ToggleServiceSecuritization = function (tabName) {
        if (tabName == 'c_r_data21') {
            $scope.SelectedTab = 'RC-S #1';
            angular.element(document.querySelector('#c_r_data21')).addClass('active');
            angular.element(document.querySelector('#c_r_data21_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data21_3')).removeClass('active');
            angular.element(document.querySelector('#c_r_data21_4')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data21')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data21_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data21_3')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data21_4')).removeClass('active');
            $scope.GetCallReportData();
        }
        else if (tabName == 'c_r_data21_2') {
            $scope.SelectedTab = 'RC-S #2';
            angular.element(document.querySelector('#c_r_data21')).removeClass('active');
            angular.element(document.querySelector('#c_r_data21_2')).addClass('active');
            angular.element(document.querySelector('#c_r_data21_3')).removeClass('active');
            angular.element(document.querySelector('#c_r_data21_4')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data21')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data21_2')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data21_3')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data21_4')).removeClass('active');
            $scope.GetCallReportData();
        }
        else if (tabName == 'c_r_data21_3') {
            $scope.SelectedTab = 'RC-S #3';
            angular.element(document.querySelector('#c_r_data21')).removeClass('active');
            angular.element(document.querySelector('#c_r_data21_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data21_3')).addClass('active');
            angular.element(document.querySelector('#c_r_data21_4')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data20')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data21_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data21_3')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data21_4')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RC-S #4';
            angular.element(document.querySelector('#c_r_data21')).removeClass('active');
            angular.element(document.querySelector('#c_r_data21_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data21_3')).removeClass('active');
            angular.element(document.querySelector('#c_r_data21_4')).addClass('active');

            angular.element(document.querySelector('#lnkc_r_data21')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data21_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data21_3')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data21_4')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.ToggleFiduciaryRelatedServices = function (tabName) {
        if (tabName == 'c_r_data22') {
            $scope.SelectedTab = 'RC-T #1';
            angular.element(document.querySelector('#c_r_data22')).addClass('active');
            angular.element(document.querySelector('#c_r_data22_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data22_3')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data22')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data22_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data22_3')).removeClass('active');
            $scope.GetCallReportData();
        }
        else if (tabName == 'c_r_data22_2') {
            $scope.SelectedTab = 'RC-T #2';
            angular.element(document.querySelector('#c_r_data22')).removeClass('active');
            angular.element(document.querySelector('#c_r_data22_2')).addClass('active');
            angular.element(document.querySelector('#c_r_data22_3')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data22')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data22_2')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data22_3')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RC-T #3';
            angular.element(document.querySelector('#c_r_data22')).removeClass('active');
            angular.element(document.querySelector('#c_r_data22_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data22_3')).addClass('active');

            angular.element(document.querySelector('#lnkc_r_data22')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data22_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data22_3')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.ToggleSecurities = function (tabName) {
        if (tabName == 'c_r_data24') {
            $scope.SelectedTab = 'RC-B #1';
            angular.element(document.querySelector('#c_r_data24')).addClass('active');
            angular.element(document.querySelector('#c_r_data24_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_3')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_4')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_5')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data24')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_3')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_4')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_5')).removeClass('active');
            $scope.GetCallReportData();
        }
        else if (tabName == 'c_r_data24_2') {
            $scope.SelectedTab = 'RC-B #2';
            angular.element(document.querySelector('#c_r_data24')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_2')).addClass('active');
            angular.element(document.querySelector('#c_r_data24_3')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_4')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_5')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data24')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_2')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_3')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_4')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_5')).removeClass('active');
            $scope.GetCallReportData();
        }
        else if (tabName == 'c_r_data24_3') {
            $scope.SelectedTab = 'RC-B #3';
            angular.element(document.querySelector('#c_r_data24')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_3')).addClass('active');
            angular.element(document.querySelector('#c_r_data24_4')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_5')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data24')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_3')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_4')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_5')).removeClass('active');
            $scope.GetCallReportData();
        }
        else if (tabName == 'c_r_data24_4') {
            $scope.SelectedTab = 'RC-B #4';
            angular.element(document.querySelector('#c_r_data24')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_3')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_4')).addClass('active');
            angular.element(document.querySelector('#c_r_data24_5')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data24')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_3')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_4')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_5')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RC-B #5';
            angular.element(document.querySelector('#c_r_data24')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_3')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_4')).removeClass('active');
            angular.element(document.querySelector('#c_r_data24_5')).addClass('active');

            angular.element(document.querySelector('#lnkc_r_data24')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_3')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_4')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data24_5')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.ToggleRiskWeightedAssets = function (tabName) {
        if (tabName == 'c_r_data25') {
            $scope.SelectedTab = 'RC-R2 #1';
            angular.element(document.querySelector('#c_r_data25')).addClass('active');
            angular.element(document.querySelector('#c_r_data25_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data25_3')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data25')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data25_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data25_3')).removeClass('active');
            $scope.GetCallReportData();
        }
        else if (tabName == 'c_r_data25_2') {
            $scope.SelectedTab = 'RC-R2 #2';
            angular.element(document.querySelector('#c_r_data25')).removeClass('active');
            angular.element(document.querySelector('#c_r_data25_2')).addClass('active');
            angular.element(document.querySelector('#c_r_data25_3')).removeClass('active');

            angular.element(document.querySelector('#lnkc_r_data25')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data25_2')).addClass('active');
            angular.element(document.querySelector('#lnkc_r_data25_3')).removeClass('active');
            $scope.GetCallReportData();
        }
        else {
            $scope.SelectedTab = 'RC-R2 #3';
            angular.element(document.querySelector('#c_r_data25')).removeClass('active');
            angular.element(document.querySelector('#c_r_data25_2')).removeClass('active');
            angular.element(document.querySelector('#c_r_data25_3')).addClass('active');

            angular.element(document.querySelector('#lnkc_r_data25')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data25_2')).removeClass('active');
            angular.element(document.querySelector('#lnkc_r_data25_3')).addClass('active');
            $scope.GetCallReportData();
        }
    }

    $scope.ToggleSchedule = function()
    {
        $scope.SelectedSchedules = [];
        $scope.SelectedTabs = [];
        switch($scope.SelectedSchedule)
        {
            case "1":
                $scope.TabTitle = 'Schedule RI Income Statement';
                $scope.SelectedTab = 'RI #1';
                angular.element(document.querySelector('#callreporttab1')).addClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                $scope.GetCallReportData();
                var tab1 = "RI #1";
                var tab2 = "RI #2";
                var tabName1 = "Income Statement";
                var tabName2 = "Memoranda";
                $scope.SelectedSchedules.push(tab1, tab2);
                $scope.SelectedTabs.push(tabName1, tabName2);
                break;
            case "2":
                $scope.TabTitle = 'Schedule RI-A Changes in Capital';
                $scope.SelectedTab = 'RI-A';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).addClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RI-A";
                tabName1 = "Changes in Capital";
                $scope.SelectedSchedules.push(tab1);
                $scope.SelectedTabs.push(tabName1);
                $scope.GetCallReportData();
                break;
            case "3":
                $scope.TabTitle = 'Schedule RI-B Charge-offs & Recoveries';
                $scope.SelectedTab = 'RI-B #1';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).addClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RI-B #1";
                tab2 = "RI-B #2";
                var tab3 = "RI-B #3";
                tabName1 = "Charge-offs";
                tabName2 = "Recoveries";
                var tabName3 = "Net Charge-offs";
                $scope.SelectedTabs.push(tabName1, tabName2, tabName3);
                $scope.SelectedSchedules.push(tab1, tab2, tab3);
                $scope.GetCallReportData();
                break;
            case "4":
                $scope.TabTitle = 'Schedule RI-C Disaggregated Data on ALLL';
                $scope.SelectedTab = 'RI-C #1';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).addClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RI-C #1";
                tab2 = "RI-C #2";
                tab3 = "RI-C #3";
                tabName1 = "Determined Impaired";
                tabName2 = "Evaluated for Impairment";
                tabName3 = "Credit-Impaired Loans";
                $scope.SelectedTabs.push(tabName1, tabName2, tabName3);
                $scope.SelectedSchedules.push(tab1, tab2, tab3);
                $scope.GetCallReportData();
                break;
            case "5":
                $scope.TabTitle = 'Schedule RI-D Income from Foreign Offices';
                $scope.SelectedTab = 'RI-D';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).addClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RI-D";
                tabName1 = "Income Foreign Offices";
                $scope.SelectedTabs.push(tabName1);
                $scope.SelectedSchedules.push(tab1);
                $scope.GetCallReportData();
                break;
            case "6":
                $scope.TabTitle = 'Schedule RI-E Explanations';
                $scope.SelectedTab = 'RI-E';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).addClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RI-E";
                tabName1 = "Explanations";
                $scope.SelectedTabs.push(tabName1);
                $scope.SelectedSchedules.push(tab1);
                
                $scope.GetCallReportData();
                break;
            case "7":
                $scope.TabTitle = 'Schedule RC Balance Sheet';
                $scope.SelectedTab = 'RC';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).addClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                $scope.GetCallReportData();
                tab1 = "RC";
                tabName1 = "Balance Sheet";
                $scope.SelectedTabs.push(tabName1);
                $scope.SelectedSchedules.push(tab1);
                break;
            case "8":
                $scope.TabTitle = 'Schedule RC-A Cash & Balances';
                $scope.SelectedTab = 'RC-A';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).addClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-A";
                tabName1 = "Cash & Balances";
                $scope.SelectedTabs.push(tabName1);
                $scope.SelectedSchedules.push(tab1);
                $scope.GetCallReportData();
                break;
            case "9":
                $scope.TabTitle = 'Schedule RC-C Loans & Leases';
                $scope.SelectedTab = 'RC-C #1';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).addClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-C #1";
                tab2 = "RC-C #2";
                tab3 = "RC-C #3";
                var tab4 = "RC-C #4";
                tabName1 = "Loans and Leases";
                tabName2 = "Small Business Loans";
                tabName3 = "Loans Restructured in TDRs";
                var tabName4 = "Maturity & Repricing";
                $scope.SelectedTabs.push(tabName1, tabName2,tabName3, tabName4);
                $scope.SelectedSchedules.push(tab1,tab2,tab3,tab4);
                $scope.GetCallReportData();
                break;
            case "10":
                $scope.TabTitle = 'Schedule RC-D Trading Assets';
                $scope.SelectedTab = 'RC-D';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).addClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-D";
                tabName1 = "Trading Assets & Liabilities";
                $scope.SelectedTabs.push(tabName1);
                $scope.SelectedSchedules.push(tab1);
                $scope.GetCallReportData();
                break;
            case "11":
                $scope.TabTitle = 'Schedule RC-E Deposits';
                $scope.SelectedTab = 'RC-E #1';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).addClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                $scope.GetCallReportData();
                tab1 = "RC-E #1";
                tab2 = "RC-E #2";
                tabName1 = "Deposit Liabilities";
                tabName2 = "Maturity & Repricing";
                $scope.SelectedTabs.push(tabName1, tabName2);
                $scope.SelectedSchedules.push(tab1,tab2);
                break;
            case "12":
                $scope.TabTitle = 'Schedule RC-F Other Assets & RC-G Other Liabilities';
                $scope.SelectedTab = 'RC-F+G';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).addClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-F+G";
                tabName1 = "Other Assets & Liabilities";
                $scope.SelectedTabs.push(tabName1);
                $scope.SelectedSchedules.push(tab1);
                $scope.GetCallReportData();
                break;
            case "13":
                $scope.TabTitle = 'Schedule RC-K Quarterly Averages';
                $scope.SelectedTab = 'RC-K';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).addClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-K";
                tabName1 = "Quarterly Averages";
                $scope.SelectedTabs.push(tabName1);
                $scope.SelectedSchedules.push(tab1);
                 
                $scope.GetCallReportData();
                break;
            case "14":
                $scope.TabTitle = 'Schedule RC-L Derivatives & Off-Balance Sheet Items';
                $scope.SelectedTab = 'RC-L #1';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).addClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-L #1";
                tab2 = "RC-L #2";
                tabName1 = "Derivatives";
                tabName2 = "Off-Balance Sheet Items";
                $scope.SelectedTabs.push(tabName1, tabName2);
                $scope.SelectedSchedules.push(tab1, tab2);
                $scope.GetCallReportData();
                break;
            case "15":
                $scope.TabTitle = 'Schedule RC-M Memoranda';
                $scope.SelectedTab = 'RC-M';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).addClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-M";
                tab2 = "RC-M #2";
                tabName1 = "Memoranda";
                tabName2 = "Loss-Sharing Agreements";
                $scope.SelectedTabs.push(tabName1, tabName2);
                $scope.SelectedSchedules.push(tab1, tab2);
                $scope.GetCallReportData();
                break;
            case "16":
                $scope.TabTitle = 'Schedule RC-N Past Due & Nonaccrual';
                $scope.SelectedTab = 'RC-N #1';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).addClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-N #1";
                tab2 = "RC-N #2";
                tab3 = "RC-N #3";
                tabName1 = "30-89 Days Past Due";
                tabName2 = "90+ Days Past Due";
                tabName3 = "Nonaccrual";
                $scope.SelectedTabs.push(tabName1, tabName2, tabName3);
                $scope.SelectedSchedules.push(tab1, tab2, tab3);
                $scope.GetCallReportData();
                break;
            case "17":
                $scope.TabTitle = 'Schedule RC-O Other Data for Deposit Insurance and FICO Assessments';
                $scope.SelectedTab = 'RC-O';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).addClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                $scope.GetCallReportData();
                tab1 = "RC-O";
                tabName1 = "Other Data for Deposit Insurance and FICO Assessments";
                $scope.SelectedTabs.push(tabName1);
                $scope.SelectedSchedules.push(tab1);
                break;
            case "18":
                $scope.TabTitle = 'Schedule RC-P 1-4 Family Residential Mortgage Banking Activities';
                $scope.SelectedTab = 'RC-P';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).addClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-P";
                tabName1 = "1-4 Family Residential Mortgage Banking Activities";
                $scope.SelectedTabs.push(tabName1);
                $scope.SelectedSchedules.push(tab1);
                $scope.GetCallReportData();
                break;
            case "19":
                $scope.TabTitle = 'Schedule RC-Q Assets and Liabilities Measured at Fair Value';
                $scope.SelectedTab = 'RC-Q #1';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).addClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-Q #1";
                tab2 = "RC-Q #2";
                tabName1 = "Netting Adjustments";
                tabName2 = "Fair Value Measurements";
                $scope.SelectedTabs.push(tabName1, tabName2);
                $scope.SelectedSchedules.push(tab1, tab2);
                $scope.GetCallReportData();
                break;
            case "20":
                $scope.TabTitle = 'Schedule RC-R Part I: Regulatory Capital';
                $scope.SelectedTab = 'RC-R #1';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).addClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                $scope.GetCallReportData();
                tab1 = "RC-R #1";
                tab2 = "RC-R #2";
                tabName1 = "Regulatory Capital";
                tabName2 = "";
                $scope.SelectedTabs.push(tabName1, tabName2);
                $scope.SelectedSchedules.push(tab1, tab2);
                break;
            case "21":
                $scope.TabTitle = 'Schedule RC-S Servicing Securitization';
                $scope.SelectedTab = 'RC-S #1';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).addClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-S #1";
                tab2 = "RC-S #2";
                tab3 = "RC-S #3";
                tab4 = "RC-S #4";
                tabName1 = "Securitized Assets";
                tabName2 = "Credit Exposure";
                tabName3 = "Unused Commitments";
                tabName4 = "Seller Interest";
                $scope.SelectedTabs.push(tabName1, tabName2,tabName3, tabName4);
                $scope.SelectedSchedules.push(tab1, tab2, tab3, tab4);
                $scope.GetCallReportData();
                break;
            case "22":
                $scope.TabTitle = 'Schedule RC-T Fiduciary & Related Services';
                $scope.SelectedTab = 'RC-T #1';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).addClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-T #1";
                tab2 = "RC-T #2";
                tab3 = "RC-T #3";
                tabName1 = "Fiduciary Services";
                tabName2 = "Managed Assets";
                tabName3 = "Non-Managed Assets";
                $scope.SelectedTabs.push(tabName1, tabName2, tabName3);
                $scope.SelectedSchedules.push(tab1, tab2, tab3);
                $scope.GetCallReportData();
                break;
            case "23":
                $scope.TabTitle = 'Schedule RC-V Variable Interest Entities';
                $scope.SelectedTab = 'RC-V';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).addClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                tab1 = "RC-V";
                tabName1 = "Variable Interest Entitie";
                $scope.SelectedTabs.push(tabName1);
                $scope.SelectedSchedules.push(tab1);
                $scope.GetCallReportData();
                break;
            case "24":
                $scope.TabTitle = 'Schedule RC-B Securities';
                $scope.SelectedTab = 'RC-B #1';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).addClass('active');
                angular.element(document.querySelector('#callreporttab25')).removeClass('active');
                $scope.GetCallReportData();
                tab1 = "RC-B #1";
                tab2 = "RC-B #2";
                tab3 = "RC-B #3";
                tab4 = "RC-B #4";
                tab5 = "RC-B #5";
                tabName1 = "HTM Amortized Cost";
                tabName2 = "HTM Fair Value";
                tabName3 = "AFS Amortized Cost";
                tabName4 = "Available-for-Sale Fair Value";
                var tabName5 = "Memoranda";
                $scope.SelectedTabs.push(tabName1, tabName2,tabName3, tabName4,tabName5);
                $scope.SelectedSchedules.push(tab1, tab2, tab3, tab4, tab5);
                break;
            case "25":
                $scope.TabTitle = 'Schedule RC-R Part II Risk Weighted Assets';
                $scope.SelectedTab = 'RC-R2 #1';
                angular.element(document.querySelector('#callreporttab1')).removeClass('active');
                angular.element(document.querySelector('#callreporttab2')).removeClass('active');
                angular.element(document.querySelector('#callreporttab3')).removeClass('active');
                angular.element(document.querySelector('#callreporttab4')).removeClass('active');
                angular.element(document.querySelector('#callreporttab5')).removeClass('active');
                angular.element(document.querySelector('#callreporttab6')).removeClass('active');
                angular.element(document.querySelector('#callreporttab7')).removeClass('active');
                angular.element(document.querySelector('#callreporttab8')).removeClass('active');
                angular.element(document.querySelector('#callreporttab9')).removeClass('active');
                angular.element(document.querySelector('#callreporttab10')).removeClass('active');
                angular.element(document.querySelector('#callreporttab11')).removeClass('active');
                angular.element(document.querySelector('#callreporttab12')).removeClass('active');
                angular.element(document.querySelector('#callreporttab13')).removeClass('active');
                angular.element(document.querySelector('#callreporttab14')).removeClass('active');
                angular.element(document.querySelector('#callreporttab15')).removeClass('active');
                angular.element(document.querySelector('#callreporttab16')).removeClass('active');
                angular.element(document.querySelector('#callreporttab17')).removeClass('active');
                angular.element(document.querySelector('#callreporttab18')).removeClass('active');
                angular.element(document.querySelector('#callreporttab19')).removeClass('active');
                angular.element(document.querySelector('#callreporttab20')).removeClass('active');
                angular.element(document.querySelector('#callreporttab21')).removeClass('active');
                angular.element(document.querySelector('#callreporttab22')).removeClass('active');
                angular.element(document.querySelector('#callreporttab23')).removeClass('active');
                angular.element(document.querySelector('#callreporttab24')).removeClass('active');
                angular.element(document.querySelector('#callreporttab25')).addClass('active');
                $scope.GetCallReportData();
                tab1 = "RC-R2 #1";
                tab2 = "RC-R2 #2";
                tab3 = "RC-R2 #3";
                tabName1 = "Balance Sheet Assets";
                tabName2 = "Off-Balance Sheet Items";
                tabName3 = "Memoranda";
                $scope.SelectedTabs.push(tabName1, tabName2, tabName3);
                $scope.SelectedSchedules.push(tab1, tab2, tab3);
                break;
        }
    }

    $scope.ToggleQtdYtd = function () {
        if (angular.element(document.querySelector('#callreportQtdYtdToggle')).prop('checked') === true) {
            $scope.Period = 'YTD';
            $scope.GetCallReportData();
        }
        else {
            $scope.Period = 'QTD';
            $scope.GetCallReportData();
        }
    }

    $scope.ExportToExcelCallReport = function () {
        document.getElementById('overlay').style.display = '';
        

        var callReportParam = {
            TabNames: $scope.SelectedSchedules,
            InstitutionKey: $scope.SelectedBank.institutionKey,
            QtdOrYtd: $scope.Period,
            TabTitle: $scope.TabTitle,
            SelectedTabNames: $scope.SelectedTabs
        }
        var req = {
            httpMethod: 'POST',
            checkInterval: 500,
            successCallback: function (url) {
                if (url === '/Account/Login') {
                    window.location.href = url;
                }
                document.getElementById('overlay').style.display = 'none';
            },           
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
            },
            data: callReportParam,
            cookiePath: '/',
            cookieDomain: window.location.hostname
        };
        $.fileDownload('/Api/CallReportAnalyzerApi/ExportToExcelCallReportTabs', req);
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;
        if (isIE === true||isEdge === true) {
            setTimeout(function () {
                document.getElementById('overlay').style.display = 'none';
            }, 2000);
        }
    }
    var initialize = function()
    {
        $('#callreportQtdYtdToggle').bootstrapToggle({
            on: 'QTD',
            off: 'YTD'
        });

        getFavoriteBanks();
    }

    initialize();
}]);