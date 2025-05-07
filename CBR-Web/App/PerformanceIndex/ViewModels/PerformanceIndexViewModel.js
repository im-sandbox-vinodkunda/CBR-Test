cbrPerformanceIndexModule.controller("performanceIndexNavigationController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.performanceIndexTemplate = 'performanceIndexPeerGroupTemplate';
    $scope.SelectedTab = 'Peer Group';
    $scope.IsPeerGroupActive = true;
    $scope.IsStateActive = false;
    $scope.IsRegionActive = false;
    $scope.IsNationalActive = false;
    $scope.BankName = '';

    $scope.TogglePerformanceIndexScreen = function ($event, screenName, tabName) {
        $scope.performanceIndexTemplate = screenName;
        $scope.SelectedTab = tabName;
        if (tabName === 'Peer Group') {
            $scope.IsPeerGroupActive = true;
            $scope.IsStateActive = false;
            $scope.IsRegionActive = false;
            $scope.IsNationalActive = false;
        }
        else if (tabName === 'State') {
            $scope.IsPeerGroupActive = false;
            $scope.IsStateActive = true;
            $scope.IsRegionActive = false;
            $scope.IsNationalActive = false;
        }
        else if (tabName === 'Region') {
            $scope.IsPeerGroupActive = false;
            $scope.IsStateActive = false;
            $scope.IsRegionActive = true;
            $scope.IsNationalActive = false;
        }
        else {
            $scope.IsPeerGroupActive = false;
            $scope.IsStateActive = false;
            $scope.IsRegionActive = false;
            $scope.IsNationalActive = true;
        }
    }

    $scope.GoToDashboard = function () {
        window.location.href = '/';
    }

    var initialize = function () {
        $scope.BankName = $location.search().instkey;
    };

    initialize();
}]);

cbrPerformanceIndexModule.controller("performanceIndexPeerGroup", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.PeerGroups = [
        { value: '1', peergroupname: 'Select Peer Group'},
        { value: '2', peergroupname: 'Banks < $100M'},
        { value: '3', peergroupname: 'Banks $100M - $249M'},
        { value: '4', peergroupname: 'Banks $250M - $499M'},
        { value: '5', peergroupname: 'Banks $500M - $999M'},
        { value: '6', peergroupname: 'Banks $1B - $5B'},
        { value: '7', peergroupname: 'Banks $5B - $10B'},
        { value: '8', peergroupname: 'Banks $10B - $100B'},
        { value: '9', peergroupname: 'Banks > $100B'},
        { value: '10', peergroupname: 'All trust companies'}];

    $scope.SelectedPeerGroup = $scope.PeerGroups[1];

    $scope.PerformanceIndexData = [];

    var getPerformanceIndexData = function (tabName, whereClauseParameter) {
        var perfIndexDetailParams = {
            TabName: tabName,
            WhereClauseParameter: whereClauseParameter
        };

        var req = {
            method: 'POST',
            url: '/api/PerformanceIndexApi/GetPerformanceIndexDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            data: perfIndexDetailParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.PerformanceIndexData = result.data;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get detailed data. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    $scope.ToggleDataOnPeerGroupChange = function () {
        $scope.PerformanceIndexData = [];
        getPerformanceIndexData('Peer Group', $scope.SelectedPeerGroup.value);
    }

    var initialize = function () {
        if ($location.search().pgkey === '')
            getPerformanceIndexData('Peer Group', '2');
        else {
            for (i = 0; i < $scope.PeerGroups.length; i++) {
                if ($scope.PeerGroups[i].value === $location.search().pgkey) {
                    $scope.SelectedPeerGroup = $scope.PeerGroups[i];
                    break;
                }
            }
            getPerformanceIndexData('Peer Group', $location.search().pgkey);
        }
            
    }

    initialize();
}]);

cbrPerformanceIndexModule.controller("performanceIndexState", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.PerformanceIndexData = [];
    $scope.SelectedState = 'Arizona';

    $scope.ToggleDataOnStateChange = function () {
        $scope.PerformanceIndexData = [];
        getPerformanceIndexData('State', $scope.SelectedState);
    }

    var getPerformanceIndexData = function (tabName, whereClauseParameter) {
        var perfIndexDetailParams = {
            TabName: tabName,
            WhereClauseParameter: whereClauseParameter
        };

        var req = {
            method: 'POST',
            url: '/api/PerformanceIndexApi/GetPerformanceIndexDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            data: perfIndexDetailParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.PerformanceIndexData = result.data;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get detailed data. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var initialize = function () {
        if ($location.search().state === '')
            getPerformanceIndexData('State', 'Arizona');
        else {
            $scope.SelectedState = $location.search().state;
            getPerformanceIndexData('State', $location.search().state);
        }
        
    }

    initialize();
}]);

cbrPerformanceIndexModule.controller("performanceIndexRegion", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.PerformanceIndexData = [];
    $scope.SelectedRegion = 'Mid Atlantic';

    $scope.ToggleDataOnRegionChange = function () {
        $scope.PerformanceIndexData = [];
        getPerformanceIndexData('Region', $scope.SelectedRegion);
    }

    var getPerformanceIndexData = function (tabName, whereClauseParameter) {
        var perfIndexDetailParams = {
            TabName: tabName,
            WhereClauseParameter: whereClauseParameter
        };

        var req = {
            method: 'POST',
            url: '/api/PerformanceIndexApi/GetPerformanceIndexDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            data: perfIndexDetailParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.PerformanceIndexData = result.data;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get detailed data. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var initialize = function () {
        if ($location.search().region === '')
            getPerformanceIndexData('Region', 'Mid Atlantic');
        else {
            $scope.SelectedRegion = $location.search().region
            getPerformanceIndexData('Region', $location.search().region);
        }
    }

    initialize();
}]);

cbrPerformanceIndexModule.controller("performanceIndexNational", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter) {
    $scope.PerformanceIndexData = [];
    var getPerformanceIndexData = function (tabName, whereClauseParameter) {
        var perfIndexDetailParams = {
            TabName: tabName,
            WhereClauseParameter: whereClauseParameter
        };

        var req = {
            method: 'POST',
            url: '/api/PerformanceIndexApi/GetPerformanceIndexDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            data: perfIndexDetailParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.PerformanceIndexData = result.data;
                }
            },
            function () {
                $scope.toggleErrorMessageBoxModal('An error occurred while trying to get detailed data. Please send an e-mail to castellonf@stifel.com.');
            });
    }

    var initialize = function () {
        getPerformanceIndexData('National', '');
    }

    initialize();
}]);

angular.bootstrap(document.getElementById("performanceindex"), ['cbrperformanceindex']);