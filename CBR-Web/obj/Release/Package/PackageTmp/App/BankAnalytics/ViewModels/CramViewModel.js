cbrBankAnalyticsModule.directive('numbersOnly', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                var clean = val.replace(/[^0-9.]+/g, '');
                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});

cbrBankAnalyticsModule.directive('numbersOnlyWithMinMax', function () {
    return {
        require: '?ngModel',
        scope: {
            min: '=',
            max: '='
        },
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }
            ngModelCtrl.$parsers.push(function (val) {
                var clean = val.replace(/[^0-9]+/g, '');

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                let controlValue = ngModelCtrl.$viewValue + event.key;
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
                if (scope.min !== undefined && scope.max !== undefined && parseInt(controlValue, 10) < scope.min || parseInt(controlValue, 10) > scope.max) {
                    event.preventDefault()
                }
            });
        }
    };
});

cbrBankAnalyticsModule.directive('allowDecimalNumbers', function () {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attributes) {
            var limit = $attributes.allowDecimalNumbers;
            function caret(node) {
                if (node.selectionStart) {
                    return node.selectionStart;
                }
                else if (!document.selection) {
                    return 0;
                }
                //node.focus();
                var c = "\001";
                var sel = document.selection.createRange();
                var txt = sel.text;
                var dul = sel.duplicate();
                var len = 0;
                try { dul.moveToElementText(node); } catch (e) { return 0; }
                sel.text = txt + c;
                len = (dul.text.indexOf(c));
                sel.moveStart('character', -1);
                sel.text = "";
                return len;
            }
            $element.bind('keypress', function (event) {
                var charCode = (event.which) ? event.which : event.keyCode;
                var elem = document.getElementById($element.attr("id"));
                if (charCode == 45) {
                    var caretPosition = caret(elem);
                    if (caretPosition == 0) {
                        //if ($element.val().charAt(0) != "-") {
                        //    if ($element.val() <= limit) {
                        //        $element.val("-" + $element.val());
                        //    }
                        //}
                        if ($element.val().indexOf("-") != -1) {
                            event.preventDefault();
                            return false;
                        }
                    }
                    else {
                        event.preventDefault();
                    }
                }
                if (charCode == 46) {
                    //if ($element.val().length > limit - 1) {
                    //    event.preventDefault();
                    //    return false;
                    //}
                    if ($element.val().indexOf('.') != -1) {
                        event.preventDefault();
                        return false;
                    }
                    return true;
                }
                if (charCode != 45 && charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                    event.preventDefault();
                    return false;
                }
                let finalValue = $element.val() + event.key;
                let numberAary = finalValue.split('.');
                if (numberAary.length > 1 && numberAary[1].length > limit) {
                    event.preventDefault();
                    return false;
                }
                //if ($element.val().length > limit - 1) {
                //    event.preventDefault();
                //    return false;
                //}
                return true;
            });
        }
    };
});


cbrBankAnalyticsModule.controller("cramDashboardLinksViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.cramSubTab = 'cramDashboard';
    $scope.ResultBanks = [];
    $scope.PageSize = '10';
    $scope.PageNumbers = [];
    $scope.CurrentPage = 1;
    $rootScope.SelectedBank = {};
    $scope.TotalResults = 0;
    $scope.CramModels = [];
    $scope.TotalRiskWeight = 0;
    $scope.UserInfo = {};
    $scope.FavoriteBanks = [];
    $rootScope.SelectedBankVitals = {};
    $rootScope.SelectedPeriod = {};
    $rootScope.DefaultRatings = {};
    $rootScope.CopiedModelName = '';
    $rootScope.CramModelDisplayName = '';
    $scope.CramModelName = '';
    $scope.SelectedBankName = '';
    $scope.SelectedBankCertNumber = '';

    $scope.ChangeScreen = function (templateId) {
        window.location.href = '/';
    }

    var getSelectedModelName = function () {
        if ($scope.CramModels.length > 0) {
            var selectedModel = $scope.CramModels.filter(function (obj) {
                return obj.isSelected === true;
            })[0];

            if (typeof selectedModel !== 'undefined' && selectedModel !== null) {
                $rootScope.CramModelDisplayName = selectedModel.modelName;
            }
            else {
                $rootScope.CramModelDisplayName = 'Create/Edit Scenario';
            }
        }
        else {
            $rootScope.CramModelDisplayName = 'Create/Edit Scenario';
        }
    }

    $scope.BankFindSearchCriteria =
    {
        BankName: '',
        CertNumber: '',
        Location: '-- Choose a filter --',
        AssetSize: '-- Choose a filter --',
        CorporationType: '-- Choose a filter --',
        PageSize: 10,
        PageNumber: 1
    };

    $rootScope.RiskCategoriesAndWeights = {
        ModelKey: '',
        CreditRisk: '',
        CreditRiskWeight: '',
        InterestRateRisk: '',
        InterestRateRiskWeight: '',
        LiquidityRisk: '',
        LiquidityRiskWeight: '',
        OperationalRisk: '',
        OperationalRiskWeight: '',
        ComplianceRisk: '',
        ComplianceRiskWeight: '',
        StrategicRisk: '',
        StrategicRiskWeight: '',
        ReputationRisk: '',
        ReputationRiskWeight: ''
    };

    $rootScope.AdjustBankData = {
        ModelKey: '',
        Tier1LeverageRatio: '',
        CET1CapitalRatio: '',
        Tier1CapitalRatio: '',
        TotalCapitalRatio: '',
        CommonEquityTier1Capital: '',
        Tier1Capital: '',
        TotalCapital: '',
        TotalAssetsLeveragePurposes: '',
        TotalRiskWeightedAssets: ''
    };

    $rootScope.RiskRating = {
        ModelKey: '',
        Low: '',
        LowModerate: '',
        Moderate: '',
        ModerateHigh: '',
        High: ''
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else {
            return $filter('number')(numericValue, fractionSize);
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

    $scope.ToggleCramTabs = function ($event, tabId) {
        if (tabId === 'cramDashboard') {
            angular.element(document.querySelector('#lnkcramDashboard')).addClass('active');
            angular.element(document.querySelector('#lnkcramTier1LeverageRatio')).removeClass('active');
            angular.element(document.querySelector('#lnkcramCET1CapitalRatio')).removeClass('active');
            angular.element(document.querySelector('#lnkcramTier1CapitalRatio')).removeClass('active');
            angular.element(document.querySelector('#lnkcramTotalCapitalRatio')).removeClass('active');
        }
        else if (tabId === 'cramTier1LeverageRatio') {
            angular.element(document.querySelector('#lnkcramDashboard')).removeClass('active');
            angular.element(document.querySelector('#lnkcramTier1LeverageRatio')).addClass('active');
            angular.element(document.querySelector('#lnkcramCET1CapitalRatio')).removeClass('active');
            angular.element(document.querySelector('#lnkcramTier1CapitalRatio')).removeClass('active');
            angular.element(document.querySelector('#lnkcramTotalCapitalRatio')).removeClass('active');
        }
        else if (tabId === 'cramCET1CapitalRatio') {
            angular.element(document.querySelector('#lnkcramDashboard')).removeClass('active');
            angular.element(document.querySelector('#lnkcramTier1LeverageRatio')).removeClass('active');
            angular.element(document.querySelector('#lnkcramCET1CapitalRatio')).addClass('active');
            angular.element(document.querySelector('#lnkcramTier1CapitalRatio')).removeClass('active');
            angular.element(document.querySelector('#lnkcramTotalCapitalRatio')).removeClass('active');
        }
        else if (tabId === 'cramTier1CapitalRatio') {
            angular.element(document.querySelector('#lnkcramDashboard')).removeClass('active');
            angular.element(document.querySelector('#lnkcramTier1LeverageRatio')).removeClass('active');
            angular.element(document.querySelector('#lnkcramCET1CapitalRatio')).removeClass('active');
            angular.element(document.querySelector('#lnkcramTier1CapitalRatio')).addClass('active');
            angular.element(document.querySelector('#lnkcramTotalCapitalRatio')).removeClass('active');
        }
        else if (tabId === 'cramTotalCapitalRatio') {
            angular.element(document.querySelector('#lnkcramDashboard')).removeClass('active');
            angular.element(document.querySelector('#lnkcramTier1LeverageRatio')).removeClass('active');
            angular.element(document.querySelector('#lnkcramCET1CapitalRatio')).removeClass('active');
            angular.element(document.querySelector('#lnkcramTier1CapitalRatio')).removeClass('active');
            angular.element(document.querySelector('#lnkcramTotalCapitalRatio')).addClass('active');
        }

        $scope.cramSubTab = tabId;
    }

    $scope.ShowSearchBankDrawer = function ($event) {
        $('#drawerExample').drawer().show();
        $scope.ResultBanks = [];
        $scope.PageNumbers = [];
        $rootScope.SelectedBank = {};
        $scope.CurrentPage = 1;
        $scope.TotalResults = 0;
        angular.element(document.querySelector('#successMessage')).addClass('hidden');
        angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('');
        $scope.BankFindSearchCriteria =
        {
            BankName: '',
            CertNumber: '',
            Location: '-- Choose a filter --',
            AssetSize: '-- Choose a filter --',
            CorporationType: '-- Choose a filter --',
            PageSize: 10,
            PageNumber: 1
        };
    }

    $scope.HideSearchBankDrawer = function ($event) {
        $('#drawerExample').drawer().hide();
    }

    $rootScope.ShowInputFieldDrawer = function ($event) {
        if ($scope.CramModels.length > 0) {
            var selectedModel = $scope.CramModels.filter(function (obj) {
                return obj.isSelected === true;
            })[0];

            if (typeof selectedModel !== 'undefined' && selectedModel.userKey === $scope.UserInfo.userKey) {
                angular.element(document.querySelector('#txtSaveOrUpdateModel')).removeAttr('disabled');
                angular.element(document.querySelector('#btnSaveOrUpdateModel')).removeAttr('disabled');
            }
            else if (typeof selectedModel === 'undefined') {
                angular.element(document.querySelector('#txtSaveOrUpdateModel')).removeAttr('disabled');
                angular.element(document.querySelector('#btnSaveOrUpdateModel')).removeAttr('disabled');
            }
            else {
                angular.element(document.querySelector('#txtSaveOrUpdateModel')).attr('disabled', '');
                angular.element(document.querySelector('#btnSaveOrUpdateModel')).attr('disabled', '');
            }
        }
        else {
            angular.element(document.querySelector('#txtSaveOrUpdateModel')).removeAttr('disabled');
            angular.element(document.querySelector('#btnSaveOrUpdateModel')).removeAttr('disabled');
        }

        $('#drawerExample-input-filed').drawer().show();
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

    $scope.ShowSelectExistingModelDrawer = function ($event) {
        $scope.CramModels = [];
        GetModelsForUser(-1);
        $('#drawerExample-view-save-model').drawer().show();
    }

    $scope.HideSelectExistingModelDrawer = function ($event) {
        $('#drawerExample-view-save-model').drawer().hide();
    }

    $scope.ClearSearchDialog = function ($event) {
        $scope.BankFindSearchCriteria =
        {
            BankName: '',
            CertNumber: '',
            Location: '-- Choose a filter --',
            AssetSize: '-- Choose a filter --',
            CorporationType: '-- Choose a filter --',
            PageSize: 10,
            PageNumber: 1
        };
        $scope.ResultBanks = [];
        $scope.PageNumbers = [];
        $rootScope.SelectedBank = {};
        $scope.CurrentPage = 1;
        $scope.TotalResults = 0;
        angular.element(document.querySelector('#successMessage')).addClass('hidden');
        angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('');
    }

    var fillPageNumbersArray = function (length) {
        $scope.PageNumbers = [];
        var numberOfPages = 0;
        if (length > 0 && length <= $scope.PageSize)
            numberOfPages = 1;
        else if (length > 0 && length > $scope.PageSize) {
            var remainder = length % $scope.PageSize;
            if (remainder > 0) {
                numberOfPages = Math.floor(length / $scope.PageSize) + 1;
            }
            else {
                numberOfPages = length / $scope.PageSize;
            }
        }
        var pagesToDisplay = 0;

        if (numberOfPages > 5)
            pagesToDisplay = 5;
        else
            pagesToDisplay = numberOfPages;

        if (numberOfPages > 5)
            $scope.PageNumbers.push('<<');

        if (pagesToDisplay > 1) {
            for (i = 1; i <= pagesToDisplay; i++) {
                $scope.PageNumbers.push(i);
            }
        }

        if (numberOfPages > 5)
            $scope.PageNumbers.push('>>');
    }

    $scope.searchBanks = function (pageNumber) {
        var bankFindParams = {
            BankName: '',
            CertNumber: '',
            Location: '',
            AssetSize: '',
            CorporationType: '',
            PageSize: 10,
            PageNumber: 1
        };

        if ($scope.BankFindSearchCriteria.BankName === '' &&
            $scope.BankFindSearchCriteria.CertNumber === '' &&
            $scope.BankFindSearchCriteria.Location === '-- Choose a filter --' &&
            $scope.BankFindSearchCriteria.AssetSize === '-- Choose a filter --' &&
            $scope.BankFindSearchCriteria.CorporationType === '-- Choose a filter --') {
            $scope.toggleErrorMessageBoxModal('Please input atleast one search parameter to search.');
        }
        else {
            angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('<img src="../../../Images/cbr-squares.gif" class="img-responsive" />');

            if (pageNumber == '<<') {
                if ($scope.CurrentPage > 1)
                    $scope.CurrentPage = $scope.CurrentPage - 1;
            }
            else if (pageNumber == '>>') {
                if ($scope.CurrentPage < ($scope.ResultBanks[0].totalResults / $scope.PageSize))
                    $scope.CurrentPage = $scope.CurrentPage + 1;
            }
            else
                $scope.CurrentPage = pageNumber;

            if ($scope.ResultBanks.length > 0)
                $scope.ResultBanks = [];

            if ($scope.PageSize == 'All')
                $scope.BankFindSearchCriteria.PageSize = -1;
            else
                $scope.BankFindSearchCriteria.PageSize = $scope.PageSize;

            $scope.BankFindSearchCriteria.PageNumber = $scope.CurrentPage;

            bankFindParams.BankName = $scope.BankFindSearchCriteria.BankName;
            bankFindParams.CertNumber = $scope.BankFindSearchCriteria.CertNumber;
            bankFindParams.Location = $scope.BankFindSearchCriteria.Location;
            bankFindParams.AssetSize = $scope.BankFindSearchCriteria.AssetSize;
            bankFindParams.CorporationType = $scope.BankFindSearchCriteria.CorporationType;
            bankFindParams.PageNumber = $scope.CurrentPage;
            bankFindParams.PageSize = $scope.BankFindSearchCriteria.PageSize;

            if ($scope.BankFindSearchCriteria.Location === '-- Choose a filter --')
                bankFindParams.Location = '';

            if ($scope.BankFindSearchCriteria.AssetSize === '-- Choose a filter --')
                bankFindParams.AssetSize = '';

            if ($scope.BankFindSearchCriteria.CorporationType === '-- Choose a filter --')
                bankFindParams.CorporationType = '';

            var req = {
                method: 'POST',
                url: '/api/PeerGroupsApi/SearchBanks',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: bankFindParams
            };

            $http(req).then(function (result) {
                if (result.data !== null && result.data.length > 0) {

                    angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('');
                    angular.element(document.querySelector('#successMessage')).removeClass('hidden');
                    $scope.ResultBanks = result.data;
                    $scope.TotalResults = $scope.ResultBanks[0].totalResults;
                    fillPageNumbersArray($scope.ResultBanks[0].totalResults);
                }
                else {
                    angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('');
                    angular.element(document.querySelector('#successMessage')).removeClass('hidden');
                    $scope.TotalResults = 0;
                }
            }, function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while searching for banks. Please send an e-mail to admin@cb-resource.com.');
                angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('');
            });
        }
    }

    $scope.SearchOnPageSizeChange = function ($event) {
        $scope.ResultBanks = [];
        $scope.PageNumbers = [];
        $scope.searchBanks(1);
    }

    $scope.SelectUnSelectBank = function ($event, bankObj) {
        $rootScope.SelectedBank = bankObj;
        getCramDashboardConcepts($rootScope.SelectedBank.institutionKey, $rootScope.SelectedPeriod.value);
    }

    $scope.CopyModel = function () {
        if ($scope.CopyForm.$valid) {
            if ($scope.CramModels.length > 0) {
                var pos = -1;
                for (i = 0; i < $scope.CramModels.length; i++) {
                    if ($scope.CramModels[i].isSelected === true) {
                        pos = i;
                        break;
                    }
                }

                var selectedModel = null;

                if (pos > -1)
                    selectedModel = $scope.CramModels[pos];

                if (selectedModel === null) {
                    $scope.toggleErrorMessageBoxModal('Please select an existing model to copy.');
                }
                else {
                    var riskCategoriesAndWeights = {
                        ModelKey: '',
                        CreditRisk: '',
                        CreditRiskWeight: '',
                        InterestRateRisk: '',
                        InterestRateRiskWeight: '',
                        LiquidityRisk: '',
                        LiquidityRiskWeight: '',
                        OperationalRisk: '',
                        OperationalRiskWeight: '',
                        ComplianceRisk: '',
                        ComplianceRiskWeight: '',
                        StrategicRisk: '',
                        StrategicRiskWeight: '',
                        ReputationRisk: '',
                        ReputationRiskWeight: ''
                    };

                    var riskRating = {
                        ModelKey: '',
                        Low: '',
                        LowModerate: '',
                        Moderate: '',
                        ModerateHigh: '',
                        High: ''
                    };

                    var adjustBankData = {
                        ModelKey: '',
                        Tier1LeverageRatio: '',
                        CET1CapitalRatio: '',
                        Tier1CapitalRatio: '',
                        TotalCapitalRatio: '',
                        CommonEquityTier1Capital: '',
                        Tier1Capital: '',
                        TotalCapital: '',
                        TotalAssetsLeveragePurposes: '',
                        TotalRiskWeightedAssets: ''
                    };

                    riskCategoriesAndWeights.ModelKey = null;
                    riskCategoriesAndWeights.CreditRisk = $rootScope.RiskCategoriesAndWeights.CreditRisk;
                    riskCategoriesAndWeights.CreditRiskWeight = $rootScope.RiskCategoriesAndWeights.CreditRiskWeight;
                    riskCategoriesAndWeights.InterestRateRisk = $rootScope.RiskCategoriesAndWeights.InterestRateRisk;
                    riskCategoriesAndWeights.InterestRateRiskWeight = $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight;
                    riskCategoriesAndWeights.LiquidityRisk = $rootScope.RiskCategoriesAndWeights.LiquidityRisk;
                    riskCategoriesAndWeights.LiquidityRiskWeight = $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight;
                    riskCategoriesAndWeights.OperationalRisk = $rootScope.RiskCategoriesAndWeights.OperationalRisk;
                    riskCategoriesAndWeights.OperationalRiskWeight = $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight;
                    riskCategoriesAndWeights.ComplianceRisk = $rootScope.RiskCategoriesAndWeights.ComplianceRisk;
                    riskCategoriesAndWeights.ComplianceRiskWeight = $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight;
                    riskCategoriesAndWeights.StrategicRisk = $rootScope.RiskCategoriesAndWeights.StrategicRisk;
                    riskCategoriesAndWeights.StrategicRiskWeight = $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight;
                    riskCategoriesAndWeights.ReputationRisk = $rootScope.RiskCategoriesAndWeights.ReputationRisk;
                    riskCategoriesAndWeights.ReputationRiskWeight = $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight;

                    adjustBankData.ModelKey = null;
                    adjustBankData.Tier1LeverageRatio = $rootScope.AdjustBankData.Tier1LeverageRatio;
                    adjustBankData.CET1CapitalRatio = $rootScope.AdjustBankData.CET1CapitalRatio;
                    adjustBankData.Tier1CapitalRatio = $rootScope.AdjustBankData.Tier1CapitalRatio;
                    adjustBankData.TotalCapitalRatio = $rootScope.AdjustBankData.TotalCapitalRatio;
                    adjustBankData.CommonEquityTier1Capital = $rootScope.AdjustBankData.CommonEquityTier1Capital;
                    adjustBankData.Tier1Capital = $rootScope.AdjustBankData.Tier1Capital;
                    adjustBankData.TotalCapital = $rootScope.AdjustBankData.TotalCapital;
                    adjustBankData.TotalAssetsLeveragePurposes = $rootScope.AdjustBankData.TotalAssetsLeveragePurposes;
                    adjustBankData.TotalRiskWeightedAssets = $rootScope.AdjustBankData.TotalRiskWeightedAssets;

                    riskRating.ModelKey = null;
                    riskRating.Low = $rootScope.RiskRating.Low;
                    riskRating.LowModerate = $rootScope.RiskRating.LowModerate;
                    riskRating.Moderate = $rootScope.RiskRating.Moderate;
                    riskRating.ModerateHigh = $rootScope.RiskRating.ModerateHigh;
                    riskRating.High = $rootScope.RiskRating.High;

                    var modelCreationUpdationParams = {
                        ModelName: $scope.CopiedModelName,
                        ModelKey: null,
                        UserKey: $scope.UserInfo.userKey,
                    };

                    var req = {
                        method: 'POST',
                        url: '/api/Cram/SaveOrUpdateModel',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: modelCreationUpdationParams
                    };

                    $http(req).then(function (result) {
                        if (result.data != null) {
                            //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
                            riskCategoriesAndWeights.ModelKey = result.data;
                            adjustBankData.ModelKey = result.data;
                            riskRating.ModelKey = result.data;
                            CopyRiskCategories(riskCategoriesAndWeights);
                            CopyAdjustBankData(adjustBankData);
                            CopyRiskRatings(riskRating);
                        }
                        else {
                            //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
                        }
                    }, function () {
                        $scope.toggleErrorMessageBoxModal('An error occurred while trying to save or update model. Please send an e-mail to admin@cb-resource.com.');
                        //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
                    });
                }
            }
            else {
                $scope.toggleErrorMessageBoxModal('Please select an existing model to copy.');
            }

            $('#drawerExample-save-model').drawer().hide();
        }
        else {
            $scope.submitted = true;
        }
    }

    $scope.SaveOrUpdateModel = function () {
        if ($scope.CapitalRiskForm.$valid && (typeof $scope.RiskScoreErr === 'undefined' || $scope.RiskScoreErr === "")) {
            if (typeof $rootScope.AdjustBankData.Tier1Capital !== 'undefined')
                $rootScope.SelectedBankVitals.tier1Capital = $rootScope.AdjustBankData.Tier1Capital;

            if (typeof $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== 'undefined')
                $rootScope.SelectedBankVitals.totalAssetsLeveragePurposes = $rootScope.AdjustBankData.TotalAssetsLeveragePurposes;

            if (typeof $rootScope.AdjustBankData.CommonEquityTier1Capital !== 'undefined')
                $rootScope.SelectedBankVitals.commonEquityTier1Capital = $rootScope.AdjustBankData.CommonEquityTier1Capital;

            if (typeof $rootScope.AdjustBankData.TotalRiskWeightedAssets !== 'undefined')
                $rootScope.SelectedBankVitals.totalRiskWeightedAssets = $rootScope.AdjustBankData.TotalRiskWeightedAssets;

            if (typeof $rootScope.AdjustBankData.TotalCapital !== 'undefined')
                $rootScope.SelectedBankVitals.totalCapital = $rootScope.AdjustBankData.TotalCapital;

            if (typeof $rootScope.RiskRating.Low !== 'undefined')
                $rootScope.DefaultRatings.low = $rootScope.RiskRating.Low;

            if (typeof $rootScope.RiskRating.LowModerate !== 'undefined')
                $rootScope.DefaultRatings.lowModerate = $rootScope.RiskRating.LowModerate;

            if (typeof $rootScope.RiskRating.Moderate !== 'undefined')
                $rootScope.DefaultRatings.moderate = $rootScope.RiskRating.Moderate;

            if (typeof $rootScope.RiskRating.ModerateHigh !== 'undefined')
                $rootScope.DefaultRatings.moderateHigh = $rootScope.RiskRating.ModerateHigh;

            if (typeof $rootScope.RiskRating.High !== 'undefined')
                $rootScope.DefaultRatings.high = $rootScope.RiskRating.High;

            var modelCreationUpdationParams = {
                ModelName: $scope.CramModelName,
                ModelKey: '',
                UserKey: $scope.UserInfo.userKey,
            };

            if ($scope.CramModels.length > 0) {
                var pos = -1;
                for (i = 0; i < $scope.CramModels.length; i++) {
                    if ($scope.CramModels[i].isSelected === true) {
                        pos = i;
                        break;
                    }
                }

                var selectedModel = null;

                if (pos > -1)
                    selectedModel = $scope.CramModels[pos];

                if (selectedModel === null && $rootScope.RiskCategoriesAndWeights.ModelKey === '' && $rootScope.RiskRating.ModelKey === '' && $rootScope.AdjustBankData.ModelKey === '') {
                    modelCreationUpdationParams.ModelKey = null;
                }
                else if (typeof selectedModel !== 'undefined' && selectedModel !== null) {
                    modelCreationUpdationParams.ModelKey = selectedModel.modelKey;
                }
                else if ((typeof selectedModel === 'undefined' || selectedModel === null) && $rootScope.RiskCategoriesAndWeights.ModelKey !== '' && $rootScope.RiskRating.ModelKey !== '' && $rootScope.AdjustBankData.ModelKey !== '') {
                    modelCreationUpdationParams.ModelKey = $rootScope.RiskCategoriesAndWeights.ModelKey;
                }
            }
            else {
                modelCreationUpdationParams.ModelKey = null;
            }

            $('#drawerExample-input-filed').drawer().hide();
            var req = {
                method: 'POST',
                url: '/api/Cram/SaveOrUpdateModel',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: modelCreationUpdationParams
            };

            $http(req).then(function (result) {
                if (result.data != null) {

                    //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
                    if ((typeof selectedModel === 'undefined' || selectedModel === null) && $rootScope.RiskCategoriesAndWeights.ModelKey === '' && $rootScope.RiskRating.ModelKey === '' && $rootScope.AdjustBankData.ModelKey === '') {
                        if (result.data > -1) {
                            $rootScope.RiskCategoriesAndWeights.ModelKey = result.data;
                            $rootScope.RiskRating.ModelKey = result.data;
                            $rootScope.AdjustBankData.ModelKey = result.data;

                            var newModel = {
                                modelName: $scope.CramModelName,
                                modelKey: result.data,
                                userKey: $scope.UserInfo.userKey,
                                riskCategories: {},
                                adjustBankData: {},
                                riskRatings: {},
                                isSelected: true,
                                modelOwner: $scope.UserInfo.userName
                            };

                            newModel.riskCategories.creditRisk = $rootScope.RiskCategoriesAndWeights.CreditRisk;
                            newModel.riskCategories.creditRiskWeight = $rootScope.RiskCategoriesAndWeights.CreditRiskWeight;
                            newModel.riskCategories.interestRateRisk = $rootScope.RiskCategoriesAndWeights.InterestRateRisk;
                            newModel.riskCategories.interestRateRiskWeight = $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight;
                            newModel.riskCategories.liquidityRisk = $rootScope.RiskCategoriesAndWeights.LiquidityRisk;
                            newModel.riskCategories.liquidityRiskWeight = $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight;
                            newModel.riskCategories.operationalRisk = $rootScope.RiskCategoriesAndWeights.OperationalRisk;
                            newModel.riskCategories.operationalRiskWeight = $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight;
                            newModel.riskCategories.complianceRisk = $rootScope.RiskCategoriesAndWeights.ComplianceRisk;
                            newModel.riskCategories.complianceRiskWeight = $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight;
                            newModel.riskCategories.strategicRisk = $rootScope.RiskCategoriesAndWeights.StrategicRisk;
                            newModel.riskCategories.strategicRiskWeight = $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight;
                            newModel.riskCategories.reputationRisk = $rootScope.RiskCategoriesAndWeights.ReputationRisk;
                            newModel.riskCategories.reputationRiskWeight = $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight;

                            newModel.riskRatings.low = $rootScope.RiskRating.Low;
                            newModel.riskRatings.lowModerate = $rootScope.RiskRating.LowModerate;
                            newModel.riskRatings.moderate = $rootScope.RiskRating.Moderate;
                            newModel.riskRatings.moderateHigh = $rootScope.RiskRating.ModerateHigh;
                            newModel.riskRatings.high = $rootScope.RiskRating.High;

                            newModel.adjustBankData.tier1LeverageRatio = $rootScope.AdjustBankData.Tier1LeverageRatio;
                            newModel.adjustBankData.ceT1CapitalRatio = $rootScope.AdjustBankData.CET1CapitalRatio;
                            newModel.adjustBankData.tier1CapitalRatio = $rootScope.AdjustBankData.Tier1CapitalRatio;
                            newModel.adjustBankData.totalCapitalRatio = $rootScope.AdjustBankData.TotalCapitalRatio;
                            newModel.adjustBankData.commonEquityTier1Capital = $rootScope.AdjustBankData.CommonEquityTier1Capital;
                            newModel.adjustBankData.tier1Capital = $rootScope.AdjustBankData.Tier1Capital;
                            newModel.adjustBankData.totalCapital = $rootScope.AdjustBankData.TotalCapital;
                            newModel.adjustBankData.totalAssetsLeveragePurposes = $rootScope.AdjustBankData.TotalAssetsLeveragePurposes;
                            newModel.adjustBankData.totalRiskWeightedAssets = $rootScope.AdjustBankData.TotalRiskWeightedAssets;

                            $scope.CramModels.push(newModel);
                            getSelectedModelName();
                        }
                    }
                    else if (typeof selectedModel !== 'undefined' && selectedModel !== null) {
                        $rootScope.RiskCategoriesAndWeights.ModelKey = selectedModel.modelKey;
                        $rootScope.RiskRating.ModelKey = selectedModel.modelKey;
                        $rootScope.AdjustBankData.ModelKey = selectedModel.modelKey;
                    }

                    SaveOrUpdateRiskCategories();
                    SaveOrUpdateAdjustBankData();
                    SaveOrUpdateRiskRatings();
                    getDefaultRatings();
                }
                else {
                    //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
                }
            }, function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to save or update model. Please send an e-mail to admin@cb-resource.com.');
                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
            });
        }
        else {
            $scope.submitted = true;
        }
    }

    var SaveOrUpdateRiskCategories = function () {
        var req = {
            method: 'POST',
            url: '/api/Cram/SaveOrUpdateRiskCategories',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $rootScope.RiskCategoriesAndWeights
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');

            }
            else {
                //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to save risk categories and weights. Please send an e-mail to admin@cb-resource.com.');
            //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
        });
    }

    var SaveOrUpdateRiskRatings = function () {
        var req = {
            method: 'POST',
            url: '/api/Cram/SaveOrUpdateRiskRatings',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $rootScope.RiskRating
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
            }
            else {
                //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to save risk ratings. Please send an e-mail to admin@cb-resource.com.');
            //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
        });
    }

    var SaveOrUpdateAdjustBankData = function () {
        var req = {
            method: 'POST',
            url: '/api/Cram/SaveOrUpdateAdjustBankData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $rootScope.AdjustBankData
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');

            }
            else {
                //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to save risk categories and weights. Please send an e-mail to admin@cb-resource.com.');
            //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
        });
    }

    var CopyRiskCategories = function (riskCateParams) {
        var req = {
            method: 'POST',
            url: '/api/Cram/SaveOrUpdateRiskCategories',
            headers: {
                'Content-Type': 'application/json'
            },
            data: riskCateParams
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');

            }
            else {
                //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to save risk categories and weights. Please send an e-mail to admin@cb-resource.com.');
            //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
        });
    }

    var CopyRiskRatings = function (riskRatingParams) {
        var req = {
            method: 'POST',
            url: '/api/Cram/SaveOrUpdateRiskRatings',
            headers: {
                'Content-Type': 'application/json'
            },
            data: riskRatingParams
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
            }
            else {
                //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to save risk ratings. Please send an e-mail to admin@cb-resource.com.');
            //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
        });
    }

    var CopyAdjustBankData = function (adjustBankParams) {
        var req = {
            method: 'POST',
            url: '/api/Cram/SaveOrUpdateAdjustBankData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: adjustBankParams
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');

            }
            else {
                //angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to save risk categories and weights. Please send an e-mail to admin@cb-resource.com.');
            //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
        });
    }

    $scope.SelectModel = function ($event, modelObj) {
        //de-select any previously selected model

        var pos = -1;
        for (i = 0; i < $scope.CramModels.length; i++) {
            if ($scope.CramModels[i].isSelected === true) {
                pos = i;
                break;
            }
        }

        if (pos > -1)
            $scope.CramModels[pos].isSelected = false;

        pos = -1;
        for (i = 0; i < $scope.CramModels.length; i++) {
            if ($scope.CramModels[i].modelKey === modelObj.modelKey) {
                pos = i;
                break;
            }
        }

        if (pos > -1) {
            $scope.CramModels[pos].isSelected = true;
        }

        $rootScope.RiskCategoriesAndWeights.ModelKey = modelObj.modelKey;
        $rootScope.RiskRating.ModelKey = modelObj.modelKey;
        $rootScope.AdjustBankData.ModelKey = modelObj.modelKey;
        $scope.CramModelName = modelObj.modelName;
        $rootScope.CramModelDisplayName = modelObj.modelName;

        if (modelObj.riskCategories !== null) {
            $rootScope.RiskCategoriesAndWeights.CreditRisk = modelObj.riskCategories.creditRisk;
            $rootScope.RiskCategoriesAndWeights.CreditRiskWeight = modelObj.riskCategories.creditRiskWeight;
            $rootScope.RiskCategoriesAndWeights.InterestRateRisk = modelObj.riskCategories.interestRateRisk;
            $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight = modelObj.riskCategories.interestRateRiskWeight;
            $rootScope.RiskCategoriesAndWeights.LiquidityRisk = modelObj.riskCategories.liquidityRisk;
            $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight = modelObj.riskCategories.liquidityRiskWeight;
            $rootScope.RiskCategoriesAndWeights.OperationalRisk = modelObj.riskCategories.operationalRisk;
            $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight = modelObj.riskCategories.operationalRiskWeight;
            $rootScope.RiskCategoriesAndWeights.ComplianceRisk = modelObj.riskCategories.complianceRisk;
            $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight = modelObj.riskCategories.complianceRiskWeight;
            $rootScope.RiskCategoriesAndWeights.StrategicRisk = modelObj.riskCategories.strategicRisk;
            $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight = modelObj.riskCategories.strategicRiskWeight;
            $rootScope.RiskCategoriesAndWeights.ReputationRisk = modelObj.riskCategories.reputationRisk;
            $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight = modelObj.riskCategories.reputationRiskWeight;
        }
        else {
            $rootScope.RiskCategoriesAndWeights = {
                ModelKey: '',
                CreditRisk: '',
                CreditRiskWeight: '',
                InterestRateRisk: '',
                InterestRateRiskWeight: '',
                LiquidityRisk: '',
                LiquidityRiskWeight: '',
                OperationalRisk: '',
                OperationalRiskWeight: '',
                ComplianceRisk: '',
                ComplianceRiskWeight: '',
                StrategicRisk: '',
                StrategicRiskWeight: '',
                ReputationRisk: '',
                ReputationRiskWeight: ''
            };
        }

        if (modelObj.riskRatings !== null) {
            $rootScope.RiskRating.Low = modelObj.riskRatings.low;
            $rootScope.RiskRating.LowModerate = modelObj.riskRatings.lowModerate;
            $rootScope.RiskRating.Moderate = modelObj.riskRatings.moderate;
            $rootScope.RiskRating.ModerateHigh = modelObj.riskRatings.moderateHigh;
            $rootScope.RiskRating.High = modelObj.riskRatings.high;

            if (typeof modelObj.riskRatings.low !== 'undefined' && modelObj.riskRatings.low > 0)
                $rootScope.DefaultRatings.low = modelObj.riskRatings.low;

            if (typeof modelObj.riskRatings.lowModerate !== 'undefined' && modelObj.riskRatings.lowModerate > 0)
                $rootScope.DefaultRatings.lowModerate = modelObj.riskRatings.lowModerate;

            if (typeof modelObj.riskRatings.moderate !== 'undefined' && modelObj.riskRatings.moderate > 0)
                $rootScope.DefaultRatings.moderate = modelObj.riskRatings.moderate;

            if (typeof modelObj.riskRatings.moderateHigh !== 'undefined' && modelObj.riskRatings.moderateHigh > 0)
                $rootScope.DefaultRatings.moderateHigh = modelObj.riskRatings.moderateHigh;

            if (typeof modelObj.riskRatings.high !== 'undefined' && modelObj.riskRatings.high > 0)
                $rootScope.DefaultRatings.high = modelObj.riskRatings.high;
        }
        else {
            $rootScope.RiskRating = {
                ModelKey: '',
                Low: '',
                LowModerate: '',
                Moderate: '',
                ModerateHigh: '',
                High: ''
            }
        }

        if (modelObj.adjustBankData !== null) {
            $rootScope.AdjustBankData.Tier1LeverageRatio = modelObj.adjustBankData.tier1LeverageRatio;
            $rootScope.AdjustBankData.CET1CapitalRatio = modelObj.adjustBankData.ceT1CapitalRatio;
            $rootScope.AdjustBankData.Tier1CapitalRatio = modelObj.adjustBankData.tier1CapitalRatio;
            $rootScope.AdjustBankData.TotalCapitalRatio = modelObj.adjustBankData.totalCapitalRatio;
            $rootScope.AdjustBankData.CommonEquityTier1Capital = modelObj.adjustBankData.commonEquityTier1Capital;
            $rootScope.AdjustBankData.Tier1Capital = modelObj.adjustBankData.tier1Capital;
            $rootScope.AdjustBankData.TotalCapital = modelObj.adjustBankData.totalCapital;
            $rootScope.AdjustBankData.TotalAssetsLeveragePurposes = modelObj.adjustBankData.totalAssetsLeveragePurposes;
            $rootScope.AdjustBankData.TotalRiskWeightedAssets = modelObj.adjustBankData.totalRiskWeightedAssets;
            if (typeof modelObj.adjustBankData.tier1Capital !== 'undefined' && modelObj.adjustBankData.tier1Capital !== null)
                $rootScope.SelectedBankVitals.tier1Capital = modelObj.adjustBankData.tier1Capital;

            if (typeof modelObj.adjustBankData.totalAssetsLeveragePurposes !== 'undefined' && modelObj.adjustBankData.totalAssetsLeveragePurposes !== null)
                $rootScope.SelectedBankVitals.totalAssetsLeveragePurposes = modelObj.adjustBankData.totalAssetsLeveragePurposes;

            if (typeof modelObj.adjustBankData.commonEquityTier1Capital !== 'undefined' && modelObj.adjustBankData.commonEquityTier1Capital !== null)
                $rootScope.SelectedBankVitals.commonEquityTier1Capital = modelObj.adjustBankData.commonEquityTier1Capital;

            if (typeof modelObj.adjustBankData.totalRiskWeightedAssets !== 'undefined' && modelObj.adjustBankData.totalRiskWeightedAssets !== null)
                $rootScope.SelectedBankVitals.totalRiskWeightedAssets = modelObj.adjustBankData.totalRiskWeightedAssets;

            if (typeof modelObj.adjustBankData.totalCapital !== 'undefined' && modelObj.adjustBankData.totalCapital !== null)
                $rootScope.SelectedBankVitals.totalCapital = modelObj.adjustBankData.totalCapital;
        }
        else {
            $rootScope.AdjustBankData = {
                ModelKey: '',
                Tier1LeverageRatio: '',
                CET1CapitalRatio: '',
                Tier1CapitalRatio: '',
                TotalCapitalRatio: '',
                CommonEquityTier1Capital: '',
                Tier1Capital: '',
                TotalCapital: '',
                TotalAssetsLeveragePurposes: '',
                TotalRiskWeightedAssets: ''
            };
        }

        $scope.CheckRiskScore();
        $rootScope.$broadcast('ModelSelectionChanged', 'Banks Vital Data Arrived');
        $('#drawerExample-view-save-model').drawer().hide();
    }

    var getCramDashboardConcepts = function (bankKey, period) {
        angular.element(document.querySelector('#loaderDashboardLinks')).removeClass('hidden');
        $rootScope.SelectedBankVitals = {};
        var dashboardParams = {
            InstitutionKey: bankKey,
            Period: period
        }

        var req = {
            method: 'POST',
            url: '/api/Cram/GetCramDashboardConcepts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dashboardParams
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                angular.element(document.querySelector('#loaderDashboardLinks')).addClass('hidden');
                $rootScope.SelectedBankVitals = result.data;
                if (typeof $rootScope.AdjustBankData.Tier1Capital !== 'undefined' && $rootScope.AdjustBankData.Tier1Capital !== "" && $rootScope.AdjustBankData.Tier1Capital !== null)
                    $rootScope.SelectedBankVitals.tier1Capital = $rootScope.AdjustBankData.Tier1Capital;

                if (typeof $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== 'undefined' && $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== "" && $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== null)
                    $rootScope.SelectedBankVitals.totalAssetsLeveragePurposes = $rootScope.AdjustBankData.TotalAssetsLeveragePurposes;

                if (typeof $rootScope.AdjustBankData.CommonEquityTier1Capital !== 'undefined' && $rootScope.AdjustBankData.CommonEquityTier1Capital !== "" && $rootScope.AdjustBankData.CommonEquityTier1Capital !== null)
                    $rootScope.SelectedBankVitals.commonEquityTier1Capital = $rootScope.AdjustBankData.CommonEquityTier1Capital;

                if (typeof $rootScope.AdjustBankData.TotalRiskWeightedAssets !== 'undefined' && $rootScope.AdjustBankData.TotalRiskWeightedAssets !== "" && $rootScope.AdjustBankData.TotalRiskWeightedAssets !== null)
                    $rootScope.SelectedBankVitals.totalRiskWeightedAssets = $rootScope.AdjustBankData.TotalRiskWeightedAssets;

                if (typeof $rootScope.AdjustBankData.TotalCapital !== 'undefined' && $rootScope.AdjustBankData.TotalCapital !== "" && $rootScope.AdjustBankData.TotalCapital !== null)
                    $rootScope.SelectedBankVitals.totalCapital = $rootScope.AdjustBankData.TotalCapital;
                $rootScope.$broadcast('VitalsArrived', 'Banks Vital Data Arrived');
            }
        }, function () {
            angular.element(document.querySelector('#loaderCramDashboard')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get dashboard concepts. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    $scope.ToggleDataOnBankChange = function ($event, selectedBankObj) {
        $rootScope.SelectedBank = selectedBankObj;
        $scope.SelectedBankName = selectedBankObj.institutionName;
        $scope.SelectedBankCertNumber = selectedBankObj.certNumber;

        angular.element(document.querySelector('#loaderDashboardLinks')).removeClass('hidden');
        getCramDashboardConcepts($rootScope.SelectedBank.institutionKey, $rootScope.SelectedPeriod.value);
    }

    var GetModelsForUser = function (selectModelKey) {
        var req = {
            method: 'GET',
            url: '/api/Cram/GetModels',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {

                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
                $scope.CramModels = [];
                $scope.CramModels = result.data;
                if (selectModelKey > -1) {
                    var selectedModel = $scope.CramModels.filter(function (obj) {
                        return obj.modelKey === selectModelKey;
                    })[0];

                    if (typeof selectedModel !== 'undefined') {
                        selectedModel.isSelected = true;
                    }
                }
            }
            else {
                //show error message
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get models. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var GetUserInfo = function () {
        var req = {
            method: 'GET',
            url: '/api/Cram/GetUserKey',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
                $scope.UserInfo = result.data;
            }
            else {
                //show error message
            }
        }, function () {
            angular.element(document.querySelector('#loaderDashboardLinks')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get user information. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var getFavoriteBanks = function () {
        //angular.element(document.querySelector('#loaderCramDashboard')).removeClass('hidden');
        var selectedBank = {};
        var defBankFound = false;
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
                        selectedBank = $scope.FavoriteBanks[i];
                        defBankFound = true;
                        break;
                    }
                }

                if (defBankFound) {
                    $rootScope.SelectedBank = selectedBank;
                    $scope.SelectedBankName = selectedBank.institutionName;
                    $scope.SelectedBankCertNumber = selectedBank.certNumber;
                    $rootScope.$broadcast('DefaultBankSelected', 'Default bank selected');
                    getPastFiveQuarters();
                }
                else {
                    $scope.toggleErrorMessageBoxModal('You dont seem to have a default bank. Please make one bank as default bank.');
                }

            }
        }, function () {
            angular.element(document.querySelector('#loaderDashboardLinks')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get favorite banks. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    $scope.GoToBankProfile = function ($event, rankDataObj) {
        $rootScope.ShowBankProfileForInstitutionKey = $rootScope.SelectedBank.institutionKey;
        $rootScope.template = 'ProfileOverview';
    }

    $scope.AddToFavorite = function ($event, bankObj) {
        document.getElementById('overlay').style.display = '';
        var addToFavoriteParam = {
            InstitutionKey: bankObj.institutionKey
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

            $scope.toggleSuccessMessageBoxModal(result.data);
            document.getElementById('overlay').style.display = 'none';
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to add the bank as favorite bank. Please send an e-mail to admin@cb-resource.com.');
            document.getElementById('overlay').style.display = 'none';
        });
    }

    var getDefaultRatings = function () {
        //angular.element(document.querySelector('#loaderCramDashboard')).removeClass('hidden');

        var req = {
            method: 'GET',
            url: '/api/Cram/GetDefaultRatings',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                $rootScope.DefaultRatings = result.data;
                if (typeof $rootScope.RiskRating.Low !== 'undefined' && $rootScope.RiskRating.Low !== '' && $rootScope.RiskRating.Low !== null)
                    $rootScope.DefaultRatings.low = $rootScope.RiskRating.Low;
                if (typeof $rootScope.RiskRating.LowModerate !== 'undefined' && $rootScope.RiskRating.LowModerate !== '' && $rootScope.RiskRating.LowModerate !== null)
                    $rootScope.DefaultRatings.lowModerate = $rootScope.RiskRating.LowModerate;
                if (typeof $rootScope.RiskRating.Moderate !== 'undefined' && $rootScope.RiskRating.Moderate !== '' && $rootScope.RiskRating.Moderate !== null)
                    $rootScope.DefaultRatings.moderate = $rootScope.RiskRating.Moderate;
                if (typeof $rootScope.RiskRating.ModerateHigh !== 'undefined' && $rootScope.RiskRating.ModerateHigh !== '' && $rootScope.RiskRating.ModerateHigh !== null)
                    $rootScope.DefaultRatings.moderateHigh = $rootScope.RiskRating.ModerateHigh;
                if (typeof $rootScope.RiskRating.High !== 'undefined' && $rootScope.RiskRating.High !== '' && $rootScope.RiskRating.High !== null)
                    $rootScope.DefaultRatings.high = $rootScope.RiskRating.High;

                getCramDashboardConcepts($rootScope.SelectedBank.institutionKey, $scope.SelectedPeriod.value);
            }

        }, function () {
            angular.element(document.querySelector('#loaderDashboardLinks')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get default ratings. Please send an e-mail to admin@cb-resource.com.');
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
                $rootScope.SelectedPeriod = $scope.Periods[0];
                getDefaultRatings();
            }
        }, function () {
            angular.element(document.querySelector('#loaderDashboardLinks')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while loading the financial periods. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var initialize = function () {
        GetUserInfo();
        getFavoriteBanks();
        getSelectedModelName();
    }

    $scope.CheckRiskScore = function () {
        var total = 0;
        var res = "";
        $scope.RiskScoreErr = "";

        if ($scope.RiskCategoriesAndWeights.CreditRiskWeight != "" && $scope.RiskCategoriesAndWeights.CreditRiskWeight != undefined)
            total = parseFloat(total) + parseFloat($scope.RiskCategoriesAndWeights.CreditRiskWeight);

        if ($scope.RiskCategoriesAndWeights.InterestRateRiskWeight != "" && $scope.RiskCategoriesAndWeights.InterestRateRiskWeight != undefined)
            total = parseFloat(total) + parseFloat($scope.RiskCategoriesAndWeights.InterestRateRiskWeight);

        if ($scope.RiskCategoriesAndWeights.LiquidityRiskWeight != "" && $scope.RiskCategoriesAndWeights.LiquidityRiskWeight != undefined)
            total = parseFloat(total) + parseFloat($scope.RiskCategoriesAndWeights.LiquidityRiskWeight);

        if ($scope.RiskCategoriesAndWeights.OperationalRiskWeight != "" && $scope.RiskCategoriesAndWeights.OperationalRiskWeight != undefined)
            total = parseFloat(total) + parseFloat($scope.RiskCategoriesAndWeights.OperationalRiskWeight);

        if ($scope.RiskCategoriesAndWeights.ComplianceRiskWeight != "" && $scope.RiskCategoriesAndWeights.ComplianceRiskWeight != undefined)
            total = parseFloat(total) + parseFloat($scope.RiskCategoriesAndWeights.ComplianceRiskWeight);

        if ($scope.RiskCategoriesAndWeights.StrategicRiskWeight != "" && $scope.RiskCategoriesAndWeights.StrategicRiskWeight != undefined)
            total = parseFloat(total) + parseFloat($scope.RiskCategoriesAndWeights.StrategicRiskWeight);

        if ($scope.RiskCategoriesAndWeights.ReputationRiskWeight != "" && $scope.RiskCategoriesAndWeights.ReputationRiskWeight != undefined)
            total = parseFloat(total) + parseFloat($scope.RiskCategoriesAndWeights.ReputationRiskWeight);

        if (parseFloat(total) < 100)
            res = "Ensure sum is equal to 100.";
        else if (parseFloat(total) > 100)
            res = "Ensure sum is equal to 100.";
        else
            res = "";

        $scope.TotalRiskWeight = total;

        $scope.RiskScoreErr = res;
    }

    $scope.FeatureInProgress = function () {
        $scope.toggleErrorMessageBoxModal('Export feature is under development. It will be back soon.');
    }

    $scope.ExportToExcelCRAM = function () {
        var modelkey = -1;
        if ($scope.CramModels.length > 0) {
            var selectedModel = $scope.CramModels.filter(function (obj) {
                return obj.isSelected === true;
            })[0];

            if (typeof selectedModel !== 'undefined' && selectedModel !== null) {
                modelkey = selectedModel.modelKey;
            }
        }
        if (modelkey > 0) {
            var dashboardParam = {
                InstitutionKey: $rootScope.SelectedBank.institutionKey,
                Period: $scope.SelectedPeriod.value,
                ModelKey: modelkey,
                CramModelName: $rootScope.CramModelDisplayName
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
            $.fileDownload('/Api/Cram/GetCramExporttoExcel', req);
        }
        else {
            $scope.toggleErrorMessageBoxModal('Please select a model to export calculations.');
        }
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("cramDashboardViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.Periods = [];

    $scope.LeverBanksMinimumPolicy = 0;
    $scope.CETBanksMinimumPolicy = 0;
    $scope.Tier1BanksMinimumPolicy = 0;
    $scope.TotalBanksMinimumPolicy = 0;
    $scope.CompositeRiskScoreCreditRisk = 0;
    $scope.CompositeRiskScoreInterestRateRisk = 0;
    $scope.CompositeRiskScoreLiquidityRisk = 0;
    $scope.CompositeRiskScoreOperationalRisk = 0;
    $scope.CompositeRiskScoreComplianceRisk = 0;
    $scope.CompositeRiskScoreStrategicRisk = 0;
    $scope.CompositeRiskScoreReputationRisk = 0;
    $scope.RiskRatingCreditRisk = 0;
    $scope.RiskRatingInterestRateRisk = 0;
    $scope.RiskRatingOperationalRisk = 0;
    $scope.RiskRatingComplianceRisk = 0;
    $scope.RiskRatingStrategicRisk = 0;
    $scope.RiskRatingReputationRisk = 0;
    $scope.RiskWeightingCreditRisk = 0;
    $scope.RiskWeightingInterestRateRisk = 0;
    $scope.RiskWeightingLiquidityRisk = 0;
    $scope.RiskWeightingOperationalRisk = 0;
    $scope.RiskWeightingComplianceRisk = 0;
    $scope.RiskWeightingStrategicRisk = 0;
    $scope.RiskWeightingReputationRisk = 0;
    $scope.CapitalRiskBufferCreditRisk = 0;
    $scope.CapitalRiskBufferInterestRateRisk = 0;
    $scope.CapitalRiskBufferLiquidityRisk = 0;
    $scope.CapitalRiskBufferOperationalRisk = 0;
    $scope.CapitalRiskBufferComplianceRisk = 0;
    $scope.CapitalRiskBufferStrategicRisk = 0;
    $scope.CapitalRiskBufferReputationRisk = 0;
    $scope.WeightedRiskBufferCreditRisk = 0;
    $scope.WeightedRiskBufferInterestRateRisk = 0;
    $scope.WeightedRiskBufferLiquidityRisk = 0;
    $scope.WeightedRiskBufferOperationalRisk = 0;
    $scope.WeightedRiskBufferComplianceRisk = 0;
    $scope.WeightedRiskBufferStrategicRisk = 0;
    $scope.WeightedRiskBufferReputationRisk = 0;
    $scope.TotalCompositeRiskScore = 0;
    $scope.TotalRiskWeighting = 0;
    $scope.TotalWeightedRiskBuffer = 0;
    $scope.Tier1LeverageCapitalInterestRateRisk = 0;
    $scope.Tier1LeverageCapitalLiquidityRisk = 0;
    $scope.Tier1LeverageCapitalOperationalRisk = 0;
    $scope.Tier1LeverageCapitalComplianceRisk = 0;
    $scope.Tier1LeverageCapitalStrategicRisk = 0;
    $scope.Tier1LeverageCapitalReputationRisk = 0;
    $scope.TotalTier1LeverageCapital = 0;
    $scope.Cet1CapitalCreditRisk = 0;
    $scope.Cet1CapitalInterestRateRisk = 0;
    $scope.Cet1CapitalLiquidityRisk = 0;
    $scope.Cet1CapitalOperationalRisk = 0;
    $scope.Cet1CapitalComplianceRisk = 0;
    $scope.Cet1CapitalStrategicRisk = 0;
    $scope.Cet1CapitalReputationRisk = 0;
    $scope.TotalCet1Capital = 0;
    $scope.Tier1CapitalCreditRisk = 0;
    $scope.Tier1CapitalInterestRateRisk = 0;
    $scope.Tier1CapitalLiquidityRisk = 0;
    $scope.Tier1CapitalOperationalRisk = 0;
    $scope.Tier1CapitalComplianceRisk = 0;
    $scope.Tier1CapitalStrategicRisk = 0;
    $scope.Tier1CapitalReputationRisk = 0;
    $scope.TotalTier1Capital = 0;
    $scope.TotalCapitalCreditRisk = 0;
    $scope.TotalCapitalInterestRateRisk = 0;
    $scope.TotalCapitalLiquidityRisk = 0;
    $scope.TotalCapitalOperationalRisk = 0;
    $scope.TotalCapitalComplianceRisk = 0;
    $scope.TotalCapitalStrategicRisk = 0;
    $scope.TotalCapitalReputationRisk = 0;
    $scope.TotalTotalCapital = 0;
    $scope.LeverRegulatoryMinimumWeightedRiskBuffer = 0;
    $scope.LeverImpliedMinimumWeightedRiskBuffer = 0;
    $scope.LeverBanksMinimumWeightedRiskBuffer = 0;
    $scope.LeverBanksMinimumLessImpliedMinimumWeightedRiskBuffer = 0;
    $scope.LeverBanksTier1LeverageRatioWeightedRiskBuffer = 0;
    $scope.LeverRiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer = 0;
    $scope.LeverBufferImpliedMinimumWeightedRiskBuffer = 0;
    $scope.LeverBufferBanksMinimumWeightedRiskBuffer = 0;
    $scope.LeverTier1LeverageLessBanksMinimumWeightedRiskBuffer = 0;
    $scope.LeverActualTier1LeverageRatioWeightedRiskBuffer = 0;
    $scope.LeverRegulatoryMinimumCapital = 0;
    $scope.LeverImpliedMinimumCapital = 0;
    $scope.LeverBanksMinimumCapital = 0;
    $scope.LeverBanksMinimumLessImpliedMinimumCapital = 0;
    $scope.LeverBanksTier1LeverageRatioCapital = 0;
    $scope.LeverRiskAssessBufferTier1LeverageLessImpliedMinCapital = 0;
    $scope.LeverBufferImpliedMinimumCapital = 0;
    $scope.LeverBufferBanksMinimumCapital = 0;
    $scope.LeverTier1LeverageLessBanksMinimumCapital = 0;
    $scope.LeverActualTier1LeverageRatioCapital = 0;
    $scope.CETRegulatoryMinimumWeightedRiskBuffer = 0;
    $scope.CETImpliedMinimumWeightedRiskBuffer = 0;
    $scope.CETBanksMinimumWeightedRiskBuffer = 0;
    $scope.CETBanksMinimumLessImpliedMinimumWeightedRiskBuffer = 0;
    $scope.CETBanksCet1CapitalRatioWeightedRiskBuffer = 0;
    $scope.CETRiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer = 0;
    $scope.CETBufferImpliedMinimumWeightedRiskBuffer = 0;
    $scope.CETBufferBanksMinimumWeightedRiskBuffer = 0;
    $scope.CETCet1CapitalLessBanksMinimumWeightedRiskBuffer = 0;
    $scope.CETActualCet1CapitalRatioWeightedRiskBuffer = 0;
    $scope.CETRegulatoryMinimumCapital = 0;
    $scope.CETImpliedMinimumCapital = 0;
    $scope.CETBanksMinimumCapital = 0;
    $scope.CETBanksMinimumLessImpliedMinimumCapital = 0;
    $scope.CETBanksCet1CapitalRatioCapital = 0;
    $scope.CETRiskAssessBufferCet1CapitalLessImpliedMinCapital = 0;
    $scope.CETBufferImpliedMinimumCapital = 0;
    $scope.CETBufferBanksMinimumCapital = 0;
    $scope.CETCet1CapitalLessBanksMinimumCapital = 0;
    $scope.CETActualCet1CapitalRatioCapital = 0;
    $scope.Tier1RegulatoryMinimumWeightedRiskBuffer = 0;
    $scope.Tier1ImpliedMinimumWeightedRiskBuffer = 0;
    $scope.Tier1BanksMinimumWeightedRiskBuffer = 0;
    $scope.Tier1BanksMinimumLessImpliedMinimumWeightedRiskBuffer = 0;
    $scope.Tier1BanksTier1CapitalRatioWeightedRiskBuffer = 0;
    $scope.Tier1RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer = 0;
    $scope.Tier1BufferImpliedMinimumWeightedRiskBuffer = 0;
    $scope.Tier1BufferBanksMinimumWeightedRiskBuffer = 0;
    $scope.Tier1Tier1CapitalLessBanksMinimumWeightedRiskBuffer = 0;
    $scope.Tier1ActualTier1CapitalRatio = 0;
    $scope.Tier1RegulatoryMinimumCapital = 0;
    $scope.Tier1ImpliedMinimumCapital = 0;
    $scope.Tier1BanksMinimumCapital = 0;
    $scope.Tier1BanksMinimumLessImpliedMinimumCapital = 0;
    $scope.Tier1BanksTier1CapitalRatioCapital = 0;
    $scope.Tier1RiskAssessBufferTier1CapitalLessImpliedMinCapital = 0;
    $scope.Tier1BufferImpliedMinimumCapital = 0;
    $scope.Tier1BufferBanksMinimumCapital = 0;
    $scope.Tier1Tier1CapitalLessBanksMinimumCapital = 0;
    $scope.Tier1ActualTier1CapitalRatioCapital = 0;
    $scope.TotalRegulatoryMinimumWeightedRiskBuffer = 0;
    $scope.TotalImpliedMinimumWeightedRiskBuffer = 0;
    $scope.TotalBanksMinimumWeightedRiskBuffer = 0;
    $scope.TotalBanksMinimumLessImpliedMinimumWeightedRiskBuffer = 0;
    $scope.TotalBanksTotalCapitalRatioWeightedRiskBuffer = 0;
    $scope.TotalRiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer = 0;
    $scope.TotalBufferImpliedMinimumWeightedRiskBuffer = 0;
    $scope.TotalBufferBanksMinimumWeightedRiskBuffer = 0;
    $scope.TotalTotalCapitalLessBanksMinimumWeightedRiskBuffer = 0;
    $scope.TotalActualTotalCapitalRatioWeightedRiskBuffer = 0;
    $scope.TotalRegulatoryMinimumCapital = 0;
    $scope.TotalImpliedMinimumCapital = 0;
    $scope.TotalBanksMinimumCapital = 0;
    $scope.TotalBanksMinimumLessImpliedMinimumCapital = 0;
    $scope.TotalBanksTotalCapitalRatioCapital = 0;
    $scope.TotalRiskAssessBufferTotalCapitalLessImpliedMinCapital = 0;
    $scope.TotalBufferImpliedMinimumCapital = 0;
    $scope.TotalBufferBanksMinimumCapital = 0;
    $scope.TotalTotalCapitalLessBanksMinimumCapital = 0;
    $scope.TotalActualTotalCapitalRatioCapital = 0;

    var getSelectedModelName = function () {
        $rootScope.CramModelDisplayName = 'Create/Edit Scenario';

        if ($scope.CramModels.length > 0) {
            var selectedModel = $scope.CramModels.filter(function (obj) {
                return obj.isSelected === true;
            })[0];

            if (typeof selectedModel !== 'undefined' && selectedModel !== null) {
                $rootScope.CramModelDisplayName = selectedModel.modelName;
            }
        }
        else {
            $rootScope.CramModelDisplayName = 'Create/Edit Scenario';
        }
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else {
            return $filter('number')(numericValue, fractionSize);
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

    $scope.ShowSearchBankDrawer = function ($event) {
        $('#drawerExample').drawer().show();
    }

    $scope.HideSearchBankDrawer = function ($event) {
        $('#drawerExample').drawer().hide();
    }

    var getCramDashboardConcepts = function (bankKey, period) {
        $rootScope.SelectedBankVitals = {};
        var dashboardParams = {
            InstitutionKey: bankKey,
            Period: period
        }

        var req = {
            method: 'POST',
            url: '/api/Cram/GetCramDashboardConcepts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dashboardParams
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
                $rootScope.SelectedBankVitals = result.data;
                doCalculations();
            }
        }, function () {
            angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get dashboard concepts. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var getPastFiveQuarters = function () {
        //angular.element(document.querySelector('#incomeStatementDataLoader')).removeClass('hidden');
        var req = {
            method: 'GET',
            url: '/api/BankToBankAnalyzer/GetLastFiveQuarters',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {

                //angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
                $scope.Periods = result.data;
                $rootScope.SelectedPeriod = $scope.Periods[0];
                getCramDashboardConcepts($rootScope.SelectedBank.institutionKey, $scope.SelectedPeriod.value);
            }
        }, function () {
            angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while loading the financial periods. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var renderTotalCapitalRatioChart = function (chartContainerName, chartData, yAxisLabel) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": "Capital Risk Allocation Model",
                    "subCaption": "Total Capital Ratio",
                    "showBorder": "1",
                    "borderColor": "#cccccc",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": "#E0A025,#F4D00c,#0093D1,#173967,#A71D23",
                    "bgColor": "#ffffff",
                    "borderAlpha": "20",
                    "canvasBorderAlpha": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "rotatevalues": "0",
                    "valueFontColor": "#00000",
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
                    "decimals": "4",
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
                var totalCapitalRatioChart = FusionCharts.items.totalCapitalRatioBarChartDashboard;
                if (typeof totalCapitalRatioChart === 'undefined') {
                    totalCapitalRatioChart = new FusionCharts({
                        type: 'column2d',
                        id: 'totalCapitalRatioBarChartDashboard',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });

                    totalCapitalRatioChart.render();
                }
                else {
                    totalCapitalRatioChart.setChartData(dSource, 'json');
                    totalCapitalRatioChart.render();
                }
            } // if block ends here
        });
    }

    var renderTier1CapitalRatioChart = function (chartContainerName, chartData, yAxisLabel) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": "Capital Risk Allocation Model",
                    "subCaption": "Tier 1 Risk-Based Capital Ratio",
                    "showBorder": "1",
                    "borderColor": "#cccccc",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": "#E0A025,#F4D00c,#0093D1,#173967,#A71D23",
                    "bgColor": "#ffffff",
                    "borderAlpha": "20",
                    "canvasBorderAlpha": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "rotatevalues": "0",
                    "valueFontColor": "#00000",
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
                    "decimals": "4",
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
                var tier1CapitalRatioChart = FusionCharts.items.tier1CapitalRatioBarChartDashboard;
                if (typeof tier1CapitalRatioChart === 'undefined') {
                    tier1CapitalRatioChart = new FusionCharts({
                        type: 'column2d',
                        id: 'tier1CapitalRatioBarChartDashboard',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });

                    tier1CapitalRatioChart.render();
                }
                else {
                    tier1CapitalRatioChart.setChartData(dSource, 'json');
                    tier1CapitalRatioChart.render();
                }
            } // if block ends here
        });
    }

    var renderCet1CapitalRatioChart = function (chartContainerName, chartData, yAxisLabel) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": "Capital Risk Allocation Model",
                    "subCaption": "CET1 Capital Ratio",
                    "showBorder": "1",
                    "borderColor": "#cccccc",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": "#E0A025,#F4D00c,#0093D1,#173967,#A71D23",
                    "bgColor": "#ffffff",
                    "borderAlpha": "20",
                    "canvasBorderAlpha": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "rotatevalues": "0",
                    "valueFontColor": "#00000",
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
                    "decimals": "4",
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
                var cet1CapitalRatioChart = FusionCharts.items.cet1CapitalRatioBarChartDashboard;
                if (typeof cet1CapitalRatioChart === 'undefined') {
                    cet1CapitalRatioChart = new FusionCharts({
                        type: 'column2d',
                        id: 'cet1CapitalRatioBarChartDashboard',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });

                    cet1CapitalRatioChart.render();
                }
                else {
                    cet1CapitalRatioChart.setChartData(dSource, 'json');
                    cet1CapitalRatioChart.render();
                }
            } // if block ends here
        });
    }

    var renderLeverageCapitalRatioChart = function (chartContainerName, chartData, yAxisLabel) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": "Capital Risk Allocation Model",
                    "subCaption": "Tier 1 Leverage Ratio",
                    "showBorder": "1",
                    "borderColor": "#cccccc",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": "#E0A025,#F4D00c,#0093D1,#173967,#A71D23",
                    "bgColor": "#ffffff",
                    "borderAlpha": "20",
                    "canvasBorderAlpha": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "rotatevalues": "0",
                    "valueFontColor": "#00000",
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
                    "decimals": "4",
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
                var tier1CapitalRatioChart = FusionCharts.items.tier1LeverageRatioBarChartDashboard;
                if (typeof tier1CapitalRatioChart === 'undefined') {
                    tier1CapitalRatioChart = new FusionCharts({
                        type: 'column2d',
                        id: 'tier1LeverageRatioBarChartDashboard',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });

                    tier1CapitalRatioChart.render();
                }
                else {
                    tier1CapitalRatioChart.setChartData(dSource, 'json');
                    tier1CapitalRatioChart.render();
                }
            } // if block ends here
        });
    }

    var leverBanksMinimumPolicy = function () {
        $scope.LeverBanksMinimumPolicy = 0;

        if ($rootScope.AdjustBankData.Tier1LeverageRatio === '' || $rootScope.AdjustBankData.Tier1LeverageRatio === null)
            $scope.LeverBanksMinimumPolicy = '8';
        else
            $scope.LeverBanksMinimumPolicy = $rootScope.AdjustBankData.Tier1LeverageRatio;
    }

    var cETBanksMinimumPolicy = function () {
        $scope.CETBanksMinimumPolicy = 0;

        if ($rootScope.AdjustBankData.CET1CapitalRatio === '' || $rootScope.AdjustBankData.CET1CapitalRatio === null)
            $scope.CETBanksMinimumPolicy = '8';
        else
            $scope.CETBanksMinimumPolicy = $rootScope.AdjustBankData.CET1CapitalRatio;
    }

    var tier1BanksMinimumPolicy = function () {
        $scope.Tier1BanksMinimumPolicy = 0;
        if ($rootScope.AdjustBankData.Tier1CapitalRatio === '' || $rootScope.AdjustBankData.Tier1CapitalRatio === null)
            $scope.Tier1BanksMinimumPolicy = '9';
        else
            $scope.Tier1BanksMinimumPolicy = $rootScope.AdjustBankData.Tier1CapitalRatio;
    }

    var totalBanksMinimumPolicy = function () {
        $scope.TotalBanksMinimumPolicy = 0;
        if ($rootScope.AdjustBankData.TotalCapitalRatio === '' || $rootScope.AdjustBankData.TotalCapitalRatio === null)
            $scope.TotalBanksMinimumPolicy = '11';
        else
            $scope.TotalBanksMinimumPolicy = $rootScope.AdjustBankData.TotalCapitalRatio;
    }

    var countblank = function () {
        var count = 0;
        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === null)
            count++;

        return count;
    }

    var compositeRiskScoreCreditRisk = function () {
        $scope.CompositeRiskScoreCreditRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.CreditRisk === '' || $rootScope.RiskCategoriesAndWeights.CreditRisk === null)
            $scope.CompositeRiskScoreCreditRisk = 0;
        else
            $scope.CompositeRiskScoreCreditRisk = $rootScope.RiskCategoriesAndWeights.CreditRisk;
    };

    var compositeRiskScoreInterestRateRisk = function () {
        $scope.CompositeRiskScoreInterestRateRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.InterestRateRisk === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRisk === null)
            $scope.CompositeRiskScoreInterestRateRisk = 0;
        else
            $scope.CompositeRiskScoreInterestRateRisk = $rootScope.RiskCategoriesAndWeights.InterestRateRisk;
    };

    var compositeRiskScoreLiquidityRisk = function () {
        $scope.CompositeRiskScoreLiquidityRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.LiquidityRisk === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRisk === null)
            $scope.CompositeRiskScoreLiquidityRisk = 0;
        else
            $scope.CompositeRiskScoreLiquidityRisk = $rootScope.RiskCategoriesAndWeights.LiquidityRisk;
    };

    var compositeRiskScoreOperationalRisk = function () {
        $scope.CompositeRiskScoreOperationalRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.OperationalRisk === '' || $rootScope.RiskCategoriesAndWeights.OperationalRisk === null)
            $scope.CompositeRiskScoreOperationalRisk = 0;
        else
            $scope.CompositeRiskScoreOperationalRisk = $rootScope.RiskCategoriesAndWeights.OperationalRisk;
    };

    var compositeRiskScoreComplianceRisk = function () {
        $scope.CompositeRiskScoreComplianceRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.ComplianceRisk === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRisk === null)
            $scope.CompositeRiskScoreComplianceRisk = 0;
        else
            $scope.CompositeRiskScoreComplianceRisk = $rootScope.RiskCategoriesAndWeights.ComplianceRisk;
    };

    var compositeRiskScoreStrategicRisk = function () {
        $scope.CompositeRiskScoreStrategicRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.StrategicRisk === '' || $rootScope.RiskCategoriesAndWeights.StrategicRisk === null)
            $scope.CompositeRiskScoreStrategicRisk = 0;
        else
            $scope.CompositeRiskScoreStrategicRisk = $rootScope.RiskCategoriesAndWeights.StrategicRisk;
    };

    var compositeRiskScoreReputationRisk = function () {
        $scope.CompositeRiskScoreReputationRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.ReputationRisk === '' || $rootScope.RiskCategoriesAndWeights.ReputationRisk === null)
            $scope.CompositeRiskScoreReputationRisk = 0;
        else
            $scope.CompositeRiskScoreReputationRisk = $rootScope.RiskCategoriesAndWeights.ReputationRisk;
    };

    $scope.GetRatingColorClass = function (rating) {
        var ratingclass = '';

        if (rating === 'Low')
            ratingclass = 'green-color';
        else if (rating === 'Low-Moderate')
            ratingclass = 'light-green-color';
        else if (rating === 'Moderate')
            ratingclass = 'yellow-color';
        else if (rating === 'Moderate-High')
            ratingclass = 'orange-color';
        else if (rating === 'High')
            ratingclass = 'red-color';
        else
            ratingclass = 'grey-color';

        return ratingclass;
    }

    var riskRatingCreditRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreCreditRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingCreditRisk = rating;
    };

    var riskRatingInterestRateRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingInterestRateRisk = rating;
    };

    var riskRatingLiquidityRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingLiquidityRisk = rating;
    };

    var riskRatingOperationalRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingOperationalRisk = rating;
    };

    var riskRatingComplianceRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingComplianceRisk = rating;
    };

    var riskRatingStrategicRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingStrategicRisk = rating;
    };

    var riskRatingReputationRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreReputationRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingReputationRisk = rating;
    };

    var riskWeightingCreditRisk = function () {
        $scope.RiskWeightingCreditRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === 'undefined') {
            $scope.RiskWeightingCreditRisk = 0;
        }
        else {
            $scope.RiskWeightingCreditRisk = $rootScope.RiskCategoriesAndWeights.CreditRiskWeight;
        }
    };

    var riskWeightingInterestRateRisk = function () {
        $scope.RiskWeightingInterestRateRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === 'undefined') {
            $scope.RiskWeightingInterestRateRisk = 0;
        }
        else {
            $scope.RiskWeightingInterestRateRisk = $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight;
        }
    };

    var riskWeightingLiquidityRisk = function () {
        $scope.RiskWeightingLiquidityRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === 'undefined') {
            $scope.RiskWeightingLiquidityRisk = 0;
        }
        else {
            $scope.RiskWeightingLiquidityRisk = $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight;
        }
    };

    var riskWeightingOperationalRisk = function () {
        $scope.RiskWeightingOperationalRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === 'undefined') {
            $scope.RiskWeightingOperationalRisk = 0;
        }
        else {
            $scope.RiskWeightingOperationalRisk = $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight;
        }
    };

    var riskWeightingComplianceRisk = function () {
        $scope.RiskWeightingComplianceRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === 'undefined') {
            $scope.RiskWeightingComplianceRisk = 0;
        }
        else {
            $scope.RiskWeightingComplianceRisk = $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight;
        }
    };

    var riskWeightingStrategicRisk = function () {
        $scope.RiskWeightingStrategicRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === 'undefined') {
            $scope.RiskWeightingStrategicRisk = 0;
        }
        else {
            $scope.RiskWeightingStrategicRisk = $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight;
        }
    };

    var riskWeightingReputationRisk = function () {
        $scope.RiskWeightingReputationRisk = 0;
        if ($rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === 'undefined') {
            $scope.RiskWeightingReputationRisk = 0;
        }
        else {
            $scope.RiskWeightingReputationRisk = $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight;
        }
    };

    var capitalRiskBufferCreditRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreCreditRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferCreditRisk = riskBuffer;
    };

    var capitalRiskBufferInterestRateRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferInterestRateRisk = riskBuffer;
    };

    var capitalRiskBufferLiquidityRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferLiquidityRisk = riskBuffer;
    };

    var capitalRiskBufferOperationalRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferOperationalRisk = riskBuffer;
    };

    var capitalRiskBufferComplianceRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferComplianceRisk = riskBuffer;
    };

    var capitalRiskBufferStrategicRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferStrategicRisk = riskBuffer;
    };

    var capitalRiskBufferReputationRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreReputationRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferReputationRisk = riskBuffer;
    };

    var weightedRiskBufferCreditRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingCreditRisk) > 0 && parseFloat($scope.CapitalRiskBufferCreditRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingCreditRisk) * parseFloat($scope.CapitalRiskBufferCreditRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferCreditRisk = riskBuffer;
    };

    var weightedRiskBufferInterestRateRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingInterestRateRisk) > 0 && parseFloat($scope.CapitalRiskBufferInterestRateRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingInterestRateRisk) * parseFloat($scope.CapitalRiskBufferInterestRateRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferInterestRateRisk = riskBuffer;
    };

    var weightedRiskBufferLiquidityRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingLiquidityRisk) > 0 && parseFloat($scope.CapitalRiskBufferLiquidityRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingLiquidityRisk) * parseFloat($scope.CapitalRiskBufferLiquidityRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferLiquidityRisk = riskBuffer;
    };

    var weightedRiskBufferOperationalRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingOperationalRisk) > 0 && parseFloat($scope.CapitalRiskBufferOperationalRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingOperationalRisk) * parseFloat($scope.CapitalRiskBufferOperationalRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferOperationalRisk = riskBuffer;
    };

    var weightedRiskBufferComplianceRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingComplianceRisk) > 0 && parseFloat($scope.CapitalRiskBufferComplianceRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingComplianceRisk) * parseFloat($scope.CapitalRiskBufferComplianceRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferComplianceRisk = riskBuffer;
    };

    var weightedRiskBufferStrategicRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingStrategicRisk) > 0 && parseFloat($scope.CapitalRiskBufferStrategicRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingStrategicRisk) * parseFloat($scope.CapitalRiskBufferStrategicRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferStrategicRisk = riskBuffer;
    };

    var weightedRiskBufferReputationRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingReputationRisk) > 0 && parseFloat($scope.CapitalRiskBufferReputationRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingReputationRisk) * parseFloat($scope.CapitalRiskBufferReputationRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferReputationRisk = riskBuffer;
    };

    var totalCompositeRiskScore = function () {
        var totalCompositeScore = '';
        try {
            var mul1 = parseFloat($scope.CompositeRiskScoreCreditRisk) * parseFloat($scope.RiskWeightingCreditRisk);
            var mul2 = parseFloat($scope.CompositeRiskScoreInterestRateRisk) * parseFloat($scope.RiskWeightingInterestRateRisk);
            var mul3 = parseFloat($scope.CompositeRiskScoreLiquidityRisk) * parseFloat($scope.RiskWeightingLiquidityRisk);
            var mul4 = parseFloat($scope.CompositeRiskScoreOperationalRisk) * parseFloat($scope.RiskWeightingOperationalRisk);
            var mul5 = parseFloat($scope.CompositeRiskScoreComplianceRisk) * parseFloat($scope.RiskWeightingComplianceRisk);
            var mul6 = parseFloat($scope.CompositeRiskScoreStrategicRisk) * parseFloat($scope.RiskWeightingStrategicRisk);
            var mul7 = parseFloat($scope.CompositeRiskScoreReputationRisk) * parseFloat($scope.RiskWeightingReputationRisk);
            var sum = mul1 + mul2 + mul3 + mul4 + mul5 + mul6 + mul7;
            totalCompositeScore = sum / $scope.TotalRiskWeighting;
        }
        catch (err) {
            sum = parseInt($scope.CompositeRiskScoreCreditRisk) +
                parseInt($scope.CompositeRiskScoreInterestRateRisk) +
                parseInt($scope.CompositeRiskScoreLiquidityRisk) +
                parseInt($scope.CompositeRiskScoreOperationalRisk) +
                parseInt($scope.CompositeRiskScoreComplianceRisk) +
                parseInt($scope.CompositeRiskScoreStrategicRisk) +
                parseInt($scope.CompositeRiskScoreReputationRisk);
            totalCompositeScore = sum / 7;
        }

        $scope.TotalCompositeRiskScore = totalCompositeScore;
    };

    var totalRiskWeighting = function () {
        var total = 0;
        total = parseFloat($scope.RiskWeightingCreditRisk) +
            parseFloat($scope.RiskWeightingInterestRateRisk) +
            parseFloat($scope.RiskWeightingLiquidityRisk) +
            parseFloat($scope.RiskWeightingOperationalRisk) +
            parseFloat($scope.RiskWeightingComplianceRisk) +
            parseFloat($scope.RiskWeightingStrategicRisk) +
            parseFloat($scope.RiskWeightingReputationRisk);

        $scope.TotalRiskWeighting = total;
    };

    var totalWeightedRiskBuffer = function () {
        var total = 0;
        total = parseFloat($scope.WeightedRiskBufferCreditRisk) +
            parseFloat($scope.WeightedRiskBufferInterestRateRisk) +
            parseFloat($scope.WeightedRiskBufferLiquidityRisk) +
            parseFloat($scope.WeightedRiskBufferOperationalRisk) +
            parseFloat($scope.WeightedRiskBufferComplianceRisk) +
            parseFloat($scope.WeightedRiskBufferStrategicRisk) +
            parseFloat($scope.WeightedRiskBufferReputationRisk);

        $scope.TotalWeightedRiskBuffer = total;
    };

    var tier1LeverageCapitalInterestRateRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferInterestRateRisk === '' || $scope.WeightedRiskBufferInterestRateRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
        }

        $scope.Tier1LeverageCapitalInterestRateRisk = tier1capital;
    };

    var tier1LeverageCapitalLiquidityRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferLiquidityRisk === '' || $scope.WeightedRiskBufferLiquidityRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
        }

        $scope.Tier1LeverageCapitalLiquidityRisk = tier1capital;
    };

    var tier1LeverageCapitalOperationalRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferOperationalRisk === '' || $scope.WeightedRiskBufferOperationalRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
        }

        $scope.Tier1LeverageCapitalOperationalRisk = tier1capital;
    };

    var tier1LeverageCapitalComplianceRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferComplianceRisk === '' || $scope.WeightedRiskBufferComplianceRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
        }

        $scope.Tier1LeverageCapitalComplianceRisk = tier1capital;
    };

    var tier1LeverageCapitalStrategicRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferStrategicRisk === '' || $scope.WeightedRiskBufferStrategicRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
        }

        $scope.Tier1LeverageCapitalStrategicRisk = tier1capital;
    };

    var tier1LeverageCapitalReputationRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferReputationRisk === '' || $scope.WeightedRiskBufferReputationRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
        }

        $scope.Tier1LeverageCapitalReputationRisk = tier1capital;
    };

    var totalTier1LeverageCapital = function () {
        var totalTier1capital = 0;
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            totalTier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }
        else {
            totalTier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }

        $scope.TotalTier1LeverageCapital = totalTier1capital;
    };

    var cet1CapitalCreditRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferCreditRisk === '' || $scope.WeightedRiskBufferCreditRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
        }

        $scope.Cet1CapitalCreditRisk = Cet1capital;
    };

    var cet1CapitalInterestRateRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferInterestRateRisk === '' || $scope.WeightedRiskBufferInterestRateRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
        }

        $scope.Cet1CapitalInterestRateRisk = Cet1capital;
    };

    var cet1CapitalLiquidityRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferLiquidityRisk === '' || $scope.WeightedRiskBufferLiquidityRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
        }

        $scope.Cet1CapitalLiquidityRisk = Cet1capital;
    };

    var cet1CapitalOperationalRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferOperationalRisk === '' || $scope.WeightedRiskBufferOperationalRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
        }

        $scope.Cet1CapitalOperationalRisk = Cet1capital;
    };

    var cet1CapitalComplianceRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferComplianceRisk === '' || $scope.WeightedRiskBufferComplianceRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
        }

        $scope.Cet1CapitalComplianceRisk = Cet1capital;
    };

    var cet1CapitalStrategicRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferStrategicRisk === '' || $scope.WeightedRiskBufferStrategicRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
        }

        $scope.Cet1CapitalStrategicRisk = Cet1capital;
    };

    var cet1CapitalReputationRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferReputationRisk === '' || $scope.WeightedRiskBufferReputationRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
        }

        $scope.Cet1CapitalReputationRisk = Cet1capital;
    };

    var totalCet1Capital = function () {
        var totalTier1capital = 0;
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            totalTier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }
        else {
            totalTier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }

        $scope.TotalCet1Capital = totalTier1capital;
    };

    var tier1CapitalCreditRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferCreditRisk === '' || $scope.WeightedRiskBufferCreditRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
        }

        $scope.Tier1CapitalCreditRisk = Tier1capital;
    };

    var tier1CapitalInterestRateRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferInterestRateRisk === '' || $scope.WeightedRiskBufferInterestRateRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
        }

        $scope.Tier1CapitalInterestRateRisk = Tier1capital;
    };

    var tier1CapitalLiquidityRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferLiquidityRisk === '' || $scope.WeightedRiskBufferLiquidityRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
        }

        $scope.Tier1CapitalLiquidityRisk = Tier1capital;
    };

    var tier1CapitalOperationalRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferOperationalRisk === '' || $scope.WeightedRiskBufferOperationalRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
        }

        $scope.Tier1CapitalOperationalRisk = Tier1capital;
    };

    var tier1CapitalComplianceRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferComplianceRisk === '' || $scope.WeightedRiskBufferComplianceRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
        }

        $scope.Tier1CapitalComplianceRisk = Tier1capital;
    };

    var tier1CapitalStrategicRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferStrategicRisk === '' || $scope.WeightedRiskBufferStrategicRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
        }

        $scope.Tier1CapitalStrategicRisk = Tier1capital;
    };

    var tier1CapitalReputationRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferReputationRisk === '' || $scope.WeightedRiskBufferReputationRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
        }

        $scope.Tier1CapitalReputationRisk = Tier1capital;
    };

    var totalTier1Capital = function () {
        var totalTier1capital = 0;
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            totalTier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }
        else {
            totalTier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }

        $scope.TotalTier1Capital = totalTier1capital;
    };

    var totalCapitalCreditRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferCreditRisk === '' || $scope.WeightedRiskBufferCreditRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
        }

        $scope.TotalCapitalCreditRisk = Totalcapital;
    };

    var totalCapitalInterestRateRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferInterestRateRisk === '' || $scope.WeightedRiskBufferInterestRateRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
        }

        $scope.TotalCapitalInterestRateRisk = Totalcapital;
    };

    var totalCapitalLiquidityRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferLiquidityRisk === '' || $scope.WeightedRiskBufferLiquidityRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
        }

        $scope.TotalCapitalLiquidityRisk = Totalcapital;
    };

    var totalCapitalOperationalRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferOperationalRisk === '' || $scope.WeightedRiskBufferOperationalRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
        }

        $scope.TotalCapitalOperationalRisk = Totalcapital;
    };

    var totalCapitalComplianceRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferComplianceRisk === '' || $scope.WeightedRiskBufferComplianceRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
        }

        $scope.TotalCapitalComplianceRisk = Totalcapital;
    };

    var totalCapitalStrategicRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferStrategicRisk === '' || $scope.WeightedRiskBufferStrategicRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
        }

        $scope.TotalCapitalStrategicRisk = Totalcapital;
    };

    var totalCapitalReputationRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferReputationRisk === '' || $scope.WeightedRiskBufferReputationRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
        }

        $scope.TotalCapitalReputationRisk = Totalcapital;
    };

    var totalTotalCapital = function () {
        var totalTier1capital = 0;
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            totalTier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }
        else {
            totalTier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }

        $scope.TotalTotalCapital = totalTier1capital;
    };

    var leverRegulatoryMinimumWeightedRiskBuffer = function () {
        $scope.LeverRegulatoryMinimumWeightedRiskBuffer = 5;
    };

    var leverImpliedMinimumWeightedRiskBuffer = function () {
        var leverImpliedMinimumWeightedRiskBuffer = 0;
        leverImpliedMinimumWeightedRiskBuffer = parseFloat($scope.TotalWeightedRiskBuffer) + $scope.LeverRegulatoryMinimumWeightedRiskBuffer;
        $scope.LeverImpliedMinimumWeightedRiskBuffer = leverImpliedMinimumWeightedRiskBuffer;
    };

    var leverBanksMinimumWeightedRiskBuffer = function () {
        if ($rootScope.AdjustBankData.Tier1LeverageRatio === '' || $rootScope.AdjustBankData.Tier1LeverageRatio === null)
            $scope.LeverBanksMinimumWeightedRiskBuffer = $scope.LeverBanksMinimumPolicy;
        else
            $scope.LeverBanksMinimumWeightedRiskBuffer = $rootScope.AdjustBankData.Tier1LeverageRatio;
    };

    var leverBanksMinimumLessImpliedMinimumWeightedRiskBuffer = function () {
        $scope.LeverBanksMinimumLessImpliedMinimumWeightedRiskBuffer = parseFloat($scope.LeverBanksMinimumWeightedRiskBuffer) - parseFloat($scope.LeverImpliedMinimumWeightedRiskBuffer);
    };

    var leverBanksTier1LeverageRatioWeightedRiskBuffer = function () {
        if ($rootScope.SelectedBankVitals.tier1Capital === '' || $rootScope.SelectedBankVitals.tier1Capital === null)
            $scope.LeverBanksTier1LeverageRatioWeightedRiskBuffer = $rootScope.SelectedBankVitals.tier1LeverageRatio;
        else
            $scope.LeverBanksTier1LeverageRatioWeightedRiskBuffer = (parseFloat($rootScope.SelectedBankVitals.tier1Capital) / parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes)) * 100;
    };

    var leverRiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer = function () {
        $scope.LeverRiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer = parseFloat($scope.LeverBanksTier1LeverageRatioWeightedRiskBuffer) - parseFloat($scope.LeverImpliedMinimumWeightedRiskBuffer);
    };

    var leverBufferImpliedMinimumWeightedRiskBuffer = function () {
        $scope.LeverBufferImpliedMinimumWeightedRiskBuffer = 0;
        $scope.LeverBufferImpliedMinimumWeightedRiskBuffer = parseFloat($scope.LeverImpliedMinimumWeightedRiskBuffer) - $scope.LeverRegulatoryMinimumWeightedRiskBuffer;
    };

    var leverBufferBanksMinimumWeightedRiskBuffer = function () {
        $scope.LeverBufferBanksMinimumWeightedRiskBuffer = parseFloat($scope.LeverBanksMinimumWeightedRiskBuffer) - parseFloat($scope.LeverImpliedMinimumWeightedRiskBuffer);
    };

    var leverTier1LeverageLessBanksMinimumWeightedRiskBuffer = function () {
        $scope.LeverTier1LeverageLessBanksMinimumWeightedRiskBuffer = $scope.LeverBanksTier1LeverageRatioWeightedRiskBuffer - $scope.LeverBanksMinimumWeightedRiskBuffer;
    };

    var leverActualTier1LeverageRatioWeightedRiskBuffer = function () {
        $scope.LeverActualTier1LeverageRatioWeightedRiskBuffer = parseFloat($scope.LeverRegulatoryMinimumWeightedRiskBuffer) +
            parseFloat($scope.LeverBufferImpliedMinimumWeightedRiskBuffer) +
            parseFloat($scope.LeverBufferBanksMinimumWeightedRiskBuffer) +
            parseFloat($scope.LeverTier1LeverageLessBanksMinimumWeightedRiskBuffer);
    };

    var leverRegulatoryMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            $scope.LeverRegulatoryMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.LeverRegulatoryMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.LeverRegulatoryMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.LeverRegulatoryMinimumWeightedRiskBuffer / 100);
        }
    };

    var leverImpliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            $scope.LeverImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.LeverImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.LeverImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.LeverImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var leverBanksMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            $scope.LeverBanksMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.LeverBanksMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.LeverBanksMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.LeverBanksMinimumWeightedRiskBuffer / 100);
        }
    };

    var leverBanksMinimumLessImpliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            $scope.LeverBanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.LeverBanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.LeverBanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.LeverBanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var leverBanksTier1LeverageRatioCapital = function () {
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            $scope.LeverBanksTier1LeverageRatioCapital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.LeverBanksTier1LeverageRatioWeightedRiskBuffer / 100);
        }
        else {
            $scope.LeverBanksTier1LeverageRatioCapital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.LeverBanksTier1LeverageRatioWeightedRiskBuffer / 100);
        }
    };

    var leverRiskAssessBufferTier1LeverageLessImpliedMinCapital = function () {
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            $scope.LeverRiskAssessBufferTier1LeverageLessImpliedMinCapital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.LeverRiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer / 100);
        }
        else {
            $scope.LeverRiskAssessBufferTier1LeverageLessImpliedMinCapital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.LeverRiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer / 100);
        }
    };

    var leverBufferImpliedMinimumCapital = function () {
        $scope.LeverBufferImpliedMinimumCapital = parseFloat($scope.LeverImpliedMinimumCapital) - $scope.LeverRegulatoryMinimumCapital;
    };

    var leverBufferBanksMinimumCapital = function () {
        $scope.LeverBufferBanksMinimumCapital = parseFloat($scope.LeverBanksMinimumCapital) - parseFloat($scope.LeverImpliedMinimumCapital);
    };

    var leverTier1LeverageLessBanksMinimumCapital = function () {
        $scope.LeverTier1LeverageLessBanksMinimumCapital = $scope.LeverBanksTier1LeverageRatioCapital - $scope.LeverBanksMinimumCapital;
    };

    var leverActualTier1LeverageRatioCapital = function () {
        $scope.LeverActualTier1LeverageRatioCapital = parseFloat($scope.LeverRegulatoryMinimumCapital) +
            parseFloat($scope.LeverBufferImpliedMinimumCapital) +
            parseFloat($scope.LeverBufferBanksMinimumCapital) +
            parseFloat($scope.LeverTier1LeverageLessBanksMinimumCapital);
    };

    var cETRegulatoryMinimumWeightedRiskBuffer = function () {
        $scope.CETRegulatoryMinimumWeightedRiskBuffer = 6.5;
    };

    var cETImpliedMinimumWeightedRiskBuffer = function () {
        $scope.CETImpliedMinimumWeightedRiskBuffer = parseFloat($scope.TotalWeightedRiskBuffer) + $scope.CETRegulatoryMinimumWeightedRiskBuffer;
    };

    var cETBanksMinimumWeightedRiskBuffer = function () {
        if ($rootScope.AdjustBankData.CET1CapitalRatio === '' || $rootScope.AdjustBankData.CET1CapitalRatio === null)
            $scope.CETBanksMinimumWeightedRiskBuffer = $scope.CETBanksMinimumPolicy;
        else
            $scope.CETBanksMinimumWeightedRiskBuffer = $rootScope.AdjustBankData.CET1CapitalRatio;
    };

    var cETBanksMinimumLessImpliedMinimumWeightedRiskBuffer = function () {
        $scope.CETBanksMinimumLessImpliedMinimumWeightedRiskBuffer = parseFloat($scope.CETBanksMinimumWeightedRiskBuffer) - parseFloat($scope.CETImpliedMinimumWeightedRiskBuffer);
    };

    var cETBanksCet1CapitalRatioWeightedRiskBuffer = function () {
        if ($rootScope.SelectedBankVitals.commonEquityTier1Capital === '' || $rootScope.SelectedBankVitals.commonEquityTier1Capital === null)
            $scope.CETBanksCet1CapitalRatioWeightedRiskBuffer = $rootScope.SelectedBankVitals.ceT1CapitalRatio;
        else
            $scope.CETBanksCet1CapitalRatioWeightedRiskBuffer = (parseFloat($rootScope.SelectedBankVitals.commonEquityTier1Capital) / parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets)) * 100;
    };

    var cETRiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer = function () {
        $scope.CETRiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer = parseFloat($scope.CETBanksCet1CapitalRatioWeightedRiskBuffer) - parseFloat($scope.CETImpliedMinimumWeightedRiskBuffer);
    };

    var cETBufferImpliedMinimumWeightedRiskBuffer = function () {
        $scope.CETBufferImpliedMinimumWeightedRiskBuffer = parseFloat($scope.CETImpliedMinimumWeightedRiskBuffer) - $scope.CETRegulatoryMinimumWeightedRiskBuffer;
    };

    var cETBufferBanksMinimumWeightedRiskBuffer = function () {
        $scope.CETBufferBanksMinimumWeightedRiskBuffer = parseFloat($scope.CETBanksMinimumWeightedRiskBuffer) - parseFloat($scope.CETImpliedMinimumWeightedRiskBuffer);
    };

    var cETCet1CapitalLessBanksMinimumWeightedRiskBuffer = function () {
        $scope.CETCet1CapitalLessBanksMinimumWeightedRiskBuffer = $scope.CETBanksCet1CapitalRatioWeightedRiskBuffer - $scope.CETBanksMinimumWeightedRiskBuffer;
    };

    var cETActualCet1CapitalRatioWeightedRiskBuffer = function () {
        $scope.CETActualCet1CapitalRatioWeightedRiskBuffer = parseFloat($scope.CETRegulatoryMinimumWeightedRiskBuffer) +
            parseFloat($scope.CETBufferImpliedMinimumWeightedRiskBuffer) +
            parseFloat($scope.CETBufferBanksMinimumWeightedRiskBuffer) +
            parseFloat($scope.CETCet1CapitalLessBanksMinimumWeightedRiskBuffer);
    };

    var cETRegulatoryMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.CETRegulatoryMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.CETRegulatoryMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.CETRegulatoryMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.CETRegulatoryMinimumWeightedRiskBuffer / 100);
        }
    };

    var cETImpliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.CETImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.CETImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.CETImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.CETImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var cETBanksMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.CETBanksMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.CETBanksMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.CETBanksMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.CETBanksMinimumWeightedRiskBuffer / 100);
        }
    };

    var cETBanksMinimumLessImpliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.CETBanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.CETBanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.CETBanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.CETBanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var cETBanksCet1CapitalRatioCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.CETBanksCet1CapitalRatioCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.CETBanksCet1CapitalRatioWeightedRiskBuffer / 100);
        }
        else {
            $scope.CETBanksCet1CapitalRatioCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.CETBanksCet1CapitalRatioWeightedRiskBuffer / 100);
        }
    };

    var cETRiskAssessBufferCet1CapitalLessImpliedMinCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.CETRiskAssessBufferCet1CapitalLessImpliedMinCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.CETRiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer / 100);
        }
        else {
            $scope.CETRiskAssessBufferCet1CapitalLessImpliedMinCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.CETRiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer / 100);
        }
    };

    var cETBufferImpliedMinimumCapital = function () {
        $scope.CETBufferImpliedMinimumCapital = parseFloat($scope.CETImpliedMinimumCapital) - $scope.CETRegulatoryMinimumCapital;
    };

    var cETBufferBanksMinimumCapital = function () {
        $scope.CETBufferBanksMinimumCapital = parseFloat($scope.CETBanksMinimumCapital) - parseFloat($scope.CETImpliedMinimumCapital);
    };

    var cETCet1CapitalLessBanksMinimumCapital = function () {
        $scope.CETCet1CapitalLessBanksMinimumCapital = $scope.CETBanksCet1CapitalRatioCapital - $scope.CETBanksMinimumCapital;
    };

    var cETActualCet1CapitalRatioCapital = function () {
        $scope.CETActualCet1CapitalRatioCapital = parseFloat($scope.CETRegulatoryMinimumCapital) +
            parseFloat($scope.CETBufferImpliedMinimumCapital) +
            parseFloat($scope.CETBufferBanksMinimumCapital) +
            parseFloat($scope.CETCet1CapitalLessBanksMinimumCapital);
    };

    var tier1RegulatoryMinimumWeightedRiskBuffer = function () {
        $scope.Tier1RegulatoryMinimumWeightedRiskBuffer = 8;
    };

    var tier1ImpliedMinimumWeightedRiskBuffer = function () {
        $scope.Tier1ImpliedMinimumWeightedRiskBuffer = parseFloat($scope.TotalWeightedRiskBuffer) + $scope.Tier1RegulatoryMinimumWeightedRiskBuffer;
    };

    var tier1BanksMinimumWeightedRiskBuffer = function () {
        if ($rootScope.AdjustBankData.Tier1CapitalRatio === '' || $rootScope.AdjustBankData.Tier1CapitalRatio === null)
            $scope.Tier1BanksMinimumWeightedRiskBuffer = $scope.Tier1BanksMinimumPolicy;
        else
            $scope.Tier1BanksMinimumWeightedRiskBuffer = $rootScope.AdjustBankData.Tier1CapitalRatio;
    };

    var tier1BanksMinimumLessImpliedMinimumWeightedRiskBuffer = function () {
        $scope.Tier1BanksMinimumLessImpliedMinimumWeightedRiskBuffer = parseFloat($scope.Tier1BanksMinimumWeightedRiskBuffer) - parseFloat($scope.Tier1ImpliedMinimumWeightedRiskBuffer);
    };

    var tier1BanksTier1CapitalRatioWeightedRiskBuffer = function () {
        if ($rootScope.SelectedBankVitals.tier1Capital === '' || $rootScope.SelectedBankVitals.tier1Capital === null)
            $scope.Tier1BanksTier1CapitalRatioWeightedRiskBuffer = $rootScope.SelectedBankVitals.tier1CapitalRatio;
        else
            $scope.Tier1BanksTier1CapitalRatioWeightedRiskBuffer = (parseFloat($rootScope.SelectedBankVitals.tier1Capital) / parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets)) * 100;
    };

    var tier1RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer = function () {
        $scope.Tier1RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer = $scope.Tier1BanksTier1CapitalRatioWeightedRiskBuffer - $scope.Tier1ImpliedMinimumWeightedRiskBuffer;
    };

    var tier1BufferImpliedMinimumWeightedRiskBuffer = function () {
        $scope.Tier1BufferImpliedMinimumWeightedRiskBuffer = $scope.Tier1ImpliedMinimumWeightedRiskBuffer - $scope.Tier1RegulatoryMinimumWeightedRiskBuffer;
    };

    var tier1BufferBanksMinimumWeightedRiskBuffer = function () {
        $scope.Tier1BufferBanksMinimumWeightedRiskBuffer = $scope.Tier1BanksMinimumWeightedRiskBuffer - $scope.Tier1ImpliedMinimumWeightedRiskBuffer;
    }

    var tier1Tier1CapitalLessBanksMinimumWeightedRiskBuffer = function () {
        $scope.Tier1Tier1CapitalLessBanksMinimumWeightedRiskBuffer = $scope.Tier1BanksTier1CapitalRatioWeightedRiskBuffer - $scope.Tier1BanksMinimumWeightedRiskBuffer;
    };

    var tier1ActualTier1CapitalRatio = function () {
        $scope.Tier1ActualTier1CapitalRatio = parseFloat($scope.Tier1RegulatoryMinimumWeightedRiskBuffer) +
            parseFloat($scope.Tier1BufferImpliedMinimumWeightedRiskBuffer) +
            parseFloat($scope.Tier1BufferBanksMinimumWeightedRiskBuffer) +
            parseFloat($scope.Tier1Tier1CapitalLessBanksMinimumWeightedRiskBuffer);
    };

    var tier1RegulatoryMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.Tier1RegulatoryMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.Tier1RegulatoryMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.Tier1RegulatoryMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.Tier1RegulatoryMinimumWeightedRiskBuffer / 100);
        }
    };

    var tier1ImpliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.Tier1ImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.Tier1ImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.Tier1ImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.Tier1ImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var tier1BanksMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.Tier1BanksMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.Tier1BanksMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.Tier1BanksMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.Tier1BanksMinimumWeightedRiskBuffer / 100);
        }
    };

    var tier1BanksMinimumLessImpliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.Tier1BanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.Tier1BanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.Tier1BanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.Tier1BanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var tier1BanksTier1CapitalRatioCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.Tier1BanksTier1CapitalRatioCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.Tier1BanksTier1CapitalRatioWeightedRiskBuffer / 100);
        }
        else {
            $scope.Tier1BanksTier1CapitalRatioCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.Tier1BanksTier1CapitalRatioWeightedRiskBuffer / 100);
        }
    };

    var tier1RiskAssessBufferTier1CapitalLessImpliedMinCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.Tier1RiskAssessBufferTier1CapitalLessImpliedMinCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.Tier1RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer / 100);
        }
        else {
            $scope.Tier1RiskAssessBufferTier1CapitalLessImpliedMinCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.Tier1RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer / 100);
        }
    };

    var tier1BufferImpliedMinimumCapital = function () {
        $scope.Tier1BufferImpliedMinimumCapital = parseFloat($scope.Tier1ImpliedMinimumCapital) - $scope.Tier1RegulatoryMinimumCapital;
    };

    var tier1BufferBanksMinimumCapital = function () {
        $scope.Tier1BufferBanksMinimumCapital = parseFloat($scope.Tier1BanksMinimumCapital) - parseFloat($scope.Tier1ImpliedMinimumCapital);
    };

    var tier1Tier1CapitalLessBanksMinimumCapital = function () {
        $scope.Tier1Tier1CapitalLessBanksMinimumCapital = $scope.Tier1BanksTier1CapitalRatioCapital - $scope.Tier1BanksMinimumCapital;
    };

    var tier1ActualTier1CapitalRatioCapital = function () {
        $scope.Tier1ActualTier1CapitalRatioCapital = parseFloat($scope.Tier1RegulatoryMinimumCapital) +
            parseFloat($scope.Tier1BufferImpliedMinimumCapital) +
            parseFloat($scope.Tier1BufferBanksMinimumCapital) +
            parseFloat($scope.Tier1Tier1CapitalLessBanksMinimumCapital);
    };

    var totalRegulatoryMinimumWeightedRiskBuffer = function () {
        $scope.TotalRegulatoryMinimumWeightedRiskBuffer = 10;
    };

    var totalImpliedMinimumWeightedRiskBuffer = function () {
        $scope.TotalImpliedMinimumWeightedRiskBuffer = parseFloat($scope.TotalWeightedRiskBuffer) + $scope.TotalRegulatoryMinimumWeightedRiskBuffer;
    };

    var totalBanksMinimumWeightedRiskBuffer = function () {
        if ($rootScope.AdjustBankData.TotalCapitalRatio === '' || $rootScope.AdjustBankData.TotalCapitalRatio === null)
            $scope.TotalBanksMinimumWeightedRiskBuffer = $scope.TotalBanksMinimumPolicy;
        else
            $scope.TotalBanksMinimumWeightedRiskBuffer = $rootScope.AdjustBankData.TotalCapitalRatio;
    };

    var totalBanksMinimumLessImpliedMinimumWeightedRiskBuffer = function () {
        $scope.TotalBanksMinimumLessImpliedMinimumWeightedRiskBuffer = parseFloat($scope.TotalBanksMinimumWeightedRiskBuffer) - parseFloat($scope.TotalImpliedMinimumWeightedRiskBuffer);
    };

    var totalBanksTotalCapitalRatioWeightedRiskBuffer = function () {
        if ($rootScope.SelectedBankVitals.totalCapital === '' || $rootScope.SelectedBankVitals.totalCapital === null)
            $scope.TotalBanksTotalCapitalRatioWeightedRiskBuffer = $rootScope.SelectedBankVitals.totalCapitalRatio;
        else
            $scope.TotalBanksTotalCapitalRatioWeightedRiskBuffer = (parseFloat($rootScope.SelectedBankVitals.totalCapital) / parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets)) * 100;
    };

    var totalRiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer = function () {
        $scope.TotalRiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer = parseFloat($scope.TotalBanksTotalCapitalRatioWeightedRiskBuffer) - parseFloat($scope.TotalImpliedMinimumWeightedRiskBuffer);
    };

    var totalBufferImpliedMinimumWeightedRiskBuffer = function () {
        $scope.TotalBufferImpliedMinimumWeightedRiskBuffer = parseFloat($scope.TotalImpliedMinimumWeightedRiskBuffer) - $scope.TotalRegulatoryMinimumWeightedRiskBuffer;
    };

    var totalBufferBanksMinimumWeightedRiskBuffer = function () {
        $scope.TotalBufferBanksMinimumWeightedRiskBuffer = parseFloat($scope.TotalBanksMinimumWeightedRiskBuffer) - parseFloat($scope.TotalImpliedMinimumWeightedRiskBuffer);
    };

    var totalTotalCapitalLessBanksMinimumWeightedRiskBuffer = function () {
        $scope.TotalTotalCapitalLessBanksMinimumWeightedRiskBuffer = $scope.TotalBanksTotalCapitalRatioWeightedRiskBuffer - $scope.TotalBanksMinimumWeightedRiskBuffer;
    };

    var totalActualTotalCapitalRatioWeightedRiskBuffer = function () {
        $scope.TotalActualTotalCapitalRatioWeightedRiskBuffer = parseFloat($scope.TotalRegulatoryMinimumWeightedRiskBuffer) +
            parseFloat($scope.TotalBufferImpliedMinimumWeightedRiskBuffer) +
            parseFloat($scope.TotalBufferBanksMinimumWeightedRiskBuffer) +
            parseFloat($scope.TotalTotalCapitalLessBanksMinimumWeightedRiskBuffer);
    };

    var totalRegulatoryMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.TotalRegulatoryMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.TotalRegulatoryMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.TotalRegulatoryMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.TotalRegulatoryMinimumWeightedRiskBuffer / 100);
        }
    };

    var totalImpliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.TotalImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.TotalImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.TotalImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.TotalImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var totalBanksMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.TotalBanksMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.TotalBanksMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.TotalBanksMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.TotalBanksMinimumWeightedRiskBuffer / 100);
        }
    };

    var totalBanksMinimumLessImpliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.TotalBanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.TotalBanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.TotalBanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.TotalBanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var totalBanksTotalCapitalRatioCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.TotalBanksTotalCapitalRatioCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.TotalBanksTotalCapitalRatioWeightedRiskBuffer / 100);
        }
        else {
            $scope.TotalBanksTotalCapitalRatioCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.TotalBanksTotalCapitalRatioWeightedRiskBuffer / 100);
        }
    };

    var totalRiskAssessBufferTotalCapitalLessImpliedMinCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.TotalRiskAssessBufferTotalCapitalLessImpliedMinCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.TotalRiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer / 100);
        }
        else {
            $scope.TotalRiskAssessBufferTotalCapitalLessImpliedMinCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.TotalRiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer / 100);
        }
    };

    var totalBufferImpliedMinimumCapital = function () {
        $scope.TotalBufferImpliedMinimumCapital = parseFloat($scope.TotalImpliedMinimumCapital) - $scope.TotalRegulatoryMinimumCapital;
    };

    var totalBufferBanksMinimumCapital = function () {
        $scope.TotalBufferBanksMinimumCapital = parseFloat($scope.TotalBanksMinimumCapital) - parseFloat($scope.TotalImpliedMinimumCapital);
    };

    var totalTotalCapitalLessBanksMinimumCapital = function () {
        $scope.TotalTotalCapitalLessBanksMinimumCapital = $scope.TotalBanksTotalCapitalRatioCapital - $scope.TotalBanksMinimumCapital;
    };

    var totalActualTotalCapitalRatioCapital = function () {
        var sum = 0;
        sum = parseFloat($scope.TotalRegulatoryMinimumCapital) +
            parseFloat($scope.TotalBufferImpliedMinimumCapital) +
            parseFloat($scope.TotalBufferBanksMinimumCapital) +
            parseFloat($scope.TotalTotalCapitalLessBanksMinimumCapital);

        $scope.TotalActualTotalCapitalRatioCapital = sum;
    };

    var tier1LeverageRatio = function () {
        $rootScope.SelectedBankVitals.tier1LeverageRatio = (parseInt($rootScope.SelectedBankVitals.tier1Capital) / parseInt($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes)) * 100;
    }

    var cet1CapitalRatio = function () {
        $rootScope.SelectedBankVitals.ceT1CapitalRatio = ($rootScope.SelectedBankVitals.commonEquityTier1Capital / $rootScope.SelectedBankVitals.totalRiskWeightedAssets) * 100;
    }

    var tier1RiskBasedCapitalRatio = function () {
        $rootScope.SelectedBankVitals.tier1CapitalRatio = ($rootScope.SelectedBankVitals.tier1Capital / $rootScope.SelectedBankVitals.totalRiskWeightedAssets) * 100;
    }

    var totalCapitalRatio = function () {
        $rootScope.SelectedBankVitals.totalCapitalRatio = ($rootScope.SelectedBankVitals.totalCapital / $rootScope.SelectedBankVitals.totalRiskWeightedAssets) * 100;
    }

    var doCalculations = function () {
        leverBanksMinimumPolicy();
        cETBanksMinimumPolicy();
        tier1BanksMinimumPolicy();
        totalBanksMinimumPolicy();
        compositeRiskScoreCreditRisk();
        compositeRiskScoreInterestRateRisk();
        compositeRiskScoreLiquidityRisk();
        compositeRiskScoreOperationalRisk();
        compositeRiskScoreComplianceRisk();
        compositeRiskScoreStrategicRisk();
        compositeRiskScoreReputationRisk();
        riskRatingCreditRisk();
        riskRatingInterestRateRisk();
        riskRatingOperationalRisk();
        riskRatingComplianceRisk();
        riskRatingStrategicRisk();
        riskRatingReputationRisk();
        riskWeightingCreditRisk();
        riskWeightingInterestRateRisk();
        riskWeightingLiquidityRisk();
        riskWeightingOperationalRisk();
        riskWeightingComplianceRisk();
        riskWeightingStrategicRisk();
        riskWeightingReputationRisk();
        capitalRiskBufferCreditRisk();
        capitalRiskBufferInterestRateRisk();
        capitalRiskBufferLiquidityRisk();
        capitalRiskBufferOperationalRisk();
        capitalRiskBufferComplianceRisk();
        capitalRiskBufferStrategicRisk();
        capitalRiskBufferReputationRisk();
        weightedRiskBufferCreditRisk();
        weightedRiskBufferInterestRateRisk();
        weightedRiskBufferLiquidityRisk();
        weightedRiskBufferOperationalRisk();
        weightedRiskBufferComplianceRisk();
        weightedRiskBufferStrategicRisk();
        weightedRiskBufferReputationRisk();
        totalRiskWeighting();
        totalCompositeRiskScore();
        totalWeightedRiskBuffer();
        tier1LeverageCapitalInterestRateRisk();
        tier1LeverageCapitalLiquidityRisk();
        tier1LeverageCapitalOperationalRisk();
        tier1LeverageCapitalComplianceRisk();
        tier1LeverageCapitalStrategicRisk();
        tier1LeverageCapitalReputationRisk();
        totalTier1LeverageCapital();
        cet1CapitalCreditRisk();
        cet1CapitalInterestRateRisk();
        cet1CapitalLiquidityRisk();
        cet1CapitalOperationalRisk();
        cet1CapitalComplianceRisk();
        cet1CapitalStrategicRisk();
        cet1CapitalReputationRisk();
        totalCet1Capital();
        tier1CapitalCreditRisk();
        tier1CapitalInterestRateRisk();
        tier1CapitalLiquidityRisk();
        tier1CapitalOperationalRisk();
        tier1CapitalComplianceRisk();
        tier1CapitalStrategicRisk();
        tier1CapitalReputationRisk();
        totalTier1Capital();
        totalCapitalCreditRisk();
        totalCapitalInterestRateRisk();
        totalCapitalLiquidityRisk();
        totalCapitalOperationalRisk();
        totalCapitalComplianceRisk();
        totalCapitalStrategicRisk();
        totalCapitalReputationRisk();
        totalTotalCapital();
        leverRegulatoryMinimumWeightedRiskBuffer();
        leverImpliedMinimumWeightedRiskBuffer();
        leverBanksMinimumWeightedRiskBuffer();
        leverBanksMinimumLessImpliedMinimumWeightedRiskBuffer();
        leverBanksTier1LeverageRatioWeightedRiskBuffer();
        leverRiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer();
        leverBufferImpliedMinimumWeightedRiskBuffer();
        leverBufferBanksMinimumWeightedRiskBuffer();
        leverTier1LeverageLessBanksMinimumWeightedRiskBuffer();
        leverActualTier1LeverageRatioWeightedRiskBuffer();
        leverRegulatoryMinimumCapital();
        leverImpliedMinimumCapital();
        leverBanksMinimumCapital();
        leverBanksMinimumLessImpliedMinimumCapital();
        leverBanksTier1LeverageRatioCapital();
        leverRiskAssessBufferTier1LeverageLessImpliedMinCapital();
        leverBufferImpliedMinimumCapital();
        leverBufferBanksMinimumCapital();
        leverTier1LeverageLessBanksMinimumCapital();
        leverActualTier1LeverageRatioCapital();
        cETRegulatoryMinimumWeightedRiskBuffer();
        cETImpliedMinimumWeightedRiskBuffer();
        cETBanksMinimumWeightedRiskBuffer();
        cETBanksMinimumLessImpliedMinimumWeightedRiskBuffer();
        cETBanksCet1CapitalRatioWeightedRiskBuffer();
        cETRiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer();
        cETBufferImpliedMinimumWeightedRiskBuffer();
        cETBufferBanksMinimumWeightedRiskBuffer();
        cETCet1CapitalLessBanksMinimumWeightedRiskBuffer();
        cETActualCet1CapitalRatioWeightedRiskBuffer();
        cETRegulatoryMinimumCapital();
        cETImpliedMinimumCapital();
        cETBanksMinimumCapital();
        cETBanksMinimumLessImpliedMinimumCapital();
        cETBanksCet1CapitalRatioCapital();
        cETRiskAssessBufferCet1CapitalLessImpliedMinCapital();
        cETBufferImpliedMinimumCapital();
        cETBufferBanksMinimumCapital();
        cETCet1CapitalLessBanksMinimumCapital();
        cETActualCet1CapitalRatioCapital();
        tier1RegulatoryMinimumWeightedRiskBuffer();
        tier1ImpliedMinimumWeightedRiskBuffer();
        tier1BanksMinimumWeightedRiskBuffer();
        tier1BanksMinimumLessImpliedMinimumWeightedRiskBuffer();
        tier1BanksTier1CapitalRatioWeightedRiskBuffer();
        tier1RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer();
        tier1BufferImpliedMinimumWeightedRiskBuffer();
        tier1BufferBanksMinimumWeightedRiskBuffer();
        tier1Tier1CapitalLessBanksMinimumWeightedRiskBuffer();
        tier1ActualTier1CapitalRatio();
        tier1RegulatoryMinimumCapital();
        tier1ImpliedMinimumCapital();
        tier1BanksMinimumCapital();
        tier1BanksMinimumLessImpliedMinimumCapital();
        tier1BanksTier1CapitalRatioCapital();
        tier1RiskAssessBufferTier1CapitalLessImpliedMinCapital();
        tier1BufferImpliedMinimumCapital();
        tier1BufferBanksMinimumCapital();
        tier1Tier1CapitalLessBanksMinimumCapital();
        tier1ActualTier1CapitalRatioCapital();
        totalRegulatoryMinimumWeightedRiskBuffer();
        totalImpliedMinimumWeightedRiskBuffer();
        totalBanksMinimumWeightedRiskBuffer();
        totalBanksMinimumLessImpliedMinimumWeightedRiskBuffer();
        totalBanksTotalCapitalRatioWeightedRiskBuffer();
        totalRiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer();
        totalBufferImpliedMinimumWeightedRiskBuffer();
        totalBufferBanksMinimumWeightedRiskBuffer();
        totalTotalCapitalLessBanksMinimumWeightedRiskBuffer();
        totalActualTotalCapitalRatioWeightedRiskBuffer();
        totalRegulatoryMinimumCapital();
        totalImpliedMinimumCapital();
        totalBanksMinimumCapital();
        totalBanksMinimumLessImpliedMinimumCapital();
        totalBanksTotalCapitalRatioCapital();
        totalRiskAssessBufferTotalCapitalLessImpliedMinCapital();
        totalBufferImpliedMinimumCapital();
        totalBufferBanksMinimumCapital();
        totalTotalCapitalLessBanksMinimumCapital();
        totalActualTotalCapitalRatioCapital();
        tier1LeverageRatio();
        cet1CapitalRatio();
        tier1RiskBasedCapitalRatio();
        totalCapitalRatio();
        refreshCharts();
        angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
    }

    $scope.$on('ModelSelectionChanged', function (event, arg) {
        angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
        doCalculations();
    });

    var refreshCharts = function () {
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.LeverRegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.LeverImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.LeverBanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual T1 Leverage Ratio', value: $rootScope.SelectedBankVitals.tier1LeverageRatio });
        renderLeverageCapitalRatioChart('leveragecapitalchart', chartData, '');

        var chartData1 = [];
        chartData1.push({ label: 'PCA Well-Capitalized', value: $scope.CETRegulatoryMinimumWeightedRiskBuffer });
        chartData1.push({ label: 'Implied Minimum', value: $scope.CETImpliedMinimumWeightedRiskBuffer });
        chartData1.push({ label: 'Bank\'s Minimum', value: $scope.CETBanksMinimumWeightedRiskBuffer });
        chartData1.push({ label: 'Actual CET 1 Capital Ratio', value: $rootScope.SelectedBankVitals.ceT1CapitalRatio });
        renderCet1CapitalRatioChart('cet1capitalchart', chartData1, '');

        var chartData2 = [];
        chartData2.push({ label: 'PCA Well-Capitalized', value: $scope.Tier1RegulatoryMinimumWeightedRiskBuffer });
        chartData2.push({ label: 'Implied Minimum', value: $scope.Tier1ImpliedMinimumWeightedRiskBuffer });
        chartData2.push({ label: 'Bank\'s Minimum', value: $scope.Tier1BanksMinimumWeightedRiskBuffer });
        chartData2.push({ label: 'Actual Tier 1 RBC Ratio', value: $rootScope.SelectedBankVitals.tier1CapitalRatio });
        renderTier1CapitalRatioChart('tier1capitalchart', chartData2, '');

        var chartData3 = [];
        chartData3.push({ label: 'PCA Well-Capitalized', value: $scope.TotalRegulatoryMinimumWeightedRiskBuffer });
        chartData3.push({ label: 'Implied Minimum', value: $scope.TotalImpliedMinimumWeightedRiskBuffer });
        chartData3.push({ label: 'Bank\'s Minimum', value: $scope.TotalBanksMinimumWeightedRiskBuffer });
        chartData3.push({ label: 'Actual Total Capital Ratio', value: $rootScope.SelectedBankVitals.totalCapitalRatio });
        renderTotalCapitalRatioChart('totalcapitalchart', chartData3, '');
    }

    $scope.$on('VitalsArrived', function (event, arg) {
        angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
        doCalculations();
    });

    $scope.$on('DefaultBankSelected', function (event, arg) {
        angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
        getPastFiveQuarters();
    });

    var initialize = function () {
        doCalculations();
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("cramTier1LeverageRatioViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", "$interval", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout, $interval) {
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.Periods = [];
    $scope.BanksMinimumPolicy = 0;
    $scope.CompositeRiskScoreCreditRisk = 0;
    $scope.CompositeRiskScoreInterestRateRisk = 0;
    $scope.CompositeRiskScoreLiquidityRisk = 0;
    $scope.CompositeRiskScoreOperationalRisk = 0;
    $scope.CompositeRiskScoreComplianceRisk = 0;
    $scope.CompositeRiskScoreStrategicRisk = 0;
    $scope.CompositeRiskScoreReputationRisk = 0;
    $scope.RiskRatingCreditRisk = '';
    $scope.RiskRatingInterestRateRisk = '';
    $scope.RiskRatingLiquidityRisk = '';
    $scope.RiskRatingOperationalRisk = '';
    $scope.RiskRatingComplianceRisk = '';
    $scope.RiskRatingStrategicRisk = '';
    $scope.RiskRatingReputationRisk = '';
    $scope.RiskWeightingCreditRisk = 0;
    $scope.RiskWeightingInterestRateRisk = 0;
    $scope.RiskWeightingLiquidityRisk = 0;
    $scope.RiskWeightingOperationalRisk = 0;
    $scope.RiskWeightingComplianceRisk = 0;
    $scope.RiskWeightingStrategicRisk = 0;
    $scope.RiskWeightingReputationRisk = 0;
    $scope.CapitalRiskBufferCreditRisk = 0;
    $scope.CapitalRiskBufferInterestRateRisk = 0;
    $scope.CapitalRiskBufferLiquidityRisk = 0;
    $scope.CapitalRiskBufferOperationalRisk = 0;
    $scope.CapitalRiskBufferComplianceRisk = 0;
    $scope.CapitalRiskBufferStrategicRisk = 0;
    $scope.CapitalRiskBufferReputationRisk = 0;
    $scope.WeightedRiskBufferCreditRisk = 0;
    $scope.WeightedRiskBufferInterestRateRisk = 0;
    $scope.WeightedRiskBufferLiquidityRisk = 0;
    $scope.WeightedRiskBufferOperationalRisk = 0;
    $scope.WeightedRiskBufferComplianceRisk = 0;
    $scope.WeightedRiskBufferStrategicRisk = 0;
    $scope.WeightedRiskBufferReputationRisk = 0;
    $scope.Tier1CapitalCreditRisk = 0;
    $scope.Tier1CapitalInterestRateRisk = 0;
    $scope.Tier1CapitalLiquidityRisk = 0;
    $scope.Tier1CapitalOperationalRisk = 0;
    $scope.Tier1CapitalComplianceRisk = 0;
    $scope.Tier1CapitalStrategicRisk = 0;
    $scope.Tier1CapitalReputationRisk = 0;
    $scope.TotalCompositeRiskScore = 0;
    $scope.TotalRiskWeighting = 0;
    $scope.TotalWeightedRiskBuffer = 0;
    $scope.TotalTier1Capital = 0;
    $scope.LowCreditRisk = 0;
    $scope.LowInterestRateRisk = 0;
    $scope.LowLiquidityRisk = 0;
    $scope.LowOperationalRisk = 0;
    $scope.LowComplianceRisk = 0;
    $scope.LowStrategicRisk = 0;
    $scope.LowReputationRisk = 0;
    $scope.LowModerateCreditRisk = 0;
    $scope.LowModerateInterestRateRisk = 0;
    $scope.LowModerateLiquidityRisk = 0;
    $scope.LowModerateOperationalRisk = 0;
    $scope.LowModerateComplianceRisk = 0;
    $scope.LowModerateStrategicRisk = 0;
    $scope.LowModerateReputationRisk = 0;
    $scope.ModerateCreditRisk = 0;
    $scope.ModerateInterestRateRisk = 0;
    $scope.ModerateLiquidityRisk = 0;
    $scope.ModerateOperationalRisk = 0;
    $scope.ModerateComplianceRisk = 0;
    $scope.ModerateStrategicRisk = 0;
    $scope.ModerateReputationRisk = 0;
    $scope.ModerateHighCreditRisk = 0;
    $scope.ModerateHighInterestRateRisk = 0;
    $scope.ModerateHighLiquidityRisk = 0;
    $scope.ModerateHighOperationalRisk = 0;
    $scope.ModerateHighComplianceRisk = 0;
    $scope.ModerateHighStrategicRisk = 0;
    $scope.ModerateHighReputationRisk = 0;
    $scope.HighCreditRisk = 0;
    $scope.HighInterestRateRisk = 0;
    $scope.HighLiquidityRisk = 0;
    $scope.HighOperationalRisk = 0;
    $scope.HighComplianceRisk = 0;
    $scope.HighStrategicRisk = 0;
    $scope.HighReputationRisk = 0;
    $scope.LowTotal = 0;
    $scope.LowModerateTotal = 0;
    $scope.ModerateTotal = 0;
    $scope.ModerateHighTotal = 0;
    $scope.HighTotal = 0;
    $scope.RegulatoryMinimumWeightedRiskBuffer = 0;
    $scope.ImpliedMinimumWeightedRiskBuffer = 0;
    $scope.BanksMinimumWeightedRiskBuffer = 0;
    $scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer = 0;
    $scope.BanksTier1LeverageRatioWeightedRiskBuffer = 0;
    $scope.RiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer = 0;
    $scope.BufferImpliedMinimumWeightedRiskBuffer = 0;
    $scope.BufferBanksMinimumWeightedRiskBuffer = 0;
    $scope.Tier1LeverageLessBanksMinimumWeightedRiskBuffer = 0;
    $scope.ActualTier1LeverageRatioWeightedRiskBuffer = 0;
    $scope.RegulatoryMinimumCapital = 0;
    $scope.ImpliedMinimumCapital = 0;
    $scope.BanksMinimumCapital = 0
    $scope.BanksMinimumLessImpliedMinimumCapital = 0;
    $scope.BanksTier1LeverageRatioCapital = 0;
    $scope.RiskAssessBufferTier1LeverageLessImpliedMinCapital = 0;
    $scope.BufferImpliedMinimumCapital = 0;
    $scope.BufferBanksMinimumCapital = 0;
    $scope.Tier1LeverageLessBanksMinimumCapital = 0;
    $scope.ActualTier1LeverageRatioCapital = 0;

    var getSelectedModelName = function () {
        $rootScope.CramModelDisplayName = 'Create/Edit Scenario';

        if ($scope.CramModels.length > 0) {
            var selectedModel = $scope.CramModels.filter(function (obj) {
                return obj.isSelected === true;
            })[0];

            if (typeof selectedModel !== 'undefined' && selectedModel !== null) {
                $rootScope.CramModelDisplayName = selectedModel.modelName;
            }
        }
        else {
            $rootScope.CramModelDisplayName = 'Create/Edit Scenario';
        }
    }

    var renderTier1CapitalRatioChart = function (chartContainerName, chartData, yAxisLabel) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": "Capital Risk Allocation Model",
                    "subCaption": "Tier 1 Leverage Ratio",
                    "showBorder": "1",
                    "borderColor": "#cccccc",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": "#E0A025,#F4D00c,#0093D1,#173967,#A71D23",
                    "bgColor": "#ffffff",
                    "borderAlpha": "20",
                    "canvasBorderAlpha": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "rotatevalues": "0",
                    "valueFontColor": "#00000",
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
                    "decimals": "4",
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
                var tier1CapitalRatioChart = FusionCharts.items.tier1CapitalRatioBarChart;
                if (typeof tier1CapitalRatioChart === 'undefined') {
                    tier1CapitalRatioChart = new FusionCharts({
                        type: 'column2d',
                        id: 'tier1CapitalRatioBarChart',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });

                    tier1CapitalRatioChart.render();
                }
                else {
                    tier1CapitalRatioChart.setChartData(dSource, 'json');
                    tier1CapitalRatioChart.render();
                }
            } // if block ends here
        });
    }

    var tier1LeverageRatio = function () {
        $rootScope.SelectedBankVitals.tier1LeverageRatio = (parseInt($rootScope.SelectedBankVitals.tier1Capital) / parseInt($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes)) * 100;
    }

    var banksMinimumPolicy = function () {
        if ($rootScope.AdjustBankData.Tier1LeverageRatio === '' || $rootScope.AdjustBankData.Tier1LeverageRatio === null)
            $scope.BanksMinimumPolicy = 8;
        else
            $scope.BanksMinimumPolicy = $rootScope.AdjustBankData.Tier1LeverageRatio;
    }

    var compositeRiskScoreCreditRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.CreditRisk === '' || $rootScope.RiskCategoriesAndWeights.CreditRisk === null)
            $scope.CompositeRiskScoreCreditRisk = 0;
        else
            $scope.CompositeRiskScoreCreditRisk = $rootScope.RiskCategoriesAndWeights.CreditRisk;
    };

    var compositeRiskScoreInterestRateRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.InterestRateRisk === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRisk === null)
            $scope.CompositeRiskScoreInterestRateRisk = 0;
        else
            $scope.CompositeRiskScoreInterestRateRisk = $rootScope.RiskCategoriesAndWeights.InterestRateRisk;
    };

    var compositeRiskScoreLiquidityRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.LiquidityRisk === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRisk === null)
            $scope.CompositeRiskScoreLiquidityRisk = 0;
        else
            $scope.CompositeRiskScoreLiquidityRisk = $rootScope.RiskCategoriesAndWeights.LiquidityRisk;
    };

    var compositeRiskScoreOperationalRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.OperationalRisk === '' || $rootScope.RiskCategoriesAndWeights.OperationalRisk === null)
            $scope.CompositeRiskScoreOperationalRisk = 0;
        else
            $scope.CompositeRiskScoreOperationalRisk = $rootScope.RiskCategoriesAndWeights.OperationalRisk;
    };

    var compositeRiskScoreComplianceRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ComplianceRisk === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRisk === null)
            $scope.CompositeRiskScoreComplianceRisk = 0;
        else
            $scope.CompositeRiskScoreComplianceRisk = $rootScope.RiskCategoriesAndWeights.ComplianceRisk;
    };

    var compositeRiskScoreStrategicRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.StrategicRisk === '' || $rootScope.RiskCategoriesAndWeights.StrategicRisk === null)
            $scope.CompositeRiskScoreStrategicRisk = 0;
        else
            $scope.CompositeRiskScoreStrategicRisk = $rootScope.RiskCategoriesAndWeights.StrategicRisk;
    };

    var compositeRiskScoreReputationRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ReputationRisk === '' || $rootScope.RiskCategoriesAndWeights.ReputationRisk === null)
            $scope.CompositeRiskScoreReputationRisk = 0;
        else
            $scope.CompositeRiskScoreReputationRisk = $rootScope.RiskCategoriesAndWeights.ReputationRisk;
    };

    $scope.GetRatingColorClass = function (rating) {
        var ratingclass = '';

        if (rating === 'Low')
            ratingclass = 'green-color';
        else if (rating === 'Low-Moderate')
            ratingclass = 'light-green-color';
        else if (rating === 'Moderate')
            ratingclass = 'yellow-color';
        else if (rating === 'Moderate-High')
            ratingclass = 'orange-color';
        else if (rating === 'High')
            ratingclass = 'red-color';
        else
            ratingclass = 'grey-color';

        return ratingclass;
    }

    var riskRatingCreditRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreCreditRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingCreditRisk = rating;
    };

    var riskRatingInterestRateRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingInterestRateRisk = rating;
    };

    var riskRatingLiquidityRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingLiquidityRisk = rating;
    };

    var riskRatingOperationalRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingOperationalRisk = rating;
    };

    var riskRatingComplianceRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingComplianceRisk = rating;
    };

    var riskRatingStrategicRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingStrategicRisk = rating;
    };

    var riskRatingReputationRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreReputationRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingReputationRisk = rating;
    };

    var countblank = function () {
        var count = 0;
        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === null)
            count++;

        return count;
    }

    var riskWeightingCreditRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === 'undefined') {
            $scope.RiskWeightingCreditRisk = 0;
        }
        else {
            $scope.RiskWeightingCreditRisk = $rootScope.RiskCategoriesAndWeights.CreditRiskWeight;
        }
    };

    var riskWeightingInterestRateRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === 'undefined') {
            $scope.RiskWeightingInterestRateRisk = 0;
        }
        else {
            $scope.RiskWeightingInterestRateRisk = $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight;
        }
    };

    var riskWeightingLiquidityRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === 'undefined') {
            $scope.RiskWeightingLiquidityRisk = 0;
        }
        else {
            $scope.RiskWeightingLiquidityRisk = $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight;
        }
    };

    var riskWeightingOperationalRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === 'undefined') {
            $scope.RiskWeightingOperationalRisk = 0;
        }
        else {
            $scope.RiskWeightingOperationalRisk = $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight;
        }
    };

    var riskWeightingComplianceRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === 'undefined') {
            $scope.RiskWeightingComplianceRisk = 0;
        }
        else {
            $scope.RiskWeightingComplianceRisk = $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight;
        }
    };

    var riskWeightingStrategicRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === 'undefined') {
            $scope.RiskWeightingStrategicRisk = 0;
        }
        else {
            $scope.RiskWeightingStrategicRisk = $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight;
        }
    };

    var riskWeightingReputationRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === 'undefined') {
            $scope.RiskWeightingReputationRisk = 0;
        }
        else {
            $scope.RiskWeightingReputationRisk = $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight;
        }
    };

    var capitalRiskBufferCreditRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreCreditRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferCreditRisk = riskBuffer;
    };

    var capitalRiskBufferInterestRateRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferInterestRateRisk = riskBuffer;
    };

    var capitalRiskBufferLiquidityRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferLiquidityRisk = riskBuffer;
    };

    var capitalRiskBufferOperationalRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferOperationalRisk = riskBuffer;
    };

    var capitalRiskBufferComplianceRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferComplianceRisk = riskBuffer;
    };

    var capitalRiskBufferStrategicRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferStrategicRisk = riskBuffer;
    };

    var capitalRiskBufferReputationRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreReputationRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferReputationRisk = riskBuffer;
    };

    var weightedRiskBufferCreditRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingCreditRisk) > 0 && parseFloat($scope.CapitalRiskBufferCreditRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingCreditRisk) * parseFloat($scope.CapitalRiskBufferCreditRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferCreditRisk = riskBuffer;
    };

    var weightedRiskBufferInterestRateRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingInterestRateRisk) > 0 && parseFloat($scope.CapitalRiskBufferInterestRateRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingInterestRateRisk) * parseFloat($scope.CapitalRiskBufferInterestRateRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferInterestRateRisk = riskBuffer;
    };

    var weightedRiskBufferLiquidityRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingLiquidityRisk) > 0 && parseFloat($scope.CapitalRiskBufferLiquidityRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingLiquidityRisk) * parseFloat($scope.CapitalRiskBufferLiquidityRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferLiquidityRisk = riskBuffer;
    };

    var weightedRiskBufferOperationalRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingOperationalRisk) > 0 && parseFloat($scope.CapitalRiskBufferOperationalRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingOperationalRisk) * parseFloat($scope.CapitalRiskBufferOperationalRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferOperationalRisk = riskBuffer;
    };

    var weightedRiskBufferComplianceRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingComplianceRisk) > 0 && parseFloat($scope.CapitalRiskBufferComplianceRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingComplianceRisk) * parseFloat($scope.CapitalRiskBufferComplianceRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferComplianceRisk = riskBuffer;
    };

    var weightedRiskBufferStrategicRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingStrategicRisk) > 0 && parseFloat($scope.CapitalRiskBufferStrategicRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingStrategicRisk) * parseFloat($scope.CapitalRiskBufferStrategicRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferStrategicRisk = riskBuffer;
    };

    var weightedRiskBufferReputationRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingReputationRisk) > 0 && parseFloat($scope.CapitalRiskBufferReputationRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingReputationRisk) * parseFloat($scope.CapitalRiskBufferReputationRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferReputationRisk = riskBuffer;
    };

    var tier1CapitalCreditRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferCreditRisk === '' || $scope.WeightedRiskBufferCreditRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
        }

        $scope.Tier1CapitalCreditRisk = tier1capital;
    };

    var tier1CapitalInterestRateRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferInterestRateRisk === '' || $scope.WeightedRiskBufferInterestRateRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
        }

        $scope.Tier1CapitalInterestRateRisk = tier1capital;
    };

    var tier1CapitalLiquidityRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferLiquidityRisk === '' || $scope.WeightedRiskBufferLiquidityRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
        }

        $scope.Tier1CapitalLiquidityRisk = tier1capital;
    };

    var tier1CapitalOperationalRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferOperationalRisk === '' || $scope.WeightedRiskBufferOperationalRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
        }

        $scope.Tier1CapitalOperationalRisk = tier1capital;
    };

    var tier1CapitalComplianceRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferComplianceRisk === '' || $scope.WeightedRiskBufferComplianceRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
        }

        $scope.Tier1CapitalComplianceRisk = tier1capital;
    };

    var tier1CapitalStrategicRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferStrategicRisk === '' || $scope.WeightedRiskBufferStrategicRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
        }

        $scope.Tier1CapitalStrategicRisk = tier1capital;
    };

    var tier1CapitalReputationRisk = function () {
        var tier1capital = 0;
        if ($scope.WeightedRiskBufferReputationRisk === '' || $scope.WeightedRiskBufferReputationRisk === 0) {
            tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
                tier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
            else {
                tier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
        }

        $scope.Tier1CapitalReputationRisk = tier1capital;
    };

    var totalCompositeRiskScore = function () {
        var totalCompositeScore = '';
        try {
            var mul1 = parseFloat($scope.CompositeRiskScoreCreditRisk) * parseFloat($scope.RiskWeightingCreditRisk);
            var mul2 = parseFloat($scope.CompositeRiskScoreInterestRateRisk) * parseFloat($scope.RiskWeightingInterestRateRisk);
            var mul3 = parseFloat($scope.CompositeRiskScoreLiquidityRisk) * parseFloat($scope.RiskWeightingLiquidityRisk);
            var mul4 = parseFloat($scope.CompositeRiskScoreOperationalRisk) * parseFloat($scope.RiskWeightingOperationalRisk);
            var mul5 = parseFloat($scope.CompositeRiskScoreComplianceRisk) * parseFloat($scope.RiskWeightingComplianceRisk);
            var mul6 = parseFloat($scope.CompositeRiskScoreStrategicRisk) * parseFloat($scope.RiskWeightingStrategicRisk);
            var mul7 = parseFloat($scope.CompositeRiskScoreReputationRisk) * parseFloat($scope.RiskWeightingReputationRisk);
            var sum = mul1 + mul2 + mul3 + mul4 + mul5 + mul6 + mul7;
            totalCompositeScore = sum / $scope.TotalRiskWeighting;
        }
        catch (err) {
            sum = parseInt($scope.CompositeRiskScoreCreditRisk) +
                parseInt($scope.CompositeRiskScoreInterestRateRisk) +
                parseInt($scope.CompositeRiskScoreLiquidityRisk) +
                parseInt($scope.CompositeRiskScoreOperationalRisk) +
                parseInt($scope.CompositeRiskScoreComplianceRisk) +
                parseInt($scope.CompositeRiskScoreStrategicRisk) +
                parseInt($scope.CompositeRiskScoreReputationRisk);
            totalCompositeScore = sum / 7;
        }

        $scope.TotalCompositeRiskScore = totalCompositeScore;
    };

    var totalRiskWeighting = function () {
        var total = parseFloat($scope.RiskWeightingCreditRisk) +
            parseFloat($scope.RiskWeightingInterestRateRisk) +
            parseFloat($scope.RiskWeightingLiquidityRisk) +
            parseFloat($scope.RiskWeightingOperationalRisk) +
            parseFloat($scope.RiskWeightingComplianceRisk) +
            parseFloat($scope.RiskWeightingStrategicRisk) +
            parseFloat($scope.RiskWeightingReputationRisk);

        $scope.TotalRiskWeighting = total;
    };

    var totalWeightedRiskBuffer = function () {
        var total = parseFloat($scope.WeightedRiskBufferCreditRisk) +
            parseFloat($scope.WeightedRiskBufferInterestRateRisk) +
            parseFloat($scope.WeightedRiskBufferLiquidityRisk) +
            parseFloat($scope.WeightedRiskBufferOperationalRisk) +
            parseFloat($scope.WeightedRiskBufferComplianceRisk) +
            parseFloat($scope.WeightedRiskBufferStrategicRisk) +
            parseFloat($scope.WeightedRiskBufferReputationRisk);

        $scope.TotalWeightedRiskBuffer = total;
    };

    var totalTier1Capital = function () {
        var totalTier1capital = 0;
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            totaltier1capital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }
        else {
            totaltier1capital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }

        $scope.TotalTier1Capital = totaltier1capital;
    };

    var lowCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowCreditRisk = risk;
    };

    var lowInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowInterestRateRisk = risk;
    };

    var lowLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowLiquidityRisk = risk;
    };

    var lowOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowOperationalRisk = risk;
    };

    var lowComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowComplianceRisk = risk;
    };

    var lowStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowStrategicRisk = risk;
    };

    var lowReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowReputationRisk = risk;
    };

    var lowModerateCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateCreditRisk = risk;
    };

    var lowModerateInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateInterestRateRisk = risk;
    };

    var lowModerateLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateLiquidityRisk = risk;
    };

    var lowModerateOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateOperationalRisk = risk;
    };

    var lowModerateComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateComplianceRisk = risk;
    };

    var lowModerateStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateStrategicRisk = risk;
    };

    var lowModerateReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateReputationRisk = risk;
    };

    var moderateCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateCreditRisk = risk;
    };

    var moderateInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateInterestRateRisk = risk;
    };

    var moderateLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateLiquidityRisk = risk;
    };

    var moderateOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateOperationalRisk = risk;
    };

    var moderateComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateComplianceRisk = risk;
    };

    var moderateStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateStrategicRisk = risk;
    };

    var moderateReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateReputationRisk = risk;
    };

    var moderateHighCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighCreditRisk = risk;
    };

    var moderateHighInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighInterestRateRisk = risk;
    };

    var moderateHighLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighLiquidityRisk = risk;
    };

    var moderateHighOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighOperationalRisk = risk;
    };

    var moderateHighComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighComplianceRisk = risk;
    };

    var moderateHighStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighStrategicRisk = risk;
    };

    var moderateHighReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighReputationRisk = risk;
    };

    var highCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighCreditRisk = risk;
    };

    var highInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighInterestRateRisk = risk;
    };

    var highLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighLiquidityRisk = risk;
    };

    var highOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighOperationalRisk = risk;
    };

    var highComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighComplianceRisk = risk;
    };

    var highStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighStrategicRisk = risk;
    };

    var highReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighReputationRisk = risk;
    };

    var lowTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowTotal = risk;
    };

    var lowModerateTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateTotal = risk;
    };

    var moderateTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateTotal = risk;
    };

    var moderateHighTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighTotal = risk;
    };

    var highTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighTotal = risk;
    };

    var regulatoryMinimumWeightedRiskBuffer = function () {
        $scope.RegulatoryMinimumWeightedRiskBuffer = 5;
    };

    var impliedMinimumWeightedRiskBuffer = function () {
        $scope.ImpliedMinimumWeightedRiskBuffer = parseFloat($scope.TotalWeightedRiskBuffer) + $scope.RegulatoryMinimumWeightedRiskBuffer;
    };

    var banksMinimumWeightedRiskBuffer = function () {
        if ($rootScope.AdjustBankData.Tier1LeverageRatio === '' || $rootScope.AdjustBankData.Tier1LeverageRatio === null)
            $scope.BanksMinimumWeightedRiskBuffer = $scope.BanksMinimumPolicy;
        else
            $scope.BanksMinimumWeightedRiskBuffer = $rootScope.AdjustBankData.Tier1LeverageRatio;
    };

    var banksMinimumLessImpliedMinimumWeightedRiskBuffer = function () {
        $scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer = parseFloat($scope.BanksMinimumWeightedRiskBuffer) - parseFloat($scope.ImpliedMinimumWeightedRiskBuffer);
    };

    var banksTier1LeverageRatioWeightedRiskBuffer = function () {
        if ($rootScope.AdjustBankData.Tier1Capital === '' || $rootScope.AdjustBankData.Tier1Capital === null)
            $scope.BanksTier1LeverageRatioWeightedRiskBuffer = $rootScope.SelectedBankVitals.tier1LeverageRatio;
        else
            $scope.BanksTier1LeverageRatioWeightedRiskBuffer = (parseFloat($rootScope.SelectedBankVitals.tier1Capital) / parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes)) * 100;
    };

    var riskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer = function () {
        $scope.RiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer = parseFloat($scope.BanksTier1LeverageRatioWeightedRiskBuffer) - parseFloat($scope.ImpliedMinimumWeightedRiskBuffer);
    };

    var bufferImpliedMinimumWeightedRiskBuffer = function () {
        $scope.BufferImpliedMinimumWeightedRiskBuffer = parseFloat($scope.ImpliedMinimumWeightedRiskBuffer) - $scope.RegulatoryMinimumWeightedRiskBuffer;
    };

    var bufferBanksMinimumWeightedRiskBuffer = function () {
        $scope.BufferBanksMinimumWeightedRiskBuffer = parseFloat($scope.BanksMinimumWeightedRiskBuffer) - parseFloat($scope.ImpliedMinimumWeightedRiskBuffer);
    };

    var tier1LeverageLessBanksMinimumWeightedRiskBuffer = function () {
        $scope.Tier1LeverageLessBanksMinimumWeightedRiskBuffer = $scope.BanksTier1LeverageRatioWeightedRiskBuffer - $scope.BanksMinimumWeightedRiskBuffer;
    };

    var actualTier1LeverageRatioWeightedRiskBuffer = function () {
        $scope.ActualTier1LeverageRatioWeightedRiskBuffer = parseFloat($scope.RegulatoryMinimumWeightedRiskBuffer) +
            parseFloat($scope.BufferImpliedMinimumWeightedRiskBuffer) +
            parseFloat($scope.BufferBanksMinimumWeightedRiskBuffer) +
            parseFloat($scope.Tier1LeverageLessBanksMinimumWeightedRiskBuffer);
    };

    var regulatoryMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            $scope.RegulatoryMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.RegulatoryMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.RegulatoryMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.RegulatoryMinimumWeightedRiskBuffer / 100);
        }
    };

    var impliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            $scope.ImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.ImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.ImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.ImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var banksMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            $scope.BanksMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.BanksMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.BanksMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.BanksMinimumWeightedRiskBuffer / 100);
        }
    };

    var banksMinimumLessImpliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            $scope.BanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.BanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var banksTier1LeverageRatioCapital = function () {
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            $scope.BanksTier1LeverageRatioCapital = parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.BanksTier1LeverageRatioWeightedRiskBuffer / 100);
        }
        else {
            $scope.BanksTier1LeverageRatioCapital = parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.BanksTier1LeverageRatioWeightedRiskBuffer / 100);
        }
    };

    var riskAssessBufferTier1LeverageLessImpliedMinCapital = function () {
        if ($rootScope.AdjustBankData.TotalAssetsLeveragePurposes === '' || $rootScope.AdjustBankData.TotalAssetsLeveragePurposes === null) {
            $scope.RiskAssessBufferTier1LeverageLessImpliedMinCapital = (parseFloat($rootScope.SelectedBankVitals.totalAssetsLeveragePurposes) * parseFloat($scope.RiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer) / 100);
        }
        else {
            $scope.RiskAssessBufferTier1LeverageLessImpliedMinCapital = (parseFloat($rootScope.AdjustBankData.TotalAssetsLeveragePurposes) * parseFloat($scope.RiskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer) / 100);
        }
    };

    var bufferImpliedMinimumCapital = function () {
        $scope.BufferImpliedMinimumCapital = parseFloat($scope.ImpliedMinimumCapital) - $scope.RegulatoryMinimumCapital;
    };

    var bufferBanksMinimumCapital = function () {
        $scope.BufferBanksMinimumCapital = parseFloat($scope.BanksMinimumCapital) - parseFloat($scope.ImpliedMinimumCapital);
    };

    var tier1LeverageLessBanksMinimumCapital = function () {
        $scope.Tier1LeverageLessBanksMinimumCapital = $scope.BanksTier1LeverageRatioCapital - $scope.BanksMinimumCapital;
    };

    var actualTier1LeverageRatioCapital = function () {
        var sum = 0;
        sum = parseFloat($scope.RegulatoryMinimumCapital) +
            parseFloat($scope.BufferImpliedMinimumCapital) +
            parseFloat($scope.BufferBanksMinimumCapital) +
            parseFloat($scope.Tier1LeverageLessBanksMinimumCapital);

        $rootScope.$broadcast('CalculationsCompleteTier1LeverageRatio', 'Calculations Complete');

        $scope.ActualTier1LeverageRatioCapital = sum;
    };

    var doCalculations = function () {
        tier1LeverageRatio();
        banksMinimumPolicy();
        compositeRiskScoreCreditRisk();
        compositeRiskScoreInterestRateRisk();
        compositeRiskScoreLiquidityRisk();
        compositeRiskScoreOperationalRisk();
        compositeRiskScoreComplianceRisk();
        compositeRiskScoreStrategicRisk();
        compositeRiskScoreReputationRisk();
        riskRatingCreditRisk();
        riskRatingInterestRateRisk();
        riskRatingLiquidityRisk();
        riskRatingOperationalRisk();
        riskRatingComplianceRisk();
        riskRatingStrategicRisk();
        riskRatingReputationRisk();
        riskWeightingCreditRisk();
        riskWeightingInterestRateRisk();
        riskWeightingLiquidityRisk();
        riskWeightingOperationalRisk();
        riskWeightingComplianceRisk();
        riskWeightingStrategicRisk();
        riskWeightingReputationRisk();
        capitalRiskBufferCreditRisk();
        capitalRiskBufferInterestRateRisk();
        capitalRiskBufferLiquidityRisk();
        capitalRiskBufferOperationalRisk();
        capitalRiskBufferComplianceRisk();
        capitalRiskBufferStrategicRisk();
        capitalRiskBufferReputationRisk();
        weightedRiskBufferCreditRisk();
        weightedRiskBufferInterestRateRisk();
        weightedRiskBufferLiquidityRisk();
        weightedRiskBufferOperationalRisk();
        weightedRiskBufferComplianceRisk();
        weightedRiskBufferStrategicRisk();
        weightedRiskBufferReputationRisk();
        tier1CapitalCreditRisk();
        tier1CapitalInterestRateRisk();
        tier1CapitalLiquidityRisk();
        tier1CapitalOperationalRisk();
        tier1CapitalComplianceRisk();
        tier1CapitalStrategicRisk();
        tier1CapitalReputationRisk();
        totalRiskWeighting();
        totalCompositeRiskScore();
        totalWeightedRiskBuffer();
        totalTier1Capital();
        lowCreditRisk();
        lowInterestRateRisk();
        lowLiquidityRisk();
        lowOperationalRisk();
        lowComplianceRisk();
        lowStrategicRisk();
        lowReputationRisk();
        lowModerateCreditRisk();
        lowModerateInterestRateRisk();
        lowModerateLiquidityRisk();
        lowModerateOperationalRisk();
        lowModerateComplianceRisk();
        lowModerateStrategicRisk();
        lowModerateReputationRisk();
        moderateCreditRisk();
        moderateInterestRateRisk();
        moderateLiquidityRisk();
        moderateOperationalRisk();
        moderateComplianceRisk();
        moderateStrategicRisk();
        moderateReputationRisk();
        moderateHighCreditRisk();
        moderateHighInterestRateRisk();
        moderateHighLiquidityRisk();
        moderateHighOperationalRisk();
        moderateHighComplianceRisk();
        moderateHighStrategicRisk();
        moderateHighReputationRisk();
        highCreditRisk();
        highInterestRateRisk();
        highLiquidityRisk();
        highOperationalRisk();
        highComplianceRisk();
        highStrategicRisk();
        highReputationRisk();
        lowTotal();
        lowModerateTotal();
        moderateTotal();
        moderateHighTotal();
        highTotal();
        regulatoryMinimumWeightedRiskBuffer();
        impliedMinimumWeightedRiskBuffer();
        banksMinimumWeightedRiskBuffer();
        banksMinimumLessImpliedMinimumWeightedRiskBuffer();
        banksTier1LeverageRatioWeightedRiskBuffer();
        riskAssessBufferTier1LeverageLessImpliedMinWeightedRiskBuffer();
        bufferImpliedMinimumWeightedRiskBuffer();
        bufferBanksMinimumWeightedRiskBuffer();
        tier1LeverageLessBanksMinimumWeightedRiskBuffer();
        actualTier1LeverageRatioWeightedRiskBuffer();
        regulatoryMinimumCapital();
        impliedMinimumCapital();
        banksMinimumCapital();
        banksMinimumLessImpliedMinimumCapital();
        banksTier1LeverageRatioCapital();
        riskAssessBufferTier1LeverageLessImpliedMinCapital();
        bufferImpliedMinimumCapital();
        bufferBanksMinimumCapital();
        tier1LeverageLessBanksMinimumCapital();
        actualTier1LeverageRatioCapital();
    }

    $scope.$on('VitalsArrived', function (event, arg) {
        angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
        doCalculations();
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual T1 Leverage Ratio', value: $scope.ActualTier1LeverageRatioWeightedRiskBuffer });
        renderTier1CapitalRatioChart('chart-container', chartData, '');
    });

    $scope.$on('ModelSelectionChanged', function (event, arg) {
        angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
        doCalculations();
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual T1 Leverage Ratio', value: $scope.ActualTier1LeverageRatioWeightedRiskBuffer });
        renderTier1CapitalRatioChart('chart-container', chartData, '');
    });

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else {
            return $filter('number')(numericValue, fractionSize);
        }
    }

    var getCramDashboardConcepts = function (bankKey, period) {
        $rootScope.SelectedBankVitals = {};
        var dashboardParams = {
            InstitutionKey: bankKey,
            Period: period
        }
        var req = {
            method: 'POST',
            url: '/api/Cram/GetCramDashboardConcepts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dashboardParams
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                angular.element(document.querySelector('#loaderTier1Leverage')).addClass('hidden');
                $rootScope.SelectedBankVitals = result.data;
                if (typeof $rootScope.AdjustBankData.Tier1Capital !== 'undefined' && $rootScope.AdjustBankData.Tier1Capital !== "" && $rootScope.AdjustBankData.Tier1Capital !== null)
                    $rootScope.SelectedBankVitals.tier1Capital = $rootScope.AdjustBankData.Tier1Capital;

                if (typeof $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== 'undefined' && $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== "" && $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== null)
                    $rootScope.SelectedBankVitals.totalAssetsLeveragePurposes = $rootScope.AdjustBankData.TotalAssetsLeveragePurposes;

                if (typeof $rootScope.AdjustBankData.CommonEquityTier1Capital !== 'undefined' && $rootScope.AdjustBankData.CommonEquityTier1Capital !== "" && $rootScope.AdjustBankData.CommonEquityTier1Capital !== null)
                    $rootScope.SelectedBankVitals.commonEquityTier1Capital = $rootScope.AdjustBankData.CommonEquityTier1Capital;

                if (typeof $rootScope.AdjustBankData.TotalRiskWeightedAssets !== 'undefined' && $rootScope.AdjustBankData.TotalRiskWeightedAssets !== "" && $rootScope.AdjustBankData.TotalRiskWeightedAssets !== null)
                    $rootScope.SelectedBankVitals.totalRiskWeightedAssets = $rootScope.AdjustBankData.TotalRiskWeightedAssets;

                if (typeof $rootScope.AdjustBankData.TotalCapital !== 'undefined' && $rootScope.AdjustBankData.TotalCapital !== "" && $rootScope.AdjustBankData.TotalCapital !== null)
                    $rootScope.SelectedBankVitals.totalCapital = $rootScope.AdjustBankData.TotalCapital;
                doCalculations();
                var chartData = [];
                chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
                chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
                chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
                chartData.push({ label: 'Actual T1 Leverage Ratio', value: $scope.ActualTier1LeverageRatioWeightedRiskBuffer });
                renderTier1CapitalRatioChart('chart-container', chartData, '');
            }
        }, function () {
            angular.element(document.querySelector('#loaderTier1Leverage')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get dashboard concepts. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var getPastFiveQuarters = function () {
        //angular.element(document.querySelector('#incomeStatementDataLoader')).removeClass('hidden');
        var req = {
            method: 'GET',
            url: '/api/BankToBankAnalyzer/GetLastFiveQuarters',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {

                //angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
                $scope.Periods = result.data;
                $rootScope.SelectedPeriod = $scope.Periods[0];
                getCramDashboardConcepts($rootScope.SelectedBank.institutionKey, $rootScope.SelectedPeriod.value);
            }
        }, function () {
            angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while loading the financial periods. Please send an e-mail to admin@cb-resource.com.');
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

    $scope.RefreshDataOnPeriodChange = function ($event, periodObj) {
        $rootScope.SelectedPeriod = periodObj;
        angular.element(document.querySelector('#loaderTier1Leverage')).removeClass('hidden');
        getCramDashboardConcepts($rootScope.SelectedBank.institutionKey, $rootScope.SelectedPeriod.value);
    }

    $scope.$on('CalculationsCompleteTier1LeverageRatio', function (event, arg) {
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual T1 Leverage Ratio', value: $scope.ActualTier1LeverageRatioWeightedRiskBuffer });
        renderTier1CapitalRatioChart('chart-container', chartData, '');
    });

    var initialize = function () {
        getPastFiveQuarters();
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("cramCET1CapitalRatioViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.Periods = [];

    $scope.BanksMinimumPolicy = 0;
    $scope.CompositeRiskScoreCreditRisk = 0;
    $scope.CompositeRiskScoreInterestRateRisk = 0;
    $scope.CompositeRiskScoreLiquidityRisk = 0;
    $scope.CompositeRiskScoreOperationalRisk = 0;
    $scope.CompositeRiskScoreComplianceRisk = 0;
    $scope.CompositeRiskScoreStrategicRisk = 0;
    $scope.CompositeRiskScoreReputationRisk = 0;
    $scope.RiskRatingCreditRisk = '';
    $scope.RiskRatingInterestRateRisk = '';
    $scope.RiskRatingLiquidityRisk = '';
    $scope.RiskRatingOperationalRisk = '';
    $scope.RiskRatingComplianceRisk = '';
    $scope.RiskRatingStrategicRisk = '';
    $scope.RiskRatingReputationRisk = '';
    $scope.RiskWeightingCreditRisk = 0;
    $scope.RiskWeightingInterestRateRisk = 0;
    $scope.RiskWeightingLiquidityRisk = 0;
    $scope.RiskWeightingOperationalRisk = 0;
    $scope.RiskWeightingComplianceRisk = 0;
    $scope.RiskWeightingStrategicRisk = 0;
    $scope.RiskWeightingReputationRisk = 0;
    $scope.CapitalRiskBufferCreditRisk = 0;
    $scope.CapitalRiskBufferInterestRateRisk = 0;
    $scope.CapitalRiskBufferLiquidityRisk = 0;
    $scope.CapitalRiskBufferOperationalRisk = 0;
    $scope.CapitalRiskBufferComplianceRisk = 0;
    $scope.CapitalRiskBufferStrategicRisk = 0;
    $scope.CapitalRiskBufferReputationRisk = 0;
    $scope.WeightedRiskBufferCreditRisk = 0;
    $scope.WeightedRiskBufferInterestRateRisk = 0;
    $scope.WeightedRiskBufferLiquidityRisk = 0;
    $scope.WeightedRiskBufferOperationalRisk = 0;
    $scope.WeightedRiskBufferComplianceRisk = 0;
    $scope.WeightedRiskBufferStrategicRisk = 0;
    $scope.WeightedRiskBufferReputationRisk = 0;
    $scope.Cet1CapitalCreditRisk = 0;
    $scope.Cet1CapitalInterestRateRisk = 0;
    $scope.Cet1CapitalLiquidityRisk = 0;
    $scope.Cet1CapitalOperationalRisk = 0;
    $scope.Cet1CapitalComplianceRisk = 0;
    $scope.Cet1CapitalStrategicRisk = 0;
    $scope.Cet1CapitalReputationRisk = 0;
    $scope.TotalCompositeRiskScore = 0;
    $scope.TotalRiskWeighting = 0;
    $scope.TotalWeightedRiskBuffer = 0;
    $scope.TotalCet1Capital = 0;
    $scope.LowCreditRisk = 0;
    $scope.LowInterestRateRisk = 0;
    $scope.LowLiquidityRisk = 0;
    $scope.LowOperationalRisk = 0;
    $scope.LowComplianceRisk = 0;
    $scope.LowStrategicRisk = 0;
    $scope.LowReputationRisk = 0;
    $scope.LowModerateCreditRisk = 0;
    $scope.LowModerateInterestRateRisk = 0;
    $scope.LowModerateLiquidityRisk = 0;
    $scope.LowModerateOperationalRisk = 0;
    $scope.LowModerateComplianceRisk = 0;
    $scope.LowModerateStrategicRisk = 0;
    $scope.LowModerateReputationRisk = 0;
    $scope.ModerateCreditRisk = 0;
    $scope.ModerateInterestRateRisk = 0;
    $scope.ModerateLiquidityRisk = 0;
    $scope.ModerateOperationalRisk = 0;
    $scope.ModerateComplianceRisk = 0;
    $scope.ModerateStrategicRisk = 0;
    $scope.ModerateReputationRisk = 0;
    $scope.ModerateHighCreditRisk = 0;
    $scope.ModerateHighInterestRateRisk = 0;
    $scope.ModerateHighLiquidityRisk = 0;
    $scope.ModerateHighOperationalRisk = 0;
    $scope.ModerateHighComplianceRisk = 0;
    $scope.ModerateHighStrategicRisk = 0;
    $scope.ModerateHighReputationRisk = 0;
    $scope.HighCreditRisk = 0;
    $scope.HighInterestRateRisk = 0;
    $scope.HighLiquidityRisk = 0;
    $scope.HighOperationalRisk = 0;
    $scope.HighComplianceRisk = 0;
    $scope.HighStrategicRisk = 0;
    $scope.HighReputationRisk = 0;
    $scope.LowTotal = 0;
    $scope.LowModerateTotal = 0;
    $scope.ModerateTotal = 0;
    $scope.ModerateHighTotal = 0;
    $scope.HighTotal = 0;
    $scope.RegulatoryMinimumWeightedRiskBuffer = 0;
    $scope.ImpliedMinimumWeightedRiskBuffer = 0;
    $scope.BanksMinimumWeightedRiskBuffer = 0;
    $scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer = 0;
    $scope.BanksCet1CapitalRatioWeightedRiskBuffer = 0;
    $scope.RiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer = 0;
    $scope.BufferImpliedMinimumWeightedRiskBuffer = 0;
    $scope.BufferBanksMinimumWeightedRiskBuffer = 0;
    $scope.Cet1CapitalLessBanksMinimumWeightedRiskBuffer = 0;
    $scope.ActualCet1CapitalRatioWeightedRiskBuffer = 0;
    $scope.RegulatoryMinimumCapital = 0;
    $scope.ImpliedMinimumCapital = 0;
    $scope.BanksMinimumCapital = 0;
    $scope.BanksMinimumLessImpliedMinimumCapital = 0;
    $scope.BanksCet1CapitalRatioCapital = 0;
    $scope.RiskAssessBufferCet1CapitalLessImpliedMinCapital = 0;
    $scope.BufferImpliedMinimumCapital = 0;
    $scope.BufferBanksMinimumCapital = 0;
    $scope.Cet1CapitalLessBanksMinimumCapital = 0;
    $scope.ActualCet1CapitalRatioCapital = 0;


    var getSelectedModelName = function () {
        $rootScope.CramModelDisplayName = 'Create/Edit Scenario';

        if ($scope.CramModels.length > 0) {
            var selectedModel = $scope.CramModels.filter(function (obj) {
                return obj.isSelected === true;
            })[0];

            if (typeof selectedModel !== 'undefined' && selectedModel !== null) {
                $rootScope.CramModelDisplayName = selectedModel.modelName;
            }
        }
        else {
            $rootScope.CramModelDisplayName = 'Create/Edit Scenario';
        }
    }

    var renderCet1CapitalRatioChart = function (chartContainerName, chartData, yAxisLabel) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": "Capital Risk Allocation Model",
                    "subCaption": "CET1 Capital Ratio",
                    "showBorder": "1",
                    "borderColor": "#cccccc",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": "#E0A025,#F4D00c,#0093D1,#173967,#A71D23",
                    "bgColor": "#ffffff",
                    "borderAlpha": "20",
                    "canvasBorderAlpha": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "rotatevalues": "0",
                    "valueFontColor": "#00000",
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
                    "decimals": "4",
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
                var cet1CapitalRatioChart = FusionCharts.items.cet1CapitalRatioBarChart;
                if (typeof cet1CapitalRatioChart === 'undefined') {
                    cet1CapitalRatioChart = new FusionCharts({
                        type: 'column2d',
                        id: 'cet1CapitalRatioBarChart',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });

                    cet1CapitalRatioChart.render();
                }
                else {
                    cet1CapitalRatioChart.setChartData(dSource, 'json');
                    cet1CapitalRatioChart.render();
                }
            } // if block ends here
        });
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else {
            return $filter('number')(numericValue, fractionSize);
        }
    }

    var cet1CapitalRatio = function () {
        $rootScope.SelectedBankVitals.ceT1CapitalRatio = ($rootScope.SelectedBankVitals.commonEquityTier1Capital / $rootScope.SelectedBankVitals.totalRiskWeightedAssets) * 100;
    }

    var banksMinimumPolicy = function () {
        if ($rootScope.AdjustBankData.CET1CapitalRatio === '' || $rootScope.AdjustBankData.CET1CapitalRatio === null)
            $scope.BanksMinimumPolicy = 8;
        else
            $scope.BanksMinimumPolicy = $rootScope.AdjustBankData.CET1CapitalRatio;
    }

    var compositeRiskScoreCreditRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.CreditRisk === '' || $rootScope.RiskCategoriesAndWeights.CreditRisk === null)
            $scope.CompositeRiskScoreCreditRisk = 0;
        else
            $scope.CompositeRiskScoreCreditRisk = $rootScope.RiskCategoriesAndWeights.CreditRisk;
    };

    var compositeRiskScoreInterestRateRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.InterestRateRisk === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRisk === null)
            $scope.CompositeRiskScoreInterestRateRisk = 0;
        else
            $scope.CompositeRiskScoreInterestRateRisk = $rootScope.RiskCategoriesAndWeights.InterestRateRisk;
    };

    var compositeRiskScoreLiquidityRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.LiquidityRisk === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRisk === null)
            $scope.CompositeRiskScoreLiquidityRisk = 0;
        else
            $scope.CompositeRiskScoreLiquidityRisk = $rootScope.RiskCategoriesAndWeights.LiquidityRisk;
    };

    var compositeRiskScoreOperationalRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.OperationalRisk === '' || $rootScope.RiskCategoriesAndWeights.OperationalRisk === null)
            $scope.CompositeRiskScoreOperationalRisk = 0;
        else
            $scope.CompositeRiskScoreOperationalRisk = $rootScope.RiskCategoriesAndWeights.OperationalRisk;
    };

    var compositeRiskScoreComplianceRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ComplianceRisk === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRisk === null)
            $scope.CompositeRiskScoreComplianceRisk = 0;
        else
            $scope.CompositeRiskScoreComplianceRisk = $rootScope.RiskCategoriesAndWeights.ComplianceRisk;
    };

    var compositeRiskScoreStrategicRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.StrategicRisk === '' || $rootScope.RiskCategoriesAndWeights.StrategicRisk === null)
            $scope.CompositeRiskScoreStrategicRisk = 0;
        else
            $scope.CompositeRiskScoreStrategicRisk = $rootScope.RiskCategoriesAndWeights.StrategicRisk;
    };

    var compositeRiskScoreReputationRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ReputationRisk === '' || $rootScope.RiskCategoriesAndWeights.ReputationRisk === null)
            $scope.CompositeRiskScoreReputationRisk = 0;
        else
            $scope.CompositeRiskScoreReputationRisk = $rootScope.RiskCategoriesAndWeights.ReputationRisk;
    };

    $scope.GetRatingColorClass = function (rating) {
        var ratingclass = '';

        if (rating === 'Low')
            ratingclass = 'green-color';
        else if (rating === 'Low-Moderate')
            ratingclass = 'light-green-color';
        else if (rating === 'Moderate')
            ratingclass = 'yellow-color';
        else if (rating === 'Moderate-High')
            ratingclass = 'orange-color';
        else if (rating === 'High')
            ratingclass = 'red-color';
        else
            ratingclass = 'grey-color';

        return ratingclass;
    }

    var riskRatingCreditRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreCreditRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingCreditRisk = rating;
    };

    var riskRatingInterestRateRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingInterestRateRisk = rating;
    };

    var riskRatingLiquidityRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingLiquidityRisk = rating;
    };

    var riskRatingOperationalRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingOperationalRisk = rating;
    };

    var riskRatingComplianceRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingComplianceRisk = rating;
    };

    var riskRatingStrategicRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingStrategicRisk = rating;
    };

    var riskRatingReputationRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreReputationRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingReputationRisk = rating;
    };

    var countblank = function () {
        var count = 0;
        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === null)
            count++;

        return count;
    }

    var riskWeightingCreditRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === 'undefined') {
            $scope.RiskWeightingCreditRisk = 0;
        }
        else {
            $scope.RiskWeightingCreditRisk = $rootScope.RiskCategoriesAndWeights.CreditRiskWeight;
        }
    };

    var riskWeightingInterestRateRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === 'undefined') {
            $scope.RiskWeightingInterestRateRisk = 0;
        }
        else {
            $scope.RiskWeightingInterestRateRisk = $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight;
        }
    };

    var riskWeightingLiquidityRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === 'undefined') {
            $scope.RiskWeightingLiquidityRisk = 0;
        }
        else {
            $scope.RiskWeightingLiquidityRisk = $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight;
        }
    };

    var riskWeightingOperationalRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === 'undefined') {
            $scope.RiskWeightingOperationalRisk = 0;
        }
        else {
            $scope.RiskWeightingOperationalRisk = $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight;
        }
    };

    var riskWeightingComplianceRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === 'undefined') {
            $scope.RiskWeightingComplianceRisk = 0;
        }
        else {
            $scope.RiskWeightingComplianceRisk = $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight;
        }
    };

    var riskWeightingStrategicRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === 'undefined') {
            $scope.RiskWeightingStrategicRisk = 0;
        }
        else {
            $scope.RiskWeightingStrategicRisk = $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight;
        }
    };

    var riskWeightingReputationRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === 'undefined') {
            $scope.RiskWeightingReputationRisk = 0;
        }
        else {
            $scope.RiskWeightingReputationRisk = $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight;
        }
    };

    var capitalRiskBufferCreditRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreCreditRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferCreditRisk = riskBuffer;
    };

    var capitalRiskBufferInterestRateRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferInterestRateRisk = riskBuffer;
    };

    var capitalRiskBufferLiquidityRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferLiquidityRisk = riskBuffer;
    };

    var capitalRiskBufferOperationalRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferOperationalRisk = riskBuffer;
    };

    var capitalRiskBufferComplianceRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferComplianceRisk = riskBuffer;
    };

    var capitalRiskBufferStrategicRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferStrategicRisk = riskBuffer;
    };

    var capitalRiskBufferReputationRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreReputationRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferReputationRisk = riskBuffer;
    };

    var weightedRiskBufferCreditRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingCreditRisk) > 0 && parseFloat($scope.CapitalRiskBufferCreditRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingCreditRisk) * parseFloat($scope.CapitalRiskBufferCreditRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferCreditRisk = riskBuffer;
    };

    var weightedRiskBufferInterestRateRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingInterestRateRisk) > 0 && parseFloat($scope.CapitalRiskBufferInterestRateRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingInterestRateRisk) * parseFloat($scope.CapitalRiskBufferInterestRateRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferInterestRateRisk = riskBuffer;
    };

    var weightedRiskBufferLiquidityRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingLiquidityRisk) > 0 && parseFloat($scope.CapitalRiskBufferLiquidityRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingLiquidityRisk) * parseFloat($scope.CapitalRiskBufferLiquidityRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferLiquidityRisk = riskBuffer;
    };

    var weightedRiskBufferOperationalRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingOperationalRisk) > 0 && parseFloat($scope.CapitalRiskBufferOperationalRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingOperationalRisk) * parseFloat($scope.CapitalRiskBufferOperationalRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferOperationalRisk = riskBuffer;
    };

    var weightedRiskBufferComplianceRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingComplianceRisk) > 0 && parseFloat($scope.CapitalRiskBufferComplianceRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingComplianceRisk) * parseFloat($scope.CapitalRiskBufferComplianceRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferComplianceRisk = riskBuffer;
    };

    var weightedRiskBufferStrategicRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingStrategicRisk) > 0 && parseFloat($scope.CapitalRiskBufferStrategicRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingStrategicRisk) * parseFloat($scope.CapitalRiskBufferStrategicRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferStrategicRisk = riskBuffer;
    };

    var weightedRiskBufferReputationRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingReputationRisk) > 0 && parseFloat($scope.CapitalRiskBufferReputationRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingReputationRisk) * parseFloat($scope.CapitalRiskBufferReputationRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferReputationRisk = riskBuffer;
    };

    var cet1CapitalCreditRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferCreditRisk === '' || $scope.WeightedRiskBufferCreditRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
        }

        $scope.Cet1CapitalCreditRisk = Cet1capital;
    };

    var cet1CapitalInterestRateRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferInterestRateRisk === '' || $scope.WeightedRiskBufferInterestRateRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
        }

        $scope.Cet1CapitalInterestRateRisk = Cet1capital;
    };

    var cet1CapitalLiquidityRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferLiquidityRisk === '' || $scope.WeightedRiskBufferLiquidityRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
        }

        $scope.Cet1CapitalLiquidityRisk = Cet1capital;
    };

    var cet1CapitalOperationalRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferOperationalRisk === '' || $scope.WeightedRiskBufferOperationalRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
        }

        $scope.Cet1CapitalOperationalRisk = Cet1capital;
    };

    var cet1CapitalComplianceRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferComplianceRisk === '' || $scope.WeightedRiskBufferComplianceRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
        }

        $scope.Cet1CapitalComplianceRisk = Cet1capital;
    };

    var cet1CapitalStrategicRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferStrategicRisk === '' || $scope.WeightedRiskBufferStrategicRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
        }

        $scope.Cet1CapitalStrategicRisk = Cet1capital;
    };

    var cet1CapitalReputationRisk = function () {
        var Cet1capital = 0;
        if ($scope.WeightedRiskBufferReputationRisk === '' || $scope.WeightedRiskBufferReputationRisk === 0) {
            Cet1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Cet1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
            else {
                Cet1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
        }

        $scope.Cet1CapitalReputationRisk = Cet1capital;
    };

    var totalCompositeRiskScore = function () {
        var totalCompositeScore = '';
        try {
            var mul1 = parseFloat($scope.CompositeRiskScoreCreditRisk) * parseFloat($scope.RiskWeightingCreditRisk);
            var mul2 = parseFloat($scope.CompositeRiskScoreInterestRateRisk) * parseFloat($scope.RiskWeightingInterestRateRisk);
            var mul3 = parseFloat($scope.CompositeRiskScoreLiquidityRisk) * parseFloat($scope.RiskWeightingLiquidityRisk);
            var mul4 = parseFloat($scope.CompositeRiskScoreOperationalRisk) * parseFloat($scope.RiskWeightingOperationalRisk);
            var mul5 = parseFloat($scope.CompositeRiskScoreComplianceRisk) * parseFloat($scope.RiskWeightingComplianceRisk);
            var mul6 = parseFloat($scope.CompositeRiskScoreStrategicRisk) * parseFloat($scope.RiskWeightingStrategicRisk);
            var mul7 = parseFloat($scope.CompositeRiskScoreReputationRisk) * parseFloat($scope.RiskWeightingReputationRisk);
            var sum = mul1 + mul2 + mul3 + mul4 + mul5 + mul6 + mul7;
            totalCompositeScore = sum / $scope.TotalRiskWeighting;
        }
        catch (err) {
            sum = parseInt($scope.CompositeRiskScoreCreditRisk()) +
                parseInt($scope.CompositeRiskScoreInterestRateRisk()) +
                parseInt($scope.CompositeRiskScoreLiquidityRisk()) +
                parseInt($scope.CompositeRiskScoreOperationalRisk()) +
                parseInt($scope.CompositeRiskScoreComplianceRisk()) +
                parseInt($scope.CompositeRiskScoreStrategicRisk()) +
                parseInt($scope.CompositeRiskScoreReputationRisk());
            totalCompositeScore = sum / 7;
        }

        $scope.TotalCompositeRiskScore = totalCompositeScore;
    };

    var totalRiskWeighting = function () {
        var total = parseFloat($scope.RiskWeightingCreditRisk) +
            parseFloat($scope.RiskWeightingInterestRateRisk) +
            parseFloat($scope.RiskWeightingLiquidityRisk) +
            parseFloat($scope.RiskWeightingOperationalRisk) +
            parseFloat($scope.RiskWeightingComplianceRisk) +
            parseFloat($scope.RiskWeightingStrategicRisk) +
            parseFloat($scope.RiskWeightingReputationRisk);

        $scope.TotalRiskWeighting = total;
    };

    var totalWeightedRiskBuffer = function () {
        var total = parseFloat($scope.WeightedRiskBufferCreditRisk) +
            parseFloat($scope.WeightedRiskBufferInterestRateRisk) +
            parseFloat($scope.WeightedRiskBufferLiquidityRisk) +
            parseFloat($scope.WeightedRiskBufferOperationalRisk) +
            parseFloat($scope.WeightedRiskBufferComplianceRisk) +
            parseFloat($scope.WeightedRiskBufferStrategicRisk) +
            parseFloat($scope.WeightedRiskBufferReputationRisk);

        $scope.TotalWeightedRiskBuffer = total;
    };

    var totalCet1Capital = function () {
        var totalTier1capital = 0;
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            totaltier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }
        else {
            totaltier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }

        $scope.TotalCet1Capital = totaltier1capital;
    };

    var lowCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowCreditRisk = risk;
    };

    var lowInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowInterestRateRisk = risk;
    };

    var lowLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowLiquidityRisk = risk;
    };

    var lowOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowOperationalRisk = risk;
    };

    var lowComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowComplianceRisk = risk;
    };

    var lowStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowStrategicRisk = risk;
    };

    var lowReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowReputationRisk = risk;
    };

    var lowModerateCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateCreditRisk = risk;
    };

    var lowModerateInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateInterestRateRisk = risk;
    };

    var lowModerateLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateLiquidityRisk = risk;
    };

    var lowModerateOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateOperationalRisk = risk;
    };

    var lowModerateComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateComplianceRisk = risk;
    };

    var lowModerateStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateStrategicRisk = risk;
    };

    var lowModerateReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateReputationRisk = risk;
    };

    var moderateCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateCreditRisk = risk;
    };

    var moderateInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateInterestRateRisk = risk;
    };

    var moderateLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateLiquidityRisk = risk;
    };

    var moderateOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateOperationalRisk = risk;
    };

    var moderateComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateComplianceRisk = risk;
    };

    var moderateStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateStrategicRisk = risk;
    };

    var moderateReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateReputationRisk = risk;
    };

    var moderateHighCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighCreditRisk = risk;
    };

    var moderateHighInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighInterestRateRisk = risk;
    };

    var moderateHighLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighLiquidityRisk = risk;
    };

    var moderateHighOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighOperationalRisk = risk;
    };

    var moderateHighComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighComplianceRisk = risk;
    };

    var moderateHighStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighStrategicRisk = risk;
    };

    var moderateHighReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighReputationRisk = risk;
    };

    var highCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighCreditRisk = risk;
    };

    var highInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighInterestRateRisk = risk;
    };

    var highLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighLiquidityRisk = risk;
    };

    var highOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighOperationalRisk = risk;
    };

    var highComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighComplianceRisk = risk;
    };

    var highStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighStrategicRisk = risk;
    };

    var highReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighReputationRisk = risk;
    };

    var lowTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowTotal = risk;
    };

    var lowModerateTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateTotal = risk;
    };

    var moderateTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateTotal = risk;
    };

    var moderateHighTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighTotal = risk;
    };

    var highTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighTotal = risk;
    };

    var regulatoryMinimumWeightedRiskBuffer = function () {
        $scope.RegulatoryMinimumWeightedRiskBuffer = 6.5;
    };

    var impliedMinimumWeightedRiskBuffer = function () {
        $scope.ImpliedMinimumWeightedRiskBuffer = parseFloat($scope.TotalWeightedRiskBuffer) + $scope.RegulatoryMinimumWeightedRiskBuffer;
    };

    var banksMinimumWeightedRiskBuffer = function () {
        if ($rootScope.AdjustBankData.CET1CapitalRatio === '' || $rootScope.AdjustBankData.CET1CapitalRatio === null)
            $scope.BanksMinimumWeightedRiskBuffer = $scope.BanksMinimumPolicy;
        else
            $scope.BanksMinimumWeightedRiskBuffer = $rootScope.AdjustBankData.CET1CapitalRatio;
    };

    var banksMinimumLessImpliedMinimumWeightedRiskBuffer = function () {
        $scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer = parseFloat($scope.BanksMinimumWeightedRiskBuffer) - parseFloat($scope.ImpliedMinimumWeightedRiskBuffer);
    };

    var banksCet1CapitalRatioWeightedRiskBuffer = function () {
        if ($rootScope.AdjustBankData.Tier1Capital === '' || $rootScope.AdjustBankData.Tier1Capital === null)
            $scope.BanksCet1CapitalRatioWeightedRiskBuffer = $rootScope.SelectedBankVitals.ceT1CapitalRatio;
        else
            $scope.BanksCet1CapitalRatioWeightedRiskBuffer = (parseFloat($rootScope.SelectedBankVitals.commonEquityTier1Capital) / parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets)) * 100;
    };

    var riskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer = function () {
        $scope.RiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer = parseFloat($scope.BanksCet1CapitalRatioWeightedRiskBuffer) - parseFloat($scope.ImpliedMinimumWeightedRiskBuffer);
    };

    var bufferImpliedMinimumWeightedRiskBuffer = function () {
        $scope.BufferImpliedMinimumWeightedRiskBuffer = parseFloat($scope.ImpliedMinimumWeightedRiskBuffer) - $scope.RegulatoryMinimumWeightedRiskBuffer;
    };

    var bufferBanksMinimumWeightedRiskBuffer = function () {
        $scope.BufferBanksMinimumWeightedRiskBuffer = parseFloat($scope.BanksMinimumWeightedRiskBuffer) - parseFloat($scope.ImpliedMinimumWeightedRiskBuffer);
    };

    var cet1CapitalLessBanksMinimumWeightedRiskBuffer = function () {
        $scope.Cet1CapitalLessBanksMinimumWeightedRiskBuffer = $scope.BanksCet1CapitalRatioWeightedRiskBuffer - $scope.BanksMinimumWeightedRiskBuffer;
    };

    var actualCet1CapitalRatioWeightedRiskBuffer = function () {
        $scope.ActualCet1CapitalRatioWeightedRiskBuffer = parseFloat($scope.RegulatoryMinimumWeightedRiskBuffer) +
            parseFloat($scope.BufferImpliedMinimumWeightedRiskBuffer) +
            parseFloat($scope.BufferBanksMinimumWeightedRiskBuffer) +
            parseFloat($scope.Cet1CapitalLessBanksMinimumWeightedRiskBuffer);
    };

    var regulatoryMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.RegulatoryMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.RegulatoryMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.RegulatoryMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.RegulatoryMinimumWeightedRiskBuffer / 100);
        }
    };

    var impliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.ImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.ImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.ImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.ImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var banksMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.BanksMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.BanksMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.BanksMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.BanksMinimumWeightedRiskBuffer / 100);
        }
    };

    var banksMinimumLessImpliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.BanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.BanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var banksCet1CapitalRatioCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.BanksCet1CapitalRatioCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.BanksCet1CapitalRatioWeightedRiskBuffer / 100);
        }
        else {
            $scope.BanksCet1CapitalRatioCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.BanksCet1CapitalRatioWeightedRiskBuffer / 100);
        }
    };

    var riskAssessBufferCet1CapitalLessImpliedMinCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.RiskAssessBufferCet1CapitalLessImpliedMinCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.RiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer / 100);
        }
        else {
            $scope.RiskAssessBufferCet1CapitalLessImpliedMinCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.RiskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer / 100);
        }
    };

    var bufferImpliedMinimumCapital = function () {
        $scope.BufferImpliedMinimumCapital = parseFloat($scope.ImpliedMinimumCapital) - $scope.RegulatoryMinimumCapital;
    };

    var bufferBanksMinimumCapital = function () {
        $scope.BufferBanksMinimumCapital = parseFloat($scope.BanksMinimumCapital) - parseFloat($scope.ImpliedMinimumCapital);
    };

    var cet1CapitalLessBanksMinimumCapital = function () {
        $scope.Cet1CapitalLessBanksMinimumCapital = $scope.BanksCet1CapitalRatioCapital - $scope.BanksMinimumCapital;
    };

    var actualCet1CapitalRatioCapital = function () {
        var sum = parseFloat($scope.RegulatoryMinimumCapital) +
            parseFloat($scope.BufferImpliedMinimumCapital) +
            parseFloat($scope.BufferBanksMinimumCapital) +
            parseFloat($scope.Cet1CapitalLessBanksMinimumCapital);

        $scope.ActualCet1CapitalRatioCapital = sum;
        $rootScope.$broadcast('CalculationsCompleteCet1LeverageRatio', 'Calculations Complete');
    };

    var doCalculations = function () {
        cet1CapitalRatio();
        banksMinimumPolicy();
        compositeRiskScoreCreditRisk();
        compositeRiskScoreInterestRateRisk();
        compositeRiskScoreLiquidityRisk();
        compositeRiskScoreOperationalRisk();
        compositeRiskScoreComplianceRisk();
        compositeRiskScoreStrategicRisk();
        compositeRiskScoreReputationRisk();
        riskRatingCreditRisk();
        riskRatingInterestRateRisk();
        riskRatingLiquidityRisk();
        riskRatingOperationalRisk();
        riskRatingComplianceRisk();
        riskRatingStrategicRisk();
        riskRatingReputationRisk();
        riskWeightingCreditRisk();
        riskWeightingInterestRateRisk();
        riskWeightingLiquidityRisk();
        riskWeightingOperationalRisk();
        riskWeightingComplianceRisk();
        riskWeightingStrategicRisk();
        riskWeightingReputationRisk();
        capitalRiskBufferCreditRisk();
        capitalRiskBufferInterestRateRisk();
        capitalRiskBufferLiquidityRisk();
        capitalRiskBufferOperationalRisk();
        capitalRiskBufferComplianceRisk();
        capitalRiskBufferStrategicRisk();
        capitalRiskBufferReputationRisk();
        weightedRiskBufferCreditRisk();
        weightedRiskBufferInterestRateRisk();
        weightedRiskBufferLiquidityRisk();
        weightedRiskBufferOperationalRisk();
        weightedRiskBufferComplianceRisk();
        weightedRiskBufferStrategicRisk();
        weightedRiskBufferReputationRisk();
        cet1CapitalCreditRisk();
        cet1CapitalInterestRateRisk();
        cet1CapitalLiquidityRisk();
        cet1CapitalOperationalRisk();
        cet1CapitalComplianceRisk();
        cet1CapitalStrategicRisk();
        cet1CapitalReputationRisk();
        totalRiskWeighting();
        totalCompositeRiskScore();
        totalWeightedRiskBuffer();
        totalCet1Capital();
        lowCreditRisk();
        lowInterestRateRisk();
        lowLiquidityRisk();
        lowOperationalRisk();
        lowComplianceRisk();
        lowStrategicRisk();
        lowReputationRisk();
        lowModerateCreditRisk();
        lowModerateInterestRateRisk();
        lowModerateLiquidityRisk();
        lowModerateOperationalRisk();
        lowModerateComplianceRisk();
        lowModerateStrategicRisk();
        lowModerateReputationRisk();
        moderateCreditRisk();
        moderateInterestRateRisk();
        moderateLiquidityRisk();
        moderateOperationalRisk();
        moderateComplianceRisk();
        moderateStrategicRisk();
        moderateReputationRisk();
        moderateHighCreditRisk();
        moderateHighInterestRateRisk();
        moderateHighLiquidityRisk();
        moderateHighOperationalRisk();
        moderateHighComplianceRisk();
        moderateHighStrategicRisk();
        moderateHighReputationRisk();
        highCreditRisk();
        highInterestRateRisk();
        highLiquidityRisk();
        highOperationalRisk();
        highComplianceRisk();
        highStrategicRisk();
        highReputationRisk();
        lowTotal();
        lowModerateTotal();
        moderateTotal();
        moderateHighTotal();
        highTotal();
        regulatoryMinimumWeightedRiskBuffer();
        impliedMinimumWeightedRiskBuffer();
        banksMinimumWeightedRiskBuffer();
        banksMinimumLessImpliedMinimumWeightedRiskBuffer();
        banksCet1CapitalRatioWeightedRiskBuffer();
        riskAssessBufferCet1CapitalLessImpliedMinWeightedRiskBuffer();
        bufferImpliedMinimumWeightedRiskBuffer();
        bufferBanksMinimumWeightedRiskBuffer();
        cet1CapitalLessBanksMinimumWeightedRiskBuffer();
        actualCet1CapitalRatioWeightedRiskBuffer();
        regulatoryMinimumCapital();
        impliedMinimumCapital();
        banksMinimumCapital();
        banksMinimumLessImpliedMinimumCapital();
        banksCet1CapitalRatioCapital();
        riskAssessBufferCet1CapitalLessImpliedMinCapital();
        bufferImpliedMinimumCapital();
        bufferBanksMinimumCapital();
        cet1CapitalLessBanksMinimumCapital();
        actualCet1CapitalRatioCapital();
    }

    $scope.$on('VitalsArrived', function (event, arg) {
        angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
        doCalculations();
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual CET 1 Capital Ratio', value: $scope.ActualCet1CapitalRatioWeightedRiskBuffer });
        renderCet1CapitalRatioChart('chart-container', chartData, '');
    });

    $scope.$on('ModelSelectionChanged', function (event, arg) {
        angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
        doCalculations();
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual CET 1 Capital Ratio', value: $scope.ActualCet1CapitalRatioWeightedRiskBuffer });
        renderCet1CapitalRatioChart('chart-container', chartData, '');
    });

    var getCramDashboardConcepts = function (bankKey, period) {
        $rootScope.SelectedBankVitals = {};
        var dashboardParams = {
            InstitutionKey: bankKey,
            Period: period
        }

        var req = {
            method: 'POST',
            url: '/api/Cram/GetCramDashboardConcepts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dashboardParams
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                angular.element(document.querySelector('#loaderCet1Capital')).addClass('hidden');
                $rootScope.SelectedBankVitals = result.data;
                if (typeof $rootScope.AdjustBankData.Tier1Capital !== 'undefined' && $rootScope.AdjustBankData.Tier1Capital !== "" && $rootScope.AdjustBankData.Tier1Capital !== null)
                    $rootScope.SelectedBankVitals.tier1Capital = $rootScope.AdjustBankData.Tier1Capital;

                if (typeof $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== 'undefined' && $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== "" && $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== null)
                    $rootScope.SelectedBankVitals.totalAssetsLeveragePurposes = $rootScope.AdjustBankData.TotalAssetsLeveragePurposes;

                if (typeof $rootScope.AdjustBankData.CommonEquityTier1Capital !== 'undefined' && $rootScope.AdjustBankData.CommonEquityTier1Capital !== "" && $rootScope.AdjustBankData.CommonEquityTier1Capital !== null)
                    $rootScope.SelectedBankVitals.commonEquityTier1Capital = $rootScope.AdjustBankData.CommonEquityTier1Capital;

                if (typeof $rootScope.AdjustBankData.TotalRiskWeightedAssets !== 'undefined' && $rootScope.AdjustBankData.TotalRiskWeightedAssets !== "" && $rootScope.AdjustBankData.TotalRiskWeightedAssets !== null)
                    $rootScope.SelectedBankVitals.totalRiskWeightedAssets = $rootScope.AdjustBankData.TotalRiskWeightedAssets;

                if (typeof $rootScope.AdjustBankData.TotalCapital !== 'undefined' && $rootScope.AdjustBankData.TotalCapital !== "" && $rootScope.AdjustBankData.TotalCapital !== null)
                    $rootScope.SelectedBankVitals.totalCapital = $rootScope.AdjustBankData.TotalCapital;
                doCalculations();
                var chartData = [];
                chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
                chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
                chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
                chartData.push({ label: 'Actual CET 1 Capital Ratio', value: $scope.ActualCet1CapitalRatioWeightedRiskBuffer });
                renderCet1CapitalRatioChart('chart-container', chartData, '');
            }
        }, function () {
            angular.element(document.querySelector('#loaderCet1Capital')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get dashboard concepts. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var getPastFiveQuarters = function () {
        //angular.element(document.querySelector('#incomeStatementDataLoader')).removeClass('hidden');
        var req = {
            method: 'GET',
            url: '/api/BankToBankAnalyzer/GetLastFiveQuarters',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {

                //angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
                $scope.Periods = result.data;
                $rootScope.SelectedPeriod = $scope.Periods[0];
                getCramDashboardConcepts($rootScope.SelectedBank.institutionKey, $rootScope.SelectedPeriod.value);
            }
        }, function () {
            angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while loading the financial periods. Please send an e-mail to admin@cb-resource.com.');
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

    $scope.RefreshDataOnPeriodChange = function ($event, periodObj) {
        $rootScope.SelectedPeriod = periodObj;
        angular.element(document.querySelector('#loaderCet1Capital')).removeClass('hidden');
        getCramDashboardConcepts($rootScope.SelectedBank.institutionKey, $rootScope.SelectedPeriod.value);
    }

    $scope.$on('CalculationsCompleteCet1LeverageRatio', function (event, arg) {
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual CET 1 Capital Ratio', value: $scope.ActualCet1CapitalRatioWeightedRiskBuffer });
        renderCet1CapitalRatioChart('chart-container', chartData, '');
    });

    var initialize = function () {
        getPastFiveQuarters();
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("cramTier1CapitalRatioViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.Periods = [];

    $scope.BanksMinimumPolicy = 0;
    $scope.CompositeRiskScoreCreditRisk = 0;
    $scope.CompositeRiskScoreInterestRateRisk = 0;
    $scope.CompositeRiskScoreLiquidityRisk = 0;
    $scope.CompositeRiskScoreOperationalRisk = 0;
    $scope.CompositeRiskScoreComplianceRisk = 0;
    $scope.CompositeRiskScoreStrategicRisk = 0;
    $scope.CompositeRiskScoreReputationRisk = 0;
    $scope.RiskRatingCreditRisk = '';
    $scope.RiskRatingInterestRateRisk = '';
    $scope.RiskRatingLiquidityRisk = '';
    $scope.RiskRatingOperationalRisk = '';
    $scope.RiskRatingComplianceRisk = '';
    $scope.RiskRatingStrategicRisk = '';
    $scope.RiskRatingReputationRisk = '';
    $scope.RiskWeightingCreditRisk = 0;
    $scope.RiskWeightingInterestRateRisk = 0;
    $scope.RiskWeightingLiquidityRisk = 0;
    $scope.RiskWeightingOperationalRisk = 0;
    $scope.RiskWeightingComplianceRisk = 0;
    $scope.RiskWeightingStrategicRisk = 0;
    $scope.RiskWeightingReputationRisk = 0;
    $scope.CapitalRiskBufferCreditRisk = 0;
    $scope.CapitalRiskBufferInterestRateRisk = 0;
    $scope.CapitalRiskBufferLiquidityRisk = 0;
    $scope.CapitalRiskBufferOperationalRisk = 0;
    $scope.CapitalRiskBufferComplianceRisk = 0;
    $scope.CapitalRiskBufferStrategicRisk = 0;
    $scope.CapitalRiskBufferReputationRisk = 0;
    $scope.WeightedRiskBufferCreditRisk = 0;
    $scope.WeightedRiskBufferInterestRateRisk = 0;
    $scope.WeightedRiskBufferLiquidityRisk = 0;
    $scope.WeightedRiskBufferOperationalRisk = 0;
    $scope.WeightedRiskBufferComplianceRisk = 0;
    $scope.WeightedRiskBufferStrategicRisk = 0;
    $scope.WeightedRiskBufferReputationRisk = 0;
    $scope.Tier1CapitalCreditRisk = 0;
    $scope.Tier1CapitalInterestRateRisk = 0;
    $scope.Tier1CapitalLiquidityRisk = 0;
    $scope.Tier1CapitalOperationalRisk = 0;
    $scope.Tier1CapitalComplianceRisk = 0;
    $scope.Tier1CapitalStrategicRisk = 0;
    $scope.Tier1CapitalReputationRisk = 0;
    $scope.TotalCompositeRiskScore = 0;
    $scope.TotalRiskWeighting = 0;
    $scope.TotalWeightedRiskBuffer = 0;
    $scope.TotalTier1Capital = 0;
    $scope.LowCreditRisk = 0;
    $scope.LowInterestRateRisk = 0;
    $scope.LowLiquidityRisk = 0;
    $scope.LowOperationalRisk = 0;
    $scope.LowComplianceRisk = 0;
    $scope.LowStrategicRisk = 0;
    $scope.LowReputationRisk = 0;
    $scope.LowModerateCreditRisk = 0;
    $scope.LowModerateInterestRateRisk = 0;
    $scope.LowModerateLiquidityRisk = 0;
    $scope.LowModerateOperationalRisk = 0;
    $scope.LowModerateComplianceRisk = 0;
    $scope.LowModerateStrategicRisk = 0;
    $scope.LowModerateReputationRisk = 0;
    $scope.ModerateCreditRisk = 0;
    $scope.ModerateInterestRateRisk = 0;
    $scope.ModerateLiquidityRisk = 0;
    $scope.ModerateOperationalRisk = 0;
    $scope.ModerateComplianceRisk = 0;
    $scope.ModerateStrategicRisk = 0;
    $scope.ModerateReputationRisk = 0;
    $scope.ModerateHighCreditRisk = 0;
    $scope.ModerateHighInterestRateRisk = 0;
    $scope.ModerateHighLiquidityRisk = 0;
    $scope.ModerateHighOperationalRisk = 0;
    $scope.ModerateHighComplianceRisk = 0;
    $scope.ModerateHighStrategicRisk = 0;
    $scope.ModerateHighReputationRisk = 0;
    $scope.HighCreditRisk = 0;
    $scope.HighInterestRateRisk = 0;
    $scope.HighLiquidityRisk = 0;
    $scope.HighOperationalRisk = 0;
    $scope.HighComplianceRisk = 0;
    $scope.HighStrategicRisk = 0;
    $scope.HighReputationRisk = 0;
    $scope.LowTotal = 0;
    $scope.LowModerateTotal = 0;
    $scope.ModerateTotal = 0;
    $scope.ModerateHighTotal = 0;
    $scope.HighTotal = 0;
    $scope.RegulatoryMinimumWeightedRiskBuffer = 0;
    $scope.ImpliedMinimumWeightedRiskBuffer = 0;
    $scope.BanksMinimumWeightedRiskBuffer = 0;
    $scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer = 0;
    $scope.BanksTier1CapitalRatioWeightedRiskBuffer = 0;
    $scope.RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer = 0;
    $scope.BufferImpliedMinimumWeightedRiskBuffer = 0;
    $scope.BufferBanksMinimumWeightedRiskBuffer = 0;
    $scope.Tier1CapitalLessBanksMinimumWeightedRiskBuffer = 0;
    $scope.ActualTier1CapitalRatio = 0;
    $scope.RegulatoryMinimumCapital = 0;
    $scope.ImpliedMinimumCapital = 0;
    $scope.BanksMinimumCapital = 0;
    $scope.BanksMinimumLessImpliedMinimumCapital = 0;
    $scope.BanksTier1CapitalRatioCapital = 0;
    $scope.RiskAssessBufferTier1CapitalLessImpliedMinCapital = 0;
    $scope.BufferImpliedMinimumCapital = 0;
    $scope.BufferBanksMinimumCapital = 0;
    $scope.Tier1CapitalLessBanksMinimumCapital = 0;
    $scope.ActualTier1CapitalRatioCapital = 0;

    var getSelectedModelName = function () {
        $rootScope.CramModelDisplayName = 'Create/Edit Scenario';

        if ($scope.CramModels.length > 0) {
            var selectedModel = $scope.CramModels.filter(function (obj) {
                return obj.isSelected === true;
            })[0];

            if (typeof selectedModel !== 'undefined' && selectedModel !== null) {
                $rootScope.CramModelDisplayName = selectedModel.modelName;
            }
        }
        else {
            $rootScope.CramModelDisplayName = 'Create/Edit Scenario';
        }
    }

    var countblank = function () {
        var count = 0;
        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === null)
            count++;

        return count;
    }

    var renderTier1CapitalRatioChart = function (chartContainerName, chartData, yAxisLabel) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": "Capital Risk Allocation Model",
                    "subCaption": "Tier 1 Risk-Based Capital Ratio",
                    "showBorder": "1",
                    "borderColor": "#cccccc",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": "#E0A025,#F4D00c,#0093D1,#173967,#A71D23",
                    "bgColor": "#ffffff",
                    "borderAlpha": "20",
                    "canvasBorderAlpha": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "rotatevalues": "0",
                    "valueFontColor": "#00000",
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
                    "decimals": "4",
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
                var tier1CapitalRatioChart = FusionCharts.items.tier1CapitalRatioBarChart;
                if (typeof tier1CapitalRatioChart === 'undefined') {
                    tier1CapitalRatioChart = new FusionCharts({
                        type: 'column2d',
                        id: 'tier1CapitalRatioBarChart',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });

                    tier1CapitalRatioChart.render();
                }
                else {
                    tier1CapitalRatioChart.setChartData(dSource, 'json');
                    tier1CapitalRatioChart.render();
                }
            } // if block ends here
        });
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else {
            return $filter('number')(numericValue, fractionSize);
        }
    }

    var tier1RiskBasedCapitalRatio = function () {
        $rootScope.SelectedBankVitals.tier1CapitalRatio = ($rootScope.SelectedBankVitals.tier1Capital / $rootScope.SelectedBankVitals.totalRiskWeightedAssets) * 100;
    }

    var banksMinimumPolicy = function () {
        if ($rootScope.AdjustBankData.Tier1CapitalRatio === '' || $rootScope.AdjustBankData.Tier1CapitalRatio === null)
            $scope.BanksMinimumPolicy = 9;
        else
            $scope.BanksMinimumPolicy = $rootScope.AdjustBankData.Tier1CapitalRatio;
    }

    var compositeRiskScoreCreditRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.CreditRisk === '' || $rootScope.RiskCategoriesAndWeights.CreditRisk === null)
            $scope.CompositeRiskScoreCreditRisk = 0;
        else
            $scope.CompositeRiskScoreCreditRisk = $rootScope.RiskCategoriesAndWeights.CreditRisk;
    };

    var compositeRiskScoreInterestRateRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.InterestRateRisk === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRisk === null)
            $scope.CompositeRiskScoreInterestRateRisk = 0;
        else
            $scope.CompositeRiskScoreInterestRateRisk = $rootScope.RiskCategoriesAndWeights.InterestRateRisk;
    };

    var compositeRiskScoreLiquidityRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.LiquidityRisk === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRisk === null)
            $scope.CompositeRiskScoreLiquidityRisk = 0;
        else
            $scope.CompositeRiskScoreLiquidityRisk = $rootScope.RiskCategoriesAndWeights.LiquidityRisk;
    };

    var compositeRiskScoreOperationalRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.OperationalRisk === '' || $rootScope.RiskCategoriesAndWeights.OperationalRisk === null)
            $scope.CompositeRiskScoreOperationalRisk = 0;
        else
            $scope.CompositeRiskScoreOperationalRisk = $rootScope.RiskCategoriesAndWeights.OperationalRisk;
    };

    var compositeRiskScoreComplianceRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ComplianceRisk === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRisk === null)
            $scope.CompositeRiskScoreComplianceRisk = 0;
        else
            $scope.CompositeRiskScoreComplianceRisk = $rootScope.RiskCategoriesAndWeights.ComplianceRisk;
    };

    var compositeRiskScoreStrategicRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.StrategicRisk === '' || $rootScope.RiskCategoriesAndWeights.StrategicRisk === null)
            $scope.CompositeRiskScoreStrategicRisk = 0;
        else
            $scope.CompositeRiskScoreStrategicRisk = $rootScope.RiskCategoriesAndWeights.StrategicRisk;
    };

    var compositeRiskScoreReputationRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ReputationRisk === '' || $rootScope.RiskCategoriesAndWeights.ReputationRisk === null)
            $scope.CompositeRiskScoreReputationRisk = 0;
        else
            $scope.CompositeRiskScoreReputationRisk = $rootScope.RiskCategoriesAndWeights.ReputationRisk;
    };

    $scope.GetRatingColorClass = function (rating) {
        var ratingclass = '';

        if (rating === 'Low')
            ratingclass = 'green-color';
        else if (rating === 'Low-Moderate')
            ratingclass = 'light-green-color';
        else if (rating === 'Moderate')
            ratingclass = 'yellow-color';
        else if (rating === 'Moderate-High')
            ratingclass = 'orange-color';
        else if (rating === 'High')
            ratingclass = 'red-color';
        else
            ratingclass = 'grey-color';

        return ratingclass;
    }

    var riskRatingCreditRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreCreditRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingCreditRisk = rating;
    };

    var riskRatingInterestRateRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingInterestRateRisk = rating;
    };

    var riskRatingLiquidityRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingLiquidityRisk = rating;
    };

    var riskRatingOperationalRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingOperationalRisk = rating;
    };

    var riskRatingComplianceRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingComplianceRisk = rating;
    };

    var riskRatingStrategicRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingStrategicRisk = rating;
    };

    var riskRatingReputationRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreReputationRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingReputationRisk = rating;
    };

    var riskWeightingCreditRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === 'undefined') {
            $scope.RiskWeightingCreditRisk = 0;
        }
        else {
            $scope.RiskWeightingCreditRisk = $rootScope.RiskCategoriesAndWeights.CreditRiskWeight;
        }
    };

    var riskWeightingInterestRateRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === 'undefined') {
            $scope.RiskWeightingInterestRateRisk = 0;
        }
        else {
            $scope.RiskWeightingInterestRateRisk = $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight;
        }
    };

    var riskWeightingLiquidityRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === 'undefined') {
            $scope.RiskWeightingLiquidityRisk = 0;
        }
        else {
            $scope.RiskWeightingLiquidityRisk = $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight;
        }
    };

    var riskWeightingOperationalRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === 'undefined') {
            $scope.RiskWeightingOperationalRisk = 0;
        }
        else {
            $scope.RiskWeightingOperationalRisk = $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight;
        }
    };

    var riskWeightingComplianceRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === 'undefined') {
            $scope.RiskWeightingComplianceRisk = 0;
        }
        else {
            $scope.RiskWeightingComplianceRisk = $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight;
        }
    };

    var riskWeightingStrategicRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === 'undefined') {
            $scope.RiskWeightingStrategicRisk = 0;
        }
        else {
            $scope.RiskWeightingStrategicRisk = $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight;
        }
    };

    var riskWeightingReputationRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === 'undefined') {
            $scope.RiskWeightingReputationRisk = 0;
        }
        else {
            $scope.RiskWeightingReputationRisk = $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight;
        }
    };

    var capitalRiskBufferCreditRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreCreditRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferCreditRisk = riskBuffer;
    };

    var capitalRiskBufferInterestRateRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferInterestRateRisk = riskBuffer;
    };

    var capitalRiskBufferLiquidityRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferLiquidityRisk = riskBuffer;
    };

    var capitalRiskBufferOperationalRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferOperationalRisk = riskBuffer;
    };

    var capitalRiskBufferComplianceRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferComplianceRisk = riskBuffer;
    };

    var capitalRiskBufferStrategicRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferStrategicRisk = riskBuffer;
    };

    var capitalRiskBufferReputationRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreReputationRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferReputationRisk = riskBuffer;
    };

    var weightedRiskBufferCreditRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingCreditRisk) > 0 && parseFloat($scope.CapitalRiskBufferCreditRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingCreditRisk) * parseFloat($scope.CapitalRiskBufferCreditRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferCreditRisk = riskBuffer;
    };

    var weightedRiskBufferInterestRateRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingInterestRateRisk) > 0 && parseFloat($scope.CapitalRiskBufferInterestRateRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingInterestRateRisk) * parseFloat($scope.CapitalRiskBufferInterestRateRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferInterestRateRisk = riskBuffer;
    };

    var weightedRiskBufferLiquidityRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingLiquidityRisk) > 0 && parseFloat($scope.CapitalRiskBufferLiquidityRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingLiquidityRisk) * parseFloat($scope.CapitalRiskBufferLiquidityRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferLiquidityRisk = riskBuffer;
    };

    var weightedRiskBufferOperationalRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingOperationalRisk) > 0 && parseFloat($scope.CapitalRiskBufferOperationalRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingOperationalRisk) * parseFloat($scope.CapitalRiskBufferOperationalRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferOperationalRisk = riskBuffer;
    };

    var weightedRiskBufferComplianceRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingComplianceRisk) > 0 && parseFloat($scope.CapitalRiskBufferComplianceRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingComplianceRisk) * parseFloat($scope.CapitalRiskBufferComplianceRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferComplianceRisk = riskBuffer;
    };

    var weightedRiskBufferStrategicRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingStrategicRisk) > 0 && parseFloat($scope.CapitalRiskBufferStrategicRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingStrategicRisk) * parseFloat($scope.CapitalRiskBufferStrategicRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferStrategicRisk = riskBuffer;
    };

    var weightedRiskBufferReputationRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingReputationRisk) > 0 && parseFloat($scope.CapitalRiskBufferReputationRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingReputationRisk) * parseFloat($scope.CapitalRiskBufferReputationRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferReputationRisk = riskBuffer;
    };

    var tier1CapitalCreditRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferCreditRisk === '' || $scope.WeightedRiskBufferCreditRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
        }

        $scope.Tier1CapitalCreditRisk = Tier1capital;
    };

    var tier1CapitalInterestRateRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferInterestRateRisk === '' || $scope.WeightedRiskBufferInterestRateRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
        }

        $scope.Tier1CapitalInterestRateRisk = Tier1capital;
    };

    var tier1CapitalLiquidityRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferLiquidityRisk === '' || $scope.WeightedRiskBufferLiquidityRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
        }

        $scope.Tier1CapitalLiquidityRisk = Tier1capital;
    };

    var tier1CapitalOperationalRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferOperationalRisk === '' || $scope.WeightedRiskBufferOperationalRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
        }

        $scope.Tier1CapitalOperationalRisk = Tier1capital;
    };

    var tier1CapitalComplianceRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferComplianceRisk === '' || $scope.WeightedRiskBufferComplianceRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
        }

        $scope.Tier1CapitalComplianceRisk = Tier1capital;
    };

    var tier1CapitalStrategicRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferStrategicRisk === '' || $scope.WeightedRiskBufferStrategicRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
        }

        $scope.Tier1CapitalStrategicRisk = Tier1capital;
    };

    var tier1CapitalReputationRisk = function () {
        var Tier1capital = 0;
        if ($scope.WeightedRiskBufferReputationRisk === '' || $scope.WeightedRiskBufferReputationRisk === 0) {
            Tier1capital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Tier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
            else {
                Tier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
        }

        $scope.Tier1CapitalReputationRisk = Tier1capital;
    };

    var totalCompositeRiskScore = function () {
        var totalCompositeScore = '';
        try {
            var mul1 = parseFloat($scope.CompositeRiskScoreCreditRisk) * parseFloat($scope.RiskWeightingCreditRisk);
            var mul2 = parseFloat($scope.CompositeRiskScoreInterestRateRisk) * parseFloat($scope.RiskWeightingInterestRateRisk);
            var mul3 = parseFloat($scope.CompositeRiskScoreLiquidityRisk) * parseFloat($scope.RiskWeightingLiquidityRisk);
            var mul4 = parseFloat($scope.CompositeRiskScoreOperationalRisk) * parseFloat($scope.RiskWeightingOperationalRisk);
            var mul5 = parseFloat($scope.CompositeRiskScoreComplianceRisk) * parseFloat($scope.RiskWeightingComplianceRisk);
            var mul6 = parseFloat($scope.CompositeRiskScoreStrategicRisk) * parseFloat($scope.RiskWeightingStrategicRisk);
            var mul7 = parseFloat($scope.CompositeRiskScoreReputationRisk) * parseFloat($scope.RiskWeightingReputationRisk);
            var sum = mul1 + mul2 + mul3 + mul4 + mul5 + mul6 + mul7;
            totalCompositeScore = sum / $scope.TotalRiskWeighting;
        }
        catch (err) {
            sum = parseInt($scope.CompositeRiskScoreCreditRisk) +
                parseInt($scope.CompositeRiskScoreInterestRateRisk) +
                parseInt($scope.CompositeRiskScoreLiquidityRisk) +
                parseInt($scope.CompositeRiskScoreOperationalRisk) +
                parseInt($scope.CompositeRiskScoreComplianceRisk) +
                parseInt($scope.CompositeRiskScoreStrategicRisk) +
                parseInt($scope.CompositeRiskScoreReputationRisk);
            totalCompositeScore = sum / 7;
        }

        $scope.TotalCompositeRiskScore = totalCompositeScore;
    };

    var totalRiskWeighting = function () {
        var total = parseFloat($scope.RiskWeightingCreditRisk) +
            parseFloat($scope.RiskWeightingInterestRateRisk) +
            parseFloat($scope.RiskWeightingLiquidityRisk) +
            parseFloat($scope.RiskWeightingOperationalRisk) +
            parseFloat($scope.RiskWeightingComplianceRisk) +
            parseFloat($scope.RiskWeightingStrategicRisk) +
            parseFloat($scope.RiskWeightingReputationRisk);

        $scope.TotalRiskWeighting = total;
    };

    var totalWeightedRiskBuffer = function () {
        var total = parseFloat($scope.WeightedRiskBufferCreditRisk) +
            parseFloat($scope.WeightedRiskBufferInterestRateRisk) +
            parseFloat($scope.WeightedRiskBufferLiquidityRisk) +
            parseFloat($scope.WeightedRiskBufferOperationalRisk) +
            parseFloat($scope.WeightedRiskBufferComplianceRisk) +
            parseFloat($scope.WeightedRiskBufferStrategicRisk) +
            parseFloat($scope.WeightedRiskBufferReputationRisk);

        $scope.TotalWeightedRiskBuffer = total;
    };

    var totalTier1Capital = function () {
        var totalTier1capital = 0;
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            totaltier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }
        else {
            totaltier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }

        $scope.TotalTier1Capital = totaltier1capital;
    };

    var lowCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowCreditRisk = risk;
    };

    var lowInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowInterestRateRisk = risk;
    };

    var lowLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowLiquidityRisk = risk;
    };

    var lowOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowOperationalRisk = risk;
    };

    var lowComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowComplianceRisk = risk;
    };

    var lowStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowStrategicRisk = risk;
    };

    var lowReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowReputationRisk = risk;
    };

    var lowModerateCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateCreditRisk = risk;
    };

    var lowModerateInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateInterestRateRisk = risk;
    };

    var lowModerateLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateLiquidityRisk = risk;
    };

    var lowModerateOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateOperationalRisk = risk;
    };

    var lowModerateComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateComplianceRisk = risk;
    };

    var lowModerateStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateStrategicRisk = risk;
    };

    var lowModerateReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateReputationRisk = risk;
    };

    var moderateCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateCreditRisk = risk;
    };

    var moderateInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateInterestRateRisk = risk;
    };

    var moderateLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateLiquidityRisk = risk;
    };

    var moderateOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateOperationalRisk = risk;
    };

    var moderateComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateComplianceRisk = risk;
    };

    var moderateStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateStrategicRisk = risk;
    };

    var moderateReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateReputationRisk = risk;
    };

    var moderateHighCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighCreditRisk = risk;
    };

    var moderateHighInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighInterestRateRisk = risk;
    };

    var moderateHighLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighLiquidityRisk = risk;
    };

    var moderateHighOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighOperationalRisk = risk;
    };

    var moderateHighComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighComplianceRisk = risk;
    };

    var moderateHighStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighStrategicRisk = risk;
    };

    var moderateHighReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighReputationRisk = risk;
    };

    var highCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighCreditRisk = risk;
    };

    var highInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighInterestRateRisk = risk;
    };

    var highLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighLiquidityRisk = risk;
    };

    var highOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighOperationalRisk = risk;
    };

    var highComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighComplianceRisk = risk;
    };

    var highStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighStrategicRisk = risk;
    };

    var highReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighReputationRisk = risk;
    };

    var lowTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowTotal = risk;
    };

    var lowModerateTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateTotal = risk;
    };

    var moderateTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateTotal = risk;
    };

    var moderateHighTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighTotal = risk;
    };

    var highTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighTotal = risk;
    };

    var regulatoryMinimumWeightedRiskBuffer = function () {
        $scope.RegulatoryMinimumWeightedRiskBuffer = 8;
    };

    var impliedMinimumWeightedRiskBuffer = function () {
        $scope.ImpliedMinimumWeightedRiskBuffer = parseFloat($scope.TotalWeightedRiskBuffer) + $scope.RegulatoryMinimumWeightedRiskBuffer;
    };

    var banksMinimumWeightedRiskBuffer = function () {
        if ($rootScope.AdjustBankData.Tier1CapitalRatio === '' || $rootScope.AdjustBankData.Tier1CapitalRatio === null)
            $scope.BanksMinimumWeightedRiskBuffer = $scope.BanksMinimumPolicy;
        else
            $scope.BanksMinimumWeightedRiskBuffer = $rootScope.AdjustBankData.Tier1CapitalRatio;
    };

    var banksMinimumLessImpliedMinimumWeightedRiskBuffer = function () {
        $scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer = parseFloat($scope.BanksMinimumWeightedRiskBuffer) - parseFloat($scope.ImpliedMinimumWeightedRiskBuffer);
    };

    var banksTier1CapitalRatioWeightedRiskBuffer = function () {
        if ($rootScope.AdjustBankData.Tier1Capital === '' || $rootScope.AdjustBankData.Tier1Capital === null)
            $scope.BanksTier1CapitalRatioWeightedRiskBuffer = $rootScope.SelectedBankVitals.tier1CapitalRatio;
        else
            $scope.BanksTier1CapitalRatioWeightedRiskBuffer = (parseFloat($rootScope.SelectedBankVitals.tier1Capital) / parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets)) * 100;
    };

    var riskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer = function () {
        $scope.RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer = $scope.BanksTier1CapitalRatioWeightedRiskBuffer - $scope.ImpliedMinimumWeightedRiskBuffer;
    };

    var bufferImpliedMinimumWeightedRiskBuffer = function () {
        $scope.BufferImpliedMinimumWeightedRiskBuffer = $scope.ImpliedMinimumWeightedRiskBuffer - $scope.RegulatoryMinimumWeightedRiskBuffer;
    };

    var bufferBanksMinimumWeightedRiskBuffer = function () {
        $scope.BufferBanksMinimumWeightedRiskBuffer = $scope.BanksMinimumWeightedRiskBuffer - $scope.ImpliedMinimumWeightedRiskBuffer;
    }

    var tier1CapitalLessBanksMinimumWeightedRiskBuffer = function () {
        $scope.Tier1CapitalLessBanksMinimumWeightedRiskBuffer = $scope.BanksTier1CapitalRatioWeightedRiskBuffer - $scope.BanksMinimumWeightedRiskBuffer;
    };

    var actualTier1CapitalRatio = function () {
        $scope.ActualTier1CapitalRatio = parseFloat($scope.RegulatoryMinimumWeightedRiskBuffer) +
            parseFloat($scope.BufferImpliedMinimumWeightedRiskBuffer) +
            parseFloat($scope.BufferBanksMinimumWeightedRiskBuffer) +
            parseFloat($scope.Tier1CapitalLessBanksMinimumWeightedRiskBuffer);
    };

    var regulatoryMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.RegulatoryMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.RegulatoryMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.RegulatoryMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.RegulatoryMinimumWeightedRiskBuffer / 100);
        }
    };

    var impliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.ImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.ImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.ImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.ImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var banksMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.BanksMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.BanksMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.BanksMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.BanksMinimumWeightedRiskBuffer / 100);
        }
    };

    var banksMinimumLessImpliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.BanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.BanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var banksTier1CapitalRatioCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.BanksTier1CapitalRatioCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.BanksTier1CapitalRatioWeightedRiskBuffer / 100);
        }
        else {
            $scope.BanksTier1CapitalRatioCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.BanksTier1CapitalRatioWeightedRiskBuffer / 100);
        }
    };

    var riskAssessBufferTier1CapitalLessImpliedMinCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.RiskAssessBufferTier1CapitalLessImpliedMinCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer / 100);
        }
        else {
            $scope.RiskAssessBufferTier1CapitalLessImpliedMinCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.RiskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer / 100);
        }
    };

    var bufferImpliedMinimumCapital = function () {
        $scope.BufferImpliedMinimumCapital = parseFloat($scope.ImpliedMinimumCapital) - $scope.RegulatoryMinimumCapital;
    };

    var bufferBanksMinimumCapital = function () {
        $scope.BufferBanksMinimumCapital = parseFloat($scope.BanksMinimumCapital) - parseFloat($scope.ImpliedMinimumCapital);
    };

    var tier1CapitalLessBanksMinimumCapital = function () {
        $scope.Tier1CapitalLessBanksMinimumCapital = $scope.BanksTier1CapitalRatioCapital - $scope.BanksMinimumCapital;
    };

    var actualTier1CapitalRatioCapital = function () {
        var sum = 0;
        sum = parseFloat($scope.RegulatoryMinimumCapital) +
            parseFloat($scope.BufferImpliedMinimumCapital) +
            parseFloat($scope.BufferBanksMinimumCapital) +
            parseFloat($scope.Tier1CapitalLessBanksMinimumCapital);
        $scope.ActualTier1CapitalRatioCapital = sum;
        $rootScope.$broadcast('CalculationsCompleteTier1CapitalRatio', 'Calculations Complete');
    };

    var doCalculations = function () {
        tier1RiskBasedCapitalRatio();
        banksMinimumPolicy();
        compositeRiskScoreCreditRisk();
        compositeRiskScoreInterestRateRisk();
        compositeRiskScoreLiquidityRisk();
        compositeRiskScoreOperationalRisk();
        compositeRiskScoreComplianceRisk();
        compositeRiskScoreStrategicRisk();
        compositeRiskScoreReputationRisk();
        riskRatingCreditRisk();
        riskRatingInterestRateRisk();
        riskRatingLiquidityRisk();
        riskRatingOperationalRisk();
        riskRatingComplianceRisk();
        riskRatingStrategicRisk();
        riskRatingReputationRisk();
        riskWeightingCreditRisk();
        riskWeightingInterestRateRisk();
        riskWeightingLiquidityRisk();
        riskWeightingOperationalRisk();
        riskWeightingComplianceRisk();
        riskWeightingStrategicRisk();
        riskWeightingReputationRisk();
        capitalRiskBufferCreditRisk();
        capitalRiskBufferInterestRateRisk();
        capitalRiskBufferLiquidityRisk();
        capitalRiskBufferOperationalRisk();
        capitalRiskBufferComplianceRisk();
        capitalRiskBufferStrategicRisk();
        capitalRiskBufferReputationRisk();
        weightedRiskBufferCreditRisk();
        weightedRiskBufferInterestRateRisk();
        weightedRiskBufferLiquidityRisk();
        weightedRiskBufferOperationalRisk();
        weightedRiskBufferComplianceRisk();
        weightedRiskBufferStrategicRisk();
        weightedRiskBufferReputationRisk();
        tier1CapitalCreditRisk();
        tier1CapitalInterestRateRisk();
        tier1CapitalLiquidityRisk();
        tier1CapitalOperationalRisk();
        tier1CapitalComplianceRisk();
        tier1CapitalStrategicRisk();
        tier1CapitalReputationRisk();
        totalRiskWeighting();
        totalCompositeRiskScore();
        totalWeightedRiskBuffer();
        totalTier1Capital();
        lowCreditRisk();
        lowInterestRateRisk();
        lowLiquidityRisk();
        lowOperationalRisk();
        lowComplianceRisk();
        lowStrategicRisk();
        lowReputationRisk();
        lowModerateCreditRisk();
        lowModerateInterestRateRisk();
        lowModerateLiquidityRisk();
        lowModerateOperationalRisk();
        lowModerateComplianceRisk();
        lowModerateStrategicRisk();
        lowModerateReputationRisk();
        moderateCreditRisk();
        moderateInterestRateRisk();
        moderateLiquidityRisk();
        moderateOperationalRisk();
        moderateComplianceRisk();
        moderateStrategicRisk();
        moderateReputationRisk();
        moderateHighCreditRisk();
        moderateHighInterestRateRisk();
        moderateHighLiquidityRisk();
        moderateHighOperationalRisk();
        moderateHighComplianceRisk();
        moderateHighStrategicRisk();
        moderateHighReputationRisk();
        highCreditRisk();
        highInterestRateRisk();
        highLiquidityRisk();
        highOperationalRisk();
        highComplianceRisk();
        highStrategicRisk();
        highReputationRisk();
        lowTotal();
        lowModerateTotal();
        moderateTotal();
        moderateHighTotal();
        highTotal();
        regulatoryMinimumWeightedRiskBuffer();
        impliedMinimumWeightedRiskBuffer();
        banksMinimumWeightedRiskBuffer();
        banksMinimumLessImpliedMinimumWeightedRiskBuffer();
        banksTier1CapitalRatioWeightedRiskBuffer();
        riskAssessBufferTier1CapitalLessImpliedMinWeightedRiskBuffer();
        bufferImpliedMinimumWeightedRiskBuffer();
        bufferBanksMinimumWeightedRiskBuffer();
        tier1CapitalLessBanksMinimumWeightedRiskBuffer();
        actualTier1CapitalRatio();
        regulatoryMinimumCapital();
        impliedMinimumCapital();
        banksMinimumCapital();
        banksMinimumLessImpliedMinimumCapital();
        banksTier1CapitalRatioCapital();
        riskAssessBufferTier1CapitalLessImpliedMinCapital();
        bufferImpliedMinimumCapital();
        bufferBanksMinimumCapital();
        tier1CapitalLessBanksMinimumCapital();
        actualTier1CapitalRatioCapital();
    }

    $scope.RefreshDataOnPeriodChange = function ($event, periodObj) {
        $rootScope.SelectedPeriod = periodObj;
        angular.element(document.querySelector('#loaderTier1Capital')).removeClass('hidden');
        getCramDashboardConcepts($rootScope.SelectedBank.institutionKey, $rootScope.SelectedPeriod.value);
    }

    $scope.$on('VitalsArrived', function (event, arg) {
        angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
        doCalculations();
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual Tier 1 RBC Ratio', value: $scope.ActualTier1CapitalRatio });
        renderTier1CapitalRatioChart('chart-container', chartData, '');
    });

    $scope.$on('ModelSelectionChanged', function (event, arg) {
        angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
        doCalculations();
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual Tier 1 RBC Ratio', value: $scope.ActualTier1CapitalRatio });
        renderTier1CapitalRatioChart('chart-container', chartData, '');
    });

    var getCramDashboardConcepts = function (bankKey, period) {
        $rootScope.SelectedBankVitals = {};
        var dashboardParams = {
            InstitutionKey: bankKey,
            Period: period
        }

        var req = {
            method: 'POST',
            url: '/api/Cram/GetCramDashboardConcepts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dashboardParams
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                angular.element(document.querySelector('#loaderTier1Capital')).addClass('hidden');
                $rootScope.SelectedBankVitals = result.data;

                if (typeof $rootScope.AdjustBankData.Tier1Capital !== 'undefined' && $rootScope.AdjustBankData.Tier1Capital !== "" && $rootScope.AdjustBankData.Tier1Capital !== null)
                    $rootScope.SelectedBankVitals.tier1Capital = $rootScope.AdjustBankData.Tier1Capital;

                if (typeof $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== 'undefined' && $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== "" && $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== null)
                    $rootScope.SelectedBankVitals.totalAssetsLeveragePurposes = $rootScope.AdjustBankData.TotalAssetsLeveragePurposes;

                if (typeof $rootScope.AdjustBankData.CommonEquityTier1Capital !== 'undefined' && $rootScope.AdjustBankData.CommonEquityTier1Capital !== "" && $rootScope.AdjustBankData.CommonEquityTier1Capital !== null)
                    $rootScope.SelectedBankVitals.commonEquityTier1Capital = $rootScope.AdjustBankData.CommonEquityTier1Capital;

                if (typeof $rootScope.AdjustBankData.TotalRiskWeightedAssets !== 'undefined' && $rootScope.AdjustBankData.TotalRiskWeightedAssets !== "" && $rootScope.AdjustBankData.TotalRiskWeightedAssets !== null)
                    $rootScope.SelectedBankVitals.totalRiskWeightedAssets = $rootScope.AdjustBankData.TotalRiskWeightedAssets;

                if (typeof $rootScope.AdjustBankData.TotalCapital !== 'undefined' && $rootScope.AdjustBankData.TotalCapital !== "" && $rootScope.AdjustBankData.TotalCapital !== null)
                    $rootScope.SelectedBankVitals.totalCapital = $rootScope.AdjustBankData.TotalCapital;
                doCalculations();
                var chartData = [];
                chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
                chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
                chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
                chartData.push({ label: 'Actual Tier 1 RBC Ratio', value: $scope.ActualTier1CapitalRatio });
                renderTier1CapitalRatioChart('chart-container', chartData, '');
            }
        }, function () {
            angular.element(document.querySelector('#loaderTier1Capital')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get dashboard concepts. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var getPastFiveQuarters = function () {
        //angular.element(document.querySelector('#incomeStatementDataLoader')).removeClass('hidden');
        var req = {
            method: 'GET',
            url: '/api/BankToBankAnalyzer/GetLastFiveQuarters',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {

                //angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
                $scope.Periods = result.data;
                $rootScope.SelectedPeriod = $scope.Periods[0];
                getCramDashboardConcepts($rootScope.SelectedBank.institutionKey, $rootScope.SelectedPeriod.value);
            }
        }, function () {
            angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while loading the financial periods. Please send an e-mail to admin@cb-resource.com.');
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

    $scope.$on('CalculationsCompleteTier1CapitalRatio', function (event, arg) {
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual Tier 1 RBC Ratio', value: $scope.ActualTier1CapitalRatio });
        renderTier1CapitalRatioChart('chart-container', chartData, '');
    });

    var initialize = function () {
        getPastFiveQuarters();
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("cramTotalCapitalRatioViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$timeout", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $timeout) {
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.Periods = [];

    $scope.BanksMinimumPolicy = 0;
    $scope.CompositeRiskScoreCreditRisk = 0;
    $scope.CompositeRiskScoreInterestRateRisk = 0;
    $scope.CompositeRiskScoreLiquidityRisk = 0;
    $scope.CompositeRiskScoreOperationalRisk = 0;
    $scope.CompositeRiskScoreComplianceRisk = 0;
    $scope.CompositeRiskScoreStrategicRisk = 0;
    $scope.CompositeRiskScoreReputationRisk = 0;
    $scope.RiskRatingCreditRisk = '';
    $scope.RiskRatingInterestRateRisk = '';
    $scope.RiskRatingLiquidityRisk = '';
    $scope.RiskRatingOperationalRisk = '';
    $scope.RiskRatingComplianceRisk = '';
    $scope.RiskRatingStrategicRisk = '';
    $scope.RiskRatingReputationRisk = '';
    $scope.RiskWeightingCreditRisk = 0;
    $scope.RiskWeightingInterestRateRisk = 0;
    $scope.RiskWeightingLiquidityRisk = 0;
    $scope.RiskWeightingOperationalRisk = 0;
    $scope.RiskWeightingComplianceRisk = 0;
    $scope.RiskWeightingStrategicRisk = 0;
    $scope.RiskWeightingReputationRisk = 0;
    $scope.CapitalRiskBufferCreditRisk = 0;
    $scope.CapitalRiskBufferInterestRateRisk = 0;
    $scope.CapitalRiskBufferLiquidityRisk = 0;
    $scope.CapitalRiskBufferOperationalRisk = 0;
    $scope.CapitalRiskBufferComplianceRisk = 0;
    $scope.CapitalRiskBufferStrategicRisk = 0;
    $scope.CapitalRiskBufferReputationRisk = 0;
    $scope.WeightedRiskBufferCreditRisk = 0;
    $scope.WeightedRiskBufferInterestRateRisk = 0;
    $scope.WeightedRiskBufferLiquidityRisk = 0;
    $scope.WeightedRiskBufferOperationalRisk = 0;
    $scope.WeightedRiskBufferComplianceRisk = 0;
    $scope.WeightedRiskBufferStrategicRisk = 0;
    $scope.WeightedRiskBufferReputationRisk = 0;
    $scope.TotalCapitalCreditRisk = 0;
    $scope.TotalCapitalInterestRateRisk = 0;
    $scope.TotalCapitalLiquidityRisk = 0;
    $scope.TotalCapitalOperationalRisk = 0;
    $scope.TotalCapitalComplianceRisk = 0;
    $scope.TotalCapitalStrategicRisk = 0;
    $scope.TotalCapitalReputationRisk = 0;
    $scope.TotalCompositeRiskScore = 0;
    $scope.TotalRiskWeighting = 0;
    $scope.TotalWeightedRiskBuffer = 0;
    $scope.TotalTier1Capital = 0;
    $scope.LowCreditRisk = 0;
    $scope.LowInterestRateRisk = 0;
    $scope.LowLiquidityRisk = 0;
    $scope.LowOperationalRisk = 0;
    $scope.LowComplianceRisk = 0;
    $scope.LowStrategicRisk = 0;
    $scope.LowReputationRisk = 0;
    $scope.LowModerateCreditRisk = 0;
    $scope.LowModerateInterestRateRisk = 0;
    $scope.LowModerateLiquidityRisk = 0;
    $scope.LowModerateOperationalRisk = 0;
    $scope.LowModerateComplianceRisk = 0;
    $scope.LowModerateStrategicRisk = 0;
    $scope.LowModerateReputationRisk = 0;
    $scope.ModerateCreditRisk = 0;
    $scope.ModerateInterestRateRisk = 0;
    $scope.ModerateLiquidityRisk = 0;
    $scope.ModerateOperationalRisk = 0;
    $scope.ModerateComplianceRisk = 0;
    $scope.ModerateStrategicRisk = 0;
    $scope.ModerateReputationRisk = 0;
    $scope.ModerateHighCreditRisk = 0;
    $scope.ModerateHighInterestRateRisk = 0;
    $scope.ModerateHighLiquidityRisk = 0;
    $scope.ModerateHighOperationalRisk = 0;
    $scope.ModerateHighComplianceRisk = 0;
    $scope.ModerateHighStrategicRisk = 0;
    $scope.ModerateHighReputationRisk = 0;
    $scope.HighCreditRisk = 0;
    $scope.HighInterestRateRisk = 0;
    $scope.HighLiquidityRisk = 0;
    $scope.HighOperationalRisk = 0;
    $scope.HighComplianceRisk = 0;
    $scope.HighStrategicRisk = 0;
    $scope.HighReputationRisk = 0;
    $scope.LowTotal = 0;
    $scope.LowModerateTotal = 0;
    $scope.ModerateTotal = 0;
    $scope.ModerateHighTotal = 0;
    $scope.HighTotal = 0;
    $scope.RegulatoryMinimumWeightedRiskBuffer = 0;
    $scope.ImpliedMinimumWeightedRiskBuffer = 0;
    $scope.BanksMinimumWeightedRiskBuffer = 0;
    $scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer = 0;
    $scope.BanksTotalCapitalRatioWeightedRiskBuffer = 0;
    $scope.RiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer = 0;
    $scope.BufferImpliedMinimumWeightedRiskBuffer = 0;
    $scope.BufferBanksMinimumWeightedRiskBuffer = 0;
    $scope.TotalCapitalLessBanksMinimumWeightedRiskBuffer = 0;
    $scope.ActualTotalCapitalRatioWeightedRiskBuffer = 0;
    $scope.RegulatoryMinimumCapital = 0;
    $scope.ImpliedMinimumCapital = 0;
    $scope.BanksMinimumCapital = 0;
    $scope.BanksMinimumLessImpliedMinimumCapital = 0;
    $scope.BanksTotalCapitalRatioCapital = 0;
    $scope.RiskAssessBufferTotalCapitalLessImpliedMinCapital = 0;
    $scope.BufferImpliedMinimumCapital = 0;
    $scope.BufferBanksMinimumCapital = 0;
    $scope.TotalCapitalLessBanksMinimumCapital = 0;
    $scope.ActualTotalCapitalRatioCapital = 0;

    var getSelectedModelName = function () {
        $rootScope.CramModelDisplayName = 'Create/Edit Scenario';

        if ($scope.CramModels.length > 0) {
            var selectedModel = $scope.CramModels.filter(function (obj) {
                return obj.isSelected === true;
            })[0];

            if (typeof selectedModel !== 'undefined' && selectedModel !== null) {
                $rootScope.CramModelDisplayName = selectedModel.modelName;
            }
        }
        else {
            $rootScope.CramModelDisplayName = 'Create/Edit Scenario';
        }

    }

    var countblank = function () {
        var count = 0;
        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === null)
            count++;

        if ($rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === null)
            count++;

        return count;
    }

    var renderTotalCapitalRatioChart = function (chartContainerName, chartData, yAxisLabel) {
        FusionCharts.ready(function () {
            var dSource = {
                "chart": {
                    "caption": "Capital Risk Allocation Model",
                    "subCaption": "Total Capital Ratio",
                    "showBorder": "1",
                    "borderColor": "#cccccc",
                    "xAxisName": "",
                    "yAxisName": "",
                    "numberPrefix": "",
                    "paletteColors": "#E0A025,#F4D00c,#0093D1,#173967,#A71D23",
                    "bgColor": "#ffffff",
                    "borderAlpha": "20",
                    "canvasBorderAlpha": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "rotatevalues": "0",
                    "valueFontColor": "#00000",
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
                    "decimals": "4",
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
                var totalCapitalRatioChart = FusionCharts.items.totalCapitalRatioBarChart;
                if (typeof totalCapitalRatioChart === 'undefined') {
                    totalCapitalRatioChart = new FusionCharts({
                        type: 'column2d',
                        id: 'totalCapitalRatioBarChart',
                        renderAt: chartContainerName,
                        width: '100%',
                        height: '250',
                        dataFormat: 'json',
                        dataSource: dSource
                    });

                    totalCapitalRatioChart.render();
                }
                else {
                    totalCapitalRatioChart.setChartData(dSource, 'json');
                    totalCapitalRatioChart.render();
                }
            } // if block ends here
        });
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null || numericValue === '')
            return '-';
        else {
            return $filter('number')(numericValue, fractionSize);
        }
    }

    var totalCapitalRatio = function () {
        $rootScope.SelectedBankVitals.totalCapitalRatio = ($rootScope.SelectedBankVitals.totalCapital / $rootScope.SelectedBankVitals.totalRiskWeightedAssets) * 100;
    }

    var banksMinimumPolicy = function () {
        if ($rootScope.AdjustBankData.TotalCapitalRatio === '' || $rootScope.AdjustBankData.TotalCapitalRatio === null)
            $scope.BanksMinimumPolicy = 11;
        else
            $scope.BanksMinimumPolicy = $rootScope.AdjustBankData.TotalCapitalRatio;
    }

    var compositeRiskScoreCreditRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.CreditRisk === '' || $rootScope.RiskCategoriesAndWeights.CreditRisk === null)
            $scope.CompositeRiskScoreCreditRisk = 0;
        else
            $scope.CompositeRiskScoreCreditRisk = $rootScope.RiskCategoriesAndWeights.CreditRisk;
    };

    var compositeRiskScoreInterestRateRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.InterestRateRisk === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRisk === null)
            $scope.CompositeRiskScoreInterestRateRisk = 0;
        else
            $scope.CompositeRiskScoreInterestRateRisk = $rootScope.RiskCategoriesAndWeights.InterestRateRisk;
    };

    var compositeRiskScoreLiquidityRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.LiquidityRisk === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRisk === null)
            $scope.CompositeRiskScoreLiquidityRisk = 0;
        else
            $scope.CompositeRiskScoreLiquidityRisk = $rootScope.RiskCategoriesAndWeights.LiquidityRisk;
    };

    var compositeRiskScoreOperationalRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.OperationalRisk === '' || $rootScope.RiskCategoriesAndWeights.OperationalRisk === null)
            $scope.CompositeRiskScoreOperationalRisk = 0;
        else
            $scope.CompositeRiskScoreOperationalRisk = $rootScope.RiskCategoriesAndWeights.OperationalRisk;
    };

    var compositeRiskScoreComplianceRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ComplianceRisk === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRisk === null)
            $scope.CompositeRiskScoreComplianceRisk = 0;
        else
            $scope.CompositeRiskScoreComplianceRisk = $rootScope.RiskCategoriesAndWeights.ComplianceRisk;
    };

    var compositeRiskScoreStrategicRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.StrategicRisk === '' || $rootScope.RiskCategoriesAndWeights.StrategicRisk === null)
            $scope.CompositeRiskScoreStrategicRisk = 0;
        else
            $scope.CompositeRiskScoreStrategicRisk = $rootScope.RiskCategoriesAndWeights.StrategicRisk;
    };

    var compositeRiskScoreReputationRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ReputationRisk === '' || $rootScope.RiskCategoriesAndWeights.ReputationRisk === null)
            $scope.CompositeRiskScoreReputationRisk = 0;
        else
            $scope.CompositeRiskScoreReputationRisk = $rootScope.RiskCategoriesAndWeights.ReputationRisk;
    };

    $scope.GetRatingColorClass = function (rating) {
        var ratingclass = '';

        if (rating === 'Low')
            ratingclass = 'green-color';
        else if (rating === 'Low-Moderate')
            ratingclass = 'light-green-color';
        else if (rating === 'Moderate')
            ratingclass = 'yellow-color';
        else if (rating === 'Moderate-High')
            ratingclass = 'orange-color';
        else if (rating === 'High')
            ratingclass = 'red-color';
        else
            ratingclass = 'grey-color';

        return ratingclass;
    }

    var riskRatingCreditRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreCreditRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingCreditRisk = rating;
    };

    var riskRatingInterestRateRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingInterestRateRisk = rating;
    };

    var riskRatingLiquidityRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingLiquidityRisk = rating;
    };

    var riskRatingOperationalRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingOperationalRisk = rating;
    };

    var riskRatingComplianceRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingComplianceRisk = rating;
    };

    var riskRatingStrategicRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingStrategicRisk = rating;
    };

    var riskRatingReputationRisk = function () {
        var rating = '';

        if (parseInt($scope.CompositeRiskScoreReputationRisk) === 1)
            rating = 'Low';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 2)
            rating = 'Low-Moderate';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 3)
            rating = 'Moderate';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 4)
            rating = 'Moderate-High';
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 5)
            rating = 'High';
        else
            rating = 'N/A';

        $scope.RiskRatingReputationRisk = rating;
    };

    var riskWeightingCreditRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.CreditRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.CreditRiskWeight === 'undefined') {
            $scope.RiskWeightingCreditRisk = 0;
        }
        else {
            $scope.RiskWeightingCreditRisk = $rootScope.RiskCategoriesAndWeights.CreditRiskWeight;
        }
    };

    var riskWeightingInterestRateRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight === 'undefined') {
            $scope.RiskWeightingInterestRateRisk = 0;
        }
        else {
            $scope.RiskWeightingInterestRateRisk = $rootScope.RiskCategoriesAndWeights.InterestRateRiskWeight;
        }
    };

    var riskWeightingLiquidityRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight === 'undefined') {
            $scope.RiskWeightingLiquidityRisk = 0;
        }
        else {
            $scope.RiskWeightingLiquidityRisk = $rootScope.RiskCategoriesAndWeights.LiquidityRiskWeight;
        }
    };

    var riskWeightingOperationalRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight === 'undefined') {
            $scope.RiskWeightingOperationalRisk = 0;
        }
        else {
            $scope.RiskWeightingOperationalRisk = $rootScope.RiskCategoriesAndWeights.OperationalRiskWeight;
        }
    };

    var riskWeightingComplianceRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight === 'undefined') {
            $scope.RiskWeightingComplianceRisk = 0;
        }
        else {
            $scope.RiskWeightingComplianceRisk = $rootScope.RiskCategoriesAndWeights.ComplianceRiskWeight;
        }
    };

    var riskWeightingStrategicRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight === 'undefined') {
            $scope.RiskWeightingStrategicRisk = 0;
        }
        else {
            $scope.RiskWeightingStrategicRisk = $rootScope.RiskCategoriesAndWeights.StrategicRiskWeight;
        }
    };

    var riskWeightingReputationRisk = function () {
        if ($rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === '' || $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === null || typeof $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight === 'undefined') {
            $scope.RiskWeightingReputationRisk = 0;
        }
        else {
            $scope.RiskWeightingReputationRisk = $rootScope.RiskCategoriesAndWeights.ReputationRiskWeight;
        }
    };

    var capitalRiskBufferCreditRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreCreditRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreCreditRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferCreditRisk = riskBuffer;
    };

    var capitalRiskBufferInterestRateRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreInterestRateRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferInterestRateRisk = riskBuffer;
    };

    var capitalRiskBufferLiquidityRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreLiquidityRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferLiquidityRisk = riskBuffer;
    };

    var capitalRiskBufferOperationalRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreOperationalRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferOperationalRisk = riskBuffer;
    };

    var capitalRiskBufferComplianceRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreComplianceRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferComplianceRisk = riskBuffer;
    };

    var capitalRiskBufferStrategicRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreStrategicRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferStrategicRisk = riskBuffer;
    };

    var capitalRiskBufferReputationRisk = function () {
        var riskBuffer = 0;

        if (parseInt($scope.CompositeRiskScoreReputationRisk) === 1) {
            if ($rootScope.RiskRating.Low !== null && $rootScope.RiskRating.Low !== '') {
                riskBuffer = $rootScope.RiskRating.Low;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.low;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 2) {
            if ($rootScope.RiskRating.LowModerate !== null && $rootScope.RiskRating.LowModerate !== '') {
                riskBuffer = $rootScope.RiskRating.LowModerate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.lowModerate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 3) {
            if ($rootScope.RiskRating.Moderate !== null && $rootScope.RiskRating.Moderate !== '') {
                riskBuffer = $rootScope.RiskRating.Moderate;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderate;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 4) {
            if ($rootScope.RiskRating.ModerateHigh !== null && $rootScope.RiskRating.ModerateHigh !== '') {
                riskBuffer = $rootScope.RiskRating.ModerateHigh;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.moderateHigh;
            }
        }
        else if (parseInt($scope.CompositeRiskScoreReputationRisk) === 5) {
            if ($rootScope.RiskRating.High !== null && $rootScope.RiskRating.High !== '') {
                riskBuffer = $rootScope.RiskRating.High;
            }
            else {
                riskBuffer = $rootScope.DefaultRatings.high;
            }
        }

        $scope.CapitalRiskBufferReputationRisk = riskBuffer;
    };

    var weightedRiskBufferCreditRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingCreditRisk) > 0 && parseFloat($scope.CapitalRiskBufferCreditRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingCreditRisk) * parseFloat($scope.CapitalRiskBufferCreditRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferCreditRisk = riskBuffer;
    };

    var weightedRiskBufferInterestRateRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingInterestRateRisk) > 0 && parseFloat($scope.CapitalRiskBufferInterestRateRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingInterestRateRisk) * parseFloat($scope.CapitalRiskBufferInterestRateRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferInterestRateRisk = riskBuffer;
    };

    var weightedRiskBufferLiquidityRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingLiquidityRisk) > 0 && parseFloat($scope.CapitalRiskBufferLiquidityRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingLiquidityRisk) * parseFloat($scope.CapitalRiskBufferLiquidityRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferLiquidityRisk = riskBuffer;
    };

    var weightedRiskBufferOperationalRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingOperationalRisk) > 0 && parseFloat($scope.CapitalRiskBufferOperationalRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingOperationalRisk) * parseFloat($scope.CapitalRiskBufferOperationalRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferOperationalRisk = riskBuffer;
    };

    var weightedRiskBufferComplianceRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingComplianceRisk) > 0 && parseFloat($scope.CapitalRiskBufferComplianceRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingComplianceRisk) * parseFloat($scope.CapitalRiskBufferComplianceRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferComplianceRisk = riskBuffer;
    };

    var weightedRiskBufferStrategicRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingStrategicRisk) > 0 && parseFloat($scope.CapitalRiskBufferStrategicRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingStrategicRisk) * parseFloat($scope.CapitalRiskBufferStrategicRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferStrategicRisk = riskBuffer;
    };

    var weightedRiskBufferReputationRisk = function () {
        var riskBuffer = 0;

        if (parseFloat($scope.RiskWeightingReputationRisk) > 0 && parseFloat($scope.CapitalRiskBufferReputationRisk) > 0) {
            riskBuffer = parseFloat($scope.RiskWeightingReputationRisk) * parseFloat($scope.CapitalRiskBufferReputationRisk);
            riskBuffer = riskBuffer / 100;
        }

        $scope.WeightedRiskBufferReputationRisk = riskBuffer;
    };

    var totalCapitalCreditRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferCreditRisk === '' || $scope.WeightedRiskBufferCreditRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferCreditRisk / 100));
            }
        }

        $scope.TotalCapitalCreditRisk = Totalcapital;
    };

    var totalCapitalInterestRateRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferInterestRateRisk === '' || $scope.WeightedRiskBufferInterestRateRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferInterestRateRisk / 100));
            }
        }

        $scope.TotalCapitalInterestRateRisk = Totalcapital;
    };

    var totalCapitalLiquidityRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferLiquidityRisk === '' || $scope.WeightedRiskBufferLiquidityRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferLiquidityRisk / 100));
            }
        }

        $scope.TotalCapitalLiquidityRisk = Totalcapital;
    };

    var totalCapitalOperationalRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferOperationalRisk === '' || $scope.WeightedRiskBufferOperationalRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferOperationalRisk / 100));
            }
        }

        $scope.TotalCapitalOperationalRisk = Totalcapital;
    };

    var totalCapitalComplianceRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferComplianceRisk === '' || $scope.WeightedRiskBufferComplianceRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferComplianceRisk / 100));
            }
        }

        $scope.TotalCapitalComplianceRisk = Totalcapital;
    };

    var totalCapitalStrategicRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferStrategicRisk === '' || $scope.WeightedRiskBufferStrategicRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferStrategicRisk / 100));
            }
        }

        $scope.TotalCapitalStrategicRisk = Totalcapital;
    };

    var totalCapitalReputationRisk = function () {
        var Totalcapital = 0;
        if ($scope.WeightedRiskBufferReputationRisk === '' || $scope.WeightedRiskBufferReputationRisk === 0) {
            Totalcapital = 0;
        }
        else {
            if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
                Totalcapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
            else {
                Totalcapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat(($scope.WeightedRiskBufferReputationRisk / 100));
            }
        }

        $scope.TotalCapitalReputationRisk = Totalcapital;
    };

    var totalCompositeRiskScore = function () {
        var totalCompositeScore = '';
        try {
            var mul1 = parseFloat($scope.CompositeRiskScoreCreditRisk) * parseFloat($scope.RiskWeightingCreditRisk);
            var mul2 = parseFloat($scope.CompositeRiskScoreInterestRateRisk) * parseFloat($scope.RiskWeightingInterestRateRisk);
            var mul3 = parseFloat($scope.CompositeRiskScoreLiquidityRisk) * parseFloat($scope.RiskWeightingLiquidityRisk);
            var mul4 = parseFloat($scope.CompositeRiskScoreOperationalRisk) * parseFloat($scope.RiskWeightingOperationalRisk);
            var mul5 = parseFloat($scope.CompositeRiskScoreComplianceRisk) * parseFloat($scope.RiskWeightingComplianceRisk);
            var mul6 = parseFloat($scope.CompositeRiskScoreStrategicRisk) * parseFloat($scope.RiskWeightingStrategicRisk);
            var mul7 = parseFloat($scope.CompositeRiskScoreReputationRisk) * parseFloat($scope.RiskWeightingReputationRisk);
            var sum = mul1 + mul2 + mul3 + mul4 + mul5 + mul6 + mul7;
            totalCompositeScore = sum / $scope.TotalRiskWeighting;
        }
        catch (err) {
            sum = parseInt($scope.CompositeRiskScoreCreditRisk) +
                parseInt($scope.CompositeRiskScoreInterestRateRisk) +
                parseInt($scope.CompositeRiskScoreLiquidityRisk) +
                parseInt($scope.CompositeRiskScoreOperationalRisk) +
                parseInt($scope.CompositeRiskScoreComplianceRisk) +
                parseInt($scope.CompositeRiskScoreStrategicRisk) +
                parseInt($scope.CompositeRiskScoreReputationRisk);
            totalCompositeScore = sum / 7;
        }

        $scope.TotalCompositeRiskScore = totalCompositeScore;
    };

    var totalRiskWeighting = function () {
        var total = parseFloat($scope.RiskWeightingCreditRisk) +
            parseFloat($scope.RiskWeightingInterestRateRisk) +
            parseFloat($scope.RiskWeightingLiquidityRisk) +
            parseFloat($scope.RiskWeightingOperationalRisk) +
            parseFloat($scope.RiskWeightingComplianceRisk) +
            parseFloat($scope.RiskWeightingStrategicRisk) +
            parseFloat($scope.RiskWeightingReputationRisk);

        $scope.TotalRiskWeighting = total;
    };

    var totalWeightedRiskBuffer = function () {
        var total = parseFloat($scope.WeightedRiskBufferCreditRisk) +
            parseFloat($scope.WeightedRiskBufferInterestRateRisk) +
            parseFloat($scope.WeightedRiskBufferLiquidityRisk) +
            parseFloat($scope.WeightedRiskBufferOperationalRisk) +
            parseFloat($scope.WeightedRiskBufferComplianceRisk) +
            parseFloat($scope.WeightedRiskBufferStrategicRisk) +
            parseFloat($scope.WeightedRiskBufferReputationRisk);

        $scope.TotalWeightedRiskBuffer = total;
    };

    var totalTotalCapital = function () {
        var totalTier1capital = 0;
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            totaltier1capital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }
        else {
            totaltier1capital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.TotalWeightedRiskBuffer / 100);
        }

        $scope.TotalTotalCapital = totaltier1capital;
    };

    var lowCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowCreditRisk = risk;
    };

    var lowInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowInterestRateRisk = risk;
    };

    var lowLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowLiquidityRisk = risk;
    };

    var lowOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowOperationalRisk = risk;
    };

    var lowComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowComplianceRisk = risk;
    };

    var lowStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowStrategicRisk = risk;
    };

    var lowReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowReputationRisk = risk;
    };

    var lowModerateCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateCreditRisk = risk;
    };

    var lowModerateInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateInterestRateRisk = risk;
    };

    var lowModerateLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateLiquidityRisk = risk;
    };

    var lowModerateOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateOperationalRisk = risk;
    };

    var lowModerateComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateComplianceRisk = risk;
    };

    var lowModerateStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateStrategicRisk = risk;
    };

    var lowModerateReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateReputationRisk = risk;
    };

    var moderateCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateCreditRisk = risk;
    };

    var moderateInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateInterestRateRisk = risk;
    };

    var moderateLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateLiquidityRisk = risk;
    };

    var moderateOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateOperationalRisk = risk;
    };

    var moderateComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateComplianceRisk = risk;
    };

    var moderateStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateStrategicRisk = risk;
    };

    var moderateReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateReputationRisk = risk;
    };

    var moderateHighCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighCreditRisk = risk;
    };

    var moderateHighInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighInterestRateRisk = risk;
    };

    var moderateHighLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighLiquidityRisk = risk;
    };

    var moderateHighOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighOperationalRisk = risk;
    };

    var moderateHighComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighComplianceRisk = risk;
    };

    var moderateHighStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighStrategicRisk = risk;
    };

    var moderateHighReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighReputationRisk = risk;
    };

    var highCreditRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingCreditRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighCreditRisk = risk;
    };

    var highInterestRateRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingInterestRateRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighInterestRateRisk = risk;
    };

    var highLiquidityRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingLiquidityRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighLiquidityRisk = risk;
    };

    var highOperationalRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingOperationalRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighOperationalRisk = risk;
    };

    var highComplianceRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingComplianceRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighComplianceRisk = risk;
    };

    var highStrategicRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingStrategicRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighStrategicRisk = risk;
    };

    var highReputationRisk = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.RiskWeightingReputationRisk) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighReputationRisk = risk;
    };

    var lowTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.low) / 100));
        }

        $scope.LowTotal = risk;
    };

    var lowModerateTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.lowModerate) / 100));
        }

        $scope.LowModerateTotal = risk;
    };

    var moderateTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderate) / 100));
        }

        $scope.ModerateTotal = risk;
    };

    var moderateHighTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.moderateHigh) / 100));
        }

        $scope.ModerateHighTotal = risk;
    };

    var highTotal = function () {
        var risk = 0;

        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            risk = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }
        else {
            risk = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * ((parseFloat($scope.TotalRiskWeighting) / 100) * (parseFloat($rootScope.DefaultRatings.high) / 100));
        }

        $scope.HighTotal = risk;
    };

    var regulatoryMinimumWeightedRiskBuffer = function () {
        $scope.RegulatoryMinimumWeightedRiskBuffer = 10;
    };

    var impliedMinimumWeightedRiskBuffer = function () {
        $scope.ImpliedMinimumWeightedRiskBuffer = parseFloat($scope.TotalWeightedRiskBuffer) + $scope.RegulatoryMinimumWeightedRiskBuffer;
    };

    var banksMinimumWeightedRiskBuffer = function () {
        if ($rootScope.AdjustBankData.TotalCapitalRatio === '' || $rootScope.AdjustBankData.TotalCapitalRatio === null)
            $scope.BanksMinimumWeightedRiskBuffer = $scope.BanksMinimumPolicy;
        else
            $scope.BanksMinimumWeightedRiskBuffer = $rootScope.AdjustBankData.TotalCapitalRatio;
    };

    var banksMinimumLessImpliedMinimumWeightedRiskBuffer = function () {
        $scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer = parseFloat($scope.BanksMinimumWeightedRiskBuffer) - parseFloat($scope.ImpliedMinimumWeightedRiskBuffer);
    };

    var banksTotalCapitalRatioWeightedRiskBuffer = function () {
        if ($rootScope.AdjustBankData.TotalCapital === '' || $rootScope.AdjustBankData.TotalCapital === null)
            $scope.BanksTotalCapitalRatioWeightedRiskBuffer = $rootScope.SelectedBankVitals.totalCapitalRatio;
        else
            $scope.BanksTotalCapitalRatioWeightedRiskBuffer = (parseFloat($rootScope.SelectedBankVitals.totalCapital) / parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets)) * 100;
    };

    var riskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer = function () {
        $scope.RiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer = parseFloat($scope.BanksTotalCapitalRatioWeightedRiskBuffer) - parseFloat($scope.ImpliedMinimumWeightedRiskBuffer);
    };

    var bufferImpliedMinimumWeightedRiskBuffer = function () {
        $scope.BufferImpliedMinimumWeightedRiskBuffer = parseFloat($scope.ImpliedMinimumWeightedRiskBuffer) - $scope.RegulatoryMinimumWeightedRiskBuffer;
    };

    var bufferBanksMinimumWeightedRiskBuffer = function () {
        $scope.BufferBanksMinimumWeightedRiskBuffer = parseFloat($scope.BanksMinimumWeightedRiskBuffer) - parseFloat($scope.ImpliedMinimumWeightedRiskBuffer);
    };

    var totalCapitalLessBanksMinimumWeightedRiskBuffer = function () {
        $scope.TotalCapitalLessBanksMinimumWeightedRiskBuffer = $scope.BanksTotalCapitalRatioWeightedRiskBuffer - $scope.BanksMinimumWeightedRiskBuffer;
    };

    var actualTotalCapitalRatioWeightedRiskBuffer = function () {
        $scope.ActualTotalCapitalRatioWeightedRiskBuffer = parseFloat($scope.RegulatoryMinimumWeightedRiskBuffer) +
            parseFloat($scope.BufferImpliedMinimumWeightedRiskBuffer) +
            parseFloat($scope.BufferBanksMinimumWeightedRiskBuffer) +
            parseFloat($scope.TotalCapitalLessBanksMinimumWeightedRiskBuffer);
    };

    var regulatoryMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.RegulatoryMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.RegulatoryMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.RegulatoryMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.RegulatoryMinimumWeightedRiskBuffer / 100);
        }
    };

    var impliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.ImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.ImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.ImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.ImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var banksMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.BanksMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.BanksMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.BanksMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.BanksMinimumWeightedRiskBuffer / 100);
        }
    };

    var banksMinimumLessImpliedMinimumCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.BanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
        else {
            $scope.BanksMinimumLessImpliedMinimumCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.BanksMinimumLessImpliedMinimumWeightedRiskBuffer / 100);
        }
    };

    var banksTotalCapitalRatioCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.BanksTotalCapitalRatioCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.BanksTotalCapitalRatioWeightedRiskBuffer / 100);
        }
        else {
            $scope.BanksTotalCapitalRatioCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.BanksTotalCapitalRatioWeightedRiskBuffer / 100);
        }
    };

    var riskAssessBufferTotalCapitalLessImpliedMinCapital = function () {
        if ($rootScope.AdjustBankData.TotalRiskWeightedAssets === '' || $rootScope.AdjustBankData.TotalRiskWeightedAssets === null) {
            $scope.RiskAssessBufferTotalCapitalLessImpliedMinCapital = parseFloat($rootScope.SelectedBankVitals.totalRiskWeightedAssets) * parseFloat($scope.RiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer / 100);
        }
        else {
            $scope.RiskAssessBufferTotalCapitalLessImpliedMinCapital = parseFloat($rootScope.AdjustBankData.TotalRiskWeightedAssets) * parseFloat($scope.RiskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer / 100);
        }
    };

    var bufferImpliedMinimumCapital = function () {
        $scope.BufferImpliedMinimumCapital = parseFloat($scope.ImpliedMinimumCapital) - $scope.RegulatoryMinimumCapital;
    };

    var bufferBanksMinimumCapital = function () {
        $scope.BufferBanksMinimumCapital = parseFloat($scope.BanksMinimumCapital) - parseFloat($scope.ImpliedMinimumCapital);
    };

    var totalCapitalLessBanksMinimumCapital = function () {
        $scope.TotalCapitalLessBanksMinimumCapital = $scope.BanksTotalCapitalRatioCapital - $scope.BanksMinimumCapital;
    };

    var actualTotalCapitalRatioCapital = function () {
        var sum = 0;
        sum = parseFloat($scope.RegulatoryMinimumCapital) +
            parseFloat($scope.BufferImpliedMinimumCapital) +
            parseFloat($scope.BufferBanksMinimumCapital) +
            parseFloat($scope.TotalCapitalLessBanksMinimumCapital);

        $scope.ActualTotalCapitalRatioCapital = sum;
        $rootScope.$broadcast('CalculationsCompleteTotalCapitalRatio', 'Calculations Complete');
    };

    var doCalculations = function () {
        totalCapitalRatio();
        banksMinimumPolicy();
        compositeRiskScoreCreditRisk();
        compositeRiskScoreInterestRateRisk();
        compositeRiskScoreLiquidityRisk();
        compositeRiskScoreOperationalRisk();
        compositeRiskScoreComplianceRisk();
        compositeRiskScoreStrategicRisk();
        compositeRiskScoreReputationRisk();
        riskRatingCreditRisk();
        riskRatingInterestRateRisk();
        riskRatingLiquidityRisk();
        riskRatingOperationalRisk();
        riskRatingComplianceRisk();
        riskRatingStrategicRisk();
        riskRatingReputationRisk();
        riskWeightingCreditRisk();
        riskWeightingInterestRateRisk();
        riskWeightingLiquidityRisk();
        riskWeightingOperationalRisk();
        riskWeightingComplianceRisk();
        riskWeightingStrategicRisk();
        riskWeightingReputationRisk();
        capitalRiskBufferCreditRisk();
        capitalRiskBufferInterestRateRisk();
        capitalRiskBufferLiquidityRisk();
        capitalRiskBufferOperationalRisk();
        capitalRiskBufferComplianceRisk();
        capitalRiskBufferStrategicRisk();
        capitalRiskBufferReputationRisk();
        weightedRiskBufferCreditRisk();
        weightedRiskBufferInterestRateRisk();
        weightedRiskBufferLiquidityRisk();
        weightedRiskBufferOperationalRisk();
        weightedRiskBufferComplianceRisk();
        weightedRiskBufferStrategicRisk();
        weightedRiskBufferReputationRisk();
        totalCapitalCreditRisk();
        totalCapitalInterestRateRisk();
        totalCapitalLiquidityRisk();
        totalCapitalOperationalRisk();
        totalCapitalComplianceRisk();
        totalCapitalStrategicRisk();
        totalCapitalReputationRisk();
        totalRiskWeighting();
        totalCompositeRiskScore();
        totalWeightedRiskBuffer();
        totalTotalCapital();
        lowCreditRisk();
        lowInterestRateRisk();
        lowLiquidityRisk();
        lowOperationalRisk();
        lowComplianceRisk();
        lowStrategicRisk();
        lowReputationRisk();
        lowModerateCreditRisk();
        lowModerateInterestRateRisk();
        lowModerateLiquidityRisk();
        lowModerateOperationalRisk();
        lowModerateComplianceRisk();
        lowModerateStrategicRisk();
        lowModerateReputationRisk();
        moderateCreditRisk();
        moderateInterestRateRisk();
        moderateLiquidityRisk();
        moderateOperationalRisk();
        moderateComplianceRisk();
        moderateStrategicRisk();
        moderateReputationRisk();
        moderateHighCreditRisk();
        moderateHighInterestRateRisk();
        moderateHighLiquidityRisk();
        moderateHighOperationalRisk();
        moderateHighComplianceRisk();
        moderateHighStrategicRisk();
        moderateHighReputationRisk();
        highCreditRisk();
        highInterestRateRisk();
        highLiquidityRisk();
        highOperationalRisk();
        highComplianceRisk();
        highStrategicRisk();
        highReputationRisk();
        lowTotal();
        lowModerateTotal();
        moderateTotal();
        moderateHighTotal();
        highTotal();
        regulatoryMinimumWeightedRiskBuffer();
        impliedMinimumWeightedRiskBuffer();
        banksMinimumWeightedRiskBuffer();
        banksMinimumLessImpliedMinimumWeightedRiskBuffer();
        banksTotalCapitalRatioWeightedRiskBuffer();
        riskAssessBufferTotalCapitalLessImpliedMinWeightedRiskBuffer();
        bufferImpliedMinimumWeightedRiskBuffer();
        bufferBanksMinimumWeightedRiskBuffer();
        totalCapitalLessBanksMinimumWeightedRiskBuffer();
        actualTotalCapitalRatioWeightedRiskBuffer();
        regulatoryMinimumCapital();
        impliedMinimumCapital();
        banksMinimumCapital();
        banksMinimumLessImpliedMinimumCapital();
        banksTotalCapitalRatioCapital();
        riskAssessBufferTotalCapitalLessImpliedMinCapital();
        bufferImpliedMinimumCapital();
        bufferBanksMinimumCapital();
        totalCapitalLessBanksMinimumCapital();
        actualTotalCapitalRatioCapital();
    }

    $scope.$on('VitalsArrived', function (event, arg) {
        angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
        doCalculations();
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual Total Capital Ratio', value: $scope.ActualTotalCapitalRatioWeightedRiskBuffer });
        renderTotalCapitalRatioChart('chart-container', chartData, '');
    });

    $scope.$on('ModelSelectionChanged', function (event, arg) {
        angular.element(document.querySelector('#loaderDashboard')).addClass('hidden');
        doCalculations();
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual Total Capital Ratio', value: $scope.ActualTotalCapitalRatioWeightedRiskBuffer });
        renderTotalCapitalRatioChart('chart-container', chartData, '');
    });

    var getCramDashboardConcepts = function (bankKey, period) {
        $rootScope.SelectedBankVitals = {};
        var dashboardParams = {
            InstitutionKey: bankKey,
            Period: period
        }

        var req = {
            method: 'POST',
            url: '/api/Cram/GetCramDashboardConcepts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dashboardParams
        };

        $http(req).then(function (result) {
            if (result.data != null) {

                angular.element(document.querySelector('#loaderTotalCapital')).addClass('hidden');
                $rootScope.SelectedBankVitals = result.data;

                if (typeof $rootScope.AdjustBankData.Tier1Capital !== 'undefined' && $rootScope.AdjustBankData.Tier1Capital !== "" && $rootScope.AdjustBankData.Tier1Capital !== null)
                    $rootScope.SelectedBankVitals.tier1Capital = $rootScope.AdjustBankData.Tier1Capital;

                if (typeof $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== 'undefined' && $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== "" && $rootScope.AdjustBankData.TotalAssetsLeveragePurposes !== null)
                    $rootScope.SelectedBankVitals.totalAssetsLeveragePurposes = $rootScope.AdjustBankData.TotalAssetsLeveragePurposes;

                if (typeof $rootScope.AdjustBankData.CommonEquityTier1Capital !== 'undefined' && $rootScope.AdjustBankData.CommonEquityTier1Capital !== "" && $rootScope.AdjustBankData.CommonEquityTier1Capital !== null)
                    $rootScope.SelectedBankVitals.commonEquityTier1Capital = $rootScope.AdjustBankData.CommonEquityTier1Capital;

                if (typeof $rootScope.AdjustBankData.TotalRiskWeightedAssets !== 'undefined' && $rootScope.AdjustBankData.TotalRiskWeightedAssets !== "" && $rootScope.AdjustBankData.TotalRiskWeightedAssets !== null)
                    $rootScope.SelectedBankVitals.totalRiskWeightedAssets = $rootScope.AdjustBankData.TotalRiskWeightedAssets;

                if (typeof $rootScope.AdjustBankData.TotalCapital !== 'undefined' && $rootScope.AdjustBankData.TotalCapital !== "" && $rootScope.AdjustBankData.TotalCapital !== null)
                    $rootScope.SelectedBankVitals.totalCapital = $rootScope.AdjustBankData.TotalCapital;
                doCalculations();
                var chartData = [];
                chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
                chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
                chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
                chartData.push({ label: 'Actual Total Capital Ratio', value: $scope.ActualTotalCapitalRatioWeightedRiskBuffer });
                renderTotalCapitalRatioChart('chart-container', chartData, '');
            }
        }, function () {
            angular.element(document.querySelector('#loaderTotalCapital')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get dashboard concepts. Please send an e-mail to admin@cb-resource.com.');
        });
    }

    var getPastFiveQuarters = function () {
        //angular.element(document.querySelector('#incomeStatementDataLoader')).removeClass('hidden');
        var req = {
            method: 'GET',
            url: '/api/BankToBankAnalyzer/GetLastFiveQuarters',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {

                //angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
                $scope.Periods = result.data;
                $rootScope.SelectedPeriod = $scope.Periods[0];
                getCramDashboardConcepts($rootScope.SelectedBank.institutionKey, $rootScope.SelectedPeriod.value);
            }
        }, function () {
            angular.element(document.querySelector('#incomeStatementDataLoader')).addClass('hidden');
            $scope.toggleErrorMessageBoxModal('An error occurred while loading the financial periods. Please send an e-mail to admin@cb-resource.com.');
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

    $scope.$on('CalculationsCompleteTotalCapitalRatio', function (event, arg) {
        var chartData = [];
        chartData.push({ label: 'PCA Well-Capitalized', value: $scope.RegulatoryMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Implied Minimum', value: $scope.ImpliedMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Bank\'s Minimum', value: $scope.BanksMinimumWeightedRiskBuffer });
        chartData.push({ label: 'Actual Total Capital Ratio', value: $scope.ActualTotalCapitalRatioWeightedRiskBuffer });
        renderTotalCapitalRatioChart('chart-container', chartData, '');
    });

    $scope.RefreshDataOnPeriodChange = function ($event, periodObj) {
        $rootScope.SelectedPeriod = periodObj;
        angular.element(document.querySelector('#loaderTotalCapital')).removeClass('hidden');
        getCramDashboardConcepts($rootScope.SelectedBank.institutionKey, $rootScope.SelectedPeriod.value);
    }

    var initialize = function () {
        getPastFiveQuarters();
    }

    initialize();
}]);
