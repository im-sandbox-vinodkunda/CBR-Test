cbrBankAnalyticsModule.directive('modal', function () {
    return {
        template: '<div class="modal fade" style="{{functionThatReturnsStyle()}}">' +
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

cbrBankAnalyticsModule.filter("trust", ['$sce', function ($sce) {
    return function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
}]);

cbrBankAnalyticsModule.controller("bankAnalyticsTabs", ["$scope", "$q", "$http", "$location", "$routeParams", "$window", "$rootScope", "dialogs", function ($scope, $q, $http, $location, $routeParams, $window, $rootScope, dialogs) {
    $rootScope.template = 'bankAnalyticsDashboard';
    $rootScope.ShowBankProfileForInstitutionKey = 0;
    $scope.showSuccessMessageModal = false;
    $scope.showDashboardErrorMessageModal = false;
    $scope.SuccessMessageText = '';
    $scope.ErrorMessageText = '';
    $scope.title = '';
    $scope.showSingleBankProfileHelpModal = false;
    $scope.CapitalCount = 0;
    $scope.StrategyCount = 0;
    $scope.ErmCount = 0;
    $scope.NewsAndEvents = [];
    $scope.Blogs = [];

    $scope.InstitutionPeerGroup = '';
    $scope.InstitutionState = '';
    $scope.InstitutionRegion = '';
    $scope.InstitutionPeerGroupKey = '';
    $scope.InstitutionName = '';
    $scope.InstitutionAssetSize = '';
    $scope.CertNumber = '';
    $scope.HeadQuarters = '';
    $scope.BhcName = '';
    $scope.StockTicker = '';
    $scope.StockTickerDisplay = '';
    $scope.NumberOfBranches = '';
    $scope.FtEmployees = '';
    $scope.SubchapterS = '';
    $scope.Institutions = [];
    $scope.DefaultBank = {};
    $scope.SelectedBank = "Select Bank";
    $scope.SelectedBankKey = -1;
    $scope.SelectedTab = 'Overall';
    $scope.SelectedDataType = 'Rankings';
    $scope.IndexView = true;
    $scope.AgrView = false;
    $scope.RoaaView = false;
    $scope.RoaeView = false;
    $scope.NimView = false;
    $scope.ErView = false;
    $scope.NpaView = false;
    $scope.NibdView = false;
    $scope.NiiView = false;
    $scope.isRatioDisabled = true;
    $scope.trusted_html_variable = '';
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

    //Risk Radar
    $scope.RRSelectedBank = "Select Bank";
    $scope.RRSelectedBankKey = -1;
    $scope.RRSelectedDataType = 'QTD';
    $scope.YtdRRTableHeaders = [];
    $scope.QtrRRTableHeaders = [];
    $scope.RRTableHeaders = [];
    $scope.RRHeaderScoreInformation = [];
    $scope.RRHeaderScoreBgrdCellcolor = [];
    $scope.RRKRIValues = [];
    $scope.RiskRadarData = [];
    $scope.RRInstitutionAssetSize = '';
    $scope.RRInstitutionPeerGroup = '';
    $scope.RRInstitutionState = '';
    // $scope.RRInstitutionRegion = '';
    $scope.rssd = -1;
    $scope.Regulator = '';


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

    var getUserRolesProfile = function (userKey) {
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
                    dlg = dialogs.error('Invalid user key specified or user roles missing. Please send an e-mail to admin@cb-resource.com.');
                }
                else {
                    $scope.UserRoles = result.data;
                    getAccountsModuleAccessState();
                }
            }
        },
            function () {
                dlg = dialogs.error('An error occurred while trying to get user profile. Please send an e-mail to admin@cb-resource.com.');

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

    var htmlToInsert = '<div class="quotehead-container">\
                        <div data-qmod-tool="quotehead" data-qmod-params=\'{ "lang": "en", "showLogo": false, "lowHigh": false, "symbol": "StockTicker" }\' class="qtool">\
                        </div>\
                    </div>\
                    <div class="smart-lookup-container">\
                        <div data-qmod-tool="smartsymbollookup"\
                             data-qmod-params=\'{ "callbackurl": "?qm_symbol=", "search": "symbol", "placeholderText": "Get a Quote", "symbology": "US" } \'\
                             class="qtool"></div>\
                    </div>\
                    <div class="interactive-charts-container">\
                        <div data-qmod-tool="interactivechart"\
                             data-qmod-params=\'{ "chart": { "colors": ["#003057", "#ff3900", "#00b655", "#ff9000", "#717171", "#8085e9"], "upColor": "#008000", "downColor": "#ff0000", "chartType": "1" }, "volumeEnabled": false, "chartTypeEnabled": false, "marketSessionEnabled": false, "adjTypeEnabled": false, "compareOptionsEnabled": false, "compareEnabled": false, "eventsEnabled": false, "dateRange": 3, "marketSession": 0, "compareOption": 0, "adjType": 0, "lang": "en", "symbol": "StockTicker1"}\'\
                             class="qtool"></div>\
                    </div>';

    var howToUseB2B = '<h4>How to Use Our Applications – <strong>Bank vs. Bank Analyzer</strong></h4>\
<p>1.	From Home Page click <strong>BankAnalytics</strong> – will arrive at the <strong>BankAnalytics Dashboard</strong></p>\
<p>2.	From the <strong>BankAnalytics Dashboard</strong> click <strong>Bank vs. Bank Analyzer</strong>.</p>\
<p>a.	This report allows you to view your default bank Income Statement and Balance Sheet data versus up to 5 additional banks.  You can also combine your bank with another bank for basic M&A analysis.</p>\
<p>3.	Your Bank/Default Bank information will automatically populate the data fields in the <strong>Default Bank</strong> column, with Income Statement being the default report view.</p>\
<p>4.	Select additional banks by clicking the <strong>Select a Bank</strong> drop-down arrow under the Bank 1-5 headers.</p>\
<p>a.	The list of banks available in the Select a Bank drop-down will depend on the banks previously saved in <strong>Favorite Banks</strong> (see <strong>How to Find or Search for a Bank</strong> help link, section 2.d.2.)  The simple directions to add a bank to Favorite Banks:</p>\
<p>i.	From the Dashboard click on "Manage Profiles"</p>\
<p>ii.	From Manage Profiles click on "Find a Bank"</p>\
<p>iii.	Search one of the banks that you want to have available for comparison</p>\
<p>iv.	Click the "Add to Favorites" button on the right side of the page</p>\
<p>v.	Repeat as necessary</p>\
<p>5.	To combine the Default Bank with one of the other selected banks, click the Select a Bank drop-down under the <strong>Combined Banks</strong> column.</p>\
<p>a.	This feature simply adds the Default Bank data to the selected bank for a basic M&A look at the combined banks Income Statement and/or Balance Sheet.</p>\
<p>6.	Viewing options:</p>\
<p>a.	Switch between Income Statement and Balance Sheet by selecting either link on the top left side of the screen, under the DASHBOARD/B2B ANALYZER tabs.</p>\
<p>b.	Switch between dollars ($000) and ratios (%), with the <strong>Dollars $000 / Ratios 0.00%</strong> toggle on the top right side of the screen</p>\
<p>c.	Change YTD data by quarter by selecting the desired quarter from the <strong>Period</strong> drop-down box on the top right side of the screen</p>\
<p>d.	Can hide columns based on the number of optional banks selected</p>\
<p>7.	Export data to excel by clicking the <strong>Export Data</strong> button on the top of the screen</p>\
<p>a.	Can either export dollar amounts ($ 000) or ratios (%) to excel.  The active selection will be exported to excel.</p>\
<p>b.	Both the Income Statement and Balance Sheet will be exported</p>\
<p>c.	3 separate tabs will be exported:</p>\
<p>i.	Information – shows data selected; Amount/Ratios; Period; Banks</p>\
<p>ii.	Income Statement – either amounts or ratios</p>\
<p>iii.	Balance Sheet – either amounts or ratios</p>';



    var keyRiskTrendsHelpContent = '<h4>How to Use Our Applications – <strong>Key Risk Trends</strong></h4>\
<p>1.	From Home Page click <strong>BankAnalytics</strong> – Here you will arrive at the <strong>BankAnalytics Dashboard</strong></p>\
<p>2.	From the <strong>BankAnalytics Dashboard</strong> click <strong>Key Risk Trends.</strong></p>\
<p>a.	This report allows you to compare a Bank to a Custom peer group and to its UBPR assigned peer group.</p>\
<p>3.	Your Bank/Default Bank information will automatically populate the data fields and charts.</p>\
<p>a.	There is a Quarter-to-Date (<strong>QTD</strong>) and Year-to-Date (<strong>YTD</strong>) tab (upper-right side of the page, in the Chart box) that can be selected to change the data view.</p>\
<p>1.	<strong>QTD</strong> shows a rolling 5 quarters of data.</p>\
<p>2.	<strong>YTD</strong> shows a rolling 5 years of data, with current year being in one of 4 different states, YYYYQ1, YYYYQ2, YYYYQ3 or FY (Depending on the most recent data submitted to the FFIEC).</p>\
<p>4.	You can change the Risk Category and data points by selecting the links at the top left of the page; <strong>Credit Risk</strong> (40 data points), <strong>Interest Rate Risk</strong> (51), <strong>Liquidity & Price Risk</strong> (11), and <strong>Strategic Risk</strong> (26).</p>\
<p>5.	The data in the tables on the left side of the page are for the Quarter (<strong>QTD</strong>) or the current Year (<strong>YTD</strong>).</p>\
<p>a.	<strong>BANK</strong> – Your Bank/Default Bank data or another Bank since you can change this in the page at any time.</p>\
<p>1.	To change <strong>BANK</strong>, select the <strong>View a Different Bank</strong> dropdown on the upper-right of the page, and select a listed Bank.  Only Bank’s previously saved as a <strong>Favorite Bank</strong> will be listed here.</p>\
<p>b.	<strong>PEER 1</strong> – Custom peer group – which can be Default, or non-default since you can change this in the page at any time.</p>\
<p>1.	To change <strong>PEER 1</strong>, select the <strong>Change Peer Group</strong> dropdown on the upper-right of the page, and select one of the previously created custom peer groups.  Peer 1 will now reflect data for the newly selected peer group.</p>\
<p>c.	<strong>PEER 2</strong> – the UBPR peer group assigned to the <strong>BANK</strong> being reviewed.</p>\
<p>6.	The data in the <strong>Chart, Peer Group Comparison Table</strong>, and <strong>Custom Peer Group Ranking Table</strong> on the right side of the page, reflects the data from the selected row from the Risk table on the left side of the page.</p>\
<p>a.	Chart (defaults to <strong>Net Loans & Leases / Total Assets (%)</strong>) data shows 5 Quarters or 5 Years of data for each of the groups – <strong>BANK</strong>, <strong>PEER 1</strong>, <strong>PEER 2</strong>.  With the <strong>BANK</strong> shown as the Blue bars, <strong>PEER 1</strong> shown as the Green line, <strong>PEER 2</strong> shown as the Red line.</p>\
<p>b.	<strong>Peer Group Comparison Table</strong> shows the summary of the charted data points for each of the Bank and Peer Groups.</p>\
<p>c.	<strong>Custom Peer Group Ranking Table</strong> shows the 5 period data points for each of the banks in the <strong>PEER 1</strong> peer group listing.  Ranked in order for the current period from Best to Worst.</p>\
<p>d.	To change the data point that is shown in the Chart and Tables on the right side of the page, click in any part of the row of the desired data point in the table on the left side of the page.</p>\
<p>1.	The default selection is <strong>Net Loans & Leases / Total Assets (%)</strong>; to move to <strong>Texas Ratio (%)</strong> as an example, select anywhere in that row, from <strong>Texas Ratio (%)</strong> through the <strong>PEER 2</strong> number.</p>\
<p>7.	To view any of the Banks listed in the <strong>Custom Peer Group Ranking Table</strong>, click the Bank name (<strong>Institution Name</strong> column) and you will be re-directed to the <strong>Single Bank Profile</strong> for that specific Bank.</p>';

    var howToFindABankHelpContent = '<h3>How to Find a Bank</h3>\
<p>1.	From Home Page click <strong>BankAnalytics</strong>. Here, will arrive at the <strong>BankAnalytics Dashboard</strong></p>\
<p>2.	There are 3 ways to find/search for a Bank from this point.</p>\
<p>a.	<strong>Option 1</strong>: From the <strong>BankAnalytics Dashboard</strong> click <strong>Manage Profiles</strong> (in green box on right hand side of dashboard).</p>\
<p>b.	From <strong>Manage Profiles</strong> page click <strong>Find a Bank</strong> (under MANAGE PROFILES tab).</p>\
<p>c.	In the <strong>Search</strong> box, type the <strong>Bank Name, State, or FDIC Number</strong>.</p>\
<p>1.	For Name or State searches, the search will begin as soon as the first letter is typed. Be as specific as possible to keep the <strong>Results</strong> list short.</p>\
<p>2.	For FDIC Number searches, the search requires the full FDIC Number for the <strong>Results</strong> list to populate.</p>\
<p>d.	When the Bank you are searching for is found, you can:</p>\
<p>1.	Click the Bank Name, which will open the Bank in the <strong>Single Bank Profile</strong> view, or</p>\
<p>2.	Select the + <strong>Add to Favorites</strong> button, on the right side of the screen.  This will add the selected bank to your <strong>Favorite Banks</strong> list.</p>\
<p>e.	<strong>Option 2</strong>: From the <strong>BankAnalytics Dashboard</strong> click <strong>Manage Profiles</strong> (in green box on right hand side of dashboard).</p>\
<p>f.	From Manage Profile page click <strong>Create New Peer Group</strong> (small green box in right-hand corner).</p>\
<p>g.	In the left-hand box under "Bank Find" select your search criteria. You can <strong>Search for a bank name</strong>, and/or choose a <strong>State (Location</strong> drop down list), an <strong>Asset Range (Asset Size</strong> drop down list), a <strong>Corporation Type (If you do not select a filter, the entire list will be produced</strong> – i.e. if no State selected, all States will be searched, no Asset Range selected, all ranges will be searched, no Corporation Type selected, all Corporate Types will be searched)</p>\
<p>h.	After selecting your criteria click <strong>Search</strong></p>\
<p>i.	Your <strong>Search</strong> results will be reflected on screen. The list will include: <strong>Institution Name</strong>, FDIC Cert number, RSSD number, Sub-S?, City, State, Assets and Selection Box.</p>\
<p>j.	When the Bank you are searching for is found, you can:</p>\
<p>1.	Click the Bank Name, which will open the Bank in the <strong>Single Bank Profile</strong> view, or</p>\
<p>2.	Click the check box on the right side to Select the Bank for your new Peer Group.</p>\
<p>k.	<strong>Option 3</strong>: From the <strong>BankAnalytics Dashboard</strong> click <strong>Performance Analyzer</strong>. </p>\
<p>1.	In the <strong>Search</strong> box on the right side of the screen, <strong>Enter an FDIC Certificate Number to view a different bank</strong>.</p>\
<p>2.	Enter the full FDIC Number of the Bank and click the search button (magnifying glass icon).</p>\
<p>3.	The Bank Name and data will populate the <strong>Performance Analyzer</strong> tab.</p>\
<p>4.	From this point, you can either (select boxes under the name of the bank):</p>\
<p>1.	<strong>View Profile</strong> – which takes you to the <strong>Single Bank Profile</strong>, or</p>\
<p>2.	<strong>Add to Favorites</strong> – which will add the Bank to your <strong>Favorite Banks</strong> list.</p>';

    var singleBankHelpContent = '<h4>How to Use Our Applications – <strong>Single Bank Profile</strong></h4>\
                        <p>1. From Home Page click <strong>BankAnalytics</strong>.<br />Here, you will arrive at the <strong>BankAnalytics Dashboard</strong></p>\
                        <p>2.	From the <strong>BankAnalytics Dashboard</strong> click <strong>Single Bank Profile</strong>. This report allows you to view a rolling 5 Years or 5 Quarters of data for a specific Bank for 31 key data points.</p>\
                        <p>3.	Your Bank/Default Bank information will automatically populate the data fields and charts.There is a Quarter-to-Date (<strong>QTD</strong>) and Year-to-Date (<strong>YTD</strong>) tab (upper-left side of the page) that can be selected to change the data view.</p>\
                        <p>1.	<strong>QTD</strong> shows a rolling 5 quarters of data.</p>\
                        <p>2.	<strong>YTD</strong> shows a rolling 5 years of data, with current year being in one of 4 different states, YYYYQ1, YYYYQ2, YYYYQ3 or FY (Depending on the most recent data submitted to the FFIEC).</p>\
                        <p>4.	Data points for 5 period analysis include, <strong>Balance Sheet</strong> (6), <strong>Income Statement</strong> (6), <strong>Earnings and Performance</strong> (4), <strong>Asset Quality</strong> (6), <strong>Capital Ratios</strong> (4), and <strong>Liquidity</strong> (5).</p>\
                        <p>5.	Charted data with 5 period analysis include, <strong>Asset Growth Rate, Loans & Leases Growth Rate, Deposit Growth Rate, Bank Equity Capital Growth Rate, Loan Composition, and Deposit Composition</strong>.</p>\
                        <p>6.	To Print the web page, click the <strong>PDF</strong> icon on the upper-right side of the page.</p>\
                        <p>7.	To View the Bank’s website, click the <strong>Web Site</strong> hyperlink on the upper-right side of the page.</p>\
                        <p>8.	To Change Banks viewed in the <strong>Single Bank Profile</strong> from any of the other Dashboard tools, click on any Bank name that has a hyperlink.</p>\
                        <p>a.	From <strong>Key Risk Trends</strong>, select a bank from the <strong>Custom Peer Group Ranking Table</strong>.</p>\
                        <p>b.	From <strong>Performance Analyzer</strong>, select a bank from the <strong>Top Performing Banks</strong> list, or from the <strong>Bottom Performing Banks</strong> list.</p>\
                        <p>c.	From <strong>Benchmark Performance</strong>, select a bank from the <strong>Custom Peer Group Ranking Table</strong> (same as from <strong>Key Risk Trends</strong>).</p>\
                        <p>d.	From <strong>Manage Profiles</strong>, click the <strong>Favorite Banks</strong> link at the top of the page</p>\
                        <p>1.	Choose the Bank, then click the <strong>View Profile</strong> button on the right side of the page.</p>';

    var performanceAnalyzerHelpContent = '<h4>How to Use Our Applications – <strong>Performance Analyzer</strong></h4>\
<p>1.	From Home Page click <strong>BankAnalytics</strong><br />Here will arrive at the <strong>BankAnalytics Dashboard</strong></p>\
<p>2.	From the <strong>BankAnalytics Dashboard</strong> click <strong>Performance Analyzer</strong>.</p>\
<p>a.	This report lets you compare the Your Bank, the Default Bank or another Bank to the Top and Bottom performers using 10 Key Performance Indicators (KPI).</p>\
<p>3.	Your Bank/Default Bank information will automatically populate the data fields and charts as the <strong>Bank</strong> information.</p>\
<p>a.	The default <strong>Search</strong> is:</p>\
<p>1.	<strong>State</strong> = State of Your Bank/Selected Bank.</p>\
<p>2.	<strong>Asset Size</strong> = All Banks</p>\
<p>3.	<strong>Percentile</strong> = Top/Bottom 10%</p>\
<p>4.	<strong>Search</strong> can be changed based on these 3 categories and choosing from the items in the dropdown menus for each.</p>\
<p>5.	You can save each individual search by clicking the <strong>+SAVE FAVORITE SEARCH</strong> hyperlink in the top right side of the page.	</p>\
<p>a)	All saved searches can be used/found in the <strong>SAVED SEARCHES</strong> dropdown list in the upper left side of the page.</p>\
<p>4.	Comparison is between the Bank and the <strong>Top Performing Banks</strong> and <strong>Bottom Performing Banks</strong>, based on the criteria selected.</p>\
<p>a.	<strong>Top Variance</strong> is calculated by this formula: Bank % - Top % for all KPIs, except <strong>Non-Performing Assets / Total Assets (%)</strong> and <strong>Efficiency Ratio (%)</strong>.  Here the <strong>Top Variance</strong> is calculated by Top % - Bank % (this is because the lower ratio is desired for these 2 KPIs).</p>\
<p>b.	<strong>Bottom Variance</strong> is calculated by the same formulas as above, replacing Bottom % in the place of Top %.</p>\
<p>5.	The <strong>Chart, Top Performing Banks</strong> table and <strong>Bottom Performing Banks</strong> table on the right side of the page, all reflect data from the selected KPI in the table on the left side of the page.  It defaults to <strong>Asset Growth Rate (YTD) (%)</strong>, since this is the first KPI listed.</p>\
<p>a.	To Change the KPI data in the Chart and Tables on the right, select the KPI name in the left side table.  All data will adjust accordingly in the Chart and Tables.</p>\
<p>6.	To <strong>Export</strong> the data in the Tables to Excel, click the <strong>Export Data</strong> hyperlink on the upper-right side of the page.</p>\
<p>a.	The Excel export will include 4 individual tabs; <strong>Summary, Key Performance Indicators</strong> table, <strong>Top Performing Banks</strong> table, and <strong>Bottom Performing Banks</strong> table – for the KPI that is active.</p>\
<p>b.	One export file will contain the Top and <strong>Bottom Performing Banks</strong> for a single KPI.</p>\
<p>7.	To change Banks in the <strong>Performance Analyzer</strong> tables, enter an FDIC number in the <strong>Enter an FDIC Certificate Number to view a different bank</strong> box in the top right of the page.  Click or select the magnifying glass icon/box to search and update.</p>\
<p>8.	To view the <strong>Single Bank Profile</strong> of the selected Bank, click the <strong>View Profile</strong> button under the Bank name at the top left of the page.</p>\
<p>9.	To add the selected Bank to your <strong>Favorite Banks</strong> list, click the <strong>Add to Favorites</strong> button under the Bank name at the top left of the page.</p>';

    var benchmarkPerformanceHelpContent = '<h4>How to Use Our Applications – <strong>Benchmark Performance</strong></h4>\
<p>1.	From Home Page click <strong>BankAnalytics</strong> – Here will arrive at the <strong>BankAnalytics Dashboard</strong></p>\
<p>2.	From the <strong>BankAnalytics Dashboard</strong> click <strong>Benchmark Performance</strong>.</p>\
<p>a.	This report allows you to compare a Bank to a Custom peer group and to its UBPR assigned peer group, like <strong>Key Risk Trends.</strong>  But, with the added functionality of adding a Benchmark target.  You can see how each data point compares to your internally set Benchmark.</p>\
<p>3.	Your Bank/Default Bank information will automatically populate the data fields and charts.</p>\
<p>a.	There is a Quarter-to-Date (<strong>QTD</strong>) and Year-to-Date (<strong>YTD</strong>) tab (upper-right side of the page, in the Chart box) that can be selected to change the data view.</p>\
<p>1.	<strong>QTD</strong> shows a rolling 5 quarters of data.</p>\
<p>2.	<strong>YTD</strong> shows a rolling 5 years of data, with current year being in one of 4 different states, YYYYQ1, YYYYQ2, YYYYQ3 or FY (Depending on the most recent data submitted to the FFIEC).</p>\
<p>4.	There are 2 functions available when using the Benchmarking capabilities.</p>\
<p>a.	<strong>Benchmark</strong> is the Target amount or percentage that you want your data point to achieve.  This number would be placed in the box to the right of the data point under the <strong>Chart with Upward Arrow</strong> header.  When the data point is equal to or better than the Benchmark, the dot to the right of the Benchmark will be <strong style="color:GREEN;">Green</strong>.  When the data point is worse than the Benchmark, the dot will be <strong style="color:RED;">Red</strong>.</p>\
<p>1.	For Benchmarks where Higher is better, if the <strong>BANK</strong> number is greater than or equal to the Benchmark, then the dot will be <strong style="color:GREEN;">Green</strong>.  If the <strong>BANK</strong> number is less than the Benchmark, then the dot will be <strong style="color:RED;">Red</strong>.  The opposite holds true when Lower is better versus the Benchmark.</p>\
<p>2.	Example:  <strong>Net Loans & Leases / Total Assets (%)</strong> where Benchmark = 70% and the Higher % is better.  </p>\
<p>a)	When <strong>BANK</strong> = 70% or higher, the dot is <strong style="color:GREEN;">Green</strong>.</p>\
<p>b)	When <strong>BANK</strong> = less than 70%, the dot is <strong style="color:RED;">Red</strong></p>\
<p>3.	Example:  Non-Performing Assets / Total Assets (%) where Benchmark = 0.50% and the Lower % is better.</p>\
<p>a)	When Bank = 0.50% or lower, the dot is <strong style="color:GREEN;">Green</strong>.</p>\
<p>b)	When Bank = greater than 0.50%, the dot is <strong style="color:RED;">Red</strong>.</p>\
<p>b.	Threshold % can be set between 0 – 100.  It is used when the data point number is worse than the Benchmark, it creates a range of acceptability near the Benchmark target.  If the data point number is worse than target, but within this specified range, then the dot to the right of the Benchmark target will be <strong style="color:#F4D00c;">Yellow</strong>.</p>\
<p>1.	Using the same Net Loans & Leases example above, when the Threshold is set at 5%, then:</p>\
<p>a)	When <strong>BANK</strong> = 70% or higher, the dot is <strong style="color:GREEN;">Green</strong> (no change).</p>\
<p>b)	When Bank = less than 70% to 66.5%, the dot is <strong style="color:#F4D00c;">Yellow</strong>.</p>\
<p>c)	When Bank = less than 66.5%, the dot is <strong style="color:RED;">Red</strong>.</p>\
<p>2.	Using the same Non-Performing Assets example above, when the Threshold is set at 5%, then:</p>\
<p>a)	When Bank = 0.50% or lower, the dot is Green (no change).</p>\
<p>b)	When Bank = greater than 0.50% to 0.525%, the dot is <strong style="color:#F4D00c;">Yellow</strong>.</p>\
<p>c)	When Bank = greater than 0.525%, the dot is <strong style="color:RED;">Red</strong>.</p>\
<p>5.	The <strong>Threshold %</strong> and <strong>Benchmark number</strong> will remain the same between the <strong>QTD</strong> and <strong>YTD</strong> selections.</p>\
<p>6.	You can turn the <strong>PEER 1</strong> and <strong>PEER 2</strong> selections <strong>ON</strong> or <strong>OFF</strong>.  To compare the <strong>BANK</strong> number directly/ or next to the Benchmark, you would need to click <strong>PEER 1</strong> to OFF and <strong>PEER 2</strong> to OFF.  Next to each Peer group description in the top right hand side of the page, there is a <strong>ON</strong>/<strong>OFF</strong> toggle switch.  Each switch is separate, so you can select ON or <strong>OFF</strong> as needed.</p>\
<p>7.	You can change the Risk Category and data points by selecting the links at the top left of the page; <strong>Credit Risk</strong> (40 data points), <strong>Interest Rate Risk</strong> (51), <strong>Liquidity & Price Risk</strong> (11), and <strong>Strategic Risk</strong> (26).</p>\
<p>8.	The data in the tables on the left side of the page are for the current Quarter (<strong>QTD</strong>) or the current Year (<strong>YTD</strong>).</p>\
<p>a.	<strong>BANK</strong> – Your Bank/Default Bank data or another Bank since you can change this in the page at any time.</p>\
<p>1.	To change <strong>BANK</strong>, select the <strong>View a Different Bank</strong> dropdown on the upper-right of the page, and select a listed Bank.  Only Bank’s previously saved as a <strong>Favorite Bank</strong> will be listed here.</p>\
<p>b.	<strong>PEER 1</strong> – Custom peer group – which can be Default, or non-default since you can change this in the page at any time.</p>\
<p>1.	To change <strong>PEER 1</strong>, select the <strong>Change Peer Group</strong> dropdown on the upper-right of the page, and select one of the previously created custom peer groups.  Peer 1 will now reflect data for the newly selected peer group.</p>\
<p>c.	<strong>PEER 2</strong> – the UBPR peer group assigned to Your Bank or the Default Bank</p>\
<p>9.	The data in the <strong>Chart, Peer Group Comparison Table</strong>, and Custom Peer Group Ranking Table</strong> on the right side of the page, reflects the data from the selected row from the Risk table on the left side of the page.</p>\
<p>a.	Chart (defaults to <strong>Net Loans & Leases / Total Assets (%)</strong>) data shows 5 Quarters or 5 Years of data for each of the groups – <strong>BANK</strong>, <strong>PEER 1</strong>, <strong>PEER 2</strong>.  With the <strong>BANK</strong> shown as the Blue bars, <strong>PEER 1</strong> shown as the Green line, <strong>PEER 2</strong> shown as the Red line.</p>\
<p>b.	<strong>Peer Group Comparison Table</strong> shows the summary of the charted data points for each of the Bank and Peer Groups.</p>\
<p>c.	<strong>Custom Peer Group Ranking Table</strong> shows the 5 period data points for each of the banks in the <strong>PEER 1</strong> peer group listing.  Ranked in order for the current period from Best to Worst.</p>\
<p>d.	To change the data point that is shown in the Chart and Tables on the right side of the page, click in any part of the row of the desired data point in the table on the left side of the page.</p>\
<p>1.	The default selection is <strong>Net Loans & Leases / Total Assets (%)</strong>; to move to <strong>Texas Ratio (%)</strong> as an example, select anywhere in that row, from <strong>Texas Ratio (%)</strong> through the <strong>PEER 2</strong> number.</p>\
<p>10.	To view any of the Banks listed in the <strong>Custom Peer Group Ranking Table</strong>, click the Bank name and you will be re-directed to the <strong>Single Bank Profile</strong> for that specific Bank.</p>';

    var buildPeerGroupsHelpContent = '<h3>How to Create A Custom Peer Group</h3>\
<p>1.	From Home Page click <strong>BankAnalytics</strong> – Here will arrive at the <strong>BankAnalytics Dashboard</strong></p>\
<p>2.	From the <strong>BankAnalytics Dashboard</strong> click <strong>Manage Profiles</strong> (in green box on right hand side of dashboard).</p>\
<p>3.	From Manage Profile page click <strong>Create New Peer Group</strong> (small green box in right-hand corner).</p>\
<p>4.	You have two choices when creating a peer group:</p>\
<p>a.	<strong>Choice 1</strong>: In the left-hand box under “Bank Find” select your search criteria.  You can <strong>Search for a bank name</strong>, and/or choose a <strong>State (Location</strong> drop down list), an <strong>Asset Range (Asset Size</strong> drop down list), a <strong>Corporation Type (If you do not select a filter, the entire list will be produced –</strong> i.e. if no State selected, all States will be searched, no Asset Range selected, all ranges will be searched, no Corporation Type selected, all Corporate Types will be searched)</p>\
<p>b.	After selecting your criteria click <strong>Search</strong></p>\
<p>c.	Your <strong>Search</strong> results will be reflected on screen.  The list will include: <strong>Institution Name</strong>, FDIC Cert number, RSSD number, Sub-S?, City, State, Assets and Selection Box.</p>\
<p>d.	You have two options from here to create your custom peer group:</p>\
<p>1.	<strong>Option 1</strong>: From the <strong>Results</strong> pull down on the right, select <strong>ALL</strong></p>\
<p>2.	Click on the <strong>Box</strong> next to each bank that you want to be in your peer group (a check mark will be placed in the box).  </p>\
<p>3.	<strong>PLEASE NOTE THAT THERE IS A MAXIMUM OF 19 BANKS PER PEER GROUP</strong>.</p>\
<p>4.	After you have completed your bank selections, create a peer group name by typing it in the <strong>Peer Group Name</strong> box located upper right corner next to the peer list.</p>\
<p>5.	After you have typed your Peer Group Name, you have an option to save this group as your “Default” peer group.  Click <strong>Save Peer Group</strong>.</p>\
<p>6.	The Peer Group will be created (this may take a moment).  Once created, your screen will list your new peer group under the <strong>Peer Groups</strong> tab.</p>\
<p>1.	<strong>Option 2 Excel Export</strong>:  You may want to conduct some additional analysis prior to creating your custom peer group.  Under this option, <strong>follow steps a. – c</strong>.</p>\
<p>2.	From here you may export the entire list of banks in your search.  Click <strong>Export Entire List</strong>.  The entire list will be downloaded and appear in the lower left hand corner of your browser.  Click the <strong>Excel link</strong> when it appears.</p>\
<p>3.	The downloaded list allows you to conduct additional analysis when selecting your peers.  The list includes: bank name, FDIC number, RSSD number, City, State, Sub S?, Asset Size, Number of Branches, Date Established, Number of Employees, County, Asset Growth Rate, Non Performance Asset percent, Non-Interest Bearing Deposits percentage, ROAA, ROAE, Net Interest Margin, Efficiency Ratio, Non-Interest Income percentage.</p>\
<p>4.	After you have selected your peers, either delete non-selected banks or rank your selections in a way that they are in sequential order.  </p>\
<p>5.	<strong>Cut & Paste</strong>: highlight (select) the RSSD number of each of your selected peers. <strong>Copy</strong> this row of RSSD numbers.</p>\
<p>6.	Return to BankAnalytics page, click <strong>Create New Peer Group</strong> </p>\
<p>7.	Paste RSSD numbers into <strong>Quick Start Window</strong></p>\
<p>8.	After you have pasted RSSD numbers, create a peer group name by typing it in the <strong>Peer Group Name</strong> box located below Quick Start Window.</p>\
<p>9.	After you have typed your Peer Group Name, you have an option to save this group as your “Default” peer group.  Click <strong>Save Peer Group</strong>.</p>\
<p>10.	The Peer Group will be created (this may take a moment).  Once created, your screen will list your new peer group under the <strong>Peer Groups</strong> tab.</p>\
<p>e.	Choice 2: If you have a list of banks and their RSSD numbers, you can go straight to <strong>Quick Start</strong></p>\
<p>f.	Follow instructs 7 thru 10 above</p>';

    var ratioDefinitionHelpContent = '<p><strong><u>RATIO DEFINITIONS</u></strong></p>\
<p><strong>1-4 Family Construction Loans / Average Gross Loans &amp; Leases</strong>:&nbsp; Construction loans secured by 1-4 family properties divided by average gross loans and leases.</p>\
<p><strong>1-4 Family Residential Loans / Average Gross Loans &amp; Leases</strong>:&nbsp; 1-4 family residential mortgages divided by average gross loans and leases.</p>\
<p><strong>Agricultural Production Loans / Average Gross Loans &amp; Leases</strong>:&nbsp; Loans to Finance agricultural production and other loans to farmers, divided by average gross loans and leases.</p>\
<p><strong>All Common &amp; Preferred Capital / Average Total Assets</strong>:&nbsp; Average of all preferred and common stock, surplus, undivided profits and capital reserves, and cumulative foreign currency translation adjustments, divided by average total assets.</p>\
<p><strong>All NOW &amp; ATS Accounts / Average Total Assets</strong>:&nbsp; Average NOW and ATS accounts divided by average total assets. This consists of all NOW accounts (including Super NOWs), plus other transaction accounts such as ATS accounts and certain accounts (other than MMDAs) that permit third party payments.</p>\
<p><strong>Assets Securitized or Sold with Recourse / Total Assets</strong>:&nbsp; Outstanding principal balance of assets securitized and/or sold with recourse or other seller-provided credit enhancements divided by total assets.</p>\
<p><strong>Available-For-Sale Securities / Average Total Assets</strong>:&nbsp; For March 31, 1994 and subsequent quarters, available-for-sale securities are shown.</p>\
<p><strong>Available-for-Sale Securities / Total Assets</strong>:&nbsp; Fair value of available-for-sale securities divided by assets.</p>\
<p><strong>Average Assets per Employee ($Million)</strong>:&nbsp; Average assets divided by the number of full-time equivalent employee on the payroll at the end of the period. Result is shown in millions of dollars.</p>\
<p><strong>Average Personnel Expense per Employee ($Thousand)</strong>:&nbsp; The average salary (including benefits) per employee expressed in thousands of dollars ($). For example, 21.35=$21,350 average salary (including benefits) per employee per year.</p>\
<p><strong>Cash Dividends / Net Income</strong>:&nbsp; Total of all cash dividends declared year-to-date divided by net income year-to-date. If net income is less than or equal to zero, NA is shown at this caption.</p>\
<p><strong>Commercial &amp; Industrial Loans / Average Gross Loans &amp; Leases</strong>:&nbsp; Commercial and industrial loans divided by average gross loans and leases.</p>\
<p><strong>Common Equity Tier 1 Capital Ratio</strong>:&nbsp; Common equity tier 1 capital as a percent of total risk-weighted assets.</p>\
<p><strong>Construction &amp; Land Development Loans (CLD) / Average Gross Loans &amp; Leases</strong>:&nbsp; Construction &amp; Development loans divided by average gross loans and leases.</p>\
<p><strong>Construction &amp; Land Development Loans / Total Risk-Based Capital</strong>:&nbsp; Construction and land development loans divided by total risk-based capital.</p>\
<p><strong>Construction, Land Development &amp; Other Land Loans / Total Risk-Based Capital</strong>:&nbsp; Construction, land development and other land loans divided by total risk-based capital.</p>\
<p><strong>Core Deposits / Average Total Assets</strong>:&nbsp; The sum of demand deposits, all NOW and ATS accounts, MMDA savings, other savings deposits, and time deposits under the deposit insurance limit less total brokered retail deposits divided by average total assets. Note that beginning with the March 31, 2010 UBPR time deposits under the deposit insurance limit includes total time deposits of less than $100M and total time deposits of $100M through $250M.</p>\
<p><strong>Cost of All Interest-Bearing Funds</strong>:&nbsp; Interest on all interest-bearing deposits in domestic offices, interest-bearing foreign office deposits, demand notes (note balances) issued to the U.S. Treasury, other borrowed money, subordinated notes and debentures, and expense on federal funds purchased and securities sold under agreements to repurchase, interest expense on mortgage and capitalized leases divided by the average of the liabilities or funds that generated those expenses.</p>\
<p><strong>Cost of All Other Time Deposits</strong>:&nbsp; Interest on all domestic time deposits of less than $100,000 and open-account time deposits of $100,000 or more, divided by the average of such deposits.</p>\
<p><strong>Cost of Federal Funds Purchased and Repos</strong>:&nbsp; The expense of federal funds purchased and securities sold under agreements to repurchase divided by the average of federal funds purchased and securities sold under agreements to repurchase.</p>\
<p><strong>Cost of Other Borrowed Money:</strong>&nbsp; Interest on demand notes (note balances) issued to the U.S. Treasury and on other borrowed money divided by the average of interest-bearing demand notes (note balances) issued to the U.S. Treasury and other liabilities for borrowed money.</p>\
<p><strong>Cost of Other Savings Deposits</strong>:&nbsp; For quarters from March 31 2001 forward includes interest on other savings deposits (all nontransaction accounts and time deposits) divided by the average of such deposits.</p>\
<p><strong>Cost of Subordinated Notes and Debentures</strong>:&nbsp; Interest on notes and debentures subordinated to deposits divided by the average of notes and debentures subordinated to deposits.</p>\
<p><strong>Cost of Time Deposits Over $100,000</strong>:&nbsp; Interest on time certificates of deposit of $100,000 or more issued by domestic offices divided by the average of domestic time certificates of deposit of $100,000 or more.</p>\
<p><strong>Demand Deposit Accounts / Average Total Assets</strong>:&nbsp; Average demand deposits divided by average total assets.</p>\
<p><strong>Efficiency Ratio</strong>:&nbsp; Total Overhead Expense expressed as a percentage of Net Interest Income plus Noninterest Income.</p>\
<p><strong>Federal Funds Purchased and Repos / Average Total Assets</strong>:&nbsp; Average federal funds purchased and securities sold under agreements to repurchase divided by average total assets.</p>\
<p><strong>Federal Funds Sold &amp; Resales / Average Total Assets</strong>:&nbsp; Average federal funds sold and securities purchased under agreements to resell divided by average total assets.</p>\
<p><strong>Growth Rates (Last Twelve Months)</strong>: The percentage is determined by subtracting the account balance of the corresponding reporting period in the previous year from the current period account balance and dividing the result by the previous year balance of the corresponding reporting period.</p>\
<p><strong>Held-to-Maturity Securities / Average Total Assets</strong>:&nbsp; For March 31, 1994 and subsequent quarters, held-to-maturity securities are included. For prior periods, total securities excluding trading assets are used.</p>\
<p><strong>Held-to-Maturity Securities / Total Assets</strong>: &nbsp;Amortized cost of held-to-maturity securities divided by assets.</p>\
<p><strong>Home Equity Loans / Average Gross Loans &amp; Leases</strong>:&nbsp; Home equity loans divided by gross loans and leases. Also included in 1-4 family residential.</p>\
<p><strong>Interest-Bearing Bank Balances / Average Total Assets</strong>:&nbsp; Average of all interest-bearing balances due from depository institutions divided by average total assets.</p>\
<p><strong>Liabilities Over 1 Year / Total Assets</strong>:&nbsp; Sum of repricings over 1 year for other borrowed money, time deposits less than $100,000 and time deposits of $100,000 or greater divided by assets.</p>\
<p><strong>Liabilities Over 3 Years / Total Assets</strong>:&nbsp; Sum of repricings over 3 years for other borrowed money, time deposits less than $100,000 and time deposits of $100,000 or greater divided by assets.</p>\
<p><strong>Liquidity Ratio</strong>: Includes the sum of cash and balances due from banks, securities, fed funds sold and repo&rsquo;s, and trading account assets less pledged securities divided by total liabilities.</p>\
<p><strong>Loan Loss Reserves / Total Loans &amp; Leases</strong>:&nbsp; Ending balance of the allowance for possible loan and lease losses divided by total loans and leases.</p>\
<p><strong>Loans &amp; Leases Held For Sale / Average Total Assets</strong>:&nbsp; Average loans and leases held for sale divided by average total assets.</p>\
<p><strong>Loans &amp; Securities less Liabilities Over 1 Year / Total Assets</strong>:&nbsp; Loans/Securities over 1 year less liabilities over 1 year divided by assets.</p>\
<p><strong>Loans &amp; Securities less Liabilities Over 3 Years / Total Assets</strong>:&nbsp; Loans/Securities over 3 years less liabilities over 3 years divided by assets.</p>\
<p><strong>Loans to Individuals / Average Gross Loans &amp; Leases</strong>:&nbsp; Other loans to individuals including single payment, installment loans divided by average gross loans and leases.</p>\
<p><strong>Money Market Deposit Accounts / Average Total Assets</strong>:&nbsp; The amount of MMDAs reported from Schedule RC-E divided by average total assets.</p>\
<p><strong>Mortgage Loans &amp; Pass-Through Securities 5-15 Years / Total Assets</strong>:&nbsp; Sum of repricings from 5 to 15 years for mortgage pass-through securities backed by closed-end first lien residential mortgages and closed end loans secured by liens on 1-4 family residential properties divided by total assets.</p>\
<p><strong>Mortgage Loans &amp; Pass-Through Securities Over 15 Years / Total Assets</strong>:&nbsp; Sum of repricings over 15 years for mortgage pass-through securities backed by closed-end first lien residential mortgages and closed end loans secured by liens on 1-4 family residential properties divided by total assets.</p>\
<p><strong>Mortgage Servicing Assets (Fair Value) / Tier One Capital</strong>:&nbsp; Fair value of mortgage servicing assets divided by tier one capital.</p>\
<p><strong>Mortgage Servicing Assets (Fair Value) / Total Assets</strong>:&nbsp; Fair value of mortgage servicing assets divided by assets.</p>\
<p><strong>Mortgage Servicing Assets / Total Bank Equity Capital</strong>:&nbsp; Mortgage servicing assets divided by total bank equity capital.</p>\
<p><strong>Multifamily Loans / Average Gross Loans &amp; Leases</strong>:&nbsp; Loans secured by multifamily (5 or more) residential properties divided by average gross loans and leases.</p>\
<p><strong>Net Charge-Offs / Average Total Loans &amp; Leases</strong>:&nbsp; Gross loan and lease charge-off, less gross recoveries (includes allocated transfer risk reserve charge-off and recoveries), divided by average total loans and leases.</p>\
<p><strong>Net Interest Income / Average Total Assets</strong>:&nbsp; Total interest income, plus the tax benefit on tax-exempt income, less total interest expense, divided by average assets.</p>\
<p><strong>Net Interest Margin</strong>:&nbsp; Total interest income on a tax-equivalent basis, less total interest expense, divided by the average of the respective asset accounts involved in generating interest income.</p>\
<p><strong>Net Loans &amp; Leases / Total Assets</strong>:&nbsp; Loans and lease-financing receivables net of unearned income and the allowance for possible loans and lease financing receivable losses divided by total assets.</p>\
<p><strong>Net Loans &amp; Leases / Total Deposits</strong>:&nbsp; Net loans, plus lease-financing receivables, divided by total deposits.</p>\
<p><strong>Net Loans &amp; Leases Growth Rate</strong>:&nbsp; Net Loans and Leases 12-month growth rate.</p>\
<p><strong>Net Non Core Funding Dependence $100,000</strong></p>\
<p><strong>Net Non Core Funding Dependence $250,000</strong>:&nbsp; Noncore liabilities less short term investments divided by long term assets. non core liabilities defined using deposit insurance limits for time deposits.</p>\
<p><strong>Net Operating Income / Average Total Assets</strong>:&nbsp; After tax net operating income, including securities gains or losses, (which does not include extraordinary gains or losses), divided by average assets.</p>\
<p><strong>Non-Farm Non-Residential Loans (NFNR) / Average Gross Loans &amp; Leases</strong>:&nbsp; Non-farm non-residential mortgages divided by average gross loans and leases.</p>\
<p><strong>Non-Interest Expense / Average Total Assets</strong>:&nbsp; Salaries and employee benefits, expenses of premises and fixed assets and other Noninterest expense divided by average assets.</p>\
<p><strong>Non-Interest Income / Average Total Assets</strong>:&nbsp; Income derived from bank services and sources other than interest-bearing assets, divided by average assets.</p>\
<p><strong>Non-Maturity Deposits / Total Assets</strong>:&nbsp; Demand deposits, NOW and ATS accounts, money market accounts and all other savings divided by assets.</p>\
<p><strong>Non-Maturity Deposits / Total Loans &amp; Securities over 3 Years</strong>:&nbsp; Non-maturity deposits divided by repricings over 3 years for loans and securities.</p>\
<p><strong>Non-Maturity Deposits less Loans &amp; Securities over 3 Years / Total Assets</strong>:&nbsp; Repricings over 3 years for loans and securities less non-maturity deposits divided by assets.</p>\
<p><strong>Non-Owner Occupied Commercial Real Estate / Total Loans &amp; Leases</strong>:&nbsp; The sum of construction &amp; land development loans, multifamily property loans, nonowner occupied nonfarm nonresidential property loans and loans to finance CRE not secured by real estate divided by total loans.</p>\
<p><strong>Non-Owner Occupied Commercial Real Estate / Total Risk-Based Capital</strong>:&nbsp; The sum of construction &amp; land development loans, multifamily property loans, nonowner occupied nonfarm nonresidential property loans and loans to finance CRE not secured by real estate divided by total risk-based capital.</p>\
<p><strong>Non-Performing Assets / Total Assets</strong>: The sum of loans and leases which are on nonaccrual status, past due 90 days or more, and non-investment other real estate owned as a percent of total assets.</p>\
<p><strong>Occupancy Expense / Average Total Assets</strong>:&nbsp; Occupancy expense divided by average assets. Occupancy expense includes expenses of premises and fixed assets (net of rental income).</p>\
<p><strong>Other Construction &amp; Land Development Loans / Average Gross Loans &amp; Leases</strong>:&nbsp; Other construction and land development loans divided by average gross loans and leases.</p>\
<p><strong>Other Loans &amp; Securities 5-15 Years / Total Assets</strong>:&nbsp; Sum of repricings from 5 to 15 years for securities issued by U.S. Treasury, agencies, state and political subdivisions and all loans and leases other than closed-end loans secured by first liens on 1-4 family residential properties divided by total assets.</p>\
<p><strong>Other Loans &amp; Securities Over 15 Years / Total Assets</strong>:&nbsp; Sum of repricings over 15 years for securities issued by U.S. Treasury, agencies, state and political subdivisions and all loans and leases other than closed-end loans secured by first liens on 1-4 family residential properties divided by total assets.</p>\
<p><strong>Other Mortgage-Backed Securities over 3 Years / Total Assets</strong>:&nbsp; Repricings over three years for other mortgage backed securities (including CMO\'s, REMIC\'s and stripped MBS) divided by assets.</p>\
<p><strong>Other Operating Expense (Including Intangibles) / Average Total Assets</strong>:&nbsp; Other operating expense (including intangibles) divided by average assets.</p>\
<p><strong>Other Real Estate Owned / Average Total Assets</strong>:&nbsp; Average real estate owned other than bank premises divided by average total assets.</p>\
<p><strong>Other Savings Deposits / Average Total Assets</strong>:&nbsp; Reported total savings deposits, less MMDAs divided by average total assets. This comprises all savings deposits other than MMDAs, and includes regular passbook accounts and overdraft protection plan accounts.</p>\
<p><strong>Owner Occupied Non-Farm Non-Residential Loans / Average Gross Loans &amp; Leases</strong>:&nbsp; Loans secured by owner occupied nonfarm nonresidential properties divided by gross loans and leases.</p>\
<p><strong>Personnel Expense / Average Total Assets</strong>:&nbsp; Personnel expense divided by average assets. Personnel expense includes salaries and employee benefits.</p>\
<p><strong>Pledged Securities / Total Securities</strong>:&nbsp; Pledged securities divided by total securities.</p>\
<p><strong>Provision for Loan &amp; Lease Losses / Average Total Assets</strong>:&nbsp; Provision for loan and lease receivables losses divided by average assets.</p>\
<p><strong>Realized Gains (Losses) on the Sale of Securities / Average Total Assets</strong>:&nbsp; Pretax net gains or losses from the sale, exchange, retirement, or redemption of securities not held in trading accounts divided by average assets.</p>\
<p><strong>Retained Earnings / Average Total Bank Equity Capital</strong>:&nbsp; Net income, less cash dividends declared, divided by average equity capital.</p>\
<p><strong>Return on Average Assets (ROAA)</strong>:&nbsp; Net income after securities gains or losses, extraordinary gains or losses, and applicable taxes divided by average assets.</p>\
<p><strong>Return on Average Equity (ROAE)</strong>:&nbsp; Net income divided by average of total bank equity capital.</p>\
<p><strong>Structured Notes / Tier One Capital</strong>:&nbsp; Structured notes (included in held-to-maturity and available-for-sale accounts) divided by tier one capital.</p>\
<p><strong>Structured Notes / Total Assets</strong>:&nbsp; Structured notes (included in held-to-maturity and available-for-sale accounts) divided by assets.</p>\
<p><strong>Texas Ratio</strong>:&nbsp; The sum of loans and leases which are on nonaccrual, restructured but 30-89 days past due, restructured but over 90 days past due, restructured and in compliance with modified terms and non-investment other real estate owned divided by the sum of total equity capital plus the allowance for possible loan and lease losses.</p>\
<p><strong>Tier 1 Leverage Ratio</strong>:&nbsp; Tier 1 (core) capital as a percent of average total assets for leverage capital purposes.&nbsp;</p>\
<p><strong>Tier 1 Risk-Based Capital Ratio</strong>:&nbsp; Tier 1 (core) capital as a percent of risk-weighted assets as defined by the appropriate federal regulator for prompt corrective action during that time period.</p>\
<p><strong>Tier 1 Capital Growth Rate (LTM)</strong>:&nbsp; Tier one capital 12-month growth rate.</p>\
<p><strong>Time Deposits Above Insurance Limit / Average Total Assets</strong>:&nbsp; Time deposits above the deposit insurance limit divided by average total assets.</p>\
<p><strong>Total 30-89 Days Past Due Loans &amp; Leases</strong>:&nbsp; Total loans and leases 30-89 days past due divided by total loans and leases.</p>\
<p><strong>Total 90+ Days Past Due Loans &amp; Leases</strong>:&nbsp; The sum of loans and lease financing receivables past due at least 90 days, and still in accrual status, divided by total loans and leases.</p>\
<p><strong>Total Assets Growth Rate (LTM)</strong>:&nbsp; Total assets 12-month growth rate.</p>\
<p><strong>Total Bank Equity Capital Growth Rate (LTM)</strong>:&nbsp; Total bank equity capital 12-month growth rate.</p>\
<p><strong>Total Brokered Deposits / Total Deposits</strong>:&nbsp; Total brokered deposits divided by total deposits</p>\
<p><strong>Total Charge-Offs / Average Total Loans &amp; Leases</strong>:&nbsp; Gross loan and lease losses divided by average total loans and leases.</p>\
<p><strong>Total Commercial Real Estate / Total Loans &amp; Leases</strong>:&nbsp; The sum of construction and land development loans, multifamily property loans, nonfarm nonresidential property loans, and loans to finance CRE not secured by real estate divided by total loans.</p>\
<p><strong>Total Commercial Real Estate / Total Risk-Based Capital</strong>:&nbsp; The sum of construction and land development loans, multifamily property loans, nonfarm nonresidential property loans, and loans to finance CRE not secured by real estate divided by total risk-based capital.</p>\
<p><strong>Total Deposits / Average Total Assets</strong>:&nbsp; Sum of all demand deposits, all NOW &amp; ATS accounts, money market deposit accounts, other savings deposits, time deposits at or below insurance limit, fully insured brokered deposits, time deposits above insurance limit, and deposits in foreign offices divided by average total assets.</p>\
<p><strong>Total Earning Assets / Average Total Assets</strong>:&nbsp; The sum of the averages for net loans and leases, held-to-maturity and available-for-sale securities, interest-bearing balances due from depository institutions, federal funds sold and resold, and trading-account securities, divided by average total assets.</p>\
<p><strong>Total Federal Home Loan Borrowings / Average Total Assets</strong>:&nbsp; Average of Federal Home Loan Bank Borrowings with a remaining maturity of under one year plus remaining maturity of one through 3 years plus remaining maturity of over three years divided by average total assets.</p>\
<p><strong>Total Interest Expense / Average Total Assets</strong>:&nbsp; Total interest expense divided by average assets.</p>\
<p>Total Interest Income / Average Total Assets:&nbsp; All income from earning assets plus the tax benefit on tax-exempt loans, leases, and municipal securities, divided by average assets.</p>\
<p><strong>Total Loans &amp; Securities over 1 Year / Total Assets</strong>:&nbsp; Sum of repricings over 1 year for mortgage loans and pass throughs, other loans and securities and all CMO\'s.</p>\
<p><strong>Total Loans &amp; Securities over 15 Years / Total Assets</strong>:&nbsp; Sum of repricings over 15 years for mortgage loans and pass-throughs, other loans and securities divided by assets.</p>\
<p><strong>Total Loans &amp; Securities over 3 Years / Total Assets</strong>:&nbsp; Sum of repricings over 3 years for mortgage loans and pass-throughs, other loans and securities and CMO\'s divided by assets.</p>\
<p><strong>Total Mortgage Loans &amp; Pass-Through Securities / Total Assets</strong>:&nbsp; Sum of all repricings for mortgage pass-through securities backed by closed-end first lien residential mortgages and closed end loans secured by liens on 1-4 family residential properties divided by total assets.</p>\
<p><strong>Total Non-Accrual Loans &amp; Leases</strong>:&nbsp; Total loans and leases on nonaccrual status divided by total loans and leases.</p>\
<p><strong>Total Non-Current Loans &amp; Leases</strong>:&nbsp; The sum of loans and lease financing receivables past due at least 90 days, plus those in nonaccrual status, divided by total loans and leases.</p>\
<p><strong>Total Off-Balance Sheet Items / Total Assets</strong>:&nbsp; The sum of off-balance sheet items divided by total assets.</p>\
<p><strong>Total Other Borrowings / Average Total Assets</strong>:&nbsp; Average of Other Borrowed Money with a remaining maturity of less than one year plus remaining maturity of one through 3 years plus remaining maturity of over three years divided by average total assets.</p>\
<p><strong>Total Other Loans and Securities / Total Assets</strong>:&nbsp; Sum of all repricings for securities issued by U.S. Treasury, agencies, state and political subdivisions and all loans and leases other than closed-end loans secured by first liens on 1-4 family residential properties divided by total assets.</p>\
<p><strong>Total Other Mortgage-Backed Securities / Total Assets</strong>:&nbsp; Sum of all repricings for other mortgage backed securities (including CMO\'s, REMIC\'s and stripped MBS) divided by assets.</p>\
<p><strong>Total Real Estate Loans / Average Gross Loans &amp; Leases</strong>:&nbsp; Total real estate loans divided by average gross loans and leases.</p>\
<p><strong>Total Real Estate Loans / Total Risk-Based Capital</strong>:&nbsp; Construction, land development and other land loans, closed end loans secured by 1-4 family residential properties (first liens, junior liens, and revolving open end loans), loans secured by farmland, loans secured by multifamily residential properties, and loans secured by nonfarm nonresidential properties divided by total risk-based capital.</p>\
<p><strong>Total Risk-Based Capital Ratio</strong>:&nbsp; Total risk based capital as a percent of risk-weighted assets as defined by the appropriate federal regulator for prompt corrective action during that time period.</p>\
<p><strong>Total Structured Notes &amp; Mortgage Servicing Assets / Tier One Capital</strong>:&nbsp; Sum of structured notes, high risk securities, OBS exposed to rising rates and mortgage servicing divided by tier one capital.</p>\
<p><strong>Total Unused Loan and Lease Commitments / Total Assets</strong>:&nbsp; Total unused loan and lease commitments divided by total assets.</p>\
<p><strong>Yield on Agricultural Loans</strong>:&nbsp; Interest and fees on domestic office loans to finance agricultural production divided by average domestic loans to finance agricultural production.</p>\
<p><strong>Yield on Commercial &amp; Industrial Loans</strong>:&nbsp; Interest and fees on domestic office commercial and industrial loans, divided by average domestic commercial and industrial loans.</p>\
<p><strong>Yield on Individual Loans</strong>:&nbsp; Interest and fees on domestic office loans to individuals for household, family and other personal expenditures, divided by average domestic loans to individuals for household, family, and other personal expenditures.</p>\
<p><strong>Yield on Loans Secured by 1-4 Family Residential Property</strong>:&nbsp; Interest and fees on loans secured by 1-4 family real estate divided by average loans secured by 1-4 family real estate.</p>\
<p><strong>Yield on Mortgage Backed Securities</strong>:&nbsp; Income on mortgage backed securities divided by the average for those securities.</p>\
<p><strong>Yield on Real Estate Loans</strong>:&nbsp; Interest and fees on domestic office loans secured primarily by real estate, divided by average domestic real estate loans.</p>\
<p><strong>Yield on Total Investment Securities (Book)</strong>:&nbsp; Income on securities not held in trading accounts, divided by average U.S. Treasury and U.S. government agency securities, state and political subdivisions, and other debt and equity securities.</p>\
<p><strong>Yield on Total Investment Securities (TE)</strong>:&nbsp; Income on securities not held in trading accounts, plus the estimated tax benefit on tax-exempt municipal securities income, divided by average U.S. Treasury and U.S. government agency securities, state and political subdivisions, and other debt and equity securities.</p>\
<p><strong>Yield on Total Loans &amp; Leases (TE)</strong>:&nbsp; Interest and fees on loans and income on direct lease-financing receivables, plus the tax benefit on tax-exempt loan and lease income, divided by average total loans and lease-financing receivables.</p>\
<p><strong>Yield on US Treasury &amp; Agency Securities (Excluding MBS)</strong>:&nbsp; Income on U.S. Treasury securities and U.S. government agency obligations divided by average U. S. Treasury securities and U.S. government agency obligations. Excludes mortgage backed securities.</p>';

    var howToUseCram = '<h4>How to Use Our Application – <strong>Capital Risk Analyzer</strong></h4>\
              <ol>\
              <li>From Home Page click <strong>BankAnalytics</strong> &ndash; Here will arrive at the <strong>BankAnalytics Dashboard</strong></li>\
              <li>From the BankAnalytics Dashboard click <strong>Capital Risk Analyzer</strong>.</li>\
              <ol type="a">\
              <li>The Capital Risk Analyzer allows you to set your bank’s risk profile, risk weighting by risk category, and capital policy limits, resulting in a capital adequacy report including all capital ratios (Tier 1 Leverage, Common Equity Tier 1, Tier 1 Risk-Based, and Total Capital).</li>\
              <li>When first opening the Application, you are provided with the actual Capital numbers and ratios for the current quarter, for your Default bank.  Views or “tabs”:</li>\
              <ol>\
              <li><strong>Dashboard</strong> – summarizes the data from the 4 detail tabs, with both tables and charts</li>\
              <li><strong>Tier 1 Leverage Ratio</strong> – risk analysis and calculations for Tier 1 leverage capital\
              </li>\
              <li><strong>CET 1 Capital Ratio</strong> – risk analysis and calculations for CET 1 capital</li>\
              <li><strong>Tier 1 RBC Ratio</strong> – risk analysis and calculations for Tier 1 risk-based capital</li>\
              <li><strong>Total Capital Ratio</strong> – risk analysis and calculations for Total capital</li>\
              </ol>\
              <li>For each Capital category, the model calculates the Bank’s <strong>Implied Minimum</strong> ratio and amount, based on the Risk rankings and weightings.</li>\
<ol>\
              <li>The Implied Minimum is then compared to the Bank’s Capital policy and the Actual ratio to show the “Buffer”:</li>\
              <ol type="a">\
              <li>Cushion or Excess – when the Implied Minimum is lower than the Bank Actual, therefore the existing capital covers the assessed "risk".</li>\
              <li>Shortfall – when the Implied Minimum is higher than the Bank Actual, therefore more capital is needed to cover the assessed "risk".\
              </li>\
              </ol>\
              </ol>\
              </ol>\
              <li>Getting started – creating a new scenario.  To open the <strong>"Input Data Sheet"</strong>, you can select either the <strong>Create/Edit Scenario</strong> button at the top-left of the page, or the <strong>Scenario | Create/Edit Scenario</strong> button in the mid-left section of the page (in the gray shaded box).</li>\
              <ol type="a">\
                <li>REQURIED INPUTS:</li>\
                <ol>\
                  <li><strong>Risk Score:</strong>  select from drop-down menu, the risk score/rating for the corresponding Risk Category.</li>\
                  <li><strong>Risk-Weighting</strong> – enter a percentage for each of the 7 Risk Categories, where the total should equal 100%.  If each were given an equal weighting, that would approximate to 14.29%.</li>\
                  <li><strong>Model Name</strong> – enter a scenario name in the “Please enter a name for this model” box.  NOTE: when editing a model, changing the name edits the existing name – it does not create a new saved model.</li>\
                </ol>\
                <li>OPTIONAL DATA FIELDS:</li>\
                <ol>\
                  <li>Bank’s Minimum (Policy) for:</li>\
                  <ol type="a">\
                    <li><strong>Tier 1 Leverage Ratio</strong> – default is 8.0%; use this field to enter the bank’s policy, if different.</li>\
                    <li><strong>CET 1 Capital Ratio</strong> – default is 8.0%; use this field to enter the bank’s policy, if different.</li>\
                    <li><strong>Tier 1 RBC Ratio</strong> – default is 9.0%; use this field to enter the bank’s policy, if different.</li>\
                    <li><strong>Total Capital Ratio</strong> – default is 11.0%; use this field to enter the bank’s policy, if different.</li>\
                  </ol>\
                  <li>What-if analysis for (not available at release 1, check back for updates):</li>\
                  <ol type="a">\
                    <li><strong>Common Equity Tier 1 Capital</strong> – reported amount is default; input your own amount to see results for your specific needs.</li>\
                    <li><strong>Tier 1 Capital</strong> – reported amount is default; input your own amount to see results for your specific needs.</li>\
                    <li><strong>Total Capital</strong> – reported amount is default; input your own amount to see results for your specific needs.</li>\
                    <li><strong>Total Assets (Leverage Purposes)</strong> – reported amount is default; input your own amount to see results for your specific needs.</li>\
                    <li><strong>Total Risk-Weighted Assets</strong> – reported amount is default; input your own amount to see results for your specific needs.</li>\
                  </ol>\
                  <li><strong>Capital Risk Buffer</strong> – ability to update from default for Bank specific requirements or purposes.</li>\
                  <ol type="a">\
                    <li><strong>Low</strong> – default is 0.00%; update to bank’s policy or to see impact of alternative percentage.  Enter number as a decimal, where 1% = 1.00 or 2.5% = 2.5, etc.</li>\
                    <li><strong>Low-Moderate</strong> – default is 1.00%; update to bank’s policy or to see impact of alternative percentage.</li>\
                    <li><strong>Moderate</strong> – default is 2.50%; update to bank’s policy or to see impact of alternative percentage.</li>\
                    <li>Moderate-High</strong> – default is 4.00%; update to bank’s policy or to see impact of alternative percentage.</li>\
                    <li><strong>High</strong> – default is 5.00%; update to bank’s policy or to see impact of alternative percentage.</li>\
                  </ol>\
                </ol>\
                <li><strong>Save Changes</strong> – once all Required and Optional inputs are completed, click this button to save the model.  Can be retrieved from the list of existing scenarios for later use and use by others on your team.</li>\
              </ol>\
              <li>When re-entering the App, you will need to click the <strong>View Existing Scenario</strong> button, and select the saved Scenario that you want to use.</li>\
              <ol type="a">\
                <li>The active Scenario is displayed in the Gray box under the “Capital Risk Analyzer” title bar, on the upper left side of the App.</li>\
                <li>To view or edit the scenario inputs, click the <strong>Create/Edit Scenario</strong> button or the Gray box as noted in a. above (4.a.).\
                </li>\
                <ol>\
                  <li>Select <strong>Save Changes</strong> before exiting if edits/changes have been made</li>\
                  <li>Click the “X” in the upper right corner to exit the Input Data Sheet</li>\
                </ol>\
              </ol>\
              <li>Scenarios are available to all registered members within the Bank or organization </li>\
              <ol type="a">\
                <li>Saved scenarios can be viewed in a read-only mode for non-owners</li>\
                <li>The <strong>Copy Scenario</strong> feature allows a non-owner to copy an existing scenario under a new name in order to edit or change the original inputs.</li>\
              </ol>\
              <li>Additional Features:</li>\
              <ol type="a">\
                <li><strong>Select from Favorite Banks</strong> – apply saved scenarios to any other bank (saved to your Favorite Banks list).  This box is on any of the Capital Risk Analyzer tabs in the top right side of the screen.  Can also create new scenarios.\
                </li>\
                <li><strong>Export Data</strong> – export the data to an excel output.  The button is located in the top right corner of the screen.</li>\
                <ol>\
                  <li>From any of the 5 tabs, the tables of data will be exported to an excel spreadsheet.  One sheet for each corresponding tab will be exported to excel. <strong>NOTE</strong>:  Charts are not included in the export.</li>\
                </ol>\
              </ol>\
              </ol>\
              </ol>\
              </ol>';
    var howToUseStrategicForecast = '<h4>How to Use Our Application – <strong>Strategic Forecast</strong></h4>\
              <ol>\
              <li>From Home Page click <strong>BankAnalytics</strong> &ndash; Here will arrive at the <strong>BankAnalytics Dashboard</strong></li>\
              <li>From the BankAnalytics Dashboard click <strong>Strategic Forecast</strong>.</li>\
              <ol type="a">\
              <li>This report allows you to forecast current year plus 5 additional years, allowing inputs for such items as Asset Growth rate, ROAA or Net Income, Dividend amount or rate, and Shares Outstanding; plus, some additional optional inputs.  There is also the ability to compare up to 8 scenarios side-by-side.</li>\
<ol>\
              </ol>\
              </ol>\
              <li>Your Bank/Default Bank information will automatically populate the <strong>Prior Year</strong> and Current Year YTD</strong> columns with the actual reported results (in both the <strong>Forecast</strong> and <strong>Value</strong> tabs).</li>\
              <ol type="a">\
                                <li><strong>Forecast</strong> tab – shows Net Income, Dividends, Capital and Capital ratios, Assets, ROAA and ROAE, and basic Equity analysis.</li>\
                                                <li><strong>Value</strong> tab – shows the major categories from the Forecast tab, with additional Market Value Equity Share Price multipliers.</li>\
                                                                <li><strong>Summary</strong> tab – can compare up to 8 different scenarios side by side, comparing various Strategic data points, for a specific year or Horizon.</li>\
                                                                              </ol>\
              <li>Getting started – creating a new scenario.  To open the <strong>“Input Data Sheet”</strong>, you can select either the <strong>Create/Edit Scenario</strong> button at the top-left of the page, or the <strong>Scenario | Create/Edit Scenario</strong> button in the mid-left section of the page (in the gray shaded box).</li>\
              <ol type="a">\
                <li>REQURIED INPUTS:</li>\
                <ol>\
                  <li><strong>Scenario Name:</strong>  over-write the "Create/Edit Scenario" with your custom scenario description.  Recommend using short descriptive names that are easily identified and distinguishable from other scenarios.  Will be helpful in the Summary or comparison tool.</li>\
                  <li><strong>Asset Growth Rate</strong> – first 2 columns are actual reported rates for “Prior Year” and "Current Qtr" (also shown as “Current Year YTD” in other tabs).  Must input percentage for the 6 open input boxes.</li>\
                  <li><strong>Net Income Calculation</strong> – choose between entering Net Income or Return on Average Assets (ROAA).\
                  </li>\
                  <ol type="a">\
                    <li><strong>ROAA</strong> is the default input; must input percentage for the 6 open input boxes.  Net Income is calculated automatically.\
                    </li>\
                    <li><strong>Net Income</strong> is the optional input, where the user must select the check box to activate the input boxes.  Enter amounts in $000s.  ROAA will then be system calculated.</li>\
                  </ol>\
                  <li><strong>Dividends Calculation</strong> – choose between entering Dividends Rate or Dividends amount ($000s).</li>\
                  <ol type="a">\
                    <li><strong>Dividends Rate</strong> is the default input; must input as a negative percentage for the 6 open input boxes.  Dividend amount is calculated automatically.</li>\
                    <li><strong>Dividends</strong> is the optional input, where the user must select the check box to activate the input boxes.  Enter amounts in ($000s).  Dividend Rate will then be system calculated.</li>\
                  </ol>\
                  <li><strong>Shares Outstanding</strong> is an input for all periods, including Prior Year and Current Qtr.</li>\
                  <ol type="a">\
                    <li>The input for Prior Year will auto-fill the other 7 input boxes.  To change any of the forward periods, user must type or input over the existing number.\
                    </li>\
                    <li>The number should be full number of shares outstanding.</li>\
                  </ol>\
                </ol>\
                <li>OPTIONAL DATA FIELDS:</li>\
                <ol>\
                  <li><strong>New Capital</strong> – enter amount in $000s of new capital for the corresponding period/year.  User must select the check box next to New Capital to activate the input boxes for New Capital, Price per share of New Capital, and New Acquisition-Assets.  Note: Only need to enter values in Year(s) with activity.</li>\
                  <li><strong>Price per share of New Capital</strong> – enter the price each share in the corresponding period.  The New Capital divided by the Price per share should increase the Shares Outstanding proportionally (but, must be added manually to the Shares Outstanding input section).  Note: Only need to enter values in Year(s) with activity.</li>\
                  <li><strong>New Acquisition-Assets</strong> – enter the amount of new assets in $000s.  Will be added to the Total Assets in the corresponding period.  Note: Only need to enter values in Year(s) with activity.</li>\
                  <li><strong>CET 1 Capital Adjustment</strong> – will default to the Current Qtr reported amount.  User must select the input box to activate the input boxes to enter a different amount in $000s.</li>\
                  <li><strong>Tier 1 Capital Adjustment</strong> – will default to the Current Qtr reported amount.  User must select the input box to activate the input boxes to enter a different amount in $000s.</li>\
                  <li><strong>Tier 2 Capital</strong> – choose between the default calculation or manual input.</li>\
                  <ol type="a">\
                    <li>Default calculation is "Prior Year" <strong>Tier 2 Capital</strong> / "Prior Year" <strong>Tier 1 Capital * Year (X) Tier 1 Capital</strong> (where Year X = Year 0-5).</li>\
                    <li>To enter the amount manually, user must select the check box to activate the input boxes.  Enter amounts in $000s.</li>\
                  </ol>\
                  <li><strong>Risk-Weighted Assets (RWA)</strong> – choose between the default calculation or manual input.</li>\
                  <ol type="a">\
                    <li>Default calculation is "Prior Year" <strong>RWA</strong> / “Prior Year” <strong>Total Assets * Year (X) Total Assets</strong> (where Year X = Year 0-5).</li>\
                    <li>To enter the amount manually, user must select the check box to activate the input boxes.  Enter amounts in $000s.</li>\
                  </ol>\
                  <li><strong>Total Assets for Leverage</strong> – choose between the default calculation or manual input.</li>\
                  <ol type="a">\
                    <li>Default calculation is "Prior Year" <strong>Total Assets for Leverage</strong> / "Prior Year" <strong>Total Assets * Year (X) Total Assets</strong> (where Year X = Year 0-5).</li>\
                    <li>To enter the amount manually, user must select the check box to activate the input boxes.  Enter amounts in $000s.</li>\
                  </ol>\
                </ol>\
                <li>FOR REFERENCE ONLY:</li>\
                <ol>\
                  <li>Prior Year <strong>Tier 2 Capital</strong> to Tier 1 Capital is the rate used for each Year, 0 to 5, to calculate the <strong>Tier 2 Capital</strong> amount.  Shown as a percentage.  As referenced in 6.a. above (default calculation).</li>\
                  <li>Prior Year <strong>Risk Weighted Assets to Assets</strong> is the rate used for each Year, 0 to 5, to calculate the <strong>Risk-Weighted</strong> Assets amount.  Shown as a percentage.  As referenced in 7.a. above (default calculation).</li>\
                  <li>Prior Year <strong>Assets for Leverage</strong> to Assets is the rate used for each Year, 0 to 5, to calculate the <strong>Total Assets for Leverage</strong> amount.  Shown as a percentage.  As referenced in 8.a. above (default calculation).</li>\
                </ol>\
                <li>Select <strong>Save Changes</strong> once all inputs are complete.</li>\
                <ol>\
                  <li>Calculations for the Year 0-5 columns will complete and be available in the <strong>Forecast</strong> and <strong>Value</strong> tabs.</li>\
                </ol>\
                <li>To view previously saved scenarios, click the View Existing Scenario button in the top left side of the screen.  A new window will open, and the user can click on an existing scenario to open it.</li>\
                <ol>\
                  <li>Other features available from the View Existing Scenario window include:</li>\
                  <ol type="a">\
                    <li>The ability to <strong>delete</strong> an existing scenario.  By clicking the <strong>“trash can”</strong> object to the right of the saved scenario name.  User will be given a chance to confirm or cancel the process.</li>\
                    <li>The ability to <strong>Create New Scenario</strong> (green box in the top right corner of the window).  Once a scenario is opened, and the user is ready to create a new scenario, the user must open the View Existing Scenario button and choose this option.</li>\
                  </ol>\
                </ol>\
              </ol>\
              <li><strong>Summary</strong> tab features:</li>\
              <ol type="a">\
                <li>Compare saved scenarios for a specific Horizon or Year.</li>\
                <li>User can select any Year, 1-5, for a year specific comparison of up to 8 scenarios at once.</li>\
                <li>To use this feature, select a scenario from the <strong>Select Scenario</strong> drop down box at the top of each of the 8 columns.</li>\
                <li>The same year or <strong>Horizon</strong> is used for a consistent comparison.  Once the Horizon is selected in the second row drop down box, the remaining Horizon column headers update to match.</li>\
                <ol>\
                  <li>The Year in the 3 row of the table also updates to reflect the actual Year corresponding to the Horizon selected.</li>\
                </ol>\
                <li>To save a specific comparison, click the <strong>Save Comparison</strong> button in the top left side of the screen.</li>\
                <ol>\
                  <li>The user will be prompted to “Please enter a name for this comparison”.</li>\
                  <li>Once the name is entered, the user will click the <strong>Save Comparison</strong> button to complete the save.</li>\
                  <li>Saved comparisons will be available to view by clicking the <strong>View Existing Comparison</strong> button, in the top left side of the screen.</li>\
                  <ol>\
                    <li>A new window will open, listing the available saved comparisons</li>\
                    <li>Click the desired comparison to open in the Summary tab.</li>\
                  </ol>\
                </ol>\
              </ol>\
              <li>Additional Features:</li>\
              <ol type="a">\
                <li><strong>Select from Favorite Banks</strong> – apply saved scenarios to any other bank (saved to your Favorite Banks list).  This box is on any of the Strategic Forecast tabs in the top right side of the screen.\
                </li>\
                <li><strong>Export Data</strong> – export the data to an excel output.  The button is located in the top right corner of the screen.</li>\
                <ol>\
                  <li>From the <strong>Forecast</strong> or <strong>Value</strong> tabs, both the Forecast and Value data will be included in the download, on separate tabs.</li>\
                  <li>From the <strong>Summary</strong> tab, only the Summary comparison data will be included in the download.</li>\
                </ol>\
              </ol>\
              </ol>\
              </ol>\
              </ol>';

    var howToUseGapAnalyzer = '<p><strong>How to Use Our Application – Gap Analyzer</strong></p>\
				<ol>\
					<li>From Home Page click the <strong>Gap Analyzer</strong> icon/link.</li>\
					<li>The <strong>Financial Highlights</strong> tab of the Gap Analyzer is the active view.\
						<ol type="a">\
							<li>This view allows you to compare your Bank or another bank to (1) a set Benchmark, (2) the custom peer group and (3) the UBPR peer group.</li>\
							<li>The comparison shows the Variance or Gap amount, either favorable or unfavorable, to make the Bank equivalent to each&mdash;Benchmark and each peer group.</li>\
							<li>To enter and save <strong>Benchmark</strong> metrics:\
						<ol>\
					<li>Set cursor in any Benchmark box and enter your Bank&rsquo;s target or benchmark % amount. The amount would be entered as 50% = <u>50</u> or 0.95% = <u>.95</u> &agrave; the format will automatically update to a 00.00 format upon save.</li>\
					<li>To move to the next row, select &ldquo;tab&rdquo; or &ldquo;enter&rdquo;. Use &ldquo;shift&rdquo;-&ldquo;tab&rdquo; to move up the list.&nbsp; Or use the mouse to move the cursor to a specific row.</li>\
					<li>Continue through the list of 55 performance metrics to enter in the desired Benchmark amounts. Enter as many or as few Benchmarks as needed.&nbsp;</li>\
					<li>When all desired Benchmark amounts are entered, click the &ldquo;<strong>Save Benchmarks</strong>&rdquo; button at the top right of the page.</li>\
					<li>The Benchmark will be &ldquo;Saved&rdquo; and the Variance will calculate for the corresponding Benchmark.</li>\
					<li>To Edit a set Benchmark, over-write the existing amount with the new amount. Then click the &ldquo;Save Benchmarks&rdquo; button.</li>\
					<li>To clear all saved Benchmarks and essentially start over with new Benchmarks, select the &ldquo;<strong>Clear Benchmarks</strong>&rdquo; button at the top right of the page. A prompt will display to confirm that you want to proceed with the clear all.</li>\
					</ol>\
					</li>\
				<li>Other functions available on the Financial Highlights tab:\
				<ol>\
				<li>View current quarter data, or any of the preceding 4 quarters. The current quarter is the default period.\
				<ol type="a">\
					<li>Select the button labeled &ldquo;<strong>Select Quarter</strong>&rdquo; next to the <strong>Report Period</strong>.</li>\
					<li>The Benchmark will remain the same, with the data for the Bank, Peer 1 and Peer 2 updating to the selected Quarter/Period.</li>\
				</ol>\
				</li>\
				<li>Change Custom Peer Group / Peer 1.\
				<ol type="a">\
					<li>Select the &ldquo;<strong>Change Peer Group</strong>&rdquo; button in the top right of the page.</li>\
					<li>A list of previously saved peer groups will show in the drop down list.</li>\
					<li>Select the desired custom peer group to view and compare.</li>\
				</ol>\
				</li>\
				<li>Change Bank.\
					<ol type="a">\
						<li>Select the &ldquo;<strong>Select from Favorite Banks</strong>&rdquo; button in the top right of the page.</li>\
						<li>A list of your previously saved &ldquo;<strong>Favorite Banks</strong>&rdquo; will be shown.</li>\
						<li>Select the desired bank to view and compare.</li>\
					</ol>\
				</li>\
				<li>Export Data.\
					<ol type="a">\
						<li>Select the &ldquo;<strong>Export Data</strong>&rdquo; button in the very top right of the page.</li>\
						<li>Both tabs of data in the Gap Analyzer app will download to an excel format, and will be shown on separate tabs.</li>\
					</ol>\
				</li>\
			</ol>\
		</li>\
	</ol>\
				<li>The <strong>Loans &amp; Leases</strong> tab of the Gap Analyzer is the secondary view. Select the &ldquo;Loans &amp; Leases&rdquo; link under the <strong>GAP ANALYZER</strong> tab at the top left of the page.\
				<ol type="a">\
				<li>This view compares the major and minor categories under Loans &amp; Leases to the custom peer group / Peer 1 and shows the Variance, or dollar gap, between them.</li>\
				<li>The &ldquo;<strong>Strengths &amp; Weaknesses</strong>&rdquo; box lists up to 5 of the Top Strengths and up to 5 of the Top Weaknesses based on the Variance.\
				<ol>\
				<li>Three levels of data are shown, but only the 2<sup>nd</sup> level or Top level variances are used in the &ldquo;Strengths &amp; Weaknesses&rdquo; table to avoid double counting.</li>\
				</ol>\
				</li>\
				<li><strong>Variance: 5 Quarter Trend / 5 Year Trend</strong> bar graph shows the variance trend for the row selected in the Loans &amp; Leases table on the left side of the page. The default is &ldquo;<strong>Real Estate Loans</strong>&rdquo;, since it is the first row of data.\
				<ol>\
				<li>To select a new loan type, use the mouse to click anywhere in the row of the desired loan type. The bar graph will update accordingly.</li>\
				<li>Use the <strong>QTD/YTD</strong> toggle or switch on the right side of the page, above the &ldquo;Strengths &amp; Weaknesses&rdquo; table, to move between a 5 Quarter trend and a 5 Year trend.</li>\
				</ol>\
				</li>\
				<li>Other functions available on the Loans &amp; Leases tab:\
				<ol>\
				<li>Change Custom Peer Group / Peer 1.\
				<ol type="a">\
				<li>Select the &ldquo;<strong>Change Peer Group</strong>&rdquo; button in the top right of the page.</li>\
				<li>A list of previously saved peer groups will show in the drop down list.</li>\
				<li>Select the desired custom peer group to view and compare.</li>\
				</ol>\
				</li>\
				<li>Change Bank.\
				<ol type="a">\
				<li>Select the &ldquo;<strong>Select from Favorite Banks</strong>&rdquo; button in the top right of the page.</li>\
				<li>A list of your previously saved &ldquo;<strong>Favorite Banks</strong>&rdquo; will be shown.</li>\
				<li>Select the desired bank to view and compare.</li>\
				</ol>\
				</li>\
				<li>Export Data.\
				<ol type="a">\
				<li>Select the &ldquo;<strong>Export Data</strong>&rdquo; button in the very top right of the page.</li>\
				<li>Both tabs of data in the Gap Analyzer app will download to an excel format, and will be shown on separate tabs.</li>\
				</ol>\
				</li>\
				</ol>\
				</li>\
				</ol>\
				</li>\
				</ol>\
				</li>\
				</ol>\
				</li>\
				</ol>';

    $scope.toggleHelpContentModal = function (helpContentFor) {
        if (helpContentFor == '') {
            angular.element(document.querySelector('#helpContentHolder')).html('');
        }
        else if (helpContentFor === 'SingleBankProfile') {
            angular.element(document.querySelector('#helpContentHolder')).html(singleBankHelpContent);
        }
        else if (helpContentFor === 'HowToFindABank') {
            angular.element(document.querySelector('#helpContentHolder')).html(howToFindABankHelpContent);
        }
        else if (helpContentFor === 'BuildPeerGroups') {
            angular.element(document.querySelector('#helpContentHolder')).html(buildPeerGroupsHelpContent);
        }
        else if (helpContentFor === 'KeyRiskTrends') {
            angular.element(document.querySelector('#helpContentHolder')).html(keyRiskTrendsHelpContent);
        }
        else if (helpContentFor === 'PerformanceAnalyzer') {
            angular.element(document.querySelector('#helpContentHolder')).html(performanceAnalyzerHelpContent);
        }
        else if (helpContentFor === 'BenchmarkPerformance') {
            angular.element(document.querySelector('#helpContentHolder')).html(benchmarkPerformanceHelpContent);
        }
        else if (helpContentFor === 'RatioDefinition') {
            angular.element(document.querySelector('#helpContentHolder')).html(ratioDefinitionHelpContent);
        }
        else if (helpContentFor === 'B2B') {
            angular.element(document.querySelector('#helpContentHolder')).html(howToUseB2B);
        }
        else if (helpContentFor === 'CRAM') {
            angular.element(document.querySelector('#helpContentHolder')).html(howToUseCram);
        }
        else if (helpContentFor === 'StrategicForecast') {
            angular.element(document.querySelector('#helpContentHolder')).html(howToUseStrategicForecast);
        }
        else if (helpContentFor === 'GapAnalyzer') {
            angular.element(document.querySelector('#helpContentHolder')).html(howToUseGapAnalyzer);
        }

        $scope.showSingleBankProfileHelpModal = !$scope.showSingleBankProfileHelpModal;
    };

    $scope.toggleSuccessMessageBoxModal = function (message) {
        $scope.SuccessMessageText = message;
        $scope.showSuccessMessageModal = !$scope.showSuccessMessageModal;
    };

    var toggleErrorMessageBoxModal = function (message) {
        if (message === '') {
            $scope.ErrorMessageText = message;
            $scope.showDashboardErrorMessageModal = false;
        }
        else if (message !== '' && $scope.showDashboardErrorMessageModal === true) {
            $scope.showDashboardErrorMessageModal = false;
            $scope.ErrorMessageText = $scope.ErrorMessageText + "\n" + message;
            $scope.showDashboardErrorMessageModal = true;
        }
        else {
            $scope.ErrorMessageText = message;
            $scope.showDashboardErrorMessageModal = !$scope.showDashboardErrorMessageModal;
        }
    };

    $scope.OkDokie = function ($event, boxType) {

        if (boxType === 'Success') {
            $scope.toggleSuccessMessageBoxModal('');
        }
        else if (boxType === 'Help') {
            $scope.toggleHelpContentModal('');
        }
        else {
            toggleErrorMessageBoxModal('');
        }
    };

    $scope.ToggleBankAnalyticsTab = function ($event, tabName) {
        if (tabName === 'ProfileOverview') {
            angular.element(document.querySelector('#profileOverViewLink')).addClass('active');
            angular.element(document.querySelector('#peerGroupsLink')).removeClass('active');
            angular.element(document.querySelector('#performanceCompLink')).removeClass('active');
            angular.element(document.querySelector('#riskProfileLink')).removeClass('active');
            angular.element(document.querySelector('#savedProfileLink')).removeClass('active');
            angular.element(document.querySelector('#findABankLink')).removeClass('active');
        }
        else if (tabName === 'PeerGroups') {
            angular.element(document.querySelector('#profileOverViewLink')).removeClass('active');
            angular.element(document.querySelector('#peerGroupsLink')).addClass('active');
            angular.element(document.querySelector('#performanceCompLink')).removeClass('active');
            angular.element(document.querySelector('#riskProfileLink')).removeClass('active');
            angular.element(document.querySelector('#savedProfileLink')).removeClass('active');
            angular.element(document.querySelector('#findABankLink')).removeClass('active');
        }
        else if (tabName === 'PerformanceComparison') {
            angular.element(document.querySelector('#profileOverViewLink')).removeClass('active');
            angular.element(document.querySelector('#peerGroupsLink')).removeClass('active');
            angular.element(document.querySelector('#performanceCompLink')).addClass('active');
            angular.element(document.querySelector('#riskProfileLink')).removeClass('active');
            angular.element(document.querySelector('#savedProfileLink')).removeClass('active');
            angular.element(document.querySelector('#findABankLink')).removeClass('active');
        }
        else if (tabName === 'RiskProfiles') {
            angular.element(document.querySelector('#profileOverViewLink')).removeClass('active');
            angular.element(document.querySelector('#peerGroupsLink')).removeClass('active');
            angular.element(document.querySelector('#performanceCompLink')).removeClass('active');
            angular.element(document.querySelector('#riskProfileLink')).addClass('active');
            angular.element(document.querySelector('#savedProfileLink')).removeClass('active');
            angular.element(document.querySelector('#findABankLink')).removeClass('active');
        }
        else if (tabName === 'SavedProfiles') {
            angular.element(document.querySelector('#profileOverViewLink')).removeClass('active');
            angular.element(document.querySelector('#peerGroupsLink')).removeClass('active');
            angular.element(document.querySelector('#performanceCompLink')).removeClass('active');
            angular.element(document.querySelector('#riskProfileLink')).removeClass('active');
            angular.element(document.querySelector('#savedProfileLink')).addClass('active');
            angular.element(document.querySelector('#findABankLink')).removeClass('active');
        }
        else {
            angular.element(document.querySelector('#profileOverViewLink')).removeClass('active');
            angular.element(document.querySelector('#peerGroupsLink')).removeClass('active');
            angular.element(document.querySelector('#performanceCompLink')).removeClass('active');
            angular.element(document.querySelector('#riskProfileLink')).removeClass('active');
            angular.element(document.querySelector('#savedProfileLink')).removeClass('active');
            angular.element(document.querySelector('#findABankLink')).addClass('active');
        }
    };

    $scope.ChangeScreen = function (templateId) {
        $rootScope.template = templateId;
    };

    $scope.OpenCreatePeerGroup = function (templateId) {
        $rootScope.template = templateId;
        $rootScope.ManageProfilesSubTabToLoad = 'createPeerGroup';
    };

    $scope.OpenFindABank = function (templateId) {
        $rootScope.template = templateId;
        $rootScope.ManageProfilesSubTabToLoad = 'searchBanks';
    };

    $scope.OpenFavoriteBank = function (templateId) {
        $rootScope.template = templateId;
        $rootScope.ManageProfilesSubTabToLoad = 'favoriteBanks';
    };

    $scope.RedirectTo = function (project) {
        if (project === 'Capital') {
            if ((($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true) && $scope.IsCapitalPlanAccessible === true) || $scope.IsSystemAdministratorAssigned === true) {
                window.location.href = window.location.protocol + "//" + window.location.host + '/Project/Projects?viewName=Capital&tag=default';
            }
            else {
                if ($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true || $scope.IsNonBankAdministratorAssigned === true) {
                    dlg = dialogs.notify('Info', 'Not Available: To learn more about this solution please contact Stifel PMG [pmg@stifel.com].');
                }
                else {
                    dlg = dialogs.notify('Info', 'Not Available: Contact your Account Administrator for access.');
                }
            }
        }
        else if (project === 'Strategy') {
            if ((($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true) && $scope.IsStrategicPlanAccessible === true) || $scope.IsSystemAdministratorAssigned === true) {
                window.location.href = window.location.protocol + "//" + window.location.host + '/Project/Projects?viewName=Strategy&tag=default';
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
        else if (project === 'ERM') {
            if ((($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true) && $scope.IsErmAccessible === true) || $scope.IsSystemAdministratorAssigned === true) {
                window.location.href = window.location.protocol + "//" + window.location.host + '/Project/Projects?viewName=ERM&tag=default';
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
        else if (project === 'ERMForum') {
            var forumURL = $('#forumURL').val();
            if ((($scope.IsProjectManagerAssigned === true || $scope.IsAdministratorAssigned === true || $scope.IsSystemAdministratorAssigned === true) && $scope.IsErmAccessible === true) || $scope.IsSystemAdministratorAssigned === true) {
                //window.location.href = forumURL;
                if (forumURL != "") {
                    window.open(forumURL, '_blank');
                }
                else {
                    dlg = dialogs.notify('Info', 'ERM Forum session expired. Please login again!');
                }

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
        else if (project === 'LSC') {
            var LRRedirect = window.location.protocol + "//" + window.location.host + '/liquidityIRR/scorecard'
            window.open(LRRedirect, '_blank');
        }

        else {
            if ($scope.IsIssueCdAccessible === true || $scope.IsSystemAdministratorAssigned === true) {
                window.location.href = window.location.protocol + "//" + window.location.host + '/Cd';
            }
            else {
                dlg = dialogs.notify('Info', 'Not Available: Contact your Account Administrator for access.');
            }
        }
    };

    var getNewFileCount = function () {
        var req = {
            method: 'GET',
            url: '/api/HomeApi/GetNewFileCounts',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data !== null && typeof result.data !== 'undefined') {

                    for (i = 0; i < result.data.length; i++) {
                        if (result.data[i].projectType === 'ERM')
                            $scope.ErmCount = result.data[i].newCount;

                        if (result.data[i].projectType === 'Capital')
                            $scope.CapitalCount = result.data[i].newCount;

                        if (result.data[i].projectType === 'Strategy')
                            $scope.StrategyCount = result.data[i].newCount;
                    }
                }
            },
            function () {
                toggleErrorMessageBoxModal('An error occurred while trying to fetch new file count. Please send an e-mail to admin@cb-resource.com.');
            });
    };

    var getNewsAndEvents = function () {
        var req = {
            method: 'GET',
            url: '/api/SysAdminApi/GetNewsAndEvents',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data !== null && typeof result.data !== 'undefined') {

                    for (i = 0; i < result.data.length; i++) {
                        result.data[i].date = new Date(result.data[i].date).toDateString();
                    }

                    $scope.NewsAndEvents = result.data;
                }
            },
            function () {
                toggleErrorMessageBoxModal('An error occurred while trying to fetch news and events. Please send an e-mail to admin@cb-resource.com.');
            });
    };

    var getBlogs = function () {
        var req = {
            method: 'GET',
            url: '/api/SysAdminApi/GetBlogs',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data !== null && typeof result.data !== 'undefined') {

                    for (i = 0; i < result.data.length; i++) {
                        result.data[i].date = new Date(result.data[i].date).toDateString();
                    }
                    $scope.Blogs = result.data;
                }
            },
            function () {
                toggleErrorMessageBoxModal('An error occurred while trying to fetch blogs. Please send an e-mail to admin@cb-resource.com.');
            });
    }

    var getInfoCenterImages = function () {
        var req = {
            method: 'GET',
            url: '/api/SysAdminApi/GetInfoCenterImages',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data !== null && typeof result.data !== 'undefined') {

                    angular.element(document.querySelector('#image1')).attr('src', result.data.image1);
                    angular.element(document.querySelector('#image2')).attr('src', result.data.image2);
                }
            },
            function () {
                toggleErrorMessageBoxModal('An error occurred while trying to fetch info center images. Please send an e-mail to admin@cb-resource.com.');
            });
    };

    $scope.makeScript = function () {
        var script = document.createElement('script');
        script.setAttribute('src', '//qmod.quotemedia.com/js/qmodLoader.js');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('id', 'qmod');
        script.setAttribute('data-qmod-wmid', '103039');
        script.setAttribute('data-qmod-env', 'app');
        script.setAttribute('async', '');
        script.setAttribute('data-qmod-version', '');
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    var getDefaultBankDetails = function () {
        var req = {
            method: 'GET',
            url: '/api/DashboardApi/GetDefaultBankDetails',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    FetchRiskRadarChartData(result.data.institutionKey);
                    $scope.RRSelectedBankKey = result.data.institutionKey;
                    $scope.InstitutionName = result.data.institutionName;
                    $scope.CertNumber = result.data.certNumber;
                    $scope.HeadQuarters = result.data.headQuarters;
                    $scope.BhcName = result.data.bhcName;
                    $scope.NumberOfBranches = result.data.numberofBranches;
                    $scope.FtEmployees = result.data.ftEmployees;
                    $scope.SubchapterS = result.data.subchapterS;
                    $scope.StockTicker = result.data.stockTicker;
                    $scope.StockTickerDisplay = result.data.stockTicker;
                    $scope.rssd = result.data.rssd;
                    $scope.Regulator = result.data.regulator;
                    if ($scope.StockTicker === 'ABAQ') {
                        $scope.StockTickerDisplay = 'N/A';
                    }

                    if ($location.search().symbol === '' || typeof $location.search().symbol === 'undefined') {
                        if ($scope.StockTicker === '' || typeof $scope.StockTicker === 'undefined') {
                            $scope.trusted_html_variable = htmlToInsert.replace('StockTicker', 'ABAQ').replace('StockTicker1', 'ABAQ');
                            $scope.StockTicker = 'ABAQ';
                        }
                        else {
                            $scope.trusted_html_variable = htmlToInsert.replace('StockTicker', $scope.StockTicker).replace('StockTicker1', $scope.StockTicker);
                        }

                        $scope.makeScript();
                    }
                    else {
                        $scope.trusted_html_variable = htmlToInsert.replace('StockTicker', $location.search().symbol).replace('StockTicker1', $location.search().symbol);
                        $scope.makeScript();
                    }
                }
                else {
                    toggleErrorMessageBoxModal('You do not seem to have a default bank. Please go to favorite bank section and make one bank a default bank.');
                }
            },
            function () {
                toggleErrorMessageBoxModal('An error occurred while trying to fetch default bank details. Please send an e-mail to admin@cb-resource.com.');
            });
    };

    var getInstitutionList = function () {
        var req = {
            method: 'GET',
            url: '/api/DashboardApi/GetInstitutionsForUser',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data !== null && result.data.length > 0) {

                    $('#ratiosRankingsToggle').bootstrapToggle({
                        on: 'Rankings',
                        off: 'Ratios',
                        size: 'mini'
                    });
                    $('#ratiosRankingsToggle').bootstrapToggle('on');
                    $scope.Institutions = result.data;
                    var defaultInstitution = $scope.Institutions.filter(function (obj) {
                        return obj.isDefault === true;
                    })[0];

                    if (defaultInstitution !== null) {
                        $scope.DefaultBank = defaultInstitution;
                        $scope.SelectedBank = defaultInstitution.institutionName;
                        $scope.SelectedBankKey = defaultInstitution.institutionKey;
                        $scope.RRSelectedBank = defaultInstitution.institutionName;
                        $scope.RRSelectedBankKey = defaultInstitution.institutionKey;
                        getInstitutionDetails(defaultInstitution.institutionKey, 'Overall', 'Rankings', 'initialLoad');
                    }
                    else {
                        toggleSuccessMessageBoxModal('Please make one bank as your default bank.');
                    }
                }
                else {
                    $scope.toggleSuccessMessageBoxModal('An error occurred while trying to get data or you do not have any default bank yet. Please go to "Manage Profiles" screen in "BankAnalytics" to add at least one favorite bank to work with the application.');
                }
            },
            function () {
                $scope.ErrorMessageText = 'An error occurred while trying to fetch custom peer groups. Please send an e-mail to admin@cb-resource.com.';
                $("#errorModal").modal();
            });
    };

    $scope.ToggleDataOnInstitutionChange = function ($event, institution) {
        $scope.SelectedBank = institution.institutionName;
        $scope.SelectedBankKey = institution.institutionKey;
        clearCbrIndexChart();
        getInstitutionDetails($scope.SelectedBankKey, $scope.SelectedTab, $scope.SelectedDataType, 'PerformanceIndex');
    };

    $scope.ToggleDataOnDataTypeChange = function (tabName) {
        if (tabName === 'Rankings') {
            $scope.SelectedDataType = 'Rankings';
        }
        else {
            $scope.SelectedDataType = 'Ratios';
        }

        clearCbrIndexChart();
        getPerformanceIndexChartData($scope.SelectedBankKey, $scope.SelectedTab, $scope.SelectedDataType);
    };

    $scope.ShowIndexView = function () {
        $scope.IndexView = true;
        $scope.AgrView = false;
        $scope.RoaaView = false;
        $scope.RoaeView = false;
        $scope.NimView = false;
        $scope.ErView = false;
        $scope.NpaView = false;
        $scope.NibdView = false;
        $scope.NiiView = false;
        $scope.SelectedTab = 'Overall';
        $scope.SelectedDataType = 'Rankings';
        angular.element(document.querySelector('#rankingsToggle')).prop('checked', true);
        $scope.isRatioDisabled = true;
        clearCbrIndexChart();
        getPerformanceIndexChartData($scope.SelectedBankKey, $scope.SelectedTab, $scope.SelectedDataType);
    };

    $scope.ShowAgrView = function () {
        $scope.IndexView = false;
        $scope.AgrView = true;
        $scope.RoaaView = false;
        $scope.RoaeView = false;
        $scope.NimView = false;
        $scope.ErView = false;
        $scope.NpaView = false;
        $scope.NibdView = false;
        $scope.NiiView = false;
        $scope.SelectedTab = 'AGR';
        $scope.isRatioDisabled = false;
        clearCbrIndexChart();
        getPerformanceIndexChartData($scope.SelectedBankKey, $scope.SelectedTab, $scope.SelectedDataType);
    };

    $scope.ShowRoaaView = function () {
        $scope.IndexView = false;
        $scope.AgrView = false;
        $scope.RoaaView = true;
        $scope.RoaeView = false;
        $scope.NimView = false;
        $scope.ErView = false;
        $scope.NpaView = false;
        $scope.NibdView = false;
        $scope.NiiView = false;
        $scope.SelectedTab = 'ROAA';
        $scope.isRatioDisabled = false;
        clearCbrIndexChart();
        getPerformanceIndexChartData($scope.SelectedBankKey, $scope.SelectedTab, $scope.SelectedDataType);
    };

    $scope.ShowRoaeView = function () {
        $scope.IndexView = false;
        $scope.AgrView = false;
        $scope.RoaaView = false;
        $scope.RoaeView = true;
        $scope.NimView = false;
        $scope.ErView = false;
        $scope.NpaView = false;
        $scope.NibdView = false;
        $scope.NiiView = false;
        $scope.SelectedTab = 'ROAE';
        $scope.isRatioDisabled = false;
        clearCbrIndexChart();
        getPerformanceIndexChartData($scope.SelectedBankKey, $scope.SelectedTab, $scope.SelectedDataType);
    };

    $scope.ShowNimView = function () {
        $scope.IndexView = false;
        $scope.AgrView = false;
        $scope.RoaaView = false;
        $scope.RoaeView = false;
        $scope.NimView = true;
        $scope.ErView = false;
        $scope.NpaView = false;
        $scope.NibdView = false;
        $scope.NiiView = false;
        $scope.SelectedTab = 'NIM';
        $scope.isRatioDisabled = false;
        clearCbrIndexChart();
        getPerformanceIndexChartData($scope.SelectedBankKey, $scope.SelectedTab, $scope.SelectedDataType);
    };

    $scope.ShowErView = function () {
        $scope.IndexView = false;
        $scope.AgrView = false;
        $scope.RoaaView = false;
        $scope.RoaeView = false;
        $scope.NimView = false;
        $scope.ErView = true;
        $scope.NpaView = false;
        $scope.NibdView = false;
        $scope.NiiView = false;
        $scope.SelectedTab = 'ER';
        $scope.isRatioDisabled = false;
        clearCbrIndexChart();
        getPerformanceIndexChartData($scope.SelectedBankKey, $scope.SelectedTab, $scope.SelectedDataType);
    };

    $scope.ShowNpaView = function () {
        $scope.IndexView = false;
        $scope.AgrView = false;
        $scope.RoaaView = false;
        $scope.RoaeView = false;
        $scope.NimView = false;
        $scope.ErView = false;
        $scope.NpaView = true;
        $scope.NibdView = false;
        $scope.NiiView = false;
        $scope.SelectedTab = 'NPA';
        $scope.isRatioDisabled = false;
        clearCbrIndexChart();
        getPerformanceIndexChartData($scope.SelectedBankKey, $scope.SelectedTab, $scope.SelectedDataType);
    };

    $scope.ShowNibdView = function () {
        $scope.IndexView = false;
        $scope.AgrView = false;
        $scope.RoaaView = false;
        $scope.RoaeView = false;
        $scope.NimView = false;
        $scope.ErView = false;
        $scope.NpaView = false;
        $scope.NibdView = true;
        $scope.NiiView = false;
        $scope.SelectedTab = 'NIBD';
        $scope.isRatioDisabled = false;
        clearCbrIndexChart();
        getPerformanceIndexChartData($scope.SelectedBankKey, $scope.SelectedTab, $scope.SelectedDataType);
    };

    $scope.ShowNiiView = function () {
        $scope.IndexView = false;
        $scope.AgrView = false;
        $scope.RoaaView = false;
        $scope.RoaeView = false;
        $scope.NimView = false;
        $scope.ErView = false;
        $scope.NpaView = false;
        $scope.NibdView = false;
        $scope.NiiView = true;
        $scope.SelectedTab = 'NII';
        $scope.isRatioDisabled = false;
        clearCbrIndexChart();
        getPerformanceIndexChartData($scope.SelectedBankKey, $scope.SelectedTab, $scope.SelectedDataType);
    };

    var renderPerformanceIndexChart = function (data, decimals, forceDecimals) {
        FusionCharts.ready(function () {
            var oilResChart = new FusionCharts({
                type: 'column2d',
                renderAt: 'cbr-index-chart-container',
                width: '100%',
                height: '200',
                dataFormat: 'json',
                dataSource: {
                    "chart": {
                        "animation": "0",
                        "caption": "",
                        "subCaption": "",
                        "showBorder": "1",
                        "borderColor": "#cccccc",
                        "xAxisName": "",
                        "yAxisName": "",
                        "numberPrefix": "",
                        "paletteColors": "#003057",
                        "bgColor": "#ffffff",
                        "borderAlpha": "20",
                        "canvasBorderAlpha": "0",
                        "usePlotGradientColor": "0",
                        "plotBorderAlpha": "10",
                        "rotatevalues": "0",
                        "valueFontColor": "#000000",
                        "showXAxisLine": "1",
                        "xAxisLineColor": "#999999",
                        "divlineColor": "#999999",
                        "divLineDashed": "1",
                        "showAlternateHGridColor": "1",
                        "subcaptionFontBold": "0",
                        "subcaptionFontSize": "14",
                        "decimals": decimals,
                        "valueBorderColor": "#ffffff",
                        "valueBgColor": "#ffffff",
                        "valueFontBold": 1,
                        "forceDecimals": forceDecimals,
                        "showValues": "1",
                        "useEllipsesWhenOverflow": "1",
                        "placeValuesInside": "1",
                        "exportEnabled": "0",
                        "formatNumberScale": "0"
                    },
                    "data": data
                }
            }).render();
        });
    }

    $scope.Ok = function ($event, boxType) {
        if (boxType === 'Success') {
            $scope.toggleSuccessMessageBoxModal('');
        }
        else {
            toggleErrorMessageBoxModal('');
        }
    };

    var getInstitutionDetails = function (institutionKey, tabName, dataType, chartType) {
        var institutionDetailParams = {
            InstitutionKey: institutionKey
        };

        var req = {
            method: 'POST',
            url: '/api/PerformanceIndexApi/GetInstitutionDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            data: institutionDetailParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    switch (chartType) {
                        case "initialLoad":
                            //Risk Radar
                            $scope.RRInstitutionPeerGroup = result.data.peerGroup;
                            $scope.RRInstitutionState = result.data.state;
                            // $scope.RRInstitutionRegion = result.data.region;
                            //Performance 
                            $scope.InstitutionPeerGroup = result.data.peerGroup;
                            $scope.InstitutionPeerGroupKey = result.data.peerGroupKey;
                            $scope.InstitutionState = result.data.state;
                            $scope.InstitutionRegion = result.data.region;
                            $scope.InstitutionAssetSize = result.data.assetSize
                            getPerformanceIndexChartData(institutionKey, tabName, dataType);
                            break;
                        case "RiskRadar":
                            $scope.RRInstitutionPeerGroup = result.data.peerGroup;
                            $scope.RRInstitutionState = result.data.state;
                            //  $scope.RRInstitutionRegion = result.data.region;
                            FetchRiskRadarChartData($scope.RRSelectedBankKey, $scope.RRSelectedDataType);
                            break;
                        case "PerformanceIndex":
                            $scope.InstitutionPeerGroup = result.data.peerGroup;
                            $scope.InstitutionPeerGroupKey = result.data.peerGroupKey;
                            $scope.InstitutionState = result.data.state;
                            $scope.InstitutionRegion = result.data.region;
                            $scope.InstitutionAssetSize = result.data.assetSize
                            getPerformanceIndexChartData(institutionKey, tabName, dataType);
                            break;
                        default:
                            $scope.InstitutionPeerGroup = result.data.peerGroup;
                            $scope.InstitutionPeerGroupKey = result.data.peerGroupKey;
                            $scope.InstitutionState = result.data.state;
                            $scope.InstitutionRegion = result.data.region;
                            $scope.InstitutionAssetSize = result.data.assetSize
                            getPerformanceIndexChartData(institutionKey, tabName, dataType);
                            break;
                    }
                }
                else {
                    $scope.ErrorMessageText = 'An error occurred while trying to get bank details. Please send an e-mail to admin@cb-resource.com.';
                    $("#errorModal").modal();
                }
            },
            function () {
                $scope.ErrorMessageText = 'An error occurred while trying to get data for chart. Please send an e-mail to admin@cb-resource.com.';
                $("#errorModal").modal();
            });
    };

    var getPerformanceIndexChartData = function (instKey, tabName, dataType) {
        var perfIndexChartParams = {
            InstitutionKey: instKey,
            TabType: tabName,
            DataType: dataType
        };

        var req = {
            method: 'POST',
            url: '/api/PerformanceIndexApi/GetPerformanceIndexChartData',
            headers: {
                'Content-Type': 'application/json'
            },
            data: perfIndexChartParams
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    if (dataType === 'Rankings')
                        renderPerformanceIndexChart(result.data, '0', '0');
                    else
                        renderPerformanceIndexChart(result.data, '2', '1');
                }
            },
            function () {
                $scope.ErrorMessageText = 'An error occurred while trying to get data for chart data.Please connect with system administrator.';
                $("#errorModal").modal();
            });
    };

    var clearCbrIndexChart = function () {
        angular.element(document.querySelector('#cbr-index-chart-container')).html('<p>loading....</p>');
    };

    $scope.ViewPerformanceIndexDetails = function () {
        if ($scope.InstitutionPeerGroupKey === '' || $scope.InstitutionState === '' || $scope.InstitutionRegion === '') {
            toggleErrorMessageBoxModal('Please wait and let institution details load.');
        }
        else {
            window.location.href = '/PerformanceIndex?pgkey=' + $scope.InstitutionPeerGroupKey + '&state=' + $scope.InstitutionState + '&region=' + $scope.InstitutionRegion + '&instkey=' + $scope.SelectedBank;
        }
    };

    $scope.ViewMarketIndexDetails = function () {
        if ($scope.InstitutionPeerGroupKey === '' || $scope.InstitutionState === '' || $scope.InstitutionRegion === '') {
            toggleErrorMessageBoxModal('Please wait and let institution details load.');
        }
        else {
            if (typeof $location.search().symbol !== 'undefined') {
                window.location.href = '/PerformanceIndex/DetailedQuote?ticker=' + $location.search().symbol;
            }
            else {
                window.location.href = '/PerformanceIndex/DetailedQuote?pgkey=' + $scope.InstitutionPeerGroupKey + '&state=' + $scope.InstitutionState + '&region=' + $scope.InstitutionRegion + '&ticker=' + $scope.StockTicker;
            }

        }
    };

    //Risk Radar
    $scope.RRToggleDataOnPeriodChange = function (tabName) {
        if (tabName === 'YTD') {
            $scope.RRSelectedDataType = 'YTD';
        }
        else {
            $scope.RRSelectedDataType = 'QTD';
        }
        BindRiskRadarData($scope.RiskRadarData);
    };

    $scope.ToggleRRDataOnInstitutionChange = function ($event, institution) {
        showCbrRRLoader();
        $scope.RRSelectedBank = institution.institutionName;
        $scope.RRSelectedBankKey = institution.institutionKey;
        $rootScope.RRShowBankProfileForInstitutionKey = institution.institutionKey;
        getInstitutionDetails($scope.RRSelectedBankKey, '', $scope.RRSelectedDataType, 'RiskRadar');
    };

    var hideCbrRRLoader = function () {
        angular.element(document.querySelector('#rrTableLoader')).hide();
        angular.element(document.querySelector('#tblRiskRadar')).show();
    };

    var showCbrRRLoader = function () {
        angular.element(document.querySelector('#rrTableLoader')).show();
        angular.element(document.querySelector('#tblRiskRadar')).hide();
    };

    $scope.RiskRadarDetails = function () {
        if ($scope.RRSelectedBankKey === -1) {
            toggleErrorMessageBoxModal('Please wait and let institution details load.');
        }
        else {
            window.location.href = '/RiskRadar?instkey=' + $scope.RRSelectedBankKey;
        }
    };

    var FetchRiskRadarChartData = function (instKey) {
        showCbrRRLoader();
        var req = {
            method: 'GET',
            url: '/api/RiskRadarApi/GetRiskRadarChartData?InstitutionKey=' + instKey,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.RiskRadarData = result.data;
                    BindRiskRadarData($scope.RiskRadarData);
                    hideCbrRRLoader();
                }
            },
            function (e) {
                console.log(e)
                $scope.ErrorMessageText = 'An error occurred while trying to get data for chart data.Please connect with system administrator.';
                $("#errorModal").modal();
                hideCbrRRLoader();
            });
    };

    var BindRiskRadarData = function (riskRadarData) {
        var rrData = null;
        if ($scope.RRSelectedDataType === 'QTD') {
            rrData = riskRadarData.quarterlyData;
        }
        else {
            rrData = riskRadarData.yearlyData;
        }
        $scope.RRInstitutionAssetSize = rrData.assetSize;
        $scope.RRHeaderScoreInformation = rrData.headerScoreInformation;
        $scope.RRHeaderScoreBgrdCellcolor = rrData.rRHeaderScoreBgrdCellcolor;
        $scope.RRKRIValues = rrData.kriValues;
        angular.forEach($scope.RRKRIValues, function (item) {
            item.currentMinus4KRIValue.currentDataValue = getDataValue(item.currentMinus4KRIValue.currentDataValue);
            item.currentMinus3KRIValue.currentDataValue = getDataValue(item.currentMinus3KRIValue.currentDataValue);
            item.currentMinus2KRIValue.currentDataValue = getDataValue(item.currentMinus2KRIValue.currentDataValue);
            item.currentMinus1KRIValue.currentDataValue = getDataValue(item.currentMinus1KRIValue.currentDataValue);
            item.currentKRIValue.currentDataValue = getDataValue(item.currentKRIValue.currentDataValue);
        });
        $scope.RRTableHeaders = rrData.timePeriodHeaderLabels.categoryLabels;
    }

    var getDataValue = function (dataValue) {
        let parsedData = null;
        if (dataValue !== null && dataValue !== "") {
            parsedData = parseFloat(dataValue).toFixed(2);
        }
        return parsedData;
    }

    $scope.BindNumber = function (numericValue, fractionSize) {
        if (numericValue === null)
            return 'N/A';
        else
            return $filter('number')(numericValue, fractionSize);
    }

    $scope.BindRRTableHeader = function (header) {
        if (header.label === 'Institution Name' || header.label === '#')
            return { 'text-align': 'left' };
        else
            return { 'text-align': 'right' };
    }

    //End of Risk Radar

    var setStockTickerFromQueryString = function () {
        if ($location.search().symbol !== '') {
            $scope.StockTicker = $location.search().symbol;
        }
    };

    var securityTrimIssueaCdLink = function () {
        var req = {
            method: 'GET',
            url: '/api/CdApi/SecurityTrimIssueACdLink',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http(req).then(
            function (result) {
                if (result.data !== null) {
                    $scope.SecurityTrimIssueaCdLink = result.data;
                }
                else {
                    $scope.ErrorMessageText = 'An error occurred while trying to security trim content. Please send an e-mail to admin@cb-resource.com.';
                    $("#errorModal").modal();
                }
            },
            function () {
                $scope.ErrorMessageText = 'An error occurred while trying to  security trim content. Please send an e-mail to admin@cb-resource.com.';
                $("#errorModal").modal();
            });
    };

    var initialize = function () {
        securityTrimIssueaCdLink();
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="dropdown"]').tooltip();
        getNewFileCount();
        //getNewsAndEvents();
        getBlogs();
        getInfoCenterImages();
        getDefaultBankDetails();
        getInstitutionList();
        getUserRolesProfile();
    };

    initialize();
}]);

