using System.Web;
using System.Web.Optimization;
using CBR.Web.WebCommons;

namespace CBR.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            Bundle b = new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js");
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*");
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            b = new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*");
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/popover.js",
                      "~/Scripts/tooltip.js",
                      "~/Scripts/bootstrap-toggle.min.js");
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/dropzonescripts").Include(
                     "~/Scripts/dropzone/dropzone.js");
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new StyleBundle("~/Styles/Libraries/bootstrapcss").Include(
                "~/Styles/Libraries/bootstrap.min.css",
                "~/Styles/docs.min.css"
                );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new StyleBundle("~/Styles/cbrcss").Include(
                "~/Styles/cb-resource.css",
                "~/Styles/cb-resource-v2.css",
                "~/Styles/cb-resource-appsv2.css"
                );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new StyleBundle("~/Styles/Libraries/css").Include(
                "~/Styles/Libraries/jquery-ui.css",
                "~/Styles/Libraries/jquery-ui.structure.css",
                "~/Styles/Libraries/bootstrap-dt.css",
                "~/Styles/Libraries/jquery-ui.theme.css",
                "~/Styles/Libraries/jquery-dt.css",
                "~/Styles/Libraries/docs.css",
                "~/Styles/Libraries/dropzone.css",
                "~/Styles/Fonts/fa/css/font-awesome.css",
                "~/Styles/Libraries/dashboard.css",
                "~/Styles/bootstrap-drawer.css",
                "~/Styles/bootstrap-toggle.min.css",
                "~/Styles/abn-tree.css",
                "~/Styles/cbr-icons/styles.css",
                "~/Styles/pushy.css",
                "~/Styles/bootstrap-select.min.css",
                "~/Styles/bootstrap-datepicker.min.css"
                );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/Styles/Libraries/RegisterUserStyles").Include(
                "~/Styles/Libraries/bootstrap.min.css",
                "~/Styles/cb-resource.css",
                "~/Styles/RegisterUser.css"
                );
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/RegisterUserJS").Include(
                "~/Scripts/ie-emulation-modes-warning.js",
                "~/Scripts/jquery-2.1.4.min.js",
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/pwstrength.js",
                "~/Scripts/RegisterUser.js"
                );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.min.js",
                "~/Scripts/angular-route.min.js"
                );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/cbrapplicationmain").Include(
                "~/Scripts/CBRMain/cbrMain.js"
                );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/commonjs").Include(
                "~/Scripts/ie10-viewport-bug-workaround.js",
                "~/Scripts/pushy.min.js",
                "~/Scripts/drawer.js",
                "~/Scripts/scotchPanels.js"
                );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/bankanalytics").Include(
                "~/Scripts/angular-sanitize.min.js",
                "~/Scripts/ngMask.min.js",
                "~/Scripts/mask.min.js",
                "~/Scripts/Charts/fusioncharts/rgbcolor.js",
                "~/Scripts/fcsaNumber.js",
                "~/Scripts/tree_directive.js",
                "~/Scripts/Charts/fusioncharts/StackBlur.js",
                "~/Scripts/Charts/fusioncharts/canvg.js",
                "~/Scripts/ui-bootstrap-tpls.min.js",
                "~/Scripts/dialogs.js",
                "~/App/BankAnalytics/ViewModels/BankAnalyticsTabsViewModel.js",
                "~/Scripts/BankAnalytics/bankanalyticsmain.js",
                "~/App/BankAnalytics/ViewModels/GapAnalyzerViewModel.js",
                "~/App/BankAnalytics/ViewModels/CallReportAnalyzer.js",
                "~/App/BankAnalytics/ViewModels/StrategicForecastViewModel.js",
                "~/App/BankAnalytics/ViewModels/BankToBankAnalyzerViewModel.js",
                "~/App/BankAnalytics/ViewModels/CramViewModel.js",
                "~/App/BankAnalytics/ViewModels/ProfileOverviewViewModel.js",
                //"~/App/BankAnalytics/ViewModels/RiskRadarViewModel.js",
                "~/App/BankAnalytics/ViewModels/BenchMarkingViewModel.js",
                "~/App/BankAnalytics/ViewModels/PeerGroupViewModel.js",
                "~/App/BankAnalytics/ViewModels/RiskProfileViewModel.js",
                "~/App/BankAnalytics/ViewModels/PerformanceComparisonViewModel.js",
                "~/Scripts/Charts/fusioncharts/fusioncharts.js",
                "~/Scripts/Charts/fusioncharts/fusioncharts.charts.js",
                "~/Scripts/drawer.js",
                "~/Scripts/jquery.fileDownload.js",
                "~/Scripts/Charts/fusioncharts/fusionCharts_license.js"
                );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/projects").Include(
                "~/Scripts/fcsaNumber.js",
                "~/Scripts/ngMask.min.js",
                "~/Scripts/angular-sanitize.min.js",
                "~/Scripts/mask.min.js",
                "~/Scripts/drawer.js",
                "~/Scripts/bootstrap-toggle.min.js",
                "~/Scripts/bootstrap-select.js",
                "~/Scripts/ui-bootstrap-tpls.min.js",
                "~/Scripts/dialogs.js",
                "~/Scripts/fontawesome.js",
                "~/Scripts/bootstrap-datepicker.min.js",
                "~/Scripts/fontawesome.js",
                "~/Scripts/ng-dropzone.min.js",
                "~/Scripts/jquery.fileDownload.js",
                "~/App/Project/ViewModels/ProjectsViewModel.js"
                );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/homepage").Include(
                "~/App/Home/ViewModels/HomeScreenViewModel.js",
                "~/Scripts/Charts/fusioncharts/fusioncharts.js",
                "~/Scripts/Charts/fusioncharts/fusioncharts.charts.js",
                "~/Scripts/Charts/fusioncharts/fusionCharts_license.js"

                );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/administration").Include(
                "~/Scripts/fcsaNumber.js",
                "~/Scripts/ngMask.min.js",
                "~/Scripts/angular-sanitize.min.js",
                "~/Scripts/mask.min.js",
                "~/Scripts/drawer.js",
                "~/Scripts/bootstrap-toggle.min.js",
                "~/Scripts/bootstrap-select.js",
                "~/Scripts/ui-bootstrap-tpls.min.js",
                "~/Scripts/dialogs.js",
                "~/Scripts/fontawesome.js",
                "~/Scripts/bootstrap-datepicker.min.js",
                "~/Scripts/fontawesome.js",
                "~/App/Home/ViewModels/AdministrationViewModel.js"
                );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);
            b = new ScriptBundle("~/bundles/systemadministration").Include(
                "~/Scripts/fcsaNumber.js",
                "~/Scripts/ngMask.min.js",
                "~/Scripts/angular-sanitize.min.js",
                "~/Scripts/mask.min.js",
                "~/Scripts/drawer.js",
                "~/Scripts/bootstrap-toggle.min.js",
                "~/Scripts/bootstrap-select.js",
                "~/Scripts/ui-bootstrap-tpls.min.js",
                "~/Scripts/dialogs.js",
                "~/Scripts/fontawesome.js",
                "~/Scripts/bootstrap-datepicker.min.js",
                "~/Scripts/fontawesome.js",
                "~/App/Home/ViewModels/SystemAdministrationViewModel.js"
                  );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/RiskRadar").Include(
                 "~/Scripts/angular-sanitize.min.js",
                "~/Scripts/ngMask.min.js",
                "~/Scripts/mask.min.js",
                "~/Scripts/Charts/fusioncharts/rgbcolor.js",
                "~/Scripts/fcsaNumber.js",
                "~/Scripts/tree_directive.js",
                "~/Scripts/Charts/fusioncharts/StackBlur.js",
                "~/Scripts/Charts/fusioncharts/canvg.js",
                "~/Scripts/ui-bootstrap-tpls.min.js",
                "~/Scripts/dialogs.js",  
                "~/Scripts/fontawesome.js", 
                "~/Scripts/jquery.fileDownload.js",
                "~/Scripts/Charts/fusioncharts/rgbcolor.js",
                "~/Scripts/tree_directive.js",
                "~/Scripts/Charts/fusioncharts/StackBlur.js",
                "~/Scripts/Charts/fusioncharts/canvg.js",
                "~/Scripts/Charts/fusioncharts/fusioncharts.js",
                "~/Scripts/Charts/fusioncharts/fusioncharts.charts.js",
                "~/App/RiskRadar/ViewModels/RiskRadarViewModel.js",
                "~/Scripts/Charts/fusioncharts/fusionCharts_license.js"
                  );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/performanceindex").Include(
                "~/App/PerformanceIndex/ViewModels/PerformanceIndexViewModel.js",
                "~/Scripts/fontawesome.js"
                  );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/performanceindexdetails").Include(
                "~/App/PerformanceIndex/ViewModels/PerformanceIndexDetailsViewModel.js",
                "~/Scripts/fontawesome.js"
                  );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/issuecd").Include(
                "~/Scripts/fcsaNumber.js",
                "~/Scripts/ngMask.min.js",
                "~/Scripts/angular-sanitize.min.js",
                "~/Scripts/mask.min.js",
                "~/Scripts/drawer.js",
                "~/Scripts/bootstrap-toggle.min.js",
                "~/Scripts/bootstrap-select.js",
                "~/Scripts/ui-bootstrap-tpls.min.js",
                "~/Scripts/dialogs.js",
                "~/Scripts/fontawesome.js",
                "~/Scripts/bootstrap-datepicker.min.js",
                "~/App/Cd/ViewModels/IssueCdViewModel.js"
                  );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);

            b = new ScriptBundle("~/bundles/superaccountadministration").Include(
                "~/Scripts/fcsaNumber.js",
                "~/Scripts/ngMask.min.js",
                "~/Scripts/angular-sanitize.min.js",
                "~/Scripts/mask.min.js",
                "~/Scripts/drawer.js",
                "~/Scripts/bootstrap-toggle.min.js",
                "~/Scripts/bootstrap-select.js",
                "~/Scripts/ui-bootstrap-tpls.min.js",
                "~/Scripts/dialogs.js",
                "~/Scripts/fontawesome.js",
                "~/Scripts/bootstrap-datepicker.min.js",
                "~/Scripts/fontawesome.js",
                "~/App/Home/ViewModels/SuperAccountAdministration.js"
                  );
            b.Orderer = new AsIsBundleOrderer();
            bundles.Add(b);


            
        }
    }
}
