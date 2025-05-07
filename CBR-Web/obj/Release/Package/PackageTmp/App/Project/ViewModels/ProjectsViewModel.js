cbrProjectsModule.controller("projectsNavigationController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs) {
    $scope.projectTemplate = 'capitalPlan';
    $scope.TenantName = '';
    $scope.Tenant = {};
    $scope.IsAccountAccessDisabled = false;
    $scope.IsSystemAdministratorAssigned = false;
    $scope.IsAdministratorAssigned = false;
    $scope.IsProjectManagerAssigned = false;
    $scope.IsStandardUserAssigned = false;
    $scope.IsNonBankStandardUserAssigned = false;
    $scope.IsNonBankAdministratorAssigned = false;
    $scope.IsCapitalPlanAccessible = false;
    $scope.IsStrategicPlanAccessible = false;
    $scope.IsErmAccessible = false;
    $scope.IsIssueCdAccessible = false;

    $scope.UserRoles = [];
    $scope.ModuleAccessState = [];
    $scope.SelectedTemplate = '';

    $scope.ToggleProjectTemplate = function ($event, screenName) {
        if (screenName === 'capitalPlan') {
            if ((($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true) && $scope.IsCapitalPlanAccessible === true) || $scope.IsSystemAdministratorAssigned === true) {
                $scope.projectTemplate = screenName;
                $scope.SelectedTemplate = screenName;
            }
            else {
                if ($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true || $scope.IsNonBankAdministratorAssigned === true) {
                    dlg = dialogs.notify('Info', 'Not Available: to find out more about this product, visit our website <a href="https://www.cb-resource.com/what-we-do/capital-plan" target="_blank">www.cb-resource.com/what-we-do/capital-plan</a>.');
                }
                else {
                    dlg = dialogs.notify('Info', 'Not Available: Contact your Account Administrator for access.');
                }
            }
        }
        else if (screenName === 'strategicPlan') {
            if ((($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true) && $scope.IsStrategicPlanAccessible === true) || $scope.IsSystemAdministratorAssigned === true) {
                $scope.projectTemplate = screenName;
                $scope.SelectedTemplate = screenName;
            }
            else {
                if ($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true || $scope.IsNonBankAdministratorAssigned === true) {
                    dlg = dialogs.notify('Info', 'Not Available: to find out more about this product, visit our website <a href="https://www.cb-resource.com/what-we-do/strategic-plan" target="_blank">www.cb-resource.com/what-we-do/strategic-plan</a>.');
                }
                else {
                    dlg = dialogs.notify('Info', 'Not Available: Contact your Account Administrator for access.');
                }
            }
        }
        else if (screenName === 'ermPortal') {
            if ((($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true) && $scope.IsErmAccessible === true) || $scope.IsSystemAdministratorAssigned === true) {
                $scope.projectTemplate = screenName;
                $scope.SelectedTemplate = screenName;
                getLoggedInUserEmail();
            }
            else {
                if ($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true || $scope.IsNonBankAdministratorAssigned === true) {
                    dlg = dialogs.notify('Info', 'Not Available: to find out more about this product, visit our website <a href="https://www.cb-resource.com/what-we-do/erm-solution" target="_blank">www.cb-resource.com/what-we-do/erm-solution</a>.');
                }
                else {
                    dlg = dialogs.notify('Info', 'Not Available: Contact your Account Administrator for access.');
                }
            }
        }
        else {
            if ((($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true) && $scope.IsErmAccessible === true) || $scope.IsSystemAdministratorAssigned === true) {
                $scope.projectTemplate = screenName;
                $scope.SelectedTemplate = screenName;
            }
            else {
                if ($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true || $scope.IsNonBankAdministratorAssigned === true) {
                    dlg = dialogs.notify('Info', 'Not Available: to find out more about this product, visit our website <a href="https://www.cb-resource.com/what-we-do/erm-solution" target="_blank">www.cb-resource.com/what-we-do/erm-solution</a>.');
                }
                else {
                    dlg = dialogs.notify('Info', 'Not Available: Contact your Account Administrator for access.');
                }
            }
        }
    };

    var getLoggedInUserEmail = function (userKey) {
        var req = {
            method: 'GET',
            url: '/api/HomeApi/GetLoggedInUserEmail',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== "") {
               // setCookie('testcookie', result.data, 1);
                if (window.location.host.includes("cbr-qa") || window.location.host.includes("localhost") || window.location.host.includes("cb-resource-dev")) {
                    window.open("http://ermtest.cb-resource.com/CBALanding/SSO");
                }
                else {
                    window.open("http://erm.cb-resource.com/CBALanding/SSO");
                }
            }
        });
    };

    var setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        var domain = "domain=" + ".cb-resource.com";
        document.cookie = cname + "=" + cvalue + "; " + expires + "; " + domain;
        //document.cookie = cname + "=" + cvalue + expires + "; path=/; domain=" + domain;
    }

    $scope.NavigateToDashboard = function () {
        window.location.href = '/';
    };

    var getTenantName = function () {
        var req = {
            method: 'GET',
            url: '/api/ProjectApi/GetTenantName',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null) {
                $scope.TenantName = result.data;
            }
        },
            function () {
                var dlg = dialogs.error('An error occurred while trying to get accounts. Please send an e-mail to admin@cb-resource.com.');
            });
    };

    var initialize = function () {
        getTenantName();
        getUserRolesProfile();

        var templateToInitialize = $location.search().viewName;
        if (templateToInitialize === 'Capital') {
            $scope.projectTemplate = 'capitalPlan';
            $scope.SelectedTemplate = 'capitalPlan';
        }
        else if (templateToInitialize === 'Strategy') {
            $scope.projectTemplate = 'strategicPlan';
            $scope.SelectedTemplate = 'strategicPlan';
        }
        else if (templateToInitialize === 'ermPortal') {
            $scope.projectTemplate = 'ermPortal';
            $scope.SelectedTemplate = 'ermPortal';
        }
        else {
            $scope.projectTemplate = 'ermSolution';
            $scope.SelectedTemplate = 'ermSolution';
        }
    };

    var getAccountsModuleAccessState = function () {
        var req = {
            method: 'GET',
            url: '/api/HomeApi/GetAccountsModuleAccessState',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            if (result.data !== null && result.data.length > 0) {
                calculateUserRoles();
                $scope.ModuleAccessState = result.data;

                var capitalPlanAccess = result.data.filter(function (obj) {
                    return obj.moduleName === 'Capital Plan';
                })[0];

                $scope.IsCapitalPlanAccessible = capitalPlanAccess.isAccessible;

                var strategicPlanAccess = result.data.filter(function (obj) {
                    return obj.moduleName === 'Strategic Plan';
                })[0];

                $scope.IsStrategicPlanAccessible = strategicPlanAccess.isAccessible;

                var ermSolutionAccess = result.data.filter(function (obj) {
                    return obj.moduleName === 'ERM Solution';
                })[0];

                $scope.IsErmAccessible = ermSolutionAccess.isAccessible;

                var issueCdAccess = result.data.filter(function (obj) {
                    return obj.moduleName === 'Issue A CD';
                })[0];

                $scope.IsIssueCdAccessible = issueCdAccess.isAccessible;
            }
            else {
                dlg = dialogs.error('An error occurred while trying to get module accessibility status. Please send an e-mail to admin@cb-resource.com.');
            }
        },
            function () {
                dlg = dialogs.error('An error occurred while trying to get module accessibility status. Please send an e-mail to admin@cb-resource.com.');
            });
    };

    var getUserRolesProfile = function () {
        var req = {
            method: 'GET',
            url: '/api/HomeApi/GetLoggedInUserRoleProfile',
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

                    getAccountsModuleAccessState();
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
    };

    $scope.RedirectTo = function (project) {

    };

    initialize();
}]);

cbrProjectsModule.controller("capitalPlanController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", "$uibModal", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs, $uibModal) {
    $scope.DocumentType = 'Bank Documents';
    $scope.YearFilter = new Date().getFullYear();
    $scope.PageSize = '10';
    $scope.DisableNextClick = false;
    $scope.SelectedPageSize = '10';
    $scope.Documents = [];
    $scope.CurrentPage = 1;
    $scope.PageNumbers = [];
    $scope.newFile = null;

    $scope.dzOptions = {
        url: '/Project/UploadFile?docType=' + $scope.DocumentType + '&projectType=Capital',
        paramName: 'photo',
        maxFilesize: '10',
        addRemoveLinks: true,
        dictDefaultMessage: '<span><i class="fa fa-upload"></i> Click here or drag and drop files to upload</span>'
    };

    $scope.dzCallbacks = {
        'addedfile': function (file) {
            $scope.newFile = file;
        },
        'success': function (file, xhr) {
            $scope.dzMethods.removeFile(file);
            getDocuments({ id: 'pageNumber1', value: 1 });
        }
    };

    $scope.dzMethods = {};
    $scope.removeNewFile = function () {
        $scope.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
    };

    $scope.LoadDocuments = function (pageNumber) {
        var desiredDropZone = Dropzone.instances.filter(function (obj) {
            return obj.element.id === 'capitalPlanDropZone';
        });

        desiredDropZone[0].options.url = '/Project/UploadFile?docType=' + $scope.DocumentType + '&projectType=Capital';
        getDocuments(pageNumber);
    };

    var getDocuments = function (pageNumber) {
        document.getElementById('overlay').style.display = '';
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
            if ($scope.CurrentPage < ($scope.Documents[0].totalDocuments / parseInt($scope.PageSize))) {
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
            method: 'GET',
            url: '/api/ProjectApi/GetDocuments?docType=' + $scope.DocumentType + '&projectType=Capital&year=' + $scope.YearFilter + '&pageSize=' + $scope.PageSize + '&pageNumber=' + params.PageNumber,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            $scope.Documents = [];
            $scope.PageNumbers = [];
            document.getElementById('overlay').style.display = 'none';
            if (result.data !== null && result.data.length > 0) {
                $scope.Documents = result.data;
                $scope.ShowingFrom = (($scope.CurrentPage - 1) * parseInt($scope.PageSize)) + 1;
                $scope.ShowingTo = $scope.ShowingFrom + $scope.Documents.length - 1;
                fillPageNumbersArray($scope.Documents[0].totalDocuments);
            }
        },
            function (errorObj) {
                document.getElementById('overlay').style.display = 'none';
                var dlg = dialogs.error('An error occurred while trying to get accounts. Please send an e-mail to admin@cb-resource.com.');
            });
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

    $scope.BindFileSize = function (fileSize) {
        var sizeInKb = fileSize / 1024;
        return $filter('number')(sizeInKb, 2) + ' kb';
    };

    $scope.DeleteFile = function (documentObj) {
        dlg = dialogs.confirm('Confirm', 'Are you sure you want to delete this file?');
        dlg.result.then(function (btn) {
            if (btn === 'yes') {
                document.getElementById('overlay').style.display = '';

                var profParams = {
                    FileName: documentObj.fileName,
                    FileId: documentObj.fileId
                };

                var req = {
                    method: 'POST',
                    url: '/api/ProjectApi/DeleteFile',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: profParams
                };

                $http(req).then(function (result) {
                    if (result.data !== null && result.data === true) {
                        document.getElementById('overlay').style.display = 'none';
                        var dlgsuccess = dialogs.notify('Info', 'Successfully deleted the file.');
                        getDocuments({ id: 'pageNumber1', value: $scope.CurrentPage });
                    }
                },
                    function () {
                        var dlgerror = dialogs.error('An error occurred while trying to delete file. Please send an email to admin@cb-resource.com.');
                        document.getElementById('overlay').style.display = 'none';
                    });
            }
        }, function (btn) {
        });
    };

    $scope.DownloadFile = function (documentObj) {
        document.getElementById('overlay').style.display = '';

        var profParams = {
            FileName: documentObj.fileName,
            FileId: documentObj.fileId
        };

        var req = {
            httpMethod: 'POST',
            checkInterval: 500,
            data: profParams,
            successCallback: function (url) {
                document.getElementById('overlay').style.display = 'none';
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
            },
            cookiePath: '/',
            cookieDomain: window.location.hostname
        };

        $.fileDownload('/api/ProjectApi/DownloadProjectFile', req);

        /*var link = "/Project/DownloadSingleBankProfile?"
           + "downloadBankProfileParams=" + JSON.stringify(profParams);

        var hif = document.getElementById("hiddeniframe");
        hif.src = link;
        $("body").css({ "opacity": 0.4, "z-index": 1000 });

        cookieIntervalID = $interval(isFileDownloaded, 500);*/
    };

    var initialize = function () {
        setTimeout(function () {
            $('#yearfilter').datepicker({
                format: "yyyy",
                viewMode: "years",
                minViewMode: "years"
            }).on('changeDate', function (e) {
                $(this).datepicker('hide');
            });

            //$('#yearfilter').datepicker("setDate", new Date().getFullYear());

            $('[data-toggle="tooltip"]').tooltip();
            getDocuments({ id: 'pageNumber1', value: 1 });
        }, 500);
    };

    initialize();
}]);

cbrProjectsModule.controller("strategicPlanController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", "$uibModal", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs, $uibModal) {
    $scope.DocumentType = 'Bank Documents';
    $scope.YearFilter = new Date().getFullYear();
    $scope.PageSize = '10';
    $scope.DisableNextClick = false;
    $scope.SelectedPageSize = '10';
    $scope.Documents = [];
    $scope.CurrentPage = 1;
    $scope.PageNumbers = [];

    $scope.dzOptions = {
        url: '/Project/UploadFile?docType=' + $scope.DocumentType + '&projectType=Strategy',
        paramName: 'photo',
        maxFilesize: '10',
        addRemoveLinks: true,
        dictDefaultMessage: '<span><i class="fa fa-upload"></i> Click here or drag and drop files to upload</span>'
    };

    $scope.dzCallbacks = {
        'addedfile': function (file) {
            console.log(file);
            $scope.newFile = file;
        },
        'success': function (file, xhr) {
            $scope.dzMethods.removeFile(file);
            getDocuments({ id: 'pageNumber1', value: 1 });
        }
    };

    $scope.dzMethods = {};
    $scope.removeNewFile = function () {
        $scope.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
    };

    $scope.LoadDocuments = function (pageNumber) {
        var desiredDropZone = Dropzone.instances.filter(function (obj) {
            return obj.element.id === 'strategicPlanDropZone';
        });

        desiredDropZone[0].options.url = '/Project/UploadFile?docType=' + $scope.DocumentType + '&projectType=Strategy';
        getDocuments(pageNumber);
    };

    var getDocuments = function (pageNumber) {
        document.getElementById('overlay').style.display = '';
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
            if ($scope.CurrentPage < ($scope.Documents[0].totalDocuments / parseInt($scope.PageSize))) {
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
            method: 'GET',
            url: '/api/ProjectApi/GetDocuments?docType=' + $scope.DocumentType + '&projectType=Strategy&year=' + $scope.YearFilter + '&pageSize=' + $scope.PageSize + '&pageNumber=' + params.PageNumber,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            $scope.Documents = [];
            $scope.PageNumbers = [];
            document.getElementById('overlay').style.display = 'none';
            if (result.data !== null && result.data.length > 0) {

                $scope.Documents = result.data;
                $scope.ShowingFrom = (($scope.CurrentPage - 1) * parseInt($scope.PageSize)) + 1;
                $scope.ShowingTo = $scope.ShowingFrom + $scope.Documents.length - 1;
                fillPageNumbersArray($scope.Documents[0].totalDocuments);
            }
        },
            function () {
                document.getElementById('overlay').style.display = 'none';
                var dlg = dialogs.error('An error occurred while trying to get accounts. Please send an e-mail to admin@cb-resource.com.');
            });
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

    $scope.BindFileSize = function (fileSize) {
        var sizeInKb = fileSize / 1024;
        return $filter('number')(sizeInKb, 2) + ' kb';
    };

    $scope.DeleteFile = function (documentObj) {
        dlg = dialogs.confirm('Confirm', 'Are you sure you want to delete this file?');
        dlg.result.then(function (btn) {
            if (btn === 'yes') {
                document.getElementById('overlay').style.display = '';

                var profParams = {
                    FileName: documentObj.fileName,
                    FileId: documentObj.fileId
                };

                var req = {
                    method: 'POST',
                    url: '/api/ProjectApi/DeleteFile',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: profParams
                };

                $http(req).then(function (result) {
                    if (result.data !== null && result.data === true) {
                        document.getElementById('overlay').style.display = 'none';
                        var dlgsuccess = dialogs.notify('Info', 'Successfully deleted the file.');
                        getDocuments({ id: 'pageNumber1', value: $scope.CurrentPage });
                    }
                },
                    function () {
                        var dlgerror = dialogs.error('An error occurred while trying to delete file. Please send an email to admin@cb-resource.com.');
                        document.getElementById('overlay').style.display = 'none';
                    });
            }
        }, function (btn) {
        });
    };

    $scope.DownloadFile = function (documentObj) {
        document.getElementById('overlay').style.display = '';

        var profParams = {
            FileName: documentObj.fileName,
            FileId: documentObj.fileId
        };

        var req = {
            httpMethod: 'POST',
            checkInterval: 500,
            data: profParams,
            successCallback: function (url) {
                document.getElementById('overlay').style.display = 'none';
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
            },
            cookiePath: '/',
            cookieDomain: window.location.hostname
        };

        $.fileDownload('/api/ProjectApi/DownloadProjectFile', req);

        /*var link = "/Project/DownloadSingleBankProfile?"
           + "downloadBankProfileParams=" + JSON.stringify(profParams);

        var hif = document.getElementById("hiddeniframe");
        hif.src = link;
        $("body").css({ "opacity": 0.4, "z-index": 1000 });

        cookieIntervalID = $interval(isFileDownloaded, 500);*/
    };

    $scope.LoadDocumentsOnYearChange = function () {
    };

    var initialize = function () {
        setTimeout(function () {
            $('#yearfilter').datepicker({
                format: "yyyy",
                viewMode: "years",
                minViewMode: "years"
            }).on('changeDate', function (e) {
                $(this).datepicker('hide');
            });

            //$('#yearfilter').datepicker("setDate", new Date().getFullYear());

            $('[data-toggle="tooltip"]').tooltip();
            getDocuments({ id: 'pageNumber1', value: 1 });
        }, 500);
    };

    initialize();
}]);

cbrProjectsModule.controller("ermSolutionController", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "dialogs", "$uibModal", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, dialogs, $uibModal) {
    $scope.DocumentType = 'Bank Documents';
    $scope.YearFilter = new Date().getFullYear();
    $scope.PageSize = '10';
    $scope.DisableNextClick = false;
    $scope.SelectedPageSize = '10';
    $scope.Documents = [];
    $scope.CurrentPage = 1;
    $scope.PageNumbers = [];

    $scope.dzOptions = {
        url: '/Project/UploadFile?docType=' + $scope.DocumentType + '&projectType=ERM',
        paramName: 'photo',
        maxFilesize: '10',
        addRemoveLinks: true,
        dictDefaultMessage: '<span><i class="fa fa-upload"></i> Click here or drag and drop files to upload</span>'
    };

    $scope.dzCallbacks = {
        'addedfile': function (file) {
            console.log(file);
            $scope.newFile = file;
        },
        'success': function (file, xhr) {
            $scope.dzMethods.removeFile(file);
            getDocuments({ id: 'pageNumber1', value: 1 });
        }
    };

    $scope.dzMethods = {};
    $scope.removeNewFile = function () {
        $scope.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
    };

    $scope.LoadDocuments = function (pageNumber) {
        var desiredDropZone = Dropzone.instances.filter(function (obj) {
            return obj.element.id === 'ermSolutionDropZone';
        });

        desiredDropZone[0].options.url = '/Project/UploadFile?docType=' + $scope.DocumentType + '&projectType=ERM';
        getDocuments(pageNumber);
    };

    var getDocuments = function (pageNumber) {
        document.getElementById('overlay').style.display = '';
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
            if ($scope.CurrentPage < ($scope.Documents[0].totalDocuments / parseInt($scope.PageSize))) {
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
            method: 'GET',
            url: '/api/ProjectApi/GetDocuments?docType=' + $scope.DocumentType + '&projectType=ERM&year=' + $scope.YearFilter + '&pageSize=' + $scope.PageSize + '&pageNumber=' + params.PageNumber,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(function (result) {
            $scope.Documents = [];
            $scope.PageNumbers = [];
            document.getElementById('overlay').style.display = 'none';
            if (result.data !== null && result.data.length > 0) {
                $scope.Documents = result.data;
                $scope.ShowingFrom = (($scope.CurrentPage - 1) * parseInt($scope.PageSize)) + 1;
                $scope.ShowingTo = $scope.ShowingFrom + $scope.Documents.length - 1;
                fillPageNumbersArray($scope.Documents[0].totalDocuments);
            }
        },
            function () {
                document.getElementById('overlay').style.display = 'none';
                var dlg = dialogs.error('An error occurred while trying to get accounts. Please send an e-mail to admin@cb-resource.com.');
            });
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

    $scope.BindFileSize = function (fileSize) {
        var sizeInKb = fileSize / 1024;
        return $filter('number')(sizeInKb, 2) + ' kb';
    };

    $scope.DeleteFile = function (documentObj) {
        dlg = dialogs.confirm('Confirm', 'Are you sure you want to delete this file?');
        dlg.result.then(function (btn) {
            if (btn === 'yes') {
                document.getElementById('overlay').style.display = '';

                var profParams = {
                    FileName: documentObj.fileName,
                    FileId: documentObj.fileId
                };

                var req = {
                    method: 'POST',
                    url: '/api/ProjectApi/DeleteFile',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: profParams
                };

                $http(req).then(function (result) {
                    if (result.data !== null && result.data === true) {
                        document.getElementById('overlay').style.display = 'none';
                        var dlgsuccess = dialogs.notify('Info', 'Successfully deleted the file.');
                        getDocuments({ id: 'pageNumber1', value: $scope.CurrentPage });
                    }
                },
                    function () {
                        var dlgerror = dialogs.error('An error occurred while trying to delete file. Please send an email to admin@cb-resource.com.');
                        document.getElementById('overlay').style.display = 'none';
                    });
            }
        }, function (btn) {
        });
    };

    $scope.DownloadFile = function (documentObj) {
        document.getElementById('overlay').style.display = '';

        var profParams = {
            FileName: documentObj.fileName,
            FileId: documentObj.fileId
        };

        var req = {
            httpMethod: 'POST',
            checkInterval: 500,
            data: profParams,
            successCallback: function (url) {
                document.getElementById('overlay').style.display = 'none';
            },
            failCallback: function (responseHtml, url, error) {
                document.getElementById('overlay').style.display = 'none';
            },
            cookiePath: '/',
            cookieDomain: window.location.hostname
        };

        $.fileDownload('/api/ProjectApi/DownloadProjectFile', req);

        /*var link = "/Project/DownloadSingleBankProfile?"
           + "downloadBankProfileParams=" + JSON.stringify(profParams);

        var hif = document.getElementById("hiddeniframe");
        hif.src = link;
        $("body").css({ "opacity": 0.4, "z-index": 1000 });

        cookieIntervalID = $interval(isFileDownloaded, 500);*/
    };

    var initialize = function () {
        setTimeout(function () {
            $('#yearfilter').datepicker({
                format: "yyyy",
                viewMode: "years",
                minViewMode: "years"
            }).on('changeDate', function (e) {
                $(this).datepicker('hide');
            });

            //$('#yearfilter').datepicker("setDate", new Date().getFullYear());

            $('[data-toggle="tooltip"]').tooltip();
            getDocuments({ id: 'pageNumber1', value: 1 });
        }, 500);
    };

    initialize();
}]);

angular.bootstrap(document.getElementById("projects"), ['cbrprojects']);