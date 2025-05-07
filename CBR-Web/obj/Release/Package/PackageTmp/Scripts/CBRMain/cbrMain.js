var cbrCommonModule = angular.module('cbrcommon', ['ngRoute']);
var cbrAppMainModule = angular.module("cbrMain", ['cbrcommon']);
cbrCommonModule.factory('viewModelHelper', function ($http, $q, $window, $location) { return cbrApp.viewModelHelper($http, $q, $window, $location); });

cbrAppMainModule.controller("cbrHomePageViewModel", function ($scope, $http)
{
});

(function (myApp) {
    var viewModelHelper = function ($http, $q, $window, $location) {

        var self = this;

        self.modelIsValid = true;
        self.modelErrors = [];

        self.resetModelErrors = function () {
            self.modelErrors = [];
            self.modelIsValid = true;
        }

        self.apiGet = function (uri, data, success, failure, always) {
            self.modelIsValid = true;
            $http.get(cbrApp.rootPath + uri, data)
                .then(function (result) {
                    success(result);
                    if (always != null)
                        always();
                }, function (result) {
                    if (failure != null) {
                        failure(result);
                    }
                    else {
                        var errorMessage = result.status + ':' + result.statusText;
                        if (result.data != null && result.data.Message != null)
                            errorMessage += ' - ' + result.data.Message;
                        self.modelErrors = [errorMessage];
                        self.modelIsValid = false;
                    }
                    if (always != null)
                        always();
                });
        }

        self.apiPost = function (uri, data, success, failure, always) {
            self.modelIsValid = true;
            $http.post(cbrApp.rootPath + uri, data)
                .then(function (result) {
                    success(result);
                    if (always != null)
                        always();
                }, function (result) {
                    if (failure != null) {
                        failure(result);
                    }
                    else {
                        var errorMessage = result.status + ':' + result.statusText;
                        if (result.data != null && result.data.Message != null)
                            errorMessage += ' - ' + result.data.Message;
                        self.modelErrors = [errorMessage];
                        self.modelIsValid = false;
                    }
                    if (always != null)
                        always();
                });
        }

        self.goBack = function () {
            $window.history.back();
        }

        self.navigateTo = function (path) {
            $location.path(cbrApp.rootPath + path);
        }

        self.refreshPage = function (path) {
            $window.location.href = cbrApp.rootPath + path;
        }

        self.clone = function (obj) {
            return JSON.parse(JSON.stringify(obj))
        }

        return this;
    };
    myApp.viewModelHelper = viewModelHelper;
}(window.cbrApp));

var redirectTo = function (obj) {
    var viewName = obj.textContent.trim();
    var serviceUrl = '/Project/ProjectView?viewName=' + viewName + '&tag=default';

    window.location.href = serviceUrl;
}