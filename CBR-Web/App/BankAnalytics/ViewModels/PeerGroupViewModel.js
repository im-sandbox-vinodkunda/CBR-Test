cbrBankAnalyticsModule.controller("peerGroupViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope) {

    $scope.AllCustomPeerGroups = [];
    $rootScope.subTemplate = 'allCustomPeerGroups';
    $rootScope.ShowRiskProfileForPeerGroupKey = 0;
    $rootScope.EditPeerGroupForPeerGroupKey = 0;
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

    $scope.functionThatReturnsStyle = function () {
        let movePossitionTo = 0;
        if (document.body.getBoundingClientRect().top < 0) {
            movePossitionTo = document.body.getBoundingClientRect().top * -1;
        }
        return 'padding-top:' + movePossitionTo + 'px';
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
        else if (boxType == 'Close') {
            $scope.showAlertMessageModal = false;
        }
        else { $scope.toggleErrorMessageBoxModal(''); }
    }
    $scope.toggleAlertMessageBoxModal = function (message, customPg) {
        $scope.PeerGroupToDelete = customPg;
        $scope.AlertMessageText = message;
        $scope.showAlertMessageModal = !$scope.showAlertMessageModal;
    };

    $scope.GoToBankProfile = function ($event, memberObj) {
        $rootScope.ShowBankProfileForInstitutionKey = memberObj.institutionKey;
        $rootScope.template = 'ProfileOverview';
    }

    $scope.ChangeScreen = function (templateId) {
        window.location.href = '/'
    }

    $scope.ChangeSubScreen = function (templateId) {
        $rootScope.subTemplate = templateId;
        $scope.ToggleSubTab(null, templateId);
    }

    $scope.ToggleSubTab = function ($event, templateId) {
        if (templateId == 'allCustomPeerGroups') {
            angular.element(document.querySelector('#linkAllPeerGroups')).addClass('active');
            angular.element(document.querySelector('#linkFavoriteBanks')).removeClass('active');
            angular.element(document.querySelector('#linkSearchBanks')).removeClass('active');
        }
        else if (templateId == 'favoriteBanks') {
            angular.element(document.querySelector('#linkAllPeerGroups')).removeClass('active');
            angular.element(document.querySelector('#linkFavoriteBanks')).addClass('active');
            angular.element(document.querySelector('#linkSearchBanks')).removeClass('active');
        }
        else {
            angular.element(document.querySelector('#linkAllPeerGroups')).removeClass('active');
            angular.element(document.querySelector('#linkFavoriteBanks')).removeClass('active');
            angular.element(document.querySelector('#linkSearchBanks')).addClass('active');
        }

        $rootScope.subTemplate = templateId;
    }

    $scope.GoToRiskProfileForPeerGroup = function ($event, peerGroupData) {
        $rootScope.ShowRiskProfileForPeerGroupKey = peerGroupData.key;
        $scope.ChangeScreen('KeyRiskTrends');
    }

    var getUsersCustomPeerGroups = function () {
        angular.element(document.querySelector('#allPeerGroupsLoader')).attr('style', 'display:block');
        var req = {
            method: 'GET',
            url: '/api/PeerGroupsApi/Get',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {
                $scope.AllCustomPeerGroups = result.data;
                angular.element(document.querySelector('#allPeerGroupsLoader')).attr('style', 'display:none');

                for (i = 0; i < $scope.AllCustomPeerGroups.length; i++) {
                    $scope.AllCustomPeerGroups[i].created = new Date($scope.AllCustomPeerGroups[i].created).toLocaleDateString('en-US');
                }
            }
            else {
                angular.element(document.querySelector('#allPeerGroupsLoader')).attr('style', 'display:none');
                angular.element(document.querySelector('#peerGroupStatus')).text('You do not have any custom peer groups. Please click on the button to create custom peer groups.');
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trynig to get the custom peer groups. Please send an e-mail to castellonf@stifel.com.');
                angular.element(document.querySelector('#allPeerGroupsLoader')).attr('style', 'display:none');
            });
    }

    $scope.DeletePeerGroup = function ($event, peerGroupObj) {
       // var areYouSure = confirm('Are you sure you want to delete this peer group?');
        //if (areYouSure) {
        $scope.showAlertMessageModal = false;
            document.getElementById('overlay').style.display = '';
            var peerGrpObj = {
                CustPeerGroupKey: peerGroupObj.key
            };

            var req = {
                method: 'POST',
                url: '/api/PeerGroupsApi/Delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: peerGrpObj
            };

            $http(req).then(function (result) {
                if (result.data != null) {
                    $scope.AllCustomPeerGroups = [];
                    getUsersCustomPeerGroups();
                    $scope.toggleSuccessMessageBoxModal(result.data);
                    $scope.PeerGroupToDelete = null;
                }
                else {
                    $scope.toggleErrorMessageBoxModal('An error occurred while trying to delete peer group. Please contact system administrator.');
                }
                document.getElementById('overlay').style.display = 'none';
            },
                function () {
                    $scope.toggleErrorMessageBoxModal('An error occurred while trying to delete peer group. Please contact system administrator.');
                    document.getElementById('overlay').style.display = 'none';
                });
       // }
    }

    $scope.GoToEditPeerGroup = function ($event, peerGroupObj) {
        $rootScope.EditPeerGroupForPeerGroupKey = peerGroupObj.key;
        $scope.ChangeSubScreen('editPeerGroup');
    }

    var initialize = function ()
    {
        if ($rootScope.ManageProfilesSubTabToLoad === '' || typeof $rootScope.ManageProfilesSubTabToLoad === 'undefined')
        {
            getUsersCustomPeerGroups();
        }
        else if($rootScope.ManageProfilesSubTabToLoad === 'createPeerGroup')
        {
            $rootScope.ManageProfilesSubTabToLoad = '';
            $scope.ChangeSubScreen('createPeerGroup');
        }
        else if ($rootScope.ManageProfilesSubTabToLoad === 'favoriteBanks')
        {
            $rootScope.ManageProfilesSubTabToLoad = '';
            $scope.ToggleSubTab(null, 'favoriteBanks')
        }
        else
        {
            $rootScope.ManageProfilesSubTabToLoad = '';
            $scope.ToggleSubTab(null, 'searchBanks');
        }
    }

    initialize();
    
}]);

cbrBankAnalyticsModule.controller("createPeerGroupViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope) {
    $scope.rssdNumbers = '';
    $scope.peerGroupName = '';
    $scope.isDefault = { value: 'isNotDefault' };
    $scope.LastFivePeerGroups = [];
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

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
    $scope.Close = function ($event, boxType) {
        if (boxType === 'Close') {
            $scope.showAlertMessageModal = false;
        }
    }
    $scope.toggleAlertMessageBoxModal = function (message) {
        $scope.AlertMessageText = message;
        $scope.showAlertMessageModal = !$scope.showAlertMessageModal;
    };

    $scope.ClearSearchDialog = function ($event) {
        $rootScope.BankFindSearchCriteria =
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
    }

    $rootScope.BankFindSearchCriteria =
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

    var getLastFivePeerGroups = function () {
        var req = {
            method: 'GET',
            url: '/api/PeerGroupsApi/GetLastFivePeerGroups',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {
                $scope.LastFivePeerGroups = result.data;
            }
        },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while getting last five peer groups for user. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    $scope.createPeerGroup = function () {
        if ($scope.QuickStartForm.$valid) {           
                document.getElementById('overlay').style.display = '';
                var peerGroupCreationData = [];
                var rssdNumbers = $scope.rssdNumbers.split("\n");
                if (rssdNumbers.length > 150) {
                    $scope.toggleErrorMessageBoxModal('Please input RSSD numbers less than or equal to 150. Your default bank will be included in the peer group by the system.');
                    document.getElementById('overlay').style.display = 'none';
                }
                else {
                    for (i = 0; i < rssdNumbers.length; i++) {
                        var pgObject = { CustPeerGroupName: '', RSSD: 0, TenantName: 1, Login: false, IsDefault: '' };
                        pgObject.CustPeerGroupName = $scope.peerGroupName;
                        pgObject.RSSD = rssdNumbers[i];
                        pgObject.TenantName = '';
                        pgObject.Login = '';
                        if ($scope.isDefault.value == 'isNotDefault') {
                            pgObject.IsDefault = false;
                        }
                        else {
                            pgObject.IsDefault = true;
                        }

                        peerGroupCreationData.push(pgObject);
                    }

                    var req = {
                        method: 'POST',
                        url: '/api/PeerGroupsApi',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: peerGroupCreationData
                    };

                    $http(req).then(
                        function (result) {
                            document.getElementById('overlay').style.display = 'none';
                            $scope.ChangeSubScreen('allCustomPeerGroups');
                        },
                        function () {
                            $scope.toggleErrorMessageBoxModal('An error occurred while trying to create the peer group. Please send an e-mail to castellonf@stifel.com.');
                            document.getElementById('overlay').style.display = 'none';
                        });
                }
        }
        else {
            $scope.submitted = true;
        }
    }

    $scope.ChangeScreen = function (templateId) {
        $rootScope.template = templateId;
    }

    $scope.ChangeSubScreen = function (templateId) {
        $rootScope.subTemplate = templateId;
    }

    $scope.GoToSearch = function (templateId) {
        if ($rootScope.BankFindSearchCriteria.BankName === '' &&
            $rootScope.BankFindSearchCriteria.CertNumber === '' &&
            $rootScope.BankFindSearchCriteria.Location === '' &&
            $rootScope.BankFindSearchCriteria.AssetMinSize === '' &&
            $rootScope.BankFindSearchCriteria.AssetMaxSize === '' &&
            $rootScope.BankFindSearchCriteria.CorporationType === '') {
            $scope.toggleErrorMessageBoxModal('Please input atleast one search parameter to search.');
        }
        else if ($rootScope.BankFindSearchCriteria.AssetMinSize !== '' &&
            $rootScope.BankFindSearchCriteria.AssetMaxSize !== '' && parseInt($rootScope.BankFindSearchCriteria.AssetMinSize, 10) > parseInt($rootScope.BankFindSearchCriteria.AssetMaxSize, 10)) {
            $scope.toggleErrorMessageBoxModal('"From" value should be less than or equals to "To" value to search.');
        }
        else {
            $rootScope.BankFindSearchCriteriaOld = $rootScope.BankFindSearchCriteria;
            //$rootScope.BankFindSearchCriteriaOld.BankName = $rootScope.BankFindSearchCriteria.BankName;
            //$rootScope.BankFindSearchCriteriaOld.CertNumber = $rootScope.BankFindSearchCriteria.CertNumber;
            //$rootScope.BankFindSearchCriteriaOld.Location = $rootScope.BankFindSearchCriteria.Location;
            //$rootScope.BankFindSearchCriteriaOld.AssetMinSize = $rootScope.BankFindSearchCriteria.AssetMinSize;
            //$rootScope.BankFindSearchCriteriaOld.AssetMaxSize = $rootScope.BankFindSearchCriteria.AssetMaxSize;
            //$rootScope.BankFindSearchCriteriaOld.CorporationType = $rootScope.BankFindSearchCriteria.CorporationType;
            //$rootScope.BankFindSearchCriteriaOld.PageSize = $rootScope.BankFindSearchCriteria.PageSize;
            //$rootScope.BankFindSearchCriteriaOld.PageNumber = $rootScope.BankFindSearchCriteria.PageNumber;
            $rootScope.subTemplate = templateId;
        }
    }

    var initialize = function () {
        getLastFivePeerGroups();
        if (typeof $rootScope.BankFindSearchCriteriaOld !== 'undefined') {
            $rootScope.BankFindSearchCriteria.BankName = $rootScope.BankFindSearchCriteriaOld.BankName;
            $rootScope.BankFindSearchCriteria.CertNumber = $rootScope.BankFindSearchCriteriaOld.CertNumber;
            $rootScope.BankFindSearchCriteria.Location = $rootScope.BankFindSearchCriteriaOld.Location;
            $rootScope.BankFindSearchCriteria.AssetMinSize = $rootScope.BankFindSearchCriteriaOld.AssetMinSize;
            $rootScope.BankFindSearchCriteria.AssetMaxSize = $rootScope.BankFindSearchCriteriaOld.AssetMaxSize;
            $rootScope.BankFindSearchCriteria.CorporationType = $rootScope.BankFindSearchCriteriaOld.CorporationType;
            $rootScope.BankFindSearchCriteria.PageSize = $rootScope.BankFindSearchCriteriaOld.PageSize;
            //$rootScope.BankFindSearchCriteria.PageNumber = $rootScope.BankFindSearchCriteriaOld.PageNumber;
        }
    }

    initialize();
}]);

cbrBankAnalyticsModule.controller("searchInstitutionViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$interval", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $interval) {
    $scope.rssdNumbers = '';
    $scope.peerGroupName = '';
    $scope.isDefault = { value: 'isNotDefault' };
    $scope.ResultBanks = [];
    $scope.PageSize = '10';
    $scope.PageNumbers = [];
    $scope.CurrentPage = 1;
    $scope.SelectedBanks = [];
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

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

    //$rootScope.BankFindSearchCriteriaOld =
    //{
    //    BankName: '',
    //    CertNumber: '',
    //    Location: '',
    //    AssetMinSize: '',
    //    AssetMaxSize: '',
    //    CorporationType: '',
    //    PageSize: 10,
    //    PageNumber: 1
    //};

    $scope.GoToBankProfile = function ($event, bankObj) {
        $rootScope.ShowBankProfileForInstitutionKey = bankObj.institutionKey;
        $rootScope.template = 'ProfileOverview';
    }

    $scope.createPeerGroup = function () {
        if ($scope.formpeergroup.$valid) {
            document.getElementById('overlay').style.display = '';
            var peerGroupCreationData = [];
            for (i = 0; i < $scope.SelectedBanks.length; i++) {
                var pgObject = { CustPeerGroupName: '', RSSD: 0, TenantName: 1, Login: false, IsDefault: '' };
                pgObject.CustPeerGroupName = $scope.peerGroupName;
                pgObject.RSSD = $scope.SelectedBanks[i];
                pgObject.TenantName = '';
                pgObject.Login = '';
                if ($scope.isDefault.value == 'isNotDefault') {
                    pgObject.IsDefault = false;
                }
                else {
                    pgObject.IsDefault = true;
                }

                peerGroupCreationData.push(pgObject);
            }

            var req = {
                method: 'POST',
                url: '/api/PeerGroupsApi',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: peerGroupCreationData
            };

            $http(req).then(
                function (result) {
                    document.getElementById('overlay').style.display = 'none';
                    $scope.ChangeSubScreen('allCustomPeerGroups');
                },
                function () {
                    document.getElementById('overlay').style.display = 'none';
                    $scope.toggleErrorMessageBoxModal('An error occurred while trying to create peer group. Please send an e-mail to castellonf@stifel.com.');
                });
        }      
        else {
            $scope.submitted = true;
        }       
    }

    $scope.ChangeScreen = function (templateId) {
        $rootScope.template = templateId;
    }

    $scope.ChangeSubScreen = function (templateId) {
        $rootScope.subTemplate = templateId;
    }

    $scope.SearchOnPageSizeChange = function ($event) {
        $scope.ResultBanks = [];
        $scope.PageNumbers = [];
        $scope.searchBanks(1);
    }

    $scope.SelectUnSelectBank = function ($event, bankObj) {
        if (bankObj.isSelected) {
            if ($scope.SelectedBanks.length >= 150) {
                $scope.toggleErrorMessageBoxModal('Please select banks less than or equal to 150. Your default bank will be included in the peer group by the system.');
                bankObj.isSelected = false;
            }
            else {
                var isThisBankAlreadySelected = false;
                if ($scope.SelectedBanks.length == 0) {
                    $scope.SelectedBanks.push(bankObj.rssd);
                }
                else if ($scope.SelectedBanks.length > 0) {
                    if ($scope.SelectedBanks.indexOf(bankObj.rssd) > -1) {
                        isThisBankAlreadySelected = true;
                    }

                    if (!isThisBankAlreadySelected)
                        $scope.SelectedBanks.push(bankObj.rssd);
                }
            }
        }
        else {
            if ($scope.SelectedBanks.length > 0) {
                if ($scope.SelectedBanks.indexOf(bankObj.rssd) > -1) {
                    $scope.SelectedBanks.splice($scope.SelectedBanks.indexOf(bankObj.rssd), 1);
                }
            }
        }
    }

    var setSelectedBanks = function () {
        for (i = 0; i < $scope.ResultBanks.length; i++) {
            if ($scope.SelectedBanks.indexOf($scope.ResultBanks[i].rssd) > -1)
                $scope.ResultBanks[i].isSelected = true;
        }
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

    $scope.ExportToExcel = function () {
        $rootScope.ExportToExcelCriteria = $rootScope.BankFindSearchCriteria;
        $rootScope.ExportToExcelCriteria.PageSize = -1;

        var link = "/Project/ExportToExcel?"
           + "searchCriteria=" + JSON.stringify($rootScope.ExportToExcelCriteria);

        var hif = document.getElementById("hiddeniframe");
        hif.src = link;
        $("body").css({ "opacity": 0.4, "z-index": 1000 });

        cookieIntervalID = $interval(isFileDownloaded, 500);
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
        }
        else {
            $("body")[0].style.opacity = 1;
            document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            clearInterval(cookieIntervalID);
        }
    }

    $scope.searchBanks = function (pageNumber) {
        angular.element(document.querySelector('#bankSearchLoader')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:block');

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
            $rootScope.BankFindSearchCriteria.PageSize = -1;
        else
            $rootScope.BankFindSearchCriteria.PageSize = $scope.PageSize;

        $rootScope.BankFindSearchCriteria.PageNumber = $scope.CurrentPage;

        var req = {
            method: 'POST',
            url: '/api/PeerGroupsApi/SearchBanks',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $rootScope.BankFindSearchCriteria
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {
                angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
                $scope.ResultBanks = result.data;
                fillPageNumbersArray($scope.ResultBanks[0].totalResults);
                setSelectedBanks();
            }
            else {
                angular.element(document.querySelector('#bankSearchLoader')).html('<span>Your search criteria yielded no results.</span>');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to search for banks. Please send an e-mail to castellonf@stifel.com.');
            angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
        });
    }

    $scope.searchBanks(1);
}]);

cbrBankAnalyticsModule.controller("editPeerGroupViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope) {
    $scope.peerGroupName = '';
    $scope.isDefault = { value: 'isNotDefault' };
    $scope.RemovedRssdNumbers = [];
    $scope.PeerGroupMembers = [];
    $scope.ResultBanks = [];
    $scope.PageSize = '10';
    $scope.PageNumbers = [];
    $scope.CurrentPage = 1;
    $scope.SelectedBanks = [];
    $scope.TotalResults = 0;
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

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
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to add the bank as favorite bank. Please send an e-mail to castellonf@stifel.com.');
            document.getElementById('overlay').style.display = 'none';
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

    $scope.BankFindSearchCriteria =
        {
            BankName: '',
            CertNumber: '',
            Location: '',
            AssetSize: '',
            CorporationType: '',
            PageSize: 10,
            PageNumber: 1
        };

    $scope.GoToBankProfile = function ($event, bankObj) {
        $rootScope.ShowBankProfileForInstitutionKey = bankObj.institutionKey;
        $rootScope.template = 'ProfileOverview';
    }

    $scope.ClearSearchDialog = function ($event) {
        $scope.BankFindSearchCriteria =
        {
            BankName: '',
            CertNumber: '',
            Location: '',
            AssetSize: '',
            CorporationType: '',
            PageSize: 10,
            PageNumber: 1
        };
        $scope.ResultBanks = [];
        $scope.PageNumbers = [];
        $scope.SelectedBanks = [];
        $scope.CurrentPage = 1;
        $scope.TotalResults = 0;
        angular.element(document.querySelector('#successMessage')).addClass('hidden');
        angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('');
    }

    $scope.showAddMoreBanksModal = function ($event) {
        $('#drawerExample').drawer().show();
        $scope.ResultBanks = [];
        $scope.PageNumbers = [];
        $scope.SelectedBanks = [];
        $scope.CurrentPage = 1;
        $scope.TotalResults = 0;
        angular.element(document.querySelector('#successMessage')).addClass('hidden');
        angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('');
        $scope.BankFindSearchCriteria =
        {
            BankName: '',
            CertNumber: '',
            Location: '',
            AssetSize: '',
            CorporationType: '',
            PageSize: 10,
            PageNumber: 1
        };
    };

    $scope.hideAddMoreBanksModal = function ($event) {
        $('#drawerExample').drawer().hide();
    };

    $scope.SearchOnPageSizeChange = function ($event) {
        $scope.ResultBanks = [];
        $scope.PageNumbers = [];
        $scope.searchBanks(1);
    }

    $scope.addSelectedBanksToPeerGroup = function ($event) {
        var newMemberArr = [];

        for (i = 0; i < $scope.PeerGroupMembers.length; i++) {
            newMemberArr.push($scope.PeerGroupMembers[i]);
        }

        for (i = 0; i < $scope.SelectedBanks.length; i++) {
            var alreadyExistingObj = $scope.PeerGroupMembers.filter(function (obj) {
                return obj.rssd === $scope.SelectedBanks[i];
            })[0];

            if (typeof alreadyExistingObj === 'undefined') {
                var obj = $scope.ResultBanks.filter(function (obj) {
                    return obj.rssd === $scope.SelectedBanks[i];
                })[0];

                if (typeof obj !== 'undefined') {
                    newMemberArr.push({
                        assetSize: obj.assetSize,
                        institutionKey: obj.institutionKey,
                        institutionName: obj.institutionName,
                        institutionCity: obj.institutionCity,
                        institutionStateName: obj.institutionStateName,
                        certNumber: obj.certNumber,
                        rssd: obj.rssd,
                        subS: obj.subS,
                        isSelected: true
                    });
                }
            }
        }

        $scope.PeerGroupMembers = newMemberArr;
        $scope.hideAddMoreBanksModal(null);
    }

    $scope.SelectUnSelectBank = function ($event, bankObj) {
        if (bankObj.isSelected) {
            if (($scope.PeerGroupMembers.length + $scope.SelectedBanks.length) >= 150) {
                $scope.toggleErrorMessageBoxModal('Please select banks less than or equal to 150. Your default bank will be included in the peer group by the system.');
                bankObj.isSelected = false;
            }
            else {
                var isThisBankAlreadySelected = false;
                if ($scope.SelectedBanks.length == 0) {
                    $scope.SelectedBanks.push(bankObj.rssd);
                }
                else if ($scope.SelectedBanks.length > 0) {
                    if ($scope.SelectedBanks.indexOf(bankObj.rssd) > -1) {
                        isThisBankAlreadySelected = true;
                    }

                    if (!isThisBankAlreadySelected)
                        $scope.SelectedBanks.push(bankObj.rssd);
                }
            }
        }
        else {
            if ($scope.SelectedBanks.length > 0) {
                if ($scope.SelectedBanks.indexOf(bankObj.rssd) > -1) {
                    $scope.SelectedBanks.splice($scope.SelectedBanks.indexOf(bankObj.rssd), 1);
                }
            }
        }
    }

    var setSelectedBanks = function () {
        for (i = 0; i < $scope.ResultBanks.length; i++) {
            if ($scope.SelectedBanks.indexOf($scope.ResultBanks[i].rssd) > -1)
                $scope.ResultBanks[i].isSelected = true;
        }
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
        if ($scope.BankFindSearchCriteria.BankName === '' &&
            $scope.BankFindSearchCriteria.CertNumber === '' &&
            $scope.BankFindSearchCriteria.Location === '' &&
            ['', null, undefined].includes($scope.BankFindSearchCriteria.AssetMinSize) &&
            ['', null, undefined].includes($scope.BankFindSearchCriteria.AssetMaxSize) &&
            $scope.BankFindSearchCriteria.CorporationType === '') {
            $scope.toggleErrorMessageBoxModal('Please input atleast one search parameter to search.');
        } else if ($scope.BankFindSearchCriteria.AssetMinSize !== '' &&
            $scope.BankFindSearchCriteria.AssetMaxSize !== '' &&
            parseInt($scope.BankFindSearchCriteria.AssetMinSize, 10) > parseInt($scope.BankFindSearchCriteria.AssetMaxSize, 10))
        {
            $scope.toggleErrorMessageBoxModal('"From" value should be less than or equals to "To" value to search.');
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

            var req = {
                method: 'POST',
                url: '/api/PeerGroupsApi/SearchBanks',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.BankFindSearchCriteria
            };

            $http(req).then(function (result) {
                if (result.data != null && result.data.length > 0) {
                    angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('');
                    angular.element(document.querySelector('#successMessage')).removeClass('hidden');
                    $scope.ResultBanks = result.data;
                    $scope.TotalResults = $scope.ResultBanks[0].totalResults;
                    fillPageNumbersArray($scope.ResultBanks[0].totalResults);
                    setSelectedBanks();
                }
                else {
                    angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('');
                    angular.element(document.querySelector('#successMessage')).removeClass('hidden');
                    $scope.TotalResults = 0;
                }
            }, function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while searching for banks. Please send an e-mail to castellonf@stifel.com.');
                angular.element(document.querySelector('#searchLoaderEditPeerGroup')).html('');
            });
        }
    }

    var getPeerGroupBasicDetails = function () {
        var req = {
            method: 'POST',
            url: '/api/PeerGroupsApi/GetPeerGroupBasics',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { CustPeerGroupKey: $scope.EditPeerGroupForPeerGroupKey }
        };

        $http(req).then(function (result) {
            $scope.peerGroupName = result.data.name;
            if (result.data.isDefault)
                $scope.isDefault.value = 'isDefault';
            else
                $scope.isDefault.value = 'isNotDefault';
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get peer group details. Please send an e-mail to castellonf@stifel.com.');
        });
    }

    var getPeerGroupMembers = function () {
        var req = {
            method: 'POST',
            url: '/api/PeerGroupsApi/GetPeerGroupMembers',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { CustPeerGroupKey: $scope.EditPeerGroupForPeerGroupKey }
        };

        $http(req).then(function (result) {
            if (result.data != null && result.data.length > 0) {
                $scope.PeerGroupMembers = result.data;
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get peer group members. Please send an e-mail to castellonf@stifel.com.');
        });
    }

    $scope.ChangeScreen = function (templateId) {
        $rootScope.template = templateId;
    }

    $scope.ChangeSubScreen = function (templateId) {
        $rootScope.subTemplate = templateId;
    }

    $scope.ToggleSubTab = function (templateId) {
        $rootScope.subTemplate = templateId;
    }

    $scope.GoToRiskProfileForPeerGroup = function ($event, peerGroupData) {
        $rootScope.ShowRiskProfileForPeerGroupKey = peerGroupData.key;
        $scope.ChangeScreen('KeyRiskTrends');
    }

    $scope.SelectUnSelectMember = function ($event, memberObj) {
        if (!memberObj.isSelected) {
            var isThisMemberAlreadyRemoved = false;
            if ($scope.RemovedRssdNumbers.length == 0) {
                $scope.RemovedRssdNumbers.push(memberObj.rssd);
            }
            else if ($scope.RemovedRssdNumbers.length > 0) {
                if ($scope.RemovedRssdNumbers.indexOf(memberObj.rssd) > -1) {
                    isThisMemberAlreadyRemoved = true;
                }

                if (!isThisMemberAlreadyRemoved)
                    $scope.RemovedRssdNumbers.push(memberObj.rssd);
            }
        }
        else {
            if ($scope.RemovedRssdNumbers.length > 0) {
                if ($scope.RemovedRssdNumbers.indexOf(memberObj.rssd) > -1) {
                    $scope.RemovedRssdNumbers.splice($scope.RemovedRssdNumbers.indexOf(memberObj.rssd), 1);
                }
            }
        }
    }

    $scope.createPeerGroup = function () {
        document.getElementById('overlay').style.display = '';
        var peerGroupCreationData = [];
        for (i = 0; i < $scope.PeerGroupMembers.length; i++) {
            if (!($scope.RemovedRssdNumbers.indexOf($scope.PeerGroupMembers[i].rssd) > -1)) {
                var pgObject = { CustPeerGroupName: '', RSSD: 0, TenantName: 1, Login: false, IsDefault: '' };
                pgObject.CustPeerGroupName = $scope.peerGroupName;
                pgObject.RSSD = $scope.PeerGroupMembers[i].rssd;
                pgObject.TenantName = '';
                pgObject.Login = '';
                if ($scope.isDefault.value == 'isNotDefault') {
                    pgObject.IsDefault = false;
                }
                else {
                    pgObject.IsDefault = true;
                }

                peerGroupCreationData.push(pgObject);
            }
        }

        var req = {
            method: 'POST',
            url: '/api/PeerGroupsApi',
            headers: {
                'Content-Type': 'application/json'
            },
            data: peerGroupCreationData
        };

        $http(req).then(
            function (result) {
                document.getElementById('overlay').style.display = 'none';
                $scope.ChangeSubScreen('allCustomPeerGroups');
            },
            function () {
                document.getElementById('overlay').style.display = 'none';
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to edit peer group. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    getPeerGroupBasicDetails();
    getPeerGroupMembers();
}]);

cbrBankAnalyticsModule.controller("searchBanksViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope) {
    $scope.ResultBanks = [];
    $scope.searchString = '';
    $scope.PageSize = '10';
    $scope.PageNumbers = [];
    $scope.CurrentPage = 1;
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

    $scope.ClearSearchDialog = function ($event) {
        $scope.BankFindSearchCriteria =
            {
                BankName: '',
                CertNumber: '',
            Location: '-- Location --',
            AssetSize: '-- Asset Size --',
            CorporationType: '-- Corporation Type --',
                PageSize: 10,
                PageNumber: 1
            };
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

    $scope.BankFindSearchCriteria =
    {
        BankName: '',
        CertNumber: '',
        Location: '-- Location --',
        AssetSize: '-- Asset Size --',
        CorporationType: '-- Corporation Type --',
        PageSize: -1,
        PageNumber: 1
    };

    $scope.SearchOnPageSizeChange = function ($event) {
        $scope.ResultBanks = [];
        $scope.PageNumbers = [];
        $scope.searchBanks(1);
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

    $scope.ExportToExcelCriteria =
    {
        BankName: '',
        CertNumber: '',
        Location: '',
        AssetSize: '',
        CorporationType: '',
        PageSize: -1,
        PageNumber: 1
    };

    var TIMER;

    $scope.GoToBankProfile = function ($event, bankObj) {
        $rootScope.ShowBankProfileForInstitutionKey = bankObj.institutionKey;
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
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to add the bank as favorite bank. Please send an e-mail to castellonf@stifel.com.');
            document.getElementById('overlay').style.display = 'none';
        });
    }

    $scope.ChangeScreen = function (templateId) {
        $rootScope.template = templateId;
    }

    $scope.ChangeSubScreen = function (templateId) {
        $rootScope.subTemplate = templateId;
    };

    $scope.ToggleSubTab = function (templateId) {
        $rootScope.subTemplate = templateId;
    };

    $scope.searchBanks = function (pageNumber) {
        angular.element(document.querySelector('#bankSearchLoader')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:block');
        if (pageNumber === '<<') {
            if ($scope.CurrentPage > 1)
                $scope.CurrentPage = $scope.CurrentPage - 1;
        }
        else if (pageNumber === '>>') {
            if ($scope.CurrentPage < ($scope.ResultBanks[0].totalResults / $scope.PageSize))
                $scope.CurrentPage = $scope.CurrentPage + 1;
        }
        else
            $scope.CurrentPage = pageNumber;

        if ($scope.ResultBanks.length > 0)
            $scope.ResultBanks = [];

        if ($scope.PageSize === 'All')
            $scope.BankFindSearchCriteria.PageSize = -1;
        else
            $scope.BankFindSearchCriteria.PageSize = $scope.PageSize;

        $scope.BankFindSearchCriteria.PageNumber = $scope.CurrentPage;
        var req = {
            method: 'POST',
            url: '/api/PeerGroupsApi/FindBanks',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.BankFindSearchCriteria
        };

        $http(req).then(function (result) {
            var resultData = result.data;
            if (result.data != null && result.data.length > 0) {
                for (i = 0; i < resultData.length; i++) {
                    if (resultData[i].establishedDate !== null)
                        resultData[i].establishedDate = new Date(resultData[i].establishedDate).toLocaleDateString('en-US');
                }

                angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:none');
                $scope.ResultBanks = resultData;
                fillPageNumbersArray($scope.ResultBanks[0].totalResults);
            }
            else {
                angular.element(document.querySelector('#bankSearchLoader')).html('No bank found matching your search criteria.');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while performing search. Please send an e-mail to castellonf@stifel.com.');
            angular.element(document.querySelector('#bankSearchLoader')).html('An error occurred while performing search. Please send an e-mail to castellonf@stifel.com.');
        });
    };

    $scope.startTimer = function () {
        // start (or re-start) the timer, only once it expires will we start the search
        if (TIMER) {
            clearTimeout(TIMER);
            angular.element(document.querySelector('#bankSearchLoader')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
            angular.element(document.querySelector('#bankSearchLoader')).attr('style', 'display:block');
            $scope.ResultBanks = [];
            $scope.PageNumbers = [];
        }
        TIMER = setTimeout(function () { $scope.searchBanks(1) }, 500);
    };
}]);

cbrBankAnalyticsModule.controller("favoriteBanksViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope) {
    $scope.FavoriteBanks = [];
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';

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

    $scope.MakeDefault = function ($event, bankObj) {
        if (bankObj.isDefaultBank === false) {
            document.getElementById('overlay').style.display = '';
            var makeDefaultParam = {
                InstitutionKey: bankObj.institutionKey
            };

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
                    angular.element(document.querySelector('#favoriteBankLoader')).attr('style', 'display:block');
                    getFavoriteBanks();
                }
                else {
                    $scope.toggleErrorMessageBoxModal('An error occurred while trying to make the bank your default bank. Please send an e-mail to castellonf@stifel.com.');
                }
            }, function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to make the bank your default bank. Please send an e-mail to castellonf@stifel.com.');
                document.getElementById('overlay').style.display = 'none';
            });
        }
    }

    $scope.GoToBankProfile = function ($event, bankObj) {
        $rootScope.ShowBankProfileForInstitutionKey = bankObj.institutionKey;
        $rootScope.template = 'ProfileOverview';
    }

    $scope.ChangeScreen = function (templateId) {
        $rootScope.template = templateId;
    }

    $scope.ChangeSubScreen = function (templateId) {
        $rootScope.subTemplate = templateId;
    }

    $scope.ToggleSubTab = function (templateId) {
        $rootScope.subTemplate = templateId;
    }

    $scope.RemoveBankFromFavoriteList = function ($event, bankObj) {
        document.getElementById('overlay').style.display = '';
        var removeFromFavoriteParam = {
            InstitutionKey: bankObj.institutionKey,
            IsDefault: bankObj.isDefault
        };

        var req = {
            method: 'POST',
            url: '/api/PeerGroupsApi/RemoveBankFromFavoriteList',
            headers: {
                'Content-Type': 'application/json'
            },
            data: removeFromFavoriteParam
        };

        $http(req).then(function (result) {
            $scope.toggleSuccessMessageBoxModal(result.data);
            document.getElementById('overlay').style.display = 'none';
            angular.element(document.querySelector('#favoriteBankLoader')).attr('style', 'display:block');
            $scope.FavoriteBanks = [];
            getFavoriteBanks();
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to remove the bank from favorite list. Please send an e-mail to castellonf@stifel.com.');
            document.getElementById('overlay').style.display = 'none';
        });
    }

    var getFavoriteBanks = function () {
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
                for (i = 0; i < resultData.length; i++) {
                    resultData[i].establishedDate = new Date(resultData[i].establishedDate).toLocaleDateString('en-US');
                }

                angular.element(document.querySelector('#favoriteBankLoader')).attr('style', 'display:none');
                $scope.FavoriteBanks = resultData;
            }
            else {
                angular.element(document.querySelector('#favoriteBankLoader')).html('You do not have any favorite bank.');
            }
        }, function () {
            $scope.toggleErrorMessageBoxModal('An error occurred while trying to get favorite banks. Please send an e-mail to castellonf@stifel.com.');
            angular.element(document.querySelector('#favoriteBankLoader')).html('An error occurred while trying to get favorite banks. Please send an e-mail to castellonf@stifel.com.');
        });
    }

    getFavoriteBanks();
}]);