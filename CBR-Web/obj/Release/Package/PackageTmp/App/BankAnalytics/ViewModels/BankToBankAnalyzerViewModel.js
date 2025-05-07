cbrBankAnalyticsModule.controller("bankToBankAnalyzerViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope) {
    $rootScope.DefaultBankSelection = null;
    $rootScope.Bank1Selection = null;
    $rootScope.Bank2Selection = null;
    $rootScope.Bank3Selection = null;
    $rootScope.Bank4Selection = null;
    $rootScope.Bank5Selection = null;
    $rootScope.CombinedBankSelection = null;
    $rootScope.SelectedDataType = '$$$';
    $rootScope.PeriodSelection = {};
    $rootScope.Bank1Visible = true;
    $rootScope.Bank2Visible = true;
    $rootScope.Bank3Visible = true;
    $rootScope.Bank4Visible = true;
    $rootScope.Bank5Visible = true;
    $rootScope.CombinedColumnVisible = true;
    $scope.ShowHideBankList = [];
    $scope.Periods = [];
    $scope.SelectedPeriod = {};
    $scope.b2bSubTab = 'b2bIncomeStatement';
    $scope.IncomeDollarVisible = false;
    $scope.IncomePercentageVisible = false;
    $scope.BalanceDollarVisible = true;
    $scope.BalancePercentageVisible = true;
    $scope.SelectedRatioDollarTab = 'Dollar';
    $scope.BankName = '';
    $scope.FdicCert = '';

    $scope.GetClassForEye = function (bankObj) {
        if (bankObj.isVisible === true)
            return 'glyphicon glyphicon-eye-open';
        else
            return 'glyphicon glyphicon-eye-close';
    };

    $scope.ToggleTabNameAndData = function (event, tabName) {
        $scope.$broadcast('OnTabToggle', { tabName: tabName, period: $scope.SelectedPeriod });

        if (tabName === 'Income $$$') {
            angular.element(document.querySelector('#incomeRatio')).removeClass('active');
            angular.element(document.querySelector('#incomeDollar')).addClass('active');
            angular.element(document.querySelector('#isSecondBankSelector')).removeAttr('disabled');
            $scope.SelectedRatioDollarTab = 'Dollar';
        }
        else if (tabName === 'Income %') {
            angular.element(document.querySelector('#incomeDollar')).removeClass('active');
            angular.element(document.querySelector('#incomeRatio')).addClass('active');
            angular.element(document.querySelector('#isSecondBankSelector')).attr('disabled', '');
            $scope.SelectedRatioDollarTab = 'Ratio';
        }
        else if (tabName === 'Balance $$$') {
            angular.element(document.querySelector('#balanceRatio')).removeClass('active');
            angular.element(document.querySelector('#balanceDollar')).addClass('active');
            $scope.SelectedRatioDollarTab = 'Dollar';
        }
        else {
            angular.element(document.querySelector('#balanceDollar')).removeClass('active');
            angular.element(document.querySelector('#balanceRatio')).addClass('active');
            $scope.SelectedRatioDollarTab = 'Ratio';
        }
    };

    $scope.RefreshDataOnPeriodChange = function ($event, periodObj) {
        $scope.$broadcast('OnPeriodChange', { period: periodObj});
    };

    $scope.B2BExportToExcel = function () {
        $scope.$broadcast('OnExportToExcel', { periodType: $scope.SelectedPeriod.label, periodValue: $scope.SelectedPeriod.value });
    };

    $scope.ToggleB2BSubTab = function (tabId) {
        if (tabId === 'b2bIncomeStatement') {
            angular.element(document.querySelector('#lnkBalanceSheet')).removeClass('active');
            angular.element(document.querySelector('#lnkIncomeStatement')).addClass('active');
            $scope.IncomeDollarVisible = false;
            $scope.IncomePercentageVisible = false;
            $scope.BalanceDollarVisible = true;
            $scope.BalancePercentageVisible = true;

            if ($scope.SelectedRatioDollarTab === 'Dollar') {
                angular.element(document.querySelector('#incomeRatio')).removeClass('active');
                angular.element(document.querySelector('#incomeDollar')).addClass('active');
            }
            else {
                angular.element(document.querySelector('#incomeRatio')).addClass('active');
                angular.element(document.querySelector('#incomeDollar')).removeClass('active');
            }
        }
        else {
            angular.element(document.querySelector('#lnkIncomeStatement')).removeClass('active');
            angular.element(document.querySelector('#lnkBalanceSheet')).addClass('active');

            if ($scope.SelectedRatioDollarTab === 'Dollar') {
                angular.element(document.querySelector('#balanceRatio')).removeClass('active');
                angular.element(document.querySelector('#balanceDollar')).addClass('active');
            }
            else {
                angular.element(document.querySelector('#balanceRatio')).addClass('active');
                angular.element(document.querySelector('#balanceDollar')).removeClass('active');
            }

            $scope.IncomeDollarVisible = true;
            $scope.IncomePercentageVisible = true;
            $scope.BalanceDollarVisible = false;
            $scope.BalancePercentageVisible = false;
        }

        $scope.b2bSubTab = tabId;
    };

    $scope.ChangeScreen = function (templateId) {
        window.location.href = '/';
    };

    var HideUnhideBankColumns = function () {
        var tableName = '';

        if ($scope.b2bSubTab === 'b2bIncomeStatement') {
            tableName = 'tblIncomeStatement';
        }
        else {
            tableName = 'tblBalanceSheet';
        }

        var pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank1')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank1Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector(tableName)).addClass('offbank1');
            }
            else {
                angular.element(document.querySelector(tableName)).removeClass('offbank1');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank2')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank2Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblIncomeStatement')).addClass('offbank2');
            }
            else {
                angular.element(document.querySelector('#tblIncomeStatement')).removeClass('offbank2');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank3')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank3Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblIncomeStatement')).addClass('offbank3');
            }
            else {
                angular.element(document.querySelector('#tblIncomeStatement')).removeClass('offbank3');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank4')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank4Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblIncomeStatement')).addClass('offbank4');
            }
            else {
                angular.element(document.querySelector('#tblIncomeStatement')).removeClass('offbank4');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank5')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank5Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblIncomeStatement')).addClass('offbank5');
            }
            else {
                angular.element(document.querySelector('#tblIncomeStatement')).removeClass('offbank5');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('SecondBank')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.CombinedColumnVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblIncomeStatement')).addClass('offcombined');
            }
            else {
                angular.element(document.querySelector('#tblIncomeStatement')).removeClass('offcombined');
            }
        }
    };

    $scope.ToggleSelectedColumn = function ($event, hideUnhideOption) {
        var tableName = '';

        if ($scope.b2bSubTab === 'b2bIncomeStatement') {
            tableName = '#tblIncomeStatement';
        }
        else {
            tableName = '#tblBalanceSheet';
        }

        var firstItem = {
            institutionKey: -1,
            institutionName: 'Select a Bank',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: ''
        };

        var pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId === hideUnhideOption.dropDownId) {
                pos = i;
                break;
            }
        }

        if (pos > -1)
            $scope.ShowHideBankList[pos].isVisible = !$scope.ShowHideBankList[pos].isVisible;

        if (hideUnhideOption.dropDownId.indexOf('DefaultBank') > -1) {
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                var alreadyExistingObj = $scope.DefualtBankSelectionList.filter(function (obj) {
                    return obj.institutionName === 'Select a Bank';
                })[0];

                if (alreadyExistingObj !== null) {
                    $scope.SelectedDefaultBank = alreadyExistingObj;
                }
            }
            else {
                var selectedItem = {
                    institutionKey: $scope.ShowHideBankList[pos].institutionKey,
                    institutionName: $scope.ShowHideBankList[pos].institutionName,
                    certNumber: $scope.ShowHideBankList[pos].certNumber,
                    rssd: $scope.ShowHideBankList[pos].rssd,
                    institutionCity: $scope.ShowHideBankList[pos].institutionCity,
                    institutionStateName: $scope.ShowHideBankList[pos].institutionStateName,
                    subS: $scope.ShowHideBankList[pos].subS,
                    assetSize: $scope.ShowHideBankList[pos].assetSize,
                    numOfBranches: $scope.ShowHideBankList[pos].numOfBranches,
                    establishedDate: $scope.ShowHideBankList[pos].establishedDate,
                    fTEmployees: $scope.ShowHideBankList[pos].fTEmployees,
                    regulator: $scope.ShowHideBankList[pos].regulator,
                    isSelected: $scope.ShowHideBankList[pos].isSelected,
                    totalResults: $scope.ShowHideBankList[pos].totalResults,
                    isTenantBank: $scope.ShowHideBankList[pos].isTenantBank,
                    isDefaultBank: $scope.ShowHideBankList[pos].isDefaultBank
                };

                $scope.SelectedDefaultBank = selectedItem;
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('Bank1') > -1) {
            $rootScope.Bank1Visible = $scope.ShowHideBankList[pos].isVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector(tableName)).addClass('offbank1');
            }
            else {
                angular.element(document.querySelector(tableName)).removeClass('offbank1');
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('Bank2') > -1) {
            $rootScope.Bank2Visible = $scope.ShowHideBankList[pos].isVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector(tableName)).addClass('offbank2');
            }
            else {
                angular.element(document.querySelector(tableName)).removeClass('offbank2');
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('Bank3') > -1) {
            $rootScope.Bank3Visible = $scope.ShowHideBankList[pos].isVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector(tableName)).addClass('offbank3');
            }
            else {
                angular.element(document.querySelector(tableName)).removeClass('offbank3');
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('Bank4') > -1) {
            $rootScope.Bank4Visible = $scope.ShowHideBankList[pos].isVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector(tableName)).addClass('offbank4');
            }
            else {
                angular.element(document.querySelector(tableName)).removeClass('offbank4');
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('Bank5') > -1) {
            $rootScope.Bank5Visible = $scope.ShowHideBankList[pos].isVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector(tableName)).addClass('offbank5');
            }
            else {
                angular.element(document.querySelector(tableName)).removeClass('offbank5');
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('SecondBank') > -1) {
            $rootScope.CombinedColumnVisible = $scope.ShowHideBankList[pos].isVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector(tableName)).addClass('offcombined');
            }
            else {
                angular.element(document.querySelector(tableName)).removeClass('offcombined');
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('AllColumns') > -1) {
            angular.element(document.querySelector(tableName)).removeClass('offbank1');
            angular.element(document.querySelector(tableName)).removeClass('offbank2');
            angular.element(document.querySelector(tableName)).removeClass('offbank3');
            angular.element(document.querySelector(tableName)).removeClass('offbank4');
            angular.element(document.querySelector(tableName)).removeClass('offbank5');
            angular.element(document.querySelector(tableName)).removeClass('offcombined');
            $rootScope.Bank1Visible = true;
            $rootScope.Bank2Visible = true;
            $rootScope.Bank3Visible = true;
            $rootScope.Bank4Visible = true;
            $rootScope.Bank5Visible = true;
            $rootScope.CombinedColumnVisible = true;
            $scope.ShowHideBankList[0].isVisible = true;
            $scope.ShowHideBankList[1].isVisible = true;
            $scope.ShowHideBankList[2].isVisible = true;
            $scope.ShowHideBankList[3].isVisible = true;
            $scope.ShowHideBankList[4].isVisible = true;
            $scope.ShowHideBankList[5].isVisible = true;
        }
    };

    var initializeShowHideList = function () {
        var firstItem = {
            institutionKey: -1,
            institutionName: 'Combined Banks',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'isSecondBankSelector',
            isVisible: $rootScope.CombinedColumnVisible
        };

        var secondItem = {
            institutionKey: -2,
            institutionName: 'Bank 1',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'isBank1Selector',
            isVisible: $rootScope.Bank1Visible
        };

        var thirdItem = {
            institutionKey: -3,
            institutionName: 'Bank 2',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'isBank2Selector',
            isVisible: $rootScope.Bank2Visible
        };

        var fourthItem = {
            institutionKey: -4,
            institutionName: 'Bank 3',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'isBank3Selector',
            isVisible: $rootScope.Bank3Visible
        };

        var fifthItem = {
            institutionKey: -5,
            institutionName: 'Bank 4',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'isBank4Selector',
            isVisible: $rootScope.Bank4Visible
        };

        var sixthItem = {
            institutionKey: -6,
            institutionName: 'Bank 5',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'isBank5Selector',
            isVisible: $rootScope.Bank5Visible
        };

        var lastItem = {
            institutionKey: -1,
            institutionName: 'Show All Columns',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'showAllColumns',
            isVisible: true
        };

        $scope.ShowHideBankList.push(secondItem);
        $scope.ShowHideBankList.splice(1, 0, thirdItem);
        $scope.ShowHideBankList.splice(2, 0, fourthItem);
        $scope.ShowHideBankList.splice(3, 0, fifthItem);
        $scope.ShowHideBankList.splice(4, 0, sixthItem);
        $scope.ShowHideBankList.splice(5, 0, firstItem);
        $scope.ShowHideBankList.splice(6, 0, lastItem);
        HideUnhideBankColumns();
    };

    var getPastFiveQuarters = function () {
        angular.element(document.querySelector('#incomeStatementDataLoader')).removeClass('hidden');
        var req = {
            method: 'GET',
            url: '/api/BankToBankAnalyzer/GetLastFiveQuarters',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data.length > 0) {
                angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
                $scope.Periods = result.data;
                if (typeof $rootScope.PeriodSelection.label !== 'undefined') {
                    $scope.SelectedPeriod = $rootScope.PeriodSelection;
                }
                else {
                    $scope.SelectedPeriod = $scope.Periods[0];
                    $rootScope.PeriodSelection = $scope.Periods[0];
                }

                $scope.$broadcast('OnDefaultPeriodSelection', { period: $scope.SelectedPeriod });
            }
        }, function () {
            angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while loading the financial periods. Please send an e-mail to admin@cb-resource.com.');
        });
    };

    var getFavoriteBanks = function (period) {
        angular.element(document.querySelector('#incomeStatementDataLoader')).removeClass('hidden');

        var req = {
            method: 'GET',
            url: '/api/PeerGroupsApi/GetFavoriteBanksForCurrentUser',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data.length > 0) {
                var defaultInstitution = result.data.filter(function (obj) {
                    return obj.isDefaultBank === true;
                })[0];

                if (typeof defaultInstitution !== 'undefined') {
                    $scope.BankName = defaultInstitution.institutionName;
                    $scope.FdicCert = defaultInstitution.certNumber;
                }
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get favorite banks. Please send an e-mail to admin@cb-resource.com.');
        });
    };

    var initialize = function () {
        initializeShowHideList();
        getPastFiveQuarters();
        getFavoriteBanks();
    };

    initialize();

}]);

cbrBankAnalyticsModule.controller("b2bIncomeStatementController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.SelectedDefaultBank = null;
    $scope.SelectedBank1 = null;
    $scope.SelectedBank2 = null;
    $scope.SelectedBank3 = null;
    $scope.SelectedBank4 = null;
    $scope.SelectedBank5 = null;
    $scope.SelectedCombinedBank = null;

    $scope.SelectedTabName = 'Income $$$';
    $scope.SheetData = [];
    $scope.DefaultBankBasicData = {};
    $scope.Bank1BasicData = {};
    $scope.Bank2BasicData = {};
    $scope.Bank3BasicData = {};
    $scope.Bank4BasicData = {};
    $scope.Bank5BasicData = {};
    $scope.CombinedBankBasicData = {
        assets: null,
        employees: null,
        subS: '-'
    };

    $scope.SelectedPeriodValue = 0;
    $scope.SelectedPeriod = {};
    $scope.DefualtBankSelectionList = [];
    $scope.Bank1SelectionList = [];
    $scope.Bank2SelectionList = [];
    $scope.Bank3SelectionList = [];
    $scope.Bank4SelectionList = [];
    $scope.Bank5SelectionList = [];
    $scope.CombinedBankSelectionList = [];
    $scope.LastSelectedDefaultBank = null;
    $scope.LastSelectedBank1 = null;
    $scope.LastSelectedBank2 = null;
    $scope.LastSelectedBank3 = null;
    $scope.LastSelectedBank4 = null;
    $scope.LastSelectedBank5 = null;
    $scope.LastSelectedCombinedBank = null;

    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

    $scope.$on('OnDefaultPeriodSelection', function (event, opt) {
        getFavoriteBanks(opt.period.value);
        $scope.SelectedPeriod = opt.period;
    });

    $scope.$on('OnPeriodChange', function (event, opt) {
        RefreshDataOnPeriodChange(opt.period.value);
        $scope.SelectedPeriodValue = opt.period.value;
        $scope.SelectedPeriod = opt.period;
        $rootScope.PeriodSelection = opt.period;
    });

    $scope.GetClassForTabOrder = function(dataObj)
    {
        var tabClass = '';
        if (dataObj.tabOrder !== '') {
            if (dataObj.tabOrder == 1)
                tabClass = 'onelefttab';
            else if (dataObj.tabOrder == 2)
                tabClass = 'twolefttab';
        }
        else {
            console.log(dataObj);
        }

        return tabClass;
    }
  
    $scope.GetClassForExpandCollapse = function(sheetDataObj)
    {
        var classVal = '';
        if (typeof sheetDataObj !== 'undefined') {
            if (sheetDataObj.isTopLevelRow === true)
                classVal = 'glyphicon glyphicon-plus';
        }

        return classVal;
    }

    $scope.$on('OnTabToggle', function (event, opt) {
        ToggleTabNameAndData(opt.tabName, opt.period.value);
    });

    var ToggleTabNameAndData = function (tabName, period) {
        $scope.SelectedTabName = tabName;
        if (tabName === 'Income $$$') {
            angular.element(document.querySelector('#incomeRatio')).removeClass('active');
            angular.element(document.querySelector('#incomeDollar')).addClass('active');
            angular.element(document.querySelector('#isSecondBankSelector')).removeAttr('disabled');
            $rootScope.SelectedDataType = '$$$';
        }
        else {
            angular.element(document.querySelector('#incomeDollar')).removeClass('active');
            angular.element(document.querySelector('#incomeRatio')).addClass('active');
            angular.element(document.querySelector('#isSecondBankSelector')).attr('disabled', '');

            $scope.SelectedCombinedBank = {
                institutionKey: -7,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $rootScope.SelectedDataType = '%';
        }

        getBanksBasicData(period);
        getBanksIncomeStatementData(period);
    };

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null)
            return '-';
        else {
            if($scope.SelectedTabName === 'Income %')
                return $filter('number')(numericValue, 2);
            else
                return $filter('number')(numericValue, fractionSize);
        }
    }

    $scope.BindDate = function (value) {
        $scope.perirodValue = value.label;
        return value.label;
    }

    $scope.BindSubChapter = function (value)
    {
        if(value === null || value === '-1' || typeof value === 'undefined')
            return '-';
        else if(value === true)
            return 'Yes';
        else
            return 'No';
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

    var doesUserHaveDefaultFavoriteOrFavoriteBank = function () {
        var noFavoriteBank = false;
        var noDefaultFavoriteBank = false;
        var errorMessage = 'You do not seem to have ';

        if ($scope.DefualtBankSelectionList.length < 2) {
            noFavoriteBank = true;
            errorMessage += 'any favorite bank. Please go to "Manage Profiles" screen to add some banks as your favorite bank.';
        }
        else if ($scope.DefualtBankSelectionList.length > 1) {
            var alreadyExistingObj = $scope.DefualtBankSelectionList.filter(function (obj) {
                return obj.isDefaultBank === true;
            })[0];

            if (alreadyExistingObj === null) {
                noDefaultFavoriteBank = true;
                errorMessage += 'You do not have any bank as your default favorite bank. Please make one bank as your default favorite bank by going to "Favorite Banks" screen.';
            }
        }

        if (noFavoriteBank || noDefaultFavoriteBank) {
            $scope.toggleErrorMessageBoxModal(errorMessage);
        }
        else if (noDefaultFavoriteBank) {
            $scope.SelectedDefaultBank = $scope.DefualtBankSelectionList[1];
        }
        else if (noDefaultFavoriteBank === false) {
            alreadyExistingObj = $scope.DefualtBankSelectionList.filter(function (obj) {
                return obj.isDefaultBank === true;
            })[0];

            if (alreadyExistingObj !== null) {
                $scope.SelectedDefaultBank = alreadyExistingObj;
            }
        }
    };

    var setDefaultSelectedBank = function () {
        if ($rootScope.DefaultBankSelection !== null) {
            $scope.SelectedDefaultBank = $rootScope.DefaultBankSelection;
            $scope.LastSelectedDefaultBank = $rootScope.DefaultBankSelection;
            AddBankToCombinedColumnList($rootScope.DefaultBankSelection, 'isDefaultBankSelector');
            RemoveSelectedBankFromOtherDropdowns($rootScope.DefaultBankSelection, 'isDefaultBankSelector');
        }
        else {
            $scope.SelectedDefaultBank = {
                institutionKey: -10,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $scope.LastSelectedDefaultBank = {
                institutionKey: -10,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        if ($rootScope.Bank1Selection !== null) {
            $scope.SelectedBank1 = $rootScope.Bank1Selection;
            $scope.LastSelectedBank1 = $rootScope.Bank1Selection;
            AddBankToCombinedColumnList($rootScope.Bank1Selection, 'isBank1Selector');
            RemoveSelectedBankFromOtherDropdowns($rootScope.Bank1Selection, 'isBank1Selector');
        }
        else {
            $scope.SelectedBank1 = {
                institutionKey: -2,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $scope.LastSelectedBank1 = {
                institutionKey: -2,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        if ($rootScope.Bank2Selection !== null) {
            $scope.SelectedBank2 = $rootScope.Bank2Selection;
            $scope.LastSelectedBank2 = $rootScope.Bank2Selection;
            AddBankToCombinedColumnList($rootScope.Bank2Selection, 'isBank2Selector');
            RemoveSelectedBankFromOtherDropdowns($rootScope.Bank2Selection, 'isBank2Selector');
        }
        else {
            $scope.SelectedBank2 = {
                institutionKey: -3,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $scope.LastSelectedBank2 = {
                institutionKey: -3,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        if ($rootScope.Bank3Selection !== null) {
            $scope.SelectedBank3 = $rootScope.Bank3Selection;
            $scope.LastSelectedBank3 = $rootScope.Bank3Selection;
            AddBankToCombinedColumnList($rootScope.Bank3Selection, 'isBank3Selector');
            RemoveSelectedBankFromOtherDropdowns($rootScope.Bank3Selection, 'isBank3Selector');
        }
        else {
            $scope.SelectedBank3 = {
                institutionKey: -4,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $scope.LastSelectedBank3 = {
                institutionKey: -4,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        if ($rootScope.Bank4Selection !== null) {
            $scope.SelectedBank4 = $rootScope.Bank4Selection;
            $scope.LastSelectedBank4 = $rootScope.Bank4Selection;
            AddBankToCombinedColumnList($rootScope.Bank4Selection, 'isBank4Selector');
            RemoveSelectedBankFromOtherDropdowns($rootScope.Bank4Selection, 'isBank4Selector');
        }
        else {
            $scope.SelectedBank4 = {
                institutionKey: -5,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $scope.LastSelectedBank4 = {
                institutionKey: -5,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        if ($rootScope.Bank5Selection !== null) {
            $scope.SelectedBank5 = $rootScope.Bank5Selection;
            $scope.LastSelectedBank5 = $rootScope.Bank5Selection;
            AddBankToCombinedColumnList($rootScope.Bank5Selection, 'isBank5Selector');
            RemoveSelectedBankFromOtherDropdowns($rootScope.Bank5Selection, 'isBank5Selector');
        }
        else {
            $scope.SelectedBank5 = {
                institutionKey: -6,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $scope.LastSelectedBank5 = {
                institutionKey: -6,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        if ($rootScope.CombinedBankSelection !== null) {
            $scope.SelectedCombinedBank = $rootScope.CombinedBankSelection;
        }
        else {
            $scope.SelectedCombinedBank = {
                institutionKey: -7,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }
    }

    var addDefaultSelectionItemInBankLists = function (listObj, instKey) {
        var firstItem = {
            institutionKey: instKey,
            institutionName: 'Select a Bank',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: ''
        };

        listObj.unshift(firstItem);
    }

    var setCombinedColumnBankInShowHideList = function(bankObj)
    {
        if(bankObj.institutionName !== 'Select a Bank'){
            var alreadyExistingObj = $scope.ShowHideBankList.filter(function (obj) {
                return obj.dropDownId === 'isSecondBankSelector';
            })[0];

            if(alreadyExistingObj !== null)
            {
                alreadyExistingObj.institutionKey = bankObj.institutionKey;
                alreadyExistingObj.certNumber = bankObj.certNumber;
                alreadyExistingObj.rssd = bankObj.rssd;
                alreadyExistingObj.institutionCity = bankObj.institutionCity;
                alreadyExistingObj.institutionStateName = bankObj.institutionStateName;
                alreadyExistingObj.subS = bankObj.subS;
                alreadyExistingObj.assetSize = bankObj.assetSize;
                alreadyExistingObj.numOfBranches = bankObj.numOfBranches;
                alreadyExistingObj.establishedDate = bankObj.establishedDate;
                alreadyExistingObj.fTEmployees = bankObj.fTEmployees;
                alreadyExistingObj.regulator = bankObj.regulator;
                alreadyExistingObj.isSelected = bankObj.isSelected;
                alreadyExistingObj.totalResults = bankObj.totalResults;
                alreadyExistingObj.isTenantBank = bankObj.isTenantBank;
                alreadyExistingObj.isDefaultBank = bankObj.isDefaultBank;
                alreadyExistingObj.dropDownId = 'isSecondBankSelector';
                alreadyExistingObj.isVisible = true;
            }
        }
    }

    var calculateCombinedBasicData = function(bankToCombine)
    {
        $scope.CombinedBankBasicData = {
            assets: null,
            employees: null,
            subS: '-'
        };

        if (typeof bankToCombine.dropDownId !== 'undefined') {
            if (bankToCombine.dropDownId.indexOf('Bank1') > -1) {
                $scope.CombinedBankBasicData.assets = parseInt($scope.DefaultBankBasicData.assets) + parseInt($scope.Bank1BasicData.assets);
                $scope.CombinedBankBasicData.employees = parseInt($scope.DefaultBankBasicData.employees) + parseInt($scope.Bank1BasicData.employees);
                $scope.CombinedBankBasicData.subS = $scope.BindSubChapter($scope.DefaultBankBasicData.subS) + ' / ' + $scope.BindSubChapter($scope.Bank1BasicData.subS);
            }
            else if (bankToCombine.dropDownId.indexOf('Bank2') > -1) {
                $scope.CombinedBankBasicData.assets = parseInt($scope.DefaultBankBasicData.assets) + parseInt($scope.Bank2BasicData.assets);
                $scope.CombinedBankBasicData.employees = parseInt($scope.DefaultBankBasicData.employees) + parseInt($scope.Bank2BasicData.employees);
                $scope.CombinedBankBasicData.subS = $scope.BindSubChapter($scope.DefaultBankBasicData.subS) + ' / ' + $scope.BindSubChapter($scope.Bank2BasicData.subS);
            }
            else if (bankToCombine.dropDownId.indexOf('Bank3') > -1) {
                $scope.CombinedBankBasicData.assets = parseInt($scope.DefaultBankBasicData.assets) + parseInt($scope.Bank3BasicData.assets);
                $scope.CombinedBankBasicData.employees = parseInt($scope.DefaultBankBasicData.employees) + parseInt($scope.Bank3BasicData.employees);
                $scope.CombinedBankBasicData.subS = $scope.BindSubChapter($scope.DefaultBankBasicData.subS) + ' / ' + $scope.BindSubChapter($scope.Bank3BasicData.subS);
            }
            else if (bankToCombine.dropDownId.indexOf('Bank4') > -1) {
                $scope.CombinedBankBasicData.assets = parseInt($scope.DefaultBankBasicData.assets) + parseInt($scope.Bank4BasicData.assets);
                $scope.CombinedBankBasicData.employees = parseInt($scope.DefaultBankBasicData.employees) + parseInt($scope.Bank4BasicData.employees);
                $scope.CombinedBankBasicData.subS = $scope.BindSubChapter($scope.DefaultBankBasicData.subS) + ' / ' + $scope.BindSubChapter($scope.Bank4BasicData.subS);
            }
            else if (bankToCombine.dropDownId.indexOf('Bank5') > -1) {
                $scope.CombinedBankBasicData.assets = parseInt($scope.DefaultBankBasicData.assets) + parseInt($scope.Bank5BasicData.assets);
                $scope.CombinedBankBasicData.employees = parseInt($scope.DefaultBankBasicData.employees) + parseInt($scope.Bank5BasicData.employees);
                $scope.CombinedBankBasicData.subS = $scope.BindSubChapter($scope.DefaultBankBasicData.subS) + ' / ' + $scope.BindSubChapter($scope.Bank5BasicData.subS);
            }
        }
    }

    var calculateCombinedDollarData = function (bankToCombine) {
        var keys = [];
        for (var key in $scope.SheetData) {
            if ($scope.SheetData.hasOwnProperty(key)) { //to be safe
                keys.push(key);
            }
        }

        for (i = 0; i < keys.length; i++) {
            for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                $scope.SheetData[keys[i]][j].dollarSum = null;
            }
        }
        if (typeof bankToCombine.dropDownId !== 'undefined') {
            if (bankToCombine.dropDownId.indexOf('Bank1') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank1 !== null) {
                            $scope.SheetData[keys[i]][j].dollarSum = parseFloat($scope.SheetData[keys[i]][j].defaultbank) + parseFloat($scope.SheetData[keys[i]][j].bank1);
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank2') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank2 !== null) {
                            $scope.SheetData[keys[i]][j].dollarSum = parseFloat($scope.SheetData[keys[i]][j].defaultbank) + parseFloat($scope.SheetData[keys[i]][j].bank2);
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank3') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank3 !== null) {
                            $scope.SheetData[keys[i]][j].dollarSum = parseFloat($scope.SheetData[keys[i]][j].defaultbank) + parseFloat($scope.SheetData[keys[i]][j].bank3);
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank4') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank4 !== null) {
                            $scope.SheetData[keys[i]][j].dollarSum = parseFloat($scope.SheetData[keys[i]][j].defaultbank) + parseFloat($scope.SheetData[keys[i]][j].bank4);
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank5') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank5 !== null) {
                            $scope.SheetData[keys[i]][j].dollarSum = parseFloat($scope.SheetData[keys[i]][j].defaultbank) + parseFloat($scope.SheetData[keys[i]][j].bank5);
                        }
                    }
                }
            }
        }

        calculateCombinedRatioData(bankToCombine);
    }

    var calculateCombinedRatioData = function (bankToCombine) {
        var keys = [];
        for (var key in $scope.SheetData) {
            if ($scope.SheetData.hasOwnProperty(key)) { //to be safe
                keys.push(key);
            }
        }

        for (i = 0; i < keys.length; i++) {
            for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                $scope.SheetData[keys[i]][j].ratio = null;
            }
        }
        if (typeof bankToCombine.dropDownId !== 'undefined') {
            if (bankToCombine.dropDownId.indexOf('Bank1') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank1 !== null && $scope.DefaultBankBasicData.avgAssetSize != null && $scope.Bank1BasicData.avgAssetSize != null) {
                            var avgAssetSum = parseInt($scope.DefaultBankBasicData.avgAssetSize) + parseInt($scope.Bank1BasicData.avgAssetSize);
                            $scope.SheetData[keys[i]][j].ratio = ($scope.SheetData[keys[i]][j].dollarSum / parseInt(avgAssetSum)) * 100;
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank2') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank2 !== null && $scope.DefaultBankBasicData.avgAssetSize != null && $scope.Bank2BasicData.avgAssetSize != null) {
                            avgAssetSum = parseInt($scope.DefaultBankBasicData.avgAssetSize) + parseInt($scope.Bank2BasicData.avgAssetSize);
                            $scope.SheetData[keys[i]][j].ratio = ($scope.SheetData[keys[i]][j].dollarSum / parseInt(avgAssetSum)) * 100;
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank3') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank3 !== null && $scope.DefaultBankBasicData.avgAssetSize != null && $scope.Bank3BasicData.avgAssetSize != null) {
                            avgAssetSum = parseInt($scope.DefaultBankBasicData.avgAssetSize) + parseInt($scope.Bank3BasicData.avgAssetSize);
                            $scope.SheetData[keys[i]][j].ratio = ($scope.SheetData[keys[i]][j].dollarSum / parseInt(avgAssetSum)) * 100;
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank4') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank4 !== null && $scope.DefaultBankBasicData.avgAssetSize != null && $scope.Bank4BasicData.avgAssetSize != null) {
                            avgAssetSum = parseInt($scope.DefaultBankBasicData.avgAssetSize) + parseInt($scope.Bank4BasicData.avgAssetSize);
                            $scope.SheetData[keys[i]][j].ratio = ($scope.SheetData[keys[i]][j].dollarSum / parseInt(avgAssetSum)) * 100;
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank5') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank5 !== null && $scope.DefaultBankBasicData.avgAssetSize != null && $scope.Bank5BasicData.avgAssetSize != null) {
                            avgAssetSum = parseInt($scope.DefaultBankBasicData.avgAssetSize) + parseInt($scope.Bank4BasicData.avgAssetSize);
                            $scope.SheetData[keys[i]][j].ratio = ($scope.SheetData[keys[i]][j].dollarSum / parseInt(avgAssetSum)) * 100;
                        }
                    }
                }
            }
        }
    };

    var pushNewBankObjectToSelectionList = function (selectionList, bankObj) {
        var bankForSelection1 = {
            institutionKey: bankObj.institutionKey,
            institutionName: bankObj.institutionName,
            certNumber: bankObj.certNumber,
            rssd: bankObj.rssd,
            institutionCity: bankObj.institutionCity,
            institutionStateName: bankObj.institutionStateName,
            subS: bankObj.subS,
            assetSize: bankObj.assetSize,
            numOfBranches: bankObj.numOfBranches,
            establishedDate: bankObj.establishedDate,
            fTEmployees: bankObj.fTEmployees,
            regulator: bankObj.regulator,
            isSelected: bankObj.isSelected,
            totalResults: bankObj.totalResults,
            isTenantBank: bankObj.isTenantBank,
            isDefaultBank: bankObj.isDefaultBank
        };

        selectionList.push(bankForSelection1);
    }

    var getFavoriteBanks = function (period) {
        angular.element(document.querySelector('#incomeStatementDataLoader')).removeClass('hidden');
        var firstItem = {
            institutionKey: -1,
            institutionName: 'Select a Bank',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: ''
        };

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
                angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
                addDefaultSelectionItemInBankLists($scope.DefualtBankSelectionList, -10);
                addDefaultSelectionItemInBankLists($scope.Bank1SelectionList, -2);
                addDefaultSelectionItemInBankLists($scope.Bank2SelectionList, -3);
                addDefaultSelectionItemInBankLists($scope.Bank3SelectionList, -4);
                addDefaultSelectionItemInBankLists($scope.Bank4SelectionList, -5);
                addDefaultSelectionItemInBankLists($scope.Bank5SelectionList, -6);
                addDefaultSelectionItemInBankLists($scope.CombinedBankSelectionList, -7);

                for (i = 0; i < resultData.length; i++) {
                    pushNewBankObjectToSelectionList($scope.DefualtBankSelectionList, resultData[i]);
                    if (resultData[i].isDefaultBank !== true) {
                        pushNewBankObjectToSelectionList($scope.Bank1SelectionList, resultData[i]);
                        pushNewBankObjectToSelectionList($scope.Bank2SelectionList, resultData[i]);
                        pushNewBankObjectToSelectionList($scope.Bank3SelectionList, resultData[i]);
                        pushNewBankObjectToSelectionList($scope.Bank4SelectionList, resultData[i]);
                        pushNewBankObjectToSelectionList($scope.Bank5SelectionList, resultData[i]);
                    }
                }

                setDefaultSelectedBank();
                doesUserHaveDefaultFavoriteOrFavoriteBank();
                getBanksBasicData(period);
                getBanksIncomeStatementData(period);
            }
        }, function () {
            angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get favorite banks. Please send an e-mail to admin@cb-resource.com.');
        });
    };

    var getBanksBasicData = function (period) {
        $scope.SelectedPeriodValue = period;
        angular.element(document.querySelector('#incomeStatementDataLoader')).removeClass('hidden');
        $scope.DefaultBankBasicData = {};
        $scope.Bank1BasicData = {};
        $scope.Bank2BasicData = {};
        $scope.Bank3BasicData = {};
        $scope.Bank4BasicData = {};
        $scope.Bank5BasicData = {};
        $scope.CombinedBankBasicData = {
            assets: null,
            employees: null,
            subS: '-'
        };

        var b2bParameters = {
            Period: period,
            TabName: $scope.SelectedTabName,
            DefaultBankKey: $scope.SelectedDefaultBank.institutionKey,
            Bank1Key: $scope.SelectedBank1.institutionKey,
            Bank2Key: $scope.SelectedBank2.institutionKey,
            Bank3Key: $scope.SelectedBank3.institutionKey,
            Bank4Key: $scope.SelectedBank4.institutionKey,
            Bank5Key: $scope.SelectedBank5.institutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/BankToBankAnalyzer/GetBanksBasicData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: b2bParameters
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
                $scope.DefaultBankBasicData = result.data.defaultBankProfile;
                $scope.Bank1BasicData = result.data.bank1Profile;
                $scope.Bank2BasicData = result.data.bank2Profile;
                $scope.Bank3BasicData = result.data.bank3Profile;
                $scope.Bank4BasicData = result.data.bank4Profile;
                $scope.Bank5BasicData = result.data.bank5Profile;

                if ($scope.SelectedCombinedBank !== null && typeof $scope.SelectedCombinedBank.dropDownId !== 'undefined' && $scope.SelectedTabName === 'Income $$$') {
                    calculateCombinedBasicData($scope.SelectedCombinedBank);
                }
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get banks profile data. Please send an e-mail to admin@cb-resource.com.');
        });
    };

    var getBanksIncomeStatementData = function(period)
    {
        angular.element(document.querySelector('#incomeStatementDataLoader')).removeClass('hidden');
        if ($rootScope.SelectedDataType === '$$$') {
            $scope.SelectedTabName = 'Income $$$';
            angular.element(document.querySelector('#incomeDollar')).addClass('active');
            angular.element(document.querySelector('#incomeRatio')).removeClass('active');
            angular.element(document.querySelector('#isSecondBankSelector')).removeAttr('disabled');
        }
        else {
            $scope.SelectedTabName = 'Income %';
            angular.element(document.querySelector('#incomeDollar')).removeClass('active');
            angular.element(document.querySelector('#incomeRatio')).addClass('active');
            angular.element(document.querySelector('#isSecondBankSelector')).attr('disabled', '');

            $scope.SelectedCombinedBank = {
                institutionKey: -7,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        var b2bParameters = {
            Period: period,
            TabName: $scope.SelectedTabName,
            DefaultBankKey: $scope.SelectedDefaultBank.institutionKey,
            Bank1Key: $scope.SelectedBank1.institutionKey,
            Bank2Key: $scope.SelectedBank2.institutionKey,
            Bank3Key: $scope.SelectedBank3.institutionKey,
            Bank4Key: $scope.SelectedBank4.institutionKey,
            Bank5Key: $scope.SelectedBank5.institutionKey,
        };

        var req = {
            method: 'POST',
            url: '/api/BankToBankAnalyzer/GetIncomeStatementData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: b2bParameters
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
                $scope.SheetData = result.data;
                if ($scope.SelectedCombinedBank !== null && typeof $scope.SelectedCombinedBank.dropDownId !== 'undefined' && $scope.SelectedTabName === 'Income $$$') {
                    calculateCombinedDollarData($scope.SelectedCombinedBank);
                }
            }
        }, function () {
            angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get banks profile data. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var RefreshDataOnPeriodChange = function (periodObj) {
        
        getBanksBasicData(periodObj);
        getBanksIncomeStatementData(periodObj);
    };

    $scope.RefreshDataOnBankSelection = function ($event, selectedBankObj, usedBankDropdown) {
        if (usedBankDropdown !== 'isSecondBankSelector' && selectedBankObj.institutionName !== 'Select a Bank') {
            //AddBankToShowHideColumnList(selectedBankObj, usedBankDropdown);
            AddBankToCombinedColumnList(selectedBankObj, usedBankDropdown);
        }
        else if (usedBankDropdown !== 'isSecondBankSelector' && selectedBankObj.institutionName === 'Select a Bank') {
            var pos = -1;
            for (i = 0; i < $scope.ShowHideBankList.length; i++) {
                if ($scope.ShowHideBankList[i].dropDownId === usedBankDropdown) {
                    pos = i;
                    break;
                }
            }

            if (pos > -1)
                $scope.ShowHideBankList.splice(pos, 1);

            pos = -1;
            for (i = 0; i < $scope.CombinedBankSelectionList.length; i++) {
                if ($scope.CombinedBankSelectionList[i].dropDownId === usedBankDropdown) {
                    pos = i;
                    break;
                }
            }

            if (pos > -1) {
                $scope.CombinedBankSelectionList.splice(pos, 1);
                $scope.SelectedCombinedBank = {
                    institutionKey: -7,
                    institutionName: 'Select a Bank',
                    certNumber: '',
                    rssd: '',
                    institutionCity: '',
                    institutionStateName: '',
                    subS: '',
                    assetSize: '',
                    numOfBranches: '',
                    establishedDate: '',
                    fTEmployees: '',
                    regulator: '',
                    isSelected: '',
                    totalResults: '',
                    isTenantBank: '',
                    isDefaultBank: ''
                };
            }
        }
        else if (usedBankDropdown === 'isSecondBankSelector') {
            setCombinedColumnBankInShowHideList(selectedBankObj);
            $rootScope.CombinedBankSelection = selectedBankObj;
        }
        else if (usedBankDropdown === 'isSecondBankSelector' && selectedBankObj.institutionName === 'Select a Bank') {

        }

        if (usedBankDropdown.indexOf('DefaultBank') > -1) {
            if ($scope.LastSelectedDefaultBank.institutionName !== 'Select a Bank' && $scope.LastSelectedDefaultBank.isDefaultBank === false)
                AddPreviouslySelectedBankToOtherDropdowns($scope.LastSelectedDefaultBank);
            $scope.LastSelectedDefaultBank = selectedBankObj;
            $rootScope.DefaultBankSelection = selectedBankObj;
        }
        else if (usedBankDropdown.indexOf('Bank1') > -1) {
            if ($scope.LastSelectedBank1.institutionName !== 'Select a Bank')
                AddPreviouslySelectedBankToOtherDropdowns($scope.LastSelectedBank1);
            $scope.LastSelectedBank1 = selectedBankObj;
            $rootScope.Bank1Selection = selectedBankObj;
        }
        else if (usedBankDropdown.indexOf('Bank2') > -1) {
            if ($scope.LastSelectedBank2.institutionName !== 'Select a Bank')
                AddPreviouslySelectedBankToOtherDropdowns($scope.LastSelectedBank2);
            $scope.LastSelectedBank2 = selectedBankObj;
            $rootScope.Bank2Selection = selectedBankObj;
        }
        else if (usedBankDropdown.indexOf('Bank3') > -1) {
            if ($scope.LastSelectedBank3.institutionName !== 'Select a Bank')
                AddPreviouslySelectedBankToOtherDropdowns($scope.LastSelectedBank3);
            $rootScope.Bank3Selection = selectedBankObj;
        }
        else if (usedBankDropdown.indexOf('Bank4') > -1) {
            if ($scope.LastSelectedBank4.institutionName !== 'Select a Bank')
                AddPreviouslySelectedBankToOtherDropdowns($scope.LastSelectedBank4);
            $rootScope.Bank4Selection = selectedBankObj;
        }
        else if (usedBankDropdown.indexOf('Bank5') > -1) {
            if ($scope.LastSelectedBank5.institutionName !== 'Select a Bank')
                AddPreviouslySelectedBankToOtherDropdowns($scope.LastSelectedBank5);
            $scope.LastSelectedBank5 = selectedBankObj;
            $rootScope.Bank5Selection = selectedBankObj;
        }

        if (usedBankDropdown !== 'isSecondBankSelector') {
            RemoveSelectedBankFromOtherDropdowns(selectedBankObj, usedBankDropdown);
            getBanksBasicData($scope.SelectedPeriodValue);
            getBanksIncomeStatementData($scope.SelectedPeriodValue);
        }
        else {
            calculateCombinedBasicData(selectedBankObj);
            calculateCombinedDollarData(selectedBankObj);
        }
    };

    var AddBankToShowHideColumnList = function (bankObj, usedBankDropdown) {
        var pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId === usedBankDropdown) {
                pos = i;
                break;
            }
        }

        if (pos > -1)
            $scope.ShowHideBankList.splice(pos, 1);

        var bankForSelection1 = {
            institutionKey: bankObj.institutionKey,
            institutionName: bankObj.institutionName,
            certNumber: bankObj.certNumber,
            rssd: bankObj.rssd,
            institutionCity: bankObj.institutionCity,
            institutionStateName: bankObj.institutionStateName,
            subS: bankObj.subS,
            assetSize: bankObj.assetSize,
            numOfBranches: bankObj.numOfBranches,
            establishedDate: bankObj.establishedDate,
            fTEmployees: bankObj.fTEmployees,
            regulator: bankObj.regulator,
            isSelected: bankObj.isSelected,
            totalResults: bankObj.totalResults,
            isTenantBank: bankObj.isTenantBank,
            isDefaultBank: bankObj.isDefaultBank,
            dropDownId: usedBankDropdown,
            isVisible: true
        };

        $scope.ShowHideBankList.unshift(bankForSelection1);
    }

    var AddBankToCombinedColumnList = function (bankObj, usedBankDropdown) {
        var retainCalculation = false;
        if ($scope.SelectedCombinedBank !== null && typeof $scope.SelectedCombinedBank.dropDownId !== 'undefined' && $scope.SelectedCombinedBank.dropDownId === usedBankDropdown) {
            retainCalculation = true;
        }

        var pos = -1;
        for (i = 0; i < $scope.CombinedBankSelectionList.length; i++) {
            if ($scope.CombinedBankSelectionList[i].dropDownId === usedBankDropdown) {
                pos = i;
                break;
            }
        }

        if (pos > -1)
            $scope.CombinedBankSelectionList.splice(pos, 1);

        var bankForSelection1 = {
            institutionKey: bankObj.institutionKey,
            institutionName: bankObj.institutionName,
            certNumber: bankObj.certNumber,
            rssd: bankObj.rssd,
            institutionCity: bankObj.institutionCity,
            institutionStateName: bankObj.institutionStateName,
            subS: bankObj.subS,
            assetSize: bankObj.assetSize,
            numOfBranches: bankObj.numOfBranches,
            establishedDate: bankObj.establishedDate,
            fTEmployees: bankObj.fTEmployees,
            regulator: bankObj.regulator,
            isSelected: bankObj.isSelected,
            totalResults: bankObj.totalResults,
            isTenantBank: bankObj.isTenantBank,
            isDefaultBank: bankObj.isDefaultBank,
            dropDownId: usedBankDropdown
        };

        $scope.CombinedBankSelectionList.splice(1, 0, bankForSelection1);

        if (retainCalculation === true)
            $scope.SelectedCombinedBank = bankForSelection1;
    };

    var RemoveSelectedBankFromOtherDropdowns = function (bankObj, usedBankDropdown) {
        var pos = -1;
        if (usedBankDropdown.indexOf('DefaultBank') === -1) {
            for (i = 0; i < $scope.DefualtBankSelectionList.length; i++) {
                if ($scope.DefualtBankSelectionList[i].institutionName === bankObj.institutionName && bankObj.institutionName !== 'Select a Bank') {
                    pos = i;
                    break;
                }
            }

            if (pos > -1) {
                $scope.DefualtBankSelectionList.splice(pos, 1);
            }
        }

        pos = -1;
        if (usedBankDropdown.indexOf('Bank1') === -1) {
            for (i = 0; i < $scope.Bank1SelectionList.length; i++) {
                if ($scope.Bank1SelectionList[i].institutionName === bankObj.institutionName && bankObj.institutionName !== 'Select a Bank') {
                    pos = i;
                    break;
                }
            }

            if (pos > -1)
                $scope.Bank1SelectionList.splice(pos, 1);
        }

        pos = -1;
        if (usedBankDropdown.indexOf('Bank2') === -1) {
            for (i = 0; i < $scope.Bank2SelectionList.length; i++) {
                if ($scope.Bank2SelectionList[i].institutionName === bankObj.institutionName && bankObj.institutionName !== 'Select a Bank') {
                    pos = i;
                    break;
                }
            }

            if (pos > -1)
                $scope.Bank2SelectionList.splice(pos, 1);
        }

        pos = -1;
        if (usedBankDropdown.indexOf('Bank3') === -1) {
            for (i = 0; i < $scope.Bank3SelectionList.length; i++) {
                if ($scope.Bank3SelectionList[i].institutionName === bankObj.institutionName && bankObj.institutionName !== 'Select a Bank') {
                    pos = i;
                    break;
                }
            }

            if (pos > -1)
                $scope.Bank3SelectionList.splice(pos, 1);
        }

        pos = -1;
        if (usedBankDropdown.indexOf('Bank4') === -1) {
            for (i = 0; i < $scope.Bank4SelectionList.length; i++) {
                if ($scope.Bank4SelectionList[i].institutionName === bankObj.institutionName && bankObj.institutionName !== 'Select a Bank') {
                    pos = i;
                    break;
                }
            }

            if (pos > -1)
                $scope.Bank4SelectionList.splice(pos, 1);
        }

        pos = -1;
        if (usedBankDropdown.indexOf('Bank5') === -1) {
            for (i = 0; i < $scope.Bank5SelectionList.length; i++) {
                if ($scope.Bank5SelectionList[i].institutionName === bankObj.institutionName && bankObj.institutionName !== 'Select a Bank') {
                    pos = i;
                    break;
                }
            }

            if (pos > -1)
                $scope.Bank5SelectionList.splice(pos, 1);
        }
    };

    var AddPreviouslySelectedBankToOtherDropdowns = function (bankObj) {
        var pos = -1;
        for (i = 0; i < $scope.DefualtBankSelectionList.length; i++) {
            if ($scope.DefualtBankSelectionList[i].institutionName === bankObj.institutionName) {
                pos = i;
                break;
            }
        }

        if (pos === -1)
            $scope.DefualtBankSelectionList.splice(1, 0, bankObj);

        pos = -1;
        for (i = 0; i < $scope.Bank1SelectionList.length; i++) {
            if ($scope.Bank1SelectionList[i].institutionName === bankObj.institutionName) {
                pos = i;
                break;
            }
        }

        if (pos === -1)
            $scope.Bank1SelectionList.splice(1, 0, bankObj);

        pos = -1;
        for (i = 0; i < $scope.Bank2SelectionList.length; i++) {
            if ($scope.Bank2SelectionList[i].institutionName === bankObj.institutionName) {
                pos = i;
                break;
            }
        }

        if (pos === -1)
            $scope.Bank2SelectionList.splice(1, 0, bankObj);

        pos = -1;
        for (i = 0; i < $scope.Bank3SelectionList.length; i++) {
            if ($scope.Bank3SelectionList[i].institutionName === bankObj.institutionName) {
                pos = i;
                break;
            }
        }

        if (pos === -1)
            $scope.Bank3SelectionList.splice(1, 0, bankObj);

        pos = -1;
        for (i = 0; i < $scope.Bank4SelectionList.length; i++) {
            if ($scope.Bank4SelectionList[i].institutionName === bankObj.institutionName) {
                pos = i;
                break;
            }
        }

        if (pos === -1)
            $scope.Bank4SelectionList.splice(1, 0, bankObj);

        pos = -1;
        for (i = 0; i < $scope.Bank5SelectionList.length; i++) {
            if ($scope.Bank5SelectionList[i].institutionName === bankObj.institutionName) {
                pos = i;
                break;
            }
        }

        if (pos === -1)
            $scope.Bank5SelectionList.splice(1, 0, bankObj);
    };

    $scope.$on('OnExportToExcel', function (event, opt) {
        B2BExportToExcel($scope.SelectedPeriod.label, $scope.SelectedPeriod.value);
    });

    var B2BExportToExcel = function (periodType, periodValue) {
        document.getElementById('overlay').style.display = '';
        var b2bMetricParams = {
            PeriodType: periodType,
            TabName: $scope.SelectedTabName,
            DefaultBankName: $scope.SelectedDefaultBank.institutionName,
            Bank1Name: $scope.SelectedBank1.institutionName,
            Bank2Name: $scope.SelectedBank2.institutionName,
            Bank3Name: $scope.SelectedBank3.institutionName,
            Bank4Name: $scope.SelectedBank4.institutionName,
            Bank5Name: $scope.SelectedBank5.institutionName,
            CombinedBanks: $scope.SelectedCombinedBank == null ? "Select a Bank" : $scope.SelectedCombinedBank.institutionName,
            TableName: $scope.SelectedTabName.split(" ")[0],
            SelectedSecondBank: $scope.SelectedCombinedBank.institutionKey,
            SelectedSecondBankName: $scope.SelectedCombinedBank.institutionName,
           
            Period: periodValue,          
            DefaultBankKey: $scope.SelectedDefaultBank.institutionKey,
            Bank1Key: $scope.SelectedBank1.institutionKey,
            Bank2Key: $scope.SelectedBank2.institutionKey,
            Bank3Key: $scope.SelectedBank3.institutionKey,
            Bank4Key: $scope.SelectedBank4.institutionKey,
            Bank5Key: $scope.SelectedBank5.institutionKey,
        };   
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
            data: b2bMetricParams
        };

        $.fileDownload('/api/BankToBankAnalyzer/ExportToExcel', req);
    };

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
    };

    var isFileDownloaded = function () {
        var myCookie = getCookie("fileDownloaded");
        if (myCookie == null) {
            document.getElementById('overlay').style.display = 'none';
        }
        else {
            document.getElementById('overlay').style.display = 'none';
            document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            clearInterval(cookieIntervalID);
        }
    };

    var HideUnhideBankColumns = function () {
        var pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank1')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank1Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblIncomeStatement')).addClass('offbank1');
            }
            else {
                angular.element(document.querySelector('#tblIncomeStatement')).removeClass('offbank1');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank2')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank2Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblIncomeStatement')).addClass('offbank2');
            }
            else {
                angular.element(document.querySelector('#tblIncomeStatement')).removeClass('offbank2');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank3')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank3Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblIncomeStatement')).addClass('offbank3');
            }
            else {
                angular.element(document.querySelector('#tblIncomeStatement')).removeClass('offbank3');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank4')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank4Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblIncomeStatement')).addClass('offbank4');
            }
            else {
                angular.element(document.querySelector('#tblIncomeStatement')).removeClass('offbank4');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank5')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank5Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblIncomeStatement')).addClass('offbank5');
            }
            else {
                angular.element(document.querySelector('#tblIncomeStatement')).removeClass('offbank5');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('SecondBank')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.CombinedColumnVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblIncomeStatement')).addClass('offcombined');
            }
            else {
                angular.element(document.querySelector('#tblIncomeStatement')).removeClass('offcombined');
            }
        }
    };

    var initialize = function () {
        if (typeof $rootScope.PeriodSelection !== 'undefined' && typeof $rootScope.PeriodSelection.value !== 'undefined') {
            $scope.SelectedPeriod = $rootScope.PeriodSelection;
            getFavoriteBanks($rootScope.PeriodSelection.value);
        }
    };

    initialize();
}]);

cbrBankAnalyticsModule.controller("b2bBalanceSheetController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.SelectedDefaultBank = null;
    $scope.SelectedBank1 = null;
    $scope.SelectedBank2 = null;
    $scope.SelectedBank3 = null;
    $scope.SelectedBank4 = null;
    $scope.SelectedBank5 = null;
    $scope.SelectedCombinedBank = null;

    $scope.SelectedTabName = 'Balance $$$';
    $scope.SheetData = [];
    $scope.DefaultBankBasicData = {};
    $scope.Bank1BasicData = {};
    $scope.Bank2BasicData = {};
    $scope.Bank3BasicData = {};
    $scope.Bank4BasicData = {};
    $scope.Bank5BasicData = {};
    $scope.CombinedBankBasicData = {
        assets: null,
        employees: null,
        subS: '-'
    };

    $scope.SelectedPeriod = {};
    $scope.DefualtBankSelectionList = [];
    $scope.Bank1SelectionList = [];
    $scope.Bank2SelectionList = [];
    $scope.Bank3SelectionList = [];
    $scope.Bank4SelectionList = [];
    $scope.Bank5SelectionList = [];
    $scope.CombinedBankSelectionList = [];
    $scope.ShowHideBankList = [];

    $scope.Periods = [];

    $scope.LastSelectedDefaultBank = null;
    $scope.LastSelectedBank1 = null;
    $scope.LastSelectedBank2 = null;
    $scope.LastSelectedBank3 = null;
    $scope.LastSelectedBank4 = null;
    $scope.LastSelectedBank5 = null;
    $scope.LastSelectedCombinedBank = null;

    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

    $scope.GetClassForTabOrder = function(dataObj)
    {
        var tabClass = '';
        if (dataObj.tabOrder == 1)
            tabClass = 'onelefttab';
        else if(dataObj.tabOrder == 2)
            tabClass = 'twolefttab';     
        return tabClass;
    }

    $scope.GetClassForExpandCollapse = function (sheetDataObj) {
        var classVal = '';
        if (typeof sheetDataObj !== 'undefined') {
            if (sheetDataObj.isTopLevelRow === true)
                classVal = 'glyphicon glyphicon-plus';
        }

        return classVal;
    }

    $scope.$on('OnPeriodChange', function (event, opt) {
        $scope.SelectedPeriod = opt.period;
        $rootScope.PeriodSelection = opt.period;
        RefreshDataOnPeriodChange(opt.period.value);
    });

    $scope.$on('OnTabToggle', function (event, opt) {
        ToggleTabNameAndData(opt.tabName, opt.period.value);
    });

    var ToggleTabNameAndData = function (tabName, period) {
        $scope.SelectedTabName = tabName;
        if (tabName === 'Balance $$$') {
            angular.element(document.querySelector('#isSecondBankSelector')).removeAttr('disabled');
            $rootScope.SelectedDataType = '$$$';
        }
        else {
            angular.element(document.querySelector('#isSecondBankSelector')).attr('disabled', '');
            $scope.SelectedCombinedBank = {
                institutionKey: -7,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $rootScope.SelectedDataType = '%';
        }

        getBanksBasicData(period);
        getBanksIncomeStatementData(period);
    };

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null)
            return '-';
        else {
            if ($scope.SelectedTabName === 'Balance %')
                return $filter('number')(numericValue, 2);
            else
                return $filter('number')(numericValue, fractionSize);
        }
    }

    $scope.BindDate = function (value) {
        $scope.perirodValue = value.label;
        return value.label;
    }

    $scope.BindSubChapter = function (value) {
        if (value === null || value === '-1' || typeof value === 'undefined')
            return '-';
        else if (value === true)
            return 'Yes'
        else
            return 'No';
    }

    $scope.GetClassForEye = function (bankObj) {
        if (bankObj.isVisible === true)
            return 'glyphicon glyphicon-eye-open';
        else
            return 'glyphicon glyphicon-eye-close';
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

    var doesUserHaveDefaultFavoriteOrFavoriteBank = function () {
        var noFavoriteBank = false;
        var noDefaultFavoriteBank = false;
        var errorMessage = 'You do not seem to have ';

        if ($scope.DefualtBankSelectionList.length < 2) {
            noFavoriteBank = true;
            errorMessage += 'any favorite bank. Please go to "Manage Profiles" screen to add some banks as your favorite bank.';
        }
        else if ($scope.DefualtBankSelectionList.length > 1) {
            var alreadyExistingObj = $scope.DefualtBankSelectionList.filter(function (obj) {
                return obj.isDefaultBank === true;
            })[0];

            if (alreadyExistingObj === null) {
                noDefaultFavoriteBank = true;
                errorMessage += 'You do not have any bank as your default favorite bank. Please make one bank as your default favorite bank by going to "Favorite Banks" screen.';
            }
        }

        if (noFavoriteBank || noDefaultFavoriteBank) {
            $scope.toggleErrorMessageBoxModal(errorMessage);
        }
        else if (noDefaultFavoriteBank) {
            $scope.SelectedDefaultBank = $scope.DefualtBankSelectionList[1];
        }
        else if (noDefaultFavoriteBank === false) {
            alreadyExistingObj = $scope.DefualtBankSelectionList.filter(function (obj) {
                return obj.isDefaultBank === true;
            })[0];

            if (alreadyExistingObj !== null) {
                $scope.SelectedDefaultBank = alreadyExistingObj;
            }
        }
    }

    var getPastFiveQuarters = function () {
        angular.element(document.querySelector('#balanceSheetDataLoader')).removeClass('hidden');
        var req = {
            method: 'GET',
            url: '/api/BankToBankAnalyzer/GetLastFiveQuarters',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {

                angular.element(document.querySelector('#balanceSheetDataLoader')).addClass('hidden');
                $scope.Periods = result.data;
                if (typeof $rootScope.PeriodSelection.label !== 'undefined') {
                    $scope.SelectedPeriod = $rootScope.PeriodSelection;
                }
                else {
                    $scope.SelectedPeriod = $scope.Periods[0];
                    $rootScope.PeriodSelection = $scope.Periods[0];
                }
                
            }
        }, function () {
            angular.element(document.querySelector('#balanceSheetDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while loading the financial periods. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var setDefaultSelectedBank = function () {
        if ($rootScope.DefaultBankSelection !== null) {
            $scope.SelectedDefaultBank = $rootScope.DefaultBankSelection;
            $scope.LastSelectedDefaultBank = $rootScope.DefaultBankSelection;
            AddBankToCombinedColumnList($rootScope.DefaultBankSelection, 'isDefaultBankSelector');
            RemoveSelectedBankFromOtherDropdowns($rootScope.DefaultBankSelection, 'isDefaultBankSelector');
        }
        else {
            $scope.SelectedDefaultBank = {
                institutionKey: -10,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $scope.LastSelectedDefaultBank = {
                institutionKey: -10,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        if ($rootScope.Bank1Selection !== null) {
            $scope.SelectedBank1 = $rootScope.Bank1Selection;
            $scope.LastSelectedBank1 = $rootScope.Bank1Selection;
            AddBankToCombinedColumnList($rootScope.Bank1Selection, 'isBank1Selector');
            RemoveSelectedBankFromOtherDropdowns($rootScope.Bank1Selection, 'isBank1Selector');
        }
        else {
            $scope.SelectedBank1 = {
                institutionKey: -2,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $scope.LastSelectedBank1 = {
                institutionKey: -2,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        if ($rootScope.Bank2Selection !== null) {
            $scope.SelectedBank2 = $rootScope.Bank2Selection;
            $scope.LastSelectedBank2 = $rootScope.Bank2Selection;
            AddBankToCombinedColumnList($rootScope.Bank2Selection, 'isBank2Selector');
            RemoveSelectedBankFromOtherDropdowns($rootScope.Bank2Selection, 'isBank2Selector');
        }
        else {
            $scope.SelectedBank2 = {
                institutionKey: -3,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $scope.LastSelectedBank2 = {
                institutionKey: -3,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        if ($rootScope.Bank3Selection !== null) {
            $scope.SelectedBank3 = $rootScope.Bank3Selection;
            $scope.LastSelectedBank3 = $rootScope.Bank3Selection;
            AddBankToCombinedColumnList($rootScope.Bank3Selection, 'isBank3Selector');
            RemoveSelectedBankFromOtherDropdowns($rootScope.Bank3Selection, 'isBank3Selector');
        }
        else {
            $scope.SelectedBank3 = {
                institutionKey: -4,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $scope.LastSelectedBank3 = {
                institutionKey: -4,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        if ($rootScope.Bank4Selection !== null) {
            $scope.SelectedBank4 = $rootScope.Bank4Selection;
            $scope.LastSelectedBank4 = $rootScope.Bank4Selection;
            AddBankToCombinedColumnList($rootScope.Bank4Selection, 'isBank4Selector');
            RemoveSelectedBankFromOtherDropdowns($rootScope.Bank4Selection, 'isBank4Selector');
        }
        else {
            $scope.SelectedBank4 = {
                institutionKey: -5,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $scope.LastSelectedBank4 = {
                institutionKey: -5,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        if ($rootScope.Bank5Selection !== null) {
            $scope.SelectedBank5 = $rootScope.Bank5Selection;
            $scope.LastSelectedBank5 = $rootScope.Bank5Selection;
            AddBankToCombinedColumnList($rootScope.Bank5Selection, 'isBank5Selector');
            RemoveSelectedBankFromOtherDropdowns($rootScope.Bank5Selection, 'isBank5Selector');
        }
        else {
            $scope.SelectedBank5 = {
                institutionKey: -6,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
            $scope.LastSelectedBank5 = {
                institutionKey: -6,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        if ($rootScope.CombinedBankSelection !== null) {
            $scope.SelectedCombinedBank = $rootScope.CombinedBankSelection;
        }
        else {
            $scope.SelectedCombinedBank = {
                institutionKey: -7,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }
    }

    var addDefaultSelectionItemInBankLists = function (listObj, instKey) {
        var firstItem = {
            institutionKey: instKey,
            institutionName: 'Select a Bank',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: ''
        };

        listObj.unshift(firstItem);
    }

    var setCombinedColumnBankInShowHideList = function (bankObj) {
        if (bankObj.institutionName !== 'Select a Bank') {
            var alreadyExistingObj = $scope.ShowHideBankList.filter(function (obj) {
                return obj.dropDownId === 'isSecondBankSelector';
            })[0];

            if (alreadyExistingObj !== null) {
                alreadyExistingObj.institutionKey = bankObj.institutionKey;
                alreadyExistingObj.certNumber = bankObj.certNumber;
                alreadyExistingObj.rssd = bankObj.rssd;
                alreadyExistingObj.institutionCity = bankObj.institutionCity;
                alreadyExistingObj.institutionStateName = bankObj.institutionStateName;
                alreadyExistingObj.subS = bankObj.subS;
                alreadyExistingObj.assetSize = bankObj.assetSize;
                alreadyExistingObj.numOfBranches = bankObj.numOfBranches;
                alreadyExistingObj.establishedDate = bankObj.establishedDate;
                alreadyExistingObj.fTEmployees = bankObj.fTEmployees;
                alreadyExistingObj.regulator = bankObj.regulator;
                alreadyExistingObj.isSelected = bankObj.isSelected;
                alreadyExistingObj.totalResults = bankObj.totalResults;
                alreadyExistingObj.isTenantBank = bankObj.isTenantBank;
                alreadyExistingObj.isDefaultBank = bankObj.isDefaultBank;
                alreadyExistingObj.dropDownId = 'isSecondBankSelector';
                alreadyExistingObj.isVisible = true;
            }
        }
    }

    var calculateCombinedBasicData = function (bankToCombine) {
        $scope.CombinedBankBasicData = {
            assets: null,
            employees: null,
            subS: '-'
        };

        if (typeof bankToCombine.dropDownId !== 'undefined') {
            if (bankToCombine.dropDownId.indexOf('Bank1') > -1) {
                $scope.CombinedBankBasicData.assets = parseInt($scope.DefaultBankBasicData.assets) + parseInt($scope.Bank1BasicData.assets);
                $scope.CombinedBankBasicData.employees = parseInt($scope.DefaultBankBasicData.employees) + parseInt($scope.Bank1BasicData.employees);
                $scope.CombinedBankBasicData.subS = $scope.BindSubChapter($scope.DefaultBankBasicData.subS) + ' / ' + $scope.BindSubChapter($scope.Bank1BasicData.subS);
            }
            else if (bankToCombine.dropDownId.indexOf('Bank2') > -1) {
                $scope.CombinedBankBasicData.assets = parseInt($scope.DefaultBankBasicData.assets) + parseInt($scope.Bank2BasicData.assets);
                $scope.CombinedBankBasicData.employees = parseInt($scope.DefaultBankBasicData.employees) + parseInt($scope.Bank2BasicData.employees);
                $scope.CombinedBankBasicData.subS = $scope.BindSubChapter($scope.DefaultBankBasicData.subS) + ' / ' + $scope.BindSubChapter($scope.Bank2BasicData.subS);
            }
            else if (bankToCombine.dropDownId.indexOf('Bank3') > -1) {
                $scope.CombinedBankBasicData.assets = parseInt($scope.DefaultBankBasicData.assets) + parseInt($scope.Bank3BasicData.assets);
                $scope.CombinedBankBasicData.employees = parseInt($scope.DefaultBankBasicData.employees) + parseInt($scope.Bank3BasicData.employees);
                $scope.CombinedBankBasicData.subS = $scope.BindSubChapter($scope.DefaultBankBasicData.subS) + ' / ' + $scope.BindSubChapter($scope.Bank3BasicData.subS);
            }
            else if (bankToCombine.dropDownId.indexOf('Bank4') > -1) {
                $scope.CombinedBankBasicData.assets = parseInt($scope.DefaultBankBasicData.assets) + parseInt($scope.Bank4BasicData.assets);
                $scope.CombinedBankBasicData.employees = parseInt($scope.DefaultBankBasicData.employees) + parseInt($scope.Bank4BasicData.employees);
                $scope.CombinedBankBasicData.subS = $scope.BindSubChapter($scope.DefaultBankBasicData.subS) + ' / ' + $scope.BindSubChapter($scope.Bank4BasicData.subS);
            }
            else if (bankToCombine.dropDownId.indexOf('Bank5') > -1) {
                $scope.CombinedBankBasicData.assets = parseInt($scope.DefaultBankBasicData.assets) + parseInt($scope.Bank5BasicData.assets);
                $scope.CombinedBankBasicData.employees = parseInt($scope.DefaultBankBasicData.employees) + parseInt($scope.Bank5BasicData.employees);
                $scope.CombinedBankBasicData.subS = $scope.BindSubChapter($scope.DefaultBankBasicData.subS) + ' / ' + $scope.BindSubChapter($scope.Bank5BasicData.subS);
            }
        }
    }

    var calculateCombinedDollarData = function (bankToCombine) {
        var keys = [];
        for (var key in $scope.SheetData) {
            if ($scope.SheetData.hasOwnProperty(key)) { //to be safe
                keys.push(key);
            }
        }

        for (i = 0; i < keys.length; i++) {
            for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                $scope.SheetData[keys[i]][j].dollarSum = null;
            }
        }
        if (typeof bankToCombine.dropDownId !== 'undefined') {
            if (bankToCombine.dropDownId.indexOf('Bank1') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank1 !== null) {
                            $scope.SheetData[keys[i]][j].dollarSum = parseFloat($scope.SheetData[keys[i]][j].defaultbank) + parseFloat($scope.SheetData[keys[i]][j].bank1);
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank2') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank2 !== null) {
                            $scope.SheetData[keys[i]][j].dollarSum = parseFloat($scope.SheetData[keys[i]][j].defaultbank) + parseFloat($scope.SheetData[keys[i]][j].bank2);
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank3') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank3 !== null) {
                            $scope.SheetData[keys[i]][j].dollarSum = parseFloat($scope.SheetData[keys[i]][j].defaultbank) + parseFloat($scope.SheetData[keys[i]][j].bank3);
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank4') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank4 !== null) {
                            $scope.SheetData[keys[i]][j].dollarSum = parseFloat($scope.SheetData[keys[i]][j].defaultbank) + parseFloat($scope.SheetData[keys[i]][j].bank4);
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank5') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank5 !== null) {
                            $scope.SheetData[keys[i]][j].dollarSum = parseFloat($scope.SheetData[keys[i]][j].defaultbank) + parseFloat($scope.SheetData[keys[i]][j].bank5);
                        }
                    }
                }
            }
        }

        calculateCombinedRatioData(bankToCombine);
    }

    var calculateCombinedRatioData = function (bankToCombine) {
        var keys = [];
        for (var key in $scope.SheetData) {
            if ($scope.SheetData.hasOwnProperty(key)) { //to be safe
                keys.push(key);
            }
        }

        for (i = 0; i < keys.length; i++) {
            for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                $scope.SheetData[keys[i]][j].ratio = null;
            }
        }
        if (typeof bankToCombine.dropDownId !== 'undefined') {
            if (bankToCombine.dropDownId.indexOf('Bank1') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank1 !== null) {
                            var avgAssetSum = parseInt($scope.DefaultBankBasicData.avgAssetSize) + parseInt($scope.Bank1BasicData.avgAssetSize);
                            $scope.SheetData[keys[i]][j].ratio = ($scope.SheetData[keys[i]][j].dollarSum / parseFloat(avgAssetSum)) * 100;
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank2') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank2 !== null) {
                            avgAssetSum = parseInt($scope.DefaultBankBasicData.avgAssetSize) + parseInt($scope.Bank2BasicData.avgAssetSize);
                            $scope.SheetData[keys[i]][j].ratio = ($scope.SheetData[keys[i]][j].dollarSum / parseFloat(avgAssetSum)) * 100;
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank3') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank3 !== null) {
                            avgAssetSum = parseInt($scope.DefaultBankBasicData.avgAssetSize) + parseInt($scope.Bank3BasicData.avgAssetSize);
                            $scope.SheetData[keys[i]][j].ratio = ($scope.SheetData[keys[i]][j].dollarSum / parseFloat(avgAssetSum)) * 100;
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank4') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank4 !== null) {
                            avgAssetSum = parseInt($scope.DefaultBankBasicData.avgAssetSize) + parseInt($scope.Bank4BasicData.avgAssetSize);
                            $scope.SheetData[keys[i]][j].ratio = ($scope.SheetData[keys[i]][j].dollarSum / parseFloat(avgAssetSum)) * 100;
                        }
                    }
                }
            }
            else if (bankToCombine.dropDownId.indexOf('Bank5') > -1) {
                for (i = 0; i < keys.length; i++) {
                    for (j = 0; j < $scope.SheetData[keys[i]].length; j++) {
                        if ($scope.SheetData[keys[i]][j].defaultbank !== null && $scope.SheetData[keys[i]][j].bank5 !== null) {
                            avgAssetSum = parseInt($scope.DefaultBankBasicData.avgAssetSize) + parseInt($scope.Bank5BasicData.avgAssetSize);
                            $scope.SheetData[keys[i]][j].ratio = ($scope.SheetData[keys[i]][j].dollarSum / parseFloat(avgAssetSum)) * 100;
                        }
                    }
                }
            }
        }
    }

    var pushNewBankObjectToSelectionList = function (selectionList, bankObj) {
        var bankForSelection1 = {
            institutionKey: bankObj.institutionKey,
            institutionName: bankObj.institutionName,
            certNumber: bankObj.certNumber,
            rssd: bankObj.rssd,
            institutionCity: bankObj.institutionCity,
            institutionStateName: bankObj.institutionStateName,
            subS: bankObj.subS,
            assetSize: bankObj.assetSize,
            numOfBranches: bankObj.numOfBranches,
            establishedDate: bankObj.establishedDate,
            fTEmployees: bankObj.fTEmployees,
            regulator: bankObj.regulator,
            isSelected: bankObj.isSelected,
            totalResults: bankObj.totalResults,
            isTenantBank: bankObj.isTenantBank,
            isDefaultBank: bankObj.isDefaultBank
        };

        selectionList.push(bankForSelection1);
    }

    var getFavoriteBanks = function () {
        angular.element(document.querySelector('#balanceSheetDataLoader')).removeClass('hidden');
        var firstItem = {
            institutionKey: -1,
            institutionName: 'Select a Bank',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: ''
        };

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
                angular.element(document.querySelector('#balanceSheetDataLoader')).addClass('hidden');
                addDefaultSelectionItemInBankLists($scope.DefualtBankSelectionList, -10);
                addDefaultSelectionItemInBankLists($scope.Bank1SelectionList, -2);
                addDefaultSelectionItemInBankLists($scope.Bank2SelectionList, -3);
                addDefaultSelectionItemInBankLists($scope.Bank3SelectionList, -4);
                addDefaultSelectionItemInBankLists($scope.Bank4SelectionList, -5);
                addDefaultSelectionItemInBankLists($scope.Bank5SelectionList, -6);
                addDefaultSelectionItemInBankLists($scope.CombinedBankSelectionList, -7);

                for (i = 0; i < resultData.length; i++) {
                    pushNewBankObjectToSelectionList($scope.DefualtBankSelectionList, resultData[i]);
                    if (resultData[i].isDefaultBank !== true) {
                        pushNewBankObjectToSelectionList($scope.Bank1SelectionList, resultData[i]);
                        pushNewBankObjectToSelectionList($scope.Bank2SelectionList, resultData[i]);
                        pushNewBankObjectToSelectionList($scope.Bank3SelectionList, resultData[i]);
                        pushNewBankObjectToSelectionList($scope.Bank4SelectionList, resultData[i]);
                        pushNewBankObjectToSelectionList($scope.Bank5SelectionList, resultData[i]);
                    }
                }

                setDefaultSelectedBank();
                doesUserHaveDefaultFavoriteOrFavoriteBank();
                getBanksBasicData($scope.SelectedPeriod.value);
                getBanksIncomeStatementData($scope.SelectedPeriod.value);
            }
        }, function () {
            angular.element(document.querySelector('#balanceSheetDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get favorite banks. Please send an e-mail to admin@cb-resource.com.');
        });
    };

    var getBanksBasicData = function (period) {
        angular.element(document.querySelector('#balanceSheetDataLoader')).removeClass('hidden');
        $scope.DefaultBankBasicData = {};
        $scope.Bank1BasicData = {};
        $scope.Bank2BasicData = {};
        $scope.Bank3BasicData = {};
        $scope.Bank4BasicData = {};
        $scope.Bank5BasicData = {};
        $scope.CombinedBankBasicData = {
            assets: null,
            employees: null,
            subS: '-'
        };

        var b2bParameters = {
            Period: period,
            TabName: $scope.SelectedTabName,
            DefaultBankKey: $scope.SelectedDefaultBank.institutionKey,
            Bank1Key: $scope.SelectedBank1.institutionKey,
            Bank2Key: $scope.SelectedBank2.institutionKey,
            Bank3Key: $scope.SelectedBank3.institutionKey,
            Bank4Key: $scope.SelectedBank4.institutionKey,
            Bank5Key: $scope.SelectedBank5.institutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/BankToBankAnalyzer/GetBanksBasicData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: b2bParameters
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                angular.element(document.querySelector('#balanceSheetDataLoader')).addClass('hidden');
                $scope.DefaultBankBasicData = result.data.defaultBankProfile;
                $scope.Bank1BasicData = result.data.bank1Profile;
                $scope.Bank2BasicData = result.data.bank2Profile;
                $scope.Bank3BasicData = result.data.bank3Profile;
                $scope.Bank4BasicData = result.data.bank4Profile;
                $scope.Bank5BasicData = result.data.bank5Profile;

                if ($scope.SelectedCombinedBank !== null && typeof $scope.SelectedCombinedBank.dropDownId !== 'undefined' && $scope.SelectedTabName === 'Balance $$$') {
                    calculateCombinedBasicData($scope.SelectedCombinedBank);
                }
            }
        }, function () {
            angular.element(document.querySelector('#balanceSheetDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get banks profile data. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var getBanksIncomeStatementData = function (period) {
        angular.element(document.querySelector('#balanceSheetDataLoader')).removeClass('hidden');
        if ($rootScope.SelectedDataType === '$$$') {
            $scope.SelectedTabName = 'Balance $$$';
            angular.element(document.querySelector('#isincomeDollar')).addClass('active');
            angular.element(document.querySelector('#isincomeRatio')).removeClass('active');
            angular.element(document.querySelector('#isSecondBankSelector')).removeAttr('disabled');
        }
        else {
            $scope.SelectedTabName = 'Balance %';
            angular.element(document.querySelector('#isincomeDollar')).removeClass('active');
            angular.element(document.querySelector('#isincomeRatio')).addClass('active');
            angular.element(document.querySelector('#isSecondBankSelector')).attr('disabled', '');
            $scope.SelectedCombinedBank = {
                institutionKey: -7,
                institutionName: 'Select a Bank',
                certNumber: '',
                rssd: '',
                institutionCity: '',
                institutionStateName: '',
                subS: '',
                assetSize: '',
                numOfBranches: '',
                establishedDate: '',
                fTEmployees: '',
                regulator: '',
                isSelected: '',
                totalResults: '',
                isTenantBank: '',
                isDefaultBank: ''
            };
        }

        var b2bParameters = {
            Period: period,
            TabName: $scope.SelectedTabName,
            DefaultBankKey: $scope.SelectedDefaultBank.institutionKey,
            Bank1Key: $scope.SelectedBank1.institutionKey,
            Bank2Key: $scope.SelectedBank2.institutionKey,
            Bank3Key: $scope.SelectedBank3.institutionKey,
            Bank4Key: $scope.SelectedBank4.institutionKey,
            Bank5Key: $scope.SelectedBank5.institutionKey,
        };

        var req = {
            method: 'POST',
            url: '/api/BankToBankAnalyzer/GetIncomeStatementData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: b2bParameters
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                angular.element(document.querySelector('#balanceSheetDataLoader')).addClass('hidden');
                $scope.SheetData = result.data;
                if ($scope.SelectedCombinedBank !== null && typeof $scope.SelectedCombinedBank.dropDownId !== 'undefined' && $scope.SelectedTabName === 'Balance $$$') {
                    calculateCombinedDollarData($scope.SelectedCombinedBank);
                }
            }
        }, function () {
            angular.element(document.querySelector('#balanceSheetDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get banks profile data. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    $scope.ToggleSelectedColumn = function ($event, hideUnhideOption) {
        var firstItem = {
            institutionKey: -1,
            institutionName: 'Select a Bank',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: ''
        };

        var pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId === hideUnhideOption.dropDownId) {
                pos = i;
                break;
            }
        }

        if (pos > -1)
            $scope.ShowHideBankList[pos].isVisible = !$scope.ShowHideBankList[pos].isVisible;

        if (hideUnhideOption.dropDownId.indexOf('DefaultBank') > -1) {
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                var alreadyExistingObj = $scope.DefualtBankSelectionList.filter(function (obj) {
                    return obj.institutionName === 'Select a Bank';
                })[0];

                if (alreadyExistingObj !== null) {
                    $scope.SelectedDefaultBank = alreadyExistingObj;
                }
            }
            else {
                var selectedItem = {
                    institutionKey: $scope.ShowHideBankList[pos].institutionKey,
                    institutionName: $scope.ShowHideBankList[pos].institutionName,
                    certNumber: $scope.ShowHideBankList[pos].certNumber,
                    rssd: $scope.ShowHideBankList[pos].rssd,
                    institutionCity: $scope.ShowHideBankList[pos].institutionCity,
                    institutionStateName: $scope.ShowHideBankList[pos].institutionStateName,
                    subS: $scope.ShowHideBankList[pos].subS,
                    assetSize: $scope.ShowHideBankList[pos].assetSize,
                    numOfBranches: $scope.ShowHideBankList[pos].numOfBranches,
                    establishedDate: $scope.ShowHideBankList[pos].establishedDate,
                    fTEmployees: $scope.ShowHideBankList[pos].fTEmployees,
                    regulator: $scope.ShowHideBankList[pos].regulator,
                    isSelected: $scope.ShowHideBankList[pos].isSelected,
                    totalResults: $scope.ShowHideBankList[pos].totalResults,
                    isTenantBank: $scope.ShowHideBankList[pos].isTenantBank,
                    isDefaultBank: $scope.ShowHideBankList[pos].isDefaultBank
                };

                $scope.SelectedDefaultBank = selectedItem;
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('Bank1') > -1) {
            $rootScope.Bank1Visible = $scope.ShowHideBankList[pos].isVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblBalanceSheet')).addClass('offbank1');
            }
            else {
                angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank1');
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('Bank2') > -1) {
            $rootScope.Bank2Visible = $scope.ShowHideBankList[pos].isVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblBalanceSheet')).addClass('offbank2');
            }
            else {
                angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank2');
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('Bank3') > -1) {
            $rootScope.Bank3Visible = $scope.ShowHideBankList[pos].isVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblBalanceSheet')).addClass('offbank3');
            }
            else {
                angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank3');
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('Bank4') > -1) {
            $rootScope.Bank4Visible = $scope.ShowHideBankList[pos].isVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblBalanceSheet')).addClass('offbank4');
            }
            else {
                angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank4');
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('Bank5') > -1) {
            $rootScope.Bank5Visible = $scope.ShowHideBankList[pos].isVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblBalanceSheet')).addClass('offbank5');
            }
            else {
                angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank5');
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('SecondBank') > -1) {
            $rootScope.CombinedColumnVisible = $scope.ShowHideBankList[pos].isVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblBalanceSheet')).addClass('offcombined');
            }
            else {
                angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offcombined');
            }
        }
        else if (hideUnhideOption.dropDownId.indexOf('AllColumns') > -1) {
            angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank1');
            angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank2');
            angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank3');
            angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank4');
            angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank5');
            angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offcombined');
            $rootScope.Bank1Visible = true;
            $rootScope.Bank2Visible = true;
            $rootScope.Bank3Visible = true;
            $rootScope.Bank4Visible = true;
            $rootScope.Bank5Visible = true;
            $rootScope.CombinedColumnVisible = true;
            $scope.ShowHideBankList[0].isVisible = true;
            $scope.ShowHideBankList[1].isVisible = true;
            $scope.ShowHideBankList[2].isVisible = true;
            $scope.ShowHideBankList[3].isVisible = true;
            $scope.ShowHideBankList[4].isVisible = true;
            $scope.ShowHideBankList[5].isVisible = true;
        }
    }

    var RefreshDataOnPeriodChange = function (periodObj) {
        getBanksBasicData(periodObj);
        getBanksIncomeStatementData(periodObj);
    }

    $scope.RefreshDataOnBankSelection = function ($event, selectedBankObj, usedBankDropdown) {
        if (usedBankDropdown !== 'isSecondBankSelector' && selectedBankObj.institutionName !== 'Select a Bank') {
            //AddBankToShowHideColumnList(selectedBankObj, usedBankDropdown);
            AddBankToCombinedColumnList(selectedBankObj, usedBankDropdown);
        }
        else if (usedBankDropdown !== 'isSecondBankSelector' && selectedBankObj.institutionName === 'Select a Bank') {
            var pos = -1;
            for (i = 0; i < $scope.ShowHideBankList.length; i++) {
                if ($scope.ShowHideBankList[i].dropDownId === usedBankDropdown) {
                    pos = i;
                    break;
                }
            }

            if (pos > -1)
                $scope.ShowHideBankList.splice(pos, 1);

            pos = -1;
            for (i = 0; i < $scope.CombinedBankSelectionList.length; i++) {
                if ($scope.CombinedBankSelectionList[i].dropDownId === usedBankDropdown) {
                    pos = i;
                    break;
                }
            }

            if (pos > -1) {
                $scope.CombinedBankSelectionList.splice(pos, 1);
                $scope.SelectedCombinedBank = {
                    institutionKey: -7,
                    institutionName: 'Select a Bank',
                    certNumber: '',
                    rssd: '',
                    institutionCity: '',
                    institutionStateName: '',
                    subS: '',
                    assetSize: '',
                    numOfBranches: '',
                    establishedDate: '',
                    fTEmployees: '',
                    regulator: '',
                    isSelected: '',
                    totalResults: '',
                    isTenantBank: '',
                    isDefaultBank: ''
                };
            }
        }
        else if (usedBankDropdown === 'isSecondBankSelector') {
            setCombinedColumnBankInShowHideList(selectedBankObj);
            $rootScope.CombinedBankSelection = selectedBankObj;
        }
        else if (usedBankDropdown === 'isSecondBankSelector' && selectedBankObj.institutionName === 'Select a Bank') {

        }

        if (usedBankDropdown.indexOf('DefaultBank') > -1) {
            if ($scope.LastSelectedDefaultBank.institutionName !== 'Select a Bank' && $scope.LastSelectedDefaultBank.isDefaultBank === false)
                AddPreviouslySelectedBankToOtherDropdowns($scope.LastSelectedDefaultBank);
            $scope.LastSelectedDefaultBank = selectedBankObj;
            $rootScope.DefaultBankSelection = selectedBankObj;
        }
        else if (usedBankDropdown.indexOf('Bank1') > -1) {
            if ($scope.LastSelectedBank1.institutionName !== 'Select a Bank')
                AddPreviouslySelectedBankToOtherDropdowns($scope.LastSelectedBank1);
            $scope.LastSelectedBank1 = selectedBankObj;
            $rootScope.Bank1Selection = selectedBankObj;
        }
        else if (usedBankDropdown.indexOf('Bank2') > -1) {
            if ($scope.LastSelectedBank2.institutionName !== 'Select a Bank')
                AddPreviouslySelectedBankToOtherDropdowns($scope.LastSelectedBank2);
            $scope.LastSelectedBank2 = selectedBankObj;
            $rootScope.Bank2Selection = selectedBankObj;
        }
        else if (usedBankDropdown.indexOf('Bank3') > -1) {
            if ($scope.LastSelectedBank3.institutionName !== 'Select a Bank')
                AddPreviouslySelectedBankToOtherDropdowns($scope.LastSelectedBank3);
            $scope.LastSelectedBank3 = selectedBankObj;
            $rootScope.Bank3Selection = selectedBankObj;
        }
        else if (usedBankDropdown.indexOf('Bank4') > -1) {
            if ($scope.LastSelectedBank4.institutionName !== 'Select a Bank')
                AddPreviouslySelectedBankToOtherDropdowns($scope.LastSelectedBank4);
            $scope.LastSelectedBank4 = selectedBankObj;
            $rootScope.Bank4Selection = selectedBankObj;
        }
        else if (usedBankDropdown.indexOf('Bank5') > -1) {
            if ($scope.LastSelectedBank5.institutionName !== 'Select a Bank')
                AddPreviouslySelectedBankToOtherDropdowns($scope.LastSelectedBank5);
            $scope.LastSelectedBank5 = selectedBankObj;
            $rootScope.Bank5Selection = selectedBankObj;
        }

        if (usedBankDropdown !== 'isSecondBankSelector') {
            RemoveSelectedBankFromOtherDropdowns(selectedBankObj, usedBankDropdown);
            getBanksBasicData($scope.SelectedPeriod.value);
            getBanksIncomeStatementData($scope.SelectedPeriod.value);
        }
        else {
            calculateCombinedBasicData(selectedBankObj);
            calculateCombinedDollarData(selectedBankObj);

        }
    }

    var AddBankToShowHideColumnList = function (bankObj, usedBankDropdown) {
        var pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId === usedBankDropdown) {
                pos = i;
                break;
            }
        }

        if (pos > -1)
            $scope.ShowHideBankList.splice(pos, 1);

        var bankForSelection1 = {
            institutionKey: bankObj.institutionKey,
            institutionName: bankObj.institutionName,
            certNumber: bankObj.certNumber,
            rssd: bankObj.rssd,
            institutionCity: bankObj.institutionCity,
            institutionStateName: bankObj.institutionStateName,
            subS: bankObj.subS,
            assetSize: bankObj.assetSize,
            numOfBranches: bankObj.numOfBranches,
            establishedDate: bankObj.establishedDate,
            fTEmployees: bankObj.fTEmployees,
            regulator: bankObj.regulator,
            isSelected: bankObj.isSelected,
            totalResults: bankObj.totalResults,
            isTenantBank: bankObj.isTenantBank,
            isDefaultBank: bankObj.isDefaultBank,
            dropDownId: usedBankDropdown,
            isVisible: true
        };

        $scope.ShowHideBankList.unshift(bankForSelection1);
    }

    var AddBankToCombinedColumnList = function (bankObj, usedBankDropdown) {
        var pos = -1;

        var retainCalculation = false;
        if ($scope.SelectedCombinedBank !== null && typeof $scope.SelectedCombinedBank.dropDownId !== 'undefined' && $scope.SelectedCombinedBank.dropDownId === usedBankDropdown) {
            retainCalculation = true;
        }

        for (i = 0; i < $scope.CombinedBankSelectionList.length; i++) {
            if ($scope.CombinedBankSelectionList[i].dropDownId === usedBankDropdown) {
                pos = i;
                break;
            }
        }

        if (pos > -1)
            $scope.CombinedBankSelectionList.splice(pos, 1);

        var bankForSelection1 = {
            institutionKey: bankObj.institutionKey,
            institutionName: bankObj.institutionName,
            certNumber: bankObj.certNumber,
            rssd: bankObj.rssd,
            institutionCity: bankObj.institutionCity,
            institutionStateName: bankObj.institutionStateName,
            subS: bankObj.subS,
            assetSize: bankObj.assetSize,
            numOfBranches: bankObj.numOfBranches,
            establishedDate: bankObj.establishedDate,
            fTEmployees: bankObj.fTEmployees,
            regulator: bankObj.regulator,
            isSelected: bankObj.isSelected,
            totalResults: bankObj.totalResults,
            isTenantBank: bankObj.isTenantBank,
            isDefaultBank: bankObj.isDefaultBank,
            dropDownId: usedBankDropdown
        };

        $scope.CombinedBankSelectionList.splice(1, 0, bankForSelection1);

        if (retainCalculation === true)
            $scope.SelectedCombinedBank = bankForSelection1;
    }

    var RemoveSelectedBankFromOtherDropdowns = function (bankObj, usedBankDropdown) {
        var pos = -1;
        if (usedBankDropdown.indexOf('DefaultBank') === -1) {
            for (i = 0; i < $scope.DefualtBankSelectionList.length; i++) {
                if ($scope.DefualtBankSelectionList[i].institutionName === bankObj.institutionName && bankObj.institutionName !== 'Select a Bank') {
                    pos = i;
                    break;
                }
            }

            if (pos > -1) {
                $scope.DefualtBankSelectionList.splice(pos, 1);
            }
        }

        pos = -1;
        if (usedBankDropdown.indexOf('Bank1') === -1) {
            for (i = 0; i < $scope.Bank1SelectionList.length; i++) {
                if ($scope.Bank1SelectionList[i].institutionName === bankObj.institutionName && bankObj.institutionName !== 'Select a Bank') {
                    pos = i;
                    break;
                }
            }

            if (pos > -1)
                $scope.Bank1SelectionList.splice(pos, 1);
        }

        pos = -1;
        if (usedBankDropdown.indexOf('Bank2') === -1) {
            for (i = 0; i < $scope.Bank2SelectionList.length; i++) {
                if ($scope.Bank2SelectionList[i].institutionName === bankObj.institutionName && bankObj.institutionName !== 'Select a Bank') {
                    pos = i;
                    break;
                }
            }

            if (pos > -1)
                $scope.Bank2SelectionList.splice(pos, 1);
        }

        pos = -1;
        if (usedBankDropdown.indexOf('Bank3') === -1) {
            for (i = 0; i < $scope.Bank3SelectionList.length; i++) {
                if ($scope.Bank3SelectionList[i].institutionName === bankObj.institutionName && bankObj.institutionName !== 'Select a Bank') {
                    pos = i;
                    break;
                }
            }

            if (pos > -1)
                $scope.Bank3SelectionList.splice(pos, 1);
        }

        pos = -1;
        if (usedBankDropdown.indexOf('Bank4') === -1) {
            for (i = 0; i < $scope.Bank4SelectionList.length; i++) {
                if ($scope.Bank4SelectionList[i].institutionName === bankObj.institutionName && bankObj.institutionName !== 'Select a Bank') {
                    pos = i;
                    break;
                }
            }

            if (pos > -1)
                $scope.Bank4SelectionList.splice(pos, 1);
        }

        pos = -1;
        if (usedBankDropdown.indexOf('Bank5') === -1) {
            for (i = 0; i < $scope.Bank5SelectionList.length; i++) {
                if ($scope.Bank5SelectionList[i].institutionName === bankObj.institutionName && bankObj.institutionName !== 'Select a Bank') {
                    pos = i;
                    break;
                }
            }

            if (pos > -1)
                $scope.Bank5SelectionList.splice(pos, 1);
        }
    }

    var AddPreviouslySelectedBankToOtherDropdowns = function (bankObj) {
        var pos = -1;
        for (i = 0; i < $scope.DefualtBankSelectionList.length; i++) {
            if ($scope.DefualtBankSelectionList[i].institutionName === bankObj.institutionName) {
                pos = i;
                break;
            }
        }

        if (pos === -1)
            $scope.DefualtBankSelectionList.splice(1, 0, bankObj);

        pos = -1;
        for (i = 0; i < $scope.Bank1SelectionList.length; i++) {
            if ($scope.Bank1SelectionList[i].institutionName === bankObj.institutionName) {
                pos = i;
                break;
            }
        }

        if (pos === -1)
            $scope.Bank1SelectionList.splice(1, 0, bankObj);

        pos = -1;
        for (i = 0; i < $scope.Bank2SelectionList.length; i++) {
            if ($scope.Bank2SelectionList[i].institutionName === bankObj.institutionName) {
                pos = i;
                break;
            }
        }

        if (pos === -1)
            $scope.Bank2SelectionList.splice(1, 0, bankObj);

        pos = -1;
        for (i = 0; i < $scope.Bank3SelectionList.length; i++) {
            if ($scope.Bank3SelectionList[i].institutionName === bankObj.institutionName) {
                pos = i;
                break;
            }
        }

        if (pos === -1)
            $scope.Bank3SelectionList.splice(1, 0, bankObj);

        pos = -1;
        for (i = 0; i < $scope.Bank4SelectionList.length; i++) {
            if ($scope.Bank4SelectionList[i].institutionName === bankObj.institutionName) {
                pos = i;
                break;
            }
        }

        if (pos === -1)
            $scope.Bank4SelectionList.splice(1, 0, bankObj);

        pos = -1;
        for (i = 0; i < $scope.Bank5SelectionList.length; i++) {
            if ($scope.Bank5SelectionList[i].institutionName === bankObj.institutionName) {
                pos = i;
                break;
            }
        }

        if (pos === -1)
            $scope.Bank5SelectionList.splice(1, 0, bankObj);
    }

    var HideUnhideBankColumns = function () {
        var pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank1')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank1Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblBalanceSheet')).addClass('offbank1');
            }
            else {
                angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank1');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank2')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank2Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblBalanceSheet')).addClass('offbank2');
            }
            else {
                angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank2');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank3')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank3Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblBalanceSheet')).addClass('offbank3');
            }
            else {
                angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank3');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank4')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank4Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblBalanceSheet')).addClass('offbank4');
            }
            else {
                angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank4');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('Bank5')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.Bank5Visible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblBalanceSheet')).addClass('offbank5');
            }
            else {
                angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offbank5');
            }
        }

        pos = -1;
        for (i = 0; i < $scope.ShowHideBankList.length; i++) {
            if ($scope.ShowHideBankList[i].dropDownId.indexOf('SecondBank')) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.ShowHideBankList[pos].isVisible = $rootScope.CombinedColumnVisible;
            if ($scope.ShowHideBankList[pos].isVisible === false) {
                angular.element(document.querySelector('#tblBalanceSheet')).addClass('offcombined');
            }
            else {
                angular.element(document.querySelector('#tblBalanceSheet')).removeClass('offcombined');
            }
        }
    };

    $scope.$on('OnExportToExcel', function (event, opt) {
        B2BExportToExcel($scope.SelectedPeriod.label, $scope.SelectedPeriod.value);
    });

    var B2BExportToExcel = function (periodType, periodValue) {
        document.getElementById('overlay').style.display = '';
        var b2bMetricParams = {
            PeriodType: periodType,
            TabName: $scope.SelectedTabName,
            DefaultBankName: $scope.SelectedDefaultBank.institutionName,
            Bank1Name: $scope.SelectedBank1 == null ? "Select a Bank" : $scope.SelectedBank1.institutionName,
            Bank2Name: $scope.SelectedBank2 == null ? "Select a Bank" : $scope.SelectedBank2.institutionName,
            Bank3Name: $scope.SelectedBank3 == null ? "Select a Bank" : $scope.SelectedBank3.institutionName,
            Bank4Name: $scope.SelectedBank4 == null ? "Select a Bank" : $scope.SelectedBank4.institutionName,
            Bank5Name: $scope.SelectedBank5 == null ? "Select a Bank" : $scope.SelectedBank5.institutionName,
            CombinedBanks: $scope.SelectedCombinedBank == null ? "Select a Bank" : $scope.SelectedCombinedBank.institutionName,
            TableName: $scope.SelectedTabName.split(" ")[0],
            SelectedSecondBank: $scope.SelectedCombinedBank.institutionKey,
            SelectedSecondBankName: $scope.SelectedCombinedBank.institutionName,

            Period: periodValue,
            DefaultBankKey: $scope.SelectedDefaultBank.institutionKey,
            Bank1Key: $scope.SelectedBank1.institutionKey,
            Bank2Key: $scope.SelectedBank2.institutionKey,
            Bank3Key: $scope.SelectedBank3.institutionKey,
            Bank4Key: $scope.SelectedBank4.institutionKey,
            Bank5Key: $scope.SelectedBank5.institutionKey
        };       
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
            data: b2bMetricParams
        };

        $.fileDownload('/api/BankToBankAnalyzer/ExportToExcel', req);
    };

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
            document.getElementById('overlay').style.display = 'none';
            document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            clearInterval(cookieIntervalID);
        }
    };

    var initializeShowHideList = function () {
        var firstItem = {
            institutionKey: -1,
            institutionName: 'Combined Banks',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'isSecondBankSelector',
            isVisible: $rootScope.CombinedColumnVisible
        };

        var secondItem = {
            institutionKey: -2,
            institutionName: 'Bank 1',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'isBank1Selector',
            isVisible: $rootScope.Bank1Visible
        };

        var thirdItem = {
            institutionKey: -3,
            institutionName: 'Bank 2',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'isBank2Selector',
            isVisible: $rootScope.Bank2Visible
        };

        var fourthItem = {
            institutionKey: -4,
            institutionName: 'Bank 3',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'isBank3Selector',
            isVisible: $rootScope.Bank3Visible
        };

        var fifthItem = {
            institutionKey: -5,
            institutionName: 'Bank 4',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'isBank4Selector',
            isVisible: $rootScope.Bank4Visible
        };

        var sixthItem = {
            institutionKey: -6,
            institutionName: 'Bank 5',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'isBank5Selector',
            isVisible: $rootScope.Bank5Visible
        };

        var lastItem = {
            institutionKey: -1,
            institutionName: 'Show All Columns',
            certNumber: '',
            rssd: '',
            institutionCity: '',
            institutionStateName: '',
            subS: '',
            assetSize: '',
            numOfBranches: '',
            establishedDate: '',
            fTEmployees: '',
            regulator: '',
            isSelected: '',
            totalResults: '',
            isTenantBank: '',
            isDefaultBank: '',
            dropDownId: 'showAllColumns',
            isVisible: true
        };

        $scope.ShowHideBankList.push(secondItem);
        $scope.ShowHideBankList.splice(1, 0, thirdItem);
        $scope.ShowHideBankList.splice(2, 0, fourthItem);
        $scope.ShowHideBankList.splice(3, 0, fifthItem);
        $scope.ShowHideBankList.splice(4, 0, sixthItem);
        $scope.ShowHideBankList.splice(5, 0, firstItem);
        $scope.ShowHideBankList.splice(6, 0, lastItem);
        HideUnhideBankColumns();
    };

    var initialize = function () {
        $scope.SelectedPeriod = $rootScope.PeriodSelection;
        getFavoriteBanks();
        initializeShowHideList();
    };

    initialize();
}]);