cbrSystemAdministrationModule.directive('numbersOnly', function () {
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

cbrSystemAdministrationModule.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

//cbrSystemAdministrationModule.directive('modal', function () {
//    return {
//        template: '<div class="modal fade">' +
//            '<div class="modal-dialog">' +
//              '<div class="modal-content">' +
//                '<div class="modal-header">' +
//                  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
//                  '<h4 class="modal-title">{{ title }}</h4>' +
//                '</div>' +
//                '<div class="modal-body" ng-transclude></div>' +
//              '</div>' +
//            '</div>' +
//          '</div>',
//        restrict: 'E',
//        transclude: true,
//        replace: true,
//        scope: true,
//        link: function postLink(scope, element, attrs) {
//            scope.title = attrs.title;

//            scope.$watch(attrs.visible, function (value) {
//                if (value == true)
//                    $(element).modal('show');
//                else
//                    $(element).modal('hide');
//            });

//            $(element).on('shown.bs.modal', function () {
//                scope.$apply(function () {
//                    scope.$parent[attrs.visible] = true;
//                });
//            });

//            $(element).on('hidden.bs.modal', function () {
//                scope.$apply(function () {
//                    scope.$parent[attrs.visible] = false;
//                });
//            });
//        }
//    };
//});

cbrSystemAdministrationModule.controller("sysAdminNavigationController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope","$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope,$filter) {
    $scope.sysAdminTemplate = 'manageAccounts';

    $scope.ToggleSysAdminScreen = function ($event, screenName) {
        $scope.sysAdminTemplate = screenName;
    };

    $scope.NavigateToDashboard = function () {
        window.location.href = '/';
    };
}]);

cbrSystemAdministrationModule.controller("manageAccountsController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs) {
    $scope.Tenants = [];
    $scope.PageNumbers = [];
    $scope.PageSize = '10';
    $scope.CurrentPage = 1;
    $scope.TenantToDelete = {};
    $scope.TenantToEdit = {};
    $scope.TenantDetails = {};
    $scope.showDeleteModal = false;
    $scope.showEditModal = false;
    $scope.title = '';
    $scope.ShowingFrom = 1;
    $scope.ShowingTo = 1;
    $scope.DisableNextClick = false;
    $scope.SelectedPageSize = '10';
    $scope.TenantSearchInput = '';
    $scope.orderByField = 'accountName';
    $scope.reverseSort = false;
    $scope.SearchFired = false;
    $scope.TenantToActivate = {};

    $scope.BankFindSearchCriteria =
        {
            BankName: '',
            CertNumber: '',
            Location: '',
            AssetSize: '-- Asset Size --',
            CorporationType: '-- Corporation Type --',
            PageSize: -1,
            PageNumber: 1
        };

    $scope.toggleDeleteModal = function () {
        $scope.showDeleteModal = !$scope.showDeleteModal;
    };

    $scope.toggleEditModal = function () {
        $scope.showEditModal = !$scope.showEditModal;
    };

    $scope.SelectTenantToEdit = function ($event, tenantObj) {

    };

    $scope.OrderBy = function (fieldName) {
        $scope.orderByField = fieldName;
        $scope.reverseSort = !$scope.reverseSort;
        $scope.getTenants({ id: 'pageNumber1', value: 1 });
    };

    $scope.SelectTenantToDelete = function ($event, tenantObj) {
        $scope.title = 'Deactivate Account';
        $scope.TenantToDelete = tenantObj;
        dlg = dialogs.confirm('Confirm', 'Are you sure you want to delete this account?');
        dlg.result.then(function (btn) {
            if (btn === 'yes') {
                DeleteTenant();
            }
        }, function (btn) {
        });
    };

    $scope.SelectTenantToActivate = function ($event, tenantObj) {
        $scope.title = 'Reactivate Account';
        $scope.TenantToActivate = tenantObj;
        dlg = dialogs.confirm('Confirm', 'Are you sure you want to reactivate this account?');
        dlg.result.then(function (btn) {
            if (btn === 'yes') {
                ReactivateTenant();
            }
        }, function (btn) {
        });
    };

    $scope.EditTenant = function ($event) {

    };

    $scope.BindAccountName = function (accountName) {
        if (accountName === null || accountName === '') {
            return 'N/A';
        }
        else {
            return accountName;
        }
    };

    $scope.BindFdicCert = function (fdicCert) {
        if (fdicCert === null || fdicCert === '') {
            return 'N/A';
        }
        else {
            return fdicCert;
        }
    };

    $scope.BindState = function (state) {
        if (state === null || state === '') {
            return 'N/A';
        }
        else {
            return state;
        }
    };

    var SearchTenant = function (pageNumber) {
        //angular.element(document.querySelector('#bankSearchLoader')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:block');
        $scope.SearchFired = true;
        if (pageNumber === '<<') {
            if ($scope.CurrentPage > 1)
                $scope.CurrentPage = $scope.CurrentPage - 1;
        }
        else if (pageNumber === '>>') {
            if ($scope.CurrentPage < ($scope.Tenants[0].totalResults / parseInt($scope.PageSize)))
                $scope.CurrentPage = $scope.CurrentPage + 1;
        }
        else
            $scope.CurrentPage = pageNumber.value;

        if ($scope.Tenants.length > 0)
            $scope.Tenants = [];
       
        $scope.BankFindSearchCriteria.PageSize = parseInt($scope.PageSize);

        $scope.BankFindSearchCriteria.PageNumber = $scope.CurrentPage;

        if (isNaN(Number($scope.TenantSearchInput)) === true) {
            $scope.BankFindSearchCriteria.BankName = $scope.TenantSearchInput;
        }
        else {
            $scope.BankFindSearchCriteria.CertNumber = $scope.TenantSearchInput;
        }

        var req = {
            method: 'POST',
            url: '/api/SysAdminApi/SearchTenant',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.BankFindSearchCriteria
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data.length > 0) {
                //angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
                $scope.Tenants = result.data;
                for (i = 0; i < $scope.Tenants.length; i++) {
                    if ($scope.Tenants[i].memberSince !== null)
                        $scope.Tenants[i].memberSince = new Date($scope.Tenants[i].memberSince).toLocaleDateString('en-US');
                    else
                        $scope.Tenants[i].memberSince = 'N/A';
                }

                $scope.ShowingFrom = (($scope.CurrentPage - 1) * parseInt($scope.PageSize)) + 1;
                $scope.ShowingTo = $scope.ShowingFrom + $scope.Tenants.length - 1;

                fillPageNumbersArray($scope.Tenants[0].totalAccounts);
            }
            else {
                fillPageNumbersArray(0);
                angular.element(document.querySelector('#bankSearchLoader')).html('No bank found matching your search criteria.');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while performing search. Please send an e-mail to admin@cb-resource.com.');
            //angular.element(document.querySelector('#bankSearchLoader')).html('An error occurred while performing search. Please send an e-mail to admin@cb-resource.com.');
        });
    };

    $scope.FireTenantSearch = function () {
        if ($scope.TenantSearchInput === '') {
            $scope.BankFindSearchCriteria.BankName = '';
            $scope.BankFindSearchCriteria.CertNumber = '';
            $scope.getTenants({ id: 'pageNumber1', value: 1 });
        }
        else {
            $scope.SearchFired = false;
            clearTimeout(timeoutID);
            var timeoutID = setTimeout(function () { SearchTenant({ id: 'pageNumber1', value: 1 }); }, 3000);
        }
    };

    var DeleteTenant = function () {
        if (typeof $scope.TenantToDelete !== 'undefined') {
            $scope.TenantToDelete.isDelete = true;

            var req = {
                method: 'POST',
                url: '/api/SysAdminApi/DeleteTenant',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.TenantToDelete
            };

            $http(req).then(function (result) {
                if (result.data !== null) {
                    if (result.data === true)
                        dlg = dialogs.notify('Info', 'Successfully deactivated the account.');
                    angular.element(document.querySelector('#tenantsLoader')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
                    angular.element(document.querySelector('#tenants')).addClass('loading');
                    $scope.getTenants({ id: '', value: $scope.CurrentPage });
                    $scope.TenantToDelete = {};
                    $scope.TenantSearchInput = '';
                }
            },
            function () {
                dlg = dialogs.error('An error occurred while trying to deactivate the account. Please contact system administrator.');
                $scope.TenantToDelete = {};
                $scope.TenantSearchInput = '';
            });
        }
    };

    var ReactivateTenant = function () {
        if (typeof $scope.TenantToActivate !== 'undefined') {
            $scope.TenantToActivate.isDelete = false;

            var req = {
                method: 'POST',
                url: '/api/SysAdminApi/ReactivateTenant',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.TenantToActivate
            };

            $http(req).then(function (result) {
                if (result.data !== null) {
                    if (result.data === true)
                        dlg = dialogs.notify('Info', 'Successfully reactivated the account.');
                    angular.element(document.querySelector('#tenantsLoader')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
                    angular.element(document.querySelector('#tenants')).addClass('loading');
                    $scope.getTenants({ id: '', value: $scope.CurrentPage });
                    $scope.TenantToActivate = {};
                    $scope.TenantSearchInput = '';
                }
            },
                function () {
                    dlg = dialogs.error('An error occurred while trying to reactivate the account. Please contact system administrator.');
                    $scope.TenantSearchInput = '';
                });
        }
    };

    var fillPageNumbersArray = function (length) {
        $scope.PageNumbers = [];
        var numberOfPages = 0;
        if (length > 0 && length <= parseInt($scope.PageSize))
            numberOfPages = 1;
        else if (length > 0 && length > parseInt($scope.PageSize)) {
            var remainder = length % parseInt($scope.PageSize);
            if (remainder > 0) {
                numberOfPages = Math.floor(length / parseInt($scope.PageSize)) + 1;
            }
            else {
                numberOfPages = length / parseInt($scope.PageSize);
            }
        }
        var pagesToDisplay = 0;

        if (numberOfPages > 5)
            pagesToDisplay = 5;
        else
            pagesToDisplay = numberOfPages;

        if (numberOfPages > 5)
            $scope.PageNumbers.push({ id: 'previous', value: '<<' });

        if (pagesToDisplay > 1) {
            for (i = 1; i <= pagesToDisplay; i++) {
                $scope.PageNumbers.push({ id: ('pageNumber' + i), value: i });
            }
        }

        if (numberOfPages > 5)
            $scope.PageNumbers.push({ id: 'next', value: '>>' });
    };

    $scope.LoadTenants = function () {
        $scope.PageNumbers = [];
        $scope.Tenants = [];
        $scope.SearchFired = false;
        if ($scope.TenantSearchInput === '')
            $scope.getTenants({ id: 'pageNumber1', value: 1 });
        else
            SearchTenant({ id: 'pageNumber1', value: 1 });
    };

    $scope.getTenants = function (pageNumber) {
        var params = {
            PageSize: parseInt($scope.PageSize),
            PageNumber: pageNumber.value,
            Sortby: $scope.orderByField,
            ReverseSort: $scope.reverseSort
        };

        if (pageNumber.value === '<<') {
            if ($scope.CurrentPage > 1) {
                $scope.CurrentPage = $scope.CurrentPage - 1;
                $scope.DisableNextClick = false;
            }
        }
        else if (pageNumber.value === '>>') {
            if ($scope.CurrentPage < ($scope.Tenants[0].totalAccounts / parseInt($scope.PageSize))) {
                $scope.CurrentPage = $scope.CurrentPage + 1;
                $scope.DisableNextClick = false;
            }
            else {
                $scope.DisableNextClick = true;
            }

        }
        else {
            $scope.DisableNextClick = false;
            $scope.CurrentPage = pageNumber.value;
        }

        params.PageNumber = $scope.CurrentPage;
        $scope.Tenants = [];

        var req = {
            method: 'POST',
            url: '/api/SysAdminApi/GetAllActiveTenants',
            headers: {
                'Content-Type': 'application/json'
            },
            data: params
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data.length > 0) {
                $scope.Tenants = result.data;
                for (i = 0; i < $scope.Tenants.length; i++) {
                    if ($scope.Tenants[i].memberSince !== null)
                        $scope.Tenants[i].memberSince = new Date($scope.Tenants[i].memberSince).toLocaleDateString('en-US');
                    else
                        $scope.Tenants[i].memberSince = 'N/A';
                }

                $scope.ShowingFrom = (($scope.CurrentPage - 1) * parseInt($scope.PageSize)) + 1;
                $scope.ShowingTo = $scope.ShowingFrom + $scope.Tenants.length - 1;

                angular.element(document.querySelector('#tenantsLoader')).html('');
                angular.element(document.querySelector('#tenants')).removeClass('loading');
                angular.element(document.querySelector('#tenants')).addClass('loaded');
                fillPageNumbersArray($scope.Tenants[0].totalAccounts);
            }
        },
            function () {
                alert('An error occurred while trying to get accounts. Please send an e-mail to admin@cb-resource.com.');
            });
    };

    $scope.LoadNextPageOfTenants = function (pageNumber) {
        if ($scope.TenantSearchInput === '') {
            $scope.getTenants(pageNumber);
        }
        else {
            SearchTenant(pageNumber);
        }
    };

    $scope.RedirectToSuperAccountAdministration = function (tenantKey) {
        window.location.href = '/Home/SuperAccountAdministration?tenantkey=' + tenantKey;
    };

    $scope.getTenants({ id: 'pageNumber1', value: 1 });
}]);

cbrSystemAdministrationModule.controller("addAccountsController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs) {
    $scope.ActiveInstitutions = [];
    $scope.SelectedInstitutions = [];
    $scope.SelectedBanksName = '';
    $scope.AccountName = '';
    $scope.AccountDomain = '';
    $scope.FirstName = '';
    $scope.LastName = '';
    $scope.Email = '';
    $scope.Message = '';
    $scope.AccountType = 'Bank';
    $scope.IsUserDuplicateMessage = '';
    $scope.IsUserAvailable = false;
    $scope.IsTenantAvailable = false;
    $scope.IsTenantAvailableMessage = '';
    $scope.ResultBanks = [];
    $scope.PageSize = '10';
    $scope.PageNumbers = [];
    $scope.CurrentPage = 1;
    $scope.TotalResults = 0;
    $scope.IsBankNameRequired = true;
    $scope.DisableNextClick = false;
    $scope.ValidAccountNamePattern = '';
    $scope.TenantNameAvailable = true;
    $scope.TenantNameAvailableMessage = '';
    $scope.showErrorMessageModal = false;
    $scope.ErrorMessageText = '';

    $scope.BankFindSearchCriteria =
    {
        BankName: '',
        CertNumber: '',
        Location: '',
        AssetMinSize: '',
        AssetMaxSize: '',
        CorporationType: '',
        PageSize: 10,
        PageNumber: 1
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
    $scope.Close = function ($event, boxType) {
        if (boxType === 'Close') {
            $scope.showAlertMessageModal = false;
        }
    }
    $scope.toggleAlertMessageBoxModal = function (message) {
        $scope.AlertMessageText = message;
        $scope.showAlertMessageModal = !$scope.showAlertMessageModal;
    };

    $scope.EnableDisableSearchBankButton = function ($event, accountType) {
        if (accountType === 'Bank' || accountType === 'F500Bank') {
            angular.element(document.querySelector('#selectedBankName')).removeAttr('disabled', '');
            angular.element(document.querySelector('#searchBankButton')).removeAttr('disabled', '');
            angular.element(document.querySelector('#clearBankSelectionButton')).removeAttr('disabled', '');
            $scope.IsBankNameRequired = true;
        }
        else if (accountType === 'Non-Bank' || accountType === 'F500Non-Bank') {
            angular.element(document.querySelector('#selectedBankName')).attr('disabled', '');
            angular.element(document.querySelector('#searchBankButton')).attr('disabled', '');
            angular.element(document.querySelector('#clearBankSelectionButton')).attr('disabled', '');
            $scope.IsBankNameRequired = false;
        }
    };

    $scope.IsUserDuplicate = function ($event) {
        if ($scope.Email !== null && $scope.Email.length > 0) {
            var inviteeDetails = {
                FirstName: $scope.FirstName,
                LastName: $scope.LastName,
                EmailAddress: $scope.Email
            };

            var req = {
                method: 'POST',
                url: '/api/AdminApi/IsUserDuplicate',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: inviteeDetails
            };

            $http(req).then(function (result) {
                if (result.data !== null) {
                    $scope.IsUserDuplicateMessage = result.data;
                    if ($scope.IsUserDuplicateMessage === 'Available.') {
                        $scope.IsUserAvailable = true;
                    }
                    else {
                        $scope.IsUserAvailable = false;
                    }
                }
            },
                function () {
                    $scope.IsUserDuplicateMessage = result.data;
                });
        }
        else {
            $scope.IsUserDuplicateMessage = '';
        }
    };

    var IsInstitutionAvailable = function () {
        var tenantCreateParam = {
            SelectedInstitutions: [],
            AccountName: $scope.AccountName,
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            Email: $scope.Email,
            Message: $scope.Message
        };

        if ($scope.SelectedInstitutions.length > 0) {
            for (i = 0; i < $scope.SelectedInstitutions.length; i++) {
                tenantCreateParam.SelectedInstitutions.push($scope.SelectedInstitutions[i].institutionKey);
            }
        }

        if (typeof $scope.SelectedInstitutions[0] !== 'undefined') {
            var req = {
                method: 'POST',
                url: '/api/SysAdminApi/IsInstitutionAvailable',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: tenantCreateParam
            };

            $http(req).then(function (result) {
                if (result.data !== null) {
                    $scope.IsTenantAvailable = result.data;
                }

                if ($scope.IsTenantAvailable === true) {
                    $scope.IsTenantAvailableMessage = 'Available.';
                }
                else {
                    $scope.IsTenantAvailableMessage = 'An account already exists having this institution as default institution.';
                }

                dlg = dialogs.notify('Info', $scope.IsTenantAvailableMessage);
            },
                function () {
                    alert('An error occurred while trying to get active institutions. Please send an e-mail to admin@cb-resource.com.');
                });
        }
    };

    $scope.SelectBank = function ($event, bankObj) {
        var obj = $scope.SelectedInstitutions.filter(function (el) { return el.rssd === bankObj.rssd })[0];
        if (typeof obj === 'undefined')
            $scope.SelectedInstitutions.push(bankObj);
        $scope.SelectedBanksName = $scope.SelectedInstitutions[0].institutionName;
        IsInstitutionAvailable();
        $('#drawerExample').drawer().hide();
    };

    $scope.ClearSelectedBank = function ($event) {
        $scope.SelectedBanksName = '';
        $scope.SelectedInstitutions = [];
    };

    $scope.showAddMoreBanksModal = function ($event) {
        $('#drawerExample').drawer().show();
        $scope.ResultBanks = [];
        $scope.PageNumbers = [];
        $scope.SelectedInstitutions = [];
        $scope.CurrentPage = 1;
        $scope.TotalResults = 0;
        $scope.SelectedBanksName = '';
        angular.element(document.querySelector('#successMessage')).addClass('hidden');
        angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('');
        $scope.BankFindSearchCriteria =
        {
            BankName: '',
            CertNumber: '',
            Location: '',
            AssetMinSize: '',
            AssetMaxSize: '',
            CorporationType: '',
            PageSize: 10,
            PageNumber: 1
            };

        $scope.PageSize = '10';
    };

    $scope.hideAddMoreBanksModal = function ($event) {
        $('#drawerExample').drawer().hide();
    };

    $scope.SearchOnPageSizeChange = function ($event) {
        $scope.ResultBanks = [];
        $scope.PageNumbers = [];
        $scope.searchBanks({ id: '', value: 1 });
    };

    var fillPageNumbersArray = function (length) {
        $scope.PageNumbers = [];
        var numberOfPages = 0;
        if (length > 0 && length <= parseInt($scope.PageSize))
            numberOfPages = 1;
        else if (length > 0 && length > parseInt($scope.PageSize)) {
            var remainder = length % parseInt($scope.PageSize);
            if (remainder > 0) {
                numberOfPages = Math.floor(length / parseInt($scope.PageSize)) + 1;
            }
            else {
                numberOfPages = length / parseInt($scope.PageSize);
            }
        }

        var pagesToDisplay = 0;

        if (numberOfPages > 5)
            pagesToDisplay = 5;
        else
            pagesToDisplay = numberOfPages;

        if (numberOfPages > 5)
            $scope.PageNumbers.push({ id: 'previous', value: '<<' });

        if (pagesToDisplay > 1) {
            for (i = 1; i <= pagesToDisplay; i++) {
                $scope.PageNumbers.push({ id: ('pageNumber' + i), value: i });
            }
        }

        if (numberOfPages > 5)
            $scope.PageNumbers.push({ id: 'next', value: '>>' });
    };

    $scope.searchBanks = function (pageNumber) {
        if ($scope.BankFindSearchCriteria.AssetMinSize !== '' &&
            $scope.BankFindSearchCriteria.AssetMaxSize !== '' &&
            parseInt($scope.BankFindSearchCriteria.AssetMinSize, 10) > parseInt($scope.BankFindSearchCriteria.AssetMaxSize, 10)) {
            $scope.toggleErrorMessageBoxModal('"From" value should be less than or equals to "To" value to search.');
        } else {

            angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('<img src="../../../Images/cbr-squares.gif" class="img-responsive" />');

            if (pageNumber.value === '<<') {
                if ($scope.CurrentPage > 1) {
                    $scope.CurrentPage = $scope.CurrentPage - 1;
                    $scope.DisableNextClick = false;
                }
            }
            else if (pageNumber.value === '>>') {
                if ($scope.CurrentPage < ($scope.ResultBanks[0].totalResults / parseInt($scope.PageSize))) {
                    $scope.CurrentPage = $scope.CurrentPage + 1;
                    $scope.DisableNextClick = false;
                }
                else {
                    $scope.DisableNextClick = true;
                }

            }
            else {
                $scope.DisableNextClick = false;
                $scope.CurrentPage = pageNumber.value;
            }

            if ($scope.PageSize === 'All')
                $scope.BankFindSearchCriteria.PageSize = -1;
            else
                $scope.BankFindSearchCriteria.PageSize = $scope.PageSize;

            $scope.BankFindSearchCriteria.PageNumber = $scope.CurrentPage;

            if ($scope.ResultBanks.length > 0)
                $scope.ResultBanks = [];
            var req = {
                method: 'POST',
                url: '/api/PeerGroupsApi/SearchBanks',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.BankFindSearchCriteria
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
                alert('An error occurred while searching for banks. Please send an e-mail to admin@cb-resource.com.');
                angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('');
            });

        }
        
    };

    $scope.AddAccount = function ($event, accountForm) {
        var tenantCreateParam = {
            SelectedInstitutions: [],
            AccountName: $scope.AccountName,
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            Email: $scope.Email,
            Message: $scope.Message,
            AccountType: $scope.AccountType
        };

        if ($scope.SelectedInstitutions.length > 0) {
            for (i = 0; i < $scope.SelectedInstitutions.length; i++) {
                tenantCreateParam.SelectedInstitutions.push($scope.SelectedInstitutions[i].institutionKey);
            }
        }

        if ($scope.AccountType === 'Non-Bank' || $scope.AccountType === 'F500Non-Bank') {
            tenantCreateParam.SelectedInstitutions.push(-1);
        }

        var req = {
            method: 'POST',
            url: '/api/SysAdminApi/AddAccount',
            headers: {
                'Content-Type': 'application/json'
            },
            data: tenantCreateParam
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data === true) {
                angular.element(document.querySelector('#accountAddSuccess')).removeClass('hidden');
                angular.element(document.querySelector('#accountAddSuccess')).removeClass('alert-warning');
                angular.element(document.querySelector('#accountAddSuccess')).addClass('alert-success');
                angular.element(document.querySelector('#accountAddSuccess')).html('<span class="glyphicon glyphicon-ok"></span> Success! Administrator for this account has been sent an email invitation with further instructions.');
                $scope.SelectedInstitutions = [];
                $scope.SelectedBanksName = '';
                $scope.AccountName = '';
                $scope.AccountDomain = '';
                $scope.FirstName = '';
                $scope.LastName = '';
                $scope.Email = '';
                $scope.Message = '';
                $scope.IsUserDuplicateMessage = '';
                $scope.IsUserAvailable = false;
                $scope.IsTenantAvailable = false;
                $scope.IsTenantAvailableMessage = '';
                $scope.TenantNameAvailable = true;
                $scope.TenantNameAvailableMessage = '';
                accountForm.$setPristine();
                accountForm.$setUntouched();
            }
            else {
                angular.element(document.querySelector('#accountAddSuccess')).removeClass('hidden');
                angular.element(document.querySelector('#accountAddSuccess')).removeClass('alert-success');
                angular.element(document.querySelector('#accountAddSuccess')).addClass('alert-warning');
                angular.element(document.querySelector('#accountAddSuccess')).html('<span class="glyphicon glyphicon-info"></span> Failue! An error occurred while trying to create new account. Please send an e-mail to admin@cb-resource.com.');
            }
        },
            function () {
                alert('An error occurred while trying to get active institutions. Please send an e-mail to admin@cb-resource.com.');
            });
    };

    $scope.IsTenantNameAvailable = function () {
        var req = {
            method: 'GET',
            url: '/api/SysAdminApi/IsTenantNameAvailable?tenantName=' + $scope.AccountName,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data === true) {
                $scope.TenantNameAvailable = false;
                $scope.TenantNameAvailableMessage = 'Available';
            }
            else {
                $scope.TenantNameAvailable = true;
                $scope.TenantNameAvailableMessage = 'Not Available';
            }
        },
            function () {
                var dlg = dialogs.error('An error occurred while trying to check tenant name availability.');
            });
    };

    $scope.ClearSearchDialog = function ($event) {
        $scope.BankFindSearchCriteria =
            {
                BankName: '',
                CertNumber: '',
                Location: '',
                AssetMinSize: '',
                AssetMaxSize: '',
                CorporationType: '',
                PageSize: 10,
                PageNumber: 1
            };
    };
}]);

cbrSystemAdministrationModule.controller("accessAccountsController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {

    $('#capitalPlan').bootstrapToggle({
        on: 'On',
        off: 'Off'
    });

    $('#strategy').bootstrapToggle({
        on: 'On',
        off: 'Off'
    });

    $('#ERM').bootstrapToggle({
        on: 'On',
        off: 'Off'
    });

    $('#ERA').bootstrapToggle({
        on: 'On',
        off: 'Off'
    });

    $('#compliance').bootstrapToggle({
        on: 'On',
        off: 'Off'
    });

    $('#credit').bootstrapToggle({
        on: 'On',
        off: 'Off'
    });

    $('#deNovo').bootstrapToggle({
        on: 'On',
        off: 'Off'
    });

    $('#MA').bootstrapToggle({
        on: 'On',
        off: 'Off'
    });

    $('#bankAnalytics').bootstrapToggle({
        on: 'On',
        off: 'Off'
    });

    $('#accountAccess').bootstrapToggle({
        on: 'On',
        off: 'Off'
    });
    //ToggleCapitalPlan

    $scope.ToggleCapitalPlan = function ($event) {
        if (angular.element(document.querySelector('#capitalPlan')).prop('checked') === true) {
            alert('Capital Plan Off');
        }
        else {
            alert('Capital Plan On');
        }
    };

    $scope.ToggleStrategy = function ($event) {
        if (angular.element(document.querySelector('#strategy')).prop('checked') === true) {
            alert('Capital Plan Off');
        }
        else {
            alert('Capital Plan On');
        }
    };

    $scope.ToggleERM = function ($event) {
        if (angular.element(document.querySelector('#ERM')).prop('checked') === true) {
            alert('Capital Plan Off');
        }
        else {
            alert('Capital Plan On');
        }
    };

    $scope.ToggleERA = function ($event) {
        if (angular.element(document.querySelector('#ERA')).prop('checked') === true) {
            alert('Capital Plan Off');
        }
        else {
            alert('Capital Plan On');
        }
    };

    $scope.ToggleCompliance = function ($event) {
        if (angular.element(document.querySelector('#compliance')).prop('checked') === true) {
            alert('Capital Plan Off');
        }
        else {
            alert('Capital Plan On');
        }
    };

    $scope.ToggleCredit = function ($event) {
        if (angular.element(document.querySelector('#credit')).prop('checked') === true) {
            alert('Capital Plan Off');
        }
        else {
            alert('Capital Plan On');
        }
    };

    $scope.ToggleDeNovo = function ($event) {
        if (angular.element(document.querySelector('#deNovo')).prop('checked') === true) {
            alert('Capital Plan Off');
        }   
        else {
            alert('Capital Plan On');
        }
    };

    $scope.ToggleMA = function ($event) {
        if (angular.element(document.querySelector('#MA')).prop('checked') === true) {
            alert('Capital Plan Off');
        }
        else {
            alert('Capital Plan On');
        }
    };

    $scope.ToggleBankAnalytics = function ($event) {
        if (angular.element(document.querySelector('#bankAnalytics')).prop('checked') === true) {
            alert('Capital Plan Off');
        }
        else {
            alert('Capital Plan On');
        }
    };

    $scope.ToggleAccountAccess = function ($event) {
        if (angular.element(document.querySelector('#accountAccess')).prop('checked') === true) {
            alert('Capital Plan Off');
        }
        else {
            alert('Capital Plan On');
        }
    };

}]);

cbrSystemAdministrationModule.controller("manageNewsAndEventsController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.Title = '';
    $scope.Date = '';
    $scope.Url = '';

    $scope.AddNewsEvent = function ($event) {
        if ($scope.addNewsAndEventsForm.$valid) {
            var homePageContent = {
                Title: $scope.Title,
                Date: $scope.Date,
                Url: $scope.Url,
            };

            var req = {
                method: 'POST',
                url: '/api/SysAdminApi/AddNewsOrEvent',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: homePageContent
            };

            $http(req).then(function (result) {
                if (result.data != null && result.data === true) {
                    angular.element(document.querySelector('#accountAddSuccess')).removeClass('hidden');
                    angular.element(document.querySelector('#accountAddSuccess')).removeClass('alert-warning');
                    angular.element(document.querySelector('#accountAddSuccess')).addClass('alert-success');
                    angular.element(document.querySelector('#accountAddSuccess')).html('<span class="glyphicon glyphicon-ok"></span> Success! The news or event has successfully been added to the database and will now appear on home page.');
                }
                else {
                    angular.element(document.querySelector('#accountAddSuccess')).removeClass('hidden');
                    angular.element(document.querySelector('#accountAddSuccess')).removeClass('alert-success');
                    angular.element(document.querySelector('#accountAddSuccess')).addClass('alert-warning');
                    angular.element(document.querySelector('#accountAddSuccess')).html('<span class="glyphicon glyphicon-info"></span> Failue! An error occurred while trying to create news or event item. Please send an e-mail to admin@cb-resource.com.');
                }
            },
                function () {
                    alert('Failue! An error occurred while trying to create news or event item. Please send an e-mail to admin@cb-resource.com.');
                });
        }
    };
}]);

cbrSystemAdministrationModule.controller("manageBlogsController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.Title = '';
    $scope.Date = '';
    $scope.Url = '';
    $scope.PostedBy = '';

    $scope.AddBlog = function ($event) {
        if ($scope.addBlogForm.$valid) {
            var homePageContent = {
                Title: $scope.Title,
                Date: $scope.Date,
                Url: $scope.Url,
                PostedBy: $scope.PostedBy
            };

            var req = {
                method: 'POST',
                url: '/api/SysAdminApi/AddBlog',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: homePageContent
            };

            $http(req).then(function (result) {
                if (result.data != null && result.data === true) {
                    angular.element(document.querySelector('#accountAddSuccess')).removeClass('hidden');
                    angular.element(document.querySelector('#accountAddSuccess')).removeClass('alert-warning');
                    angular.element(document.querySelector('#accountAddSuccess')).addClass('alert-success');
                    angular.element(document.querySelector('#accountAddSuccess')).html('<span class="glyphicon glyphicon-ok"></span> Success! The blog has successfully been added to the database and will now appear on home page.');
                }
                else {
                    angular.element(document.querySelector('#accountAddSuccess')).removeClass('hidden');
                    angular.element(document.querySelector('#accountAddSuccess')).removeClass('alert-success');
                    angular.element(document.querySelector('#accountAddSuccess')).addClass('alert-warning');
                    angular.element(document.querySelector('#accountAddSuccess')).html('<span class="glyphicon glyphicon-info"></span> Failue! An error occurred while trying to create blog item. Please send an e-mail to admin@cb-resource.com.');
                }
            },
                function () {
                    alert('Failue! An error occurred while trying to create blog item. Please send an e-mail to admin@cb-resource.com.');
                });
        }
    };
}]);

cbrSystemAdministrationModule.controller("manageInfoCenterController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.Image1 = '';
    $scope.Image2 = '';

    var UpdateImage1 = function (event) {
        var input = event.target;
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
            $scope.Image1 = e.target.result;
        });
        FR.readAsDataURL(input.files[0]);
    };

    var UpdateImage2 = function (event) {
        var input = event.target;
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
            $scope.Image2 = e.target.result;
        });
        FR.readAsDataURL(input.files[0]);
    };

    $scope.UpdateImages = function () {
        var images = {
            Image1: $scope.Image1,
            Image2: $scope.Image2
        };

        var req = {
            method: 'POST',
            url: '/api/SysAdminApi/UpdateInfoCenterImages',
            headers: {
                'Content-Type': 'application/json'
            },
            data: images
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data === true) {
                angular.element(document.querySelector('#updateImageMessageBox')).removeClass('hidden');
                angular.element(document.querySelector('#updateImageMessageBox')).removeClass('alert-warning');
                angular.element(document.querySelector('#updateImageMessageBox')).addClass('alert-success');
                angular.element(document.querySelector('#updateImageMessageBox')).html('<span class="glyphicon glyphicon-ok"></span> Success! The images have successfully been added to the database and will now appear on home page.');
            }
            else {
                angular.element(document.querySelector('#updateImageMessageBox')).removeClass('hidden');
                angular.element(document.querySelector('#updateImageMessageBox')).removeClass('alert-success');
                angular.element(document.querySelector('#updateImageMessageBox')).addClass('alert-warning');
                angular.element(document.querySelector('#updateImageMessageBox')).html('<span class="glyphicon glyphicon-info"></span> Failue! An error occurred while trying to update images. Please send an e-mail to admin@cb-resource.com.');
            }
        },
            function () {
                alert('Failue! An error occurred while trying to update images. Please send an e-mail to admin@cb-resource.com.');
            });
    };

    var initialize = function () {
        document.getElementById("image1").addEventListener("change", UpdateImage1);
        document.getElementById("image2").addEventListener("change", UpdateImage2);
    };

    initialize();
}]);

cbrSystemAdministrationModule.controller("manageRates", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs) {
    $scope.Rates = [];
    $scope.ValidRatePattern = '^\d+(?:\.\d+)?(?:-\d+(?:\.\d+)?)*$';

    var getCdRates = function () {
        document.getElementById('overlay').style.display = '';
        var req = {
            method: 'GET',
            url: '/api/SysAdminApi/GetCdRates',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                
                document.getElementById('overlay').style.display = 'none';
                $scope.Rates = result.data;
                for (i = 0; i < $scope.Rates.length; i++) {
                    $scope.Rates[i].HiddenFixedRate = '';
                    $scope.Rates[i].HiddenCallableRate = '';
                    if ($scope.Rates[i].term === 'Special CD Issues 1' || $scope.Rates[i].term === 'Special CD Issues 2') {
                        $scope.Rates[i].Required = false;
                    }
                    else {
                        $scope.Rates[i].Required = true;
                    }
                }
            }
            else {
                document.getElementById('overlay').style.display = 'none';
                dlg = dialogs.error('An error occurred while trying to get rates. Please send an e-mail to admin@cb-resource.com.');
            }
        }, function () {
            document.getElementById('overlay').style.display = 'none';
            dlg = dialogs.error('An error occurred while trying to get rates. Please send an e-mail to admin@cb-resource.com.');
        });
    };

    $scope.submitRates = function (outerForm) {
        document.getElementById('overlay').style.display = '';
        var req = {
            method: 'POST',
            url: '/api/SysAdminApi/UpdateRates',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.Rates
        };

        document.getElementById('overlayLoadingText').innerText = 'Updating rates...';

        $http(req).then(
            function (result) {
                if (result.data !== null && result.data > 0) {
                    document.getElementById('overlay').style.display = 'none';
                    document.getElementById('overlayLoadingText').innerText = 'Loading...';
                    dlg = dialogs.notify('Success!', 'Rate(s) have been updated.');
                    $scope.Rates = [];
                    getCdRates();
                }
                else {
                    document.getElementById('overlay').style.display = 'none';
                    document.getElementById('overlayLoadingText').innerText = 'Loading...';
                    dlg = dialogs.error('An error occurred while updating rates. Please contact system administrator.');
                    $scope.Rates = [];
                }
            },
            function () {
                document.getElementById('overlay').style.display = 'none';
                document.getElementById('overlayLoadingText').innerText = 'Loading...';
                dlg = dialogs.error('An error occurred while updating rates. Please contact system administrator.');
                $scope.Rates = [];
                getCdRates();
            });
    };

    $scope.ValidateRate = function (formObj) {
        console.log(formObj);
    };

    $scope.UpdateHiddenFixedRate = function (rate) {
        if (rate.fixedRate.toString() === "0.00" || rate.fixedRate.toString() === "0.0" || rate.fixedRate.toString() === "0") {
            rate.HiddenFixedRate = parseFloat(rate.fixedRate);
        }
        else {
            rate.HiddenFixedRate = '';
        }
    };

    $scope.UpdateHiddenCallableRate = function (rate) {
        if (rate.callable.toString() === "0.00" || rate.callable.toString() === "0.0" || rate.callable.toString() === "0") {
            rate.HiddenCallableRate = parseFloat(rate.callable);
        }
        else {
            rate.HiddenCallableRate = '';
        }
    };

    var initialize = function () {
        getCdRates();
    };

    initialize();
}]);

cbrSystemAdministrationModule.controller("manageOrders", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", "$uibModal", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs, $uibModal) {
    $scope.ExistingOrders = [];
    $scope.PageNumbers = [];
    $scope.PageSize = 10;
    $scope.CurrentPage = 1;
    $scope.SelectedPageSize = '10';
    $scope.orderByField = 'orderDate';
    $scope.reverseSort = false;
    $scope.SelectedFilter = 'All';
    $scope.ShowingFrom = 1;
    $scope.ShowingTo = 1;
    $scope.OriginalItem = {};
    $scope.DisableNextClick = false;

    $scope.LoadOrders = function () {
        $scope.PageSize = parseInt($scope.SelectedPageSize);
        $scope.PageNumbers = [];
        $scope.ExistingOrders = [];
        $scope.getCdOrders({ id: 'pageNumber1', value: 1 });
    };

    $scope.getCdOrders = function (pageNumber) {
        document.getElementById('overlay').style.display = '';
        var params = {
            PageSize: $scope.SelectedPageSize,
            PageNumber: pageNumber.value
        };

        if (pageNumber.value === '<<') {
            if ($scope.CurrentPage > 1) {
                $scope.CurrentPage = $scope.CurrentPage - 1;
                $scope.DisableNextClick = false;
            }
        }
        else if (pageNumber.value === '>>') {
            if ($scope.CurrentPage < ($scope.ExistingOrders[0].totalOrders / $scope.PageSize)) {
                $scope.CurrentPage = $scope.CurrentPage + 1;
                $scope.DisableNextClick = false;
            }
            else {
                $scope.DisableNextClick = true;
            }

        }
        else {
            $scope.DisableNextClick = false;
            $scope.CurrentPage = pageNumber.value;
        }

        params.PageNumber = $scope.CurrentPage;

        var req = {
            method: 'POST',
            url: '/api/CdApi/GetOrders',
            headers: {
                'Content-Type': 'application/json'
            },
            data: params

        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                document.getElementById('overlay').style.display = 'none';
                $scope.ExistingOrders = result.data;

                $scope.ShowingFrom = (($scope.CurrentPage - 1) * $scope.PageSize) + 1;
                $scope.ShowingTo = $scope.ShowingFrom + $scope.ExistingOrders.length - 1;

                fillPageNumbersArray($scope.ExistingOrders[0].totalOrders);

                setTimeout(function () {
                    $('.notes').bind('mouseenter', function () {
                        var $this = $(this);
                        if (this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
                            $this.attr('title', $this.text());
                        }
                    });
                }, 100);
            }
            else {
                document.getElementById('overlay').style.display = 'none';
                dlg = dialogs.error('An error occurred while trying to get existing orders. Please send an e-mail to admin@cb-resource.com.');
            }
        }, function () {
            document.getElementById('overlay').style.display = 'none';
            dlg = dialogs.error('An error occurred while trying to get existing orders. Please send an e-mail to admin@cb-resource.com.');
        });
    };

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
            $scope.PageNumbers.push({ id: 'previous', value: '<<' });

        if (pagesToDisplay > 1) {
            for (i = 1; i <= pagesToDisplay; i++) {
                $scope.PageNumbers.push({ id: ('pageNumber' + i), value: i });
            }
        }

        if (numberOfPages > 5)
            $scope.PageNumbers.push({ id: 'next', value: '>>' });
    };

    $scope.editOrder = function (item, index) {
        var itemToEdit = item;
        $scope.OriginalItem = angular.copy(item);
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/App/Cd/Views/CdOrderEditTemplate.html',
            controller: 'editOrderController',
            size: 'md',
            resolve: {
                data: function () {
                    return itemToEdit;
                }
            },
            backdrop: 'static',
            keyboard: false
        });

        modalInstance.result.then(function (result) {
        }, function (result) {
            angular.copy($scope.OriginalItem, itemToEdit);
        });
    };

    var initialize = function () {
        $scope.getCdOrders({ id: 'pageNumber1', value: 1 });
    };

    initialize();
}]);

cbrSystemAdministrationModule.controller("editOrderController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", "$uibModalInstance", "data", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs, $uibModalInstance, data) {
    $scope.OrderToEdit = data;
    $scope.NumericAmount = '';
    $scope.HiddenRate = '';
    $scope.ValidRatePattern = '(^((\\d)+(\.[0-9]+)?)(\-)?((\\d)+(\.[0-9]+)?)$)|^(\\d+)$';
    $scope.Rates = [];

    var getCdRates = function () {
        //document.getElementById('overlay').style.display = '';
        var req = {
            method: 'GET',
            url: '/api/CdApi/GetCdRates',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                //document.getElementById('overlay').style.display = 'none';
                $scope.Rates = result.data;
                setTimeout(function () {
                    $('.callablepicker').selectpicker();
                    $('.callablepicker').selectpicker('refresh');

                    $('.callfrequencypicker').selectpicker();
                    $('.callfrequencypicker').selectpicker('refresh');

                    $('.termpicker').selectpicker();
                    $('.termpicker').selectpicker('refresh');

                    $('.frequencypicker').selectpicker();
                    $('.frequencypicker').selectpicker('refresh');

                    $('.statuspicker').selectpicker();
                    $('.statuspicker').selectpicker('refresh');

                    $('.datetimepicker').datepicker({ todayHighlight: true, startDate: 'd', daysOfWeekDisabled: '06' }).on('changeDate', function (e) {
                        $(this).datepicker('hide');
                    });

                    $('[data-toggle="tooltip"]').tooltip();
                    $scope.OrderToEdit = data;
                }, 500);

                setTimeout(function () {
                    $('.callablepicker').selectpicker('val', $scope.OrderToEdit.callable);
                    $('.termpicker').selectpicker('val', $scope.OrderToEdit.term.trim());
                    $('.callfrequencypicker').selectpicker('val', $scope.OrderToEdit.callFrequency);
                    $('.frequencypicker').selectpicker('val', $scope.OrderToEdit.interestPaymentFrequency);
                    $('.statuspicker').selectpicker('val', $scope.OrderToEdit.status);
                    $scope.EnableDisableCallFrequency();
                }, 100);
            }
            else {
                //document.getElementById('overlay').style.display = 'none';
                dlg = dialogs.error('An error occurred while trying to get rates. Please send an e-mail to admin@cb-resource.com.');
            }
        }, function () {
            //document.getElementById('overlay').style.display = 'none';
            dlg = dialogs.error('An error occurred while trying to get rates. Please send an e-mail to admin@cb-resource.com.');
        });
    };

    $scope.SetRates = function () {
        for (i = 0; i < $scope.Rates.length; i++) {
            if ($scope.Rates[i].term === $scope.OrderToEdit.term) {
                if ($scope.OrderToEdit.callable === 'No') {
                    if ($scope.Rates[i].callable === '-' || $scope.Rates[i].callable === '') {
                        $scope.OrderToEdit.rate = 'Rate Not Available';
                        $scope.HiddenRate = '';
                    }
                    else {
                        $scope.OrderToEdit.rate = parseFloat($scope.Rates[i].fixedRate);
                        $scope.HiddenRate = parseFloat($scope.Rates[i].fixedRate);
                    }
                }
                else {
                    if ($scope.Rates[i].callable === '-' || $scope.Rates[i].callable === '') {
                        $scope.OrderToEdit.rate = 'Callable Rate Not Available';
                        $(".callfrequencypicker").val("").selectpicker("refresh");
                        $(".callfrequencypicker").prop("disabled", true);
                        $(".callfrequencypicker").selectpicker("refresh");
                        $(".callfrequencypicker[data-id='callfrequencypicker']").addClass("disabled");
                        $(".callfrequencypicker").selectpicker("refresh");
                    }
                    else {
                        $scope.OrderToEdit.rate = parseFloat($scope.Rates[i].callable);
                        $scope.HiddenRate = parseFloat($scope.Rates[i].callable);
                        if ($scope.OrderToEdit.rate !== 'Callable Rate Not Available') {
                            $(".callfrequencypicker").prop("disabled", false);
                            $(".callfrequencypicker").selectpicker("refresh");
                            $(".callfrequencypicker[data-id='callfrequencypicker']").removeClass("disabled");
                            $(".callfrequencypicker").selectpicker("refresh");
                        }
                    }
                }
                break;
            }
        }
    };

    var initialize = function () {
        getCdRates();

        
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancelled');
    }; // end cancel

    $scope.save = function () {
        submitOrder();
        
    }; // end save

    $scope.hitEnter = function (evt) {
        if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.name, null) || angular.equals($scope.name, '')))
            $scope.save();
    }; // end hitEnter

    $scope.UpdateNumericAmount = function (amount) {
        $scope.NumericAmount = parseFloat(amount);
    };

    var submitOrder = function (outerForm) {
        var req = {
            method: 'POST',
            url: '/api/CdApi/EditOrder',
            headers: {
                'Content-Type': 'application/json'
            },
            data: [$scope.OrderToEdit]
        };

        $http(req).then(
            function (result) {
                if (result.data !== null && result.data > 0) {
                    dlg = dialogs.notify('Success!', 'Order has been updated.');
                    $uibModalInstance.close('saved');
                }
                else {
                    dlg = dialogs.error('An error occurred while updating your order. Please contact system administrator.');
                }
            },
            function () {
                dlg = dialogs.error('An error occurred while updating your order. Please contact system administrator.');
            });
    };

    $scope.EnableDisableCallFrequency = function () {
        if ($scope.OrderToEdit.callable === 'Yes') {
            if ($scope.OrderToEdit.term !== '') {
                $scope.SetRates();
            }

            if ($scope.OrderToEdit.rate !== 'Callable Rate Not Available') {
                $(".callfrequencypicker").prop("disabled", false);
                $(".callfrequencypicker").selectpicker("refresh");
                $(".callfrequencypicker[data-id='callfrequencypicker']").removeClass("disabled");
                $(".callfrequencypicker").selectpicker("refresh");
            }
        }
        else {
            if ($scope.OrderToEdit.term !== '') {
                $scope.SetRates();
            }

            $scope.OrderToEdit.callFrequency = '';
            $(".callfrequencypicker").val("").selectpicker("refresh");
            $(".callfrequencypicker").prop("disabled", true);
            $(".callfrequencypicker").selectpicker("refresh");
            $(".callfrequencypicker[data-id='callfrequencypicker']").addClass("disabled");
            $(".callfrequencypicker").selectpicker("refresh");
        }
    };

    $scope.UpdateRate = function () {
        if ($scope.OrderToEdit.rate === "0.00" || $scope.OrderToEdit.rate === "0.0" || $scope.OrderToEdit.rate === "0") {
            $scope.HiddenRate = parseFloat($scope.OrderToEdit.rate);
        }
        else {
            $scope.HiddenRate = '';
        }

        if (isNaN($scope.OrderToEdit.rate) === false) {
            $(".callfrequencypicker").prop("disabled", false);
            $(".callfrequencypicker").selectpicker("refresh");
            $(".callfrequencypicker[data-id='callfrequencypicker']").removeClass("disabled");
            $(".callfrequencypicker").selectpicker("refresh");
        }
        else {
            $(".callfrequencypicker").prop("disabled", true);
            $(".callfrequencypicker").selectpicker("refresh");
            $(".callfrequencypicker[data-id='callfrequencypicker']").addClass("disabled");
            $(".callfrequencypicker").selectpicker("refresh");
        }
    };

    initialize();
}]);

angular.bootstrap(document.getElementById("systemadministration"), ['cbrsystemadministration']);
