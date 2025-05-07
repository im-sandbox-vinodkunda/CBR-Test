cbrBankAnalyticsModule.controller("riskRadarOverviewViewModel", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "$filter", "$interval", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, $filter, $interval) {
    // This is the parent controller/viewmodel for 'riskRadar' and its $scope is accesible
    // down controllers set by the routing engine. This controller is bound to the RiskRadar.cshtml in the
   
    var chartsRenderingStatus = {
        loadCompositionStackChartExportComplete: false,
        depositCompositionStackChartExportComplete: false,
        assetGrowthBarChartExportComplete: false,
        loansLeasesGrowthBarChartExportComplete: false,
        depositGrowthBarChartExportComplete: false,
        equityGrowthBarChartExportComplete: false
    }

    $scope.FavoriteBanks = [];
    $scope.BankProfileIntroductionData = {};
    $scope.BankProfileDetailsQtd = [];
    $scope.BankProfileDetailsYtd = [];
    $scope.BankProfileDetails = [];
    $scope.YtdHeaders = {};
    $scope.QtrHeaders = {};
    $scope.TableHeaders = {};
    $scope.ActiveBankProfileTab = 'YTD';
    $scope.AssetGrowthRateChartData = [];
    $scope.LoansLeasesGrowthRateChartData = [];
    $scope.DepositGrowthRateChartData = [];
    $scope.EquityCapitalGrowthRateChartData = [];

    $scope.AssetGrowthRateChartDataQtr = [];
    $scope.LoansLeasesGrowthRateChartDataQtr = [];
    $scope.DepositGrowthRateChartDataQtr = [];
    $scope.EquityCapitalGrowthRateChartDataQtr = [];

    $scope.AssetGrowthRateChartDataYtd = [];
    $scope.LoansLeasesGrowthRateChartDataYtd = [];
    $scope.DepositGrowthRateChartDataYtd = [];
    $scope.EquityCapitalGrowthRateChartDataYtd = [];
    $scope.LoadCompStackChartDataQtd = [];
    $scope.LoadCompStackChartDataYtd = [];
    $scope.DepositCompStackChartDataQtd = [];
    $scope.DepositCompStackChartDataYtd = [];
    $scope.StackChartCategoriesQtd = [];
    $scope.StackChartCategoriesYtd = [];
    $scope.InstitutionKey = 0;
    $scope.showSuccessMessageModal = false;
    $scope.showErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.ChartBase64Reps = {
        assetGrowthBarChart: '',
        loansLeasesGrowthBarChart: '',
        depositGrowthBarChart: '',
        equityGrowthBarChart: '',
        loadCompositionStackChart: '',
        depositCompositionStackChart: ''
    };
}]);