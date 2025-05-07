
cbrProjectsModule.controller("capitalAnalysisDocuments", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "DocumentService", "$interval", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, DocumentService, $interval) {
    $scope.data = {
        availableOptions: [
          { id: '1', name: '5' },
          { id: '2', name: '10' },
          { id: '3', name: '25' },
          { id: '4', name: '50' },
          { id: '5', name: '100' }
        ],
        pageSize: { id: '1', name: '5' },
        currentPage: 1
    };

    $scope.documents = [];

    var lastLoginDate = getCookie("lastLogin").split(";").length > 0 ? getCookie("lastLogin").split(";")[0] : getCookie("lastLogin");

    $scope.lastLoginDatetime = "/Date(" + ((lastLoginDate != "" || lastLoginDate != null) ? Date.parse(lastLoginDate) : "1050782900000") + ")/"; // TODO: Get these two values from session/ global variable
    $scope.userName = userName;

    getDocuments();

    function getDocuments() {
        var docType1 = getCookie("docType");
        var projType1 = getCookie("projType");
        var sYear = $("#ddlYear").val();

        angular.element(document.querySelector('#projectDocTable')).html('<img src="../../../Images/cbr-ripple-small.gif" class="img-responsive" />');
        $("#tableBankDocs tbody").hide();
        $("#paginationID").hide();

        DocumentService.getDocuments('/Project/GetDocuments', { docType: docType1, projectType: projType1, selYear: sYear })
            .success(function (docs) {
                $scope.documents = docs;
                angular.element(document.querySelector('#projectDocTable')).html('');
                $("#tableBankDocs tbody").show();
                $("#paginationID").show();
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.fnDownLoad = function (filename, docType, projType) {
        $scope.renderFile(filename, docType, projType);
    }

    $scope.renderFile = function (filename, docType, projType) {
        var link = "/Project/DownloadFile?"
           + "FileName=" + filename
           + "&fileType=" + $scope.FileType
           + "&dType=" + docType
           + "&projType=" + projType;
        //$window.open(link);
        var hif = document.getElementById("hiddeniframe");
        hif.src = link;
        $("body").css({ "opacity": 0.4, "z-index": 1000 });

        cookieIntervalID = $interval(isFileDownloaded, 500);
    }

    var cookieIntervalID = null;

    function isFileDownloaded() {
        var myCookie = getCookie("fileDownloaded");

        if (myCookie == null) {

        }
        else {
            $("body")[0].style.opacity = 1;
            document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            clearInterval(cookieIntervalID);
        }
    }

}]);



cbrProjectsModule.factory('DocumentService', ['$http', function ($http) {

    var DocumentService = {};
    DocumentService.getDocuments = function (url, params) {
        return $http.get(url, { params: params });
    };
    return DocumentService;

}]);

Dropzone.options.dropzoneForm = {
    init: function () {
        this.on("complete", function (data) {
            //var res = eval('(' + data.xhr.responseText + ')');
            var res = JSON.parse(data.xhr.responseText);
        }),
        this.on("queuecomplete", function (file) {
            window.location.reload();
        });
    }
};

var ddlIndex = getQueryStringValue("index");
$(".nav-documents li.docTypes").removeClass("project-side-active");
if (ddlIndex != "") {
    $('#ddlYear')[0].selectedIndex = ddlIndex;

    var parentSiblings = $('#ddlYear').parent().siblings();
    var anchorTags = parentSiblings.children("li a");
    var aLength = anchorTags.length;

    for (var i = 0; i < aLength; i++) {
        var hrefText = anchorTags[i].href;
        if (hrefText.indexOf("year") > -1) {

        } else {
            anchorTags[i].href = anchorTags[i].href + "&year=" + $("#ddlYear").val() + '&index=' + ddlIndex;
        }
    }

    var docType = ((getQueryStringValue("docType") == "" || getQueryStringValue("docType") == null) ? "Bank" : getQueryStringValue("docType"));
    $(".nav-documents li.docTypes").each(function (o) {
        var curText = $(this).text();

        if (curText.indexOf(docType) > -1) {
            $(this).addClass("project-side-active");
        }

    });
} else {
    var docType = ((getQueryStringValue("docType") == "" || getQueryStringValue("docType") == null) ? "" : getQueryStringValue("docType"));
    if (docType !== "") {
        $(".nav-documents li.docTypes").each(function (o) {
            var curText = $(this).text();

            if (curText.indexOf(docType) > -1) {
                $(this).addClass("project-side-active");
            }

        });
    }
}

function getCookie(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

function updateYear(obj) {
    selectedYearIndex = obj.selectedIndex;

    var parentSiblings = $(obj).parent().siblings();

    if (parentSiblings.length > 2) {
        var temp = parentSiblings[2].querySelectorAll('a')[0].href.split('&')[2].split('=');
        var docType = temp[1];
    }

    if (docType !== undefined) {
        var viewName = (getQueryStringValue("viewName") == "" || getQueryStringValue("viewName") == null) ? "Capital" : getQueryStringValue("viewName");
        docType = ((getCookie("docType") == "" || getCookie("docType") == null) ? "Bank" : getCookie("docType"));
        var serviceURL = '/Project/ProjectDocumentView?viewName=' + viewName + '&tag=document&docType=' + docType +
            '&year=' + obj.value + '&index=' + selectedYearIndex;
        window.location.href = serviceURL;
    }

}

function getQueryStringValue(key) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

angular.bootstrap(document.getElementById("tabBankDocuments"), ['cbrprojects']);