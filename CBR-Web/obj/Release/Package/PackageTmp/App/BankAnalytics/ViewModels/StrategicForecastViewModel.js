cbrBankAnalyticsModule.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

cbrBankAnalyticsModule.controller("strategicForecastMain", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $rootScope.strategicForecastSubTab = null;
    $rootScope.WantsToCreateANewScenario = false;
    $rootScope.ForecastDates = {};

    var getStrategicDates = function ()
    {
        document.getElementById('overlay').style.display = '';
        angular.element(document.querySelector('#overlayLoadingText')).html('Loading projection dates...');
        overlayLoadingText
        var req = {
            method: 'GET',
            url: '/api/StrategicForecastApi/GetStrategicDates',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                

                $rootScope.ForecastDates = result.data;
                document.getElementById('overlay').style.display = 'none';
                angular.element(document.querySelector('#overlayLoadingText')).html('Loading...');
                $rootScope.strategicForecastSubTab = 'strategicForecastCalculationsView';
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to save or update the scenario. Please send an e-mail to admin@cb-resource.com.');
                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
            });
    }

    $scope.ChangeScreen = function (templateId) {
        window.location.href = '/';
    }

    var initialize = function () {
        getStrategicDates();
        
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("strategicForecastCalculations", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $rootScope.SelectedSFScenario1ModelKey = null;
    $rootScope.SelectedSFScenario2ModelKey = null;
    $rootScope.SelectedSFScenario3ModelKey = null;
    $rootScope.SelectedSFScenario4ModelKey = null;
    $rootScope.SelectedSFScenario5ModelKey = null;
    $rootScope.SelectedSFScenario6ModelKey = null;
    $rootScope.SelectedSFScenario7ModelKey = null;
    $rootScope.SelectedSFScenario8ModelKey = null;

    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.strategicForecastCalculationSubTab = 'strategicForecastScenario';
    $scope.StrategicForecastModels = [];
    $scope.FavoriteBanks = [];
    $rootScope.SelectedModel = { modelName: 'Create/Edit Scenario' };
    $scope.CopiedModelName = '';
    $scope.Comparisons = [];
    $rootScope.StrategicForecastSelectedComparison = null;
    $scope.ComparisonName = '';
    $scope.InputScenario = {};
    $rootScope.chkNetIncome = false;
    $rootScope.chkCashDividends = false;
    $rootScope.chkNewCapital = false;
    $rootScope.chkCet1CapitalAdjustment = false;
    $rootScope.chkTier1CapitalAdjustment = false;
    $rootScope.chkTier2Capital = false;
    $rootScope.chkRiskWeightedAssets = false;
    $rootScope.chkTotalAssetsForLeverage = false;
    $rootScope.chkSharesOutstanding = false;
    $scope.AssetGrowthRatePriorYear = null;
    $scope.AssetGrowthRateCurrentQuarter = null;
    $scope.AssetGrowthRateYear0 = null;
    $scope.AssetGrowthRateYear1 = null;
    $scope.AssetGrowthRateYear2 = null;
    $scope.AssetGrowthRateYear3 = null;
    $scope.AssetGrowthRateYear4 = null;
    $scope.AssetGrowthRateYear5 = null;
    $scope.NetIncomePriorYear = null;
    $scope.NetIncomeCurrentQuarter = null;
    $scope.NetIncomeYear0 = null;
    $scope.NetIncomeYear1 = null;
    $scope.NetIncomeYear2 = null;
    $scope.NetIncomeYear3 = null;
    $scope.NetIncomeYear4 = null;
    $scope.NetIncomeYear5 = null;
    $scope.ReturnOnAverageAssetsPriorYear = null;
    $scope.ReturnOnAverageAssetsCurrentQuarter = null;
    $scope.ReturnOnAverageAssetsYear0 = null;
    $scope.ReturnOnAverageAssetsYear1 = null;
    $scope.ReturnOnAverageAssetsYear2 = null;
    $scope.ReturnOnAverageAssetsYear3 = null;
    $scope.ReturnOnAverageAssetsYear4 = null;
    $scope.ReturnOnAverageAssetsYear5 = null;
    $scope.DividendsPriorYear = null;
    $scope.DividendsCurrentQuarter = null;
    $scope.DividendsYear0 = null;
    $scope.DividendsYear1 = null;
    $scope.DividendsYear2 = null;
    $scope.DividendsYear3 = null;
    $scope.DividendsYear4 = null;
    $scope.DividendsYear5 = null;
    $scope.DividendsRatePriorYear = null;
    $scope.DividendsRateCurrentQuarter = null;
    $scope.DividendsRateYear0 = null;
    $scope.DividendsRateYear1 = null;
    $scope.DividendsRateYear2 = null;
    $scope.DividendsRateYear3 = null;
    $scope.DividendsRateYear4 = null;
    $scope.DividendsRateYear5 = null;
    $scope.NewCapitalPriorYear = null;
    $scope.NewCapitalCurrentQuarter = null;
    $scope.NewCapitalYear0 = null;
    $scope.NewCapitalYear1 = null;
    $scope.NewCapitalYear2 = null;
    $scope.NewCapitalYear3 = null;
    $scope.NewCapitalYear4 = null;
    $scope.NewCapitalYear5 = null;
    $scope.PricePerSharePriorYear = null;
    $scope.PricePerShareCurrentQuarter = null;
    $scope.PricePerShareYear0 = null;
    $scope.PricePerShareYear1 = null;
    $scope.PricePerShareYear2 = null;
    $scope.PricePerShareYear3 = null;
    $scope.PricePerShareYear4 = null;
    $scope.PricePerShareYear5 = null;
    $scope.NewAcquisitionAssetsPriorYear = null;
    $scope.NewAcquisitionAssetsCurrentQuarter = null;
    $scope.NewAcquisitionAssetsYear0 = null;
    $scope.NewAcquisitionAssetsYear1 = null;
    $scope.NewAcquisitionAssetsYear2 = null;
    $scope.NewAcquisitionAssetsYear3 = null;
    $scope.NewAcquisitionAssetsYear4 = null;
    $scope.NewAcquisitionAssetsYear5 = null;
    $scope.Cet1CapitalAdjustmentPriorYear = null;
    $scope.Cet1CapitalAdjustmentCurrentQuarter = null;
    $scope.Cet1CapitalAdjustmentYear0 = null;
    $scope.Cet1CapitalAdjustmentYear1 = null;
    $scope.Cet1CapitalAdjustmentYear2 = null;
    $scope.Cet1CapitalAdjustmentYear3 = null;
    $scope.Cet1CapitalAdjustmentYear4 = null;
    $scope.Cet1CapitalAdjustmentYear5 = null;
    $scope.Tier1CapitalAdjustmentPriorYear = null;
    $scope.Tier1CapitalAdjustmentCurrentQuarter = null;
    $scope.Tier1CapitalAdjustmentYear0 = null;
    $scope.Tier1CapitalAdjustmentYear1 = null;
    $scope.Tier1CapitalAdjustmentYear2 = null;
    $scope.Tier1CapitalAdjustmentYear3 = null;
    $scope.Tier1CapitalAdjustmentYear4 = null;
    $scope.Tier1CapitalAdjustmentYear5 = null;
    $scope.Tier2CapitalPriorYear = null;
    $scope.Tier2CapitalCurrentQuarter = null;
    $scope.Tier2CapitalYear0 = null;
    $scope.Tier2CapitalYear1 = null;
    $scope.Tier2CapitalYear2 = null;
    $scope.Tier2CapitalYear3 = null;
    $scope.Tier2CapitalYear4 = null;
    $scope.Tier2CapitalYear5 = null;
    $scope.RiskWeightedAssetsPriorYear = null;
    $scope.RiskWeightedAssetsCurrentQuarter = null;
    $scope.RiskWeightedAssetsYear0 = null;
    $scope.RiskWeightedAssetsYear1 = null;
    $scope.RiskWeightedAssetsYear2 = null;
    $scope.RiskWeightedAssetsYear3 = null;
    $scope.RiskWeightedAssetsYear4 = null;
    $scope.RiskWeightedAssetsYear5 = null;
    $scope.TotalAssetsForLeveragePriorYear = null;
    $scope.TotalAssetsForLeverageCurrentQuarter = null;
    $scope.TotalAssetsForLeverageYear0 = null;
    $scope.TotalAssetsForLeverageYear1 = null;
    $scope.TotalAssetsForLeverageYear2 = null;
    $scope.TotalAssetsForLeverageYear3 = null;
    $scope.TotalAssetsForLeverageYear4 = null;
    $scope.TotalAssetsForLeverageYear5 = null;
    $scope.SharesOutstandingActualPriorYear = null;
    $scope.SharesOutstandingActualCurrentQuarter = null;
    $scope.SharesOutstandingActualYear0 = null;
    $scope.SharesOutstandingActualYear1 = null;
    $scope.SharesOutstandingActualYear2 = null;
    $scope.SharesOutstandingActualYear3 = null;
    $scope.SharesOutstandingActualYear4 = null;
    $scope.SharesOutstandingActualYear5 = null;
    $scope.Tier2CapitalToTier1PriorYear = null;
    $scope.Tier2CapitalToTier1CurrentQuarter = null;
    $scope.RiskWeightedAssetsToAssetsPriorYear = null;
    $scope.RiskWeightedAssetsToAssetsCurrentQuarter = null;
    $scope.AssetsForLeverageToAssetsPriorYear = null;
    $scope.AssetsForLeverageToAssetsCurrentQuarter = null;
    $scope.SelectedBankName = '';
    $scope.SelectedBankFdicNumber = '';

    $scope.PopulateSharesOutstanding = function () {
        if ($scope.SharesOutstandingActualCurrentQuarter === null || typeof $scope.SharesOutstandingActualCurrentQuarter === 'undefined')
            $scope.SharesOutstandingActualCurrentQuarter = $scope.SharesOutstandingActualPriorYear;
        if ($scope.SharesOutstandingActualYear0 === null || typeof $scope.SharesOutstandingActualYear0 === 'undefined')
            $scope.SharesOutstandingActualYear0 = $scope.SharesOutstandingActualPriorYear;
        if ($scope.SharesOutstandingActualYear1 === null || typeof $scope.SharesOutstandingActualYear1 === 'undefined')
            $scope.SharesOutstandingActualYear1 = $scope.SharesOutstandingActualPriorYear;
        if ($scope.SharesOutstandingActualYear2 === null || typeof $scope.SharesOutstandingActualYear2 === 'undefined')
            $scope.SharesOutstandingActualYear2 = $scope.SharesOutstandingActualPriorYear;
        if ($scope.SharesOutstandingActualYear3 === null || typeof $scope.SharesOutstandingActualYear3 === 'undefined')
            $scope.SharesOutstandingActualYear3 = $scope.SharesOutstandingActualPriorYear;
        if ($scope.SharesOutstandingActualYear4 === null || typeof $scope.SharesOutstandingActualYear4 === 'undefined')
            $scope.SharesOutstandingActualYear4 = $scope.SharesOutstandingActualPriorYear;
        if ($scope.SharesOutstandingActualYear5 === null || typeof $scope.SharesOutstandingActualYear5 === 'undefined')
            $scope.SharesOutstandingActualYear5 = $scope.SharesOutstandingActualPriorYear;
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

    var resetInputData = function () {
        $scope.NetIncomeYear0 = null;
        $scope.NetIncomeYear1 = null;
        $scope.NetIncomeYear2 = null;
        $scope.NetIncomeYear3 = null;
        $scope.NetIncomeYear4 = null;
        $scope.NetIncomeYear5 = null;
        $scope.DividendsYear0 = null;
        $scope.DividendsYear1 = null;
        $scope.DividendsYear2 = null;
        $scope.DividendsYear3 = null;
        $scope.DividendsYear4 = null;
        $scope.DividendsYear5 = null;
        $scope.DividendsRateYear0 = null;
        $scope.DividendsRateYear1 = null;
        $scope.DividendsRateYear2 = null;
        $scope.DividendsRateYear3 = null;
        $scope.DividendsRateYear4 = null;
        $scope.DividendsRateYear5 = null;
        $scope.NewCapitalYear0 = null;
        $scope.NewCapitalYear1 = null;
        $scope.NewCapitalYear2 = null;
        $scope.NewCapitalYear3 = null;
        $scope.NewCapitalYear4 = null;
        $scope.NewCapitalYear5 = null;
        $scope.Cet1CapitalAdjustmentYear0 = null;
        $scope.Cet1CapitalAdjustmentYear1 = null;
        $scope.Cet1CapitalAdjustmentYear2 = null;
        $scope.Cet1CapitalAdjustmentYear3 = null;
        $scope.Cet1CapitalAdjustmentYear4 = null;
        $scope.Cet1CapitalAdjustmentYear5 = null;
        $scope.PricePerShareYear0 = null;
        $scope.PricePerShareYear1 = null;
        $scope.PricePerShareYear2 = null;
        $scope.PricePerShareYear3 = null;
        $scope.PricePerShareYear4 = null;
        $scope.PricePerShareYear5 = null;
        $scope.Tier1CapitalAdjustmentYear0 = null;
        $scope.Tier1CapitalAdjustmentYear1 = null;
        $scope.Tier1CapitalAdjustmentYear2 = null;
        $scope.Tier1CapitalAdjustmentYear3 = null;
        $scope.Tier1CapitalAdjustmentYear4 = null;
        $scope.Tier1CapitalAdjustmentYear5 = null;
        $scope.Tier2CapitalYear0 = null;
        $scope.Tier2CapitalYear1 = null;
        $scope.Tier2CapitalYear2 = null;
        $scope.Tier2CapitalYear3 = null;
        $scope.Tier2CapitalYear4 = null;
        $scope.Tier2CapitalYear5 = null;
        $scope.RiskWeightedAssetsYear0 = null;
        $scope.RiskWeightedAssetsYear1 = null;
        $scope.RiskWeightedAssetsYear2 = null;
        $scope.RiskWeightedAssetsYear3 = null;
        $scope.RiskWeightedAssetsYear4 = null;
        $scope.RiskWeightedAssetsYear5 = null;
        $scope.TotalAssetsForLeverageYear0 = null;
        $scope.TotalAssetsForLeverageYear1 = null;
        $scope.TotalAssetsForLeverageYear2 = null;
        $scope.TotalAssetsForLeverageYear3 = null;
        $scope.TotalAssetsForLeverageYear4 = null;
        $scope.TotalAssetsForLeverageYear5 = null;
        $scope.NewAcquisitionAssetsYear0 = null;
        $scope.NewAcquisitionAssetsYear1 = null;
        $scope.NewAcquisitionAssetsYear2 = null;
        $scope.NewAcquisitionAssetsYear3 = null;
        $scope.NewAcquisitionAssetsYear4 = null;
        $scope.NewAcquisitionAssetsYear5 = null;
        $scope.AssetGrowthRateYear0 = null;
        $scope.AssetGrowthRateYear1 = null;
        $scope.AssetGrowthRateYear2 = null;
        $scope.AssetGrowthRateYear3 = null;
        $scope.AssetGrowthRateYear4 = null;
        $scope.AssetGrowthRateYear5 = null;
        $scope.ReturnOnAverageAssetsYear0 = null;
        $scope.ReturnOnAverageAssetsYear1 = null;
        $scope.ReturnOnAverageAssetsYear2 = null;
        $scope.ReturnOnAverageAssetsYear3 = null;
        $scope.ReturnOnAverageAssetsYear4 = null;
        $scope.ReturnOnAverageAssetsYear5 = null;
        $scope.SharesOutstandingActualPriorYear = null;
        $scope.SharesOutstandingActualCurrentQuarter = null;
        $scope.SharesOutstandingActualYear0 = null;
        $scope.SharesOutstandingActualYear1 = null;
        $scope.SharesOutstandingActualYear2 = null;
        $scope.SharesOutstandingActualYear3 = null;
        $scope.SharesOutstandingActualYear4 = null;
        $scope.SharesOutstandingActualYear5 = null;

        $rootScope.chkNetIncome = false;
		$rootScope.chkCashDividends = false;
		$rootScope.chkNewCapital = false;
		$rootScope.chkCet1CapitalAdjustment = false;
		$rootScope.chkTier1CapitalAdjustment = false;
		$rootScope.chkTier2Capital = false;
		$rootScope.chkRiskWeightedAssets = false;
		$rootScope.chkTotalAssetsForLeverage = false;
	
		if ($rootScope.chkNetIncome === true) {
            angular.element(document.querySelector('#netIncomeYear0')).removeClass('hidden');
            angular.element(document.querySelector('#netIncomeYear1')).removeClass('hidden');
            angular.element(document.querySelector('#netIncomeYear2')).removeClass('hidden');
            angular.element(document.querySelector('#netIncomeYear3')).removeClass('hidden');
            angular.element(document.querySelector('#netIncomeYear4')).removeClass('hidden');
            angular.element(document.querySelector('#netIncomeYear5')).removeClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear0')).addClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear1')).addClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear2')).addClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear3')).addClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear4')).addClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear5')).addClass('hidden');
        }
        else {
            angular.element(document.querySelector('#netIncomeYear0')).addClass('hidden');
            angular.element(document.querySelector('#netIncomeYear1')).addClass('hidden');
            angular.element(document.querySelector('#netIncomeYear2')).addClass('hidden');
            angular.element(document.querySelector('#netIncomeYear3')).addClass('hidden');
            angular.element(document.querySelector('#netIncomeYear4')).addClass('hidden');
            angular.element(document.querySelector('#netIncomeYear5')).addClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear0')).removeClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear1')).removeClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear2')).removeClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear3')).removeClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear4')).removeClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear5')).removeClass('hidden');
        }

        if ($rootScope.chkCashDividends === true) {
            angular.element(document.querySelector('#year0Dividend')).removeClass('hidden');
            angular.element(document.querySelector('#year1Dividend')).removeClass('hidden');
            angular.element(document.querySelector('#year2Dividend')).removeClass('hidden');
            angular.element(document.querySelector('#year3Dividend')).removeClass('hidden');
            angular.element(document.querySelector('#year4Dividend')).removeClass('hidden');
            angular.element(document.querySelector('#year5Dividend')).removeClass('hidden');
            angular.element(document.querySelector('#year0DividendRate')).addClass('hidden');
            angular.element(document.querySelector('#year1DividendRate')).addClass('hidden');
            angular.element(document.querySelector('#year2DividendRate')).addClass('hidden');
            angular.element(document.querySelector('#year3DividendRate')).addClass('hidden');
            angular.element(document.querySelector('#year4DividendRate')).addClass('hidden');
            angular.element(document.querySelector('#year5DividendRate')).addClass('hidden');
        }
        else {
            angular.element(document.querySelector('#year0Dividend')).addClass('hidden');
            angular.element(document.querySelector('#year1Dividend')).addClass('hidden');
            angular.element(document.querySelector('#year2Dividend')).addClass('hidden');
            angular.element(document.querySelector('#year3Dividend')).addClass('hidden');
            angular.element(document.querySelector('#year4Dividend')).addClass('hidden');
            angular.element(document.querySelector('#year5Dividend')).addClass('hidden');
            angular.element(document.querySelector('#year0DividendRate')).removeClass('hidden');
            angular.element(document.querySelector('#year1DividendRate')).removeClass('hidden');
            angular.element(document.querySelector('#year2DividendRate')).removeClass('hidden');
            angular.element(document.querySelector('#year3DividendRate')).removeClass('hidden');
            angular.element(document.querySelector('#year4DividendRate')).removeClass('hidden');
            angular.element(document.querySelector('#year5DividendRate')).removeClass('hidden');
        }

        if ($rootScope.chkNewCapital === true) {
            angular.element(document.querySelector('#newCapitalYear0')).removeClass('hidden');
            angular.element(document.querySelector('#newCapitalYear1')).removeClass('hidden');
            angular.element(document.querySelector('#newCapitalYear2')).removeClass('hidden');
            angular.element(document.querySelector('#newCapitalYear3')).removeClass('hidden');
            angular.element(document.querySelector('#newCapitalYear4')).removeClass('hidden');
            angular.element(document.querySelector('#newCapitalYear5')).removeClass('hidden');
        }
        else
        {
            angular.element(document.querySelector('#newCapitalYear0')).addClass('hidden');
            angular.element(document.querySelector('#newCapitalYear1')).addClass('hidden');
            angular.element(document.querySelector('#newCapitalYear2')).addClass('hidden');
            angular.element(document.querySelector('#newCapitalYear3')).addClass('hidden');
            angular.element(document.querySelector('#newCapitalYear4')).addClass('hidden');
            angular.element(document.querySelector('#newCapitalYear5')).addClass('hidden');
        }

        if ($rootScope.chkNewCapital === true) {
            angular.element(document.querySelector('#pricePerShareYear0')).removeClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear1')).removeClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear2')).removeClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear3')).removeClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear4')).removeClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear5')).removeClass('hidden');
        }
        else
        {
            angular.element(document.querySelector('#pricePerShareYear0')).addClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear1')).addClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear2')).addClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear3')).addClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear4')).addClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear5')).addClass('hidden');
        }

        if ($rootScope.chkNewCapital === true) {
            angular.element(document.querySelector('#newAcquisitionAssetsYear0')).removeClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear1')).removeClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear2')).removeClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear3')).removeClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear4')).removeClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear5')).removeClass('hidden');
        }
        else
        {
            angular.element(document.querySelector('#newAcquisitionAssetsYear0')).addClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear1')).addClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear2')).addClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear3')).addClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear4')).addClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear5')).addClass('hidden');
        }

        if ($rootScope.chkCet1CapitalAdjustment === true) {
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear0')).removeClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear1')).removeClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear2')).removeClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear3')).removeClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear4')).removeClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear5')).removeClass('hidden');
        }
        else
        {
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear0')).addClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear1')).addClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear2')).addClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear3')).addClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear4')).addClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear5')).addClass('hidden');
        }

        if ($rootScope.chkTier1CapitalAdjustment === true) {
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear0')).removeClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear1')).removeClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear2')).removeClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear3')).removeClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear4')).removeClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear5')).removeClass('hidden');
        }
        else
        {
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear0')).addClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear1')).addClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear2')).addClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear3')).addClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear4')).addClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear5')).addClass('hidden');
        }

        if ($rootScope.chkTier2Capital === true) {
            angular.element(document.querySelector('#tier2CapitalYear0')).removeClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear1')).removeClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear2')).removeClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear3')).removeClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear4')).removeClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear5')).removeClass('hidden');
        }
        else
        {
            angular.element(document.querySelector('#tier2CapitalYear0')).addClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear1')).addClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear2')).addClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear3')).addClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear4')).addClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear5')).addClass('hidden');
        }

        if ($rootScope.chkRiskWeightedAssets === true) {
            angular.element(document.querySelector('#riskWeightedAssetsYear0')).removeClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear1')).removeClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear2')).removeClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear3')).removeClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear4')).removeClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear5')).removeClass('hidden');
        }
        else
        {
            angular.element(document.querySelector('#riskWeightedAssetsYear0')).addClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear1')).addClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear2')).addClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear3')).addClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear4')).addClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear5')).addClass('hidden');
        }

        if ($rootScope.chkTotalAssetsForLeverage === true) {
            angular.element(document.querySelector('#totalAssetsLeverageYear0')).removeClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear1')).removeClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear2')).removeClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear3')).removeClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear4')).removeClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear5')).removeClass('hidden');
        }
        else
        {
            angular.element(document.querySelector('#totalAssetsLeverageYear0')).addClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear1')).addClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear2')).addClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear3')).addClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear4')).addClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear5')).addClass('hidden');
        }
    }

    var setInputData = function (modelObj) {
        try {
            $rootScope.chkNetIncome = modelObj.useNetIncomeInput;
            $rootScope.chkCashDividends = modelObj.useCashDividendsInput;
            $rootScope.chkNewCapital = modelObj.useNewCapitalInput;
            $rootScope.chkCet1CapitalAdjustment = modelObj.useCet1CapitalAdjustmentInput;
            $rootScope.chkTier1CapitalAdjustment = modelObj.useTier1CapitalAdjustmentInput;
            $rootScope.chkTier2Capital = modelObj.useTier2CapitalInput;
            $rootScope.chkRiskWeightedAssets = modelObj.useRiskWeightedAssetsInput;
            $rootScope.chkTotalAssetsForLeverage = modelObj.useTotalAssetsForLeverageInput;
            $rootScope.chkSharesOutstanding = modelObj.useSharesOutstandingInput;

            $scope.NetIncomeYear0 = modelObj.netIncomeYear0;
            $scope.NetIncomeYear1 = modelObj.netIncomeYear1;
            $scope.NetIncomeYear2 = modelObj.netIncomeYear2;
            $scope.NetIncomeYear3 = modelObj.netIncomeYear3;
            $scope.NetIncomeYear4 = modelObj.netIncomeYear4;
            $scope.NetIncomeYear5 = modelObj.netIncomeYear5;
            $scope.DividendsYear0 = modelObj.dividendsYear0;
            $scope.DividendsYear1 = modelObj.dividendsYear1;
            $scope.DividendsYear2 = modelObj.dividendsYear2;
            $scope.DividendsYear3 = modelObj.dividendsYear3;
            $scope.DividendsYear4 = modelObj.dividendsYear4;
            $scope.DividendsYear5 = modelObj.dividendsYear5;
            $scope.DividendsRateYear0 = modelObj.dividendsRateYear0;
            $scope.DividendsRateYear1 = modelObj.dividendsRateYear1;
            $scope.DividendsRateYear2 = modelObj.dividendsRateYear2;
            $scope.DividendsRateYear3 = modelObj.dividendsRateYear3;
            $scope.DividendsRateYear4 = modelObj.dividendsRateYear4;
            $scope.DividendsRateYear5 = modelObj.dividendsRateYear5;
            $scope.NewCapitalYear0 = modelObj.newCapitalYear0;
            $scope.NewCapitalYear1 = modelObj.newCapitalYear1;
            $scope.NewCapitalYear2 = modelObj.newCapitalYear2;
            $scope.NewCapitalYear3 = modelObj.newCapitalYear3;
            $scope.NewCapitalYear4 = modelObj.newCapitalYear4;
            $scope.NewCapitalYear5 = modelObj.newCapitalYear5;
            $scope.Cet1CapitalAdjustmentYear0 = modelObj.cet1CapitalAdjustmentYear0;
            $scope.Cet1CapitalAdjustmentYear1 = modelObj.cet1CapitalAdjustmentYear1;
            $scope.Cet1CapitalAdjustmentYear2 = modelObj.cet1CapitalAdjustmentYear2;
            $scope.Cet1CapitalAdjustmentYear3 = modelObj.cet1CapitalAdjustmentYear3;
            $scope.Cet1CapitalAdjustmentYear4 = modelObj.cet1CapitalAdjustmentYear4;
            $scope.Cet1CapitalAdjustmentYear5 = modelObj.cet1CapitalAdjustmentYear5;

            if (modelObj.useNetIncomeInput === true) {
                $scope.NetIncomeYear0 = modelObj.netIncomeYear0;
                $scope.NetIncomeYear1 = modelObj.netIncomeYear1;
                $scope.NetIncomeYear2 = modelObj.netIncomeYear2;
                $scope.NetIncomeYear3 = modelObj.netIncomeYear3;
                $scope.NetIncomeYear4 = modelObj.netIncomeYear4;
                $scope.NetIncomeYear5 = modelObj.netIncomeYear5;
            }

            $scope.PricePerShareYear0 = modelObj.pricePerShareYear0;
            $scope.PricePerShareYear1 = modelObj.pricePerShareYear1;
            $scope.PricePerShareYear2 = modelObj.pricePerShareYear2;
            $scope.PricePerShareYear3 = modelObj.pricePerShareYear3;
            $scope.PricePerShareYear4 = modelObj.pricePerShareYear4;
            $scope.PricePerShareYear5 = modelObj.pricePerShareYear5;

            if (modelObj.useTier1CapitalAdjustmentInput === true) {
                $scope.Tier1CapitalAdjustmentYear0 = modelObj.tier1CapitalAdjustmentYear0;
                $scope.Tier1CapitalAdjustmentYear1 = modelObj.tier1CapitalAdjustmentYear1;
                $scope.Tier1CapitalAdjustmentYear2 = modelObj.tier1CapitalAdjustmentYear2;
                $scope.Tier1CapitalAdjustmentYear3 = modelObj.tier1CapitalAdjustmentYear3;
                $scope.Tier1CapitalAdjustmentYear4 = modelObj.tier1CapitalAdjustmentYear4;
                $scope.Tier1CapitalAdjustmentYear5 = modelObj.tier1CapitalAdjustmentYear5;
            }

            $scope.Tier2CapitalYear0 = modelObj.tier2CapitalYear0;
            $scope.Tier2CapitalYear1 = modelObj.tier2CapitalYear1;
            $scope.Tier2CapitalYear2 = modelObj.tier2CapitalYear2;
            $scope.Tier2CapitalYear3 = modelObj.tier2CapitalYear3;
            $scope.Tier2CapitalYear4 = modelObj.tier2CapitalYear4;
            $scope.Tier2CapitalYear5 = modelObj.tier2CapitalYear5;
            $scope.RiskWeightedAssetsYear0 = modelObj.riskWeightedAssetsYear0;
            $scope.RiskWeightedAssetsYear1 = modelObj.riskWeightedAssetsYear1;
            $scope.RiskWeightedAssetsYear2 = modelObj.riskWeightedAssetsYear2;
            $scope.RiskWeightedAssetsYear3 = modelObj.riskWeightedAssetsYear3;
            $scope.RiskWeightedAssetsYear4 = modelObj.riskWeightedAssetsYear4;
            $scope.RiskWeightedAssetsYear5 = modelObj.riskWeightedAssetsYear5;
            $scope.TotalAssetsForLeverageYear0 = modelObj.totalAssetsLeverageYear0;
            $scope.TotalAssetsForLeverageYear1 = modelObj.totalAssetsLeverageYear1;
            $scope.TotalAssetsForLeverageYear2 = modelObj.totalAssetsLeverageYear2;
            $scope.TotalAssetsForLeverageYear3 = modelObj.totalAssetsLeverageYear3;
            $scope.TotalAssetsForLeverageYear4 = modelObj.totalAssetsLeverageYear4;
            $scope.TotalAssetsForLeverageYear5 = modelObj.totalAssetsLeverageYear5;
            $scope.NewAcquisitionAssetsYear0 = modelObj.newAcquisitionAssetsYear0;
            $scope.NewAcquisitionAssetsYear1 = modelObj.newAcquisitionAssetsYear1;
            $scope.NewAcquisitionAssetsYear2 = modelObj.newAcquisitionAssetsYear2;
            $scope.NewAcquisitionAssetsYear3 = modelObj.newAcquisitionAssetsYear3;
            $scope.NewAcquisitionAssetsYear4 = modelObj.newAcquisitionAssetsYear4;
            $scope.NewAcquisitionAssetsYear5 = modelObj.newAcquisitionAssetsYear5;
            $scope.AssetGrowthRateYear0 = modelObj.assetGrowthRateYear0;
            $scope.AssetGrowthRateYear1 = modelObj.assetGrowthRateYear1;
            $scope.AssetGrowthRateYear2 = modelObj.assetGrowthRateYear2;
            $scope.AssetGrowthRateYear3 = modelObj.assetGrowthRateYear3;
            $scope.AssetGrowthRateYear4 = modelObj.assetGrowthRateYear4;
            $scope.AssetGrowthRateYear5 = modelObj.assetGrowthRateYear5;
            $scope.ReturnOnAverageAssetsYear0 = modelObj.returnOnAverageAssetsYear0;
            $scope.ReturnOnAverageAssetsYear1 = modelObj.returnOnAverageAssetsYear1;
            $scope.ReturnOnAverageAssetsYear2 = modelObj.returnOnAverageAssetsYear2;
            $scope.ReturnOnAverageAssetsYear3 = modelObj.returnOnAverageAssetsYear3;
            $scope.ReturnOnAverageAssetsYear4 = modelObj.returnOnAverageAssetsYear4;
            $scope.ReturnOnAverageAssetsYear5 = modelObj.returnOnAverageAssetsYear5;
            $scope.SharesOutstandingActualPriorYear = modelObj.sharesOutstandingActualPriorYear;
            $scope.SharesOutstandingActualCurrentQuarter = modelObj.sharesOutstandingActualCurrentQuarter;
            $scope.SharesOutstandingActualYear0 = modelObj.sharesOutstandingActualYear0;
            $scope.SharesOutstandingActualYear1 = modelObj.sharesOutstandingActualYear1;
            $scope.SharesOutstandingActualYear2 = modelObj.sharesOutstandingActualYear2;
            $scope.SharesOutstandingActualYear3 = modelObj.sharesOutstandingActualYear3;
            $scope.SharesOutstandingActualYear4 = modelObj.sharesOutstandingActualYear4;
            $scope.SharesOutstandingActualYear5 = modelObj.sharesOutstandingActualYear5;

            if (modelObj.useNetIncomeInput === true) {
                angular.element(document.querySelector('#netIncomeYear0')).removeClass('hidden');
                angular.element(document.querySelector('#netIncomeYear1')).removeClass('hidden');
                angular.element(document.querySelector('#netIncomeYear2')).removeClass('hidden');
                angular.element(document.querySelector('#netIncomeYear3')).removeClass('hidden');
                angular.element(document.querySelector('#netIncomeYear4')).removeClass('hidden');
                angular.element(document.querySelector('#netIncomeYear5')).removeClass('hidden');
                angular.element(document.querySelector('#returnOnAverageAssetsYear0')).addClass('hidden');
                angular.element(document.querySelector('#returnOnAverageAssetsYear1')).addClass('hidden');
                angular.element(document.querySelector('#returnOnAverageAssetsYear2')).addClass('hidden');
                angular.element(document.querySelector('#returnOnAverageAssetsYear3')).addClass('hidden');
                angular.element(document.querySelector('#returnOnAverageAssetsYear4')).addClass('hidden');
                angular.element(document.querySelector('#returnOnAverageAssetsYear5')).addClass('hidden');
            }
            else {
                angular.element(document.querySelector('#netIncomeYear0')).addClass('hidden');
                angular.element(document.querySelector('#netIncomeYear1')).addClass('hidden');
                angular.element(document.querySelector('#netIncomeYear2')).addClass('hidden');
                angular.element(document.querySelector('#netIncomeYear3')).addClass('hidden');
                angular.element(document.querySelector('#netIncomeYear4')).addClass('hidden');
                angular.element(document.querySelector('#netIncomeYear5')).addClass('hidden');
                angular.element(document.querySelector('#returnOnAverageAssetsYear0')).removeClass('hidden');
                angular.element(document.querySelector('#returnOnAverageAssetsYear1')).removeClass('hidden');
                angular.element(document.querySelector('#returnOnAverageAssetsYear2')).removeClass('hidden');
                angular.element(document.querySelector('#returnOnAverageAssetsYear3')).removeClass('hidden');
                angular.element(document.querySelector('#returnOnAverageAssetsYear4')).removeClass('hidden');
                angular.element(document.querySelector('#returnOnAverageAssetsYear5')).removeClass('hidden');
            }

            if (modelObj.useCashDividendsInput === true) {
                angular.element(document.querySelector('#year0Dividend')).removeClass('hidden');
                angular.element(document.querySelector('#year1Dividend')).removeClass('hidden');
                angular.element(document.querySelector('#year2Dividend')).removeClass('hidden');
                angular.element(document.querySelector('#year3Dividend')).removeClass('hidden');
                angular.element(document.querySelector('#year4Dividend')).removeClass('hidden');
                angular.element(document.querySelector('#year5Dividend')).removeClass('hidden');
                angular.element(document.querySelector('#year0DividendRate')).addClass('hidden');
                angular.element(document.querySelector('#year1DividendRate')).addClass('hidden');
                angular.element(document.querySelector('#year2DividendRate')).addClass('hidden');
                angular.element(document.querySelector('#year3DividendRate')).addClass('hidden');
                angular.element(document.querySelector('#year4DividendRate')).addClass('hidden');
                angular.element(document.querySelector('#year5DividendRate')).addClass('hidden');
            }
            else {
                angular.element(document.querySelector('#year0Dividend')).addClass('hidden');
                angular.element(document.querySelector('#year1Dividend')).addClass('hidden');
                angular.element(document.querySelector('#year2Dividend')).addClass('hidden');
                angular.element(document.querySelector('#year3Dividend')).addClass('hidden');
                angular.element(document.querySelector('#year4Dividend')).addClass('hidden');
                angular.element(document.querySelector('#year5Dividend')).addClass('hidden');
                angular.element(document.querySelector('#year0DividendRate')).removeClass('hidden');
                angular.element(document.querySelector('#year1DividendRate')).removeClass('hidden');
                angular.element(document.querySelector('#year2DividendRate')).removeClass('hidden');
                angular.element(document.querySelector('#year3DividendRate')).removeClass('hidden');
                angular.element(document.querySelector('#year4DividendRate')).removeClass('hidden');
                angular.element(document.querySelector('#year5DividendRate')).removeClass('hidden');
            }

            if (modelObj.useNewCapitalInput === true) {
                angular.element(document.querySelector('#newCapitalYear0')).removeClass('hidden');
                angular.element(document.querySelector('#newCapitalYear1')).removeClass('hidden');
                angular.element(document.querySelector('#newCapitalYear2')).removeClass('hidden');
                angular.element(document.querySelector('#newCapitalYear3')).removeClass('hidden');
                angular.element(document.querySelector('#newCapitalYear4')).removeClass('hidden');
                angular.element(document.querySelector('#newCapitalYear5')).removeClass('hidden');
            }
            else {
                angular.element(document.querySelector('#newCapitalYear0')).addClass('hidden');
                angular.element(document.querySelector('#newCapitalYear1')).addClass('hidden');
                angular.element(document.querySelector('#newCapitalYear2')).addClass('hidden');
                angular.element(document.querySelector('#newCapitalYear3')).addClass('hidden');
                angular.element(document.querySelector('#newCapitalYear4')).addClass('hidden');
                angular.element(document.querySelector('#newCapitalYear5')).addClass('hidden');
            }

            if (modelObj.useNewCapitalInput === true) {
                angular.element(document.querySelector('#pricePerShareYear0')).removeClass('hidden');
                angular.element(document.querySelector('#pricePerShareYear1')).removeClass('hidden');
                angular.element(document.querySelector('#pricePerShareYear2')).removeClass('hidden');
                angular.element(document.querySelector('#pricePerShareYear3')).removeClass('hidden');
                angular.element(document.querySelector('#pricePerShareYear4')).removeClass('hidden');
                angular.element(document.querySelector('#pricePerShareYear5')).removeClass('hidden');
            }
            else {
                angular.element(document.querySelector('#pricePerShareYear0')).addClass('hidden');
                angular.element(document.querySelector('#pricePerShareYear1')).addClass('hidden');
                angular.element(document.querySelector('#pricePerShareYear2')).addClass('hidden');
                angular.element(document.querySelector('#pricePerShareYear3')).addClass('hidden');
                angular.element(document.querySelector('#pricePerShareYear4')).addClass('hidden');
                angular.element(document.querySelector('#pricePerShareYear5')).addClass('hidden');
            }

            if (modelObj.useNewCapitalInput === true) {
                angular.element(document.querySelector('#newAcquisitionAssetsYear0')).removeClass('hidden');
                angular.element(document.querySelector('#newAcquisitionAssetsYear1')).removeClass('hidden');
                angular.element(document.querySelector('#newAcquisitionAssetsYear2')).removeClass('hidden');
                angular.element(document.querySelector('#newAcquisitionAssetsYear3')).removeClass('hidden');
                angular.element(document.querySelector('#newAcquisitionAssetsYear4')).removeClass('hidden');
                angular.element(document.querySelector('#newAcquisitionAssetsYear5')).removeClass('hidden');
            }
            else {
                angular.element(document.querySelector('#newAcquisitionAssetsYear0')).addClass('hidden');
                angular.element(document.querySelector('#newAcquisitionAssetsYear1')).addClass('hidden');
                angular.element(document.querySelector('#newAcquisitionAssetsYear2')).addClass('hidden');
                angular.element(document.querySelector('#newAcquisitionAssetsYear3')).addClass('hidden');
                angular.element(document.querySelector('#newAcquisitionAssetsYear4')).addClass('hidden');
                angular.element(document.querySelector('#newAcquisitionAssetsYear5')).addClass('hidden');
            }

            if (modelObj.useCet1CapitalAdjustmentInput === true) {
                angular.element(document.querySelector('#cet1CapitalAdjustmentYear0')).removeClass('hidden');
                angular.element(document.querySelector('#cet1CapitalAdjustmentYear1')).removeClass('hidden');
                angular.element(document.querySelector('#cet1CapitalAdjustmentYear2')).removeClass('hidden');
                angular.element(document.querySelector('#cet1CapitalAdjustmentYear3')).removeClass('hidden');
                angular.element(document.querySelector('#cet1CapitalAdjustmentYear4')).removeClass('hidden');
                angular.element(document.querySelector('#cet1CapitalAdjustmentYear5')).removeClass('hidden');
            }
            else {
                angular.element(document.querySelector('#cet1CapitalAdjustmentYear0')).addClass('hidden');
                angular.element(document.querySelector('#cet1CapitalAdjustmentYear1')).addClass('hidden');
                angular.element(document.querySelector('#cet1CapitalAdjustmentYear2')).addClass('hidden');
                angular.element(document.querySelector('#cet1CapitalAdjustmentYear3')).addClass('hidden');
                angular.element(document.querySelector('#cet1CapitalAdjustmentYear4')).addClass('hidden');
                angular.element(document.querySelector('#cet1CapitalAdjustmentYear5')).addClass('hidden');
            }

            if (modelObj.useTier1CapitalAdjustmentInput === true) {
                angular.element(document.querySelector('#tier1CapitalAdjustmentYear0')).removeClass('hidden');
                angular.element(document.querySelector('#tier1CapitalAdjustmentYear1')).removeClass('hidden');
                angular.element(document.querySelector('#tier1CapitalAdjustmentYear2')).removeClass('hidden');
                angular.element(document.querySelector('#tier1CapitalAdjustmentYear3')).removeClass('hidden');
                angular.element(document.querySelector('#tier1CapitalAdjustmentYear4')).removeClass('hidden');
                angular.element(document.querySelector('#tier1CapitalAdjustmentYear5')).removeClass('hidden');
            }
            else {
                angular.element(document.querySelector('#tier1CapitalAdjustmentYear0')).addClass('hidden');
                angular.element(document.querySelector('#tier1CapitalAdjustmentYear1')).addClass('hidden');
                angular.element(document.querySelector('#tier1CapitalAdjustmentYear2')).addClass('hidden');
                angular.element(document.querySelector('#tier1CapitalAdjustmentYear3')).addClass('hidden');
                angular.element(document.querySelector('#tier1CapitalAdjustmentYear4')).addClass('hidden');
                angular.element(document.querySelector('#tier1CapitalAdjustmentYear5')).addClass('hidden');
            }

            if (modelObj.useTier2CapitalInput === true) {
                angular.element(document.querySelector('#tier2CapitalYear0')).removeClass('hidden');
                angular.element(document.querySelector('#tier2CapitalYear1')).removeClass('hidden');
                angular.element(document.querySelector('#tier2CapitalYear2')).removeClass('hidden');
                angular.element(document.querySelector('#tier2CapitalYear3')).removeClass('hidden');
                angular.element(document.querySelector('#tier2CapitalYear4')).removeClass('hidden');
                angular.element(document.querySelector('#tier2CapitalYear5')).removeClass('hidden');
            }
            else {
                angular.element(document.querySelector('#tier2CapitalYear0')).addClass('hidden');
                angular.element(document.querySelector('#tier2CapitalYear1')).addClass('hidden');
                angular.element(document.querySelector('#tier2CapitalYear2')).addClass('hidden');
                angular.element(document.querySelector('#tier2CapitalYear3')).addClass('hidden');
                angular.element(document.querySelector('#tier2CapitalYear4')).addClass('hidden');
                angular.element(document.querySelector('#tier2CapitalYear5')).addClass('hidden');
            }

            if (modelObj.useRiskWeightedAssetsInput === true) {
                angular.element(document.querySelector('#riskWeightedAssetsYear0')).removeClass('hidden');
                angular.element(document.querySelector('#riskWeightedAssetsYear1')).removeClass('hidden');
                angular.element(document.querySelector('#riskWeightedAssetsYear2')).removeClass('hidden');
                angular.element(document.querySelector('#riskWeightedAssetsYear3')).removeClass('hidden');
                angular.element(document.querySelector('#riskWeightedAssetsYear4')).removeClass('hidden');
                angular.element(document.querySelector('#riskWeightedAssetsYear5')).removeClass('hidden');
            }
            else {
                angular.element(document.querySelector('#riskWeightedAssetsYear0')).addClass('hidden');
                angular.element(document.querySelector('#riskWeightedAssetsYear1')).addClass('hidden');
                angular.element(document.querySelector('#riskWeightedAssetsYear2')).addClass('hidden');
                angular.element(document.querySelector('#riskWeightedAssetsYear3')).addClass('hidden');
                angular.element(document.querySelector('#riskWeightedAssetsYear4')).addClass('hidden');
                angular.element(document.querySelector('#riskWeightedAssetsYear5')).addClass('hidden');
            }

            if (modelObj.useTotalAssetsForLeverageInput === true) {
                angular.element(document.querySelector('#totalAssetsLeverageYear0')).removeClass('hidden');
                angular.element(document.querySelector('#totalAssetsLeverageYear1')).removeClass('hidden');
                angular.element(document.querySelector('#totalAssetsLeverageYear2')).removeClass('hidden');
                angular.element(document.querySelector('#totalAssetsLeverageYear3')).removeClass('hidden');
                angular.element(document.querySelector('#totalAssetsLeverageYear4')).removeClass('hidden');
                angular.element(document.querySelector('#totalAssetsLeverageYear5')).removeClass('hidden');
            }
            else {
                angular.element(document.querySelector('#totalAssetsLeverageYear0')).addClass('hidden');
                angular.element(document.querySelector('#totalAssetsLeverageYear1')).addClass('hidden');
                angular.element(document.querySelector('#totalAssetsLeverageYear2')).addClass('hidden');
                angular.element(document.querySelector('#totalAssetsLeverageYear3')).addClass('hidden');
                angular.element(document.querySelector('#totalAssetsLeverageYear4')).addClass('hidden');
                angular.element(document.querySelector('#totalAssetsLeverageYear5')).addClass('hidden');
            }
        }
        catch (err) {
            alert(err);
        }
    }

    var setPriorCurrentYearData = function (modelObj) {
        $scope.BankEquityCapitalPriorYear = null;
        $scope.BankEquityCapitalCurrentQuarter = null;
        $scope.NetIncomePriorYear = modelObj.netIncomePriorYear;
        $scope.NetIncomeCurrentQuarter = modelObj.netIncomeCurrentQuarter;
        $scope.DividendsPriorYear = modelObj.dividendsPriorYear;
        $scope.DividendsCurrentQuarter = modelObj.dividendsCurrentQuarter;
        $scope.DividendsRatePriorYear = modelObj.dividendsRatePriorYear * 100;
        $scope.DividendsRateCurrentQuarter = modelObj.dividendsRateCurrentQuarter * 100;

        if ((typeof $scope.NetIncomePriorYear !== 'undefined' && $scope.NetIncomePriorYear !== null && $scope.NetIncomePriorYear > 0) && (typeof $scope.DividendsPriorYear !== 'undefined' && $scope.DividendsPriorYear !== null && Math.abs($scope.DividendsPriorYear) > 0)) {
            $scope.DividendsRatePriorYear = ($scope.DividendsPriorYear / $scope.NetIncomePriorYear) * 100;
        }

        if ((typeof $scope.NetIncomeCurrentQuarter !== 'undefined' && $scope.NetIncomeCurrentQuarter !== null && $scope.NetIncomeCurrentQuarter > 0) && (typeof $scope.DividendsCurrentQuarter !== 'undefined' && $scope.DividendsCurrentQuarter !== null && Math.abs($scope.DividendsCurrentQuarter) > 0)) {
            if ($scope.NetIncomeCurrentQuarter === 0)
                $scope.DividendsRateCurrentQuarter = 0;
            else
                $scope.DividendsRateCurrentQuarter = ($scope.DividendsCurrentQuarter / $scope.NetIncomeCurrentQuarter) * 100;
        }

        $scope.BankEquityCapitalPriorYear = modelObj.bankEquityCapitalPriorYear;
        $scope.BankEquityCapitalCurrentQuarter = modelObj.bankEquityCapitalCurrentQuarter;
        $scope.NewCapitalPriorYear = modelObj.newCapitalPriorYear;
        $scope.NewCapitalCurrentQuarter = modelObj.newCapitalCurrentQuarter;
        $scope.Cet1CapitalAdjustmentPriorYear = modelObj.cet1CapitalAdjustmentPriorYear;
        $scope.Cet1CapitalAdjustmentCurrentQuarter = modelObj.cet1CapitalAdjustmentCurrentQuarter;
        $scope.PricePerSharePriorYear = modelObj.pricePerSharePriorYear;
        $scope.PricePerShareCurrentQuarter = modelObj.pricePerShareCurrentQuarter;
        $scope.Cet1CapitalPriorYear = modelObj.cet1CapitalPriorYear;
        $scope.Cet1CapitalCurrentQuarter = modelObj.cet1CapitalCurrentQuarter;
        $scope.Tier1CapitalAdjustmentPriorYear = modelObj.tier1CapitalAdjustmentPriorYear;
        $scope.Tier1CapitalAdjustmentCurrentQuarter = modelObj.tier1CapitalAdjustmentCurrentQuarter;
        $scope.Tier1CapitalPriorYear = modelObj.tier1CapitalPriorYear;
        $scope.Tier1CapitalCurrentQuarter = modelObj.tier1CapitalCurrentQuarter;
        $scope.Tier2CapitalPriorYear = modelObj.tier2CapitalPriorYear;
        $scope.Tier2CapitalCurrentQuarter = modelObj.tier2CapitalCurrentQuarter;
        $scope.TotalRiskBasedCapitalPriorYear = modelObj.totalRiskBasedCapitalPriorYear;
        $scope.TotalRiskBasedCapitalCurrentQuarter = modelObj.totalRiskBasedCapitalCurrentQuarter;
        $scope.RiskWeightedAssetsPriorYear = modelObj.riskWeightedAssetsPriorYear;
        $scope.RiskWeightedAssetsCurrentQuarter = modelObj.riskWeightedAssetsCurrentQuarter;
        $scope.TotalAssetsForLeveragePriorYear = modelObj.totalAssetsForLeveragePriorYear;
        $scope.TotalAssetsForLeverageCurrentQuarter = modelObj.totalAssetsForLeverageCurrentQuarter;
        $scope.TotalAssetsPriorYear = modelObj.totalAssetsPriorYear;
        $scope.TotalAssetsCurrentQuarter = modelObj.totalAssetsCurrentQuarter;
        $scope.NewAcquisitionAssetsPriorYear = modelObj.newAcquisitionAssetsPriorYear;
        $scope.NewAcquisitionAssetsCurrentQuarter = modelObj.newAcquisitionAssetsCurrentQuarter;
        $scope.Cet1CapitalRatioPriorYear = modelObj.cet1CapitalRatioPriorYear;
        $scope.Cet1CapitalRatioCurrentQuarter = modelObj.cet1CapitalRatioCurrentQuarter;
        $scope.Tier1RBCRatioPriorYear = modelObj.tier1RBCRatioPriorYear;
        $scope.Tier1RBCRatioCurrentQuarter = modelObj.tier1RBCRatioCurrentQuarter;
        $scope.TotalRBCRatioPriorYear = modelObj.totalRBCRatioPriorYear;
        $scope.TotalRBCRatioCurrentQuarter = modelObj.totalRBCRatioCurrentQuarter;
        $scope.Tier1LeverageRatioPriorYear = modelObj.tier1LeverageRatioPriorYear;
        $scope.Tier1LeverageRatioCurrentQuarter = modelObj.tier1LeverageRatioCurrentQuarter;
        $scope.AssetGrowthRatePriorYear = modelObj.assetGrowthRatePriorYear;
        $scope.AssetGrowthRateCurrentQuarter = modelObj.assetGrowthRateCurrentQuarter;
        $scope.ReturnOnAverageAssetsPriorYear = modelObj.returnOnAverageAssetsPriorYear;
        $scope.ReturnOnAverageAssetsCurrentQuarter = modelObj.returnOnAverageAssetsCurrentQuarter;
        $scope.ReturnOnAverageEquityPriorYear = modelObj.returnOnAverageEquityPriorYear;
        $scope.ReturnOnAverageEquityCurrentQuarter = modelObj.returnOnAverageEquityCurrentQuarter;
        
        if ($rootScope.chkCet1CapitalAdjustment === false && typeof $rootScope.SelectedModel.modelKey !== 'undefined') {
            $scope.Cet1CapitalAdjustmentYear0 = modelObj.cet1CapitalAdjustmentPriorYear;
            $scope.Cet1CapitalAdjustmentYear1 = modelObj.cet1CapitalAdjustmentPriorYear;
            $scope.Cet1CapitalAdjustmentYear2 = modelObj.cet1CapitalAdjustmentPriorYear;
            $scope.Cet1CapitalAdjustmentYear3 = modelObj.cet1CapitalAdjustmentPriorYear;
            $scope.Cet1CapitalAdjustmentYear4 = modelObj.cet1CapitalAdjustmentPriorYear;
            $scope.Cet1CapitalAdjustmentYear5 = modelObj.cet1CapitalAdjustmentPriorYear;
        }

        if ($rootScope.chkTier1CapitalAdjustment === false && typeof $rootScope.SelectedModel.modelKey !== 'undefined') {
            $scope.Tier1CapitalAdjustmentYear0 = modelObj.tier1CapitalAdjustmentPriorYear;
            $scope.Tier1CapitalAdjustmentYear1 = modelObj.tier1CapitalAdjustmentPriorYear;
            $scope.Tier1CapitalAdjustmentYear2 = modelObj.tier1CapitalAdjustmentPriorYear;
            $scope.Tier1CapitalAdjustmentYear3 = modelObj.tier1CapitalAdjustmentPriorYear;
            $scope.Tier1CapitalAdjustmentYear4 = modelObj.tier1CapitalAdjustmentPriorYear;
            $scope.Tier1CapitalAdjustmentYear5 = modelObj.tier1CapitalAdjustmentPriorYear;
        }

        doCalculations();
    }

    var getModelDetails = function () {
        if (typeof $rootScope.SelectedModel !== 'undefined' && typeof $rootScope.SelectedBank !== 'undefined') {
            var modelReq = {
                ScenarioKey: $rootScope.SelectedModel.modelKey,
                InstitutionKey: $rootScope.SelectedBank.institutionKey
            };

            var req = {
                method: 'POST',
                url: '/api/StrategicForecastApi/GetModelDetails',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: modelReq
            };

            $http(req).then(function (result) {
                if (result.data != null) {
                    

                    //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
                    $scope.InputScenario = result.data;
                    setInputData(result.data);
                }
                else {
                    //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
                }
            }, function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to save risk ratings. Please send an e-mail to admin@cb-resource.com.');
                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
            });
        }
    }

    var doCalculations = function () {
        $scope.Tier2CapitalToTier1PriorYear = (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * 100;
        $scope.Tier2CapitalToTier1CurrentQuarter = (parseFloat($scope.Tier2CapitalCurrentQuarter) / parseFloat($scope.Tier1CapitalCurrentQuarter)) * 100;
        $scope.RiskWeightedAssetsToAssetsPriorYear = (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * 100;
        $scope.RiskWeightedAssetsToAssetsCurrentQuarter = (parseFloat($scope.RiskWeightedAssetsCurrentQuarter) / parseFloat($scope.TotalAssetsCurrentQuarter)) * 100;
        $scope.AssetsForLeverageToAssetsPriorYear = (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * 100;
        $scope.AssetsForLeverageToAssetsCurrentQuarter = (parseFloat($scope.TotalAssetsForLeverageCurrentQuarter) / parseFloat($scope.TotalAssetsCurrentQuarter)) * 100;
    }

    $scope.UpdateModel = function () {
        if ($scope.updatestrategicForecastForm.$valid) {
            var parameterObject = {
                ModelName: null,
                ModelKey: null,
                UserKey: null,
                AssetGrowthRateYear0: $scope.AssetGrowthRateYear0,
                AssetGrowthRateYear1: $scope.AssetGrowthRateYear1,
                AssetGrowthRateYear2: $scope.AssetGrowthRateYear2,
                AssetGrowthRateYear3: $scope.AssetGrowthRateYear3,
                AssetGrowthRateYear4: $scope.AssetGrowthRateYear4,
                AssetGrowthRateYear5: $scope.AssetGrowthRateYear5,
                UseNetIncomeInput: $rootScope.chkNetIncome,
                UseCashDividendsInput: $rootScope.chkCashDividends,
                UseNewCapitalInput: $rootScope.chkNewCapital,
                UseCet1CapitalAdjustmentInput: $rootScope.chkCet1CapitalAdjustment,
                UseTier1CapitalAdjustmentInput: $rootScope.chkTier1CapitalAdjustment,
                UseTier2CapitalInput:$rootScope.chkTier2Capital,
                UseRiskWeightedAssetsInput:$rootScope.chkRiskWeightedAssets,
                UseTotalAssetsForLeverageInput:$rootScope.chkTotalAssetsForLeverage,
                UseSharesOutstandingInput: $rootScope.chkSharesOutstanding,
                NetIncomeYear0: $scope.NetIncomeYear0,
                NetIncomeYear1: $scope.NetIncomeYear1,
                NetIncomeYear2: $scope.NetIncomeYear2,
                NetIncomeYear3: $scope.NetIncomeYear3,
                NetIncomeYear4: $scope.NetIncomeYear4,
                NetIncomeYear5: $scope.NetIncomeYear5,
                ReturnOnAverageAssetsYear0: $scope.ReturnOnAverageAssetsYear0,
                ReturnOnAverageAssetsYear1: $scope.ReturnOnAverageAssetsYear1,
                ReturnOnAverageAssetsYear2: $scope.ReturnOnAverageAssetsYear2,
                ReturnOnAverageAssetsYear3: $scope.ReturnOnAverageAssetsYear3,
                ReturnOnAverageAssetsYear4: $scope.ReturnOnAverageAssetsYear4,
                ReturnOnAverageAssetsYear5: $scope.ReturnOnAverageAssetsYear5,
                DividendsYear0: $scope.DividendsYear0,
                DividendsYear1: $scope.DividendsYear1,
                DividendsYear2: $scope.DividendsYear2,
                DividendsYear3: $scope.DividendsYear3,
                DividendsYear4: $scope.DividendsYear4,
                DividendsYear5: $scope.DividendsYear5,
                DividendsRateYear0: $scope.DividendsRateYear0,
                DividendsRateYear1: $scope.DividendsRateYear1,
                DividendsRateYear2: $scope.DividendsRateYear2,
                DividendsRateYear3: $scope.DividendsRateYear3,
                DividendsRateYear4: $scope.DividendsRateYear4,
                DividendsRateYear5: $scope.DividendsRateYear5,
                NewCapitalYear0: $scope.NewCapitalYear0,
                NewCapitalYear1: $scope.NewCapitalYear1,
                NewCapitalYear2: $scope.NewCapitalYear2,
                NewCapitalYear3: $scope.NewCapitalYear3,
                NewCapitalYear4: $scope.NewCapitalYear4,
                NewCapitalYear5: $scope.NewCapitalYear5,
                PricePerShareYear0: $scope.PricePerShareYear0,
                PricePerShareYear1: $scope.PricePerShareYear1,
                PricePerShareYear2: $scope.PricePerShareYear2,
                PricePerShareYear3: $scope.PricePerShareYear3,
                PricePerShareYear4: $scope.PricePerShareYear4,
                PricePerShareYear5: $scope.PricePerShareYear5,
                NewAcquisitionAssetsYear0: $scope.NewAcquisitionAssetsYear0,
                NewAcquisitionAssetsYear1: $scope.NewAcquisitionAssetsYear1,
                NewAcquisitionAssetsYear2: $scope.NewAcquisitionAssetsYear2,
                NewAcquisitionAssetsYear3: $scope.NewAcquisitionAssetsYear3,
                NewAcquisitionAssetsYear4: $scope.NewAcquisitionAssetsYear4,
                NewAcquisitionAssetsYear5: $scope.NewAcquisitionAssetsYear5,
                Cet1CapitalAdjustmentYear0: $scope.Cet1CapitalAdjustmentYear0,
                Cet1CapitalAdjustmentYear1: $scope.Cet1CapitalAdjustmentYear1,
                Cet1CapitalAdjustmentYear2: $scope.Cet1CapitalAdjustmentYear2,
                Cet1CapitalAdjustmentYear3: $scope.Cet1CapitalAdjustmentYear3,
                Cet1CapitalAdjustmentYear4: $scope.Cet1CapitalAdjustmentYear4,
                Cet1CapitalAdjustmentYear5: $scope.Cet1CapitalAdjustmentYear5,
                Tier1CapitalAdjustmentYear0: $scope.Tier1CapitalAdjustmentYear0,
                Tier1CapitalAdjustmentYear1: $scope.Tier1CapitalAdjustmentYear1,
                Tier1CapitalAdjustmentYear2: $scope.Tier1CapitalAdjustmentYear2,
                Tier1CapitalAdjustmentYear3: $scope.Tier1CapitalAdjustmentYear3,
                Tier1CapitalAdjustmentYear4: $scope.Tier1CapitalAdjustmentYear4,
                Tier1CapitalAdjustmentYear5: $scope.Tier1CapitalAdjustmentYear5,
                Tier2CapitalYear0: $scope.Tier2CapitalYear0,
                Tier2CapitalYear1: $scope.Tier2CapitalYear1,
                Tier2CapitalYear2: $scope.Tier2CapitalYear2,
                Tier2CapitalYear3: $scope.Tier2CapitalYear3,
                Tier2CapitalYear4: $scope.Tier2CapitalYear4,
                Tier2CapitalYear5: $scope.Tier2CapitalYear5,
                RiskWeightedAssetsYear0: $scope.RiskWeightedAssetsYear0,
                RiskWeightedAssetsYear1: $scope.RiskWeightedAssetsYear1,
                RiskWeightedAssetsYear2: $scope.RiskWeightedAssetsYear2,
                RiskWeightedAssetsYear3: $scope.RiskWeightedAssetsYear3,
                RiskWeightedAssetsYear4: $scope.RiskWeightedAssetsYear4,
                RiskWeightedAssetsYear5: $scope.RiskWeightedAssetsYear5,
                TotalAssetsLeverageYear0: $scope.TotalAssetsForLeverageYear0,
                TotalAssetsLeverageYear1: $scope.TotalAssetsForLeverageYear1,
                TotalAssetsLeverageYear2: $scope.TotalAssetsForLeverageYear2,
                TotalAssetsLeverageYear3: $scope.TotalAssetsForLeverageYear3,
                TotalAssetsLeverageYear4: $scope.TotalAssetsForLeverageYear4,
                TotalAssetsLeverageYear5: $scope.TotalAssetsForLeverageYear5,
                SharesOutstandingActualPriorYear: $scope.SharesOutstandingActualPriorYear,
                SharesOutstandingActualCurrentQuarter: $scope.SharesOutstandingActualCurrentQuarter,
                SharesOutstandingActualYear0: $scope.SharesOutstandingActualYear0,
                SharesOutstandingActualYear1: $scope.SharesOutstandingActualYear1,
                SharesOutstandingActualYear2: $scope.SharesOutstandingActualYear2,
                SharesOutstandingActualYear3: $scope.SharesOutstandingActualYear3,
                SharesOutstandingActualYear4: $scope.SharesOutstandingActualYear4,
                SharesOutstandingActualYear5: $scope.SharesOutstandingActualYear5
            };

            if (typeof $rootScope.SelectedModel.modelName !== 'undefined' && $rootScope.SelectedModel.modelName !== 'Create/Edit Scenario') {
                parameterObject.ModelName = $rootScope.SelectedModel.modelName;

                if (typeof $rootScope.SelectedModel.modelKey !== 'undefined') {
                    parameterObject.ModelKey = $rootScope.SelectedModel.modelKey;
                }

                var req = {
                    method: 'POST',
                    url: '/api/StrategicForecastApi/SaveOrUpdateModel',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: parameterObject
                };

                $http(req).then(function (result) {
                    if (result.data != null) {
                        $('#drawerExample-input-filed').drawer().hide();
                        if (typeof $rootScope.SelectedModel.modelKey === 'undefined') {
                            $rootScope.SelectedModel.modelKey = result.data;
                        }

                        $rootScope.$broadcast('StrategicForecastScenarioUpdated', 'Strategic Forecast Scenario Selected');
                    }
                },
                    function () {
                        $scope.toggleErrorMessageBoxModal('An error occurred while trying to save or update the scenario. Please send an e-mail to admin@cb-resource.com.');
                        //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
                    });
            }
            else {
                $scope.toggleErrorMessageBoxModal('Please input a meaningful name for the scenario.');
            }
        }
        else {
            $scope.submitted = true;
        }
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else {
            return $filter('number')(numericValue, fractionSize);
        }
    }

    $scope.EditScenario = function(scenario)
    {

    }

    $scope.DeleteScenario = function(scenario)
    {
        if (confirm('Are you sure you want to delete this scenario?') === true) {
            var deleteParams = {
                ScenarioKey: scenario.modelKey
            };

            var req = {
                method: 'POST',
                url: '/api/StrategicForecastApi/DeleteScenario',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: deleteParams
            };

            $http(req).then(function (result) {
                if (result.data != null) {
                    

                    if (result.data === "True")
                        $scope.toggleErrorMessageBoxModal('Successfully deleted the scenario.');
                }
                else {
                    $scope.toggleErrorMessageBoxModal('An error occurred while trying to delete the scenario. Please send an e-mail to admin@cb-resource.com.');
                }
                GetModelsForUser();
            },
                function () {
                    $scope.toggleErrorMessageBoxModal('An error occurred while trying to delete the scenario. Please send an e-mail to admin@cb-resource.com.');
                    //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
                });
        }
    }

    $scope.ToggleCalculationsSubTab = function (tabName) {
        if (tabName === 'Scenario') {
            $scope.strategicForecastCalculationSubTab = 'strategicForecastScenario';
            angular.element(document.querySelector('#lnkScenario')).addClass('active');
            angular.element(document.querySelector('#lnkValue')).removeClass('active');
            angular.element(document.querySelector('#lnkSummary')).removeClass('active');
            angular.element(document.querySelector('#btnCreateEditScrnario')).removeClass('hidden');
            angular.element(document.querySelector('#btnViewExistingScenario')).removeClass('hidden');
            angular.element(document.querySelector('#btnSaveSummary')).addClass('hidden');
            angular.element(document.querySelector('#btnViewExistingSummaries')).addClass('hidden');
        }
        else if (tabName === 'Value') {
            $scope.strategicForecastCalculationSubTab = 'strategicForecastValue';
            angular.element(document.querySelector('#lnkValue')).addClass('active');
            angular.element(document.querySelector('#lnkScenario')).removeClass('active');
            angular.element(document.querySelector('#lnkSummary')).removeClass('active');
            angular.element(document.querySelector('#btnCreateEditScrnario')).removeClass('hidden');
            angular.element(document.querySelector('#btnViewExistingScenario')).removeClass('hidden');
            angular.element(document.querySelector('#btnSaveSummary')).addClass('hidden');
            angular.element(document.querySelector('#btnViewExistingSummaries')).addClass('hidden');
        }
        else {
            $scope.strategicForecastCalculationSubTab = 'strategicForecastSummary';
            angular.element(document.querySelector('#lnkSummary')).addClass('active');
            angular.element(document.querySelector('#lnkScenario')).removeClass('active');
            angular.element(document.querySelector('#lnkValue')).removeClass('active');
            angular.element(document.querySelector('#btnCreateEditScrnario')).addClass('hidden');
            angular.element(document.querySelector('#btnViewExistingScenario')).addClass('hidden');
            angular.element(document.querySelector('#btnSaveSummary')).removeClass('hidden');
            angular.element(document.querySelector('#btnViewExistingSummaries')).removeClass('hidden');
        }
    }

    $rootScope.ShowInputFieldDrawer = function ($event) {
        if ($scope.StrategicForecastModels.length > 0) {
            var selectedModel = $scope.StrategicForecastModels.filter(function (obj) {
                return obj.isSelected === true;
            })[0];

            if (typeof selectedModel !== 'undefined' && selectedModel.userKey === $scope.UserInfo.userKey) {
                angular.element(document.querySelector('#txtSaveOrUpdateModel')).removeAttr('disabled');
                angular.element(document.querySelector('#btnSaveOrUpdateModel')).removeAttr('disabled');
                $('#drawerExample-input-filed').drawer().show();
            }
            else {
                angular.element(document.querySelector('#txtSaveOrUpdateModel')).attr('disabled', '');
                angular.element(document.querySelector('#btnSaveOrUpdateModel')).attr('disabled', '');
                $('#drawerExample-input-filed').drawer().show();
            }
        }
        else {
            $('#drawerExample-input-filed').drawer().show();
        }
    }

    $rootScope.HideInputFieldDrawer = function ($event) {
        $('#drawerExample-input-filed').drawer().hide();
    }

    $scope.ShowSaveModelDrawer = function ($event) {
        $('#drawerExample-save-model').drawer().show();
    }

    $scope.HideSaveModelDrawer = function ($event) {
        $('#drawerExample-save-model').drawer().hide();
    }

    $scope.ShowCopyModelDrawer = function ($event) {
        if ($rootScope.SelectedModel.modelKey > 0)
            $('#drawerExample-copy-model').drawer().show();
        else
            $scope.toggleErrorMessageBoxModal('Please select a model to copy.');
    }

    $scope.HideCopyModelDrawer = function ($event) {
        $('#drawerExample-copy-model').drawer().hide();
    }

    $scope.ShowSaveSummaryDrawer = function ($event) {
        angular.element(document.querySelector('#btnSaveComparison')).attr('disabled', '');
        $scope.ComparisonName = '';
        $('#drawerExample-save-summary').drawer().show();
    }

    $scope.HideSaveSummaryDrawer = function ($event) {
        $('#drawerExample-save-summary').drawer().hide();
    }

    $scope.ShowViewSavedSummaryDrawer = function ($event) {
        getAllComparisons();
        $('#drawerExample-view-saved-summaries').drawer().show();
    }

    $scope.HideViewSavedSummaryDrawer = function ($event) {
        $('#drawerExample-view-saved-summaries').drawer().hide();
    }

    $scope.ShowSelectExistingModelDrawer = function ($event) {
        $scope.StrategicForecastModels = [];
        GetModelsForUser();
        $('#drawerExample-view-save-model').drawer().show();
    }

    $scope.HideSelectExistingModelDrawer = function ($event) {
        $('#drawerExample-view-save-model').drawer().hide();
    }

    $scope.SelectModel = function (modelObj) {
        $rootScope.SelectedModel = modelObj;
        $('#drawerExample-view-save-model').drawer().hide();
        $rootScope.$broadcast('StrategicForecastScenarioSelected', 'Strategic Forecast Scenario Selected');
        resetInputData();
        getModelDetails();
    }

    $scope.DefineNewScenario = function()
    {
        if (typeof $rootScope.SelectedModel.modelKey !== "undefined" && $rootScope.SelectedModel.modelKey > 0)
        {
            $rootScope.$broadcast('ResetCalculations', 'ResetCalculations');
        }

        $rootScope.SelectedModel = { modelName: 'Create/Edit Scenario' };
        if ($scope.StrategicForecastModels.length > 0) {
            var selectedModel = $scope.StrategicForecastModels.filter(function (obj) {
                return obj.isSelected === true;
            })[0];

            if (typeof selectedModel !== 'undefined') {
                selectedModel.isSelected = false;
            }
        }

        $rootScope.chkNetIncome = false;
        $rootScope.chkCashDividends = false;
        $rootScope.chkNewCapital = false;
        $rootScope.chkCet1CapitalAdjustment = false;
        $rootScope.chkTier1CapitalAdjustment = false;
        $rootScope.chkTier2Capital = false;
        $rootScope.chkRiskWeightedAssets = false;
        $rootScope.chkTotalAssetsForLeverage = false;
        $rootScope.chkSharesOutstanding = false;

        resetInputData();
        $scope.InputScenario = null;
        $('#drawerExample-view-save-model').drawer().hide();
        $('#drawerExample-input-filed').drawer().show();
    }

    var GetModelsForUser = function () {
        angular.element(document.querySelector('#existingModelLoader')).removeClass('hidden');
        var req = {
            method: 'GET',
            url: '/api/StrategicForecastApi/GetModels',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            

            var resultData = result.data;
            if (result.data != null && result.data.length > 0) {
                angular.element(document.querySelector('#existingModelLoader')).addClass('hidden');
                $scope.StrategicForecastModels = result.data;
            }
            else {
                angular.element(document.querySelector('#existingModelLoader')).addClass('hidden');
            }
        }, function () {
            angular.element(document.querySelector('#existingModelLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get favorite banks. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    $scope.SelectFavoriteBank = function ($event, favoriteBank) {
        $rootScope.SelectedBank = favoriteBank;
        $scope.SelectedBankName = $rootScope.SelectedBank.institutionName;
        $scope.SelectedBankFdicNumber = $rootScope.SelectedBank.certNumber;
        $rootScope.$broadcast('SelectedInstitutionChanged', 'Selected Institution Changed');
        getDashboardConcepts();
    }

    $scope.ToggleNetIncomeInput = function ($event) {
        $rootScope.chkNetIncome = !$rootScope.chkNetIncome;
        if ($rootScope.chkNetIncome === true) {
            angular.element(document.querySelector('#netIncomeYear0')).removeClass('hidden');
            angular.element(document.querySelector('#netIncomeYear1')).removeClass('hidden');
            angular.element(document.querySelector('#netIncomeYear2')).removeClass('hidden');
            angular.element(document.querySelector('#netIncomeYear3')).removeClass('hidden');
            angular.element(document.querySelector('#netIncomeYear4')).removeClass('hidden');
            angular.element(document.querySelector('#netIncomeYear5')).removeClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear0')).addClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear1')).addClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear2')).addClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear3')).addClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear4')).addClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear5')).addClass('hidden');
        }
        else {
            angular.element(document.querySelector('#netIncomeYear0')).addClass('hidden');
            angular.element(document.querySelector('#netIncomeYear1')).addClass('hidden');
            angular.element(document.querySelector('#netIncomeYear2')).addClass('hidden');
            angular.element(document.querySelector('#netIncomeYear3')).addClass('hidden');
            angular.element(document.querySelector('#netIncomeYear4')).addClass('hidden');
            angular.element(document.querySelector('#netIncomeYear5')).addClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear0')).removeClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear1')).removeClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear2')).removeClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear3')).removeClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear4')).removeClass('hidden');
            angular.element(document.querySelector('#returnOnAverageAssetsYear5')).removeClass('hidden');
        }
    }

    $scope.ToggleDividendsInput = function ($event) {
        $rootScope.chkCashDividends = !$rootScope.chkCashDividends;
        if ($rootScope.chkCashDividends === true) {
            angular.element(document.querySelector('#year0Dividend')).removeClass('hidden');
            angular.element(document.querySelector('#year1Dividend')).removeClass('hidden');
            angular.element(document.querySelector('#year2Dividend')).removeClass('hidden');
            angular.element(document.querySelector('#year3Dividend')).removeClass('hidden');
            angular.element(document.querySelector('#year4Dividend')).removeClass('hidden');
            angular.element(document.querySelector('#year5Dividend')).removeClass('hidden');
            angular.element(document.querySelector('#year0DividendRate')).addClass('hidden');
            angular.element(document.querySelector('#year1DividendRate')).addClass('hidden');
            angular.element(document.querySelector('#year2DividendRate')).addClass('hidden');
            angular.element(document.querySelector('#year3DividendRate')).addClass('hidden');
            angular.element(document.querySelector('#year4DividendRate')).addClass('hidden');
            angular.element(document.querySelector('#year5DividendRate')).addClass('hidden');
        }
        else {
            angular.element(document.querySelector('#year0Dividend')).addClass('hidden');
            angular.element(document.querySelector('#year1Dividend')).addClass('hidden');
            angular.element(document.querySelector('#year2Dividend')).addClass('hidden');
            angular.element(document.querySelector('#year3Dividend')).addClass('hidden');
            angular.element(document.querySelector('#year4Dividend')).addClass('hidden');
            angular.element(document.querySelector('#year5Dividend')).addClass('hidden');
            angular.element(document.querySelector('#year0DividendRate')).removeClass('hidden');
            angular.element(document.querySelector('#year1DividendRate')).removeClass('hidden');
            angular.element(document.querySelector('#year2DividendRate')).removeClass('hidden');
            angular.element(document.querySelector('#year3DividendRate')).removeClass('hidden');
            angular.element(document.querySelector('#year4DividendRate')).removeClass('hidden');
            angular.element(document.querySelector('#year5DividendRate')).removeClass('hidden');
        }
    }

    $scope.ToggleNewCapital = function ($event) {
        $rootScope.chkNewCapital = !$rootScope.chkNewCapital;
        if ($rootScope.chkNewCapital === true) {
            angular.element(document.querySelector('#newCapitalYear0')).removeClass('hidden');
            angular.element(document.querySelector('#newCapitalYear1')).removeClass('hidden');
            angular.element(document.querySelector('#newCapitalYear2')).removeClass('hidden');
            angular.element(document.querySelector('#newCapitalYear3')).removeClass('hidden');
            angular.element(document.querySelector('#newCapitalYear4')).removeClass('hidden');
            angular.element(document.querySelector('#newCapitalYear5')).removeClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear0')).removeClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear1')).removeClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear2')).removeClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear3')).removeClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear4')).removeClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear5')).removeClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear0')).removeClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear1')).removeClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear2')).removeClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear3')).removeClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear4')).removeClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear5')).removeClass('hidden');
        }
        else {
            angular.element(document.querySelector('#newCapitalYear0')).addClass('hidden');
            angular.element(document.querySelector('#newCapitalYear1')).addClass('hidden');
            angular.element(document.querySelector('#newCapitalYear2')).addClass('hidden');
            angular.element(document.querySelector('#newCapitalYear3')).addClass('hidden');
            angular.element(document.querySelector('#newCapitalYear4')).addClass('hidden');
            angular.element(document.querySelector('#newCapitalYear5')).addClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear0')).addClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear1')).addClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear2')).addClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear3')).addClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear4')).addClass('hidden');
            angular.element(document.querySelector('#pricePerShareYear5')).addClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear0')).addClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear1')).addClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear2')).addClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear3')).addClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear4')).addClass('hidden');
            angular.element(document.querySelector('#newAcquisitionAssetsYear5')).addClass('hidden');
        }
    }

    $scope.ToggleCet1CapitalAdjustment = function ($event) {
        $rootScope.chkCet1CapitalAdjustment = !$rootScope.chkCet1CapitalAdjustment;
        if ($rootScope.chkCet1CapitalAdjustment === true) {
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear0')).removeClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear1')).removeClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear2')).removeClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear3')).removeClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear4')).removeClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear5')).removeClass('hidden');
            if ($scope.InputScenario !== null) {
                $scope.Cet1CapitalAdjustmentYear0 = $scope.InputScenario.cet1CapitalAdjustmentYear0;
                $scope.Cet1CapitalAdjustmentYear1 = $scope.InputScenario.cet1CapitalAdjustmentYear1;
                $scope.Cet1CapitalAdjustmentYear2 = $scope.InputScenario.cet1CapitalAdjustmentYear2;
                $scope.Cet1CapitalAdjustmentYear3 = $scope.InputScenario.cet1CapitalAdjustmentYear3;
                $scope.Cet1CapitalAdjustmentYear4 = $scope.InputScenario.cet1CapitalAdjustmentYear4;
                $scope.Cet1CapitalAdjustmentYear5 = $scope.InputScenario.cet1CapitalAdjustmentYear5;
            }
        }
        else {
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear0')).addClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear1')).addClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear2')).addClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear3')).addClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear4')).addClass('hidden');
            angular.element(document.querySelector('#cet1CapitalAdjustmentYear5')).addClass('hidden');
        }
    }

    $scope.ToggleTier1CapitalAdjustment = function ($event) {
        $rootScope.chkTier1CapitalAdjustment = !$rootScope.chkTier1CapitalAdjustment;
        if ($rootScope.chkTier1CapitalAdjustment === true) {
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear0')).removeClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear1')).removeClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear2')).removeClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear3')).removeClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear4')).removeClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear5')).removeClass('hidden');
            if ($scope.InputScenario !== null) {
                $scope.Tier1CapitalAdjustmentYear0 = $scope.InputScenario.tier1CapitalAdjustmentYear0;
                $scope.Tier1CapitalAdjustmentYear1 = $scope.InputScenario.tier1CapitalAdjustmentYear1;
                $scope.Tier1CapitalAdjustmentYear2 = $scope.InputScenario.tier1CapitalAdjustmentYear2;
                $scope.Tier1CapitalAdjustmentYear3 = $scope.InputScenario.tier1CapitalAdjustmentYear3;
                $scope.Tier1CapitalAdjustmentYear4 = $scope.InputScenario.tier1CapitalAdjustmentYear4;
                $scope.Tier1CapitalAdjustmentYear5 = $scope.InputScenario.tier1CapitalAdjustmentYear5;
            }
        }
        else {
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear0')).addClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear1')).addClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear2')).addClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear3')).addClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear4')).addClass('hidden');
            angular.element(document.querySelector('#tier1CapitalAdjustmentYear5')).addClass('hidden');
        }
    }

    $scope.ToggleTier2Capital = function ($event) {
        $rootScope.chkTier2Capital = !$rootScope.chkTier2Capital;
        if ($rootScope.chkTier2Capital === true) {
            angular.element(document.querySelector('#tier2CapitalYear0')).removeClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear1')).removeClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear2')).removeClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear3')).removeClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear4')).removeClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear5')).removeClass('hidden');
        }
        else {
            angular.element(document.querySelector('#tier2CapitalYear0')).addClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear1')).addClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear2')).addClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear3')).addClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear4')).addClass('hidden');
            angular.element(document.querySelector('#tier2CapitalYear5')).addClass('hidden');
        }
    }

    $scope.ToggleRiskWeightedAssets = function ($event) {
        $rootScope.chkRiskWeightedAssets = !$rootScope.chkRiskWeightedAssets;
        if ($rootScope.chkRiskWeightedAssets === true) {
            angular.element(document.querySelector('#riskWeightedAssetsYear0')).removeClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear1')).removeClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear2')).removeClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear3')).removeClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear4')).removeClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear5')).removeClass('hidden');
        }
        else {
            angular.element(document.querySelector('#riskWeightedAssetsYear0')).addClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear1')).addClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear2')).addClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear3')).addClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear4')).addClass('hidden');
            angular.element(document.querySelector('#riskWeightedAssetsYear5')).addClass('hidden');
        }
    }

    $scope.ToggleTotalAssetsForLeverage = function ($event) {
        $rootScope.chkTotalAssetsForLeverage = !$rootScope.chkTotalAssetsForLeverage;
        if ($rootScope.chkTotalAssetsForLeverage === true) {
            angular.element(document.querySelector('#totalAssetsLeverageYear0')).removeClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear1')).removeClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear2')).removeClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear3')).removeClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear4')).removeClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear5')).removeClass('hidden');
        }
        else {
            angular.element(document.querySelector('#totalAssetsLeverageYear0')).addClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear1')).addClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear2')).addClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear3')).addClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear4')).addClass('hidden');
            angular.element(document.querySelector('#totalAssetsLeverageYear5')).addClass('hidden');
        }
    }

    $scope.SaveNewComparison = function () {
        var params = {
            ComparisonKey: -1,
            ComparisonName: $scope.ComparisonName,
            ScenarioKey1: $rootScope.SelectedSFScenario1ModelKey,
            ScenarioKey2: $rootScope.SelectedSFScenario2ModelKey,
            ScenarioKey3: $rootScope.SelectedSFScenario3ModelKey,
            ScenarioKey4: $rootScope.SelectedSFScenario4ModelKey,
            ScenarioKey5: $rootScope.SelectedSFScenario5ModelKey,
            ScenarioKey6: $rootScope.SelectedSFScenario6ModelKey,
            ScenarioKey7: $rootScope.SelectedSFScenario7ModelKey,
            ScenarioKey8: $rootScope.SelectedSFScenario8ModelKey,
        };

        var req = {
            method: 'POST',
            url: '/api/StrategicForecastApi/SaveOrUpdateComparison',
            headers: {
                'Content-Type': 'application/json'
            },
            data: params
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data === true) {
                

                $scope.toggleSuccessMessageBoxModal('Successfully saved the comparison.');
                $('#drawerExample-save-summary').drawer().hide();
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to save comparison. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    $scope.IsThereAComparisonWithSameName = function () {
        var params = {
            ComparisonName: $scope.ComparisonName
        };

        var req = {
            method: 'POST',
            url: '/api/StrategicForecastApi/IsThereAComparisonWithSameName',
            headers: {
                'Content-Type': 'application/json'
            },
            data: params
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data === false) {
                

                angular.element(document.querySelector('#btnSaveComparison')).removeAttr('disabled', '');
            }
            else {
                $scope.toggleErrorMessageBoxModal('A comparison already exists with this name. Please choose some other name.');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to check for existing comparison with same name. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var getDashboardConcepts = function () {
        angular.element(document.querySelector('#dashboardConceptsLoader')).removeClass('hidden');
        var modelReq = {
            InstitutionKey: $rootScope.SelectedBank.institutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/StrategicForecastApi/GetDashboardConcepts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: modelReq
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                

                angular.element(document.querySelector('#dashboardConceptsLoader')).addClass('hidden');
                setPriorCurrentYearData(result.data);
                getModelDetails();
            }
            else {
                //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get UBPR concepts. Please send an e-mail to admin@cb-resource.com.');
            angular.element(document.querySelector('#dashboardConceptsLoader')).addClass('hidden');
        });
    }

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
                        $rootScope.SelectedBank = $scope.FavoriteBanks[i];
                        $scope.SelectedBankName = $rootScope.SelectedBank.institutionName;
                        $scope.SelectedBankFdicNumber = $rootScope.SelectedBank.certNumber;
                        $rootScope.$broadcast('SelectedInstitutionChanged', 'Selected Institution Changed');
                        getDashboardConcepts();
                        break;
                    }
                }
            }
        }, function () {
            //angular.element(document.querySelector('#loaderDashboardLinks')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get favorite banks. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var getAllComparisons = function()
    {
        var req = {
            method: 'GET',
            url: '/api/StrategicForecastApi/GetAllComparisons',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {
                

                angular.element(document.querySelector('#existingSummariesLoader')).addClass('hidden');
                $scope.Comparisons = result.data;
            }
            else {
                angular.element(document.querySelector('#existingSummariesLoader')).addClass('hidden');
            }
        }, function () {
            angular.element(document.querySelector('#existingSummariesLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get comparisons. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    $scope.SelectComparison = function(compObj)
    {
        $rootScope.StrategicForecastSelectedComparison = compObj;
        $rootScope.$broadcast('StrategicForecastComparisonSelected', 'Strategic Forecast Comparison Selected');
        $('#drawerExample-view-saved-summaries').drawer().hide();
    }

    $scope.CopyModel = function()
    {
        var parameterObject = {
            ModelName: null,
            ModelKey: null,
            UserKey: null,
            AssetGrowthRateYear0: $scope.AssetGrowthRateYear0,
            AssetGrowthRateYear1: $scope.AssetGrowthRateYear1,
            AssetGrowthRateYear2: $scope.AssetGrowthRateYear2,
            AssetGrowthRateYear3: $scope.AssetGrowthRateYear3,
            AssetGrowthRateYear4: $scope.AssetGrowthRateYear4,
            AssetGrowthRateYear5: $scope.AssetGrowthRateYear5,
            UseNetIncomeInput: $rootScope.chkNetIncome,
            UseCashDividendsInput: $rootScope.chkCashDividends,
            UseNewCapitalInput: $rootScope.chkNewCapital,
            UseCet1CapitalAdjustmentInput: $rootScope.chkCet1CapitalAdjustment,
            UseTier1CapitalAdjustmentInput: $rootScope.chkTier1CapitalAdjustment,
            UseTier2CapitalInput: $rootScope.chkTier2Capital,
            UseRiskWeightedAssetsInput: $rootScope.chkRiskWeightedAssets,
            UseTotalAssetsForLeverageInput: $rootScope.chkTotalAssetsForLeverage,
            UseSharesOutstandingInput: $rootScope.chkSharesOutstanding,
            NetIncomeYear0: $scope.NetIncomeYear0,
            NetIncomeYear1: $scope.NetIncomeYear1,
            NetIncomeYear2: $scope.NetIncomeYear2,
            NetIncomeYear3: $scope.NetIncomeYear3,
            NetIncomeYear4: $scope.NetIncomeYear4,
            NetIncomeYear5: $scope.NetIncomeYear5,
            ReturnOnAverageAssetsYear0: $scope.ReturnOnAverageAssetsYear0,
            ReturnOnAverageAssetsYear1: $scope.ReturnOnAverageAssetsYear1,
            ReturnOnAverageAssetsYear2: $scope.ReturnOnAverageAssetsYear2,
            ReturnOnAverageAssetsYear3: $scope.ReturnOnAverageAssetsYear3,
            ReturnOnAverageAssetsYear4: $scope.ReturnOnAverageAssetsYear4,
            ReturnOnAverageAssetsYear5: $scope.ReturnOnAverageAssetsYear5,
            DividendsYear0: $scope.DividendsYear0,
            DividendsYear1: $scope.DividendsYear1,
            DividendsYear2: $scope.DividendsYear2,
            DividendsYear3: $scope.DividendsYear3,
            DividendsYear4: $scope.DividendsYear4,
            DividendsYear5: $scope.DividendsYear5,
            DividendsRateYear0: $scope.DividendsRateYear0,
            DividendsRateYear1: $scope.DividendsRateYear1,
            DividendsRateYear2: $scope.DividendsRateYear2,
            DividendsRateYear3: $scope.DividendsRateYear3,
            DividendsRateYear4: $scope.DividendsRateYear4,
            DividendsRateYear5: $scope.DividendsRateYear5,
            NewCapitalYear0: $scope.NewCapitalYear0,
            NewCapitalYear1: $scope.NewCapitalYear1,
            NewCapitalYear2: $scope.NewCapitalYear2,
            NewCapitalYear3: $scope.NewCapitalYear3,
            NewCapitalYear4: $scope.NewCapitalYear4,
            NewCapitalYear5: $scope.NewCapitalYear5,
            PricePerShareYear0: $scope.PricePerShareYear0,
            PricePerShareYear1: $scope.PricePerShareYear1,
            PricePerShareYear2: $scope.PricePerShareYear2,
            PricePerShareYear3: $scope.PricePerShareYear3,
            PricePerShareYear4: $scope.PricePerShareYear4,
            PricePerShareYear5: $scope.PricePerShareYear5,
            NewAcquisitionAssetsYear0: $scope.NewAcquisitionAssetsYear0,
            NewAcquisitionAssetsYear1: $scope.NewAcquisitionAssetsYear1,
            NewAcquisitionAssetsYear2: $scope.NewAcquisitionAssetsYear2,
            NewAcquisitionAssetsYear3: $scope.NewAcquisitionAssetsYear3,
            NewAcquisitionAssetsYear4: $scope.NewAcquisitionAssetsYear4,
            NewAcquisitionAssetsYear5: $scope.NewAcquisitionAssetsYear5,
            Cet1CapitalAdjustmentYear0: $scope.Cet1CapitalAdjustmentYear0,
            Cet1CapitalAdjustmentYear1: $scope.Cet1CapitalAdjustmentYear1,
            Cet1CapitalAdjustmentYear2: $scope.Cet1CapitalAdjustmentYear2,
            Cet1CapitalAdjustmentYear3: $scope.Cet1CapitalAdjustmentYear3,
            Cet1CapitalAdjustmentYear4: $scope.Cet1CapitalAdjustmentYear4,
            Cet1CapitalAdjustmentYear5: $scope.Cet1CapitalAdjustmentYear5,
            Tier1CapitalAdjustmentYear0: $scope.Tier1CapitalAdjustmentYear0,
            Tier1CapitalAdjustmentYear1: $scope.Tier1CapitalAdjustmentYear1,
            Tier1CapitalAdjustmentYear2: $scope.Tier1CapitalAdjustmentYear2,
            Tier1CapitalAdjustmentYear3: $scope.Tier1CapitalAdjustmentYear3,
            Tier1CapitalAdjustmentYear4: $scope.Tier1CapitalAdjustmentYear4,
            Tier1CapitalAdjustmentYear5: $scope.Tier1CapitalAdjustmentYear5,
            Tier2CapitalYear0: $scope.Tier2CapitalYear0,
            Tier2CapitalYear1: $scope.Tier2CapitalYear1,
            Tier2CapitalYear2: $scope.Tier2CapitalYear2,
            Tier2CapitalYear3: $scope.Tier2CapitalYear3,
            Tier2CapitalYear4: $scope.Tier2CapitalYear4,
            Tier2CapitalYear5: $scope.Tier2CapitalYear5,
            RiskWeightedAssetsYear0: $scope.RiskWeightedAssetsYear0,
            RiskWeightedAssetsYear1: $scope.RiskWeightedAssetsYear1,
            RiskWeightedAssetsYear2: $scope.RiskWeightedAssetsYear2,
            RiskWeightedAssetsYear3: $scope.RiskWeightedAssetsYear3,
            RiskWeightedAssetsYear4: $scope.RiskWeightedAssetsYear4,
            RiskWeightedAssetsYear5: $scope.RiskWeightedAssetsYear5,
            TotalAssetsLeverageYear0: $scope.TotalAssetsForLeverageYear0,
            TotalAssetsLeverageYear1: $scope.TotalAssetsForLeverageYear1,
            TotalAssetsLeverageYear2: $scope.TotalAssetsForLeverageYear2,
            TotalAssetsLeverageYear3: $scope.TotalAssetsForLeverageYear3,
            TotalAssetsLeverageYear4: $scope.TotalAssetsForLeverageYear4,
            TotalAssetsLeverageYear5: $scope.TotalAssetsForLeverageYear5,
            SharesOutstandingActualPriorYear: $scope.SharesOutstandingActualPriorYear,
            SharesOutstandingActualCurrentQuarter: $scope.SharesOutstandingActualCurrentQuarter,
            SharesOutstandingActualYear0: $scope.SharesOutstandingActualYear0,
            SharesOutstandingActualYear1: $scope.SharesOutstandingActualYear1,
            SharesOutstandingActualYear2: $scope.SharesOutstandingActualYear2,
            SharesOutstandingActualYear3: $scope.SharesOutstandingActualYear3,
            SharesOutstandingActualYear4: $scope.SharesOutstandingActualYear4,
            SharesOutstandingActualYear5: $scope.SharesOutstandingActualYear5
        };

        parameterObject.ModelName = $scope.CopiedModelName;
        parameterObject.ModelKey = null;

        var req = {
            method: 'POST',
            url: '/api/StrategicForecastApi/SaveOrUpdateModel',
            headers: {
                'Content-Type': 'application/json'
            },
            data: parameterObject
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                

                $('#drawerExample-copy-model').drawer().hide();
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to copy the scenario. Please send an e-mail to admin@cb-resource.com.');
                $('#drawerExample-copy-model').drawer().hide();
                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
            });
    }

    var initialize = function () {
        getFavoriteBanks();
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("strategicForecastScenario", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    var selectedModel = null;
    $scope.NetIncomePriorYear = null;
    $scope.NetIncomeCurrentQuarter = null;
    $scope.NetIncomeYear0 = null;
    $scope.NetIncomeYear1 = null;
    $scope.NetIncomeYear2 = null;
    $scope.NetIncomeYear3 = null;
    $scope.NetIncomeYear4 = null;
    $scope.NetIncomeYear5 = null;
    $scope.DividendsPriorYear = null;
    $scope.DividendsCurrentQuarter = null;
    $scope.DividendsYear0 = null;
    $scope.DividendsYear1 = null;
    $scope.DividendsYear2 = null;
    $scope.DividendsYear3 = null;
    $scope.DividendsYear4 = null;
    $scope.DividendsYear5 = null;
    $scope.DividendsRatePriorYear = null;
    $scope.DividendsRateCurrentQuarter = null;
    $scope.DividendsRateYear0 = null;
    $scope.DividendsRateYear1 = null;
    $scope.DividendsRateYear2 = null;
    $scope.DividendsRateYear3 = null;
    $scope.DividendsRateYear4 = null;
    $scope.DividendsRateYear5 = null;
    $scope.BankEquityCapitalPriorYear = null;
    $scope.BankEquityCapitalCurrentQuarter = null;
    $scope.BankEquityCapitalYear0 = null;
    $scope.BankEquityCapitalYear1 = null;
    $scope.BankEquityCapitalYear2 = null;
    $scope.BankEquityCapitalYear3 = null;
    $scope.BankEquityCapitalYear4 = null;
    $scope.BankEquityCapitalYear5 = null;
    $scope.NewCapitalPriorYear = null;
    $scope.NewCapitalCurrentQuarter = null;
    $scope.NewCapitalYear0 = null;
    $scope.NewCapitalYear1 = null;
    $scope.NewCapitalYear2 = null;
    $scope.NewCapitalYear3 = null;
    $scope.NewCapitalYear4 = null;
    $scope.NewCapitalYear5 = null;
    $scope.Cet1CapitalAdjustmentPriorYear = null;
    $scope.Cet1CapitalAdjustmentCurrentQuarter = null;
    $scope.Cet1CapitalAdjustmentYear0 = null;
    $scope.Cet1CapitalAdjustmentYear1 = null;
    $scope.Cet1CapitalAdjustmentYear2 = null;
    $scope.Cet1CapitalAdjustmentYear3 = null;
    $scope.Cet1CapitalAdjustmentYear4 = null;
    $scope.Cet1CapitalAdjustmentYear5 = null;
    $scope.Cet1CapitalPriorYear = null;
    $scope.Cet1CapitalCurrentQuarter = null;
    $scope.Cet1CapitalYear0 = null;
    $scope.Cet1CapitalYear1 = null;
    $scope.Cet1CapitalYear2 = null;
    $scope.Cet1CapitalYear3 = null;
    $scope.Cet1CapitalYear4 = null;
    $scope.Cet1CapitalYear5 = null;
    $scope.Tier1CapitalAdjustmentPriorYear = null;
    $scope.Tier1CapitalAdjustmentCurrentQuarter = null;
    $scope.Tier1CapitalAdjustmentYear0 = null;
    $scope.Tier1CapitalAdjustmentYear1 = null;
    $scope.Tier1CapitalAdjustmentYear2 = null;
    $scope.Tier1CapitalAdjustmentYear3 = null;
    $scope.Tier1CapitalAdjustmentYear4 = null;
    $scope.Tier1CapitalAdjustmentYear5 = null;
    $scope.Tier1CapitalPriorYear = null;
    $scope.Tier1CapitalCurrentQuarter = null;
    $scope.Tier1CapitalYear0 = null;
    $scope.Tier1CapitalYear1 = null;
    $scope.Tier1CapitalYear2 = null;
    $scope.Tier1CapitalYear3 = null;
    $scope.Tier1CapitalYear4 = null;
    $scope.Tier1CapitalYear5 = null;
    $scope.Tier2CapitalPriorYear = null;
    $scope.Tier2CapitalCurrentQuarter = null;
    $scope.Tier2CapitalYear0 = null;
    $scope.Tier2CapitalYear1 = null;
    $scope.Tier2CapitalYear2 = null;
    $scope.Tier2CapitalYear3 = null;
    $scope.Tier2CapitalYear4 = null;
    $scope.Tier2CapitalYear5 = null;
    $scope.TotalRiskBasedCapitalPriorYear = null;
    $scope.TotalRiskBasedCapitalCurrentQuarter = null;
    $scope.TotalRiskBasedCapitalYear0 = null;
    $scope.TotalRiskBasedCapitalYear1 = null;
    $scope.TotalRiskBasedCapitalYear2 = null;
    $scope.TotalRiskBasedCapitalYear3 = null;
    $scope.TotalRiskBasedCapitalYear4 = null;
    $scope.TotalRiskBasedCapitalYear5 = null;
    $scope.RiskWeightedAssetsPriorYear = null;
    $scope.RiskWeightedAssetsCurrentQuarter = null;
    $scope.RiskWeightedAssetsYear0 = null;
    $scope.RiskWeightedAssetsYear1 = null;
    $scope.RiskWeightedAssetsYear2 = null;
    $scope.RiskWeightedAssetsYear3 = null;
    $scope.RiskWeightedAssetsYear4 = null;
    $scope.RiskWeightedAssetsYear5 = null;
    $scope.TotalAssetsForLeveragePriorYear = null;
    $scope.TotalAssetsForLeverageCurrentQuarter = null;
    $scope.TotalAssetsForLeverageYear0 = null;
    $scope.TotalAssetsForLeverageYear1 = null;
    $scope.TotalAssetsForLeverageYear2 = null;
    $scope.TotalAssetsForLeverageYear3 = null;
    $scope.TotalAssetsForLeverageYear4 = null;
    $scope.TotalAssetsForLeverageYear5 = null;
    $scope.TotalAssetsPriorYear = null;
    $scope.TotalAssetsCurrentQuarter = null;
    $scope.TotalAssetsYear0 = null;
    $scope.TotalAssetsYear1 = null;
    $scope.TotalAssetsYear2 = null;
    $scope.TotalAssetsYear3 = null;
    $scope.TotalAssetsYear4 = null;
    $scope.TotalAssetsYear5 = null;
    $scope.NewAcquisitionAssetsPriorYear = null;
    $scope.NewAcquisitionAssetsCurrentQuarter = null;
    $scope.NewAcquisitionAssetsYear0 = null;
    $scope.NewAcquisitionAssetsYear1 = null;
    $scope.NewAcquisitionAssetsYear2 = null;
    $scope.NewAcquisitionAssetsYear3 = null;
    $scope.NewAcquisitionAssetsYear4 = null;
    $scope.NewAcquisitionAssetsYear5 = null;
    $scope.Cet1CapitalRatioPriorYear = null;
    $scope.Cet1CapitalRatioCurrentQuarter = null;
    $scope.Cet1CapitalRatioYear0 = null;
    $scope.Cet1CapitalRatioYear1 = null;
    $scope.Cet1CapitalRatioYear2 = null;
    $scope.Cet1CapitalRatioYear3 = null;
    $scope.Cet1CapitalRatioYear4 = null;
    $scope.Cet1CapitalRatioYear5 = null;
    $scope.Tier1RBCRatioPriorYear = null;
    $scope.Tier1RBCRatioCurrentQuarter = null;
    $scope.Tier1RBCRatioYear0 = null;
    $scope.Tier1RBCRatioYear1 = null;
    $scope.Tier1RBCRatioYear2 = null;
    $scope.Tier1RBCRatioYear3 = null;
    $scope.Tier1RBCRatioYear4 = null;
    $scope.Tier1RBCRatioYear5 = null;
    $scope.TotalRBCRatioPriorYear = null;
    $scope.TotalRBCRatioCurrentQuarter = null;
    $scope.TotalRBCRatioYear0 = null;
    $scope.TotalRBCRatioYear1 = null;
    $scope.TotalRBCRatioYear2 = null;
    $scope.TotalRBCRatioYear3 = null;
    $scope.TotalRBCRatioYear4 = null;
    $scope.TotalRBCRatioYear5 = null;
    $scope.Tier1LeverageRatioPriorYear = null;
    $scope.Tier1LeverageRatioCurrentQuarter = null;
    $scope.Tier1LeverageRatioYear0 = null;
    $scope.Tier1LeverageRatioYear1 = null;
    $scope.Tier1LeverageRatioYear2 = null;
    $scope.Tier1LeverageRatioYear3 = null;
    $scope.Tier1LeverageRatioYear4 = null;
    $scope.Tier1LeverageRatioYear5 = null;
    $scope.AssetGrowthRatePriorYear = null;
    $scope.AssetGrowthRateCurrentQuarter = null;
    $scope.AssetGrowthRateYear0 = null;
    $scope.AssetGrowthRateYear1 = null;
    $scope.AssetGrowthRateYear2 = null;
    $scope.AssetGrowthRateYear3 = null;
    $scope.AssetGrowthRateYear4 = null;
    $scope.AssetGrowthRateYear5 = null;
    $scope.ReturnOnAverageAssetsPriorYear = null;
    $scope.ReturnOnAverageAssetsCurrentQuarter = null;
    $scope.ReturnOnAverageAssetsYear0 = null;
    $scope.ReturnOnAverageAssetsYear1 = null;
    $scope.ReturnOnAverageAssetsYear2 = null;
    $scope.ReturnOnAverageAssetsYear3 = null;
    $scope.ReturnOnAverageAssetsYear4 = null;
    $scope.ReturnOnAverageAssetsYear5 = null;
    $scope.ReturnOnAverageEquityPriorYear = null;
    $scope.ReturnOnAverageEquityCurrentQuarter = null;
    $scope.ReturnOnAverageEquityYear0 = null;
    $scope.ReturnOnAverageEquityYear1 = null;
    $scope.ReturnOnAverageEquityYear2 = null;
    $scope.ReturnOnAverageEquityYear3 = null;
    $scope.ReturnOnAverageEquityYear4 = null;
    $scope.ReturnOnAverageEquityYear5 = null;
    $scope.MvEquityPriorYear = null;
    $scope.MvEquityCurrentQuarter = null;
    $scope.MvEquityYear0 = null;
    $scope.MvEquityYear1 = null;
    $scope.MvEquityYear2 = null;
    $scope.MvEquityYear3 = null;
    $scope.MvEquityYear4 = null;
    $scope.MvEquityYear5 = null;
    $scope.SharesOutstandingPriorYear = null;
    $scope.SharesOutstandingCurrentQuarter = null;
    $scope.SharesOutstandingYear0 = null;
    $scope.SharesOutstandingYear1 = null;
    $scope.SharesOutstandingYear2 = null;
    $scope.SharesOutstandingYear3 = null;
    $scope.SharesOutstandingYear4 = null;
    $scope.SharesOutstandingYear5 = null;
    $scope.BvSharePricePriorYear = null;
    $scope.BvSharePriceCurrentQuarter = null;
    $scope.BvSharePriceYear0 = null;
    $scope.BvSharePriceYear1 = null;
    $scope.BvSharePriceYear2 = null;
    $scope.BvSharePriceYear3 = null;
    $scope.BvSharePriceYear4 = null;
    $scope.BvSharePriceYear5 = null;
    $scope.MvSharePricePriorYear = null;
    $scope.MvSharePriceCurrentQuarter = null;
    $scope.MvSharePriceYear0 = null;
    $scope.MvSharePriceYear1 = null;
    $scope.MvSharePriceYear2 = null;
    $scope.MvSharePriceYear3 = null;
    $scope.MvSharePriceYear4 = null;
    $scope.MvSharePriceYear5 = null;
    $scope.EarningsPerSharePricePriorYear = null;
    $scope.EarningsPerSharePriceCurrentQuarter = null;
    $scope.EarningsPerSharePriceYear0 = null;
    $scope.EarningsPerSharePriceYear1 = null;
    $scope.EarningsPerSharePriceYear2 = null;
    $scope.EarningsPerSharePriceYear3 = null;
    $scope.EarningsPerSharePriceYear4 = null;
    $scope.EarningsPerSharePriceYear5 = null;
    $scope.EarningsPerShare15PricePriorYear = null;
    $scope.EarningsPerShare15PriceCurrentQuarter = null;
    $scope.EarningsPerShare15PriceYear0 = null;
    $scope.EarningsPerShare15PriceYear1 = null;
    $scope.EarningsPerShare15PriceYear2 = null;
    $scope.EarningsPerShare15PriceYear3 = null;
    $scope.EarningsPerShare15PriceYear4 = null;
    $scope.EarningsPerShare15PriceYear5 = null;
    $scope.EarningsPerShare20PricePriorYear = null;
    $scope.EarningsPerShare20PriceCurrentQuarter = null;
    $scope.EarningsPerShare20PriceYear0 = null;
    $scope.EarningsPerShare20PriceYear1 = null;
    $scope.EarningsPerShare20PriceYear2 = null;
    $scope.EarningsPerShare20PriceYear3 = null;
    $scope.EarningsPerShare20PriceYear4 = null;
    $scope.EarningsPerShare20PriceYear5 = null;
    $scope.DividendPerSharePricePriorYear = null;
    $scope.DividendPerSharePriceCurrentQuarter = null;
    $scope.DividendPerSharePriceYear0 = null;
    $scope.DividendPerSharePriceYear1 = null;
    $scope.DividendPerSharePriceYear2 = null;
    $scope.DividendPerSharePriceYear3 = null;
    $scope.DividendPerSharePriceYear4 = null;
    $scope.DividendPerSharePriceYear5 = null;
    $scope.PricePerSharePriorYear = null;
    $scope.PricePerShareCurrentQuarter = null;
    $scope.PricePerShareYear0 = null;
    $scope.PricePerShareYear1 = null;
    $scope.PricePerShareYear2 = null;
    $scope.PricePerShareYear3 = null;
    $scope.PricePerShareYear4 = null;
    $scope.PricePerShareYear5 = null;

    $scope.ToggleCreateEditScenarioScreen = function ($event, selectedModelObj) {
        $('#drawerExample-input-filed').drawer().show();
    };

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else {
            return $filter('number')(numericValue, fractionSize);
        }
    };

    $scope.BindDividendPerShare = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else {
            if (numericValue < 0) {
                numericValue = numericValue * -1;
            }

            return $filter('number')(numericValue, fractionSize);
        }
    };

    $scope.BindDividendNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else if (numericValue === 0 || numericValue === '0') {
            return $filter('number')(numericValue, fractionSize).toString();
        }
        else {
            if (numericValue < 0)
                return $filter('number')(numericValue, fractionSize).toString();
            else
                return '-' + $filter('number')(numericValue, fractionSize).toString();
        }
    };


    $scope.BindDividendRate = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '';
        else if (numericValue === 0 || numericValue === '0') {
            return $filter('number')(numericValue, fractionSize).toString();
        }
        else {
            if (numericValue < 0)
                return $filter('number')(numericValue, fractionSize).toString();
            else
                return '-' + $filter('number')(numericValue, fractionSize).toString();
        }
    };

    $rootScope.$on("ResetCalculations", function () {

        $scope.NetIncomeYear0 = null;
        $scope.NetIncomeYear1 = null;
        $scope.NetIncomeYear2 = null;
        $scope.NetIncomeYear3 = null;
        $scope.NetIncomeYear4 = null;
        $scope.NetIncomeYear5 = null;
        $scope.DividendsYear0 = null;
        $scope.DividendsYear1 = null;
        $scope.DividendsYear2 = null;
        $scope.DividendsYear3 = null;
        $scope.DividendsYear4 = null;
        $scope.DividendsYear5 = null;
        $scope.DividendsRateYear0 = null;
        $scope.DividendsRateYear1 = null;
        $scope.DividendsRateYear2 = null;
        $scope.DividendsRateYear3 = null;
        $scope.DividendsRateYear4 = null;
        $scope.DividendsRateYear5 = null;
        $scope.BankEquityCapitalYear0 = null;
        $scope.BankEquityCapitalYear1 = null;
        $scope.BankEquityCapitalYear2 = null;
        $scope.BankEquityCapitalYear3 = null;
        $scope.BankEquityCapitalYear4 = null;
        $scope.BankEquityCapitalYear5 = null;
        $scope.NewCapitalYear0 = null;
        $scope.NewCapitalYear1 = null;
        $scope.NewCapitalYear2 = null;
        $scope.NewCapitalYear3 = null;
        $scope.NewCapitalYear4 = null;
        $scope.NewCapitalYear5 = null;
        $scope.Cet1CapitalAdjustmentYear0 = null;
        $scope.Cet1CapitalAdjustmentYear1 = null;
        $scope.Cet1CapitalAdjustmentYear2 = null;
        $scope.Cet1CapitalAdjustmentYear3 = null;
        $scope.Cet1CapitalAdjustmentYear4 = null;
        $scope.Cet1CapitalAdjustmentYear5 = null;
        $scope.Cet1CapitalYear0 = null;
        $scope.Cet1CapitalYear1 = null;
        $scope.Cet1CapitalYear2 = null;
        $scope.Cet1CapitalYear3 = null;
        $scope.Cet1CapitalYear4 = null;
        $scope.Cet1CapitalYear5 = null;
        $scope.Tier1CapitalAdjustmentYear0 = null;
        $scope.Tier1CapitalAdjustmentYear1 = null;
        $scope.Tier1CapitalAdjustmentYear2 = null;
        $scope.Tier1CapitalAdjustmentYear3 = null;
        $scope.Tier1CapitalAdjustmentYear4 = null;
        $scope.Tier1CapitalAdjustmentYear5 = null;
        $scope.Tier1CapitalYear0 = null;
        $scope.Tier1CapitalYear1 = null;
        $scope.Tier1CapitalYear2 = null;
        $scope.Tier1CapitalYear3 = null;
        $scope.Tier1CapitalYear4 = null;
        $scope.Tier1CapitalYear5 = null;
        $scope.Tier2CapitalYear0 = null;
        $scope.Tier2CapitalYear1 = null;
        $scope.Tier2CapitalYear2 = null;
        $scope.Tier2CapitalYear3 = null;
        $scope.Tier2CapitalYear4 = null;
        $scope.Tier2CapitalYear5 = null;
        $scope.TotalRiskBasedCapitalYear0 = null;
        $scope.TotalRiskBasedCapitalYear1 = null;
        $scope.TotalRiskBasedCapitalYear2 = null;
        $scope.TotalRiskBasedCapitalYear3 = null;
        $scope.TotalRiskBasedCapitalYear4 = null;
        $scope.TotalRiskBasedCapitalYear5 = null;
        $scope.RiskWeightedAssetsYear0 = null;
        $scope.RiskWeightedAssetsYear1 = null;
        $scope.RiskWeightedAssetsYear2 = null;
        $scope.RiskWeightedAssetsYear3 = null;
        $scope.RiskWeightedAssetsYear4 = null;
        $scope.RiskWeightedAssetsYear5 = null;
        $scope.TotalAssetsForLeverageYear0 = null;
        $scope.TotalAssetsForLeverageYear1 = null;
        $scope.TotalAssetsForLeverageYear2 = null;
        $scope.TotalAssetsForLeverageYear3 = null;
        $scope.TotalAssetsForLeverageYear4 = null;
        $scope.TotalAssetsForLeverageYear5 = null;
        $scope.TotalAssetsYear0 = null;
        $scope.TotalAssetsYear1 = null;
        $scope.TotalAssetsYear2 = null;
        $scope.TotalAssetsYear3 = null;
        $scope.TotalAssetsYear4 = null;
        $scope.TotalAssetsYear5 = null;
        $scope.NewAcquisitionAssetsYear0 = null;
        $scope.NewAcquisitionAssetsYear1 = null;
        $scope.NewAcquisitionAssetsYear2 = null;
        $scope.NewAcquisitionAssetsYear3 = null;
        $scope.NewAcquisitionAssetsYear4 = null;
        $scope.NewAcquisitionAssetsYear5 = null;
        $scope.Cet1CapitalRatioYear0 = null;
        $scope.Cet1CapitalRatioYear1 = null;
        $scope.Cet1CapitalRatioYear2 = null;
        $scope.Cet1CapitalRatioYear3 = null;
        $scope.Cet1CapitalRatioYear4 = null;
        $scope.Cet1CapitalRatioYear5 = null;
        $scope.Tier1RBCRatioYear0 = null;
        $scope.Tier1RBCRatioYear1 = null;
        $scope.Tier1RBCRatioYear2 = null;
        $scope.Tier1RBCRatioYear3 = null;
        $scope.Tier1RBCRatioYear4 = null;
        $scope.Tier1RBCRatioYear5 = null;
        $scope.TotalRBCRatioYear0 = null;
        $scope.TotalRBCRatioYear1 = null;
        $scope.TotalRBCRatioYear2 = null;
        $scope.TotalRBCRatioYear3 = null;
        $scope.TotalRBCRatioYear4 = null;
        $scope.TotalRBCRatioYear5 = null;
        $scope.Tier1LeverageRatioYear0 = null;
        $scope.Tier1LeverageRatioYear1 = null;
        $scope.Tier1LeverageRatioYear2 = null;
        $scope.Tier1LeverageRatioYear3 = null;
        $scope.Tier1LeverageRatioYear4 = null;
        $scope.Tier1LeverageRatioYear5 = null;
        $scope.AssetGrowthRateYear0 = null;
        $scope.AssetGrowthRateYear1 = null;
        $scope.AssetGrowthRateYear2 = null;
        $scope.AssetGrowthRateYear3 = null;
        $scope.AssetGrowthRateYear4 = null;
        $scope.AssetGrowthRateYear5 = null;
        $scope.ReturnOnAverageAssetsYear0 = null;
        $scope.ReturnOnAverageAssetsYear1 = null;
        $scope.ReturnOnAverageAssetsYear2 = null;
        $scope.ReturnOnAverageAssetsYear3 = null;
        $scope.ReturnOnAverageAssetsYear4 = null;
        $scope.ReturnOnAverageAssetsYear5 = null;
        $scope.ReturnOnAverageEquityYear0 = null;
        $scope.ReturnOnAverageEquityYear1 = null;
        $scope.ReturnOnAverageEquityYear2 = null;
        $scope.ReturnOnAverageEquityYear3 = null;
        $scope.ReturnOnAverageEquityYear4 = null;
        $scope.ReturnOnAverageEquityYear5 = null;
        $scope.MvEquityYear0 = null;
        $scope.MvEquityYear1 = null;
        $scope.MvEquityYear2 = null;
        $scope.MvEquityYear3 = null;
        $scope.MvEquityYear4 = null;
        $scope.MvEquityYear5 = null;
        $scope.SharesOutstandingYear0 = null;
        $scope.SharesOutstandingYear1 = null;
        $scope.SharesOutstandingYear2 = null;
        $scope.SharesOutstandingYear3 = null;
        $scope.SharesOutstandingYear4 = null;
        $scope.SharesOutstandingYear5 = null;
        $scope.BvSharePriceYear0 = null;
        $scope.BvSharePriceYear1 = null;
        $scope.BvSharePriceYear2 = null;
        $scope.BvSharePriceYear3 = null;
        $scope.BvSharePriceYear4 = null;
        $scope.BvSharePriceYear5 = null;
        $scope.MvSharePriceYear0 = null;
        $scope.MvSharePriceYear1 = null;
        $scope.MvSharePriceYear2 = null;
        $scope.MvSharePriceYear3 = null;
        $scope.MvSharePriceYear4 = null;
        $scope.MvSharePriceYear5 = null;
        $scope.EarningsPerSharePriceYear0 = null;
        $scope.EarningsPerSharePriceYear1 = null;
        $scope.EarningsPerSharePriceYear2 = null;
        $scope.EarningsPerSharePriceYear3 = null;
        $scope.EarningsPerSharePriceYear4 = null;
        $scope.EarningsPerSharePriceYear5 = null;
        $scope.EarningsPerShare15PriceYear0 = null;
        $scope.EarningsPerShare15PriceYear1 = null;
        $scope.EarningsPerShare15PriceYear2 = null;
        $scope.EarningsPerShare15PriceYear3 = null;
        $scope.EarningsPerShare15PriceYear4 = null;
        $scope.EarningsPerShare15PriceYear5 = null;
        $scope.EarningsPerShare20PriceYear0 = null;
        $scope.EarningsPerShare20PriceYear1 = null;
        $scope.EarningsPerShare20PriceYear2 = null;
        $scope.EarningsPerShare20PriceYear3 = null;
        $scope.EarningsPerShare20PriceYear4 = null;
        $scope.EarningsPerShare20PriceYear5 = null;
        $scope.DividendPerSharePriceYear0 = null;
        $scope.DividendPerSharePriceYear1 = null;
        $scope.DividendPerSharePriceYear2 = null;
        $scope.DividendPerSharePriceYear3 = null;
        $scope.DividendPerSharePriceYear4 = null;
        $scope.DividendPerSharePriceYear5 = null;
        $scope.PricePerShareYear0 = null;
        $scope.PricePerShareYear1 = null;
        $scope.PricePerShareYear2 = null;
        $scope.PricePerShareYear3 = null;
        $scope.PricePerShareYear4 = null;
        $scope.PricePerShareYear5 = null;
    });

    var resetInputData = function () {
        $scope.NetIncomeYear0 = null;
        $scope.NetIncomeYear1 = null;
        $scope.NetIncomeYear2 = null;
        $scope.NetIncomeYear3 = null;
        $scope.NetIncomeYear4 = null;
        $scope.NetIncomeYear5 = null;
        $scope.DividendsYear0 = null;
        $scope.DividendsYear1 = null;
        $scope.DividendsYear2 = null;
        $scope.DividendsYear3 = null;
        $scope.DividendsYear4 = null;
        $scope.DividendsYear5 = null;
        $scope.DividendsRateYear0 = null;
        $scope.DividendsRateYear1 = null;
        $scope.DividendsRateYear2 = null;
        $scope.DividendsRateYear3 = null;
        $scope.DividendsRateYear4 = null;
        $scope.DividendsRateYear5 = null;
        $scope.NewCapitalYear0 = null;
        $scope.NewCapitalYear1 = null;
        $scope.NewCapitalYear2 = null;
        $scope.NewCapitalYear3 = null;
        $scope.NewCapitalYear4 = null;
        $scope.NewCapitalYear5 = null;
        $scope.Cet1CapitalAdjustmentYear0 = null;
        $scope.Cet1CapitalAdjustmentYear1 = null;
        $scope.Cet1CapitalAdjustmentYear2 = null;
        $scope.Cet1CapitalAdjustmentYear3 = null;
        $scope.Cet1CapitalAdjustmentYear4 = null;
        $scope.Cet1CapitalAdjustmentYear5 = null;
        $scope.PricePerShareYear0 = null;
        $scope.PricePerShareYear1 = null;
        $scope.PricePerShareYear2 = null;
        $scope.PricePerShareYear3 = null;
        $scope.PricePerShareYear4 = null;
        $scope.PricePerShareYear5 = null;
        $scope.Tier1CapitalAdjustmentYear0 = null;
        $scope.Tier1CapitalAdjustmentYear1 = null;
        $scope.Tier1CapitalAdjustmentYear2 = null;
        $scope.Tier1CapitalAdjustmentYear3 = null;
        $scope.Tier1CapitalAdjustmentYear4 = null;
        $scope.Tier1CapitalAdjustmentYear5 = null;
        $scope.Tier2CapitalYear0 = null;
        $scope.Tier2CapitalYear1 = null;
        $scope.Tier2CapitalYear2 = null;
        $scope.Tier2CapitalYear3 = null;
        $scope.Tier2CapitalYear4 = null;
        $scope.Tier2CapitalYear5 = null;
        $scope.RiskWeightedAssetsYear0 = null;
        $scope.RiskWeightedAssetsYear1 = null;
        $scope.RiskWeightedAssetsYear2 = null;
        $scope.RiskWeightedAssetsYear3 = null;
        $scope.RiskWeightedAssetsYear4 = null;
        $scope.RiskWeightedAssetsYear5 = null;
        $scope.TotalAssetsForLeverageYear0 = null;
        $scope.TotalAssetsForLeverageYear1 = null;
        $scope.TotalAssetsForLeverageYear2 = null;
        $scope.TotalAssetsForLeverageYear3 = null;
        $scope.TotalAssetsForLeverageYear4 = null;
        $scope.TotalAssetsForLeverageYear5 = null;
        $scope.NewAcquisitionAssetsYear0 = null;
        $scope.NewAcquisitionAssetsYear1 = null;
        $scope.NewAcquisitionAssetsYear2 = null;
        $scope.NewAcquisitionAssetsYear3 = null;
        $scope.NewAcquisitionAssetsYear4 = null;
        $scope.NewAcquisitionAssetsYear5 = null;
        $scope.AssetGrowthRateYear0 = null;
        $scope.AssetGrowthRateYear1 = null;
        $scope.AssetGrowthRateYear2 = null;
        $scope.AssetGrowthRateYear3 = null;
        $scope.AssetGrowthRateYear4 = null;
        $scope.AssetGrowthRateYear5 = null;
        $scope.ReturnOnAverageAssetsYear0 = null;
        $scope.ReturnOnAverageAssetsYear1 = null;
        $scope.ReturnOnAverageAssetsYear2 = null;
        $scope.ReturnOnAverageAssetsYear3 = null;
        $scope.ReturnOnAverageAssetsYear4 = null;
        $scope.ReturnOnAverageAssetsYear5 = null;
        $scope.SharesOutstandingActualPriorYear = null;
        $scope.SharesOutstandingActualCurrentQuarter = null;
        $scope.SharesOutstandingYear0 = null;
        $scope.SharesOutstandingYear1 = null;
        $scope.SharesOutstandingYear2 = null;
        $scope.SharesOutstandingYear3 = null;
        $scope.SharesOutstandingYear4 = null;
        $scope.SharesOutstandingYear5 = null;
    };

    //Prior Year calcualtions
    var dividendsRatePriorYear = function () {
        $scope.DividendsRatePriorYear = (parseFloat($scope.DividendsPriorYear) / parseFloat($scope.NetIncomePriorYear)) * 100;
    };

    var mvEquityPriorYear = function () {
        $scope.MvEquityPriorYear = parseFloat($scope.BankEquityCapitalPriorYear) * 1.5;
    };

    var bookValueSharePricePriorYear = function () {
        $scope.BvSharePricePriorYear = (parseFloat($scope.BankEquityCapitalPriorYear) * 1000) / parseFloat($scope.SharesOutstandingActualPriorYear);
    };

    var mvSharePricePriorYear = function () {
        $scope.MvSharePricePriorYear = (parseFloat($scope.MvEquityPriorYear) * 1000) / parseFloat($scope.SharesOutstandingActualPriorYear);
    };

    var earningsPerSharePricePriorYear = function () {
        $scope.EarningsPerSharePricePriorYear = (parseFloat($scope.NetIncomePriorYear) * 1000) / parseFloat($scope.SharesOutstandingActualPriorYear);
    };

    var earningsPerShare15PricePriorYear = function () {
        $scope.EarningsPerShare15PricePriorYear = parseFloat($scope.EarningsPerSharePricePriorYear) * 15;
    };

    var earningsPerShare20PricePriorYear = function () {
        $scope.EarningsPerShare20PricePriorYear = parseFloat($scope.EarningsPerSharePricePriorYear) * 20;
    };

    var dividendPerSharePricePriorYear = function () {
        $scope.DividendPerSharePricePriorYear = (parseFloat($scope.DividendsPriorYear) * (-1000)) / parseFloat($scope.SharesOutstandingActualPriorYear);
    };

    //Current Year calcualtions
    var dividendsRateCurrentQuarterYear = function () {
        $scope.DividendsRateCurrentQuarter = (parseFloat($scope.DividendsCurrentQuarter) / parseFloat($scope.NetIncomeCurrentQuarter)) * 100;
    };

    var mvEquityCurrentQuarter = function () {
        $scope.MvEquityCurrentQuarter = parseFloat($scope.BankEquityCapitalCurrentQuarter) * 1.5;
    };

    var sharesOutstandingActualCurrentQuarter = function () {
        $scope.SharesOutstandingCurrentQuarter = parseFloat($scope.SharesOutstandingCurrentQuarter);
    };

    var bookValueSharePriceCurrentQuarter = function () {
        $scope.BvSharePriceCurrentQuarter = parseFloat($scope.BankEquityCapitalCurrentQuarter) * 1000 / parseFloat($scope.SharesOutstandingActualCurrentQuarter);
    };

    var mvSharePriceCurrentQuarter = function () {
        $scope.MvSharePriceCurrentQuarter = parseFloat($scope.MvEquityCurrentQuarter) * 1000 / parseFloat($scope.SharesOutstandingActualCurrentQuarter);
    };

    var earningsPerSharePriceCurrentQuarter = function () {
        $scope.EarningsPerSharePriceCurrentQuarter = parseFloat($scope.NetIncomeCurrentQuarter) * 1000 / parseFloat($scope.SharesOutstandingActualCurrentQuarter);
    };

    var earningsPerShare15PriceCurrentQuarter = function () {
        $scope.EarningsPerShare15PriceCurrentQuarter = parseFloat($scope.EarningsPerSharePriceCurrentQuarter) * 15;
    };

    var earningsPerShare20PriceCurrentQuarter = function () {
        $scope.EarningsPerShare20PriceCurrentQuarter = parseFloat($scope.EarningsPerSharePriceCurrentQuarter) * 20;
    };

    var dividendPerSharePriceCurrentQuarter = function () {
        $scope.DividendPerSharePriceCurrentQuarter = parseFloat($scope.DividendsCurrentQuarter) * (-1000) / parseFloat($scope.SharesOutstandingActualCurrentQuarter);
    };

    //Year 0 Calculations
    var totalAssetsYear0 = function () {
        if ($scope.NewAcquisitionAssetsYear0 === null)
            $scope.NewAcquisitionAssetsYear0 = 0;

        $scope.TotalAssetsYear0 = parseFloat($scope.TotalAssetsPriorYear) * (1 + (parseFloat($scope.AssetGrowthRateYear0) / 100)) + parseFloat($scope.NewAcquisitionAssetsYear0);
    };

    var netIncomeYear0 = function () {
        if ($scope.NetIncomeYear0 === null) {
            $scope.NetIncomeYear0 = ((parseFloat($scope.TotalAssetsPriorYear) + parseFloat($scope.TotalAssetsYear0)) / 2) * (parseFloat($scope.ReturnOnAverageAssetsYear0) / 100);
        }
    };

    var dividendsYear0 = function () {
        if ($scope.DividendsYear0 === null || typeof $scope.DividendsYear0 === 'undefined' || $scope.DividendsYear0 === 0)
            $scope.DividendsYear0 = parseFloat($scope.NetIncomeYear0) * (parseFloat($scope.DividendsRateYear0) / 100);
    };

    var dividendsRateYear0 = function () {
        if ((typeof $scope.NetIncomeYear0 !== 'undefined' && $scope.NetIncomeYear0 !== null && $scope.NetIncomeYear0 > 0) && (typeof $scope.DividendsYear0 !== 'undefined' && $scope.DividendsYear0 !== null && Math.abs($scope.DividendsYear0) > 0)) {
            $scope.DividendsRateYear0 = (-$scope.DividendsYear0 / $scope.NetIncomeYear0) * 100;
        }
    };

    var bankEquityCapitalYear0 = function () {
        if ($scope.NewCapitalYear0 !== null && Math.abs($scope.NewCapitalYear0) > 0)
            $scope.BankEquityCapitalYear0 = parseFloat($scope.BankEquityCapitalPriorYear) + parseFloat($scope.NetIncomeYear0) - parseFloat($scope.DividendsYear0) + parseFloat($scope.NewCapitalYear0);
        else
            $scope.BankEquityCapitalYear0 = parseFloat($scope.BankEquityCapitalPriorYear) + parseFloat($scope.NetIncomeYear0) - parseFloat($scope.DividendsYear0);
    };

    var cet1CapitalAdjustmentYear0 = function () {
        if ($rootScope.chkCet1CapitalAdjustment === false)
            $scope.Cet1CapitalAdjustmentYear0 = parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    };

    var tier1CapitalAdjustmentYear0 = function () {
        if (typeof $rootScope.SelectedModel !== 'undefined' && $rootScope.SelectedModel !== null && typeof $rootScope.SelectedModel.modelKey !== 'undefined' && $rootScope.chkTier1CapitalAdjustment === false)
            $scope.Tier1CapitalAdjustmentYear0 = parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    };

    var cet1CapitalYear0 = function () {
        var bankEqCapital = 0;
        var cet1CapAdjustment = 0;
        var tier1CapAdjustment = 0;

        if (typeof $scope.Cet1CapitalAdjustmentYear0 !== 'undefined' && $scope.Cet1CapitalAdjustmentYear0 !== null)
            cet1CapAdjustment = $scope.Cet1CapitalAdjustmentYear0;
        if (typeof $scope.BankEquityCapitalYear0 !== 'undefined' && $scope.BankEquityCapitalYear0 !== null)
            bankEqCapital = $scope.BankEquityCapitalYear0;
        if (typeof $scope.Tier1CapitalAdjustmentYear0 !== 'undefined' && $scope.Tier1CapitalAdjustmentYear0 !== null)
            tier1CapAdjustment = $scope.Tier1CapitalAdjustmentYear0;

        $scope.Cet1CapitalYear0 = bankEqCapital + cet1CapAdjustment + tier1CapAdjustment;
    };

    var tier1CapitalYear0 = function () {
        var tier1CapAdjustment = 0;
        if (typeof $scope.Tier1CapitalAdjustmentYear0 !== 'undefined' && $scope.Tier1CapitalAdjustmentYear0 !== null)
            tier1CapAdjustment = $scope.Tier1CapitalAdjustmentYear0;

        $scope.Tier1CapitalYear0 = parseFloat($scope.BankEquityCapitalYear0) + parseFloat(tier1CapAdjustment);
    };

    var tier2CapitalYear0 = function () {
        if ($rootScope.chkTier2Capital === false) {
            $scope.Tier2CapitalYear0 = (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * parseFloat($scope.Tier1CapitalYear0);
        }
        else {
            if (typeof $scope.Tier2CapitalYear0 === 'undefined' && $scope.Tier2CapitalYear0 === null) {
                $scope.Tier2CapitalYear0 = 0;
            }
        }
    };

    var totalRiskBasedCapitalYear0 = function () {
        var capital = 0;
        if (typeof $scope.Tier2CapitalYear0 !== 'undefined' && $scope.Tier2CapitalYear0 !== null)
            capital = $scope.Tier2CapitalYear0;

        $scope.TotalRiskBasedCapitalYear0 = parseFloat($scope.Tier1CapitalYear0) + parseFloat(capital);
    };

    var riskWeightedAssetsYear0 = function () {
        if ($rootScope.chkRiskWeightedAssets === false) {
            $scope.RiskWeightedAssetsYear0 = (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * parseFloat($scope.TotalAssetsYear0);
        }
    };

    var totalAssetsForLeverageYear0 = function () {
        if ($rootScope.chkTotalAssetsForLeverage === false) {
            $scope.TotalAssetsForLeverageYear0 = (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * parseFloat($scope.TotalAssetsYear0);
        }
    };

    var cet1CapitalRatioYear0 = function () {
        $scope.Cet1CapitalRatioYear0 = ((parseFloat($scope.Cet1CapitalYear0) / parseFloat($scope.RiskWeightedAssetsYear0)) * 100).toPrecision(6);
    };

    var tier1RBCRatioYear0 = function () {
        $scope.Tier1RBCRatioYear0 = ((parseFloat($scope.Tier1CapitalYear0) / parseFloat($scope.RiskWeightedAssetsYear0)) * 100).toPrecision(6);
    };

    var totalRBCRatioYear0 = function () {
        $scope.TotalRBCRatioYear0 = ((parseFloat($scope.TotalRiskBasedCapitalYear0) / parseFloat($scope.RiskWeightedAssetsYear0)) * 100).toPrecision(6);
    };

    var tier1LeverageRatioYear0 = function () {
        $scope.Tier1LeverageRatioYear0 = ((parseFloat($scope.Tier1CapitalYear0) / parseFloat($scope.TotalAssetsForLeverageYear0)) * 100).toPrecision(6);
    };

    var returnOnAverageEquityYear0 = function () {
        $scope.ReturnOnAverageEquityYear0 = (parseFloat($scope.NetIncomeYear0) / ((parseFloat($scope.BankEquityCapitalYear0) + parseFloat($scope.BankEquityCapitalPriorYear)) / 2)) * 100;
    };

    var returnOnAverageAssetsYear0 = function () {
        if ($rootScope.chkNetIncome === true) {
            $scope.ReturnOnAverageAssetsYear0 = ((parseFloat($scope.NetIncomeYear0) / ((parseFloat($scope.TotalAssetsPriorYear) + parseFloat($scope.TotalAssetsYear0)) / 2))) * 100;
        }
    };

    var mvEquityYear0 = function () {
        $scope.MvEquityYear0 = parseFloat($scope.BankEquityCapitalYear0) * 1.5;
    };

    var bvSharePriceYear0 = function () {
        $scope.BvSharePriceYear0 = parseFloat($scope.BankEquityCapitalYear0) * 1000 / parseFloat($scope.SharesOutstandingYear0);
    };

    var mvSharePriceYear0 = function () {
        $scope.MvSharePriceYear0 = parseFloat($scope.MvEquityYear0) * 1000 / parseFloat($scope.SharesOutstandingYear0);
    };

    var earningsPerSharePriceYear0 = function () {
        $scope.EarningsPerSharePriceYear0 = parseFloat($scope.NetIncomeYear0) * 1000 / parseFloat($scope.SharesOutstandingYear0);
    };

    var earningsPerShare15PriceYear0 = function () {
        $scope.EarningsPerShare15PriceYear0 = parseFloat($scope.EarningsPerSharePriceYear0) * 15;
    };

    var earningsPerShare20PriceYear0 = function () {
        $scope.EarningsPerShare20PriceYear0 = parseFloat($scope.EarningsPerSharePriceYear0) * 20;
    };

    var dividendPerSharePriceYear0 = function () {
        $scope.DividendPerSharePriceYear0 = (parseFloat($scope.DividendsYear0) * (-1000)) / parseFloat($scope.SharesOutstandingYear0);
    };

    //Year 1 Calculations
    var totalAssetsYear1 = function () {
        if ($scope.NewAcquisitionAssetsYear1 === null)
            $scope.NewAcquisitionAssetsYear1 = 0;

        $scope.TotalAssetsYear1 = (parseFloat($scope.TotalAssetsYear0) * (1 + (parseFloat($scope.AssetGrowthRateYear1) / 100))) + parseFloat($scope.NewAcquisitionAssetsYear1);
    };

    var netIncomeYear1 = function () {
        if ($scope.NetIncomeYear1 === null) {
            $scope.NetIncomeYear1 = ((parseFloat($scope.TotalAssetsYear0) + parseFloat($scope.TotalAssetsYear1)) / 2) * (parseFloat($scope.ReturnOnAverageAssetsYear1) / 100)
        }
    };

    var dividendsYear1 = function () {
        if ($scope.DividendsYear1 === null || typeof $scope.DividendsYear1 === 'undefined' || $scope.DividendsYear1 === 0)
            $scope.DividendsYear1 = parseFloat($scope.NetIncomeYear1) * (parseFloat($scope.DividendsRateYear1) / 100);
    };

    var dividendsRateYear1 = function () {
        if ((typeof $scope.NetIncomeYear1 !== 'undefined' && $scope.NetIncomeYear1 !== null && $scope.NetIncomeYear1 > 0) && (typeof $scope.DividendsYear1 !== 'undefined' && $scope.DividendsYear1 !== null && Math.abs($scope.DividendsYear1) > 0)) {
            $scope.DividendsRateYear1 = (-$scope.DividendsYear1 / $scope.NetIncomeYear1) * 100;
        }
    };

    var bankEquityCapitalYear1 = function () {
        if ($scope.NewCapitalYear1 !== null && Math.abs($scope.NewCapitalYear1) > 0)
            $scope.BankEquityCapitalYear1 = parseFloat($scope.BankEquityCapitalYear0) + parseFloat($scope.NetIncomeYear1) - parseFloat($scope.DividendsYear1) + parseFloat($scope.NewCapitalYear1);
        else
            $scope.BankEquityCapitalYear1 = parseFloat($scope.BankEquityCapitalYear0) + parseFloat($scope.NetIncomeYear1) - parseFloat($scope.DividendsYear1);
    };

    var cet1CapitalAdjustmentYear1 = function () {
        if ($rootScope.chkCet1CapitalAdjustment === false)
            $scope.Cet1CapitalAdjustmentYear1 = parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    };

    var tier1CapitalAdjustmentYear1 = function () {
        if (typeof $rootScope.SelectedModel !== 'undefined' && $rootScope.SelectedModel !== null && typeof $rootScope.SelectedModel.modelKey !== 'undefined' && $rootScope.chkTier1CapitalAdjustment === false)
            $scope.Tier1CapitalAdjustmentYear1 = parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    };

    var cet1CapitalYear1 = function () {
        var bankEqCapital = 0;
        var cet1CapAdjustment = 0;
        var tier1CapAdjustment = 0;

        if (typeof $scope.Cet1CapitalAdjustmentYear1 !== 'undefined' && $scope.Cet1CapitalAdjustmentYear1 !== null)
            cet1CapAdjustment = $scope.Cet1CapitalAdjustmentYear1;
        if (typeof $scope.BankEquityCapitalYear1 !== 'undefined' && $scope.BankEquityCapitalYear1 !== null)
            bankEqCapital = $scope.BankEquityCapitalYear1;
        if (typeof $scope.Tier1CapitalAdjustmentYear1 !== 'undefined' && $scope.Tier1CapitalAdjustmentYear1 !== null)
            tier1CapAdjustment = $scope.Tier1CapitalAdjustmentYear1;

        $scope.Cet1CapitalYear1 = bankEqCapital + cet1CapAdjustment + tier1CapAdjustment;
    };

    var tier1CapitalYear1 = function () {
        var tier1CapAdjustment = 0;
        if (typeof $scope.Tier1CapitalAdjustmentYear1 !== 'undefined' && $scope.Tier1CapitalAdjustmentYear1 !== null)
            tier1CapAdjustment = $scope.Tier1CapitalAdjustmentYear1;

        $scope.Tier1CapitalYear1 = parseFloat($scope.BankEquityCapitalYear1) + parseFloat(tier1CapAdjustment);
    };

    var tier2CapitalYear1 = function () {
        if ($rootScope.chkTier2Capital === false) {
            $scope.Tier2CapitalYear1 = (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * parseFloat($scope.Tier1CapitalYear1);
        }
        else {
            if (typeof $scope.Tier2CapitalYear1 === 'undefined' && $scope.Tier2CapitalYear1 === null) {
                $scope.Tier2CapitalYear1 = 0;
            }
        }
    };

    var totalRiskBasedCapitalYear1 = function () {
        var capital = 0;
        if (typeof $scope.Tier2CapitalYear1 !== 'undefined' && $scope.Tier2CapitalYear1 !== null)
            capital = $scope.Tier2CapitalYear1;

        $scope.TotalRiskBasedCapitalYear1 = parseFloat($scope.Tier1CapitalYear1) + parseFloat(capital);
    };

    var riskWeightedAssetsYear1 = function () {
        if ($rootScope.chkRiskWeightedAssets === false) {
            $scope.RiskWeightedAssetsYear1 = (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * parseFloat($scope.TotalAssetsYear1);
        }
    };

    var totalAssetsForLeverageYear1 = function () {
        if ($rootScope.chkTotalAssetsForLeverage === false) {
            $scope.TotalAssetsForLeverageYear1 = (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * parseFloat($scope.TotalAssetsYear1);
        }
    };

    var cet1CapitalRatioYear1 = function () {
        $scope.Cet1CapitalRatioYear1 = ((parseFloat($scope.Cet1CapitalYear1) / parseFloat($scope.RiskWeightedAssetsYear1)) * 100).toPrecision(6);
    };

    var tier1RBCRatioYear1 = function () {
        $scope.Tier1RBCRatioYear1 = ((parseFloat($scope.Tier1CapitalYear1) / parseFloat($scope.RiskWeightedAssetsYear1)) * 100).toPrecision(6);
    };

    var totalRBCRatioYear1 = function () {
        $scope.TotalRBCRatioYear1 = ((parseFloat($scope.TotalRiskBasedCapitalYear1) / parseFloat($scope.RiskWeightedAssetsYear1)) * 100).toPrecision(6);
    };

    var tier1LeverageRatioYear1 = function () {
        $scope.Tier1LeverageRatioYear1 = ((parseFloat($scope.Tier1CapitalYear1) / parseFloat($scope.TotalAssetsForLeverageYear1)) * 100).toPrecision(6);
    };

    var returnOnAverageEquityYear1 = function () {
        $scope.ReturnOnAverageEquityYear1 = (parseFloat($scope.NetIncomeYear1) / ((parseFloat($scope.BankEquityCapitalYear1) + parseFloat($scope.BankEquityCapitalYear0)) / 2)) * 100;
    };

    var returnOnAverageAssetsYear1 = function () {
        if ($rootScope.chkNetIncome === true) {
            $scope.ReturnOnAverageAssetsYear1 = ((parseFloat($scope.NetIncomeYear1) / ((parseFloat($scope.TotalAssetsYear0) + parseFloat($scope.TotalAssetsYear1)) / 2))) * 100;
        }
    };

    var mvEquityYear1 = function () {
        $scope.MvEquityYear1 = parseFloat($scope.BankEquityCapitalYear1) * 1.5;
    };
    
    var bvSharePriceYear1 = function () {
        $scope.BvSharePriceYear1 = (parseFloat($scope.BankEquityCapitalYear1) * 1000) / parseFloat($scope.SharesOutstandingYear1);
    };

    var mvSharePriceYear1 = function () {
        $scope.MvSharePriceYear1 = (parseFloat($scope.MvEquityYear1) * 1000) / parseFloat($scope.SharesOutstandingYear1);
    };

    var earningsPerSharePriceYear1 = function () {
        $scope.EarningsPerSharePriceYear1 = (parseFloat($scope.NetIncomeYear1) * 1000) / parseFloat($scope.SharesOutstandingYear1);
    };

    var earningsPerShare15PriceYear1 = function () {
        $scope.EarningsPerShare15PriceYear1 = parseFloat($scope.EarningsPerSharePriceYear1) * 15;
    };

    var earningsPerShare20PriceYear1 = function () {
        $scope.EarningsPerShare20PriceYear1 = parseFloat($scope.EarningsPerSharePriceYear1) * 20;
    };

    var dividendPerSharePriceYear1 = function () {
        $scope.DividendPerSharePriceYear1 = (parseFloat($scope.DividendsYear1) * (-1000)) / parseFloat($scope.SharesOutstandingYear1);
    };

    //Year 2 Calculations

    var totalAssetsYear2 = function () {
        if ($scope.NewAcquisitionAssetsYear2 === null)
            $scope.NewAcquisitionAssetsYear2 = 0;

        $scope.TotalAssetsYear2 = (parseFloat($scope.TotalAssetsYear1) * (1 + (parseFloat($scope.AssetGrowthRateYear2) / 100))) + parseFloat($scope.NewAcquisitionAssetsYear2);
    };

    var netIncomeYear2 = function () {
        if ($scope.NetIncomeYear2 === null) {
            $scope.NetIncomeYear2 = ((parseFloat($scope.TotalAssetsYear1) + parseFloat($scope.TotalAssetsYear2)) / 2) * (parseFloat($scope.ReturnOnAverageAssetsYear2) / 100)
        }
    };

    var dividendsYear2 = function () {
        if ($scope.DividendsYear2 === null || typeof $scope.DividendsYear2 === 'undefined' || $scope.DividendsYear2 === 0)
            $scope.DividendsYear2 = parseFloat($scope.NetIncomeYear2) * (parseFloat($scope.DividendsRateYear2) / 100);
    };

    var dividendsRateYear2 = function () {
        if ((typeof $scope.NetIncomeYear2 !== 'undefined' && $scope.NetIncomeYear2 !== null && $scope.NetIncomeYear2 > 0) && (typeof $scope.DividendsYear2 !== 'undefined' && $scope.DividendsYear2 !== null && Math.abs($scope.DividendsYear2) > 0)) {
            $scope.DividendsRateYear2 = (-$scope.DividendsYear2 / $scope.NetIncomeYear2) * 100;
        }
    };
    
    var bankEquityCapitalYear2 = function () {
        if ($scope.NewCapitalYear2 !== null && Math.abs($scope.NewCapitalYear2) > 0)
            $scope.BankEquityCapitalYear2 = parseFloat($scope.BankEquityCapitalYear1) + parseFloat($scope.NetIncomeYear2) - parseFloat($scope.DividendsYear2) + parseFloat($scope.NewCapitalYear2);
        else
            $scope.BankEquityCapitalYear2 = parseFloat($scope.BankEquityCapitalYear1) + parseFloat($scope.NetIncomeYear2) - parseFloat($scope.DividendsYear2);
    }

    var cet1CapitalAdjustmentYear2 = function () {
        if ($rootScope.chkCet1CapitalAdjustment === false)
            $scope.Cet1CapitalAdjustmentYear2 = parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear2 = function () {
        if (typeof $rootScope.SelectedModel !== 'undefined' && $rootScope.SelectedModel !== null && typeof $rootScope.SelectedModel.modelKey !== 'undefined' && $rootScope.chkTier1CapitalAdjustment === false)
            $scope.Tier1CapitalAdjustmentYear2 = parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear2 = function () {
        var bankEqCapital = 0;
        var cet1CapAdjustment = 0;
        var tier1CapAdjustment = 0;

        if (typeof $scope.Cet1CapitalAdjustmentYear2 !== 'undefined' && $scope.Cet1CapitalAdjustmentYear2 !== null)
            cet1CapAdjustment = $scope.Cet1CapitalAdjustmentYear2;
        if (typeof $scope.BankEquityCapitalYear2 !== 'undefined' && $scope.BankEquityCapitalYear2 !== null)
            bankEqCapital = $scope.BankEquityCapitalYear2;
        if (typeof $scope.Tier1CapitalAdjustmentYear2 !== 'undefined' && $scope.Tier1CapitalAdjustmentYear2 !== null)
            tier1CapAdjustment = $scope.Tier1CapitalAdjustmentYear2;

        $scope.Cet1CapitalYear2 = bankEqCapital + cet1CapAdjustment + tier1CapAdjustment;
    }

    var tier1CapitalYear2 = function () {
        var tier1CapAdjustment = 0;
        if (typeof $scope.Tier1CapitalAdjustmentYear2 !== 'undefined' && $scope.Tier1CapitalAdjustmentYear2 !== null)
            tier1CapAdjustment = $scope.Tier1CapitalAdjustmentYear2;

        $scope.Tier1CapitalYear2 = parseFloat($scope.BankEquityCapitalYear2) + parseFloat(tier1CapAdjustment);
    }

    var tier2CapitalYear2 = function () {
        if ($rootScope.chkTier2Capital === false) {
            $scope.Tier2CapitalYear2 = (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * parseFloat($scope.Tier1CapitalYear2);
        }
        else {
            if (typeof $scope.Tier2CapitalYear2 === 'undefined' && $scope.Tier2CapitalYear2 === null) {
                $scope.Tier2CapitalYear2 = 0;
            }
        }
    }

    var totalRiskBasedCapitalYear2 = function () {
        var capital = 0;
        if (typeof $scope.Tier2CapitalYear2 !== 'undefined' && $scope.Tier2CapitalYear2 !== null)
            capital = $scope.Tier2CapitalYear2;

        $scope.TotalRiskBasedCapitalYear2 = parseFloat($scope.Tier1CapitalYear2) + parseFloat(capital);
    }

    var riskWeightedAssetsYear2 = function () {
        if ($rootScope.chkRiskWeightedAssets === false) {
            $scope.RiskWeightedAssetsYear2 = (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * parseFloat($scope.TotalAssetsYear2);
        }
    }

    var totalAssetsForLeverageYear2 = function () {
        if ($rootScope.chkTotalAssetsForLeverage === false) {
            $scope.TotalAssetsForLeverageYear2 = (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * parseFloat($scope.TotalAssetsYear2);
        }
    }

    var cet1CapitalRatioYear2 = function () {
        $scope.Cet1CapitalRatioYear2 = ((parseFloat($scope.Cet1CapitalYear2) / parseFloat($scope.RiskWeightedAssetsYear2)) * 100).toPrecision(6);
    }

    var tier1RBCRatioYear2 = function () {
        $scope.Tier1RBCRatioYear2 = ((parseFloat($scope.Tier1CapitalYear2) / parseFloat($scope.RiskWeightedAssetsYear2)) * 100).toPrecision(6);
    }

    var totalRBCRatioYear2 = function () {
        $scope.TotalRBCRatioYear2 = ((parseFloat($scope.TotalRiskBasedCapitalYear2) / parseFloat($scope.RiskWeightedAssetsYear2)) * 100).toPrecision(6);
    }

    var tier1LeverageRatioYear2 = function () {
        $scope.Tier1LeverageRatioYear2 = ((parseFloat($scope.Tier1CapitalYear2) / parseFloat($scope.TotalAssetsForLeverageYear2)) * 100).toPrecision(6);
    }

    var returnOnAverageEquityYear2 = function () {
        $scope.ReturnOnAverageEquityYear2 = (parseFloat($scope.NetIncomeYear2) / ((parseFloat($scope.BankEquityCapitalYear1) + parseFloat($scope.BankEquityCapitalYear2)) / 2)) * 100;
    }

    var returnOnAverageAssetsYear2 = function () {
        if ($rootScope.chkNetIncome === true) {
            $scope.ReturnOnAverageAssetsYear2 = ((parseFloat($scope.NetIncomeYear2) / ((parseFloat($scope.TotalAssetsYear1) + parseFloat($scope.TotalAssetsYear2)) / 2))) * 100;
        }
    }

    var mvEquityYear2 = function () {
        $scope.MvEquityYear2 = parseFloat($scope.BankEquityCapitalYear2) * 1.5;
    }

    var bvSharePriceYear2 = function () {
        $scope.BvSharePriceYear2 = parseFloat($scope.BankEquityCapitalYear2) * 1000 / parseFloat($scope.SharesOutstandingYear2);
    }

    var mvSharePriceYear2 = function () {
        $scope.MvSharePriceYear2 = parseFloat($scope.MvEquityYear2) * 1000 / parseFloat($scope.SharesOutstandingYear2);
    }

    var earningsPerSharePriceYear2 = function () {
        $scope.EarningsPerSharePriceYear2 = parseFloat($scope.NetIncomeYear2) * 1000 / parseFloat($scope.SharesOutstandingYear2);
    }

    var earningsPerShare15PriceYear2 = function () {
        $scope.EarningsPerShare15PriceYear2 = parseFloat($scope.EarningsPerSharePriceYear2) * 15;
    }

    var earningsPerShare20PriceYear2 = function () {
        $scope.EarningsPerShare20PriceYear2 = parseFloat($scope.EarningsPerSharePriceYear2) * 20;
    }

    var dividendPerSharePriceYear2 = function () {
        $scope.DividendPerSharePriceYear2 = parseFloat($scope.DividendsYear2) * (-1000) / parseFloat($scope.SharesOutstandingYear2);
    }

    //Year 3 Calculations
    
    var totalAssetsYear3 = function () {
        if ($scope.NewAcquisitionAssetsYear3 === null)
            $scope.NewAcquisitionAssetsYear3 = 0;

        $scope.TotalAssetsYear3 = (parseFloat($scope.TotalAssetsYear2) * (1 + (parseFloat($scope.AssetGrowthRateYear3)/100))) + parseFloat($scope.NewAcquisitionAssetsYear3);
    }

    var netIncomeYear3 = function () {
        if ($scope.NetIncomeYear3 === null) {
            $scope.NetIncomeYear3 = ((parseFloat($scope.TotalAssetsYear2) + parseFloat($scope.TotalAssetsYear3)) / 2) * (parseFloat($scope.ReturnOnAverageAssetsYear3) / 100)
        }
    }

    var dividendsYear3 = function () {
        if ($scope.DividendsYear3 === null || typeof $scope.DividendsYear3 === 'undefined' || $scope.DividendsYear3 === 0)
            $scope.DividendsYear3 = parseFloat($scope.NetIncomeYear3) * (parseFloat($scope.DividendsRateYear3) / 100);
    }

    var dividendsRateYear3 = function () {
        if ((typeof $scope.NetIncomeYear3 !== 'undefined' && $scope.NetIncomeYear3 !== null && $scope.NetIncomeYear3 > 0) && (typeof $scope.DividendsYear3 !== 'undefined' && $scope.DividendsYear3 !== null && Math.abs($scope.DividendsYear3) > 0)) {
            $scope.DividendsRateYear3 = (-$scope.DividendsYear3 / $scope.NetIncomeYear3) * 100;
        }
    }

    var bankEquityCapitalYear3 = function () {
        if ($scope.NewCapitalYear3 !== null && Math.abs($scope.NewCapitalYear3) > 0)
            $scope.BankEquityCapitalYear3 = parseFloat($scope.BankEquityCapitalYear2) + parseFloat($scope.NetIncomeYear3) - parseFloat($scope.DividendsYear3) + parseFloat($scope.NewCapitalYear3);
        else
            $scope.BankEquityCapitalYear3 = parseFloat($scope.BankEquityCapitalYear2) + parseFloat($scope.NetIncomeYear3) - parseFloat($scope.DividendsYear3);
    }

    var cet1CapitalAdjustmentYear3 = function () {
        if ($rootScope.chkCet1CapitalAdjustment === false)
            $scope.Cet1CapitalAdjustmentYear3 = parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear3 = function () {
        if (typeof $rootScope.SelectedModel !== 'undefined' && $rootScope.SelectedModel !== null && typeof $rootScope.SelectedModel.modelKey !== 'undefined' && $rootScope.chkTier1CapitalAdjustment === false)
            $scope.Tier1CapitalAdjustmentYear3 = parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear3 = function () {
        var bankEqCapital = 0;
        var cet1CapAdjustment = 0;
        var tier1CapAdjustment = 0;

        if (typeof $scope.Cet1CapitalAdjustmentYear3 !== 'undefined' && $scope.Cet1CapitalAdjustmentYear3 !== null)
            cet1CapAdjustment = $scope.Cet1CapitalAdjustmentYear3;
        if (typeof $scope.BankEquityCapitalYear3 !== 'undefined' && $scope.BankEquityCapitalYear3 !== null)
            bankEqCapital = $scope.BankEquityCapitalYear3;
        if (typeof $scope.Tier1CapitalAdjustmentYear3 !== 'undefined' && $scope.Tier1CapitalAdjustmentYear3 !== null)
            tier1CapAdjustment = $scope.Tier1CapitalAdjustmentYear3;

        $scope.Cet1CapitalYear3 = bankEqCapital + cet1CapAdjustment + tier1CapAdjustment;
    }

    var tier1CapitalYear3 = function () {
        var tier1CapAdjustment = 0;

        if (typeof $scope.Tier1CapitalAdjustmentYear3 !== 'undefined' && $scope.Tier1CapitalAdjustmentYear3 !== null)
            tier1CapAdjustment = $scope.Tier1CapitalAdjustmentYear3;

        $scope.Tier1CapitalYear3 = parseFloat($scope.BankEquityCapitalYear3) + parseFloat(tier1CapAdjustment);
    }

    var tier2CapitalYear3 = function () {
        if ($rootScope.chkTier2Capital === false) {
            $scope.Tier2CapitalYear3 = (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * parseFloat($scope.Tier1CapitalYear3);
        }
        else {
            if (typeof $scope.Tier2CapitalYear3 === 'undefined' && $scope.Tier2CapitalYear3 === null) {
                $scope.Tier2CapitalYear3 = 0;
            }
        }
    }

    var totalRiskBasedCapitalYear3 = function () {
        var capital = 0;
        if (typeof $scope.Tier2CapitalYear3 !== 'undefined' && $scope.Tier2CapitalYear3 !== null)
            capital = $scope.Tier2CapitalYear3;

        $scope.TotalRiskBasedCapitalYear3 = parseFloat($scope.Tier1CapitalYear3) + parseFloat(capital);
    }

    var riskWeightedAssetsYear3 = function () {
        if ($rootScope.chkRiskWeightedAssets === false) {
            $scope.RiskWeightedAssetsYear3 = (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * parseFloat($scope.TotalAssetsYear3);
        }
    }

    var totalAssetsForLeverageYear3 = function () {
        if ($rootScope.chkTotalAssetsForLeverage === false) {
            $scope.TotalAssetsForLeverageYear3 = (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * parseFloat($scope.TotalAssetsYear3);
        }
    }

    var cet1CapitalRatioYear3 = function () {
        $scope.Cet1CapitalRatioYear3 = ((parseFloat($scope.Cet1CapitalYear3) / parseFloat($scope.RiskWeightedAssetsYear3)) * 100).toPrecision(6);
    }

    var tier1RBCRatioYear3 = function () {
        $scope.Tier1RBCRatioYear3 = ((parseFloat($scope.Tier1CapitalYear3) / parseFloat($scope.RiskWeightedAssetsYear3)) * 100).toPrecision(6);
    }

    var totalRBCRatioYear3 = function () {
        $scope.TotalRBCRatioYear3 = ((parseFloat($scope.TotalRiskBasedCapitalYear3) / parseFloat($scope.RiskWeightedAssetsYear3)) * 100).toPrecision(6);
    }

    var tier1LeverageRatioYear3 = function () {
        $scope.Tier1LeverageRatioYear3 = ((parseFloat($scope.Tier1CapitalYear3) / parseFloat($scope.TotalAssetsForLeverageYear3)) * 100).toPrecision(6);
    }

    var returnOnAverageEquityYear3 = function () {
        $scope.ReturnOnAverageEquityYear3 = (parseFloat($scope.NetIncomeYear3) / ((parseFloat($scope.BankEquityCapitalYear2) + parseFloat($scope.BankEquityCapitalYear3)) / 2)) * 100;
    }

    var returnOnAverageAssetsYear3 = function () {
        if ($rootScope.chkNetIncome === true) {
            $scope.ReturnOnAverageAssetsYear3 = ((parseFloat($scope.NetIncomeYear3) / ((parseFloat($scope.TotalAssetsYear2) + parseFloat($scope.TotalAssetsYear3)) / 2))) * 100;
        }
    }

    var mvEquityYear3 = function () {
        $scope.MvEquityYear3 = parseFloat($scope.BankEquityCapitalYear3) * 1.5;
    }

    var bvSharePriceYear3 = function () {
        $scope.BvSharePriceYear3 = parseFloat($scope.BankEquityCapitalYear3) * 1000 / parseFloat($scope.SharesOutstandingYear3);
    }

    var mvSharePriceYear3 = function () {
        $scope.MvSharePriceYear3 = parseFloat($scope.MvEquityYear3) * 1000 / parseFloat($scope.SharesOutstandingYear3);
    }

    var earningsPerSharePriceYear3 = function () {
        $scope.EarningsPerSharePriceYear3 = parseFloat($scope.NetIncomeYear3) * 1000 / parseFloat($scope.SharesOutstandingYear3);
    }

    var earningsPerShare15PriceYear3 = function () {
        $scope.EarningsPerShare15PriceYear3 = parseFloat($scope.EarningsPerSharePriceYear3) * 15;
    }

    var earningsPerShare20PriceYear3 = function () {
        $scope.EarningsPerShare20PriceYear3 = parseFloat($scope.EarningsPerSharePriceYear3) * 20;
    }

    var dividendPerSharePriceYear3 = function () {
        $scope.DividendPerSharePriceYear3 = parseFloat($scope.DividendsYear3) * (-1000) / parseFloat($scope.SharesOutstandingYear3);
    }

    //Year 4 Calculations

    var totalAssetsYear4 = function () {
        if ($scope.NewAcquisitionAssetsYear4 === null)
            $scope.NewAcquisitionAssetsYear4 = 0;

        $scope.TotalAssetsYear4 = (parseFloat($scope.TotalAssetsYear3) * (1 + (parseFloat($scope.AssetGrowthRateYear4)/100))) + parseFloat($scope.NewAcquisitionAssetsYear4);
    }

    var netIncomeYear4 = function () {
        if ($scope.NetIncomeYear4 === null) {
            $scope.NetIncomeYear4 = (parseFloat($scope.TotalAssetsYear3) + parseFloat($scope.TotalAssetsYear4)) / 2 * (parseFloat($scope.ReturnOnAverageAssetsYear4) / 100)
        }
    }

    var dividendsYear4 = function () {
        if ($scope.DividendsYear4 === null || typeof $scope.DividendsYear4 === 'undefined' || $scope.DividendsYear4 === 0)
            $scope.DividendsYear4 = parseFloat($scope.NetIncomeYear4) * (parseFloat($scope.DividendsRateYear4) / 100);
    }

    var dividendsRateYear4 = function () {
        if ((typeof $scope.NetIncomeYear4 !== 'undefined' && $scope.NetIncomeYear4 !== null && $scope.NetIncomeYear4 > 0) && (typeof $scope.DividendsYear4 !== 'undefined' && $scope.DividendsYear4 !== null && Math.abs($scope.DividendsYear4) > 0)) {
            $scope.DividendsRateYear4 = (-$scope.DividendsYear4 / $scope.NetIncomeYear4) * 100;
        }
    }

    var bankEquityCapitalYear4 = function () {
        if ($scope.NewCapitalYear4 !== null && Math.abs($scope.NewCapitalYear4) > 0)
            $scope.BankEquityCapitalYear4 = parseFloat($scope.BankEquityCapitalYear3) + parseFloat($scope.NetIncomeYear4) - parseFloat($scope.DividendsYear4) + parseFloat($scope.NewCapitalYear4);
        else
            $scope.BankEquityCapitalYear4 = parseFloat($scope.BankEquityCapitalYear3) + parseFloat($scope.NetIncomeYear4) - parseFloat($scope.DividendsYear4);
    }

    var cet1CapitalAdjustmentYear4 = function () {
        if ($rootScope.chkCet1CapitalAdjustment === false)
            $scope.Cet1CapitalAdjustmentYear4 = parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear4 = function () {
        if (typeof $rootScope.SelectedModel !== 'undefined' && $rootScope.SelectedModel !== null && typeof $rootScope.SelectedModel.modelKey !== 'undefined' && $rootScope.chkTier1CapitalAdjustment === false)
            $scope.Tier1CapitalAdjustmentYear4 = parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear4 = function () {
        var bankEqCapital = 0;
        var cet1CapAdjustment = 0;
        var tier1CapAdjustment = 0;

        if (typeof $scope.Cet1CapitalAdjustmentYear4 !== 'undefined' && $scope.Cet1CapitalAdjustmentYear4 !== null)
            cet1CapAdjustment = $scope.Cet1CapitalAdjustmentYear4;
        if (typeof $scope.BankEquityCapitalYear4 !== 'undefined' && $scope.BankEquityCapitalYear4 !== null)
            bankEqCapital = $scope.BankEquityCapitalYear4;
        if (typeof $scope.Tier1CapitalAdjustmentYear4 !== 'undefined' && $scope.Tier1CapitalAdjustmentYear4 !== null)
            tier1CapAdjustment = $scope.Tier1CapitalAdjustmentYear4;

        $scope.Cet1CapitalYear4 = bankEqCapital + cet1CapAdjustment + tier1CapAdjustment;
    }

    var tier1CapitalYear4 = function () {
        var tier1CapAdjustment = 0;
        if (typeof $scope.Tier1CapitalAdjustmentYear4 !== 'undefined' && $scope.Tier1CapitalAdjustmentYear4 !== null)
            tier1CapAdjustment = $scope.Tier1CapitalAdjustmentYear4;

        $scope.Tier1CapitalYear4 = parseFloat($scope.BankEquityCapitalYear4) + parseFloat(tier1CapAdjustment);
    }

    var tier2CapitalYear4 = function () {
        if ($rootScope.chkTier2Capital === false) {
            $scope.Tier2CapitalYear4 = (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * parseFloat($scope.Tier1CapitalYear4);
        }
        else {
            if (typeof $scope.Tier2CapitalYear4 === 'undefined' && $scope.Tier2CapitalYear4 === null) {
                $scope.Tier2CapitalYear4 = 0;
            }
        }
    }

    var totalRiskBasedCapitalYear4 = function () {
        var capital = 0;
        if (typeof $scope.Tier2CapitalYear4 !== 'undefined' && $scope.Tier2CapitalYear4 !== null)
            capital = $scope.Tier2CapitalYear4;

        $scope.TotalRiskBasedCapitalYear4 = parseFloat($scope.Tier1CapitalYear4) + parseFloat(capital);
    }

    var riskWeightedAssetsYear4 = function () {
        if ($rootScope.chkRiskWeightedAssets === false) {
            $scope.RiskWeightedAssetsYear4 = (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * parseFloat($scope.TotalAssetsYear4);
        }
    }

    var totalAssetsForLeverageYear4 = function () {
        if ($rootScope.chkTotalAssetsForLeverage === false) {
            $scope.TotalAssetsForLeverageYear4 = (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * parseFloat($scope.TotalAssetsYear4);
        }
    }

    var cet1CapitalRatioYear4 = function () {
        $scope.Cet1CapitalRatioYear4 = ((parseFloat($scope.Cet1CapitalYear4) / parseFloat($scope.RiskWeightedAssetsYear4)) * 100).toPrecision(6);
    }

    var tier1RBCRatioYear4 = function () {
        $scope.Tier1RBCRatioYear4 = ((parseFloat($scope.Tier1CapitalYear4) / parseFloat($scope.RiskWeightedAssetsYear4)) * 100).toPrecision(6);
    }

    var totalRBCRatioYear4 = function () {
        $scope.TotalRBCRatioYear4 = ((parseFloat($scope.TotalRiskBasedCapitalYear4) / parseFloat($scope.RiskWeightedAssetsYear4)) * 100).toPrecision(6);
    }

    var tier1LeverageRatioYear4 = function () {
        $scope.Tier1LeverageRatioYear4 = ((parseFloat($scope.Tier1CapitalYear4) / parseFloat($scope.TotalAssetsForLeverageYear4)) * 100).toPrecision(6);
    }

    var returnOnAverageEquityYear4 = function () {
        $scope.ReturnOnAverageEquityYear4 = (parseFloat($scope.NetIncomeYear4) / ((parseFloat($scope.BankEquityCapitalYear3) + parseFloat($scope.BankEquityCapitalYear4)) / 2)) * 100;
    }

    var returnOnAverageAssetsYear4 = function () {
        if ($rootScope.chkNetIncome === true) {
            $scope.ReturnOnAverageAssetsYear4 = ((parseFloat($scope.NetIncomeYear4) / ((parseFloat($scope.TotalAssetsYear3) + parseFloat($scope.TotalAssetsYear4)) / 2))) * 100;
        }
    }

    var mvEquityYear4 = function () {
        $scope.MvEquityYear4 = parseFloat($scope.BankEquityCapitalYear4) * 1.5;
    }

    var bvSharePriceYear4 = function () {
        $scope.BvSharePriceYear4 = parseFloat($scope.BankEquityCapitalYear4) * 1000 / parseFloat($scope.SharesOutstandingYear4);
    }

    var mvSharePriceYear4 = function () {
        $scope.MvSharePriceYear4 = parseFloat($scope.MvEquityYear4) * 1000 / parseFloat($scope.SharesOutstandingYear4);
    }

    var earningsPerSharePriceYear4 = function () {
        $scope.EarningsPerSharePriceYear4 = parseFloat($scope.NetIncomeYear4) * 1000 / parseFloat($scope.SharesOutstandingYear4);
    }

    var earningsPerShare15PriceYear4 = function () {
        $scope.EarningsPerShare15PriceYear4 = parseFloat($scope.EarningsPerSharePriceYear4) * 15;
    }

    var earningsPerShare20PriceYear4 = function () {
        $scope.EarningsPerShare20PriceYear4 = parseFloat($scope.EarningsPerSharePriceYear4) * 20;
    }

    var dividendPerSharePriceYear4 = function () {
        $scope.DividendPerSharePriceYear4 = parseFloat($scope.DividendsYear4) * (-1000) / parseFloat($scope.SharesOutstandingYear4);
    }

    //Year 5 Calculations

    var totalAssetsYear5 = function () {
        if ($scope.NewAcquisitionAssetsYear5 === null)
            $scope.NewAcquisitionAssetsYear5 = 0;

        $scope.TotalAssetsYear5 = (parseFloat($scope.TotalAssetsYear4) * (1 + (parseFloat($scope.AssetGrowthRateYear5)/100))) + parseFloat($scope.NewAcquisitionAssetsYear5);
    }

    var netIncomeYear5 = function () {
        if ($scope.NetIncomeYear5 === null) {
            $scope.NetIncomeYear5 = (parseFloat($scope.TotalAssetsYear4) + parseFloat($scope.TotalAssetsYear5)) / 2 * (parseFloat($scope.ReturnOnAverageAssetsYear5) / 100)
        }
    }

    var dividendsYear5 = function () {
        if ($scope.DividendsYear5 === null || typeof $scope.DividendsYear5 === 'undefined' || $scope.DividendsYear5 === 0)
            $scope.DividendsYear5 = parseFloat($scope.NetIncomeYear5) * (parseFloat($scope.DividendsRateYear5)/100);
    }

    var dividendsRateYear5 = function () {
        if ((typeof $scope.NetIncomeYear5 !== 'undefined' && $scope.NetIncomeYear5 !== null && $scope.NetIncomeYear5 > 0) && (typeof $scope.DividendsYear5 !== 'undefined' && $scope.DividendsYear5 !== null && Math.abs($scope.DividendsYear5) > 0)) {
            $scope.DividendsRateYear5 = (-$scope.DividendsYear5 / $scope.NetIncomeYear5) * 100;
        }
    }

    var bankEquityCapitalYear5 = function () {
        if ($scope.NewCapitalYear5 !== null && Math.abs($scope.NewCapitalYear5) > 0)
            $scope.BankEquityCapitalYear5 = parseFloat($scope.BankEquityCapitalYear4) + parseFloat($scope.NetIncomeYear5) - parseFloat($scope.DividendsYear5) + parseFloat($scope.NewCapitalYear5);
        else
            $scope.BankEquityCapitalYear5 = parseFloat($scope.BankEquityCapitalYear4) + parseFloat($scope.NetIncomeYear5) - parseFloat($scope.DividendsYear5);
    }

    var cet1CapitalAdjustmentYear5 = function () {
        if ($rootScope.chkCet1CapitalAdjustment === false)
            $scope.Cet1CapitalAdjustmentYear5 = parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear5 = function () {
        if (typeof $rootScope.SelectedModel !== 'undefined' && $rootScope.SelectedModel !== null && typeof $rootScope.SelectedModel.modelKey !== 'undefined' && $rootScope.chkTier1CapitalAdjustment === false)
            $scope.Tier1CapitalAdjustmentYear5 = parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear5 = function () {
        var bankEqCapital = 0;
        var cet1CapAdjustment = 0;
        var tier1CapAdjustment = 0;

        if (typeof $scope.Cet1CapitalAdjustmentYear5 !== 'undefined' && $scope.Cet1CapitalAdjustmentYear5 !== null)
            cet1CapAdjustment = $scope.Cet1CapitalAdjustmentYear5;
        if (typeof $scope.BankEquityCapitalYear5 !== 'undefined' && $scope.BankEquityCapitalYear5 !== null)
            bankEqCapital = $scope.BankEquityCapitalYear5;
        if (typeof $scope.Tier1CapitalAdjustmentYear5 !== 'undefined' && $scope.Tier1CapitalAdjustmentYear5 !== null)
            tier1CapAdjustment = $scope.Tier1CapitalAdjustmentYear5;

        $scope.Cet1CapitalYear5 = bankEqCapital + cet1CapAdjustment + tier1CapAdjustment;
    }

    var tier1CapitalYear5 = function () {
        var tier1CapAdjustment = 0;
        if (typeof $scope.Tier1CapitalAdjustmentYear5 !== 'undefined' && $scope.Tier1CapitalAdjustmentYear5 !== null)
            tier1CapAdjustment = $scope.Tier1CapitalAdjustmentYear5;

        $scope.Tier1CapitalYear5 = parseFloat($scope.BankEquityCapitalYear5) + parseFloat(tier1CapAdjustment);
    }

    var tier2CapitalYear5 = function () {
        if ($rootScope.chkTier2Capital === false) {
            $scope.Tier2CapitalYear5 = (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * parseFloat($scope.Tier1CapitalYear5);
        }
        else {
            if (typeof $scope.Tier2CapitalYear5 === 'undefined' && $scope.Tier2CapitalYear5 === null) {
                $scope.Tier2CapitalYear5 = 0;
            }
        }
    }

    var totalRiskBasedCapitalYear5 = function () {
        var capital = 0;
        if (typeof $scope.Tier2CapitalYear5 !== 'undefined' && $scope.Tier2CapitalYear5 !== null)
            capital = $scope.Tier2CapitalYear5;

        $scope.TotalRiskBasedCapitalYear5 = parseFloat($scope.Tier1CapitalYear5) + parseFloat(capital);
    }

    var riskWeightedAssetsYear5 = function () {
        if ($rootScope.chkRiskWeightedAssets === false) {
            $scope.RiskWeightedAssetsYear5 = (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * parseFloat($scope.TotalAssetsYear5);
        }
    }

    var totalAssetsForLeverageYear5 = function () {
        if ($rootScope.chkTotalAssetsForLeverage === false) {
            $scope.TotalAssetsForLeverageYear5 = (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * parseFloat($scope.TotalAssetsYear5);
        }
    }

    var cet1CapitalRatioYear5 = function () {
        $scope.Cet1CapitalRatioYear5 = ((parseFloat($scope.Cet1CapitalYear5) / parseFloat($scope.RiskWeightedAssetsYear5)) * 100).toPrecision(6);
    }

    var tier1RBCRatioYear5 = function () {
        $scope.Tier1RBCRatioYear5 = ((parseFloat($scope.Tier1CapitalYear5) / parseFloat($scope.RiskWeightedAssetsYear5)) * 100).toPrecision(6);
    }

    var totalRBCRatioYear5 = function () {
        $scope.TotalRBCRatioYear5 = ((parseFloat($scope.TotalRiskBasedCapitalYear5) / parseFloat($scope.RiskWeightedAssetsYear5)) * 100).toPrecision(6);
    }

    var tier1LeverageRatioYear5 = function () {
        $scope.Tier1LeverageRatioYear5 = ((parseFloat($scope.Tier1CapitalYear5) / parseFloat($scope.TotalAssetsForLeverageYear5)) * 100).toPrecision(6);
    }

    var returnOnAverageEquityYear5 = function () {
        $scope.ReturnOnAverageEquityYear5 = (parseFloat($scope.NetIncomeYear5) / ((parseFloat($scope.BankEquityCapitalYear4) + parseFloat($scope.BankEquityCapitalYear5)) / 2)) * 100;
    }

    var returnOnAverageAssetsYear5 = function () {
        if ($rootScope.chkNetIncome === true) {
            $scope.ReturnOnAverageAssetsYear5 = ((parseFloat($scope.NetIncomeYear5) / ((parseFloat($scope.TotalAssetsYear4) + parseFloat($scope.TotalAssetsYear5)) / 2))) * 100;
        }
    }

    var mvEquityYear5 = function () {
        $scope.MvEquityYear5 = parseFloat($scope.BankEquityCapitalYear5) * 1.5;
    }

    var bvSharePriceYear5 = function () {
        $scope.BvSharePriceYear5 = parseFloat($scope.BankEquityCapitalYear5) * 1000 / parseFloat($scope.SharesOutstandingYear5);
    }

    var mvSharePriceYear5 = function () {
        $scope.MvSharePriceYear5 = parseFloat($scope.MvEquityYear5) * 1000 / parseFloat($scope.SharesOutstandingYear5);
    }

    var earningsPerSharePriceYear5 = function () {
        $scope.EarningsPerSharePriceYear5 = parseFloat($scope.NetIncomeYear5) * 1000 / parseFloat($scope.SharesOutstandingYear5);
    }

    var earningsPerShare15PriceYear5 = function () {
        $scope.EarningsPerShare15PriceYear5 = parseFloat($scope.EarningsPerSharePriceYear5) * 15;
    }

    var earningsPerShare20PriceYear5 = function () {
        $scope.EarningsPerShare20PriceYear5 = parseFloat($scope.EarningsPerSharePriceYear5) * 20;
    }

    var dividendPerSharePriceYear5 = function () {
        $scope.DividendPerSharePriceYear5 = parseFloat($scope.DividendsYear5) * (-1000) / parseFloat($scope.SharesOutstandingYear5);
    }

    $scope.$on('StrategicForecastScenarioSelected', function (event, arg) {
        getModelDetails();
    });

    $scope.$on('StrategicForecastScenarioUpdated', function (event, arg) {
        getModelDetails();
    });

    $scope.$on('SelectedInstitutionChanged', function (event, arg) {
        resetInputData();
        getModelDetails();
    });

    var setInputData = function (modelObj) {
        $scope.NetIncomeYear0 = modelObj.netIncomeYear0;
        $scope.NetIncomeYear1 = modelObj.netIncomeYear1;
        $scope.NetIncomeYear2 = modelObj.netIncomeYear2;
        $scope.NetIncomeYear3 = modelObj.netIncomeYear3;
        $scope.NetIncomeYear4 = modelObj.netIncomeYear4;
        $scope.NetIncomeYear5 = modelObj.netIncomeYear5;
        $scope.DividendsYear0 = modelObj.dividendsYear0;
        $scope.DividendsYear1 = modelObj.dividendsYear1;
        $scope.DividendsYear2 = modelObj.dividendsYear2;
        $scope.DividendsYear3 = modelObj.dividendsYear3;
        $scope.DividendsYear4 = modelObj.dividendsYear4;
        $scope.DividendsYear5 = modelObj.dividendsYear5;
        $scope.DividendsRateYear0 = modelObj.dividendsRateYear0;
        $scope.DividendsRateYear1 = modelObj.dividendsRateYear1;
        $scope.DividendsRateYear2 = modelObj.dividendsRateYear2;
        $scope.DividendsRateYear3 = modelObj.dividendsRateYear3;
        $scope.DividendsRateYear4 = modelObj.dividendsRateYear4;
        $scope.DividendsRateYear5 = modelObj.dividendsRateYear5;
        $scope.NewCapitalYear0 = modelObj.newCapitalYear0;
        $scope.NewCapitalYear1 = modelObj.newCapitalYear1;
        $scope.NewCapitalYear2 = modelObj.newCapitalYear2;
        $scope.NewCapitalYear3 = modelObj.newCapitalYear3;
        $scope.NewCapitalYear4 = modelObj.newCapitalYear4;
        $scope.NewCapitalYear5 = modelObj.newCapitalYear5;
        $scope.Cet1CapitalAdjustmentYear0 = modelObj.cet1CapitalAdjustmentYear0;
        $scope.Cet1CapitalAdjustmentYear1 = modelObj.cet1CapitalAdjustmentYear1;
        $scope.Cet1CapitalAdjustmentYear2 = modelObj.cet1CapitalAdjustmentYear2;
        $scope.Cet1CapitalAdjustmentYear3 = modelObj.cet1CapitalAdjustmentYear3;
        $scope.Cet1CapitalAdjustmentYear4 = modelObj.cet1CapitalAdjustmentYear4;
        $scope.Cet1CapitalAdjustmentYear5 = modelObj.cet1CapitalAdjustmentYear5;
        $scope.PricePerShareYear0 = modelObj.pricePerShareYear0;
        $scope.PricePerShareYear1 = modelObj.pricePerShareYear1;
        $scope.PricePerShareYear2 = modelObj.pricePerShareYear2;
        $scope.PricePerShareYear3 = modelObj.pricePerShareYear3;
        $scope.PricePerShareYear4 = modelObj.pricePerShareYear4;
        $scope.PricePerShareYear5 = modelObj.pricePerShareYear5;
        $scope.Tier1CapitalAdjustmentYear0 = modelObj.tier1CapitalAdjustmentYear0;
        $scope.Tier1CapitalAdjustmentYear1 = modelObj.tier1CapitalAdjustmentYear1;
        $scope.Tier1CapitalAdjustmentYear2 = modelObj.tier1CapitalAdjustmentYear2;
        $scope.Tier1CapitalAdjustmentYear3 = modelObj.tier1CapitalAdjustmentYear3;
        $scope.Tier1CapitalAdjustmentYear4 = modelObj.tier1CapitalAdjustmentYear4;
        $scope.Tier1CapitalAdjustmentYear5 = modelObj.tier1CapitalAdjustmentYear5;
        $scope.Tier2CapitalYear0 = modelObj.tier2CapitalYear0;
        $scope.Tier2CapitalYear1 = modelObj.tier2CapitalYear1;
        $scope.Tier2CapitalYear2 = modelObj.tier2CapitalYear2;
        $scope.Tier2CapitalYear3 = modelObj.tier2CapitalYear3;
        $scope.Tier2CapitalYear4 = modelObj.tier2CapitalYear4;
        $scope.Tier2CapitalYear5 = modelObj.tier2CapitalYear5;
        $scope.RiskWeightedAssetsYear0 = modelObj.riskWeightedAssetsYear0;
        $scope.RiskWeightedAssetsYear1 = modelObj.riskWeightedAssetsYear1;
        $scope.RiskWeightedAssetsYear2 = modelObj.riskWeightedAssetsYear2;
        $scope.RiskWeightedAssetsYear3 = modelObj.riskWeightedAssetsYear3;
        $scope.RiskWeightedAssetsYear4 = modelObj.riskWeightedAssetsYear4;
        $scope.RiskWeightedAssetsYear5 = modelObj.riskWeightedAssetsYear5;
        $scope.TotalAssetsForLeverageYear0 = modelObj.totalAssetsLeverageYear0;
        $scope.TotalAssetsForLeverageYear1 = modelObj.totalAssetsLeverageYear1;
        $scope.TotalAssetsForLeverageYear2 = modelObj.totalAssetsLeverageYear2;
        $scope.TotalAssetsForLeverageYear3 = modelObj.totalAssetsLeverageYear3;
        $scope.TotalAssetsForLeverageYear4 = modelObj.totalAssetsLeverageYear4;
        $scope.TotalAssetsForLeverageYear5 = modelObj.totalAssetsLeverageYear5;
        $scope.NewAcquisitionAssetsYear0 = modelObj.newAcquisitionAssetsYear0;
        $scope.NewAcquisitionAssetsYear1 = modelObj.newAcquisitionAssetsYear1;
        $scope.NewAcquisitionAssetsYear2 = modelObj.newAcquisitionAssetsYear2;
        $scope.NewAcquisitionAssetsYear3 = modelObj.newAcquisitionAssetsYear3;
        $scope.NewAcquisitionAssetsYear4 = modelObj.newAcquisitionAssetsYear4;
        $scope.NewAcquisitionAssetsYear5 = modelObj.newAcquisitionAssetsYear5;
        $scope.AssetGrowthRateYear0 = modelObj.assetGrowthRateYear0;
        $scope.AssetGrowthRateYear1 = modelObj.assetGrowthRateYear1;
        $scope.AssetGrowthRateYear2 = modelObj.assetGrowthRateYear2;
        $scope.AssetGrowthRateYear3 = modelObj.assetGrowthRateYear3;
        $scope.AssetGrowthRateYear4 = modelObj.assetGrowthRateYear4;
        $scope.AssetGrowthRateYear5 = modelObj.assetGrowthRateYear5;
        $scope.ReturnOnAverageAssetsYear0 = modelObj.returnOnAverageAssetsYear0;
        $scope.ReturnOnAverageAssetsYear1 = modelObj.returnOnAverageAssetsYear1;
        $scope.ReturnOnAverageAssetsYear2 = modelObj.returnOnAverageAssetsYear2;
        $scope.ReturnOnAverageAssetsYear3 = modelObj.returnOnAverageAssetsYear3;
        $scope.ReturnOnAverageAssetsYear4 = modelObj.returnOnAverageAssetsYear4;
        $scope.ReturnOnAverageAssetsYear5 = modelObj.returnOnAverageAssetsYear5;
        $scope.SharesOutstandingActualPriorYear = modelObj.sharesOutstandingActualPriorYear;
        $scope.SharesOutstandingActualCurrentQuarter = modelObj.sharesOutstandingActualCurrentQuarter;
        $scope.SharesOutstandingYear0 = modelObj.sharesOutstandingActualYear0;
        $scope.SharesOutstandingYear1 = modelObj.sharesOutstandingActualYear1;
        $scope.SharesOutstandingYear2 = modelObj.sharesOutstandingActualYear2;
        $scope.SharesOutstandingYear3 = modelObj.sharesOutstandingActualYear3;
        $scope.SharesOutstandingYear4 = modelObj.sharesOutstandingActualYear4;
        $scope.SharesOutstandingYear5 = modelObj.sharesOutstandingActualYear5;
    }

    var setPriorCurrentYearData = function (modelObj) {
        $scope.NetIncomePriorYear = modelObj.netIncomePriorYear;
        $scope.NetIncomeCurrentQuarter = modelObj.netIncomeCurrentQuarter;
        $scope.DividendsPriorYear = modelObj.dividendsPriorYear;
        $scope.DividendsCurrentQuarter = modelObj.dividendsCurrentQuarter;
        $scope.DividendsRatePriorYear = modelObj.dividendsRatePriorYear * 100;
        $scope.DividendsRateCurrentQuarter = modelObj.dividendsRateCurrentQuarter * 100; 
        $scope.BankEquityCapitalPriorYear = modelObj.bankEquityCapitalPriorYear;
        $scope.BankEquityCapitalCurrentQuarter = modelObj.bankEquityCapitalCurrentQuarter;
        //$scope.NewCapitalPriorYear = modelObj.newCapitalPriorYear;
        //$scope.NewCapitalCurrentQuarter = modelObj.newCapitalCurrentQuarter;
        $scope.Cet1CapitalAdjustmentPriorYear = modelObj.cet1CapitalAdjustmentPriorYear;
        $scope.Cet1CapitalAdjustmentCurrentQuarter = modelObj.cet1CapitalAdjustmentCurrentQuarter;
        //$scope.PricePerSharePriorYear = modelObj.pricePerSharePriorYear;
        //$scope.PricePerShareCurrentQuarter = modelObj.pricePerShareCurrentQuarter;
        $scope.Cet1CapitalPriorYear = modelObj.cet1CapitalPriorYear;
        $scope.Cet1CapitalCurrentQuarter = modelObj.cet1CapitalCurrentQuarter;
        $scope.Tier1CapitalAdjustmentPriorYear = modelObj.tier1CapitalAdjustmentPriorYear;
        $scope.Tier1CapitalAdjustmentCurrentQuarter = modelObj.tier1CapitalAdjustmentCurrentQuarter;
        $scope.Tier1CapitalPriorYear = modelObj.tier1CapitalPriorYear;
        $scope.Tier1CapitalCurrentQuarter = modelObj.tier1CapitalCurrentQuarter;
        $scope.Tier2CapitalPriorYear = modelObj.tier2CapitalPriorYear;
        $scope.Tier2CapitalCurrentQuarter = modelObj.tier2CapitalCurrentQuarter;
        $scope.TotalRiskBasedCapitalPriorYear = modelObj.totalRiskBasedCapitalPriorYear;
        $scope.TotalRiskBasedCapitalCurrentQuarter = modelObj.totalRiskBasedCapitalCurrentQuarter;
        $scope.RiskWeightedAssetsPriorYear = modelObj.riskWeightedAssetsPriorYear;
        $scope.RiskWeightedAssetsCurrentQuarter = modelObj.riskWeightedAssetsCurrentQuarter;
        $scope.TotalAssetsForLeveragePriorYear = modelObj.totalAssetsForLeveragePriorYear;
        $scope.TotalAssetsForLeverageCurrentQuarter = modelObj.totalAssetsForLeverageCurrentQuarter;
        $scope.TotalAssetsPriorYear = modelObj.totalAssetsPriorYear;
        $scope.TotalAssetsCurrentQuarter = modelObj.totalAssetsCurrentQuarter;
        //$scope.NewAcquisitionAssetsPriorYear = modelObj.newAcquisitionAssetsPriorYear;
        //$scope.NewAcquisitionAssetsCurrentQuarter = modelObj.newAcquisitionAssetsCurrentQuarter;
        $scope.Cet1CapitalRatioPriorYear = modelObj.cet1CapitalRatioPriorYear;
        $scope.Cet1CapitalRatioCurrentQuarter = modelObj.cet1CapitalRatioCurrentQuarter;
        $scope.Tier1RBCRatioPriorYear = modelObj.tier1RBCRatioPriorYear;
        $scope.Tier1RBCRatioCurrentQuarter = modelObj.tier1RBCRatioCurrentQuarter;
        $scope.TotalRBCRatioPriorYear = modelObj.totalRBCRatioPriorYear;
        $scope.TotalRBCRatioCurrentQuarter = modelObj.totalRBCRatioCurrentQuarter;
        $scope.Tier1LeverageRatioPriorYear = modelObj.tier1LeverageRatioPriorYear;
        $scope.Tier1LeverageRatioCurrentQuarter = modelObj.tier1LeverageRatioCurrentQuarter;
        $scope.AssetGrowthRatePriorYear = modelObj.assetGrowthRatePriorYear;
        $scope.AssetGrowthRateCurrentQuarter = modelObj.assetGrowthRateCurrentQuarter;
        $scope.ReturnOnAverageAssetsPriorYear = modelObj.returnOnAverageAssetsPriorYear;
        $scope.ReturnOnAverageAssetsCurrentQuarter = modelObj.returnOnAverageAssetsCurrentQuarter;
        $scope.ReturnOnAverageEquityPriorYear = modelObj.returnOnAverageEquityPriorYear;
        $scope.ReturnOnAverageEquityCurrentQuarter = modelObj.returnOnAverageEquityCurrentQuarter;

        if ($rootScope.chkTier1CapitalAdjustment === false && typeof $rootScope.SelectedModel.modelKey !== 'undefined')
        {
            $scope.Tier1CapitalAdjustmentYear0 = modelObj.tier1CapitalAdjustmentPriorYear;
            $scope.Tier1CapitalAdjustmentYear1 = modelObj.tier1CapitalAdjustmentPriorYear;
            $scope.Tier1CapitalAdjustmentYear2 = modelObj.tier1CapitalAdjustmentPriorYear;
            $scope.Tier1CapitalAdjustmentYear3 = modelObj.tier1CapitalAdjustmentPriorYear;
            $scope.Tier1CapitalAdjustmentYear4 = modelObj.tier1CapitalAdjustmentPriorYear;
            $scope.Tier1CapitalAdjustmentYear5 = modelObj.tier1CapitalAdjustmentPriorYear;
        }

        if ($rootScope.chkCet1CapitalAdjustment === false && typeof $rootScope.SelectedModel.modelKey !== 'undefined') {
            $scope.Cet1CapitalAdjustmentYear0 = modelObj.cet1CapitalAdjustmentPriorYear;
            $scope.Cet1CapitalAdjustmentYear1 = modelObj.cet1CapitalAdjustmentPriorYear;
            $scope.Cet1CapitalAdjustmentYear2 = modelObj.cet1CapitalAdjustmentPriorYear;
            $scope.Cet1CapitalAdjustmentYear3 = modelObj.cet1CapitalAdjustmentPriorYear;
            $scope.Cet1CapitalAdjustmentYear4 = modelObj.cet1CapitalAdjustmentPriorYear;
            $scope.Cet1CapitalAdjustmentYear5 = modelObj.cet1CapitalAdjustmentPriorYear;
        }


        doCalculations();
    }

    var doCalculations = function () {
        dividendsRatePriorYear();
        mvEquityPriorYear();
        bookValueSharePricePriorYear();
        mvSharePricePriorYear();
        earningsPerSharePricePriorYear();
        earningsPerShare15PricePriorYear();
        earningsPerShare20PricePriorYear();
        dividendPerSharePricePriorYear();
        dividendsRateCurrentQuarterYear();
        mvEquityCurrentQuarter();
        sharesOutstandingActualCurrentQuarter();
        bookValueSharePriceCurrentQuarter();
        mvSharePriceCurrentQuarter();
        earningsPerSharePriceCurrentQuarter();
        earningsPerShare15PriceCurrentQuarter();
        earningsPerShare20PriceCurrentQuarter();
        dividendPerSharePriceCurrentQuarter();
        totalAssetsYear0();
        netIncomeYear0();
        dividendsYear0();
        dividendsRateYear0();
        bankEquityCapitalYear0();
        cet1CapitalAdjustmentYear0();
        tier1CapitalAdjustmentYear0();
        cet1CapitalYear0();
        tier1CapitalYear0();
        tier2CapitalYear0();
        totalRiskBasedCapitalYear0();
        riskWeightedAssetsYear0();
        totalAssetsForLeverageYear0();
        cet1CapitalRatioYear0();
        tier1RBCRatioYear0();
        totalRBCRatioYear0();
        tier1LeverageRatioYear0();
        returnOnAverageEquityYear0();
        returnOnAverageAssetsYear0();
        mvEquityYear0();
        bvSharePriceYear0();
        mvSharePriceYear0();
        earningsPerSharePriceYear0();
        earningsPerShare15PriceYear0();
        earningsPerShare20PriceYear0();
        dividendPerSharePriceYear0();
        totalAssetsYear1();
        netIncomeYear1();
        dividendsYear1();
        dividendsRateYear1();
        bankEquityCapitalYear1();
        cet1CapitalAdjustmentYear1();
        tier1CapitalAdjustmentYear1();
        cet1CapitalYear1();
        tier1CapitalYear1();
        tier2CapitalYear1();
        totalRiskBasedCapitalYear1();
        riskWeightedAssetsYear1();
        totalAssetsForLeverageYear1();
        cet1CapitalRatioYear1();
        tier1RBCRatioYear1();
        totalRBCRatioYear1();
        tier1LeverageRatioYear1();
        returnOnAverageEquityYear1();
        returnOnAverageAssetsYear1();
        mvEquityYear1();
        bvSharePriceYear1();
        mvSharePriceYear1();
        earningsPerSharePriceYear1();
        earningsPerShare15PriceYear1();
        earningsPerShare20PriceYear1();
        dividendPerSharePriceYear1();
        totalAssetsYear2();
        netIncomeYear2();
        dividendsYear2();
        dividendsRateYear2();
        bankEquityCapitalYear2();
        cet1CapitalAdjustmentYear2();
        tier1CapitalAdjustmentYear2();
        cet1CapitalYear2();
        tier1CapitalYear2();
        tier2CapitalYear2();
        totalRiskBasedCapitalYear2();
        riskWeightedAssetsYear2();
        totalAssetsForLeverageYear2();
        cet1CapitalRatioYear2();
        tier1RBCRatioYear2();
        totalRBCRatioYear2();
        tier1LeverageRatioYear2();
        returnOnAverageEquityYear2();
        returnOnAverageAssetsYear2();
        mvEquityYear2();
        bvSharePriceYear2();
        mvSharePriceYear2();
        earningsPerSharePriceYear2();
        earningsPerShare15PriceYear2();
        earningsPerShare20PriceYear2();
        dividendPerSharePriceYear2();
        totalAssetsYear3();
        netIncomeYear3();
        dividendsYear3();
        dividendsRateYear3();
        bankEquityCapitalYear3();
        cet1CapitalAdjustmentYear3();
        tier1CapitalAdjustmentYear3();
        cet1CapitalYear3();
        tier1CapitalYear3();
        tier2CapitalYear3();
        totalRiskBasedCapitalYear3();
        riskWeightedAssetsYear3();
        totalAssetsForLeverageYear3();
        cet1CapitalRatioYear3();
        tier1RBCRatioYear3();
        totalRBCRatioYear3();
        tier1LeverageRatioYear3();
        returnOnAverageEquityYear3();
        returnOnAverageAssetsYear3();
        mvEquityYear3();
        bvSharePriceYear3();
        mvSharePriceYear3();
        earningsPerSharePriceYear3();
        earningsPerShare15PriceYear3();
        earningsPerShare20PriceYear3();
        dividendPerSharePriceYear3();
        totalAssetsYear4();
        netIncomeYear4();
        dividendsYear4();
        dividendsRateYear4();
        bankEquityCapitalYear4();
        cet1CapitalAdjustmentYear4();
        tier1CapitalAdjustmentYear4();
        cet1CapitalYear4();
        tier1CapitalYear4();
        tier2CapitalYear4();
        totalRiskBasedCapitalYear4();
        riskWeightedAssetsYear4();
        totalAssetsForLeverageYear4();
        cet1CapitalRatioYear4();
        tier1RBCRatioYear4();
        totalRBCRatioYear4();
        tier1LeverageRatioYear4();
        returnOnAverageEquityYear4();
        returnOnAverageAssetsYear4();
        mvEquityYear4();
        bvSharePriceYear4();
        mvSharePriceYear4();
        earningsPerSharePriceYear4();
        earningsPerShare15PriceYear4();
        earningsPerShare20PriceYear4();
        dividendPerSharePriceYear4();
        totalAssetsYear5();
        netIncomeYear5();
        dividendsYear5();
        dividendsRateYear5();
        bankEquityCapitalYear5();
        cet1CapitalAdjustmentYear5();
        tier1CapitalAdjustmentYear5();
        cet1CapitalYear5();
        tier1CapitalYear5();
        tier2CapitalYear5();
        totalRiskBasedCapitalYear5();
        riskWeightedAssetsYear5();
        totalAssetsForLeverageYear5();
        cet1CapitalRatioYear5();
        tier1RBCRatioYear5();
        totalRBCRatioYear5();
        tier1LeverageRatioYear5();
        returnOnAverageEquityYear5();
        returnOnAverageAssetsYear5();
        mvEquityYear5();
        bvSharePriceYear5();
        mvSharePriceYear5();
        earningsPerSharePriceYear5();
        earningsPerShare15PriceYear5();
        earningsPerShare20PriceYear5();
        dividendPerSharePriceYear5();
    }

    var getDashboardConcepts = function () {
        angular.element(document.querySelector('#existingScenarioLoader')).removeClass('hidden');
        var modelReq = {
            InstitutionKey: $rootScope.SelectedBank.institutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/StrategicForecastApi/GetDashboardConcepts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: modelReq
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                

                angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
                setPriorCurrentYearData(result.data);
            }
            else {
                //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get UBPR concepts. Please send an e-mail to admin@cb-resource.com.');
            angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
        });
    }

    var getModelDetails = function () {
        angular.element(document.querySelector('#existingScenarioLoader')).removeClass('hidden');
        var modelReq = {
            ScenarioKey: $rootScope.SelectedModel.modelKey,
            InstitutionKey: $rootScope.SelectedBank.institutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/StrategicForecastApi/GetModelDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            data: modelReq
        };

        $http(req).then(function (result) {
            

                angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
            if (result.data != null) {
                setInputData(result.data);
                getDashboardConcepts();
            }
            else
            {
                getDashboardConcepts();
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get model details. Please send an e-mail to admin@cb-resource.com.');
            angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
        });
    }

    $scope.ExportToExcelStrategic = function () {
        if (typeof $rootScope.SelectedModel.modelKey === 'undefined') {
            $scope.toggleErrorMessageBoxModal('Please select a scenario before trying to download calculations.');
        }
        else {
            var dashboardParam = {
                ScenarioKey: $rootScope.SelectedModel.modelKey,
                InstitutionKey: $rootScope.SelectedBank.institutionKey,
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
                data: dashboardParam
            };
            $.fileDownload('/Api/StrategicForecastApi/ExportToExcelForecastAndValueTabs', req);
        }
    }

    var initialize = function () {
        if (typeof $rootScope.SelectedModel.modelKey !== 'undefined') {
            getModelDetails();
        }
            
        if (typeof $rootScope.SelectedBank !== 'undefined') {
            getDashboardConcepts();
        }
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("strategicForecastValue", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.BankEquityCapitalPriorYear = null;
    $scope.BankEquityCapitalCurrentQuarter = null;
    $scope.BankEquityCapitalYear0 = null;
    $scope.BankEquityCapitalYear1 = null;
    $scope.BankEquityCapitalYear2 = null;
    $scope.BankEquityCapitalYear3 = null;
    $scope.BankEquityCapitalYear4 = null;
    $scope.BankEquityCapitalYear5 = null;
    $scope.ReturnOnAverageEquityPriorYear = null;
    $scope.ReturnOnAverageEquityCurrentQuarter = null;
    $scope.ReturnOnAverageEquityYear0 = null;
    $scope.ReturnOnAverageEquityYear1 = null;
    $scope.ReturnOnAverageEquityYear2 = null;
    $scope.ReturnOnAverageEquityYear3 = null;
    $scope.ReturnOnAverageEquityYear4 = null;
    $scope.ReturnOnAverageEquityYear5 = null;
    $scope.BookValueSharePricePriorYear = null;
    $scope.BookValueSharePriceCurrentQuarter = null;
    $scope.BookValueSharePriceYear0 = null;
    $scope.BookValueSharePriceYear1 = null;
    $scope.BookValueSharePriceYear2 = null;
    $scope.BookValueSharePriceYear3 = null;
    $scope.BookValueSharePriceYear4 = null;
    $scope.BookValueSharePriceYear5 = null;
    $scope.MarketValueSharePrice125PriorYear = null;
    $scope.MarketValueSharePrice125CurrentQuarter = null;
    $scope.MarketValueSharePrice125Year0 = null;
    $scope.MarketValueSharePrice125Year1 = null;
    $scope.MarketValueSharePrice125Year2 = null;
    $scope.MarketValueSharePrice125Year3 = null;
    $scope.MarketValueSharePrice125Year4 = null;
    $scope.MarketValueSharePrice125Year5 = null;
    $scope.MarketValueSharePrice150PriorYear = null;
    $scope.MarketValueSharePrice150CurrentQuarter = null;
    $scope.MarketValueSharePrice150Year0 = null;
    $scope.MarketValueSharePrice150Year1 = null;
    $scope.MarketValueSharePrice150Year2 = null;
    $scope.MarketValueSharePrice150Year3 = null;
    $scope.MarketValueSharePrice150Year4 = null;
    $scope.MarketValueSharePrice150Year5 = null;
    $scope.MarketValueSharePrice175PriorYear = null;
    $scope.MarketValueSharePrice175CurrentQuarter = null;
    $scope.MarketValueSharePrice175Year0 = null;
    $scope.MarketValueSharePrice175Year1 = null;
    $scope.MarketValueSharePrice175Year2 = null;
    $scope.MarketValueSharePrice175Year3 = null;
    $scope.MarketValueSharePrice175Year4 = null;
    $scope.MarketValueSharePrice175Year5 = null;
    $scope.MarketValueSharePrice200PriorYear = null;
    $scope.MarketValueSharePrice200CurrentQuarter = null;
    $scope.MarketValueSharePrice200Year0 = null;
    $scope.MarketValueSharePrice200Year1 = null;
    $scope.MarketValueSharePrice200Year2 = null;
    $scope.MarketValueSharePrice200Year3 = null;
    $scope.MarketValueSharePrice200Year4 = null;
    $scope.MarketValueSharePrice200Year5 = null;
    $scope.MarketValueSharePrice225PriorYear = null;
    $scope.MarketValueSharePrice225CurrentQuarter = null;
    $scope.MarketValueSharePrice225Year0 = null;
    $scope.MarketValueSharePrice225Year1 = null;
    $scope.MarketValueSharePrice225Year2 = null;
    $scope.MarketValueSharePrice225Year3 = null;
    $scope.MarketValueSharePrice225Year4 = null;
    $scope.MarketValueSharePrice225Year5 = null;
    $scope.MarketValueSharePrice250PriorYear = null;
    $scope.MarketValueSharePrice250CurrentQuarter = null;
    $scope.MarketValueSharePrice250Year0 = null;
    $scope.MarketValueSharePrice250Year1 = null;
    $scope.MarketValueSharePrice250Year2 = null;
    $scope.MarketValueSharePrice250Year3 = null;
    $scope.MarketValueSharePrice250Year4 = null;
    $scope.MarketValueSharePrice250Year5 = null;
    $scope.MarketValueSharePrice275PriorYear = null;
    $scope.MarketValueSharePrice275CurrentQuarter = null;
    $scope.MarketValueSharePrice275Year0 = null;
    $scope.MarketValueSharePrice275Year1 = null;
    $scope.MarketValueSharePrice275Year2 = null;
    $scope.MarketValueSharePrice275Year3 = null;
    $scope.MarketValueSharePrice275Year4 = null;
    $scope.MarketValueSharePrice275Year5 = null;
    $scope.MarketValueSharePrice300PriorYear = null;
    $scope.MarketValueSharePrice300CurrentQuarter = null;
    $scope.MarketValueSharePrice300Year0 = null;
    $scope.MarketValueSharePrice300Year1 = null;
    $scope.MarketValueSharePrice300Year2 = null;
    $scope.MarketValueSharePrice300Year3 = null;
    $scope.MarketValueSharePrice300Year4 = null;
    $scope.MarketValueSharePrice300Year5 = null;
    $scope.AssetGrowthRatePriorYear = null;
    $scope.AssetGrowthRateCurrentQuarter = null;
    $scope.AssetGrowthRateYear0 = null;
    $scope.AssetGrowthRateYear1 = null;
    $scope.AssetGrowthRateYear2 = null;
    $scope.AssetGrowthRateYear3 = null;
    $scope.AssetGrowthRateYear4 = null;
    $scope.AssetGrowthRateYear5 = null;
    $scope.NetIncomePriorYear = null;
    $scope.NetIncomeCurrentQuarter = null;
    $scope.NetIncomeYear0 = null;
    $scope.NetIncomeYear1 = null;
    $scope.NetIncomeYear2 = null;
    $scope.NetIncomeYear3 = null;
    $scope.NetIncomeYear4 = null;
    $scope.NetIncomeYear5 = null;
    $scope.ReturnOnAverageAssetsPriorYear = null;
    $scope.ReturnOnAverageAssetsCurrentQuarter = null;
    $scope.ReturnOnAverageAssetsYear0 = null;
    $scope.ReturnOnAverageAssetsYear1 = null;
    $scope.ReturnOnAverageAssetsYear2 = null;
    $scope.ReturnOnAverageAssetsYear3 = null;
    $scope.ReturnOnAverageAssetsYear4 = null;
    $scope.ReturnOnAverageAssetsYear5 = null;
    $scope.DividendsPriorYear = null;
    $scope.DividendsCurrentQuarter = null;
    $scope.DividendsYear0 = null;
    $scope.DividendsYear1 = null;
    $scope.DividendsYear2 = null;
    $scope.DividendsYear3 = null;
    $scope.DividendsYear4 = null;
    $scope.DividendsYear5 = null;
    $scope.DividendsRatePriorYear = null;
    $scope.DividendsRateCurrentQuarter = null;
    $scope.DividendsRateYear0 = null;
    $scope.DividendsRateYear1 = null;
    $scope.DividendsRateYear2 = null;
    $scope.DividendsRateYear3 = null;
    $scope.DividendsRateYear4 = null;
    $scope.DividendsRateYear5 = null;
    $scope.NewCapitalPriorYear = null;
    $scope.NewCapitalCurrentQuarter = null;
    $scope.NewCapitalYear0 = null;
    $scope.NewCapitalYear1 = null;
    $scope.NewCapitalYear2 = null;
    $scope.NewCapitalYear3 = null;
    $scope.NewCapitalYear4 = null;
    $scope.NewCapitalYear5 = null;
    $scope.PricePerSharePriorYear = null;
    $scope.PricePerShareCurrentQuarter = null;
    $scope.PricePerShareYear0 = null;
    $scope.PricePerShareYear1 = null;
    $scope.PricePerShareYear2 = null;
    $scope.PricePerShareYear3 = null;
    $scope.PricePerShareYear4 = null;
    $scope.PricePerShareYear5 = null;
    $scope.NewAcquisitionAssetsPriorYear = null;
    $scope.NewAcquisitionAssetsCurrentQuarter = null;
    $scope.NewAcquisitionAssetsYear0 = null;
    $scope.NewAcquisitionAssetsYear1 = null;
    $scope.NewAcquisitionAssetsYear2 = null;
    $scope.NewAcquisitionAssetsYear3 = null;
    $scope.NewAcquisitionAssetsYear4 = null;
    $scope.NewAcquisitionAssetsYear5 = null;
    $scope.Cet1CapitalAdjustmentPriorYear = null;
    $scope.Cet1CapitalAdjustmentCurrentQuarter = null;
    $scope.Cet1CapitalAdjustmentYear0 = null;
    $scope.Cet1CapitalAdjustmentYear1 = null;
    $scope.Cet1CapitalAdjustmentYear2 = null;
    $scope.Cet1CapitalAdjustmentYear3 = null;
    $scope.Cet1CapitalAdjustmentYear4 = null;
    $scope.Cet1CapitalAdjustmentYear5 = null;
    $scope.Tier1CapitalAdjustmentPriorYear = null;
    $scope.Tier1CapitalAdjustmentCurrentQuarter = null;
    $scope.Tier1CapitalAdjustmentYear0 = null;
    $scope.Tier1CapitalAdjustmentYear1 = null;
    $scope.Tier1CapitalAdjustmentYear2 = null;
    $scope.Tier1CapitalAdjustmentYear3 = null;
    $scope.Tier1CapitalAdjustmentYear4 = null;
    $scope.Tier1CapitalAdjustmentYear5 = null;
    $scope.Tier2CapitalPriorYear = null;
    $scope.Tier2CapitalCurrentQuarter = null;
    $scope.Tier2CapitalYear0 = null;
    $scope.Tier2CapitalYear1 = null;
    $scope.Tier2CapitalYear2 = null;
    $scope.Tier2CapitalYear3 = null;
    $scope.Tier2CapitalYear4 = null;
    $scope.Tier2CapitalYear5 = null;
    $scope.RiskWeightedAssetsPriorYear = null;
    $scope.RiskWeightedAssetsCurrentQuarter = null;
    $scope.RiskWeightedAssetsYear0 = null;
    $scope.RiskWeightedAssetsYear1 = null;
    $scope.RiskWeightedAssetsYear2 = null;
    $scope.RiskWeightedAssetsYear3 = null;
    $scope.RiskWeightedAssetsYear4 = null;
    $scope.RiskWeightedAssetsYear5 = null;
    $scope.TotalAssetsForLeveragePriorYear = null;
    $scope.TotalAssetsForLeverageCurrentQuarter = null;
    $scope.TotalAssetsForLeverageYear0 = null;
    $scope.TotalAssetsForLeverageYear1 = null;
    $scope.TotalAssetsForLeverageYear2 = null;
    $scope.TotalAssetsForLeverageYear3 = null;
    $scope.TotalAssetsForLeverageYear4 = null;
    $scope.TotalAssetsForLeverageYear5 = null;
    $scope.SharesOutstandingPriorYear = null;
    $scope.SharesOutstandingCurrentQuarter = null;
    $scope.SharesOutstandingYear0 = null;
    $scope.SharesOutstandingYear1 = null;
    $scope.SharesOutstandingYear2 = null;
    $scope.SharesOutstandingYear3 = null;
    $scope.SharesOutstandingYear4 = null;
    $scope.SharesOutstandingYear5 = null;
    $scope.Tier2CapitalToTier1PriorYear = null;
    $scope.Tier2CapitalToTier1CurrentQuarter = null;
    $scope.RiskWeightedAssetsToAssetsPriorYear = null;
    $scope.RiskWeightedAssetsToAssetsCurrentQuarter = null;
    $scope.AssetsForLeverageToAssetsPriorYear = null;
    $scope.AssetsForLeverageToAssetsCurrentQuarter = null;
    $scope.TotalAssetsYear0 = null;
    $scope.TotalAssetsYear1 = null;
    $scope.TotalAssetsYear2 = null;
    $scope.TotalAssetsYear3 = null;
    $scope.TotalAssetsYear4 = null;
    $scope.TotalAssetsYear5 = null;

    $scope.$on('SelectedInstitutionChanged', function (event, arg) {
        resetInputData();
        getModelDetails();
    });

    var resetInputData = function () {
        $scope.NetIncomeYear0 = null;
        $scope.NetIncomeYear1 = null;
        $scope.NetIncomeYear2 = null;
        $scope.NetIncomeYear3 = null;
        $scope.NetIncomeYear4 = null;
        $scope.NetIncomeYear5 = null;
        $scope.DividendsYear0 = null;
        $scope.DividendsYear1 = null;
        $scope.DividendsYear2 = null;
        $scope.DividendsYear3 = null;
        $scope.DividendsYear4 = null;
        $scope.DividendsYear5 = null;
        $scope.DividendsRateYear0 = null;
        $scope.DividendsRateYear1 = null;
        $scope.DividendsRateYear2 = null;
        $scope.DividendsRateYear3 = null;
        $scope.DividendsRateYear4 = null;
        $scope.DividendsRateYear5 = null;
        $scope.NewCapitalYear0 = null;
        $scope.NewCapitalYear1 = null;
        $scope.NewCapitalYear2 = null;
        $scope.NewCapitalYear3 = null;
        $scope.NewCapitalYear4 = null;
        $scope.NewCapitalYear5 = null;
        $scope.Cet1CapitalAdjustmentYear0 = null;
        $scope.Cet1CapitalAdjustmentYear1 = null;
        $scope.Cet1CapitalAdjustmentYear2 = null;
        $scope.Cet1CapitalAdjustmentYear3 = null;
        $scope.Cet1CapitalAdjustmentYear4 = null;
        $scope.Cet1CapitalAdjustmentYear5 = null;
        $scope.PricePerShareYear0 = null;
        $scope.PricePerShareYear1 = null;
        $scope.PricePerShareYear2 = null;
        $scope.PricePerShareYear3 = null;
        $scope.PricePerShareYear4 = null;
        $scope.PricePerShareYear5 = null;
        $scope.Tier1CapitalAdjustmentYear0 = null;
        $scope.Tier1CapitalAdjustmentYear1 = null;
        $scope.Tier1CapitalAdjustmentYear2 = null;
        $scope.Tier1CapitalAdjustmentYear3 = null;
        $scope.Tier1CapitalAdjustmentYear4 = null;
        $scope.Tier1CapitalAdjustmentYear5 = null;
        $scope.Tier2CapitalYear0 = null;
        $scope.Tier2CapitalYear1 = null;
        $scope.Tier2CapitalYear2 = null;
        $scope.Tier2CapitalYear3 = null;
        $scope.Tier2CapitalYear4 = null;
        $scope.Tier2CapitalYear5 = null;
        $scope.RiskWeightedAssetsYear0 = null;
        $scope.RiskWeightedAssetsYear1 = null;
        $scope.RiskWeightedAssetsYear2 = null;
        $scope.RiskWeightedAssetsYear3 = null;
        $scope.RiskWeightedAssetsYear4 = null;
        $scope.RiskWeightedAssetsYear5 = null;
        $scope.TotalAssetsForLeverageYear0 = null;
        $scope.TotalAssetsForLeverageYear1 = null;
        $scope.TotalAssetsForLeverageYear2 = null;
        $scope.TotalAssetsForLeverageYear3 = null;
        $scope.TotalAssetsForLeverageYear4 = null;
        $scope.TotalAssetsForLeverageYear5 = null;
        $scope.NewAcquisitionAssetsYear0 = null;
        $scope.NewAcquisitionAssetsYear1 = null;
        $scope.NewAcquisitionAssetsYear2 = null;
        $scope.NewAcquisitionAssetsYear3 = null;
        $scope.NewAcquisitionAssetsYear4 = null;
        $scope.NewAcquisitionAssetsYear5 = null;
        $scope.AssetGrowthRateYear0 = null;
        $scope.AssetGrowthRateYear1 = null;
        $scope.AssetGrowthRateYear2 = null;
        $scope.AssetGrowthRateYear3 = null;
        $scope.AssetGrowthRateYear4 = null;
        $scope.AssetGrowthRateYear5 = null;
        $scope.ReturnOnAverageAssetsYear0 = null;
        $scope.ReturnOnAverageAssetsYear1 = null;
        $scope.ReturnOnAverageAssetsYear2 = null;
        $scope.ReturnOnAverageAssetsYear3 = null;
        $scope.ReturnOnAverageAssetsYear4 = null;
        $scope.ReturnOnAverageAssetsYear5 = null;
        $scope.SharesOutstandingYear0 = null;
        $scope.SharesOutstandingYear1 = null;
        $scope.SharesOutstandingYear2 = null;
        $scope.SharesOutstandingYear3 = null;
        $scope.SharesOutstandingYear4 = null;
        $scope.SharesOutstandingYear5 = null;
    }

    var setInputData = function (modelObj) {
        $scope.NetIncomeYear0 = modelObj.netIncomeYear0;
        $scope.NetIncomeYear1 = modelObj.netIncomeYear1;
        $scope.NetIncomeYear2 = modelObj.netIncomeYear2;
        $scope.NetIncomeYear3 = modelObj.netIncomeYear3;
        $scope.NetIncomeYear4 = modelObj.netIncomeYear4;
        $scope.NetIncomeYear5 = modelObj.netIncomeYear5;
        $scope.DividendsYear0 = modelObj.dividendsYear0;
        $scope.DividendsYear1 = modelObj.dividendsYear1;
        $scope.DividendsYear2 = modelObj.dividendsYear2;
        $scope.DividendsYear3 = modelObj.dividendsYear3;
        $scope.DividendsYear4 = modelObj.dividendsYear4;
        $scope.DividendsYear5 = modelObj.dividendsYear5;
        $scope.DividendsRateYear0 = modelObj.dividendsRateYear0;
        $scope.DividendsRateYear1 = modelObj.dividendsRateYear1;
        $scope.DividendsRateYear2 = modelObj.dividendsRateYear2;
        $scope.DividendsRateYear3 = modelObj.dividendsRateYear3;
        $scope.DividendsRateYear4 = modelObj.dividendsRateYear4;
        $scope.DividendsRateYear5 = modelObj.dividendsRateYear5;
        $scope.NewCapitalYear0 = modelObj.newCapitalYear0;
        $scope.NewCapitalYear1 = modelObj.newCapitalYear1;
        $scope.NewCapitalYear2 = modelObj.newCapitalYear2;
        $scope.NewCapitalYear3 = modelObj.newCapitalYear3;
        $scope.NewCapitalYear4 = modelObj.newCapitalYear4;
        $scope.NewCapitalYear5 = modelObj.newCapitalYear5;

        if ($rootScope.chkCet1CapitalAdjustment === true) {
            $scope.Cet1CapitalAdjustmentYear0 = modelObj.cet1CapitalAdjustmentYear0;
            $scope.Cet1CapitalAdjustmentYear1 = modelObj.cet1CapitalAdjustmentYear1;
            $scope.Cet1CapitalAdjustmentYear2 = modelObj.cet1CapitalAdjustmentYear2;
            $scope.Cet1CapitalAdjustmentYear3 = modelObj.cet1CapitalAdjustmentYear3;
            $scope.Cet1CapitalAdjustmentYear4 = modelObj.cet1CapitalAdjustmentYear4;
            $scope.Cet1CapitalAdjustmentYear5 = modelObj.cet1CapitalAdjustmentYear5;
        }
        $scope.PricePerShareYear0 = modelObj.pricePerShareYear0;
        $scope.PricePerShareYear1 = modelObj.pricePerShareYear1;
        $scope.PricePerShareYear2 = modelObj.pricePerShareYear2;
        $scope.PricePerShareYear3 = modelObj.pricePerShareYear3;
        $scope.PricePerShareYear4 = modelObj.pricePerShareYear4;
        $scope.PricePerShareYear5 = modelObj.pricePerShareYear5;
        $scope.Tier1CapitalAdjustmentYear0 = modelObj.tier1CapitalAdjustmentYear0;
        $scope.Tier1CapitalAdjustmentYear1 = modelObj.tier1CapitalAdjustmentYear1;
        $scope.Tier1CapitalAdjustmentYear2 = modelObj.tier1CapitalAdjustmentYear2;
        $scope.Tier1CapitalAdjustmentYear3 = modelObj.tier1CapitalAdjustmentYear3;
        $scope.Tier1CapitalAdjustmentYear4 = modelObj.tier1CapitalAdjustmentYear4;
        $scope.Tier1CapitalAdjustmentYear5 = modelObj.tier1CapitalAdjustmentYear5;
        $scope.Tier2CapitalYear0 = modelObj.tier2CapitalYear0;
        $scope.Tier2CapitalYear1 = modelObj.tier2CapitalYear1;
        $scope.Tier2CapitalYear2 = modelObj.tier2CapitalYear2;
        $scope.Tier2CapitalYear3 = modelObj.tier2CapitalYear3;
        $scope.Tier2CapitalYear4 = modelObj.tier2CapitalYear4;
        $scope.Tier2CapitalYear5 = modelObj.tier2CapitalYear5;
        $scope.RiskWeightedAssetsYear0 = modelObj.riskWeightedAssetsYear0;
        $scope.RiskWeightedAssetsYear1 = modelObj.riskWeightedAssetsYear1;
        $scope.RiskWeightedAssetsYear2 = modelObj.riskWeightedAssetsYear2;
        $scope.RiskWeightedAssetsYear3 = modelObj.riskWeightedAssetsYear3;
        $scope.RiskWeightedAssetsYear4 = modelObj.riskWeightedAssetsYear4;
        $scope.RiskWeightedAssetsYear5 = modelObj.riskWeightedAssetsYear5;
        $scope.TotalAssetsForLeverageYear0 = modelObj.totalAssetsLeverageYear0;
        $scope.TotalAssetsForLeverageYear1 = modelObj.totalAssetsLeverageYear1;
        $scope.TotalAssetsForLeverageYear2 = modelObj.totalAssetsLeverageYear2;
        $scope.TotalAssetsForLeverageYear3 = modelObj.totalAssetsLeverageYear3;
        $scope.TotalAssetsForLeverageYear4 = modelObj.totalAssetsLeverageYear4;
        $scope.TotalAssetsForLeverageYear5 = modelObj.totalAssetsLeverageYear5;
        $scope.NewAcquisitionAssetsYear0 = modelObj.newAcquisitionAssetsYear0;
        $scope.NewAcquisitionAssetsYear1 = modelObj.newAcquisitionAssetsYear1;
        $scope.NewAcquisitionAssetsYear2 = modelObj.newAcquisitionAssetsYear2;
        $scope.NewAcquisitionAssetsYear3 = modelObj.newAcquisitionAssetsYear3;
        $scope.NewAcquisitionAssetsYear4 = modelObj.newAcquisitionAssetsYear4;
        $scope.NewAcquisitionAssetsYear5 = modelObj.newAcquisitionAssetsYear5;
        $scope.AssetGrowthRateYear0 = modelObj.assetGrowthRateYear0;
        $scope.AssetGrowthRateYear1 = modelObj.assetGrowthRateYear1;
        $scope.AssetGrowthRateYear2 = modelObj.assetGrowthRateYear2;
        $scope.AssetGrowthRateYear3 = modelObj.assetGrowthRateYear3;
        $scope.AssetGrowthRateYear4 = modelObj.assetGrowthRateYear4;
        $scope.AssetGrowthRateYear5 = modelObj.assetGrowthRateYear5;
        $scope.ReturnOnAverageAssetsYear0 = modelObj.returnOnAverageAssetsYear0;
        $scope.ReturnOnAverageAssetsYear1 = modelObj.returnOnAverageAssetsYear1;
        $scope.ReturnOnAverageAssetsYear2 = modelObj.returnOnAverageAssetsYear2;
        $scope.ReturnOnAverageAssetsYear3 = modelObj.returnOnAverageAssetsYear3;
        $scope.ReturnOnAverageAssetsYear4 = modelObj.returnOnAverageAssetsYear4;
        $scope.ReturnOnAverageAssetsYear5 = modelObj.returnOnAverageAssetsYear5;
        $scope.SharesOutstandingPriorYear = modelObj.sharesOutstandingActualPriorYear;
        $scope.SharesOutstandingCurrentQuarter = modelObj.sharesOutstandingActualCurrentQuarter;
        $scope.SharesOutstandingYear0 = modelObj.sharesOutstandingActualYear0;
        $scope.SharesOutstandingYear1 = modelObj.sharesOutstandingActualYear1;
        $scope.SharesOutstandingYear2 = modelObj.sharesOutstandingActualYear2;
        $scope.SharesOutstandingYear3 = modelObj.sharesOutstandingActualYear3;
        $scope.SharesOutstandingYear4 = modelObj.sharesOutstandingActualYear4;
        $scope.SharesOutstandingYear5 = modelObj.sharesOutstandingActualYear5;
    }

    $scope.BindDividendNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else if (numericValue === 0 || numericValue === '0') {
            return $filter('number')(numericValue, fractionSize).toString();
        }
        else {
            if (numericValue < 0)
                return $filter('number')(numericValue, fractionSize).toString();
            else
                return '-' + $filter('number')(numericValue, fractionSize).toString();
        }
    }

    var setPriorCurrentYearData = function (modelObj) {
        $scope.NetIncomePriorYear = modelObj.netIncomePriorYear;
        $scope.NetIncomeCurrentQuarter = modelObj.netIncomeCurrentQuarter;
        $scope.DividendsPriorYear = modelObj.dividendsPriorYear;
        $scope.DividendsCurrentQuarter = modelObj.dividendsCurrentQuarter;
        $scope.DividendsRatePriorYear = modelObj.dividendsRatePriorYear * 100;
        $scope.DividendsRateCurrentQuarter = modelObj.dividendsRateCurrentQuarter * 100;
        $scope.BankEquityCapitalPriorYear = modelObj.bankEquityCapitalPriorYear;
        $scope.BankEquityCapitalCurrentQuarter = modelObj.bankEquityCapitalCurrentQuarter;
        //$scope.NewCapitalPriorYear = modelObj.newCapitalPriorYear;
        //$scope.NewCapitalCurrentQuarter = modelObj.newCapitalCurrentQuarter;
        $scope.Cet1CapitalAdjustmentPriorYear = modelObj.cet1CapitalAdjustmentPriorYear;
        $scope.Cet1CapitalAdjustmentCurrentQuarter = modelObj.cet1CapitalAdjustmentCurrentQuarter;
        //$scope.PricePerSharePriorYear = modelObj.pricePerSharePriorYear;
        //$scope.PricePerShareCurrentQuarter = modelObj.pricePerShareCurrentQuarter;
        $scope.Cet1CapitalPriorYear = modelObj.cet1CapitalPriorYear;
        $scope.Cet1CapitalCurrentQuarter = modelObj.cet1CapitalCurrentQuarter;
        $scope.Tier1CapitalAdjustmentPriorYear = modelObj.tier1CapitalAdjustmentPriorYear;
        $scope.Tier1CapitalAdjustmentCurrentQuarter = modelObj.tier1CapitalAdjustmentCurrentQuarter;
        $scope.Tier1CapitalPriorYear = modelObj.tier1CapitalPriorYear;
        $scope.Tier1CapitalCurrentQuarter = modelObj.tier1CapitalCurrentQuarter;
        $scope.Tier2CapitalPriorYear = modelObj.tier2CapitalPriorYear;
        $scope.Tier2CapitalCurrentQuarter = modelObj.tier2CapitalCurrentQuarter;
        $scope.TotalRiskBasedCapitalPriorYear = modelObj.totalRiskBasedCapitalPriorYear;
        $scope.TotalRiskBasedCapitalCurrentQuarter = modelObj.totalRiskBasedCapitalCurrentQuarter;
        $scope.RiskWeightedAssetsPriorYear = modelObj.riskWeightedAssetsPriorYear;
        $scope.RiskWeightedAssetsCurrentQuarter = modelObj.riskWeightedAssetsCurrentQuarter;
        $scope.TotalAssetsForLeveragePriorYear = modelObj.totalAssetsForLeveragePriorYear;
        $scope.TotalAssetsForLeverageCurrentQuarter = modelObj.totalAssetsForLeverageCurrentQuarter;
        $scope.TotalAssetsPriorYear = modelObj.totalAssetsPriorYear;
        $scope.TotalAssetsCurrentQuarter = modelObj.totalAssetsCurrentQuarter;
        //$scope.NewAcquisitionAssetsPriorYear = modelObj.newAcquisitionAssetsPriorYear;
        //$scope.NewAcquisitionAssetsCurrentQuarter = modelObj.newAcquisitionAssetsCurrentQuarter;
        $scope.Cet1CapitalRatioPriorYear = modelObj.cet1CapitalRatioPriorYear;
        $scope.Cet1CapitalRatioCurrentQuarter = modelObj.cet1CapitalRatioCurrentQuarter;
        $scope.Tier1RBCRatioPriorYear = modelObj.tier1RBCRatioPriorYear;
        $scope.Tier1RBCRatioCurrentQuarter = modelObj.tier1RBCRatioCurrentQuarter;
        $scope.TotalRBCRatioPriorYear = modelObj.totalRBCRatioPriorYear;
        $scope.TotalRBCRatioCurrentQuarter = modelObj.totalRBCRatioCurrentQuarter;
        $scope.Tier1LeverageRatioPriorYear = modelObj.tier1LeverageRatioPriorYear;
        $scope.Tier1LeverageRatioCurrentQuarter = modelObj.tier1LeverageRatioCurrentQuarter;
        $scope.AssetGrowthRatePriorYear = modelObj.assetGrowthRatePriorYear;
        $scope.AssetGrowthRateCurrentQuarter = modelObj.assetGrowthRateCurrentQuarter;
        $scope.ReturnOnAverageAssetsPriorYear = modelObj.returnOnAverageAssetsPriorYear;
        $scope.ReturnOnAverageAssetsCurrentQuarter = modelObj.returnOnAverageAssetsCurrentQuarter;
        $scope.ReturnOnAverageEquityPriorYear = modelObj.returnOnAverageEquityPriorYear;
        $scope.ReturnOnAverageEquityCurrentQuarter = modelObj.returnOnAverageEquityCurrentQuarter;
        
        doCalculations();
    }

    var getDashboardConcepts = function () {
        angular.element(document.querySelector('#existingScenarioLoader')).removeClass('hidden');
        var modelReq = {
            InstitutionKey: $rootScope.SelectedBank.institutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/StrategicForecastApi/GetDashboardConcepts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: modelReq
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                

                angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
                setPriorCurrentYearData(result.data);
            }
            else {
                //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get UBPR concepts. Please send an e-mail to admin@cb-resource.com.');
            angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
        });
    }

    var getModelDetails = function () {
        angular.element(document.querySelector('#existingScenarioLoader')).removeClass('hidden');
        var modelReq = {
            ScenarioKey: $rootScope.SelectedModel.modelKey,
            InstitutionKey: $rootScope.SelectedBank.isDefaultBank
        };

        var req = {
            method: 'POST',
            url: '/api/StrategicForecastApi/GetModelDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            data: modelReq
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                

                angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
                setInputData(result.data);
                getDashboardConcepts();
            }
            else {
                angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
                getDashboardConcepts();
                //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to save risk ratings. Please send an e-mail to admin@cb-resource.com.');
            angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
        });
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else {
            return $filter('number')(numericValue, fractionSize);
        }
    }

    $scope.ToggleCreateEditScenarioScreen = function ($event, selectedModelObj) {
        $('#drawerExample-input-filed').drawer().show();
    }

    //Year 0 calcualtions
    var totalAssetsYear0 = function () {
        if ($scope.NewAcquisitionAssetsYear0 === null)
            $scope.NewAcquisitionAssetsYear0 = 0;

        $scope.TotalAssetsYear0 = parseFloat($scope.TotalAssetsPriorYear) * (1 + (parseFloat($scope.AssetGrowthRateYear0) / 100)) + parseFloat($scope.NewAcquisitionAssetsYear0);
    }

    var netIncomeYear0 = function () {
        if ($scope.NetIncomeYear0 === null) {
            $scope.NetIncomeYear0 = ((parseFloat($scope.TotalAssetsPriorYear) + parseFloat($scope.TotalAssetsYear0)) / 2) * (parseFloat($scope.ReturnOnAverageAssetsYear0) / 100);
        }
    }

    var dividendsYear0 = function () {
        if ($scope.DividendsYear0 === null || typeof $scope.DividendsYear0 === 'undefined' || $scope.DividendsYear0 === 0)
            $scope.DividendsYear0 = parseFloat($scope.NetIncomeYear0) * (parseFloat($scope.DividendsRateYear0) / 100);
    }

    var bankEquityCapitalYear0 = function () {
        if ($scope.NewCapitalYear0 !== null && Math.abs($scope.NewCapitalYear0) > 0)
            $scope.BankEquityCapitalYear0 = parseFloat($scope.BankEquityCapitalPriorYear) + parseFloat($scope.NetIncomeYear0) - parseFloat($scope.DividendsYear0) + parseFloat($scope.NewCapitalYear0);
        else
            $scope.BankEquityCapitalYear0 = parseFloat($scope.BankEquityCapitalPriorYear) + parseFloat($scope.NetIncomeYear0) - parseFloat($scope.DividendsYear0);
    }

    var returnOnAverageEquityYear0 = function () {
        $scope.ReturnOnAverageEquityYear0 = (parseFloat($scope.NetIncomeYear0) / ((parseFloat($scope.BankEquityCapitalYear0) + parseFloat($scope.BankEquityCapitalPriorYear)) / 2)) * 100;
    }

    var returnOnAverageAssetsYear0 = function () {
        if ($rootScope.chkNetIncome === true) {
            $scope.ReturnOnAverageAssetsYear0 = ((parseFloat($scope.NetIncomeYear0) / ((parseFloat($scope.TotalAssetsPriorYear) + parseFloat($scope.TotalAssetsYear0)) / 2))) * 100;
        }
    }

    var bookValueSharePricePriorYear = function () {
        $scope.BookValueSharePricePriorYear = (parseFloat($scope.BankEquityCapitalPriorYear) * 1000) / parseFloat($scope.SharesOutstandingActualPriorYear);
    }

    var bookValueSharePriceCurrentQuarter = function () {
        $scope.BookValueSharePriceCurrentQuarter = parseFloat($scope.BankEquityCapitalCurrentQuarter) * 1000 / parseFloat($scope.SharesOutstandingActualCurrentQuarter);
    }

    var bvSharePriceYear0 = function () {
        $scope.BookValueSharePriceYear0 = parseFloat($scope.BankEquityCapitalYear0) * 1000 / parseFloat($scope.SharesOutstandingYear0);
    }

    var marketValueSharePrice125Year0 = function () {
        $scope.MarketValueSharePrice125Year0 = parseFloat($scope.BookValueSharePriceYear0) * 1.25;
    }

    var marketValueSharePrice150Year0 = function () {
        $scope.MarketValueSharePrice150Year0 = parseFloat($scope.BookValueSharePriceYear0) * 1.50;
    }

    var marketValueSharePrice175Year0 = function () {
        $scope.MarketValueSharePrice175Year0 = parseFloat($scope.BookValueSharePriceYear0) * 1.75;
    }

    var marketValueSharePrice200Year0 = function () {
        $scope.MarketValueSharePrice200Year0 = parseFloat($scope.BookValueSharePriceYear0) * 2.00;
    }

    var marketValueSharePrice225Year0 = function () {
        $scope.MarketValueSharePrice225Year0 = parseFloat($scope.BookValueSharePriceYear0) * 2.25;
    }

    var marketValueSharePrice250Year0 = function () {
        $scope.MarketValueSharePrice250Year0 = parseFloat($scope.BookValueSharePriceYear0) * 2.50;
    }

    var marketValueSharePrice275Year0 = function () {
        $scope.MarketValueSharePrice275Year0 = parseFloat($scope.BookValueSharePriceYear0) * 2.75;
    }

    var marketValueSharePrice300Year0 = function () {
        $scope.MarketValueSharePrice300Year0 = parseFloat($scope.BookValueSharePriceYear0) * 3.00;
    }

    var marketValueSharePrice125PriorYear = function () {
        $scope.MarketValueSharePrice125PriorYear = $scope.BookValueSharePricePriorYear * 1.25;
    }

    var marketValueSharePrice125CurrentQuarter = function () {
        $scope.MarketValueSharePrice125CurrentQuarter = $scope.BookValueSharePriceCurrentQuarter * 1.25;
    }

    var marketValueSharePrice150PriorYear = function () {
        $scope.MarketValueSharePrice150PriorYear = $scope.BookValueSharePricePriorYear * 1.5;
    }

    var marketValueSharePrice150CurrentQuarter = function () {
        $scope.MarketValueSharePrice150CurrentQuarter = $scope.BookValueSharePriceCurrentQuarter * 1.5;
    }

    var marketValueSharePrice175PriorYear = function () {
        $scope.MarketValueSharePrice175PriorYear = $scope.BookValueSharePricePriorYear * 1.75;
    }

    var marketValueSharePrice175CurrentQuarter = function () {
        $scope.MarketValueSharePrice175CurrentQuarter = $scope.BookValueSharePriceCurrentQuarter * 1.75;
    }

    var marketValueSharePrice200PriorYear = function () {
        $scope.MarketValueSharePrice200PriorYear = $scope.BookValueSharePricePriorYear * 2;
    }

    var marketValueSharePrice200CurrentQuarter = function () {
        $scope.MarketValueSharePrice200CurrentQuarter = $scope.BookValueSharePriceCurrentQuarter * 2;
    }

    var marketValueSharePrice225PriorYear = function () {
        $scope.MarketValueSharePrice225PriorYear = $scope.BookValueSharePricePriorYear * 2.25;
    }

    var marketValueSharePrice225CurrentQuarter = function () {
        $scope.MarketValueSharePrice225CurrentQuarter = $scope.BookValueSharePriceCurrentQuarter * 2.25;
    }

    var marketValueSharePrice250PriorYear = function () {
        $scope.MarketValueSharePrice250PriorYear = $scope.BookValueSharePricePriorYear * 2.5;
    }

    var marketValueSharePrice250CurrentQuarter = function () {
        $scope.MarketValueSharePrice250CurrentQuarter = $scope.BookValueSharePriceCurrentQuarter * 2.5;
    }

    var marketValueSharePrice275PriorYear = function () {
        $scope.MarketValueSharePrice275PriorYear = $scope.BookValueSharePricePriorYear * 2.75;
    }

    var marketValueSharePrice275CurrentQuarter = function () {
        $scope.MarketValueSharePrice275CurrentQuarter = $scope.BookValueSharePriceCurrentQuarter * 2.75;
    }

    var marketValueSharePrice300PriorYear = function () {
        $scope.MarketValueSharePrice300PriorYear = $scope.BookValueSharePricePriorYear * 3;
    }

    var marketValueSharePrice300CurrentQuarter = function () {
        $scope.MarketValueSharePrice300CurrentQuarter = $scope.BookValueSharePriceCurrentQuarter * 3;
    }


    //Year 1 calcualtions
    var totalAssetsYear1 = function () {
        if ($scope.NewAcquisitionAssetsYear1 === null)
            $scope.NewAcquisitionAssetsYear1 = 0;

        $scope.TotalAssetsYear1 = (parseFloat($scope.TotalAssetsYear0) * (1 + (parseFloat($scope.AssetGrowthRateYear1) / 100))) + parseFloat($scope.NewAcquisitionAssetsYear1);
    }

    var netIncomeYear1 = function () {
        if ($scope.NetIncomeYear1 === null) {
            $scope.NetIncomeYear1 = ((parseFloat($scope.TotalAssetsYear0) + parseFloat($scope.TotalAssetsYear1)) / 2) * (parseFloat($scope.ReturnOnAverageAssetsYear1) / 100)
        }
    }

    var dividendsYear1 = function () {
        if ($scope.DividendsYear1 === null || typeof $scope.DividendsYear1 === 'undefined' || $scope.DividendsYear1 === 0)
            $scope.DividendsYear1 = parseFloat($scope.NetIncomeYear1) * (parseFloat($scope.DividendsRateYear1) / 100);
    }

    var bankEquityCapitalYear1 = function () {
        if ($scope.NewCapitalYear1 !== null && Math.abs($scope.NewCapitalYear1) > 0)
            $scope.BankEquityCapitalYear1 = parseFloat($scope.BankEquityCapitalYear0) + parseFloat($scope.NetIncomeYear1) - parseFloat($scope.DividendsYear1) + parseFloat($scope.NewCapitalYear1);
        else
            $scope.BankEquityCapitalYear1 = parseFloat($scope.BankEquityCapitalYear0) + parseFloat($scope.NetIncomeYear1) - parseFloat($scope.DividendsYear1);
    }

    var returnOnAverageEquityYear1 = function () {
        $scope.ReturnOnAverageEquityYear1 = (parseFloat($scope.NetIncomeYear1) / ((parseFloat($scope.BankEquityCapitalYear1) + parseFloat($scope.BankEquityCapitalYear0)) / 2)) * 100;
    }

    var returnOnAverageAssetsYear1 = function () {
        if ($rootScope.chkNetIncome === true) {
            $scope.ReturnOnAverageAssetsYear1 = ((parseFloat($scope.NetIncomeYear1) / ((parseFloat($scope.TotalAssetsYear0) + parseFloat($scope.TotalAssetsYear1)) / 2))) * 100;
        }
    }

    var bvSharePriceYear1 = function () {
        $scope.BookValueSharePriceYear1 = (parseFloat($scope.BankEquityCapitalYear1) * 1000) / parseFloat($scope.SharesOutstandingYear1);
    }

    var marketValueSharePrice125Year1 = function () {
        $scope.MarketValueSharePrice125Year1 = parseFloat($scope.BookValueSharePriceYear1) * 1.25;
    }

    var marketValueSharePrice150Year1 = function () {
        $scope.MarketValueSharePrice150Year1 = parseFloat($scope.BookValueSharePriceYear1) * 1.50;
    }

    var marketValueSharePrice175Year1 = function () {
        $scope.MarketValueSharePrice175Year1 = parseFloat($scope.BookValueSharePriceYear1) * 1.75;
    }

    var marketValueSharePrice200Year1 = function () {
        $scope.MarketValueSharePrice200Year1 = parseFloat($scope.BookValueSharePriceYear1) * 2.00;
    }

    var marketValueSharePrice225Year1 = function () {
        $scope.MarketValueSharePrice225Year1 = parseFloat($scope.BookValueSharePriceYear1) * 2.25;
    }

    var marketValueSharePrice250Year1 = function () {
        $scope.MarketValueSharePrice250Year1 = parseFloat($scope.BookValueSharePriceYear1) * 2.50;
    }

    var marketValueSharePrice275Year1 = function () {
        $scope.MarketValueSharePrice275Year1 = parseFloat($scope.BookValueSharePriceYear1) * 2.75;
    }

    var marketValueSharePrice300Year1 = function () {
        $scope.MarketValueSharePrice300Year1 = parseFloat($scope.BookValueSharePriceYear1) * 3.00;
    }

    //Year 2 calcualtions
    var totalAssetsYear2 = function () {
        if ($scope.NewAcquisitionAssetsYear2 === null)
            $scope.NewAcquisitionAssetsYear2 = 0;

        $scope.TotalAssetsYear2 = (parseFloat($scope.TotalAssetsYear1) * (1 + (parseFloat($scope.AssetGrowthRateYear2) / 100))) + parseFloat($scope.NewAcquisitionAssetsYear2);
    }

    var netIncomeYear2 = function () {
        if ($scope.NetIncomeYear2 === null) {
            $scope.NetIncomeYear2 = ((parseFloat($scope.TotalAssetsYear1) + parseFloat($scope.TotalAssetsYear2)) / 2) * (parseFloat($scope.ReturnOnAverageAssetsYear2) / 100)
        }
    }

    var dividendsYear2 = function () {
        if ($scope.DividendsYear2 === null || typeof $scope.DividendsYear2 === 'undefined' || $scope.DividendsYear2 === 0)
            $scope.DividendsYear2 = parseFloat($scope.NetIncomeYear2) * (parseFloat($scope.DividendsRateYear2) / 100);
    }

    var bankEquityCapitalYear2 = function () {
        if ($scope.NewCapitalYear2 !== null && Math.abs($scope.NewCapitalYear2) > 0)
            $scope.BankEquityCapitalYear2 = parseFloat($scope.BankEquityCapitalYear1) + parseFloat($scope.NetIncomeYear2) - parseFloat($scope.DividendsYear2) + parseFloat($scope.NewCapitalYear2);
        else
            $scope.BankEquityCapitalYear2 = parseFloat($scope.BankEquityCapitalYear1) + parseFloat($scope.NetIncomeYear2) - parseFloat($scope.DividendsYear2);
    }

    var returnOnAverageEquityYear2 = function () {
        $scope.ReturnOnAverageEquityYear2 = (parseFloat($scope.NetIncomeYear2) / ((parseFloat($scope.BankEquityCapitalYear1) + parseFloat($scope.BankEquityCapitalYear2)) / 2)) * 100;
    }

    var returnOnAverageAssetsYear2 = function () {
        if ($rootScope.chkNetIncome === true) {
            $scope.ReturnOnAverageAssetsYear2 = ((parseFloat($scope.NetIncomeYear2) / ((parseFloat($scope.TotalAssetsYear1) + parseFloat($scope.TotalAssetsYear2)) / 2))) * 100;
        }
    }

    var bvSharePriceYear2 = function () {
        $scope.BookValueSharePriceYear2 = parseFloat($scope.BankEquityCapitalYear2) * 1000 / parseFloat($scope.SharesOutstandingYear2);
    }

    var marketValueSharePrice125Year2 = function () {
        $scope.MarketValueSharePrice125Year2 = parseFloat($scope.BookValueSharePriceYear2) * 1.25;
    }

    var marketValueSharePrice150Year2 = function () {
        $scope.MarketValueSharePrice150Year2 = parseFloat($scope.BookValueSharePriceYear2) * 1.50;
    }

    var marketValueSharePrice175Year2 = function () {
        $scope.MarketValueSharePrice175Year2 = parseFloat($scope.BookValueSharePriceYear2) * 1.75;
    }

    var marketValueSharePrice200Year2 = function () {
        $scope.MarketValueSharePrice200Year2 = parseFloat($scope.BookValueSharePriceYear2) * 2.00;
    }

    var marketValueSharePrice225Year2 = function () {
        $scope.MarketValueSharePrice225Year2 = parseFloat($scope.BookValueSharePriceYear2) * 2.25;
    }

    var marketValueSharePrice250Year2 = function () {
        $scope.MarketValueSharePrice250Year2 = parseFloat($scope.BookValueSharePriceYear2) * 2.50;
    }

    var marketValueSharePrice275Year2 = function () {
        $scope.MarketValueSharePrice275Year2 = parseFloat($scope.BookValueSharePriceYear2) * 2.75;
    }

    var marketValueSharePrice300Year2 = function () {
        $scope.MarketValueSharePrice300Year2 = parseFloat($scope.BookValueSharePriceYear2) * 3.00;
    }

    //Year 3 calcualtions
    var totalAssetsYear3 = function () {
        if ($scope.NewAcquisitionAssetsYear3 === null)
            $scope.NewAcquisitionAssetsYear3 = 0;

        $scope.TotalAssetsYear3 = (parseFloat($scope.TotalAssetsYear2) * (1 + (parseFloat($scope.AssetGrowthRateYear3) / 100))) + parseFloat($scope.NewAcquisitionAssetsYear3);
    }

    var netIncomeYear3 = function () {
        if ($scope.NetIncomeYear3 === null) {
            $scope.NetIncomeYear3 = ((parseFloat($scope.TotalAssetsYear2) + parseFloat($scope.TotalAssetsYear3)) / 2) * (parseFloat($scope.ReturnOnAverageAssetsYear3) / 100)
        }
    }

    var dividendsYear3 = function () {
        if ($scope.DividendsYear3 === null || typeof $scope.DividendsYear3 === 'undefined' || $scope.DividendsYear3 === 0)
            $scope.DividendsYear3 = parseFloat($scope.NetIncomeYear3) * (parseFloat($scope.DividendsRateYear3) / 100);
    }

    var bankEquityCapitalYear3 = function () {
        if ($scope.NewCapitalYear3 !== null && Math.abs($scope.NewCapitalYear3) > 0)
            $scope.BankEquityCapitalYear3 = parseFloat($scope.BankEquityCapitalYear2) + parseFloat($scope.NetIncomeYear3) - parseFloat($scope.DividendsYear3) + parseFloat($scope.NewCapitalYear3);
        else
            $scope.BankEquityCapitalYear3 = parseFloat($scope.BankEquityCapitalYear2) + parseFloat($scope.NetIncomeYear3) - parseFloat($scope.DividendsYear3);
    }

    var returnOnAverageEquityYear3 = function () {
        $scope.ReturnOnAverageEquityYear3 = (parseFloat($scope.NetIncomeYear3) / ((parseFloat($scope.BankEquityCapitalYear2) + parseFloat($scope.BankEquityCapitalYear3)) / 2)) * 100;
    }

    var returnOnAverageAssetsYear3 = function () {
        if ($rootScope.chkNetIncome === true) {
            $scope.ReturnOnAverageAssetsYear3 = ((parseFloat($scope.NetIncomeYear3) / ((parseFloat($scope.TotalAssetsYear2) + parseFloat($scope.TotalAssetsYear3)) / 2))) * 100;
        }
    }
    
    var bvSharePriceYear3 = function () {
        $scope.BookValueSharePriceYear3 = parseFloat($scope.BankEquityCapitalYear3) * 1000 / parseFloat($scope.SharesOutstandingYear3);
    }

    var marketValueSharePrice125Year3 = function () {
        $scope.MarketValueSharePrice125Year3 = parseFloat($scope.BookValueSharePriceYear3) * 1.25;
    }

    var marketValueSharePrice150Year3 = function () {
        $scope.MarketValueSharePrice150Year3 = parseFloat($scope.BookValueSharePriceYear3) * 1.50;
    }

    var marketValueSharePrice175Year3 = function () {
        $scope.MarketValueSharePrice175Year3 = parseFloat($scope.BookValueSharePriceYear3) * 1.75;
    }

    var marketValueSharePrice200Year3 = function () {
        $scope.MarketValueSharePrice200Year3 = parseFloat($scope.BookValueSharePriceYear3) * 2.00;
    }

    var marketValueSharePrice225Year3 = function () {
        $scope.MarketValueSharePrice225Year3 = parseFloat($scope.BookValueSharePriceYear3) * 2.25;
    }

    var marketValueSharePrice250Year3 = function () {
        $scope.MarketValueSharePrice250Year3 = parseFloat($scope.BookValueSharePriceYear3) * 2.50;
    }

    var marketValueSharePrice275Year3 = function () {
        $scope.MarketValueSharePrice275Year3 = parseFloat($scope.BookValueSharePriceYear3) * 2.75;
    }

    var marketValueSharePrice300Year3 = function () {
        $scope.MarketValueSharePrice300Year3 = parseFloat($scope.BookValueSharePriceYear3) * 3.00;
    }

    //Year 4 calcualtions
    var totalAssetsYear4 = function () {
        if ($scope.NewAcquisitionAssetsYear4 === null)
            $scope.NewAcquisitionAssetsYear4 = 0;

        $scope.TotalAssetsYear4 = (parseFloat($scope.TotalAssetsYear3) * (1 + (parseFloat($scope.AssetGrowthRateYear4) / 100))) + parseFloat($scope.NewAcquisitionAssetsYear4);
    }

    var netIncomeYear4 = function () {
        if ($scope.NetIncomeYear4 === null) {
            $scope.NetIncomeYear4 = (parseFloat($scope.TotalAssetsYear3) + parseFloat($scope.TotalAssetsYear4)) / 2 * (parseFloat($scope.ReturnOnAverageAssetsYear4) / 100)
        }
    }

    var dividendsYear4 = function () {
        if ($scope.DividendsYear4 === null || typeof $scope.DividendsYear4 === 'undefined' || $scope.DividendsYear4 === 0)
            $scope.DividendsYear4 = parseFloat($scope.NetIncomeYear4) * (parseFloat($scope.DividendsRateYear4) / 100);
    }

    var bankEquityCapitalYear4 = function () {
        if ($scope.NewCapitalYear4 !== null && Math.abs($scope.NewCapitalYear4) > 0)
            $scope.BankEquityCapitalYear4 = parseFloat($scope.BankEquityCapitalYear3) + parseFloat($scope.NetIncomeYear4) - parseFloat($scope.DividendsYear4) + parseFloat($scope.NewCapitalYear4);
        else
            $scope.BankEquityCapitalYear4 = parseFloat($scope.BankEquityCapitalYear3) + parseFloat($scope.NetIncomeYear4) - parseFloat($scope.DividendsYear4);
    }

    var returnOnAverageEquityYear4 = function () {
        $scope.ReturnOnAverageEquityYear4 = (parseFloat($scope.NetIncomeYear4) / ((parseFloat($scope.BankEquityCapitalYear3) + parseFloat($scope.BankEquityCapitalYear4)) / 2)) * 100;
    }

    var returnOnAverageAssetsYear4 = function () {
        if ($rootScope.chkNetIncome === true) {
            $scope.ReturnOnAverageAssetsYear4 = ((parseFloat($scope.NetIncomeYear4) / ((parseFloat($scope.TotalAssetsYear3) + parseFloat($scope.TotalAssetsYear4)) / 2))) * 100;
        }
    }

    var bvSharePriceYear4 = function () {
        $scope.BookValueSharePriceYear4 = parseFloat($scope.BankEquityCapitalYear4) * 1000 / parseFloat($scope.SharesOutstandingYear4);
    }

    var marketValueSharePrice125Year4 = function () {
        $scope.MarketValueSharePrice125Year4 = parseFloat($scope.BookValueSharePriceYear4) * 1.25;
    }

    var marketValueSharePrice150Year4 = function () {
        $scope.MarketValueSharePrice150Year4 = parseFloat($scope.BookValueSharePriceYear4) * 1.50;
    }

    var marketValueSharePrice175Year4 = function () {
        $scope.MarketValueSharePrice175Year4 = parseFloat($scope.BookValueSharePriceYear4) * 1.75;
    }

    var marketValueSharePrice200Year4 = function () {
        $scope.MarketValueSharePrice200Year4 = parseFloat($scope.BookValueSharePriceYear4) * 2.00;
    }

    var marketValueSharePrice225Year4 = function () {
        $scope.MarketValueSharePrice225Year4 = parseFloat($scope.BookValueSharePriceYear4) * 2.25;
    }

    var marketValueSharePrice250Year4 = function () {
        $scope.MarketValueSharePrice250Year4 = parseFloat($scope.BookValueSharePriceYear4) * 2.50;
    }

    var marketValueSharePrice275Year4 = function () {
        $scope.MarketValueSharePrice275Year4 = parseFloat($scope.BookValueSharePriceYear4) * 2.75;
    }

    var marketValueSharePrice300Year4 = function () {
        $scope.MarketValueSharePrice300Year4 = parseFloat($scope.BookValueSharePriceYear4) * 3.00;
    }

    //Year 5 calcualtions
    var totalAssetsYear5 = function () {
        if ($scope.NewAcquisitionAssetsYear5 === null)
            $scope.NewAcquisitionAssetsYear5 = 0;

        $scope.TotalAssetsYear5 = (parseFloat($scope.TotalAssetsYear4) * (1 + (parseFloat($scope.AssetGrowthRateYear5) / 100))) + parseFloat($scope.NewAcquisitionAssetsYear5);
    }

    var netIncomeYear5 = function () {
        if ($scope.NetIncomeYear5 === null) {
            $scope.NetIncomeYear5 = (parseFloat($scope.TotalAssetsYear4) + parseFloat($scope.TotalAssetsYear5)) / 2 * (parseFloat($scope.ReturnOnAverageAssetsYear5) / 100)
        }
    }

    var dividendsYear5 = function () {
        if ($scope.DividendsYear5 === null || typeof $scope.DividendsYear5 === 'undefined' || $scope.DividendsYear5 === 0)
            $scope.DividendsYear5 = parseFloat($scope.NetIncomeYear5) * (parseFloat($scope.DividendsRateYear5) / 100);
    }

    var bankEquityCapitalYear5 = function () {
        if ($scope.NewCapitalYear5 !== null && Math.abs($scope.NewCapitalYear5) > 0)
            $scope.BankEquityCapitalYear5 = parseFloat($scope.BankEquityCapitalYear4) + parseFloat($scope.NetIncomeYear5) - parseFloat($scope.DividendsYear5) + parseFloat($scope.NewCapitalYear5);
        else
            $scope.BankEquityCapitalYear5 = parseFloat($scope.BankEquityCapitalYear4) + parseFloat($scope.NetIncomeYear5) - parseFloat($scope.DividendsYear5);
    }

    var returnOnAverageEquityYear5 = function () {
        $scope.ReturnOnAverageEquityYear5 = (parseFloat($scope.NetIncomeYear5) / ((parseFloat($scope.BankEquityCapitalYear4) + parseFloat($scope.BankEquityCapitalYear5)) / 2)) * 100;
    }

    var returnOnAverageAssetsYear5 = function () {
        if ($rootScope.chkNetIncome === true) {
            $scope.ReturnOnAverageAssetsYear5 = ((parseFloat($scope.NetIncomeYear5) / ((parseFloat($scope.TotalAssetsYear4) + parseFloat($scope.TotalAssetsYear5)) / 2))) * 100;
        }
    }

    var bvSharePriceYear5 = function () {
        $scope.BookValueSharePriceYear5 = parseFloat($scope.BankEquityCapitalYear5) * 1000 / parseFloat($scope.SharesOutstandingYear5);
    }

    var marketValueSharePrice125Year5 = function () {
        $scope.MarketValueSharePrice125Year5 = parseFloat($scope.BookValueSharePriceYear5) * 1.25;
    }

    var marketValueSharePrice150Year5 = function () {
        $scope.MarketValueSharePrice150Year5 = parseFloat($scope.BookValueSharePriceYear5) * 1.50;
    }

    var marketValueSharePrice175Year5 = function () {
        $scope.MarketValueSharePrice175Year5 = parseFloat($scope.BookValueSharePriceYear5) * 1.75;
    }

    var marketValueSharePrice200Year5 = function () {
        $scope.MarketValueSharePrice200Year5 = parseFloat($scope.BookValueSharePriceYear5) * 2.00;
    }

    var marketValueSharePrice225Year5 = function () {
        $scope.MarketValueSharePrice225Year5 = parseFloat($scope.BookValueSharePriceYear5) * 2.25;
    }

    var marketValueSharePrice250Year5 = function () {
        $scope.MarketValueSharePrice250Year5 = parseFloat($scope.BookValueSharePriceYear5) * 2.50;
    }

    var marketValueSharePrice275Year5 = function () {
        $scope.MarketValueSharePrice275Year5 = parseFloat($scope.BookValueSharePriceYear5) * 2.75;
    }

    var marketValueSharePrice300Year5 = function () {
        $scope.MarketValueSharePrice300Year5 = parseFloat($scope.BookValueSharePriceYear5) * 3.00;
    }

    var doCalculations = function () {
        totalAssetsYear0();
        netIncomeYear0();
        dividendsYear0();
        bankEquityCapitalYear0();
        returnOnAverageEquityYear0();
        returnOnAverageAssetsYear0();
        bvSharePriceYear0();
        marketValueSharePrice125Year0();
        marketValueSharePrice150Year0();
        marketValueSharePrice175Year0();
        marketValueSharePrice200Year0();
        marketValueSharePrice225Year0();
        marketValueSharePrice250Year0();
        marketValueSharePrice275Year0();
        marketValueSharePrice300Year0();
        totalAssetsYear1();
        netIncomeYear1();
        dividendsYear1();
        bankEquityCapitalYear1();
        returnOnAverageEquityYear1();
        returnOnAverageAssetsYear1();
        bvSharePriceYear1();
        marketValueSharePrice125Year1();
        marketValueSharePrice150Year1();
        marketValueSharePrice175Year1();
        marketValueSharePrice200Year1();
        marketValueSharePrice225Year1();
        marketValueSharePrice250Year1();
        marketValueSharePrice275Year1();
        marketValueSharePrice300Year1();
        totalAssetsYear2();
        netIncomeYear2();
        dividendsYear2();
        bankEquityCapitalYear2();
        returnOnAverageEquityYear2();
        returnOnAverageAssetsYear2();
        bvSharePriceYear2();
        marketValueSharePrice125Year2();
        marketValueSharePrice150Year2();
        marketValueSharePrice175Year2();
        marketValueSharePrice200Year2();
        marketValueSharePrice225Year2();
        marketValueSharePrice250Year2();
        marketValueSharePrice275Year2();
        marketValueSharePrice300Year2();
        totalAssetsYear3();
        netIncomeYear3();
        dividendsYear3();
        bankEquityCapitalYear3();
        returnOnAverageEquityYear3();
        returnOnAverageAssetsYear3();
        bvSharePriceYear3();
        marketValueSharePrice125Year3();
        marketValueSharePrice150Year3();
        marketValueSharePrice175Year3();
        marketValueSharePrice200Year3();
        marketValueSharePrice225Year3();
        marketValueSharePrice250Year3();
        marketValueSharePrice275Year3();
        marketValueSharePrice300Year3();
        totalAssetsYear4();
        netIncomeYear4();
        dividendsYear4();
        bankEquityCapitalYear4();
        returnOnAverageEquityYear4();
        returnOnAverageAssetsYear4();
        bvSharePriceYear4();
        marketValueSharePrice125Year4();
        marketValueSharePrice150Year4();
        marketValueSharePrice175Year4();
        marketValueSharePrice200Year4();
        marketValueSharePrice225Year4();
        marketValueSharePrice250Year4();
        marketValueSharePrice275Year4();
        marketValueSharePrice300Year4();
        totalAssetsYear5();
        netIncomeYear5();
        dividendsYear5();
        bankEquityCapitalYear5();
        returnOnAverageEquityYear5();
        returnOnAverageAssetsYear5();
        bvSharePriceYear5();
        marketValueSharePrice125Year5();
        marketValueSharePrice150Year5();
        marketValueSharePrice175Year5();
        marketValueSharePrice200Year5();
        marketValueSharePrice225Year5();
        marketValueSharePrice250Year5();
        marketValueSharePrice275Year5();
        marketValueSharePrice300Year5();
        bookValueSharePricePriorYear();
        bookValueSharePriceCurrentQuarter();
        marketValueSharePrice125PriorYear();
        marketValueSharePrice125CurrentQuarter();
        marketValueSharePrice150PriorYear();
        marketValueSharePrice150CurrentQuarter();
        marketValueSharePrice175PriorYear();
        marketValueSharePrice175CurrentQuarter();
        marketValueSharePrice200PriorYear();
        marketValueSharePrice200CurrentQuarter();
        marketValueSharePrice225PriorYear();
        marketValueSharePrice225CurrentQuarter();
        marketValueSharePrice250PriorYear();
        marketValueSharePrice250CurrentQuarter();
        marketValueSharePrice275PriorYear();
        marketValueSharePrice275CurrentQuarter();
        marketValueSharePrice300PriorYear();
        marketValueSharePrice300CurrentQuarter();

    }

    $scope.$on('StrategicForecastScenarioSelected', function (event, arg) {
        getModelDetails();
    });

    $scope.$on('StrategicForecastScenarioUpdated', function (event, arg) {
        getModelDetails();
    });

    $scope.ExportToExcelStrategic = function () {
        if (typeof $rootScope.SelectedModel.modelKey === 'undefined') {
            $scope.toggleErrorMessageBoxModal('Please select a scenario first before trying to export the calculations.');
        }
        else {
            var dashboardParam = {
                ScenarioKey: $rootScope.SelectedModel.modelKey,
                InstitutionKey: $rootScope.SelectedBank.institutionKey,
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
                data: dashboardParam
            };
            $.fileDownload('/Api/StrategicForecastApi/ExportToExcelForecastAndValueTabs', req);
        }
    }

    var initialize = function () {
        if (typeof $rootScope.SelectedModel.modelKey !== 'undefined') {
            getModelDetails();
        }
        else
        {
            getDashboardConcepts();
        }
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("strategicForecastSummary", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.Horizons = [
        { label: '1 Year', value: 1 },
        { label: '2 Years', value: 2 },
        { label: '3 Years', value: 3 },
        { label: '4 Years', value: 4 },
        { label: '5 Years', value: 5 },
        { label: '6 Years', value: 6 }
    ];

    
    $scope.SelectedHorizon = $scope.Horizons[0];
    $scope.HorizonedYear = '';
    $scope.StrategicForecastModels = [];

    $scope.chkNetIncomeS1 = false;
    $scope.chkCashDividendsS1 = false;
    $scope.chkNewCapitalS1 = false;
    $scope.chkCet1CapitalAdjustmentS1 = false;
    $scope.chkTier1CapitalAdjustmentS1 = false;
    $scope.chkTier2CapitalS1 = false;
    $scope.chkRiskWeightedAssetsS1 = false;
    $scope.chkTotalAssetsForLeverageS1 = false;
    $scope.chkSharesOutstandingS1 = false;

    $scope.chkNetIncomeS2 = false;
    $scope.chkCashDividendsS2 = false;
    $scope.chkNewCapitalS2 = false;
    $scope.chkCet1CapitalAdjustmentS2 = false;
    $scope.chkTier1CapitalAdjustmentS2 = false;
    $scope.chkTier2CapitalS2 = false;
    $scope.chkRiskWeightedAssetsS2 = false;
    $scope.chkTotalAssetsForLeverageS2 = false;
    $scope.chkSharesOutstandingS2 = false;

    $scope.chkNetIncomeS3 = false;
    $scope.chkCashDividendsS3 = false;
    $scope.chkNewCapitalS3 = false;
    $scope.chkCet1CapitalAdjustmentS3 = false;
    $scope.chkTier1CapitalAdjustmentS3 = false;
    $scope.chkTier2CapitalS3 = false;
    $scope.chkRiskWeightedAssetsS3 = false;
    $scope.chkTotalAssetsForLeverageS3 = false;
    $scope.chkSharesOutstandingS3 = false;

    $scope.chkNetIncomeS4 = false;
    $scope.chkCashDividendsS4 = false;
    $scope.chkNewCapitalS4 = false;
    $scope.chkCet1CapitalAdjustmentS4 = false;
    $scope.chkTier1CapitalAdjustmentS4 = false;
    $scope.chkTier2CapitalS4 = false;
    $scope.chkRiskWeightedAssetsS4 = false;
    $scope.chkTotalAssetsForLeverageS4 = false;
    $scope.chkSharesOutstandingS4 = false;

    $scope.chkNetIncomeS5 = false;
    $scope.chkCashDividendsS5 = false;
    $scope.chkNewCapitalS5 = false;
    $scope.chkCet1CapitalAdjustmentS5 = false;
    $scope.chkTier1CapitalAdjustmentS5 = false;
    $scope.chkTier2CapitalS5 = false;
    $scope.chkRiskWeightedAssetsS5 = false;
    $scope.chkTotalAssetsForLeverageS5 = false;
    $scope.chkSharesOutstandingS5 = false;

    $scope.chkNetIncomeS6 = false;
    $scope.chkCashDividendsS6 = false;
    $scope.chkNewCapitalS6 = false;
    $scope.chkCet1CapitalAdjustmentS6 = false;
    $scope.chkTier1CapitalAdjustmentS6 = false;
    $scope.chkTier2CapitalS6 = false;
    $scope.chkRiskWeightedAssetsS6 = false;
    $scope.chkTotalAssetsForLeverageS6 = false;
    $scope.chkSharesOutstandingS6 = false;

    $scope.chkNetIncomeS7 = false;
    $scope.chkCashDividendsS7 = false;
    $scope.chkNewCapitalS7 = false;
    $scope.chkCet1CapitalAdjustmentS7 = false;
    $scope.chkTier1CapitalAdjustmentS7 = false;
    $scope.chkTier2CapitalS7 = false;
    $scope.chkRiskWeightedAssetsS7 = false;
    $scope.chkTotalAssetsForLeverageS7 = false;
    $scope.chkSharesOutstandingS7 = false;

    $scope.chkNetIncomeS8 = false;
    $scope.chkCashDividendsS8 = false;
    $scope.chkNewCapitalS8 = false;
    $scope.chkCet1CapitalAdjustmentS8 = false;
    $scope.chkTier1CapitalAdjustmentS8 = false;
    $scope.chkTier2CapitalS8 = false;
    $scope.chkRiskWeightedAssetsS8 = false;
    $scope.chkTotalAssetsForLeverageS8 = false;
    $scope.chkSharesOutstandingS8 = false;

    $scope.AssetGrowthRatePriorYear = null;
    $scope.AssetGrowthRateCurrentQuarter = null;
    $scope.AssetGrowthRateYear0 = null;
    $scope.AssetGrowthRateYear1 = null;
    $scope.AssetGrowthRateYear2 = null;
    $scope.AssetGrowthRateYear3 = null;
    $scope.AssetGrowthRateYear4 = null;
    $scope.AssetGrowthRateYear5 = null;
    $scope.AssetGrowthRateYear6 = null;

    $scope.NetIncomePriorYear = null;
    $scope.NetIncomeCurrentQuarter = null;
    $scope.NetIncomeYear0 = null;
    $scope.NetIncomeYear1 = null;
    $scope.NetIncomeYear2 = null;
    $scope.NetIncomeYear3 = null;
    $scope.NetIncomeYear4 = null;
    $scope.NetIncomeYear5 = null;
    $scope.NetIncomeYear6 = null;

    $scope.ReturnOnAverageAssetsPriorYear = null;
    $scope.ReturnOnAverageAssetsCurrentQuarter = null;
    $scope.ReturnOnAverageAssetsYear0 = null;
    $scope.ReturnOnAverageAssetsYear1 = null;
    $scope.ReturnOnAverageAssetsYear2 = null;
    $scope.ReturnOnAverageAssetsYear3 = null;
    $scope.ReturnOnAverageAssetsYear4 = null;
    $scope.ReturnOnAverageAssetsYear5 = null;
    $scope.ReturnOnAverageAssetsYear6 = null;

    $scope.DividendsPriorYear = null;
    $scope.DividendsCurrentQuarter = null;
    $scope.DividendsYear0 = null;
    $scope.DividendsYear1 = null;
    $scope.DividendsYear2 = null;
    $scope.DividendsYear3 = null;
    $scope.DividendsYear4 = null;
    $scope.DividendsYear5 = null;
    $scope.DividendsYear6 = null;

    $scope.DividendsRatePriorYear = null;
    $scope.DividendsRateCurrentQuarter = null;
    $scope.DividendsRateYear0 = null;
    $scope.DividendsRateYear1 = null;
    $scope.DividendsRateYear2 = null;
    $scope.DividendsRateYear3 = null;
    $scope.DividendsRateYear4 = null;
    $scope.DividendsRateYear5 = null;
    $scope.DividendsRateYear6 = null;

    $scope.NewCapitalPriorYear = null;
    $scope.NewCapitalCurrentQuarter = null;
    $scope.NewCapitalYear0 = null;
    $scope.NewCapitalYear1 = null;
    $scope.NewCapitalYear2 = null;
    $scope.NewCapitalYear3 = null;
    $scope.NewCapitalYear4 = null;
    $scope.NewCapitalYear5 = null;
    $scope.NewCapitalYear6 = null;

    $scope.PricePerSharePriorYear = null;
    $scope.PricePerShareCurrentQuarter = null;
    $scope.PricePerShareYear0 = null;
    $scope.PricePerShareYear1 = null;
    $scope.PricePerShareYear2 = null;
    $scope.PricePerShareYear3 = null;
    $scope.PricePerShareYear4 = null;
    $scope.PricePerShareYear5 = null;
    $scope.PricePerShareYear6 = null;

    $scope.NewAcquisitionAssetsPriorYear = null;
    $scope.NewAcquisitionAssetsCurrentQuarter = null;
    $scope.NewAcquisitionAssetsYear0 = null;
    $scope.NewAcquisitionAssetsYear1 = null;
    $scope.NewAcquisitionAssetsYear2 = null;
    $scope.NewAcquisitionAssetsYear3 = null;
    $scope.NewAcquisitionAssetsYear4 = null;
    $scope.NewAcquisitionAssetsYear5 = null;
    $scope.NewAcquisitionAssetsYear6 = null;

    $scope.Cet1CapitalAdjustmentPriorYear = null;
    $scope.Cet1CapitalAdjustmentCurrentQuarter = null;
    $scope.Cet1CapitalAdjustmentYear0 = null;
    $scope.Cet1CapitalAdjustmentYear1 = null;
    $scope.Cet1CapitalAdjustmentYear2 = null;
    $scope.Cet1CapitalAdjustmentYear3 = null;
    $scope.Cet1CapitalAdjustmentYear4 = null;
    $scope.Cet1CapitalAdjustmentYear5 = null;
    $scope.Cet1CapitalAdjustmentYear6 = null;

    $scope.Tier1CapitalAdjustmentPriorYear = null;
    $scope.Tier1CapitalAdjustmentCurrentQuarter = null;
    $scope.Tier1CapitalAdjustmentYear0 = null;
    $scope.Tier1CapitalAdjustmentYear1 = null;
    $scope.Tier1CapitalAdjustmentYear2 = null;
    $scope.Tier1CapitalAdjustmentYear3 = null;
    $scope.Tier1CapitalAdjustmentYear4 = null;
    $scope.Tier1CapitalAdjustmentYear5 = null;
    $scope.Tier1CapitalAdjustmentYear6 = null;

    $scope.Tier2CapitalPriorYear = null;
    $scope.Tier2CapitalCurrentQuarter = null;
    $scope.Tier2CapitalYear0 = null;
    $scope.Tier2CapitalYear1 = null;
    $scope.Tier2CapitalYear2 = null;
    $scope.Tier2CapitalYear3 = null;
    $scope.Tier2CapitalYear4 = null;
    $scope.Tier2CapitalYear5 = null;
    $scope.Tier2CapitalYear6 = null;

    $scope.RiskWeightedAssetsPriorYear = null;
    $scope.RiskWeightedAssetsCurrentQuarter = null;
    $scope.RiskWeightedAssetsYear0 = null;
    $scope.RiskWeightedAssetsYear1 = null;
    $scope.RiskWeightedAssetsYear2 = null;
    $scope.RiskWeightedAssetsYear3 = null;
    $scope.RiskWeightedAssetsYear4 = null;
    $scope.RiskWeightedAssetsYear5 = null;
    $scope.RiskWeightedAssetsYear6 = null;

    $scope.TotalAssetsForLeveragePriorYear = null;
    $scope.TotalAssetsForLeverageCurrentQuarter = null;
    $scope.TotalAssetsForLeverageYear0 = null;
    $scope.TotalAssetsForLeverageYear1 = null;
    $scope.TotalAssetsForLeverageYear2 = null;
    $scope.TotalAssetsForLeverageYear3 = null;
    $scope.TotalAssetsForLeverageYear4 = null;
    $scope.TotalAssetsForLeverageYear5 = null;
    $scope.TotalAssetsForLeverageYear6 = null;

    $scope.SharesOutstandingPriorYear = null;
    $scope.SharesOutstandingCurrentQuarter = null;
    $scope.SharesOutstandingYear0 = null;
    $scope.SharesOutstandingYear1 = null;
    $scope.SharesOutstandingYear2 = null;
    $scope.SharesOutstandingYear3 = null;
    $scope.SharesOutstandingYear4 = null;
    $scope.SharesOutstandingYear5 = null;
    $scope.SharesOutstandingYear6 = null;

    $scope.Tier2CapitalToTier1PriorYear = null;
    $scope.Tier2CapitalToTier1CurrentQuarter = null;
    $scope.RiskWeightedAssetsToAssetsPriorYear = null;
    $scope.RiskWeightedAssetsToAssetsCurrentQuarter = null;
    $scope.AssetsForLeverageToAssetsPriorYear = null;
    $scope.AssetsForLeverageToAssetsCurrentQuarter = null;
    $scope.TotalAssetsYear0 = null;
    $scope.TotalAssetsYear1 = null;
    $scope.TotalAssetsYear2 = null;
    $scope.TotalAssetsYear3 = null;
    $scope.TotalAssetsYear4 = null;
    $scope.TotalAssetsYear5 = null;
    $scope.TotalAssetsYear6 = null;

    $scope.SelectedModel1 = {};
    $scope.SelectedModel2 = {};
    $scope.SelectedModel3 = {};
    $scope.SelectedModel4 = {};
    $scope.SelectedModel5 = {};
    $scope.SelectedModel6 = {};
    $scope.SelectedModel7 = {};
    $scope.SelectedModel8 = {};

    $scope.SelectedScenario1 = {};
    $scope.SelectedScenario2 = {};
    $scope.SelectedScenario3 = {};
    $scope.SelectedScenario4 = {};
    $scope.SelectedScenario5 = {};
    $scope.SelectedScenario6 = {};
    $scope.SelectedScenario7 = {};
    $scope.SelectedScenario8 = {};

    $scope.NewCapital1 = null;
    $scope.NewCapital2 = null;
    $scope.NewCapital3 = null;
    $scope.NewCapital4 = null;
    $scope.NewCapital5 = null;
    $scope.NewCapital6 = null;
    $scope.NewCapital7 = null;
    $scope.NewCapital8 = null;

    $scope.PriceConversion1 = null;
    $scope.PriceConversion2 = null;
    $scope.PriceConversion3 = null;
    $scope.PriceConversion4 = null;
    $scope.PriceConversion5 = null;
    $scope.PriceConversion6 = null;
    $scope.PriceConversion7 = null;
    $scope.PriceConversion8 = null;

    $scope.TotalAssets1 = null;
    $scope.TotalAssets2 = null;
    $scope.TotalAssets3 = null;
    $scope.TotalAssets4 = null;
    $scope.TotalAssets5 = null;
    $scope.TotalAssets6 = null;
    $scope.TotalAssets7 = null;
    $scope.TotalAssets8 = null;

    $scope.AverageAnnualGrowth1 = null;
    $scope.AverageAnnualGrowth2 = null;
    $scope.AverageAnnualGrowth3 = null;
    $scope.AverageAnnualGrowth4 = null;
    $scope.AverageAnnualGrowth5 = null;
    $scope.AverageAnnualGrowth6 = null;
    $scope.AverageAnnualGrowth7 = null;
    $scope.AverageAnnualGrowth8 = null;

    $scope.NetIncome1 = null;
    $scope.NetIncome2 = null;
    $scope.NetIncome3 = null;
    $scope.NetIncome4 = null;
    $scope.NetIncome5 = null;
    $scope.NetIncome6 = null;
    $scope.NetIncome7 = null;
    $scope.NetIncome8 = null;

    $scope.Tier1CapitalRatio1 = null;
    $scope.Tier1CapitalRatio2 = null;
    $scope.Tier1CapitalRatio3 = null;
    $scope.Tier1CapitalRatio4 = null;
    $scope.Tier1CapitalRatio5 = null;
    $scope.Tier1CapitalRatio6 = null;
    $scope.Tier1CapitalRatio7 = null;
    $scope.Tier1CapitalRatio8 = null;

    $scope.Tier1LeverageRatio1 = null;
    $scope.Tier1LeverageRatio2 = null;
    $scope.Tier1LeverageRatio3 = null;
    $scope.Tier1LeverageRatio4 = null;
    $scope.Tier1LeverageRatio5 = null;
    $scope.Tier1LeverageRatio6 = null;
    $scope.Tier1LeverageRatio7 = null;
    $scope.Tier1LeverageRatio8 = null;

    $scope.TotalRiskBasedRatio1 = null;
    $scope.TotalRiskBasedRatio2 = null;
    $scope.TotalRiskBasedRatio3 = null;
    $scope.TotalRiskBasedRatio4 = null;
    $scope.TotalRiskBasedRatio5 = null;
    $scope.TotalRiskBasedRatio6 = null;
    $scope.TotalRiskBasedRatio7 = null;
    $scope.TotalRiskBasedRatio8 = null;

    $scope.ROAA1 = null;
    $scope.ROAA2 = null;
    $scope.ROAA3 = null;
    $scope.ROAA4 = null;
    $scope.ROAA5 = null;
    $scope.ROAA6 = null;
    $scope.ROAA7 = null;
    $scope.ROAA8 = null;

    $scope.ROAE1 = null;
    $scope.ROAE2 = null;
    $scope.ROAE3 = null;
    $scope.ROAE4 = null;
    $scope.ROAE5 = null;
    $scope.ROAE6 = null;
    $scope.ROAE7 = null;
    $scope.ROAE8 = null;

    $scope.BookValueEquity1 = null;
    $scope.BookValueEquity2 = null;
    $scope.BookValueEquity3 = null;
    $scope.BookValueEquity4 = null;
    $scope.BookValueEquity5 = null;
    $scope.BookValueEquity6 = null;
    $scope.BookValueEquity7 = null;
    $scope.BookValueEquity8 = null;

    $scope.MarketValueEquity1 = null;
    $scope.MarketValueEquity2 = null;
    $scope.MarketValueEquity3 = null;
    $scope.MarketValueEquity4 = null;
    $scope.MarketValueEquity5 = null;
    $scope.MarketValueEquity6 = null;
    $scope.MarketValueEquity7 = null;
    $scope.MarketValueEquity8 = null;

    $scope.BookValuePerShare1 = null;
    $scope.BookValuePerShare2 = null;
    $scope.BookValuePerShare3 = null;
    $scope.BookValuePerShare4 = null;
    $scope.BookValuePerShare5 = null;
    $scope.BookValuePerShare6 = null;
    $scope.BookValuePerShare7 = null;
    $scope.BookValuePerShare8 = null;

    $scope.EPS1 = null;
    $scope.EPS2 = null;
    $scope.EPS3 = null;
    $scope.EPS4 = null;
    $scope.EPS5 = null;
    $scope.EPS6 = null;
    $scope.EPS7 = null;
    $scope.EPS8 = null;

    $scope.Exit15XBook1 = null;
    $scope.Exit15XBook2 = null;
    $scope.Exit15XBook3 = null;
    $scope.Exit15XBook4 = null;
    $scope.Exit15XBook5 = null;
    $scope.Exit15XBook6 = null;
    $scope.Exit15XBook7 = null;
    $scope.Exit15XBook8 = null;

    $scope.ExitEPS15X1 = null;
    $scope.ExitEPS15X2 = null;
    $scope.ExitEPS15X3 = null;
    $scope.ExitEPS15X4 = null;
    $scope.ExitEPS15X5 = null;
    $scope.ExitEPS15X6 = null;
    $scope.ExitEPS15X7 = null;
    $scope.ExitEPS15X8 = null;

    $scope.ExitEPS20X1 = null;
    $scope.ExitEPS20X2 = null;
    $scope.ExitEPS20X3 = null;
    $scope.ExitEPS20X4 = null;
    $scope.ExitEPS20X5 = null;
    $scope.ExitEPS20X6 = null;
    $scope.ExitEPS20X7 = null;
    $scope.ExitEPS20X8 = null;

    $scope.DividendPerShare1 = null;
    $scope.DividendPerShare2 = null;
    $scope.DividendPerShare3 = null;
    $scope.DividendPerShare4 = null;
    $scope.DividendPerShare5 = null;
    $scope.DividendPerShare6 = null;
    $scope.DividendPerShare7 = null;
    $scope.DividendPerShare8 = null;

    $scope.SharesOutstanding1 = null;
    $scope.SharesOutstanding2 = null;
    $scope.SharesOutstanding3 = null;
    $scope.SharesOutstanding4 = null;
    $scope.SharesOutstanding5 = null;
    $scope.SharesOutstanding6 = null;
    $scope.SharesOutstanding7 = null;
    $scope.SharesOutstanding8 = null;
    $scope.EffectiveYear = 0;

    $scope.$on('SelectedInstitutionChanged', function (event, arg) {
        getDashboardConcepts();
    });

    var getEffectiveYear = function () {
        var req = {
            method: 'GET',
            url: '/api/StrategicForecastApi/GetEffectiveYear',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                

                $scope.EffectiveYear = parseInt(result.data) - 1;
                $scope.HorizonedYear = parseInt($scope.EffectiveYear) + parseInt($scope.SelectedHorizon.value);
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get latest quarter date. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var setPriorCurrentYearData = function (modelObj) {
        $scope.BankEquityCapitalPriorYear = null;
        $scope.BankEquityCapitalCurrentQuarter = null;
        $scope.NetIncomePriorYear = modelObj.netIncomePriorYear;
        $scope.NetIncomeCurrentQuarter = modelObj.netIncomeCurrentQuarter;
        $scope.DividendsPriorYear = modelObj.dividendsPriorYear;
        $scope.DividendsCurrentQuarter = modelObj.dividendsCurrentQuarter;
        $scope.DividendsRatePriorYear = modelObj.dividendsRatePriorYear * 100;
        $scope.DividendsRateCurrentQuarter = modelObj.dividendsRateCurrentQuarter * 100;
        $scope.BankEquityCapitalPriorYear = modelObj.bankEquityCapitalPriorYear;
        $scope.BankEquityCapitalCurrentQuarter = modelObj.bankEquityCapitalCurrentQuarter;
        //$scope.NewCapitalPriorYear = modelObj.newCapitalPriorYear;
        //$scope.NewCapitalCurrentQuarter = modelObj.newCapitalCurrentQuarter;
        $scope.Cet1CapitalAdjustmentPriorYear = modelObj.cet1CapitalAdjustmentPriorYear;
        $scope.Cet1CapitalAdjustmentCurrentQuarter = modelObj.cet1CapitalAdjustmentCurrentQuarter;
        //$scope.PricePerSharePriorYear = modelObj.pricePerSharePriorYear;
        //$scope.PricePerShareCurrentQuarter = modelObj.pricePerShareCurrentQuarter;
        $scope.Cet1CapitalPriorYear = modelObj.cet1CapitalPriorYear;
        $scope.Cet1CapitalCurrentQuarter = modelObj.cet1CapitalCurrentQuarter;
        $scope.Tier1CapitalAdjustmentPriorYear = modelObj.tier1CapitalAdjustmentPriorYear;
        $scope.Tier1CapitalAdjustmentCurrentQuarter = modelObj.tier1CapitalAdjustmentCurrentQuarter;
        $scope.Tier1CapitalPriorYear = modelObj.tier1CapitalPriorYear;
        $scope.Tier1CapitalCurrentQuarter = modelObj.tier1CapitalCurrentQuarter;
        $scope.Tier2CapitalPriorYear = modelObj.tier2CapitalPriorYear;
        $scope.Tier2CapitalCurrentQuarter = modelObj.tier2CapitalCurrentQuarter;
        $scope.TotalRiskBasedCapitalPriorYear = modelObj.totalRiskBasedCapitalPriorYear;
        $scope.TotalRiskBasedCapitalCurrentQuarter = modelObj.totalRiskBasedCapitalCurrentQuarter;
        $scope.RiskWeightedAssetsPriorYear = modelObj.riskWeightedAssetsPriorYear;
        $scope.RiskWeightedAssetsCurrentQuarter = modelObj.riskWeightedAssetsCurrentQuarter;
        $scope.TotalAssetsForLeveragePriorYear = modelObj.totalAssetsForLeveragePriorYear;
        $scope.TotalAssetsForLeverageCurrentQuarter = modelObj.totalAssetsForLeverageCurrentQuarter;
        $scope.TotalAssetsPriorYear = modelObj.totalAssetsPriorYear;
        $scope.TotalAssetsCurrentQuarter = modelObj.totalAssetsCurrentQuarter;
        //$scope.NewAcquisitionAssetsPriorYear = modelObj.newAcquisitionAssetsPriorYear;
        //$scope.NewAcquisitionAssetsCurrentQuarter = modelObj.newAcquisitionAssetsCurrentQuarter;
        $scope.Cet1CapitalRatioPriorYear = modelObj.cet1CapitalRatioPriorYear;
        $scope.Cet1CapitalRatioCurrentQuarter = modelObj.cet1CapitalRatioCurrentQuarter;
        $scope.Tier1RBCRatioPriorYear = modelObj.tier1RBCRatioPriorYear;
        $scope.Tier1RBCRatioCurrentQuarter = modelObj.tier1RBCRatioCurrentQuarter;
        $scope.TotalRBCRatioPriorYear = modelObj.totalRBCRatioPriorYear;
        $scope.TotalRBCRatioCurrentQuarter = modelObj.totalRBCRatioCurrentQuarter;
        $scope.Tier1LeverageRatioPriorYear = modelObj.tier1LeverageRatioPriorYear;
        $scope.Tier1LeverageRatioCurrentQuarter = modelObj.tier1LeverageRatioCurrentQuarter;
        $scope.AssetGrowthRatePriorYear = modelObj.assetGrowthRatePriorYear;
        $scope.AssetGrowthRateCurrentQuarter = modelObj.assetGrowthRateCurrentQuarter;
        $scope.ReturnOnAverageAssetsPriorYear = modelObj.returnOnAverageAssetsPriorYear;
        $scope.ReturnOnAverageAssetsCurrentQuarter = modelObj.returnOnAverageAssetsCurrentQuarter;
        $scope.ReturnOnAverageEquityPriorYear = modelObj.returnOnAverageEquityPriorYear;
        $scope.ReturnOnAverageEquityCurrentQuarter = modelObj.returnOnAverageEquityCurrentQuarter;

    };

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else {
            return $filter('number')(numericValue, fractionSize);
        }
    };

    $scope.BindDividendPerShare = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else {
            if (numericValue < 0) {
                numericValue = -1 * numericValue;
            }

            return $filter('number')(numericValue, fractionSize);
        }
    };

    var GetModelsForUser = function () {
        var req = {
            method: 'GET',
            url: '/api/StrategicForecastApi/GetModels',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            var resultData = result.data;
            if (result.data != null && result.data.length > 0) {
                

                //angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
                $scope.StrategicForecastModels = result.data;
            }
        }, function () {
            //angular.element(document.querySelector('#loaderDashboardLinks')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get favorite banks. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    $scope.filter1 = function (item) {
        return (!($scope.SelectedModel1 && $scope.SelectedModel1.modelKey) || item.modelKey != $scope.SelectedModel1.modelKey);
    };

    $scope.filter2 = function (item) {
        return (!($scope.SelectedModel2 && $scope.SelectedModel2.modelKey) || item.modelKey != $scope.SelectedModel2.modelKey);
    };

    $scope.filter3 = function (item) {
        return (!($scope.SelectedModel3 && $scope.SelectedModel3.modelKey) || item.modelKey != $scope.SelectedModel3.modelKey);
    };

    $scope.filter4 = function (item) {
        return (!($scope.SelectedModel1 && $scope.SelectedModel4.modelKey) || item.modelKey != $scope.SelectedModel4.modelKey);
    };

    $scope.filter5 = function (item) {
        return (!($scope.SelectedModel2 && $scope.SelectedModel5.modelKey) || item.modelKey != $scope.SelectedModel5.modelKey);
    };

    $scope.filter6 = function (item) {
        return (!($scope.SelectedModel3 && $scope.SelectedModel6.modelKey) || item.modelKey != $scope.SelectedModel6.modelKey);
    };

    $scope.filter7 = function (item) {
        return (!($scope.SelectedModel3 && $scope.SelectedModel7.modelKey) || item.modelKey != $scope.SelectedModel7.modelKey);
    };

    $scope.filter8 = function (item) {
        return (!($scope.SelectedModel3 && $scope.SelectedModel8.modelKey) || item.modelKey != $scope.SelectedModel8.modelKey);
    };

    $scope.CalculateHorizonYear = function () {
        if ($scope.SelectedHorizon !== '') {
            $scope.HorizonedYear = parseInt($scope.EffectiveYear) + parseInt($scope.SelectedHorizon.value);
            if (typeof $scope.SelectedModel1.modelKey !== 'undefined')
                calculateColumn1Values($scope.SelectedScenario1);

            if (typeof $scope.SelectedModel2.modelKey !== 'undefined')
                calculateColumn2Values($scope.SelectedScenario2);

            if (typeof $scope.SelectedModel3.modelKey !== 'undefined')
                calculateColumn3Values($scope.SelectedScenario3);

            if (typeof $scope.SelectedModel4.modelKey !== 'undefined')
                calculateColumn4Values($scope.SelectedScenario4);

            if (typeof $scope.SelectedModel5.modelKey !== 'undefined')
                calculateColumn5Values($scope.SelectedScenario5);

            if (typeof $scope.SelectedModel6.modelKey !== 'undefined')
                calculateColumn6Values($scope.SelectedScenario6);

            if (typeof $scope.SelectedModel7.modelKey !== 'undefined')
                calculateColumn7Values($scope.SelectedScenario7);
            
            if (typeof $scope.SelectedModel8.modelKey !== 'undefined')
                calculateColumn8Values($scope.SelectedScenario8);
        }
    }

    var setInputData = function (modelObj) {
        $scope.NetIncomeYear0 = modelObj.netIncomeYear0;
        $scope.NetIncomeYear1 = modelObj.netIncomeYear1;
        $scope.NetIncomeYear2 = modelObj.netIncomeYear2;
        $scope.NetIncomeYear3 = modelObj.netIncomeYear3;
        $scope.NetIncomeYear4 = modelObj.netIncomeYear4;
        $scope.NetIncomeYear5 = modelObj.netIncomeYear5;
        $scope.DividendsYear0 = modelObj.dividendsYear0;
        $scope.DividendsYear1 = modelObj.dividendsYear1;
        $scope.DividendsYear2 = modelObj.dividendsYear2;
        $scope.DividendsYear3 = modelObj.dividendsYear3;
        $scope.DividendsYear4 = modelObj.dividendsYear4;
        $scope.DividendsYear5 = modelObj.dividendsYear5;
        $scope.DividendsRateYear0 = modelObj.dividendsRateYear0;
        $scope.DividendsRateYear1 = modelObj.dividendsRateYear1;
        $scope.DividendsRateYear2 = modelObj.dividendsRateYear2;
        $scope.DividendsRateYear3 = modelObj.dividendsRateYear3;
        $scope.DividendsRateYear4 = modelObj.dividendsRateYear4;
        $scope.DividendsRateYear5 = modelObj.dividendsRateYear5;
        $scope.NewCapitalYear0 = modelObj.newCapitalYear0;
        $scope.NewCapitalYear1 = modelObj.newCapitalYear1;
        $scope.NewCapitalYear2 = modelObj.newCapitalYear2;
        $scope.NewCapitalYear3 = modelObj.newCapitalYear3;
        $scope.NewCapitalYear4 = modelObj.newCapitalYear4;
        $scope.NewCapitalYear5 = modelObj.newCapitalYear5;
        $scope.Cet1CapitalAdjustmentYear0 = modelObj.cet1CapitalAdjustmentYear0;
        $scope.Cet1CapitalAdjustmentYear1 = modelObj.cet1CapitalAdjustmentYear1;
        $scope.Cet1CapitalAdjustmentYear2 = modelObj.cet1CapitalAdjustmentYear2;
        $scope.Cet1CapitalAdjustmentYear3 = modelObj.cet1CapitalAdjustmentYear3;
        $scope.Cet1CapitalAdjustmentYear4 = modelObj.cet1CapitalAdjustmentYear4;
        $scope.Cet1CapitalAdjustmentYear5 = modelObj.cet1CapitalAdjustmentYear5;
        $scope.PricePerShareYear0 = modelObj.pricePerShareYear0;
        $scope.PricePerShareYear1 = modelObj.pricePerShareYear1;
        $scope.PricePerShareYear2 = modelObj.pricePerShareYear2;
        $scope.PricePerShareYear3 = modelObj.pricePerShareYear3;
        $scope.PricePerShareYear4 = modelObj.pricePerShareYear4;
        $scope.PricePerShareYear5 = modelObj.pricePerShareYear5;
        $scope.Tier1CapitalAdjustmentYear0 = modelObj.tier1CapitalAdjustmentYear0;
        $scope.Tier1CapitalAdjustmentYear1 = modelObj.tier1CapitalAdjustmentYear1;
        $scope.Tier1CapitalAdjustmentYear2 = modelObj.tier1CapitalAdjustmentYear2;
        $scope.Tier1CapitalAdjustmentYear3 = modelObj.tier1CapitalAdjustmentYear3;
        $scope.Tier1CapitalAdjustmentYear4 = modelObj.tier1CapitalAdjustmentYear4;
        $scope.Tier1CapitalAdjustmentYear5 = modelObj.tier1CapitalAdjustmentYear5;
        $scope.Tier2CapitalYear0 = modelObj.tier2CapitalYear0;
        $scope.Tier2CapitalYear1 = modelObj.tier2CapitalYear1;
        $scope.Tier2CapitalYear2 = modelObj.tier2CapitalYear2;
        $scope.Tier2CapitalYear3 = modelObj.tier2CapitalYear3;
        $scope.Tier2CapitalYear4 = modelObj.tier2CapitalYear4;
        $scope.Tier2CapitalYear5 = modelObj.tier2CapitalYear5;
        $scope.RiskWeightedAssetsYear0 = modelObj.riskWeightedAssetsYear0;
        $scope.RiskWeightedAssetsYear1 = modelObj.riskWeightedAssetsYear1;
        $scope.RiskWeightedAssetsYear2 = modelObj.riskWeightedAssetsYear2;
        $scope.RiskWeightedAssetsYear3 = modelObj.riskWeightedAssetsYear3;
        $scope.RiskWeightedAssetsYear4 = modelObj.riskWeightedAssetsYear4;
        $scope.RiskWeightedAssetsYear5 = modelObj.riskWeightedAssetsYear5;
        $scope.TotalAssetsForLeverageYear0 = modelObj.totalAssetsLeverageYear0;
        $scope.TotalAssetsForLeverageYear1 = modelObj.totalAssetsLeverageYear1;
        $scope.TotalAssetsForLeverageYear2 = modelObj.totalAssetsLeverageYear2;
        $scope.TotalAssetsForLeverageYear3 = modelObj.totalAssetsLeverageYear3;
        $scope.TotalAssetsForLeverageYear4 = modelObj.totalAssetsLeverageYear4;
        $scope.TotalAssetsForLeverageYear5 = modelObj.totalAssetsLeverageYear5;
        $scope.NewAcquisitionAssetsYear0 = modelObj.newAcquisitionAssetsYear0;
        $scope.NewAcquisitionAssetsYear1 = modelObj.newAcquisitionAssetsYear1;
        $scope.NewAcquisitionAssetsYear2 = modelObj.newAcquisitionAssetsYear2;
        $scope.NewAcquisitionAssetsYear3 = modelObj.newAcquisitionAssetsYear3;
        $scope.NewAcquisitionAssetsYear4 = modelObj.newAcquisitionAssetsYear4;
        $scope.NewAcquisitionAssetsYear5 = modelObj.newAcquisitionAssetsYear5;
        $scope.AssetGrowthRateYear0 = modelObj.assetGrowthRateYear0;
        $scope.AssetGrowthRateYear1 = modelObj.assetGrowthRateYear1;
        $scope.AssetGrowthRateYear2 = modelObj.assetGrowthRateYear2;
        $scope.AssetGrowthRateYear3 = modelObj.assetGrowthRateYear3;
        $scope.AssetGrowthRateYear4 = modelObj.assetGrowthRateYear4;
        $scope.AssetGrowthRateYear5 = modelObj.assetGrowthRateYear5;
        $scope.ReturnOnAverageAssetsYear0 = modelObj.returnOnAverageAssetsYear0;
        $scope.ReturnOnAverageAssetsYear1 = modelObj.returnOnAverageAssetsYear1;
        $scope.ReturnOnAverageAssetsYear2 = modelObj.returnOnAverageAssetsYear2;
        $scope.ReturnOnAverageAssetsYear3 = modelObj.returnOnAverageAssetsYear3;
        $scope.ReturnOnAverageAssetsYear4 = modelObj.returnOnAverageAssetsYear4;
        $scope.ReturnOnAverageAssetsYear5 = modelObj.returnOnAverageAssetsYear5;
        $scope.SharesOutstandingPriorYear = modelObj.sharesOutstandingActualPriorYear;
        $scope.SharesOutstandingCurrentQuarter = modelObj.sharesOutstandingActualCurrentQuarter;
        $scope.SharesOutstandingYear0 = modelObj.sharesOutstandingActualYear0;
        $scope.SharesOutstandingYear1 = modelObj.sharesOutstandingActualYear1;
        $scope.SharesOutstandingYear2 = modelObj.sharesOutstandingActualYear2;
        $scope.SharesOutstandingYear3 = modelObj.sharesOutstandingActualYear3;
        $scope.SharesOutstandingYear4 = modelObj.sharesOutstandingActualYear4;
        $scope.SharesOutstandingYear5 = modelObj.sharesOutstandingActualYear5;
    }
    
    var getDashboardConcepts = function () {
        angular.element(document.querySelector('#existingScenarioLoader')).removeClass('hidden');
        var modelReq = {
            InstitutionKey: $rootScope.SelectedBank.institutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/StrategicForecastApi/GetDashboardConcepts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: modelReq
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                

                angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
                setPriorCurrentYearData(result.data);
            }
            else {
                //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get UBPR concepts. Please send an e-mail to admin@cb-resource.com.');
            angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
        });
    }

    var getModelDetails = function (modelKey, calculationCallBack) {
        angular.element(document.querySelector('#existingScenarioLoader')).removeClass('hidden');
        var modelReq = {
            ScenarioKey: modelKey,
            InstitutionKey: $rootScope.SelectedBank.institutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/StrategicForecastApi/GetModelDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            data: modelReq
        };

        $http(req).then(function (result) {
            if (result.data != null) {
                

                angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
                calculationCallBack(result.data);
            }
            else {
                //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to save risk ratings. Please send an e-mail to admin@cb-resource.com.');
            angular.element(document.querySelector('#existingScenarioLoader')).addClass('hidden');
        });
    }

    var initialize = function () {
        GetModelsForUser();
        getDashboardConcepts();
        getEffectiveYear();
    };
    
    var newCapital1 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1:
                    if (typeof $scope.SelectedScenario1.newCapitalYear0 === 'undefined' || $scope.SelectedScenario1.newCapitalYear0 === null)
                        $scope.SelectedScenario1.newCapitalYear0 = 0;

                    $scope.NewCapital1 = parseFloat($scope.SelectedScenario1.newCapitalYear0);
                    break;
                case 2:
                    if (typeof $scope.SelectedScenario1.newCapitalYear0 === 'undefined' || $scope.SelectedScenario1.newCapitalYear0 === null)
                        $scope.SelectedScenario1.newCapitalYear0 = 0;

                    if (typeof $scope.SelectedScenario1.newCapitalYear1 === 'undefined' || $scope.SelectedScenario1.newCapitalYear1 === null) {
                        $scope.SelectedScenario1.newCapitalYear1 = 0;
                    }

                    $scope.NewCapital1 = parseFloat($scope.SelectedScenario1.newCapitalYear0) + parseFloat($scope.SelectedScenario1.newCapitalYear1);
                    break;
                case 3:
                    if (typeof $scope.SelectedScenario1.newCapitalYear0 === 'undefined' || $scope.SelectedScenario1.newCapitalYear0 === null)
                        $scope.SelectedScenario1.newCapitalYear0 = 0;

                    if (typeof $scope.SelectedScenario1.newCapitalYear1 === 'undefined' || $scope.SelectedScenario1.newCapitalYear1 === null) {
                        $scope.SelectedScenario1.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario1.newCapitalYear2 === 'undefined' || $scope.SelectedScenario1.newCapitalYear2 === null) {
                        $scope.SelectedScenario1.newCapitalYear2 = 0;
                    }

                    $scope.NewCapital1 = parseFloat($scope.SelectedScenario1.newCapitalYear0) + parseFloat($scope.SelectedScenario1.newCapitalYear1) + parseFloat($scope.SelectedScenario1.newCapitalYear2);
                    break;
                case 4:
                    if (typeof $scope.SelectedScenario1.newCapitalYear0 === 'undefined' || $scope.SelectedScenario1.newCapitalYear0 === null)
                        $scope.SelectedScenario1.newCapitalYear0 = 0;

                    if (typeof $scope.SelectedScenario1.newCapitalYear1 === 'undefined' || $scope.SelectedScenario1.newCapitalYear1 === null) {
                        $scope.SelectedScenario1.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario1.newCapitalYear2 === 'undefined' || $scope.SelectedScenario1.newCapitalYear2 === null) {
                        $scope.SelectedScenario1.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario1.newCapitalYear3 === 'undefined' || $scope.SelectedScenario1.newCapitalYear3 === null) {
                        $scope.SelectedScenario1.newCapitalYear3 = 0;
                    }

                    $scope.NewCapital1 = parseFloat($scope.SelectedScenario1.newCapitalYear0) + parseFloat($scope.SelectedScenario1.newCapitalYear1) + parseFloat($scope.SelectedScenario1.newCapitalYear2) + parseFloat($scope.SelectedScenario1.newCapitalYear3);
                    break;
                case 5:
                    if (typeof $scope.SelectedScenario1.newCapitalYear0 === 'undefined' || $scope.SelectedScenario1.newCapitalYear0 === null)
                        $scope.SelectedScenario1.newCapitalYear0 = 0;

                    if (typeof $scope.SelectedScenario1.newCapitalYear1 === 'undefined' || $scope.SelectedScenario1.newCapitalYear1 === null) {
                        $scope.SelectedScenario1.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario1.newCapitalYear2 === 'undefined' || $scope.SelectedScenario1.newCapitalYear2 === null) {
                        $scope.SelectedScenario1.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario1.newCapitalYear3 === 'undefined' || $scope.SelectedScenario1.newCapitalYear3 === null) {
                        $scope.SelectedScenario1.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario1.newCapitalYear4 === 'undefined' || $scope.SelectedScenario1.newCapitalYear4 === null) {
                        $scope.SelectedScenario1.newCapitalYear4 = 0;
                    }

                    $scope.NewCapital1 = parseFloat($scope.SelectedScenario1.newCapitalYear0) + parseFloat($scope.SelectedScenario1.newCapitalYear1) + parseFloat($scope.SelectedScenario1.newCapitalYear2) + parseFloat($scope.SelectedScenario1.newCapitalYear3) + parseFloat($scope.SelectedScenario1.newCapitalYear4);

                    break;
                case 6:
                    if (typeof $scope.SelectedScenario1.newCapitalYear0 === 'undefined' || $scope.SelectedScenario1.newCapitalYear0 === null)
                        $scope.SelectedScenario1.newCapitalYear0 = 0;

                    if (typeof $scope.SelectedScenario1.newCapitalYear1 === 'undefined' || $scope.SelectedScenario1.newCapitalYear1 === null) {
                        $scope.SelectedScenario1.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario1.newCapitalYear2 === 'undefined' || $scope.SelectedScenario1.newCapitalYear2 === null) {
                        $scope.SelectedScenario1.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario1.newCapitalYear3 === 'undefined' || $scope.SelectedScenario1.newCapitalYear3 === null) {
                        $scope.SelectedScenario1.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario1.newCapitalYear4 === 'undefined' || $scope.SelectedScenario1.newCapitalYear4 === null) {
                        $scope.SelectedScenario1.newCapitalYear4 = 0;
                    }

                    if (typeof $scope.SelectedScenario1.newCapitalYear5 === 'undefined' || $scope.SelectedScenario1.newCapitalYear5 === null) {
                        $scope.SelectedScenario1.newCapitalYear5 = 0;
                    }

                    $scope.NewCapital1 = parseFloat($scope.SelectedScenario1.newCapitalYear0) + parseFloat($scope.SelectedScenario1.newCapitalYear1) + parseFloat($scope.SelectedScenario1.newCapitalYear2) + parseFloat($scope.SelectedScenario1.newCapitalYear3) + parseFloat($scope.SelectedScenario1.newCapitalYear4) + parseFloat($scope.SelectedScenario1.newCapitalYear5);
                    break;
                default:
                    $scope.NewCapital1 = null;
                    break;
            }
        }

    var newCapital2 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1:
                    if (typeof $scope.SelectedScenario2.newCapitalYear0 === 'undefined' || $scope.SelectedScenario2.newCapitalYear0 === null) {
                        $scope.SelectedScenario2.newCapitalYear0 = 0;
                    }

                    $scope.NewCapital2 = parseFloat($scope.SelectedScenario2.newCapitalYear0);
                    break;
                case 2:
                    if (typeof $scope.SelectedScenario2.newCapitalYear0 === 'undefined' || $scope.SelectedScenario2.newCapitalYear0 === null) {
                        $scope.SelectedScenario2.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear1 === 'undefined' || $scope.SelectedScenario2.newCapitalYear1 === null) {
                        $scope.SelectedScenario2.newCapitalYear1 = 0;
                    }

                    $scope.NewCapital2 = parseFloat($scope.SelectedScenario2.newCapitalYear0) + parseFloat($scope.SelectedScenario2.newCapitalYear1);
                    break;
                case 3:
                    if (typeof $scope.SelectedScenario2.newCapitalYear0 === 'undefined' || $scope.SelectedScenario2.newCapitalYear0 === null) {
                        $scope.SelectedScenario2.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear1 === 'undefined' || $scope.SelectedScenario2.newCapitalYear1 === null) {
                        $scope.SelectedScenario2.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear2 === 'undefined' || $scope.SelectedScenario2.newCapitalYear2 === null) {
                        $scope.SelectedScenario2.newCapitalYear2 = 0;
                    }

                    $scope.NewCapital2 = parseFloat($scope.SelectedScenario2.newCapitalYear0) + parseFloat($scope.SelectedScenario2.newCapitalYear1) + parseFloat($scope.SelectedScenario2.newCapitalYear2);
                    break;
                case 4:
                    if (typeof $scope.SelectedScenario2.newCapitalYear0 === 'undefined' || $scope.SelectedScenario2.newCapitalYear0 === null) {
                        $scope.SelectedScenario2.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear1 === 'undefined' || $scope.SelectedScenario2.newCapitalYear1 === null) {
                        $scope.SelectedScenario2.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear2 === 'undefined' || $scope.SelectedScenario2.newCapitalYear2 === null) {
                        $scope.SelectedScenario2.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear3 === 'undefined' || $scope.SelectedScenario2.newCapitalYear3 === null) {
                        $scope.SelectedScenario2.newCapitalYear3 = 0;
                    }

                    $scope.NewCapital2 = parseFloat($scope.SelectedScenario2.newCapitalYear0) + parseFloat($scope.SelectedScenario2.newCapitalYear1) + parseFloat($scope.SelectedScenario2.newCapitalYear2) + parseFloat($scope.SelectedScenario2.newCapitalYear3);
                    break;
                case 5:
                    if (typeof $scope.SelectedScenario2.newCapitalYear0 === 'undefined' || $scope.SelectedScenario2.newCapitalYear0 === null) {
                        $scope.SelectedScenario2.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear1 === 'undefined' || $scope.SelectedScenario2.newCapitalYear1 === null) {
                        $scope.SelectedScenario2.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear2 === 'undefined' || $scope.SelectedScenario2.newCapitalYear2 === null) {
                        $scope.SelectedScenario2.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear3 === 'undefined' || $scope.SelectedScenario2.newCapitalYear3 === null) {
                        $scope.SelectedScenario2.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear4 === 'undefined' || $scope.SelectedScenario2.newCapitalYear4 === null) {
                        $scope.SelectedScenario2.newCapitalYear4 = 0;
                    }

                    $scope.NewCapital2 = parseFloat($scope.SelectedScenario2.newCapitalYear0) + parseFloat($scope.SelectedScenario2.newCapitalYear1) + parseFloat($scope.SelectedScenario2.newCapitalYear2) + parseFloat($scope.SelectedScenario2.newCapitalYear3) + parseFloat($scope.SelectedScenario2.newCapitalYear4);
                    break;
                case 6:
                    if (typeof $scope.SelectedScenario2.newCapitalYear0 === 'undefined' || $scope.SelectedScenario2.newCapitalYear0 === null) {
                        $scope.SelectedScenario2.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear1 === 'undefined' || $scope.SelectedScenario2.newCapitalYear1 === null) {
                        $scope.SelectedScenario2.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear2 === 'undefined' || $scope.SelectedScenario2.newCapitalYear2 === null) {
                        $scope.SelectedScenario2.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear3 === 'undefined' || $scope.SelectedScenario2.newCapitalYear3 === null) {
                        $scope.SelectedScenario2.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear4 === 'undefined' || $scope.SelectedScenario2.newCapitalYear4 === null) {
                        $scope.SelectedScenario2.newCapitalYear4 = 0;
                    }

                    if (typeof $scope.SelectedScenario2.newCapitalYear5 === 'undefined' || $scope.SelectedScenario2.newCapitalYear5 === null) {
                        $scope.SelectedScenario2.newCapitalYear5 = 0;
                    }

                    $scope.NewCapital2 = parseFloat($scope.SelectedScenario2.newCapitalYear0) + parseFloat($scope.SelectedScenario2.newCapitalYear1) + parseFloat($scope.SelectedScenario2.newCapitalYear2) + parseFloat($scope.SelectedScenario2.newCapitalYear3) + parseFloat($scope.SelectedScenario2.newCapitalYear4) + parseFloat($scope.SelectedScenario2.newCapitalYear5);
                    break;
                default:
                    $scope.NewCapital2 = null;
                    break;
            }
        }

    var newCapital3 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1:
                    if (typeof $scope.SelectedScenario3.newCapitalYear0 === 'undefined' || $scope.SelectedScenario3.newCapitalYear0 === null) {
                        $scope.SelectedScenario3.newCapitalYear0 = 0;
                    }

                    $scope.NewCapital3 = parseFloat($scope.SelectedScenario3.newCapitalYear0);
                    break;
                case 2:
                    if (typeof $scope.SelectedScenario3.newCapitalYear0 === 'undefined' || $scope.SelectedScenario3.newCapitalYear0 === null) {
                        $scope.SelectedScenario3.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear1 === 'undefined' || $scope.SelectedScenario3.newCapitalYear1 === null) {
                        $scope.SelectedScenario3.newCapitalYear1 = 0;
                    }

                    $scope.NewCapital3 = parseFloat($scope.SelectedScenario3.newCapitalYear0) + parseFloat($scope.SelectedScenario3.newCapitalYear1);
                    break;
                case 3:
                    if (typeof $scope.SelectedScenario3.newCapitalYear0 === 'undefined' || $scope.SelectedScenario3.newCapitalYear0 === null) {
                        $scope.SelectedScenario3.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear1 === 'undefined' || $scope.SelectedScenario3.newCapitalYear1 === null) {
                        $scope.SelectedScenario3.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear2 === 'undefined' || $scope.SelectedScenario3.newCapitalYear2 === null) {
                        $scope.SelectedScenario3.newCapitalYear2 = 0;
                    }

                    $scope.NewCapital3 = parseFloat($scope.SelectedScenario3.newCapitalYear0) + parseFloat($scope.SelectedScenario3.newCapitalYear1) + parseFloat($scope.SelectedScenario3.newCapitalYear2);
                    break;
                case 4:
                    if (typeof $scope.SelectedScenario3.newCapitalYear0 === 'undefined' || $scope.SelectedScenario3.newCapitalYear0 === null) {
                        $scope.SelectedScenario3.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear1 === 'undefined' || $scope.SelectedScenario3.newCapitalYear1 === null) {
                        $scope.SelectedScenario3.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear2 === 'undefined' || $scope.SelectedScenario3.newCapitalYear2 === null) {
                        $scope.SelectedScenario3.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear3 === 'undefined' || $scope.SelectedScenario3.newCapitalYear3 === null) {
                        $scope.SelectedScenario3.newCapitalYear3 = 0;
                    }

                    $scope.NewCapital3 = parseFloat($scope.SelectedScenario3.newCapitalYear0) + parseFloat($scope.SelectedScenario3.newCapitalYear1) + parseFloat($scope.SelectedScenario3.newCapitalYear2) + parseFloat($scope.SelectedScenario3.newCapitalYear3);
                    break;
                case 5:
                    if (typeof $scope.SelectedScenario3.newCapitalYear0 === 'undefined' || $scope.SelectedScenario3.newCapitalYear0 === null) {
                        $scope.SelectedScenario3.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear1 === 'undefined' || $scope.SelectedScenario3.newCapitalYear1 === null) {
                        $scope.SelectedScenario3.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear2 === 'undefined' || $scope.SelectedScenario3.newCapitalYear2 === null) {
                        $scope.SelectedScenario3.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear3 === 'undefined' || $scope.SelectedScenario3.newCapitalYear3 === null) {
                        $scope.SelectedScenario3.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear4 === 'undefined' || $scope.SelectedScenario3.newCapitalYear4 === null) {
                        $scope.SelectedScenario3.newCapitalYear4 = 0;
                    }

                    $scope.NewCapital3 = parseFloat($scope.SelectedScenario3.newCapitalYear0) + parseFloat($scope.SelectedScenario3.newCapitalYear1) + parseFloat($scope.SelectedScenario3.newCapitalYear2) + parseFloat($scope.SelectedScenario3.newCapitalYear3) + parseFloat($scope.SelectedScenario3.newCapitalYear4);
                    break;
                case 6:
                    if (typeof $scope.SelectedScenario3.newCapitalYear0 === 'undefined' || $scope.SelectedScenario3.newCapitalYear0 === null) {
                        $scope.SelectedScenario3.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear1 === 'undefined' || $scope.SelectedScenario3.newCapitalYear1 === null) {
                        $scope.SelectedScenario3.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear2 === 'undefined' || $scope.SelectedScenario3.newCapitalYear2 === null) {
                        $scope.SelectedScenario3.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear3 === 'undefined' || $scope.SelectedScenario3.newCapitalYear3 === null) {
                        $scope.SelectedScenario3.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear4 === 'undefined' || $scope.SelectedScenario3.newCapitalYear4 === null) {
                        $scope.SelectedScenario3.newCapitalYear4 = 0;
                    }

                    if (typeof $scope.SelectedScenario3.newCapitalYear5 === 'undefined' || $scope.SelectedScenario3.newCapitalYear5 === null) {
                        $scope.SelectedScenario3.newCapitalYear5 = 0;
                    }

                    $scope.NewCapital3 = parseFloat($scope.SelectedScenario3.newCapitalYear0) + parseFloat($scope.SelectedScenario3.newCapitalYear1) + parseFloat($scope.SelectedScenario3.newCapitalYear2) + parseFloat($scope.SelectedScenario3.newCapitalYear3) + parseFloat($scope.SelectedScenario3.newCapitalYear4) + parseFloat($scope.SelectedScenario3.newCapitalYear5);
                    break;
                default:
                    $scope.NewCapital3 = null;
                    break;
            }
        }

    var newCapital4 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1:
                    if (typeof $scope.SelectedScenario4.newCapitalYear0 === 'undefined' || $scope.SelectedScenario4.newCapitalYear0 === null) {
                        $scope.SelectedScenario4.newCapitalYear0 = 0;
                    }

                    $scope.NewCapital4 = parseFloat($scope.SelectedScenario4.newCapitalYear0);
                    break;
                case 2:
                    if (typeof $scope.SelectedScenario4.newCapitalYear0 === 'undefined' || $scope.SelectedScenario4.newCapitalYear0 === null) {
                        $scope.SelectedScenario4.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear1 === 'undefined' || $scope.SelectedScenario4.newCapitalYear1 === null) {
                        $scope.SelectedScenario4.newCapitalYear1 = 0;
                    }

                    $scope.NewCapital4 = parseFloat($scope.SelectedScenario4.newCapitalYear0) + parseFloat($scope.SelectedScenario4.newCapitalYear1);
                    break;
                case 3:
                    if (typeof $scope.SelectedScenario4.newCapitalYear0 === 'undefined' || $scope.SelectedScenario4.newCapitalYear0 === null) {
                        $scope.SelectedScenario4.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear1 === 'undefined' || $scope.SelectedScenario4.newCapitalYear1 === null) {
                        $scope.SelectedScenario4.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear2 === 'undefined' || $scope.SelectedScenario4.newCapitalYear2 === null) {
                        $scope.SelectedScenario4.newCapitalYear2 = 0;
                    }

                    $scope.NewCapital4 = parseFloat($scope.SelectedScenario4.newCapitalYear0) + parseFloat($scope.SelectedScenario4.newCapitalYear1) + parseFloat($scope.SelectedScenario4.newCapitalYear2);
                    break;
                case 4:
                    if (typeof $scope.SelectedScenario4.newCapitalYear0 === 'undefined' || $scope.SelectedScenario4.newCapitalYear0 === null) {
                        $scope.SelectedScenario4.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear1 === 'undefined' || $scope.SelectedScenario4.newCapitalYear1 === null) {
                        $scope.SelectedScenario4.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear2 === 'undefined' || $scope.SelectedScenario4.newCapitalYear2 === null) {
                        $scope.SelectedScenario4.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear3 === 'undefined' || $scope.SelectedScenario4.newCapitalYear3 === null) {
                        $scope.SelectedScenario4.newCapitalYear3 = 0;
                    }

                    $scope.NewCapital4 = parseFloat($scope.SelectedScenario4.newCapitalYear0) + parseFloat($scope.SelectedScenario4.newCapitalYear1) + parseFloat($scope.SelectedScenario4.newCapitalYear2) + parseFloat($scope.SelectedScenario4.newCapitalYear3);
                    break;
                case 5:
                    if (typeof $scope.SelectedScenario4.newCapitalYear0 === 'undefined' || $scope.SelectedScenario4.newCapitalYear0 === null) {
                        $scope.SelectedScenario4.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear1 === 'undefined' || $scope.SelectedScenario4.newCapitalYear1 === null) {
                        $scope.SelectedScenario4.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear2 === 'undefined' || $scope.SelectedScenario4.newCapitalYear2 === null) {
                        $scope.SelectedScenario4.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear3 === 'undefined' || $scope.SelectedScenario4.newCapitalYear3 === null) {
                        $scope.SelectedScenario4.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear4 === 'undefined' || $scope.SelectedScenario4.newCapitalYear4 === null) {
                        $scope.SelectedScenario4.newCapitalYear4 = 0;
                    }

                    $scope.NewCapital4 = parseFloat($scope.SelectedScenario4.newCapitalYear0) + parseFloat($scope.SelectedScenario4.newCapitalYear1) + parseFloat($scope.SelectedScenario4.newCapitalYear2) + parseFloat($scope.SelectedScenario4.newCapitalYear3) + parseFloat($scope.SelectedScenario4.newCapitalYear4);
                    break;
                case 6:
                    if (typeof $scope.SelectedScenario4.newCapitalYear0 === 'undefined' || $scope.SelectedScenario4.newCapitalYear0 === null) {
                        $scope.SelectedScenario4.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear1 === 'undefined' || $scope.SelectedScenario4.newCapitalYear1 === null) {
                        $scope.SelectedScenario4.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear2 === 'undefined' || $scope.SelectedScenario4.newCapitalYear2 === null) {
                        $scope.SelectedScenario4.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear3 === 'undefined' || $scope.SelectedScenario4.newCapitalYear3 === null) {
                        $scope.SelectedScenario4.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear4 === 'undefined' || $scope.SelectedScenario4.newCapitalYear4 === null) {
                        $scope.SelectedScenario4.newCapitalYear4 = 0;
                    }

                    if (typeof $scope.SelectedScenario4.newCapitalYear5 === 'undefined' || $scope.SelectedScenario4.newCapitalYear5 === null) {
                        $scope.SelectedScenario4.newCapitalYear5 = 0;
                    }

                    $scope.NewCapital4 = parseFloat($scope.SelectedScenario4.newCapitalYear0) + parseFloat($scope.SelectedScenario4.newCapitalYear1) + parseFloat($scope.SelectedScenario4.newCapitalYear2) + parseFloat($scope.SelectedScenario4.newCapitalYear3) + parseFloat($scope.SelectedScenario4.newCapitalYear4) + parseFloat($scope.SelectedScenario4.newCapitalYear5);
                    break;
                default:
                    $scope.NewCapital4 = null;
                    break;
            }
        }

    var newCapital5 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1:
                    if (typeof $scope.SelectedScenario5.newCapitalYear0 === 'undefined' || $scope.SelectedScenario5.newCapitalYear0 === null) {
                        $scope.SelectedScenario5.newCapitalYear0 = 0;
                    }

                    $scope.NewCapital5 = parseFloat($scope.SelectedScenario5.newCapitalYear0);
                    break;
                case 2:
                    if (typeof $scope.SelectedScenario5.newCapitalYear0 === 'undefined' || $scope.SelectedScenario5.newCapitalYear0 === null) {
                        $scope.SelectedScenario5.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear1 === 'undefined' || $scope.SelectedScenario5.newCapitalYear1 === null) {
                        $scope.SelectedScenario5.newCapitalYear1 = 0;
                    }

                    $scope.NewCapital5 = parseFloat($scope.SelectedScenario5.newCapitalYear0) + parseFloat($scope.SelectedScenario5.newCapitalYear1);
                    break;
                case 3:
                    if (typeof $scope.SelectedScenario5.newCapitalYear0 === 'undefined' || $scope.SelectedScenario5.newCapitalYear0 === null) {
                        $scope.SelectedScenario5.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear1 === 'undefined' || $scope.SelectedScenario5.newCapitalYear1 === null) {
                        $scope.SelectedScenario5.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear2 === 'undefined' || $scope.SelectedScenario5.newCapitalYear2 === null) {
                        $scope.SelectedScenario5.newCapitalYear2 = 0;
                    }

                    $scope.NewCapital5 = parseFloat($scope.SelectedScenario5.newCapitalYear0) + parseFloat($scope.SelectedScenario5.newCapitalYear1) + parseFloat($scope.SelectedScenario5.newCapitalYear2);
                    break;
                case 4:
                    if (typeof $scope.SelectedScenario5.newCapitalYear0 === 'undefined' || $scope.SelectedScenario5.newCapitalYear0 === null) {
                        $scope.SelectedScenario5.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear1 === 'undefined' || $scope.SelectedScenario5.newCapitalYear1 === null) {
                        $scope.SelectedScenario5.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear2 === 'undefined' || $scope.SelectedScenario5.newCapitalYear2 === null) {
                        $scope.SelectedScenario5.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear3 === 'undefined' || $scope.SelectedScenario5.newCapitalYear3 === null) {
                        $scope.SelectedScenario5.newCapitalYear3 = 0;
                    }

                    $scope.NewCapital5 = parseFloat($scope.SelectedScenario5.newCapitalYear0) + parseFloat($scope.SelectedScenario5.newCapitalYear1) + parseFloat($scope.SelectedScenario5.newCapitalYear2) + parseFloat($scope.SelectedScenario5.newCapitalYear3);
                    break;
                case 5:
                    if (typeof $scope.SelectedScenario5.newCapitalYear0 === 'undefined' || $scope.SelectedScenario5.newCapitalYear0 === null) {
                        $scope.SelectedScenario5.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear1 === 'undefined' || $scope.SelectedScenario5.newCapitalYear1 === null) {
                        $scope.SelectedScenario5.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear2 === 'undefined' || $scope.SelectedScenario5.newCapitalYear2 === null) {
                        $scope.SelectedScenario5.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear3 === 'undefined' || $scope.SelectedScenario5.newCapitalYear3 === null) {
                        $scope.SelectedScenario5.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear4 === 'undefined' || $scope.SelectedScenario5.newCapitalYear4 === null) {
                        $scope.SelectedScenario5.newCapitalYear4 = 0;
                    }

                    $scope.NewCapital5 = parseFloat($scope.SelectedScenario5.newCapitalYear0) + parseFloat($scope.SelectedScenario5.newCapitalYear1) + parseFloat($scope.SelectedScenario5.newCapitalYear2) + parseFloat($scope.SelectedScenario5.newCapitalYear3) + parseFloat($scope.SelectedScenario5.newCapitalYear4);
                    break;
                case 6:
                    if (typeof $scope.SelectedScenario5.newCapitalYear0 === 'undefined' || $scope.SelectedScenario5.newCapitalYear0 === null) {
                        $scope.SelectedScenario5.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear1 === 'undefined' || $scope.SelectedScenario5.newCapitalYear1 === null) {
                        $scope.SelectedScenario5.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear2 === 'undefined' || $scope.SelectedScenario5.newCapitalYear2 === null) {
                        $scope.SelectedScenario5.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear3 === 'undefined' || $scope.SelectedScenario5.newCapitalYear3 === null) {
                        $scope.SelectedScenario5.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear4 === 'undefined' || $scope.SelectedScenario5.newCapitalYear4 === null) {
                        $scope.SelectedScenario5.newCapitalYear4 = 0;
                    }

                    if (typeof $scope.SelectedScenario5.newCapitalYear5 === 'undefined' || $scope.SelectedScenario5.newCapitalYear5 === null) {
                        $scope.SelectedScenario5.newCapitalYear5 = 0;
                    }

                    $scope.NewCapital5 = parseFloat($scope.SelectedScenario5.newCapitalYear0) + parseFloat($scope.SelectedScenario5.newCapitalYear1) + parseFloat($scope.SelectedScenario5.newCapitalYear2) + parseFloat($scope.SelectedScenario5.newCapitalYear3) + parseFloat($scope.SelectedScenario5.newCapitalYear4) + parseFloat($scope.SelectedScenario5.newCapitalYear5);
                    break;
                default: 
                    $scope.NewCapital5 = 0;
                    break;
            }
        }

    var newCapital6 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1:
                    if (typeof $scope.SelectedScenario6.newCapitalYear0 === 'undefined' || $scope.SelectedScenario6.newCapitalYear0 === null) {
                        $scope.SelectedScenario6.newCapitalYear0 = 0;
                    }

                    $scope.NewCapital6 = parseFloat($scope.SelectedScenario6.newCapitalYear0);
                    break;
                case 2:
                    if (typeof $scope.SelectedScenario6.newCapitalYear0 === 'undefined' || $scope.SelectedScenario6.newCapitalYear0 === null) {
                        $scope.SelectedScenario6.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear1 === 'undefined' || $scope.SelectedScenario6.newCapitalYear1 === null) {
                        $scope.SelectedScenario6.newCapitalYear1 = 0;
                    }

                    $scope.NewCapital6 = parseFloat($scope.SelectedScenario6.newCapitalYear0) + parseFloat($scope.SelectedScenario6.newCapitalYear1);
                    break;
                case 3:
                    if (typeof $scope.SelectedScenario6.newCapitalYear0 === 'undefined' || $scope.SelectedScenario6.newCapitalYear0 === null) {
                        $scope.SelectedScenario6.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear1 === 'undefined' || $scope.SelectedScenario6.newCapitalYear1 === null) {
                        $scope.SelectedScenario6.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear2 === 'undefined' || $scope.SelectedScenario6.newCapitalYear2 === null) {
                        $scope.SelectedScenario6.newCapitalYear2 = 0;
                    }

                    $scope.NewCapital6 = parseFloat($scope.SelectedScenario6.newCapitalYear0) + parseFloat($scope.SelectedScenario6.newCapitalYear1) + parseFloat($scope.SelectedScenario6.newCapitalYear2);
                    break;
                case 4:
                    if (typeof $scope.SelectedScenario6.newCapitalYear0 === 'undefined' || $scope.SelectedScenario6.newCapitalYear0 === null) {
                        $scope.SelectedScenario6.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear1 === 'undefined' || $scope.SelectedScenario6.newCapitalYear1 === null) {
                        $scope.SelectedScenario6.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear2 === 'undefined' || $scope.SelectedScenario6.newCapitalYear2 === null) {
                        $scope.SelectedScenario6.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear3 === 'undefined' || $scope.SelectedScenario6.newCapitalYear3 === null) {
                        $scope.SelectedScenario6.newCapitalYear3 = 0;
                    }

                    $scope.NewCapital6 = parseFloat($scope.SelectedScenario6.newCapitalYear0) + parseFloat($scope.SelectedScenario6.newCapitalYear1) + parseFloat($scope.SelectedScenario6.newCapitalYear2) + parseFloat($scope.SelectedScenario6.newCapitalYear3);
                    break;
                case 5:
                    if (typeof $scope.SelectedScenario6.newCapitalYear0 === 'undefined' || $scope.SelectedScenario6.newCapitalYear0 === null) {
                        $scope.SelectedScenario6.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear1 === 'undefined' || $scope.SelectedScenario6.newCapitalYear1 === null) {
                        $scope.SelectedScenario6.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear2 === 'undefined' || $scope.SelectedScenario6.newCapitalYear2 === null) {
                        $scope.SelectedScenario6.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear3 === 'undefined' || $scope.SelectedScenario6.newCapitalYear3 === null) {
                        $scope.SelectedScenario6.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear4 === 'undefined' || $scope.SelectedScenario6.newCapitalYear4 === null) {
                        $scope.SelectedScenario6.newCapitalYear4 = 0;
                    }

                    $scope.NewCapital6 = parseFloat($scope.SelectedScenario6.newCapitalYear0) + parseFloat($scope.SelectedScenario6.newCapitalYear1) + parseFloat($scope.SelectedScenario6.newCapitalYear2) + parseFloat($scope.SelectedScenario6.newCapitalYear3) + parseFloat($scope.SelectedScenario6.newCapitalYear4);
                    break;
                case 6:
                    if (typeof $scope.SelectedScenario6.newCapitalYear0 === 'undefined' || $scope.SelectedScenario6.newCapitalYear0 === null) {
                        $scope.SelectedScenario6.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear1 === 'undefined' || $scope.SelectedScenario6.newCapitalYear1 === null) {
                        $scope.SelectedScenario6.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear2 === 'undefined' || $scope.SelectedScenario6.newCapitalYear2 === null) {
                        $scope.SelectedScenario6.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear3 === 'undefined' || $scope.SelectedScenario6.newCapitalYear3 === null) {
                        $scope.SelectedScenario6.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear4 === 'undefined' || $scope.SelectedScenario6.newCapitalYear4 === null) {
                        $scope.SelectedScenario6.newCapitalYear4 = 0;
                    }

                    if (typeof $scope.SelectedScenario6.newCapitalYear5 === 'undefined' || $scope.SelectedScenario6.newCapitalYear5 === null) {
                        $scope.SelectedScenario6.newCapitalYear5 = 0;
                    }

                    $scope.NewCapital6 = parseFloat($scope.SelectedScenario6.newCapitalYear0) + parseFloat($scope.SelectedScenario6.newCapitalYear1) + parseFloat($scope.SelectedScenario6.newCapitalYear2) + parseFloat($scope.SelectedScenario6.newCapitalYear3) + parseFloat($scope.SelectedScenario6.newCapitalYear4) + parseFloat($scope.SelectedScenario6.newCapitalYear5);
                    break;
                default: 
                    $scope.NewCapital6 = null;
                    break;
            }
        }

    var newCapital7 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1:
                    if (typeof $scope.SelectedScenario7.newCapitalYear0 === 'undefined' || $scope.SelectedScenario7.newCapitalYear0 === null) {
                        $scope.SelectedScenario7.newCapitalYear0 = 0;
                    }

                    $scope.NewCapital7 = parseFloat($scope.SelectedScenario7.newCapitalYear0);
                    break;
                case 2:
                    if (typeof $scope.SelectedScenario7.newCapitalYear0 === 'undefined' || $scope.SelectedScenario7.newCapitalYear0 === null) {
                        $scope.SelectedScenario7.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear1 === 'undefined' || $scope.SelectedScenario7.newCapitalYear1 === null) {
                        $scope.SelectedScenario7.newCapitalYear1 = 0;
                    }

                    $scope.NewCapital7 = parseFloat($scope.SelectedScenario7.newCapitalYear0) + parseFloat($scope.SelectedScenario7.newCapitalYear1);
                    break;
                case 3: 
                    if (typeof $scope.SelectedScenario7.newCapitalYear0 === 'undefined' || $scope.SelectedScenario7.newCapitalYear0 === null) {
                        $scope.SelectedScenario7.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear1 === 'undefined' || $scope.SelectedScenario7.newCapitalYear1 === null) {
                        $scope.SelectedScenario7.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear2 === 'undefined' || $scope.SelectedScenario7.newCapitalYear2 === null) {
                        $scope.SelectedScenario7.newCapitalYear2 = 0;
                    }

                    $scope.NewCapital7 = parseFloat($scope.SelectedScenario7.newCapitalYear0) + parseFloat($scope.SelectedScenario7.newCapitalYear1) + parseFloat($scope.SelectedScenario7.newCapitalYear2);
                    break;
                case 4:
                    if (typeof $scope.SelectedScenario7.newCapitalYear0 === 'undefined' || $scope.SelectedScenario7.newCapitalYear0 === null) {
                        $scope.SelectedScenario7.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear1 === 'undefined' || $scope.SelectedScenario7.newCapitalYear1 === null) {
                        $scope.SelectedScenario7.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear2 === 'undefined' || $scope.SelectedScenario7.newCapitalYear2 === null) {
                        $scope.SelectedScenario7.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear3 === 'undefined' || $scope.SelectedScenario7.newCapitalYear3 === null) {
                        $scope.SelectedScenario7.newCapitalYear3 = 0;
                    }

                    $scope.NewCapital7 = parseFloat($scope.SelectedScenario7.newCapitalYear0) + parseFloat($scope.SelectedScenario7.newCapitalYear1) + parseFloat($scope.SelectedScenario7.newCapitalYear2) + parseFloat($scope.SelectedScenario7.newCapitalYear3);
                    break;
                case 5:
                    if (typeof $scope.SelectedScenario7.newCapitalYear0 === 'undefined' || $scope.SelectedScenario7.newCapitalYear0 === null) {
                        $scope.SelectedScenario7.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear1 === 'undefined' || $scope.SelectedScenario7.newCapitalYear1 === null) {
                        $scope.SelectedScenario7.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear2 === 'undefined' || $scope.SelectedScenario7.newCapitalYear2 === null) {
                        $scope.SelectedScenario7.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear3 === 'undefined' || $scope.SelectedScenario7.newCapitalYear3 === null) {
                        $scope.SelectedScenario7.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear4 === 'undefined' || $scope.SelectedScenario7.newCapitalYear4 === null) {
                        $scope.SelectedScenario7.newCapitalYear4 = 0;
                    }

                    $scope.NewCapital7 = parseFloat($scope.SelectedScenario7.newCapitalYear0) + parseFloat($scope.SelectedScenario7.newCapitalYear1) + parseFloat($scope.SelectedScenario7.newCapitalYear2) + parseFloat($scope.SelectedScenario7.newCapitalYear3) + parseFloat($scope.SelectedScenario7.newCapitalYear4);
                    break;
                case 6:
                    if (typeof $scope.SelectedScenario7.newCapitalYear0 === 'undefined' || $scope.SelectedScenario7.newCapitalYear0 === null) {
                        $scope.SelectedScenario7.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear1 === 'undefined' || $scope.SelectedScenario7.newCapitalYear1 === null) {
                        $scope.SelectedScenario7.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear2 === 'undefined' || $scope.SelectedScenario7.newCapitalYear2 === null) {
                        $scope.SelectedScenario7.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear3 === 'undefined' || $scope.SelectedScenario7.newCapitalYear3 === null) {
                        $scope.SelectedScenario7.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear4 === 'undefined' || $scope.SelectedScenario7.newCapitalYear4 === null) {
                        $scope.SelectedScenario7.newCapitalYear4 = 0;
                    }

                    if (typeof $scope.SelectedScenario7.newCapitalYear5 === 'undefined' || $scope.SelectedScenario7.newCapitalYear5 === null) {
                        $scope.SelectedScenario7.newCapitalYear5 = 0;
                    }

                    $scope.NewCapital7 = parseFloat($scope.SelectedScenario7.newCapitalYear0) + parseFloat($scope.SelectedScenario7.newCapitalYear1) + parseFloat($scope.SelectedScenario7.newCapitalYear2) + parseFloat($scope.SelectedScenario7.newCapitalYear3) + parseFloat($scope.SelectedScenario7.newCapitalYear4) + parseFloat($scope.SelectedScenario7.newCapitalYear5);
                    break;
                default:
                    $scope.NewCapital7 = null;
                    break;
            }
        }

    var newCapital8 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1:
                    if (typeof $scope.SelectedScenario8.newCapitalYear0 === 'undefined' || $scope.SelectedScenario8.newCapitalYear0 === null) {
                        $scope.SelectedScenario8.newCapitalYear0 = 0;
                    }

                    $scope.NewCapital8 = parseFloat($scope.SelectedScenario8.newCapitalYear0);
                    break;
                case 2:
                    if (typeof $scope.SelectedScenario8.newCapitalYear0 === 'undefined' || $scope.SelectedScenario8.newCapitalYear0 === null) {
                        $scope.SelectedScenario8.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear1 === 'undefined' || $scope.SelectedScenario8.newCapitalYear1 === null) {
                        $scope.SelectedScenario8.newCapitalYear1 = 0;
                    }

                    $scope.NewCapital8 = parseFloat($scope.SelectedScenario8.newCapitalYear0) + parseFloat($scope.SelectedScenario8.newCapitalYear1);
                    break;
                case 3:
                    if (typeof $scope.SelectedScenario8.newCapitalYear0 === 'undefined' || $scope.SelectedScenario8.newCapitalYear0 === null) {
                        $scope.SelectedScenario8.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear1 === 'undefined' || $scope.SelectedScenario8.newCapitalYear1 === null) {
                        $scope.SelectedScenario8.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear2 === 'undefined' || $scope.SelectedScenario8.newCapitalYear2 === null) {
                        $scope.SelectedScenario8.newCapitalYear2 = 0;
                    }

                    $scope.NewCapital8 = parseFloat($scope.SelectedScenario8.newCapitalYear0) + parseFloat($scope.SelectedScenario8.newCapitalYear1) + parseFloat($scope.SelectedScenario8.newCapitalYear2);
                    break;
                case 4:
                    if (typeof $scope.SelectedScenario8.newCapitalYear0 === 'undefined' || $scope.SelectedScenario8.newCapitalYear0 === null) {
                        $scope.SelectedScenario8.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear1 === 'undefined' || $scope.SelectedScenario8.newCapitalYear1 === null) {
                        $scope.SelectedScenario8.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear2 === 'undefined' || $scope.SelectedScenario8.newCapitalYear2 === null) {
                        $scope.SelectedScenario8.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear3 === 'undefined' || $scope.SelectedScenario8.newCapitalYear3 === null) {
                        $scope.SelectedScenario8.newCapitalYear3 = 0;
                    }

                    $scope.NewCapital8 = parseFloat($scope.SelectedScenario8.newCapitalYear0) + parseFloat($scope.SelectedScenario8.newCapitalYear1) + parseFloat($scope.SelectedScenario8.newCapitalYear2) + parseFloat($scope.SelectedScenario8.newCapitalYear3);
                    break;
                case 5:
                    if (typeof $scope.SelectedScenario8.newCapitalYear0 === 'undefined' || $scope.SelectedScenario8.newCapitalYear0 === null) {
                        $scope.SelectedScenario8.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear1 === 'undefined' || $scope.SelectedScenario8.newCapitalYear1 === null) {
                        $scope.SelectedScenario8.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear2 === 'undefined' || $scope.SelectedScenario8.newCapitalYear2 === null) {
                        $scope.SelectedScenario8.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear3 === 'undefined' || $scope.SelectedScenario8.newCapitalYear3 === null) {
                        $scope.SelectedScenario8.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear4 === 'undefined' || $scope.SelectedScenario8.newCapitalYear4 === null) {
                        $scope.SelectedScenario8.newCapitalYear3 = 0;
                    }

                    $scope.NewCapital8 = parseFloat($scope.SelectedScenario8.newCapitalYear0) + parseFloat($scope.SelectedScenario8.newCapitalYear1) + parseFloat($scope.SelectedScenario8.newCapitalYear2) + parseFloat($scope.SelectedScenario8.newCapitalYear3) + parseFloat($scope.SelectedScenario8.newCapitalYear4);
                    break;
                case 6:
                    if (typeof $scope.SelectedScenario8.newCapitalYear0 === 'undefined' || $scope.SelectedScenario8.newCapitalYear0 === null) {
                        $scope.SelectedScenario8.newCapitalYear0 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear1 === 'undefined' || $scope.SelectedScenario8.newCapitalYear1 === null) {
                        $scope.SelectedScenario8.newCapitalYear1 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear2 === 'undefined' || $scope.SelectedScenario8.newCapitalYear2 === null) {
                        $scope.SelectedScenario8.newCapitalYear2 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear3 === 'undefined' || $scope.SelectedScenario8.newCapitalYear3 === null) {
                        $scope.SelectedScenario8.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear4 === 'undefined' || $scope.SelectedScenario8.newCapitalYear4 === null) {
                        $scope.SelectedScenario8.newCapitalYear3 = 0;
                    }

                    if (typeof $scope.SelectedScenario8.newCapitalYear5 === 'undefined' || $scope.SelectedScenario8.newCapitalYear5 === null) {
                        $scope.SelectedScenario8.newCapitalYear5 = 0;
                    }

                    $scope.NewCapital8 = parseFloat($scope.SelectedScenario8.newCapitalYear0) + parseFloat($scope.SelectedScenario8.newCapitalYear1) + parseFloat($scope.SelectedScenario8.newCapitalYear2) + parseFloat($scope.SelectedScenario8.newCapitalYear3) + parseFloat($scope.SelectedScenario8.newCapitalYear4) + parseFloat($scope.SelectedScenario8.newCapitalYear5);
                    break;
                default:
                    $scope.NewCapital8 = null;
                    break;
            }
    }

    var countPricePerShareValue1 = function(horizon)
    {
        var count = 0;
        switch (parseInt(horizon)) {
            case 1:
                if (typeof $scope.SelectedScenario1.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear0 !== null && $scope.SelectedScenario1.pricePerShareYear0 > 0) {
                    count++;
                }

                break;
            case 2:
                if (typeof $scope.SelectedScenario1.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear0 !== null && $scope.SelectedScenario1.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear1 !== null && $scope.SelectedScenario1.pricePerShareYear1 > 0) {
                    count++;
                }

                break;
            case 3:
                if (typeof $scope.SelectedScenario1.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear0 !== null && $scope.SelectedScenario1.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear1 !== null && $scope.SelectedScenario1.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear2 !== null && $scope.SelectedScenario1.pricePerShareYear2 > 0) {
                    count++;
                }

                break;
            case 4:
                if (typeof $scope.SelectedScenario1.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear0 !== null && $scope.SelectedScenario1.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear1 !== null && $scope.SelectedScenario1.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear2 !== null && $scope.SelectedScenario1.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear3 !== null && $scope.SelectedScenario1.pricePerShareYear3 > 0) {
                    count++;
                }

                break;
            case 5:
                if (typeof $scope.SelectedScenario1.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear0 !== null && $scope.SelectedScenario1.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear1 !== null && $scope.SelectedScenario1.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear2 !== null && $scope.SelectedScenario1.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear3 !== null && $scope.SelectedScenario1.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear4 !== null && $scope.SelectedScenario1.pricePerShareYear4 > 0) {
                    count++;
                }

                break;
            case 6:
                if (typeof $scope.SelectedScenario1.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear0 !== null && $scope.SelectedScenario1.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear1 !== null && $scope.SelectedScenario1.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear2 !== null && $scope.SelectedScenario1.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear3 !== null && $scope.SelectedScenario1.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear4 !== null && $scope.SelectedScenario1.pricePerShareYear4 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario1.pricePerShareYear5 !== 'undefined' && $scope.SelectedScenario1.pricePerShareYear5 !== null && $scope.SelectedScenario1.pricePerShareYear5 > 0) {
                    count++;
                }

                break;
        }

        return count;
    }

    var countPricePerShareValue2 = function (horizon) {
        var count = 0;
        switch (parseInt(horizon)) {
            case 1:
                if (typeof $scope.SelectedScenario2.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear0 !== null && $scope.SelectedScenario2.pricePerShareYear0 > 0) {
                    count++;
                }

                break;
            case 2:
                if (typeof $scope.SelectedScenario2.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear0 !== null && $scope.SelectedScenario2.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear1 !== null && $scope.SelectedScenario2.pricePerShareYear1 > 0) {
                    count++;
                }

                break;
            case 3:
                if (typeof $scope.SelectedScenario2.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear0 !== null && $scope.SelectedScenario2.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear1 !== null && $scope.SelectedScenario2.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear2 !== null && $scope.SelectedScenario2.pricePerShareYear2 > 0) {
                    count++;
                }

                break;
            case 4:
                if (typeof $scope.SelectedScenario2.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear0 !== null && $scope.SelectedScenario2.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear1 !== null && $scope.SelectedScenario2.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear2 !== null && $scope.SelectedScenario2.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear3 !== null && $scope.SelectedScenario2.pricePerShareYear3 > 0) {
                    count++;
                }

                break;
            case 5:
                if (typeof $scope.SelectedScenario2.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear0 !== null && $scope.SelectedScenario2.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear1 !== null && $scope.SelectedScenario2.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear2 !== null && $scope.SelectedScenario2.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear3 !== null && $scope.SelectedScenario2.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear4 !== null && $scope.SelectedScenario2.pricePerShareYear4 > 0) {
                    count++;
                }

                break;
            case 6:
                if (typeof $scope.SelectedScenario2.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear0 !== null && $scope.SelectedScenario2.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear1 !== null && $scope.SelectedScenario2.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear2 !== null && $scope.SelectedScenario2.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear3 !== null && $scope.SelectedScenario2.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear4 !== null && $scope.SelectedScenario2.pricePerShareYear4 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario2.pricePerShareYear5 !== 'undefined' && $scope.SelectedScenario2.pricePerShareYear5 !== null && $scope.SelectedScenario2.pricePerShareYear5 > 0) {
                    count++;
                }

                break;
        }

        return count;
    }

    var countPricePerShareValue3 = function (horizon) {
        var count = 0;
        switch (parseInt(horizon)) {
            case 1:
                if (typeof $scope.SelectedScenario3.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear0 !== null && $scope.SelectedScenario3.pricePerShareYear0 > 0) {
                    count++;
                }

                break;
            case 2:
                if (typeof $scope.SelectedScenario3.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear0 !== null && $scope.SelectedScenario3.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear1 !== null && $scope.SelectedScenario3.pricePerShareYear1 > 0) {
                    count++;
                }

                break;
            case 3:
                if (typeof $scope.SelectedScenario3.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear0 !== null && $scope.SelectedScenario3.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear1 !== null && $scope.SelectedScenario3.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear2 !== null && $scope.SelectedScenario3.pricePerShareYear2 > 0) {
                    count++;
                }

                break;
            case 4:
                if (typeof $scope.SelectedScenario3.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear0 !== null && $scope.SelectedScenario3.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear1 !== null && $scope.SelectedScenario3.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear2 !== null && $scope.SelectedScenario3.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear3 !== null && $scope.SelectedScenario3.pricePerShareYear3 > 0) {
                    count++;
                }

                break;
            case 5:
                if (typeof $scope.SelectedScenario3.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear0 !== null && $scope.SelectedScenario3.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear1 !== null && $scope.SelectedScenario3.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear2 !== null && $scope.SelectedScenario3.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear3 !== null && $scope.SelectedScenario3.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear4 !== null && $scope.SelectedScenario3.pricePerShareYear4 > 0) {
                    count++;
                }

                break;
            case 6:
                if (typeof $scope.SelectedScenario3.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear0 !== null && $scope.SelectedScenario3.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear1 !== null && $scope.SelectedScenario3.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear2 !== null && $scope.SelectedScenario3.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear3 !== null && $scope.SelectedScenario3.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear4 !== null && $scope.SelectedScenario3.pricePerShareYear4 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario3.pricePerShareYear5 !== 'undefined' && $scope.SelectedScenario3.pricePerShareYear5 !== null && $scope.SelectedScenario3.pricePerShareYear5 > 0) {
                    count++;
                }

                break;
        }

        return count;
    }

    var countPricePerShareValue4 = function (horizon) {
        var count = 0;
        switch (parseInt(horizon)) {
            case 1:
                if (typeof $scope.SelectedScenario4.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear0 !== null && $scope.SelectedScenario4.pricePerShareYear0 > 0) {
                    count++;
                }

                break;
            case 2:
                if (typeof $scope.SelectedScenario4.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear0 !== null && $scope.SelectedScenario4.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear1 !== null && $scope.SelectedScenario4.pricePerShareYear1 > 0) {
                    count++;
                }

                break;
            case 3:
                if (typeof $scope.SelectedScenario4.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear0 !== null && $scope.SelectedScenario4.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear1 !== null && $scope.SelectedScenario4.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear2 !== null && $scope.SelectedScenario4.pricePerShareYear2 > 0) {
                    count++;
                }

                break;
            case 4:
                if (typeof $scope.SelectedScenario4.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear0 !== null && $scope.SelectedScenario4.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear1 !== null && $scope.SelectedScenario4.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear2 !== null && $scope.SelectedScenario4.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear3 !== null && $scope.SelectedScenario4.pricePerShareYear3 > 0) {
                    count++;
                }

                break;
            case 5:
                if (typeof $scope.SelectedScenario4.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear0 !== null && $scope.SelectedScenario4.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear1 !== null && $scope.SelectedScenario4.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear2 !== null && $scope.SelectedScenario4.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear3 !== null && $scope.SelectedScenario4.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear4 !== null && $scope.SelectedScenario4.pricePerShareYear4 > 0) {
                    count++;
                }

                break;
            case 6:
                if (typeof $scope.SelectedScenario4.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear0 !== null && $scope.SelectedScenario4.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear1 !== null && $scope.SelectedScenario4.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear2 !== null && $scope.SelectedScenario4.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear3 !== null && $scope.SelectedScenario4.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear4 !== null && $scope.SelectedScenario4.pricePerShareYear4 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario4.pricePerShareYear5 !== 'undefined' && $scope.SelectedScenario4.pricePerShareYear5 !== null && $scope.SelectedScenario4.pricePerShareYear5 > 0) {
                    count++;
                }

                break;
        }

        return count;
    }

    var countPricePerShareValue5 = function (horizon) {
        var count = 0;
        switch (parseInt(horizon)) {
            case 1:
                if (typeof $scope.SelectedScenario5.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear0 !== null && $scope.SelectedScenario5.pricePerShareYear0 > 0) {
                    count++;
                }

                break;
            case 2:
                if (typeof $scope.SelectedScenario5.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear0 !== null && $scope.SelectedScenario5.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear1 !== null && $scope.SelectedScenario5.pricePerShareYear1 > 0) {
                    count++;
                }

                break;
            case 3:
                if (typeof $scope.SelectedScenario5.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear0 !== null && $scope.SelectedScenario5.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear1 !== null && $scope.SelectedScenario5.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear2 !== null && $scope.SelectedScenario5.pricePerShareYear2 > 0) {
                    count++;
                }

                break;
            case 4:
                if (typeof $scope.SelectedScenario5.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear0 !== null && $scope.SelectedScenario5.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear1 !== null && $scope.SelectedScenario5.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear2 !== null && $scope.SelectedScenario5.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear3 !== null && $scope.SelectedScenario5.pricePerShareYear3 > 0) {
                    count++;
                }

                break;
            case 5:
                if (typeof $scope.SelectedScenario5.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear0 !== null && $scope.SelectedScenario5.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear1 !== null && $scope.SelectedScenario5.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear2 !== null && $scope.SelectedScenario5.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear3 !== null && $scope.SelectedScenario5.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear4 !== null && $scope.SelectedScenario5.pricePerShareYear4 > 0) {
                    count++;
                }

                break;
            case 6:
                if (typeof $scope.SelectedScenario5.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear0 !== null && $scope.SelectedScenario5.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear1 !== null && $scope.SelectedScenario5.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear2 !== null && $scope.SelectedScenario5.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear3 !== null && $scope.SelectedScenario5.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear4 !== null && $scope.SelectedScenario5.pricePerShareYear4 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario5.pricePerShareYear5 !== 'undefined' && $scope.SelectedScenario5.pricePerShareYear5 !== null && $scope.SelectedScenario5.pricePerShareYear5 > 0) {
                    count++;
                }

                break;
        }

        return count;
    }

    var countPricePerShareValue6 = function (horizon) {
        var count = 0;
        switch (parseInt(horizon)) {
            case 1:
                if (typeof $scope.SelectedScenario6.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear0 !== null && $scope.SelectedScenario6.pricePerShareYear0 > 0) {
                    count++;
                }

                break;
            case 2:
                if (typeof $scope.SelectedScenario6.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear0 !== null && $scope.SelectedScenario6.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear1 !== null && $scope.SelectedScenario6.pricePerShareYear1 > 0) {
                    count++;
                }

                break;
            case 3:
                if (typeof $scope.SelectedScenario6.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear0 !== null && $scope.SelectedScenario6.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear1 !== null && $scope.SelectedScenario6.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear2 !== null && $scope.SelectedScenario6.pricePerShareYear2 > 0) {
                    count++;
                }

                break;
            case 4:
                if (typeof $scope.SelectedScenario6.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear0 !== null && $scope.SelectedScenario6.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear1 !== null && $scope.SelectedScenario6.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear2 !== null && $scope.SelectedScenario6.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear3 !== null && $scope.SelectedScenario6.pricePerShareYear3 > 0) {
                    count++;
                }

                break;
            case 5:
                if (typeof $scope.SelectedScenario6.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear0 !== null && $scope.SelectedScenario6.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear1 !== null && $scope.SelectedScenario6.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear2 !== null && $scope.SelectedScenario6.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear3 !== null && $scope.SelectedScenario6.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear4 !== null && $scope.SelectedScenario6.pricePerShareYear4 > 0) {
                    count++;
                }

                break;
            case 6:
                if (typeof $scope.SelectedScenario6.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear0 !== null && $scope.SelectedScenario6.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear1 !== null && $scope.SelectedScenario6.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear2 !== null && $scope.SelectedScenario6.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear3 !== null && $scope.SelectedScenario6.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear4 !== null && $scope.SelectedScenario6.pricePerShareYear4 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario6.pricePerShareYear5 !== 'undefined' && $scope.SelectedScenario6.pricePerShareYear5 !== null && $scope.SelectedScenario6.pricePerShareYear5 > 0) {
                    count++;
                }

                break;
        }

        return count;
    }

    var countPricePerShareValue7 = function (horizon) {
        var count = 0;
        switch (parseInt(horizon)) {
            case 1:
                if (typeof $scope.SelectedScenario7.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear0 !== null && $scope.SelectedScenario7.pricePerShareYear0 > 0) {
                    count++;
                }

                break;
            case 2:
                if (typeof $scope.SelectedScenario7.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear0 !== null && $scope.SelectedScenario7.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear1 !== null && $scope.SelectedScenario7.pricePerShareYear1 > 0) {
                    count++;
                }

                break;
            case 3:
                if (typeof $scope.SelectedScenario7.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear0 !== null && $scope.SelectedScenario7.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear1 !== null && $scope.SelectedScenario7.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear2 !== null && $scope.SelectedScenario7.pricePerShareYear2 > 0) {
                    count++;
                }

                break;
            case 4:
                if (typeof $scope.SelectedScenario7.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear0 !== null && $scope.SelectedScenario7.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear1 !== null && $scope.SelectedScenario7.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear2 !== null && $scope.SelectedScenario7.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear3 !== null && $scope.SelectedScenario7.pricePerShareYear3 > 0) {
                    count++;
                }

                break;
            case 5:
                if (typeof $scope.SelectedScenario7.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear0 !== null && $scope.SelectedScenario7.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear1 !== null && $scope.SelectedScenario7.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear2 !== null && $scope.SelectedScenario7.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear3 !== null && $scope.SelectedScenario7.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear4 !== null && $scope.SelectedScenario7.pricePerShareYear4 > 0) {
                    count++;
                }

                break;
            case 6:
                if (typeof $scope.SelectedScenario7.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear0 !== null && $scope.SelectedScenario7.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear1 !== null && $scope.SelectedScenario7.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear2 !== null && $scope.SelectedScenario7.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear3 !== null && $scope.SelectedScenario7.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear4 !== null && $scope.SelectedScenario7.pricePerShareYear4 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario7.pricePerShareYear5 !== 'undefined' && $scope.SelectedScenario7.pricePerShareYear5 !== null && $scope.SelectedScenario7.pricePerShareYear5 > 0) {
                    count++;
                }

                break;
        }

        return count;
    }

    var countPricePerShareValue8 = function (horizon) {
        var count = 0;
        switch (parseInt(horizon)) {
            case 1:
                if (typeof $scope.SelectedScenario8.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear0 !== null && $scope.SelectedScenario8.pricePerShareYear0 > 0) {
                    count++;
                }

                break;
            case 2:
                if (typeof $scope.SelectedScenario8.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear0 !== null && $scope.SelectedScenario8.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear1 !== null && $scope.SelectedScenario8.pricePerShareYear1 > 0) {
                    count++;
                }

                break;
            case 3:
                if (typeof $scope.SelectedScenario8.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear0 !== null && $scope.SelectedScenario8.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear1 !== null && $scope.SelectedScenario8.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear2 !== null && $scope.SelectedScenario8.pricePerShareYear2 > 0) {
                    count++;
                }

                break;
            case 4:
                if (typeof $scope.SelectedScenario8.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear0 !== null && $scope.SelectedScenario8.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear1 !== null && $scope.SelectedScenario8.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear2 !== null && $scope.SelectedScenario8.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear3 !== null && $scope.SelectedScenario8.pricePerShareYear3 > 0) {
                    count++;
                }

                break;
            case 5:
                if (typeof $scope.SelectedScenario8.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear0 !== null && $scope.SelectedScenario8.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear1 !== null && $scope.SelectedScenario8.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear2 !== null && $scope.SelectedScenario8.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear3 !== null && $scope.SelectedScenario8.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear4 !== null && $scope.SelectedScenario8.pricePerShareYear4 > 0) {
                    count++;
                }

                break;
            case 6:
                if (typeof $scope.SelectedScenario8.pricePerShareYear0 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear0 !== null && $scope.SelectedScenario8.pricePerShareYear0 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear1 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear1 !== null && $scope.SelectedScenario8.pricePerShareYear1 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear2 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear2 !== null && $scope.SelectedScenario8.pricePerShareYear2 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear3 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear3 !== null && $scope.SelectedScenario8.pricePerShareYear3 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear4 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear4 !== null && $scope.SelectedScenario8.pricePerShareYear4 > 0) {
                    count++;
                }

                if (typeof $scope.SelectedScenario8.pricePerShareYear5 !== 'undefined' && $scope.SelectedScenario8.pricePerShareYear5 !== null && $scope.SelectedScenario8.pricePerShareYear5 > 0) {
                    count++;
                }

                break;
        }

        return count;
    }

    var priceConversion1 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1:
                    var year0 = $scope.SelectedScenario1.pricePerShareYear0;
                    if (typeof $scope.SelectedScenario1.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear0 === null)
                        year0 = 0;

                    $scope.PriceConversion1 = (parseFloat(year0)) / countPricePerShareValue1(1);
                break;
            case 2:
                if (typeof $scope.SelectedScenario1.pricePerShareYear1 !== 'undefined') {
                    year0 = $scope.SelectedScenario1.pricePerShareYear0;
                    var year1 = $scope.SelectedScenario1.pricePerShareYear1;
                    if (typeof $scope.SelectedScenario1.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario1.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear1 === null)
                        year1 = 0;

                    $scope.PriceConversion1 = (parseFloat(year0) + parseFloat(year1)) / countPricePerShareValue1(2);
                }
                break;
            case 3:
                if (typeof $scope.SelectedScenario1.pricePerShareYear2 !== 'undefined') {
                    year0 = $scope.SelectedScenario1.pricePerShareYear0;
                    year1 = $scope.SelectedScenario1.pricePerShareYear1;
                    var year2 = $scope.SelectedScenario1.pricePerShareYear2;
                    if (typeof $scope.SelectedScenario1.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario1.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario1.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear2 === null)
                        year2 = 0;

                    $scope.PriceConversion1 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2)) / countPricePerShareValue1(3);
                }
                break;
            case 4:
                if (typeof $scope.SelectedScenario1.pricePerShareYear3 !== 'undefined') {
                    year0 = $scope.SelectedScenario1.pricePerShareYear0;
                    year1 = $scope.SelectedScenario1.pricePerShareYear1;
                    year2 = $scope.SelectedScenario1.pricePerShareYear2;
                    var year3 = $scope.SelectedScenario1.pricePerShareYear3;
                    if (typeof $scope.SelectedScenario1.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario1.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario1.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear2 === null)
                        year2 = 0;
                    if (typeof $scope.SelectedScenario1.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear3 === null)
                        year3 = 0;

                    $scope.PriceConversion1 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3)) / countPricePerShareValue1(4);
                }
                break;
            case 5:
                year0 = $scope.SelectedScenario1.pricePerShareYear0;
                year1 = $scope.SelectedScenario1.pricePerShareYear1;
                year2 = $scope.SelectedScenario1.pricePerShareYear2;
                year3 = $scope.SelectedScenario1.pricePerShareYear3;
                var year4 = $scope.SelectedScenario1.pricePerShareYear4;
                if (typeof $scope.SelectedScenario1.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario1.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario1.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario1.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario1.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear4 === null)
                    year4 = 0;
                $scope.PriceConversion1 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4)) / countPricePerShareValue1(5);
                break;
            case 6:
                year0 = $scope.SelectedScenario1.pricePerShareYear0;
                year1 = $scope.SelectedScenario1.pricePerShareYear1;
                year2 = $scope.SelectedScenario1.pricePerShareYear2;
                year3 = $scope.SelectedScenario1.pricePerShareYear3;
                year4 = $scope.SelectedScenario1.pricePerShareYear4;
                var year5 = $scope.SelectedScenario1.pricePerShareYear5;
                if (typeof $scope.SelectedScenario1.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario1.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario1.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario1.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario1.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear4 === null)
                    year4 = 0;
                if (typeof $scope.SelectedScenario1.pricePerShareYear5 === 'undefined' || $scope.SelectedScenario1.pricePerShareYear5 === null)
                    year5 = 0;
                $scope.PriceConversion1 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4) + parseFloat(year5)) / countPricePerShareValue1(5);
                break;
            default:
                $scope.PriceConversion1 = null;
                break;
        }
        
    }

    var priceConversion2 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1:
                var year0 = $scope.SelectedScenario2.pricePerShareYear0;
                if (typeof $scope.SelectedScenario2.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear0 === null)
                    year0 = 0;
                $scope.PriceConversion2 = (parseFloat(year0)) / countPricePerShareValue2(1);
                break;
            case 2:
                if (typeof $scope.SelectedScenario2.pricePerShareYear1 !== 'undefined') {
                    year0 = $scope.SelectedScenario2.pricePerShareYear0;
                    var year1 = $scope.SelectedScenario2.pricePerShareYear1;
                    if (typeof $scope.SelectedScenario2.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario2.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear1 === null)
                        year1 = 0;

                    $scope.PriceConversion2 = (parseFloat(year0) + parseFloat(year1)) / countPricePerShareValue2(2);
                }
                break;
            case 3:
                if (typeof $scope.SelectedScenario2.pricePerShareYear2 !== 'undefined') {
                    year0 = $scope.SelectedScenario2.pricePerShareYear0;
                    year1 = $scope.SelectedScenario2.pricePerShareYear1;
                    year2 = $scope.SelectedScenario2.pricePerShareYear2;
                    if (typeof $scope.SelectedScenario2.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario2.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario2.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear2 === null)
                        year2 = 0;

                    $scope.PriceConversion2 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2)) / countPricePerShareValue2(3);
                }
                break;
            case 4:
                if (typeof $scope.SelectedScenario2.pricePerShareYear3 !== 'undefined') {
                    year0 = $scope.SelectedScenario2.pricePerShareYear0;
                    year1 = $scope.SelectedScenario2.pricePerShareYear1;
                    year2 = $scope.SelectedScenario2.pricePerShareYear2;
                    var year3 = $scope.SelectedScenario2.pricePerShareYear3;
                    if (typeof $scope.SelectedScenario2.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario2.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario2.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear2 === null)
                        year2 = 0;
                    if (typeof $scope.SelectedScenario2.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear3 === null)
                        year3 = 0;

                    $scope.PriceConversion2 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3)) / countPricePerShareValue2(4);
                }
                break;
            case 5:
                year0 = $scope.SelectedScenario2.pricePerShareYear0;
                year1 = $scope.SelectedScenario2.pricePerShareYear1;
                year2 = $scope.SelectedScenario2.pricePerShareYear2;
                year3 = $scope.SelectedScenario2.pricePerShareYear3;
                var year4 = $scope.SelectedScenario2.pricePerShareYear4;
                if (typeof $scope.SelectedScenario2.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario2.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario2.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario2.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario2.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear4 === null)
                    year4 = 0;
                $scope.PriceConversion2 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4)) / countPricePerShareValue2(5);
                break;
            case 6:
                year0 = $scope.SelectedScenario2.pricePerShareYear0;
                year1 = $scope.SelectedScenario2.pricePerShareYear1;
                year2 = $scope.SelectedScenario2.pricePerShareYear2;
                year3 = $scope.SelectedScenario2.pricePerShareYear3;
                year4 = $scope.SelectedScenario2.pricePerShareYear4;
                var year5 = $scope.SelectedScenario2.pricePerShareYear5;
                if (typeof $scope.SelectedScenario2.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario2.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario2.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario2.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario2.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear4 === null)
                    year4 = 0;
                if (typeof $scope.SelectedScenario2.pricePerShareYear5 === 'undefined' || $scope.SelectedScenario2.pricePerShareYear5 === null)
                    year5 = 0;
                $scope.PriceConversion2 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4) + parseFloat(year5)) / countPricePerShareValue2(5);
                break;
            default:
                $scope.PriceConversion2 = null;
                break;
        }

    }

    var priceConversion3 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1:
                var year0 = $scope.SelectedScenario3.pricePerShareYear0;
                if (typeof $scope.SelectedScenario3.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear0 === null)
                    year0 = 0;

                $scope.PriceConversion3 = (parseFloat(year0)) / countPricePerShareValue3(1);
                break;
            case 2:
                if (typeof $scope.SelectedScenario3.pricePerShareYear1 !== 'undefined') {
                    year0 = $scope.SelectedScenario3.pricePerShareYear0;
                    var year1 = $scope.SelectedScenario3.pricePerShareYear1;
                    if (typeof $scope.SelectedScenario3.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario3.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear1 === null)
                        year1 = 0;

                    $scope.PriceConversion3 = (parseFloat(year0) + parseFloat(year1)) / countPricePerShareValue3(2);
                }
                break;
            case 3:
                if (typeof $scope.SelectedScenario3.pricePerShareYear2 !== 'undefined') {
                    year0 = $scope.SelectedScenario3.pricePerShareYear0;
                    year1 = $scope.SelectedScenario3.pricePerShareYear1;
                    var year2 = $scope.SelectedScenario3.pricePerShareYear2;
                    if (typeof $scope.SelectedScenario3.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario3.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario3.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear2 === null)
                        year2 = 0;

                    $scope.PriceConversion3 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2)) / countPricePerShareValue3(3);
                }
                break;
            case 4:
                if (typeof $scope.SelectedScenario3.pricePerShareYear3 !== 'undefined') {
                    year0 = $scope.SelectedScenario3.pricePerShareYear0;
                    year1 = $scope.SelectedScenario3.pricePerShareYear1;
                    year2 = $scope.SelectedScenario3.pricePerShareYear2;
                    var year3 = $scope.SelectedScenario3.pricePerShareYear3;
                    if (typeof $scope.SelectedScenario3.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario3.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario3.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear2 === null)
                        year2 = 0;
                    if (typeof $scope.SelectedScenario3.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear3 === null)
                        year3 = 0;

                    $scope.PriceConversion3 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3)) / countPricePerShareValue3(4);
                }
                break;
            case 5:
                year0 = $scope.SelectedScenario3.pricePerShareYear0;
                year1 = $scope.SelectedScenario3.pricePerShareYear1;
                year2 = $scope.SelectedScenario3.pricePerShareYear2;
                year3 = $scope.SelectedScenario3.pricePerShareYear3;
                var year4 = $scope.SelectedScenario3.pricePerShareYear4;
                if (typeof $scope.SelectedScenario3.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario3.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario3.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario3.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario3.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear4 === null)
                    year4 = 0;
                $scope.PriceConversion3 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4)) / countPricePerShareValue3(5);
                break;
            case 6:
                year0 = $scope.SelectedScenario3.pricePerShareYear0;
                year1 = $scope.SelectedScenario3.pricePerShareYear1;
                year2 = $scope.SelectedScenario3.pricePerShareYear2;
                year3 = $scope.SelectedScenario3.pricePerShareYear3;
                year4 = $scope.SelectedScenario3.pricePerShareYear4;
                var year5 = $scope.SelectedScenario3.pricePerShareYear5;
                if (typeof $scope.SelectedScenario3.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario3.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario3.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario3.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario3.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear4 === null)
                    year4 = 0;
                if (typeof $scope.SelectedScenario3.pricePerShareYear5 === 'undefined' || $scope.SelectedScenario3.pricePerShareYear5 === null)
                    year5 = 0;
                $scope.PriceConversion3 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4) + parseFloat(year5)) / countPricePerShareValue3(5);
                break;
            default:
                $scope.PriceConversion3 = null;
                break;
        }

    }

    var priceConversion4 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1:
                var year0 = $scope.SelectedScenario4.pricePerShareYear0;
                if (typeof $scope.SelectedScenario4.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear0 === null)
                    year0 = 0;

                $scope.PriceConversion4 = (parseFloat(year0)) / countPricePerShareValue4(1);
                break;
            case 2:
                if (typeof $scope.SelectedScenario4.pricePerShareYear1 !== 'undefined') {
                    year0 = $scope.SelectedScenario4.pricePerShareYear0;
                    var year1 = $scope.SelectedScenario4.pricePerShareYear1;
                    if (typeof $scope.SelectedScenario4.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario4.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear1 === null)
                        year1 = 0;

                    $scope.PriceConversion4 = (parseFloat(year0) + parseFloat(year1)) / countPricePerShareValue4(2);
                }
                break;
            case 3:
                if (typeof $scope.SelectedScenario4.pricePerShareYear2 !== 'undefined') {
                    year0 = $scope.SelectedScenario4.pricePerShareYear0;
                    year1 = $scope.SelectedScenario4.pricePerShareYear1;
                    var year2 = $scope.SelectedScenario4.pricePerShareYear2;
                    if (typeof $scope.SelectedScenario4.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario4.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario4.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear2 === null)
                        year2 = 0;

                    $scope.PriceConversion4 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2)) / countPricePerShareValue4(3);
                }
                break;
            case 4:
                if (typeof $scope.SelectedScenario4.pricePerShareYear3 !== 'undefined') {
                    year0 = $scope.SelectedScenario4.pricePerShareYear0;
                    year1 = $scope.SelectedScenario4.pricePerShareYear1;
                    year2 = $scope.SelectedScenario4.pricePerShareYear2;
                    var year3 = $scope.SelectedScenario4.pricePerShareYear3;
                    if (typeof $scope.SelectedScenario4.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario4.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario4.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear2 === null)
                        year2 = 0;
                    if (typeof $scope.SelectedScenario4.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear3 === null)
                        year3 = 0;

                    $scope.PriceConversion4 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3)) / countPricePerShareValue4(4);
                }
                break;
            case 5:
                year0 = $scope.SelectedScenario4.pricePerShareYear0;
                year1 = $scope.SelectedScenario4.pricePerShareYear1;
                year2 = $scope.SelectedScenario4.pricePerShareYear2;
                year3 = $scope.SelectedScenario4.pricePerShareYear3;
                var year4 = $scope.SelectedScenario4.pricePerShareYear4;
                if (typeof $scope.SelectedScenario4.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario4.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario4.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario4.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario4.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear4 === null)
                    year4 = 0;
                $scope.PriceConversion4 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4)) / countPricePerShareValue4(5);
                break;
            case 6:
                year0 = $scope.SelectedScenario4.pricePerShareYear0;
                year1 = $scope.SelectedScenario4.pricePerShareYear1;
                year2 = $scope.SelectedScenario4.pricePerShareYear2;
                year3 = $scope.SelectedScenario4.pricePerShareYear3;
                year4 = $scope.SelectedScenario4.pricePerShareYear4;
                var year5 = $scope.SelectedScenario4.pricePerShareYear5;
                if (typeof $scope.SelectedScenario4.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario4.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario4.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario4.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario4.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear4 === null)
                    year4 = 0;
                if (typeof $scope.SelectedScenario4.pricePerShareYear5 === 'undefined' || $scope.SelectedScenario4.pricePerShareYear5 === null)
                    year5 = 0;
                $scope.PriceConversion4 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4) + parseFloat(year5)) / countPricePerShareValue4(5);
                break;
            default:
                $scope.PriceConversion4 = null;
                break;
        }

    }

    var priceConversion5 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1:
                var year0 = $scope.SelectedScenario5.pricePerShareYear0;
                if (typeof $scope.SelectedScenario5.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear0 === null)
                    year0 = 0;

                $scope.PriceConversion5 = (parseFloat(year0)) / countPricePerShareValue5(1);
                break;
            case 2:
                if (typeof $scope.SelectedScenario5.pricePerShareYear1 !== 'undefined') {
                    year0 = $scope.SelectedScenario5.pricePerShareYear0;
                    var year1 = $scope.SelectedScenario5.pricePerShareYear1;
                    if (typeof $scope.SelectedScenario5.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario5.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear1 === null)
                        year1 = 0;

                    $scope.PriceConversion5 = (parseFloat(year0) + parseFloat(year1)) / countPricePerShareValue5(2);
                }
                break;
            case 3:
                if (typeof $scope.SelectedScenario5.pricePerShareYear2 !== 'undefined') {
                    year0 = $scope.SelectedScenario5.pricePerShareYear0;
                    year1 = $scope.SelectedScenario5.pricePerShareYear1;
                    var year2 = $scope.SelectedScenario5.pricePerShareYear2;
                    if (typeof $scope.SelectedScenario5.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario5.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario5.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear2 === null)
                        year2 = 0;

                    $scope.PriceConversion5 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2)) / countPricePerShareValue5(3);
                }
                break;
            case 4:
                if (typeof $scope.SelectedScenario5.pricePerShareYear3 !== 'undefined') {
                    year0 = $scope.SelectedScenario5.pricePerShareYear0;
                    year1 = $scope.SelectedScenario5.pricePerShareYear1;
                    year2 = $scope.SelectedScenario5.pricePerShareYear2;
                    var year3 = $scope.SelectedScenario5.pricePerShareYear3;
                    if (typeof $scope.SelectedScenario5.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario5.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario5.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear2 === null)
                        year2 = 0;
                    if (typeof $scope.SelectedScenario5.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear3 === null)
                        year3 = 0;

                    $scope.PriceConversion5 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3)) / countPricePerShareValue5(4);
                }
                break;
            case 5:
                year0 = $scope.SelectedScenario5.pricePerShareYear0;
                year1 = $scope.SelectedScenario5.pricePerShareYear1;
                year2 = $scope.SelectedScenario5.pricePerShareYear2;
                year3 = $scope.SelectedScenario5.pricePerShareYear3;
                var year4 = $scope.SelectedScenario5.pricePerShareYear4;
                if (typeof $scope.SelectedScenario5.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario5.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario5.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario5.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario5.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear4 === null)
                    year4 = 0;
                $scope.PriceConversion5 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4)) / countPricePerShareValue5(5);
                break;
            case 6:
                year0 = $scope.SelectedScenario5.pricePerShareYear0;
                year1 = $scope.SelectedScenario5.pricePerShareYear1;
                year2 = $scope.SelectedScenario5.pricePerShareYear2;
                year3 = $scope.SelectedScenario5.pricePerShareYear3;
                year4 = $scope.SelectedScenario5.pricePerShareYear4;
                var year5 = $scope.SelectedScenario5.pricePerShareYear5;
                if (typeof $scope.SelectedScenario5.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario5.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario5.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario5.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario5.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear4 === null)
                    year4 = 0;
                if (typeof $scope.SelectedScenario5.pricePerShareYear5 === 'undefined' || $scope.SelectedScenario5.pricePerShareYear5 === null)
                    year5 = 0;
                $scope.PriceConversion5 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4) + parseFloat(year5)) / countPricePerShareValue5(5);
                break;
            default:
                $scope.PriceConversion5 = null;
                break;
        }

    }

    var priceConversion6 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1:
                var year0 = $scope.SelectedScenario6.pricePerShareYear0;
                if (typeof $scope.SelectedScenario6.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear0 === null)
                    year0 = 0;

                $scope.PriceConversion6 = (parseFloat(year0)) / countPricePerShareValue6(1);
                break;
            case 2:
                if (typeof $scope.SelectedScenario6.pricePerShareYear1 !== 'undefined') {
                    year0 = $scope.SelectedScenario6.pricePerShareYear0;
                    var year1 = $scope.SelectedScenario6.pricePerShareYear1;
                    if (typeof $scope.SelectedScenario6.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario6.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear1 === null)
                        year1 = 0;

                    $scope.PriceConversion6 = (parseFloat(year0) + parseFloat(year1)) / countPricePerShareValue6(2);
                }
                break;
            case 3:
                if (typeof $scope.SelectedScenario6.pricePerShareYear2 !== 'undefined') {
                    year0 = $scope.SelectedScenario6.pricePerShareYear0;
                    year1 = $scope.SelectedScenario6.pricePerShareYear1;
                    var year2 = $scope.SelectedScenario6.pricePerShareYear2;
                    if (typeof $scope.SelectedScenario6.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario6.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario6.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear2 === null)
                        year2 = 0;

                    $scope.PriceConversion6 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2)) / countPricePerShareValue6(3);
                }
                break;
            case 4:
                if (typeof $scope.SelectedScenario6.pricePerShareYear3 !== 'undefined') {
                    year0 = $scope.SelectedScenario6.pricePerShareYear0;
                    year1 = $scope.SelectedScenario6.pricePerShareYear1;
                    year2 = $scope.SelectedScenario6.pricePerShareYear2;
                    var year3 = $scope.SelectedScenario6.pricePerShareYear3;
                    if (typeof $scope.SelectedScenario6.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario6.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario6.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear2 === null)
                        year2 = 0;
                    if (typeof $scope.SelectedScenario6.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear3 === null)
                        year3 = 0;

                    $scope.PriceConversion6 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3)) / countPricePerShareValue6(4);
                }
                break;
            case 5:
                year0 = $scope.SelectedScenario6.pricePerShareYear0;
                year1 = $scope.SelectedScenario6.pricePerShareYear1;
                year2 = $scope.SelectedScenario6.pricePerShareYear2;
                year3 = $scope.SelectedScenario6.pricePerShareYear3;
                var year4 = $scope.SelectedScenario6.pricePerShareYear4;
                if (typeof $scope.SelectedScenario6.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario6.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario6.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario6.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario6.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear4 === null)
                    year4 = 0;
                $scope.PriceConversion6 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4)) / countPricePerShareValue6(5);
                break;
            case 6:
                year0 = $scope.SelectedScenario6.pricePerShareYear0;
                year1 = $scope.SelectedScenario6.pricePerShareYear1;
                year2 = $scope.SelectedScenario6.pricePerShareYear2;
                year3 = $scope.SelectedScenario6.pricePerShareYear3;
                year4 = $scope.SelectedScenario6.pricePerShareYear4;
                var year5 = $scope.SelectedScenario6.pricePerShareYear5;
                if (typeof $scope.SelectedScenario6.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario6.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario6.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario6.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario6.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear4 === null)
                    year4 = 0;
                if (typeof $scope.SelectedScenario6.pricePerShareYear5 === 'undefined' || $scope.SelectedScenario6.pricePerShareYear5 === null)
                    year5 = 0;
                $scope.PriceConversion6 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4) + parseFloat(year5)) / countPricePerShareValue6(5);
                break;
            default:
                $scope.PriceConversion6 = null;
                break;
        }

    }

    var priceConversion7 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1:
                var year0 = $scope.SelectedScenario7.pricePerShareYear0;
                if (typeof $scope.SelectedScenario7.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear0 === null)
                    year0 = 0;

                $scope.PriceConversion7 = (parseFloat(year0)) / countPricePerShareValue7(1);
                break;
            case 2:
                if (typeof $scope.SelectedScenario7.pricePerShareYear1 !== 'undefined') {
                    year0 = $scope.SelectedScenario7.pricePerShareYear0;
                    var year1 = $scope.SelectedScenario7.pricePerShareYear1;
                    if (typeof $scope.SelectedScenario7.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario7.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear1 === null)
                        year1 = 0;

                    $scope.PriceConversion7 = (parseFloat(year0) + parseFloat(year1)) / countPricePerShareValue7(2);
                }
                break;
            case 3:
                if (typeof $scope.SelectedScenario7.pricePerShareYear2 !== 'undefined') {
                    year0 = $scope.SelectedScenario7.pricePerShareYear0;
                    year1 = $scope.SelectedScenario7.pricePerShareYear1;
                    var year2 = $scope.SelectedScenario7.pricePerShareYear2;
                    if (typeof $scope.SelectedScenario7.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario7.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario7.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear2 === null)
                        year2 = 0;

                    $scope.PriceConversion7 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2)) / countPricePerShareValue7(3);
                }
                break;
            case 4:
                if (typeof $scope.SelectedScenario7.pricePerShareYear3 !== 'undefined') {
                    year0 = $scope.SelectedScenario7.pricePerShareYear0;
                    year1 = $scope.SelectedScenario7.pricePerShareYear1;
                    year2 = $scope.SelectedScenario7.pricePerShareYear2;
                    var year3 = $scope.SelectedScenario7.pricePerShareYear3;
                    if (typeof $scope.SelectedScenario7.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario7.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario7.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear2 === null)
                        year2 = 0;
                    if (typeof $scope.SelectedScenario7.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear3 === null)
                        year3 = 0;

                    $scope.PriceConversion7 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3)) / countPricePerShareValue7(4);
                }
                break;
            case 5:
                year0 = $scope.SelectedScenario7.pricePerShareYear0;
                year1 = $scope.SelectedScenario7.pricePerShareYear1;
                year2 = $scope.SelectedScenario7.pricePerShareYear2;
                year3 = $scope.SelectedScenario7.pricePerShareYear3;
                var year4 = $scope.SelectedScenario7.pricePerShareYear4;
                if (typeof $scope.SelectedScenario7.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario7.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario7.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario7.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario7.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear4 === null)
                    year4 = 0;

                $scope.PriceConversion7 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4)) / countPricePerShareValue7(5);
                break;
            case 6:
                year0 = $scope.SelectedScenario7.pricePerShareYear0;
                year1 = $scope.SelectedScenario7.pricePerShareYear1;
                year2 = $scope.SelectedScenario7.pricePerShareYear2;
                year3 = $scope.SelectedScenario7.pricePerShareYear3;
                year4 = $scope.SelectedScenario7.pricePerShareYear4;
                var year5 = $scope.SelectedScenario7.pricePerShareYear5;
                if (typeof $scope.SelectedScenario7.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario7.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario7.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario7.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario7.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear4 === null)
                    year4 = 0;
                if (typeof $scope.SelectedScenario7.pricePerShareYear5 === 'undefined' || $scope.SelectedScenario7.pricePerShareYear5 === null)
                    year5 = 0;
                $scope.PriceConversion7 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4) + parseFloat(year5)) / countPricePerShareValue7(5);
                break;
            default:
                $scope.PriceConversion7 = null;
                break;
        }

    }

    var priceConversion8 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1:
                var year0 = $scope.SelectedScenario8.pricePerShareYear0;
                if (typeof $scope.SelectedScenario8.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear0 === null)
                    year0 = 0;

                $scope.PriceConversion8 = (parseFloat(year0)) / countPricePerShareValue8(1);
                break;
            case 2:
                if (typeof $scope.SelectedScenario8.pricePerShareYear1 !== 'undefined') {
                    year0 = $scope.SelectedScenario8.pricePerShareYear0;
                    var year1 = $scope.SelectedScenario8.pricePerShareYear1;
                    if (typeof $scope.SelectedScenario8.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario8.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear1 === null)
                        year1 = 0;

                    $scope.PriceConversion8 = (parseFloat(year0) + parseFloat(year1)) / countPricePerShareValue8(2);
                }
                break;
            case 3:
                if (typeof $scope.SelectedScenario8.pricePerShareYear2 !== 'undefined') {
                    year0 = $scope.SelectedScenario8.pricePerShareYear0;
                    year1 = $scope.SelectedScenario8.pricePerShareYear1;
                    var year2 = $scope.SelectedScenario8.pricePerShareYear2;
                    if (typeof $scope.SelectedScenario8.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario8.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario8.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear2 === null)
                        year2 = 0;

                    $scope.PriceConversion8 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2)) / countPricePerShareValue8(3);
                }
                break;
            case 4:
                if (typeof $scope.SelectedScenario8.pricePerShareYear3 !== 'undefined') {
                    year0 = $scope.SelectedScenario8.pricePerShareYear0;
                    year1 = $scope.SelectedScenario8.pricePerShareYear1;
                    year2 = $scope.SelectedScenario8.pricePerShareYear2;
                    var year3 = $scope.SelectedScenario8.pricePerShareYear3;
                    if (typeof $scope.SelectedScenario8.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear0 === null)
                        year0 = 0;
                    if (typeof $scope.SelectedScenario8.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear1 === null)
                        year1 = 0;
                    if (typeof $scope.SelectedScenario8.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear2 === null)
                        year2 = 0;
                    if (typeof $scope.SelectedScenario8.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear3 === null)
                        year3 = 0;

                    $scope.PriceConversion8 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3)) / countPricePerShareValue8(4);
                }
                break;
            case 5:
                year0 = $scope.SelectedScenario8.pricePerShareYear0;
                year1 = $scope.SelectedScenario8.pricePerShareYear1;
                year2 = $scope.SelectedScenario8.pricePerShareYear2;
                year3 = $scope.SelectedScenario8.pricePerShareYear3;
                var year4 = $scope.SelectedScenario8.pricePerShareYear4;
                if (typeof $scope.SelectedScenario8.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario8.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario8.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario8.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario8.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear4 === null)
                    year4 = 0;
                $scope.PriceConversion8 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4)) / countPricePerShareValue8(5);
                break;
            case 6:
                year0 = $scope.SelectedScenario8.pricePerShareYear0;
                year1 = $scope.SelectedScenario8.pricePerShareYear1;
                year2 = $scope.SelectedScenario8.pricePerShareYear2;
                year3 = $scope.SelectedScenario8.pricePerShareYear3;
                year4 = $scope.SelectedScenario8.pricePerShareYear4;
                var year5 = $scope.SelectedScenario8.pricePerShareYear5;
                if (typeof $scope.SelectedScenario8.pricePerShareYear0 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear0 === null)
                    year0 = 0;
                if (typeof $scope.SelectedScenario8.pricePerShareYear1 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear1 === null)
                    year1 = 0;
                if (typeof $scope.SelectedScenario8.pricePerShareYear2 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear2 === null)
                    year2 = 0;
                if (typeof $scope.SelectedScenario8.pricePerShareYear3 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear3 === null)
                    year3 = 0;
                if (typeof $scope.SelectedScenario8.pricePerShareYear4 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear4 === null)
                    year4 = 0;
                if (typeof $scope.SelectedScenario8.pricePerShareYear5 === 'undefined' || $scope.SelectedScenario8.pricePerShareYear5 === null)
                    year5 = 0;
                $scope.PriceConversion8 = (parseFloat(year0) + parseFloat(year1) + parseFloat(year2) + parseFloat(year3) + parseFloat(year4) + parseFloat(year5)) / countPricePerShareValue8(5);
                break;
            default:
                $scope.PriceConversion8 = null;
                break;
        }

    }

    // Year 0 Calculations for Column 1
    var assetGrowthRateYear10 = function () {
        return parseFloat($scope.SelectedScenario1.assetGrowthRateYear0==null?0:$scope.SelectedScenario1.assetGrowthRateYear0);
    };

    var newAcquisitionAssetsYear10 = function () {
        if (typeof $scope.SelectedScenario1.newAcquisitionAssetsYear0 !== 'undefined' && $scope.SelectedScenario1.newAcquisitionAssetsYear0 !== null)
            return parseFloat($scope.SelectedScenario1.newAcquisitionAssetsYear0);
        else
            return 0;
    };

    var totalAssetsYear10 = function () {
        return (parseFloat($scope.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear10() / 100))) + newAcquisitionAssetsYear10();
    };

    var returnOnAverageAssetsYear10 = function () {
        if ($scope.chkNetIncomeS1 === true) {
            return ((netIncomeYear10() / (($scope.TotalAssetsPriorYear + totalAssetsYear10()) / 2))) * 100;
        }
        else
            return parseFloat($scope.SelectedScenario1.returnOnAverageAssetsYear0==null?0:$scope.SelectedScenario1.returnOnAverageAssetsYear0);
    }

    var netIncomeYear10 = function () {
        if ($scope.chkNetIncomeS1 === true)
            return $scope.SelectedScenario1.netIncomeYear0;
        else
            return ((parseFloat($scope.TotalAssetsPriorYear) + totalAssetsYear10()) / 2) * (returnOnAverageAssetsYear10()/100);
    }

    var dividendsRateYear10 = function () {
        return parseFloat($scope.SelectedScenario1.dividendsRateYear0==null?0:$scope.SelectedScenario1.dividendsRateYear0);
    }

    var dividendsYear10 = function () {
        var netInc = netIncomeYear10();
        var divRate = dividendsRateYear10();
        
        if (typeof netInc === 'undefined' || netInc === null)
            netInc = 0;

        if (typeof divRate === 'undefined' || divRate === null)
            divRate = 0;

        if ($scope.chkCashDividendsS1 === true)
            return $scope.SelectedScenario1.dividendsYear0;
        else
            return netInc * (divRate/100);
    };

    var newCapitalYear10 = function () {
        if (typeof $scope.SelectedScenario1.newCapitalYear0 === 'undefined' || $scope.SelectedScenario1.newCapitalYear0 === null)
            $scope.SelectedScenario1.newCapitalYear0 = 0;
        else
            return parseFloat($scope.SelectedScenario1.newCapitalYear0);
    };

    var bankEquityCapitalYear10 = function () {
        var netInc = 0;
        var divYear10 = 0;
        var newCap = 0;

        if (typeof netIncomeYear10() !== 'undefined' || netIncomeYear10() !== null || isNaN(netIncomeYear10()) === false)
            netInc = netIncomeYear10();

        return parseFloat($scope.BankEquityCapitalPriorYear) + netIncomeYear10() - dividendsYear10() + newCapitalYear10();
    };

    var cet1CapitalAdjustmentYear10 = function () {
        return parseFloat($scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : $scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear10 = function () {
        if ($scope.chkTier1CapitalAdjustmentS1 === true)
            return $scope.SelectedScenario1.tier1CapitalAdjustmentYear0;
        else
            return parseFloat($scope.Tier1CapitalAdjustmentPriorYear==null?0:$scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear10 = function () {
        return bankEquityCapitalYear10() + cet1CapitalAdjustmentYear10() + tier1CapitalAdjustmentYear10();
    };

    var tier1CapitalYear10 = function () {
        return bankEquityCapitalYear10() + tier1CapitalAdjustmentYear10();
    };

    var tier2CapitalYear10 = function () {
        if ($scope.chkTier2CapitalS1 === true)
            return $scope.SelectedScenario1.tier2CapitalYear0;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear10();
    }

    var totalRiskBasedCapitalYear10 = function () {
        return tier1CapitalYear10() + tier2CapitalYear10();
    };

    var riskWeightedAssetsYear10 = function () {
        if ($scope.chkRiskWeightedAssetsS1 === true) {
            return $scope.SelectedScenario1.riskWeightedAssetsYear0;
        }
        else
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear10();
    }

    var totalAssetsForLeverageYear10 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear10();
    }

    var cet1CapitalRatioYear10 = function () {
        return riskWeightedAssetsYear10()==0?null:cet1CapitalYear10() / riskWeightedAssetsYear10();
    }

    var tier1RBCRatioYear10 = function () {
        return (tier1CapitalYear10() / riskWeightedAssetsYear10()) * 100;
    }

    var totalRBCRatioYear10 = function () {
        return (totalRiskBasedCapitalYear10() / riskWeightedAssetsYear10()) * 100;
    }

    var tier1LeverageRatioYear10 = function () {
        return totalAssetsForLeverageYear10()==0?null:tier1CapitalYear10() / totalAssetsForLeverageYear10();
    }

    var returnOnAverageEquityYear10 = function () {
        return (netIncomeYear10() / ((bankEquityCapitalYear10() + parseFloat($scope.BankEquityCapitalPriorYear)) / 2)) * 100;
    }

    var mvEquityYear10 = function () {
        return bankEquityCapitalYear10() * 1.5;
    };

    var sharesOutstandingYear10 = function () {
        return parseFloat($scope.SelectedScenario1.sharesOutstandingActualYear0);
    }

    var bvSharePriceYear10 = function () {
        return sharesOutstandingYear10()==0?null:bankEquityCapitalYear10() * 1000 / sharesOutstandingYear10();
    }

    var mvSharePriceYear10 = function () {
        return sharesOutstandingYear10()==0?null:mvEquityYear10() * 1000 / sharesOutstandingYear10();
    }

    var earningsPerSharePriceYear10 = function () {
        return sharesOutstandingYear10()==0?null:netIncomeYear10() * 1000 / sharesOutstandingYear10();
    }

    var earningsPerShare15PriceYear10 = function () {
        return earningsPerSharePriceYear10() * 15;
    };

    var earningsPerShare20PriceYear10 = function () {
        return earningsPerSharePriceYear10() * 20;
    };

    var dividendPerSharePriceYear10 = function () {
        return sharesOutstandingYear10()==0?null:dividendsYear10() * (-1000) / sharesOutstandingYear10();
    }

    // Year 1 Calculations for Column 1
    var assetGrowthRateYear11 = function () {
        return parseFloat($scope.SelectedScenario1.assetGrowthRateYear1==null?0:$scope.SelectedScenario1.assetGrowthRateYear1);
    }

    var newAcquisitionAssetsYear11 = function () {
        return parseFloat($scope.SelectedScenario1.newAcquisitionAssetsYear1==null?0:$scope.SelectedScenario1.newAcquisitionAssetsYear1);
    }

    var totalAssetsYear11 = function () {
        return (((totalAssetsYear10() * (1 + ( assetGrowthRateYear11() / 100 ))) + newAcquisitionAssetsYear11()));
    };
            
    var returnOnAverageAssetsYear11 = function () {
        if ($scope.chkNetIncomeS1 === true) {
            return ((netIncomeYear11() / ((totalAssetsYear10() + totalAssetsYear11()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario1.returnOnAverageAssetsYear1;
    }
    
    var netIncomeYear11 = function () {
        if ($scope.chkNetIncomeS1 === true)
            return $scope.SelectedScenario1.netIncomeYear1;
        else
            return ((totalAssetsYear10() + totalAssetsYear11()) / 2) * (returnOnAverageAssetsYear11() / 100);
    };
            
    var dividendsRateYear11 = function () {
        return parseFloat($scope.SelectedScenario1.dividendsRateYear1==null?0:$scope.SelectedScenario1.dividendsRateYear1);
    }
            
    var dividendsYear11 = function () {
        if ($scope.chkCashDividendsS1 === true)
            return $scope.SelectedScenario1.dividendsYear1;
        else
            return netIncomeYear11() * (dividendsRateYear11()/100);
    };

    var newCapitalYear11 = function () {
        return parseFloat($scope.SelectedScenario1.newCapitalYear1==null?0:$scope.SelectedScenario1.newCapitalYear1);
    }

    var bankEquityCapitalYear11 = function () {
        var bec = bankEquityCapitalYear10();
        var netInc = netIncomeYear11();
        var dividends = dividendsYear11();
        var newcap = newCapitalYear11();

        if (isNaN(bankEquityCapitalYear10()) === true)
            bec = 0;

        if (isNaN(netIncomeYear11()) === true)
            netInc = 0;

        if (isNaN(dividendsYear11()) === true)
            dividends = 0

        if (isNaN(newCapitalYear11()) === true)
            newcap = newCapitalYear11();

        return bec + netInc - dividends + newcap;
    };

    var cet1CapitalAdjustmentYear11 = function () {
        return parseFloat($scope.Cet1CapitalAdjustmentPriorYear==null?0:$scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear11 = function () {
        if ($scope.chkTier1CapitalAdjustmentS1 === true)
            return $scope.SelectedScenario1.tier1CapitalAdjustmentYear1;
        else
            return parseFloat($scope.Tier1CapitalAdjustmentPriorYear==null?0:$scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear11 = function () {
        return bankEquityCapitalYear11() + cet1CapitalAdjustmentYear11() + tier1CapitalAdjustmentYear11();
    };

    var tier1CapitalYear11 = function () {
        return bankEquityCapitalYear11() + tier1CapitalAdjustmentYear11();
    };

    var tier2CapitalYear11 = function () {
        if ($scope.chkTier2CapitalS1 === true)
            return $scope.SelectedScenario1.tier2CapitalYear1;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear11();
    };

    var totalRiskBasedCapitalYear11 = function () {
        return tier1CapitalYear11() + tier2CapitalYear11();
    };

    var riskWeightedAssetsYear11 = function () {
        if ($scope.chkRiskWeightedAssetsS1 === true) {
            return $scope.SelectedScenario1.riskWeightedAssetsYear1;
        }
        else
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear11();
    };

    var totalAssetsForLeverageYear11 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear11();
    };

    var cet1CapitalRatioYear11 = function () {
        return cet1CapitalYear11() / riskWeightedAssetsYear11();
    };

    var tier1RBCRatioYear11 = function () {
        return (tier1CapitalYear11() / riskWeightedAssetsYear11()) * 100;
    };

    var totalRBCRatioYear11 = function () {
        return (totalRiskBasedCapitalYear11() / riskWeightedAssetsYear11()) * 100;
    };

    var tier1LeverageRatioYear11 = function () {
        return (tier1CapitalYear11() / totalAssetsForLeverageYear11());
    };

    var returnOnAverageEquityYear11 = function () {
        var netInc = 0;
        var bankEq = 0;
        var bankEqCap = 0;

        if (typeof netIncomeYear11() !== 'undefined' || netIncomeYear11() !== null)
            netInc = netIncomeYear11();



        return (netIncomeYear11() / ((bankEquityCapitalYear11() + bankEquityCapitalYear10()) / 2)) * 100;
    };

    var mvEquityYear11 = function () {
        return bankEquityCapitalYear11() * 1.5;
    };

    var sharesOutstandingYear11 = function () {
        return parseFloat($scope.SelectedScenario1.sharesOutstandingActualYear1==null?0:$scope.SelectedScenario1.sharesOutstandingActualYear1);
    }

    var bvSharePriceYear11 = function () {
        return bankEquityCapitalYear11() * 1000 / sharesOutstandingYear11();
    };

    var mvSharePriceYear11 = function () {
        return mvEquityYear11() * 1000 / sharesOutstandingYear11();
    };

    var earningsPerSharePriceYear11 = function () {
        return netIncomeYear11() * 1000 / sharesOutstandingYear11();
    };

    var earningsPerShare15PriceYear11 = function () {
        return earningsPerSharePriceYear11() * 15;
    };

    var earningsPerShare20PriceYear11 = function () {
        return earningsPerSharePriceYear11() * 20;
    };

    var dividendPerSharePriceYear11 = function () {
        return dividendsYear11() * (-1000) / sharesOutstandingYear11();
    };

    // Year 2 Calculations for Column 1
    var assetGrowthRateYear12 = function () {
        return parseFloat($scope.SelectedScenario1.assetGrowthRateYear2==null?0:$scope.SelectedScenario1.assetGrowthRateYear2);
    }

    var newAcquisitionAssetsYear12 = function () {
        return parseFloat($scope.SelectedScenario1.newAcquisitionAssetsYear2==null?0:$scope.SelectedScenario1.newAcquisitionAssetsYear2);
    }

    var totalAssetsYear12 = function () {
        return ((totalAssetsYear11() * (1 + (assetGrowthRateYear12() / 100 ))) + newAcquisitionAssetsYear12());
    }
            
    var returnOnAverageAssetsYear12 = function () {
        if ($scope.chkNetIncomeS1 === true) {
            return ((netIncomeYear12() / ((totalAssetsYear11() + totalAssetsYear12()) / 2))) * 100;
        }
        else
            return parseFloat($scope.SelectedScenario1.returnOnAverageAssetsYear2==null?0:$scope.SelectedScenario1.returnOnAverageAssetsYear2);
    }

    var netIncomeYear12 = function () {
        if ($scope.chkNetIncomeS1 === true)
            return $scope.SelectedScenario1.netIncomeYear2;
        else
            return ((totalAssetsYear11() + totalAssetsYear12()) / 2) * (returnOnAverageAssetsYear12()/100);
    }
            
    var dividendsRateYear12 = function () {
        if (typeof $scope.SelectedScenario1.dividendsRateYear2 === 'undefined' || $scope.SelectedScenario1.dividendsRateYear2 === null)
            $scope.SelectedScenario1.dividendsRateYear2 = 0;

        return parseFloat($scope.SelectedScenario1.dividendsRateYear2);
    }
            
    var dividendsYear12 = function () {
        if ($scope.chkCashDividendsS1 === true)
            return $scope.SelectedScenario1.dividendsYear2;
        else
            return netIncomeYear12() * (dividendsRateYear12()/100);
    }

    var newCapitalYear12 = function () {
        return parseFloat($scope.SelectedScenario1.newCapitalYear2==null?0:$scope.SelectedScenario1.newCapitalYear2);
    }

    var bankEquityCapitalYear12 = function () {
        return bankEquityCapitalYear11() + netIncomeYear12() - dividendsYear12() + newCapitalYear12();
    }

    var cet1CapitalAdjustmentYear12 = function () {
        return parseFloat($scope.Cet1CapitalAdjustmentPriorYear==null?0:$scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear12 = function () {
        if ($scope.chkTier1CapitalAdjustmentS1 === true)
            return $scope.SelectedScenario1.tier1CapitalAdjustmentYear2;
        else
            return parseFloat($scope.Tier1CapitalAdjustmentPriorYear==null?0:$scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear12 = function () {
        return bankEquityCapitalYear12() + cet1CapitalAdjustmentYear12() + tier1CapitalAdjustmentYear12();
    }

    var tier1CapitalYear12 = function () {
        return bankEquityCapitalYear12() + tier1CapitalAdjustmentYear12();
    }

    var tier2CapitalYear12 = function () {
        if ($scope.chkTier2CapitalS1 === true)
            return $scope.SelectedScenario1.tier2CapitalYear2;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear12();
    }

    var totalRiskBasedCapitalYear12 = function () {
        return tier1CapitalYear12() + tier2CapitalYear12();
    }

    var riskWeightedAssetsYear12 = function () {
        if ($scope.chkRiskWeightedAssetsS1 === true) {
            return $scope.SelectedScenario1.riskWeightedAssetsYear2;
        }
        else
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear12();
    }

    var totalAssetsForLeverageYear12 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear12();
    }

    var cet1CapitalRatioYear12 = function () {
        return riskWeightedAssetsYear12()==0?null:cet1CapitalYear12() / riskWeightedAssetsYear12();
    }

    var tier1RBCRatioYear12 = function () {
        return (tier1CapitalYear12() / riskWeightedAssetsYear12()) * 100;
    }

    var totalRBCRatioYear12 = function () {
        return (totalRiskBasedCapitalYear12() / riskWeightedAssetsYear12()) * 100;
    }

    var tier1LeverageRatioYear12 = function () {
        return (tier1CapitalYear12() / totalAssetsForLeverageYear12());
    }

    var returnOnAverageEquityYear12 = function () {
        return (netIncomeYear12() / ((bankEquityCapitalYear12() + bankEquityCapitalYear11()) / 2)) * 100;
    }

    var mvEquityYear12 = function () {
        return bankEquityCapitalYear12() * 1.5;
    }

    var sharesOutstandingYear12 = function () {
        return parseFloat($scope.SelectedScenario1.sharesOutstandingActualYear2==null?0:$scope.SelectedScenario1.sharesOutstandingActualYear2);
    }

    var bvSharePriceYear12 = function () {
        return sharesOutstandingYear12()==0?null:bankEquityCapitalYear12() * 1000 / sharesOutstandingYear12();
    }

    var mvSharePriceYear12 = function () {
        return sharesOutstandingYear12()==0?null:mvEquityYear12() * 1000 / sharesOutstandingYear12();
    }

    var earningsPerSharePriceYear12 = function () {
        return sharesOutstandingYear12()==0?null:netIncomeYear12() * 1000 / sharesOutstandingYear12();
    }

    var earningsPerShare15PriceYear12 = function () {
        return earningsPerSharePriceYear12() * 15;
    }

    var earningsPerShare20PriceYear12 = function () {
        return earningsPerSharePriceYear12() * 20;
    }

    var dividendPerSharePriceYear12 = function () {
        return sharesOutstandingYear12()==0?null:dividendsYear12() * (-1000) / sharesOutstandingYear12();
    }

    // Year 3 Calculations for Column 1
    var assetGrowthRateYear13 = function () {
        return parseFloat($scope.SelectedScenario1.assetGrowthRateYear3==null?0:$scope.SelectedScenario1.assetGrowthRateYear3);
    }

    var newAcquisitionAssetsYear13 = function () {
        return parseFloat($scope.SelectedScenario1.newAcquisitionAssetsYear3==null?0:$scope.SelectedScenario1.newAcquisitionAssetsYear3);
    }

    var totalAssetsYear13 = function () {
        return ((totalAssetsYear12() * (1 + (assetGrowthRateYear13() / 100 ))) + newAcquisitionAssetsYear13());
    }
            
    var returnOnAverageAssetsYear13 = function () {
        if ($scope.chkNetIncomeS1 === true) {
            return (netIncomeYear13() / ((totalAssetsYear12() + totalAssetsYear13()) / 2)) * 100;
        }
        else
            return parseFloat($scope.SelectedScenario1.returnOnAverageAssetsYear3==null?0:$scope.SelectedScenario1.returnOnAverageAssetsYear3);
    }

    var netIncomeYear13 = function () {
        if ($scope.chkNetIncomeS1 === true)
            return $scope.SelectedScenario1.netIncomeYear3;
        else
            return ((totalAssetsYear12() + totalAssetsYear13()) / 2) * (returnOnAverageAssetsYear13()/100);
    }
            
    var dividendsRateYear13 = function () {
        return parseFloat($scope.SelectedScenario1.dividendsRateYear3==null?0:$scope.SelectedScenario1.dividendsRateYear3);
    }
            
    var dividendsYear13 = function () {
        if ($scope.chkCashDividendsS1 === true)
            return $scope.SelectedScenario1.dividendsYear3;
        else
            return netIncomeYear13() * (dividendsRateYear13()/100);
    }

    var newCapitalYear13 = function () {
        return parseFloat($scope.SelectedScenario1.newCapitalYear3==null?0:$scope.SelectedScenario1.newCapitalYear3);
    }

    var bankEquityCapitalYear13 = function () {
        var bec = bankEquityCapitalYear12();
        var netInc = netIncomeYear13();
        var div = dividendsYear13();
        var newCap = newCapitalYear13();

        if (isNaN(bankEquityCapitalYear12()) === true)
            bec = 0;

        if (isNaN(netIncomeYear13()) === true)
            netInc = 0;

        if (isNaN(dividendsYear13()) === true)
            div = 0;

        if (isNaN(newCapitalYear13()) === true)
            newCap = 0;

        return bec + netInc - div + newCap;
    }

    var cet1CapitalAdjustmentYear13 = function () {
        return parseFloat($scope.Cet1CapitalAdjustmentPriorYear==null?0:$scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear13 = function () {
        if ($scope.chkTier1CapitalAdjustmentS1 === true)
            return $scope.SelectedScenario1.tier1CapitalAdjustmentYear3;
        else
            return parseFloat($scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : $scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear13 = function () {
        return bankEquityCapitalYear13() + cet1CapitalAdjustmentYear13() + tier1CapitalAdjustmentYear13();
    }

    var tier1CapitalYear13 = function () {
        return bankEquityCapitalYear13() + tier1CapitalAdjustmentYear13();
    }

    var tier2CapitalYear13 = function () {
        if ($scope.chkTier2CapitalS1 === true)
            return $scope.SelectedScenario1.tier2CapitalYear3;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear13();
    }

    var totalRiskBasedCapitalYear13 = function () {
        return tier1CapitalYear13() + tier2CapitalYear13();
    }

    var riskWeightedAssetsYear13 = function () {
        if ($scope.chkRiskWeightedAssetsS1 === true)
        {
            return $scope.SelectedScenario1.riskWeightedAssetsYear3;
        }
        else
        {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear13();
        }
    }

    var totalAssetsForLeverageYear13 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear13();
    }

    var cet1CapitalRatioYear13 = function () {
        return riskWeightedAssetsYear13()==0?null:cet1CapitalYear13() / riskWeightedAssetsYear13();
    }

    var tier1RBCRatioYear13 = function () {
        return (tier1CapitalYear13() / riskWeightedAssetsYear13()) * 100;
    }

    var totalRBCRatioYear13 = function () {
        return (totalRiskBasedCapitalYear13() / riskWeightedAssetsYear13()) * 100;
    }

    var tier1LeverageRatioYear13 = function () {
        return (tier1CapitalYear13() / totalAssetsForLeverageYear13());
    }

    var returnOnAverageEquityYear13 = function () {
        return (netIncomeYear13() / ((bankEquityCapitalYear12() + bankEquityCapitalYear13()) / 2)) * 100;
    }

    var mvEquityYear13 = function () {
        return bankEquityCapitalYear13() * 1.5;
    }

    var sharesOutstandingYear13 = function () {
        return parseFloat($scope.SelectedScenario1.sharesOutstandingActualYear3==null?0:$scope.SelectedScenario1.sharesOutstandingActualYear3);
    }

    var bvSharePriceYear13 = function () {
        return sharesOutstandingYear13()==0?null:bankEquityCapitalYear13() * 1000 / sharesOutstandingYear13();
    }

    var mvSharePriceYear13 = function () {
        return sharesOutstandingYear13()==0?null:mvEquityYear13() * 1000 / sharesOutstandingYear13();
    }

    var earningsPerSharePriceYear13 = function () {
        return sharesOutstandingYear13()==0?null:netIncomeYear13() * 1000 / sharesOutstandingYear13();
    }

    var earningsPerShare15PriceYear13 = function () {
        return earningsPerSharePriceYear13() * 15;
    }

    var earningsPerShare20PriceYear13 = function () {
        return earningsPerSharePriceYear13() * 20;
    }

    var dividendPerSharePriceYear13 = function () {
        return sharesOutstandingYear13()==0?null:dividendsYear13() * (-1000) / sharesOutstandingYear13();
    }

    // Year 4 Calculations for Column 1
    var assetGrowthRateYear14 = function () {
        return parseFloat($scope.SelectedScenario1.assetGrowthRateYear4==null?0:$scope.SelectedScenario1.assetGrowthRateYear4);
    }

    var newAcquisitionAssetsYear14 = function () {
        return parseFloat($scope.SelectedScenario1.newAcquisitionAssetsYear4==null?0:$scope.SelectedScenario1.newAcquisitionAssetsYear4);
    }

    var totalAssetsYear14 = function () {
        return ((totalAssetsYear13() * (1 + (assetGrowthRateYear14()/100))) + newAcquisitionAssetsYear14());
    }
            
    var returnOnAverageAssetsYear14 = function () {
        if ($scope.chkNetIncomeS1 === true) {
            return ((netIncomeYear14() / ((totalAssetsYear13() + totalAssetsYear14()) / 2))) * 100;
        }
        else
            return parseFloat($scope.SelectedScenario1.returnOnAverageAssetsYear4==null?0:$scope.SelectedScenario1.returnOnAverageAssetsYear4);
    }

    var netIncomeYear14 = function () {
        if ($scope.chkNetIncomeS1 === true)
            return $scope.SelectedScenario1.netIncomeYear4;
        else
            return ((totalAssetsYear13() + totalAssetsYear14()) / 2) * (returnOnAverageAssetsYear14()/100);
    }
            
    var dividendsRateYear14 = function () {
        return parseFloat($scope.SelectedScenario1.dividendsRateYear4==null?0:$scope.SelectedScenario1.dividendsRateYear4);
    }
            
    var dividendsYear14 = function () {
        if ($scope.chkCashDividendsS1 === true)
            return $scope.SelectedScenario1.dividendsYear4;
        else
            return netIncomeYear14() * (dividendsRateYear14()/100);
    }

    var newCapitalYear14 = function () {
        return parseFloat($scope.SelectedScenario1.newCapitalYear4==null?0:$scope.SelectedScenario1.newCapitalYear4);
    }

    var bankEquityCapitalYear14 = function () {
        return bankEquityCapitalYear13() + netIncomeYear14() - dividendsYear14() + newCapitalYear14();
    }

    var cet1CapitalAdjustmentYear14 = function () {
        return parseFloat($scope.Cet1CapitalAdjustmentPriorYear==null?0:$scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear14 = function () {
        if ($scope.chkTier1CapitalAdjustmentS1 === true)
            return $scope.SelectedScenario1.tier1CapitalAdjustmentYear4;
        else
            return parseFloat($scope.Tier1CapitalAdjustmentPriorYear==null?0:$scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear14 = function () {
        return bankEquityCapitalYear14() + cet1CapitalAdjustmentYear14() + tier1CapitalAdjustmentYear14();
    }

    var tier1CapitalYear14 = function () {
        return bankEquityCapitalYear14() + tier1CapitalAdjustmentYear14();
    }

    var tier2CapitalYear14 = function () {
        if ($scope.chkTier2CapitalS1 === true)
            return $scope.SelectedScenario1.tier2CapitalYear4;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear14();
    }

    var totalRiskBasedCapitalYear14 = function () {
        return tier1CapitalYear14() + tier2CapitalYear14();
    }

    var riskWeightedAssetsYear14 = function () {
        if ($scope.chkRiskWeightedAssetsS1 === true) {
            return $scope.SelectedScenario1.riskWeightedAssetsYear4;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear14();
        }
    }

    var totalAssetsForLeverageYear14 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear14();
    }

    var cet1CapitalRatioYear14 = function () {
        return riskWeightedAssetsYear14()==0?null:cet1CapitalYear14() / riskWeightedAssetsYear14();
    }

    var tier1RBCRatioYear14 = function () {
        return (tier1CapitalYear14() / riskWeightedAssetsYear14()) * 100;
    }

    var totalRBCRatioYear14 = function () {
        return (totalRiskBasedCapitalYear14() / riskWeightedAssetsYear14()) * 100;
    }

    var tier1LeverageRatioYear14 = function () {
        return (tier1CapitalYear14() / totalAssetsForLeverageYear14());
    }

    var returnOnAverageEquityYear14 = function () {
        return (netIncomeYear14() / ((bankEquityCapitalYear14() + bankEquityCapitalYear13()) / 2)) * 100;
    }

    var mvEquityYear14 = function () {
        return bankEquityCapitalYear14() * 1.5;
    }

    var sharesOutstandingYear14 = function () {
        return parseFloat($scope.SelectedScenario1.sharesOutstandingActualYear4==null?0:$scope.SelectedScenario1.sharesOutstandingActualYear4);
    }

    var bvSharePriceYear14 = function () {
        return sharesOutstandingYear14()==0?null:bankEquityCapitalYear14() * 1000 / sharesOutstandingYear14();
    }

    var mvSharePriceYear14 = function () {
        return sharesOutstandingYear14()==0?null:mvEquityYear14() * 1000 / sharesOutstandingYear14();
    }

    var earningsPerSharePriceYear14 = function () {
        return sharesOutstandingYear14()==0?null:netIncomeYear14() * 1000 / sharesOutstandingYear14();
    }

    var earningsPerShare15PriceYear14 = function () {
        return earningsPerSharePriceYear14() * 15;
    }

    var earningsPerShare20PriceYear14 = function () {
        return earningsPerSharePriceYear14() * 20;
    }

    var dividendPerSharePriceYear14 = function () {
        return sharesOutstandingYear14()==0?null:dividendsYear14() * (-1000) / sharesOutstandingYear14();
    }
            
    // Year 5 Calculations for Column 1
    var assetGrowthRateYear15 = function () {
        return $scope.SelectedScenario1.assetGrowthRateYear5==null?0:parseFloat($scope.SelectedScenario1.assetGrowthRateYear5);
    }

    var newAcquisitionAssetsYear15 = function () {
        return $scope.SelectedScenario1.newAcquisitionAssetsYear5==null?0:parseFloat($scope.SelectedScenario1.newAcquisitionAssetsYear5);
    }

    var totalAssetsYear15 = function () {
        return ((totalAssetsYear14() * (1 + (assetGrowthRateYear15()/100))) + newAcquisitionAssetsYear15());
    }
            
    var returnOnAverageAssetsYear15 = function () {
        if ($scope.chkNetIncomeS1 === true) {
            return ((netIncomeYear15() / ((totalAssetsYear14() + totalAssetsYear15()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario1.returnOnAverageAssetsYear5==null?0:parseFloat($scope.SelectedScenario1.returnOnAverageAssetsYear5);
    }

    var netIncomeYear15 = function () {
        if ($scope.chkNetIncomeS1 === true)
            return $scope.SelectedScenario1.netIncomeYear5;
        else
            return ((totalAssetsYear14() + totalAssetsYear15()) / 2) * (returnOnAverageAssetsYear15()/100);
    }
            
    var dividendsRateYear15 = function () {
        return $scope.SelectedScenario1.dividendsRateYear5==null?0:parseFloat($scope.SelectedScenario1.dividendsRateYear5);
    }
            
    var dividendsYear15 = function () {
        if ($scope.chkCashDividendsS1 === true)
            return $scope.SelectedScenario1.dividendsYear5;
        else
            return netIncomeYear15() * (dividendsRateYear15()/100);
    }

    var newCapitalYear15 = function () {
        return $scope.SelectedScenario1.newCapitalYear5==null?0:parseFloat($scope.SelectedScenario1.newCapitalYear5);
    }

    var bankEquityCapitalYear15 = function () {
        return bankEquityCapitalYear14() + netIncomeYear15() - dividendsYear15() + newCapitalYear15();
    }

    var cet1CapitalAdjustmentYear15 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear15 = function () {
        if ($scope.chkTier1CapitalAdjustmentS1 === true)
            return $scope.SelectedScenario1.tier1CapitalAdjustmentYear5;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear15 = function () {
        return bankEquityCapitalYear15() + cet1CapitalAdjustmentYear15() + tier1CapitalAdjustmentYear15();
    }

    var tier1CapitalYear15 = function () {
        return bankEquityCapitalYear15() + tier1CapitalAdjustmentYear15();
    }

    var tier2CapitalYear15 = function () {
        if ($scope.chkTier2CapitalS1 === true)
            return $scope.SelectedScenario1.tier2CapitalYear5;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear15();
    }

    var totalRiskBasedCapitalYear15 = function () {
        return tier1CapitalYear15() + tier2CapitalYear15();
    }

    var riskWeightedAssetsYear15 = function () {
        if ($scope.chkRiskWeightedAssetsS1 === true) {
            return $scope.SelectedScenario1.riskWeightedAssetsYear5;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear15();
        }
    }

    var totalAssetsForLeverageYear15 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear15();
    }

    var cet1CapitalRatioYear15 = function () {
        return riskWeightedAssetsYear15()==0?null:cet1CapitalYear15() / riskWeightedAssetsYear15();
    }

    var tier1RBCRatioYear15 = function () {
        return (tier1CapitalYear15() / riskWeightedAssetsYear15()) * 100;
    }

    var totalRBCRatioYear15 = function () {
        return (totalRiskBasedCapitalYear15() / riskWeightedAssetsYear15()) * 100;
    }

    var tier1LeverageRatioYear15 = function () {
        return (tier1CapitalYear15() / totalAssetsForLeverageYear15());
    }

    var returnOnAverageEquityYear15 = function () {
        return (netIncomeYear15() / ((bankEquityCapitalYear15() + bankEquityCapitalYear14()) / 2)) * 100;
    }

    var mvEquityYear15 = function () {
        return bankEquityCapitalYear15() * 1.5;
    }

    var sharesOutstandingYear15 = function () {
        return $scope.SelectedScenario1.sharesOutstandingActualYear5==null?0:parseFloat($scope.SelectedScenario1.sharesOutstandingActualYear5);
    }

    var bvSharePriceYear15 = function () {
        return sharesOutstandingYear15()==0?null:bankEquityCapitalYear15() * 1000 / sharesOutstandingYear15();
    }

    var mvSharePriceYear15 = function () {
        return sharesOutstandingYear15()==0?null:mvEquityYear15() * 1000 / sharesOutstandingYear15();
    }

    var earningsPerSharePriceYear15 = function () {
        return sharesOutstandingYear15()==0?null:netIncomeYear15() * 1000 / sharesOutstandingYear15();
    }

    var earningsPerShare15PriceYear15 = function () {
        return earningsPerSharePriceYear15() * 15;
    }

    var earningsPerShare20PriceYear15 = function () {
        return earningsPerSharePriceYear15() * 20;
    }

    var dividendPerSharePriceYear15 = function () {
        return sharesOutstandingYear15()==0?null:dividendsYear15() * (-1000) / sharesOutstandingYear15();
    }

    // Year 0 Calculations for Column 2
    var assetGrowthRateYear20 = function () {
        return $scope.SelectedScenario2.assetGrowthRateYear0==null?0:parseFloat($scope.SelectedScenario2.assetGrowthRateYear0);
    }

    var newAcquisitionAssetsYear20 = function () {
        if (typeof $scope.SelectedScenario2.newAcquisitionAssetsYear0 !== 'undefined' && $scope.SelectedScenario2.newAcquisitionAssetsYear0 !== null)
            return parseFloat($scope.SelectedScenario2.newAcquisitionAssetsYear0);
        else
            return 0;
    }

    var totalAssetsYear20 = function () {
        return (parseFloat($scope.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear20()/100))) + newAcquisitionAssetsYear20();
    }

    var returnOnAverageAssetsYear20 = function () {
        if ($scope.chkNetIncomeS2 === true) {
            return ((netIncomeYear20() / (($scope.TotalAssetsPriorYear + totalAssetsYear20()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario2.returnOnAverageAssetsYear0==null?0:parseFloat($scope.SelectedScenario2.returnOnAverageAssetsYear0);
    }

    var netIncomeYear20 = function () {
        if ($scope.chkNetIncomeS2 === true)
            return $scope.SelectedScenario2.netIncomeYear0;
        else
            return ((parseFloat($scope.TotalAssetsPriorYear) + totalAssetsYear20()) / 2) * (returnOnAverageAssetsYear20()/100);
    }

    var dividendsRateYear20 = function () {
        return $scope.SelectedScenario2.dividendsRateYear0==null?0:parseFloat($scope.SelectedScenario2.dividendsRateYear0);
    }

    var dividendsYear20 = function () {
        if ($scope.chkCashDividendsS2 === true)
            return $scope.SelectedScenario2.dividendsYear0;
        else
            return netIncomeYear20() * (dividendsRateYear20()/100);
    }

    var newCapitalYear20 = function () {
        return $scope.SelectedScenario2.newCapitalYear0==null?0:parseFloat($scope.SelectedScenario2.newCapitalYear0);
    }

    var bankEquityCapitalYear20 = function () {
        var netInc = netIncomeYear20();
        var div = dividendsYear20();
        var newCap = newCapitalYear20();
        if(typeof netInc === 'undefined' || netInc === null)
            netInc = 0;

        if(typeof div === 'undefined' || div === null)
            div = 0;

        if(typeof newCap === 'undefined' || newCap === null)
            newCap = 0;

        return parseFloat($scope.BankEquityCapitalPriorYear) + netInc - div + newCap;
    }

    var cet1CapitalAdjustmentYear20 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear20 = function () {
        if ($scope.chkTier1CapitalAdjustmentS2 === true)
            return $scope.SelectedScenario2.tier1CapitalAdjustmentYear0;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear20 = function () {
        return bankEquityCapitalYear20() + cet1CapitalAdjustmentYear20() + tier1CapitalAdjustmentYear20();
    }

    var tier1CapitalYear20 = function () {
        return bankEquityCapitalYear20() + tier1CapitalAdjustmentYear20();
    }

    var tier2CapitalYear20 = function () {
        if ($scope.chkTier2CapitalS2 === true)
            return $scope.SelectedScenario2.tier2CapitalYear0;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear20();
    }

    var totalRiskBasedCapitalYear20 = function () {
        return tier1CapitalYear20() + tier2CapitalYear20();
    }

    var riskWeightedAssetsYear20 = function () {
        if ($scope.chkRiskWeightedAssetsS2 === true) {
            return $scope.SelectedScenario2.riskWeightedAssetsYear0;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear20();
        }
    }

    var totalAssetsForLeverageYear20 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear20();
    }

    var cet1CapitalRatioYear20 = function () {
        return riskWeightedAssetsYear20()==0?null:cet1CapitalYear20() / riskWeightedAssetsYear20();
    }

    var tier1RBCRatioYear20 = function () {
        return (tier1CapitalYear20() / riskWeightedAssetsYear20()) * 100;
    }

    var totalRBCRatioYear20 = function () {
        return (totalRiskBasedCapitalYear20() / riskWeightedAssetsYear20()) * 100;
    }

    var tier1LeverageRatioYear20 = function () {
        return totalAssetsForLeverageYear20()==0?null:tier1CapitalYear20() / totalAssetsForLeverageYear20();
    }

    var returnOnAverageEquityYear20 = function () {
        return (netIncomeYear20() / ((bankEquityCapitalYear20() + parseFloat($scope.BankEquityCapitalPriorYear)) / 2)) * 100;
    }

    var mvEquityYear20 = function () {
        return bankEquityCapitalYear20() * 1.5;
    }

    var sharesOutstandingYear20 = function () {
        return $scope.SelectedScenario2.sharesOutstandingActualYear0==null?0:parseFloat($scope.SelectedScenario2.sharesOutstandingActualYear0);
    }

    var bvSharePriceYear20 = function () {
        return sharesOutstandingYear20()==0?null:bankEquityCapitalYear20() * 1000 / sharesOutstandingYear20();
    }

    var mvSharePriceYear20 = function () {
        return sharesOutstandingYear20()==0?null:mvEquityYear20() * 1000 / sharesOutstandingYear20();
    }

    var earningsPerSharePriceYear20 = function () {
        return sharesOutstandingYear20()==0?null:netIncomeYear20() * 1000 / sharesOutstandingYear20();
    }

    var earningsPerShare15PriceYear20 = function () {
        return earningsPerSharePriceYear20() * 15;
    }

    var earningsPerShare20PriceYear20 = function () {
        return earningsPerSharePriceYear20() * 20;
    }

    var dividendPerSharePriceYear20 = function () {
        return sharesOutstandingYear20()==0?null:dividendsYear20() * (-1000) / sharesOutstandingYear20();
    }

    // Year 1 Calculations for Column 2
    var assetGrowthRateYear21 = function () {
        return $scope.SelectedScenario2.assetGrowthRateYear1==null?0:parseFloat($scope.SelectedScenario2.assetGrowthRateYear1);
    }

    var newAcquisitionAssetsYear21 = function () {
        return $scope.SelectedScenario2.newAcquisitionAssetsYear1==null?0:parseFloat($scope.SelectedScenario2.newAcquisitionAssetsYear1);
    }

    var totalAssetsYear21 = function () {
        return (totalAssetsYear20() * (1 + (assetGrowthRateYear21()/100))) + newAcquisitionAssetsYear21();
    }
            
    var returnOnAverageAssetsYear21 = function () {
        if ($scope.chkNetIncomeS2 === true) {
            return ((netIncomeYear21() / ((totalAssetsYear20() + totalAssetsYear21()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario2.returnOnAverageAssetsYear1==null?0:parseFloat($scope.SelectedScenario2.returnOnAverageAssetsYear1);
    }

    var netIncomeYear21 = function () {
        if ($scope.chkNetIncomeS2 === true)
            return $scope.SelectedScenario2.netIncomeYear1;
        else
            return ((totalAssetsYear20() + totalAssetsYear21()) / 2) * (returnOnAverageAssetsYear21()/100);
    }
            
    var dividendsRateYear21 = function () {
        return $scope.SelectedScenario2.dividendsRateYear1==null?0:parseFloat($scope.SelectedScenario2.dividendsRateYear1);
    }
            
    var dividendsYear21 = function () {
        if ($scope.chkCashDividendsS2 === true)
            return $scope.SelectedScenario2.dividendsYear1;
        else
            return netIncomeYear21() * (dividendsRateYear21()/100);
    }

    var newCapitalYear21 = function () {
        return $scope.SelectedScenario2.newCapitalYear1==null?0:parseFloat($scope.SelectedScenario2.newCapitalYear1);
    }

    var bankEquityCapitalYear21 = function () {
        return bankEquityCapitalYear20() + netIncomeYear21() - dividendsYear21() + newCapitalYear21();
    }

    var cet1CapitalAdjustmentYear21 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear21 = function () {
        if ($scope.chkTier1CapitalAdjustmentS2 === true)
            return $scope.SelectedScenario2.tier1CapitalAdjustmentYear1;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear21 = function () {
        return bankEquityCapitalYear21() + cet1CapitalAdjustmentYear21() + tier1CapitalAdjustmentYear21();
    }

    var tier1CapitalYear21 = function () {
        return bankEquityCapitalYear21() + tier1CapitalAdjustmentYear21();
    }

    var tier2CapitalYear21 = function () {
        if ($scope.chkTier2CapitalS2 === true)
            return $scope.SelectedScenario2.tier2CapitalYear1;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear21();
    }

    var totalRiskBasedCapitalYear21 = function () {
        return tier1CapitalYear21() + tier2CapitalYear21();
    }

    var riskWeightedAssetsYear21 = function () {
        if ($scope.chkRiskWeightedAssetsS2 === true) {
            return $scope.SelectedScenario2.riskWeightedAssetsYear1;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear21();
        }
    }

    var totalAssetsForLeverageYear21 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear21();
    }

    var cet1CapitalRatioYear21 = function () {
        return riskWeightedAssetsYear21()==0?null:cet1CapitalYear21() / riskWeightedAssetsYear21();
    }

    var tier1RBCRatioYear21 = function () {
        return (tier1CapitalYear21() / riskWeightedAssetsYear21()) * 100;
    }

    var totalRBCRatioYear21 = function () {
        return (totalRiskBasedCapitalYear21() / riskWeightedAssetsYear21()) * 100;
    }

    var tier1LeverageRatioYear21 = function () {
        return (tier1CapitalYear21() / totalAssetsForLeverageYear21());
    }

    var returnOnAverageEquityYear21 = function () {
        return (netIncomeYear21() / ((bankEquityCapitalYear21() + bankEquityCapitalYear20()) / 2)) * 100;
    }

    var mvEquityYear21 = function () {
        return bankEquityCapitalYear21() * 1.5;
    }

    var sharesOutstandingYear21 = function () {
        return $scope.SelectedScenario2.sharesOutstandingActualYear1==null?0:parseFloat($scope.SelectedScenario2.sharesOutstandingActualYear1);
    }

    var bvSharePriceYear21 = function () {
        return sharesOutstandingYear21()==0?null:bankEquityCapitalYear21() * 1000 / sharesOutstandingYear21();
    }

    var mvSharePriceYear21 = function () {
        return sharesOutstandingYear21()==0?null:mvEquityYear21() * 1000 / sharesOutstandingYear21();
    }

    var earningsPerSharePriceYear21 = function () {
        return sharesOutstandingYear21()==0?null:netIncomeYear21() * 1000 / sharesOutstandingYear21();
    }

    var earningsPerShare15PriceYear21 = function () {
        return earningsPerSharePriceYear21() * 15;
    }

    var earningsPerShare20PriceYear21 = function () {
        return earningsPerSharePriceYear21() * 20;
    }

    var dividendPerSharePriceYear21 = function () {
        return sharesOutstandingYear21()==0?null:dividendsYear21() * (-1000) / sharesOutstandingYear21();
    }

    // Year 2 Calculations for Column 2
    var assetGrowthRateYear22 = function () {
        return $scope.SelectedScenario2.assetGrowthRateYear2==null?0:parseFloat($scope.SelectedScenario2.assetGrowthRateYear2);
    }

    var newAcquisitionAssetsYear22 = function () {
        return $scope.SelectedScenario2.newAcquisitionAssetsYear2==null?0:parseFloat($scope.SelectedScenario2.newAcquisitionAssetsYear2);
    }

    var totalAssetsYear22 = function () {
        return (totalAssetsYear21() * (1 + (assetGrowthRateYear22()/100))) + newAcquisitionAssetsYear22();
    }
            
    var returnOnAverageAssetsYear22 = function () {
        if ($scope.chkNetIncomeS2 === true) {
            return ((netIncomeYear22() / ((totalAssetsYear21() + totalAssetsYear22()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario2.returnOnAverageAssetsYear2==null?0:parseFloat($scope.SelectedScenario2.returnOnAverageAssetsYear2);
    }

    var netIncomeYear22 = function () {
        if ($scope.chkNetIncomeS2 === true)
            return $scope.SelectedScenario2.netIncomeYear2;
        else
            return ((totalAssetsYear21() + totalAssetsYear22()) / 2) * (returnOnAverageAssetsYear22()/100);
    }
            
    var dividendsRateYear22 = function () {
        return $scope.SelectedScenario2.dividendsRateYear2==null?0:parseFloat($scope.SelectedScenario2.dividendsRateYear2);
    }
            
    var dividendsYear22 = function () {
        if ($scope.chkCashDividendsS2 === true)
            return $scope.SelectedScenario2.dividendsYear2;
        else
            return netIncomeYear22() * (dividendsRateYear22()/100);
    }

    var newCapitalYear22 = function () {
        return $scope.SelectedScenario2.newCapitalYear2==null?0:parseFloat($scope.SelectedScenario2.newCapitalYear2);
    }

    var bankEquityCapitalYear22 = function () {
        return bankEquityCapitalYear21() + netIncomeYear22() - dividendsYear22() + newCapitalYear22();
    }

    var cet1CapitalAdjustmentYear22 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear22 = function () {
        if ($scope.chkTier1CapitalAdjustmentS2 === true)
            return $scope.SelectedScenario2.tier1CapitalAdjustmentYear2;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear22 = function () {
        return bankEquityCapitalYear22() + cet1CapitalAdjustmentYear22() + tier1CapitalAdjustmentYear22();
    }

    var tier1CapitalYear22 = function () {
        return bankEquityCapitalYear22() + tier1CapitalAdjustmentYear22();
    }

    var tier2CapitalYear22 = function () {
        if ($scope.chkTier2CapitalS2 === true)
            return $scope.SelectedScenario2.tier2CapitalYear2;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear22();
    }

    var totalRiskBasedCapitalYear22 = function () {
        return tier1CapitalYear22() + tier2CapitalYear22();
    }

    var riskWeightedAssetsYear22 = function () {
        if ($scope.chkRiskWeightedAssetsS2 === true) {
            return $scope.SelectedScenario2.riskWeightedAssetsYear2;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear22();
        }
    }

    var totalAssetsForLeverageYear22 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear22();
    }

    var cet1CapitalRatioYear22 = function () {
        return riskWeightedAssetsYear22()==0?null:cet1CapitalYear22() / riskWeightedAssetsYear22();
    }

    var tier1RBCRatioYear22 = function () {
        return (tier1CapitalYear22() / riskWeightedAssetsYear22()) * 100;
    }

    var totalRBCRatioYear22 = function () {
        return (totalRiskBasedCapitalYear22() / riskWeightedAssetsYear22()) * 100;
    }

    var tier1LeverageRatioYear22 = function () {
        return (tier1CapitalYear22() / totalAssetsForLeverageYear22());
    }

    var returnOnAverageEquityYear22 = function () {
        return (netIncomeYear22() / ((bankEquityCapitalYear22() + bankEquityCapitalYear21()) / 2)) * 100;
    }

    var mvEquityYear22 = function () {
        return bankEquityCapitalYear22() * 1.5;
    }

    var sharesOutstandingYear22 = function () {
        return $scope.SelectedScenario2.sharesOutstandingActualYear2==null?0:parseFloat($scope.SelectedScenario2.sharesOutstandingActualYear2);
    }

    var bvSharePriceYear22 = function () {
        return sharesOutstandingYear22()==0?null:bankEquityCapitalYear22() * 1000 / sharesOutstandingYear22();
    }

    var mvSharePriceYear22 = function () {
        return sharesOutstandingYear22()==0?null:mvEquityYear22() * 1000 / sharesOutstandingYear22();
    }

    var earningsPerSharePriceYear22 = function () {
        return sharesOutstandingYear22()==0?null:netIncomeYear22() * 1000 / sharesOutstandingYear22();
    }

    var earningsPerShare15PriceYear22 = function () {
        return earningsPerSharePriceYear22() * 15;
    }

    var earningsPerShare20PriceYear22 = function () {
        return earningsPerSharePriceYear22() * 20;
    }

    var dividendPerSharePriceYear22 = function () {
        return sharesOutstandingYear22()==0?null:dividendsYear22() * (-1000) / sharesOutstandingYear22();
    }
            
    // Year 3 Calculations for Column 2
    var assetGrowthRateYear23 = function () {
        return $scope.SelectedScenario2.assetGrowthRateYear3==null?0:parseFloat($scope.SelectedScenario2.assetGrowthRateYear3);
    }

    var newAcquisitionAssetsYear23 = function () {
        return $scope.SelectedScenario2.newAcquisitionAssetsYear3==null?0:parseFloat($scope.SelectedScenario2.newAcquisitionAssetsYear3);
    }

    var totalAssetsYear23 = function () {
        return (totalAssetsYear22() * (1 + (assetGrowthRateYear23()/100))) + newAcquisitionAssetsYear23();
    }
            
    var returnOnAverageAssetsYear23 = function () {
        if ($scope.chkNetIncomeS2 === true) {
            return (netIncomeYear23() / ((totalAssetsYear22() + totalAssetsYear23()) / 2)) * 100;
        }
        else
            return $scope.SelectedScenario2.returnOnAverageAssetsYear3==null?0:parseFloat($scope.SelectedScenario2.returnOnAverageAssetsYear3);
    }

    var netIncomeYear23 = function () {
        if ($scope.chkNetIncomeS2 === true)
            return $scope.SelectedScenario2.netIncomeYear3;
        else
            return ((totalAssetsYear22() + totalAssetsYear23()) / 2) * (returnOnAverageAssetsYear23()/100);
    }
            
    var dividendsRateYear23 = function () {
        return $scope.SelectedScenario2.dividendsRateYear3==null?0:parseFloat($scope.SelectedScenario2.dividendsRateYear3);
    }
            
    var dividendsYear23 = function () {
        if ($scope.chkCashDividendsS2 === true)
            return $scope.SelectedScenario2.dividendsYear3;
        else
            return netIncomeYear23() * (dividendsRateYear23()/100);
    }

    var newCapitalYear23 = function () {
        return $scope.SelectedScenario2.newCapitalYear3==null?0:parseFloat($scope.SelectedScenario2.newCapitalYear3);
    }

    var bankEquityCapitalYear23 = function () {
        var bec = bankEquityCapitalYear22();
        var netInc = netIncomeYear23();
        var div = dividendsYear23();
        var newCap = newCapitalYear23();
        if (typeof bec === 'undefined' || bec === null)
            bec = 0;

        if (typeof netInc === 'undefined' || netInc === null)
            netInc = 0;

        if (typeof div === 'undefined' || div === null)
            div = 0;

        if (typeof newCap === 'undefined' || newCap === null)
            newCap = 0;

        return bec + netInc - div + newCap;
    }

    var cet1CapitalAdjustmentYear23 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear23 = function () {
        if ($scope.chkTier1CapitalAdjustmentS2 === true)
            return $scope.SelectedScenario2.tier1CapitalAdjustmentYear3;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear23 = function () {
        return bankEquityCapitalYear23() + cet1CapitalAdjustmentYear23() + tier1CapitalAdjustmentYear23();
    }

    var tier1CapitalYear23 = function () {
        return bankEquityCapitalYear23() + tier1CapitalAdjustmentYear23();
    }

    var tier2CapitalYear23 = function () {
        if ($scope.chkTier2CapitalS2 === true)
            return $scope.SelectedScenario2.tier2CapitalYear3;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear23();
    }

    var totalRiskBasedCapitalYear23 = function () {
        return tier1CapitalYear23() + tier2CapitalYear23();
    }

    var riskWeightedAssetsYear23 = function () {
        if ($scope.chkRiskWeightedAssetsS2 === true) {
            return $scope.SelectedScenario2.riskWeightedAssetsYear3;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear23();
        }
    }

    var totalAssetsForLeverageYear23 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear23();
    }

    var cet1CapitalRatioYear23 = function () {
        return riskWeightedAssetsYear23()==0?null:cet1CapitalYear23() / riskWeightedAssetsYear23();
    }

    var tier1RBCRatioYear23 = function () {
        return (tier1CapitalYear23() / riskWeightedAssetsYear23()) * 100;
    }

    var totalRBCRatioYear23 = function () {
        return (totalRiskBasedCapitalYear23() / riskWeightedAssetsYear23()) * 100;
    }

    var tier1LeverageRatioYear23 = function () {
        return (tier1CapitalYear23() / totalAssetsForLeverageYear23());
    }

    var returnOnAverageEquityYear23 = function () {
        return (netIncomeYear23() / ((bankEquityCapitalYear22() + bankEquityCapitalYear23()) / 2)) * 100;
    }

    var mvEquityYear23 = function () {
        return bankEquityCapitalYear23() * 1.5;
    }

    var sharesOutstandingYear23 = function () {
        return $scope.SelectedScenario2.sharesOutstandingActualYear3==null?0:parseFloat($scope.SelectedScenario2.sharesOutstandingActualYear3);
    }

    var bvSharePriceYear23 = function () {
        return sharesOutstandingYear23()==0?null:bankEquityCapitalYear23() * 1000 / sharesOutstandingYear23();
    }

    var mvSharePriceYear23 = function () {
        return sharesOutstandingYear23()==0?null:mvEquityYear23() * 1000 / sharesOutstandingYear23();
    }

    var earningsPerSharePriceYear23 = function () {
        return sharesOutstandingYear23()==0?null:netIncomeYear23() * 1000 / sharesOutstandingYear23();
    }

    var earningsPerShare15PriceYear23 = function () {
        return earningsPerSharePriceYear23() * 15;
    }

    var earningsPerShare20PriceYear23 = function () {
        return earningsPerSharePriceYear23() * 20;
    }

    var dividendPerSharePriceYear23 = function () {
        return sharesOutstandingYear23()==0?null:dividendsYear23() * (-1000) / sharesOutstandingYear23();
    }
            
    // Year 4 Calculations for Column 2
    var assetGrowthRateYear24 = function () {
        return $scope.SelectedScenario2.assetGrowthRateYear4==null?0:parseFloat($scope.SelectedScenario2.assetGrowthRateYear4);
    }

    var newAcquisitionAssetsYear24 = function () {
        return $scope.SelectedScenario2.newAcquisitionAssetsYear4==null?0:parseFloat($scope.SelectedScenario2.newAcquisitionAssetsYear4);
    }

    var totalAssetsYear24 = function () {
        return (totalAssetsYear23() * (1 + (assetGrowthRateYear24()/100))) + newAcquisitionAssetsYear24();
    }
            
    var returnOnAverageAssetsYear24 = function () {
        if ($scope.chkNetIncomeS2 === true) {
            return ((netIncomeYear24() / ((totalAssetsYear23() + totalAssetsYear24()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario2.returnOnAverageAssetsYear4==null?0:parseFloat($scope.SelectedScenario2.returnOnAverageAssetsYear4);
    }

    var netIncomeYear24 = function () {
        if ($scope.chkNetIncomeS2 === true)
            return $scope.SelectedScenario2.netIncomeYear4;
        else
            return ((totalAssetsYear23() + totalAssetsYear24()) / 2) * (returnOnAverageAssetsYear24()/100);
    }
            
    var dividendsRateYear24 = function () {
        return $scope.SelectedScenario2.dividendsRateYear4==null?0:parseFloat($scope.SelectedScenario2.dividendsRateYear4);
    }
            
    var dividendsYear24 = function () {
        if ($scope.chkCashDividendsS2 === true)
            return $scope.SelectedScenario2.dividendsYear4;
        else
            return netIncomeYear24() * (dividendsRateYear24()/100);
    }

    var newCapitalYear24 = function () {
        return $scope.SelectedScenario2.newCapitalYear4==null?0:parseFloat($scope.SelectedScenario2.newCapitalYear4);
    }

    var bankEquityCapitalYear24 = function () {
        return bankEquityCapitalYear23() + netIncomeYear24() - dividendsYear24() + newCapitalYear24();
    }

    var cet1CapitalAdjustmentYear24 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear24 = function () {
        if ($scope.chkTier1CapitalAdjustmentS2 === true)
            return $scope.SelectedScenario2.tier1CapitalAdjustmentYear4;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear24 = function () {
        return bankEquityCapitalYear24() + cet1CapitalAdjustmentYear24() + tier1CapitalAdjustmentYear24();
    }

    var tier1CapitalYear24 = function () {
        return bankEquityCapitalYear24() + tier1CapitalAdjustmentYear24();
    }

    var tier2CapitalYear24 = function () {
        if ($scope.chkTier2CapitalS2 === true)
            return $scope.SelectedScenario2.tier2CapitalYear4;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear24();
    }

    var totalRiskBasedCapitalYear24 = function () {
        return tier1CapitalYear24() + tier2CapitalYear24();
    }

    var riskWeightedAssetsYear24 = function () {
        if ($scope.chkRiskWeightedAssetsS2 === true) {
            return $scope.SelectedScenario2.riskWeightedAssetsYear4;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear24();
        }
    }

    var totalAssetsForLeverageYear24 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear24();
    }

    var cet1CapitalRatioYear24 = function () {
        return riskWeightedAssetsYear24()==0?null:cet1CapitalYear24() / riskWeightedAssetsYear24();
    }

    var tier1RBCRatioYear24 = function () {
        return (tier1CapitalYear24() / riskWeightedAssetsYear24()) * 100;
    }

    var totalRBCRatioYear24 = function () {
        return (totalRiskBasedCapitalYear24() / riskWeightedAssetsYear24()) * 100;
    }

    var tier1LeverageRatioYear24 = function () {
        return (tier1CapitalYear24() / totalAssetsForLeverageYear24());
    }

    var returnOnAverageEquityYear24 = function () {
        return (netIncomeYear24() / ((bankEquityCapitalYear23() + bankEquityCapitalYear24()) / 2)) * 100;
    }

    var mvEquityYear24 = function () {
        return bankEquityCapitalYear24() * 1.5;
    }

    var sharesOutstandingYear24 = function () {
        return $scope.SelectedScenario2.sharesOutstandingActualYear4==null?0:parseFloat($scope.SelectedScenario2.sharesOutstandingActualYear4);
    }

    var bvSharePriceYear24 = function () {
        return sharesOutstandingYear24()==0?null:bankEquityCapitalYear24() * 1000 / sharesOutstandingYear24();
    }

    var mvSharePriceYear24 = function () {
        return sharesOutstandingYear24()==0?null:mvEquityYear24() * 1000 / sharesOutstandingYear24();
    }

    var earningsPerSharePriceYear24 = function () {
        return sharesOutstandingYear24()==0?null:netIncomeYear24() * 1000 / sharesOutstandingYear24();
    }

    var earningsPerShare15PriceYear24 = function () {
        return earningsPerSharePriceYear24() * 15;
    }

    var earningsPerShare20PriceYear24 = function () {
        return earningsPerSharePriceYear24() * 20;
    }

    var dividendPerSharePriceYear24 = function () {
        return sharesOutstandingYear24()==0?null:dividendsYear24() * (-1000) / sharesOutstandingYear24();
    }
            
    // Year 5 Calculations for Column 2
    var assetGrowthRateYear25 = function () {
        return $scope.SelectedScenario2.assetGrowthRateYear5==null?0:parseFloat($scope.SelectedScenario2.assetGrowthRateYear5);
    }

    var newAcquisitionAssetsYear25 = function () {
        return $scope.SelectedScenario2.newAcquisitionAssetsYear5==null?0:parseFloat($scope.SelectedScenario2.newAcquisitionAssetsYear5);
    }

    var totalAssetsYear25 = function () {
        return (totalAssetsYear24() * (1 + (assetGrowthRateYear25()/100))) + newAcquisitionAssetsYear25();
    }
            
    var returnOnAverageAssetsYear25 = function () {
        if ($scope.chkNetIncomeS2 === true) {
            return ((netIncomeYear25() / ((totalAssetsYear24() + totalAssetsYear25()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario2.returnOnAverageAssetsYear5==null?0:parseFloat($scope.SelectedScenario2.returnOnAverageAssetsYear5);
    }

    var netIncomeYear25 = function () {
        if ($scope.chkNetIncomeS2 === true)
            return $scope.SelectedScenario2.netIncomeYear5;
        else
            return ((totalAssetsYear24() + totalAssetsYear25()) / 2) * (returnOnAverageAssetsYear25()/100);
    }
            
    var dividendsRateYear25 = function () {
        return $scope.SelectedScenario2.dividendsRateYear5==null?0:parseFloat($scope.SelectedScenario2.dividendsRateYear5);
    }
            
    var dividendsYear25 = function () {
        if ($scope.chkCashDividendsS2 === true)
            return $scope.SelectedScenario2.dividendsYear5;
        else
            return netIncomeYear25() * (dividendsRateYear25()/100);
    }

    var newCapitalYear25 = function () {
        return $scope.SelectedScenario2.newCapitalYear5==null?0:parseFloat($scope.SelectedScenario2.newCapitalYear5);
    }

    var bankEquityCapitalYear25 = function () {
        return bankEquityCapitalYear24() + netIncomeYear25() - dividendsYear25() + newCapitalYear25();
    }

    var cet1CapitalAdjustmentYear25 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear25 = function () {
        if ($scope.chkTier1CapitalAdjustmentS2 === true)
            return $scope.SelectedScenario2.tier1CapitalAdjustmentYear5;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear25 = function () {
        return bankEquityCapitalYear25() + cet1CapitalAdjustmentYear25() + tier1CapitalAdjustmentYear25();
    }

    var tier1CapitalYear25 = function () {
        return bankEquityCapitalYear25() + tier1CapitalAdjustmentYear25();
    }

    var tier2CapitalYear25 = function () {
        if ($scope.chkTier2CapitalS2 === true)
            return $scope.SelectedScenario2.tier2CapitalYear5;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear25();
    }

    var totalRiskBasedCapitalYear25 = function () {
        return tier1CapitalYear25() + tier2CapitalYear25();
    }

    var riskWeightedAssetsYear25 = function () {
        if ($scope.chkRiskWeightedAssetsS2 === true) {
            return $scope.SelectedScenario2.riskWeightedAssetsYear5;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear25();
        }
    }

    var totalAssetsForLeverageYear25 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear25();
    }

    var cet1CapitalRatioYear25 = function () {
        return riskWeightedAssetsYear25()==0?null:cet1CapitalYear25() / riskWeightedAssetsYear25();
    }

    var tier1RBCRatioYear25 = function () {
        return (tier1CapitalYear25() / riskWeightedAssetsYear25()) * 100;
    }

    var totalRBCRatioYear25 = function () {
        return (totalRiskBasedCapitalYear25() / riskWeightedAssetsYear25()) * 100;
    }

    var tier1LeverageRatioYear25 = function () {
        return (tier1CapitalYear25() / totalAssetsForLeverageYear25());
    }

    var returnOnAverageEquityYear25 = function () {
        return (netIncomeYear25() / ((bankEquityCapitalYear24() + bankEquityCapitalYear25()) / 2)) * 100;
    }

    var mvEquityYear25 = function () {
        return bankEquityCapitalYear25() * 1.5;
    }

    var sharesOutstandingYear25 = function () {
        return $scope.SelectedScenario2.sharesOutstandingActualYear5==null?0:parseFloat($scope.SelectedScenario2.sharesOutstandingActualYear5);
    }

    var bvSharePriceYear25 = function () {
        return sharesOutstandingYear25()==0?null:bankEquityCapitalYear25() * 1000 / sharesOutstandingYear25();
    }

    var mvSharePriceYear25 = function () {
        return sharesOutstandingYear25()==0?null:mvEquityYear25() * 1000 / sharesOutstandingYear25();
    }

    var earningsPerSharePriceYear25 = function () {
        return sharesOutstandingYear25()==0?null:netIncomeYear25() * 1000 / sharesOutstandingYear25();
    }

    var earningsPerShare15PriceYear25 = function () {
        return earningsPerSharePriceYear25() * 15;
    }

    var earningsPerShare20PriceYear25 = function () {
        return earningsPerSharePriceYear25() * 20;
    }

    var dividendPerSharePriceYear25 = function () {
        return sharesOutstandingYear25()==0?null:dividendsYear25() * (-1000) / sharesOutstandingYear25();
    }

    // Year 0 Calculations for Column 3
    var assetGrowthRateYear30 = function () {
        return $scope.SelectedScenario3.assetGrowthRateYear0==null?0:parseFloat($scope.SelectedScenario3.assetGrowthRateYear0);
    }

    var newAcquisitionAssetsYear30 = function () {
        if (typeof $scope.SelectedScenario3.newAcquisitionAssetsYear0 !== 'undefined' && $scope.SelectedScenario3.newAcquisitionAssetsYear0 !== null)
            return parseFloat($scope.SelectedScenario3.newAcquisitionAssetsYear0);
        else
            return 0;
    }

    var totalAssetsYear30 = function () {
        return parseFloat($scope.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear30()/100)) + newAcquisitionAssetsYear30();
    }
            
    var returnOnAverageAssetsYear30 = function () {
        if ($scope.chkNetIncomeS3 === true) {
            return ((netIncomeYear30() / (($scope.TotalAssetsPriorYear + totalAssetsYear30()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario3.returnOnAverageAssetsYear0==null?0:parseFloat($scope.SelectedScenario3.returnOnAverageAssetsYear0);
    }

    var netIncomeYear30 = function () {
        if ($scope.chkNetIncomeS3 === true)
            return $scope.SelectedScenario3.netIncomeYear0;
        else
            return ((parseFloat($scope.TotalAssetsPriorYear) + totalAssetsYear30()) / 2) * (returnOnAverageAssetsYear30()/100);
    }
            
    var dividendsRateYear30 = function () {
        return $scope.SelectedScenario3.dividendsRateYear0==null?0:parseFloat($scope.SelectedScenario3.dividendsRateYear0);
    }
            
    var dividendsYear30 = function () {
        if ($scope.chkCashDividendsS3 === true)
            return $scope.SelectedScenario3.dividendsYear0;
        else
            return netIncomeYear30() * (dividendsRateYear30()/100);
    }

    var newCapitalYear30 = function () {
        return $scope.SelectedScenario3.newCapitalYear0==null?0:parseFloat($scope.SelectedScenario3.newCapitalYear0);
    }

    var bankEquityCapitalYear30 = function () {
        return parseFloat($scope.BankEquityCapitalPriorYear) + netIncomeYear30() - dividendsYear30() + newCapitalYear30();
    }

    var cet1CapitalAdjustmentYear30 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear30 = function () {
        if ($scope.chkTier1CapitalAdjustmentS3 === true)
            return $scope.SelectedScenario3.tier1CapitalAdjustmentYear0;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear30 = function () {
        return bankEquityCapitalYear30() + cet1CapitalAdjustmentYear30() + tier1CapitalAdjustmentYear30();
    }

    var tier1CapitalYear30 = function () {
        return bankEquityCapitalYear30() + tier1CapitalAdjustmentYear30();
    }

    var tier2CapitalYear30 = function () {
        if ($scope.chkTier2CapitalS3 === true)
            return $scope.SelectedScenario3.tier2CapitalYear0;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear30();
    }

    var totalRiskBasedCapitalYear30 = function () {
        return tier1CapitalYear30() + tier2CapitalYear30();
    }

    var riskWeightedAssetsYear30 = function () {
        if ($scope.chkRiskWeightedAssetsS3 === true) {
            return $scope.SelectedScenario3.riskWeightedAssetsYear0;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear30();
        }
    }

    var totalAssetsForLeverageYear30 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear30();
    }

    var cet1CapitalRatioYear30 = function () {
        return riskWeightedAssetsYear30() == 0 ? null : cet1CapitalYear30() / riskWeightedAssetsYear30();
    }

    var tier1RBCRatioYear30 = function () {
        return (tier1CapitalYear30() / riskWeightedAssetsYear30()) * 100;
    }

    var totalRBCRatioYear30 = function () {
        return (totalRiskBasedCapitalYear30() / riskWeightedAssetsYear30()) * 100;
    }

    var tier1LeverageRatioYear30 = function () {
        return totalAssetsForLeverageYear30()==0?null:tier1CapitalYear30() / totalAssetsForLeverageYear30();
    }

    var returnOnAverageEquityYear30 = function () {
        return (netIncomeYear30() / ((bankEquityCapitalYear30() + parseFloat($scope.BankEquityCapitalPriorYear)) / 2)) * 100;
    }

    var mvEquityYear30 = function () {
        return bankEquityCapitalYear30() * 1.5;
    }

    var sharesOutstandingYear30 = function () {
        return $scope.SelectedScenario3.sharesOutstandingActualYear0==null?0:parseFloat($scope.SelectedScenario3.sharesOutstandingActualYear0);
    }

    var bvSharePriceYear30 = function () {
        return sharesOutstandingYear30()==0?null:bankEquityCapitalYear30() * 1000 / sharesOutstandingYear30();
    }

    var mvSharePriceYear30 = function () {
        return sharesOutstandingYear30()==0?null:mvEquityYear30() * 1000 / sharesOutstandingYear30();
    }

    var earningsPerSharePriceYear30 = function () {
        return sharesOutstandingYear30()==0?null:netIncomeYear30() * 1000 / sharesOutstandingYear30();
    }

    var earningsPerShare15PriceYear30 = function () {
        return earningsPerSharePriceYear30() * 15;
    }

    var earningsPerShare20PriceYear30 = function () {
        return earningsPerSharePriceYear30() * 20;
    }

    var dividendPerSharePriceYear30 = function () {
        return sharesOutstandingYear30()==0?null:dividendsYear30() * (-1000) / sharesOutstandingYear30();
    }
            
    // Year 1 Calculations for Column 3
    var assetGrowthRateYear31 = function () {
        return $scope.SelectedScenario3.assetGrowthRateYear1==null?0:parseFloat($scope.SelectedScenario3.assetGrowthRateYear1);
    }

    var newAcquisitionAssetsYear31 = function () {
        return $scope.SelectedScenario3.newAcquisitionAssetsYear1==null?0:parseFloat($scope.SelectedScenario3.newAcquisitionAssetsYear1);
    }

    var totalAssetsYear31 = function () {
        return (totalAssetsYear30() * (1+ (assetGrowthRateYear31()/100))) + newAcquisitionAssetsYear31();
    }
            
    var returnOnAverageAssetsYear31 = function () {
        if ($scope.chkNetIncomeS3 === true) {
            return ((netIncomeYear31() / ((totalAssetsYear30() + totalAssetsYear31()) / 2))) * 100;
        }
        else
            return parseFloat($scope.SelectedScenario3.returnOnAverageAssetsYear1);
    }

    var netIncomeYear31 = function () {
        if ($scope.chkNetIncomeS3 === true)
            return $scope.SelectedScenario3.netIncomeYear1;
        else
            return ((totalAssetsYear30() + totalAssetsYear31()) / 2) * (returnOnAverageAssetsYear31()/100);
    }
            
    var dividendsRateYear31 = function () {
        return $scope.SelectedScenario3.dividendsRateYear1==null?0:parseFloat($scope.SelectedScenario3.dividendsRateYear1);
    }
            
    var dividendsYear31 = function () {
        if ($scope.chkCashDividendsS3 === true)
            return $scope.SelectedScenario3.dividendsYear1;
        else
            return netIncomeYear31() * (dividendsRateYear31()/100);
    }

    var newCapitalYear31 = function () {
        return $scope.SelectedScenario3.newCapitalYear1==null?0:parseFloat($scope.SelectedScenario3.newCapitalYear1);
    }

    var bankEquityCapitalYear31 = function () {
        return bankEquityCapitalYear30() + netIncomeYear31() - dividendsYear31() + newCapitalYear31();
    }

    var cet1CapitalAdjustmentYear31 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear31 = function () {
        if ($scope.chkTier1CapitalAdjustmentS3 === true)
            return $scope.SelectedScenario3.tier1CapitalAdjustmentYear1;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear31 = function () {
        return bankEquityCapitalYear31() + cet1CapitalAdjustmentYear31() + tier1CapitalAdjustmentYear31();
    }

    var tier1CapitalYear31 = function () {
        return bankEquityCapitalYear31() + tier1CapitalAdjustmentYear31();
    }

    var tier2CapitalYear31 = function () {
        if ($scope.chkTier2CapitalS3 === true)
            return $scope.SelectedScenario3.tier2CapitalYear1;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear31();
    }

    var totalRiskBasedCapitalYear31 = function () {
        return tier1CapitalYear31() + tier2CapitalYear31();
    }

    var riskWeightedAssetsYear31 = function () {
        if ($scope.chkRiskWeightedAssetsS3 === true) {
            return $scope.SelectedScenario3.riskWeightedAssetsYear1;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear31();
        }
    }

    var totalAssetsForLeverageYear31 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear31();
    }

    var cet1CapitalRatioYear31 = function () {
        return riskWeightedAssetsYear31()==0?null:cet1CapitalYear31() / riskWeightedAssetsYear31();
    }

    var tier1RBCRatioYear31 = function () {
        return (tier1CapitalYear31() / riskWeightedAssetsYear31()) * 100;
    }

    var totalRBCRatioYear31 = function () {
        return (totalRiskBasedCapitalYear31() / riskWeightedAssetsYear31()) * 100;
    }

    var tier1LeverageRatioYear31 = function () {
        return (tier1CapitalYear31() / totalAssetsForLeverageYear31());
    }
    
    var returnOnAverageEquityYear31 = function () {
        return (netIncomeYear31() / ((bankEquityCapitalYear31() + bankEquityCapitalYear30()) / 2) * 100);
    }

    var mvEquityYear31 = function () {
        return bankEquityCapitalYear31() * 1.5;
    }

    var sharesOutstandingYear31 = function () {
        return $scope.SelectedScenario3.sharesOutstandingActualYear1==null?0:parseFloat($scope.SelectedScenario3.sharesOutstandingActualYear1);
    }

    var bvSharePriceYear31 = function () {
        return sharesOutstandingYear31()==0?null:bankEquityCapitalYear31() * 1000 / sharesOutstandingYear31();
    }

    var mvSharePriceYear31 = function () {
        return sharesOutstandingYear31()==0?null:mvEquityYear31() * 1000 / sharesOutstandingYear31();
    }

    var earningsPerSharePriceYear31 = function () {
        return sharesOutstandingYear31()==0?null:netIncomeYear31() * 1000 / sharesOutstandingYear31();
    }

    var earningsPerShare15PriceYear31 = function () {
        return earningsPerSharePriceYear31() * 15;
    }

    var earningsPerShare20PriceYear31 = function () {
        return earningsPerSharePriceYear31() * 20;
    }

    var dividendPerSharePriceYear31 = function () {
        return sharesOutstandingYear31()==0?null:dividendsYear31() * (-1000) / sharesOutstandingYear31();
    }
            
    // Year 2 Calculations for Column 3
    var assetGrowthRateYear32 = function () {
        return $scope.SelectedScenario3.assetGrowthRateYear2==null?0:parseFloat($scope.SelectedScenario3.assetGrowthRateYear2);
    }

    var newAcquisitionAssetsYear32 = function () {
        return $scope.SelectedScenario3.newAcquisitionAssetsYear2==null?0:parseFloat($scope.SelectedScenario3.newAcquisitionAssetsYear2);
    }

    var totalAssetsYear32 = function () {
        return (totalAssetsYear31() * (1 + (assetGrowthRateYear32()/100))) + newAcquisitionAssetsYear32();
    }
            
    var returnOnAverageAssetsYear32 = function () {
        if ($scope.chkNetIncomeS3 === true) {
            return ((netIncomeYear32() / ((totalAssetsYear31() + totalAssetsYear32()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario3.returnOnAverageAssetsYear2==null?0:parseFloat($scope.SelectedScenario3.returnOnAverageAssetsYear2);
    }

    var netIncomeYear32 = function () {
        if ($scope.chkNetIncomeS3 === true)
            return $scope.SelectedScenario3.netIncomeYear2;
        else
            return ((totalAssetsYear31() + totalAssetsYear32()) / 2) * (returnOnAverageAssetsYear32()/100);
    }
            
    var dividendsRateYear32 = function () {
        return $scope.SelectedScenario3.dividendsRateYear2==null?0:parseFloat($scope.SelectedScenario3.dividendsRateYear2);
    }
            
    var dividendsYear32 = function () {
        if ($scope.chkCashDividendsS3 === true)
            return $scope.SelectedScenario3.dividendsYear2;
        else
            return netIncomeYear32() * (dividendsRateYear32()/100);
    }

    var newCapitalYear32 = function () {
        return $scope.SelectedScenario3.newCapitalYear2==null?0:parseFloat($scope.SelectedScenario3.newCapitalYear2);
    }

    var bankEquityCapitalYear32 = function () {
        return bankEquityCapitalYear31() + netIncomeYear32() - dividendsYear32() + newCapitalYear32();
    }

    var cet1CapitalAdjustmentYear32 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear32 = function () {
        if ($scope.chkTier1CapitalAdjustmentS3 === true)
            return $scope.SelectedScenario3.tier1CapitalAdjustmentYear2;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear32 = function () {
        return bankEquityCapitalYear32() + cet1CapitalAdjustmentYear32() + tier1CapitalAdjustmentYear32();
    }

    var tier1CapitalYear32 = function () {
        return bankEquityCapitalYear32() + tier1CapitalAdjustmentYear32();
    }

    var tier2CapitalYear32 = function () {
        if ($scope.chkTier2CapitalS3 === true)
            return $scope.SelectedScenario3.tier2CapitalYear2;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear32();
    }

    var totalRiskBasedCapitalYear32 = function () {
        return tier1CapitalYear32() + tier2CapitalYear32();
    }

    var riskWeightedAssetsYear32 = function () {
        if ($scope.chkRiskWeightedAssetsS3 === true) {
            return $scope.SelectedScenario3.riskWeightedAssetsYear2;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear32();
        }
    }

    var totalAssetsForLeverageYear32 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear32();
    }

    var cet1CapitalRatioYear32 = function () {
        return riskWeightedAssetsYear32()==0?null:cet1CapitalYear32() / riskWeightedAssetsYear32();
    }

    var tier1RBCRatioYear32 = function () {
        return (tier1CapitalYear32() / riskWeightedAssetsYear32()) * 100;
    }

    var totalRBCRatioYear32 = function () {
        return (totalRiskBasedCapitalYear32() / riskWeightedAssetsYear32()) * 100;
    }

    var tier1LeverageRatioYear32 = function () {
        return (tier1CapitalYear32() / totalAssetsForLeverageYear32());
    }

    var returnOnAverageEquityYear32 = function () {
        return (netIncomeYear32() / ((bankEquityCapitalYear32() + bankEquityCapitalYear31()) / 2)) * 100;
    }

    var mvEquityYear32 = function () {
        return bankEquityCapitalYear32() * 1.5;
    }

    var sharesOutstandingYear32 = function () {
        return $scope.SelectedScenario3.sharesOutstandingActualYear2==null?0:parseFloat($scope.SelectedScenario3.sharesOutstandingActualYear2);
    }

    var bvSharePriceYear32 = function () {
        return sharesOutstandingYear32()==0?null:bankEquityCapitalYear32() * 1000 / sharesOutstandingYear32();
    }

    var mvSharePriceYear32 = function () {
        return sharesOutstandingYear32()==0?null:mvEquityYear32() * 1000 / sharesOutstandingYear32();
    }

    var earningsPerSharePriceYear32 = function () {
        return sharesOutstandingYear32()==0?null:netIncomeYear32() * 1000 / sharesOutstandingYear32();
    }

    var earningsPerShare15PriceYear32 = function () {
        return earningsPerSharePriceYear32() * 15;
    }

    var earningsPerShare20PriceYear32 = function () {
        return earningsPerSharePriceYear32() * 20;
    }

    var dividendPerSharePriceYear32 = function () {
        return sharesOutstandingYear32()==0?null:dividendsYear32() * (-1000) / sharesOutstandingYear32();
    }
            
    // Year 3 Calculations for Column 3
    var assetGrowthRateYear33 = function () {
        return $scope.SelectedScenario3.assetGrowthRateYear3==null?0:parseFloat($scope.SelectedScenario3.assetGrowthRateYear3);
    }

    var newAcquisitionAssetsYear33 = function () {
        return $scope.SelectedScenario3.newAcquisitionAssetsYear3==null?0:parseFloat($scope.SelectedScenario3.newAcquisitionAssetsYear3);
    }

    var totalAssetsYear33 = function () {
        return (totalAssetsYear32() * (1 + (assetGrowthRateYear33()/100))) + newAcquisitionAssetsYear33();
    }
            
    var returnOnAverageAssetsYear33 = function () {
        if ($scope.chkNetIncomeS3 === true) {
            return (netIncomeYear33() / ((totalAssetsYear32() + totalAssetsYear33()) / 2)) * 100;
        }
        else
            return $scope.SelectedScenario3.returnOnAverageAssetsYear3==null?0:parseFloat($scope.SelectedScenario3.returnOnAverageAssetsYear3);
    }

    var netIncomeYear33 = function () {
        if ($scope.chkNetIncomeS3 === true)
            return $scope.SelectedScenario3.netIncomeYear3;
        else
            return ((totalAssetsYear32() + totalAssetsYear33()) / 2) * (returnOnAverageAssetsYear33()/100);
    }
            
    var dividendsRateYear33 = function () {
        return parseFloat($scope.SelectedScenario3.dividendsRateYear3);
    }
            
    var dividendsYear33 = function () {
        if ($scope.chkCashDividendsS3 === true)
            return $scope.SelectedScenario3.dividendsYear3;
        else
            return netIncomeYear33() * (dividendsRateYear33()/100);
    }

    var newCapitalYear33 = function () {
        return $scope.SelectedScenario3.newCapitalYear3==null?0:parseFloat($scope.SelectedScenario3.newCapitalYear3);
    }

    var bankEquityCapitalYear33 = function () {
        return bankEquityCapitalYear32() + netIncomeYear33() - dividendsYear33() + newCapitalYear33();
    }

    var cet1CapitalAdjustmentYear33 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear33 = function () {
        if ($scope.chkTier1CapitalAdjustmentS3 === true)
            return $scope.SelectedScenario3.tier1CapitalAdjustmentYear3;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear33 = function () {
        return bankEquityCapitalYear33() + cet1CapitalAdjustmentYear33() + tier1CapitalAdjustmentYear33();
    }

    var tier1CapitalYear33 = function () {
        return bankEquityCapitalYear33() + tier1CapitalAdjustmentYear33();
    }

    var tier2CapitalYear33 = function () {
        if ($scope.chkTier2CapitalS3 === true)
            return $scope.SelectedScenario3.tier2CapitalYear3;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear33();
    }

    var totalRiskBasedCapitalYear33 = function () {
        return tier1CapitalYear33() + tier2CapitalYear33();
    }

    var riskWeightedAssetsYear33 = function () {
        if ($scope.chkRiskWeightedAssetsS3 === true) {
            return $scope.SelectedScenario3.riskWeightedAssetsYear3;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear33();
        }
    }

    var totalAssetsForLeverageYear33 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear33();
    }

    var cet1CapitalRatioYear33 = function () {
        return riskWeightedAssetsYear33()==0?null:cet1CapitalYear33() / riskWeightedAssetsYear33();
    }

    var tier1RBCRatioYear33 = function () {
        return (tier1CapitalYear33() / riskWeightedAssetsYear33()) * 100;
    }

    var totalRBCRatioYear33 = function () {
        return (totalRiskBasedCapitalYear33() / riskWeightedAssetsYear33()) * 100;
    }

    var tier1LeverageRatioYear33 = function () {
        return (tier1CapitalYear33() / totalAssetsForLeverageYear33());
    }

    var returnOnAverageEquityYear33 = function () {
        return (netIncomeYear33() / ((bankEquityCapitalYear32() + bankEquityCapitalYear33()) / 2)) * 100;
    }

    var mvEquityYear33 = function () {
        return bankEquityCapitalYear33() * 1.5;
    }

    var sharesOutstandingYear33 = function () {
        return $scope.SelectedScenario3.sharesOutstandingActualYear3==null?0:parseFloat($scope.SelectedScenario3.sharesOutstandingActualYear3);
    }

    var bvSharePriceYear33 = function () {
        return sharesOutstandingYear33()==0?null:bankEquityCapitalYear33() * 1000 / sharesOutstandingYear33();
    }

    var mvSharePriceYear33 = function () {
        return sharesOutstandingYear33()==0?null:mvEquityYear33() * 1000 / sharesOutstandingYear33();
    }

    var earningsPerSharePriceYear33 = function () {
        return sharesOutstandingYear33()==0?null:netIncomeYear33() * 1000 / sharesOutstandingYear33();
    }

    var earningsPerShare15PriceYear33 = function () {
        return earningsPerSharePriceYear33() * 15;
    }

    var earningsPerShare20PriceYear33 = function () {
        return earningsPerSharePriceYear33() * 20;
    }

    var dividendPerSharePriceYear33 = function () {
        return sharesOutstandingYear33()==0?null:dividendsYear33() * (-1000) / sharesOutstandingYear33();
    }
            
    // Year 4 Calculations for Column 3
    var assetGrowthRateYear34 = function () {
        return $scope.SelectedScenario3.assetGrowthRateYear4==null?0:parseFloat($scope.SelectedScenario3.assetGrowthRateYear4);
    }

    var newAcquisitionAssetsYear34 = function () {
        return $scope.SelectedScenario3.newAcquisitionAssetsYear4==null?0:parseFloat($scope.SelectedScenario3.newAcquisitionAssetsYear4);
    }

    var totalAssetsYear34 = function () {
        return (totalAssetsYear33() * (1+ (assetGrowthRateYear34()/100))) + newAcquisitionAssetsYear34();
    }
            
    var returnOnAverageAssetsYear34 = function () {
        if ($scope.chkNetIncomeS3 === true) {
            return ((netIncomeYear34() / ((totalAssetsYear33() + totalAssetsYear34()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario3.returnOnAverageAssetsYear4==null?0:parseFloat($scope.SelectedScenario3.returnOnAverageAssetsYear4);
    }

    var netIncomeYear34 = function () {
        if ($scope.chkNetIncomeS3 === true)
            return $scope.SelectedScenario4.netIncomeYear4;
        else
            return ((totalAssetsYear33() + totalAssetsYear34()) / 2) * (returnOnAverageAssetsYear34()/100);
    }
            
    var dividendsRateYear34 = function () {
        return $scope.SelectedScenario3.dividendsRateYear4==null?0:parseFloat($scope.SelectedScenario3.dividendsRateYear4);
    }
            
    var dividendsYear34 = function () {
        if ($scope.chkCashDividendsS3 === true)
            return $scope.SelectedScenario3.dividendsYear4;
        else
            return netIncomeYear34() * (dividendsRateYear34()/100);
    }

    var newCapitalYear34 = function () {
        return $scope.SelectedScenario3.newCapitalYear4==null?0:parseFloat($scope.SelectedScenario3.newCapitalYear4);
    }

    var bankEquityCapitalYear34 = function () {
        return bankEquityCapitalYear33() + netIncomeYear34() - dividendsYear34() + newCapitalYear34();
    }

    var cet1CapitalAdjustmentYear34 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear34 = function () {
        if ($scope.chkTier1CapitalAdjustmentS3 === true)
            return $scope.SelectedScenario3.tier1CapitalAdjustmentYear4;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear34 = function () {
        return bankEquityCapitalYear34() + cet1CapitalAdjustmentYear34() + tier1CapitalAdjustmentYear34();
    }

    var tier1CapitalYear34 = function () {
        return bankEquityCapitalYear34() + tier1CapitalAdjustmentYear34();
    }

    var tier2CapitalYear34 = function () {
        if ($scope.chkTier2CapitalS3 === true)
            return $scope.SelectedScenario3.tier2CapitalYear4;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear34();
    }

    var totalRiskBasedCapitalYear34 = function () {
        return tier1CapitalYear34() + tier2CapitalYear34();
    }

    var riskWeightedAssetsYear34 = function () {
        if ($scope.chkRiskWeightedAssetsS3 === true) {
            return $scope.SelectedScenario3.riskWeightedAssetsYear4;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear34();
        }
    }

    var totalAssetsForLeverageYear34 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear34();
    }

    var cet1CapitalRatioYear34 = function () {
        return riskWeightedAssetsYear34()==0?null:cet1CapitalYear34() / riskWeightedAssetsYear34();
    }

    var tier1RBCRatioYear34 = function () {
        return (tier1CapitalYear34() / riskWeightedAssetsYear34()) * 100;
    }

    var totalRBCRatioYear34 = function () {
        return (totalRiskBasedCapitalYear34() / riskWeightedAssetsYear34()) * 100;
    }

    var tier1LeverageRatioYear34 = function () {
        return (tier1CapitalYear34() / totalAssetsForLeverageYear34());
    }

    var returnOnAverageEquityYear34 = function () {
        return (netIncomeYear34() / ((bankEquityCapitalYear34() + bankEquityCapitalYear33()) / 2)) * 100;
    }

    var mvEquityYear34 = function () {
        return bankEquityCapitalYear34() * 1.5;
    }

    var sharesOutstandingYear34 = function () {
        return $scope.SelectedScenario3.sharesOutstandingActualYear4==null?0:parseFloat($scope.SelectedScenario3.sharesOutstandingActualYear4);
    }

    var bvSharePriceYear34 = function () {
        return sharesOutstandingYear34()==0?null:bankEquityCapitalYear34() * 1000 / sharesOutstandingYear34();
    }

    var mvSharePriceYear34 = function () {
        return sharesOutstandingYear34()==0?null:mvEquityYear34() * 1000 / sharesOutstandingYear34();
    }

    var earningsPerSharePriceYear34 = function () {
        return sharesOutstandingYear34()==0?null:netIncomeYear34() * 1000 / sharesOutstandingYear34();
    }

    var earningsPerShare15PriceYear34 = function () {
        return earningsPerSharePriceYear34() * 15;
    }

    var earningsPerShare20PriceYear34 = function () {
        return earningsPerSharePriceYear34() * 20;
    }

    var dividendPerSharePriceYear34 = function () {
        return sharesOutstandingYear34()==0?null:dividendsYear34() * (-1000) / sharesOutstandingYear34();
    }
            
    // Year 5 Calculations for Column 3
    var assetGrowthRateYear35 = function () {
        return $scope.SelectedScenario3.assetGrowthRateYear5==null?0:parseFloat($scope.SelectedScenario3.assetGrowthRateYear5);
    }

    var newAcquisitionAssetsYear35 = function () {
        return $scope.SelectedScenario3.newAcquisitionAssetsYear5==null?0:parseFloat($scope.SelectedScenario3.newAcquisitionAssetsYear5);
    }

    var totalAssetsYear35 = function () {
        return (totalAssetsYear34() * (1 + (assetGrowthRateYear35()/100))) + newAcquisitionAssetsYear35();
    }
            
    var returnOnAverageAssetsYear35 = function () {
        if ($scope.chkNetIncomeS3 === true) {
            return ((netIncomeYear35() / ((totalAssetsYear34() + totalAssetsYear35()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario3.returnOnAverageAssetsYear5==null?0:parseFloat($scope.SelectedScenario3.returnOnAverageAssetsYear5);
    }

    var netIncomeYear35 = function () {
        if ($scope.chkNetIncomeS3 === true)
            return $scope.SelectedScenario3.netIncomeYear5;
        else
            return ((totalAssetsYear34() + totalAssetsYear35()) / 2) * (returnOnAverageAssetsYear35() / 100);
    }
            
    var dividendsRateYear35 = function () {
        return $scope.SelectedScenario3.dividendsRateYear5==null?0:parseFloat($scope.SelectedScenario3.dividendsRateYear5);
    }
            
    var dividendsYear35 = function () {
        if ($scope.chkCashDividendsS3 === true)
            return $scope.SelectedScenario3.dividendsYear5;
        else
            return netIncomeYear35() * (dividendsRateYear35()/100);
    }

    var newCapitalYear35 = function () {
        return $scope.SelectedScenario3.newCapitalYear5==null?0:parseFloat($scope.SelectedScenario3.newCapitalYear5);
    }

    var bankEquityCapitalYear35 = function () {
        return bankEquityCapitalYear34() + netIncomeYear35() - dividendsYear35() + newCapitalYear35();
    }

    var cet1CapitalAdjustmentYear35 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear35 = function () {
        if ($scope.chkTier1CapitalAdjustmentS3 === true)
            return $scope.SelectedScenario3.tier1CapitalAdjustmentYear5;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear35 = function () {
        return bankEquityCapitalYear35() + cet1CapitalAdjustmentYear35() + tier1CapitalAdjustmentYear35();
    }

    var tier1CapitalYear35 = function () {
        return bankEquityCapitalYear35() + tier1CapitalAdjustmentYear35();
    }

    var tier2CapitalYear35 = function () {
        if ($scope.chkTier2CapitalS3 === true)
            return $scope.SelectedScenario3.tier2CapitalYear5;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear35();
    }

    var totalRiskBasedCapitalYear35 = function () {
        return tier1CapitalYear35() + tier2CapitalYear35();
    }

    var riskWeightedAssetsYear35 = function () {
        if ($scope.chkRiskWeightedAssetsS3 === true) {
            return $scope.SelectedScenario3.riskWeightedAssetsYear5;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear35();
        }
    }

    var totalAssetsForLeverageYear35 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear35();
    }

    var cet1CapitalRatioYear35 = function () {
        return riskWeightedAssetsYear35()==0?null:cet1CapitalYear35() / riskWeightedAssetsYear35();
    }

    var tier1RBCRatioYear35 = function () {
        return (tier1CapitalYear35() / riskWeightedAssetsYear35()) * 100;
    }

    var totalRBCRatioYear35 = function () {
        return (totalRiskBasedCapitalYear35() / riskWeightedAssetsYear35()) * 100;
    }

    var tier1LeverageRatioYear35 = function () {
        return (tier1CapitalYear35() / totalAssetsForLeverageYear35());
    }

    var returnOnAverageEquityYear35 = function () {
        return (netIncomeYear35() / ((bankEquityCapitalYear35() + bankEquityCapitalYear34()) / 2)) * 100;
    }

    var mvEquityYear35 = function () {
        return bankEquityCapitalYear35() * 1.5;
    }

    var sharesOutstandingYear35 = function () {
        return $scope.SelectedScenario3.sharesOutstandingActualYear5==null?0:parseFloat($scope.SelectedScenario3.sharesOutstandingActualYear5);
    }

    var bvSharePriceYear35 = function () {
        return sharesOutstandingYear35()==0?null:bankEquityCapitalYear35() * 1000 / sharesOutstandingYear35();
    }

    var mvSharePriceYear35 = function () {
        return sharesOutstandingYear35()==0?null:mvEquityYear35() * 1000 / sharesOutstandingYear35();
    }

    var earningsPerSharePriceYear35 = function () {
        return sharesOutstandingYear35()==0?null:netIncomeYear35() * 1000 / sharesOutstandingYear35();
    }

    var earningsPerShare15PriceYear35 = function () {
        return earningsPerSharePriceYear35() * 15;
    }

    var earningsPerShare20PriceYear35 = function () {
        return earningsPerSharePriceYear35() * 20;
    }

    var dividendPerSharePriceYear35 = function () {
        return sharesOutstandingYear35()==0?null:dividendsYear35() * (-1000) / sharesOutstandingYear35();
    }
    
    // Year 0 Calculations for Column 4
    var assetGrowthRateYear40 = function () {
        return $scope.SelectedScenario4.assetGrowthRateYear0==null?0:parseFloat($scope.SelectedScenario4.assetGrowthRateYear0);
    }

    var newAcquisitionAssetsYear40 = function () {
        if (typeof $scope.SelectedScenario4.newAcquisitionAssetsYear0 !== 'undefined' && $scope.SelectedScenario4.newAcquisitionAssetsYear0 !== null)
            return parseFloat($scope.SelectedScenario4.newAcquisitionAssetsYear0);
        else
            return 0;
    }

    var totalAssetsYear40 = function () {
        return (parseFloat($scope.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear40()/100))) + newAcquisitionAssetsYear40();
    }
            
    var returnOnAverageAssetsYear40 = function () {
        if ($scope.chkNetIncomeS4 === true) {
            return ((netIncomeYear40() / (($scope.TotalAssetsPriorYear + totalAssetsYear40()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario4.returnOnAverageAssetsYear0==null?0:parseFloat($scope.SelectedScenario4.returnOnAverageAssetsYear0);
    }

    var netIncomeYear40 = function () {
        if ($scope.chkNetIncomeS4 === true)
            return $scope.SelectedScenario4.netIncomeYear0;
        else
            return ((parseFloat($scope.TotalAssetsPriorYear) + totalAssetsYear40()) / 2) * (returnOnAverageAssetsYear40()/100);
    }
            
    var dividendsRateYear40 = function () {
        return $scope.SelectedScenario4.dividendsRateYear0==null?0:parseFloat($scope.SelectedScenario4.dividendsRateYear0);
    }
            
    var dividendsYear40 = function () {
        if ($scope.chkCashDividendsS4 === true)
            return $scope.SelectedScenario4.dividendsYear0;
        else
            return netIncomeYear40() * (dividendsRateYear40()/100);
    }

    var newCapitalYear40 = function () {
        return $scope.SelectedScenario4.newCapitalYear0==null?0:parseFloat($scope.SelectedScenario4.newCapitalYear0);
    }

    var bankEquityCapitalYear40 = function () {
        return parseFloat($scope.BankEquityCapitalPriorYear) + netIncomeYear40() - dividendsYear40() + newCapitalYear40();
    }

    var cet1CapitalAdjustmentYear40 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear40 = function () {
        if ($scope.chkTier1CapitalAdjustmentS4 === true)
            return $scope.SelectedScenario4.tier1CapitalAdjustmentYear0;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear40 = function () {
        return bankEquityCapitalYear40() + cet1CapitalAdjustmentYear40() + tier1CapitalAdjustmentYear40();
    }

    var tier1CapitalYear40 = function () {
        return bankEquityCapitalYear40() + tier1CapitalAdjustmentYear40();
    }

    var tier2CapitalYear40 = function () {
        if ($scope.chkTier2CapitalS4 === true)
            return $scope.SelectedScenario4.tier2CapitalYear0;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear40();
    }

    var totalRiskBasedCapitalYear40 = function () {
        return tier1CapitalYear40() + tier2CapitalYear40();
    }

    var riskWeightedAssetsYear40 = function () {
        if ($scope.chkRiskWeightedAssetsS4 === true) {
            return $scope.SelectedScenario4.riskWeightedAssetsYear0;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear40();
        }
    }

    var totalAssetsForLeverageYear40 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear40();
    }

    var cet1CapitalRatioYear40 = function () {
        return riskWeightedAssetsYear40()==0?null:cet1CapitalYear40() / riskWeightedAssetsYear40();
    }

    var tier1RBCRatioYear40 = function () {
        return (tier1CapitalYear40() / riskWeightedAssetsYear40()) * 100;
    }

    var totalRBCRatioYear40 = function () {
        return (totalRiskBasedCapitalYear40() / riskWeightedAssetsYear40()) * 100;
    }

    var tier1LeverageRatioYear40 = function () {
        return totalAssetsForLeverageYear40()==0?null:tier1CapitalYear40() / totalAssetsForLeverageYear40();
    }

    var returnOnAverageEquityYear40 = function () {
        return (netIncomeYear40() / ((bankEquityCapitalYear40() + parseFloat($scope.BankEquityCapitalPriorYear)) / 2)) * 100;
    }

    var mvEquityYear40 = function () {
        return bankEquityCapitalYear40() * 1.5;
    }

    var sharesOutstandingYear40 = function () {
        return $scope.SelectedScenario4.sharesOutstandingActualYear0==null?0:parseFloat($scope.SelectedScenario4.sharesOutstandingActualYear0);
    }

    var bvSharePriceYear40 = function () {
        return sharesOutstandingYear40()==0?null:bankEquityCapitalYear40() * 1000 / sharesOutstandingYear40();
    }

    var mvSharePriceYear40 = function () {
        return sharesOutstandingYear40()==0?null:mvEquityYear40() * 1000 / sharesOutstandingYear40();
    }

    var earningsPerSharePriceYear40 = function () {
        return sharesOutstandingYear40()==0?null:netIncomeYear40() * 1000 / sharesOutstandingYear40();
    }

    var earningsPerShare15PriceYear40 = function () {
        return earningsPerSharePriceYear40() * 15;
    }

    var earningsPerShare20PriceYear40 = function () {
        return earningsPerSharePriceYear40() * 20;
    }

    var dividendPerSharePriceYear40 = function () {
        return sharesOutstandingYear40()==0?null:dividendsYear40() * (-1000) / sharesOutstandingYear40();
    }
            
    // Year 1 Calculations for Column 4
    var assetGrowthRateYear41 = function () {
        return $scope.SelectedScenario4.assetGrowthRateYear1==null?0:parseFloat($scope.SelectedScenario4.assetGrowthRateYear1);
    }

    var newAcquisitionAssetsYear41 = function () {
        return $scope.SelectedScenario4.newAcquisitionAssetsYear1==null?0:parseFloat($scope.SelectedScenario4.newAcquisitionAssetsYear1);
    }

    var totalAssetsYear41 = function () {
        return (totalAssetsYear40() * (1 + (assetGrowthRateYear41()/100))) + newAcquisitionAssetsYear41();
    }
            
    var returnOnAverageAssetsYear41 = function () {
        if ($scope.chkNetIncomeS4 === true) {
            return ((netIncomeYear41() / ((totalAssetsYear40() + totalAssetsYear41()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario4.returnOnAverageAssetsYear1==null?0:parseFloat($scope.SelectedScenario4.returnOnAverageAssetsYear1);
    }

    var netIncomeYear41 = function () {
        if ($scope.chkNetIncomeS4 === true)
            return $scope.SelectedScenario4.netIncomeYear1;
        else
            return ((totalAssetsYear40() + totalAssetsYear41()) / 2) * (returnOnAverageAssetsYear41()/100);
    }
            
    var dividendsRateYear41 = function () {
        return $scope.SelectedScenario4.dividendsRateYear1==null?0:parseFloat($scope.SelectedScenario4.dividendsRateYear1);
    }
            
    var dividendsYear41 = function () {
        if ($scope.chkCashDividendsS4 === true)
            return $scope.SelectedScenario4.dividendsYear1;
        else
            return netIncomeYear41() * (dividendsRateYear41()/100);
    }

    var newCapitalYear41 = function () {
        return $scope.SelectedScenario4.newCapitalYear1==null?0:parseFloat($scope.SelectedScenario4.newCapitalYear1);
    }

    var bankEquityCapitalYear41 = function () {
        return bankEquityCapitalYear40() + netIncomeYear41() - dividendsYear41() + newCapitalYear41();
    }

    var cet1CapitalAdjustmentYear41 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear41 = function () {
        if ($scope.chkTier1CapitalAdjustmentS4 === true)
            return $scope.SelectedScenario4.tier1CapitalAdjustmentYear1;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear41 = function () {
        return bankEquityCapitalYear41() + cet1CapitalAdjustmentYear41() + tier1CapitalAdjustmentYear41();
    }

    var tier1CapitalYear41 = function () {
        return bankEquityCapitalYear41() + tier1CapitalAdjustmentYear41();
    }

    var tier2CapitalYear41 = function () {
        if ($scope.chkTier2CapitalS4 === true)
            return $scope.SelectedScenario4.tier2CapitalYear1;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear41();
    }

    var totalRiskBasedCapitalYear41 = function () {
        return tier1CapitalYear41() + tier2CapitalYear41();
    }

    var riskWeightedAssetsYear41 = function () {
        if ($scope.chkRiskWeightedAssetsS4 === true) {
            return $scope.SelectedScenario4.riskWeightedAssetsYear1;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear41();
        }
    }

    var totalAssetsForLeverageYear41 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear41();
    }

    var cet1CapitalRatioYear41 = function () {
        return riskWeightedAssetsYear41()==0?null:cet1CapitalYear41() / riskWeightedAssetsYear41();
    }

    var tier1RBCRatioYear41 = function () {
        return (tier1CapitalYear41() / riskWeightedAssetsYear41()) * 100;
    }

    var totalRBCRatioYear41 = function () {
        return (totalRiskBasedCapitalYear41() / riskWeightedAssetsYear41()) * 100;
    }

    var tier1LeverageRatioYear41 = function () {
        return (tier1CapitalYear41() / totalAssetsForLeverageYear41());
    }

    var returnOnAverageEquityYear41 = function () {
        return (netIncomeYear41() / ((bankEquityCapitalYear41() + bankEquityCapitalYear40()) / 2)) * 100;
    }

    var mvEquityYear41 = function () {
        return bankEquityCapitalYear41() * 1.5;
    }

    var sharesOutstandingYear41 = function () {
        return $scope.SelectedScenario4.sharesOutstandingActualYear1==null?0:parseFloat($scope.SelectedScenario4.sharesOutstandingActualYear1);
    }

    var bvSharePriceYear41 = function () {
        return sharesOutstandingYear41()==0?null:bankEquityCapitalYear41() * 1000 / sharesOutstandingYear41();
    }

    var mvSharePriceYear41 = function () {
        return sharesOutstandingYear41()==0?null:mvEquityYear41() * 1000 / sharesOutstandingYear41();
    }

    var earningsPerSharePriceYear41 = function () {
        return sharesOutstandingYear41()==0?null:netIncomeYear41() * 1000 / sharesOutstandingYear41();
    }

    var earningsPerShare15PriceYear41 = function () {
        return earningsPerSharePriceYear41() * 15;
    }

    var earningsPerShare20PriceYear41 = function () {
        return earningsPerSharePriceYear41() * 20;
    }

    var dividendPerSharePriceYear41 = function () {
        return sharesOutstandingYear41()==0?null:dividendsYear41() * (-1000) / sharesOutstandingYear41();
    }
            
    // Year 2 Calculations for Column 4
    var assetGrowthRateYear42 = function () {
        return $scope.SelectedScenario4.assetGrowthRateYear2==null?0:parseFloat($scope.SelectedScenario4.assetGrowthRateYear2);
    }

    var newAcquisitionAssetsYear42 = function () {
        return $scope.SelectedScenario4.newAcquisitionAssetsYear2==null?0:parseFloat($scope.SelectedScenario4.newAcquisitionAssetsYear2);
    }

    var totalAssetsYear42 = function () {
        return (totalAssetsYear41() * (1 + (assetGrowthRateYear42()/100))) + newAcquisitionAssetsYear42();
    }
            
    var returnOnAverageAssetsYear42 = function () {
        if ($scope.chkNetIncomeS4 === true) {
            return ((netIncomeYear42() / ((totalAssetsYear41() + totalAssetsYear42()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario4.returnOnAverageAssetsYear2==null?0:parseFloat($scope.SelectedScenario4.returnOnAverageAssetsYear2);
    }

    var netIncomeYear42 = function () {
        if ($scope.chkNetIncomeS4 === true)
            return $scope.SelectedScenario4.netIncomeYear2;
        else
            return ((totalAssetsYear41() + totalAssetsYear42()) / 2) * (returnOnAverageAssetsYear42()/100);
    }
            
    var dividendsRateYear42 = function () {
        return $scope.SelectedScenario4.dividendsRateYear2==null?0:parseFloat($scope.SelectedScenario4.dividendsRateYear2);
    }
            
    var dividendsYear42 = function () {
        if ($scope.chkCashDividendsS4 === true)
            return $scope.SelectedScenario4.dividendsYear2;
        else
            return netIncomeYear42() * (dividendsRateYear42()/100);
    }

    var newCapitalYear42 = function () {
        return $scope.SelectedScenario4.newCapitalYear2==null?0:parseFloat($scope.SelectedScenario4.newCapitalYear2);
    }

    var bankEquityCapitalYear42 = function () {
        return bankEquityCapitalYear41() + netIncomeYear42() - dividendsYear42() + newCapitalYear42();
    }

    var cet1CapitalAdjustmentYear42 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear42 = function () {
        if ($scope.chkTier1CapitalAdjustmentS4 === true)
            return $scope.SelectedScenario4.tier1CapitalAdjustmentYear2;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear42 = function () {
        return bankEquityCapitalYear42() + cet1CapitalAdjustmentYear42() + tier1CapitalAdjustmentYear42();
    }

    var tier1CapitalYear42 = function () {
        return bankEquityCapitalYear42() + tier1CapitalAdjustmentYear42();
    }

    var tier2CapitalYear42 = function () {
        if ($scope.chkTier2CapitalS4 === true)
            return $scope.SelectedScenario4.tier2CapitalYear2;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear42();
    }

    var totalRiskBasedCapitalYear42 = function () {
        return tier1CapitalYear42() + tier2CapitalYear42();
    }

    var riskWeightedAssetsYear42 = function () {
        if ($scope.chkRiskWeightedAssetsS4 === true) {
            return $scope.SelectedScenario4.riskWeightedAssetsYear2;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear42();
        }
    }

    var totalAssetsForLeverageYear42 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear42();
    }

    var cet1CapitalRatioYear42 = function () {
        return riskWeightedAssetsYear42()==0?null:cet1CapitalYear42() / riskWeightedAssetsYear42();
    }

    var tier1RBCRatioYear42 = function () {
        return (tier1CapitalYear42() / riskWeightedAssetsYear42()) * 100;
    }

    var totalRBCRatioYear42 = function () {
        return (totalRiskBasedCapitalYear42() / riskWeightedAssetsYear42()) * 100;
    }

    var tier1LeverageRatioYear42 = function () {
        return (tier1CapitalYear42() / totalAssetsForLeverageYear42());
    }

    var returnOnAverageEquityYear42 = function () {
        return (netIncomeYear42() / ((bankEquityCapitalYear42() + bankEquityCapitalYear41()) / 2)) * 100;
    }

    var mvEquityYear42 = function () {
        return bankEquityCapitalYear42() * 1.5;
    }

    var sharesOutstandingYear42 = function () {
        return $scope.SelectedScenario4.sharesOutstandingActualYear2==null?0:parseFloat($scope.SelectedScenario4.sharesOutstandingActualYear2);
    }

    var bvSharePriceYear42 = function () {
        return sharesOutstandingYear42()==0?null:bankEquityCapitalYear42() * 1000 / sharesOutstandingYear42();
    }

    var mvSharePriceYear42 = function () {
        return sharesOutstandingYear42()==0?null:mvEquityYear42() * 1000 / sharesOutstandingYear42();
    }

    var earningsPerSharePriceYear42 = function () {
        return sharesOutstandingYear42()==0?null:netIncomeYear42() * 1000 / sharesOutstandingYear42();
    }

    var earningsPerShare15PriceYear42 = function () {
        return earningsPerSharePriceYear42() * 15;
    }

    var earningsPerShare20PriceYear42 = function () {
        return earningsPerSharePriceYear42() * 20;
    }

    var dividendPerSharePriceYear42 = function () {
        return sharesOutstandingYear42()==0?null:dividendsYear42() * (-1000) / sharesOutstandingYear42();
    }
            
    // Year 3 Calculations for Column 4
    var assetGrowthRateYear43 = function () {
        return $scope.SelectedScenario4.assetGrowthRateYear3==null?0:parseFloat($scope.SelectedScenario4.assetGrowthRateYear3);
    }

    var newAcquisitionAssetsYear43 = function () {
        return $scope.SelectedScenario4.newAcquisitionAssetsYear3==null?0:parseFloat($scope.SelectedScenario4.newAcquisitionAssetsYear3);
    }

    var totalAssetsYear43 = function () {
        return (totalAssetsYear42() * (1 + (assetGrowthRateYear43()/100))) + newAcquisitionAssetsYear43();
    }
            
    var returnOnAverageAssetsYear43 = function () {
        if ($scope.chkNetIncomeS4 === true) {
            return (netIncomeYear43() / ((totalAssetsYear42() + totalAssetsYear43()) / 2)) * 100;
        }
        else
            return $scope.SelectedScenario4.returnOnAverageAssetsYear3==null?0:parseFloat($scope.SelectedScenario4.returnOnAverageAssetsYear3);
    }

    var netIncomeYear43 = function () {
        if ($scope.chkNetIncomeS4 === true)
            return $scope.SelectedScenario4.netIncomeYear3;
        else
            return ((totalAssetsYear42() + totalAssetsYear43()) / 2) * (returnOnAverageAssetsYear43()/100);
    }
            
    var dividendsRateYear43 = function () {
        return $scope.SelectedScenario4.dividendsRateYear3==null?0:parseFloat($scope.SelectedScenario4.dividendsRateYear3);
    }
            
    var dividendsYear43 = function () {
        if ($scope.chkCashDividendsS4 === true)
            return $scope.SelectedScenario4.dividendsYear3;
        else
            return netIncomeYear43() * (dividendsRateYear43()/100);
    }

    var newCapitalYear43 = function () {
        return $scope.SelectedScenario4.newCapitalYear3==null?0:parseFloat($scope.SelectedScenario4.newCapitalYear3);
    }

    var bankEquityCapitalYear43 = function () {
        return bankEquityCapitalYear42() + netIncomeYear43() - dividendsYear43() + newCapitalYear43();
    }

    var cet1CapitalAdjustmentYear43 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear43 = function () {
        if ($scope.chkTier1CapitalAdjustmentS4 === true)
            return $scope.SelectedScenario4.tier1CapitalAdjustmentYear3;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear==null?0:parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear43 = function () {
        return bankEquityCapitalYear43() + cet1CapitalAdjustmentYear43() + tier1CapitalAdjustmentYear43();
    }

    var tier1CapitalYear43 = function () {
        return bankEquityCapitalYear43() + tier1CapitalAdjustmentYear43();
    }

    var tier2CapitalYear43 = function () {
        if ($scope.chkTier2CapitalS4 === true)
            return $scope.SelectedScenario4.tier2CapitalYear3;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear43();
    }

    var totalRiskBasedCapitalYear43 = function () {
        return tier1CapitalYear43() + tier2CapitalYear43();
    }

    var riskWeightedAssetsYear43 = function () {
        if ($scope.chkRiskWeightedAssetsS4 === true) {
            return $scope.SelectedScenario4.riskWeightedAssetsYear3;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear43();
        }
    }

    var totalAssetsForLeverageYear43 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear43();
    }

    var cet1CapitalRatioYear43 = function () {
        return riskWeightedAssetsYear43()==0?null:cet1CapitalYear43() / riskWeightedAssetsYear43();
    }

    var tier1RBCRatioYear43 = function () {
        return (tier1CapitalYear43() / riskWeightedAssetsYear43()) * 100;
    }

    var totalRBCRatioYear43 = function () {
        return (totalRiskBasedCapitalYear43() / riskWeightedAssetsYear43()) * 100;
    }

    var tier1LeverageRatioYear43 = function () {
        return (tier1CapitalYear43() / totalAssetsForLeverageYear43());
    }

    var returnOnAverageEquityYear43 = function () {
        return (netIncomeYear43() / ((bankEquityCapitalYear43() + bankEquityCapitalYear42()) / 2)) * 100;
    }

    var mvEquityYear43 = function () {
        return bankEquityCapitalYear43() * 1.5;
    }

    var sharesOutstandingYear43 = function () {
        return $scope.SelectedScenario4.sharesOutstandingActualYear3==null?0:parseFloat($scope.SelectedScenario4.sharesOutstandingActualYear3);
    }

    var bvSharePriceYear43 = function () {
        return sharesOutstandingYear43()==0?null:bankEquityCapitalYear43() * 1000 / sharesOutstandingYear43();
    }

    var mvSharePriceYear43 = function () {
        return sharesOutstandingYear43()==0?null:mvEquityYear43() * 1000 / sharesOutstandingYear43();
    }

    var earningsPerSharePriceYear43 = function () {
        return sharesOutstandingYear43()==0?null:netIncomeYear43() * 1000 / sharesOutstandingYear43();
    }

    var earningsPerShare15PriceYear43 = function () {
        return earningsPerSharePriceYear43() * 15;
    }

    var earningsPerShare20PriceYear43 = function () {
        return earningsPerSharePriceYear43() * 20;
    }

    var dividendPerSharePriceYear43 = function () {
        return sharesOutstandingYear43()==0?null:dividendsYear43() * (-1000) / sharesOutstandingYear43();
    }
            
    // Year 4 Calculations for Column 4
    var assetGrowthRateYear44 = function () {
        return $scope.SelectedScenario4.assetGrowthRateYear4==null?0:parseFloat($scope.SelectedScenario4.assetGrowthRateYear4);
    }

    var newAcquisitionAssetsYear44 = function () {
        return $scope.SelectedScenario4.newAcquisitionAssetsYear4==null?0:parseFloat($scope.SelectedScenario4.newAcquisitionAssetsYear4);
    }

    var totalAssetsYear44 = function () {
        return (totalAssetsYear43() * (1 + (assetGrowthRateYear44()/100))) + newAcquisitionAssetsYear44();
    }
            
    var returnOnAverageAssetsYear44 = function () {
        if ($scope.chkNetIncomeS4 === true) {
            return ((netIncomeYear44() / ((totalAssetsYear43() + totalAssetsYear44()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario4.returnOnAverageAssetsYear4==null?0:parseFloat($scope.SelectedScenario4.returnOnAverageAssetsYear4);
    }

    var netIncomeYear44 = function () {
        if ($scope.chkNetIncomeS4 === true)
            return $scope.SelectedScenario4.netIncomeYear4;
        else
            return ((totalAssetsYear43() + totalAssetsYear44()) / 2) * (returnOnAverageAssetsYear44()/100);
    }
            
    var dividendsRateYear44 = function () {
        return $scope.SelectedScenario4.dividendsRateYear4==null?0:parseFloat($scope.SelectedScenario4.dividendsRateYear4);
    }
            
    var dividendsYear44 = function () {
        if ($scope.chkCashDividendsS4 === true)
            return $scope.SelectedScenario4.dividendsYear4;
        else
            return netIncomeYear44() * (dividendsRateYear44()/100);
    }

    var newCapitalYear44 = function () {
        return $scope.SelectedScenario4.newCapitalYear4==null?0:parseFloat($scope.SelectedScenario4.newCapitalYear4);
    }

    var bankEquityCapitalYear44 = function () {
        return bankEquityCapitalYear43() + netIncomeYear44() - dividendsYear44() + newCapitalYear44();
    }

    var cet1CapitalAdjustmentYear44 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear44 = function () {
        if ($scope.chkTier1CapitalAdjustmentS4 === true)
            return $scope.SelectedScenario4.tier1CapitalAdjustmentYear4;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear44 = function () {
        return bankEquityCapitalYear44() + cet1CapitalAdjustmentYear44() + tier1CapitalAdjustmentYear44();
    }

    var tier1CapitalYear44 = function () {
        return bankEquityCapitalYear44() + tier1CapitalAdjustmentYear44();
    }

    var tier2CapitalYear44 = function () {
        if ($scope.chkTier2CapitalS4 === true)
            return $scope.SelectedScenario4.tier2CapitalYear4;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear44();
    }

    var totalRiskBasedCapitalYear44 = function () {
        return tier1CapitalYear44() + tier2CapitalYear44();
    }

    var riskWeightedAssetsYear44 = function () {
        if ($scope.chkRiskWeightedAssetsS4 === true) {
            return $scope.SelectedScenario4.riskWeightedAssetsYear4;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear44();
        }
    }

    var totalAssetsForLeverageYear44 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear44();
    }

    var cet1CapitalRatioYear44 = function () {
        return riskWeightedAssetsYear44()==0?null:cet1CapitalYear44() / riskWeightedAssetsYear44();
    }

    var tier1RBCRatioYear44 = function () {
        return (tier1CapitalYear44() / riskWeightedAssetsYear44()) * 100;
    }

    var totalRBCRatioYear44 = function () {
        return (totalRiskBasedCapitalYear44() / riskWeightedAssetsYear44()) * 100;
    }

    var tier1LeverageRatioYear44 = function () {
        return (tier1CapitalYear44() / totalAssetsForLeverageYear44());
    }

    var returnOnAverageEquityYear44 = function () {
        return (netIncomeYear44() / ((bankEquityCapitalYear44() + bankEquityCapitalYear43()) / 2)) * 100;
    }

    var mvEquityYear44 = function () {
        return bankEquityCapitalYear44() * 1.5;
    }

    var sharesOutstandingYear44 = function () {
        return $scope.SelectedScenario4.sharesOutstandingActualYear4==null?0:parseFloat($scope.SelectedScenario4.sharesOutstandingActualYear4);
    }

    var bvSharePriceYear44 = function () {
        return sharesOutstandingYear44()==0?null:bankEquityCapitalYear44() * 1000 / sharesOutstandingYear44();
    }

    var mvSharePriceYear44 = function () {
        return sharesOutstandingYear44()==0?null:mvEquityYear44() * 1000 / sharesOutstandingYear44();
    }

    var earningsPerSharePriceYear44 = function () {
        return sharesOutstandingYear44()==0?null:netIncomeYear44() * 1000 / sharesOutstandingYear44();
    }

    var earningsPerShare15PriceYear44 = function () {
        return earningsPerSharePriceYear44() * 15;
    }

    var earningsPerShare20PriceYear44 = function () {
        return earningsPerSharePriceYear44() * 20;
    }

    var dividendPerSharePriceYear44 = function () {
        return sharesOutstandingYear44()==0?null:dividendsYear44() * (-1000) / sharesOutstandingYear44();
    }
            
    // Year 5 Calculations for Column 4
    var assetGrowthRateYear45 = function () {
        return $scope.SelectedScenario4.assetGrowthRateYear5==null?0:parseFloat($scope.SelectedScenario4.assetGrowthRateYear5);
    }

    var newAcquisitionAssetsYear45 = function () {
        return $scope.SelectedScenario4.newAcquisitionAssetsYear5==null?0:parseFloat($scope.SelectedScenario4.newAcquisitionAssetsYear5);
    }

    var totalAssetsYear45 = function () {
        return (totalAssetsYear44() * (1 + (assetGrowthRateYear45()/100))) + newAcquisitionAssetsYear45();
    }
            
    var returnOnAverageAssetsYear45 = function () {
        if ($scope.chkNetIncomeS4 === true) {
            return ((netIncomeYear45() / ((totalAssetsYear44() + totalAssetsYear45()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario4.returnOnAverageAssetsYear5==null?0:parseFloat($scope.SelectedScenario4.returnOnAverageAssetsYear5);
    }

    var netIncomeYear45 = function () {
        if ($scope.chkNetIncomeS4 === true)
            return $scope.SelectedScenario4.netIncomeYear5;
        else
            return ((totalAssetsYear44() + totalAssetsYear45()) / 2) * (returnOnAverageAssetsYear45()/100);
    }
            
    var dividendsRateYear45 = function () {
        return $scope.SelectedScenario4.dividendsRateYear5==null?0:parseFloat($scope.SelectedScenario4.dividendsRateYear5);
    }
            
    var dividendsYear45 = function () {
        if ($scope.chkCashDividendsS4 === true)
            return $scope.SelectedScenario4.dividendsYear5;
        else
            return netIncomeYear45() * (dividendsRateYear45()/100);
    }

    var newCapitalYear45 = function () {
        return $scope.SelectedScenario4.newCapitalYear5==null?0:parseFloat($scope.SelectedScenario4.newCapitalYear5);
    }

    var bankEquityCapitalYear45 = function () {
        return bankEquityCapitalYear44() + netIncomeYear45() - dividendsYear45() + newCapitalYear45();
    }

    var cet1CapitalAdjustmentYear45 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear45 = function () {
        if ($scope.chkTier1CapitalAdjustmentS4 === true)
            return $scope.SelectedScenario4.tier1CapitalAdjustmentYear5;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear45 = function () {
        return bankEquityCapitalYear45() + cet1CapitalAdjustmentYear45() + tier1CapitalAdjustmentYear45();
    }

    var tier1CapitalYear45 = function () {
        return bankEquityCapitalYear45() + tier1CapitalAdjustmentYear45();
    }

    var tier2CapitalYear45 = function () {
        if ($scope.chkTier2CapitalS4 === true)
            return $scope.SelectedScenario4.tier2CapitalYear5;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear45();
    }

    var totalRiskBasedCapitalYear45 = function () {
        return tier1CapitalYear45() + tier2CapitalYear45();
    }

    var riskWeightedAssetsYear45 = function () {
        if ($scope.chkRiskWeightedAssetsS4 === true) {
            return $scope.SelectedScenario4.riskWeightedAssetsYear5;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear45();
        }
    }

    var totalAssetsForLeverageYear45 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear45();
    }

    var cet1CapitalRatioYear45 = function () {
        return riskWeightedAssetsYear45()==0?null:cet1CapitalYear45() / riskWeightedAssetsYear45();
    }

    var tier1RBCRatioYear45 = function () {
        return (tier1CapitalYear45() / riskWeightedAssetsYear45()) * 100;
    }

    var totalRBCRatioYear45 = function () {
        return (totalRiskBasedCapitalYear45() / riskWeightedAssetsYear45()) * 100;
    }

    var tier1LeverageRatioYear45 = function () {
        return (tier1CapitalYear45() / totalAssetsForLeverageYear45());
    }

    var returnOnAverageEquityYear45 = function () {
        return (netIncomeYear45() / ((bankEquityCapitalYear45() + bankEquityCapitalYear44()) / 2)) * 100;
    }

    var mvEquityYear45 = function () {
        return bankEquityCapitalYear45() * 1.5;
    }

    var sharesOutstandingYear45 = function () {
        return $scope.SelectedScenario4.sharesOutstandingActualYear5==null?0:parseFloat($scope.SelectedScenario4.sharesOutstandingActualYear5);
    }

    var bvSharePriceYear45 = function () {
        return sharesOutstandingYear45()==0?null:bankEquityCapitalYear45() * 1000 / sharesOutstandingYear45();
    }

    var mvSharePriceYear45 = function () {
        return sharesOutstandingYear45()==0?null:mvEquityYear45() * 1000 / sharesOutstandingYear45();
    }

    var earningsPerSharePriceYear45 = function () {
        return sharesOutstandingYear45()==0?null:netIncomeYear45() * 1000 / sharesOutstandingYear45();
    }

    var earningsPerShare15PriceYear45 = function () {
        return earningsPerSharePriceYear45() * 15;
    }

    var earningsPerShare20PriceYear45 = function () {
        return earningsPerSharePriceYear45() * 20;
    }

    var dividendPerSharePriceYear45 = function () {
        return sharesOutstandingYear45()==0?null:dividendsYear45() * (-1000) / sharesOutstandingYear45();
    }
            
    // Year 0 Calculations for Column 5
    var assetGrowthRateYear50 = function () {
        return $scope.SelectedScenario5.assetGrowthRateYear0==null?0:parseFloat($scope.SelectedScenario5.assetGrowthRateYear0);
    }

    var newAcquisitionAssetsYear50 = function () {
        if (typeof $scope.SelectedScenario5.newAcquisitionAssetsYear0 !== 'undefined' && $scope.SelectedScenario5.newAcquisitionAssetsYear0 !== null)
            return parseFloat($scope.SelectedScenario5.newAcquisitionAssetsYear0);
        else
            return 0;
    }

    var totalAssetsYear50 = function () {
        return (parseFloat($scope.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear50()/100))) + newAcquisitionAssetsYear50();
    }
            
    var returnOnAverageAssetsYear50 = function () {
        if ($scope.chkNetIncomeS5 === true) {
            return ((netIncomeYear50() / (($scope.TotalAssetsPriorYear + totalAssetsYear50()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario5.returnOnAverageAssetsYear0==null?0:parseFloat($scope.SelectedScenario5.returnOnAverageAssetsYear0);
    }

    var netIncomeYear50 = function () {
        if ($scope.chkNetIncomeS5 === true)
            return $scope.SelectedScenario5.netIncomeYear0;
        else
            return ((parseFloat($scope.TotalAssetsPriorYear) + totalAssetsYear50()) / 2) * (returnOnAverageAssetsYear50()/100);
    }
            
    var dividendsRateYear50 = function () {
        return $scope.SelectedScenario5.dividendsRateYear0==null?0:parseFloat($scope.SelectedScenario5.dividendsRateYear0);
    }
            
    var dividendsYear50 = function () {
        if ($scope.chkCashDividendsS5 === true)
            return $scope.SelectedScenario5.dividendsYear0;
        else
            return netIncomeYear50() * (dividendsRateYear50()/100);
    }

    var newCapitalYear50 = function () {
        return $scope.SelectedScenario5.newCapitalYear0==null?0:parseFloat($scope.SelectedScenario5.newCapitalYear0);
    }

    var bankEquityCapitalYear50 = function () {
        return parseFloat($scope.BankEquityCapitalPriorYear) + netIncomeYear50() - dividendsYear50() + newCapitalYear50();
    }

    var cet1CapitalAdjustmentYear50 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear50 = function () {
        if ($scope.chkTier1CapitalAdjustmentS5 === true)
            return $scope.SelectedScenario5.tier1CapitalAdjustmentYear0;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear50 = function () {
        return bankEquityCapitalYear50() + cet1CapitalAdjustmentYear50() + tier1CapitalAdjustmentYear50();
    }

    var tier1CapitalYear50 = function () {
        return bankEquityCapitalYear50() + tier1CapitalAdjustmentYear50();
    }

    var tier2CapitalYear50 = function () {
        if ($scope.chkTier2CapitalS5 === true)
            return $scope.SelectedScenario5.tier2CapitalYear0;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear50();
    }

    var totalRiskBasedCapitalYear50 = function () {
        return tier1CapitalYear50() + tier2CapitalYear50();
    }

    var riskWeightedAssetsYear50 = function () {
        if ($scope.chkRiskWeightedAssetsS5 === true) {
            return $scope.SelectedScenario5.riskWeightedAssetsYear0;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear50();
        }
    }

    var totalAssetsForLeverageYear50 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear50();
    }

    var cet1CapitalRatioYear50 = function () {
        return riskWeightedAssetsYear50()==0?null:cet1CapitalYear50() / riskWeightedAssetsYear50();
    }

    var tier1RBCRatioYear50 = function () {
        return (tier1CapitalYear50() / riskWeightedAssetsYear50()) * 100;
    }

    var totalRBCRatioYear50 = function () {
        return (totalRiskBasedCapitalYear50() / riskWeightedAssetsYear50()) * 100;
    }

    var tier1LeverageRatioYear50 = function () {
        return totalAssetsForLeverageYear50()==0?null:tier1CapitalYear50() / totalAssetsForLeverageYear50();
    }

    var returnOnAverageEquityYear50 = function () {
        return (netIncomeYear50() / ((bankEquityCapitalYear50() + parseFloat($scope.BankEquityCapitalPriorYear)) / 2)) * 100;
    }

    var mvEquityYear50 = function () {
        return bankEquityCapitalYear50() * 1.5;
    }

    var sharesOutstandingYear50 = function () {
        return $scope.SelectedScenario5.sharesOutstandingActualYear0==null?0:parseFloat($scope.SelectedScenario5.sharesOutstandingActualYear0);
    }

    var bvSharePriceYear50 = function () {
        return sharesOutstandingYear50()==0?null:bankEquityCapitalYear50() * 1000 / sharesOutstandingYear50();
    }

    var mvSharePriceYear50 = function () {
        return sharesOutstandingYear50()==0?null:mvEquityYear50() * 1000 / sharesOutstandingYear50();
    }

    var earningsPerSharePriceYear50 = function () {
        return sharesOutstandingYear50()==0?null:netIncomeYear50() * 1000 / sharesOutstandingYear50();
    }

    var earningsPerShare15PriceYear50 = function () {
        return earningsPerSharePriceYear50() * 15;
    }

    var earningsPerShare20PriceYear50 = function () {
        return earningsPerSharePriceYear50() * 20;
    }

    var dividendPerSharePriceYear50 = function () {
        return sharesOutstandingYear50()==0?null:dividendsYear50() * (-1000) / sharesOutstandingYear50();
    }
            
    // Year 1 Calculations for Column 5
    var assetGrowthRateYear51 = function () {
        return $scope.SelectedScenario5.assetGrowthRateYear1==null?0:parseFloat($scope.SelectedScenario5.assetGrowthRateYear1);
    }

    var newAcquisitionAssetsYear51 = function () {
        return $scope.SelectedScenario5.newAcquisitionAssetsYear1==null?0:parseFloat($scope.SelectedScenario5.newAcquisitionAssetsYear1);
    }

    var totalAssetsYear51 = function () {
        return (totalAssetsYear50() * (1 + (assetGrowthRateYear51()/100))) + newAcquisitionAssetsYear51();
    }
            
    var returnOnAverageAssetsYear51 = function () {
        if ($scope.chkNetIncomeS5 === true) {
            return ((netIncomeYear51() / ((totalAssetsYear50() + totalAssetsYear51()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario5.returnOnAverageAssetsYear1==null?0:parseFloat($scope.SelectedScenario5.returnOnAverageAssetsYear1);
    }

    var netIncomeYear51 = function () {
        if ($scope.chkNetIncomeS5 === true)
            return $scope.SelectedScenario5.netIncomeYear1;
        else
            return ((totalAssetsYear50() + totalAssetsYear51()) / 2) * (returnOnAverageAssetsYear51()/100);
    }
            
    var dividendsRateYear51 = function () {
        return $scope.SelectedScenario5.dividendsRateYear1==null?0:parseFloat($scope.SelectedScenario5.dividendsRateYear1);
    }
            
    var dividendsYear51 = function () {
        if ($scope.chkCashDividendsS5 === true)
            return $scope.SelectedScenario5.dividendsYear1;
        else
            return netIncomeYear51() * (dividendsRateYear51()/100);
    }

    var newCapitalYear51 = function () {
        return $scope.SelectedScenario5.newCapitalYear1==null?0:parseFloat($scope.SelectedScenario5.newCapitalYear1);
    }

    var bankEquityCapitalYear51 = function () {
        return bankEquityCapitalYear50() + netIncomeYear51() - dividendsYear51() + newCapitalYear51();
    }

    var cet1CapitalAdjustmentYear51 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear51 = function () {
        if ($scope.chkTier1CapitalAdjustmentS5 === true)
            return $scope.SelectedScenario5.tier1CapitalAdjustmentYear1;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear51 = function () {
        return bankEquityCapitalYear51() + cet1CapitalAdjustmentYear51() + tier1CapitalAdjustmentYear51();
    }

    var tier1CapitalYear51 = function () {
        return bankEquityCapitalYear51() + tier1CapitalAdjustmentYear51();
    }

    var tier2CapitalYear51 = function () {
        if ($scope.chkTier2CapitalS5 === true)
            return $scope.SelectedScenario5.tier2CapitalYear1;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear51();
    }

    var totalRiskBasedCapitalYear51 = function () {
        return tier1CapitalYear51() + tier2CapitalYear51();
    }

    var riskWeightedAssetsYear51 = function () {
        if ($scope.chkRiskWeightedAssetsS5 === true) {
            return $scope.SelectedScenario5.riskWeightedAssetsYear1;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear51();
        }
    }

    var totalAssetsForLeverageYear51 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear51();
    }

    var cet1CapitalRatioYear51 = function () {
        return riskWeightedAssetsYear51()==0?null:cet1CapitalYear51() / riskWeightedAssetsYear51();
    }

    var tier1RBCRatioYear51 = function () {
        return (tier1CapitalYear51() / riskWeightedAssetsYear51()) * 100;
    }

    var totalRBCRatioYear51 = function () {
        return (totalRiskBasedCapitalYear51() / riskWeightedAssetsYear51()) * 100;
    }

    var tier1LeverageRatioYear51 = function () {
        return (tier1CapitalYear51() / totalAssetsForLeverageYear51());
    }

    var returnOnAverageEquityYear51 = function () {
        return (netIncomeYear51() / ((bankEquityCapitalYear51() + bankEquityCapitalYear50()) / 2)) * 100;
    }

    var mvEquityYear51 = function () {
        return bankEquityCapitalYear51() * 1.5;
    }

    var sharesOutstandingYear51 = function () {
        return $scope.SelectedScenario5.sharesOutstandingActualYear1==null?0:parseFloat($scope.SelectedScenario5.sharesOutstandingActualYear1);
    }

    var bvSharePriceYear51 = function () {
        return sharesOutstandingYear51()==0?null:bankEquityCapitalYear51() * 1000 / sharesOutstandingYear51();
    }

    var mvSharePriceYear51 = function () {
        return sharesOutstandingYear51()==0?null:mvEquityYear51() * 1000 / sharesOutstandingYear51();
    }

    var earningsPerSharePriceYear51 = function () {
        return sharesOutstandingYear51()==0?null:netIncomeYear51() * 1000 / sharesOutstandingYear51();
    }

    var earningsPerShare15PriceYear51 = function () {
        return earningsPerSharePriceYear51() * 15;
    }

    var earningsPerShare20PriceYear51 = function () {
        return earningsPerSharePriceYear51() * 20;
    }

    var dividendPerSharePriceYear51 = function () {
        return sharesOutstandingYear51()==0?null:dividendsYear51() * (-1000) / sharesOutstandingYear51();
    }
            
    // Year 2 Calculations for Column 5
    var assetGrowthRateYear52 = function () {
        return $scope.SelectedScenario5.assetGrowthRateYear2==null?0:parseFloat($scope.SelectedScenario5.assetGrowthRateYear2);
    }

    var newAcquisitionAssetsYear52 = function () {
        return $scope.SelectedScenario5.newAcquisitionAssetsYear2==null?0:parseFloat($scope.SelectedScenario5.newAcquisitionAssetsYear2);
    }

    var totalAssetsYear52 = function () {
        return (totalAssetsYear51() * (1 + (assetGrowthRateYear52()/100))) + newAcquisitionAssetsYear52();
    }
            
    var returnOnAverageAssetsYear52 = function () {
        if ($scope.chkNetIncomeS5 === true) {
            return ((netIncomeYear52() / ((totalAssetsYear51() + totalAssetsYear52()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario5.returnOnAverageAssetsYear2==null?0:parseFloat($scope.SelectedScenario5.returnOnAverageAssetsYear2);
    }

    var netIncomeYear52 = function () {
        if ($scope.chkNetIncomeS5 === true)
            return $scope.SelectedScenario5.netIncomeYear2;
        else
            return ((totalAssetsYear51() + totalAssetsYear52()) / 2) * (returnOnAverageAssetsYear52()/100);
    }
            
    var dividendsRateYear52 = function () {
        return $scope.SelectedScenario5.dividendsRateYear2==null?0:parseFloat($scope.SelectedScenario5.dividendsRateYear2);
    }
            
    var dividendsYear52 = function () {
        if ($scope.chkCashDividendsS5 === true)
            return $scope.SelectedScenario5.dividendsYear2;
        else
            return netIncomeYear52() * (dividendsRateYear52()/100);
    }

    var newCapitalYear52 = function () {
        return $scope.SelectedScenario5.newCapitalYear2==null?0:parseFloat($scope.SelectedScenario5.newCapitalYear2);
    }

    var bankEquityCapitalYear52 = function () {
        return bankEquityCapitalYear51() + netIncomeYear52() - dividendsYear52() + newCapitalYear52();
    }

    var cet1CapitalAdjustmentYear52 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear52 = function () {
        if ($scope.chkTier1CapitalAdjustmentS5 === true)
            return $scope.SelectedScenario5.tier1CapitalAdjustmentYear2;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear52 = function () {
        return bankEquityCapitalYear52() + cet1CapitalAdjustmentYear52() + tier1CapitalAdjustmentYear52();
    }

    var tier1CapitalYear52 = function () {
        return bankEquityCapitalYear52() + tier1CapitalAdjustmentYear52();
    }

    var tier2CapitalYear52 = function () {
        if ($scope.chkTier2CapitalS5 === true)
            return $scope.SelectedScenario5.tier2CapitalYear2;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear52();
    }

    var totalRiskBasedCapitalYear52 = function () {
        return tier1CapitalYear52() + tier2CapitalYear52();
    }

    var riskWeightedAssetsYear52 = function () {
        if ($scope.chkRiskWeightedAssetsS5 === true) {
            return $scope.SelectedScenario5.riskWeightedAssetsYear2;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear52();
        }
    }

    var totalAssetsForLeverageYear52 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear52();
    }

    var cet1CapitalRatioYear52 = function () {
        return riskWeightedAssetsYear52()==0?null:cet1CapitalYear52() / riskWeightedAssetsYear52();
    }

    var tier1RBCRatioYear52 = function () {
        return (tier1CapitalYear52() / riskWeightedAssetsYear52()) * 100;
    }

    var totalRBCRatioYear52 = function () {
        return (totalRiskBasedCapitalYear52() / riskWeightedAssetsYear52()) * 100;
    }

    var tier1LeverageRatioYear52 = function () {
        return (tier1CapitalYear52() / totalAssetsForLeverageYear52());
    }

    var returnOnAverageEquityYear52 = function () {
        return (netIncomeYear52() / ((bankEquityCapitalYear52() + bankEquityCapitalYear51()) / 2)) * 100;
    }

    var mvEquityYear52 = function () {
        return bankEquityCapitalYear52() * 1.5;
    }

    var sharesOutstandingYear52 = function () {
        return $scope.SelectedScenario5.sharesOutstandingActualYear2==null?0:parseFloat($scope.SelectedScenario5.sharesOutstandingActualYear2);
    }

    var bvSharePriceYear52 = function () {
        return sharesOutstandingYear52()==0?null:bankEquityCapitalYear52() * 1000 / sharesOutstandingYear52();
    }

    var mvSharePriceYear52 = function () {
        return sharesOutstandingYear52()==0?null:mvEquityYear52() * 1000 / sharesOutstandingYear52();
    }

    var earningsPerSharePriceYear52 = function () {
        return sharesOutstandingYear52()==0?null:netIncomeYear52() * 1000 / sharesOutstandingYear52();
    }

    var earningsPerShare15PriceYear52 = function () {
        return earningsPerSharePriceYear52() * 15;
    }

    var earningsPerShare20PriceYear52 = function () {
        return earningsPerSharePriceYear52() * 20;
    }

    var dividendPerSharePriceYear52 = function () {
        return sharesOutstandingYear52()==0?null:dividendsYear52() * (-1000) / sharesOutstandingYear52();
    }
            
    // Year 3 Calculations for Column 5
    var assetGrowthRateYear53 = function () {
        return $scope.SelectedScenario5.assetGrowthRateYear3==null?0:parseFloat($scope.SelectedScenario5.assetGrowthRateYear3);
    }

    var newAcquisitionAssetsYear53 = function () {
        return $scope.SelectedScenario5.newAcquisitionAssetsYear3==null?0:parseFloat($scope.SelectedScenario5.newAcquisitionAssetsYear3);
    }

    var totalAssetsYear53 = function () {
        return (totalAssetsYear52() * (1 + (assetGrowthRateYear53()/100))) + newAcquisitionAssetsYear53();
    }
            
    var returnOnAverageAssetsYear53 = function () {
        if ($scope.chkNetIncomeS5 === true) {
            return (netIncomeYear53() / ((totalAssetsYear52() + totalAssetsYear53()) / 2)) * 100;
        }
        else
            return $scope.SelectedScenario5.returnOnAverageAssetsYear3==null?0:parseFloat($scope.SelectedScenario5.returnOnAverageAssetsYear3);
    }

    var netIncomeYear53 = function () {
        if ($scope.chkNetIncomeS5 === true)
            return $scope.SelectedScenario5.netIncomeYear3;
        else
        return ((totalAssetsYear52() + totalAssetsYear53()) / 2) * (returnOnAverageAssetsYear53()/100);
    }
            
    var dividendsRateYear53 = function () {
        return $scope.SelectedScenario5.dividendsRateYear3==null?0:parseFloat($scope.SelectedScenario5.dividendsRateYear3);
    }
            
    var dividendsYear53 = function () {
        if ($scope.chkCashDividendsS5 === true)
            return $scope.SelectedScenario5.dividendsYear3;
        else
            return netIncomeYear53() * (dividendsRateYear53()/100);
    }

    var newCapitalYear53 = function () {
        return $scope.SelectedScenario5.newCapitalYear3==null?0:parseFloat($scope.SelectedScenario5.newCapitalYear3);
    }

    var bankEquityCapitalYear53 = function () {
        return bankEquityCapitalYear52() + netIncomeYear53() - dividendsYear53() + newCapitalYear53();
    }

    var cet1CapitalAdjustmentYear53 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear53 = function () {
        if ($scope.chkTier1CapitalAdjustmentS5 === true)
            return $scope.SelectedScenario5.tier1CapitalAdjustmentYear3;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear53 = function () {
        return bankEquityCapitalYear53() + cet1CapitalAdjustmentYear53() + tier1CapitalAdjustmentYear53();
    }

    var tier1CapitalYear53 = function () {
        return bankEquityCapitalYear53() + tier1CapitalAdjustmentYear53();
    }

    var tier2CapitalYear53 = function () {
        if ($scope.chkTier2CapitalS5 === true)
            return $scope.SelectedScenario5.tier2CapitalYear3;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear53();
    }

    var totalRiskBasedCapitalYear53 = function () {
        return tier1CapitalYear53() + tier2CapitalYear53();
    }

    var riskWeightedAssetsYear53 = function () {
        if ($scope.chkRiskWeightedAssetsS5 === true) {
            return $scope.SelectedScenario5.riskWeightedAssetsYear3;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear53();
        }
    }

    var totalAssetsForLeverageYear53 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear53();
    }

    var cet1CapitalRatioYear53 = function () {
        return riskWeightedAssetsYear53()==0?null:cet1CapitalYear53() / riskWeightedAssetsYear53();
    }

    var tier1RBCRatioYear53 = function () {
        return (tier1CapitalYear53() / riskWeightedAssetsYear53()) * 100;
    }

    var totalRBCRatioYear53 = function () {
        return (totalRiskBasedCapitalYear53() / riskWeightedAssetsYear53()) * 100;
    }

    var tier1LeverageRatioYear53 = function () {
        return (tier1CapitalYear53() / totalAssetsForLeverageYear53());
    }

    var returnOnAverageEquityYear53 = function () {
        return (netIncomeYear53() / ((bankEquityCapitalYear53() + bankEquityCapitalYear52()) / 2)) * 100;
    }

    var mvEquityYear53 = function () {
        return bankEquityCapitalYear53() * 1.5;
    }

    var sharesOutstandingYear53 = function () {
        return $scope.SelectedScenario5.sharesOutstandingActualYear3==null?0:parseFloat($scope.SelectedScenario5.sharesOutstandingActualYear3);
    }

    var bvSharePriceYear53 = function () {
        return sharesOutstandingYear53()==0?null:bankEquityCapitalYear53() * 1000 / sharesOutstandingYear53();
    }

    var mvSharePriceYear53 = function () {
        return sharesOutstandingYear53()==0?null:mvEquityYear53() * 1000 / sharesOutstandingYear53();
    }

    var earningsPerSharePriceYear53 = function () {
        return sharesOutstandingYear53()==0?null:netIncomeYear53() * 1000 / sharesOutstandingYear53();
    }

    var earningsPerShare15PriceYear53 = function () {
        return earningsPerSharePriceYear53() * 15;
    }

    var earningsPerShare20PriceYear53 = function () {
        return earningsPerSharePriceYear53() * 20;
    }

    var dividendPerSharePriceYear53 = function () {
        return sharesOutstandingYear53()==0?null:dividendsYear53() * (-1000) / sharesOutstandingYear53();
    }
            
    // Year 4 Calculations for Column 5
    var assetGrowthRateYear54 = function () {
        return $scope.SelectedScenario5.assetGrowthRateYear4==null?0:parseFloat($scope.SelectedScenario5.assetGrowthRateYear4);
    }

    var newAcquisitionAssetsYear54 = function () {
        return $scope.SelectedScenario5.newAcquisitionAssetsYear4==null?0:parseFloat($scope.SelectedScenario5.newAcquisitionAssetsYear4);
    }

    var totalAssetsYear54 = function () {
        return (totalAssetsYear53() * (1 + (assetGrowthRateYear54()/100))) + newAcquisitionAssetsYear54();
    }
            
    var returnOnAverageAssetsYear54 = function () {
        if ($scope.chkNetIncomeS5 === true) {
            return ((netIncomeYear54() / ((totalAssetsYear53() + totalAssetsYear54()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario5.returnOnAverageAssetsYear4==null?0:parseFloat($scope.SelectedScenario5.returnOnAverageAssetsYear4);
    }

    var netIncomeYear54 = function () {
        if ($scope.chkNetIncomeS5 === true)
            return $scope.SelectedScenario5.netIncomeYear4;
        else
            return ((totalAssetsYear53() + totalAssetsYear54()) / 2) * (returnOnAverageAssetsYear54()/100);
    }
            
    var dividendsRateYear54 = function () {
        return $scope.SelectedScenario5.dividendsRateYear4==null?0:parseFloat($scope.SelectedScenario5.dividendsRateYear4);
    }
            
    var dividendsYear54 = function () {
        if ($scope.chkCashDividendsS5 === true)
            return $scope.SelectedScenario5.dividendsYear4;
        else
            return netIncomeYear54() * (dividendsRateYear54()/100);
    }

    var newCapitalYear54 = function () {
        return $scope.SelectedScenario5.newCapitalYear4==null?0:parseFloat($scope.SelectedScenario5.newCapitalYear4);
    }

    var bankEquityCapitalYear54 = function () {
        return bankEquityCapitalYear53() + netIncomeYear54() - dividendsYear54() + newCapitalYear54();
    }

    var cet1CapitalAdjustmentYear54 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear54 = function () {
        if ($scope.chkTier1CapitalAdjustmentS5 === true)
            return $scope.SelectedScenario5.tier1CapitalAdjustmentYear4;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear54 = function () {
        return bankEquityCapitalYear54() + cet1CapitalAdjustmentYear54() + tier1CapitalAdjustmentYear54();
    }

    var tier1CapitalYear54 = function () {
        return bankEquityCapitalYear54() + tier1CapitalAdjustmentYear54();
    }

    var tier2CapitalYear54 = function () {
        if ($scope.chkTier2CapitalS5 === true)
            return $scope.SelectedScenario5.tier2CapitalYear4;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear54();
    }

    var totalRiskBasedCapitalYear54 = function () {
        return tier1CapitalYear54() + tier2CapitalYear54();
    }

    var riskWeightedAssetsYear54 = function () {
        if ($scope.chkRiskWeightedAssetsS5 === true) {
            return $scope.SelectedScenario5.riskWeightedAssetsYear4;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear54();
        }
    }

    var totalAssetsForLeverageYear54 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear54();
    }

    var cet1CapitalRatioYear54 = function () {
        return riskWeightedAssetsYear54()==0?null:cet1CapitalYear54() / riskWeightedAssetsYear54();
    }

    var tier1RBCRatioYear54 = function () {
        return (tier1CapitalYear54() / riskWeightedAssetsYear54()) * 100;
    }

    var totalRBCRatioYear54 = function () {
        return (totalRiskBasedCapitalYear54() / riskWeightedAssetsYear54()) * 100;
    }

    var tier1LeverageRatioYear54 = function () {
        return (tier1CapitalYear54() / totalAssetsForLeverageYear54());
    }

    var returnOnAverageEquityYear54 = function () {
        return (netIncomeYear54() / ((bankEquityCapitalYear54() + bankEquityCapitalYear53()) / 2)) * 100;
    }

    var mvEquityYear54 = function () {
        return bankEquityCapitalYear54() * 1.5;
    }

    var sharesOutstandingYear54 = function () {
        return $scope.SelectedScenario5.sharesOutstandingActualYear4==null?0:parseFloat($scope.SelectedScenario5.sharesOutstandingActualYear4);
    }

    var bvSharePriceYear54 = function () {
        return sharesOutstandingYear54()==0?null:bankEquityCapitalYear54() * 1000 / sharesOutstandingYear54();
    }

    var mvSharePriceYear54 = function () {
        return sharesOutstandingYear54()==0?null:mvEquityYear54() * 1000 / sharesOutstandingYear54();
    }

    var earningsPerSharePriceYear54 = function () {
        return sharesOutstandingYear54()==0?null:netIncomeYear54() * 1000 / sharesOutstandingYear54();
    }

    var earningsPerShare15PriceYear54 = function () {
        return earningsPerSharePriceYear54() * 15;
    }

    var earningsPerShare20PriceYear54 = function () {
        return earningsPerSharePriceYear54() * 20;
    }

    var dividendPerSharePriceYear54 = function () {
        return sharesOutstandingYear54()==0?null:dividendsYear54() * (-1000) / sharesOutstandingYear54();
    }
            
    // Year 5 Calculations for Column 5
    var assetGrowthRateYear55 = function () {
        return $scope.SelectedScenario5.assetGrowthRateYear5==null?0:parseFloat($scope.SelectedScenario5.assetGrowthRateYear5);
    }

    var newAcquisitionAssetsYear55 = function () {
        return $scope.SelectedScenario5.newAcquisitionAssetsYear5==null?0:parseFloat($scope.SelectedScenario5.newAcquisitionAssetsYear5);
    }

    var totalAssetsYear55 = function () {
        return (totalAssetsYear54() * (1 + (assetGrowthRateYear55() / 100))) + newAcquisitionAssetsYear55();
    }
            
    var returnOnAverageAssetsYear55 = function () {
        if ($scope.chkNetIncomeS5 === true) {
            return ((netIncomeYear55() / ((totalAssetsYear54() + totalAssetsYear55()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario5.returnOnAverageAssetsYear5==null?0:parseFloat($scope.SelectedScenario5.returnOnAverageAssetsYear5);
    }

    var netIncomeYear55 = function () {
        if ($scope.chkNetIncomeS5 === true)
            return $scope.SelectedScenario5.netIncomeYear5;
        else
            return ((totalAssetsYear54() + totalAssetsYear55()) / 2) * (returnOnAverageAssetsYear55()/100);
    }
            
    var dividendsRateYear55 = function () {
        return $scope.SelectedScenario5.dividendsRateYear5==null?0:parseFloat($scope.SelectedScenario5.dividendsRateYear5);
    }
            
    var dividendsYear55 = function () {
        if ($scope.chkCashDividendsS5 === true)
            return $scope.SelectedScenario5.dividendsYear5;
        else
            return netIncomeYear55() * (dividendsRateYear55()/100);
    }

    var newCapitalYear55 = function () {
        return $scope.SelectedScenario5.newCapitalYear5==null?0:parseFloat($scope.SelectedScenario5.newCapitalYear5);
    }

    var bankEquityCapitalYear55 = function () {
        return bankEquityCapitalYear54() + netIncomeYear55() - dividendsYear55() + newCapitalYear55();
    }

    var cet1CapitalAdjustmentYear55 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear55 = function () {
        if ($scope.chkTier1CapitalAdjustmentS5 === true)
            return $scope.SelectedScenario5.tier1CapitalAdjustmentYear5;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear55 = function () {
        return bankEquityCapitalYear55() + cet1CapitalAdjustmentYear55() + tier1CapitalAdjustmentYear55();
    }

    var tier1CapitalYear55 = function () {
        return bankEquityCapitalYear55() + tier1CapitalAdjustmentYear55();
    }

    var tier2CapitalYear55 = function () {
        if ($scope.chkTier2CapitalS5 === true)
            return $scope.SelectedScenario5.tier2CapitalYear5;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear55();
    }

    var totalRiskBasedCapitalYear55 = function () {
        return tier1CapitalYear55() + tier2CapitalYear55();
    }

    var riskWeightedAssetsYear55 = function () {
        if ($scope.chkRiskWeightedAssetsS5 === true) {
            return $scope.SelectedScenario5.riskWeightedAssetsYear5;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear55();
        }
    }

    var totalAssetsForLeverageYear55 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear55();
    }

    var cet1CapitalRatioYear55 = function () {
        return riskWeightedAssetsYear55()==0?null:cet1CapitalYear55() / riskWeightedAssetsYear55();
    }

    var tier1RBCRatioYear55 = function () {
        return (tier1CapitalYear55() / riskWeightedAssetsYear55()) * 100;
    }

    var totalRBCRatioYear55 = function () {
        return (totalRiskBasedCapitalYear55() / riskWeightedAssetsYear55()) * 100;
    }

    var tier1LeverageRatioYear55 = function () {
        return (tier1CapitalYear55() / totalAssetsForLeverageYear55());
    }

    var returnOnAverageEquityYear55 = function () {
        return (netIncomeYear55() / ((bankEquityCapitalYear55() + bankEquityCapitalYear54()) / 2)) * 100;
    }

    var mvEquityYear55 = function () {
        return bankEquityCapitalYear55() * 1.5;
    }

    var sharesOutstandingYear55 = function () {
        return $scope.SelectedScenario5.sharesOutstandingActualYear5==null?0:parseFloat($scope.SelectedScenario5.sharesOutstandingActualYear5);
    }

    var bvSharePriceYear55 = function () {
        return sharesOutstandingYear55()==0?null:bankEquityCapitalYear55() * 1000 / sharesOutstandingYear55();
    }

    var mvSharePriceYear55 = function () {
        return sharesOutstandingYear55()==0?null:mvEquityYear55() * 1000 / sharesOutstandingYear55();
    }

    var earningsPerSharePriceYear55 = function () {
        return sharesOutstandingYear55()==0?null:netIncomeYear55() * 1000 / sharesOutstandingYear55();
    }

    var earningsPerShare15PriceYear55 = function () {
        return earningsPerSharePriceYear55() * 15;
    }

    var earningsPerShare20PriceYear55 = function () {
        return earningsPerSharePriceYear55() * 20;
    }

    var dividendPerSharePriceYear55 = function () {
        return sharesOutstandingYear55()==0?null:dividendsYear55() * (-1000) / sharesOutstandingYear55();
    }
            
    // Year 0 Calculations for Column 6
    var assetGrowthRateYear60 = function () {
        return $scope.SelectedScenario6.assetGrowthRateYear0==null?0:parseFloat($scope.SelectedScenario6.assetGrowthRateYear0);
    }

    var newAcquisitionAssetsYear60 = function () {
        if (typeof $scope.SelectedScenario6.newAcquisitionAssetsYear0 !== 'undefined' && $scope.SelectedScenario6.newAcquisitionAssetsYear0 !== null)
            return parseFloat($scope.SelectedScenario6.newAcquisitionAssetsYear0);
        else
            return 0;
    }

    var totalAssetsYear60 = function () {
        return (parseFloat($scope.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear60() / 100))) + newAcquisitionAssetsYear60();
    }
            
    var returnOnAverageAssetsYear60 = function () {
        if ($scope.chkNetIncomeS6 === true) {
            return ((netIncomeYear60() / (($scope.TotalAssetsPriorYear + totalAssetsYear60()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario6.returnOnAverageAssetsYear0==null?0:parseFloat($scope.SelectedScenario6.returnOnAverageAssetsYear0);
    }

    var netIncomeYear60 = function () {
        if ($scope.chkNetIncomeS6 === true)
            return $scope.SelectedScenario6.netIncomeYear0;
        else
            return ((parseFloat($scope.TotalAssetsPriorYear) + totalAssetsYear60()) / 2) * (returnOnAverageAssetsYear60()/100);
    }
            
    var dividendsRateYear60 = function () {
        return $scope.SelectedScenario6.dividendsRateYear0==null?0:parseFloat($scope.SelectedScenario6.dividendsRateYear0);
    }
            
    var dividendsYear60 = function () {
        if ($scope.chkCashDividendsS6 === true)
            return $scope.SelectedScenario6.dividendsYear0;
        else
            return netIncomeYear60() * (dividendsRateYear60()/100);
    }

    var newCapitalYear60 = function () {
        return $scope.SelectedScenario6.newCapitalYear0==null?0:parseFloat($scope.SelectedScenario6.newCapitalYear0);
    }

    var bankEquityCapitalYear60 = function () {
        return parseFloat($scope.BankEquityCapitalPriorYear) + netIncomeYear60() - dividendsYear60() + newCapitalYear60();
    }

    var cet1CapitalAdjustmentYear60 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear60 = function () {
        if ($scope.chkTier1CapitalAdjustmentS6 === true)
            return $scope.SelectedScenario6.tier1CapitalAdjustmentYear0;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear60 = function () {
        return bankEquityCapitalYear60() + cet1CapitalAdjustmentYear60() + tier1CapitalAdjustmentYear60();
    }

    var tier1CapitalYear60 = function () {
        return bankEquityCapitalYear60() + tier1CapitalAdjustmentYear60();
    }

    var tier2CapitalYear60 = function () {
        if ($scope.chkTier2CapitalS6 === true)
            return $scope.SelectedScenario6.tier2CapitalYear0;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear60();
    }

    var totalRiskBasedCapitalYear60 = function () {
        return tier1CapitalYear60() + tier2CapitalYear60();
    }

    var riskWeightedAssetsYear60 = function () {
        if ($scope.chkRiskWeightedAssetsS6 === true) {
            return $scope.SelectedScenario6.riskWeightedAssetsYear0;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear60();
        }
    }

    var totalAssetsForLeverageYear60 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear60();
    }

    var cet1CapitalRatioYear60 = function () {
        return riskWeightedAssetsYear60()==0?null:cet1CapitalYear60() / riskWeightedAssetsYear60();
    }

    var tier1RBCRatioYear60 = function () {
        return (tier1CapitalYear60() / riskWeightedAssetsYear60()) * 100;
    }

    var totalRBCRatioYear60 = function () {
        return (totalRiskBasedCapitalYear60() / riskWeightedAssetsYear60()) * 100;
    }

    var tier1LeverageRatioYear60 = function () {
        return totalAssetsForLeverageYear60()==0?null:tier1CapitalYear60() / totalAssetsForLeverageYear60();
    }

    var returnOnAverageEquityYear60 = function () {
        return (netIncomeYear60() / ((bankEquityCapitalYear60() + parseFloat($scope.BankEquityCapitalPriorYear)) / 2)) * 100;
    }

    var mvEquityYear60 = function () {
        return bankEquityCapitalYear60() * 1.5;
    }

    var sharesOutstandingYear60 = function () {
        return $scope.SelectedScenario6.sharesOutstandingActualYear0==null?0:parseFloat($scope.SelectedScenario6.sharesOutstandingActualYear0);
    }

    var bvSharePriceYear60 = function () {
        return sharesOutstandingYear60()==0?null:bankEquityCapitalYear60() * 1000 / sharesOutstandingYear60();
    }

    var mvSharePriceYear60 = function () {
        return sharesOutstandingYear60()==0?null:mvEquityYear60() * 1000 / sharesOutstandingYear60();
    }

    var earningsPerSharePriceYear60 = function () {
        return sharesOutstandingYear60()==0?null:netIncomeYear60() * 1000 / sharesOutstandingYear60();
    }

    var earningsPerShare15PriceYear60 = function () {
        return earningsPerSharePriceYear60() * 15;
    }

    var earningsPerShare20PriceYear60 = function () {
        return earningsPerSharePriceYear60() * 20;
    }

    var dividendPerSharePriceYear60 = function () {
        return sharesOutstandingYear60()==0?null:dividendsYear60() * (-1000) / sharesOutstandingYear60();
    }
            
    // Year 1 Calculations for Column 6
    var assetGrowthRateYear61 = function () {
        return $scope.SelectedScenario6.assetGrowthRateYear1==null?0:parseFloat($scope.SelectedScenario6.assetGrowthRateYear1);
    }

    var newAcquisitionAssetsYear61 = function () {
        return $scope.SelectedScenario6.newAcquisitionAssetsYear1==null?0:parseFloat($scope.SelectedScenario6.newAcquisitionAssetsYear1);
    }

    var totalAssetsYear61 = function () {
        return (totalAssetsYear60() * (1 + (assetGrowthRateYear61()/100))) + newAcquisitionAssetsYear61();
    }
            
    var returnOnAverageAssetsYear61 = function () {
        if ($scope.chkNetIncomeS6 === true) {
            return ((netIncomeYear61() / ((totalAssetsYear60() + totalAssetsYear61()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario6.returnOnAverageAssetsYear1==null?0:parseFloat($scope.SelectedScenario6.returnOnAverageAssetsYear1);
    }

    var netIncomeYear61 = function () {
        if ($scope.chkNetIncomeS6 === true)
            return $scope.SelectedScenario6.netIncomeYear1;
        else
            return ((totalAssetsYear60() + totalAssetsYear61()) / 2) * (returnOnAverageAssetsYear61()/100);
    }
            
    var dividendsRateYear61 = function () {
        return $scope.SelectedScenario6.dividendsRateYear1==null?0:parseFloat($scope.SelectedScenario6.dividendsRateYear1);
    }
            
    var dividendsYear61 = function () {
        if ($scope.chkCashDividendsS6 === true)
            return $scope.SelectedScenario6.dividendsYear1;
        else
            return netIncomeYear61() * (dividendsRateYear61()/100);
    }

    var newCapitalYear61 = function () {
        return $scope.SelectedScenario6.newCapitalYear1==null?0:parseFloat($scope.SelectedScenario6.newCapitalYear1);
    }

    var bankEquityCapitalYear61 = function () {
        return bankEquityCapitalYear60() + netIncomeYear61() - dividendsYear61() + newCapitalYear61();
    }

    var cet1CapitalAdjustmentYear61 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear61 = function () {
        if ($scope.chkTier1CapitalAdjustmentS6 === true)
            return $scope.SelectedScenario6.tier1CapitalAdjustmentYear1;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear61 = function () {
        return bankEquityCapitalYear61() + cet1CapitalAdjustmentYear61() + tier1CapitalAdjustmentYear61();
    }

    var tier1CapitalYear61 = function () {
        return bankEquityCapitalYear61() + tier1CapitalAdjustmentYear61();
    }

    var tier2CapitalYear61 = function () {
        if ($scope.chkTier2CapitalS6 === true)
            return $scope.SelectedScenario6.tier2CapitalYear1;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear61();
    }

    var totalRiskBasedCapitalYear61 = function () {
        return tier1CapitalYear61() + tier2CapitalYear61();
    }

    var riskWeightedAssetsYear61 = function () {
        if ($scope.chkRiskWeightedAssetsS6 === true) {
            return $scope.SelectedScenario6.riskWeightedAssetsYear1;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear61();
        }
    }

    var totalAssetsForLeverageYear61 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear61();
    }

    var cet1CapitalRatioYear61 = function () {
        return riskWeightedAssetsYear61()==0?null:cet1CapitalYear61() / riskWeightedAssetsYear61();
    }

    var tier1RBCRatioYear61 = function () {
        return (tier1CapitalYear61() / riskWeightedAssetsYear61()) * 100;
    }

    var totalRBCRatioYear61 = function () {
        return (totalRiskBasedCapitalYear61() / riskWeightedAssetsYear61()) * 100;
    }

    var tier1LeverageRatioYear61 = function () {
        return (tier1CapitalYear61() / totalAssetsForLeverageYear61());
    }

    var returnOnAverageEquityYear61 = function () {
        return (netIncomeYear61() / ((bankEquityCapitalYear61() + bankEquityCapitalYear60()) / 2)) * 100;
    }

    var mvEquityYear61 = function () {
        return bankEquityCapitalYear61() * 1.5;
    }

    var sharesOutstandingYear61 = function () {
        return $scope.SelectedScenario6.sharesOutstandingActualYear1==null?0:parseFloat($scope.SelectedScenario6.sharesOutstandingActualYear1);
    }

    var bvSharePriceYear61 = function () {
        return sharesOutstandingYear61()==0?null:bankEquityCapitalYear61() * 1000 / sharesOutstandingYear61();
    }

    var mvSharePriceYear61 = function () {
        return sharesOutstandingYear61()==0?null:mvEquityYear61() * 1000 / sharesOutstandingYear61();
    }

    var earningsPerSharePriceYear61 = function () {
        return sharesOutstandingYear61()==0?null:netIncomeYear61() * 1000 / sharesOutstandingYear61();
    }

    var earningsPerShare15PriceYear61 = function () {
        return earningsPerSharePriceYear61() * 15;
    }

    var earningsPerShare20PriceYear61 = function () {
        return earningsPerSharePriceYear61() * 20;
    }

    var dividendPerSharePriceYear61 = function () {
        return sharesOutstandingYear61()==0?null:dividendsYear61() * (-1000) / sharesOutstandingYear61();
    }
            
    // Year 2 Calculations for Column 6
    var assetGrowthRateYear62 = function () {
        return $scope.SelectedScenario6.assetGrowthRateYear2==null?0:parseFloat($scope.SelectedScenario6.assetGrowthRateYear2);
    }

    var newAcquisitionAssetsYear62 = function () {
        return $scope.SelectedScenario6.newAcquisitionAssetsYear2==null?0:parseFloat($scope.SelectedScenario6.newAcquisitionAssetsYear2);
    }

    var totalAssetsYear62 = function () {
        return (totalAssetsYear61() * (1 + (assetGrowthRateYear62()/100))) + newAcquisitionAssetsYear62();
    }
            
    var returnOnAverageAssetsYear62 = function () {
        if ($scope.chkNetIncomeS6 === true) {
            return ((netIncomeYear62() / ((totalAssetsYear61() + totalAssetsYear62()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario6.returnOnAverageAssetsYear2==null?0:parseFloat($scope.SelectedScenario6.returnOnAverageAssetsYear2);
    }

    var netIncomeYear62 = function () {
        if ($scope.chkNetIncomeS6 === true)
            return $scope.SelectedScenario6.netIncomeYear2;
        else
            return ((totalAssetsYear61() + totalAssetsYear62()) / 2) * (returnOnAverageAssetsYear62()/100);
    }
            
    var dividendsRateYear62 = function () {
        return $scope.SelectedScenario6.dividendsRateYear2==null?0:parseFloat($scope.SelectedScenario6.dividendsRateYear2);
    }
            
    var dividendsYear62 = function () {
        if ($scope.chkCashDividendsS6 === true)
            return $scope.SelectedScenario6.dividendsYear2;
        else
            return netIncomeYear62() * (dividendsRateYear62()/100);
    }

    var newCapitalYear62 = function () {
        return $scope.SelectedScenario6.newCapitalYear2==null?0:parseFloat($scope.SelectedScenario6.newCapitalYear2);
    }

    var bankEquityCapitalYear62 = function () {
        return bankEquityCapitalYear61() + netIncomeYear62() - dividendsYear62() + newCapitalYear62();
    }

    var cet1CapitalAdjustmentYear62 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear62 = function () {
        if ($scope.chkTier1CapitalAdjustmentS6 === true)
            return $scope.SelectedScenario6.tier1CapitalAdjustmentYear2;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear62 = function () {
        return bankEquityCapitalYear62() + cet1CapitalAdjustmentYear62() + tier1CapitalAdjustmentYear62();
    }

    var tier1CapitalYear62 = function () {
        return bankEquityCapitalYear62() + tier1CapitalAdjustmentYear62();
    }

    var tier2CapitalYear62 = function () {
        if ($scope.chkTier2CapitalS6 === true)
            return $scope.SelectedScenario6.tier2CapitalYear2;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear62();
    }

    var totalRiskBasedCapitalYear62 = function () {
        return tier1CapitalYear62() + tier2CapitalYear62();
    }

    var riskWeightedAssetsYear62 = function () {
        if ($scope.chkRiskWeightedAssetsS6 === true) {
            return $scope.SelectedScenario6.riskWeightedAssetsYear2;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear62();
        }
    }

    var totalAssetsForLeverageYear62 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear62();
    }

    var cet1CapitalRatioYear62 = function () {
        return riskWeightedAssetsYear62()==0?null:cet1CapitalYear62() / riskWeightedAssetsYear62();
    }

    var tier1RBCRatioYear62 = function () {
        return (tier1CapitalYear62() / riskWeightedAssetsYear62()) * 100;
    }

    var totalRBCRatioYear62 = function () {
        return (totalRiskBasedCapitalYear62() / riskWeightedAssetsYear62()) * 100;
    }

    var tier1LeverageRatioYear62 = function () {
        return (tier1CapitalYear62() / totalAssetsForLeverageYear62());
    }

    var returnOnAverageEquityYear62 = function () {
        return (netIncomeYear62() / ((bankEquityCapitalYear62() + bankEquityCapitalYear61()) / 2)) * 100;
    }

    var mvEquityYear62 = function () {
        return bankEquityCapitalYear62() * 1.5;
    }

    var sharesOutstandingYear62 = function () {
        return $scope.SelectedScenario6.sharesOutstandingActualYear2==null?0:parseFloat($scope.SelectedScenario6.sharesOutstandingActualYear2);
    }

    var bvSharePriceYear62 = function () {
        return sharesOutstandingYear62()==0?null:bankEquityCapitalYear62() * 1000 / sharesOutstandingYear62();
    }

    var mvSharePriceYear62 = function () {
        return sharesOutstandingYear62()==0?null:mvEquityYear62() * 1000 / sharesOutstandingYear62();
    }

    var earningsPerSharePriceYear62 = function () {
        return sharesOutstandingYear62()==0?null:netIncomeYear62() * 1000 / sharesOutstandingYear62();
    }

    var earningsPerShare15PriceYear62 = function () {
        return earningsPerSharePriceYear62() * 15;
    }

    var earningsPerShare20PriceYear62 = function () {
        return earningsPerSharePriceYear62() * 20;
    }

    var dividendPerSharePriceYear62 = function () {
        return sharesOutstandingYear62()==0?null:dividendsYear62() * (-1000) / sharesOutstandingYear62();
    }
            
    // Year 3 Calculations for Column 6
    var assetGrowthRateYear63 = function () {
        return $scope.SelectedScenario6.assetGrowthRateYear3==null?0:parseFloat($scope.SelectedScenario6.assetGrowthRateYear3);
    }

    var newAcquisitionAssetsYear63 = function () {
        return $scope.SelectedScenario6.newAcquisitionAssetsYear3==null?0:parseFloat($scope.SelectedScenario6.newAcquisitionAssetsYear3);
    }

    var totalAssetsYear63 = function () {
        return (totalAssetsYear62() * (1 + (assetGrowthRateYear63()/100))) + newAcquisitionAssetsYear63();
    }
            
    var returnOnAverageAssetsYear63 = function () {
        if ($scope.chkNetIncomeS6 === true) {
            return (netIncomeYear63() / ((totalAssetsYear62() + totalAssetsYear63()) / 2)) * 100;
        }
        else
            return $scope.SelectedScenario6.returnOnAverageAssetsYear3==null?0:parseFloat($scope.SelectedScenario6.returnOnAverageAssetsYear3);
    }

    var netIncomeYear63 = function () {
        if ($scope.chkNetIncomeS6 === true)
            return $scope.SelectedScenario6.netIncomeYear3;
        else
            return ((totalAssetsYear62() + totalAssetsYear63()) / 2) * (returnOnAverageAssetsYear63()/100);
    }
            
    var dividendsRateYear63 = function () {
        return $scope.SelectedScenario6.dividendsRateYear3==null?0:parseFloat($scope.SelectedScenario6.dividendsRateYear3);
    }
            
    var dividendsYear63 = function () {
        if ($scope.chkCashDividendsS6 === true)
            return $scope.SelectedScenario6.dividendsYear3;
        else
            return netIncomeYear63() * (dividendsRateYear63()/100);
    }

    var newCapitalYear63 = function () {
        return $scope.SelectedScenario6.newCapitalYear3==null?0:parseFloat($scope.SelectedScenario6.newCapitalYear3);
    }

    var bankEquityCapitalYear63 = function () {
        return bankEquityCapitalYear62() + netIncomeYear63() - dividendsYear63() + newCapitalYear63();
    }

    var cet1CapitalAdjustmentYear63 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear63 = function () {
        if ($scope.chkTier1CapitalAdjustmentS6 === true)
            return $scope.SelectedScenario6.tier1CapitalAdjustmentYear3;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear63 = function () {
        return bankEquityCapitalYear63() + cet1CapitalAdjustmentYear63() + tier1CapitalAdjustmentYear63();
    }

    var tier1CapitalYear63 = function () {
        return bankEquityCapitalYear63() + tier1CapitalAdjustmentYear63();
    }

    var tier2CapitalYear63 = function () {
        if ($scope.chkTier2CapitalS6 === true)
            return $scope.SelectedScenario6.tier2CapitalYear3;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear63();
    }

    var totalRiskBasedCapitalYear63 = function () {
        return tier1CapitalYear63() + tier2CapitalYear63();
    }

    var riskWeightedAssetsYear63 = function () {
        if ($scope.chkRiskWeightedAssetsS6 === true) {
            return $scope.SelectedScenario6.riskWeightedAssetsYear3;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear63();
        }
    }

    var totalAssetsForLeverageYear63 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear63();
    }

    var cet1CapitalRatioYear63 = function () {
        return riskWeightedAssetsYear63()==0?null:cet1CapitalYear63() / riskWeightedAssetsYear63();
    }

    var tier1RBCRatioYear63 = function () {
        return (tier1CapitalYear63() / riskWeightedAssetsYear63()) * 100;
    }

    var totalRBCRatioYear63 = function () {
        return (totalRiskBasedCapitalYear63() / riskWeightedAssetsYear63()) * 100;
    }

    var tier1LeverageRatioYear63 = function () {
        return (tier1CapitalYear63() / totalAssetsForLeverageYear63());
    }

    var returnOnAverageEquityYear63 = function () {
        return (netIncomeYear63() / ((bankEquityCapitalYear63() + bankEquityCapitalYear62()) / 2)) * 100;
    }

    var mvEquityYear63 = function () {
        return bankEquityCapitalYear63() * 1.5;
    }

    var sharesOutstandingYear63 = function () {
        return $scope.SelectedScenario6.sharesOutstandingActualYear3==null?0:parseFloat($scope.SelectedScenario6.sharesOutstandingActualYear3);
    }

    var bvSharePriceYear63 = function () {
        return sharesOutstandingYear63()==0?null:bankEquityCapitalYear63() * 1000 / sharesOutstandingYear63();
    }

    var mvSharePriceYear63 = function () {
        return sharesOutstandingYear63()==0?null:mvEquityYear63() * 1000 / sharesOutstandingYear63();
    }

    var earningsPerSharePriceYear63 = function () {
        return sharesOutstandingYear63()==0?null:netIncomeYear63() * 1000 / sharesOutstandingYear63();
    }

    var earningsPerShare15PriceYear63 = function () {
        return earningsPerSharePriceYear63() * 15;
    }

    var earningsPerShare20PriceYear63 = function () {
        return earningsPerSharePriceYear63() * 20;
    }

    var dividendPerSharePriceYear63 = function () {
        return sharesOutstandingYear63()==0?null:dividendsYear63() * (-1000) / sharesOutstandingYear63();
    }
            
    // Year 4 Calculations for Column 6
    var assetGrowthRateYear64 = function () {
        return $scope.SelectedScenario6.assetGrowthRateYear4==null?0:parseFloat($scope.SelectedScenario6.assetGrowthRateYear4);
    }

    var newAcquisitionAssetsYear64 = function () {
        return $scope.SelectedScenario6.newAcquisitionAssetsYear4==null?0:parseFloat($scope.SelectedScenario6.newAcquisitionAssetsYear4);
    }

    var totalAssetsYear64 = function () {
        return (totalAssetsYear63() * (1 + (assetGrowthRateYear64()/100))) + newAcquisitionAssetsYear64();
    }
            
    var returnOnAverageAssetsYear64 = function () {
        if ($scope.chkNetIncomeS6 === true) {
            return ((netIncomeYear64() / ((totalAssetsYear63() + totalAssetsYear64()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario6.returnOnAverageAssetsYear4==null?0:parseFloat($scope.SelectedScenario6.returnOnAverageAssetsYear4);
    }

    var netIncomeYear64 = function () {
        if ($scope.chkNetIncomeS6 === true)
            return $scope.SelectedScenario6.netIncomeYear4;
        else
            return ((totalAssetsYear63() + totalAssetsYear64()) / 2) * (returnOnAverageAssetsYear64()/100);
    }
            
    var dividendsRateYear64 = function () {
        return $scope.SelectedScenario6.dividendsRateYear4==null?0:parseFloat($scope.SelectedScenario6.dividendsRateYear4);
    }
            
    var dividendsYear64 = function () {
        if ($scope.chkCashDividendsS6 === true)
            return $scope.SelectedScenario6.dividendsYear4;
        else
            return netIncomeYear64() * (dividendsRateYear64()/100);
    }

    var newCapitalYear64 = function () {
        return $scope.SelectedScenario6.newCapitalYear4==null?0:parseFloat($scope.SelectedScenario6.newCapitalYear4);
    }

    var bankEquityCapitalYear64 = function () {
        return bankEquityCapitalYear63() + netIncomeYear64() - dividendsYear64() + newCapitalYear64();
    }

    var cet1CapitalAdjustmentYear64 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear64 = function () {
        if ($scope.chkTier1CapitalAdjustmentS6 === true)
            return $scope.SelectedScenario6.tier1CapitalAdjustmentYear4;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear64 = function () {
        return bankEquityCapitalYear64() + cet1CapitalAdjustmentYear64() + tier1CapitalAdjustmentYear64();
    }

    var tier1CapitalYear64 = function () {
        return bankEquityCapitalYear64() + tier1CapitalAdjustmentYear64();
    }

    var tier2CapitalYear64 = function () {
        if ($scope.chkTier2CapitalS6 === true)
            return $scope.SelectedScenario6.tier2CapitalYear4;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear64();
    }

    var totalRiskBasedCapitalYear64 = function () {
        return tier1CapitalYear64() + tier2CapitalYear64();
    }

    var riskWeightedAssetsYear64 = function () {
        if ($scope.chkRiskWeightedAssetsS6 === true) {
            return $scope.SelectedScenario6.riskWeightedAssetsYear4;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear64();
        }
    }

    var totalAssetsForLeverageYear64 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear64();
    }

    var cet1CapitalRatioYear64 = function () {
        return riskWeightedAssetsYear64()==0?null:cet1CapitalYear64() / riskWeightedAssetsYear64();
    }

    var tier1RBCRatioYear64 = function () {
        return (tier1CapitalYear64() / riskWeightedAssetsYear64()) * 100;
    }

    var totalRBCRatioYear64 = function () {
        return (totalRiskBasedCapitalYear64() / riskWeightedAssetsYear64()) * 100;
    }

    var tier1LeverageRatioYear64 = function () {
        return (tier1CapitalYear64() / totalAssetsForLeverageYear64());
    }

    var returnOnAverageEquityYear64 = function () {
        return (netIncomeYear64() / ((bankEquityCapitalYear64() + bankEquityCapitalYear63()) / 2)) * 100;
    }

    var mvEquityYear64 = function () {
        return bankEquityCapitalYear64() * 1.5;
    }

    var sharesOutstandingYear64 = function () {
        return $scope.SelectedScenario6.sharesOutstandingActualYear4==null?0:parseFloat($scope.SelectedScenario6.sharesOutstandingActualYear4);
    }

    var bvSharePriceYear64 = function () {
        return sharesOutstandingYear64()==0?null:bankEquityCapitalYear64() * 1000 / sharesOutstandingYear64();
    }

    var mvSharePriceYear64 = function () {
        return sharesOutstandingYear64()==0?null:mvEquityYear64() * 1000 / sharesOutstandingYear64();
    }

    var earningsPerSharePriceYear64 = function () {
        return sharesOutstandingYear64()==0?null:netIncomeYear64() * 1000 / sharesOutstandingYear64();
    }

    var earningsPerShare15PriceYear64 = function () {
        return earningsPerSharePriceYear64() * 15;
    }

    var earningsPerShare20PriceYear64 = function () {
        return earningsPerSharePriceYear64() * 20;
    }

    var dividendPerSharePriceYear64 = function () {
        return sharesOutstandingYear64()==0?null:dividendsYear64() * (-1000) / sharesOutstandingYear64();
    }
            
    // Year 5 Calculations for Column 6
    var assetGrowthRateYear65 = function () {
        return $scope.SelectedScenario6.assetGrowthRateYear5==null?0:parseFloat($scope.SelectedScenario6.assetGrowthRateYear5);
    }

    var newAcquisitionAssetsYear65 = function () {
        return $scope.SelectedScenario6.newAcquisitionAssetsYear5==null?0:parseFloat($scope.SelectedScenario6.newAcquisitionAssetsYear5);
    }

    var totalAssetsYear65 = function () {
        return (totalAssetsYear64() * (1 + (assetGrowthRateYear65()/100))) + newAcquisitionAssetsYear65();
    }
            
    var returnOnAverageAssetsYear65 = function () {
        if ($scope.chkNetIncomeS6 === true) {
            return ((netIncomeYear65() / ((totalAssetsYear64() + totalAssetsYear65()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario6.returnOnAverageAssetsYear5==null?0:parseFloat($scope.SelectedScenario6.returnOnAverageAssetsYear5);
    }

    var netIncomeYear65 = function () {
        if ($scope.chkNetIncomeS6 === true)
            return $scope.SelectedScenario6.netIncomeYear5;
        else
            return ((totalAssetsYear64() + totalAssetsYear65()) / 2) * (returnOnAverageAssetsYear65()/100);
    }
            
    var dividendsRateYear65 = function () {
        return $scope.SelectedScenario6.dividendsRateYear5==null?0:parseFloat($scope.SelectedScenario6.dividendsRateYear5);
    }
            
    var dividendsYear65 = function () {
        if ($scope.chkCashDividendsS6 === true)
            return $scope.SelectedScenario6.dividendsYear5;
        else
            return netIncomeYear65() * (dividendsRateYear65()/100);
    }

    var newCapitalYear65 = function () {
        return $scope.SelectedScenario6.newCapitalYear5==null?0:parseFloat($scope.SelectedScenario6.newCapitalYear5);
    }

    var bankEquityCapitalYear65 = function () {
        return bankEquityCapitalYear64() + netIncomeYear65() - dividendsYear65() + newCapitalYear65();
    }

    var cet1CapitalAdjustmentYear65 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear65 = function () {
        if ($scope.chkTier1CapitalAdjustmentS6 === true)
            return $scope.SelectedScenario6.tier1CapitalAdjustmentYear5;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear65 = function () {
        return bankEquityCapitalYear65() + cet1CapitalAdjustmentYear65() + tier1CapitalAdjustmentYear65();
    }

    var tier1CapitalYear65 = function () {
        return bankEquityCapitalYear65() + tier1CapitalAdjustmentYear65();
    }

    var tier2CapitalYear65 = function () {
        if ($scope.chkTier2CapitalS6 === true)
            return $scope.SelectedScenario6.tier2CapitalYear5;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear65();
    }

    var totalRiskBasedCapitalYear65 = function () {
        return tier1CapitalYear65() + tier2CapitalYear65();
    }

    var riskWeightedAssetsYear65 = function () {
        if ($scope.chkRiskWeightedAssetsS6 === true) {
            return $scope.SelectedScenario6.riskWeightedAssetsYear5;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear65();
        }
    }

    var totalAssetsForLeverageYear65 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear65();
    }

    var cet1CapitalRatioYear65 = function () {
        return riskWeightedAssetsYear65()==0?null:cet1CapitalYear65() / riskWeightedAssetsYear65();
    }

    var tier1RBCRatioYear65 = function () {
        return (tier1CapitalYear65() / riskWeightedAssetsYear65()) * 100;
    }

    var totalRBCRatioYear65 = function () {
        return (totalRiskBasedCapitalYear65() / riskWeightedAssetsYear65()) * 100;
    }

    var tier1LeverageRatioYear65 = function () {
        return (tier1CapitalYear65() / totalAssetsForLeverageYear65());
    }

    var returnOnAverageEquityYear65 = function () {
        return (netIncomeYear65() / ((bankEquityCapitalYear65() + bankEquityCapitalYear64()) / 2)) * 100;
    }

    var mvEquityYear65 = function () {
        return bankEquityCapitalYear65() * 1.5;
    }

    var sharesOutstandingYear65 = function () {
        return $scope.SelectedScenario6.sharesOutstandingActualYear5==null?0:parseFloat($scope.SelectedScenario6.sharesOutstandingActualYear5);
    }

    var bvSharePriceYear65 = function () {
        return sharesOutstandingYear65()==0?null:bankEquityCapitalYear65() * 1000 / sharesOutstandingYear65();
    }

    var mvSharePriceYear65 = function () {
        return sharesOutstandingYear65()==0?null:mvEquityYear65() * 1000 / sharesOutstandingYear65();
    }

    var earningsPerSharePriceYear65 = function () {
        return sharesOutstandingYear65()==0?null:netIncomeYear65() * 1000 / sharesOutstandingYear65();
    }

    var earningsPerShare15PriceYear65 = function () {
        return earningsPerSharePriceYear65() * 15;
    }

    var earningsPerShare20PriceYear65 = function () {
        return earningsPerSharePriceYear65() * 20;
    }

    var dividendPerSharePriceYear65 = function () {
        return sharesOutstandingYear65()==0?null:dividendsYear65() * (-1000) / sharesOutstandingYear65();
    }
            
    // Year 0 Calculations for Column 7
    var assetGrowthRateYear70 = function () {
        return $scope.SelectedScenario7.assetGrowthRateYear0==null?0:parseFloat($scope.SelectedScenario7.assetGrowthRateYear0);
    }

    var newAcquisitionAssetsYear70 = function () {
        if (typeof $scope.SelectedScenario7.newAcquisitionAssetsYear0 !== 'undefined' && $scope.SelectedScenario7.newAcquisitionAssetsYear0 !== null)
            return parseFloat($scope.SelectedScenario7.newAcquisitionAssetsYear0);
        else
            return 0;
    }

    var totalAssetsYear70 = function () {
        return (parseFloat($scope.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear70()/100))) + newAcquisitionAssetsYear70();
    }
            
    var returnOnAverageAssetsYear70 = function () {
        if ($scope.chkNetIncomeS7 === true) {
            return ((netIncomeYear70() / (($scope.TotalAssetsPriorYear + totalAssetsYear70()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario7.returnOnAverageAssetsYear0==null?0:parseFloat($scope.SelectedScenario7.returnOnAverageAssetsYear0);
    }

    var netIncomeYear70 = function () {
        if ($scope.chkNetIncomeS7 === true)
            return $scope.SelectedScenario7.netIncomeYear0;
        else
            return ((parseFloat($scope.TotalAssetsPriorYear) + totalAssetsYear70()) / 2) * (returnOnAverageAssetsYear70()/100);
    }
            
    var dividendsRateYear70 = function () {
        return $scope.SelectedScenario7.dividendsRateYear0==null?0:parseFloat($scope.SelectedScenario7.dividendsRateYear0);
    }
            
    var dividendsYear70 = function () {
        if ($scope.chkCashDividendsS7 === true)
            return $scope.SelectedScenario7.dividendsYear0;
        else
            return netIncomeYear70() * (dividendsRateYear70()/100);
    }

    var newCapitalYear70 = function () {
        return $scope.SelectedScenario7.newCapitalYear0==null?0:parseFloat($scope.SelectedScenario7.newCapitalYear0);
    }

    var bankEquityCapitalYear70 = function () {
        return parseFloat($scope.BankEquityCapitalPriorYear) + netIncomeYear70() - dividendsYear70() + newCapitalYear70();
    }

    var cet1CapitalAdjustmentYear70 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear70 = function () {
        if ($scope.chkTier1CapitalAdjustmentS7 === true)
            return $scope.SelectedScenario7.tier1CapitalAdjustmentYear0;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear70 = function () {
        return bankEquityCapitalYear70() + cet1CapitalAdjustmentYear70() + tier1CapitalAdjustmentYear70();
    }

    var tier1CapitalYear70 = function () {
        return bankEquityCapitalYear70() + tier1CapitalAdjustmentYear70();
    }

    var tier2CapitalYear70 = function () {
        if ($scope.chkTier2CapitalS7 === true)
            return $scope.SelectedScenario7.tier2CapitalYear0;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear70();
    }

    var totalRiskBasedCapitalYear70 = function () {
        return tier1CapitalYear70() + tier2CapitalYear70();
    }

    var riskWeightedAssetsYear70 = function () {
        if ($scope.chkRiskWeightedAssetsS7 === true) {
            return $scope.SelectedScenario7.riskWeightedAssetsYear0;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear70();
        }
    }

    var totalAssetsForLeverageYear70 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear70();
    }

    var cet1CapitalRatioYear70 = function () {
        return riskWeightedAssetsYear70() == 0 ? null : cet1CapitalYear70() / riskWeightedAssetsYear70();
    }

    var tier1RBCRatioYear70 = function () {
        return (tier1CapitalYear70() / riskWeightedAssetsYear70()) * 100;
    }

    var totalRBCRatioYear70 = function () {
        return (totalRiskBasedCapitalYear70() / riskWeightedAssetsYear70()) * 100;
    }

    var tier1LeverageRatioYear70 = function () {
        return totalAssetsForLeverageYear70() == 0 ? null : tier1CapitalYear70() / totalAssetsForLeverageYear70();
    }

    var returnOnAverageEquityYear70 = function () {
        return (netIncomeYear70() / ((bankEquityCapitalYear70() + parseFloat($scope.BankEquityCapitalPriorYear)) / 2)) * 100;
    }

    var mvEquityYear70 = function () {
        return bankEquityCapitalYear70() * 1.5;
    }

    var sharesOutstandingYear70 = function () {
        return $scope.SelectedScenario7.sharesOutstandingActualYear0==null?0:parseFloat($scope.SelectedScenario7.sharesOutstandingActualYear0);
    }

    var bvSharePriceYear70 = function () {
        return sharesOutstandingYear70() == 0 ? null : bankEquityCapitalYear70() * 1000 / sharesOutstandingYear70();
    }

    var mvSharePriceYear70 = function () {
        return sharesOutstandingYear70() == 0 ? null : mvEquityYear70() * 1000 / sharesOutstandingYear70();
    }

    var earningsPerSharePriceYear70 = function () {
        return sharesOutstandingYear70() == 0 ? null : netIncomeYear70() * 1000 / sharesOutstandingYear70();
    }

    var earningsPerShare15PriceYear70 = function () {
        return earningsPerSharePriceYear70() * 15;
    }

    var earningsPerShare20PriceYear70 = function () {
        return earningsPerSharePriceYear70() * 20;
    }

    var dividendPerSharePriceYear70 = function () {
        return sharesOutstandingYear70() == 0 ? null : dividendsYear70() * (-1000) / sharesOutstandingYear70();
    }
            
    // Year 1 Calculations for Column 7
    var assetGrowthRateYear71 = function () {
        return $scope.SelectedScenario7.assetGrowthRateYear1==null?0:parseFloat($scope.SelectedScenario7.assetGrowthRateYear1);
    }

    var newAcquisitionAssetsYear71 = function () {
        return $scope.SelectedScenario7.newAcquisitionAssetsYear1==null?0:parseFloat($scope.SelectedScenario7.newAcquisitionAssetsYear1);
    }

    var totalAssetsYear71 = function () {
        return (totalAssetsYear70() * (1 + (assetGrowthRateYear71()/100))) + newAcquisitionAssetsYear71();
    }
            
    var returnOnAverageAssetsYear71 = function () {
        if ($scope.chkNetIncomeS7 === true) {
            return ((netIncomeYear71() / ((totalAssetsYear70() + totalAssetsYear71()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario7.returnOnAverageAssetsYear1 == null ? 0 : parseFloat($scope.SelectedScenario7.returnOnAverageAssetsYear1);
    }

    var netIncomeYear71 = function () {
        if ($scope.chkNetIncomeS7 === true)
            return $scope.SelectedScenario7.netIncomeYear1;
        else
            return ((totalAssetsYear70() + totalAssetsYear71()) / 2) * (returnOnAverageAssetsYear71()/100);
    }
            
    var dividendsRateYear71 = function () {
        return $scope.SelectedScenario7.dividendsRateYear1 == null ? 0 : parseFloat($scope.SelectedScenario7.dividendsRateYear1);
    }
            
    var dividendsYear71 = function () {
        if ($scope.chkCashDividendsS7 === true)
            return $scope.SelectedScenario7.dividendsYear1;
        else
            return netIncomeYear71() * (dividendsRateYear71()/100);
    }

    var newCapitalYear71 = function () {
        return $scope.SelectedScenario7.newCapitalYear1 == null ? 0 : parseFloat($scope.SelectedScenario7.newCapitalYear1);
    }

    var bankEquityCapitalYear71 = function () {
        return bankEquityCapitalYear70() + netIncomeYear71() - dividendsYear71() + newCapitalYear71();
    }

    var cet1CapitalAdjustmentYear71 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear71 = function () {
        if ($scope.chkTier1CapitalAdjustmentS7 === true)
            return $scope.SelectedScenario7.tier1CapitalAdjustmentYear1;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear71 = function () {
        return bankEquityCapitalYear71() + cet1CapitalAdjustmentYear71() + tier1CapitalAdjustmentYear71();
    }

    var tier1CapitalYear71 = function () {
        return bankEquityCapitalYear71() + tier1CapitalAdjustmentYear71();
    }

    var tier2CapitalYear71 = function () {
        if ($scope.chkTier2CapitalS7 === true)
            return $scope.SelectedScenario7.tier2CapitalYear1;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear71();
    }

    var totalRiskBasedCapitalYear71 = function () {
        return tier1CapitalYear71() + tier2CapitalYear71();
    }

    var riskWeightedAssetsYear71 = function () {
        if ($scope.chkRiskWeightedAssetsS7 === true) {
            return $scope.SelectedScenario7.riskWeightedAssetsYear1;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear71();
        }
    }

    var totalAssetsForLeverageYear71 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear71();
    }

    var cet1CapitalRatioYear71 = function () {
        return riskWeightedAssetsYear71() == 0 ? null : cet1CapitalYear71() / riskWeightedAssetsYear71();
    }

    var tier1RBCRatioYear71 = function () {
        return (tier1CapitalYear71() / riskWeightedAssetsYear71()) * 100;
    }

    var totalRBCRatioYear71 = function () {
        return (totalRiskBasedCapitalYear71() / riskWeightedAssetsYear71()) * 100;
    }

    var tier1LeverageRatioYear71 = function () {
        return (tier1CapitalYear71() / totalAssetsForLeverageYear71());
    }

    var returnOnAverageEquityYear71 = function () {
        return (netIncomeYear71() / ((bankEquityCapitalYear71() + bankEquityCapitalYear70()) / 2)) * 100;
    }

    var mvEquityYear71 = function () {
        return bankEquityCapitalYear71() * 1.5;
    }

    var sharesOutstandingYear71 = function () {
        return $scope.SelectedScenario7.sharesOutstandingActualYear1 == null ? 0 : parseFloat($scope.SelectedScenario7.sharesOutstandingActualYear1);
    }

    var bvSharePriceYear71 = function () {
        return sharesOutstandingYear71() == 0 ? null : bankEquityCapitalYear71() * 1000 / sharesOutstandingYear71();
    }

    var mvSharePriceYear71 = function () {
        return sharesOutstandingYear71() == 0 ? null : mvEquityYear71() * 1000 / sharesOutstandingYear71();
    }

    var earningsPerSharePriceYear71 = function () {
        return sharesOutstandingYear71() == 0 ? null : netIncomeYear71() * 1000 / sharesOutstandingYear71();
    }

    var earningsPerShare15PriceYear71 = function () {
        return earningsPerSharePriceYear71() * 15;
    }

    var earningsPerShare20PriceYear71 = function () {
        return earningsPerSharePriceYear71() * 20;
    }

    var dividendPerSharePriceYear71 = function () {
        return sharesOutstandingYear71() == 0 ? null : dividendsYear71() * (-1000) / sharesOutstandingYear71();
    }
            
    // Year 2 Calculations for Column 7
    var assetGrowthRateYear72 = function () {
        return $scope.SelectedScenario7.assetGrowthRateYear2 == null ? 0 : parseFloat($scope.SelectedScenario7.assetGrowthRateYear2);
    }

    var newAcquisitionAssetsYear72 = function () {
        return $scope.SelectedScenario7.newAcquisitionAssetsYear2 == null ? 0 : parseFloat($scope.SelectedScenario7.newAcquisitionAssetsYear2);
    }

    var totalAssetsYear72 = function () {
        return (totalAssetsYear71() * (1 + (assetGrowthRateYear72()/100))) + newAcquisitionAssetsYear72();
    }
            
    var returnOnAverageAssetsYear72 = function () {
        if ($scope.chkNetIncomeS7 === true) {
            return ((netIncomeYear72() / ((totalAssetsYear71() + totalAssetsYear72()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario7.returnOnAverageAssetsYear2 == null ? 0 : parseFloat($scope.SelectedScenario7.returnOnAverageAssetsYear2);
    }

    var netIncomeYear72 = function () {
        if ($scope.chkNetIncomeS7 === true)
            return $scope.SelectedScenario7.netIncomeYear2;
        else
        return ((totalAssetsYear71() + totalAssetsYear72()) / 2) * (returnOnAverageAssetsYear72()/100);
    }
            
    var dividendsRateYear72 = function () {
        return $scope.SelectedScenario7.dividendsRateYear2 == null ? 0 : parseFloat($scope.SelectedScenario7.dividendsRateYear2);
    }
            
    var dividendsYear72 = function () {
        if ($scope.chkCashDividendsS7 === true)
            return $scope.SelectedScenario7.dividendsYear2;
        else
            return netIncomeYear72() * (dividendsRateYear72()/100);
    }

    var newCapitalYear72 = function () {
        return $scope.SelectedScenario7.newCapitalYear2 == null ? 0 : parseFloat($scope.SelectedScenario7.newCapitalYear2);
    }

    var bankEquityCapitalYear72 = function () {
        return bankEquityCapitalYear71() + netIncomeYear72() - dividendsYear72() + newCapitalYear72();
    }

    var cet1CapitalAdjustmentYear72 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear72 = function () {
        if ($scope.chkTier1CapitalAdjustmentS7 === true)
            return $scope.SelectedScenario7.tier1CapitalAdjustmentYear2;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear72 = function () {
        return bankEquityCapitalYear72() + cet1CapitalAdjustmentYear72() + tier1CapitalAdjustmentYear72();
    }

    var tier1CapitalYear72 = function () {
        return bankEquityCapitalYear72() + tier1CapitalAdjustmentYear72();
    }

    var tier2CapitalYear72 = function () {
        if ($scope.chkTier2CapitalS7 === true)
            return $scope.SelectedScenario7.tier2CapitalYear2;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear72();
    }

    var totalRiskBasedCapitalYear72 = function () {
        return tier1CapitalYear72() + tier2CapitalYear72();
    }

    var riskWeightedAssetsYear72 = function () {
        if ($scope.chkRiskWeightedAssetsS7 === true) {
            return $scope.SelectedScenario7.riskWeightedAssetsYear2;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear72();
        }
    }

    var totalAssetsForLeverageYear72 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear72();
    }

    var cet1CapitalRatioYear72 = function () {
        return riskWeightedAssetsYear72() == 0 ? null : cet1CapitalYear72() / riskWeightedAssetsYear72();
    }

    var tier1RBCRatioYear72 = function () {
        return (tier1CapitalYear72() / riskWeightedAssetsYear72()) * 100;
    }

    var totalRBCRatioYear72 = function () {
        return (totalRiskBasedCapitalYear72() / riskWeightedAssetsYear72()) * 100;
    }

    var tier1LeverageRatioYear72 = function () {
        return (tier1CapitalYear72() / totalAssetsForLeverageYear72());
    }

    var returnOnAverageEquityYear72 = function () {
        return (netIncomeYear72() / ((bankEquityCapitalYear72() + bankEquityCapitalYear71()) / 2)) * 100;
    }

    var mvEquityYear72 = function () {
        return bankEquityCapitalYear72() * 1.5;
    }

    var sharesOutstandingYear72 = function () {
        return $scope.SelectedScenario7.sharesOutstandingActualYear2==null?0:parseFloat($scope.SelectedScenario7.sharesOutstandingActualYear2);
    }

    var bvSharePriceYear72 = function () {
        return sharesOutstandingYear72() == 0 ? null : bankEquityCapitalYear72() * 1000 / sharesOutstandingYear72();
    }

    var mvSharePriceYear72 = function () {
        return sharesOutstandingYear72() == 0 ? null : mvEquityYear72() * 1000 / sharesOutstandingYear72();
    }

    var earningsPerSharePriceYear72 = function () {
        return sharesOutstandingYear72() == 0 ? null : netIncomeYear72() * 1000 / sharesOutstandingYear72();
    }

    var earningsPerShare15PriceYear72 = function () {
        return earningsPerSharePriceYear72() * 15;
    }

    var earningsPerShare20PriceYear72 = function () {
        return earningsPerSharePriceYear72() * 20;
    }

    var dividendPerSharePriceYear72 = function () {
        return sharesOutstandingYear72() == 0 ? null : dividendsYear72() * (-1000) / sharesOutstandingYear72();
    }
            
    // Year 3 Calculations for Column 7
    var assetGrowthRateYear73 = function () {
        return $scope.SelectedScenario7.assetGrowthRateYear3 == null ? 0 : parseFloat($scope.SelectedScenario7.assetGrowthRateYear3);
    }

    var newAcquisitionAssetsYear73 = function () {
        return $scope.SelectedScenario7.newAcquisitionAssetsYear3 == null ? 0 : parseFloat($scope.SelectedScenario7.newAcquisitionAssetsYear3);
    }

    var totalAssetsYear73 = function () {
        return (totalAssetsYear72() * (1 + (assetGrowthRateYear73()/100))) + newAcquisitionAssetsYear73();
    }
            
    var returnOnAverageAssetsYear73 = function () {
        if ($scope.chkNetIncomeS7 === true) {
            return (netIncomeYear73() / ((totalAssetsYear72() + totalAssetsYear73()) / 2)) * 100;
        }
        else
            return $scope.SelectedScenario7.returnOnAverageAssetsYear3 == null ? 0 : parseFloat($scope.SelectedScenario7.returnOnAverageAssetsYear3);
    }

    var netIncomeYear73 = function () {
        if ($scope.chkNetIncomeS7 === true)
            return $scope.SelectedScenario7.netIncomeYear3;
        else
            return ((totalAssetsYear72() + totalAssetsYear73()) / 2) * (returnOnAverageAssetsYear73()/100);
    }
            
    var dividendsRateYear73 = function () {
        return $scope.SelectedScenario7.dividendsRateYear3 == null ? 0 : parseFloat($scope.SelectedScenario7.dividendsRateYear3);
    }
            
    var dividendsYear73 = function () {
        if ($scope.chkCashDividendsS7 === true)
            return $scope.SelectedScenario7.dividendsYear3;
        else
            return netIncomeYear73() * (dividendsRateYear73()/100);
    }

    var newCapitalYear73 = function () {
        return $scope.SelectedScenario7.newCapitalYear3 == null ? 0 : parseFloat($scope.SelectedScenario7.newCapitalYear3);
    }

    var bankEquityCapitalYear73 = function () {
        return bankEquityCapitalYear72() + netIncomeYear73() - dividendsYear73() + newCapitalYear73();
    }

    var cet1CapitalAdjustmentYear73 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear73 = function () {
        if ($scope.chkTier1CapitalAdjustmentS7 === true)
            return $scope.SelectedScenario7.tier1CapitalAdjustmentYear3;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear73 = function () {
        return bankEquityCapitalYear73() + cet1CapitalAdjustmentYear73() + tier1CapitalAdjustmentYear73();
    }

    var tier1CapitalYear73 = function () {
        return bankEquityCapitalYear73() + tier1CapitalAdjustmentYear73();
    }

    var tier2CapitalYear73 = function () {
        if ($scope.chkTier2CapitalS7 === true)
            return $scope.SelectedScenario7.tier2CapitalYear3;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear73();
    }

    var totalRiskBasedCapitalYear73 = function () {
        return tier1CapitalYear73() + tier2CapitalYear73();
    }

    var riskWeightedAssetsYear73 = function () {
        if ($scope.chkRiskWeightedAssetsS7 === true) {
            return $scope.SelectedScenario7.riskWeightedAssetsYear3;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear73();
        }
    }

    var totalAssetsForLeverageYear73 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear73();
    }

    var cet1CapitalRatioYear73 = function () {
        return riskWeightedAssetsYear73() == 0 ? null : cet1CapitalYear73() / riskWeightedAssetsYear73();
    }

    var tier1RBCRatioYear73 = function () {
        return (tier1CapitalYear73() / riskWeightedAssetsYear73()) * 100;
    }

    var totalRBCRatioYear73 = function () {
        return (totalRiskBasedCapitalYear73() / riskWeightedAssetsYear73()) * 100;
    }

    var tier1LeverageRatioYear73 = function () {
        return (tier1CapitalYear73() / totalAssetsForLeverageYear73());
    }

    var returnOnAverageEquityYear73 = function () {
        return (netIncomeYear73() / ((bankEquityCapitalYear73() + bankEquityCapitalYear72()) / 2)) * 100;
    }

    var mvEquityYear73 = function () {
        return bankEquityCapitalYear73() * 1.5;
    }

    var sharesOutstandingYear73 = function () {
        return $scope.SelectedScenario7.sharesOutstandingActualYear3 == null ? 0 : parseFloat($scope.SelectedScenario7.sharesOutstandingActualYear3);
    }

    var bvSharePriceYear73 = function () {
        return sharesOutstandingYear73() == 0 ? null : bankEquityCapitalYear73() * 1000 / sharesOutstandingYear73();
    }

    var mvSharePriceYear73 = function () {
        return sharesOutstandingYear73() == 0 ? null : mvEquityYear73() * 1000 / sharesOutstandingYear73();
    }

    var earningsPerSharePriceYear73 = function () {
        return sharesOutstandingYear73() == 0 ? null : netIncomeYear73() * 1000 / sharesOutstandingYear73();
    }

    var earningsPerShare15PriceYear73 = function () {
        return earningsPerSharePriceYear73() * 15;
    }

    var earningsPerShare20PriceYear73 = function () {
        return earningsPerSharePriceYear73() * 20;
    }

    var dividendPerSharePriceYear73 = function () {
        return sharesOutstandingYear73() == 0 ? null : dividendsYear73() * (-1000) / sharesOutstandingYear73();
    }
            
    // Year 4 Calculations for Column 7
    var assetGrowthRateYear74 = function () {
        return $scope.SelectedScenario7.assetGrowthRateYear4 == null ? 0 : parseFloat($scope.SelectedScenario7.assetGrowthRateYear4);
    }

    var newAcquisitionAssetsYear74 = function () {
        return $scope.SelectedScenario7.newAcquisitionAssetsYear4 == null ? 0 : parseFloat($scope.SelectedScenario7.newAcquisitionAssetsYear4);
    }

    var totalAssetsYear74 = function () {
        return (totalAssetsYear73() * (1  + (assetGrowthRateYear74()/100))) + newAcquisitionAssetsYear74();
    }
            
    var returnOnAverageAssetsYear74 = function () {
        if ($scope.chkNetIncomeS7 === true) {
            return ((netIncomeYear74() / ((totalAssetsYear73() + totalAssetsYear74()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario7.returnOnAverageAssetsYear4 == null ? 0 : parseFloat($scope.SelectedScenario7.returnOnAverageAssetsYear4);
    }

    var netIncomeYear74 = function () {
        if ($scope.chkNetIncomeS7 === true)
            return $scope.SelectedScenario7.netIncomeYear4;
        else
            return ((totalAssetsYear73() + totalAssetsYear74()) / 2) * (returnOnAverageAssetsYear74()/100);
    }
            
    var dividendsRateYear74 = function () {
        return $scope.SelectedScenario7.dividendsRateYear4 == null ? 0 : parseFloat($scope.SelectedScenario7.dividendsRateYear4);
    }
            
    var dividendsYear74 = function () {
        if ($scope.chkCashDividendsS7 === true)
            return $scope.SelectedScenario7.dividendsYear4;
        else
            return netIncomeYear74() * (dividendsRateYear74()/100);
    }

    var newCapitalYear74 = function () {
        return $scope.SelectedScenario7.newCapitalYear4 == null ? 0 : parseFloat($scope.SelectedScenario7.newCapitalYear4);
    }

    var bankEquityCapitalYear74 = function () {
        return bankEquityCapitalYear73() + netIncomeYear74() - dividendsYear74() + newCapitalYear74();
    }

    var cet1CapitalAdjustmentYear74 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear74 = function () {
        if ($scope.chkTier1CapitalAdjustmentS7 === true)
            return $scope.SelectedScenario7.tier1CapitalAdjustmentYear4;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear74 = function () {
        return bankEquityCapitalYear74() + cet1CapitalAdjustmentYear74() + tier1CapitalAdjustmentYear74();
    }

    var tier1CapitalYear74 = function () {
        return bankEquityCapitalYear74() + tier1CapitalAdjustmentYear74();
    }

    var tier2CapitalYear74 = function () {
        if ($scope.chkTier2CapitalS7 === true)
            return $scope.SelectedScenario7.tier2CapitalYear4;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear74();
    }

    var totalRiskBasedCapitalYear74 = function () {
        return tier1CapitalYear74() + tier2CapitalYear74();
    }

    var riskWeightedAssetsYear74 = function () {
        if ($scope.chkRiskWeightedAssetsS7 === true) {
            return $scope.SelectedScenario7.riskWeightedAssetsYear4;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear74();
        }
    }

    var totalAssetsForLeverageYear74 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear74();
    }

    var cet1CapitalRatioYear74 = function () {
        return riskWeightedAssetsYear74() == 0 ? null : cet1CapitalYear74() / riskWeightedAssetsYear74();
    }

    var tier1RBCRatioYear74 = function () {
        return (tier1CapitalYear74() / riskWeightedAssetsYear74()) * 100;
    }

    var totalRBCRatioYear74 = function () {
        return (totalRiskBasedCapitalYear74() / riskWeightedAssetsYear74()) * 100;
    }

    var tier1LeverageRatioYear74 = function () {
        return (tier1CapitalYear74() / totalAssetsForLeverageYear74());
    }

    var returnOnAverageEquityYear74 = function () {
        return (netIncomeYear74() / ((bankEquityCapitalYear74() + bankEquityCapitalYear73()) / 2)) * 100;
    }

    var mvEquityYear74 = function () {
        return bankEquityCapitalYear74() * 1.5;
    }

    var sharesOutstandingYear74 = function () {
        return $scope.SelectedScenario7.sharesOutstandingActualYear4 == null ? 0 : parseFloat($scope.SelectedScenario7.sharesOutstandingActualYear4);
    }

    var bvSharePriceYear74 = function () {
        return sharesOutstandingYear74() == 0 ? null : bankEquityCapitalYear74() * 1000 / sharesOutstandingYear74();
    }

    var mvSharePriceYear74 = function () {
        return sharesOutstandingYear74() == 0 ? null : mvEquityYear74() * 1000 / sharesOutstandingYear74();
    }

    var earningsPerSharePriceYear74 = function () {
        return sharesOutstandingYear74() == 0 ? null : netIncomeYear74() * 1000 / sharesOutstandingYear74();
    }

    var earningsPerShare15PriceYear74 = function () {
        return earningsPerSharePriceYear74() * 15;
    }

    var earningsPerShare20PriceYear74 = function () {
        return earningsPerSharePriceYear74() * 20;
    }

    var dividendPerSharePriceYear74 = function () {
        return sharesOutstandingYear74() == 0 ? null : dividendsYear74() * (-1000) / sharesOutstandingYear74();
    }
            
    // Year 5 Calculations for Column 7
    var assetGrowthRateYear75 = function () {
        return $scope.SelectedScenario7.assetGrowthRateYear5 == null ? 0 : parseFloat($scope.SelectedScenario7.assetGrowthRateYear5);
    }

    var newAcquisitionAssetsYear75 = function () {
        return $scope.SelectedScenario7.newAcquisitionAssetsYear5 == null ? 0 : parseFloat($scope.SelectedScenario7.newAcquisitionAssetsYear5);
    }

    var totalAssetsYear75 = function () {
        return (totalAssetsYear74() * (1 + (assetGrowthRateYear75()/100))) + newAcquisitionAssetsYear75();
    }
            
    var returnOnAverageAssetsYear75 = function () {
        if ($scope.chkNetIncomeS7 === true) {
            return ((netIncomeYear75() / ((totalAssetsYear74() + totalAssetsYear75()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario7.returnOnAverageAssetsYear5 == null ? 0 : parseFloat($scope.SelectedScenario7.returnOnAverageAssetsYear5);
    }

    var netIncomeYear75 = function () {
        if ($scope.chkNetIncomeS7 === true)
            return $scope.SelectedScenario7.netIncomeYear5;
        else
            return ((totalAssetsYear74() + totalAssetsYear75()) / 2) * (returnOnAverageAssetsYear75()/100);
    }
            
    var dividendsRateYear75 = function () {
        return $scope.SelectedScenario7.dividendsRateYear5 == null ? 0 : parseFloat($scope.SelectedScenario7.dividendsRateYear5);
    }
            
    var dividendsYear75 = function () {
        if ($scope.chkCashDividendsS7 === true)
            return $scope.SelectedScenario7.dividendsYear5;
        else
            return netIncomeYear75() * (dividendsRateYear75()/100);
    }

    var newCapitalYear75 = function () {
        return $scope.SelectedScenario7.newCapitalYear5 == null ? 0 : parseFloat($scope.SelectedScenario7.newCapitalYear5);
    }

    var bankEquityCapitalYear75 = function () {
        return bankEquityCapitalYear74() + netIncomeYear75() - dividendsYear75() + newCapitalYear75();
    }

    var cet1CapitalAdjustmentYear75 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear75 = function () {
        if ($scope.chkTier1CapitalAdjustmentS7 === true)
            return $scope.SelectedScenario7.tier1CapitalAdjustmentYear5;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear75 = function () {
        return bankEquityCapitalYear75() + cet1CapitalAdjustmentYear75() + tier1CapitalAdjustmentYear75();
    }

    var tier1CapitalYear75 = function () {
        return bankEquityCapitalYear75() + tier1CapitalAdjustmentYear75();
    }

    var tier2CapitalYear75 = function () {
        if ($scope.chkTier2CapitalS7 === true)
            return $scope.SelectedScenario7.tier2CapitalYear5;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear75();
    }

    var totalRiskBasedCapitalYear75 = function () {
        return tier1CapitalYear75() + tier2CapitalYear75();
    }

    var riskWeightedAssetsYear75 = function () {
        if ($scope.chkRiskWeightedAssetsS7 === true) {
            return $scope.SelectedScenario7.riskWeightedAssetsYear5;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear75();
        }
    }

    var totalAssetsForLeverageYear75 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear75();
    }

    var cet1CapitalRatioYear75 = function () {
        return riskWeightedAssetsYear75() == 0 ? null : cet1CapitalYear75() / riskWeightedAssetsYear75();
    }

    var tier1RBCRatioYear75 = function () {
        return (tier1CapitalYear75() / riskWeightedAssetsYear75()) * 100;
    }

    var totalRBCRatioYear75 = function () {
        return (totalRiskBasedCapitalYear75() / riskWeightedAssetsYear75()) * 100;
    }

    var tier1LeverageRatioYear75 = function () {
        return (tier1CapitalYear75() / totalAssetsForLeverageYear75());
    }

    var returnOnAverageEquityYear75 = function () {
        return (netIncomeYear75() / ((bankEquityCapitalYear75() + bankEquityCapitalYear74()) / 2)) * 100;
    }

    var mvEquityYear75 = function () {
        return bankEquityCapitalYear75() * 1.5;
    }

    var sharesOutstandingYear75 = function () {
        return $scope.SelectedScenario7.sharesOutstandingActualYear5 == null ? 0 : parseFloat($scope.SelectedScenario7.sharesOutstandingActualYear5);
    }

    var bvSharePriceYear75 = function () {
        return sharesOutstandingYear75() == 0 ? null : bankEquityCapitalYear75() * 1000 / sharesOutstandingYear75();
    }

    var mvSharePriceYear75 = function () {
        return sharesOutstandingYear75() == 0 ? null : mvEquityYear75() * 1000 / sharesOutstandingYear75();
    }

    var earningsPerSharePriceYear75 = function () {
        return sharesOutstandingYear75() == 0 ? null : netIncomeYear75() * 1000 / sharesOutstandingYear75();
    }

    var earningsPerShare15PriceYear75 = function () {
        return earningsPerSharePriceYear75() * 15;
    }

    var earningsPerShare20PriceYear75 = function () {
        return earningsPerSharePriceYear75() * 20;
    }

    var dividendPerSharePriceYear75 = function () {
        return sharesOutstandingYear75() == 0 ? null : dividendsYear75() * (-1000) / sharesOutstandingYear75();
    }
            
    // Year 0 Calculations for Column 8
    var assetGrowthRateYear80 = function () {
        return $scope.SelectedScenario8.assetGrowthRateYear0 == null ? 0 : parseFloat($scope.SelectedScenario8.assetGrowthRateYear0);
    }

    var newAcquisitionAssetsYear80 = function () {
        if (typeof $scope.SelectedScenario8.newAcquisitionAssetsYear0 !== 'undefined' && $scope.SelectedScenario8.newAcquisitionAssetsYear0 !== null)
            return parseFloat($scope.SelectedScenario8.newAcquisitionAssetsYear0);
        else
            return 0;
    }

    var totalAssetsYear80 = function () {
        return (parseFloat($scope.TotalAssetsPriorYear) * (1 + (assetGrowthRateYear80()/100))) + newAcquisitionAssetsYear80();
    }
            
    var returnOnAverageAssetsYear80 = function () {
        if ($scope.chkNetIncomeS8 === true) {
            return ((netIncomeYear80() / (($scope.TotalAssetsPriorYear + totalAssetsYear80()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario8.returnOnAverageAssetsYear0 == null ? 0 : parseFloat($scope.SelectedScenario8.returnOnAverageAssetsYear0);
    }

    var netIncomeYear80 = function () {
        if ($scope.chkNetIncomeS8 === true)
            return $scope.SelectedScenario8.netIncomeYear0;
        else
            return ((parseFloat($scope.TotalAssetsPriorYear) + totalAssetsYear80()) / 2) * (returnOnAverageAssetsYear80()/100);
    }
            
    var dividendsRateYear80 = function () {
        return $scope.SelectedScenario8.dividendsRateYear0 == null ? 0 : parseFloat($scope.SelectedScenario8.dividendsRateYear0);
    }
            
    var dividendsYear80 = function () {
        if ($scope.chkCashDividendsS8 === true)
            return $scope.SelectedScenario8.dividendsYear0;
        else
            return netIncomeYear80() * (dividendsRateYear80()/100);
    }

    var newCapitalYear80 = function () {
        return $scope.SelectedScenario8.newCapitalYear0 == null ? 0 : parseFloat($scope.SelectedScenario8.newCapitalYear0);
    }

    var bankEquityCapitalYear80 = function () {
        return parseFloat($scope.BankEquityCapitalPriorYear) + netIncomeYear80() - dividendsYear80() + newCapitalYear80();
    }

    var cet1CapitalAdjustmentYear80 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear80 = function () {
        if ($scope.chkTier1CapitalAdjustmentS8 === true)
            return $scope.SelectedScenario8.tier1CapitalAdjustmentYear0;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear80 = function () {
        return bankEquityCapitalYear80() + cet1CapitalAdjustmentYear80() + tier1CapitalAdjustmentYear80();
    }

    var tier1CapitalYear80 = function () {
        return bankEquityCapitalYear80() + tier1CapitalAdjustmentYear80();
    }

    var tier2CapitalYear80 = function () {
        if ($scope.chkTier2CapitalS8 === true)
            return $scope.SelectedScenario8.tier2CapitalYear0;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear80();
    }

    var totalRiskBasedCapitalYear80 = function () {
        return tier1CapitalYear80() + tier2CapitalYear80();
    }

    var riskWeightedAssetsYear80 = function () {
        if ($scope.chkRiskWeightedAssetsS8 === true) {
            return $scope.SelectedScenario8.riskWeightedAssetsYear0;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear80();
        }
    }

    var totalAssetsForLeverageYear80 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear80();
    }

    var cet1CapitalRatioYear80 = function () {
        return riskWeightedAssetsYear80() == 0 ? null : cet1CapitalYear80() / riskWeightedAssetsYear80();
    }

    var tier1RBCRatioYear80 = function () {
        return (tier1CapitalYear80() / riskWeightedAssetsYear80()) * 100;
    }

    var totalRBCRatioYear80 = function () {
        return (totalRiskBasedCapitalYear80() / riskWeightedAssetsYear80()) * 100;
    }

    var tier1LeverageRatioYear80 = function () {
        return totalAssetsForLeverageYear80() == 0 ? null : tier1CapitalYear80() / totalAssetsForLeverageYear80();
    }

    var returnOnAverageEquityYear80 = function () {
        return (netIncomeYear80() / ((bankEquityCapitalYear80() + parseFloat($scope.BankEquityCapitalPriorYear)) / 2)) * 100;
    }

    var mvEquityYear80 = function () {
        return bankEquityCapitalYear80() * 1.5;
    }

    var sharesOutstandingYear80 = function () {
        return $scope.SelectedScenario8.sharesOutstandingActualYear0 == null ? 0 : parseFloat($scope.SelectedScenario8.sharesOutstandingActualYear0);
    }

    var bvSharePriceYear80 = function () {
        return sharesOutstandingYear80() == 0 ? null : bankEquityCapitalYear80() * 1000 / sharesOutstandingYear80();
    }

    var mvSharePriceYear80 = function () {
        return sharesOutstandingYear80() == 0 ? null : mvEquityYear80() * 1000 / sharesOutstandingYear80();
    }

    var earningsPerSharePriceYear80 = function () {
        return sharesOutstandingYear80() == 0 ? null : netIncomeYear80() * 1000 / sharesOutstandingYear80();
    }

    var earningsPerShare15PriceYear80 = function () {
        return earningsPerSharePriceYear80() * 15;
    }

    var earningsPerShare20PriceYear80 = function () {
        return earningsPerSharePriceYear80() * 20;
    }

    var dividendPerSharePriceYear80 = function () {
        return sharesOutstandingYear80() == 0 ? null : dividendsYear80() * (-1000) / sharesOutstandingYear80();
    }
            
    // Year 1 Calculations for Column 8
    var assetGrowthRateYear81 = function () {
        return $scope.SelectedScenario8.assetGrowthRateYear1 == null ? 0 : parseFloat($scope.SelectedScenario8.assetGrowthRateYear1);
    }

    var newAcquisitionAssetsYear81 = function () {
        return $scope.SelectedScenario8.newAcquisitionAssetsYear1 == null ? 0 : parseFloat($scope.SelectedScenario8.newAcquisitionAssetsYear1);
    }

    var totalAssetsYear81 = function () {
        return (totalAssetsYear80() * (1 + (assetGrowthRateYear81()/100))) + newAcquisitionAssetsYear81();
    }
            
    var returnOnAverageAssetsYear81 = function () {
        if ($scope.chkNetIncomeS8 === true) {
            return ((netIncomeYear81() / ((totalAssetsYear80() + totalAssetsYear81()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario8.returnOnAverageAssetsYear1 == null ? 0 : parseFloat($scope.SelectedScenario8.returnOnAverageAssetsYear1);
    }

    var netIncomeYear81 = function () {
        if ($scope.chkNetIncomeS8 === true)
            return $scope.SelectedScenario8.netIncomeYear1;
        else
        return ((totalAssetsYear80() + totalAssetsYear81()) / 2) * (returnOnAverageAssetsYear81()/100);
    }
            
    var dividendsRateYear81 = function () {
        return $scope.SelectedScenario8.dividendsRateYear1 == null ? 0 : parseFloat($scope.SelectedScenario8.dividendsRateYear1);
    }
            
    var dividendsYear81 = function () {
        if ($scope.chkCashDividendsS8 === true)
            return $scope.SelectedScenario8.dividendsYear1;
        else
            return netIncomeYear81() * (dividendsRateYear81()/100);
    }

    var newCapitalYear81 = function () {
        return $scope.SelectedScenario8.newCapitalYear1 == null ? 0 : parseFloat($scope.SelectedScenario8.newCapitalYear1);
    }

    var bankEquityCapitalYear81 = function () {
        return bankEquityCapitalYear80() + netIncomeYear81() - dividendsYear81() + newCapitalYear81();
    }

    var cet1CapitalAdjustmentYear81 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear81 = function () {
        if ($scope.chkTier1CapitalAdjustmentS8 === true)
            return $scope.SelectedScenario8.tier1CapitalAdjustmentYear1;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear81 = function () {
        return bankEquityCapitalYear81() + cet1CapitalAdjustmentYear81() + tier1CapitalAdjustmentYear81();
    }

    var tier1CapitalYear81 = function () {
        return bankEquityCapitalYear81() + tier1CapitalAdjustmentYear81();
    }

    var tier2CapitalYear81 = function () {
        if ($scope.chkTier2CapitalS8 === true)
            return $scope.SelectedScenario8.tier2CapitalYear1;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear81();
    }

    var totalRiskBasedCapitalYear81 = function () {
        return tier1CapitalYear81() + tier2CapitalYear81();
    }

    var riskWeightedAssetsYear81 = function () {
        if ($scope.chkRiskWeightedAssetsS8 === true) {
            return $scope.SelectedScenario8.riskWeightedAssetsYear1;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear81();
        }
    }

    var totalAssetsForLeverageYear81 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear81();
    }

    var cet1CapitalRatioYear81 = function () {
        return riskWeightedAssetsYear81() == 0 ? null : cet1CapitalYear81() / riskWeightedAssetsYear81();
    }

    var tier1RBCRatioYear81 = function () {
        return (tier1CapitalYear81() / riskWeightedAssetsYear81()) * 100;
    }

    var totalRBCRatioYear81 = function () {
        return (totalRiskBasedCapitalYear81() / riskWeightedAssetsYear81()) * 100;
    }

    var tier1LeverageRatioYear81 = function () {
        return (tier1CapitalYear81() / totalAssetsForLeverageYear81());
    }

    var returnOnAverageEquityYear81 = function () {
        return (netIncomeYear81() / ((bankEquityCapitalYear81() + bankEquityCapitalYear80()) / 2)) * 100;
    }

    var mvEquityYear81 = function () {
        return bankEquityCapitalYear81() * 1.5;
    }

    var sharesOutstandingYear81 = function () {
        return $scope.SelectedScenario8.sharesOutstandingActualYear1 == null ? 0 : parseFloat($scope.SelectedScenario8.sharesOutstandingActualYear1);
    }

    var bvSharePriceYear81 = function () {
        return sharesOutstandingYear81() == 0 ? null : bankEquityCapitalYear81() * 1000 / sharesOutstandingYear81();
    }

    var mvSharePriceYear81 = function () {
        return sharesOutstandingYear81() == 0 ? null : mvEquityYear81() * 1000 / sharesOutstandingYear81();
    }

    var earningsPerSharePriceYear81 = function () {
        return sharesOutstandingYear81() == 0 ? null : netIncomeYear81() * 1000 / sharesOutstandingYear81();
    }

    var earningsPerShare15PriceYear81 = function () {
        return earningsPerSharePriceYear81() * 15;
    }

    var earningsPerShare20PriceYear81 = function () {
        return earningsPerSharePriceYear81() * 20;
    }

    var dividendPerSharePriceYear81 = function () {
        return sharesOutstandingYear81() == 0 ? null : dividendsYear81() * (-1000) / sharesOutstandingYear81();
    }
            
    // Year 2 Calculations for Column 8
    var assetGrowthRateYear82 = function () {
        return $scope.SelectedScenario8.assetGrowthRateYear2 == null ? 0 : parseFloat($scope.SelectedScenario8.assetGrowthRateYear2);
    }

    var newAcquisitionAssetsYear82 = function () {
        return $scope.SelectedScenario8.newAcquisitionAssetsYear2 == null ? 0 : parseFloat($scope.SelectedScenario8.newAcquisitionAssetsYear2);
    }

    var totalAssetsYear82 = function () {
        return (totalAssetsYear81() * (1 + (assetGrowthRateYear82()/100))) + newAcquisitionAssetsYear82();
    }
            
    var returnOnAverageAssetsYear82 = function () {
        if ($scope.chkNetIncomeS8 === true) {
            return ((netIncomeYear82() / ((totalAssetsYear81() + totalAssetsYear82()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario8.returnOnAverageAssetsYear2 == null ? 0 : parseFloat($scope.SelectedScenario8.returnOnAverageAssetsYear2);
    }

    var netIncomeYear82 = function () {
        if ($scope.chkNetIncomeS8 === true)
            return $scope.SelectedScenario8.netIncomeYear2;
        else
            return ((totalAssetsYear81() + totalAssetsYear82()) / 2) * (returnOnAverageAssetsYear82()/100);
    }
            
    var dividendsRateYear82 = function () {
        return $scope.SelectedScenario8.dividendsRateYear2 == null ? 0 : parseFloat($scope.SelectedScenario8.dividendsRateYear2);
    }
            
    var dividendsYear82 = function () {
        if ($scope.chkCashDividendsS8 === true)
            return $scope.SelectedScenario8.dividendsYear2;
        else
            return netIncomeYear82() * (dividendsRateYear82()/100);
    }

    var newCapitalYear82 = function () {
        return $scope.SelectedScenario8.newCapitalYear2 == null ? 0 : parseFloat($scope.SelectedScenario8.newCapitalYear2);
    }

    var bankEquityCapitalYear82 = function () {
        return bankEquityCapitalYear81() + netIncomeYear82() - dividendsYear82() + newCapitalYear82();
    }

    var cet1CapitalAdjustmentYear82 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear82 = function () {
        if ($scope.chkTier1CapitalAdjustmentS8 === true)
            return $scope.SelectedScenario8.tier1CapitalAdjustmentYear2;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear82 = function () {
        return bankEquityCapitalYear82() + cet1CapitalAdjustmentYear82() + tier1CapitalAdjustmentYear82();
    }

    var tier1CapitalYear82 = function () {
        return bankEquityCapitalYear82() + tier1CapitalAdjustmentYear82();
    }

    var tier2CapitalYear82 = function () {
        if ($scope.chkTier2CapitalS8 === true)
            return $scope.SelectedScenario8.tier2CapitalYear2;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear82();
    }

    var totalRiskBasedCapitalYear82 = function () {
        return tier1CapitalYear82() + tier2CapitalYear82();
    }

    var riskWeightedAssetsYear82 = function () {
        if ($scope.chkRiskWeightedAssetsS8 === true) {
            return $scope.SelectedScenario8.riskWeightedAssetsYear2;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear82();
        }
    }

    var totalAssetsForLeverageYear82 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear82();
    }

    var cet1CapitalRatioYear82 = function () {
        return riskWeightedAssetsYear82() == 0 ? null : cet1CapitalYear82() / riskWeightedAssetsYear82();
    }

    var tier1RBCRatioYear82 = function () {
        return (tier1CapitalYear82() / riskWeightedAssetsYear82()) * 100;
    }

    var totalRBCRatioYear82 = function () {
        return (totalRiskBasedCapitalYear82() / riskWeightedAssetsYear82()) * 100;
    }

    var tier1LeverageRatioYear82 = function () {
        return (tier1CapitalYear82() / totalAssetsForLeverageYear82());
    }

    var returnOnAverageEquityYear82 = function () {
        return (netIncomeYear82() / ((bankEquityCapitalYear82() + bankEquityCapitalYear81()) / 2)) * 100;
    }

    var mvEquityYear82 = function () {
        return bankEquityCapitalYear82() * 1.5;
    }

    var sharesOutstandingYear82 = function () {
        return $scope.SelectedScenario8.sharesOutstandingActualYear2 == null ? 0 : parseFloat($scope.SelectedScenario8.sharesOutstandingActualYear2);
    }

    var bvSharePriceYear82 = function () {
        return sharesOutstandingYear82() == 0 ? null : bankEquityCapitalYear82() * 1000 / sharesOutstandingYear82();
    }

    var mvSharePriceYear82 = function () {
        return sharesOutstandingYear82() == 0 ? null : mvEquityYear82() * 1000 / sharesOutstandingYear82();
    }

    var earningsPerSharePriceYear82 = function () {
        return sharesOutstandingYear82() == 0 ? null : netIncomeYear82() * 1000 / sharesOutstandingYear82();
    }

    var earningsPerShare15PriceYear82 = function () {
        return earningsPerSharePriceYear82() * 15;
    }

    var earningsPerShare20PriceYear82 = function () {
        return earningsPerSharePriceYear82() * 20;
    }

    var dividendPerSharePriceYear82 = function () {
        return sharesOutstandingYear82() == 0 ? null : dividendsYear82() * (-1000) / sharesOutstandingYear82();
    }
            
    // Year 3 Calculations for Column 8
    var assetGrowthRateYear83 = function () {
        return $scope.SelectedScenario8.assetGrowthRateYear3 == null ? 0 : parseFloat($scope.SelectedScenario8.assetGrowthRateYear3);
    }

    var newAcquisitionAssetsYear83 = function () {
        return $scope.SelectedScenario8.newAcquisitionAssetsYear3 == null ? 0 : parseFloat($scope.SelectedScenario8.newAcquisitionAssetsYear3);
    }

    var totalAssetsYear83 = function () {
        return (totalAssetsYear82() * (1 + (assetGrowthRateYear83()/100))) + newAcquisitionAssetsYear83();
    }
            
    var returnOnAverageAssetsYear83 = function () {
        if ($scope.chkNetIncomeS8 === true) {
            return (netIncomeYear83() / ((totalAssetsYear82() + totalAssetsYear83()) / 2)) * 100;
        }
        else
            return $scope.SelectedScenario8.returnOnAverageAssetsYear3 == null ? 0 : parseFloat($scope.SelectedScenario8.returnOnAverageAssetsYear3);
    }

    var netIncomeYear83 = function () {
        if ($scope.chkNetIncomeS8 === true)
            return $scope.SelectedScenario8.netIncomeYear3;
        else
            return ((totalAssetsYear82() + totalAssetsYear83()) / 2) * (returnOnAverageAssetsYear83()/100);
    }
            
    var dividendsRateYear83 = function () {
        return $scope.SelectedScenario8.dividendsRateYear3 == null ? 0 : parseFloat($scope.SelectedScenario8.dividendsRateYear3);
    }
            
    var dividendsYear83 = function () {
        if ($scope.chkCashDividendsS8 === true)
            return $scope.SelectedScenario8.dividendsYear3;
        else
            return netIncomeYear83() * (dividendsRateYear83()/100);
    }

    var newCapitalYear83 = function () {
        return $scope.SelectedScenario8.newCapitalYear3 == null ? 0 : parseFloat($scope.SelectedScenario8.newCapitalYear3);
    }

    var bankEquityCapitalYear83 = function () {
        return bankEquityCapitalYear82() + netIncomeYear83() - dividendsYear83() + newCapitalYear83();
    }

    var cet1CapitalAdjustmentYear83 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear83 = function () {
        if ($scope.chkTier1CapitalAdjustmentS8 === true)
            return $scope.SelectedScenario8.tier1CapitalAdjustmentYear3;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear83 = function () {
        return bankEquityCapitalYear83() + cet1CapitalAdjustmentYear83() + tier1CapitalAdjustmentYear83();
    }

    var tier1CapitalYear83 = function () {
        return bankEquityCapitalYear83() + tier1CapitalAdjustmentYear83();
    }

    var tier2CapitalYear83 = function () {
        if ($scope.chkTier2CapitalS8 === true)
            return $scope.SelectedScenario8.tier2CapitalYear3;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear83();
    }

    var totalRiskBasedCapitalYear83 = function () {
        return tier1CapitalYear83() + tier2CapitalYear83();
    }

    var riskWeightedAssetsYear83 = function () {
        if ($scope.chkRiskWeightedAssetsS8 === true) {
            return $scope.SelectedScenario8.riskWeightedAssetsYear3;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear83();
        }
    }

    var totalAssetsForLeverageYear83 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear83();
    }

    var cet1CapitalRatioYear83 = function () {
        return riskWeightedAssetsYear83() == 0 ? null : cet1CapitalYear83() / riskWeightedAssetsYear83();
    }

    var tier1RBCRatioYear83 = function () {
        return (tier1CapitalYear83() / riskWeightedAssetsYear83()) * 100;
    }

    var totalRBCRatioYear83 = function () {
        return (totalRiskBasedCapitalYear83() / riskWeightedAssetsYear83()) * 100;
    }

    var tier1LeverageRatioYear83 = function () {
        return (tier1CapitalYear83() / totalAssetsForLeverageYear83());
    }

    var returnOnAverageEquityYear83 = function () {
        return (netIncomeYear83() / ((bankEquityCapitalYear83() + bankEquityCapitalYear82()) / 2)) * 100;
    }

    var mvEquityYear83 = function () {
        return bankEquityCapitalYear83() * 1.5;
    }

    var sharesOutstandingYear83 = function () {
        return $scope.SelectedScenario8.sharesOutstandingActualYear3 == null ? 0 : parseFloat($scope.SelectedScenario8.sharesOutstandingActualYear3);
    }

    var bvSharePriceYear83 = function () {
        return sharesOutstandingYear83() == 0 ? null : bankEquityCapitalYear83() * 1000 / sharesOutstandingYear83();
    }

    var mvSharePriceYear83 = function () {
        return sharesOutstandingYear83() == 0 ? null : mvEquityYear83() * 1000 / sharesOutstandingYear83();
    }

    var earningsPerSharePriceYear83 = function () {
        return sharesOutstandingYear83() == 0 ? null : netIncomeYear83() * 1000 / sharesOutstandingYear83();
    }

    var earningsPerShare15PriceYear83 = function () {
        return earningsPerSharePriceYear83() * 15;
    }

    var earningsPerShare20PriceYear83 = function () {
        return earningsPerSharePriceYear83() * 20;
    }

    var dividendPerSharePriceYear83 = function () {
        return sharesOutstandingYear83() == 0 ? null : dividendsYear83() * (-1000) / sharesOutstandingYear83();
    }
            
    // Year 4 Calculations for Column 8
    var assetGrowthRateYear84 = function () {
        return $scope.SelectedScenario8.assetGrowthRateYear4 == null ? 0 : parseFloat($scope.SelectedScenario8.assetGrowthRateYear4);
    }

    var newAcquisitionAssetsYear84 = function () {
        return $scope.SelectedScenario8.newAcquisitionAssetsYear4 == null ? 0 : parseFloat($scope.SelectedScenario8.newAcquisitionAssetsYear4);
    }

    var totalAssetsYear84 = function () {
        return (totalAssetsYear83() * (1 + (assetGrowthRateYear84()/100))) + newAcquisitionAssetsYear84();
    }
            
    var returnOnAverageAssetsYear84 = function () {
        if ($scope.chkNetIncomeS8 === true) {
            return ((netIncomeYear84() / ((totalAssetsYear83() + totalAssetsYear84()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario8.returnOnAverageAssetsYear4 == null ? 0 : parseFloat($scope.SelectedScenario8.returnOnAverageAssetsYear4);
    }

    var netIncomeYear84 = function () {
        if ($scope.chkNetIncomeS8 === true)
            return $scope.SelectedScenario8.netIncomeYear4;
        else
            return ((totalAssetsYear83() + totalAssetsYear84()) / 2) * (returnOnAverageAssetsYear84()/100);
    }
            
    var dividendsRateYear84 = function () {
        return $scope.SelectedScenario8.dividendsRateYear4 == null ? 0 : parseFloat($scope.SelectedScenario8.dividendsRateYear4);
    }
            
    var dividendsYear84 = function () {
        if ($scope.chkCashDividendsS8 === true)
            return $scope.SelectedScenario8.dividendsYear4;
        else
            return netIncomeYear84() * (dividendsRateYear84()/100);
    }

    var newCapitalYear84 = function () {
        return $scope.SelectedScenario8.newCapitalYear4 == null ? 0 : parseFloat($scope.SelectedScenario8.newCapitalYear4);
    }

    var bankEquityCapitalYear84 = function () {
        return bankEquityCapitalYear83() + netIncomeYear84() - dividendsYear84() + newCapitalYear84();
    }

    var cet1CapitalAdjustmentYear84 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear84 = function () {
        if ($scope.chkTier1CapitalAdjustmentS8 === true)
            return $scope.SelectedScenario8.tier1CapitalAdjustmentYear4;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear84 = function () {
        return bankEquityCapitalYear84() + cet1CapitalAdjustmentYear84() + tier1CapitalAdjustmentYear84();
    }

    var tier1CapitalYear84 = function () {
        return bankEquityCapitalYear84() + tier1CapitalAdjustmentYear84();
    }

    var tier2CapitalYear84 = function () {
        if ($scope.chkTier2CapitalS8 === true)
            return $scope.SelectedScenario8.tier2CapitalYear4;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear84();
    }

    var totalRiskBasedCapitalYear84 = function () {
        return tier1CapitalYear84() + tier2CapitalYear84();
    }

    var riskWeightedAssetsYear84 = function () {
        if ($scope.chkRiskWeightedAssetsS8 === true) {
            return $scope.SelectedScenario8.riskWeightedAssetsYear4;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear84();
        }
    }

    var totalAssetsForLeverageYear84 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear84();
    }

    var cet1CapitalRatioYear84 = function () {
        return riskWeightedAssetsYear84() == 0 ? null : cet1CapitalYear84() / riskWeightedAssetsYear84();
    }

    var tier1RBCRatioYear84 = function () {
        return (tier1CapitalYear84() / riskWeightedAssetsYear84()) * 100;
    }

    var totalRBCRatioYear84 = function () {
        return (totalRiskBasedCapitalYear84() / riskWeightedAssetsYear84()) * 100;
    }

    var tier1LeverageRatioYear84 = function () {
        return (tier1CapitalYear84() / totalAssetsForLeverageYear84());
    }

    var returnOnAverageEquityYear84 = function () {
        return (netIncomeYear84() / ((bankEquityCapitalYear84() + bankEquityCapitalYear83()) / 2)) * 100;
    }

    var mvEquityYear84 = function () {
        return bankEquityCapitalYear84() * 1.5;
    }

    var sharesOutstandingYear84 = function () {
        return $scope.SelectedScenario8.sharesOutstandingActualYear4 == null ? 0 : parseFloat($scope.SelectedScenario8.sharesOutstandingActualYear4);
    }

    var bvSharePriceYear84 = function () {
        return sharesOutstandingYear84() == 0 ? null : bankEquityCapitalYear84() * 1000 / sharesOutstandingYear84();
    }

    var mvSharePriceYear84 = function () {
        return sharesOutstandingYear84() == 0 ? null : mvEquityYear84() * 1000 / sharesOutstandingYear84();
    }

    var earningsPerSharePriceYear84 = function () {
        return sharesOutstandingYear84() == 0 ? null : netIncomeYear84() * 1000 / sharesOutstandingYear84();
    }

    var earningsPerShare15PriceYear84 = function () {
        return earningsPerSharePriceYear84() * 15;
    }

    var earningsPerShare20PriceYear84 = function () {
        return earningsPerSharePriceYear84() * 20;
    }

    var dividendPerSharePriceYear84 = function () {
        return sharesOutstandingYear84() == 0 ? null : dividendsYear84() * (-1000) / sharesOutstandingYear84();
    }
            
    // Year 5 Calculations for Column 8
    var assetGrowthRateYear85 = function () {
        return $scope.SelectedScenario8.assetGrowthRateYear5 == null ? 0 : parseFloat($scope.SelectedScenario8.assetGrowthRateYear5);
    }

    var newAcquisitionAssetsYear85 = function () {
        return $scope.SelectedScenario8.newAcquisitionAssetsYear5 == null ? 0 : parseFloat($scope.SelectedScenario8.newAcquisitionAssetsYear5);
    }

    var totalAssetsYear85 = function () {
        return (totalAssetsYear84() * (1 + (assetGrowthRateYear85()/100))) + newAcquisitionAssetsYear85();
    }
            
    var returnOnAverageAssetsYear85 = function () {
        if ($scope.chkNetIncomeS8 === true) {
            return ((netIncomeYear85() / ((totalAssetsYear84() + totalAssetsYear85()) / 2))) * 100;
        }
        else
            return $scope.SelectedScenario8.returnOnAverageAssetsYear5 == null ? 0 : parseFloat($scope.SelectedScenario8.returnOnAverageAssetsYear5);
    }

    var netIncomeYear85 = function () {
        if ($scope.chkNetIncomeS8 === true)
            return $scope.SelectedScenario8.netIncomeYear5;
        else
            return ((totalAssetsYear84() + totalAssetsYear85()) / 2) * (returnOnAverageAssetsYear85()/100);
    }
            
    var dividendsRateYear85 = function () {
        return $scope.SelectedScenario8.dividendsRateYear5 == null ? 0 : parseFloat($scope.SelectedScenario8.dividendsRateYear5);
    }
            
    var dividendsYear85 = function () {
        if ($scope.chkCashDividendsS8 === true)
            return $scope.SelectedScenario8.dividendsYear5;
        else
            return netIncomeYear85() * (dividendsRateYear85()/100);
    }

    var newCapitalYear85 = function () {
        return $scope.SelectedScenario8.newCapitalYear5 == null ? 0 : parseFloat($scope.SelectedScenario8.newCapitalYear5);
    }

    var bankEquityCapitalYear85 = function () {
        return bankEquityCapitalYear84() + netIncomeYear85() - dividendsYear85() + newCapitalYear85();
    }

    var cet1CapitalAdjustmentYear85 = function () {
        return $scope.Cet1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Cet1CapitalAdjustmentPriorYear);
    }

    var tier1CapitalAdjustmentYear85 = function () {
        if ($scope.chkTier1CapitalAdjustmentS8 === true)
            return $scope.SelectedScenario8.tier1CapitalAdjustmentYear5;
        else
            return $scope.Tier1CapitalAdjustmentPriorYear == null ? 0 : parseFloat($scope.Tier1CapitalAdjustmentPriorYear);
    }

    var cet1CapitalYear85 = function () {
        return bankEquityCapitalYear85() + cet1CapitalAdjustmentYear85() + tier1CapitalAdjustmentYear85();
    }

    var tier1CapitalYear85 = function () {
        return bankEquityCapitalYear85() + tier1CapitalAdjustmentYear85();
    }

    var tier2CapitalYear85 = function () {
        if ($scope.chkTier2CapitalS8 === true)
            return $scope.SelectedScenario8.tier2CapitalYear5;
        else
            return (parseFloat($scope.Tier2CapitalPriorYear) / parseFloat($scope.Tier1CapitalPriorYear)) * tier1CapitalYear85();
    }

    var totalRiskBasedCapitalYear85 = function () {
        return tier1CapitalYear85() + tier2CapitalYear85();
    }

    var riskWeightedAssetsYear85 = function () {
        if ($scope.chkRiskWeightedAssetsS8 === true) {
            return $scope.SelectedScenario8.riskWeightedAssetsYear5;
        }
        else {
            return (parseFloat($scope.RiskWeightedAssetsPriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear85();
        }
    }

    var totalAssetsForLeverageYear85 = function () {
        return (parseFloat($scope.TotalAssetsForLeveragePriorYear) / parseFloat($scope.TotalAssetsPriorYear)) * totalAssetsYear85();
    }

    var cet1CapitalRatioYear85 = function () {
        return riskWeightedAssetsYear85() == 0 ? null : cet1CapitalYear85() / riskWeightedAssetsYear85();
    }

    var tier1RBCRatioYear85 = function () {
        return (tier1CapitalYear85() / riskWeightedAssetsYear85()) * 100;
    }

    var totalRBCRatioYear85 = function () {
        return (totalRiskBasedCapitalYear85() / riskWeightedAssetsYear85()) * 100;
    }

    var tier1LeverageRatioYear85 = function () {
        return (tier1CapitalYear85() / totalAssetsForLeverageYear85());
    }

    var returnOnAverageEquityYear85 = function () {
        return (netIncomeYear85() / ((bankEquityCapitalYear85() + bankEquityCapitalYear84()) / 2)) * 100;
    }

    var mvEquityYear85 = function () {
        return bankEquityCapitalYear85() * 1.5;
    }

    var sharesOutstandingYear85 = function () {
        return $scope.SelectedScenario8.sharesOutstandingActualYear5 == null ? 0 : parseFloat($scope.SelectedScenario8.sharesOutstandingActualYear5);
    }

    var bvSharePriceYear85 = function () {
        return sharesOutstandingYear85() == 0 ? null : bankEquityCapitalYear85() * 1000 / sharesOutstandingYear85();
    }

    var mvSharePriceYear85 = function () {
        return sharesOutstandingYear85() == 0 ? null : mvEquityYear85() * 1000 / sharesOutstandingYear85();
    }

    var earningsPerSharePriceYear85 = function () {
        return sharesOutstandingYear85() == 0 ? null : netIncomeYear85() * 1000 / sharesOutstandingYear85();
    }

    var earningsPerShare15PriceYear85 = function () {
        return earningsPerSharePriceYear85() * 15;
    }

    var earningsPerShare20PriceYear85 = function () {
        return earningsPerSharePriceYear85() * 20;
    }

    var dividendPerSharePriceYear85 = function () {
        return sharesOutstandingYear85() == 0 ? null : dividendsYear85() * (-1000) / sharesOutstandingYear85();
    }

    var totalAssets1 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalAssets1 = totalAssetsYear10();
                    break;
                case 2: $scope.TotalAssets1 = totalAssetsYear11();
                    break;
                case 3: $scope.TotalAssets1 = totalAssetsYear12();
                    break;
                case 4: $scope.TotalAssets1 = totalAssetsYear13();
                    break;
                case 5: $scope.TotalAssets1 = totalAssetsYear14();
                    break;
                case 6: $scope.TotalAssets1 = totalAssetsYear15();
                    break;
                default: $scope.TotalAssets1 = null;
                    break;
            }
        }

    var totalAssets2 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalAssets2 = totalAssetsYear20();
                    break;
                case 2: $scope.TotalAssets2 = totalAssetsYear21();
                    break;
                case 3: $scope.TotalAssets2 = totalAssetsYear22();
                    break;
                case 4: $scope.TotalAssets2 = totalAssetsYear23();
                    break;
                case 5: $scope.TotalAssets2 = totalAssetsYear24();
                    break;
                case 6: $scope.TotalAssets2 = totalAssetsYear25();
                    break;
                default: $scope.TotalAssets2 = null;
                    break;
            }
        }

    var totalAssets3 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalAssets3 = totalAssetsYear30();
                    break;
                case 2: $scope.TotalAssets3 = totalAssetsYear31();
                    break;
                case 3: $scope.TotalAssets3 = totalAssetsYear32();
                    break;
                case 4: $scope.TotalAssets3 = totalAssetsYear33();
                    break;
                case 5: $scope.TotalAssets3 = totalAssetsYear34();
                    break;
                case 6: $scope.TotalAssets3 = totalAssetsYear35();
                    break;
                default: $scope.TotalAssets3 = 0;
                    break;
            }
        }

    var totalAssets4 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalAssets4 = totalAssetsYear40();
                    break;
                case 2: $scope.TotalAssets4 = totalAssetsYear41();
                    break;
                case 3: $scope.TotalAssets4 = totalAssetsYear42();
                    break;
                case 4: $scope.TotalAssets4 = totalAssetsYear43();
                    break;
                case 5: $scope.TotalAssets4 = totalAssetsYear44();
                    break;
                case 6: $scope.TotalAssets4 = totalAssetsYear45();
                    break;
                default: $scope.TotalAssets4 = null;
                    break;
            }
        }

    var totalAssets5 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalAssets5 = totalAssetsYear50();
                    break;
                case 2: $scope.TotalAssets5 = totalAssetsYear51();
                    break;
                case 3: $scope.TotalAssets5 = totalAssetsYear52();
                    break;
                case 4: $scope.TotalAssets5 = totalAssetsYear53();
                    break;
                case 5: $scope.TotalAssets5 = totalAssetsYear54();
                    break;
                case 6: $scope.TotalAssets5 = totalAssetsYear55();
                    break;
                default: $scope.TotalAssets5 = null;
                    break;
            }
        }

    var totalAssets6 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalAssets6 = totalAssetsYear60();
                    break;
                case 2: $scope.TotalAssets6 = totalAssetsYear61();
                    break;
                case 3: $scope.TotalAssets6 = totalAssetsYear62();
                    break;
                case 4: $scope.TotalAssets6 = totalAssetsYear63();
                    break;
                case 5: $scope.TotalAssets6 = totalAssetsYear64();
                    break;
                case 6: $scope.TotalAssets6 = totalAssetsYear65();
                    break;
                default: $scope.TotalAssets6 = null;
                    break;
            }
        }

    var totalAssets7 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalAssets7 = totalAssetsYear70();
                    break;
                case 2: $scope.TotalAssets7 = totalAssetsYear71();
                    break;
                case 3: $scope.TotalAssets7 = totalAssetsYear72();
                    break;
                case 4: $scope.TotalAssets7 = totalAssetsYear73();
                    break;
                case 5: $scope.TotalAssets7 = totalAssetsYear74();
                    break;
                case 6: $scope.TotalAssets7 = totalAssetsYear75();
                    break;
                default: $scope.TotalAssets7 = null;
                    break;
            }
        }

    var totalAssets8 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1:
                    $scope.TotalAssets8 = totalAssetsYear80();
                    break;
                case 2:
                    $scope.TotalAssets8 = totalAssetsYear81();
                    break;
                case 3:
                    $scope.TotalAssets8 = totalAssetsYear82();
                    break;
                case 4:
                    $scope.TotalAssets8 = totalAssetsYear83();
                    break;
                case 5:
                    $scope.TotalAssets8 = totalAssetsYear84();
                    break;
                case 6:
                    $scope.TotalAssets8 = totalAssetsYear85();
                    break;
                default:
                    $scope.TotalAssets8 = null;
                    break;
            }
        }

    var averageAnnualGrowth1 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.AverageAnnualGrowth1 = assetGrowthRateYear10();
                    break;
                case 2: $scope.AverageAnnualGrowth1 = (assetGrowthRateYear10() + assetGrowthRateYear11()) / 2;
                    break;
                case 3: $scope.AverageAnnualGrowth1 = (assetGrowthRateYear10() + assetGrowthRateYear11() + assetGrowthRateYear12()) / 3;
                    break;
                case 4: $scope.AverageAnnualGrowth1 = (assetGrowthRateYear10() + assetGrowthRateYear11() + assetGrowthRateYear12() + assetGrowthRateYear13()) / 4;
                    break;
                case 5: $scope.AverageAnnualGrowth1 = (assetGrowthRateYear10() + assetGrowthRateYear11() + assetGrowthRateYear12() + assetGrowthRateYear13() + assetGrowthRateYear14()) / 5;
                    break;
                case 6: $scope.AverageAnnualGrowth1 = (assetGrowthRateYear10() + assetGrowthRateYear11() + assetGrowthRateYear12() + assetGrowthRateYear13() + assetGrowthRateYear14() + assetGrowthRateYear15()) / 6;
                    break;
                default: $scope.AverageAnnualGrowth1 = null;
                    break;
            }
        }

    var averageAnnualGrowth2 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.AverageAnnualGrowth2 = assetGrowthRateYear20();
                    break;
                case 2: $scope.AverageAnnualGrowth2 = (assetGrowthRateYear20() + assetGrowthRateYear21()) / 2;
                    break;
                case 3: $scope.AverageAnnualGrowth2 = (assetGrowthRateYear20() + assetGrowthRateYear21() + assetGrowthRateYear22()) / 3;
                    break;
                case 4: $scope.AverageAnnualGrowth2 = (assetGrowthRateYear20() + assetGrowthRateYear21() + assetGrowthRateYear22() + assetGrowthRateYear23()) / 4;
                    break;
                case 5: $scope.AverageAnnualGrowth2 = (assetGrowthRateYear20() + assetGrowthRateYear21() + assetGrowthRateYear22() + assetGrowthRateYear23() + assetGrowthRateYear24()) / 5;
                    break;
                case 6: $scope.AverageAnnualGrowth2 = (assetGrowthRateYear20() + assetGrowthRateYear21() + assetGrowthRateYear22() + assetGrowthRateYear23() + assetGrowthRateYear24() + assetGrowthRateYear25()) / 6;
                    break;
                default: $scope.AverageAnnualGrowth2 = null;
                    break;
            }
        }

    var averageAnnualGrowth3 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.AverageAnnualGrowth3 = assetGrowthRateYear30();
                    break;
                case 2: $scope.AverageAnnualGrowth3 = (assetGrowthRateYear30() + assetGrowthRateYear31()) / 2;
                    break;
                case 3: $scope.AverageAnnualGrowth3 = (assetGrowthRateYear30() + assetGrowthRateYear31() + assetGrowthRateYear32()) / 3;
                    break;
                case 4: $scope.AverageAnnualGrowth3 = (assetGrowthRateYear30() + assetGrowthRateYear31() + assetGrowthRateYear32() + assetGrowthRateYear33()) / 4;
                    break;
                case 5: $scope.AverageAnnualGrowth3 = (assetGrowthRateYear30() + assetGrowthRateYear31() + assetGrowthRateYear32() + assetGrowthRateYear33() + assetGrowthRateYear34()) / 5;
                    break;
                case 6: $scope.AverageAnnualGrowth3 = (assetGrowthRateYear30() + assetGrowthRateYear31() + assetGrowthRateYear32() + assetGrowthRateYear33() + assetGrowthRateYear34() + assetGrowthRateYear35()) / 6;
                    break;
                default: $scope.AverageAnnualGrowth3 = null;
                    break;
            }
        }

    var averageAnnualGrowth4 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.AverageAnnualGrowth4 = assetGrowthRateYear40();
                    break;
                case 2: $scope.AverageAnnualGrowth4 = (assetGrowthRateYear40() + assetGrowthRateYear41()) / 2;
                    break;
                case 3: $scope.AverageAnnualGrowth4 = (assetGrowthRateYear40() + assetGrowthRateYear41() + assetGrowthRateYear42()) / 3;
                    break;
                case 4: $scope.AverageAnnualGrowth4 = (assetGrowthRateYear40() + assetGrowthRateYear41() + assetGrowthRateYear42() + assetGrowthRateYear43()) / 4;
                    break;
                case 5: $scope.AverageAnnualGrowth4 = (assetGrowthRateYear40() + assetGrowthRateYear41() + assetGrowthRateYear42() + assetGrowthRateYear43() + assetGrowthRateYear44()) / 5;
                    break;
                case 6: $scope.AverageAnnualGrowth4 = (assetGrowthRateYear40() + assetGrowthRateYear41() + assetGrowthRateYear42() + assetGrowthRateYear43() + assetGrowthRateYear44() + assetGrowthRateYear45()) / 6;
                    break;
                default: $scope.AverageAnnualGrowth4 = null;
                    break;
            }
        }

    var averageAnnualGrowth5 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.AverageAnnualGrowth5 = assetGrowthRateYear50();
                    break;
                case 2: $scope.AverageAnnualGrowth5 = (assetGrowthRateYear50() + assetGrowthRateYear51()) / 2;
                    break;
                case 3: $scope.AverageAnnualGrowth5 = (assetGrowthRateYear50() + assetGrowthRateYear51() + assetGrowthRateYear52()) / 3;
                    break;
                case 4: $scope.AverageAnnualGrowth5 = (assetGrowthRateYear50() + assetGrowthRateYear51() + assetGrowthRateYear52() + assetGrowthRateYear53()) / 4;
                    break;
                case 5: $scope.AverageAnnualGrowth5 = (assetGrowthRateYear50() + assetGrowthRateYear51() + assetGrowthRateYear52() + assetGrowthRateYear53() + assetGrowthRateYear54()) / 5;
                    break;
                case 6: $scope.AverageAnnualGrowth5 = (assetGrowthRateYear50() + assetGrowthRateYear51() + assetGrowthRateYear52() + assetGrowthRateYear53() + assetGrowthRateYear54() + assetGrowthRateYear55()) / 6;
                    break;
                default: $scope.AverageAnnualGrowth5 = null;
                    break;
            }
        }

    var averageAnnualGrowth6 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.AverageAnnualGrowth6 = assetGrowthRateYear60();
                    break;
                case 2: $scope.AverageAnnualGrowth6 = (assetGrowthRateYear60() + assetGrowthRateYear61()) / 2;
                    break;
                case 3: $scope.AverageAnnualGrowth6 = (assetGrowthRateYear60() + assetGrowthRateYear61() + assetGrowthRateYear62()) / 3;
                    break;
                case 4: $scope.AverageAnnualGrowth6 = (assetGrowthRateYear60() + assetGrowthRateYear61() + assetGrowthRateYear62() + assetGrowthRateYear63()) / 4;
                    break;
                case 5: $scope.AverageAnnualGrowth6 = (assetGrowthRateYear60() + assetGrowthRateYear61() + assetGrowthRateYear62() + assetGrowthRateYear63() + assetGrowthRateYear64()) / 5;
                    break;
                case 6: $scope.AverageAnnualGrowth6 = (assetGrowthRateYear60() + assetGrowthRateYear61() + assetGrowthRateYear62() + assetGrowthRateYear63() + assetGrowthRateYear64() + assetGrowthRateYear65()) / 6;
                    break;
                default: $scope.AverageAnnualGrowth6 = null;
                    break;
            }
        }

    var averageAnnualGrowth7 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.AverageAnnualGrowth7 = assetGrowthRateYear70();
                    break;
                case 2: $scope.AverageAnnualGrowth7 = (assetGrowthRateYear70() + assetGrowthRateYear71()) / 2;
                    break;
                case 3: $scope.AverageAnnualGrowth7 = (assetGrowthRateYear70() + assetGrowthRateYear71() + assetGrowthRateYear72()) / 3;
                    break;
                case 4: $scope.AverageAnnualGrowth7 = (assetGrowthRateYear70() + assetGrowthRateYear71() + assetGrowthRateYear72() + assetGrowthRateYear73()) / 4;
                    break;
                case 5: $scope.AverageAnnualGrowth7 = (assetGrowthRateYear70() + assetGrowthRateYear71() + assetGrowthRateYear72() + assetGrowthRateYear73() + assetGrowthRateYear74()) / 5;
                    break;
                case 6: $scope.AverageAnnualGrowth7 = (assetGrowthRateYear70() + assetGrowthRateYear71() + assetGrowthRateYear72() + assetGrowthRateYear73() + assetGrowthRateYear74() + assetGrowthRateYear75()) / 6;
                    break;
                default: $scope.AverageAnnualGrowth7 = null;
                    break;
            }
        }

    var averageAnnualGrowth8 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.AverageAnnualGrowth8 = assetGrowthRateYear80();
                    break;
                case 2: $scope.AverageAnnualGrowth8 = (assetGrowthRateYear80() + assetGrowthRateYear81()) / 2;
                    break;
                case 3: $scope.AverageAnnualGrowth8 = (assetGrowthRateYear80() + assetGrowthRateYear81() + assetGrowthRateYear82()) / 3;
                    break;
                case 4: $scope.AverageAnnualGrowth8 = (assetGrowthRateYear80() + assetGrowthRateYear81() + assetGrowthRateYear82() + assetGrowthRateYear83()) / 4;
                    break;
                case 5: $scope.AverageAnnualGrowth8 = (assetGrowthRateYear80() + assetGrowthRateYear81() + assetGrowthRateYear82() + assetGrowthRateYear83() + assetGrowthRateYear84()) / 5;
                    break;
                case 6: $scope.AverageAnnualGrowth8 = (assetGrowthRateYear80() + assetGrowthRateYear81() + assetGrowthRateYear82() + assetGrowthRateYear83() + assetGrowthRateYear84() + assetGrowthRateYear85()) / 6;
                    break;
                default: $scope.AverageAnnualGrowth8 = null;
                    break;
            }
        }

    var netIncome1 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.NetIncome1 = netIncomeYear10();
                    break;
                case 2: $scope.NetIncome1 = netIncomeYear11();
                    break;
                case 3: $scope.NetIncome1 = netIncomeYear12();
                    break;
                case 4: $scope.NetIncome1 = netIncomeYear13();
                    break;
                case 5: $scope.NetIncome1 = netIncomeYear14();
                    break;
                case 6: $scope.NetIncome1 = netIncomeYear15();
                    break;
                default: $scope.NetIncome1 = null;
                    break;
            }
        }

    var netIncome2 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.NetIncome2 = netIncomeYear20();
                    break;
                case 2: $scope.NetIncome2 = netIncomeYear21();
                    break;
                case 3: $scope.NetIncome2 = netIncomeYear22();
                    break;
                case 4: $scope.NetIncome2 = netIncomeYear23();
                    break;
                case 5: $scope.NetIncome2 = netIncomeYear24();
                    break;
                case 6: $scope.NetIncome2 = netIncomeYear25();
                    break;
                default: $scope.NetIncome2 = null;
                    break;
            }
        }

    var netIncome3 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.NetIncome3 = netIncomeYear30();
                    break;
                case 2: $scope.NetIncome3 = netIncomeYear31();
                    break;
                case 3: $scope.NetIncome3 = netIncomeYear32();
                    break;
                case 4: $scope.NetIncome3 = netIncomeYear33();
                    break;
                case 5: $scope.NetIncome3 = netIncomeYear34();
                    break;
                case 6: $scope.NetIncome3 = netIncomeYear35();
                    break;
                default: $scope.NetIncome3 = null;
                    break;
            }
        }

    var netIncome4 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.NetIncome4 = netIncomeYear40();
                    break;
                case 2: $scope.NetIncome4 = netIncomeYear41();
                    break;
                case 3: $scope.NetIncome4 = netIncomeYear42();
                    break;
                case 4: $scope.NetIncome4 = netIncomeYear43();
                    break;
                case 5: $scope.NetIncome4 = netIncomeYear44();
                    break;
                case 6: $scope.NetIncome4 = netIncomeYear45();
                    break;
                default: $scope.NetIncome4 = null;
                    break;
            }
        }

    var netIncome5 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.NetIncome5 = netIncomeYear50();
                    break;
                case 2: $scope.NetIncome5 = netIncomeYear51();
                    break;
                case 3: $scope.NetIncome5 = netIncomeYear52();
                    break;
                case 4: $scope.NetIncome5 = netIncomeYear53();
                    break;
                case 5: $scope.NetIncome5 = netIncomeYear54();
                    break;
                case 6: $scope.NetIncome5 = netIncomeYear55();
                    break;
                default: $scope.NetIncome5 = null;
                    break;
            }
        }

    var netIncome6 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.NetIncome6 = netIncomeYear60();
                    break;
                case 2: $scope.NetIncome6 = netIncomeYear61();
                    break;
                case 3: $scope.NetIncome6 = netIncomeYear62();
                    break;
                case 4: $scope.NetIncome6 = netIncomeYear63();
                    break;
                case 5: $scope.NetIncome6 = netIncomeYear64();
                    break;
                case 6: $scope.NetIncome6 = netIncomeYear65();
                    break;
                default: $scope.NetIncome6 = null;
                    break;
            }
        }

    var netIncome7 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.NetIncome7 = netIncomeYear70();
                    break;
                case 2: $scope.NetIncome7 = netIncomeYear71();
                    break;
                case 3: $scope.NetIncome7 = netIncomeYear72();
                    break;
                case 4: $scope.NetIncome7 = netIncomeYear73();
                    break;
                case 5: $scope.NetIncome7 = netIncomeYear74();
                    break;
                case 6: $scope.NetIncome7 = netIncomeYear75();
                    break;
                default: $scope.NetIncome7 = null;
                    break;
            }
        }

    var netIncome8 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.NetIncome8 = netIncomeYear80();
                    break;
                case 2: $scope.NetIncome8 = netIncomeYear81();
                    break;
                case 3: $scope.NetIncome8 = netIncomeYear82();
                    break;
                case 4: $scope.NetIncome8  = netIncomeYear83();
                    break;
                case 5: $scope.NetIncome8  = netIncomeYear84();
                    break;
                case 6: $scope.NetIncome8 = netIncomeYear85();
                    break;
                default: $scope.NetIncome8 = null;
                    break;
            }
        }

    var tier1CapitalRatio1 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Tier1CapitalRatio1 = tier1RBCRatioYear10();
                    break;
                case 2: $scope.Tier1CapitalRatio1 = tier1RBCRatioYear11();
                    break;
                case 3: $scope.Tier1CapitalRatio1 = tier1RBCRatioYear12();
                    break;
                case 4: $scope.Tier1CapitalRatio1 = tier1RBCRatioYear13();
                    break;
                case 5: $scope.Tier1CapitalRatio1 = tier1RBCRatioYear14();
                    break;
                case 6: $scope.Tier1CapitalRatio1 = tier1RBCRatioYear15();
                    break;
                default: $scope.Tier1CapitalRatio1 = null;
                    break;
            }
        }

    var tier1CapitalRatio2 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Tier1CapitalRatio2 = tier1RBCRatioYear20();
                    break;
                case 2: $scope.Tier1CapitalRatio2 = tier1RBCRatioYear21();
                    break;
                case 3: $scope.Tier1CapitalRatio2 = tier1RBCRatioYear22();
                    break;
                case 4: $scope.Tier1CapitalRatio2 = tier1RBCRatioYear23();
                    break;
                case 5: $scope.Tier1CapitalRatio2 = tier1RBCRatioYear24();
                    break;
                case 6: $scope.Tier1CapitalRatio2 = tier1RBCRatioYear25();
                    break;
                default: $scope.Tier1CapitalRatio2 = null;
                    break;
            }
        }

    var tier1CapitalRatio3 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Tier1CapitalRatio3 = tier1RBCRatioYear30();
                    break;
                case 2: $scope.Tier1CapitalRatio3 = tier1RBCRatioYear31();
                    break;
                case 3: $scope.Tier1CapitalRatio3 = tier1RBCRatioYear32();
                    break;
                case 4: $scope.Tier1CapitalRatio3 = tier1RBCRatioYear33();
                    break;
                case 5: $scope.Tier1CapitalRatio3 = tier1RBCRatioYear34();
                    break;
                case 6: $scope.Tier1CapitalRatio3 = tier1RBCRatioYear35();
                    break;
                default: $scope.Tier1CapitalRatio3 = null;
                    break;
            }
        }

    var tier1CapitalRatio4 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Tier1CapitalRatio4 = tier1RBCRatioYear40();
                    break;
                case 2: $scope.Tier1CapitalRatio4 = tier1RBCRatioYear41();
                    break;
                case 3: $scope.Tier1CapitalRatio4 = tier1RBCRatioYear42();
                    break;
                case 4: $scope.Tier1CapitalRatio4 = tier1RBCRatioYear43();
                    break;
                case 5: $scope.Tier1CapitalRatio4 = tier1RBCRatioYear44();
                    break;
                case 6: $scope.Tier1CapitalRatio4 = tier1RBCRatioYear45();
                    break;
                default: $scope.Tier1CapitalRatio4 = null;
                    break;
            }
        }

    var tier1CapitalRatio5 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Tier1CapitalRatio5 = tier1RBCRatioYear50();
                    break;
                case 2: $scope.Tier1CapitalRatio5 = tier1RBCRatioYear51();
                    break;
                case 3: $scope.Tier1CapitalRatio5 = tier1RBCRatioYear52();
                    break;
                case 4: $scope.Tier1CapitalRatio5 = tier1RBCRatioYear53();
                    break;
                case 5: $scope.Tier1CapitalRatio5 = tier1RBCRatioYear54();
                    break;
                case 6: $scope.Tier1CapitalRatio5 = tier1RBCRatioYear55();
                    break;
                default: $scope.Tier1CapitalRatio5 = null;
                    break;
            }
        }

    var tier1CapitalRatio6 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Tier1CapitalRatio6 = tier1RBCRatioYear60();
                    break;
                case 2: $scope.Tier1CapitalRatio6 = tier1RBCRatioYear61();
                    break;
                case 3: $scope.Tier1CapitalRatio6 = tier1RBCRatioYear62();
                    break;
                case 4: $scope.Tier1CapitalRatio6 = tier1RBCRatioYear63();
                    break;
                case 5: $scope.Tier1CapitalRatio6 = tier1RBCRatioYear64();
                    break;
                case 6: $scope.Tier1CapitalRatio6 = tier1RBCRatioYear65();
                    break;
                default: $scope.Tier1CapitalRatio6 = null;
                    break;
            }
    }

    var tier1CapitalRatio7 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Tier1CapitalRatio7 = tier1RBCRatioYear70();
                    break;
                case 2: $scope.Tier1CapitalRatio7 = tier1RBCRatioYear71();
                    break;
                case 3: $scope.Tier1CapitalRatio7 = tier1RBCRatioYear72();
                    break;
                case 4: $scope.Tier1CapitalRatio7 = tier1RBCRatioYear73();
                    break;
                case 5: $scope.Tier1CapitalRatio7 = tier1RBCRatioYear74();
                    break;
                case 6: $scope.Tier1CapitalRatio7 = tier1RBCRatioYear75();
                    break;
                default: $scope.Tier1CapitalRatio7 = null;
                    break;
            }
    }

    var tier1CapitalRatio8 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Tier1CapitalRatio8 = tier1RBCRatioYear80();
                    break;
                case 2: $scope.Tier1CapitalRatio8 = tier1RBCRatioYear81();
                    break;
                case 3: $scope.Tier1CapitalRatio8 = tier1RBCRatioYear82();
                    break;
                case 4: $scope.Tier1CapitalRatio8 = tier1RBCRatioYear83();
                    break;
                case 5: $scope.Tier1CapitalRatio8 = tier1RBCRatioYear84();
                    break;
                case 6: $scope.Tier1CapitalRatio8 = tier1RBCRatioYear85();
                    break;
                default: $scope.Tier1CapitalRatio8 = null;
                    break;
            }
    }

    var tier1LeverageRatio1 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.Tier1LeverageRatio1 = tier1LeverageRatioYear10() * 100;
                break;
            case 2: $scope.Tier1LeverageRatio1 = tier1LeverageRatioYear11() * 100;
                break;
            case 3: $scope.Tier1LeverageRatio1 = tier1LeverageRatioYear12() * 100;
                break;
            case 4: $scope.Tier1LeverageRatio1 = tier1LeverageRatioYear13() * 100;
                break;
            case 5: $scope.Tier1LeverageRatio1 = tier1LeverageRatioYear14() * 100;
                break;
            case 6: $scope.Tier1LeverageRatio1 = tier1LeverageRatioYear15() * 100;
                break;
            default: $scope.Tier1LeverageRatio1 = null;
                break;
        }
    }

    var tier1LeverageRatio2 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.Tier1LeverageRatio2 = tier1LeverageRatioYear20() * 100;
                break;
            case 2: $scope.Tier1LeverageRatio2 = tier1LeverageRatioYear21() * 100;
                break;
            case 3: $scope.Tier1LeverageRatio2 = tier1LeverageRatioYear22() * 100;
                break;
            case 4: $scope.Tier1LeverageRatio2 = tier1LeverageRatioYear23() * 100;
                break;
            case 5: $scope.Tier1LeverageRatio2 = tier1LeverageRatioYear24() * 100;
                break;
            case 6: $scope.Tier1LeverageRatio2 = tier1LeverageRatioYear25() * 100;
                break;
            default: $scope.Tier1LeverageRatio2 = null;
                break;
        }
    }

    var tier1LeverageRatio3 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.Tier1LeverageRatio3 = tier1LeverageRatioYear30() * 100;
                break;
            case 2: $scope.Tier1LeverageRatio3 = tier1LeverageRatioYear31() * 100;
                break;
            case 3: $scope.Tier1LeverageRatio3 = tier1LeverageRatioYear32() * 100;
                break;
            case 4: $scope.Tier1LeverageRatio3 = tier1LeverageRatioYear33() * 100;
                break;
            case 5: $scope.Tier1LeverageRatio3 = tier1LeverageRatioYear34() * 100;
                break;
            case 6: $scope.Tier1LeverageRatio3 = tier1LeverageRatioYear35() * 100;
                break;
            default: $scope.Tier1LeverageRatio3 = null;
                break;
        }
    }

    var tier1LeverageRatio4 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.Tier1LeverageRatio4 = tier1LeverageRatioYear40() * 100;
                break;
            case 2: $scope.Tier1LeverageRatio4 = tier1LeverageRatioYear41() * 100;
                break;
            case 3: $scope.Tier1LeverageRatio4 = tier1LeverageRatioYear42() * 100;
                break;
            case 4: $scope.Tier1LeverageRatio4 = tier1LeverageRatioYear43() * 100;
                break;
            case 5: $scope.Tier1LeverageRatio4 = tier1LeverageRatioYear44() * 100;
                break;
            case 6: $scope.Tier1LeverageRatio4 = tier1LeverageRatioYear45() * 100;
                break;
            default: $scope.Tier1LeverageRatio4 = null;
                break;
        }
    }

    var tier1LeverageRatio5 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.Tier1LeverageRatio5 = tier1LeverageRatioYear50() * 100;
                break;
            case 2: $scope.Tier1LeverageRatio5 = tier1LeverageRatioYear51() * 100;
                break;
            case 3: $scope.Tier1LeverageRatio5 = tier1LeverageRatioYear52() * 100;
                break;
            case 4: $scope.Tier1LeverageRatio5 = tier1LeverageRatioYear53() * 100;
                break;
            case 5: $scope.Tier1LeverageRatio5 = tier1LeverageRatioYear54() * 100;
                break;
            case 6: $scope.Tier1LeverageRatio5 = tier1LeverageRatioYear55() * 100;
                break;
            default: $scope.Tier1LeverageRatio5 = null;
                break;
        }
    }

    var tier1LeverageRatio6 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.Tier1LeverageRatio6 = tier1LeverageRatioYear60() * 100;
                break;
            case 2: $scope.Tier1LeverageRatio6 = tier1LeverageRatioYear61() * 100;
                break;
            case 3: $scope.Tier1LeverageRatio6 = tier1LeverageRatioYear62() * 100;
                break;
            case 4: $scope.Tier1LeverageRatio6 = tier1LeverageRatioYear63() * 100;
                break;
            case 5: $scope.Tier1LeverageRatio6 = tier1LeverageRatioYear64() * 100;
                break;
            case 6: $scope.Tier1LeverageRatio6 = tier1LeverageRatioYear65() * 100;
                break;
            default: $scope.Tier1LeverageRatio6 = null;
                break;
        }
    }

    var tier1LeverageRatio7 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.Tier1LeverageRatio7 = tier1LeverageRatioYear70() * 100;
                break;
            case 2: $scope.Tier1LeverageRatio7 = tier1LeverageRatioYear71() * 100;
                break;
            case 3: $scope.Tier1LeverageRatio7 = tier1LeverageRatioYear72() * 100;
                break;
            case 4: $scope.Tier1LeverageRatio7 = tier1LeverageRatioYear73() * 100;
                break;
            case 5: $scope.Tier1LeverageRatio7 = tier1LeverageRatioYear74() * 100;
                break;
            case 6: $scope.Tier1LeverageRatio7 = tier1LeverageRatioYear75() * 100;
                break;
            default: $scope.Tier1LeverageRatio7 = null;
                break;
        }
    }

    var tier1LeverageRatio8 = function () {
        switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.Tier1LeverageRatio8 = tier1LeverageRatioYear80() * 100;
                break;
            case 2: $scope.Tier1LeverageRatio8 = tier1LeverageRatioYear81() * 100;
                break;
            case 3: $scope.Tier1LeverageRatio8 = tier1LeverageRatioYear82() * 100;
                break;
            case 4: $scope.Tier1LeverageRatio8 = tier1LeverageRatioYear83() * 100;
                break;
            case 5: $scope.Tier1LeverageRatio8 = tier1LeverageRatioYear84() * 100;
                break;
            case 6: $scope.Tier1LeverageRatio8 = tier1LeverageRatioYear85() * 100;
                break;
            default: $scope.Tier1LeverageRatio8 = null;
                break;
        }
    }

    var totalRiskBasedRatio1 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalRiskBasedRatio1 = totalRBCRatioYear10();
                    break;
                case 2: $scope.TotalRiskBasedRatio1 = totalRBCRatioYear11();
                    break;
                case 3: $scope.TotalRiskBasedRatio1 = totalRBCRatioYear12();
                    break;
                case 4: $scope.TotalRiskBasedRatio1 = totalRBCRatioYear13();
                    break;
                case 5: $scope.TotalRiskBasedRatio1 = totalRBCRatioYear14();
                    break;
                case 6: $scope.TotalRiskBasedRatio1 = totalRBCRatioYear15();
                    break;
                default: $scope.TotalRiskBasedRatio1 = null;
                    break;
            }
    }

    var totalRiskBasedRatio2 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalRiskBasedRatio2 = totalRBCRatioYear20();
                    break;
                case 2: $scope.TotalRiskBasedRatio2 = totalRBCRatioYear21();
                    break;
                case 3: $scope.TotalRiskBasedRatio2 = totalRBCRatioYear22();
                    break;
                case 4: $scope.TotalRiskBasedRatio2 = totalRBCRatioYear23();
                    break;
                case 5: $scope.TotalRiskBasedRatio2 = totalRBCRatioYear24();
                    break;
                case 6: $scope.TotalRiskBasedRatio2 = totalRBCRatioYear25();
                    break;
                default: $scope.TotalRiskBasedRatio2 = null;
                    break;
            }
    }

    var totalRiskBasedRatio3 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalRiskBasedRatio3 = totalRBCRatioYear30();
                    break;
                case 2: $scope.TotalRiskBasedRatio3 = totalRBCRatioYear31();
                    break;
                case 3: $scope.TotalRiskBasedRatio3 = totalRBCRatioYear32();
                    break;
                case 4: $scope.TotalRiskBasedRatio3 = totalRBCRatioYear33();
                    break;
                case 5: $scope.TotalRiskBasedRatio3 = totalRBCRatioYear34();
                    break;
                case 6: $scope.TotalRiskBasedRatio3 = totalRBCRatioYear35();
                    break;
                default: $scope.TotalRiskBasedRatio3 = null;
                    break;
            }
    }

    var totalRiskBasedRatio4 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalRiskBasedRatio4 = totalRBCRatioYear40();
                    break;
                case 2: $scope.TotalRiskBasedRatio4 = totalRBCRatioYear41();
                    break;
                case 3: $scope.TotalRiskBasedRatio4 = totalRBCRatioYear42();
                    break;
                case 4: $scope.TotalRiskBasedRatio4 = totalRBCRatioYear43();
                    break;
                case 5: $scope.TotalRiskBasedRatio4 = totalRBCRatioYear44();
                    break;
                case 6: $scope.TotalRiskBasedRatio4 = totalRBCRatioYear45();
                    break;
                default: $scope.TotalRiskBasedRatio4 = null;
                    break;
            }
    }

    var totalRiskBasedRatio5 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalRiskBasedRatio5 = totalRBCRatioYear50();
                    break;
                case 2: $scope.TotalRiskBasedRatio5 = totalRBCRatioYear51();
                    break;
                case 3: $scope.TotalRiskBasedRatio5 = totalRBCRatioYear52();
                    break;
                case 4: $scope.TotalRiskBasedRatio5 = totalRBCRatioYear53();
                    break;
                case 5: $scope.TotalRiskBasedRatio5 = totalRBCRatioYear54();
                    break;
                case 6: $scope.TotalRiskBasedRatio5 = totalRBCRatioYear55();
                    break;
                default: $scope.TotalRiskBasedRatio5 = null;
                    break;
            }
    }

    var totalRiskBasedRatio6 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalRiskBasedRatio6 = totalRBCRatioYear60();
                    break;
                case 2: $scope.TotalRiskBasedRatio6 = totalRBCRatioYear61();
                    break;
                case 3: $scope.TotalRiskBasedRatio6 = totalRBCRatioYear62();
                    break;
                case 4: $scope.TotalRiskBasedRatio6 = totalRBCRatioYear63();
                    break;
                case 5: $scope.TotalRiskBasedRatio6 = totalRBCRatioYear64();
                    break;
                case 6: $scope.TotalRiskBasedRatio6 = totalRBCRatioYear65();
                    break;
                default: $scope.TotalRiskBasedRatio6 = null;
                    break;
            }
    }

    var totalRiskBasedRatio7 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalRiskBasedRatio7 = totalRBCRatioYear70();
                    break;
                case 2: $scope.TotalRiskBasedRatio7 = totalRBCRatioYear71();
                    break;
                case 3: $scope.TotalRiskBasedRatio7 = totalRBCRatioYear72();
                    break;
                case 4: $scope.TotalRiskBasedRatio7 = totalRBCRatioYear73();
                    break;
                case 5: $scope.TotalRiskBasedRatio7 = totalRBCRatioYear74();
                    break;
                case 6: $scope.TotalRiskBasedRatio7 = totalRBCRatioYear75();
                    break;
                default: $scope.TotalRiskBasedRatio7 = null;
                    break;
            }
    }

    var totalRiskBasedRatio8 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.TotalRiskBasedRatio8 = totalRBCRatioYear80();
                    break;
                case 2: $scope.TotalRiskBasedRatio8 = totalRBCRatioYear81();
                    break;
                case 3: $scope.TotalRiskBasedRatio8 = totalRBCRatioYear82();
                    break;
                case 4: $scope.TotalRiskBasedRatio8 = totalRBCRatioYear83();
                    break;
                case 5: $scope.TotalRiskBasedRatio8 = totalRBCRatioYear84();
                    break;
                case 6: $scope.TotalRiskBasedRatio8 = totalRBCRatioYear85();
                    break;
                default: $scope.TotalRiskBasedRatio8 = null;
                    break;
            }
    }

    var rOAA1 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAA1 = returnOnAverageAssetsYear10();
                    break;
                case 2: $scope.ROAA1 = returnOnAverageAssetsYear11();
                    break;
                case 3: $scope.ROAA1 = returnOnAverageAssetsYear12();
                    break;
                case 4: $scope.ROAA1 = returnOnAverageAssetsYear13();
                    break;
                case 5: $scope.ROAA1 = returnOnAverageAssetsYear14();
                    break;
                case 6: $scope.ROAA1 = returnOnAverageAssetsYear15();
                    break;
                default: $scope.ROAA1 = null;
                    break;
            }
        }

    var rOAA2 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAA2 = returnOnAverageAssetsYear20();
                    break;
                case 2: $scope.ROAA2 = returnOnAverageAssetsYear21();
                    break;
                case 3: $scope.ROAA2 = returnOnAverageAssetsYear22();
                    break;
                case 4: $scope.ROAA2 = returnOnAverageAssetsYear23();
                    break;
                case 5: $scope.ROAA2 = returnOnAverageAssetsYear24();
                    break;
                case 6: $scope.ROAA2 = returnOnAverageAssetsYear25();
                    break;
                default: $scope.ROAA2 = null;
                    break;
            }
        }

    var rOAA3 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAA3 = returnOnAverageAssetsYear30();
                    break;
                case 2: $scope.ROAA3 = returnOnAverageAssetsYear31();
                    break;
                case 3: $scope.ROAA3 = returnOnAverageAssetsYear32();
                    break;
                case 4: $scope.ROAA3 = returnOnAverageAssetsYear33();
                    break;
                case 5: $scope.ROAA3 = returnOnAverageAssetsYear34();
                    break;
                case 6: $scope.ROAA3 = returnOnAverageAssetsYear35();
                    break;
                default: $scope.ROAA3 = null;
                    break;
            }
        }

    var rOAA4 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAA4 = returnOnAverageAssetsYear40();
                    break;
                case 2: $scope.ROAA4 = returnOnAverageAssetsYear41();
                    break;
                case 3: $scope.ROAA4 = returnOnAverageAssetsYear42();
                    break;
                case 4: $scope.ROAA4 = returnOnAverageAssetsYear43();
                    break;
                case 5: $scope.ROAA4 = returnOnAverageAssetsYear44();
                    break;
                case 6: $scope.ROAA4 = returnOnAverageAssetsYear45();
                    break;
                default: $scope.ROAA4 = null;
                    break;
            }
        }

    var rOAA5 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAA5 = returnOnAverageAssetsYear50();
                    break;
                case 2: $scope.ROAA5 = returnOnAverageAssetsYear51();
                    break;
                case 3: $scope.ROAA5 = returnOnAverageAssetsYear52();
                    break;
                case 4: $scope.ROAA5 = returnOnAverageAssetsYear53();
                    break;
                case 5: $scope.ROAA5 = returnOnAverageAssetsYear54();
                    break;
                case 6: $scope.ROAA5 = returnOnAverageAssetsYear55();
                    break;
                default: $scope.ROAA5 = null;
                    break;
            }
        }

    var rOAA6 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAA6 = returnOnAverageAssetsYear60();
                    break;
                case 2: $scope.ROAA6 = returnOnAverageAssetsYear61();
                    break;
                case 3: $scope.ROAA6 = returnOnAverageAssetsYear62();
                    break;
                case 4: $scope.ROAA6 = returnOnAverageAssetsYear63();
                    break;
                case 5: $scope.ROAA6 = returnOnAverageAssetsYear64();
                    break;
                case 6: $scope.ROAA6 = returnOnAverageAssetsYear65();
                    break;
                default: $scope.ROAA6 = null;
                    break;
            }
        }

    var rOAA7 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAA7 = returnOnAverageAssetsYear70();
                    break;
                case 2: $scope.ROAA7 = returnOnAverageAssetsYear71();
                    break;
                case 3: $scope.ROAA7 = returnOnAverageAssetsYear72();
                    break;
                case 4: $scope.ROAA7 = returnOnAverageAssetsYear73();
                    break;
                case 5: $scope.ROAA7 = returnOnAverageAssetsYear74();
                    break;
                case 6: $scope.ROAA7 = returnOnAverageAssetsYear75();
                    break;
                default: $scope.ROAA7 = null;
                    break;
            }
        }

    var rOAA8 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAA8 = returnOnAverageAssetsYear80();
                    break;
                case 2: $scope.ROAA8 = returnOnAverageAssetsYear81();
                    break;
                case 3: $scope.ROAA8 = returnOnAverageAssetsYear82();
                    break;
                case 4: $scope.ROAA8 = returnOnAverageAssetsYear83();
                    break;
                case 5: $scope.ROAA8 = returnOnAverageAssetsYear84();
                    break;
                case 6: $scope.ROAA8 = returnOnAverageAssetsYear85();
                    break;
                default: $scope.ROAA8 = null;
                    break;
            }
        }

    var rOAE1 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAE1 = returnOnAverageEquityYear10();
                    break;
                case 2: $scope.ROAE1 = returnOnAverageEquityYear11();
                    break;
                case 3: $scope.ROAE1 = returnOnAverageEquityYear12();
                    break;
                case 4: $scope.ROAE1 = returnOnAverageEquityYear13();
                    break;
                case 5: $scope.ROAE1 = returnOnAverageEquityYear14();
                    break;
                case 6: $scope.ROAE1 = returnOnAverageEquityYear15();
                    break;
                default: $scope.ROAE1 = null;
                    break;
            }
    }

    var rOAE2 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAE2 = returnOnAverageEquityYear20();
                    break;
                case 2: $scope.ROAE2 = returnOnAverageEquityYear21();
                    break;
                case 3: $scope.ROAE2 = returnOnAverageEquityYear22();
                    break;
                case 4: $scope.ROAE2 = returnOnAverageEquityYear23();
                    break;
                case 5: $scope.ROAE2 = returnOnAverageEquityYear24();
                    break;
                case 6: $scope.ROAE2 = returnOnAverageEquityYear25();
                    break;
                default: $scope.ROAE2 = null;
                    break;
            }
    }

    var rOAE3 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAE3 = returnOnAverageEquityYear30();
                    break;
                case 2: $scope.ROAE3 = returnOnAverageEquityYear31();
                    break;
                case 3: $scope.ROAE3 = returnOnAverageEquityYear32();
                    break;
                case 4: $scope.ROAE3 = returnOnAverageEquityYear33();
                    break;
                case 5: $scope.ROAE3 = returnOnAverageEquityYear34();
                    break;
                case 6: $scope.ROAE3 = returnOnAverageEquityYear35();
                    break;
                default: $scope.ROAE3 = null;
                    break;
            }
    }

    var rOAE4 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAE4 = returnOnAverageEquityYear40();
                    break;
                case 2: $scope.ROAE4 = returnOnAverageEquityYear41();
                    break;
                case 3: $scope.ROAE4 = returnOnAverageEquityYear42();
                    break;
                case 4: $scope.ROAE4 = returnOnAverageEquityYear43();
                    break;
                case 5: $scope.ROAE4 = returnOnAverageEquityYear44();
                    break;
                case 6: $scope.ROAE4 = returnOnAverageEquityYear45();
                    break;
                default: $scope.ROAE4 = null;
                    break;
            }
    }

    var rOAE5 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAE5 = returnOnAverageEquityYear50();
                    break;
                case 2: $scope.ROAE5 = returnOnAverageEquityYear51();
                    break;
                case 3: $scope.ROAE5 = returnOnAverageEquityYear52();
                    break;
                case 4: $scope.ROAE5 = returnOnAverageEquityYear53();
                    break;
                case 5: $scope.ROAE5 = returnOnAverageEquityYear54();
                    break;
                case 6: $scope.ROAE5 = returnOnAverageEquityYear55();
                    break;
                default: $scope.ROAE5 = null;
                    break;
            }
    }

    var rOAE6 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAE6 = returnOnAverageEquityYear60();
                    break;
                case 2: $scope.ROAE6 = returnOnAverageEquityYear61();
                    break;
                case 3: $scope.ROAE6 = returnOnAverageEquityYear62();
                    break;
                case 4: $scope.ROAE6 = returnOnAverageEquityYear63();
                    break;
                case 5: $scope.ROAE6 = returnOnAverageEquityYear64();
                    break;
                case 6: $scope.ROAE6 = returnOnAverageEquityYear65();
                    break;
                default: $scope.ROAE6 = null;
                    break;
            }
    }

    var rOAE7 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAE7 = returnOnAverageEquityYear70();
                    break;
                case 2: $scope.ROAE7 = returnOnAverageEquityYear71();
                    break;
                case 3: $scope.ROAE7 = returnOnAverageEquityYear72();
                    break;
                case 4: $scope.ROAE7 = returnOnAverageEquityYear73();
                    break;
                case 5: $scope.ROAE7 = returnOnAverageEquityYear74();
                    break;
                case 6: $scope.ROAE7 = returnOnAverageEquityYear75();
                    break;
                default: $scope.ROAE7 = null;
                    break;
            }
    }

    var rOAE8 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.ROAE8 = returnOnAverageEquityYear80();
                    break;
                case 2: $scope.ROAE8 = returnOnAverageEquityYear81();
                    break;
                case 3: $scope.ROAE8 = returnOnAverageEquityYear82();
                    break;
                case 4: $scope.ROAE8 = returnOnAverageEquityYear83();
                    break;
                case 5: $scope.ROAE8 = returnOnAverageEquityYear84();
                    break;
                case 6: $scope.ROAE8 = returnOnAverageEquityYear85();
                    break;
                default: $scope.ROAE8 = null;
                    break;
            }
    }

    var bookValueEquity1 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.BookValueEquity1 = bankEquityCapitalYear10();
                    break;
                case 2: $scope.BookValueEquity1 = bankEquityCapitalYear11();
                    break;
                case 3: $scope.BookValueEquity1 = bankEquityCapitalYear12();
                    break;
                case 4: $scope.BookValueEquity1 = bankEquityCapitalYear13();
                    break;
                case 5: $scope.BookValueEquity1 = bankEquityCapitalYear14();
                    break;
                case 6: $scope.BookValueEquity1 = bankEquityCapitalYear15();
                    break;
                default: $scope.BookValueEquity1 = null;
                    break;
            }
    }

    var bookValueEquity2 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.BookValueEquity2 = bankEquityCapitalYear20();
                    break;
                case 2: $scope.BookValueEquity2 = bankEquityCapitalYear21();
                    break;
                case 3: $scope.BookValueEquity2 = bankEquityCapitalYear22();
                    break;
                case 4: $scope.BookValueEquity2 = bankEquityCapitalYear23();
                    break;
                case 5: $scope.BookValueEquity2 = bankEquityCapitalYear24();
                    break;
                case 6: $scope.BookValueEquity2 = bankEquityCapitalYear25();
                    break;
                default: $scope.BookValueEquity2 = null;
                    break;
            }
    }

    var bookValueEquity3 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.BookValueEquity3 = bankEquityCapitalYear30();
                    break;
                case 2: $scope.BookValueEquity3 = bankEquityCapitalYear31();
                    break;
                case 3: $scope.BookValueEquity3 = bankEquityCapitalYear32();
                    break;
                case 4: $scope.BookValueEquity3 = bankEquityCapitalYear33();
                    break;
                case 5: $scope.BookValueEquity3 = bankEquityCapitalYear34();
                    break;
                case 6: $scope.BookValueEquity3 = bankEquityCapitalYear35();
                    break;
                default: $scope.BookValueEquity3 = null;
                    break;
            }
    }

    var bookValueEquity4 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.BookValueEquity4 = bankEquityCapitalYear40();
                    break;
                case 2: $scope.BookValueEquity4 = bankEquityCapitalYear41();
                    break;
                case 3: $scope.BookValueEquity4 = bankEquityCapitalYear42();
                    break;
                case 4: $scope.BookValueEquity4 = bankEquityCapitalYear43();
                    break;
                case 5: $scope.BookValueEquity4 = bankEquityCapitalYear44();
                    break;
                case 6: $scope.BookValueEquity4 = bankEquityCapitalYear45();
                    break;
                default: $scope.BookValueEquity4 = null;
                    break;
            }
    }

    var bookValueEquity5 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.BookValueEquity5 = bankEquityCapitalYear50();
                    break;
                case 2: $scope.BookValueEquity5 = bankEquityCapitalYear51();
                    break;
                case 3: $scope.BookValueEquity5 = bankEquityCapitalYear52();
                    break;
                case 4: $scope.BookValueEquity5 = bankEquityCapitalYear53();
                    break;
                case 5: $scope.BookValueEquity5 = bankEquityCapitalYear54();
                    break;
                case 6: $scope.BookValueEquity5 = bankEquityCapitalYear55();
                    break;
                default: $scope.BookValueEquity5 = null;
                    break;
            }
    }

    var bookValueEquity6 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.BookValueEquity6 = bankEquityCapitalYear60();
                    break;
                case 2: $scope.BookValueEquity6 = bankEquityCapitalYear61();
                    break;
                case 3: $scope.BookValueEquity6 = bankEquityCapitalYear62();
                    break;
                case 4: $scope.BookValueEquity6 = bankEquityCapitalYear63();
                    break;
                case 5: $scope.BookValueEquity6 = bankEquityCapitalYear64();
                    break;
                case 6: $scope.BookValueEquity6 = bankEquityCapitalYear65();
                    break;
                default: $scope.BookValueEquity6 = null;
                    break;
            }
    }

    var bookValueEquity7 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.BookValueEquity7 = bankEquityCapitalYear70();
                    break;
                case 2: $scope.BookValueEquity7 = bankEquityCapitalYear71();
                    break;
                case 3: $scope.BookValueEquity7 = bankEquityCapitalYear72();
                    break;
                case 4: $scope.BookValueEquity7 = bankEquityCapitalYear73();
                    break;
                case 5: $scope.BookValueEquity7 = bankEquityCapitalYear74();
                    break;
                case 6: $scope.BookValueEquity7 = bankEquityCapitalYear75();
                    break;
                default: $scope.BookValueEquity7 = null;
                    break;
            }
    }

    var bookValueEquity8 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.BookValueEquity8 = bankEquityCapitalYear80();
                    break;
                case 2: $scope.BookValueEquity8 = bankEquityCapitalYear81();
                    break;
                case 3: $scope.BookValueEquity8 = bankEquityCapitalYear82();
                    break;
                case 4: $scope.BookValueEquity8 = bankEquityCapitalYear83();
                    break;
                case 5: $scope.BookValueEquity8 = bankEquityCapitalYear84();
                    break;
                case 6: $scope.BookValueEquity8 = bankEquityCapitalYear85();
                    break;
                default: $scope.BookValueEquity8 = null;
                    break;
            }
    }

    var marketValueEquity1 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.MarketValueEquity1 = mvEquityYear10();
                    break;
                case 2: $scope.MarketValueEquity1 = mvEquityYear11();
                    break;
                case 3: $scope.MarketValueEquity1 = mvEquityYear12();
                    break;
                case 4: $scope.MarketValueEquity1 = mvEquityYear13();
                    break;
                case 5: $scope.MarketValueEquity1 = mvEquityYear14();
                    break;
                case 6: $scope.MarketValueEquity1 = mvEquityYear15();
                    break;
                default: $scope.MarketValueEquity1 = null;
                    break;
            }
    }

    var marketValueEquity2 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.MarketValueEquity2 = mvEquityYear20();
                    break;
                case 2: $scope.MarketValueEquity2 = mvEquityYear21();
                    break;
                case 3: $scope.MarketValueEquity2 = mvEquityYear22();
                    break;
                case 4: $scope.MarketValueEquity2 = mvEquityYear23();
                    break;
                case 5: $scope.MarketValueEquity2 = mvEquityYear24();
                    break;
                case 6: $scope.MarketValueEquity2 = mvEquityYear25();
                    break;
                default: $scope.MarketValueEquity2 = null;
                    break;
            }
    }

    var marketValueEquity3 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.MarketValueEquity3 = mvEquityYear30();
                    break;
                case 2: $scope.MarketValueEquity3 = mvEquityYear31();
                    break;
                case 3: $scope.MarketValueEquity3 = mvEquityYear32();
                    break;
                case 4: $scope.MarketValueEquity3 = mvEquityYear33();
                    break;
                case 5: $scope.MarketValueEquity3 = mvEquityYear34();
                    break;
                case 6: $scope.MarketValueEquity3 = mvEquityYear35();
                    break;
                default: $scope.MarketValueEquity3 = null;
                    break;
            }
    }

    var marketValueEquity4 = function () {
            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.MarketValueEquity4 = mvEquityYear40();
                    break;
                case 2: $scope.MarketValueEquity4 = mvEquityYear41();
                    break;
                case 3: $scope.MarketValueEquity4 = mvEquityYear42();
                    break;
                case 4: $scope.MarketValueEquity4 = mvEquityYear43();
                    break;
                case 5: $scope.MarketValueEquity4 = mvEquityYear44();
                    break;
                case 6: $scope.MarketValueEquity4 = mvEquityYear45();
                    break;
                default: $scope.MarketValueEquity4 = null;
                    break;
            }
    }

    var marketValueEquity5 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.MarketValueEquity5 = mvEquityYear50();
                    break;
                case 2: $scope.MarketValueEquity5 = mvEquityYear51();
                    break;
                case 3: $scope.MarketValueEquity5 = mvEquityYear52();
                    break;
                case 4: $scope.MarketValueEquity5 = mvEquityYear53();
                    break;
                case 5: $scope.MarketValueEquity5 = mvEquityYear54();
                    break;
                case 6: $scope.MarketValueEquity5 = mvEquityYear55();
                    break;
                default: $scope.MarketValueEquity5 = null;
                    break;
            }
    }

    var marketValueEquity6 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.MarketValueEquity6 = mvEquityYear60();
                    break;
                case 2: $scope.MarketValueEquity6 = mvEquityYear61();
                    break;
                case 3: $scope.MarketValueEquity6 = mvEquityYear62();
                    break;
                case 4: $scope.MarketValueEquity6 = mvEquityYear63();
                    break;
                case 5: $scope.MarketValueEquity6 = mvEquityYear64();
                    break;
                case 6: $scope.MarketValueEquity6 = mvEquityYear65();
                    break;
                default: $scope.MarketValueEquity6 = null;
                    break;
            }
    }

    var marketValueEquity7 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.MarketValueEquity7 = mvEquityYear70();
                    break;
                case 2: $scope.MarketValueEquity7 = mvEquityYear71();
                    break;
                case 3: $scope.MarketValueEquity7 = mvEquityYear72();
                    break;
                case 4: $scope.MarketValueEquity7 = mvEquityYear73();
                    break;
                case 5: $scope.MarketValueEquity7 = mvEquityYear74();
                    break;
                case 6: $scope.MarketValueEquity7 = mvEquityYear75();
                    break;
                default: $scope.MarketValueEquity7 = null;
                    break;
            }
    }

    var marketValueEquity8 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.MarketValueEquity8 = mvEquityYear80();
                    break;
                case 2: $scope.MarketValueEquity8 = mvEquityYear81();
                    break;
                case 3: $scope.MarketValueEquity8 = mvEquityYear82();
                    break;
                case 4: $scope.MarketValueEquity8 = mvEquityYear83();
                    break;
                case 5: $scope.MarketValueEquity8 = mvEquityYear84();
                    break;
                case 6: $scope.MarketValueEquity8 = mvEquityYear85();
                    break;
                default: $scope.MarketValueEquity8 = null;
                    break;
            }
    }

    var bookValuePerShare1 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.BookValuePerShare1 = bvSharePriceYear10();
                    break;
            case 2: $scope.BookValuePerShare1 = bvSharePriceYear11();
                    break;
            case 3: $scope.BookValuePerShare1 = bvSharePriceYear12();
                    break;
            case 4: $scope.BookValuePerShare1 = bvSharePriceYear13();
                    break;
            case 5: $scope.BookValuePerShare1 = bvSharePriceYear14();
                    break;
            case 6: $scope.BookValuePerShare1 = bvSharePriceYear15();
                    break;
                default: $scope.BookValuePerShare1 = null;
                    break;
            }
    }

    var bookValuePerShare2 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.BookValuePerShare2 = bvSharePriceYear20();
                    break;
            case 2: $scope.BookValuePerShare2 = bvSharePriceYear21();
                    break;
            case 3: $scope.BookValuePerShare2 = bvSharePriceYear22();
                    break;
            case 4: $scope.BookValuePerShare2 = bvSharePriceYear23();
                    break;
            case 5: $scope.BookValuePerShare2 = bvSharePriceYear24();
                    break;
                case 6: $scope.BookValuePerShare2 = bvSharePriceYear25();
                    break;
                default: $scope.BookValuePerShare2 = null;
                    break;
            }
    }

    var bookValuePerShare3 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.BookValuePerShare3 = bvSharePriceYear30();
                    break;
            case 2: $scope.BookValuePerShare3 = bvSharePriceYear31();
                    break;
            case 3: $scope.BookValuePerShare3 = bvSharePriceYear32();
                    break;
            case 4: $scope.BookValuePerShare3 = bvSharePriceYear33();
                    break;
            case 5: $scope.BookValuePerShare3 = bvSharePriceYear34();
                    break;
                case 6: $scope.BookValuePerShare3 = bvSharePriceYear35();
                    break;
                default: $scope.BookValuePerShare3 = null;
                    break;
            }
    }

    var bookValuePerShare4 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.BookValuePerShare4 = bvSharePriceYear40();
                    break;
            case 2: $scope.BookValuePerShare4 = bvSharePriceYear41();
                    break;
            case 3: $scope.BookValuePerShare4 = bvSharePriceYear42();
                    break;
            case 4: $scope.BookValuePerShare4 = bvSharePriceYear43();
                    break;
            case 5: $scope.BookValuePerShare4 = bvSharePriceYear44();
                    break;
                case 6: $scope.BookValuePerShare4 = bvSharePriceYear45();
                    break;
                default: $scope.BookValuePerShare4 = null;
                    break;
            }
    }

    var bookValuePerShare5 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.BookValuePerShare5 = bvSharePriceYear50();
                    break;
            case 2: $scope.BookValuePerShare5 = bvSharePriceYear51();
                    break;
            case 3: $scope.BookValuePerShare5 = bvSharePriceYear52();
                    break;
            case 4: $scope.BookValuePerShare5 = bvSharePriceYear53();
                    break;
            case 5: $scope.BookValuePerShare5 = bvSharePriceYear54();
                    break;
                case 6: $scope.BookValuePerShare5 = bvSharePriceYear55();
                    break;
                default: $scope.BookValuePerShare5 = null;
                    break;
            }
    }

    var bookValuePerShare6 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.BookValuePerShare6 = bvSharePriceYear60();
                    break;
            case 2: $scope.BookValuePerShare6 = bvSharePriceYear61();
                    break;
            case 3: $scope.BookValuePerShare6 = bvSharePriceYear62();
                    break;
            case 4: $scope.BookValuePerShare6 = bvSharePriceYear63();
                    break;
            case 5: $scope.BookValuePerShare6 = bvSharePriceYear64();
                    break;
                case 6: $scope.BookValuePerShare6 = bvSharePriceYear65();
                    break;
                default: $scope.BookValuePerShare6 = null;
                    break;
            }
    }

    var bookValuePerShare7 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.BookValuePerShare7 = bvSharePriceYear70();
                    break;
            case 2: $scope.BookValuePerShare7 = bvSharePriceYear71();
                    break;
            case 3: $scope.BookValuePerShare7 = bvSharePriceYear72();
                    break;
            case 4: $scope.BookValuePerShare7 = bvSharePriceYear73();
                    break;
            case 5: $scope.BookValuePerShare7 = bvSharePriceYear74();
                    break;
                case 6: $scope.BookValuePerShare7 = bvSharePriceYear75();
                    break;
                default: $scope.BookValuePerShare7 = null;
                    break;
            }
    }

    var bookValuePerShare8 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
            case 1: $scope.BookValuePerShare8 = bvSharePriceYear80();
                    break;
            case 2: $scope.BookValuePerShare8 = bvSharePriceYear81();
                    break;
            case 3: $scope.BookValuePerShare8 = bvSharePriceYear82();
                    break;
            case 4: $scope.BookValuePerShare8 = bvSharePriceYear83();
                    break;
            case 5: $scope.BookValuePerShare8 = bvSharePriceYear84();
                    break;
                case 6: $scope.BookValuePerShare8 = bvSharePriceYear85();
                    break;
                default: $scope.BookValuePerShare8 = null;
                    break;
            }
    }

    var ePS1 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.EPS1 = earningsPerSharePriceYear10();
                    break;
                case 2: $scope.EPS1 = earningsPerSharePriceYear11();
                    break;
                case 3: $scope.EPS1 = earningsPerSharePriceYear12();
                    break;
                case 4: $scope.EPS1 = earningsPerSharePriceYear13();
                    break;
                case 5: $scope.EPS1 = earningsPerSharePriceYear14();
                    break;
                case 6: $scope.EPS1 = earningsPerSharePriceYear15();
                    break;
                default: $scope.EPS1 = null;
                    break;
            }
    }

    var ePS2 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.EPS2 = earningsPerSharePriceYear20();
                    break;
                case 2: $scope.EPS2 = earningsPerSharePriceYear21();
                    break;
                case 3: $scope.EPS2 = earningsPerSharePriceYear22();
                    break;
                case 4: $scope.EPS2 = earningsPerSharePriceYear23();
                    break;
                case 5: $scope.EPS2 = earningsPerSharePriceYear24();
                    break;
                case 6: $scope.EPS2 = earningsPerSharePriceYear25();
                    break;
                default: $scope.EPS2 = null;
                    break;
            }
    }

    var ePS3 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.EPS3 = earningsPerSharePriceYear30();
                    break;
                case 2: $scope.EPS3 = earningsPerSharePriceYear31();
                    break;
                case 3: $scope.EPS3 = earningsPerSharePriceYear32();
                    break;
                case 4: $scope.EPS3 = earningsPerSharePriceYear33();
                    break;
                case 5: $scope.EPS3 = earningsPerSharePriceYear34();
                    break;
                case 6: $scope.EPS3 = earningsPerSharePriceYear35();
                    break;
                default: $scope.EPS3 = null;
                    break;
            }
    }

    var ePS4 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.EPS4 = earningsPerSharePriceYear40();
                    break;
                case 2: $scope.EPS4 = earningsPerSharePriceYear41();
                    break;
                case 3: $scope.EPS4 = earningsPerSharePriceYear42();
                    break;
                case 4: $scope.EPS4 = earningsPerSharePriceYear43();
                    break;
                case 5: $scope.EPS4 = earningsPerSharePriceYear44();
                    break;
                case 6: $scope.EPS4 = earningsPerSharePriceYear45();
                    break;
                default: $scope.EPS4 = null;
                    break;
            }
    }

    var ePS5 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.EPS5 = earningsPerSharePriceYear50();
                    break;
                case 2: $scope.EPS5 = earningsPerSharePriceYear51();
                    break;
                case 3: $scope.EPS5 = earningsPerSharePriceYear52();
                    break;
                case 4: $scope.EPS5 = earningsPerSharePriceYear53();
                    break;
                case 5: $scope.EPS5 = earningsPerSharePriceYear54();
                    break;
                case 6: $scope.EPS5 = earningsPerSharePriceYear55();
                    break;
                default: $scope.EPS5 = null;
                    break;
            }
    }

    var ePS6 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.EPS6 = earningsPerSharePriceYear60();
                    break;
                case 2: $scope.EPS6 = earningsPerSharePriceYear61();
                    break;
                case 3: $scope.EPS6 = earningsPerSharePriceYear62();
                    break;
                case 4: $scope.EPS6 = earningsPerSharePriceYear63();
                    break;
                case 5: $scope.EPS6 = earningsPerSharePriceYear64();
                    break;
                case 6: $scope.EPS6 = earningsPerSharePriceYear65();
                    break;
                default: $scope.EPS6 = null;
                    break;
            }
    }

    var ePS7 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.EPS7 = earningsPerSharePriceYear70();
                    break;
                case 2: $scope.EPS7 = earningsPerSharePriceYear71();
                    break;
                case 3: $scope.EPS7 = earningsPerSharePriceYear72();
                    break;
                case 4: $scope.EPS7 = earningsPerSharePriceYear73();
                    break;
                case 5: $scope.EPS7 = earningsPerSharePriceYear74();
                    break;
                case 6: $scope.EPS7 = earningsPerSharePriceYear75();
                    break;
                default: $scope.EPS7 = null;
                    break;
            }
    }

    var ePS8 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.EPS8 = earningsPerSharePriceYear80();
                    break;
                case 2: $scope.EPS8 = earningsPerSharePriceYear81();
                    break;
                case 3: $scope.EPS8 = earningsPerSharePriceYear82();
                    break;
                case 4: $scope.EPS8 = earningsPerSharePriceYear83();
                    break;
                case 5: $scope.EPS8 = earningsPerSharePriceYear84();
                    break;
                case 6: $scope.EPS8 = earningsPerSharePriceYear85();
                    break;
                default: $scope.EPS8 = null;
                    break;
            }
    }

    var exit15XBook1 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Exit15XBook1 = mvSharePriceYear10();
                    break;
                case 2: $scope.Exit15XBook1 = mvSharePriceYear11();
                    break;
                case 3: $scope.Exit15XBook1 = mvSharePriceYear12();
                    break;
                case 4: $scope.Exit15XBook1 = mvSharePriceYear13();
                    break;
                case 5: $scope.Exit15XBook1 = mvSharePriceYear14();
                    break;
                case 6: $scope.Exit15XBook1 = mvSharePriceYear15();
                    break;
                default: $scope.Exit15XBook1 = null;
                    break;
            }
    }

    var exit15XBook2 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Exit15XBook2 = mvSharePriceYear20();
                    break;
                case 2: $scope.Exit15XBook2 = mvSharePriceYear21();
                    break;
                case 3: $scope.Exit15XBook2 = mvSharePriceYear22();
                    break;
                case 4: $scope.Exit15XBook2 = mvSharePriceYear23();
                    break;
                case 5: $scope.Exit15XBook2 = mvSharePriceYear24();
                    break;
                case 6: $scope.Exit15XBook2 = mvSharePriceYear25();
                    break;
                default: $scope.Exit15XBook2 = null;
                    break;
            }
    }

    var exit15XBook3 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Exit15XBook3 = mvSharePriceYear30();
                    break;
                case 2: $scope.Exit15XBook3 = mvSharePriceYear31();
                    break;
                case 3: $scope.Exit15XBook3 = mvSharePriceYear32();
                    break;
                case 4: $scope.Exit15XBook3 = mvSharePriceYear33();
                    break;
                case 5: $scope.Exit15XBook3 = mvSharePriceYear34();
                    break;
                case 6: $scope.Exit15XBook3 = mvSharePriceYear35();
                    break;
                default: $scope.Exit15XBook3 = null;
                    break;
            }
    }

    var exit15XBook4 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Exit15XBook4 = mvSharePriceYear40();
                    break;
                case 2: $scope.Exit15XBook4 = mvSharePriceYear41();
                    break;
                case 3: $scope.Exit15XBook4 = mvSharePriceYear42();
                    break;
                case 4: $scope.Exit15XBook4 = mvSharePriceYear43();
                    break;
                case 5: $scope.Exit15XBook4 = mvSharePriceYear44();
                    break;
                case 6: $scope.Exit15XBook4 = mvSharePriceYear45();
                    break;
                default: $scope.Exit15XBook4 = null;
                    break;
            }
    }

    var exit15XBook5 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Exit15XBook5 = mvSharePriceYear50();
                    break;
                case 2: $scope.Exit15XBook5 = mvSharePriceYear51();
                    break;
                case 3: $scope.Exit15XBook5 = mvSharePriceYear52();
                    break;
                case 4: $scope.Exit15XBook5 = mvSharePriceYear53();
                    break;
                case 5: $scope.Exit15XBook5 = mvSharePriceYear54();
                    break;
                case 6: $scope.Exit15XBook5 = mvSharePriceYear55();
                    break;
                default: $scope.Exit15XBook5 = null;
                    break;
            }
    }

    var exit15XBook6 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Exit15XBook6 = mvSharePriceYear60();
                    break;
                case 2: $scope.Exit15XBook6 = mvSharePriceYear61();
                    break;
                case 3: $scope.Exit15XBook6 = mvSharePriceYear62();
                    break;
                case 4: $scope.Exit15XBook6 = mvSharePriceYear63();
                    break;
                case 5: $scope.Exit15XBook6 = mvSharePriceYear64();
                    break;
                case 6: $scope.Exit15XBook6 = mvSharePriceYear65();
                    break;
                default: $scope.Exit15XBook6 = null;
                    break;
            }
    }

    var exit15XBook7 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Exit15XBook7 = mvSharePriceYear70();
                    break;
                case 2: $scope.Exit15XBook7 = mvSharePriceYear71();
                    break;
                case 3: $scope.Exit15XBook7 = mvSharePriceYear72();
                    break;
                case 4: $scope.Exit15XBook7 = mvSharePriceYear73();
                    break;
                case 5: $scope.Exit15XBook7 = mvSharePriceYear74();
                    break;
                case 6: $scope.Exit15XBook7 = mvSharePriceYear75();
                    break;
                default: $scope.Exit15XBook7 = null;
                    break;
            }
    }

    var exit15XBook8 = function () {

            switch (parseInt($scope.SelectedHorizon.value)) {
                case 1: $scope.Exit15XBook8 = mvSharePriceYear80();
                    break;
                case 2: $scope.Exit15XBook8 = mvSharePriceYear81();
                    break;
                case 3: $scope.Exit15XBook8 = mvSharePriceYear82();
                    break;
                case 4: $scope.Exit15XBook8 = mvSharePriceYear83();
                    break;
                case 5: $scope.Exit15XBook8 = mvSharePriceYear84();
                    break;
                case 6: $scope.Exit15XBook8 = mvSharePriceYear85();
                    break;
                default: $scope.Exit15XBook8 = null;
                    break;
            }
    }

    var exitEPS15X1 = function () {
                        
        switch (parseInt($scope.SelectedHorizon.value)) {
                                                case 1: $scope.ExitEPS15X1 = earningsPerShare15PriceYear10();
                                                                        break;
                                                case 2: $scope.ExitEPS15X1 = earningsPerShare15PriceYear11();
                                                                        break;
                                                case 3: $scope.ExitEPS15X1 = earningsPerShare15PriceYear12();
                                                                        break;
                                                case 4: $scope.ExitEPS15X1 = earningsPerShare15PriceYear13();
                                                                        break;               
                                                case 5: $scope.ExitEPS15X1 = earningsPerShare15PriceYear14();
                break;
            case 6: $scope.ExitEPS15X1 = earningsPerShare15PriceYear15();
                break;
                                                default: $scope.ExitEPS15X1 = null;
                                                                        break;
                                    }
            }
            
    var exitEPS15X2 = function () {
                        
        switch (parseInt($scope.SelectedHorizon.value)) {
                                                case 1: $scope.ExitEPS15X2 = earningsPerShare15PriceYear20();
                                                                        break;
                                                case 2: $scope.ExitEPS15X2 = earningsPerShare15PriceYear21();
                                                                        break;
                                                case 3: $scope.ExitEPS15X2 = earningsPerShare15PriceYear22();
                                                                        break;
                                                case 4: $scope.ExitEPS15X2 = earningsPerShare15PriceYear23();
                                                                        break;               
                                                case 5: $scope.ExitEPS15X2 = earningsPerShare15PriceYear24();
                break;
            case 6: $scope.ExitEPS15X2 = earningsPerShare15PriceYear25();
                break;
                                                default: $scope.ExitEPS15X2 = null;
                                                                        break;
                                    }
            }
            
    var exitEPS15X3 = function () {
                        
        switch (parseInt($scope.SelectedHorizon.value)) {
                                                case 1: $scope.ExitEPS15X3 = earningsPerShare15PriceYear30();
                                                                        break;
                                                case 2: $scope.ExitEPS15X3 = earningsPerShare15PriceYear31();
                                                                        break;
                                                case 3: $scope.ExitEPS15X3 = earningsPerShare15PriceYear32();
                                                                        break;
                                                case 4: $scope.ExitEPS15X3 = earningsPerShare15PriceYear33();
                                                                        break;               
                                                case 5: $scope.ExitEPS15X3 = earningsPerShare15PriceYear34();
                break;
            case 6: $scope.ExitEPS15X3 = earningsPerShare15PriceYear35();
                break;
                                                default: $scope.ExitEPS15X3 = null;
                                                                        break;
                                    }
            }
            
    var exitEPS15X4 = function () {
                        
        switch (parseInt($scope.SelectedHorizon.value)) {
                                                case 1: $scope.ExitEPS15X4 = earningsPerShare15PriceYear40();
                                                                        break;
                                                case 2: $scope.ExitEPS15X4 = earningsPerShare15PriceYear41();
                                                                        break;
                                                case 3: $scope.ExitEPS15X4 = earningsPerShare15PriceYear42();
                                                                        break;
                                                case 4: $scope.ExitEPS15X4 = earningsPerShare15PriceYear43();
                                                                        break;               
                                                case 5: $scope.ExitEPS15X4 = earningsPerShare15PriceYear44();
                break;
            case 6: $scope.ExitEPS15X4 = earningsPerShare15PriceYear45();
                break;
                                                default: $scope.ExitEPS15X4 = null;
                                                                        break;
                                    }
            }
            
    var exitEPS15X5 = function () {
                        
        switch (parseInt($scope.SelectedHorizon.value)) {
                                                case 1: $scope.ExitEPS15X5 = earningsPerShare15PriceYear50();
                                                                        break;
                                                case 2: $scope.ExitEPS15X5 = earningsPerShare15PriceYear51();
                                                                        break;
                                                case 3: $scope.ExitEPS15X5 = earningsPerShare15PriceYear52();
                                                                        break;
                                                case 4: $scope.ExitEPS15X5 = earningsPerShare15PriceYear53();
                                                                        break;               
                                                case 5: $scope.ExitEPS15X5 = earningsPerShare15PriceYear54();
                break;
            case 6: $scope.ExitEPS15X5 = earningsPerShare15PriceYear55();
                break;
                                                default: $scope.ExitEPS15X5 = null;
                                                                        break;
                                    }
            }
            
    var exitEPS15X6 = function () {
                        
        switch (parseInt($scope.SelectedHorizon.value)) {
                                                case 1: $scope.ExitEPS15X6 = earningsPerShare15PriceYear60();
                                                                        break;
                                                case 2: $scope.ExitEPS15X6 = earningsPerShare15PriceYear61();
                                                                        break;
                                                case 3: $scope.ExitEPS15X6 = earningsPerShare15PriceYear62();
                                                                        break;
                                                case 4: $scope.ExitEPS15X6 = earningsPerShare15PriceYear63();
                                                                        break;               
                                                case 5: $scope.ExitEPS15X6 = earningsPerShare15PriceYear64();
                break;
            case 6: $scope.ExitEPS15X6 = earningsPerShare15PriceYear65();
                break;
                                                default: $scope.ExitEPS15X6 = null;
                                                                        break;
                                    }
            }
            
    var exitEPS15X7 = function () {
                        
        switch (parseInt($scope.SelectedHorizon.value)) {
                                                case 1: $scope.ExitEPS15X7 = earningsPerShare15PriceYear70();
                                                                        break;
                                                case 2: $scope.ExitEPS15X7 = earningsPerShare15PriceYear71();
                                                                        break;
                                                case 3: $scope.ExitEPS15X7 = earningsPerShare15PriceYear72();
                                                                        break;
                                                case 4: $scope.ExitEPS15X7 = earningsPerShare15PriceYear73();
                                                                        break;               
                                                case 5: $scope.ExitEPS15X7 = earningsPerShare15PriceYear74();
                break;
            case 6: $scope.ExitEPS15X7 = earningsPerShare15PriceYear75();
                break;
                                                default: $scope.ExitEPS15X7 = null;
                                                                        break;
                                    }
            }
            
    var exitEPS15X8 = function () {
                        
        switch (parseInt($scope.SelectedHorizon.value)) {
                                                case 1: $scope.ExitEPS15X8 = earningsPerShare15PriceYear80();
                                                                        break;
                                                case 2: $scope.ExitEPS15X8 = earningsPerShare15PriceYear81();
                                                                        break;
                                                case 3: $scope.ExitEPS15X8 = earningsPerShare15PriceYear82();
                                                                        break;
                                                case 4: $scope.ExitEPS15X8 = earningsPerShare15PriceYear83();
                                                                        break;               
                                                case 5: $scope.ExitEPS15X8 = earningsPerShare15PriceYear84();
                break;
            case 6: $scope.ExitEPS15X8 = earningsPerShare15PriceYear85();
                break;
                                                default: $scope.ExitEPS15X8 = null;
                                                                        break;
                                    }
            }

            var exitEPS20X1 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.ExitEPS20X1 = earningsPerShare20PriceYear10();
                            break;
                        case 2: $scope.ExitEPS20X1 = earningsPerShare20PriceYear11();
                            break;
                        case 3: $scope.ExitEPS20X1 = earningsPerShare20PriceYear12();
                            break;
                        case 4: $scope.ExitEPS20X1 = earningsPerShare20PriceYear13();
                            break;
                        case 5: $scope.ExitEPS20X1 = earningsPerShare20PriceYear14();
                            break;
                        case 6: $scope.ExitEPS20X1 = earningsPerShare20PriceYear15();
                            break;
                        default: $scope.ExitEPS20X1 = null;
                            break;
                    }
            }

            var exitEPS20X2 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.ExitEPS20X2 = earningsPerShare20PriceYear20();
                            break;
                        case 2: $scope.ExitEPS20X2 = earningsPerShare20PriceYear21();
                            break;
                        case 3: $scope.ExitEPS20X2 = earningsPerShare20PriceYear22();
                            break;
                        case 4: $scope.ExitEPS20X2 = earningsPerShare20PriceYear23();
                            break;
                        case 5: $scope.ExitEPS20X2 = earningsPerShare20PriceYear24();
                            break;
                        case 6: $scope.ExitEPS20X2 = earningsPerShare20PriceYear25();
                            break;
                        default: $scope.ExitEPS20X2 = null;
                            break;
                    }
            }

            var exitEPS20X3 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.ExitEPS20X3 = earningsPerShare20PriceYear30();
                            break;
                        case 2: $scope.ExitEPS20X3 = earningsPerShare20PriceYear31();
                            break;
                        case 3: $scope.ExitEPS20X3 = earningsPerShare20PriceYear32();
                            break;
                        case 4: $scope.ExitEPS20X3 = earningsPerShare20PriceYear33();
                            break;
                        case 5: $scope.ExitEPS20X3 = earningsPerShare20PriceYear34();
                            break;
                        case 6: $scope.ExitEPS20X3 = earningsPerShare20PriceYear35();
                            break;
                        default: $scope.ExitEPS20X3 = null;
                            break;
                    }
            }

            var exitEPS20X4 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.ExitEPS20X4 = earningsPerShare20PriceYear40();
                            break;
                        case 2: $scope.ExitEPS20X4 = earningsPerShare20PriceYear41();
                            break;
                        case 3: $scope.ExitEPS20X4 = earningsPerShare20PriceYear42();
                            break;
                        case 4: $scope.ExitEPS20X4 = earningsPerShare20PriceYear43();
                            break;
                        case 5: $scope.ExitEPS20X4 = earningsPerShare20PriceYear44();
                            break;
                        case 6: $scope.ExitEPS20X4 = earningsPerShare20PriceYear45();
                            break;
                        default: $scope.ExitEPS20X4 = null;
                            break;
                    }
            }

            var exitEPS20X5 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.ExitEPS20X5 = earningsPerShare20PriceYear50();
                            break;
                        case 2: $scope.ExitEPS20X5 = earningsPerShare20PriceYear51();
                            break;
                        case 3: $scope.ExitEPS20X5 = earningsPerShare20PriceYear52();
                            break;
                        case 4: $scope.ExitEPS20X5 = earningsPerShare20PriceYear53();
                            break;
                        case 5: $scope.ExitEPS20X5 = earningsPerShare20PriceYear54();
                            break;
                        case 6: $scope.ExitEPS20X5 = earningsPerShare20PriceYear55();
                            break;
                        default: $scope.ExitEPS20X5 = null;
                            break;
                    }
            }

            var exitEPS20X6 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.ExitEPS20X6 = earningsPerShare20PriceYear60();
                            break;
                        case 2: $scope.ExitEPS20X6 = earningsPerShare20PriceYear61();
                            break;
                        case 3: $scope.ExitEPS20X6 = earningsPerShare20PriceYear62();
                            break;
                        case 4: $scope.ExitEPS20X6 = earningsPerShare20PriceYear63();
                            break;
                        case 5: $scope.ExitEPS20X6 = earningsPerShare20PriceYear64();
                            break;
                        case 6: $scope.ExitEPS20X6 = earningsPerShare20PriceYear65();
                            break;
                        default: $scope.ExitEPS20X6 = null;
                            break;
                    }
            }

            var exitEPS20X7 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.ExitEPS20X7 = earningsPerShare20PriceYear70();
                            break;
                        case 2: $scope.ExitEPS20X7 = earningsPerShare20PriceYear71();
                            break;
                        case 3: $scope.ExitEPS20X7 = earningsPerShare20PriceYear72();
                            break;
                        case 4: $scope.ExitEPS20X7 = earningsPerShare20PriceYear73();
                            break;
                        case 5: $scope.ExitEPS20X7 = earningsPerShare20PriceYear74();
                            break;
                        case 6: $scope.ExitEPS20X7 = earningsPerShare20PriceYear75();
                            break;
                        default: $scope.ExitEPS20X7 = null;
                            break;
                    }
            }

            var exitEPS20X8 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.ExitEPS20X8 = earningsPerShare20PriceYear80();
                            break;
                        case 2: $scope.ExitEPS20X8 = earningsPerShare20PriceYear81();
                            break;
                        case 3: $scope.ExitEPS20X8 = earningsPerShare20PriceYear82();
                            break;
                        case 4: $scope.ExitEPS20X8 = earningsPerShare20PriceYear83();
                            break;
                        case 5: $scope.ExitEPS20X8 = earningsPerShare20PriceYear84();
                            break;
                        case 6: $scope.ExitEPS20X8 = earningsPerShare20PriceYear85();
                            break;
                        default: $scope.ExitEPS20X8 = null;
                            break;
                    }
            }

            var dividendPerShare1 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.DividendPerShare1 = dividendPerSharePriceYear10();
                            break;
                        case 2: $scope.DividendPerShare1 = dividendPerSharePriceYear11();
                            break;
                        case 3: $scope.DividendPerShare1 = dividendPerSharePriceYear12();
                            break;
                        case 4: $scope.DividendPerShare1 = dividendPerSharePriceYear13();
                            break;
                        case 5: $scope.DividendPerShare1 = dividendPerSharePriceYear14();
                            break;
                        case 6: $scope.DividendPerShare1 = dividendPerSharePriceYear15();
                            break;
                        default: $scope.DividendPerShare1 = null;
                            break;
                    }
            }

            var dividendPerShare2 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.DividendPerShare2 = dividendPerSharePriceYear20();
                            break;
                        case 2: $scope.DividendPerShare2 = dividendPerSharePriceYear21();
                            break;
                        case 3: $scope.DividendPerShare2 = dividendPerSharePriceYear22();
                            break;
                        case 4: $scope.DividendPerShare2 = dividendPerSharePriceYear23();
                            break;
                        case 5: $scope.DividendPerShare2 = dividendPerSharePriceYear24();
                            break;
                        case 6: $scope.DividendPerShare2 = dividendPerSharePriceYear25();
                            break;
                        default: $scope.DividendPerShare2 = null;
                            break;
                    }
            }

            var dividendPerShare3 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.DividendPerShare3 = dividendPerSharePriceYear30();
                            break;
                        case 2: $scope.DividendPerShare3 = dividendPerSharePriceYear31();
                            break;
                        case 3: $scope.DividendPerShare3 = dividendPerSharePriceYear32();
                            break;
                        case 4: $scope.DividendPerShare3 = dividendPerSharePriceYear33();
                            break;
                        case 5: $scope.DividendPerShare3 = dividendPerSharePriceYear34();
                            break;
                        case 6: $scope.DividendPerShare3 = dividendPerSharePriceYear35();
                            break;
                        default: $scope.DividendPerShare3 = null;
                            break;
                    }
            }

            var dividendPerShare4 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.DividendPerShare4 = dividendPerSharePriceYear40();
                            break;
                        case 2: $scope.DividendPerShare4 = dividendPerSharePriceYear41();
                            break;
                        case 3: $scope.DividendPerShare4 = dividendPerSharePriceYear42();
                            break;
                        case 4: $scope.DividendPerShare4 = dividendPerSharePriceYear43();
                            break;
                        case 5: $scope.DividendPerShare4 = dividendPerSharePriceYear44();
                            break;
                        case 6: $scope.DividendPerShare4 = dividendPerSharePriceYear45();
                            break;
                        default: $scope.DividendPerShare4 = null;
                            break;
                    }
            }

            var dividendPerShare5 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.DividendPerShare5 = dividendPerSharePriceYear50();
                            break;
                        case 2: $scope.DividendPerShare5 = dividendPerSharePriceYear51();
                            break;
                        case 3: $scope.DividendPerShare5 = dividendPerSharePriceYear52();
                            break;
                        case 4: $scope.DividendPerShare5 = dividendPerSharePriceYear53();
                            break;
                        case 5: $scope.DividendPerShare5 = dividendPerSharePriceYear54();
                            break;
                        case 6: $scope.DividendPerShare5 = dividendPerSharePriceYear55();
                            break;
                        default: $scope.DividendPerShare5 = null;
                            break;
                    }
            }

            var dividendPerShare6 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.DividendPerShare6 = dividendPerSharePriceYear60();
                            break;
                        case 2: $scope.DividendPerShare6 = dividendPerSharePriceYear61();
                            break;
                        case 3: $scope.DividendPerShare6 = dividendPerSharePriceYear62();
                            break;
                        case 4: $scope.DividendPerShare6 = dividendPerSharePriceYear63();
                            break;
                        case 5: $scope.DividendPerShare6 = dividendPerSharePriceYear64();
                            break;
                        case 6: $scope.DividendPerShare6 = dividendPerSharePriceYear65();
                            break;
                        default: $scope.DividendPerShare6 = null;
                            break;
                    }
            }

            var dividendPerShare7 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.DividendPerShare7 = dividendPerSharePriceYear70();
                            break;
                        case 2: $scope.DividendPerShare7 = dividendPerSharePriceYear71();
                            break;
                        case 3: $scope.DividendPerShare7 = dividendPerSharePriceYear72();
                            break;
                        case 4: $scope.DividendPerShare7 = dividendPerSharePriceYear73();
                            break;
                        case 5: $scope.DividendPerShare7 = dividendPerSharePriceYear74();
                            break;
                        case 6: $scope.DividendPerShare7 = dividendPerSharePriceYear75();
                            break;
                        default: $scope.DividendPerShare7 = null;
                            break;
                    }
            }

            var dividendPerShare8 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.DividendPerShare8 = dividendPerSharePriceYear80();
                            break;
                        case 2: $scope.DividendPerShare8 = dividendPerSharePriceYear81();
                            break;
                        case 3: $scope.DividendPerShare8 = dividendPerSharePriceYear82();
                            break;
                        case 4: $scope.DividendPerShare8 = dividendPerSharePriceYear83();
                            break;
                        case 5: $scope.DividendPerShare8 = dividendPerSharePriceYear84();
                            break;
                        case 6: $scope.DividendPerShare8 = dividendPerSharePriceYear85();
                            break;
                        default: $scope.DividendPerShare8 = null;
                            break;
                    }
            }

            var sharesOutstanding1 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.SharesOutstanding1 = sharesOutstandingYear10();
                            break;
                        case 2: $scope.SharesOutstanding1 = sharesOutstandingYear11();
                            break;
                        case 3: $scope.SharesOutstanding1 = sharesOutstandingYear12();
                            break;
                        case 4: $scope.SharesOutstanding1 = sharesOutstandingYear13();
                            break;
                        case 5: $scope.SharesOutstanding1 = sharesOutstandingYear14();
                            break;
                        case 6: $scope.SharesOutstanding1 = sharesOutstandingYear15();
                            break;
                        default: $scope.SharesOutstanding1 = null;
                            break;
                    }
            }

            var sharesOutstanding2 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.SharesOutstanding2 = sharesOutstandingYear20();
                            break;
                        case 2: $scope.SharesOutstanding2 = sharesOutstandingYear21();
                            break;
                        case 3: $scope.SharesOutstanding2 = sharesOutstandingYear22();
                            break;
                        case 4: $scope.SharesOutstanding2 = sharesOutstandingYear23();
                            break;
                        case 5: $scope.SharesOutstanding2 = sharesOutstandingYear24();
                            break;
                        case 6: $scope.SharesOutstanding2 = sharesOutstandingYear25();
                            break;
                        default: $scope.SharesOutstanding2 = null;
                            break;
                    }
            }

            var sharesOutstanding3 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.SharesOutstanding3 = sharesOutstandingYear30();
                            break;
                        case 2: $scope.SharesOutstanding3 = sharesOutstandingYear31();
                            break;
                        case 3: $scope.SharesOutstanding3 = sharesOutstandingYear32();
                            break;
                        case 4: $scope.SharesOutstanding3 = sharesOutstandingYear33();
                            break;
                        case 5: $scope.SharesOutstanding3 = sharesOutstandingYear34();
                            break;
                        case 6: $scope.SharesOutstanding3 = sharesOutstandingYear35();
                            break;
                        default: $scope.SharesOutstanding3 = null;
                            break;
                    }
            }

            var sharesOutstanding4 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.SharesOutstanding4 = sharesOutstandingYear40();
                            break;
                        case 2: $scope.SharesOutstanding4 = sharesOutstandingYear41();
                            break;
                        case 3: $scope.SharesOutstanding4 = sharesOutstandingYear42();
                            break;
                        case 4: $scope.SharesOutstanding4 = sharesOutstandingYear43();
                            break;
                        case 5: $scope.SharesOutstanding4 = sharesOutstandingYear44();
                            break;
                        case 6: $scope.SharesOutstanding4 = sharesOutstandingYear45();
                            break;
                        default: $scope.SharesOutstanding4 = null;
                            break;
                    }
            }

            var sharesOutstanding5 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.SharesOutstanding5 = sharesOutstandingYear50();
                            break;
                        case 2: $scope.SharesOutstanding5 = sharesOutstandingYear51();
                            break;
                        case 3: $scope.SharesOutstanding5 = sharesOutstandingYear52();
                            break;
                        case 4: $scope.SharesOutstanding5 = sharesOutstandingYear53();
                            break;
                        case 5: $scope.SharesOutstanding5 = sharesOutstandingYear54();
                            break;
                        case 6: $scope.SharesOutstanding5 = sharesOutstandingYear55();
                            break;
                        default: $scope.SharesOutstanding5 = null;
                            break;
                    }
            }

            var sharesOutstanding6 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.SharesOutstanding6 = sharesOutstandingYear60();
                            break;
                        case 2: $scope.SharesOutstanding6 = sharesOutstandingYear61();
                            break;
                        case 3: $scope.SharesOutstanding6 = sharesOutstandingYear62();
                            break;
                        case 4: $scope.SharesOutstanding6 = sharesOutstandingYear63();
                            break;
                        case 5: $scope.SharesOutstanding6 = sharesOutstandingYear64();
                            break;
                        case 6: $scope.SharesOutstanding6 = sharesOutstandingYear65();
                            break;
                        default: $scope.SharesOutstanding6 = null;
                            break;
                    }
            }

            var sharesOutstanding7 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.SharesOutstanding7 = sharesOutstandingYear70();
                            break;
                        case 2: $scope.SharesOutstanding7 = sharesOutstandingYear71();
                            break;
                        case 3: $scope.SharesOutstanding7 = sharesOutstandingYear72();
                            break;
                        case 4: $scope.SharesOutstanding7 = sharesOutstandingYear73();
                            break;
                        case 5: $scope.SharesOutstanding7 = sharesOutstandingYear74();
                            break;
                        case 6: $scope.SharesOutstanding7 = sharesOutstandingYear75();
                            break;
                        default: $scope.SharesOutstanding7 = null;
                            break;
                    }
            }

            var sharesOutstanding8 = function () {

                    switch (parseInt($scope.SelectedHorizon.value)) {
                        case 1: $scope.SharesOutstanding8 = sharesOutstandingYear80();
                            break;
                        case 2: $scope.SharesOutstanding8 = sharesOutstandingYear81();
                            break;
                        case 3: $scope.SharesOutstanding8 = sharesOutstandingYear82();
                            break;
                        case 4: $scope.SharesOutstanding8 = sharesOutstandingYear83();
                            break;
                        case 5: $scope.SharesOutstanding8 = sharesOutstandingYear84();
                            break;
                        case 6: $scope.SharesOutstanding8 = sharesOutstandingYear85();
                            break;
                        default: $scope.SharesOutstanding8 = null;
                            break;
                    }
                }

            $scope.CalculateColumn1Values = function () {
                $scope.NewCapital1 = null;
                $scope.PriceConversion1 = null;
                $scope.TotalAssets1 = null;
                $scope.AverageAnnualGrowth1 = null;
                $scope.NetIncome1 = null;
                $scope.Tier1CapitalRatio1 = null;
                $scope.TotalRiskBasedRatio1 = null;
                $scope.ROAA1 = null;
                $scope.ROAE1 = null;
                $scope.BookValueEquity1 = null;
                $scope.MarketValueEquity1 = null;
                $scope.BookValuePerShare1 = null;
                $scope.EPS1 = null;
                $scope.Exit15XBook1 = null;
                $scope.ExitEPS15X1 = null;
                $scope.ExitEPS20X1 = null;
                $scope.DividendPerShare1 = null;
                $scope.SharesOutstanding1 = null;

                if($scope.SelectedModel1!=null)
                    {
                if ((parseInt($scope.SelectedHorizon.value) > 0) && typeof $scope.SelectedModel1.modelKey !== 'undefined') {
                    $scope.SelectedScenario1 = {};
                    getModelDetails($scope.SelectedModel1.modelKey, calculateColumn1Values);
                    $rootScope.SelectedSFScenario1ModelKey = $scope.SelectedModel1.modelKey;                    
                }
                    }
            }
            
            $scope.CalculateColumn2Values = function () {
                $scope.NewCapital2 = null;
                $scope.PriceConversion2 = null;
                $scope.TotalAssets2 = null;
                $scope.AverageAnnualGrowth2 = null;
                $scope.NetIncome2 = null;
                $scope.Tier2CapitalRatio2 = null;
                $scope.TotalRiskBasedRatio2 = null;
                $scope.ROAA2 = null;
                $scope.ROAE2 = null;
                $scope.BookValueEquity2 = null;
                $scope.MarketValueEquity2 = null;
                $scope.BookValuePerShare2 = null;
                $scope.EPS2 = null;
                $scope.Exit25XBook2 = null;
                $scope.ExitEPS25X2 = null;
                $scope.ExitEPS20X2 = null;
                $scope.DividendPerShare2 = null;
                $scope.SharesOutstanding2 = null;

                if($scope.SelectedModel2!=null)
                {
                    if ((parseInt($scope.SelectedHorizon.value) > 0) && typeof $scope.SelectedModel2.modelKey !== 'undefined') {
                        getModelDetails($scope.SelectedModel2.modelKey, calculateColumn2Values);
                        $rootScope.SelectedSFScenario2ModelKey = $scope.SelectedModel2.modelKey;
                    }
                }
            }

            $scope.CalculateColumn3Values = function () {
                $scope.NewCapital3 = null;
                $scope.PriceConversion3 = null;
                $scope.TotalAssets3 = null;
                $scope.AverageAnnualGrowth3 = null;
                $scope.NetIncome3 = null;
                $scope.Tier3CapitalRatio3 = null;
                $scope.TotalRiskBasedRatio3 = null;
                $scope.ROAA3 = null;
                $scope.ROAE3 = null;
                $scope.BookValueEquity3 = null;
                $scope.MarketValueEquity3 = null;
                $scope.BookValuePerShare3 = null;
                $scope.EPS3 = null;
                $scope.Exit35XBook3 = null;
                $scope.ExitEPS35X3 = null;
                $scope.ExitEPS30X3 = null;
                $scope.DividendPerShare3 = null;
                $scope.SharesOutstanding3 = null;

                if($scope.SelectedModel3!=null)
                {
                if ((parseInt($scope.SelectedHorizon.value) > 0) && typeof $scope.SelectedModel3.modelKey !== 'undefined') {
                    getModelDetails($scope.SelectedModel3.modelKey, calculateColumn3Values);
                    $rootScope.SelectedSFScenario3ModelKey = $scope.SelectedModel3.modelKey;
                    }
                }
            }

            $scope.CalculateColumn4Values = function () {
                $scope.NewCapital4 = null;
                $scope.PriceConversion4 = null;
                $scope.TotalAssets4 = null;
                $scope.AverageAnnualGrowth4 = null;
                $scope.NetIncome4 = null;
                $scope.Tier4CapitalRatio4 = null;
                $scope.TotalRiskBasedRatio4 = null;
                $scope.ROAA4 = null;
                $scope.ROAE4 = null;
                $scope.BookValueEquity4 = null;
                $scope.MarketValueEquity4 = null;
                $scope.BookValuePerShare4 = null;
                $scope.EPS4 = null;
                $scope.Exit45XBook4 = null;
                $scope.ExitEPS45X4 = null;
                $scope.ExitEPS40X4 = null;
                $scope.DividendPerShare4 = null;
                $scope.SharesOutstanding4 = null;

                if($scope.SelectedModel4!=null)
                {
                if ((parseInt($scope.SelectedHorizon.value) > 0) && typeof $scope.SelectedModel4.modelKey !== 'undefined') {
                    getModelDetails($scope.SelectedModel4.modelKey, calculateColumn4Values);
                    $rootScope.SelectedSFScenario4ModelKey = $scope.SelectedModel4.modelKey;
                    }
                }
            }

            $scope.CalculateColumn5Values = function () {
                $scope.NewCapital5 = null;
                $scope.PriceConversion5 = null;
                $scope.TotalAssets5 = null;
                $scope.AverageAnnualGrowth5 = null;
                $scope.NetIncome5 = null;
                $scope.Tier5CapitalRatio5 = null;
                $scope.TotalRiskBasedRatio5 = null;
                $scope.ROAA5 = null;
                $scope.ROAE5 = null;
                $scope.BookValueEquity5 = null;
                $scope.MarketValueEquity5 = null;
                $scope.BookValuePerShare5 = null;
                $scope.EPS5 = null;
                $scope.Exit55XBook5 = null;
                $scope.ExitEPS55X5 = null;
                $scope.ExitEPS50X5 = null;
                $scope.DividendPerShare5 = null;
                $scope.SharesOutstanding5 = null;

                if($scope.SelectedModel5!=null)
                {
                    if ((parseInt($scope.SelectedHorizon.value) > 0) && typeof $scope.SelectedModel5.modelKey !== 'undefined') {
                        getModelDetails($scope.SelectedModel5.modelKey, calculateColumn5Values);
                        $rootScope.SelectedSFScenario5ModelKey = $scope.SelectedModel5.modelKey;
                    }
                }
            }

            $scope.CalculateColumn6Values = function () {
                $scope.NewCapital6 = null;
                $scope.PriceConversion6 = null;
                $scope.TotalAssets6 = null;
                $scope.AverageAnnualGrowth6 = null;
                $scope.NetIncome6 = null;
                $scope.Tier6CapitalRatio6 = null;
                $scope.TotalRiskBasedRatio6 = null;
                $scope.ROAA6 = null;
                $scope.ROAE6 = null;
                $scope.BookValueEquity6 = null;
                $scope.MarketValueEquity6 = null;
                $scope.BookValuePerShare6 = null;
                $scope.EPS6 = null;
                $scope.Exit66XBook6 = null;
                $scope.ExitEPS66X6 = null;
                $scope.ExitEPS60X6 = null;
                $scope.DividendPerShare6 = null;
                $scope.SharesOutstanding6 = null;

                if($scope.SelectedModel6!=null)
                {
                    if ((parseInt($scope.SelectedHorizon.value) > 0) && typeof $scope.SelectedModel6.modelKey !== 'undefined') {
                        getModelDetails($scope.SelectedModel6.modelKey, calculateColumn6Values);
                        $rootScope.SelectedSFScenario6ModelKey = $scope.SelectedModel6.modelKey;
                    }
                }
            }

            $scope.CalculateColumn7Values = function () {
                $scope.NewCapital7 = null;
                $scope.PriceConversion7 = null;
                $scope.TotalAssets7 = null;
                $scope.AverageAnnualGrowth7 = null;
                $scope.NetIncome7 = null;
                $scope.Tier7CapitalRatio7 = null;
                $scope.TotalRiskBasedRatio7 = null;
                $scope.ROAA7 = null;
                $scope.ROAE7 = null;
                $scope.BookValueEquity7 = null;
                $scope.MarketValueEquity7 = null;
                $scope.BookValuePerShare7 = null;
                $scope.EPS7 = null;
                $scope.Exit77XBook7 = null;
                $scope.ExitEPS77X7 = null;
                $scope.ExitEPS70X7 = null;
                $scope.DividendPerShare7 = null;
                $scope.SharesOutstanding7 = null;

                if($scope.SelectedModel7!=null)
                {
                if ((parseInt($scope.SelectedHorizon.value) > 0) && typeof $scope.SelectedModel7.modelKey !== 'undefined') {
                    getModelDetails($scope.SelectedModel7.modelKey, calculateColumn7Values);
                    $rootScope.SelectedSFScenario7ModelKey = $scope.SelectedModel7.modelKey;
                    }
                }
            }

            $scope.CalculateColumn8Values = function () {
                $scope.NewCapital8 = null;
                $scope.PriceConversion8 = null;
                $scope.TotalAssets8 = null;
                $scope.AverageAnnualGrowth8 = null;
                $scope.NetIncome8 = null;
                $scope.Tier8CapitalRatio8 = null;
                $scope.TotalRiskBasedRatio8 = null;
                $scope.ROAA8 = null;
                $scope.ROAE8 = null;
                $scope.BookValueEquity8 = null;
                $scope.MarketValueEquity8 = null;
                $scope.BookValuePerShare8 = null;
                $scope.EPS8 = null;
                $scope.Exit88XBook8 = null;
                $scope.ExitEPS88X8 = null;
                $scope.ExitEPS80X8 = null;
                $scope.DividendPerShare8 = null;
                $scope.SharesOutstanding8 = null;

                if ($scope.SelectedModel8 != null) {
                    if ((parseInt($scope.SelectedHorizon.value) > 0) && typeof $scope.SelectedModel8.modelKey !== 'undefined') {
                        getModelDetails($scope.SelectedModel8.modelKey, calculateColumn8Values);
                        $rootScope.SelectedSFScenario8ModelKey = $scope.SelectedModel8.modelKey;
                    }
                }
            }

            var calculateColumn1Values = function (modelObj) {
                $scope.SelectedScenario1 = modelObj;
                $scope.chkNetIncomeS1 = modelObj.useNetIncomeInput;
                $scope.chkCashDividendsS1 = modelObj.useCashDividendsInput;
                $scope.chkNewCapitalS1 = modelObj.useNewCapitalInput;
                $scope.chkCet1CapitalAdjustmentS1 = modelObj.useCet1CapitalAdjustmentInput;
                $scope.chkTier1CapitalAdjustmentS1 = modelObj.useTier1CapitalAdjustmentInput;
                $scope.chkTier2CapitalS1 = modelObj.useTier2CapitalInput;
                $scope.chkRiskWeightedAssetsS1 = modelObj.useRiskWeightedAssetsInput;
                $scope.chkTotalAssetsForLeverageS1 = modelObj.useTotalAssetsForLeverageInput;
                $scope.chkSharesOutstandingS1 = modelObj.useSharesOutstandingInput;
                newCapital1();
                priceConversion1();
                totalAssets1();
                averageAnnualGrowth1();
                netIncome1();
                tier1CapitalRatio1();
                tier1LeverageRatio1();
                totalRiskBasedRatio1();
                rOAA1();
                rOAE1();
                bookValueEquity1();
                marketValueEquity1();
                bookValuePerShare1();
                ePS1();
                exit15XBook1();
                exitEPS15X1();
                exitEPS20X1();
                dividendPerShare1();
                sharesOutstanding1();
            }

            var calculateColumn2Values = function (modelObj) {
                $scope.SelectedScenario2 = modelObj;
                $scope.chkNetIncomeS2 = modelObj.useNetIncomeInput;
                $scope.chkCashDividendsS2 = modelObj.useCashDividendsInput;
                $scope.chkNewCapitalS2 = modelObj.useNewCapitalInput;
                $scope.chkCet1CapitalAdjustmentS2 = modelObj.useCet1CapitalAdjustmentInput;
                $scope.chkTier1CapitalAdjustmentS2 = modelObj.useTier1CapitalAdjustmentInput;
                $scope.chkTier2CapitalS2 = modelObj.useTier2CapitalInput;
                $scope.chkRiskWeightedAssetsS2 = modelObj.useRiskWeightedAssetsInput;
                $scope.chkTotalAssetsForLeverageS2 = modelObj.useTotalAssetsForLeverageInput;
                $scope.chkSharesOutstandingS2 = modelObj.useSharesOutstandingInput;
                newCapital2();
                priceConversion2();
                totalAssets2();
                averageAnnualGrowth2();
                netIncome2();
                tier1CapitalRatio2();
                tier1LeverageRatio2();
                totalRiskBasedRatio2();
                rOAA2();
                rOAE2();
                bookValueEquity2();
                marketValueEquity2();
                bookValuePerShare2();
                ePS2();
                exit15XBook2();
                exitEPS15X2();
                exitEPS20X2();
                dividendPerShare2();
                sharesOutstanding2();
            }

            var calculateColumn3Values = function (modelObj) {
                $scope.SelectedScenario3 = modelObj;
                $scope.chkNetIncomeS3 = modelObj.useNetIncomeInput;
                $scope.chkCashDividendsS3 = modelObj.useCashDividendsInput;
                $scope.chkNewCapitalS3 = modelObj.useNewCapitalInput;
                $scope.chkCet1CapitalAdjustmentS3 = modelObj.useCet1CapitalAdjustmentInput;
                $scope.chkTier1CapitalAdjustmentS3 = modelObj.useTier1CapitalAdjustmentInput;
                $scope.chkTier2CapitalS3 = modelObj.useTier2CapitalInput;
                $scope.chkRiskWeightedAssetsS3 = modelObj.useRiskWeightedAssetsInput;
                $scope.chkTotalAssetsForLeverageS3 = modelObj.useTotalAssetsForLeverageInput;
                $scope.chkSharesOutstandingS3 = modelObj.useSharesOutstandingInput;
                newCapital3();
                priceConversion3();
                totalAssets3();
                averageAnnualGrowth3();
                netIncome3();
                tier1CapitalRatio3();
                tier1LeverageRatio3();
                totalRiskBasedRatio3();
                rOAA3();
                rOAE3();
                bookValueEquity3();
                marketValueEquity3();
                bookValuePerShare3();
                ePS3();
                exit15XBook3();
                exitEPS15X3();
                exitEPS20X3();
                dividendPerShare3();
                sharesOutstanding3();
            }

            var calculateColumn4Values = function (modelObj) {
                $scope.SelectedScenario4 = modelObj;
                $scope.chkNetIncomeS4 = modelObj.useNetIncomeInput;
                $scope.chkCashDividendsS4 = modelObj.useCashDividendsInput;
                $scope.chkNewCapitalS4 = modelObj.useNewCapitalInput;
                $scope.chkCet1CapitalAdjustmentS4 = modelObj.useCet1CapitalAdjustmentInput;
                $scope.chkTier1CapitalAdjustmentS4 = modelObj.useTier1CapitalAdjustmentInput;
                $scope.chkTier2CapitalS4 = modelObj.useTier2CapitalInput;
                $scope.chkRiskWeightedAssetsS4 = modelObj.useRiskWeightedAssetsInput;
                $scope.chkTotalAssetsForLeverageS4 = modelObj.useTotalAssetsForLeverageInput;
                $scope.chkSharesOutstandingS4 = modelObj.useSharesOutstandingInput;
                newCapital4();
                priceConversion4();
                totalAssets4();
                averageAnnualGrowth4();
                netIncome4();
                tier1CapitalRatio4();
                tier1LeverageRatio4();
                totalRiskBasedRatio4();
                rOAA4();
                rOAE4();
                bookValueEquity4();
                marketValueEquity4();
                bookValuePerShare4();
                ePS4();
                exit15XBook4();
                exitEPS15X4();
                exitEPS20X4();
                dividendPerShare4();
                sharesOutstanding4();
            }

            var calculateColumn5Values = function (modelObj) {
                $scope.SelectedScenario5 = modelObj;
                $scope.chkNetIncomeS5 = modelObj.useNetIncomeInput;
                $scope.chkCashDividendsS5 = modelObj.useCashDividendsInput;
                $scope.chkNewCapitalS5 = modelObj.useNewCapitalInput;
                $scope.chkCet1CapitalAdjustmentS5 = modelObj.useCet1CapitalAdjustmentInput;
                $scope.chkTier1CapitalAdjustmentS5 = modelObj.useTier1CapitalAdjustmentInput;
                $scope.chkTier2CapitalS5 = modelObj.useTier2CapitalInput;
                $scope.chkRiskWeightedAssetsS5 = modelObj.useRiskWeightedAssetsInput;
                $scope.chkTotalAssetsForLeverageS5 = modelObj.useTotalAssetsForLeverageInput;
                $scope.chkSharesOutstandingS5 = modelObj.useSharesOutstandingInput;
                newCapital5();
                priceConversion5();
                totalAssets5();
                averageAnnualGrowth5();
                netIncome5();
                tier1CapitalRatio5();
                tier1LeverageRatio5();
                totalRiskBasedRatio5();
                rOAA5();
                rOAE5();
                bookValueEquity5();
                marketValueEquity5();
                bookValuePerShare5();
                ePS5();
                exit15XBook5();
                exitEPS15X5();
                exitEPS20X5();
                dividendPerShare5();
                sharesOutstanding5();
            }

            var calculateColumn6Values = function (modelObj) {
                $scope.SelectedScenario6 = modelObj;
                $scope.chkNetIncomeS6 = modelObj.useNetIncomeInput;
                $scope.chkCashDividendsS6 = modelObj.useCashDividendsInput;
                $scope.chkNewCapitalS6 = modelObj.useNewCapitalInput;
                $scope.chkCet1CapitalAdjustmentS6 = modelObj.useCet1CapitalAdjustmentInput;
                $scope.chkTier1CapitalAdjustmentS6 = modelObj.useTier1CapitalAdjustmentInput;
                $scope.chkTier2CapitalS6 = modelObj.useTier2CapitalInput;
                $scope.chkRiskWeightedAssetsS6 = modelObj.useRiskWeightedAssetsInput;
                $scope.chkTotalAssetsForLeverageS6 = modelObj.useTotalAssetsForLeverageInput;
                $scope.chkSharesOutstandingS6 = modelObj.useSharesOutstandingInput;
                newCapital6();
                priceConversion6();
                totalAssets6();
                averageAnnualGrowth6();
                netIncome6();
                tier1CapitalRatio6();
                tier1LeverageRatio6();
                totalRiskBasedRatio6();
                rOAA6();
                rOAE6();
                bookValueEquity6();
                marketValueEquity6();
                bookValuePerShare6();
                ePS6();
                exit15XBook6();
                exitEPS15X6();
                exitEPS20X6();
                dividendPerShare6();
                sharesOutstanding6();
            }

            var calculateColumn7Values = function (modelObj) {
                $scope.SelectedScenario7 = modelObj;
                $scope.chkNetIncomeS7 = modelObj.useNetIncomeInput;
                $scope.chkCashDividendsS7 = modelObj.useCashDividendsInput;
                $scope.chkNewCapitalS7 = modelObj.useNewCapitalInput;
                $scope.chkCet1CapitalAdjustmentS7 = modelObj.useCet1CapitalAdjustmentInput;
                $scope.chkTier1CapitalAdjustmentS7 = modelObj.useTier1CapitalAdjustmentInput;
                $scope.chkTier2CapitalS7 = modelObj.useTier2CapitalInput;
                $scope.chkRiskWeightedAssetsS7 = modelObj.useRiskWeightedAssetsInput;
                $scope.chkTotalAssetsForLeverageS7 = modelObj.useTotalAssetsForLeverageInput;
                $scope.chkSharesOutstandingS7 = modelObj.useSharesOutstandingInput;
                newCapital7();
                priceConversion7();
                totalAssets7();
                averageAnnualGrowth7();
                netIncome7();
                tier1CapitalRatio7();
                tier1LeverageRatio7();
                totalRiskBasedRatio7();
                rOAA7();
                rOAE7();
                bookValueEquity7();
                marketValueEquity7();
                bookValuePerShare7();
                ePS7();
                exit15XBook7();
                exitEPS15X7();
                exitEPS20X7();
                dividendPerShare7();
                sharesOutstanding7();
            }

            var calculateColumn8Values = function (modelObj) {
                $scope.SelectedScenario8 = modelObj;
                $scope.chkNetIncomeS8 = modelObj.useNetIncomeInput;
                $scope.chkCashDividendsS8 = modelObj.useCashDividendsInput;
                $scope.chkNewCapitalS8 = modelObj.useNewCapitalInput;
                $scope.chkCet1CapitalAdjustmentS8 = modelObj.useCet1CapitalAdjustmentInput;
                $scope.chkTier1CapitalAdjustmentS8 = modelObj.useTier1CapitalAdjustmentInput;
                $scope.chkTier2CapitalS8 = modelObj.useTier2CapitalInput;
                $scope.chkRiskWeightedAssetsS8 = modelObj.useRiskWeightedAssetsInput;
                $scope.chkTotalAssetsForLeverageS8 = modelObj.useTotalAssetsForLeverageInput;
                $scope.chkSharesOutstandingS8 = modelObj.useSharesOutstandingInput;
                newCapital8();
                priceConversion8();
                totalAssets8();
                averageAnnualGrowth8();
                netIncome8();
                tier1CapitalRatio8();
                tier1LeverageRatio8();
                totalRiskBasedRatio8();
                rOAA8();
                rOAE8();
                bookValueEquity8();
                marketValueEquity8();
                bookValuePerShare8();
                ePS8();
                exit15XBook8();
                exitEPS15X8();
                exitEPS20X8();
                dividendPerShare8();
                sharesOutstanding8();
            }

            var resetAllCalculations = function () {
                $scope.NewCapital1 = null;
                $scope.NewCapital2 = null;
                $scope.NewCapital3 = null;
                $scope.NewCapital4 = null;
                $scope.NewCapital5 = null;
                $scope.NewCapital6 = null;
                $scope.NewCapital7 = null;
                $scope.NewCapital8 = null;

                $scope.PriceConversion1 = null;
                $scope.PriceConversion2 = null;
                $scope.PriceConversion3 = null;
                $scope.PriceConversion4 = null;
                $scope.PriceConversion5 = null;
                $scope.PriceConversion6 = null;
                $scope.PriceConversion7 = null;
                $scope.PriceConversion8 = null;

                $scope.TotalAssets1 = null;
                $scope.TotalAssets2 = null;
                $scope.TotalAssets3 = null;
                $scope.TotalAssets4 = null;
                $scope.TotalAssets5 = null;
                $scope.TotalAssets6 = null;
                $scope.TotalAssets7 = null;
                $scope.TotalAssets8 = null;

                $scope.AverageAnnualGrowth1 = null;
                $scope.AverageAnnualGrowth2 = null;
                $scope.AverageAnnualGrowth3 = null;
                $scope.AverageAnnualGrowth4 = null;
                $scope.AverageAnnualGrowth5 = null;
                $scope.AverageAnnualGrowth6 = null;
                $scope.AverageAnnualGrowth7 = null;
                $scope.AverageAnnualGrowth8 = null;

                $scope.NetIncome1 = null;
                $scope.NetIncome2 = null;
                $scope.NetIncome3 = null;
                $scope.NetIncome4 = null;
                $scope.NetIncome5 = null;
                $scope.NetIncome6 = null;
                $scope.NetIncome7 = null;
                $scope.NetIncome8 = null;

                $scope.Tier1CapitalRatio1 = null;
                $scope.Tier1CapitalRatio2 = null;
                $scope.Tier1CapitalRatio3 = null;
                $scope.Tier1CapitalRatio4 = null;
                $scope.Tier1CapitalRatio5 = null;
                $scope.Tier1CapitalRatio6 = null;
                $scope.Tier1CapitalRatio7 = null;
                $scope.Tier1CapitalRatio8 = null;

                $scope.Tier1LeverageRatio1 = null;
                $scope.Tier1LeverageRatio2 = null;
                $scope.Tier1LeverageRatio3 = null;
                $scope.Tier1LeverageRatio4 = null;
                $scope.Tier1LeverageRatio5 = null;
                $scope.Tier1LeverageRatio6 = null;
                $scope.Tier1LeverageRatio7 = null;
                $scope.Tier1LeverageRatio8 = null;

                $scope.TotalRiskBasedRatio1 = null;
                $scope.TotalRiskBasedRatio2 = null;
                $scope.TotalRiskBasedRatio3 = null;
                $scope.TotalRiskBasedRatio4 = null;
                $scope.TotalRiskBasedRatio5 = null;
                $scope.TotalRiskBasedRatio6 = null;
                $scope.TotalRiskBasedRatio7 = null;
                $scope.TotalRiskBasedRatio8 = null;

                $scope.ROAA1 = null;
                $scope.ROAA2 = null;
                $scope.ROAA3 = null;
                $scope.ROAA4 = null;
                $scope.ROAA5 = null;
                $scope.ROAA6 = null;
                $scope.ROAA7 = null;
                $scope.ROAA8 = null;

                $scope.ROAE1 = null;
                $scope.ROAE2 = null;
                $scope.ROAE3 = null;
                $scope.ROAE4 = null;
                $scope.ROAE5 = null;
                $scope.ROAE6 = null;
                $scope.ROAE7 = null;
                $scope.ROAE8 = null;

                $scope.BookValueEquity1 = null;
                $scope.BookValueEquity2 = null;
                $scope.BookValueEquity3 = null;
                $scope.BookValueEquity4 = null;
                $scope.BookValueEquity5 = null;
                $scope.BookValueEquity6 = null;
                $scope.BookValueEquity7 = null;
                $scope.BookValueEquity8 = null;

                $scope.MarketValueEquity1 = null;
                $scope.MarketValueEquity2 = null;
                $scope.MarketValueEquity3 = null;
                $scope.MarketValueEquity4 = null;
                $scope.MarketValueEquity5 = null;
                $scope.MarketValueEquity6 = null;
                $scope.MarketValueEquity7 = null;
                $scope.MarketValueEquity8 = null;

                $scope.BookValuePerShare1 = null;
                $scope.BookValuePerShare2 = null;
                $scope.BookValuePerShare3 = null;
                $scope.BookValuePerShare4 = null;
                $scope.BookValuePerShare5 = null;
                $scope.BookValuePerShare6 = null;
                $scope.BookValuePerShare7 = null;
                $scope.BookValuePerShare8 = null;

                $scope.EPS1 = null;
                $scope.EPS2 = null;
                $scope.EPS3 = null;
                $scope.EPS4 = null;
                $scope.EPS5 = null;
                $scope.EPS6 = null;
                $scope.EPS7 = null;
                $scope.EPS8 = null;

                $scope.Exit15XBook1 = null;
                $scope.Exit15XBook2 = null;
                $scope.Exit15XBook3 = null;
                $scope.Exit15XBook4 = null;
                $scope.Exit15XBook5 = null;
                $scope.Exit15XBook6 = null;
                $scope.Exit15XBook7 = null;
                $scope.Exit15XBook8 = null;

                $scope.ExitEPS15X1 = null;
                $scope.ExitEPS15X2 = null;
                $scope.ExitEPS15X3 = null;
                $scope.ExitEPS15X4 = null;
                $scope.ExitEPS15X5 = null;
                $scope.ExitEPS15X6 = null;
                $scope.ExitEPS15X7 = null;
                $scope.ExitEPS15X8 = null;

                $scope.ExitEPS20X1 = null;
                $scope.ExitEPS20X2 = null;
                $scope.ExitEPS20X3 = null;
                $scope.ExitEPS20X4 = null;
                $scope.ExitEPS20X5 = null;
                $scope.ExitEPS20X6 = null;
                $scope.ExitEPS20X7 = null;
                $scope.ExitEPS20X8 = null;

                $scope.DividendPerShare1 = null;
                $scope.DividendPerShare2 = null;
                $scope.DividendPerShare3 = null;
                $scope.DividendPerShare4 = null;
                $scope.DividendPerShare5 = null;
                $scope.DividendPerShare6 = null;
                $scope.DividendPerShare7 = null;
                $scope.DividendPerShare8 = null;

                $scope.SharesOutstanding1 = null;
                $scope.SharesOutstanding2 = null;
                $scope.SharesOutstanding3 = null;
                $scope.SharesOutstanding4 = null;
                $scope.SharesOutstanding5 = null;
                $scope.SharesOutstanding6 = null;
                $scope.SharesOutstanding7 = null;
                $scope.SharesOutstanding8 = null;
            }

            $scope.$on('StrategicForecastComparisonSelected', function (event, arg) {
                getComparisonDetailsAndApplyComparison();
            });

            var getComparisonDetailsAndApplyComparison = function()
            {
                var params = {
                    ComparisonKey: $rootScope.StrategicForecastSelectedComparison.comparisonKey
                };

                var req = {
                    method: 'POST',
                    url: '/api/StrategicForecastApi/GetComparisonDetails',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: params
                };

                $http(req).then(function (result) {
                    if (result.data != null) {
                        

                        //angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
                        $scope.SelectedModel1 = {};
                        $scope.SelectedModel2 = {};
                        $scope.SelectedModel3 = {};
                        $scope.SelectedModel4 = {};
                        $scope.SelectedModel5 = {};
                        $scope.SelectedModel6 = {};
                        $scope.SelectedModel7 = {};
                        $scope.SelectedModel8 = {};
                        resetAllCalculations();
                        if (result.data.scenarioKey1 !== null) {
                            for (i = 0; i < $scope.StrategicForecastModels.length; i++) {
                                if ($scope.StrategicForecastModels[i].modelKey === result.data.scenarioKey1) {
                                    $scope.SelectedModel1 = $scope.StrategicForecastModels[i];
                                    $scope.SelectedScenario1 = {};
                                    getModelDetails($scope.SelectedModel1.modelKey, calculateColumn1Values);
                                    $rootScope.SelectedSFScenario1ModelKey = $scope.SelectedModel1.modelKey;
                                    break;
                                }
                            }
                        }

                        if (result.data.scenarioKey2 !== null) {
                            for (i = 0; i < $scope.StrategicForecastModels.length; i++) {
                                if ($scope.StrategicForecastModels[i].modelKey === result.data.scenarioKey2) {
                                    $scope.SelectedModel2 = $scope.StrategicForecastModels[i];
                                    $scope.SelectedScenario2 = {};
                                    getModelDetails($scope.SelectedModel2.modelKey, calculateColumn2Values);
                                    $rootScope.SelectedSFScenario2ModelKey = $scope.SelectedModel2.modelKey;
                                    break;
                                }
                            }
                        }

                        if (result.data.scenarioKey3 !== null) {
                            for (i = 0; i < $scope.StrategicForecastModels.length; i++) {
                                if ($scope.StrategicForecastModels[i].modelKey === result.data.scenarioKey3) {
                                    $scope.SelectedModel3 = $scope.StrategicForecastModels[i];
                                    $scope.SelectedScenario3 = {};
                                    getModelDetails($scope.SelectedModel3.modelKey, calculateColumn3Values);
                                    $rootScope.SelectedSFScenario3ModelKey = $scope.SelectedModel3.modelKey;
                                    break;
                                }
                            }
                        }

                        if (result.data.scenarioKey4 !== null) {
                            for (i = 0; i < $scope.StrategicForecastModels.length; i++) {
                                if ($scope.StrategicForecastModels[i].modelKey === result.data.scenarioKey4) {
                                    $scope.SelectedModel4 = $scope.StrategicForecastModels[i];
                                    $scope.SelectedScenario4 = {};
                                    getModelDetails($scope.SelectedModel4.modelKey, calculateColumn4Values);
                                    $rootScope.SelectedSFScenario4ModelKey = $scope.SelectedModel4.modelKey;
                                    break;
                                }
                            }
                        }

                        if (result.data.scenarioKey5 !== null) {
                            for (i = 0; i < $scope.StrategicForecastModels.length; i++) {
                                if ($scope.StrategicForecastModels[i].modelKey === result.data.scenarioKey5) {
                                    $scope.SelectedModel5 = $scope.StrategicForecastModels[i];
                                    $scope.SelectedScenario5 = {};
                                    getModelDetails($scope.SelectedModel5.modelKey, calculateColumn5Values);
                                    $rootScope.SelectedSFScenario5ModelKey = $scope.SelectedModel5.modelKey;
                                    break;
                                }
                            }
                        }

                        if (result.data.scenarioKey6 !== null) {
                            for (i = 0; i < $scope.StrategicForecastModels.length; i++) {
                                if ($scope.StrategicForecastModels[i].modelKey === result.data.scenarioKey6) {
                                    $scope.SelectedModel6 = $scope.StrategicForecastModels[i];
                                    $scope.SelectedScenario6 = {};
                                    getModelDetails($scope.SelectedModel6.modelKey, calculateColumn6Values);
                                    $rootScope.SelectedSFScenario6ModelKey = $scope.SelectedModel6.modelKey;
                                    break;
                                }
                            }
                        }

                        if (result.data.scenarioKey7 !== null) {
                            for (i = 0; i < $scope.StrategicForecastModels.length; i++) {
                                if ($scope.StrategicForecastModels[i].modelKey === result.data.scenarioKey7) {
                                    $scope.SelectedModel7 = $scope.StrategicForecastModels[i];
                                    $scope.SelectedScenario7 = {};
                                    getModelDetails($scope.SelectedModel7.modelKey, calculateColumn7Values);
                                    $rootScope.SelectedSFScenario7ModelKey = $scope.SelectedModel7.modelKey;
                                    break;
                                }
                            }
                        }

                        if (result.data.scenarioKey8 !== null) {
                            for (i = 0; i < $scope.StrategicForecastModels.length; i++) {
                                if ($scope.StrategicForecastModels[i].modelKey === result.data.scenarioKey8) {
                                    $scope.SelectedModel8 = $scope.StrategicForecastModels[i];
                                    $scope.SelectedScenario8 = {};
                                    getModelDetails($scope.SelectedModel8.modelKey, calculateColumn8Values);
                                    $rootScope.SelectedSFScenario8ModelKey = $scope.SelectedModel8.modelKey;
                                    break;
                                }
                            }
                        }
                        
                    }
                }, function () {
                    //angular.element(document.querySelector('#loaderDashboardLinks')).addClass('hidden');
                    $scope.toggleErrorMessageBoxModal('An error occurred while trying to get comparisons. Please send an e-mail to admin@cb-resource.com.');
                });
            }

            $scope.ExportToExcelStrategicSummary = function () {
                var dashboardParam = {
                    SelectedSFScenario1ModelKey: $scope.SelectedModel1.modelKey,
                    SelectedSFScenario2ModelKey: $scope.SelectedModel2.modelKey,
                    SelectedSFScenario3ModelKey: $scope.SelectedModel3.modelKey,
                    SelectedSFScenario4ModelKey: $scope.SelectedModel4.modelKey,
                    SelectedSFScenario5ModelKey: $scope.SelectedModel5.modelKey,
                    SelectedSFScenario6ModelKey: $scope.SelectedModel6.modelKey,
                    SelectedSFScenario7ModelKey: $scope.SelectedModel7.modelKey,
                    SelectedSFScenario8ModelKey: $scope.SelectedModel8.modelKey,
                    InstitutionKey: $rootScope.SelectedBank.institutionKey,
                    SelectedHorizon: $scope.SelectedHorizon.value,
                    SelectedComparison:$rootScope.StrategicForecastSelectedComparison==null?"na":$rootScope.StrategicForecastSelectedComparison.comparisonName
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
                    data: dashboardParam
                };
                $.fileDownload('/Api/StrategicForecastApi/ExportToExcelStrategicForecastSummary', req);
            }

            initialize();
}]);