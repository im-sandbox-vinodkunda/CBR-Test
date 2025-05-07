cbrSuperAccountAdministration.controller("superAccountAdministrationNavigationController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs) {
    $scope.superAdminTemplate = 'accountProfile';
    $scope.TenantName = '';
    $scope.Tenant = {};
    $scope.IsAccountAccessDisabled = false;

    $scope.ToggleSuperAccountAdminScreen = function ($event, screenName) {
        if (screenName === 'accountAccess') {
            if ($scope.IsAccountAccessDisabled === false) {
                $scope.superAdminTemplate = screenName;
            }
            else {
                dlg = dialogs.notify('Info', 'The account type you trying to edit is a non-bank. For Non-Bank account types account access is disabled.');
            }
        }
        else {
            $scope.superAdminTemplate = screenName;
        }

    };

    $scope.NavigateToDashboard = function () {
        window.location.href = '/';
    };

    var getTenantName = function () {
        var tenantKey = $location.search().tenantkey;

        var req = {
            method: 'GET',
            url: '/api/SuperAccountAdminApi/GetTenantName?tenantKey=' + tenantKey,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                if (result.data === 'Invalid Tenant Key') {
                    dlg = dialogs.error('Invalid tenant key specified.');
                }
                else {
                    $scope.TenantName = result.data;
                }
            }
        },
            function () {
                alert('An error occurred while trying to get accounts. Please send an e-mail to castellonf@stifel.com.');
            });
    };

    var getTenantProfile = function () {
        var tenantKey = $location.search().tenantkey;

        var req = {
            method: 'GET',
            url: '/api/SuperAccountAdminApi/GetTenantProfile?tenantKey=' + tenantKey,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                if (result.data === null) {
                    dlg = dialogs.error('Invalid tenant key specified or tenant not found.');
                }
                else {
                    $scope.Tenant = result.data;
                    if ($scope.Tenant.accountType.indexOf("Non-Bank") > -1) {
                        $scope.IsAccountAccessDisabled = true;
                    }
                }
            }
        },
            function () {
                dlg = dialogs.error('An error occurred while trying to get account profile. Please send an e-mail to castellonf@stifel.com.');

            });
    };

    $scope.NavigateToSystemAdministration = function () {
        window.location.href = '/Home/SysAdmin';
    };

    var initialize = function () {
        getTenantName();
        getTenantProfile();
    };

    initialize();
}]);

cbrSuperAccountAdministration.controller("accountProfileController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", "$uibModal", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs, $uibModal) {
    $scope.Tenant = {};

    $scope.BindMemberSince = function (memberSince) {
        if (memberSince === null || memberSince === '') {
            return 'N/A';
        }
        else {
            return memberSince;
        }
    };

    $scope.BindFdicCertNumber = function (certNumber) {
        if (certNumber === null || certNumber === '') {
            return 'N/A';
        }
        else {
            return certNumber;
        }
    };

    $scope.BindHeadQuarters = function (headQuarters) {
        if (headQuarters === null || headQuarters === '') {
            return 'N/A';
        }
        else {
            return headQuarters;
        }
    };

    $scope.BindBHCName = function (bhcName) {
        if (bhcName === null || bhcName === '') {
            return 'N/A';
        }
        else {
            return bhcName;
        }
    };

    $scope.BindStockTicker = function (stockTicker) {
        if (stockTicker === null || stockTicker === '') {
            return 'N/A';
        }
        else {
            return stockTicker;
        }
    };

    $scope.BindNumberOfBranches = function (numberOfBranches) {
        if (numberOfBranches === null || numberOfBranches === '') {
            return 'N/A';
        }
        else {
            return numberOfBranches;
        }
    };

    $scope.BindFTEmployees = function (ftEmployees) {
        if (ftEmployees === null || ftEmployees === '') {
            return 'N/A';
        }
        else {
            return ftEmployees;
        }
    };

    $scope.BindWebSite = function (website) {
        if (website === null || website === '') {
            return 'N/A';
        }
        else {
            return website;
        }
    };

    $scope.BindAccountWebLink = function (weblink) {
        if (weblink === null || weblink === '' || weblink === 'N/A') {
            return 'javascript:void(0)';
        }
        else {
            if (typeof weblink !== 'undefined' && (weblink.indexOf('https') > -1 || weblink.indexOf('http') > -1))
                return weblink;
            else
                return "https://" + weblink;
        }
    };

    $scope.editAccountProfile = function (item, index) {
        var itemToEdit = item;
        $scope.OriginalItem = angular.copy(item);
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/App/Home/Views/EditAccountProfileTemplate.html',
            controller: 'editAccountProfileController',
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
            if (result === 'Saved') {
                window.location.reload();
            }
        }, function (result) {
            angular.copy($scope.OriginalItem, itemToEdit);
        });
    };

    var getTenantProfile = function () {
        var tenantKey = $location.search().tenantkey;

        var req = {
            method: 'GET',
            url: '/api/SuperAccountAdminApi/GetTenantProfile?tenantKey=' + tenantKey,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                if (result.data === null) {
                    dlg = dialogs.error('Invalid tenant key specified or tenant not found.');
                }
                else {
                    $scope.Tenant = result.data;
                }
            }
        },
            function () {
                dlg = dialogs.error('An error occurred while trying to get account profile. Please send an e-mail to castellonf@stifel.com.');

            });
    };

    var initialize = function () {
        getTenantProfile();
    };

    initialize();
}]);

cbrSuperAccountAdministration.controller("editAccountProfileController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", "$uibModalInstance", "data", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs, $uibModalInstance, data) {
    $scope.AccountToEdit = data;

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancelled');
    }; // end cancel

    $scope.UpdateAccountProfile = function () {
        var req = {
            method: 'POST',
            url: '/api/SuperAccountAdminApi/UpdateAccountProfile',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.AccountToEdit
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data === true) {
                dlg = dialogs.notify('Success!', 'Account profile has been updated successfully.');
                dlg.result.then(function (btn) {
                    $uibModalInstance.close('Saved');
                }, function (btn) {
                });
            }
            else {
                dlg = dialogs.notify('Info', 'No modifications detected.');
                dlg.result.then(function (btn) {
                    $uibModalInstance.close('NoChange');
                }, function (btn) {
                });
            }
        },
            function () {
                dlg = dialogs.error('An error occurred while trying to update account profile. Please send an e-mail to castellonf@stifel.com.');
                dlg.result.then(function (btn) {
                    $uibModalInstance.close('Error');
                }, function (btn) {
                });
            });
    };

    var initialize = function () {
        if ($scope.AccountToEdit.bhcName === 'N/A') {
            $scope.AccountToEdit.bhcName = '';
        }

        if ($scope.AccountToEdit.stockTicker === 'N/A') {
            $scope.AccountToEdit.stockTicker = '';
        }
    };

    initialize();
}]);

cbrSuperAccountAdministration.controller("accountAccessController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", "$uibModal", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs, $uibModal) {
    $scope.ModuleAccessState = [];

    $scope.ToggleCapitalPlan = function ($event) {
        if (angular.element(document.querySelector('#capitalPlan')).prop('checked') === true) {
            $('#capitalPlan').bootstrapToggle('off');
            updateModuleAccessState('Capital Plan', false);
        }
        else {
            $('#capitalPlan').bootstrapToggle('on');
            updateModuleAccessState('Capital Plan', true);
        }
    };

    $scope.ToggleStrategy = function ($event) {
        if (angular.element(document.querySelector('#strategy')).prop('checked') === true) {
            $('#strategy').bootstrapToggle('off');
            updateModuleAccessState('Strategic Plan', false);
        }
        else {
            $('#strategy').bootstrapToggle('on');
            updateModuleAccessState('Strategic Plan', true);
        }
    };

    $scope.ToggleERM = function ($event) {
        if (angular.element(document.querySelector('#ERM')).prop('checked') === true) {
            $('#ERM').bootstrapToggle('off');
            updateModuleAccessState('ERM Solution', false);
        }
        else {
            $('#ERM').bootstrapToggle('on');
            updateModuleAccessState('ERM Solution', true);
        }
    };

    //$scope.ToggleIssueCD = function ($event) {
    //    if (angular.element(document.querySelector('#issueCd')).prop('checked') === true) {
    //        $('#issueCd').bootstrapToggle('off');
    //        updateModuleAccessState('Issue A CD', false);
    //    }
    //    else {
    //        $('#issueCd').bootstrapToggle('on');
    //        updateModuleAccessState('Issue A CD', true);
    //    }
    //};

    var updateModuleAccessState = function (moduleName, isAccessible) {
        var tenantKey = $location.search().tenantkey;

        var req = {
            method: 'GET',
            url: '/api/SuperAccountAdminApi/UpdateAccountsModuleAccessState?tenantKey=' + tenantKey + '&moduleName=' + moduleName + '&isAccessible=' + isAccessible,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data === true) {
                dlg = dialogs.notify('Success!', 'Updated the module access state.');
            }
            else {
                dlg = dialogs.error('An error occurred while trying to update module accessibility state. Please send an e-mail to castellonf@stifel.com.');
            }
        },
            function (error) {
                dlg = dialogs.error('An error occurred while trying to update module accessibility state. Please send an e-mail to castellonf@stifel.com.');
            });
    };

    var getAccountsModuleAccessState = function () {
        var tenantKey = $location.search().tenantkey;

        var req = {
            method: 'GET',
            url: '/api/SuperAccountAdminApi/GetAccountsModuleAccessState?tenantKey=' + tenantKey,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data.length > 0) {
                $scope.ModuleAccessState = result.data;

                var capitalPlanAccess = result.data.filter(function (obj) {
                    return obj.moduleName === 'Capital Plan';
                })[0];

                if (capitalPlanAccess.isAccessible === true) {
                    $('#capitalPlan').bootstrapToggle('on');
                }
                else {
                    $('#capitalPlan').bootstrapToggle('off');
                }

                var strategicPlanAccess = result.data.filter(function (obj) {
                    return obj.moduleName === 'Strategic Plan';
                })[0];

                if (strategicPlanAccess.isAccessible === true) {
                    $('#strategy').bootstrapToggle('on');
                }
                else {
                    $('#strategy').bootstrapToggle('off');
                }

                var ermSolutionAccess = result.data.filter(function (obj) {
                    return obj.moduleName === 'ERM Solution';
                })[0];

                if (ermSolutionAccess.isAccessible === true) {
                    $('#ERM').bootstrapToggle('on');
                }
                else {
                    $('#ERM').bootstrapToggle('off');
                }

                var issueCdAccess = result.data.filter(function (obj) {
                    return obj.moduleName === 'Issue A CD';
                })[0];

                //if (issueCdAccess.isAccessible === true) {
                //    $('#issueCd').bootstrapToggle('on');
                //}
                //else {
                //    $('#issueCd').bootstrapToggle('off');
                //}
            }
            else {
                dlg = dialogs.error('An error occurred while trying to get module accessibility status. Please send an e-mail to castellonf@stifel.com.');
                $('#capitalPlan').bootstrapToggle('disable');
                $('#strategy').bootstrapToggle('disable');
                $('#ERM').bootstrapToggle('disable');
                //$('#issueCd').bootstrapToggle('disable');
            }
        },
            function () {
                dlg = dialogs.error('An error occurred while trying to get module accessibility status. Please send an e-mail to castellonf@stifel.com.');
                $('#capitalPlan').bootstrapToggle('disable');
                $('#strategy').bootstrapToggle('disable');
                $('#ERM').bootstrapToggle('disable');
                //$('#issueCd').bootstrapToggle('disable');
            });
    };

    var initialize = function () {
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

        //$('#issueCd').bootstrapToggle({
        //    on: 'On',
        //    off: 'Off'
        //});

        getAccountsModuleAccessState();
    };

    initialize();

}]);

cbrSuperAccountAdministration.controller("manageUsersController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "dialogs", "$uibModal", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, dialogs, $uibModal) {
    $scope.TenantUsers = [];
    $scope.PageNumbers = [];
    $scope.PageSize = '10';
    $scope.CurrentPage = 1;
    $scope.UserToDelete = {};
    $scope.UserToEdit = {};
    $scope.UserDetails = {};
    $scope.showDeleteModal = false;
    $scope.showEditModal = false;
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.form = {};
    $scope.DisableNextClick = false;
    $scope.orderByField = 'orderDate';
    $scope.reverseSort = false;

    $scope.BindUserName = function (tenantObj) {
        return tenantObj.firstName + ' ' + tenantObj.lastName;
    };

    $scope.BindUserTitle = function (title) {
        if (title === null || title === '')
            return 'N/A';
        else
            return title;
    };

    $scope.toggleDeleteModal = function () {
        $scope.showDeleteModal = !$scope.showDeleteModal;
    };

    $scope.toggleEditModal = function () {
        $scope.showEditModal = !$scope.showEditModal;
    };

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

    $scope.editUserProfile = function (item, index) {
        var itemToEdit = item;
        $scope.OriginalItem = angular.copy(item);
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/App/Home/Views/EditUserTemplate.html',
            controller: 'editUserProfileController',
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
            if (result.Result === 'Saved') {
                var roles = '';
                for (i = 0; i < result.UpdatedUser.UserRoles.length; i++) {
                    if (result.UpdatedUser.UserRoles[i].IsAccessible === true) {
                        if (roles === '') {
                            roles += result.UpdatedUser.UserRoles[i].RoleName;
                        }
                        else {
                            roles += "," + result.UpdatedUser.UserRoles[i].RoleName;
                        }
                    }
                }

                $scope.TenantUsers[index].userRoles = roles;
            }
        }, function (result) {
            angular.copy($scope.OriginalItem, itemToEdit);
        });
    };

    var GetUserDetailsToEdit = function (userObj) {
        var req = {
            method: 'POST',
            url: '/api/AdminApi/GetUserDetailsToEdit',
            headers: {
                'Content-Type': 'application/json'
            },
            data: userObj
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                $scope.UserDetails = result.data;
                $scope.toggleEditModal();
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get users. Please send an e-mail to castellonf@stifel.com.');
            });
    };

    $scope.EditUser = function ($event) {
        if ($scope.form.userEditForm.$valid) {
            document.getElementById('overlay').style.display = '';
            var req = {
                method: 'POST',
                url: '/api/AdminApi/EditUser',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.UserDetails
            };

            $scope.toggleEditModal();
            $http(req).then(function (result) {
                if (result.data !== null) {
                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleSuccessMessageBoxModal(result.data);
                    $scope.UserToDelete = {};
                    angular.element(document.querySelector('#usersLoader')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
                    angular.element(document.querySelector('#tenantUsers')).addClass('loading');
                    $scope.getTenantUsers({ id: '', value: $scope.CurrentPage });
                }
            },
                function () {
                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleErrorMessageBoxModal('An error occurred while trying to get users. Please send an e-mail to castellonf@stifel.com.');
                });
        }
        else {
            $scope.submitted = true;
        }
    };

    $scope.SelectUserToEdit = function ($event, userObj) {
        $scope.title = 'Edit User';
        $scope.UserToEdit = userObj;
        GetUserDetailsToEdit(userObj);
    };

    $scope.SelectUserToDelete = function ($event, userObj) {
        $scope.title = 'Delete User';
        $scope.UserToDelete = userObj;
        $scope.toggleDeleteModal();
    };

    $scope.DeleteUser = function ($event, userObj) {
        var dlg = dialogs.confirm('Confirm', 'WARNING: You are about to delete a user. Please confirm to proceed.');
        dlg.result.then(function (btn) {
            if (btn === 'yes') {
                document.getElementById('overlay').style.display = '';
                var parameters = {
                    UserKey: userObj.userKey
                };

                var req = {
                    method: 'POST',
                    url: '/api/SuperAccountAdminApi/DeleteUser',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: parameters
                };

                $http(req).then(function (result) {
                    if (result.data !== null && result.data === true) {
                        document.getElementById('overlay').style.display = 'none';
                        var success = dialogs.notify('Info', 'User deleted successfully.');
                        $scope.getTenantUsers({ id: '', value: $scope.CurrentPage });
                    }
                    else {
                        document.getElementById('overlay').style.display = 'none';
                        var deleteerror = dialogs.error('An error occurred while deleting the user.');
                    }
                },
                    function () {
                        document.getElementById('overlay').style.display = 'none';
                        var error = dialogs.error('An error occurred while deleting the user.');
                    });
            }
        }, function (btn) {
        });
    };

    $scope.ReactivateUser = function ($event, userObj) {
        var dlg = dialogs.confirm('Confirm', 'You are about to reactivate a user. Please confirm to proceed.');
        dlg.result.then(function (btn) {
            if (btn === 'yes') {
                document.getElementById('overlay').style.display = '';
                var parameters = {
                    UserName: userObj.firstName,
                    UserKey: userObj.userKey,
                    EMail: userObj.email
                };

                var req = {
                    method: 'POST',
                    url: '/api/SuperAccountAdminApi/ReactivateUser',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: parameters
                };

                $http(req).then(function (result) {
                    if (result.data !== null && result.data === true) {
                        document.getElementById('overlay').style.display = 'none';
                        var success = dialogs.notify('Info', 'User reactivated successfully.');
                        $scope.getTenantUsers({ id: '', value: $scope.CurrentPage });
                    }
                    else {
                        document.getElementById('overlay').style.display = 'none';
                        var deleteerror = dialogs.error('An error occurred while reactivating the user.');
                    }
                },
                    function () {
                        document.getElementById('overlay').style.display = 'none';
                        var error = dialogs.error('An error occurred while reactivating the user.');
                    });
            }
        }, function (btn) {
        });
    };

    $scope.getTenantUsers = function (pageNumber) {
        var tenantKey = $location.search().tenantkey;

        var params = {
            PageSize: parseInt($scope.PageSize),
            PageNumber: pageNumber.value,
            TenantKey: tenantKey
        };

        if (pageNumber.value === '<<') {
            if ($scope.CurrentPage > 1) {
                $scope.CurrentPage = $scope.CurrentPage - 1;
                $scope.DisableNextClick = false;
            }
        }
        else if (pageNumber.value === '>>') {
            if ($scope.CurrentPage < ($scope.TenantUsers[0].totalUsers / parseInt($scope.PageSize))) {
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
        $scope.TenantUsers = [];

        var req = {
            method: 'POST',
            url: '/api/SuperAccountAdminApi/GetUsersForTenant',
            headers: {
                'Content-Type': 'application/json'
            },
            data: params
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data.length > 0) {
                $scope.TenantUsers = result.data;
                angular.element(document.querySelector('#usersLoader')).html('');
                angular.element(document.querySelector('#tenantUsers')).removeClass('loading');
                angular.element(document.querySelector('#tenantUsers')).addClass('loaded');
                fillPageNumbersArray($scope.TenantUsers[0].totalUsers);
            }
        },
            function () {
                alert('An error occurred while trying to get users. Please send an e-mail to castellonf@stifel.com.');
            });
    };

    $scope.getTenantUsers({ id: 'pageNumber1', value: 1 });
}]);

cbrSuperAccountAdministration.controller("editUserProfileController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", "$uibModalInstance", "data", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs, $uibModalInstance, data) {
    $scope.UserToEdit = data;
    $scope.Tenant = {};
    $scope.ShowSystemAdministrator = false;
    $scope.ShowAdministrator = false;
    $scope.ShowProjectManager = false;
    $scope.ShowStandardUser = false;
    $scope.ShowNonBankStandardUser = false;
    $scope.ShowNonBankAdministrator = false;
    $scope.UserRoles = [];
    $scope.IsSystemAdministratorAssigned = false;
    $scope.IsAdministratorAssigned = false;
    $scope.IsProjectManagerAssigned = false;
    $scope.IsStandardUserAssigned = false;
    $scope.IsNonBankStandardUserAssigned = false;
    $scope.IsNonBankAdministratorAssigned = false;
    $scope.RoleValueSum = 0;
    $scope.IsUserAvailable = true;
    $scope.IsUserDuplicateMessage = '';
    $scope.getIsUserFoundCodes = function () {
        $http.get('/Home/GetIsUserFoundCodes').then(function (response) {
            $scope.IsUserFoundCodes = response;
        });
    };

    $scope.getIsUserNotFoundCodes = function () {
        $http.get('/Home/GetIsUserNotFoundCodes').then(function (response) {
            $scope.IsUserNotFoundCodes = response;
        });
    };

    $scope.IsUserDuplicate = function ($event) {
        if ($scope.UserToEdit.email !== null && $scope.UserToEdit.email.length > 0) {
            var inviteeDetails = {
                FirstName: btoa($scope.UserToEdit.firstName),
                LastName: btoa($scope.UserToEdit.lastName),
                EmailAddress: btoa($scope.UserToEdit.email)
            };

            var req = {
                method: 'POST',
                url: '/api/SuperAccountAdminApi/IsUserDuplicate',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: inviteeDetails
            };

            $http(req).then(function (result) {
                if (result.data !== null) {
                    $scope.IsUserDuplicateMessage = result.data;
                    if ($scope.IsUserFoundCodes.indexOf(parseInt($scope.IsUserDuplicateMessage, 10)) > -1) {
                        $scope.IsUserAvailable = true;
                        $scope.IsUserDuplicateMessage = 'An user already exists with this e-mail ID. Please use a different e-mail ID.';
                    }
                    else if ($scope.IsUserNotFoundCodes.indexOf(parseInt($scope.IsUserDuplicateMessage, 10)) > -1) {
                        $scope.IsUserAvailable = false;
                        $scope.IsUserDuplicateMessage = 'Available';
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

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancelled');
    }; // end cancel

    $scope.CheckRoleValueSum = function (roleValueCheckUnchecked) {
        var tempRoleValueSum = 0;
        if (roleValueCheckUnchecked === 4) {
            if ($scope.IsSystemAdministratorAssigned === true) {
                tempRoleValueSum = $scope.RoleValueSum + roleValueCheckUnchecked;
                if (tempRoleValueSum > 4) {
                    $scope.IsSystemAdministratorAssigned = false;
                    dlg = dlg = dialogs.error('You cannot assign two roles to same user. Please uncheck already assigned role to be able to assign this role.');
                }
                else {
                    $scope.RoleValueSum = tempRoleValueSum;
                }
            }
            else {
                $scope.RoleValueSum = $scope.RoleValueSum - roleValueCheckUnchecked;
            }
        }

        if (roleValueCheckUnchecked === 3) {
            if ($scope.IsAdministratorAssigned === true || $scope.IsNonBankAdministratorAssigned === true) {
                tempRoleValueSum = $scope.RoleValueSum + roleValueCheckUnchecked;
                if (tempRoleValueSum > 3) {
                    $scope.IsAdministratorAssigned = false;
                    $scope.IsNonBankAdministratorAssigned = false;
                    dlg = dlg = dialogs.error('You cannot assign two roles to same user. Please uncheck already assigned role to be able to assign this role.');
                }
                else {
                    $scope.RoleValueSum = tempRoleValueSum;
                }
            }
            else {
                $scope.RoleValueSum = $scope.RoleValueSum - roleValueCheckUnchecked;
            }
        }

        if (roleValueCheckUnchecked === 2) {
            if ($scope.IsProjectManagerAssigned === true) {
                tempRoleValueSum = $scope.RoleValueSum + roleValueCheckUnchecked;
                if (tempRoleValueSum > 2) {
                    $scope.IsProjectManagerAssigned = false;
                    dlg = dlg = dialogs.error('You cannot assign two roles to same user. Please uncheck already assigned role to be able to assign this role.');
                }
                else {
                    $scope.RoleValueSum = tempRoleValueSum;
                }
            }
            else {
                $scope.RoleValueSum = $scope.RoleValueSum - roleValueCheckUnchecked;
            }
        }

        if (roleValueCheckUnchecked === 1) {
            if ($scope.IsStandardUserAssigned === true || $scope.IsNonBankStandardUserAssigned === true) {
                tempRoleValueSum = $scope.RoleValueSum + roleValueCheckUnchecked;
                if (tempRoleValueSum > 1) {
                    $scope.IsStandardUserAssigned = false;
                    $scope.IsNonBankStandardUserAssigned = false;
                    dlg = dlg = dialogs.error('You cannot assign two roles to same user. Please uncheck already assigned role to be able to assign this role.');
                }
                else {
                    $scope.RoleValueSum = tempRoleValueSum;
                }
            }
            else {
                $scope.RoleValueSum = $scope.RoleValueSum - roleValueCheckUnchecked;
            }
        }
    };

    $scope.UpdateUserProfile = function () {
        var req = {
            method: 'POST',
            url: '/api/SuperAccountAdminApi/UpdateAccountProfile',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.AccountToEdit
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data === true) {
                dlg = dialogs.notify('Success!', 'Account profile has been updated successfully.');
                dlg.result.then(function (btn) {
                    $uibModalInstance.close('Saved');
                }, function (btn) {
                });
            }
            else {
                dlg = dialogs.notify('Info', 'No modifications detected.');
                dlg.result.then(function (btn) {
                    $uibModalInstance.close('NoChange');
                }, function (btn) {
                });
            }
        },
            function () {
                dlg = dialogs.error('An error occurred while trying to update account profile. Please send an e-mail to castellonf@stifel.com.');
                dlg.result.then(function (btn) {
                    $uibModalInstance.close('Error');
                }, function (btn) {
                });
            });
    };

    var getTenantProfile = function () {
        var tenantKey = $location.search().tenantkey;

        var req = {
            method: 'GET',
            url: '/api/SuperAccountAdminApi/GetTenantProfile?tenantKey=' + tenantKey,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                if (result.data === null) {
                    dlg = dialogs.error('Invalid tenant key specified or tenant not found.');
                }
                else {
                    $scope.Tenant = result.data;
                    HideUnhideRoles();
                }
            }
        },
            function () {
                dlg = dialogs.error('An error occurred while trying to get account profile. Please send an e-mail to castellonf@stifel.com.');

            });
    };

    var HideUnhideRoles = function () {
        if ($scope.Tenant.accountName.includes("CB Resource")) {
            $scope.ShowSystemAdministrator = true;
        }

        if ($scope.Tenant.accountType === 'Bank' || $scope.Tenant.accountType === 'F500 Bank' || $scope.Tenant.accountType === 'CreditUnion') {
            $scope.ShowAdministrator = true;
            $scope.ShowProjectManager = true;
            $scope.ShowStandardUser = true;
        }
        else {
            $scope.ShowNonBankStandardUser = true;
            $scope.ShowNonBankAdministrator = true;
        }
    };

    var getUserRolesProfile = function (userKey) {
        var req = {
            method: 'GET',
            url: '/api/SuperAccountAdminApi/GetUserRoleProfile?userKey=' + $scope.UserToEdit.userKey,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                if (result.data === null) {
                    dlg = dialogs.error('Invalid user key specified or user roles missing.');
                }
                else {
                    $scope.UserRoles = result.data;
                    calculateUserRoles();
                }
            }
        },
            function () {
                dlg = dialogs.error('An error occurred while trying to get user profile.');

            });
    };

    var calculateUserRoles = function () {
        var sysAdminUserProfile = $scope.UserRoles.filter(function (obj) {
            return obj.roleName === 'System Administrator';
        })[0];

        var adminUserProfile = $scope.UserRoles.filter(function (obj) {
            return obj.roleName === 'Administrator';
        })[0];

        var projectManagerUserProfile = $scope.UserRoles.filter(function (obj) {
            return obj.roleName === 'Project Manager';
        })[0];

        var standardUserUserProfile = $scope.UserRoles.filter(function (obj) {
            return obj.roleName === 'Standard User';
        })[0];

        var nonBankStandardUserUserProfile = $scope.UserRoles.filter(function (obj) {
            return obj.roleName === 'Non-Bank Standard User';
        })[0];

        var nonBankAdminUserProfile = $scope.UserRoles.filter(function (obj) {
            return obj.roleName === 'Non-Bank Administrator';
        })[0];

        if (typeof sysAdminUserProfile !== 'undefined') {
            $scope.IsSystemAdministratorAssigned = sysAdminUserProfile.isAccessible;
        }

        if (typeof adminUserProfile !== 'undefined') {
            $scope.IsAdministratorAssigned = adminUserProfile.isAccessible;
        }

        if (typeof projectManagerUserProfile !== 'undefined') {
            $scope.IsProjectManagerAssigned = projectManagerUserProfile.isAccessible;
        }

        if (typeof standardUserUserProfile !== 'undefined') {
            $scope.IsStandardUserAssigned = standardUserUserProfile.isAccessible;
        }

        if (typeof nonBankStandardUserUserProfile !== 'undefined') {
            $scope.IsNonBankStandardUserAssigned = nonBankStandardUserUserProfile.isAccessible;
        }

        if (typeof nonBankAdminUserProfile !== 'undefined') {
            $scope.IsNonBankAdministratorAssigned = nonBankAdminUserProfile.isAccessible;
        }

        var assignedRole = $scope.UserRoles.filter(function (obj) {
            return obj.isAccessible === true;
        })[0];

        if (typeof assignedRole !== 'undefined') {
            $scope.RoleValueSum = assignedRole.roleValue;
        }
    };

    $scope.UpdateUserProfile = function () {
        var userRoles = [];

        if ($scope.ShowSystemAdministrator === true) {
            userRoles.push({ RoleName: 'System Administrator', IsAccessible: $scope.IsSystemAdministratorAssigned });
        }

        if ($scope.ShowAdministrator === true) {
            userRoles.push({ RoleName: 'Administrator', IsAccessible: $scope.IsAdministratorAssigned });
        }

        if ($scope.ShowProjectManager === true) {
            userRoles.push({ RoleName: 'Project Manager', IsAccessible: $scope.IsProjectManagerAssigned });
        }

        if ($scope.ShowStandardUser === true) {
            userRoles.push({ RoleName: 'Standard User', IsAccessible: $scope.IsStandardUserAssigned });
        }

        if ($scope.ShowNonBankStandardUser === true) {
            userRoles.push({ RoleName: 'Non-Bank Standard User', IsAccessible: $scope.IsNonBankStandardUserAssigned });
        }

        if ($scope.ShowNonBankAdministrator === true) {
            userRoles.push({ RoleName: 'Non-Bank Administrator', IsAccessible: $scope.IsNonBankAdministratorAssigned });
        }

        var updateUserProfileParams = {
            UserKey: $scope.UserToEdit.userKey,
            FirstName: $scope.UserToEdit.firstName,
            LastName: $scope.UserToEdit.lastName,
            Email: $scope.UserToEdit.email,
            Title: $scope.UserToEdit.title,
            UserRoles: userRoles
        };

        var req = {
            method: 'POST',
            url: '/api/SuperAccountAdminApi/UpdateUser',
            headers: {
                'Content-Type': 'application/json'
            },
            data: updateUserProfileParams
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data === true) {
                dlg = dialogs.notify('Success!', 'User details have been updated successfully.');
                dlg.result.then(function (btn) {
                    $uibModalInstance.close({ Result: 'Saved', UpdatedUser: updateUserProfileParams });
                }, function (btn) {
                });
            }
            else {
                dlg = dialogs.error('An error occurred while trying to update user details.');
                dlg.result.then(function (btn) {
                    $uibModalInstance.close('Error');
                }, function (btn) {
                });
            }
        },
            function () {
                dlg = dialogs.error('An error occurred while trying to update user details.');
                dlg.result.then(function (btn) {
                    $uibModalInstance.close('Error');
                }, function (btn) {
                });
            });
    };

    var initialize = function () {
        getTenantProfile();
        getUserRolesProfile();
    };

    initialize();
}]);

cbrSuperAccountAdministration.controller("addUsersController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", "$uibModal", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs, $uibModal) {
    $scope.NewUser = {
        firstName: '',
        lastName: '',
        title: '',
        eMail: '',
        message: ''
    };
    $scope.IsUserAvailable = false;

    $scope.getIsUserFoundCodes = function () {
        $.get('/Home/GetIsUserFoundCodes').then(function (response) {
            $scope.IsUserFoundCodes = response;
        });
    };

    $scope.getIsUserNotFoundCodes = function () {
        $.get('/Home/GetIsUserNotFoundCodes').then(function (response) {
            $scope.IsUserNotFoundCodes = response;
        });
    };

    $scope.getIsUserFoundCodes();
    $scope.getIsUserNotFoundCodes();

    $scope.AddUser = function (userForm) {
        var inviteeDetails = {
            FirstName: btoa($scope.NewUser.firstName),
            LastName: btoa($scope.NewUser.lastName),
            EmailAddress: btoa($scope.NewUser.eMail),
            Message: btoa($scope.NewUser.message),
            Title: btoa($scope.NewUser.title),
            TenantKey: btoa($location.search().tenantkey)
        };

        var req = {
            method: 'POST',
            url: '/api/SuperAccountAdminApi/InviteUser',
            headers: {
                'Content-Type': 'application/json'
            },
            data: inviteeDetails
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data === true) {
                dlg = dialogs.notify('Success!', 'User has been sent an e-mail with instructions to register on CBR portal.');
                $scope.NewUser = {
                    firstName: '',
                    lastName: '',
                    title: '',
                    eMail: '',
                    message: ''
                };
                userForm.$setPristine();
                userForm.$setUntouched();
                $scope.IsUserDuplicateMessage = '';
            }
            else {
                dlg = dialogs.error('An error occurred while inviting the user. Please send an e-mail to castellonf@stifel.com.');
                $scope.NewUser = {
                    firstName: '',
                    lastName: '',
                    title: '',
                    eMail: '',
                    message: ''
                };
                userForm.$setPristine();
                userForm.$setUntouched();
                $scope.IsUserDuplicateMessage = '';
            }
        },
            function () {
                dlg = dialogs.error('An error occurred while inviting the user. Please send an e-mail to castellonf@stifel.com.');
                $scope.NewUser = {
                    firstName: '',
                    lastName: '',
                    title: '',
                    eMail: '',
                    message: ''
                };
                userForm.$setPristine();
                userForm.$setUntouched();
                $scope.IsUserDuplicateMessage = '';
            });
    };

    $scope.IsUserDuplicate = function ($event) {
        if ($scope.NewUser.eMail !== null && $scope.NewUser.eMail.length > 0) {
            var inviteeDetails = {
                FirstName: btoa($scope.NewUser.firstName),
                LastName: btoa($scope.NewUser.lastName),
                EmailAddress: btoa($scope.NewUser.eMail)
            };

            var req = {
                method: 'POST',
                url: '/api/SuperAccountAdminApi/IsUserDuplicate',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: inviteeDetails
            };

            $http(req).then(function (result) {
                if (result.data !== null) {
                    $scope.IsUserDuplicateMessage = result.data;
                    if ($scope.IsUserFoundCodes.indexOf(parseInt($scope.IsUserDuplicateMessage, 10)) > -1) {
                        $scope.IsUserAvailable = true;
                        $scope.IsUserDuplicateMessage = 'An user already exists with this e-mail ID. Please use a different e-mail ID.';
                    }
                    else if ($scope.IsUserNotFoundCodes.indexOf(parseInt($scope.IsUserDuplicateMessage, 10)) > -1) {
                        $scope.IsUserAvailable = false;
                        $scope.IsUserDuplicateMessage = 'Available';
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

}]);

angular.bootstrap(document.getElementById("superaccountadministration"), ['cbrsuperaccountadministration']);
