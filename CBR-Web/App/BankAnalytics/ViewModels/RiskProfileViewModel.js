cbrBankAnalyticsModule.controller("riskProfileViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope) {
    $scope.keyRiskTrendsSubTab = 'keyRiskTrendCreditRisk';
    $rootScope.ShowRiskProfileForInstitutionKey = 0;
    $rootScope.ShowRiskProfileForInstitutionName = '';
    $rootScope.ShowRiskProfileForPeerGroupKey = 0;
    $rootScope.ShowRiskProfileForPeerGroupName = '';
    $scope.Bank = '';
    $scope.Peer1 = '';
    $scope.Peer2 = '';
    $scope.Peer1Key = '';
    $scope.FDIC = '';

    $scope.Institutions = [];
    $scope.AllCustomPeerGroups = [];

    $scope.ToggleDataOnInstitutionChange = function ($event, institutionObj) {
        $scope.Bank = institutionObj.institutionName;
        $rootScope.ShowRiskProfileForInstitutionKey = institutionObj.institutionKey;
        $rootScope.ShowRiskProfileForInstitutionName = institutionObj.institutionName;
        if (institutionObj.stdPeerGroupCode !== null && institutionObj.stdPeerGroupCode !== '')
            $scope.Peer2 = 'UBPR Group ' + institutionObj.stdPeerGroupCode;
        else
            $scope.Peer2 = 'N/A';
        $scope.$broadcast('OnInstitutionChange', { institution: institutionObj });
        $scope.FDIC = institutionObj.fdicCert;
    }

    $scope.ToggleDataOnCustomPeerGroupChange = function ($event, peerGroup) {
        $rootScope.ShowRiskProfileForPeerGroupKey = peerGroup.key;
        $scope.Peer1 = peerGroup.name;
        $rootScope.ShowRiskProfileForPeerGroupName = peerGroup.name;
        $scope.Peer1Key = peerGroup.key;
        $scope.$broadcast('OnPeerGroupChange', { peergroup: peerGroup });
    }

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
                        var selectedInstitution = $scope.Institutions.filter(function (obj) {
                            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
                        })[0];

                        if (selectedInstitution.stdPeerGroupCode !== null && selectedInstitution.stdPeerGroupCode !== "")
                            $scope.Peer2 = 'UBPR Group ' + selectedInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';

                        $scope.FDIC = selectedInstitution.fdicCert;
                    }
                    else {
                        $scope.Bank = defaultInstitution.institutionName;
                        $scope.FDIC = defaultInstitution.fdicCert;
                        $rootScope.ShowRiskProfileForInstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionName = defaultInstitution.institutionName;
                        if (defaultInstitution.stdPeerGroupCode !== null && defaultInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + defaultInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }

                    getAllPeerGroupsForUser();
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).attr('disabled', '');
                    angular.element(document.querySelector('#creditRiskChangeBank')).attr('disabled', '');
                    angular.element(document.querySelector('#creditRiskDataLoader')).addClass('hidden');
                    angular.element(document.querySelector('#chart-container')).html('<span>No data available to render chart.</span>');
                    angular.element(document.querySelector('#averageTableSpinner')).html('<span>No data available to render comparison table.</span>');
                    angular.element(document.querySelector('#rankTableSpinner')).html('<span>No data available to render ranking table.</span>');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to castellonf@stifel.com.');
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
                if (result.data !== null && result.data.length > 0) {


                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).removeAttr('disabled');
                    $scope.AllCustomPeerGroups = result.data;
                    if ($rootScope.ShowRiskProfileForPeerGroupKey > 0) {
                        $scope.Peer1 = $rootScope.ShowRiskProfileForPeerGroupName;
                        $scope.Peer1Key = $rootScope.ShowRiskProfileForPeerGroupKey;
                        //getRiskProfileCreditRiskData($rootScope.ShowRiskProfileForPeerGroupKey);
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
                            //getRiskProfileCreditRiskData(defaultPeerGroup.key);
                        }
                        else {
                            $scope.Peer1 = $scope.AllCustomPeerGroups[0].name;
                            $scope.Peer1Key = $scope.AllCustomPeerGroups[0].key;
                            $rootScope.ShowRiskProfileForPeerGroupName = $scope.AllCustomPeerGroups[0].name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = $scope.AllCustomPeerGroups[0].key;
                            //getRiskProfileCreditRiskData($scope.AllCustomPeerGroups[0].key);
                        }
                    }
                }
                else {
                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).attr('disabled', '');
                    $scope.toggleSuccessMessageBoxModal('There are no custom peer groups. Please create custom peer groups by going to "Manage Profiles" screen.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    $scope.ToggleKeyRiskTrendSubTab = function (tabId) {
        if (tabId == 'keyRiskTrendCreditRisk') {
            angular.element(document.querySelector('#creditRiskLink')).addClass('active');
            angular.element(document.querySelector('#interestRateRiskLink')).removeClass('active');
            angular.element(document.querySelector('#liquidityRiskLink')).removeClass('active');
            angular.element(document.querySelector('#strategicRiskLink')).removeClass('active');
        }
        else if (tabId == 'keyRiskTrendInterestRateRisk') {
            angular.element(document.querySelector('#creditRiskLink')).removeClass('active');
            angular.element(document.querySelector('#interestRateRiskLink')).addClass('active');
            angular.element(document.querySelector('#liquidityRiskLink')).removeClass('active');
            angular.element(document.querySelector('#strategicRiskLink')).removeClass('active');
        }
        else if (tabId == 'keyRiskTrendLiquidityRisk') {
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

        $scope.keyRiskTrendsSubTab = tabId;
    }

    $scope.ChangeScreen = function (templateId) {
        $rootScope.ShowRiskProfileForInstitutionKey = 0;
        $rootScope.ShowRiskProfileForInstitutionName = '';
        $rootScope.ShowRiskProfileForPeerGroupKey = 0;
        $rootScope.ShowRiskProfileForPeerGroupName = '';
        window.location.href = '/';
    }

    $scope.ExportToExcelKeyRiskProfile = function () {
        document.getElementById('overlay').style.display = '';
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var riskProfileParams = {
            InstitutionKey: $rootScope.ShowRiskProfileForInstitutionKey,
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey, //Need to be selected from a dropdown
            CustPeerGroupKey: $scope.Peer1Key, //Will get default custom peer group for logged in user on server
            Bank: $scope.Bank,
            Peer1: $scope.Peer1,
            Peer2: $scope.Peer2,
            PeerGroups: $scope.AllCustomPeerGroups
        };
        var req = {
            httpMethod: 'POST',
            checkInterval: 500,
            successCallback: function (url) {
                if (url === '/Account/Login') {
                    window.location.href = result.data;
                }
                document.getElementById('overlay').style.display = 'none';
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
            },
            data: riskProfileParams
        };
        $.fileDownload('/Api/RiskProfilesApi/GetKeyRiskTrendsExporttoExcel', req);
    }

    $scope.QtdYtdToggle = function () {
        $scope.$broadcast("OnQtdYtdToggle", { state: angular.element(document.querySelector('#qtdYtdToggle')).prop('checked') });
    }

    var initialize = function () {
        getInstitutionList();
        $('#qtdYtdToggle').bootstrapToggle({
            on: 'QTD',
            off: 'YTD'
        });
    }

    initialize();
}]);


cbrBankAnalyticsModule.controller("riskProfileCreditRiskViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.CrSummaryRatios = [];
    $scope.CrYieldAndCosts = [];
    $scope.CrOffBalanceSheetItems = [];
    $scope.CrCreditAllowance = [];
    $scope.CrLoanMix = [];
    $scope.CrConcentrationOfCredit = [];
    $scope.CrCommercialRealEstate = [];
    $scope.CrPastDueAndNonAccrual = [];

    $scope.AllCustomPeerGroups = [];
    $scope.Bank = '';
    $scope.Peer1 = '';
    $scope.Peer2 = '';
    $scope.Peer1Key = '';
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
    $scope.YtdRankTableHeaders = [];
    $scope.YtdAverageTableHeaders = [];
    $scope.QtrRankTableHeaders = [];
    $scope.QtrAverageTableHeaders = [];
    $scope.RankTableHeaders = [];
    $scope.AverageTableHeaders = [];
    $scope.Institutions = [];

    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

    $scope.HighlightDefaultBank = function (rankData) {
        var highlighter = '';
        if (rankData.isDefault === true)
            highlighter = 'highlightDefaultBank';

        return highlighter;
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
            clearChart();
            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
        }
        else {
            $scope.ActiveChartTab = 'QTD';
            angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
            angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataQtr;
            $scope.RankingData = $scope.RankingDataQtr;
            $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
            $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;
            clearChart();
            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
        }
    });

    $scope.$on('OnInstitutionChange', function (event, opt) {
        $scope.Bank = opt.institution.institutionName;
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
        $rootScope.ShowRiskProfileForInstitutionKey = opt.institution.institutionKey;
        $rootScope.ShowRiskProfileForInstitutionName = opt.institution.institutionName;
        if (opt.institution.stdPeerGroupCode !== null && opt.institution.stdPeerGroupCode !== '')
            $scope.Peer2 = 'UBPR Group ' + opt.institution.stdPeerGroupCode;
        else
            $scope.Peer2 = 'N/A';

        clearChart();
        getRiskProfileCreditRiskData($scope.Peer1Key);
    });

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
        clearChart();
        $scope.Peer1 = opt.peergroup.name;
        $rootScope.ShowRiskProfileForPeerGroupName = opt.peergroup.name;
        $scope.Peer1Key = opt.peergroup.key;
        getRiskProfileCreditRiskData(opt.peergroup.key);
    });

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
                        var selectedInstitution = $scope.Institutions.filter(function (obj) {
                            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
                        })[0];

                        if (selectedInstitution.stdPeerGroupCode !== null && selectedInstitution.stdPeerGroupCode !== "")
                            $scope.Peer2 = 'UBPR Group ' + selectedInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }
                    else {
                        $scope.Bank = defaultInstitution.institutionName;
                        $rootScope.ShowRiskProfileForInstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionName = defaultInstitution.institutionName;
                        if (defaultInstitution.stdPeerGroupCode !== null && defaultInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + defaultInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }

                    getAllPeerGroupsForUser();
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).attr('disabled', '');
                    angular.element(document.querySelector('#creditRiskChangeBank')).attr('disabled', '');
                    angular.element(document.querySelector('#creditRiskDataLoader')).addClass('hidden');
                    angular.element(document.querySelector('#chart-container')).html('<span>No data available to render chart.</span>');
                    angular.element(document.querySelector('#averageTableSpinner')).html('<span>No data available to render comparison table.</span>');
                    angular.element(document.querySelector('#rankTableSpinner')).html('<span>No data available to render ranking table.</span>');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to castellonf@stifel.com.');
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

    $scope.Ok = function ($event, boxType) {
        if (boxType === 'Success') {
            $scope.toggleSuccessMessageBoxModal('');
        }
        else {
            $scope.toggleErrorMessageBoxModal('');
        }
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
                        getRiskProfileCreditRiskData($rootScope.ShowRiskProfileForPeerGroupKey);
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
                            getRiskProfileCreditRiskData(defaultPeerGroup.key);
                        }
                        else {
                            $scope.Peer1 = $scope.AllCustomPeerGroups[0].name;
                            $scope.Peer1Key = $scope.AllCustomPeerGroups[0].key;
                            $rootScope.ShowRiskProfileForPeerGroupName = $scope.AllCustomPeerGroups[0].name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = $scope.AllCustomPeerGroups[0].key;
                            getRiskProfileCreditRiskData($scope.AllCustomPeerGroups[0].key);
                        }
                    }
                }
                else {
                    angular.element(document.querySelector('#creditRiskChangePeerGroup')).attr('disabled', '');
                    $scope.toggleSuccessMessageBoxModal('There are no custom peer groups. Please create custom peer groups by going to "Manage Profiles" screen.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to castellonf@stifel.com.');
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
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for YTD table. Please send an e-mail to castellonf@stifel.com.');
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
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headerrs for QTD table. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var clearChart = function () {
        angular.element(document.querySelector('#chart-container')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
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
            clearChart();
            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
        }
        else {
            $scope.ActiveChartTab = 'YTD';
            angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
            angular.element(document.querySelector('#yearlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataYtd;
            $scope.RankingData = $scope.RankingDataYtd;
            $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
            $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;
            clearChart();
            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
        }
    }

    var getCustomPeerGroupRankingData = function (rowData, RptName, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var rankingParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            CustPeerGroupName: $scope.Peer1,
            InstitutionKey: $rootScope.ShowRiskProfileForInstitutionKey,
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
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get ranking data and peer group averages. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var getRiskProfileCreditRiskData = function (custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var riskProfileParams = {
            InstitutionKey: $rootScope.ShowRiskProfileForInstitutionKey, //Will get user's tenant's institution on server
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey,
            CustPeerGroupKey: custPeerGroupKey //Will get default custom peer group for logged in user on server
        };

        var req = {
            method: 'POST',
            url: '/api/RiskProfilesApi/GetRiskProfileCreditRiskData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: riskProfileParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.CrSummaryRatios = result.data.riskProfileSections.summaryRatios;
                    $scope.CrYieldAndCosts = result.data.riskProfileSections.yieldAndCost;
                    $scope.CrOffBalanceSheetItems = result.data.riskProfileSections.offBalanceSheetCreditRisk;
                    $scope.CrCreditAllowance = result.data.riskProfileSections.creditAllowance;
                    $scope.CrLoanMix = result.data.riskProfileSections.loanMix;
                    $scope.CrConcentrationOfCredit = result.data.riskProfileSections.crConcentrationOfCredit;
                    $scope.CrCommercialRealEstate = result.data.riskProfileSections.commercialRealEstate;
                    $scope.CrPastDueAndNonAccrual = result.data.riskProfileSections.pastDue;
                    if ($scope.CrSummaryRatios.length > 0) {
                        getCreditRiskChartData($scope.CrSummaryRatios[0], 'CreditRisk', custPeerGroupKey);
                        getCustomPeerGroupRankingData($scope.CrSummaryRatios[0], 'CreditRisk', custPeerGroupKey);
                        $scope.SelectedUBPRDesc = $scope.CrSummaryRatios[0].ubprConceptDesc;
                    }
                    angular.element(document.querySelector('#creditRiskDataLoader')).addClass('hidden');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for credit risk. Please send an e-mail to castellonf@stifel.com.');
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
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var creditRiskChartParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            InstitutionKey: $rootScope.ShowRiskProfileForInstitutionKey,
            CustPeerGroupName: $scope.Peer1,
            CustPeerGroupKey: custPeerGroupKey,
            StdPeerGroupName: selectedInstitution.stdPeerGroupCode,
            Login: '',
            RptName: chartType
        };

        var req = {
            method: 'POST',
            url: '/api/RiskProfilesApi/GetRiskProfileChartData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: creditRiskChartParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {


                    //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
                    $scope.QuarterlyChartData = result.data.quarterlyChartData;
                    $scope.YearlyChartData = result.data.yearlyChartData;

                    if ($scope.ActiveChartTab == 'QTD') {
                        angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
                        renderChart($scope.QuarterlyChartData, rowData.ubprConceptDesc);
                    }
                    else {
                        angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#yearlyChartData')).addClass('active');
                        renderChart($scope.YearlyChartData, rowData.ubprConceptDesc);
                    }
                    angular.element(document.querySelector('#' + rowData.ubprConceptCode)).addClass('active');
                    $scope.SelectedUBPRColId = rowData.ubprConceptCode;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for chart data. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var renderChart = function (chartData, ubprConceptDesc) {
        FusionCharts.ready(function () {
            var chartContainer = $('#chart-container');
            if (chartContainer !== null) {
                var revenueChart = new FusionCharts({
                    type: 'mscombi2d',
                    renderAt: 'chart-container',
                    width: '100%',
                    height: '250',
                    dataFormat: 'json',
                    dataSource: {
                        "chart": {
                            "caption": ubprConceptDesc,
                            "showPlotBorder": "0",
                            "plotBorderAlpha": "0",
                            "showValues": "0",
                            "paletteColors": "#003057,#008C48,#A71D23",
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
                    }
                });
                revenueChart.render();
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
    var initialize = function () {
        getYearToDateHeaders();
        getQuarterToDateHeaders();
        getInstitutionList();
        $('#qtdYtdToggle').bootstrapToggle('off');
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("riskProfileInterestRateRiskViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.IrrYieldAndCosts = [];
    $scope.IrrOffBalanceSheetItems = [];
    $scope.IrrInterestRateRiskItems = [];

    $scope.AllCustomPeerGroups = [];
    $scope.Bank = '';
    $scope.Peer1 = '';
    $scope.Peer2 = '';
    $scope.Peer1Key = '';
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
    $scope.YtdRankTableHeaders = [];
    $scope.YtdAverageTableHeaders = [];
    $scope.QtrRankTableHeaders = [];
    $scope.QtrAverageTableHeaders = [];
    $scope.RankTableHeaders = [];
    $scope.AverageTableHeaders = [];
    $scope.SelectedUBPRColId = '';
    $scope.Institutions = [];

    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

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
                if (result.data !== null) {


                    $scope.Institutions = result.data;
                    var defaultInstitution = $scope.Institutions.filter(function (obj) {
                        return obj.isDefault === true;
                    })[0];

                    if ($rootScope.ShowRiskProfileForInstitutionKey > 0) {
                        $scope.Bank = $rootScope.ShowRiskProfileForInstitutionName;
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
                        $rootScope.ShowRiskProfileForInstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionName = defaultInstitution.institutionName;
                        if (defaultInstitution.stdPeerGroupCode !== null && defaultInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + defaultInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }

                    getAllPeerGroupsForUser();
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                    angular.element(document.querySelector('#interestRateRiskChangePeerGroup')).attr('disabled', '');
                    angular.element(document.querySelector('#interestRateRiskChangeBank')).attr('disabled', '');
                    angular.element(document.querySelector('#interestRateRiskDataLoader')).addClass('hidden');
                    angular.element(document.querySelector('#chart-container')).html('<span>No data available to render chart.</span>');
                    angular.element(document.querySelector('#averageTableSpinner')).html('<span>No data available to render comparison table.</span>');
                    angular.element(document.querySelector('#rankTableSpinner')).html('<span>No data available to render ranking table.</span>');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    $scope.HighlightDefaultBank = function (rankData) {
        var highlighter = '';
        if (rankData.isDefault === true)
            highlighter = 'highlightDefaultBank';

        return highlighter;
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
            clearChart();
            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
        }
        else {
            $scope.ActiveChartTab = 'QTD';
            angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
            angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataQtr;
            $scope.RankingData = $scope.RankingDataQtr;
            $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
            $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;
            clearChart();
            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
        }
    });

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

    $scope.$on('OnInstitutionChange', function (event, opt) {
        $scope.Bank = opt.institution.institutionName;
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
        $scope.SelectedUBPRColId = '';
        $rootScope.ShowRiskProfileForInstitutionKey = opt.institution.institutionKey;
        $rootScope.ShowRiskProfileForInstitutionName = opt.institution.institutionName;
        if (opt.institution.stdPeerGroupCode !== null && opt.institution.stdPeerGroupCode !== '')
            $scope.Peer2 = 'UBPR Group ' + opt.institution.stdPeerGroupCode;
        else
            $scope.Peer2 = 'N/A';
        clearChart();
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


                    angular.element(document.querySelector('#interestRateRiskChangePeerGroup')).removeAttr('disabled');
                    $scope.AllCustomPeerGroups = result.data;
                    if ($rootScope.ShowRiskProfileForPeerGroupKey > 0) {
                        $scope.Peer1 = $rootScope.ShowRiskProfileForPeerGroupName;
                        $scope.Peer1Key = $rootScope.ShowRiskProfileForPeerGroupKey;
                        getRiskProfileIrrData($rootScope.ShowRiskProfileForPeerGroupKey);
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
                            getRiskProfileIrrData(defaultPeerGroup.key);
                        }
                        else {
                            $scope.Peer1 = $scope.AllCustomPeerGroups[0].name;
                            $scope.Peer1Key = $scope.AllCustomPeerGroups[0].key;
                            $rootScope.ShowRiskProfileForPeerGroupName = $scope.AllCustomPeerGroups[0].name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = $scope.AllCustomPeerGroups[0].key;
                            getRiskProfileIrrData($scope.AllCustomPeerGroups[0].key);
                        }
                    }
                }
                else {
                    angular.element(document.querySelector('#interestRateRiskChangePeerGroup')).attr('disabled', '');
                    $scope.toggleSuccessMessageBoxModal('There are no custom peer groups. Please create custom peer groups by going to "Manage Profiles" screen.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to castellonf@stifel.com.');
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
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for YTD table. Please send an e-mail to castellonf@stifel.com.');
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
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headerrs for QTD table. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var clearChart = function () {
        angular.element(document.querySelector('#chart-container')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
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
            clearChart();
            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
        }
        else {
            $scope.ActiveChartTab = 'YTD';
            angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
            angular.element(document.querySelector('#yearlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataYtd;
            $scope.RankingData = $scope.RankingDataYtd;
            $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
            $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;
            clearChart();
            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
        }
    }

    var getCustomPeerGroupRankingData = function (rowData, RptName, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var rankingParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            CustPeerGroupName: $scope.Peer1,
            Institutionkey: $rootScope.ShowRiskProfileForInstitutionKey,
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
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get ranking data and peer group averages. Please send an e-mail to castellonf@stifel.com.');
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
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var creditRiskChartParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            InstitutionKey: $rootScope.ShowRiskProfileForInstitutionKey,
            CustPeerGroupName: $scope.Peer1,
            CustPeerGroupKey: custPeerGroupKey,
            StdPeerGroupName: selectedInstitution.stdPeerGroupCode,
            Login: '',
            RptName: chartType
        };

        var req = {
            method: 'POST',
            url: '/api/RiskProfilesApi/GetRiskProfileChartData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: creditRiskChartParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {


                    //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
                    $scope.QuarterlyChartData = result.data.quarterlyChartData;
                    $scope.YearlyChartData = result.data.yearlyChartData;

                    if ($scope.ActiveChartTab == 'QTD') {
                        angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
                        renderChart($scope.QuarterlyChartData, rowData.ubprConceptDesc);
                    }
                    else {
                        angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#yearlyChartData')).addClass('active');
                        renderChart($scope.YearlyChartData, rowData.ubprConceptDesc);
                    }
                    angular.element(document.querySelector('#' + rowData.ubprConceptCode)).addClass('active');
                    $scope.SelectedUBPRColId = rowData.ubprConceptCode;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for chart data. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var renderChart = function (chartData, ubprConceptDesc) {
        FusionCharts.ready(function () {
            var chartContainer = $('#chart-container');
            if (chartContainer != null) {
                var revenueChart = new FusionCharts({
                    type: 'mscombi2d',
                    renderAt: 'chart-container',
                    width: '100%',
                    height: '250',
                    dataFormat: 'json',
                    dataSource: {
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
                            "paletteColors": "#003057,#008C48,#A71D23",
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
                    }
                });
                revenueChart.render();
            } // if block ends here
        });
    }

    var getRiskProfileIrrData = function (custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var riskProfileParams = {
            InstitutionKey: $rootScope.ShowRiskProfileForInstitutionKey,
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey, //Need to be selected from a dropdown
            CustPeerGroupKey: custPeerGroupKey //Will get default custom peer group for logged in user on server
        };

        var req = {
            method: 'POST',
            url: '/api/RiskProfilesApi/GetRiskProfileInterestRiskData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: riskProfileParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {


                    $scope.IrrYieldAndCosts = result.data.riskProfileSections.yieldAndCost;
                    $scope.IrrOffBalanceSheetItems = result.data.riskProfileSections.offBalanceSheetIRrisk;
                    $scope.IrrInterestRateRiskItems = result.data.riskProfileSections.interestRateRiskItems;
                    if ($scope.IrrYieldAndCosts.length > 0) {
                        getCreditRiskChartData($scope.IrrYieldAndCosts[0], 'IRR', custPeerGroupKey);
                        getCustomPeerGroupRankingData($scope.IrrYieldAndCosts[0], 'IRR', custPeerGroupKey);
                        $scope.SelectedUBPRDesc = $scope.IrrYieldAndCosts[0].ubprConceptDesc;
                    }
                    angular.element(document.querySelector('#interestRateRiskDataLoader')).addClass('hidden');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for interest rate risk. Please send an e-mail to castellonf@stifel.com.');
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
    var initialize = function () {
        getYearToDateHeaders();
        getQuarterToDateHeaders();
        getInstitutionList();
        $('#qtdYtdToggle').bootstrapToggle('off');
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("riskProfileLiquidityRiskViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.LiqLiquidityAndFunding = [];
    $scope.LiqLiquidityInvestmentPortfolio = [];
    $scope.LiqLiquiditySecurityRatios = [];
    $scope.LiqOffBalanceSheetItems = [];
    $scope.LiqConcentrationOfCredit = [];
    $scope.LiqCapitalAnalysis = [];
    $scope.LiqKeyLiquidityRatios = [];

    $scope.AllCustomPeerGroups = [];
    $scope.Bank = '';
    $scope.Peer1 = '';
    $scope.Peer2 = '';
    $scope.Peer1Key = '';
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
    $scope.YtdRankTableHeaders = [];
    $scope.YtdAverageTableHeaders = [];
    $scope.QtrRankTableHeaders = [];
    $scope.QtrAverageTableHeaders = [];
    $scope.RankTableHeaders = [];
    $scope.AverageTableHeaders = [];
    $scope.SelectedUBPRColId = '';
    $scope.Institutions = [];

    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

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
                        $rootScope.ShowRiskProfileForInstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionName = defaultInstitution.institutionName;
                        if (defaultInstitution.stdPeerGroupCode !== null && defaultInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + defaultInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }

                    getAllPeerGroupsForUser();
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                    angular.element(document.querySelector('#liquidityRiskChangePeerGroup')).attr('disabled', '');
                    angular.element(document.querySelector('#liquidityRiskChangeBank')).attr('disabled', '');
                    angular.element(document.querySelector('#liquidityRiskDataLoader')).addClass('hidden');
                    angular.element(document.querySelector('#chart-container')).html('<span>No data available to render chart.</span>');
                    angular.element(document.querySelector('#averageTableSpinner')).html('<span>No data available to render comparison table.</span>');
                    angular.element(document.querySelector('#rankTableSpinner')).html('<span>No data available to render ranking table.</span>');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    $scope.HighlightDefaultBank = function (rankData) {
        var highlighter = '';
        if (rankData.isDefault === true)
            highlighter = 'highlightDefaultBank';

        return highlighter;
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

    $scope.$on('OnInstitutionChange', function (event, opt) {
        $scope.Bank = opt.institution.institutionName;
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#interestRateRiskDataLoader')).removeClass('hidden');
        $scope.LiqLiquidityAndFunding = [];
        $scope.LiqLiquidityInvestmentPortfolio = [];
        $scope.LiqKeyLiquidityRatios = [];
        $scope.LiqLiquiditySecurityRatios = [];
        $scope.LiqOffBalanceSheetItems = [];
        $scope.LiqConcentrationOfCredit = [];
        $scope.LiqCapitalAnalysis = [];
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        $scope.SelectedUBPRColId = '';
        $rootScope.ShowRiskProfileForInstitutionKey = opt.institution.institutionKey;
        $rootScope.ShowRiskProfileForInstitutionName = opt.institution.institutionName;
        if (opt.institution.stdPeerGroupCode !== null && opt.institution.stdPeerGroupCode !== '')
            $scope.Peer2 = 'UBPR Group ' + opt.institution.stdPeerGroupCode;
        else
            $scope.Peer2 = 'N/A';
        clearChart();
        getRiskProfileLiquidityData($scope.Peer1Key);
    });

    $scope.$on('OnPeerGroupChange', function (event, opt) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#liquidityRiskDataLoader')).removeClass('hidden');
        $scope.LiqLiquidityAndFunding = [];
        $scope.LiqLiquidityInvestmentPortfolio = [];
        $scope.LiqKeyLiquidityRatios = [];
        $scope.LiqLiquiditySecurityRatios = [];
        $scope.LiqOffBalanceSheetItems = [];
        $scope.LiqConcentrationOfCredit = [];
        $scope.LiqCapitalAnalysis = [];
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
                        getRiskProfileLiquidityData($rootScope.ShowRiskProfileForPeerGroupKey);
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
                            getRiskProfileLiquidityData(defaultPeerGroup.key);
                        }
                        else {
                            $scope.Peer1 = $scope.AllCustomPeerGroups[0].name;
                            $scope.Peer1Key = $scope.AllCustomPeerGroups[0].key;
                            $rootScope.ShowRiskProfileForPeerGroupName = $scope.AllCustomPeerGroups[0].name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = $scope.AllCustomPeerGroups[0].key;
                            getRiskProfileLiquidityData($scope.AllCustomPeerGroups[0].key);
                        }
                    }
                }
                else {
                    angular.element(document.querySelector('#liquidityRiskChangePeerGroup')).attr('disabled', '');
                    $scope.toggleSuccessMessageBoxModal('There are no custom peer groups. Please create custom peer groups by going to "Manage Profiles" screen.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to castellonf@stifel.com.');
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
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for YTD table. Please send an e-mail to castellonf@stifel.com.');
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
            if ($scope.ActiveChartTab === 'QTD') {
                $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
                $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headerrs for QTD table. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var clearChart = function () {
        angular.element(document.querySelector('#chart-container')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
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
            clearChart();
            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
        }
        else {
            $scope.ActiveChartTab = 'QTD';
            angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
            angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataQtr;
            $scope.RankingData = $scope.RankingDataQtr;
            $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
            $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;
            clearChart();
            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
        }
    });

    $scope.ToggleChartTab = function ($event, chartToShow) {
        if (chartToShow == 'QTD') {
            $scope.ActiveChartTab = 'QTD';
            angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
            angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataQtr;
            $scope.RankingData = $scope.RankingDataQtr;
            $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
            $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;
            clearChart();
            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
        }
        else {
            $scope.ActiveChartTab = 'YTD';
            angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
            angular.element(document.querySelector('#yearlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataYtd;
            $scope.RankingData = $scope.RankingDataYtd;
            $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
            $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;
            clearChart();
            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
        }
    }

    var getCustomPeerGroupRankingData = function (rowData, RptName, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var rankingParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            CustPeerGroupName: $scope.Peer1,
            Institutionkey: $rootScope.ShowRiskProfileForInstitutionKey,
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
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get ranking data and peer group averages. Please send an e-mail to castellonf@stifel.com.');
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
        console.log(rowData.ubprConceptCode);
    }

    var getCreditRiskChartData = function (rowData, chartType, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var creditRiskChartParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            InstitutionKey: $rootScope.ShowRiskProfileForInstitutionKey,
            CustPeerGroupName: $scope.Peer1,
            CustPeerGroupKey: custPeerGroupKey,
            StdPeerGroupName: selectedInstitution.stdPeerGroupCode,
            Login: '',
            RptName: chartType
        };

        var req = {
            method: 'POST',
            url: '/api/RiskProfilesApi/GetRiskProfileChartData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: creditRiskChartParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {


                    //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
                    $scope.QuarterlyChartData = result.data.quarterlyChartData;
                    $scope.YearlyChartData = result.data.yearlyChartData;

                    if ($scope.ActiveChartTab == 'QTD') {
                        angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
                        renderChart($scope.QuarterlyChartData, rowData.ubprConceptDesc);
                    }
                    else {
                        angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#yearlyChartData')).addClass('active');
                        renderChart($scope.YearlyChartData, rowData.ubprConceptDesc);
                    }

                    angular.element(document.querySelector('#' + rowData.ubprConceptCode)).addClass('active');
                    $scope.SelectedUBPRColId = rowData.ubprConceptCode;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for chart data. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var renderChart = function (chartData, ubprConceptDesc) {
        FusionCharts.ready(function () {
            var chartContainer = $('#chart-container');
            if (chartContainer != null) {
                var revenueChart = new FusionCharts({
                    type: 'mscombi2d',
                    renderAt: 'chart-container',
                    width: '100%',
                    height: '250',
                    dataFormat: 'json',
                    dataSource: {
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
                            "paletteColors": "#003057,#008C48,#A71D23",
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
                    }
                });
                revenueChart.render();
            } // if block ends here
        });
    }

    var getRiskProfileLiquidityData = function (custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var riskProfileParams = {
            InstitutionKey: $rootScope.ShowRiskProfileForInstitutionKey,
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey, //Need to be selected from a dropdown
            CustPeerGroupKey: custPeerGroupKey //Will get default custom peer group for logged in user on server
        };

        var req = {
            method: 'POST',
            url: '/api/RiskProfilesApi/GetRiskProfileLiquidityRiskData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: riskProfileParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.LiqLiquidityAndFunding = result.data.riskProfileSections.liquidityAndFunding;
                    $scope.LiqLiquidityInvestmentPortfolio = result.data.riskProfileSections.liquidityInvestmentPortfolio;
                    $scope.LiqKeyLiquidityRatios = result.data.riskProfileSections.keyLiquidityRatios;
                    $scope.LiqLiquiditySecurityRatios = result.data.riskProfileSections.liquiditySecurityRatios;
                    $scope.LiqOffBalanceSheetItems = result.data.riskProfileSections.offBalanceSheetLIPRrisk;
                    $scope.LiqConcentrationOfCredit = result.data.riskProfileSections.concentrationOfCredit;
                    $scope.LiqCapitalAnalysis = result.data.riskProfileSections.capitalAnalysis;
                    if ($scope.LiqLiquidityAndFunding.length > 0) {
                        getCreditRiskChartData($scope.LiqLiquidityAndFunding[0], 'LIQPrice', custPeerGroupKey);
                        getCustomPeerGroupRankingData($scope.LiqLiquidityAndFunding[0], 'LIQPrice', custPeerGroupKey);
                        $scope.SelectedUBPRDesc = $scope.LiqLiquidityAndFunding[0].ubprConceptDesc;
                    }

                    angular.element(document.querySelector('#liquidityRiskDataLoader')).addClass('hidden');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for liquidity and price risk. Please send an e-mail to castellonf@stifel.com.');
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
    var initialize = function () {
        getYearToDateHeaders();
        getQuarterToDateHeaders();
        getInstitutionList();
        $('#qtdYtdToggle').bootstrapToggle('off');
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("riskProfileStrategicRiskViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.StEarningsAndProfitability = [];
    $scope.StNonIncomeAndExpenses = [];
    $scope.CapitalRatios = [];
    $scope.StInterestRateRisk = [];
    $scope.StMarginAnalysis = [];
    $scope.StGrowthRates = [];

    $scope.SelectedUBPRColId = '';

    $scope.AllCustomPeerGroups = [];
    $scope.Bank = '';
    $scope.Peer1 = '';
    $scope.Peer2 = '';
    $scope.Peer1Key = '';
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
    $scope.YtdRankTableHeaders = [];
    $scope.YtdAverageTableHeaders = [];
    $scope.QtrRankTableHeaders = [];
    $scope.QtrAverageTableHeaders = [];
    $scope.RankTableHeaders = [];
    $scope.AverageTableHeaders = [];
    $scope.SelectedUBPRColId = '';
    $scope.Institutions = [];

    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

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
                        $rootScope.ShowRiskProfileForInstitutionKey = defaultInstitution.institutionKey;
                        $rootScope.ShowRiskProfileForInstitutionName = defaultInstitution.institutionName;
                        if (defaultInstitution.stdPeerGroupCode !== null && defaultInstitution.stdPeerGroupCode !== '')
                            $scope.Peer2 = 'UBPR Group ' + defaultInstitution.stdPeerGroupCode;
                        else
                            $scope.Peer2 = 'N/A';
                    }

                    getAllPeerGroupsForUser();
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                    angular.element(document.querySelector('#strategicRiskChangePeerGroup')).attr('disabled', '');
                    angular.element(document.querySelector('#strategicRiskChangeBank')).attr('disabled', '');
                    angular.element(document.querySelector('#strategicRiskDataLoader')).addClass('hidden');
                    angular.element(document.querySelector('#chart-container')).html('<span>No data available to render chart.</span>');
                    angular.element(document.querySelector('#averageTableSpinner')).html('<span>No data available to render comparison table.</span>');
                    angular.element(document.querySelector('#rankTableSpinner')).html('<span>No data available to render ranking table.</span>');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    $scope.HighlightDefaultBank = function (rankData) {
        var highlighter = '';
        if (rankData.isDefault === true)
            highlighter = 'highlightDefaultBank';

        return highlighter;
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

    $scope.BindRankTableHeader = function (header) {
        if (header.label === 'Institution Name' || header.label == '#')
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
        else if (isNaN(numericValue))
            return 'N/A';
        else
            return $filter('number')(numericValue, fractionSize);
    }

    $scope.GoToBankProfile = function ($event, rankDataObj) {
        $rootScope.ShowBankProfileForInstitutionKey = rankDataObj.institutionKey;
        $rootScope.template = 'ProfileOverview';
    }

    $scope.$on('OnInstitutionChange', function (event, opt) {
        $scope.Bank = opt.institution.institutionName;
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#interestRateRiskDataLoader')).removeClass('hidden');
        $scope.StEarningsAndProfitability = [];
        $scope.StNonIncomeAndExpenses = [];
        $scope.CapitalRatios = [];
        $scope.StInterestRateRisk = [];
        $scope.StMarginAnalysis = [];
        $scope.StGrowthRates = [];
        $scope.RankingDataQtr = [];
        $scope.AverageDataQtr = [];
        $scope.RankingDataYtd = [];
        $scope.AverageDataYtd = [];
        $scope.AverageData = [];
        $scope.RankingData = [];
        $scope.SelectedUBPRColId = '';
        $rootScope.ShowRiskProfileForInstitutionKey = opt.institution.institutionKey;
        $rootScope.ShowRiskProfileForInstitutionName = opt.institution.institutionName;
        if (opt.institution.stdPeerGroupCode !== null && opt.institution.stdPeerGroupCode !== '')
            $scope.Peer2 = 'UBPR Group ' + opt.institution.stdPeerGroupCode;
        else
            $scope.Peer2 = 'N/A';
        clearChart();
        getRiskProfileStrategicData($scope.Peer1Key);
    });

    $scope.$on('OnPeerGroupChange', function (event, opt) {
        //angular.element(document.querySelector('#chartUbprDesc')).html('<strong></strong>');
        angular.element(document.querySelector('#averageTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#rankTableSpinner')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#strategicRiskDataLoader')).removeClass('hidden');
        $scope.StEarningsAndProfitability = [];
        $scope.StNonIncomeAndExpenses = [];
        $scope.CapitalRatios = [];
        $scope.StInterestRateRisk = [];
        $scope.StMarginAnalysis = [];
        $scope.StGrowthRates = [];
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


                    angular.element(document.querySelector('#strategicRiskChangePeerGroup')).removeAttr('disabled');
                    $scope.AllCustomPeerGroups = result.data;
                    if ($rootScope.ShowRiskProfileForPeerGroupKey > 0) {
                        $scope.Peer1 = $rootScope.ShowRiskProfileForPeerGroupName;
                        $scope.Peer1Key = $rootScope.ShowRiskProfileForPeerGroupKey;
                        getRiskProfileStrategicData($rootScope.ShowRiskProfileForPeerGroupKey);
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
                            getRiskProfileStrategicData(defaultPeerGroup.key);
                        }
                        else {
                            $scope.Peer1 = $scope.AllCustomPeerGroups[0].name;
                            $scope.Peer1Key = $scope.AllCustomPeerGroups[0].key;
                            $rootScope.ShowRiskProfileForPeerGroupName = $scope.AllCustomPeerGroups[0].name;
                            $rootScope.ShowRiskProfileForPeerGroupKey = $scope.AllCustomPeerGroups[0].key;
                            getRiskProfileStrategicData($scope.AllCustomPeerGroups[0].key);
                        }
                    }
                }
                else {
                    angular.element(document.querySelector('#strategicRiskChangePeerGroup')).attr('disabled', '');
                    $scope.toggleSuccessMessageBoxModal('There are no custom peer groups. Please create custom peer groups by going to "Manage Profiles" screen.');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch custom peer groups. Please send an e-mail to castellonf@stifel.com.');
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
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for YTD table. Please send an e-mail to castellonf@stifel.com.');
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
            if ($scope.ActiveChartTab === 'QTD') {
                $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
                $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to fetch headers for QTD table. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var clearChart = function () {
        angular.element(document.querySelector('#chart-container')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
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
            clearChart();
            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
        }
        else {
            $scope.ActiveChartTab = 'QTD';
            angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
            angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataQtr;
            $scope.RankingData = $scope.RankingDataQtr;
            $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
            $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;
            clearChart();
            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
        }
    });

    $scope.ToggleChartTab = function ($event, chartToShow) {
        if (chartToShow === 'QTD') {
            $scope.ActiveChartTab = 'QTD';
            angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
            angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataQtr;
            $scope.RankingData = $scope.RankingDataQtr;
            $scope.RankTableHeaders = $scope.QtrRankTableHeaders;
            $scope.AverageTableHeaders = $scope.QtrAverageTableHeaders;
            clearChart();
            renderChart($scope.QuarterlyChartData, $scope.SelectedUBPRDesc);
        }
        else {
            $scope.ActiveChartTab = 'YTD';
            angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
            angular.element(document.querySelector('#yearlyChartData')).addClass('active');
            $scope.AverageData = $scope.AverageDataYtd;
            $scope.RankingData = $scope.RankingDataYtd;
            $scope.RankTableHeaders = $scope.YtdRankTableHeaders;
            $scope.AverageTableHeaders = $scope.YtdAverageTableHeaders;
            clearChart();
            renderChart($scope.YearlyChartData, $scope.SelectedUBPRDesc);
        }
    }

    var getCustomPeerGroupRankingData = function (rowData, RptName, custPeerGroupKey) {
        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var rankingParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            CustPeerGroupName: $scope.Peer1,
            InstitutionKey: $rootScope.ShowRiskProfileForInstitutionKey,
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
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get ranking data and peer group averages. Please send an e-mail to castellonf@stifel.com.');
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
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var creditRiskChartParams = {
            UBPRConceptCode: rowData.ubprConceptCode,
            InstitutionKey: $rootScope.ShowRiskProfileForInstitutionKey,
            CustPeerGroupName: $scope.Peer1,
            CustPeerGroupKey: custPeerGroupKey,
            StdPeerGroupName: selectedInstitution.stdPeerGroupCode,
            Login: '',
            RptName: chartType
        };

        var req = {
            method: 'POST',
            url: '/api/RiskProfilesApi/GetRiskProfileChartData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: creditRiskChartParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {

                    //angular.element(document.querySelector('#chartUbprDesc')).html('<strong>' + rowData.ubprConceptDesc + '</strong>');
                    $scope.QuarterlyChartData = result.data.quarterlyChartData;
                    $scope.YearlyChartData = result.data.yearlyChartData;

                    if ($scope.ActiveChartTab == 'QTD') {
                        angular.element(document.querySelector('#yearlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#quarterlyChartData')).addClass('active');
                        renderChart($scope.QuarterlyChartData, rowData.ubprConceptDesc);
                    }
                    else {
                        angular.element(document.querySelector('#quarterlyChartData')).removeClass('active');
                        angular.element(document.querySelector('#yearlyChartData')).addClass('active');
                        renderChart($scope.YearlyChartData, rowData.ubprConceptDesc);
                    }

                    angular.element(document.querySelector('#' + rowData.ubprConceptCode)).addClass('active');
                    $scope.SelectedUBPRColId = rowData.ubprConceptCode;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for chart data. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var renderChart = function (chartData, ubprConceptDesc) {
        FusionCharts.ready(function () {
            var chartContainer = $('#chart-container');
            if (chartContainer != null) {
                var revenueChart = new FusionCharts({
                    type: 'mscombi2d',
                    renderAt: 'chart-container',
                    width: '100%',
                    height: '250',
                    dataFormat: 'json',
                    dataSource: {
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
                            "paletteColors": "#003057,#008C48,#A71D23",
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
                    }
                });
                revenueChart.render();
            } // if block ends here
        });
    }

    var getRiskProfileStrategicData = function (custPeerGroupKey) {

        var selectedInstitution = $scope.Institutions.filter(function (obj) {
            return obj.institutionKey === $rootScope.ShowRiskProfileForInstitutionKey;
        })[0];

        var riskProfileParams = {
            InstitutionKey: $rootScope.ShowRiskProfileForInstitutionKey, //Will get user's tenant's institution on server
            Period: 0, // Will get last quarter string on server
            TenantKey: 0, //Will get user's tenant on server
            StdPeerGroupKey: selectedInstitution.stdPeerGroupKey, //Need to be selected from a dropdown
            CustPeerGroupKey: custPeerGroupKey //Will get default custom peer group for logged in user on server
        };

        var req = {
            method: 'POST',
            url: '/api/RiskProfilesApi/GetRiskProfileStrategicRiskData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: riskProfileParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.StEarningsAndProfitability = result.data.riskProfileSections.earningsAndProfitability;
                    $scope.StNonIncomeAndExpenses = result.data.riskProfileSections.nonIncomeAndExpenses;
                    $scope.CapitalRatios = result.data.riskProfileSections.capitalRatios;
                    $scope.StInterestRateRisk = result.data.riskProfileSections.interestRateRisk;
                    $scope.StMarginAnalysis = result.data.riskProfileSections.marginAnalysis;
                    $scope.StGrowthRates = result.data.riskProfileSections.growthRates;
                    if ($scope.StEarningsAndProfitability.length > 0) {
                        getCreditRiskChartData($scope.StEarningsAndProfitability[0], 'Strategic', custPeerGroupKey);
                        getCustomPeerGroupRankingData($scope.StEarningsAndProfitability[0], 'Strategic', custPeerGroupKey);
                        $scope.SelectedUBPRDesc = $scope.StEarningsAndProfitability[0].ubprConceptDesc;
                    }
                    angular.element(document.querySelector('#strategicRiskDataLoader')).addClass('hidden');
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get data for strategic risk. Please send an e-mail to castellonf@stifel.com.');
            });
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
