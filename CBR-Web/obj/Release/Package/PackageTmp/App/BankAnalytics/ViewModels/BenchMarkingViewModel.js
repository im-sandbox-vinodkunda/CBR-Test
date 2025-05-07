cbrBankAnalyticsModule.controller("benchmarkingViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope) {
    $scope.benchmarkingSubTab = 'benchmarkingCreditRisk';
    $rootScope.ShowRiskProfileForInstitutionKey = 0;
    $rootScope.ShowRiskProfileForInstitutionName = '';
    $rootScope.ShowRiskProfileForPeerGroupKey = 0;
    $rootScope.ShowRiskProfileForPeerGroupName = '';

    $scope.Institutions = [];
    $scope.AllCustomPeerGroups = [];
    $scope.Bank = '';
    $scope.Peer1 = '';
    $scope.Peer2 = '';
    $scope.Peer1Key = '';
    $scope.InstitutionKey = '';
    $scope.ThresholdValue = '';
    $scope.FDIC = '';

    var clearChart = function () {
        angular.element(document.querySelector('#chart-container')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
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
                if (result.data !== null && result.data.length > 0) {

                    $scope.Institutions = result.data;
                    var defaultInstitution = $scope.Institutions.filter(function (obj) {
                        return obj.isDefault === true;
                    })[0];

                    if ($rootScope.ShowRiskProfileForInstitutionKey > 0) {
                        $scope.Bank = $rootScope.ShowRiskProfileForInstitutionName;
                        $scope.InstitutionKey = $rootScope.ShowRiskProfileForInstitutionKey;
                        var selectedInstitution = $scope.Institutions.filter(function (obj) {
                            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
                        })[0];

                        if (selectedInstitution.stdPeerGroupCode !== null && selectedInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + selectedInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                        $scope.FDIC = selectedInstitution.fdicCert;
                    }
                    else {
                        $scope.Bank = defaultInstitution.institutionName;
                        $scope.InstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionName = defaultInstitution.institutionName;
                        if (defaultInstitution.stdPeerGroupCode !== null && defaultInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + defaultInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                        $scope.FDIC = defaultInstitution.fdicCert;
                    }

                    getThresholdValueForInstitution();
                    getAllPeerGroupsForUser();
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).attr('disabled', '');
                    angular.element(document.querySelector('#creditRiskChangeBank')).attr('disabled', '');
                    angular.element(document.querySelector('#creditRiskDataLoader')).addClass('hidden');
                    angular.element(document.querySelector('#chart-loader')).html('<span>No data available to render chart.</span>');
                    angular.element(document.querySelector('#averageTableSpinner')).html('<span>No data available to render comparison table.</span>');
                    angular.element(document.querySelector('#rankTableSpinner')).html('<span>No data available to render ranking table.</span>');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getThresholdValueForInstitution = function () {
        var thresHoldParameter = {
            InstitutionKey: $scope.InstitutionKey,
            ThresholdValue: 0
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetThresHoldForInstitute',
            headers: {
                'Content-Type': 'application/json'
            },
            data: thresHoldParameter
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    $scope.ThresholdValue = result.data;
                }
                else {
                    $scope.ThresholdValue = '';
                }
            },
            function (result) {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get threshold value. Please send an e-mail to admin@cb-resource.com.');
            });
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

                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).removeAttr('disabled');
                    $scope.AllCustomPeerGroups = result.data;
                    if ($rootScope.ShowRiskProfileForPeerGroupKey > 0) {
                        $scope.Peer1 = $rootScope.ShowRiskProfileForPeerGroupName;
                        $scope.Peer1Key = $rootScope.ShowRiskProfileForPeerGroupKey;
                    }
                    else {
                        var defaultPeerGroup = $scope.AllCustomPeerGroups.filter(function (obj) {
                            return obj.isDefault === true;
                        })[0];

                        if (defaultPeerGroup != null) {
                            $scope.Peer1 = defaultPeerGroup.name;
                            $scope.Peer1Key = defaultPeerGroup.key;
                            $rootScope.ShowRiskProfileForPeerGroupName = defaultPeerGroup.name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = defaultPeerGroup.key;
                        }
                        else {
                            $scope.Peer1 = $scope.AllCustomPeerGroups[0].name;
                            $scope.Peer1Key = $scope.AllCustomPeerGroups[0].key;
                            $rootScope.ShowRiskProfileForPeerGroupName = $scope.AllCustomPeerGroups[0].name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = $scope.AllCustomPeerGroups[0].key;
                        }
                    }

                    //getBenchmarkCreditRiskData($scope.Peer1Key);
                }
                else {
                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).attr('disabled', '');
                    $scope.toggleSuccessMessageBoxModal('There are no custom peer groups. Please create custom peer groups by going to "Manage Profiles" screen.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.ToggleDataOnInstitutionChange = function ($event, institutionObj) {
        $rootScope.ShowRiskProfileForInstitutionKey = institutionObj.institutionKey;
        $rootScope.ShowRiskProfileForInstitutionName = institutionObj.institutionName;
        $scope.Bank = institutionObj.institutionName;
        $scope.InstitutionKey = institutionObj.institutionKey;
        if (institutionObj.stdPeerGroupCode !== null && institutionObj.stdPeerGroupCode !== '')
            $scope.Peer2 = 'UBPR Group ' + institutionObj.stdPeerGroupCode;
        else
            $scope.Peer2 = 'N/A';
        getThresholdValueForInstitution();
        $scope.$broadcast('OnInstitutionChange', { institution: institutionObj });
        $scope.FDIC = institutionObj.fdicCert;
    }

    $scope.ToggleDataOnCustomPeerGroupChange = function ($event, peerGroupData) {
        $rootScope.ShowRiskProfileForPeerGroupKey = peerGroupData.key;
        $rootScope.ShowRiskProfileForPeerGroupName = peerGroupData.name;
        $scope.Peer1 = peerGroupData.name;
        $scope.Peer1Key = peerGroupData.key;
        $scope.$broadcast('OnPeerGroupChange', { peergroup: peerGroupData });
    }

    $scope.ToggleKeyRiskTrendSubTab = function (tabId) {
        if (tabId == 'benchmarkingCreditRisk') {
            angular.element(document.querySelector('#creditRiskLink')).addClass('active');
            angular.element(document.querySelector('#interestRateRiskLink')).removeClass('active');
            angular.element(document.querySelector('#liquidityRiskLink')).removeClass('active');
            angular.element(document.querySelector('#strategicRiskLink')).removeClass('active');
        }
        else if (tabId == 'benchmarkingInterestRateRisk') {
            angular.element(document.querySelector('#creditRiskLink')).removeClass('active');
            angular.element(document.querySelector('#interestRateRiskLink')).addClass('active');
            angular.element(document.querySelector('#liquidityRiskLink')).removeClass('active');
            angular.element(document.querySelector('#strategicRiskLink')).removeClass('active');
        }
        else if (tabId == 'benchmarkingLiquidityRisk') {
            angular.element(document.querySelector('#creditRiskLink')).removeClass('active');
            angular.element(document.querySelector('#interestRateRiskLink')).removeClass('active');
            angular.element(document.querySelector('#liquidityRiskLink')).addClass('active');
            angular.element(document.querySelector('#strategicRiskLink')).removeClass('active');
        }
        else {
            angular.element(document.querySelector('#creditRiskLink')).removeClass('active');
            angular.element(document.querySelector('#interestRateRiskLink')).removeClass('active');
            angular.element(document.querySelector('#liquidityRiskLink')).removeClass('active');
            angular.element(document.querySelector('#strategicRiskLink')).addClass('active');
        }

        $scope.benchmarkingSubTab = tabId;
    }

    $scope.ExportToExcelbenchmarking = function () {
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        if (isIE === true) {
            setCookie('fileDownload', true, 1);
        }
        $scope.exportDataBtn = true;
        document.getElementById('overlay').style.display = '';
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var riskProfileParams = {
            Institutionkey: $scope.InstitutionKey, //Will get user's tenant's institution on server
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey, //Need to be selected from a dropdown
            CustPeerGroupKey: $scope.Peer1Key, //Will get default custom peer group for logged in user on server
            Bank: $scope.Bank,
            ThresholdValue: $scope.ThresholdValue,
            Peer1: $scope.Peer1,
            Peer2: $scope.Peer2,
            PeerGroups: $scope.AllCustomPeerGroups
        };
        var req = {
            httpMethod: 'POST',
            successCallback: function (url) {
                if (url === '/Account/Login') {
                    window.location.href = url;
                }

                document.getElementById('overlay').style.display = 'none';
                $scope.$apply(function () {
                    $scope.exportDataBtn = false;
                });
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
                $scope.$apply(function () {
                    $scope.exportDataBtn = false;
                });
            },
            data: riskProfileParams,
            cookiePath: '/',
            cookieDomain: window.location.hostname,
            checkInterval: 500
        };

        $.fileDownload('/Api/BenchmarkApi/GetBenchmarkingExporttoExcel', req);
    }

    $scope.QtdYtdToggle = function () {
        $scope.$broadcast("OnQtdYtdToggle", { state: angular.element(document.querySelector('#qtdYtdToggle')).prop('checked') });
    }

    $scope.ChangeScreen = function (templateId) {
        $rootScope.ShowRiskProfileForInstitutionKey = 0;
        $rootScope.ShowRiskProfileForInstitutionName = '';
        $rootScope.ShowRiskProfileForPeerGroupKey = 0;
        $rootScope.ShowRiskProfileForPeerGroupName = '';
        window.location.href = '/';
    }

    $scope.TogglePeer1Column = function ($event) {
        $scope.$broadcast('OnPeer1StateToggle', { state: angular.element(document.querySelector('#creditRiskPeer1Toggle')).prop('checked') });
    }

    $scope.TogglePeer2Column = function ($event) {
        $scope.$broadcast('OnPeer2StateToggle', { state: angular.element(document.querySelector('#creditRiskPeer2Toggle')).prop('checked') });
    }

    $scope.HideUnhideBenchmarkInputBox = function (dataObj) {
        if (dataObj === -7.922816251426434e+28)
            return 'hidebenchmarkinput';
        else
            return '';
    }

    $scope.UpdateThresholdValueForInstitution = function ($event) {
        document.getElementById('overlay').style.display = '';

        var thresHoldParameter = {
            InstitutionKey: $scope.InstitutionKey,
            ThresholdValue: $scope.ThresholdValue
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/UpdateThresHoldForInstitute',
            headers: {
                'Content-Type': 'application/json'
            },
            data: thresHoldParameter
        };

        $http(req).then(
            function (result) {
                if (result.data !== null && result.data === true) {

                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleSuccessMessageBoxModal('Successfully updated the threshold value.');
                }
                else {
                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleSuccessMessageBoxModal('Could not update the threshold value. Please send an e-mail to admin@cb-resource.com.');
                }
            },
            function (result) {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get threshold value. Please send an e-mail to admin@cb-resource.com.');
                document.getElementById('overlay').style.display = 'none';
            });
    }

    var initialize = function () {
        getInstitutionList();
        $('#creditRiskPeer1Toggle').bootstrapToggle({
            on: 'On',
            off: 'Off'
        });

        $('#creditRiskPeer2Toggle').bootstrapToggle({
            on: 'On',
            off: 'Off'
        });

        $('#creditRiskPeer1Toggle').bootstrapToggle('on');

        $('#creditRiskPeer2Toggle').bootstrapToggle('on');

        $('#qtdYtdToggle').bootstrapToggle({
            on: 'QTD',
            off: 'YTD'
        });
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("benchmarkingCreditRiskViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.CrSummaryRatios = [];
    $scope.CrYieldAndCosts = [];
    $scope.CrOffBalanceSheetItems = [];
    $scope.CrCreditAllowance = [];
    $scope.CrLoanMix = [];
    $scope.CrConcentrationOfCredit = [];
    $scope.CrCommercialRealEstate = [];
    $scope.CrPastDueAndNonAccrual = [];

    $scope.CrSummaryRatiosQtd = [];
    $scope.CrYieldAndCostsQtd = [];
    $scope.CrOffBalanceSheetItemsQtd = [];
    $scope.CrCreditAllowanceQtd = [];
    $scope.CrLoanMixQtd = [];
    $scope.CrConcentrationOfCreditQtd = [];
    $scope.CrCommercialRealEstateQtd = [];
    $scope.CrPastDueAndNonAccrualQtd = [];

    $scope.CrSummaryRatiosYtd = [];
    $scope.CrYieldAndCostsYtd = [];
    $scope.CrOffBalanceSheetItemsYtd = [];
    $scope.CrCreditAllowanceYtd = [];
    $scope.CrLoanMixYtd = [];
    $scope.CrConcentrationOfCreditYtd = [];
    $scope.CrCommercialRealEstateYtd = [];
    $scope.CrPastDueAndNonAccrualYtd = [];

    $scope.AllCustomPeerGroups = [];
    $scope.Bank = '';
    $scope.Peer1 = '';
    $scope.Peer2 = '';
    $scope.Peer1Key = '';
    $scope.InstitutionKey = '';
    $scope.RankingDataQtr = [];
    $scope.AverageDataQtr = [];
    $scope.RankingDataYtd = [];
    $scope.AverageDataYtd = [];
    $scope.RankingData = [];
    $scope.AverageData = [];
    $scope.ActiveChartTab = 'YTD';
    $scope.QuarterlyChartData = {};
    $scope.YearlyChartData = {};
    $scope.SelectedUBPRDesc = '';
    $scope.SelectedUBPRColId = '';
    $scope.YtdRankTableHeaders = [];
    $scope.YtdAverageTableHeaders = [];
    $scope.QtrRankTableHeaders = [];
    $scope.QtrAverageTableHeaders = [];
    $scope.RankTableHeaders = [];
    $scope.AverageTableHeaders = [];
    $scope.ThresholdValue = '';
    $scope.Institutions = [];

    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.exportDataBtn = false;
    $scope.ubprConceptCodesForHasThresholdValues = ['CALC0001', 'UBPRE026', 'UBPRE267', 'UBPRE272', 'UBPRE277', 'UBPRE019', 'UBPRE390'
        , 'UBPRD490', 'UBPRE884', 'UBPRD647', 'UBPRD649', 'UBPRE544', 'UBPRE541', 'UBPRE542', 'UBPR7414'
        , 'UBPRE024', 'UBPRE027', 'UBPRE880', 'UBPRE658', 'UBPRE881', 'UBPRE882', 'UBPRE885', 'UBPRE886', 'UBPRE887', 'UBPRE888', 'UBPRE890'
        , 'UBPRE893', 'UBPRE547', 'UBPRE549'];
    $scope.ubprConceptCodesForNotHasTheThreshHoldValues = ['CALC0001', 'UBPRE026', 'UBPRE267', 'UBPRE272', 'UBPRE277', 'UBPRE019', 'UBPRE390'
        , 'UBPRD490', 'UBPRE884', 'UBPRD647', 'UBPRD649', 'UBPRE544', 'UBPRE541', 'UBPRE542', 'UBPR7414'
        , 'UBPRE024', 'UBPRE027', 'UBPRE880', 'UBPRE658', 'UBPRE881', 'UBPRE882', 'UBPRE885', 'UBPRE886', 'UBPRE887', 'UBPRE888', 'UBPRE890'
        , 'UBPRE893', 'UBPRE547', 'UBPRE549'
    ];
    $scope.HighlightDefaultBank = function (rankData) {
        var highlighter = '';
        if (rankData.isDefault === true)
            highlighter = 'highlightDefaultBank';

        return highlighter;
    }

    $scope.HideUnhideBenchmarkInputBox = function (dataObj) {
        if (dataObj === -7.922816251426434e+28)
            return 'hidebenchmarkinput';
        else
            return '';
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
                if (result.data !== null && result.data.length > 0) {

                    $scope.Institutions = result.data;
                    var defaultInstitution = $scope.Institutions.filter(function (obj) {
                        return obj.isDefault === true;
                    })[0];

                    if ($rootScope.ShowRiskProfileForInstitutionKey > 0) {
                        $scope.Bank = $rootScope.ShowRiskProfileForInstitutionName;
                        $scope.InstitutionKey = $rootScope.ShowRiskProfileForInstitutionKey;
                        var selectedInstitution = $scope.Institutions.filter(function (obj) {
                            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
                        })[0];

                        if (selectedInstitution.stdPeerGroupCode !== null && selectedInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + selectedInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }
                    else {
                        $scope.Bank = defaultInstitution.institutionName;
                        $scope.InstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionName = defaultInstitution.institutionName;
                        if (defaultInstitution.stdPeerGroupCode !== null && defaultInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + defaultInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }

                    getThresholdValueForInstitution();
                    getAllPeerGroupsForUser();
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).attr('disabled', '');
                    angular.element(document.querySelector('#creditRiskChangeBank')).attr('disabled', '');
                    angular.element(document.querySelector('#creditRiskDataLoader')).addClass('hidden');
                    angular.element(document.querySelector('#chart-loader')).html('<span>No data available to render chart.</span>');
                    angular.element(document.querySelector('#averageTableSpinner')).html('<span>No data available to render comparison table.</span>');
                    angular.element(document.querySelector('#rankTableSpinner')).html('<span>No data available to render ranking table.</span>');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.$on('OnInstitutionChange', function (event, opt) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#interestRateRiskDataLoader')).removeClass('hidden');

        $scope.CrSummaryRatios = [];
        $scope.CrYieldAndCosts = [];
        $scope.CrOffBalanceSheetItems = [];
        $scope.CrCreditAllowance = [];
        $scope.CrLoanMix = [];
        $scope.CrConcentrationOfCredit = [];
        $scope.CrCommercialRealEstate = [];
        $scope.CrPastDueAndNonAccrual = [];

        $scope.CrSummaryRatiosYtd = [];
        $scope.CrYieldAndCostsYtd = [];
        $scope.CrOffBalanceSheetItemsYtd = [];
        $scope.CrCreditAllowanceYtd = [];
        $scope.CrLoanMixYtd = [];
        $scope.CrConcentrationOfCreditYtd = [];
        $scope.CrCommercialRealEstateYtd = [];
        $scope.CrPastDueAndNonAccrualYtd = [];

        $scope.CrSummaryRatiosQtd = [];
        $scope.CrYieldAndCostsQtd = [];
        $scope.CrOffBalanceSheetItemsQtd = [];
        $scope.CrCreditAllowanceQtd = [];
        $scope.CrLoanMixQtd = [];
        $scope.CrConcentrationOfCreditQtd = [];
        $scope.CrCommercialRealEstateQtd = [];
        $scope.CrPastDueAndNonAccrualQtd = [];

        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        $scope.SelectedUBPRColId = '';
        $rootScope.ShowRiskProfileForInstitutionKey = opt.institution.institutionKey;
        $rootScope.ShowRiskProfileForInstitutionName = opt.institution.institutionName;
        $scope.Bank = opt.institution.institutionName;
        $scope.InstitutionKey = opt.institution.institutionKey;
        if (opt.institution.stdPeerGroupCode !== null && opt.institution.stdPeerGroupCode !== '')
            $scope.Peer2 = 'UBPR Group ' + opt.institution.stdPeerGroupCode;
        else
            $scope.Peer2 = 'N/A';
        clearChart();
        getThresholdValueForInstitution();
        getBenchmarkCreditRiskData($scope.Peer1Key);
    });

    var updateCorrespondingQtdYtdObject = function (value, ubprConceptCode) {
        if ($scope.ActiveChartTab === 'QTD') {
            var objectToUpdate = $scope.CrSummaryRatiosYtd.filter(function (obj) {
                return obj.ubprConceptCode === ubprConceptCode;
            })[0];

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrYieldAndCostsYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrOffBalanceSheetItemsYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrCreditAllowanceYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrLoanMixYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrConcentrationOfCreditYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrCommercialRealEstateYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrPastDueAndNonAccrualYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            objectToUpdate.benchmark = value;
        }
        else {
            var objectToUpdate = $scope.CrSummaryRatiosQtd.filter(function (obj) {
                return obj.ubprConceptCode === ubprConceptCode;
            })[0];

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrYieldAndCostsQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrOffBalanceSheetItemsQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrCreditAllowanceQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrLoanMixQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrConcentrationOfCreditQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrCommercialRealEstateQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.CrPastDueAndNonAccrualYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            objectToUpdate.benchmark = value;
        }
    }

    var getThresholdValueForInstitution = function () {
        var thresHoldParameter = {
            InstitutionKey: $scope.InstitutionKey,
            ThresholdValue: 0
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetThresHoldForInstitute',
            headers: {
                'Content-Type': 'application/json'
            },
            data: thresHoldParameter
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    $scope.ThresholdValue = result.data;
                }
                else {
                    $scope.ThresholdValue = '';
                }
            },
            function (result) {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get threshold value. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.UpdateThresholdValueForInstitution = function ($event) {
        document.getElementById('overlay').style.display = '';

        var thresHoldParameter = {
            InstitutionKey: $scope.InstitutionKey,
            ThresholdValue: $scope.ThresholdValue
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/UpdateThresHoldForInstitute',
            headers: {
                'Content-Type': 'application/json'
            },
            data: thresHoldParameter
        };

        $http(req).then(
            function (result) {
                if (result.data !== null && result.data === true) {

                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleSuccessMessageBoxModal('Successfully updated the threshold value.');
                }
                else {
                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleSuccessMessageBoxModal('Could not update the threshold value. Please send an e-mail to admin@cb-resource.com.');
                }
            },
            function (result) {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get threshold value. Please send an e-mail to admin@cb-resource.com.');
                document.getElementById('overlay').style.display = 'none';
            });
    }

    $scope.$on('OnPeer1StateToggle', function (event, opt) {
        if (opt.state === true) {
            angular.element(document.querySelector('#summary-ratios')).addClass('off3');
            angular.element(document.querySelector('#yields-costs')).addClass('off3');
            angular.element(document.querySelector('#off-balance-sheet-items')).addClass('off3');
            angular.element(document.querySelector('#credit-allowance')).addClass('off3');
            angular.element(document.querySelector('#loan-mix')).addClass('off3');
            angular.element(document.querySelector('#concentrations-of-credit')).addClass('off3');
            angular.element(document.querySelector('#pastdue-nonaccrual')).addClass('off3');

            var chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
            obj.visible = "0";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
        else {
            angular.element(document.querySelector('#summary-ratios')).removeClass('off3');
            angular.element(document.querySelector('#yields-costs')).removeClass('off3');
            angular.element(document.querySelector('#off-balance-sheet-items')).removeClass('off3');
            angular.element(document.querySelector('#credit-allowance')).removeClass('off3');
            angular.element(document.querySelector('#loan-mix')).removeClass('off3');
            angular.element(document.querySelector('#concentrations-of-credit')).removeClass('off3');
            angular.element(document.querySelector('#pastdue-nonaccrual')).removeClass('off3');

            chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
            obj.visible = "1";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
    });

    $scope.$on('OnPeer2StateToggle', function (event, opt) {
        if (opt.state === true) {
            angular.element(document.querySelector('#summary-ratios')).addClass('off4');
            angular.element(document.querySelector('#yields-costs')).addClass('off4');
            angular.element(document.querySelector('#off-balance-sheet-items')).addClass('off4');
            angular.element(document.querySelector('#credit-allowance')).addClass('off4');
            angular.element(document.querySelector('#loan-mix')).addClass('off4');
            angular.element(document.querySelector('#concentrations-of-credit')).addClass('off4');
            angular.element(document.querySelector('#pastdue-nonaccrual')).addClass('off4');

            var chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
            obj.visible = "0";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
        else {
            angular.element(document.querySelector('#summary-ratios')).removeClass('off4');
            angular.element(document.querySelector('#yields-costs')).removeClass('off4');
            angular.element(document.querySelector('#off-balance-sheet-items')).removeClass('off4');
            angular.element(document.querySelector('#credit-allowance')).removeClass('off4');
            angular.element(document.querySelector('#loan-mix')).removeClass('off4');
            angular.element(document.querySelector('#concentrations-of-credit')).removeClass('off4');
            angular.element(document.querySelector('#pastdue-nonaccrual')).removeClass('off4');

            chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
            obj.visible = "1";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
    });

    $scope.BindTrafficLightBgcolor = function (ubprObject) {
        var lowUbprConceptCodes = '';
        var className = '';
        if ($scope.ThresholdValue !== '' && parseInt($scope.ThresholdValue) > 0) {
            if ($scope.ubprConceptCodesForHasThresholdValues.indexOf(ubprObject.ubprConceptCode) > -1) {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) <= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) > 0) {
                    var perct = (Math.abs(parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark)) / parseFloat(ubprObject.benchmark)) * 100;

                    if (perct < $scope.ThresholdValue) {
                        className = 'rangeBG';
                    }
                    else {
                        className = 'less-thanBG';
                    }
                }
                else {
                    className = 'undefinedBG';
                }
            }
            else {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) >= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) < 0) {
                    perct = (Math.abs(parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark)) / parseFloat(ubprObject.benchmark)) * 100;

                    if (perct < $scope.ThresholdValue) {
                        className = 'rangeBG';
                    }
                    else {
                        className = 'less-thanBG';
                    }
                }
                else {
                    className = 'undefinedBG';
                }
            }
        }
        else {
            if ($scope.ubprConceptCodesForNotHasTheThreshHoldValues.indexOf(ubprObject.ubprConceptCode) > -1) {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) <= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) > 0) {
                    className = 'less-thanBG';
                }
                else {
                    className = 'undefinedBG';
                }
            }
            else {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) >= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) < 0) {
                    className = 'less-thanBG';
                }
                else {
                    className = 'undefinedBG';
                }
            }
        }

        return className;
    }

    $scope.BindRankTableHeader = function (header) {
        if (header.label == 'Institution Name' || header.label == '#')
            return { 'text-align': 'left' };
        else
            return { 'text-align': 'right' };
    }

    $scope.BindAverageTableHeader = function (header) {
        if (header.label == 'Peer Group Averages' || header.label == '#')
            return { 'text-align': 'left' };
        else
            return { 'text-align': 'right' };
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null)
            return 'N/A';
        else
            return $filter('number')(numericValue, fractionSize);
    }

    $scope.GoToBankProfile = function ($event, rankDataObj) {
        $rootScope.ShowBankProfileForInstitutionKey = rankDataObj.institutionKey;
        $rootScope.template = 'ProfileOverview';
    }

    $scope.ToggleAccordion = function (divId) {
        if (angular.element(document.querySelector('#' + divId)).hasClass('in'))
            angular.element(document.querySelector('#' + divId)).removeClass("in");
        else
            angular.element(document.querySelector('#' + divId)).addClass("in");
    }

    $scope.ToggleHideShow = function (divId, tblHead) {
        $('#' + divId).toggle();
        if (angular.element(document.querySelector('#' + tblHead)).hasClass("right")) {
            angular.element(document.querySelector('#' + tblHead)).removeClass("right");
            angular.element(document.querySelector('#' + tblHead)).addClass("bottom");
        }
        else {
            angular.element(document.querySelector('#' + tblHead)).addClass("right");
            angular.element(document.querySelector('#' + tblHead)).removeClass("bottom");
        }
    }

    $scope.$on('OnPeerGroupChange', function (event, opt) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#creditRiskDataLoader')).removeClass('hidden');
        $scope.CrSummaryRatios = [];
        $scope.CrYieldAndCosts = [];
        $scope.CrOffBalanceSheetItems = [];
        $scope.CrCreditAllowance = [];
        $scope.CrLoanMix = [];
        $scope.CrConcentrationOfCredit = [];
        $scope.CrCommercialRealEstate = [];
        $scope.CrPastDueAndNonAccrual = [];
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        $scope.SelectedUBPRColId = '';
        $rootScope.ShowRiskProfileForPeerGroupKey = opt.peergroup.key;
        $rootScope.ShowRiskProfileForPeerGroupName = opt.peergroup.name;
        $scope.Peer1 = opt.peergroup.name;
        $scope.Peer1Key = opt.peergroup.key;
        clearChart();
        getBenchmarkCreditRiskData(opt.peergroup.key);
    });

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
                if (result.data !== null && result.data.length > 0) {

                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).removeAttr('disabled');
                    $scope.AllCustomPeerGroups = result.data;
                    if ($rootScope.ShowRiskProfileForPeerGroupKey > 0) {
                        $scope.Peer1 = $rootScope.ShowRiskProfileForPeerGroupName;
                        $scope.Peer1Key = $rootScope.ShowRiskProfileForPeerGroupKey;
                    }
                    else {
                        var defaultPeerGroup = $scope.AllCustomPeerGroups.filter(function (obj) {
                            return obj.isDefault === true;
                        })[0];

                        if (defaultPeerGroup != null) {
                            $scope.Peer1 = defaultPeerGroup.name;
                            $scope.Peer1Key = defaultPeerGroup.key;
                            $rootScope.ShowRiskProfileForPeerGroupName = defaultPeerGroup.name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = defaultPeerGroup.key;
                        }
                        else {
                            $scope.Peer1 = $scope.AllCustomPeerGroups[0].name;
                            $scope.Peer1Key = $scope.AllCustomPeerGroups[0].key;
                            $rootScope.ShowRiskProfileForPeerGroupName = $scope.AllCustomPeerGroups[0].name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = $scope.AllCustomPeerGroups[0].key;
                        }
                    }

                    getBenchmarkCreditRiskData($scope.Peer1Key);
                }
                else {
                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).attr('disabled', '');
                    $scope.toggleSuccessMessageBoxModal('There are no custom peer groups. Please create custom peer groups by going to "Manage Profiles" screen.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getYearToDateHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskProfilesApi/GetYtdHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {

            $scope.YtdRankTableHeaders = result.data.ytdRankTableHeaders;
            $scope.YtdAverageTableHeaders = result.data.ytdAverageTableHeaders;
            if ($scope.ActiveChartTab == 'YTD') {
                $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
                $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for YTD table. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getQuarterToDateHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskProfilesApi/GetQtrHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {

            $scope.QtrRankTableHeaders = result.data.qtrRankTableHeaders;
            $scope.QtrAverageTableHeaders = result.data.qtrAverageTableHeaders;
            if ($scope.ActiveChartTab == 'QTD') {
                $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
                $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for QTD table. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var clearChart = function () {
        angular.element(document.querySelector('#chart-container')).addClass('hidden');
        angular.element(document.querySelector('#chart-loader')).removeClass('hidden');
    }

    $scope.$on('OnQtdYtdToggle', function (event, opt) {
        if (opt.state === true) {
            $scope.ActiveChartTab = 'YTD';
            angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
            angular.element(document.querySelector('#yearlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataYtd;
            $scope.RankingData = $scope.RankingDataYtd;
            $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
            $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;

            $scope.CrSummaryRatios = [];
            $scope.CrSummaryRatios = $scope.CrSummaryRatiosYtd;
            $scope.CrYieldAndCosts = $scope.CrYieldAndCostsYtd;
            $scope.CrOffBalanceSheetItems = $scope.CrOffBalanceSheetItemsYtd;
            $scope.CrCreditAllowance = $scope.CrCreditAllowanceYtd;
            $scope.CrLoanMix = $scope.CrLoanMixYtd;
            $scope.CrConcentrationOfCredit = $scope.CrConcentrationOfCreditYtd;
            $scope.CrCommercialRealEstate = $scope.CrCommercialRealEstateYtd;
            $scope.CrPastDueAndNonAccrual = $scope.CrPastDueAndNonAccrualYtd;

            clearChart();
            if (angular.element(document.querySelector('#creditRiskPeer1Toggle')).prop('checked') === false) {
                var obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                if (typeof obj !== 'undefined')
                    obj.visible = "0";
            }
            else {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                if (typeof obj !== 'undefined')
                    obj.visible = "1";
            }

            if (angular.element(document.querySelector('#creditRiskPeer2Toggle')).prop('checked') === false) {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                if (typeof obj !== 'undefined')
                    obj.visible = "0";
            }
            else {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                if (typeof obj !== 'undefined')
                    obj.visible = "1";
            }

            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
            angular.element(document.querySelector('#chart-container')).removeClass('hidden');
            angular.element(document.querySelector('#chart-loader')).addClass('hidden');

            $timeout(function () {
                angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).addClass('active');
            }, 0);
        }
        else {
            $scope.ActiveChartTab = 'QTD';
            angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
            angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataQtr;
            $scope.RankingData = $scope.RankingDataQtr;
            $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
            $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;

            $scope.CrSummaryRatios = $scope.CrSummaryRatiosQtd;
            $scope.CrYieldAndCosts = $scope.CrYieldAndCostsQtd;
            $scope.CrOffBalanceSheetItems = $scope.CrOffBalanceSheetItemsQtd;
            $scope.CrCreditAllowance = $scope.CrCreditAllowanceQtd;
            $scope.CrLoanMix = $scope.CrLoanMixQtd;
            $scope.CrConcentrationOfCredit = $scope.CrConcentrationOfCreditQtd;
            $scope.CrCommercialRealEstate = $scope.CrCommercialRealEstateQtd;
            $scope.CrPastDueAndNonAccrual = $scope.CrPastDueAndNonAccrualQtd;

            clearChart();
            if (angular.element(document.querySelector('#creditRiskPeer1Toggle')).prop('checked') === false) {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                if (typeof obj !== 'undefined')
                    obj.visible = "0";
            }
            else {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                if (typeof obj !== 'undefined')
                    obj.visible = "1";
            }

            if (angular.element(document.querySelector('#creditRiskPeer2Toggle')).prop('checked') === false) {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                if (typeof obj !== 'undefined')
                    obj.visible = "0";
            }
            else {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                if (typeof obj !== 'undefined')
                    obj.visible = "1";
            }

            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
            angular.element(document.querySelector('#chart-container')).removeClass('hidden');
            angular.element(document.querySelector('#chart-loader')).addClass('hidden');

            $timeout(function () {
                angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).addClass('active');
            }, 0);
        }
    });

    var getCustomPeerGroupRankingData = function (rowData, RptName, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var rankingParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            CustPeerGroupName: $scope.Peer1,
            InstitutionKey: $scope.InstitutionKey,
            CustPeerGroupKey: custPeerGroupKey,
            Login: '',
            StandardPeerGroupName: selectedInstitution.stdPeerGroupCode,
            RptName: RptName,
            SortOrder: rowData.sortOrder
        };

        var req = {
            method: 'POST',
            url: '/api/RiskProfilesApi/GetRiskProfileRankingData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: rankingParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    $scope.RankingDataQtr = result.data.peerGroupRankDataQtr;
                    $scope.AverageDataQtr = result.data.peerGroupAverageDataQtr;
                    $scope.RankingDataYtd = result.data.peerGroupRankDataYtd;
                    $scope.AverageDataYtd = result.data.peerGroupAverageDataYtd;
                    for (i = 0; i < $scope.RankingDataQtr.length; i++) {
                        var rank = i + 1;
                        $scope.RankingDataQtr[i].rank = rank;
                    }

                    for (i = 0; i < $scope.RankingDataYtd.length; i++) {
                        rank = i + 1;
                        $scope.RankingDataYtd[i].rank = rank;
                    }

                    if ($scope.ActiveChartTab == 'QTD') {
                        $scope.AverageData = $scope.AverageDataQtr;
                        $scope.RankingData = $scope.RankingDataQtr;
                    }
                    else {
                        $scope.AverageData = $scope.AverageDataYtd;
                        $scope.RankingData = $scope.RankingDataYtd;
                    }

                    angular.element(document.querySelector('#averageTableSpinner')).html('');
                    angular.element(document.querySelector('#rankTableSpinner')).html('');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get ranking data and peer group averages. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getBenchmarkCreditRiskData = function (custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var riskProfileParams = {
            InstitutionKey: $scope.InstitutionKey,
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey,
            CustPeerGroupKey: custPeerGroupKey //Will get default custom peer group for logged in user on server
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetBenchmarkCreditRiskData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: riskProfileParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.CrSummaryRatiosQtd = result.data.riskProfileSections.summaryRatiosQtd;
                    $scope.CrYieldAndCostsQtd = result.data.riskProfileSections.yieldAndCostQtd;
                    $scope.CrOffBalanceSheetItemsQtd = result.data.riskProfileSections.crOffBalanceSheetQtd;
                    $scope.CrCreditAllowanceQtd = result.data.riskProfileSections.creditAllowanceQtd;
                    $scope.CrLoanMixQtd = result.data.riskProfileSections.loanMixQtd;
                    $scope.CrConcentrationOfCreditQtd = result.data.riskProfileSections.crConcentrationOfCreditQtd;
                    $scope.CrCommercialRealEstateQtd = result.data.riskProfileSections.commercialRealEstateQtd;
                    $scope.CrPastDueAndNonAccrualQtd = result.data.riskProfileSections.pastDueQtd;

                    $scope.CrSummaryRatiosYtd = result.data.riskProfileSections.summaryRatiosYtd;
                    $scope.CrYieldAndCostsYtd = result.data.riskProfileSections.yieldAndCostYtd;
                    $scope.CrOffBalanceSheetItemsYtd = result.data.riskProfileSections.crOffBalanceSheetYtd;
                    $scope.CrCreditAllowanceYtd = result.data.riskProfileSections.creditAllowanceYtd;
                    $scope.CrLoanMixYtd = result.data.riskProfileSections.loanMixYtd;
                    $scope.CrConcentrationOfCreditYtd = result.data.riskProfileSections.crConcentrationOfCreditYtd;
                    $scope.CrCommercialRealEstateYtd = result.data.riskProfileSections.commercialRealEstateYtd;
                    $scope.CrPastDueAndNonAccrualYtd = result.data.riskProfileSections.pastDueYtd;

                    if ($scope.ActiveChartTab == 'QTD') {
                        $scope.CrSummaryRatios = $scope.CrSummaryRatiosQtd;
                        $scope.CrYieldAndCosts = $scope.CrYieldAndCostsQtd;
                        $scope.CrOffBalanceSheetItems = $scope.CrOffBalanceSheetItemsQtd;
                        $scope.CrCreditAllowance = $scope.CrCreditAllowanceQtd;
                        $scope.CrLoanMix = $scope.CrLoanMixQtd;
                        $scope.CrConcentrationOfCredit = $scope.CrConcentrationOfCreditQtd;
                        $scope.CrCommercialRealEstate = $scope.CrCommercialRealEstateQtd;
                        $scope.CrPastDueAndNonAccrual = $scope.CrPastDueAndNonAccrualQtd;
                    }
                    else {
                        $scope.CrSummaryRatios = $scope.CrSummaryRatiosYtd;
                        $scope.CrYieldAndCosts = $scope.CrYieldAndCostsYtd;
                        $scope.CrOffBalanceSheetItems = $scope.CrOffBalanceSheetItemsYtd;
                        $scope.CrCreditAllowance = $scope.CrCreditAllowanceYtd;
                        $scope.CrLoanMix = $scope.CrLoanMixYtd;
                        $scope.CrConcentrationOfCredit = $scope.CrConcentrationOfCreditYtd;
                        $scope.CrCommercialRealEstate = $scope.CrCommercialRealEstateYtd;
                        $scope.CrPastDueAndNonAccrual = $scope.CrPastDueAndNonAccrualYtd;
                    }

                    if ($scope.CrSummaryRatios.length > 0) {
                        getCreditRiskChartData($scope.CrSummaryRatios[0], 'CreditRisk', custPeerGroupKey);
                        getCustomPeerGroupRankingData($scope.CrSummaryRatios[0], 'CreditRisk', custPeerGroupKey);
                        $scope.SelectedUBPRDesc = $scope.CrSummaryRatios[0].ubprConceptDesc;
                        $scope.SelectedUBPRColId = $scope.CrSummaryRatios[0].ubprConceptCode;
                    }

                    angular.element(document.querySelector('#creditRiskDataLoader')).addClass('hidden');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for credit risk. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.UpdateBenchmark = function ($event, ubprObject) {
        if (ubprObject.benchmark !== null) {
            document.getElementById('overlay').style.display = '';
            var updateBenchMarkParameters = {
                InstitutionKey: $scope.InstitutionKey,
                UBPRConceptCode: ubprObject.ubprConceptCode,
                ReportingPeriodType: '',
                BenchMarkvalue: ubprObject.benchmark
            };

            if ($scope.ActiveChartTab === 'QTD') {
                updateBenchMarkParameters.ReportingPeriodType = 'Quarterly';
            }
            else {
                updateBenchMarkParameters.ReportingPeriodType = 'Yearly';
            }

            var req = {
                method: 'POST',
                url: '/api/BenchmarkApi/UpdateBenchmark',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: updateBenchMarkParameters
            };

            $http(req).then(
                function (result) {

                    document.getElementById('overlay').style.display = 'none';
                    updateCorrespondingQtdYtdObject(ubprObject.benchmark, ubprObject.ubprConceptCode);
                    clearChart();
                    getCreditRiskChartData(ubprObject, 'CreditRisk', $scope.Peer1Key);
                    if (result.data === false) {
                        $scope.toggleErrorMessageBoxModal('An error occurred while trying to update benchmark. Please send an e-mail to admin@cb-resource.com.');
                    }
                },
                function (result) {
                    $scope.toggleErrorMessageBoxModal('An error occurred while trying to update benchmark. Please send an e-mail to admin@cb-resource.com.');
                    document.getElementById('overlay').style.display = 'none';
                });
        }
    }

    $scope.refreshChartAndRankingData = function ($event, rowData, chartType) {
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        clearChart();
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
        $scope.SelectedUBPRDesc = rowData.ubprConceptDesc;
        getCreditRiskChartData(rowData, chartType, $scope.Peer1Key);
        getCustomPeerGroupRankingData(rowData, chartType, $scope.Peer1Key);
        if ($scope.SelectedUBPRColId != '')
            angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).removeClass('active');
        angular.element(document.querySelector('#' + rowData.ubprConceptCode)).addClass('active');
        $scope.SelectedUBPRColId = rowData.ubprConceptCode;
    }

    var getCreditRiskChartData = function (rowData, chartType, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var creditRiskChartParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            InstitutionKey: $scope.InstitutionKey,
            CustPeerGroupName: $scope.Peer1,
            CustPeerGroupKey: custPeerGroupKey,
            StdPeerGroupName: selectedInstitution.stdPeerGroupCode,
            Login: '',
            RptName: chartType
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetBenchmarkChartData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: creditRiskChartParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    angular.element(document.querySelector('#chart-container')).removeClass('hidden');
                    angular.element(document.querySelector('#chart-loader')).addClass('hidden');
                    //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
                    $scope.QuarterlyChartData = result.data.quarterlyChartData;
                    $scope.YearlyChartData = result.data.yearlyChartData;

                    if ($scope.ActiveChartTab == 'QTD') {
                        angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
                        if (angular.element(document.querySelector('#creditRiskPeer1Toggle')).prop('checked') === false) {
                            var obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                            obj.visible = "0";
                        }

                        if (angular.element(document.querySelector('#creditRiskPeer2Toggle')).prop('checked') === false) {
                            obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                            obj.visible = "0";
                        }

                        renderChart($scope.QuarterlyChartData, rowData.ubprConceptDesc);
                    }
                    else {
                        angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#yearlyChartData')).addClass('active');

                        if (angular.element(document.querySelector('#creditRiskPeer1Toggle')).prop('checked') === false) {
                            obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                            obj.visible = "0";
                        }

                        if (angular.element(document.querySelector('#creditRiskPeer2Toggle')).prop('checked') === false) {
                            obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                            obj.visible = "0";
                        }

                        renderChart($scope.YearlyChartData, rowData.ubprConceptDesc);
                    }

                    angular.element(document.querySelector('#' + rowData.ubprConceptCode)).addClass('active');
                    $scope.SelectedUBPRColId = rowData.ubprConceptCode;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for chart. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var renderChart = function (chartData, ubprConceptDesc) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": ubprConceptDesc,
                    "showPlotBorder": "0",
                    "plotBorderAlpha": "0",
                    "subCaption": "",
                    "xAxisname": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "showBorder": "0",
                    "showValues": "0",
                    "paletteColors": "#003057,#008C48,#A71D23,#FFC207",
                    "bgColor": "#ffffff",
                    "showCanvasBorder": "0",
                    "canvasBgColor": "#ffffff",
                    "captionFontSize": "14",
                    "subcaptionFontSize": "14",
                    "subcaptionFontBold": "0",
                    "divlineColor": "#999999",
                    "divLineDashed": "1",
                    "divLineDashLen": "1",
                    "divLineGapLen": "1",
                    "showAlternateHGridColor": "1",
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
                    "exportEnabled": "1"
                },
                "categories": [
                    {
                        "category": chartData.categories.category.categoryLabels
                    }
                ],
                "dataset": chartData.dataSetList
            };

            var chartContainer = $('#chart-container');
            if (chartContainer != null) {
                var revenueChart = FusionCharts.items.benchmarkChart;
                if (typeof revenueChart === 'undefined') {
                    revenueChart = new FusionCharts({
                        type: 'mscombi2d',
                        id: 'benchmarkChart',
                        renderAt: 'chart-container',
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });
                    revenueChart.render();
                }
                else {
                    revenueChart.setChartData(dSource, 'json');
                    revenueChart.render();
                }
            } // if block ends here
        });
    }

    var setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        var domain = "domain=" + window.location.hostname + ";";
        document.cookie = cname + "=" + cvalue + "; " + expires + "; " + domain;
    }

    $scope.ExportToExcelbenchmarking = function () {
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        if (isIE === true) {
            setCookie('fileDownload', true, 1);
        }
        $scope.exportDataBtn = true;
        document.getElementById('overlay').style.display = '';
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var riskProfileParams = {
            Institutionkey: $scope.InstitutionKey, //Will get user's tenant's institution on server
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey, //Need to be selected from a dropdown
            CustPeerGroupKey: $scope.Peer1Key, //Will get default custom peer group for logged in user on server
            Bank: $scope.Bank,
            ThresholdValue: $scope.ThresholdValue,
            Peer1: $scope.Peer1,
            Peer2: $scope.Peer2,
            PeerGroups: $scope.AllCustomPeerGroups
        };
        var req = {
            httpMethod: 'POST',
            successCallback: function (url) {
                if (url === '/Account/Login') {
                    window.location.href = url;
                }

                document.getElementById('overlay').style.display = 'none';
                $scope.$apply(function () {
                    $scope.exportDataBtn = false;
                });
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
                $scope.$apply(function () {
                    $scope.exportDataBtn = false;
                });
            },
            data: riskProfileParams,
            cookiePath: '/',
            cookieDomain: window.location.hostname,
            checkInterval: 500
        };

        $.fileDownload('/Api/BenchmarkApi/GetBenchmarkingExporttoExcel', req);
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

    var initialize = function () {
        getYearToDateHeaders();
        getQuarterToDateHeaders();
        getInstitutionList();
        $('#qtdYtdToggle').bootstrapToggle('off');
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("benchmarkingInterestRateRiskViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.IrrYieldAndCosts = [];
    $scope.IrrOffBalanceSheetItems = [];
    $scope.IrrInterestRateRiskItems = [];

    $scope.IrrYieldAndCostsQtd = [];
    $scope.IrrOffBalanceSheetItemsQtd = [];
    $scope.IrrInterestRateRiskItemsQtd = [];

    $scope.IrrYieldAndCostsYtd = [];
    $scope.IrrOffBalanceSheetItemsYtd = [];
    $scope.IrrInterestRateRiskItemsYtd = [];

    $scope.AllCustomPeerGroups = [];
    $scope.Bank = '';
    $scope.Peer1 = '';
    $scope.Peer2 = '';
    $scope.Peer1Key = '';
    $scope.InstitutionKey = '';
    $scope.RankingDataQtr = [];
    $scope.AverageDataQtr = [];
    $scope.RankingDataYtd = [];
    $scope.AverageDataYtd = [];
    $scope.RankingData = [];
    $scope.AverageData = [];
    $scope.ActiveChartTab = 'YTD';
    $scope.QuarterlyChartData = {};
    $scope.YearlyChartData = {};
    $scope.SelectedUBPRDesc = '';
    $scope.SelectedUBPRColId = '';
    $scope.YtdRankTableHeaders = [];
    $scope.YtdAverageTableHeaders = [];
    $scope.QtrRankTableHeaders = [];
    $scope.QtrAverageTableHeaders = [];
    $scope.RankTableHeaders = [];
    $scope.AverageTableHeaders = [];
    $scope.SelectedUBPRColId = '';
    $scope.ThresholdValue = '';
    $scope.Institutions = [];

    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.exportDataBtn = false;
    $scope.ubprConceptCodesForHasThresholdValues = ['UBPRE106', 'UBPRE108', 'UBPRE109', 'UBPRE110', 'UBPRE112', 'UBPRE113', 'UBPRE114',
        'UBPRE115', 'UBPRE349', 'UBPRE350', 'UBPRK444', 'UBPRE017', 'UBPRHR56', 'UBPRHR55'
        , 'UBPRE107', 'UBPRPG67', 'UBPRHN99', 'UBPRK440', 'UBPRK441'
    ];
    $scope.ubprConceptCodesForNotHasTheThreshHoldValues = ['UBPRE106', 'UBPRE108', 'UBPRE109', 'UBPRE110', 'UBPRE112', 'UBPRE113',
        'UBPRE114', 'UBPRE115', 'UBPRE349', 'UBPRE350', 'UBPRK444', 'UBPRE017', 'UBPRHR56', 'UBPRHR55'
        , 'UBPRE107', 'UBPRPG67', 'UBPRHN99', 'UBPRK440', 'UBPRK441'
    ];
    $scope.HighlightDefaultBank = function (rankData) {
        var highlighter = '';
        if (rankData.isDefault === true)
            highlighter = 'highlightDefaultBank';

        return highlighter;
    }

    $scope.HideUnhideBenchmarkInputBox = function (dataObj) {
        if (dataObj === -7.922816251426434e+28)
            return 'hidebenchmarkinput';
        else
            return '';
    }

    var updateCorrespondingQtdYtdObject = function (value, ubprConceptCode) {
        if ($scope.ActiveChartTab === 'QTD') {
            var objectToUpdate = $scope.IrrYieldAndCostsYtd.filter(function (obj) {
                return obj.ubprConceptCode === ubprConceptCode;
            })[0];

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.IrrOffBalanceSheetItemsYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.IrrInterestRateRiskItemsYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            objectToUpdate.benchmark = value;
        }
        else {
            objectToUpdate = $scope.IrrYieldAndCostsQtd.filter(function (obj) {
                return obj.ubprConceptCode === ubprConceptCode;
            })[0];

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.IrrOffBalanceSheetItemsQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.IrrInterestRateRiskItemsQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            objectToUpdate.benchmark = value;
        }
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
                if (result.data !== null && result.data.length > 0) {

                    $scope.Institutions = result.data;
                    var defaultInstitution = $scope.Institutions.filter(function (obj) {
                        return obj.isDefault === true;
                    })[0];

                    if ($rootScope.ShowRiskProfileForInstitutionKey > 0) {
                        $scope.Bank = $rootScope.ShowRiskProfileForInstitutionName;
                        $scope.InstitutionKey = $rootScope.ShowRiskProfileForInstitutionKey;
                        var selectedInstitution = $scope.Institutions.filter(function (obj) {
                            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
                        })[0];

                        if (selectedInstitution.stdPeerGroupCode !== null && selectedInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + selectedInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }
                    else {
                        $scope.Bank = defaultInstitution.institutionName;
                        $scope.InstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionName = defaultInstitution.institutionName;

                        if (defaultInstitution.stdPeerGroupCode !== null && defaultInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + defaultInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }

                    getThresholdValueForInstitution();
                    getAllPeerGroupsForUser();
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                    angular.element(document.querySelector('#interestRateRiskChangePeerGroup')).attr('disabled', '');
                    angular.element(document.querySelector('#interestRateRiskChangeBank')).attr('disabled', '');
                    angular.element(document.querySelector('#interestRateRiskDataLoader')).addClass('hidden');
                    angular.element(document.querySelector('#chart-loader')).html('<span>No data available to render chart.</span>');
                    angular.element(document.querySelector('#averageTableSpinner')).html('<span>No data available to render comparison table.</span>');
                    angular.element(document.querySelector('#rankTableSpinner')).html('<span>No data available to render ranking table.</span>');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.');
            });
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

    $scope.ToggleHideShow = function (divId, tblHead) {
        $('#' + divId).toggle();
        if (angular.element(document.querySelector('#' + tblHead)).hasClass("right")) {
            angular.element(document.querySelector('#' + tblHead)).removeClass("right");
            angular.element(document.querySelector('#' + tblHead)).addClass("bottom");
        }
        else {
            angular.element(document.querySelector('#' + tblHead)).addClass("right");
            angular.element(document.querySelector('#' + tblHead)).removeClass("bottom");
        }
    }

    $scope.Ok = function ($event, boxType) {
        if (boxType === 'Success') {
            $scope.toggleSuccessMessageBoxModal('');
        }
        else {
            $scope.toggleErrorMessageBoxModal('');
        }
    }

    var getThresholdValueForInstitution = function () {
        var thresHoldParameter = {
            InstitutionKey: $scope.InstitutionKey,
            ThresholdValue: 0
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetThresHoldForInstitute',
            headers: {
                'Content-Type': 'application/json'
            },
            data: thresHoldParameter
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    $scope.ThresholdValue = result.data;
                }
                else {
                    $scope.ThresholdValue = '';
                }
            },
            function (result) {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get threshold value. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.UpdateThresholdValueForInstitution = function ($event) {
        document.getElementById('overlay').style.display = '';

        var thresHoldParameter = {
            InstitutionKey: $scope.InstitutionKey,
            ThresholdValue: $scope.ThresholdValue
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/UpdateThresHoldForInstitute',
            headers: {
                'Content-Type': 'application/json'
            },
            data: thresHoldParameter
        };

        $http(req).then(
            function (result) {
                if (result.data !== null && result.data === true) {

                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleSuccessMessageBoxModal('Successfully updated the threshold value.');
                }
                else {
                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleSuccessMessageBoxModal('Could not update the threshold value. Please send an e-mail to admin@cb-resource.com.');
                }
            },
            function (result) {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to update threshold value. Please send an e-mail to admin@cb-resource.com.');
                document.getElementById('overlay').style.display = 'none';
            });
    }

    $scope.TogglePeer1Column = function ($event) {
        if (angular.element(document.querySelector('#irrPeer1Toggle')).prop('checked') === true) {
            angular.element(document.querySelector('#yields-costs')).addClass('off3');
            angular.element(document.querySelector('#balance-sheet')).addClass('off3');
            angular.element(document.querySelector('#interest-rate-risk')).addClass('off3');
            var chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
            obj.visible = "0";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
        else {
            angular.element(document.querySelector('#yields-costs')).removeClass('off3');
            angular.element(document.querySelector('#balance-sheet')).removeClass('off3');
            angular.element(document.querySelector('#interest-rate-risk')).removeClass('off3');
            chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
            obj.visible = "1";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
    }

    $scope.TogglePeer2Column = function ($event) {
        if (angular.element(document.querySelector('#irrPeer2Toggle')).prop('checked') === true) {
            angular.element(document.querySelector('#yields-costs')).addClass('off4');
            angular.element(document.querySelector('#balance-sheet')).addClass('off4');
            angular.element(document.querySelector('#interest-rate-risk')).addClass('off4');
            var chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
            obj.visible = "0";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
        else {
            angular.element(document.querySelector('#yields-costs')).removeClass('off4');
            angular.element(document.querySelector('#balance-sheet')).removeClass('off4');
            angular.element(document.querySelector('#interest-rate-risk')).removeClass('off4');
            chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
            obj.visible = "1";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
    }

    $scope.$on('OnInstitutionChange', function (event, opt) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#interestRateRiskDataLoader')).removeClass('hidden');

        $scope.IrrYieldAndCosts = [];
        $scope.IrrOffBalanceSheetItems = [];
        $scope.IrrInterestRateRiskItems = [];

        $scope.IrrYieldAndCostsQtd = [];
        $scope.IrrOffBalanceSheetItemsQtd = [];
        $scope.IrrInterestRateRiskItemsQtd = [];

        $scope.IrrYieldAndCostsYtd = [];
        $scope.IrrOffBalanceSheetItemsYtd = [];
        $scope.IrrInterestRateRiskItemsYtd = [];

        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        $scope.SelectedUBPRColId = '';
        $rootScope.ShowRiskProfileForInstitutionKey = opt.institution.institutionKey;
        $rootScope.ShowRiskProfileForInstitutionName = opt.institution.institutionName;
        $scope.Bank = opt.institution.institutionName;
        $scope.InstitutionKey = opt.institution.institutionKey;
        if (opt.institution.stdPeerGroupCode !== null && opt.institution.stdPeerGroupCode !== '')
            $scope.Peer2 = 'UBPR Group ' + opt.institution.stdPeerGroupCode;
        else
            $scope.Peer2 = 'N/A';
        clearChart();
        getThresholdValueForInstitution();
        getRiskProfileIrrData($scope.Peer1Key);
    });

    $scope.$on('OnPeerGroupChange', function (event, opt) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#interestRateRiskDataLoader')).removeClass('hidden');
        $scope.IrrYieldAndCosts = [];
        $scope.IrrOffBalanceSheetItems = [];
        $scope.IrrInterestRateRiskItems = [];
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        clearChart();
        $rootScope.ShowRiskProfileForPeerGroupKey = opt.peergroup.key;
        $rootScope.ShowRiskProfileForPeerGroupName = opt.peergroup.name;
        $scope.Peer1 = opt.peergroup.name;
        $scope.Peer1Key = opt.peergroup.key;
        getRiskProfileIrrData(opt.peergroup.key);
    });

    $scope.$on('OnPeer1StateToggle', function (event, opt) {
        if (opt.state === true) {
            angular.element(document.querySelector('#yields-costs')).addClass('off3');
            angular.element(document.querySelector('#balance-sheet')).addClass('off3');
            angular.element(document.querySelector('#interest-rate-risk')).addClass('off3');
            var chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
            obj.visible = "0";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
        else {
            angular.element(document.querySelector('#yields-costs')).removeClass('off3');
            angular.element(document.querySelector('#balance-sheet')).removeClass('off3');
            angular.element(document.querySelector('#interest-rate-risk')).removeClass('off3');
            chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
            obj.visible = "1";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
    });

    $scope.$on('OnPeer2StateToggle', function (event, opt) {
        if (opt.state === true) {
            angular.element(document.querySelector('#yields-costs')).addClass('off4');
            angular.element(document.querySelector('#balance-sheet')).addClass('off4');
            angular.element(document.querySelector('#interest-rate-risk')).addClass('off4');
            var chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
            obj.visible = "0";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
        else {
            angular.element(document.querySelector('#yields-costs')).removeClass('off4');
            angular.element(document.querySelector('#balance-sheet')).removeClass('off4');
            angular.element(document.querySelector('#interest-rate-risk')).removeClass('off4');
            chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
            obj.visible = "1";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
    });

    $scope.UpdateBenchmark = function ($event, ubprObject) {
        if (ubprObject.benchmark !== null) {
            document.getElementById('overlay').style.display = '';
            var updateBenchMarkParameters = {
                InstitutionKey: $scope.InstitutionKey,
                UBPRConceptCode: ubprObject.ubprConceptCode,
                ReportingPeriodType: '',
                BenchMarkvalue: ubprObject.benchmark
            };

            if ($scope.ActiveChartTab === 'QTD') {
                updateBenchMarkParameters.ReportingPeriodType = 'Quarterly';
            }
            else {
                updateBenchMarkParameters.ReportingPeriodType = 'Yearly';
            }

            var req = {
                method: 'POST',
                url: '/api/BenchmarkApi/UpdateBenchmark',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: updateBenchMarkParameters
            };

            $http(req).then(
                function (result) {

                    document.getElementById('overlay').style.display = 'none';
                    updateCorrespondingQtdYtdObject(ubprObject.benchmark, ubprObject.ubprConceptCode);
                    clearChart();
                    getCreditRiskChartData(ubprObject, 'IRR', $scope.Peer1Key);
                    if (result.data === false) {
                        $scope.toggleErrorMessageBoxModal('An error occurred while trying to update benchmark. Please send an e-mail to admin@cb-resource.com.');
                    }
                },
                function (result) {
                    $scope.toggleErrorMessageBoxModal('An error occurred while trying to update benchmark. Please send an e-mail to admin@cb-resource.com.');
                    document.getElementById('overlay').style.display = 'none';
                });
        }
    }

    $scope.BindTrafficLightBgcolor = function (ubprObject) {
        var lowUbprConceptCodes = '';

        var className = '';
        if ($scope.ThresholdValue !== '' && parseInt($scope.ThresholdValue) > 0) {
            if ($scope.ubprConceptCodesForHasThresholdValues.indexOf(ubprObject.ubprConceptCode) > -1) {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) <= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) > 0) {
                    var perct = (Math.abs(parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark)) / parseFloat(ubprObject.benchmark)) * 100;

                    if (perct < $scope.ThresholdValue) {
                        className = 'rangeBG';
                    }
                    else {
                        className = 'less-thanBG';
                    }
                }
                else {
                    className = 'undefinedBG';
                }
            }
            else {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) >= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) < 0) {
                    perct = (Math.abs(parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark)) / parseFloat(ubprObject.benchmark)) * 100;

                    if (perct < $scope.ThresholdValue) {
                        className = 'rangeBG';
                    }
                    else {
                        className = 'less-thanBG';
                    }
                }
                else {
                    className = 'undefinedBG';
                }
            }
        }
        else {
            if ($scope.ubprConceptCodesForNotHasTheThreshHoldValues.indexOf(ubprObject.ubprConceptCode) > -1) {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) <= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) > 0) {
                    className = 'less-thanBG';
                }
                else {
                    className = 'undefinedBG';
                }
            }
            else {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) >= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) < 0) {
                    className = 'less-thanBG';
                }
                else {
                    className = 'undefinedBG';
                }
            }
        }

        return className;
    }

    $scope.BindRankTableHeader = function (header) {
        if (header.label == 'Institution Name' || header.label == '#')
            return { 'text-align': 'left' };
        else
            return { 'text-align': 'right' };
    }

    $scope.BindAverageTableHeader = function (header) {
        if (header.label == 'Peer Group Averages' || header.label == '#')
            return { 'text-align': 'left' };
        else
            return { 'text-align': 'right' };
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null)
            return 'N/A';
        else
            return $filter('number')(numericValue, fractionSize);
    }

    $scope.GoToBankProfile = function ($event, rankDataObj) {
        $rootScope.ShowBankProfileForInstitutionKey = rankDataObj.institutionKey;
        $rootScope.template = 'ProfileOverview';
    }

    $scope.ToggleDataOnCustomPeerGroupChange = function ($event, peerGroupData) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#interestRateRiskDataLoader')).removeClass('hidden');
        $scope.IrrYieldAndCosts = [];
        $scope.IrrOffBalanceSheetItems = [];
        $scope.IrrInterestRateRiskItems = [];
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        clearChart();
        $rootScope.ShowRiskProfileForPeerGroupKey = peerGroupData.key;
        $rootScope.ShowRiskProfileForPeerGroupName = peerGroupData.name;
        $scope.Peer1 = peerGroupData.name;
        $scope.Peer1Key = peerGroupData.key;
        getRiskProfileIrrData(peerGroupData.key);
    }

    $scope.ToggleAccordion = function (divId) {
        if (angular.element(document.querySelector('#' + divId)).hasClass('in'))
            angular.element(document.querySelector('#' + divId)).removeClass("in");
        else
            angular.element(document.querySelector('#' + divId)).addClass("in");
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
                if (result.data !== null && result.data.length > 0) {

                    angular.element(document.querySelector('#interestRateRiskChangePeerGroup')).removeAttr('disabled');
                    $scope.AllCustomPeerGroups = result.data;
                    if ($rootScope.ShowRiskProfileForPeerGroupKey > 0) {
                        $scope.Peer1 = $rootScope.ShowRiskProfileForPeerGroupName;
                        $scope.Peer1Key = $rootScope.ShowRiskProfileForPeerGroupKey;
                    }
                    else {
                        var defaultPeerGroup = $scope.AllCustomPeerGroups.filter(function (obj) {
                            return obj.isDefault === true;
                        })[0];

                        if (defaultPeerGroup != null) {
                            $scope.Peer1 = defaultPeerGroup.name;
                            $scope.Peer1Key = defaultPeerGroup.key;
                            $rootScope.ShowRiskProfileForPeerGroupName = defaultPeerGroup.name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = defaultPeerGroup.key;
                        }
                        else {
                            $scope.Peer1 = $scope.AllCustomPeerGroups[0].name;
                            $scope.Peer1Key = $scope.AllCustomPeerGroups[0].key;
                            $rootScope.ShowRiskProfileForPeerGroupName = $scope.AllCustomPeerGroups[0].name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = $scope.AllCustomPeerGroups[0].key;
                        }
                    }

                    getRiskProfileIrrData($scope.Peer1Key);
                }
                else {
                    angular.element(document.querySelector('#interestRateRiskChangePeerGroup')).attr('disabled', '');
                    $scope.toggleSuccessMessageBoxModal('There are no custom peer groups. Please create custom peer groups by going to "Manage Profiles" screen.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getYearToDateHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskProfilesApi/GetYtdHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {

            $scope.YtdRankTableHeaders = result.data.ytdRankTableHeaders;
            $scope.YtdAverageTableHeaders = result.data.ytdAverageTableHeaders;
            if ($scope.ActiveChartTab == 'YTD') {
                $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
                $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for YTD table. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getQuarterToDateHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskProfilesApi/GetQtrHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {

            $scope.QtrRankTableHeaders = result.data.qtrRankTableHeaders;
            $scope.QtrAverageTableHeaders = result.data.qtrAverageTableHeaders;
            if ($scope.ActiveChartTab == 'QTD') {
                $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
                $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for QTD table. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var clearChart = function () {
        angular.element(document.querySelector('#chart-container')).addClass('hidden');
        angular.element(document.querySelector('#chart-loader')).removeClass('hidden');
    }

    $scope.$on('OnQtdYtdToggle', function (event, opt) {
        if (opt.state === true) {
            $scope.ActiveChartTab = 'YTD';
            angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
            angular.element(document.querySelector('#yearlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataYtd;
            $scope.RankingData = $scope.RankingDataYtd;
            $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
            $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;

            $scope.IrrYieldAndCosts = $scope.IrrYieldAndCostsYtd;
            $scope.IrrOffBalanceSheetItems = $scope.IrrOffBalanceSheetItemsYtd;
            $scope.IrrInterestRateRiskItems = $scope.IrrInterestRateRiskItemsYtd;

            clearChart();
            if (angular.element(document.querySelector('#irrPeer1Toggle')).prop('checked') === false) {
                var obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "1";
            }

            if (angular.element(document.querySelector('#irrPeer2Toggle')).prop('checked') === false) {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "1";
            }

            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
            angular.element(document.querySelector('#chart-container')).removeClass('hidden');
            angular.element(document.querySelector('#chart-loader')).addClass('hidden');

            $timeout(function () {
                angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).addClass('active');
            }, 0);
        }
        else {
            $scope.ActiveChartTab = 'QTD';
            angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
            angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataQtr;
            $scope.RankingData = $scope.RankingDataQtr;
            $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
            $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;

            $scope.IrrYieldAndCosts = $scope.IrrYieldAndCostsQtd;
            $scope.IrrOffBalanceSheetItems = $scope.IrrOffBalanceSheetItemsQtd;
            $scope.IrrInterestRateRiskItems = $scope.IrrInterestRateRiskItemsQtd;

            clearChart();
            if (angular.element(document.querySelector('#irrPeer1Toggle')).prop('checked') === false) {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "1";
            }

            if (angular.element(document.querySelector('#irrPeer2Toggle')).prop('checked') === false) {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "1";
            }

            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
            angular.element(document.querySelector('#chart-container')).removeClass('hidden');
            angular.element(document.querySelector('#chart-loader')).addClass('hidden');

            $timeout(function () {
                angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).addClass('active');
            }, 0);
        }
    });

    var getCustomPeerGroupRankingData = function (rowData, RptName, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var rankingParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            CustPeerGroupName: $scope.Peer1,
            InstitutionKey: $scope.InstitutionKey,
            CustPeerGroupKey: custPeerGroupKey,
            Login: '',
            StandardPeerGroupName: selectedInstitution.stdPeerGroupCode,
            RptName: RptName,
            SortOrder: rowData.sortOrder
        };

        var req = {
            method: 'POST',
            url: '/api/RiskProfilesApi/GetRiskProfileRankingData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: rankingParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    $scope.RankingDataQtr = result.data.peerGroupRankDataQtr;
                    $scope.AverageDataQtr = result.data.peerGroupAverageDataQtr;
                    $scope.RankingDataYtd = result.data.peerGroupRankDataYtd;
                    $scope.AverageDataYtd = result.data.peerGroupAverageDataYtd;
                    for (i = 0; i < $scope.RankingDataQtr.length; i++) {
                        var rank = i + 1;
                        $scope.RankingDataQtr[i].rank = rank;
                    }

                    for (i = 0; i < $scope.RankingDataYtd.length; i++) {
                        var rank = i + 1;
                        $scope.RankingDataYtd[i].rank = rank;
                    }

                    if ($scope.ActiveChartTab == 'QTD') {
                        $scope.AverageData = $scope.AverageDataQtr;
                        $scope.RankingData = $scope.RankingDataQtr;
                    }
                    else {
                        $scope.AverageData = $scope.AverageDataYtd;
                        $scope.RankingData = $scope.RankingDataYtd;
                    }

                    angular.element(document.querySelector('#averageTableSpinner')).html('');
                    angular.element(document.querySelector('#rankTableSpinner')).html('');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get ranking data and peer group averages. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.refreshChartAndRankingData = function ($event, rowData, chartType) {
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        clearChart();
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
        $scope.SelectedUBPRDesc = rowData.ubprConceptDesc;
        getCreditRiskChartData(rowData, chartType, $scope.Peer1Key);
        getCustomPeerGroupRankingData(rowData, chartType, $scope.Peer1Key);
        if ($scope.SelectedUBPRColId !== '')
            angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).removeClass('active');
        angular.element(document.querySelector('#' + rowData.ubprConceptCode)).addClass('active');
        $scope.SelectedUBPRColId = rowData.ubprConceptCode;
    }

    var getCreditRiskChartData = function (rowData, chartType, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var creditRiskChartParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            InstitutionKey: $scope.InstitutionKey,
            CustPeerGroupName: $scope.Peer1,
            CustPeerGroupKey: custPeerGroupKey,
            StdPeerGroupName: selectedInstitution.stdPeerGroupCode,
            Login: '',
            RptName: chartType
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetBenchmarkChartData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: creditRiskChartParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    angular.element(document.querySelector('#chart-container')).removeClass('hidden');
                    angular.element(document.querySelector('#chart-loader')).addClass('hidden');
                    //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
                    $scope.QuarterlyChartData = result.data.quarterlyChartData;
                    $scope.YearlyChartData = result.data.yearlyChartData;

                    if ($scope.ActiveChartTab == 'QTD') {
                        angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
                        if (angular.element(document.querySelector('#irrPeer1Toggle')).prop('checked') === false) {
                            var obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                            obj.visible = "0";
                        }

                        if (angular.element(document.querySelector('#irrPeer2Toggle')).prop('checked') === false) {
                            obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                            obj.visible = "0";
                        }
                        renderChart($scope.QuarterlyChartData, rowData.ubprConceptDesc);
                    }
                    else {
                        angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#yearlyChartData')).addClass('active');
                        if (angular.element(document.querySelector('#irrPeer1Toggle')).prop('checked') === false) {
                            obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                            obj.visible = "0";
                        }

                        if (angular.element(document.querySelector('#irrPeer2Toggle')).prop('checked') === false) {
                            obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                            obj.visible = "0";
                        }
                        renderChart($scope.YearlyChartData, rowData.ubprConceptDesc);
                    }
                    angular.element(document.querySelector('#' + rowData.ubprConceptCode)).addClass('active');
                    $scope.SelectedUBPRColId = rowData.ubprConceptCode;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for chart. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var renderChart = function (chartData, ubprConceptDesc) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": ubprConceptDesc,
                    "showPlotBorder": "0",
                    "plotBorderAlpha": "0",
                    "subCaption": "",
                    "xAxisname": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "showBorder": "0",
                    "showValues": "0",
                    "paletteColors": "#003057,#008C48,#A71D23,#FFC207",
                    "bgColor": "#ffffff",
                    "showCanvasBorder": "0",
                    "canvasBgColor": "#ffffff",
                    "captionFontSize": "14",
                    "subcaptionFontSize": "14",
                    "subcaptionFontBold": "0",
                    "divlineColor": "#999999",
                    "divLineDashed": "1",
                    "divLineDashLen": "1",
                    "divLineGapLen": "1",
                    "showAlternateHGridColor": "1",
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
                    "exportEnabled": "1"
                },
                "categories": [
                    {
                        "category": chartData.categories.category.categoryLabels
                    }
                ],
                "dataset": chartData.dataSetList
            };

            var chartContainer = $('#chart-container');
            if (chartContainer != null) {
                var revenueChart = FusionCharts.items.benchmarkChart;
                if (typeof revenueChart === 'undefined') {
                    revenueChart = new FusionCharts({
                        type: 'mscombi2d',
                        id: 'benchmarkChart',
                        renderAt: 'chart-container',
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });
                    revenueChart.render();
                }
                else {
                    revenueChart.setChartData(dSource, 'json');
                    revenueChart.render();
                }
            } // if block ends here
        });
    }

    var getRiskProfileIrrData = function (custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var riskProfileParams = {
            Institutionkey: $scope.InstitutionKey, //Will get user's tenant's institution on server
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey, //Need to be selected from a dropdown
            CustPeerGroupKey: custPeerGroupKey //Will get default custom peer group for logged in user on server
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetBenchmarkInterestRiskData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: riskProfileParams
        };

        $http(req).then(
            function (result) {
                $scope.IrrYieldAndCostsQtd = result.data.riskProfileSections.yieldAndCostQtd;
                $scope.IrrOffBalanceSheetItemsQtd = result.data.riskProfileSections.irRiskOffBalanceSheetQtd;
                $scope.IrrInterestRateRiskItemsQtd = result.data.riskProfileSections.interestRateRiskItemsQtd;

                $scope.IrrYieldAndCostsYtd = result.data.riskProfileSections.yieldAndCostYtd;
                $scope.IrrOffBalanceSheetItemsYtd = result.data.riskProfileSections.irRiskOffBalanceSheetYtd;
                $scope.IrrInterestRateRiskItemsYtd = result.data.riskProfileSections.interestRateRiskItemsYtd;

                if ($scope.ActiveChartTab == 'QTD') {
                    $scope.IrrYieldAndCosts = $scope.IrrYieldAndCostsQtd;
                    $scope.IrrOffBalanceSheetItems = $scope.IrrOffBalanceSheetItemsQtd;
                    $scope.IrrInterestRateRiskItems = $scope.IrrInterestRateRiskItemsQtd;
                }
                else {
                    $scope.IrrYieldAndCosts = $scope.IrrYieldAndCostsYtd;
                    $scope.IrrOffBalanceSheetItems = $scope.IrrOffBalanceSheetItemsYtd;
                    $scope.IrrInterestRateRiskItems = $scope.IrrInterestRateRiskItemsYtd;
                }

                if ($scope.IrrYieldAndCosts.length > 0) {
                    getCreditRiskChartData($scope.IrrYieldAndCosts[0], 'IRR', custPeerGroupKey);
                    getCustomPeerGroupRankingData($scope.IrrYieldAndCosts[0], 'IRR', custPeerGroupKey);
                    $scope.SelectedUBPRDesc = $scope.IrrYieldAndCosts[0].ubprConceptDesc;
                    $scope.SelectedUBPRColId = $scope.IrrYieldAndCosts[0].ubprConceptCode;
                }
                angular.element(document.querySelector('#interestRateRiskDataLoader')).addClass('hidden');
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for interest rate risk. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.ExportToExcelbenchmarking = function () {
        $scope.exportDataBtn = true;
        document.getElementById('overlay').style.display = '';
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var riskProfileParams = {
            Institutionkey: $scope.InstitutionKey, //Will get user's tenant's institution on server
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey, //Need to be selected from a dropdown
            CustPeerGroupKey: $scope.Peer1Key, //Will get default custom peer group for logged in user on server
            Bank: $scope.Bank,
            ThresholdValue: $scope.ThresholdValue,
            Peer1: $scope.Peer1,
            Peer2: $scope.Peer2,
            PeerGroups: $scope.AllCustomPeerGroups
        };
        var req = {
            httpMethod: 'POST',
            checkInterval: 500,
            successCallback: function (url) {
                if (url === '/Account/Login') {
                    window.location.href = url;
                }

                document.getElementById('overlay').style.display = 'none';
                $scope.$apply(function () {
                    $scope.exportDataBtn = false;
                });
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
                $scope.$apply(function () {
                    $scope.exportDataBtn = false;
                });
            },
            data: riskProfileParams
        };
        $.fileDownload('/Api/BenchmarkApi/GetBenchmarkingExporttoExcel', req);
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
    var initialize = function () {
        getYearToDateHeaders();
        getQuarterToDateHeaders();
        getInstitutionList();

        $('#qtdYtdToggle').bootstrapToggle('off');
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("benchmarkingLiquidityRiskViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.LiqLiquidityAndFunding = [];
    $scope.LiqLiquidityInvestmentPortfolio = [];
    $scope.LiqLiquiditySecurityRatios = [];
    $scope.LiqOffBalanceSheetItems = [];
    $scope.LiqConcentrationOfCredit = [];
    $scope.LiqCapitalAnalysis = [];
    $scope.newLiqCapitalAnalysis = [];

    $scope.LiqLiquidityAndFundingQtd = [];
    $scope.LiqLiquidityInvestmentPortfolioQtd = [];
    $scope.LiqLiquiditySecurityRatiosQtd = [];
    $scope.LiqOffBalanceSheetItemsQtd = [];
    $scope.LiqConcentrationOfCreditQtd = [];
    $scope.LiqCapitalAnalysisQtd = [];
    $scope.newLiqCapitalAnalysisQtd = [];

    $scope.LiqLiquidityAndFundingYtd = [];
    $scope.LiqLiquidityInvestmentPortfolioYtd = [];
    $scope.LiqLiquiditySecurityRatiosYtd = [];
    $scope.LiqOffBalanceSheetItemsYtd = [];
    $scope.LiqConcentrationOfCreditYtd = [];
    $scope.LiqCapitalAnalysisYtd = [];
    $scope.newLiqCapitalAnalysisYtd = [];

    $scope.AllCustomPeerGroups = [];
    $scope.Bank = '';
    $scope.Peer1 = '';
    $scope.Peer2 = '';
    $scope.Peer1Key = '';
    $scope.InstitutionKey = '';
    $scope.RankingDataQtr = [];
    $scope.AverageDataQtr = [];
    $scope.RankingDataYtd = [];
    $scope.AverageDataYtd = [];
    $scope.RankingData = [];
    $scope.AverageData = [];
    $scope.ActiveChartTab = 'YTD';
    $scope.QuarterlyChartData = {};
    $scope.YearlyChartData = {};
    $scope.SelectedUBPRDesc = '';
    $scope.SelectedUBPRColId = '';
    $scope.YtdRankTableHeaders = [];
    $scope.YtdAverageTableHeaders = [];
    $scope.QtrRankTableHeaders = [];
    $scope.QtrAverageTableHeaders = [];
    $scope.RankTableHeaders = [];
    $scope.AverageTableHeaders = [];
    $scope.SelectedUBPRColId = '';
    $scope.ThresholdValue = '';
    $scope.Institutions = [];

    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.exportDataBtn = false;
    $scope.ubprConceptCodesForHasThresholdValues = ['UBPR7410', 'UBPRK447', 'UBPRE600', 'UBPRE595', 'UBPRE624', 'UBPRE345', 'UBPRE353',
        'UBPRE357', 'UBPRE879', 'UBPRE592', 'UBPRE637'
        , 'CALC0529', 'CALC0532', 'CALC0121', 'UBPRE024', 'UBPRE601', 'UBPRE596', 'UBPRM014', 'UBPRM015', 'UBPRM016', 'UBPRM017'
        , 'UBPRE589', 'UBPRE590', 'UBPRE602', 'UBPRM026', 'UBPRM038', 'UBPRE621', 'UBPRM037'
    ];
    $scope.ubprConceptCodesForNotHasTheThreshHoldValues = ['UBPR7410', 'UBPRK447', 'UBPRE600', 'UBPRE595', 'UBPRE624', 'UBPRE345', 'UBPRE353',
        'UBPRE357', 'UBPRE879', 'UBPRE592', 'UBPRE637'
        , 'CALC0529', 'CALC0532', 'CALC0121', 'UBPRE024', 'UBPRE601', 'UBPRE596', 'UBPRM014', 'UBPRM015', 'UBPRM016', 'UBPRM017'
        , 'UBPRE589', 'UBPRE590', 'UBPRE602', 'UBPRM026', 'UBPRM038', 'UBPRE621', 'UBPRM037'
    ];

    $scope.HighlightDefaultBank = function (rankData) {
        var highlighter = '';
        if (rankData.isDefault === true)
            highlighter = 'highlightDefaultBank';

        return highlighter;
    }

    $scope.HideUnhideBenchmarkInputBox = function (dataObj) {
        if (dataObj === -7.922816251426434e+28)
            return 'hidebenchmarkinput';
        else
            return '';
    }

    var updateCorrespondingQtdYtdObject = function (value, ubprConceptCode) {
        if ($scope.ActiveChartTab === 'QTD') {
            var objectToUpdate = $scope.LiqLiquidityAndFundingYtd.filter(function (obj) {
                return obj.ubprConceptCode === ubprConceptCode;
            })[0];

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.LiqLiquidityInvestmentPortfolioYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.LiqLiquiditySecurityRatiosYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.LiqOffBalanceSheetItemsYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.LiqConcentrationOfCreditYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.LiqCapitalAnalysisYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.newLiqCapitalAnalysisYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            objectToUpdate.benchmark = value;
        }
        else {
            objectToUpdate = $scope.LiqLiquidityAndFundingQtd.filter(function (obj) {
                return obj.ubprConceptCode === ubprConceptCode;
            })[0];

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.LiqLiquidityInvestmentPortfolioQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.LiqLiquiditySecurityRatiosQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.LiqOffBalanceSheetItemsQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.LiqConcentrationOfCreditQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.LiqCapitalAnalysisQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.newLiqCapitalAnalysisQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            objectToUpdate.benchmark = value;
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
                if (result.data !== null && result.data.length > 0) {

                    $scope.Institutions = result.data;
                    var defaultInstitution = $scope.Institutions.filter(function (obj) {
                        return obj.isDefault === true;
                    })[0];

                    if ($rootScope.ShowRiskProfileForInstitutionKey > 0) {
                        $scope.Bank = $rootScope.ShowRiskProfileForInstitutionName;
                        $scope.InstitutionKey = $rootScope.ShowRiskProfileForInstitutionKey;
                        var selectedInstitution = $scope.Institutions.filter(function (obj) {
                            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
                        })[0];
                        if (selectedInstitution.stdPeerGroupCode !== null && selectedInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + selectedInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }
                    else {
                        $scope.Bank = defaultInstitution.institutionName;
                        $scope.InstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionName = defaultInstitution.institutionName;
                        if (defaultInstitution.stdPeerGroupCode !== null && defaultInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + defaultInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }

                    getThresholdValueForInstitution();
                    getAllPeerGroupsForUser();
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                    angular.element(document.querySelector('#liquidityRiskChangePeerGroup')).attr('disabled', '');
                    angular.element(document.querySelector('#liquidityRiskChangeBank')).attr('disabled', '');
                    angular.element(document.querySelector('#liquidityRiskDataLoader')).addClass('hidden');
                    angular.element(document.querySelector('#chart-loader')).html('<span>No data available to render chart.</span>');
                    angular.element(document.querySelector('#averageTableSpinner')).html('<span>No data available to render comparison table.</span>');
                    angular.element(document.querySelector('#rankTableSpinner')).html('<span>No data available to render ranking table.</span>');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.ToggleDataOnInstitutionChange = function ($event, institutionObj) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#interestRateRiskDataLoader')).removeClass('hidden');

        $scope.LiqLiquidityAndFunding = [];
        $scope.LiqLiquidityInvestmentPortfolio = [];
        $scope.LiqLiquiditySecurityRatios = [];
        $scope.LiqOffBalanceSheetItems = [];
        $scope.LiqConcentrationOfCredit = [];
        $scope.LiqCapitalAnalysis = [];
        $scope.newLiqCapitalAnalysis = [];

        $scope.LiqLiquidityAndFundingQtd = [];
        $scope.LiqLiquidityInvestmentPortfolioQtd = [];
        $scope.LiqLiquiditySecurityRatiosQtd = [];
        $scope.LiqOffBalanceSheetItemsQtd = [];
        $scope.LiqConcentrationOfCreditQtd = [];
        $scope.LiqCapitalAnalysisQtd = [];
        $scope.newLiqCapitalAnalysisQtd = [];

        $scope.LiqLiquidityAndFundingYtd = [];
        $scope.LiqLiquidityInvestmentPortfolioYtd = [];
        $scope.LiqLiquiditySecurityRatiosYtd = [];
        $scope.LiqOffBalanceSheetItemsYtd = [];
        $scope.LiqConcentrationOfCreditYtd = [];
        $scope.LiqCapitalAnalysisYtd = [];
        $scope.newLiqCapitalAnalysisYtd = [];

        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        $scope.SelectedUBPRColId = '';
        $rootScope.ShowRiskProfileForInstitutionKey = institutionObj.institutionKey;
        $rootScope.ShowRiskProfileForInstitutionName = institutionObj.institutionName;
        $scope.Bank = institutionObj.institutionName;
        $scope.InstitutionKey = institutionObj.institutionKey;
        if (institutionObj.stdPeerGroupCode !== null && institutionObj.stdPeerGroupCode !== '')
            $scope.Peer2 = 'UBPR Group ' + institutionObj.stdPeerGroupCode;
        else
            $scope.Peer2 = 'N/A';
        clearChart();
        getThresholdValueForInstitution();
        getRiskProfileLiquidityData($scope.Peer1Key);
    }

    var getThresholdValueForInstitution = function () {
        var thresHoldParameter = {
            InstitutionKey: $scope.InstitutionKey,
            ThresholdValue: 0
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetThresHoldForInstitute',
            headers: {
                'Content-Type': 'application/json'
            },
            data: thresHoldParameter
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    $scope.ThresholdValue = result.data;
                }
                else {
                    $scope.ThresholdValue = '';
                }
            },
            function (result) {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get threshold value. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.UpdateThresholdValueForInstitution = function ($event) {
        document.getElementById('overlay').style.display = '';

        var thresHoldParameter = {
            InstitutionKey: $scope.InstitutionKey,
            ThresholdValue: $scope.ThresholdValue
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/UpdateThresHoldForInstitute',
            headers: {
                'Content-Type': 'application/json'
            },
            data: thresHoldParameter
        };

        $http(req).then(
            function (result) {
                if (result.data !== null && result.data === true) {

                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleSuccessMessageBoxModal('Successfully updated the threshold value.');
                }
                else {
                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleSuccessMessageBoxModal('Could not update the threshold value. Please send an e-mail to admin@cb-resource.com.');
                }
            },
            function (result) {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to update threshold value. Please send an e-mail to admin@cb-resource.com.');
                document.getElementById('overlay').style.display = 'none';
            });
    }

    $scope.TogglePeer1Column = function ($event) {
        if (angular.element(document.querySelector('#liqPeer1Toggle')).prop('checked') === true) {
            angular.element(document.querySelector('#liquidity-funding')).addClass('off3');
            angular.element(document.querySelector('#balance-sheet')).addClass('off3');
            angular.element(document.querySelector('#concentrations-of-credit')).addClass('off3');
            angular.element(document.querySelector('#capital-analysis')).addClass('off3');
            var chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
            obj.visible = "0";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
        else {
            angular.element(document.querySelector('#liquidity-funding')).removeClass('off3');
            angular.element(document.querySelector('#balance-sheet')).removeClass('off3');
            angular.element(document.querySelector('#concentrations-of-credit')).removeClass('off3');
            angular.element(document.querySelector('#capital-analysis')).removeClass('off3');
            chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
            obj.visible = "1";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
    }

    $scope.TogglePeer2Column = function ($event) {
        if (angular.element(document.querySelector('#liqPeer2Toggle')).prop('checked') === true) {
            angular.element(document.querySelector('#liquidity-funding')).addClass('off4');
            angular.element(document.querySelector('#balance-sheet')).addClass('off4');
            angular.element(document.querySelector('#concentrations-of-credit')).addClass('off4');
            angular.element(document.querySelector('#capital-analysis')).addClass('off4');
            var chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
            obj.visible = "0";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
        else {
            angular.element(document.querySelector('#liquidity-funding')).removeClass('off4');
            angular.element(document.querySelector('#balance-sheet')).removeClass('off4');
            angular.element(document.querySelector('#concentrations-of-credit')).removeClass('off4');
            angular.element(document.querySelector('#capital-analysis')).removeClass('off4');
            chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
            obj.visible = "1";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
    }

    $scope.$on('OnInstitutionChange', function (event, opt) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#interestRateRiskDataLoader')).removeClass('hidden');

        $scope.LiqLiquidityAndFunding = [];
        $scope.LiqLiquidityInvestmentPortfolio = [];
        $scope.LiqLiquiditySecurityRatios = [];
        $scope.LiqOffBalanceSheetItems = [];
        $scope.LiqConcentrationOfCredit = [];
        $scope.LiqCapitalAnalysis = [];
        $scope.newLiqCapitalAnalysis = [];

        $scope.LiqLiquidityAndFundingQtd = [];
        $scope.LiqOffBalanceSheetItemsQtd = [];
        $scope.LiqConcentrationOfCreditQtd = [];
        $scope.LiqCapitalAnalysisQtd = [];
        $scope.newLiqCapitalAnalysisQtd = [];

        $scope.LiqLiquidityAndFundingYtd = [];
        $scope.LiqOffBalanceSheetItemsYtd = [];
        $scope.LiqConcentrationOfCreditYtd = [];
        $scope.LiqCapitalAnalysisYtd = [];
        $scope.newLiqCapitalAnalysisYtd = [];

        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        $scope.SelectedUBPRColId = '';
        $rootScope.ShowRiskProfileForInstitutionKey = opt.institution.institutionKey;
        $rootScope.ShowRiskProfileForInstitutionName = opt.institution.institutionName;
        $scope.Bank = opt.institution.institutionName;
        $scope.InstitutionKey = opt.institution.institutionKey;
        if (opt.institution.stdPeerGroupCode !== null && opt.institution.stdPeerGroupCode !== '')
            $scope.Peer2 = 'UBPR Group ' + opt.institution.stdPeerGroupCode;
        else
            $scope.Peer2 = 'N/A';
        clearChart();
        getThresholdValueForInstitution();
        getRiskProfileLiquidityData($scope.Peer1Key);
    });

    $scope.$on('OnPeerGroupChange', function (event, opt) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#liquidityRiskDataLoader')).removeClass('hidden');
        $scope.LiqLiquidityAndFunding = [];
        $scope.LiqLiquidityInvestmentPortfolio = [];
        $scope.LiqLiquiditySecurityRatios = [];
        $scope.LiqOffBalanceSheetItems = [];
        $scope.LiqConcentrationOfCredit = [];
        $scope.LiqCapitalAnalysis = [];
        $scope.newLiqCapitalAnalysis = [];
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        clearChart();
        $rootScope.ShowRiskProfileForPeerGroupKey = opt.peergroup.key;
        $rootScope.ShowRiskProfileForPeerGroupName = opt.peergroup.name;
        $scope.Peer1 = opt.peergroup.name;
        $scope.Peer1Key = opt.peergroup.key;
        getRiskProfileLiquidityData(opt.peergroup.key);
    });

    $scope.$on('OnPeer1StateToggle', function (event, opt) {
        if (opt.state === true) {
            angular.element(document.querySelector('#liquidity-funding')).addClass('off3');
            angular.element(document.querySelector('#balance-sheet')).addClass('off3');
            angular.element(document.querySelector('#concentrations-of-credit')).addClass('off3');
            angular.element(document.querySelector('#capital-analysis')).addClass('off3');
            var chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
            obj.visible = "0";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
        else {
            angular.element(document.querySelector('#liquidity-funding')).removeClass('off3');
            angular.element(document.querySelector('#balance-sheet')).removeClass('off3');
            angular.element(document.querySelector('#concentrations-of-credit')).removeClass('off3');
            angular.element(document.querySelector('#capital-analysis')).removeClass('off3');
            chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
            obj.visible = "1";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
    });

    $scope.$on('OnPeer2StateToggle', function (event, opt) {
        if (opt.state === true) {
            angular.element(document.querySelector('#liquidity-funding')).addClass('off4');
            angular.element(document.querySelector('#balance-sheet')).addClass('off4');
            angular.element(document.querySelector('#concentrations-of-credit')).addClass('off4');
            angular.element(document.querySelector('#capital-analysis')).addClass('off4');
            var chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
            obj.visible = "0";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
        else {
            angular.element(document.querySelector('#liquidity-funding')).removeClass('off4');
            angular.element(document.querySelector('#balance-sheet')).removeClass('off4');
            angular.element(document.querySelector('#concentrations-of-credit')).removeClass('off4');
            angular.element(document.querySelector('#capital-analysis')).removeClass('off4');
            chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
            obj.visible = "1";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
    });

    $scope.UpdateBenchmark = function ($event, ubprObject) {
        if (ubprObject.benchmark !== null) {
            document.getElementById('overlay').style.display = '';
            var updateBenchMarkParameters = {
                InstitutionKey: $scope.InstitutionKey,
                UBPRConceptCode: ubprObject.ubprConceptCode,
                ReportingPeriodType: '',
                BenchMarkvalue: ubprObject.benchmark
            };

            if ($scope.ActiveChartTab === 'QTD') {
                updateBenchMarkParameters.ReportingPeriodType = 'Quarterly';
            }
            else {
                updateBenchMarkParameters.ReportingPeriodType = 'Yearly';
            }

            var req = {
                method: 'POST',
                url: '/api/BenchmarkApi/UpdateBenchmark',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: updateBenchMarkParameters
            };

            $http(req).then(
                function (result) {

                    document.getElementById('overlay').style.display = 'none';
                    updateCorrespondingQtdYtdObject(ubprObject.benchmark, ubprObject.ubprConceptCode);
                    clearChart();
                    getCreditRiskChartData(ubprObject, 'LIQPrice', $scope.Peer1Key);
                    if (result.data === false) {
                        $scope.toggleErrorMessageBoxModal('An error occurred while trying to update benchmark. Please send an e-mail to admin@cb-resource.com.');
                    }
                },
                function (result) {
                    $scope.toggleErrorMessageBoxModal('An error occurred while trying to update benchmark. Please send an e-mail to admin@cb-resource.com.');
                    document.getElementById('overlay').style.display = 'none';
                });
        }
    }

    $scope.BindTrafficLightBgcolor = function (ubprObject) {
        var lowUbprConceptCodes = '';
        var className = '';
        if ($scope.ThresholdValue !== '' && parseInt($scope.ThresholdValue) > 0) {
            if ($scope.ubprConceptCodesForHasThresholdValues.indexOf(ubprObject.ubprConceptCode) > -1) {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) <= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) > 0) {
                    var perct = (Math.abs(parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark)) / parseFloat(ubprObject.benchmark)) * 100;

                    if (perct < $scope.ThresholdValue) {
                        className = 'rangeBG';
                    }
                    else {
                        className = 'less-thanBG';
                    }
                }
                else {
                    className = 'undefinedBG';
                }
            }
            else {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) >= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) < 0) {
                    perct = (Math.abs(parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark)) / parseFloat(ubprObject.benchmark)) * 100;

                    if (perct < $scope.ThresholdValue) {
                        className = 'rangeBG';
                    }
                    else {
                        className = 'less-thanBG';
                    }
                }
                else {
                    className = 'undefinedBG';
                }
            }
        }
        else {
            if ($scope.ubprConceptCodesForNotHasTheThreshHoldValues.indexOf(ubprObject.ubprConceptCode) > -1) {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) <= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) > 0) {
                    className = 'less-thanBG';
                }
                else {
                    className = 'undefinedBG';
                }
            }
            else {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) >= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) < 0) {
                    className = 'less-thanBG';
                }
                else {
                    className = 'undefinedBG';
                }
            }
        }

        return className;
    }

    $scope.BindRankTableHeader = function (header) {
        if (header.label == 'Institution Name' || header.label == '#')
            return { 'text-align': 'left' };
        else
            return { 'text-align': 'right' };
    }

    $scope.BindAverageTableHeader = function (header) {
        if (header.label == 'Peer Group Averages' || header.label == '#')
            return { 'text-align': 'left' };
        else
            return { 'text-align': 'right' };
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null)
            return 'N/A';
        else
            return $filter('number')(numericValue, fractionSize);
    }

    $scope.GoToBankProfile = function ($event, rankDataObj) {
        $rootScope.ShowBankProfileForInstitutionKey = rankDataObj.institutionKey;
        $rootScope.template = 'ProfileOverview';
    }

    $scope.ToggleDataOnCustomPeerGroupChange = function ($event, peerGroupData) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#liquidityRiskDataLoader')).removeClass('hidden');
        $scope.LiqLiquidityAndFunding = [];
        $scope.LiqLiquidityInvestmentPortfolio = [];
        $scope.LiqLiquiditySecurityRatios = [];
        $scope.LiqOffBalanceSheetItems = [];
        $scope.LiqConcentrationOfCredit = [];
        $scope.LiqCapitalAnalysis = [];
        $scope.newLiqCapitalAnalysis = [];
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        clearChart();
        $rootScope.ShowRiskProfileForPeerGroupKey = peerGroupData.key;
        $rootScope.ShowRiskProfileForPeerGroupName = peerGroupData.name;
        $scope.Peer1 = peerGroupData.name;
        $scope.Peer1Key = peerGroupData.key;
        getRiskProfileLiquidityData(peerGroupData.key);
    }

    $scope.ToggleAccordion = function (divId) {
        if (angular.element(document.querySelector('#' + divId)).hasClass('in'))
            angular.element(document.querySelector('#' + divId)).removeClass("in");
        else
            angular.element(document.querySelector('#' + divId)).addClass("in");
    }

    $scope.ToggleHideShow = function (divId, tblHead) {
        $('#' + divId).toggle();
        if (angular.element(document.querySelector('#' + tblHead)).hasClass("right")) {
            angular.element(document.querySelector('#' + tblHead)).removeClass("right");
            angular.element(document.querySelector('#' + tblHead)).addClass("bottom");
        }
        else {
            angular.element(document.querySelector('#' + tblHead)).addClass("right");
            angular.element(document.querySelector('#' + tblHead)).removeClass("bottom");
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
                if (result.data !== null && result.data.length > 0) {

                    angular.element(document.querySelector('#liquidityRiskChangePeerGroup')).removeAttr('disabled');
                    $scope.AllCustomPeerGroups = result.data;
                    if ($rootScope.ShowRiskProfileForPeerGroupKey > 0) {
                        $scope.Peer1 = $rootScope.ShowRiskProfileForPeerGroupName;
                        $scope.Peer1Key = $rootScope.ShowRiskProfileForPeerGroupKey;
                    }
                    else {
                        var defaultPeerGroup = $scope.AllCustomPeerGroups.filter(function (obj) {
                            return obj.isDefault === true;
                        })[0];

                        if (defaultPeerGroup != null) {
                            $scope.Peer1 = defaultPeerGroup.name;
                            $scope.Peer1Key = defaultPeerGroup.key;
                            $rootScope.ShowRiskProfileForPeerGroupName = defaultPeerGroup.name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = defaultPeerGroup.key;
                        }
                        else {
                            $scope.Peer1 = $scope.AllCustomPeerGroups[0].name;
                            $scope.Peer1Key = $scope.AllCustomPeerGroups[0].key;
                            $rootScope.ShowRiskProfileForPeerGroupName = $scope.AllCustomPeerGroups[0].name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = $scope.AllCustomPeerGroups[0].key;
                        }
                    }

                    getRiskProfileLiquidityData($scope.Peer1Key);
                }
                else {
                    angular.element(document.querySelector('#liquidityRiskChangePeerGroup')).attr('disabled', '');
                    $scope.toggleSuccessMessageBoxModal('There are no custom peer groups. Please create custom peer groups by going to "Manage Profiles" screen.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getYearToDateHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskProfilesApi/GetYtdHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {

            $scope.YtdRankTableHeaders = result.data.ytdRankTableHeaders;
            $scope.YtdAverageTableHeaders = result.data.ytdAverageTableHeaders;
            if ($scope.ActiveChartTab === 'YTD') {
                $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
                $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for YTD table. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getQuarterToDateHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskProfilesApi/GetQtrHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {

            $scope.QtrRankTableHeaders = result.data.qtrRankTableHeaders;
            $scope.QtrAverageTableHeaders = result.data.qtrAverageTableHeaders;
            if ($scope.ActiveChartTab == 'QTD') {
                $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
                $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for QTD table. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var clearChart = function () {
        angular.element(document.querySelector('#chart-container')).addClass('hidden');
        angular.element(document.querySelector('#chart-loader')).removeClass('hidden');
    }

    $scope.ToggleChartTab = function ($event, chartToShow) {
        if (chartToShow == 'QTD') {
            $scope.ActiveChartTab = 'QTD';
            angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
            angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataQtr;
            $scope.RankingData = $scope.RankingDataQtr;
            $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
            $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;

            $scope.LiqLiquidityAndFunding = $scope.LiqLiquidityAndFundingQtd;
            $scope.LiqLiquidityInvestmentPortfolio = $scope.LiqLiquidityInvestmentPortfolioQtd;
            $scope.LiqLiquiditySecurityRatios = $scope.LiqLiquiditySecurityRatiosQtd;
            $scope.LiqOffBalanceSheetItems = $scope.LiqOffBalanceSheetItemsQtd;
            $scope.LiqConcentrationOfCredit = $scope.LiqConcentrationOfCreditQtd;
            $scope.LiqCapitalAnalysis = $scope.LiqCapitalAnalysisQtd;
            $scope.newLiqCapitalAnalysis = $scope.newLiqCapitalAnalysisQtd;

            clearChart();
            if (angular.element(document.querySelector('#liqPeer1Toggle')).prop('checked') === false) {
                var obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "1";
            }

            if (angular.element(document.querySelector('#liqPeer2Toggle')).prop('checked') === false) {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "1";
            }

            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
            angular.element(document.querySelector('#chart-container')).removeClass('hidden');
            angular.element(document.querySelector('#chart-loader')).addClass('hidden');
            $timeout(function () {
                angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).addClass('active');
            }, 0);
        }
        else {
            $scope.ActiveChartTab = 'YTD';
            angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
            angular.element(document.querySelector('#yearlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataYtd;
            $scope.RankingData = $scope.RankingDataYtd;
            $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
            $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;

            $scope.LiqLiquidityAndFunding = $scope.LiqLiquidityAndFundingYtd;
            $scope.LiqLiquidityInvestmentPortfolio = $scope.LiqLiquidityInvestmentPortfolioYtd;
            $scope.LiqLiquiditySecurityRatios = $scope.LiqLiquiditySecurityRatiosYtd;

            $scope.LiqOffBalanceSheetItems = $scope.LiqOffBalanceSheetItemsYtd;
            $scope.LiqConcentrationOfCredit = $scope.LiqConcentrationOfCreditYtd;
            $scope.LiqCapitalAnalysis = $scope.LiqCapitalAnalysisYtd;
            $scope.newLiqCapitalAnalysis = $scope.newLiqCapitalAnalysisYtd;

            clearChart();
            if (angular.element(document.querySelector('#liqPeer1Toggle')).prop('checked') === false) {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "1";
            }

            if (angular.element(document.querySelector('#liqPeer2Toggle')).prop('checked') === false) {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "1";
            }

            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
            angular.element(document.querySelector('#chart-container')).removeClass('hidden');
            angular.element(document.querySelector('#chart-loader')).addClass('hidden');

            $timeout(function () {
                angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).addClass('active');
            }, 0);
        }
    }

    $scope.$on('OnQtdYtdToggle', function (event, opt) {
        if (opt.state === true) {
            $scope.ActiveChartTab = 'YTD';
            angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
            angular.element(document.querySelector('#yearlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataYtd;
            $scope.RankingData = $scope.RankingDataYtd;
            $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
            $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;

            $scope.LiqLiquidityAndFunding = $scope.LiqLiquidityAndFundingYtd;
            $scope.LiqLiquidityInvestmentPortfolio = $scope.LiqLiquidityInvestmentPortfolioYtd;
            $scope.LiqLiquiditySecurityRatios = $scope.LiqLiquiditySecurityRatiosYtd;

            $scope.LiqOffBalanceSheetItems = $scope.LiqOffBalanceSheetItemsYtd;
            $scope.LiqConcentrationOfCredit = $scope.LiqConcentrationOfCreditYtd;
            $scope.LiqCapitalAnalysis = $scope.LiqCapitalAnalysisYtd;
            $scope.newLiqCapitalAnalysis = $scope.newLiqCapitalAnalysisYtd;

            clearChart();
            if (angular.element(document.querySelector('#liqPeer1Toggle')).prop('checked') === false) {
                var obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "1";
            }

            if (angular.element(document.querySelector('#liqPeer2Toggle')).prop('checked') === false) {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "1";
            }

            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
            angular.element(document.querySelector('#chart-container')).removeClass('hidden');
            angular.element(document.querySelector('#chart-loader')).addClass('hidden');

            $timeout(function () {
                angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).addClass('active');
            }, 0);
        }
        else {
            $scope.ActiveChartTab = 'QTD';
            angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
            angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataQtr;
            $scope.RankingData = $scope.RankingDataQtr;
            $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
            $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;

            $scope.LiqLiquidityAndFunding = $scope.LiqLiquidityAndFundingQtd;
            $scope.LiqLiquidityInvestmentPortfolio = $scope.LiqLiquidityInvestmentPortfolioQtd;
            $scope.LiqLiquiditySecurityRatios = $scope.LiqLiquiditySecurityRatiosQtd;

            $scope.LiqOffBalanceSheetItems = $scope.LiqOffBalanceSheetItemsQtd;
            $scope.LiqConcentrationOfCredit = $scope.LiqConcentrationOfCreditQtd;
            $scope.LiqCapitalAnalysis = $scope.LiqCapitalAnalysisQtd;
            $scope.newLiqCapitalAnalysis = $scope.newLiqCapitalAnalysisQtd;

            clearChart();
            if (angular.element(document.querySelector('#liqPeer1Toggle')).prop('checked') === false) {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "1";
            }

            if (angular.element(document.querySelector('#liqPeer2Toggle')).prop('checked') === false) {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "1";
            }

            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
            angular.element(document.querySelector('#chart-container')).removeClass('hidden');
            angular.element(document.querySelector('#chart-loader')).addClass('hidden');
            $timeout(function () {
                angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).addClass('active');
            }, 0);
        }
    });

    var getCustomPeerGroupRankingData = function (rowData, RptName, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var rankingParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            CustPeerGroupName: $scope.Peer1,
            InstitutionKey: $scope.InstitutionKey,
            CustPeerGroupKey: custPeerGroupKey,
            Login: '',
            StandardPeerGroupName: selectedInstitution.stdPeerGroupCode,
            RptName: RptName,
            SortOrder: rowData.sortOrder
        };

        var req = {
            method: 'POST',
            url: '/api/RiskProfilesApi/GetRiskProfileRankingData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: rankingParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    $scope.RankingDataQtr = result.data.peerGroupRankDataQtr;
                    $scope.AverageDataQtr = result.data.peerGroupAverageDataQtr;
                    $scope.RankingDataYtd = result.data.peerGroupRankDataYtd;
                    $scope.AverageDataYtd = result.data.peerGroupAverageDataYtd;
                    for (i = 0; i < $scope.RankingDataQtr.length; i++) {
                        var rank = i + 1;
                        $scope.RankingDataQtr[i].rank = rank;
                    }

                    for (i = 0; i < $scope.RankingDataYtd.length; i++) {
                        rank = i + 1;
                        $scope.RankingDataYtd[i].rank = rank;
                    }

                    if ($scope.ActiveChartTab == 'QTD') {
                        $scope.AverageData = $scope.AverageDataQtr;
                        $scope.RankingData = $scope.RankingDataQtr;
                    }
                    else {
                        $scope.AverageData = $scope.AverageDataYtd;
                        $scope.RankingData = $scope.RankingDataYtd;
                    }

                    angular.element(document.querySelector('#averageTableSpinner')).html('');
                    angular.element(document.querySelector('#rankTableSpinner')).html('');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get ranking data and peer group averages. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.refreshChartAndRankingData = function ($event, rowData, chartType) {
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        clearChart();
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
        $scope.SelectedUBPRDesc = rowData.ubprConceptDesc;
        getCreditRiskChartData(rowData, chartType, $scope.Peer1Key);
        getCustomPeerGroupRankingData(rowData, chartType, $scope.Peer1Key);
        if ($scope.SelectedUBPRColId != '')
            angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).removeClass('active');
        angular.element(document.querySelector('#' + rowData.ubprConceptCode)).addClass('active');
        $scope.SelectedUBPRColId = rowData.ubprConceptCode;
    }

    var getCreditRiskChartData = function (rowData, chartType, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var creditRiskChartParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            InstitutionKey: $scope.InstitutionKey,
            CustPeerGroupName: $scope.Peer1,
            CustPeerGroupKey: custPeerGroupKey,
            StdPeerGroupName: selectedInstitution.stdPeerGroupCode,
            Login: '',
            RptName: chartType
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetBenchmarkChartData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: creditRiskChartParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    angular.element(document.querySelector('#chart-container')).removeClass('hidden');
                    angular.element(document.querySelector('#chart-loader')).addClass('hidden');
                    //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
                    $scope.QuarterlyChartData = result.data.quarterlyChartData;
                    $scope.YearlyChartData = result.data.yearlyChartData;

                    if ($scope.ActiveChartTab == 'QTD') {
                        angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
                        if (angular.element(document.querySelector('#liqPeer1Toggle')).prop('checked') === false) {
                            var obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                            obj.visible = "0";
                        }

                        if (angular.element(document.querySelector('#liqPeer2Toggle')).prop('checked') === false) {
                            obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                            obj.visible = "0";
                        }
                        renderChart($scope.QuarterlyChartData, rowData.ubprConceptDesc);
                    }
                    else {
                        angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#yearlyChartData')).addClass('active');
                        if (angular.element(document.querySelector('#liqPeer1Toggle')).prop('checked') === false) {
                            obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                            obj.visible = "0";
                        }

                        if (angular.element(document.querySelector('#liqPeer2Toggle')).prop('checked') === false) {
                            obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                            obj.visible = "0";
                        }
                        renderChart($scope.YearlyChartData, rowData.ubprConceptDesc);
                    }

                    angular.element(document.querySelector('#' + rowData.ubprConceptCode)).addClass('active');
                    $scope.SelectedUBPRColId = rowData.ubprConceptCode;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for chart. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var renderChart = function (chartData, ubprConceptDesc) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": ubprConceptDesc,
                    "showPlotBorder": "0",
                    "plotBorderAlpha": "0",
                    "subCaption": "",
                    "xAxisname": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "showBorder": "0",
                    "showValues": "0",
                    "paletteColors": "#003057,#008C48,#A71D23,#FFC207",
                    "bgColor": "#ffffff",
                    "showCanvasBorder": "0",
                    "canvasBgColor": "#ffffff",
                    "captionFontSize": "14",
                    "subcaptionFontSize": "14",
                    "subcaptionFontBold": "0",
                    "divlineColor": "#999999",
                    "divLineDashed": "1",
                    "divLineDashLen": "1",
                    "divLineGapLen": "1",
                    "showAlternateHGridColor": "1",
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
                    "exportEnabled": "1"
                },
                "categories": [
                    {
                        "category": chartData.categories.category.categoryLabels
                    }
                ],
                "dataset": chartData.dataSetList
            };

            var chartContainer = $('#chart-container');
            if (chartContainer != null) {
                var revenueChart = FusionCharts.items.benchmarkChart;
                if (typeof revenueChart === 'undefined') {
                    revenueChart = new FusionCharts({
                        type: 'mscombi2d',
                        id: 'benchmarkChart',
                        renderAt: 'chart-container',
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });
                    revenueChart.render();
                }
                else {
                    revenueChart.setChartData(dSource, 'json');
                    revenueChart.render();
                }
            } // if block ends here
        });
    }

    var getRiskProfileLiquidityData = function (custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var riskProfileParams = {
            Institutionkey: $scope.InstitutionKey, //Will get user's tenant's institution on server
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey, //Need to be selected from a dropdown
            CustPeerGroupKey: custPeerGroupKey //Will get default custom peer group for logged in user on server
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetBenchmarkLiquidityRiskData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: riskProfileParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.LiqLiquidityAndFundingQtd = result.data.riskProfileSections.liquidityAndFundingQtd;
                    $scope.LiqLiquidityInvestmentPortfolioQtd = result.data.riskProfileSections.liquidityInvestmentPortfolioQtd;
                    $scope.LiqLiquiditySecurityRatiosQtd = result.data.riskProfileSections.liquiditySecurityRatiosQtd;

                    $scope.LiqOffBalanceSheetItemsQtd = result.data.riskProfileSections.liPrRiskOffBalanceSheetQtd;
                    $scope.LiqConcentrationOfCreditQtd = result.data.riskProfileSections.liPrConcentrationOfCreditQtd;
                    $scope.LiqCapitalAnalysisQtd = result.data.riskProfileSections.capitalAnalysisQtd;
                    $scope.newLiqCapitalAnalysisQtd = result.data.riskProfileSections.newCapitalAnalysisQtd;

                    $scope.LiqLiquidityAndFundingYtd = result.data.riskProfileSections.liquidityAndFundingYtd;
                    $scope.LiqLiquidityInvestmentPortfolioYtd = result.data.riskProfileSections.liquidityInvestmentPortfolioYtd;
                    $scope.LiquiditySecurityRatiosYtd = result.data.riskProfileSections.liquiditySecurityRatiosYtd;


                    $scope.LiqOffBalanceSheetItemsYtd = result.data.riskProfileSections.liPrRiskOffBalanceSheetYtd;
                    $scope.LiqConcentrationOfCreditYtd = result.data.riskProfileSections.liPrConcentrationOfCreditYtd;
                    $scope.LiqCapitalAnalysisYtd = result.data.riskProfileSections.capitalAnalysisYtd;
                    $scope.newLiqCapitalAnalysisYtd = result.data.riskProfileSections.newCapitalAnalysisYtd;

                    if ($scope.ActiveChartTab === 'QTD') {
                        $scope.LiqLiquidityAndFunding = $scope.LiqLiquidityAndFundingQtd;
                        $scope.LiqLiquidityInvestmentPortfolio = $scope.LiqLiquidityInvestmentPortfolioQtd;
                        $scope.LiqLiquiditySecurityRatios = $scope.LiquiditySecurityRatiosQtd;

                        $scope.LiqOffBalanceSheetItems = $scope.LiqOffBalanceSheetItemsQtd;
                        $scope.LiqConcentrationOfCredit = $scope.LiqConcentrationOfCreditQtd;
                        $scope.LiqCapitalAnalysis = $scope.LiqCapitalAnalysisQtd;
                        $scope.newLiqCapitalAnalysis = $scope.newLiqCapitalAnalysisQtd;
                    }
                    else {
                        $scope.LiqLiquidityAndFunding = $scope.LiqLiquidityAndFundingYtd;
                        $scope.LiqLiquidityInvestmentPortfolio = $scope.LiqLiquidityInvestmentPortfolioYtd;
                        $scope.LiqLiquiditySecurityRatios = $scope.LiquiditySecurityRatiosYtd;

                        $scope.LiqOffBalanceSheetItems = $scope.LiqOffBalanceSheetItemsYtd;
                        $scope.LiqConcentrationOfCredit = $scope.LiqConcentrationOfCreditYtd;
                        $scope.LiqCapitalAnalysis = $scope.LiqCapitalAnalysisYtd;
                        $scope.newLiqCapitalAnalysis = $scope.newLiqCapitalAnalysisYtd;
                    }

                    if ($scope.LiqLiquidityAndFunding.length > 0) {
                        getCreditRiskChartData($scope.LiqLiquidityAndFunding[0], 'LIQPrice', custPeerGroupKey);
                        getCustomPeerGroupRankingData($scope.LiqLiquidityAndFunding[0], 'LIQPrice', custPeerGroupKey);
                        $scope.SelectedUBPRDesc = $scope.LiqLiquidityAndFunding[0].ubprConceptDesc;
                        $scope.SelectedUBPRColId = $scope.LiqLiquidityAndFunding[0].ubprConceptCode;
                    }

                    angular.element(document.querySelector('#liquidityRiskDataLoader')).addClass('hidden');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for liquidity and price risk. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.ExportToExcelbenchmarking = function () {
        $scope.exportDataBtn = true;
        document.getElementById('overlay').style.display = '';
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var riskProfileParams = {
            Institutionkey: $scope.InstitutionKey, //Will get user's tenant's institution on server
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey, //Need to be selected from a dropdown
            CustPeerGroupKey: $scope.Peer1Key, //Will get default custom peer group for logged in user on server
            Bank: $scope.Bank,
            ThresholdValue: $scope.ThresholdValue,
            Peer1: $scope.Peer1,
            Peer2: $scope.Peer2,
            PeerGroups: $scope.AllCustomPeerGroups
        };
        var req = {
            httpMethod: 'POST',
            checkInterval: 500,
            successCallback: function (url) {
                if (url === '/Account/Login') {
                    window.location.href = url;
                }

                document.getElementById('overlay').style.display = 'none';
                $scope.$apply(function () {
                    $scope.exportDataBtn = false;
                });
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
                $scope.$apply(function () {
                    $scope.exportDataBtn = false;
                });
            },
            data: riskProfileParams
        };
        $.fileDownload('/Api/BenchmarkApi/GetBenchmarkingExporttoExcel', req);
    }
    var cookieIntervalID = null;
    var getCookie = function (name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin === -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        }
        else {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end === -1) {
                end = dc.length;
            }
        }
        return unescape(dc.substring(begin + prefix.length, end));
    }
    var initialize = function () {
        getYearToDateHeaders();
        getQuarterToDateHeaders();
        getInstitutionList();

        $('#qtdYtdToggle').bootstrapToggle('off');
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("benchmarkingStrategicRiskViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.StEarningsAndProfitability = [];
    $scope.StNonIncomeAndExpenses = [];
    $scope.StInterestRateRisk = [];
    $scope.StMarginAnalysis = [];
    $scope.StGrowthRates = [];
    $scope.StCapitalRatios = [];

    $scope.StEarningsAndProfitabilityQtd = [];
    $scope.StNonIncomeAndExpensesQtd = [];
    $scope.StInterestRateRiskQtd = [];
    $scope.StMarginAnalysisQtd = [];
    $scope.StGrowthRatesQtd = [];
    $scope.StCapitalRatiosQtd = [];

    $scope.StEarningsAndProfitabilityYtd = [];
    $scope.StNonIncomeAndExpensesYtd = [];
    $scope.StInterestRateRiskYtd = [];
    $scope.StMarginAnalysisYtd = [];
    $scope.StGrowthRatesYtd = [];
    $scope.StCapitalRatiosYtd = [];

    $scope.SelectedUBPRColId = '';
    $scope.AllCustomPeerGroups = [];
    $scope.Bank = '';
    $scope.Peer1 = '';
    $scope.Peer2 = '';
    $scope.Peer1Key = '';
    $scope.InstitutionKey = '';
    $scope.RankingDataQtr = [];
    $scope.AverageDataQtr = [];
    $scope.RankingDataYtd = [];
    $scope.AverageDataYtd = [];
    $scope.RankingData = [];
    $scope.AverageData = [];
    $scope.ActiveChartTab = 'YTD';
    $scope.QuarterlyChartData = {};
    $scope.YearlyChartData = {};
    $scope.SelectedUBPRDesc = '';
    $scope.SelectedUBPRColId = '';
    $scope.YtdRankTableHeaders = [];
    $scope.YtdAverageTableHeaders = [];
    $scope.QtrRankTableHeaders = [];
    $scope.QtrAverageTableHeaders = [];
    $scope.RankTableHeaders = [];
    $scope.AverageTableHeaders = [];
    $scope.SelectedUBPRColId = '';
    $scope.ThresholdValue = 0;
    $scope.Institutions = [];

    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.exportDataBtn = false;
    $scope.ubprConceptCodesForHasThresholdValues = ['UBPRE002', 'UBPRE005', 'UBPR7400', 'UBPRE084', 'UBPRE085', 'UBPRE088', 'UBPRE089'
        , 'UBPRE015', 'UBPRE087', 'UBPRE089', 'UBPR7316', 'UBPRE027'
    ];
    $scope.ubprConceptCodesForNotHasTheThreshHoldValues = ['UBPRE002', 'UBPRE005', 'UBPR7400', 'UBPRE084', 'UBPRE085', 'UBPRE088', 'UBPRE089'
        , 'UBPRE015', 'UBPRE087', 'UBPRE089', 'UBPR7316', 'UBPRE027'
    ];

    $scope.HighlightDefaultBank = function (rankData) {
        var highlighter = '';
        if (rankData.isDefault === true)
            highlighter = 'highlightDefaultBank';

        return highlighter;
    }

    $scope.HideUnhideBenchmarkInputBox = function (dataObj) {
        if (dataObj === -7.922816251426434e+28)
            return 'hidebenchmarkinput';
        else
            return '';
    }

    var updateCorrespondingQtdYtdObject = function (value, ubprConceptCode) {
        if ($scope.ActiveChartTab === 'QTD') {
            var objectToUpdate = $scope.StEarningsAndProfitabilityYtd.filter(function (obj) {
                return obj.ubprConceptCode === ubprConceptCode;
            })[0];

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.StNonIncomeAndExpensesYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.StInterestRateRiskYtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            objectToUpdate.benchmark = value;
        }
        else {
            objectToUpdate = $scope.StEarningsAndProfitabilityQtd.filter(function (obj) {
                return obj.ubprConceptCode === ubprConceptCode;
            })[0];

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.StNonIncomeAndExpensesQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            if (typeof objectToUpdate === 'undefined') {
                objectToUpdate = $scope.StInterestRateRiskQtd.filter(function (obj) {
                    return obj.ubprConceptCode === ubprConceptCode;
                })[0];
            }

            objectToUpdate.benchmark = value;
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
                if (result.data !== null && result.data.length > 0) {

                    $scope.Institutions = result.data;
                    var defaultInstitution = $scope.Institutions.filter(function (obj) {
                        return obj.isDefault === true;
                    })[0];

                    if ($rootScope.ShowRiskProfileForInstitutionKey > 0) {
                        $scope.Bank = $rootScope.ShowRiskProfileForInstitutionName;
                        $scope.InstitutionKey = $rootScope.ShowRiskProfileForInstitutionKey;
                        var selectedInstitution = $scope.Institutions.filter(function (obj) {
                            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
                        })[0];
                        if (selectedInstitution.stdPeerGroupCode !== null && selectedInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + selectedInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }
                    else {
                        $scope.Bank = defaultInstitution.institutionName;
                        $scope.InstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionName = defaultInstitution.institutionName;
                        if (defaultInstitution.stdPeerGroupCode !== null && defaultInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + defaultInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }

                    getThresholdValueForInstitution();
                    getAllPeerGroupsForUser();
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                    angular.element(document.querySelector('#strategicRiskChangePeerGroup')).attr('disabled', '');
                    angular.element(document.querySelector('#strategicRiskChangeBank')).attr('disabled', '');
                    angular.element(document.querySelector('#strategicRiskDataLoader')).addClass('hidden');
                    angular.element(document.querySelector('#chart-loader')).html('<span>No data available to render chart.</span>');
                    angular.element(document.querySelector('#averageTableSpinner')).html('<span>No data available to render comparison table.</span>');
                    angular.element(document.querySelector('#rankTableSpinner')).html('<span>No data available to render ranking table.</span>');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.ToggleDataOnInstitutionChange = function ($event, institutionObj) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#interestRateRiskDataLoader')).removeClass('hidden');

        $scope.StEarningsAndProfitability = [];
        $scope.StNonIncomeAndExpenses = [];
        $scope.StInterestRateRisk = [];
        $scope.StMarginAnalysis = [];
        $scope.StGrowthRates = [];
        $scope.StCapitalRatios = [];

        $scope.StEarningsAndProfitabilityQtd = [];
        $scope.StNonIncomeAndExpensesQtd = [];
        $scope.StInterestRateRiskQtd = [];
        $scope.StMarginAnalysisQtd = [];
        $scope.StGrowthRatesQtd = [];
        $scope.StCapitalRatiosQtd = [];

        $scope.StEarningsAndProfitabilityYtd = [];
        $scope.StNonIncomeAndExpensesYtd = [];
        $scope.StInterestRateRiskYtd = [];
        $scope.StMarginAnalysisYtd = [];
        $scope.StGrowthRatesYtd = [];
        $scope.StCapitalRatiosYtd = [];

        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        $scope.SelectedUBPRColId = '';
        $rootScope.ShowRiskProfileForInstitutionKey = institutionObj.institutionKey;
        $rootScope.ShowRiskProfileForInstitutionName = institutionObj.institutionName;
        $scope.Bank = institutionObj.institutionName;
        $scope.InstitutionKey = institutionObj.institutionKey;
        if (institutionObj.stdPeerGroupCode !== null && institutionObj.stdPeerGroupCode !== '')
            $scope.Peer2 = 'UBPR Group ' + institutionObj.stdPeerGroupCode;
        else
            $scope.Peer2 = 'N/A';

        clearChart();
        getThresholdValueForInstitution();
        getRiskProfileStrategicData($scope.Peer1Key);
    }

    var getThresholdValueForInstitution = function () {
        var thresHoldParameter = {
            InstitutionKey: $scope.InstitutionKey,
            ThresholdValue: 0
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetThresHoldForInstitute',
            headers: {
                'Content-Type': 'application/json'
            },
            data: thresHoldParameter
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    $scope.ThresholdValue = result.data;
                }
                else {
                    $scope.ThresholdValue = '';
                }
            },
            function (result) {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get threshold value. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.UpdateThresholdValueForInstitution = function ($event) {
        document.getElementById('overlay').style.display = '';

        var thresHoldParameter = {
            InstitutionKey: $scope.InstitutionKey,
            ThresholdValue: $scope.ThresholdValue
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/UpdateThresHoldForInstitute',
            headers: {
                'Content-Type': 'application/json'
            },
            data: thresHoldParameter
        };

        $http(req).then(
            function (result) {

                if (result.data !== null && result.data === true) {
                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleSuccessMessageBoxModal('Successfully updated the threshold value.');
                }
                else {
                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleSuccessMessageBoxModal('Could not update the threshold value. Please send an e-mail to admin@cb-resource.com.');
                }
            },
            function (result) {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to update threshold value. Please send an e-mail to admin@cb-resource.com.');
                document.getElementById('overlay').style.display = 'none';
            });
    }

    $scope.$on('OnInstitutionChange', function (event, opt) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#interestRateRiskDataLoader')).removeClass('hidden');

        $scope.StEarningsAndProfitability = [];
        $scope.StNonIncomeAndExpenses = [];
        $scope.StInterestRateRisk = [];
        $scope.StMarginAnalysis = [];
        $scope.StGrowthRates = [];
        $scope.StCapitalRatios = [];

        $scope.StEarningsAndProfitabilityQtd = [];
        $scope.StNonIncomeAndExpensesQtd = [];
        $scope.StInterestRateRiskQtd = [];
        $scope.StMarginAnalysisQtd = [];
        $scope.StGrowthRatesQtd = [];
        $scope.StCapitalRatiosQtd = [];

        $scope.StEarningsAndProfitabilityYtd = [];
        $scope.StNonIncomeAndExpensesYtd = [];
        $scope.StInterestRateRiskYtd = [];
        $scope.StMarginAnalysisYtd = [];
        $scope.StGrowthRatesYtd = [];
        $scope.StCapitalRatiosYtd = [];

        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        $scope.SelectedUBPRColId = '';
        $rootScope.ShowRiskProfileForInstitutionKey = opt.institution.institutionKey;
        $rootScope.ShowRiskProfileForInstitutionName = opt.institution.institutionName;
        $scope.Bank = opt.institution.institutionName;
        $scope.InstitutionKey = opt.institution.institutionKey;
        if (opt.institution.stdPeerGroupCode !== null && opt.institution.stdPeerGroupCode !== '')
            $scope.Peer2 = 'UBPR Group ' + opt.institution.stdPeerGroupCode;
        else
            $scope.Peer2 = 'N/A';

        clearChart();
        getThresholdValueForInstitution();
        getRiskProfileStrategicData($scope.Peer1Key);
    });

    $scope.$on('OnPeerGroupChange', function (event, opt) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#strategicRiskDataLoader')).removeClass('hidden');
        $scope.StEarningsAndProfitability = [];
        $scope.StMarginAnalysis = [];
        $scope.StGrowthRates = [];
        $scope.StCapitalRatios = [];
        $scope.StNonIncomeAndExpenses = [];
        $scope.StInterestRateRisk = [];
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        clearChart();
        $rootScope.ShowRiskProfileForPeerGroupKey = opt.peergroup.key;
        $rootScope.ShowRiskProfileForPeerGroupName = opt.peergroup.name;
        $scope.Peer1 = opt.peergroup.name;
        $scope.Peer1Key = opt.peergroup.key;
        getRiskProfileStrategicData(opt.peergroup.key);
    });

    $scope.$on('OnPeer1StateToggle', function (event, opt) {
        if (opt.state === true) {
            angular.element(document.querySelector('#liquidity-funding')).addClass('off3');
            angular.element(document.querySelector('#balance-sheet')).addClass('off3');
            angular.element(document.querySelector('#concentrations-of-credit')).addClass('off3');
            var chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
            obj.visible = "0";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
        else {
            angular.element(document.querySelector('#liquidity-funding')).removeClass('off3');
            angular.element(document.querySelector('#balance-sheet')).removeClass('off3');
            angular.element(document.querySelector('#concentrations-of-credit')).removeClass('off3');
            chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
            obj.visible = "1";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
    });

    $scope.$on('OnPeer2StateToggle', function (event, opt) {
        if (opt.state === true) {
            angular.element(document.querySelector('#liquidity-funding')).addClass('off4');
            angular.element(document.querySelector('#balance-sheet')).addClass('off4');
            angular.element(document.querySelector('#concentrations-of-credit')).addClass('off4');
            var chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            var obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
            obj.visible = "0";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
        else {
            angular.element(document.querySelector('#liquidity-funding')).removeClass('off4');
            angular.element(document.querySelector('#balance-sheet')).removeClass('off4');
            angular.element(document.querySelector('#concentrations-of-credit')).removeClass('off4');
            chartData = {
                categories: {},
                dataSetList: []
            };

            chartData.categories.category = { categoryLabels: [] };
            chartData.categories.category.categoryLabels = FusionCharts.items.benchmarkChart.options.dataSource.categories[0].category;
            chartData.dataSetList = FusionCharts.items.benchmarkChart.options.dataSource.dataset;
            obj = chartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
            obj.visible = "1";
            renderChart(chartData, $scope.SelectedUBPRDesc);
        }
    });

    $scope.UpdateBenchmark = function ($event, ubprObject) {
        if (ubprObject.benchmark !== null) {
            document.getElementById('overlay').style.display = '';
            var updateBenchMarkParameters = {
                InstitutionKey: $scope.InstitutionKey,
                UBPRConceptCode: ubprObject.ubprConceptCode,
                ReportingPeriodType: '',
                BenchMarkvalue: ubprObject.benchmark
            };

            if ($scope.ActiveChartTab === 'QTD') {
                updateBenchMarkParameters.ReportingPeriodType = 'Quarterly';
            }
            else {
                updateBenchMarkParameters.ReportingPeriodType = 'Yearly';
            }

            var req = {
                method: 'POST',
                url: '/api/BenchmarkApi/UpdateBenchmark',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: updateBenchMarkParameters
            };

            $http(req).then(
                function (result) {

                    document.getElementById('overlay').style.display = 'none';
                    updateCorrespondingQtdYtdObject(ubprObject.benchmark, ubprObject.ubprConceptCode);
                    getCreditRiskChartData(ubprObject, 'Strategic', $scope.Peer1Key);
                    if (result.data === false) {
                        $scope.toggleErrorMessageBoxModal('An error occurred while trying to update benchmark. Please send an e-mail to admin@cb-resource.com.');
                    }
                },
                function (result) {
                    $scope.toggleErrorMessageBoxModal('An error occurred while trying to update benchmark. Please send an e-mail to admin@cb-resource.com.');
                    document.getElementById('overlay').style.display = 'none';
                });
        }
    }

    $scope.BindTrafficLightBgcolor = function (ubprObject) {
        var lowUbprConceptCodes = '';

        var className = '';
        if ($scope.ThresholdValue !== '' && parseInt($scope.ThresholdValue) > 0) {
            if ($scope.ubprConceptCodesForHasThresholdValues.indexOf(ubprObject.ubprConceptCode) > -1) {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) <= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) > 0) {
                    var perct = (Math.abs(parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark)) / parseFloat(ubprObject.benchmark)) * 100;

                    if (perct < $scope.ThresholdValue) {
                        className = 'rangeBG';
                    }
                    else {
                        className = 'less-thanBG';
                    }
                }
                else {
                    className = 'undefinedBG';
                }
            }
            else {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) >= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) < 0) {
                    perct = (Math.abs(parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark)) / parseFloat(ubprObject.benchmark)) * 100;

                    if (perct < $scope.ThresholdValue) {
                        className = 'rangeBG';
                    }
                    else {
                        className = 'less-thanBG';
                    }
                }
                else {
                    className = 'undefinedBG';
                }
            }
        }
        else {
            if ($scope.ubprConceptCodesForNotHasTheThreshHoldValues.indexOf(ubprObject.ubprConceptCode) > -1) {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) <= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) > 0) {
                    className = 'less-thanBG';
                }
                else {
                    className = 'undefinedBG';
                }
            }
            else {
                if (ubprObject.benchmark === null) {
                    className = 'undefinedBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) >= 0) {
                    className = 'greater-thanBG';
                }
                else if (ubprObject.benchmark >= 0 && parseFloat(ubprObject.bank) - parseFloat(ubprObject.benchmark) < 0) {
                    className = 'less-thanBG';
                }
                else {
                    className = 'undefinedBG';
                }
            }
        }

        return className;
    }

    $scope.BindRankTableHeader = function (header) {
        if (header.label == 'Institution Name' || header.label == '#')
            return { 'text-align': 'left' };
        else
            return { 'text-align': 'right' };
    }

    $scope.BindAverageTableHeader = function (header) {
        if (header.label == 'Peer Group Averages' || header.label == '#')
            return { 'text-align': 'left' };
        else
            return { 'text-align': 'right' };
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null)
            return 'N/A';
        else
            return $filter('number')(numericValue, fractionSize);
    }

    $scope.GoToBankProfile = function ($event, rankDataObj) {
        $rootScope.ShowBankProfileForInstitutionKey = rankDataObj.institutionKey;
        $rootScope.template = 'ProfileOverview';
    }

    $scope.ToggleDataOnCustomPeerGroupChange = function ($event, peerGroupData) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#strategicRiskDataLoader')).removeClass('hidden');
        $scope.StEarningsAndProfitability = [];
        $scope.StMarginAnalysis = [];
        $scope.StGrowthRates = [];
        $scope.StCapitalRatios = [];
        $scope.StNonIncomeAndExpenses = [];
        $scope.StInterestRateRisk = [];
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        clearChart();
        $rootScope.ShowRiskProfileForPeerGroupKey = peerGroupData.key;
        $rootScope.ShowRiskProfileForPeerGroupName = peerGroupData.name;
        $scope.Peer1 = peerGroupData.name;
        $scope.Peer1Key = peerGroupData.key;
        getRiskProfileStrategicData(peerGroupData.key);
    }

    $scope.ToggleAccordion = function (divId) {
        if (angular.element(document.querySelector('#' + divId)).hasClass('in'))
            angular.element(document.querySelector('#' + divId)).removeClass("in");
        else
            angular.element(document.querySelector('#' + divId)).addClass("in");
    }

    $scope.ToggleHideShow = function (divId, tblHead) {
        $('#' + divId).toggle();
        if (angular.element(document.querySelector('#' + tblHead)).hasClass("right")) {
            angular.element(document.querySelector('#' + tblHead)).removeClass("right");
            angular.element(document.querySelector('#' + tblHead)).addClass("bottom");
        }
        else {
            angular.element(document.querySelector('#' + tblHead)).addClass("right");
            angular.element(document.querySelector('#' + tblHead)).removeClass("bottom");
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
                if (result.data !== null && result.data.length > 0) {

                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).removeAttr('disabled');
                    $scope.AllCustomPeerGroups = result.data;
                    if ($rootScope.ShowRiskProfileForPeerGroupKey > 0) {
                        $scope.Peer1 = $rootScope.ShowRiskProfileForPeerGroupName;
                        $scope.Peer1Key = $rootScope.ShowRiskProfileForPeerGroupKey;
                    }
                    else {
                        var defaultPeerGroup = $scope.AllCustomPeerGroups.filter(function (obj) {
                            return obj.isDefault === true;
                        })[0];

                        if (defaultPeerGroup != null) {
                            $scope.Peer1 = defaultPeerGroup.name;
                            $scope.Peer1Key = defaultPeerGroup.key;
                            $rootScope.ShowRiskProfileForPeerGroupName = defaultPeerGroup.name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = defaultPeerGroup.key;
                        }
                        else {
                            $scope.Peer1 = $scope.AllCustomPeerGroups[0].name;
                            $scope.Peer1Key = $scope.AllCustomPeerGroups[0].key;
                            $rootScope.ShowRiskProfileForPeerGroupName = $scope.AllCustomPeerGroups[0].name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = $scope.AllCustomPeerGroups[0].key;
                        }
                    }

                    getRiskProfileStrategicData($scope.Peer1Key);
                }
                else {
                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).attr('disabled', '');
                    $scope.toggleSuccessMessageBoxModal('There are no custom peer groups. Please create custom peer groups by going to "Manage Profiles" screen.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getYearToDateHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskProfilesApi/GetYtdHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {

            $scope.YtdRankTableHeaders = result.data.ytdRankTableHeaders;
            $scope.YtdAverageTableHeaders = result.data.ytdAverageTableHeaders;
            if ($scope.ActiveChartTab == 'YTD') {
                $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
                $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for YTD table. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getQuarterToDateHeaders = function () {
        var req = {
            method: 'GET',
            url: '/api/RiskProfilesApi/GetQtrHeaders',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {

            $scope.QtrRankTableHeaders = result.data.qtrRankTableHeaders;
            $scope.QtrAverageTableHeaders = result.data.qtrAverageTableHeaders;
            if ($scope.ActiveChartTab == 'QTD') {
                $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
                $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for QTD table. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var clearChart = function () {
        angular.element(document.querySelector('#chart-container')).addClass('hidden');
        angular.element(document.querySelector('#chart-loader')).removeClass('hidden');
    }

    $scope.$on('OnQtdYtdToggle', function (event, opt) {
        if (opt.state === true) {
            $scope.ActiveChartTab = 'YTD';
            angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
            angular.element(document.querySelector('#yearlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataYtd;
            $scope.RankingData = $scope.RankingDataYtd;
            $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
            $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;

            $scope.StEarningsAndProfitability = $scope.StEarningsAndProfitabilityYtd;
            $scope.StMarginAnalysis = $scope.StMarginAnalysisYtd;
            $scope.StGrowthRates = $scope.StGrowthRatesYtd;
            $scope.StCapitalRatios = $scope.StCapitalRatiosYtd;
            $scope.StNonIncomeAndExpenses = $scope.StNonIncomeAndExpensesYtd;
            $scope.StInterestRateRisk = $scope.StInterestRateRiskYtd;

            clearChart();
            if (angular.element(document.querySelector('#strategicPeer1Toggle')).prop('checked') === false) {
                var obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "1";
            }

            if (angular.element(document.querySelector('#strategicPeer2Toggle')).prop('checked') === false) {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "1";
            }

            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
            angular.element(document.querySelector('#chart-container')).removeClass('hidden');
            angular.element(document.querySelector('#chart-loader')).addClass('hidden');
            $timeout(function () {
                angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).addClass('active');
            }, 0);
        }
        else {
            $scope.ActiveChartTab = 'QTD';
            angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
            angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataQtr;
            $scope.RankingData = $scope.RankingDataQtr;
            $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
            $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;

            $scope.StEarningsAndProfitability = $scope.StEarningsAndProfitabilityQtd;
            $scope.StMarginAnalysis = $scope.StMarginAnalysisQtd;
            $scope.StGrowthRates = $scope.StGrowthRatesQtd;
            $scope.StCapitalRatios = $scope.StCapitalRatiosQtd;
            $scope.StNonIncomeAndExpenses = $scope.StNonIncomeAndExpensesQtd;
            $scope.StInterestRateRisk = $scope.StInterestRateRiskQtd;

            clearChart();
            if (angular.element(document.querySelector('#strategicPeer1Toggle')).prop('checked') === false) {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                obj.visible = "1";
            }

            if (angular.element(document.querySelector('#strategicPeer2Toggle')).prop('checked') === false) {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "0";
            }
            else {
                obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                obj.visible = "1";
            }

            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
            angular.element(document.querySelector('#chart-container')).removeClass('hidden');
            angular.element(document.querySelector('#chart-loader')).addClass('hidden');
            $timeout(function () {
                angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).addClass('active');
            }, 0);
        }
    });

    var getCustomPeerGroupRankingData = function (rowData, RptName, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var rankingParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            CustPeerGroupName: $scope.Peer1,
            InstitutionKey: $scope.InstitutionKey,
            CustPeerGroupKey: custPeerGroupKey,
            Login: '',
            StandardPeerGroupName: selectedInstitution.stdPeerGroupCode,
            RptName: RptName,
            SortOrder: rowData.sortOrder
        };

        var req = {
            method: 'POST',
            url: '/api/RiskProfilesApi/GetRiskProfileRankingData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: rankingParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    $scope.RankingDataQtr = result.data.peerGroupRankDataQtr;
                    $scope.AverageDataQtr = result.data.peerGroupAverageDataQtr;
                    $scope.RankingDataYtd = result.data.peerGroupRankDataYtd;
                    $scope.AverageDataYtd = result.data.peerGroupAverageDataYtd;
                    for (i = 0; i < $scope.RankingDataQtr.length; i++) {
                        var rank = i + 1;
                        $scope.RankingDataQtr[i].rank = rank;
                    }

                    for (i = 0; i < $scope.RankingDataYtd.length; i++) {
                        rank = i + 1;
                        $scope.RankingDataYtd[i].rank = rank;
                    }

                    if ($scope.ActiveChartTab == 'QTD') {
                        $scope.AverageData = $scope.AverageDataQtr;
                        $scope.RankingData = $scope.RankingDataQtr;
                    }
                    else {
                        $scope.AverageData = $scope.AverageDataYtd;
                        $scope.RankingData = $scope.RankingDataYtd;
                    }

                    angular.element(document.querySelector('#averageTableSpinner')).html('');
                    angular.element(document.querySelector('#rankTableSpinner')).html('');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get ranking data and peer group averages. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.refreshChartAndRankingData = function ($event, rowData, chartType) {
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        clearChart();
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
        $scope.SelectedUBPRDesc = rowData.ubprConceptDesc;
        getCreditRiskChartData(rowData, chartType, $scope.Peer1Key);
        getCustomPeerGroupRankingData(rowData, chartType, $scope.Peer1Key);
        if ($scope.SelectedUBPRColId != '')
            angular.element(document.querySelector('#' + $scope.SelectedUBPRColId)).removeClass('active');
        angular.element(document.querySelector('#' + rowData.ubprConceptCode)).addClass('active');
        $scope.SelectedUBPRColId = rowData.ubprConceptCode;
    }

    var getCreditRiskChartData = function (rowData, chartType, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var creditRiskChartParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            InstitutionKey: $scope.InstitutionKey,
            CustPeerGroupName: $scope.Peer1,
            CustPeerGroupKey: custPeerGroupKey,
            StdPeerGroupName: selectedInstitution.stdPeerGroupCode,
            Login: '',
            RptName: chartType
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetBenchmarkChartData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: creditRiskChartParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    angular.element(document.querySelector('#chart-container')).removeClass('hidden');
                    angular.element(document.querySelector('#chart-loader')).addClass('hidden');
                    //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
                    $scope.QuarterlyChartData = result.data.quarterlyChartData;
                    $scope.YearlyChartData = result.data.yearlyChartData;

                    if ($scope.ActiveChartTab == 'QTD') {
                        angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
                        if (angular.element(document.querySelector('#strategicPeer1Toggle')).prop('checked') === false) {
                            var obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                            obj.visible = "0";
                        }

                        if (angular.element(document.querySelector('#strategicPeer2Toggle')).prop('checked') === false) {
                            obj = $scope.QuarterlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                            obj.visible = "0";
                        }
                        renderChart($scope.QuarterlyChartData, rowData.ubprConceptDesc);
                    }
                    else {
                        angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#yearlyChartData')).addClass('active');
                        if (angular.element(document.querySelector('#strategicPeer1Toggle')).prop('checked') === false) {
                            obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer1; })[0];
                            obj.visible = "0";
                        }

                        if (angular.element(document.querySelector('#strategicPeer2Toggle')).prop('checked') === false) {
                            obj = $scope.YearlyChartData.dataSetList.filter(function (el) { return el.seriesName === $scope.Peer2; })[0];
                            obj.visible = "0";
                        }
                        renderChart($scope.YearlyChartData, rowData.ubprConceptDesc);
                    }

                    angular.element(document.querySelector('#' + rowData.ubprConceptCode)).addClass('active');
                    $scope.SelectedUBPRColId = rowData.ubprConceptCode;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for chart. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var renderChart = function (chartData, ubprConceptDesc) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": ubprConceptDesc,
                    "showPlotBorder": "0",
                    "plotBorderAlpha": "0",
                    "subCaption": "",
                    "xAxisname": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "showBorder": "0",
                    "showValues": "0",
                    "paletteColors": "#003057,#008C48,#A71D23,#FFC207",
                    "bgColor": "#ffffff",
                    "showCanvasBorder": "0",
                    "canvasBgColor": "#ffffff",
                    "captionFontSize": "14",
                    "subcaptionFontSize": "14",
                    "subcaptionFontBold": "0",
                    "divlineColor": "#999999",
                    "divLineDashed": "1",
                    "divLineDashLen": "1",
                    "divLineGapLen": "1",
                    "showAlternateHGridColor": "1",
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
                    "exportEnabled": "1"
                },
                "categories": [
                    {
                        "category": chartData.categories.category.categoryLabels
                    }
                ],
                "dataset": chartData.dataSetList
            };

            var chartContainer = $('#chart-container');
            if (chartContainer != null) {
                var revenueChart = FusionCharts.items.benchmarkChart;
                if (typeof revenueChart === 'undefined') {
                    revenueChart = new FusionCharts({
                        type: 'mscombi2d',
                        id: 'benchmarkChart',
                        renderAt: 'chart-container',
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });
                    revenueChart.render();
                }
                else {
                    revenueChart.setChartData(dSource, 'json');
                    revenueChart.render();
                }
            } // if block ends here
        });
    }

    var getRiskProfileStrategicData = function (custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var riskProfileParams = {
            Institutionkey: $scope.InstitutionKey, //Will get user's tenant's institution on server
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey, //Need to be selected from a dropdown
            CustPeerGroupKey: custPeerGroupKey //Will get default custom peer group for logged in user on server
        };

        var req = {
            method: 'POST',
            url: '/api/BenchmarkApi/GetBenchmarkStrategicRiskData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: riskProfileParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    $scope.StEarningsAndProfitabilityQtd = result.data.riskProfileSections.earningsAndProfitabilityQtd;
                    $scope.StMarginAnalysisQtd = result.data.riskProfileSections.marginAnalysisQtd;
                    $scope.StGrowthRatesQtd = result.data.riskProfileSections.growthRatesQtd;
                    $scope.StCapitalRatiosQtd = result.data.riskProfileSections.capitalRatiosQtd;
                    $scope.StNonIncomeAndExpensesQtd = result.data.riskProfileSections.nonIncomeAndExpensesQtd;
                    $scope.StInterestRateRiskQtd = result.data.riskProfileSections.interestRateRiskQtd;

                    $scope.StEarningsAndProfitabilityYtd = result.data.riskProfileSections.earningsAndProfitabilityYtd;
                    $scope.StMarginAnalysis = result.data.riskProfileSections.marginAnalysisYtd;
                    $scope.StGrowthRates = result.data.riskProfileSections.growthRatesYtd;
                    $scope.StCapitalRatios = result.data.riskProfileSections.capitalRatiosYtd;
                    $scope.StNonIncomeAndExpensesYtd = result.data.riskProfileSections.nonIncomeAndExpensesYtd;
                    $scope.StInterestRateRiskYtd = result.data.riskProfileSections.interestRateRiskYtd;

                    if ($scope.ActiveChartTab === 'QTD') {
                        $scope.StEarningsAndProfitability = $scope.StEarningsAndProfitabilityQtd;
                        $scope.StMarginAnalysis = result.data.riskProfileSections.marginAnalysisQtd;
                        $scope.StGrowthRates = result.data.riskProfileSections.growthRatesQtd;
                        $scope.StCapitalRatios = result.data.riskProfileSections.capitalRatiosQtd;
                        $scope.StNonIncomeAndExpenses = $scope.StNonIncomeAndExpensesQtd;
                        $scope.StInterestRateRisk = $scope.StInterestRateRiskQtd;
                    }
                    else {
                        $scope.StEarningsAndProfitability = $scope.StEarningsAndProfitabilityYtd;
                        $scope.StMarginAnalysis = result.data.riskProfileSections.marginAnalysisYtd;
                        $scope.StGrowthRates = result.data.riskProfileSections.growthRatesYtd;
                        $scope.StCapitalRatios = result.data.riskProfileSections.capitalRatiosYtd;
                        $scope.StNonIncomeAndExpenses = $scope.StNonIncomeAndExpensesYtd;
                        $scope.StInterestRateRisk = $scope.StInterestRateRiskYtd;
                    }

                    if ($scope.StEarningsAndProfitability.length > 0) {
                        getCreditRiskChartData($scope.StEarningsAndProfitability[0], 'Strategic', custPeerGroupKey);
                        getCustomPeerGroupRankingData($scope.StEarningsAndProfitability[0], 'Strategic', custPeerGroupKey);
                        $scope.SelectedUBPRDesc = $scope.StEarningsAndProfitability[0].ubprConceptDesc;
                        $scope.SelectedUBPRColId = $scope.StEarningsAndProfitability[0].ubprConceptCode;
                    }

                    angular.element(document.querySelector('#strategicRiskDataLoader')).addClass('hidden');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for strategic risk. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    $scope.ExportToExcelbenchmarking = function () {
        $scope.exportDataBtn = true;
        document.getElementById('overlay').style.display = '';
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $scope.InstitutionKey;
        })[0];

        var riskProfileParams = {
            Institutionkey: $scope.InstitutionKey, //Will get user's tenant's institution on server
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey, //Need to be selected from a dropdown
            CustPeerGroupKey: $scope.Peer1Key, //Will get default custom peer group for logged in user on server
            Bank: $scope.Bank,
            ThresholdValue: $scope.ThresholdValue,
            Peer1: $scope.Peer1,
            Peer2: $scope.Peer2,
            PeerGroups: $scope.AllCustomPeerGroups
        };
        var req = {
            httpMethod: 'POST',
            checkInterval: 500,
            successCallback: function (url) {
                if (url === '/Account/Login') {
                    window.location.href = url;
                }

                document.getElementById('overlay').style.display = 'none';
                $scope.$apply(function () {
                    $scope.exportDataBtn = false;
                });
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
                $scope.$apply(function () {
                    $scope.exportDataBtn = false;
                });
            },
            data: riskProfileParams
        };
        $.fileDownload('/Api/BenchmarkApi/GetBenchmarkingExporttoExcel', req);
    }
    var cookieIntervalID = null;
    var getCookie = function (name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin === -1) {
            begin = dc.indexOf(prefix);
            if (begin !== 0) return null;
        }
        else {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end === -1) {
                end = dc.length;
            }
        }
        return unescape(dc.substring(begin + prefix.length, end));
    }

    var initialize = function () {
        getYearToDateHeaders();
        getQuarterToDateHeaders();
        getInstitutionList();

        $('#qtdYtdToggle').bootstrapToggle('off');
    }

    initialize();
}]);
