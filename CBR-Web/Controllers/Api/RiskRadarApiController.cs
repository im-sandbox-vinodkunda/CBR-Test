using CBR.Web.Models;
using CBR.Web.WebCommons;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using CBR.Common;
using System.Net.Http;
using System.IO;
using System.Net.Http.Headers;
using System.Net;
using CBR.Web.CustomFilter;
using Aspose.Pdf;
using CBR.Common.Models;
using Aspose.Pdf.Text;
using CBR.DataAccess;
using System.Data.SqlClient;

namespace CBR.Web.Controllers.Api
{
    public partial class RiskRadarApiController : ApiController
    {
        CBRDataWareHouseEntities ent = new CBRDataWareHouseEntities();

        [HttpGet]
        public RiskRadarData GetRiskRadarChartData(int InstitutionKey)
        {
            RiskRadarData riskRadarData = new RiskRadarData();
            try
            {
                //To get selected Bank Details
                SqlParameter institutionKey = new SqlParameter("InstitutionKey", SqlDbType.Int);
                institutionKey.Value = InstitutionKey;
                DefaultBankDetails selectedBankDetails = ent.Database.SqlQuery<DefaultBankDetails>("dbo.uspRptGetBankDetails @InstitutionKey", institutionKey).FirstOrDefault();
                riskRadarData.SelectedBankDetails = selectedBankDetails;

                //To get RiskRadar table based on InstitutionKey
                var rrData = ent.RptCBRRiskRadarChartDetails.Where(r => r.InstitutionKey == InstitutionKey).ToList();

                var rrQuaterlyData = rrData.Where(p => p.ReportTabName == "QTD").ToList();
                var rrYearlyData = rrData.Where(p => p.ReportTabName == "YTD").ToList();

                if (rrQuaterlyData.Count() > 0)
                {
                    riskRadarData.QuarterlyData = GetRiskRadarDataWithPeriod(rrQuaterlyData);
                }
                if (rrYearlyData.Count() > 0)
                {
                    riskRadarData.YearlyData = GetRiskRadarDataWithPeriod(rrYearlyData);
                }
                //Get Period Information - Quarterly time period data
                if (riskRadarData.QuarterlyData == null)
                    riskRadarData.QuarterlyData = new RiskRadarChartData();
                riskRadarData.QuarterlyData.TimePeriodHeaderLabels = GetCategoryTimeLabels("QTD");
                //Get Period Information - Yearly time period data
                if (riskRadarData.YearlyData == null)
                    riskRadarData.YearlyData = new RiskRadarChartData();
                riskRadarData.YearlyData.TimePeriodHeaderLabels = GetCategoryTimeLabels("YTD");
            }
            catch (Exception ex)
            {
                // throw;
            }
            return riskRadarData;
        }

        [HttpGet]
        public List<RiskRadarKRIData> GetKRIMetricMasterData()
        {
            return GetKRISelectedData();
        }      

        [HttpGet]
        public RptCBRRiskRadarUserMetricmapping GetUserSpecificKRIData()
        {
            return GetKRIDataWithUserKey();
        }

        [HttpGet]
        public List<RiskRadarRiskLevel> GetRiskRadarRiskLevelData()
        {
            List<RiskRadarRiskLevel> lstRiskRadaraRatings = GetRiskRadarRatings();
            lstRiskRadaraRatings = lstRiskRadaraRatings.Where(r => r.RiskLevel != "NA" && r.RiskLevel != "No Rating").ToList();
            return lstRiskRadaraRatings;
        }

        [HttpPost]
        public bool SaveOrUpdateKRIData(NameValue[] kriData)
        {
            bool isSuccess = false;
            try
            {

                SqlParameter userKey = new SqlParameter("@UserKey", SqlDbType.BigInt);
                userKey.Value = UtilityFunctions.GetUserKey(User.Identity.Name);

                SqlParameter kri1 = new SqlParameter("@KRI1", SqlDbType.Int);
                kri1.Value = kriData.Where(l => l.Name == "KRI1").FirstOrDefault().Value;

                SqlParameter kri2 = new SqlParameter("@KRI2", SqlDbType.Int);
                kri2.Value = kriData.Where(l => l.Name == "KRI2").FirstOrDefault().Value;

                SqlParameter kri3 = new SqlParameter("@KRI3", SqlDbType.Int);
                kri3.Value = kriData.Where(l => l.Name == "KRI3").FirstOrDefault().Value;

                SqlParameter kri4 = new SqlParameter("@KRI4", SqlDbType.Int);
                kri4.Value = kriData.Where(l => l.Name == "KRI4").FirstOrDefault().Value;

                SqlParameter kri5 = new SqlParameter("@KRI5", SqlDbType.Int);
                kri5.Value = kriData.Where(l => l.Name == "KRI5").FirstOrDefault().Value;

                SqlParameter kri6 = new SqlParameter("@KRI6", SqlDbType.Int);
                kri6.Value = kriData.Where(l => l.Name == "KRI6").FirstOrDefault().Value;

                SqlParameter kri7 = new SqlParameter("@KRI7", SqlDbType.Int);
                kri7.Value = kriData.Where(l => l.Name == "KRI7").FirstOrDefault().Value;

                SqlParameter kri8 = new SqlParameter("@KRI8", SqlDbType.Int);
                kri8.Value = kriData.Where(l => l.Name == "KRI8").FirstOrDefault().Value;

                SqlParameter kri9 = new SqlParameter("@KRI9", SqlDbType.Int);
                kri9.Value = kriData.Where(l => l.Name == "KRI9").FirstOrDefault().Value;

                SqlParameter kri10 = new SqlParameter("@KRI10", SqlDbType.Int);
                kri10.Value = kriData.Where(l => l.Name == "KRI10").FirstOrDefault().Value;

                int result = ent.Database.SqlQuery<int>("exec dbo.uspRiskRadarUserMetricMapping @UserKey, @KRI1, @KRI2, @KRI3, @KRI4, @KRI5, @KRI6, @KRI7, @KRI8, @KRI9, @KRI10", userKey, kri1, kri2, kri3, kri4, kri5, kri6, kri7, kri8, kri9, kri10).First();
                if (result > 0)
                    isSuccess = true;
            }
            catch (Exception)
            {
                isSuccess = false;
            }
            return isSuccess;
        }

        [HttpGet]
        public bool GetChartImagePresence()
        {
            bool result = true;
            List<ChartMetadata> fileNames = UtilityFunctions.GetChartFileNamesForScreen(UtilityFunctions.GetUserKey(User.Identity.Name), "RiskRadarProfile");

            foreach (ChartMetadata metadata in fileNames)
            {
                if (UtilityFunctions.CheckBlobPresence(metadata.ChartImageGuid + ".jpg") == false)
                {
                    result = false;
                    break;
                }
            }
            if (fileNames?.Count == 0)
            {
                result = false;
            }

            return result;
        }

        [HttpPost]
        public RiskRadarViewDetails GetRiskRadarViewDetailsData(GetRiskProfileChartDataViewModel chartDataParameters)
        {
            RiskRadarViewDetails riskRadarViewDetails = new RiskRadarViewDetails();
            RiskRadarData chartData = GetRiskRadarChartData(chartDataParameters.InstitutionKey);
            if (chartData.QuarterlyData != null)
            {
                riskRadarViewDetails.QuarterlyData = this.MapChartDataToChartSpecificObject(chartData.QuarterlyData);
            }
            if (chartData.YearlyData != null)
            {
                riskRadarViewDetails.YearlyData = this.MapChartDataToChartSpecificObject(chartData.YearlyData);
            }
            riskRadarViewDetails.RiskRadarData = chartData;
            return riskRadarViewDetails;
        }

        [HttpPost, FileDownloadWebApi]
        public HttpResponseMessage GetPdfOfRiskRadarProfile(BankProfileOverviewParams profileParams)
        {
            //Fetch RiskRadar data from database
            RiskRadarData chartData = GetRiskRadarChartData(profileParams.InstitutionKey);

            RiskRadarChartData periodTypeChartData = new RiskRadarChartData();
            if (string.Compare(profileParams.Period, "QTD") == 0)
            {
                periodTypeChartData = chartData.QuarterlyData;
            }
            else
            {
                periodTypeChartData = chartData.YearlyData;
            }

            Aspose.Pdf.Document riskRadarProfile = new Aspose.Pdf.Document();
            Aspose.Pdf.PageInfo pageInfo = riskRadarProfile.PageInfo;
            Aspose.Pdf.MarginInfo marginInfo = pageInfo.Margin;
            marginInfo.Left = 18;
            marginInfo.Right = 25;
            marginInfo.Top = 30;
            marginInfo.Bottom = 30;
            pageInfo.IsLandscape = false;
            Aspose.Pdf.Table riskRadarHeader = new Aspose.Pdf.Table();
            riskRadarHeader.Margin = new Aspose.Pdf.MarginInfo(0, 15, 0, 0);
            riskRadarHeader.ColumnWidths = "2.21cm 8cm 5cm";

            // Added page.
            Aspose.Pdf.Page curPage = riskRadarProfile.Pages.Add();
            Aspose.Pdf.Row row = riskRadarHeader.Rows.Add();
            row.FixedRowHeight = 20;
            Aspose.Pdf.Cell cell1 = row.Cells.Add();
            cell1.IsWordWrapped = true;

            cell1.DefaultCellTextState = new Aspose.Pdf.Text.TextState("Verdana", 8);
            Aspose.Pdf.Text.TextFragment RiskRadarLable = new Aspose.Pdf.Text.TextFragment("CB Risk Radar");
            RiskRadarLable.TextState.FontSize = 8;
            RiskRadarLable.TextState.Font = Aspose.Pdf.Text.FontRepository.FindFont("Arial");
            RiskRadarLable.TextState.FontStyle = Aspose.Pdf.Text.FontStyles.Bold;
            cell1.Paragraphs.Add(RiskRadarLable);

            Aspose.Pdf.Cell cella = row.Cells.Add();
            cella.IsWordWrapped = true;
            cella.DefaultCellTextState = new Aspose.Pdf.Text.TextState("Verdana", 8);
            cella.DefaultCellTextState.Superscript = true;
            Aspose.Pdf.Text.TextFragment RiskRadarLable1 = new Aspose.Pdf.Text.TextFragment("TM");
            RiskRadarLable1.TextState.FontSize = 8;
            RiskRadarLable1.TextState.Font = Aspose.Pdf.Text.FontRepository.FindFont("Arial");
            RiskRadarLable1.TextState.FontStyle = Aspose.Pdf.Text.FontStyles.Bold;
            cella.Paragraphs.Add(RiskRadarLable1);

            Aspose.Pdf.Cell cellb = row.Cells.Add();
            /***********************************Header row end**/

            Paragraphs paragraphs = curPage.Paragraphs;
            paragraphs.Add(riskRadarHeader);

            //risk radar main table with one column
            Table riskRadarMainTable = new Table();
            riskRadarMainTable.ColumnWidths = "20cm";
            Row rrMainTblFirstRow = riskRadarMainTable.Rows.Add();
            Cell rrMainTblFirstCell = rrMainTblFirstRow.Cells.Add();
            rrMainTblFirstCell.Margin = new Aspose.Pdf.MarginInfo(10, 2, 30, 0); ;
            rrMainTblFirstCell.Alignment = HorizontalAlignment.Left;


            Table riskRadarContentWrapperTable = new Table();
            riskRadarContentWrapperTable.ColumnWidths = "9.3cm 10.5cm";
            //Need to remove this border once we got clear picture
            //riskRadarContentWrapperTable.Border = new Aspose.Pdf.BorderInfo(Aspose.Pdf.BorderSide.All, 1F, Aspose.Pdf.Color.FromArgb(166, 166, 166, 255));
            PdfCommon pdfCommon = new PdfCommon();

            /*Header Row Started*/
            Row headerRow = riskRadarContentWrapperTable.Rows.Add();
            headerRow.Border = new Aspose.Pdf.BorderInfo(Aspose.Pdf.BorderSide.Bottom, 1F, Aspose.Pdf.Color.Gray);
            Cell headerLeftCell = headerRow.Cells.Add();
            headerLeftCell.Margin = new Aspose.Pdf.MarginInfo(10, 2, 0, 0); ;
            headerLeftCell.Alignment = HorizontalAlignment.Left;

            PdfTextFragmentConfig config = new PdfTextFragmentConfig();
            config.Text = periodTypeChartData.KRIValues[0].InstitutionName;
            config.FontSize = 8;
            config.FontStyle = FontStyles.Bold;
            pdfCommon.generateTestFragmentAndAddToCell(headerLeftCell, config);

            Cell headerRightCell = headerRow.Cells.Add();
            headerRightCell.Alignment = HorizontalAlignment.Right;
            headerRightCell.Margin = new MarginInfo(0, 2, 10, 0);
            config.Text = "FDIC Certificate: " + chartData.SelectedBankDetails.CertNumber;
            pdfCommon.generateTestFragmentAndAddToCell(headerRightCell, config);
            /*Header Row end*/

            Row firstRow = riskRadarContentWrapperTable.Rows.Add();
            Cell firstRowleftCell = firstRow.Cells.Add();
            firstRowleftCell.VerticalAlignment = Aspose.Pdf.VerticalAlignment.Bottom;

            Cell firstRowrightCell = firstRow.Cells.Add();
            firstRowrightCell.VerticalAlignment = Aspose.Pdf.VerticalAlignment.Bottom;
            // firstRow.Border = new Aspose.Pdf.BorderInfo(Aspose.Pdf.BorderSide.Bottom, 0.1F, Aspose.Pdf.Color.FromArgb(166, 166, 166, 255));
            /*******************row end*************************/

            Table middleContentWrapperTable = new Table();
            middleContentWrapperTable.Margin.Left = 10; middleContentWrapperTable.Margin.Bottom = 5; middleContentWrapperTable.Margin.Top = 0; middleContentWrapperTable.Margin.Right = 0;
            middleContentWrapperTable.ColumnWidths = "10cm";

            Row middleFirstRow = middleContentWrapperTable.Rows.Add();
            Cell middleFirstRowFirstCell = middleFirstRow.Cells.Add();
            middleFirstRowFirstCell.Paragraphs.Add(BankInfoOfPdf(chartData, periodTypeChartData));
            middleFirstRowFirstCell.Paragraphs.Add(GetDataTableForRankAndPointsOverAll());
            /********************Left side first row content insertion completed*****************************/
            firstRowleftCell.Paragraphs.Add(middleContentWrapperTable);

            Aspose.Pdf.Table leftContentWrapperTable = new Aspose.Pdf.Table();
            leftContentWrapperTable.ColumnWidths = "9.3cm";
            /*****************************Left container table for all charts or tables to insert at one time*******************************************/

            Row rowOverAllSheet = leftContentWrapperTable.Rows.Add();
            Cell overAllSheetDataCell = rowOverAllSheet.Cells.Add();

            Table balanceSheetDataTable = this.GetDataTableForOverAll("OverAllSheet", periodTypeChartData);
            overAllSheetDataCell.Paragraphs.Add(balanceSheetDataTable);

            firstRowrightCell.Paragraphs.Add(leftContentWrapperTable);

            List<ChartMetadata> fileNames = UtilityFunctions.GetChartFileNamesForScreen(UtilityFunctions.GetUserKey(User.Identity.Name), "RiskRadarProfile");

            pdfCommon.genarateEmptyRowWithEmptyCellValue(riskRadarContentWrapperTable, 30);

            // Below line is used to do OrderBy ChartType, i.e to match and bind the top/below tables data with Chart data
            foreach (var obj in from ChartMetadata obj in fileNames
                                where obj.ChartType.Contains("riskRadarKRI")
                                select obj)
            {
                obj.ChartType = obj.ChartType.Replace("riskRadarKRI", "");
            }
            var chartFileNames = fileNames.OrderBy(f => Convert.ToInt32(f.ChartType)).ToList();

            rrMainTblFirstCell.Paragraphs.Add(riskRadarContentWrapperTable);

            // Used to generate the chart section of the pdf document along with table's on top/bottom
            GenerateChartsCells(periodTypeChartData, paragraphs, riskRadarMainTable, pdfCommon, chartFileNames);

            //Adding Disclaimer to the PDF           

            Row rrMainTblDisclaimer = riskRadarMainTable.Rows.Add();
            Cell rrMainTblDisclaimerCell = rrMainTblDisclaimer.Cells.Add();

            Table disclaimerTable  = DisclaimerTablePreparation(pdfCommon);

            rrMainTblDisclaimerCell.Paragraphs.Add(disclaimerTable);

            MemoryStream pdfStream = new MemoryStream();
            riskRadarProfile.Save(pdfStream);
            byte[] data1 = new byte[pdfStream.Length];
            pdfStream.Read(data1, 0, data1.Length);

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content = new ByteArrayContent(data1);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            result.Content.Headers.ContentLength = pdfStream.Length;
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = "RiskRadarProfile" + profileParams.InstitutionKey.ToString() + profileParams.Period + ".pdf";
            result.Content.Headers.ContentDisposition.Size = pdfStream.Length;

            pdfStream.Dispose();

            return result;
        }


        [HttpPost, FileDownloadWebApi]
        public HttpResponseMessage GetExcelOfRiskRadarProfile([FromBody] BankProfileOverviewParams profileParams)
        {
            RiskRadarData chartData = GetRiskRadarChartData(profileParams.InstitutionKey);
            List<RiskRadarRiskLevel> riskRadarRankAndPointsData = GetRiskRadarRiskLevelData();
            HttpResponseMessage result = new HttpResponseMessage();
            try
            {
                RiskRadarChartData data;
                if (string.Compare(profileParams.Period, "QTD") == 0)
                {
                    data = chartData.QuarterlyData;
                }
                else
                {
                    data = chartData.YearlyData;
                }

                List<ChartMetadata> fileNames = UtilityFunctions.GetChartFileNamesForScreen(UtilityFunctions.GetUserKey(User.Identity.Name), "RiskRadarProfile");
                List<byte[]> listOfImgBytes = new List<byte[]>();

                for (int j = 1; j <= fileNames.Count; j++)
                {
                    byte[] tmpBytes = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == ("riskRadarKRI" + j)).First().ChartImageGuid + ".jpg");
                    listOfImgBytes.Add(tmpBytes);
                }

                byte[] exceldata = ExportToExcel.CreateRiskRadarProfileExportToExcel.CreateExcelDocument(profileParams.Period, "RiskRadarProfile.xlsx", data, listOfImgBytes, riskRadarRankAndPointsData, chartData.SelectedBankDetails);
                result.Content = new ByteArrayContent(exceldata);
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ms-excel");
                result.Content.Headers.ContentLength = exceldata.Length;
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                result.Content.Headers.ContentDisposition.FileName = "RiskRadarProfile" + profileParams.InstitutionKey.ToString() + ".xlsx";
                result.Content.Headers.ContentDisposition.Size = exceldata.Length;

            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }
            return result;
        }

        private List<RiskRadarKRIData> GetKRISelectedData()
        {
            List<RiskRadarKRIData> lstRiskRadarKRIData = new List<RiskRadarKRIData>();

            //Fetch User specific KRI data
            RptCBRRiskRadarUserMetricmapping rptCBRRiskRadarUserMetricmapping = GetKRIDataWithUserKey();
            Dictionary<string, object> keyValuePairs = new Dictionary<string, object>();
            if (rptCBRRiskRadarUserMetricmapping != null)
            {
                keyValuePairs = UtilityFunctions.ObjectToDictionary(rptCBRRiskRadarUserMetricmapping);
            }

            //To get the KriMetricMasters table data
            var kriMasterData = ent.KriMetricMasters.ToList();

            var kriGroupData = kriMasterData.GroupBy(k => k.KriGroup).Select(grp => grp.ToList()).ToList();
            foreach (var kriData in kriGroupData)
            {
                RiskRadarKRIData riskRadarKRIData = new RiskRadarKRIData();
                riskRadarKRIData.KRIGroup = kriData[0].KriGroup;

                riskRadarKRIData.KRISequence = Convert.ToInt32(kriData[0].KriGroup.Replace("KRI", ""));
                int selectedId = 0;
                List<KRIData> lstKRIData = new List<KRIData>();
                foreach (var item in kriData)
                {
                    KRIData kRIData = new KRIData();
                    kRIData.IsDefault = item.IsDefault == 1 ? true : false;
                    if (selectedId == 0)
                        selectedId = item.IsDefault == 1 ? item.KriMetricId : selectedId;
                    kRIData.KriMetricId = item.KriMetricId;
                    kRIData.MetricDesc = item.MetricDesc;
                    kRIData.Metric = item.Metric;
                    kRIData.KriMetricSeq = item.KriMetricSeq;
                    lstKRIData.Add(kRIData);
                }
                lstKRIData = lstKRIData.OrderBy(k => k.KriMetricSeq).ToList();
                if (rptCBRRiskRadarUserMetricmapping != null)
                {
                    selectedId = Convert.ToInt32(keyValuePairs[kriData[0].KriGroup]);
                    riskRadarKRIData.KRISelected = lstKRIData.Where(l => l.KriMetricId == selectedId).FirstOrDefault();
                }
                else
                {
                    riskRadarKRIData.KRISelected = lstKRIData.Where(l => l.KriMetricId == selectedId).FirstOrDefault();
                }
                riskRadarKRIData.KRIValueData = lstKRIData;
                lstRiskRadarKRIData.Add(riskRadarKRIData);
            }
            return lstRiskRadarKRIData;
        }
        private Table DisclaimerTablePreparation(PdfCommon pdfCommon)
        {
            Table disclaimerTable = new Table();
            disclaimerTable.ColumnWidths = "19.1cm";
            disclaimerTable.Margin = new MarginInfo(0, 20, 0, 20);
            Row disclaimerFirstRow = disclaimerTable.Rows.Add();
            Cell disclaimerFirstRowCell = disclaimerFirstRow.Cells.Add();
            disclaimerFirstRowCell.BackgroundColor = Aspose.Pdf.Color.FromArgb(217, 217, 217);
            disclaimerFirstRowCell.Margin = new MarginInfo(5, 10, 5, 10);
           
            PdfTextFragmentConfig textDisclaimerConfig = new PdfTextFragmentConfig();
            textDisclaimerConfig.Text = "Information presented in this report reflects data reported to federal regulators " +
                "for the noted period. Although, this financial data obtained from FFIEC, FDIC and other sources is considered " +
                "reliable, the accuracy and completeness of the data cannot be guaranteed by CB Resource, Inc. The information is" +
                " presented in the form of financial ratios";
            textDisclaimerConfig.FontSize = 6;

            pdfCommon.generateTestFragmentAndAddToCell(disclaimerFirstRowCell, textDisclaimerConfig);

            Row disclaimerSecondRow = disclaimerTable.Rows.Add();
            Cell disclaimerSecondRowCell = disclaimerSecondRow.Cells.Add();
            disclaimerSecondRowCell.Margin = new MarginInfo(5, 6, 5, 6);
            disclaimerSecondRowCell.BackgroundColor = Aspose.Pdf.Color.FromArgb(217, 217, 217);
            textDisclaimerConfig.Text = "Any unauthorized use of this content, logos and/ or name is prohibited.";
            textDisclaimerConfig.FontSize = 6;
            textDisclaimerConfig.FontStyle = FontStyles.Italic;

            pdfCommon.generateTestFragmentAndAddToCell(disclaimerSecondRowCell, textDisclaimerConfig);

            return disclaimerTable;
        }

        private string GetImageNameForTrendColumn(TrendValues trendValue)
        {
            string imageName = string.Empty;
            switch (trendValue)
            {
                case TrendValues.UpArrowGreen:
                    {
                        imageName = "up-arrow-green";
                        break;
                    }
                case TrendValues.DownArrowGreen:
                    {
                        imageName = "down-arrow-green";
                        break;
                    }
                case TrendValues.UpArrowRed:
                    {
                        imageName = "up-arrow-red";
                        break;
                    }
                case TrendValues.DownArrowRed:
                    {
                        imageName = "down-arrow-red";
                        break;
                    }

            }
            return imageName;
        }

        private void GenerateChartsCells(RiskRadarChartData periodTypeChartData, Paragraphs paragraphs, Table riskRadarMainTable, PdfCommon pdfCommon, List<ChartMetadata> fileNames)
        {
            Table tblChart = new Table();
            tblChart.ColumnWidths = "10cm 10cm";
            for (int i = 0; i < periodTypeChartData.KRIValues.Count; i++)
            {
                Row newRow = tblChart.Rows.Add();

                Cell newRowleftCell = newRow.Cells.Add();
                newRowleftCell.VerticalAlignment = Aspose.Pdf.VerticalAlignment.Bottom;
                newRowleftCell.Margin = new MarginInfo(0, 0, 30, 0);

                Cell newRowrightCell = newRow.Cells.Add();
                newRowrightCell.VerticalAlignment = Aspose.Pdf.VerticalAlignment.Bottom;
                newRowrightCell.Margin = new MarginInfo(10, 0, 0, 0);

                MemoryStream mystream = new MemoryStream();

                newRowleftCell.Paragraphs.Add(GenerateRRChart(fileNames, periodTypeChartData.KRIValues[i], periodTypeChartData.TimePeriodHeaderLabels.CategoryLabels, fileNames[i].ChartType, mystream, true));
                newRowrightCell.Paragraphs.Add(GenerateRRChart(fileNames, periodTypeChartData.KRIValues[i + 1], periodTypeChartData.TimePeriodHeaderLabels.CategoryLabels, fileNames[i + 1].ChartType, mystream, false));

                // Add Empty Row
                pdfCommon.genarateEmptyRowWithEmptyCellValue(tblChart, 30);
                i++;
            }
            Row newRowMainTbl = riskRadarMainTable.Rows.Add();
            Cell newRowCellMainTbl = newRowMainTbl.Cells.Add();
            newRowCellMainTbl.Margin = new MarginInfo(10, 0, 10, 0);
            newRowCellMainTbl.Paragraphs.Add(tblChart);

            paragraphs.Add(riskRadarMainTable);
        }

        private Table BankInfoOfPdf(RiskRadarData chartData, RiskRadarChartData periodTypeChartData)
        {
            PdfCommon pdfCommon = new PdfCommon();
            Table table = new Table();
            table.Margin.Left = 0; table.Margin.Bottom = 0; table.Margin.Top = 10; table.Margin.Right = 0;
            table.ColumnWidths = "9cm";
            Row row = table.Rows.Add();
            Cell cell = row.Cells.Add();
            cell.Margin = new MarginInfo(0, 3, 0, 0);
            PdfTextFragmentConfig textConfig = new PdfTextFragmentConfig();
            textConfig.FontStyle = FontStyles.Regular;
            //textConfig.FontSize = 8;
            //textConfig.Font = "Arial";
            textConfig.Text = "Headquarter: " + chartData.SelectedBankDetails?.HeadQuarters;
            pdfCommon.generateTestFragmentAndAddToCell(cell, textConfig);

            row = table.Rows.Add();
            cell = row.Cells.Add();
            cell.Margin = new MarginInfo(0, 3, 0, 0);
            textConfig.Text = "Employees: " + chartData.SelectedBankDetails?.FTEmployees;
            pdfCommon.generateTestFragmentAndAddToCell(cell, textConfig);

            row = table.Rows.Add();
            cell = row.Cells.Add();
            cell.Margin = new MarginInfo(0, 3, 0, 0);
            textConfig.Text = "Branches: " + chartData.SelectedBankDetails?.NumberofBranches;
            pdfCommon.generateTestFragmentAndAddToCell(cell, textConfig);

            row = table.Rows.Add();
            cell = row.Cells.Add();
            cell.Margin = new MarginInfo(0, 3, 0, 0);
            textConfig.Text = "Sub-S: " + (chartData.SelectedBankDetails?.SubchapterS);
            pdfCommon.generateTestFragmentAndAddToCell(cell, textConfig);

            row = table.Rows.Add();
            cell = row.Cells.Add();
            textConfig.Text = "Regulator: FED";
            pdfCommon.generateTestFragmentAndAddToCell(cell, textConfig);

            pdfCommon.genarateEmptyRowWithEmptyCellValue(table);

            row = table.Rows.Add();
            cell = row.Cells.Add();
            cell.Margin = new MarginInfo(0, 3, 0, 0);
            textConfig.Text = "Assets ($000): " + periodTypeChartData.AssetSize;
            pdfCommon.generateTestFragmentAndAddToCell(cell, textConfig);

            row = table.Rows.Add();
            cell = row.Cells.Add();
            cell.Margin = new MarginInfo(0, 3, 0, 0);
            textConfig.Text = "Peer Group: " + periodTypeChartData.KRIValues[0].PeerGroup;
            pdfCommon.generateTestFragmentAndAddToCell(cell, textConfig);

            pdfCommon.genarateEmptyRowWithEmptyCellValue(table);
            pdfCommon.genarateEmptyRowWithEmptyCellValue(table);

            return table;
        }

        private Table GenerateRRChart(List<ChartMetadata> fileNames, KRIValues chartDataKriValues, List<CategoryLabel> timePeriodHeaderLabels, string chartName, MemoryStream mystream, bool isFirstCell)
        {
            PdfCommon pdfCoommon = new PdfCommon();
            Table tblChart = new Table();
            tblChart.Margin.Right = 10;
            tblChart.ColumnWidths = isFirstCell?"10cm" : "9.13cm";
            Row rrRow = tblChart.Rows.Add();

            PdfCellConfig cellConfig = new PdfCellConfig();
            cellConfig.HorizontalAlignment = HorizontalAlignment.Center;
            cellConfig.Margin = new MarginInfo(2, 2, 2, 0);
            Cell rrCell = pdfCoommon.generateTableCell(rrRow, cellConfig);

            PdfTextFragmentConfig config = new PdfTextFragmentConfig();
            config.FontStyle = FontStyles.Regular;
            config.FontSize = 8;
            config.Font = "Arial";
            config.Text = chartDataKriValues.KRIMetricDescription;
            pdfCoommon.generateTestFragmentAndAddToCell(rrCell, config);

            Row row2 = tblChart.Rows.Add();
            Cell row2Cell = row2.Cells.Add();
            Table roaaDataTable = this.GetDataTableTopSectionForChart(chartDataKriValues, isFirstCell);
            roaaDataTable.Border = new Aspose.Pdf.BorderInfo(Aspose.Pdf.BorderSide.All, 0.1F, Aspose.Pdf.Color.Gray);
            row2Cell.Paragraphs.Add(roaaDataTable);

            Row row3 = tblChart.Rows.Add();
            Cell row3Cell = row3.Cells.Add();

            Table chartWrapperTable = new Table();
            chartWrapperTable.ColumnWidths = isFirstCell ? "9cm" : "7.95cm";
            Row row = chartWrapperTable.Rows.Add();
            Cell cell = row.Cells.Add();
            byte[] tmpBytes = null;

            tmpBytes = UtilityFunctions.DownloadChartFromAzureStorage(fileNames.Where(obj => obj.ChartType == chartName).First().ChartImageGuid + ".jpg");

            // first  Image 
            mystream = new MemoryStream(tmpBytes);
            // Create an image object
            Aspose.Pdf.Image riskRadarKRIChart = new Aspose.Pdf.Image();
            riskRadarKRIChart.Margin = new Aspose.Pdf.MarginInfo(0, 0, 0, 0);
            // Set the image file stream
            riskRadarKRIChart.ImageStream = mystream;
            riskRadarKRIChart.FixHeight = 130;
            riskRadarKRIChart.FixWidth = isFirstCell ? 248 : 278;
            cell.Paragraphs.Add(riskRadarKRIChart);
            chartWrapperTable.Border = new Aspose.Pdf.BorderInfo(Aspose.Pdf.BorderSide.All, 0.1F, Aspose.Pdf.Color.Gray);

            row3Cell.Paragraphs.Add(chartWrapperTable);

            Row row4 = tblChart.Rows.Add();
            Cell row4Cell = row4.Cells.Add();
            Table bottomDataTable = this.GetDataTableBottomSectionForChart(chartDataKriValues, timePeriodHeaderLabels,isFirstCell);
            bottomDataTable.Border = new Aspose.Pdf.BorderInfo(Aspose.Pdf.BorderSide.All, 0.1F, Aspose.Pdf.Color.Gray);
            row4Cell.Paragraphs.Add(bottomDataTable);

            return tblChart;
        }

        private Aspose.Pdf.Table GetDataTableTopSectionForChart(KRIValues chartDataKriValues,bool isFirstCell)
        {
            string columnWidth = "1.5cm";
          
            PdfCommon pdfCommon = new PdfCommon();
            PdfTableConfig tableConfig = new PdfTableConfig();
            tableConfig.Margin = new MarginInfo(0, 0, 0, 0);
            if (isFirstCell)
                tableConfig.ColumnWidths = "1.46cm" + " " + columnWidth + " " + columnWidth + " " + columnWidth + " " + columnWidth + " " + columnWidth + "";
            else
            {
                columnWidth = "1.26cm";
                tableConfig.ColumnWidths = "1.61cm" + " " + columnWidth + " " + columnWidth + " " + columnWidth + " " + columnWidth + " " + columnWidth + "";
            }
            Table dataTable = pdfCommon.generateEmptyTable(tableConfig);

            Row dataRow = pdfCommon.generateEmptyRow(dataTable);
            GenerateHeader2RowsCells(dataRow, "Score", Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow, chartDataKriValues.CurrentMinus4KRIValue.CurrentScoreValue == null ? "NA" : chartDataKriValues.CurrentMinus4KRIValue.CurrentScoreValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow, chartDataKriValues.CurrentMinus3KRIValue.CurrentScoreValue == null ? "NA" : chartDataKriValues.CurrentMinus3KRIValue.CurrentScoreValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow, chartDataKriValues.CurrentMinus2KRIValue.CurrentScoreValue == null ? "NA" : chartDataKriValues.CurrentMinus2KRIValue.CurrentScoreValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow, chartDataKriValues.CurrentMinus1KRIValue.CurrentScoreValue == null ? "NA" : chartDataKriValues.CurrentMinus1KRIValue.CurrentScoreValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow, chartDataKriValues.CurrentKRIValue.CurrentScoreValue == null ? "NA" : chartDataKriValues.CurrentKRIValue.CurrentScoreValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black);
            /********************************************Row 2***************************************************************/
            Row dataRow2 = pdfCommon.generateEmptyRow(dataTable);
            GenerateHeader2RowsCells(dataRow2, "Risk Level", Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow2, chartDataKriValues.CurrentMinus4KRIValue.RiskLevel, GetColor(chartDataKriValues.CurrentMinus4KRIValue.BackGroundColor), GetForeGroundColor(chartDataKriValues.CurrentMinus4KRIValue.FontColor));
            GenerateHeader2RowsCells(dataRow2, chartDataKriValues.CurrentMinus3KRIValue.RiskLevel, GetColor(chartDataKriValues.CurrentMinus3KRIValue.BackGroundColor), GetForeGroundColor(chartDataKriValues.CurrentMinus3KRIValue.FontColor));
            GenerateHeader2RowsCells(dataRow2, chartDataKriValues.CurrentMinus2KRIValue.RiskLevel, GetColor(chartDataKriValues.CurrentMinus2KRIValue.BackGroundColor), GetForeGroundColor(chartDataKriValues.CurrentMinus2KRIValue.FontColor));
            GenerateHeader2RowsCells(dataRow2, chartDataKriValues.CurrentMinus1KRIValue.RiskLevel, GetForeGroundColor(chartDataKriValues.CurrentMinus1KRIValue.BackGroundColor), GetColor(chartDataKriValues.CurrentMinus1KRIValue.FontColor));
            GenerateHeader2RowsCells(dataRow2, chartDataKriValues.CurrentKRIValue.RiskLevel, GetForeGroundColor(chartDataKriValues.CurrentKRIValue.BackGroundColor), GetColor(chartDataKriValues.CurrentKRIValue.FontColor));
            /*********************************************Row 2 End************************************************************************/

            return dataTable;
        }

        private Aspose.Pdf.Table GetDataTableBottomSectionForChart(KRIValues chartDataKriValues, List<CategoryLabel> timePeriodHeaderLabels,bool isFirstCell)
        {
            string columnWidth = isFirstCell ? "1.793cm" : "1.585cm";
            PdfCommon pdfCommon = new PdfCommon();
            PdfTableConfig tableConfig = new PdfTableConfig();
            tableConfig.Margin = new MarginInfo(0, 0, 0, 0);
            tableConfig.ColumnWidths = columnWidth + " " + columnWidth + " " + columnWidth + " " + columnWidth + " " + columnWidth + "";
            Table dataTable = pdfCommon.generateEmptyTable(tableConfig);

            Row row1 = pdfCommon.generateEmptyRow(dataTable);

            foreach (CategoryLabel tableHeader in timePeriodHeaderLabels)
            {
                GenerateHeader2RowsCells(row1, tableHeader.Label, Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black);
            }

            Row dataRow = pdfCommon.generateEmptyRow(dataTable);
            GenerateHeader2RowsCells(dataRow, chartDataKriValues.CurrentMinus4KRIValue.CurrentDataValue == null ? "NA" : chartDataKriValues.CurrentMinus4KRIValue.CurrentDataValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255, 255),Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow, chartDataKriValues.CurrentMinus3KRIValue.CurrentDataValue == null ? "NA" : chartDataKriValues.CurrentMinus3KRIValue.CurrentDataValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow, chartDataKriValues.CurrentMinus2KRIValue.CurrentDataValue == null ? "NA" : chartDataKriValues.CurrentMinus2KRIValue.CurrentDataValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow, chartDataKriValues.CurrentMinus1KRIValue.CurrentDataValue == null ? "NA" : chartDataKriValues.CurrentMinus1KRIValue.CurrentDataValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow, chartDataKriValues.CurrentKRIValue.CurrentDataValue == null ? "NA" : chartDataKriValues.CurrentKRIValue.CurrentDataValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black);
            /********************************************Row 2***************************************************************/
            Row dataRow2 = pdfCommon.generateEmptyRow(dataTable);
            GenerateHeader2RowsCells(dataRow2, chartDataKriValues.CurrentMinus4KRIValue.CurrentPeerGroupAvgValue == null ? "NA" : chartDataKriValues.CurrentMinus4KRIValue.CurrentPeerGroupAvgValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow2, chartDataKriValues.CurrentMinus3KRIValue.CurrentPeerGroupAvgValue == null ? "NA" : chartDataKriValues.CurrentMinus3KRIValue.CurrentPeerGroupAvgValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow2, chartDataKriValues.CurrentMinus2KRIValue.CurrentPeerGroupAvgValue == null ? "NA" : chartDataKriValues.CurrentMinus2KRIValue.CurrentPeerGroupAvgValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow2, chartDataKriValues.CurrentMinus1KRIValue.CurrentPeerGroupAvgValue == null ? "NA" : chartDataKriValues.CurrentMinus1KRIValue.CurrentPeerGroupAvgValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255), Aspose.Pdf.Color.Black);
            GenerateHeader2RowsCells(dataRow2, chartDataKriValues.CurrentKRIValue.CurrentPeerGroupAvgValue == null ? "NA" : chartDataKriValues.CurrentKRIValue.CurrentPeerGroupAvgValue.ToString(), Aspose.Pdf.Color.FromArgb(255, 255, 255), Aspose.Pdf.Color.Black);
            /*********************************************Row 2 End************************************************************************/
            return dataTable;
        }

        private Aspose.Pdf.Table GetDataTableForOverAll(string key, RiskRadarChartData chartData)
        {
            string columnWidth = "1.3cm";
            string labelValue = "OVERALL";
            
            PdfCommon pdfCommon = new PdfCommon();
            PdfTableConfig tableConfig = new PdfTableConfig();
            tableConfig.Margin = new MarginInfo(0, 1, 0, 0);
            tableConfig.ColumnWidths = "2.0cm " + columnWidth + " " + columnWidth + " " + columnWidth + " " + columnWidth + " " + columnWidth + " " + columnWidth + "";
            Table dataTable = pdfCommon.generateEmptyTable(tableConfig);
            Row headerRow = pdfCommon.generateEmptyRow(dataTable);
           
            GenerateHeaderFirstCell(headerRow, labelValue, true);
            foreach (CategoryLabel tableHeader in chartData.TimePeriodHeaderLabels.CategoryLabels)
            {
                GenerateHeader2RowsCells(headerRow, tableHeader.Label, Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black, true, true);
            }
            GenerateHeader2RowsEmptyCells(headerRow, "", false,true);
            Row dataRow = pdfCommon.generateEmptyRow(dataTable);
            Row dataRow2 = pdfCommon.generateEmptyRow(dataTable);
            for (int headerOrder = 0; headerOrder < chartData.HeaderScoreInformation.Count; headerOrder++)
            {
                if (headerOrder == 0)
                {
                    GenerateHeaderFirstCell(dataRow, "Score");
                    GenerateHeaderFirstCell(dataRow2, "Risk Level");
                }

                if (headerOrder < chartData.HeaderScoreInformation.Count)
                {
                    GenerateHeader2RowsCells(dataRow, chartData.HeaderScoreInformation[headerOrder].ScoreValue.ToString(), Aspose.Pdf.Color.FromArgb(242, 242, 242, 255), Aspose.Pdf.Color.Black);
                    GenerateHeader2RowsCells(dataRow2, chartData.HeaderScoreInformation[headerOrder].RiskLevel, GetColor(chartData.HeaderScoreInformation[headerOrder].BackGroundColor), GetForeGroundColor(chartData.HeaderScoreInformation[headerOrder].FontColor));
                }
                else if (headerOrder == chartData.HeaderScoreInformation.Count)
                {
                    GenerateHeader2RowsCells(dataRow, "", Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black, false);
                    GenerateHeader2RowsCells(dataRow2, "", Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black, false);
                }
            }

            Row bottomRow1 = pdfCommon.generateEmptyRow(dataTable);
            Cell bottomRowCell1 = bottomRow1.Cells.Add();
            bottomRowCell1.ColSpan = 6;
            TextFragment textFragment = new TextFragment("");
            bottomRowCell1.Paragraphs.Add(textFragment);
            GenerateHeader2RowsCells(bottomRow1, "TREND", Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black, true, true);

            for (int j = 0; j < chartData.KRIValues.Count; j++)
            {
                GenerateOverallTableKRIRowValues(dataTable, chartData.KRIValues[j]);
            }
            return dataTable;
        }

        private void GenerateOverallTableKRIRowValues(Table dataTable, KRIValues kriData)
        {
            PdfCommon pdfCoommon = new PdfCommon();
            Row row = pdfCoommon.generateEmptyRow(dataTable);

            GenerateHeaderFirstCell(row, kriData.KRIMetricName, true);
            GenerateHeader2RowsCells(row, kriData.CurrentMinus4KRIValue.CurrentDataValue == null ? "NA" : kriData.CurrentMinus4KRIValue.CurrentDataValue.ToString(), GetColor(kriData.CurrentMinus4KRIValue.BackGroundColor), GetForeGroundColor(kriData.CurrentMinus4KRIValue.FontColor));
            GenerateHeader2RowsCells(row, kriData.CurrentMinus3KRIValue.CurrentDataValue == null ? "NA" : kriData.CurrentMinus3KRIValue.CurrentDataValue.ToString(), GetColor(kriData.CurrentMinus3KRIValue.BackGroundColor), GetForeGroundColor(kriData.CurrentMinus3KRIValue.FontColor));
            GenerateHeader2RowsCells(row, kriData.CurrentMinus2KRIValue.CurrentDataValue == null ? "NA" : kriData.CurrentMinus2KRIValue.CurrentDataValue.ToString(), GetColor(kriData.CurrentMinus2KRIValue.BackGroundColor), GetForeGroundColor(kriData.CurrentMinus2KRIValue.FontColor));
            GenerateHeader2RowsCells(row, kriData.CurrentMinus1KRIValue.CurrentDataValue == null ? "NA" : kriData.CurrentMinus1KRIValue.CurrentDataValue.ToString(), GetColor(kriData.CurrentMinus1KRIValue.BackGroundColor), GetForeGroundColor(kriData.CurrentMinus1KRIValue.FontColor));
            GenerateHeader2RowsCells(row, kriData.CurrentKRIValue.CurrentDataValue == null ? "NA" : kriData.CurrentKRIValue.CurrentDataValue.ToString(), GetColor(kriData.CurrentKRIValue.BackGroundColor), GetForeGroundColor(kriData.CurrentKRIValue.FontColor));
            if (kriData.TrendValue == TrendValues.EqualValue || kriData.TrendValue == 0)
            {
                GenerateHeader2RowsCells(row, "---", Aspose.Pdf.Color.FromArgb(255, 255, 255), Aspose.Pdf.Color.Black);
            }
            else
            {
                string imageName = GetImageNameForTrendColumn(kriData.TrendValue);

                if (!string.IsNullOrEmpty(imageName))
                {
                    pdfCoommon.generateTableCellWithArrowImage(row, imageName);
                }
            }
        }

        private Aspose.Pdf.Color GetColor(string colorValue)
        {
            Aspose.Pdf.Color color = Aspose.Pdf.Color.Parse(colorValue != null ? colorValue : "#FFFFFF");
            return color;
        }

        private Aspose.Pdf.Color GetForeGroundColor(string colorValue)
        {
            Aspose.Pdf.Color color = Aspose.Pdf.Color.Parse(colorValue != null ? colorValue : "#000000");
            return color;
        }

        private Aspose.Pdf.Table GetDataTableForRankAndPointsOverAll()
        {
            PdfCommon pdfCoommon = new PdfCommon();
            PdfTableConfig tableConfig = new PdfTableConfig();
            tableConfig.Margin = new MarginInfo(0, 1, 0, 0);
            tableConfig.ColumnWidths = "2cm 2cm 2cm";
            Table dataTable = pdfCoommon.generateEmptyTable(tableConfig);

            List<RiskRadarRiskLevel> riskRadarRankAndPointsData = GetRiskRadarRiskLevelData();
            Row dataRow = pdfCoommon.generateEmptyRow(dataTable);
            GenerateHeader2RowsCells(dataRow, "Rating", Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black, false, false, true);
            GenerateHeader2RowsCells(dataRow, "Points (ea)", Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black, false);
            GenerateHeader2RowsCells(dataRow, "Overall (sum)", Aspose.Pdf.Color.FromArgb(255, 255, 255, 255), Aspose.Pdf.Color.Black, false);
            foreach (RiskRadarRiskLevel riskLevel in riskRadarRankAndPointsData)
            {
                dataRow = pdfCoommon.generateEmptyRow(dataTable);
                GenerateHeader2RowsCells(dataRow, riskLevel.RiskLevel, GetColor(riskLevel.BackGroundColor), GetForeGroundColor(riskLevel.FontColor), true, false, true);
                GenerateHeader2RowsCells(dataRow, riskLevel.MinPoints + " to " + riskLevel.MaxPoints, GetColor(riskLevel.BackGroundColor), GetForeGroundColor(riskLevel.FontColor));
                GenerateHeader2RowsCells(dataRow, riskLevel.MinOverAll + " to " + riskLevel.MaxOverAll, GetColor(riskLevel.BackGroundColor), GetForeGroundColor(riskLevel.FontColor));
            }

            return dataTable;
        }

        private void GenerateHeaderFirstCell(Row row, string lableValue, bool isBold = false)
        {
            PdfCommon pdfCoommon = new PdfCommon();
            PdfCellConfig cellConfig = new PdfCellConfig();
            cellConfig.HorizontalAlignment = HorizontalAlignment.Left;
            Cell cell = pdfCoommon.generateTableCell(row, cellConfig);
            PdfTextFragmentConfig textFragmentConfig = new PdfTextFragmentConfig();
            textFragmentConfig.Text = lableValue;
            textFragmentConfig.FontStyle = isBold == true ? FontStyles.Bold : FontStyles.Regular;
            pdfCoommon.generateTestFragmentAndAddToCell(cell, textFragmentConfig);
        }

        private void GenerateHeader2RowsCells(Row row, string lableValue, Aspose.Pdf.Color backGroundColor, Aspose.Pdf.Color foreGroundColor, Boolean hasBorders = true, Boolean isBold = false, Boolean isLeftAligned = false, Boolean isOnlyTopBorder = false)
        {
            PdfCommon pdfCoommon = new PdfCommon();
            PdfCellConfig cellConfig = new PdfCellConfig();
            cellConfig.BackgroundColor = backGroundColor;
            cellConfig.Margin = new Aspose.Pdf.MarginInfo(0, 2, 0, 2);
            if (isOnlyTopBorder == true)
            {
                cellConfig.Border = (isOnlyTopBorder == true && hasBorders == false) ? new BorderInfo(BorderSide.Top, 0.1F, Aspose.Pdf.Color.Gray) : null;
            }
            else
            {
                cellConfig.Border = hasBorders == true ? new BorderInfo(BorderSide.All, 0.1F, Aspose.Pdf.Color.Gray) : null;
            }

            cellConfig.HorizontalAlignment = isLeftAligned == true ? HorizontalAlignment.Left : HorizontalAlignment.Center;
            Cell cell = pdfCoommon.generateTableCell(row, cellConfig);
            PdfTextFragmentConfig textFragmentConfig = new PdfTextFragmentConfig();
            textFragmentConfig.Text = lableValue;
            textFragmentConfig.FontStyle = isBold == true ? FontStyles.Bold : FontStyles.Regular;
            textFragmentConfig.ForeGroundColor = foreGroundColor;
            pdfCoommon.generateTestFragmentAndAddToCell(cell, textFragmentConfig);
        }

        private void GenerateHeader2RowsEmptyCells(Row row, string lableValue, Boolean hasBorders = true, Boolean isOnlyLeftBorder = false)
        {
            PdfCommon pdfCoommon = new PdfCommon();
            PdfCellConfig cellConfig = new PdfCellConfig();
           // cellConfig.BackgroundColor = backGroundColor;
            cellConfig.Margin = new Aspose.Pdf.MarginInfo(0, 2, 0, 2);
            if (isOnlyLeftBorder == true)
            {
                cellConfig.Border = (isOnlyLeftBorder == true && hasBorders == false) ? new BorderInfo(BorderSide.Left, 0.1F, Aspose.Pdf.Color.Gray) : null;
            }
            else
            {
                cellConfig.Border = hasBorders == true ? new BorderInfo(BorderSide.All, 0.1F, Aspose.Pdf.Color.Gray) : null;
            }

          //  cellConfig.HorizontalAlignment = isLeftAligned == true ? HorizontalAlignment.Left : HorizontalAlignment.Center;
            Cell cell = pdfCoommon.generateTableCell(row, cellConfig);
            PdfTextFragmentConfig textFragmentConfig = new PdfTextFragmentConfig();
            textFragmentConfig.Text = lableValue;
          //  textFragmentConfig.FontStyle = isBold == true ? FontStyles.Bold : FontStyles.Regular;
          //  textFragmentConfig.ForeGroundColor = foreGroundColor;
            pdfCoommon.generateTestFragmentAndAddToCell(cell, textFragmentConfig);
        }


        private List<KRIWithChartData> MapChartDataToChartSpecificObject(RiskRadarChartData result)
        {

            List<KRIWithChartData> kRIWithChartDataList = new List<KRIWithChartData>();
            var headerLabels = result.TimePeriodHeaderLabels;

            for (int i = 0; i < result.KRIValues?.Count; i++)
            {
                LineBarChart barLineChartData = new LineBarChart();
                LineBarChart lineBarChartData = new LineBarChart();
                ChartCategoryAndSeriesData yearlyChartData = new ChartCategoryAndSeriesData();
                ChartCategoryAndSeriesData quarterlyChartData = new ChartCategoryAndSeriesData();
                CategoryList cate = new CategoryList();
                Category cg = new Category();
                DataSetDataItem barChartDataSet = new DataSetDataItem();
                DataSetDataItem lineChartDataSet = new DataSetDataItem();
                barChartDataSet.SeriesName = result.KRIValues[i].InstitutionName;
                barChartDataSet.ShowValues = "1";
                barChartDataSet.Visible = "1";
                lineChartDataSet.SeriesName = result.KRIValues[i].PeerGroup;
                lineChartDataSet.RenderAs = "line";
                lineChartDataSet.Visible = "1";


                barChartDataSet.Data = new List<DataValue>();
                lineChartDataSet.Data = new List<DataValue>();

                PrepareLineBarChartDataInfo(cg, headerLabels.CategoryLabels[0].Label, result.KRIValues[i].CurrentMinus4KRIValue, barChartDataSet, lineChartDataSet);

                PrepareLineBarChartDataInfo(cg, headerLabels.CategoryLabels[1].Label, result.KRIValues[i].CurrentMinus3KRIValue, barChartDataSet, lineChartDataSet);

                PrepareLineBarChartDataInfo(cg, headerLabels.CategoryLabels[2].Label, result.KRIValues[i].CurrentMinus2KRIValue, barChartDataSet, lineChartDataSet);

                PrepareLineBarChartDataInfo(cg, headerLabels.CategoryLabels[3].Label, result.KRIValues[i].CurrentMinus1KRIValue, barChartDataSet, lineChartDataSet);

                PrepareLineBarChartDataInfo(cg, headerLabels.CategoryLabels[4].Label, result.KRIValues[i].CurrentKRIValue, barChartDataSet, lineChartDataSet);
                cate.Category = cg;

                yearlyChartData.Categories = cate;
                yearlyChartData.DataSetList.Add(barChartDataSet);
                yearlyChartData.DataSetList.Add(lineChartDataSet);

                barLineChartData.YearlyChartData = yearlyChartData;
                barLineChartData.QuarterlyChartData = quarterlyChartData;
                KRIWithChartData kriChartData = new KRIWithChartData();
                kriChartData.GroupName = "KRI" + (i + 1);
                kriChartData.Name = result.KRIValues[i].KRIMetricName;
                kriChartData.LineBarChartData = barLineChartData;
                kRIWithChartDataList.Add(kriChartData);
            }

            return kRIWithChartDataList;
        }

        private void PrepareLineBarChartDataInfo(Category cg, string categroyLabe, KRIValueData kriValueData, DataSetDataItem barChartDataSet, DataSetDataItem lineChartDataSet)
        {
            CategoryLabel label = new CategoryLabel();
            label.Label = categroyLabe; //"2017Y"; 
            cg.CategoryLabels.Add(label);
            DataValue barChartDataValue = new DataValue();
            DataValue lineChartDataValue = new DataValue();
            barChartDataValue.Value = kriValueData.CurrentDataValue?.ToString();//"1.35";
            lineChartDataValue.Value = kriValueData.CurrentPeerGroupAvgValue?.ToString();
            barChartDataSet.Data.Add(barChartDataValue);
            lineChartDataSet.Data.Add(lineChartDataValue);
        }

        private RptCBRRiskRadarUserMetricmapping GetKRIDataWithUserKey()
        {
            RptCBRRiskRadarUserMetricmapping rptCBRRiskRadarUserMetricmapping;
            var userKey = UtilityFunctions.GetUserKey(User.Identity.Name);
            rptCBRRiskRadarUserMetricmapping = ent.RptCBRRiskRadarUserMetricmappings.Where(c => c.Userkey == userKey).FirstOrDefault();
            return rptCBRRiskRadarUserMetricmapping;
        }

        private RiskRadarChartData GetRiskRadarDataWithPeriod(List<RptCBRRiskRadarChartDetail> rrChartData)
        {
            RiskRadarChartData riskRadarChartData = new RiskRadarChartData();
            //Fetching KRI Selected values
            List<RptCBRRiskRadarChartDetail> lstSelectedKRIData = BindKRISelectedData(rrChartData);

            //Header Score Info.
            List<RRHeaderScoreInformation> lstRRHeaderScoreInformation = BindHeaderScoreInformation(lstSelectedKRIData);
            riskRadarChartData.HeaderScoreInformation = lstRRHeaderScoreInformation;

            //Binding KRI Values
            List<KRIValues> lstKRIValues = BindKRIValues(lstSelectedKRIData);
            riskRadarChartData.KRIValues = lstKRIValues;

            //Binding Assetsize, it's common for all metrics and is based on Institution Key,time Period
            if (!string.IsNullOrEmpty(rrChartData[0]?.AssetSize))
                riskRadarChartData.AssetSize = UtilityFunctions.ConvertToAssetFormat(rrChartData[0]?.AssetSize);
            return riskRadarChartData;
        }

        private Category GetCategoryTimeLabels(string timePeriod)
        {
            Category categoryLabels;
            if (timePeriod == "QTD")
            {
                categoryLabels = UtilityFunctions.GetQuarterlyCategories();
            }
            else
            {
                categoryLabels = UtilityFunctions.GetYearlyCategories();
            }
            return categoryLabels;
        }

        private List<KRIValues> BindKRIValues(List<RptCBRRiskRadarChartDetail> lstSelectedKRIData)
        {
            List<KRIValues> lstKRIValues = new List<KRIValues>();

            //To get the KriMetricMasters table data for getting KRIGroupName
            var kriMasterData = ent.KriMetricMasters.ToList();
            int i = 0;
            foreach (var selectedKRI in lstSelectedKRIData)
            {
                KRIValues kriValue = new KRIValues();

                //Peer Average Group values for KRI
                PeerGroupAverageValue peerGroupAverageValue = new PeerGroupAverageValue();
                if (selectedKRI != null)
                {
                    peerGroupAverageValue.CurrentPeerGroupAvgValue = selectedKRI.CurrentPeerGroupAvgValue.HasValue ? Decimal.Round(selectedKRI.CurrentPeerGroupAvgValue.Value, 2) : selectedKRI.CurrentPeerGroupAvgValue;
                    peerGroupAverageValue.CurrentMinus1PeerGroupAvgValue = selectedKRI.CurrentMinus1PeerGroupAvgValue.HasValue ? Decimal.Round(selectedKRI.CurrentMinus1PeerGroupAvgValue.Value, 2) : selectedKRI.CurrentMinus1PeerGroupAvgValue;
                    peerGroupAverageValue.CurrentMinus2PeerGroupAvgValue = selectedKRI.CurrentMinus2PeerGroupAvgValue.HasValue ? Decimal.Round(selectedKRI.CurrentMinus2PeerGroupAvgValue.Value, 2) : selectedKRI.CurrentMinus2PeerGroupAvgValue;
                    peerGroupAverageValue.CurrentMinus3PeerGroupAvgValue = selectedKRI.CurrentMinus3PeerGroupAvgValue.HasValue ? Decimal.Round(selectedKRI.CurrentMinus3PeerGroupAvgValue.Value, 2) : selectedKRI.CurrentMinus3PeerGroupAvgValue;
                    peerGroupAverageValue.CurrentMinus4PeerGroupAvgValue = selectedKRI.CurrentMinus4PeerGroupAvgValue.HasValue ? Decimal.Round(selectedKRI.CurrentMinus4PeerGroupAvgValue.Value, 2) : selectedKRI.CurrentMinus4PeerGroupAvgValue;
                }
                kriValue.peerGroupAverageValue = peerGroupAverageValue;

                if (selectedKRI != null)
                {
                    kriValue.KRIMetricName = kriMasterData.Where(r => r.KriMetricId == selectedKRI.KriMetricId).FirstOrDefault()?.Metric; //selectedKRI.KriMetricId.ToString();
                    kriValue.isHighScoreGood = selectedKRI.IsHighScoreGood == 1 ? true : false;
                    kriValue.PeerGroup = selectedKRI.PeerGroup;
                    kriValue.InstitutionName = selectedKRI.InstitutionName;
                    kriValue.KRIMetricId = selectedKRI.KriMetricId;
                    kriValue.KRIMetricDescription = kriMasterData.Where(r => r.KriMetricId == selectedKRI.KriMetricId).FirstOrDefault()?.MetricDesc;
                }
                else
                {
                    //Fetch User specific KRI data
                    var kriSelectedData = GetKRISelectedData();
                    // OrderBy KRISequence is needed to get the KRI1,KRI2.... in order for below data
                    var kriSelectedDataInOrder = kriSelectedData.OrderBy(d => d.KRISequence).ToList();
                    kriValue.KRIMetricName = kriSelectedDataInOrder[i].KRISelected.Metric;
                    kriValue.KRIMetricDescription = kriSelectedDataInOrder[i].KRISelected.MetricDesc;
                }

                //first Column
                KRIValueData currentValue = new KRIValueData();
                if (selectedKRI != null)
                {
                    currentValue.CurrentDataValue = selectedKRI.CurrentDataValue.HasValue ? Decimal.Round(selectedKRI.CurrentDataValue.Value, 2) : selectedKRI.CurrentDataValue;
                    currentValue.CurrentPeerGroupAvgValue = peerGroupAverageValue.CurrentPeerGroupAvgValue;
                    currentValue.CurrentScoreValue = selectedKRI.CurrentScoreValue;
                }
                currentValue.BackGroundColor = GetRRIndividuaScoreNameAndColor(currentValue.CurrentScoreValue)?.BackGroundColor;
                currentValue.RiskLevel = GetRRIndividuaScoreNameAndColor(currentValue.CurrentScoreValue)?.RiskLevelShortName;
                if (currentValue.RiskLevel == "High")
                {
                    // When background color is red then we need white font color
                    currentValue.FontColor = "#ffffff";
                }
                kriValue.CurrentKRIValue = currentValue;

                //second column
                KRIValueData currentMinus1KRIValue = new KRIValueData();
                if (selectedKRI != null)
                {
                    currentMinus1KRIValue.CurrentDataValue = selectedKRI.CurrentMinus1DataValue.HasValue ? Decimal.Round(selectedKRI.CurrentMinus1DataValue.Value, 2) : selectedKRI.CurrentMinus1DataValue;
                    currentMinus1KRIValue.CurrentPeerGroupAvgValue = peerGroupAverageValue.CurrentMinus1PeerGroupAvgValue;
                    currentMinus1KRIValue.CurrentScoreValue = selectedKRI.CurrentMinus1ScoreValue;
                }
                currentMinus1KRIValue.BackGroundColor = GetRRIndividuaScoreNameAndColor(currentMinus1KRIValue.CurrentScoreValue)?.BackGroundColor;
                currentMinus1KRIValue.RiskLevel = GetRRIndividuaScoreNameAndColor(currentMinus1KRIValue.CurrentScoreValue)?.RiskLevelShortName;
                if (currentMinus1KRIValue.RiskLevel == "High")
                {
                    // When background color is red then we need white font color
                    currentMinus1KRIValue.FontColor = "#ffffff";
                }
                kriValue.CurrentMinus1KRIValue = currentMinus1KRIValue;

                //third column
                KRIValueData currentMinus2KRIValue = new KRIValueData();
                if (selectedKRI != null)
                {
                    currentMinus2KRIValue.CurrentDataValue = selectedKRI.CurrentMinus2DataValue.HasValue ? Decimal.Round(selectedKRI.CurrentMinus2DataValue.Value, 2) : selectedKRI.CurrentMinus2DataValue;
                    currentMinus2KRIValue.CurrentPeerGroupAvgValue = peerGroupAverageValue.CurrentMinus2PeerGroupAvgValue;
                    currentMinus2KRIValue.CurrentScoreValue = selectedKRI.CurrentMinus2ScoreValue;
                }
                currentMinus2KRIValue.BackGroundColor = GetRRIndividuaScoreNameAndColor(currentMinus2KRIValue.CurrentScoreValue)?.BackGroundColor;
                currentMinus2KRIValue.RiskLevel = GetRRIndividuaScoreNameAndColor(currentMinus2KRIValue.CurrentScoreValue)?.RiskLevelShortName;
                if (currentMinus2KRIValue.RiskLevel == "High")
                {
                    // When background color is red then we need white font color
                    currentMinus2KRIValue.FontColor = "#ffffff";
                }
                kriValue.CurrentMinus2KRIValue = currentMinus2KRIValue;

                //fourth column
                KRIValueData currentMinus3KRIValue = new KRIValueData();
                if (selectedKRI != null)
                {
                    currentMinus3KRIValue.CurrentDataValue = selectedKRI.CurrentMinus3DataValue.HasValue ? Decimal.Round(selectedKRI.CurrentMinus3DataValue.Value, 2) : selectedKRI.CurrentMinus3DataValue;
                    currentMinus3KRIValue.CurrentPeerGroupAvgValue = peerGroupAverageValue.CurrentMinus3PeerGroupAvgValue;
                    currentMinus3KRIValue.CurrentScoreValue = selectedKRI.CurrentMinus3ScoreValue;
                }
                currentMinus3KRIValue.BackGroundColor = GetRRIndividuaScoreNameAndColor(currentMinus3KRIValue.CurrentScoreValue)?.BackGroundColor;
                currentMinus3KRIValue.RiskLevel = GetRRIndividuaScoreNameAndColor(currentMinus3KRIValue.CurrentScoreValue)?.RiskLevelShortName;
                if (currentMinus3KRIValue.RiskLevel == "High")
                {
                    // When background color is red then we need white font color
                    currentMinus3KRIValue.FontColor = "#ffffff";
                }
                kriValue.CurrentMinus3KRIValue = currentMinus3KRIValue;

                //fifth column
                KRIValueData currentMinus4KRIValue = new KRIValueData();
                if (selectedKRI != null)
                {
                    currentMinus4KRIValue.CurrentDataValue = selectedKRI.CurrentMinus4DataValue.HasValue ? Decimal.Round(selectedKRI.CurrentMinus4DataValue.Value, 2) : selectedKRI.CurrentMinus4DataValue;
                    currentMinus4KRIValue.CurrentPeerGroupAvgValue = peerGroupAverageValue.CurrentMinus4PeerGroupAvgValue;
                    currentMinus4KRIValue.CurrentScoreValue = selectedKRI.CurrentMinus4ScoreValue;
                }
                currentMinus4KRIValue.BackGroundColor = GetRRIndividuaScoreNameAndColor(currentMinus4KRIValue.CurrentScoreValue)?.BackGroundColor;
                currentMinus4KRIValue.RiskLevel = GetRRIndividuaScoreNameAndColor(currentMinus4KRIValue.CurrentScoreValue)?.RiskLevelShortName;
                if (currentMinus4KRIValue.RiskLevel == "High")
                {
                    // When background color is red then we need white font color
                    currentMinus4KRIValue.FontColor = "#ffffff";
                }
                kriValue.CurrentMinus4KRIValue = currentMinus4KRIValue;

                //Set Trend Flag
                if (selectedKRI != null)
                {
                    if (kriValue.CurrentKRIValue.CurrentDataValue > kriValue.CurrentMinus1KRIValue.CurrentDataValue)
                    {
                        if (kriValue.isHighScoreGood)
                        {
                            kriValue.TrendValue = TrendValues.UpArrowGreen;
                            kriValue.TrendImage = "up-arrow-green.png";
                        }
                        else
                        {
                            kriValue.TrendValue = TrendValues.UpArrowRed;
                            kriValue.TrendImage = "up-arrow-red.png";
                        }
                    }
                    else if (kriValue.CurrentKRIValue.CurrentDataValue < kriValue.CurrentMinus1KRIValue.CurrentDataValue)
                    {
                        if (kriValue.isHighScoreGood)
                        {
                            kriValue.TrendValue = TrendValues.DownArrowRed;
                            kriValue.TrendImage = "down-arrow-red.png";
                        }
                        else
                        {
                            kriValue.TrendValue = TrendValues.DownArrowGreen;
                            kriValue.TrendImage = "down-arrow-green.png";
                        }
                    }
                    else if (kriValue.CurrentKRIValue.CurrentDataValue == kriValue.CurrentMinus1KRIValue.CurrentDataValue)
                    {
                        kriValue.TrendValue = TrendValues.EqualValue;
                        kriValue.TrendImage = "3Dashes.png";
                    }
                    else if (kriValue.CurrentKRIValue.CurrentDataValue == null || kriValue.CurrentMinus1KRIValue.CurrentDataValue == null)
                    {
                        kriValue.TrendValue = TrendValues.EqualValue;
                        kriValue.TrendImage = "3Dashes.png";
                    }
                }
                else
                {
                    kriValue.TrendValue = TrendValues.EqualValue;
                    kriValue.TrendImage = "3Dashes.png";
                }
                lstKRIValues.Add(kriValue);
                i++;
            }

            return lstKRIValues;
        }

        private List<RptCBRRiskRadarChartDetail> BindKRISelectedData(List<RptCBRRiskRadarChartDetail> rrQuaterlyData)
        {
            List<RptCBRRiskRadarChartDetail> lstSelectedKRIData = new List<RptCBRRiskRadarChartDetail>();
            try
            {
                //Fetch User specific KRI data
                var kriSelectedData = GetKRISelectedData();
                // OrderBy KRISequence is needed to get the KRI1,KRI2.... in order for below data
                var kriSelectedDataInOrder = kriSelectedData.OrderBy(d => d.KRISequence).ToList();
                //Fetch KRI's records
                var KRI1 = rrQuaterlyData.Where(r => r.KriMetricId == Convert.ToInt32(kriSelectedDataInOrder[0].KRISelected.KriMetricId)).FirstOrDefault();
                var KRI2 = rrQuaterlyData.Where(r => r.KriMetricId == Convert.ToInt32(kriSelectedDataInOrder[1].KRISelected.KriMetricId)).FirstOrDefault();
                var KRI3 = rrQuaterlyData.Where(r => r.KriMetricId == Convert.ToInt32(kriSelectedDataInOrder[2].KRISelected.KriMetricId)).FirstOrDefault();
                var KRI4 = rrQuaterlyData.Where(r => r.KriMetricId == Convert.ToInt32(kriSelectedDataInOrder[3].KRISelected.KriMetricId)).FirstOrDefault();
                var KRI5 = rrQuaterlyData.Where(r => r.KriMetricId == Convert.ToInt32(kriSelectedDataInOrder[4].KRISelected.KriMetricId)).FirstOrDefault();
                var KRI6 = rrQuaterlyData.Where(r => r.KriMetricId == Convert.ToInt32(kriSelectedDataInOrder[5].KRISelected.KriMetricId)).FirstOrDefault();
                var KRI7 = rrQuaterlyData.Where(r => r.KriMetricId == Convert.ToInt32(kriSelectedDataInOrder[6].KRISelected.KriMetricId)).FirstOrDefault();
                var KRI8 = rrQuaterlyData.Where(r => r.KriMetricId == Convert.ToInt32(kriSelectedDataInOrder[7].KRISelected.KriMetricId)).FirstOrDefault();
                var KRI9 = rrQuaterlyData.Where(r => r.KriMetricId == Convert.ToInt32(kriSelectedDataInOrder[8].KRISelected.KriMetricId)).FirstOrDefault();
                var KRI10 = rrQuaterlyData.Where(r => r.KriMetricId == Convert.ToInt32(kriSelectedDataInOrder[9].KRISelected.KriMetricId)).FirstOrDefault();
                lstSelectedKRIData.Add(KRI1);
                lstSelectedKRIData.Add(KRI2);
                lstSelectedKRIData.Add(KRI3);
                lstSelectedKRIData.Add(KRI4);
                lstSelectedKRIData.Add(KRI5);
                lstSelectedKRIData.Add(KRI6);
                lstSelectedKRIData.Add(KRI7);
                lstSelectedKRIData.Add(KRI8);
                lstSelectedKRIData.Add(KRI9);
                lstSelectedKRIData.Add(KRI10);
            }
            catch (Exception ex)
            {
                // throw;
            }
            return lstSelectedKRIData;
        }

        private List<RRHeaderScoreInformation> BindHeaderScoreInformation(List<RptCBRRiskRadarChartDetail> lstSelectedKRIData)
        {
            //Get Overall scores
            List<RRHeaderScoreInformation> lstRRHeaderScoreInformation = new List<RRHeaderScoreInformation>();

            List<int?> headerColumnScoreValues = new List<int?>();
            List<int?> headerColumn1ScoreValues = new List<int?>();
            List<int?> headerColumn2ScoreValues = new List<int?>();
            List<int?> headerColumn3ScoreValues = new List<int?>();
            List<int?> headerColumn4ScoreValues = new List<int?>();

            foreach (var kriData in lstSelectedKRIData)
            {
                headerColumnScoreValues.Add(kriData?.CurrentScoreValue);
                headerColumn1ScoreValues.Add(kriData?.CurrentMinus1ScoreValue);
                headerColumn2ScoreValues.Add(kriData?.CurrentMinus2ScoreValue);
                headerColumn3ScoreValues.Add(kriData?.CurrentMinus3ScoreValue);
                headerColumn4ScoreValues.Add(kriData?.CurrentMinus4ScoreValue);
            }

            List<int?> overAllScoreValues = new List<int?>();

            overAllScoreValues.Add(GetHeaderScoreValues(headerColumn4ScoreValues));
            overAllScoreValues.Add(GetHeaderScoreValues(headerColumn3ScoreValues));
            overAllScoreValues.Add(GetHeaderScoreValues(headerColumn2ScoreValues));
            overAllScoreValues.Add(GetHeaderScoreValues(headerColumn1ScoreValues));
            overAllScoreValues.Add(GetHeaderScoreValues(headerColumnScoreValues));

            for (int i = 0; i < overAllScoreValues.Count(); i++)
            {
                RRHeaderScoreInformation rRHeaderScoreInformation = new RRHeaderScoreInformation();
                rRHeaderScoreInformation.ScoreValue = overAllScoreValues[i];
                rRHeaderScoreInformation.BackGroundColor = GetRROverAllScoreRiskNameAndColor(rRHeaderScoreInformation.ScoreValue)?.BackGroundColor;
                rRHeaderScoreInformation.FontColor = GetRROverAllScoreRiskNameAndColor(rRHeaderScoreInformation.ScoreValue)?.FontColor;
                rRHeaderScoreInformation.RiskLevel = GetRROverAllScoreRiskNameAndColor(rRHeaderScoreInformation.ScoreValue)?.RiskLevelShortName;
                lstRRHeaderScoreInformation.Add(rRHeaderScoreInformation);
            }

            return lstRRHeaderScoreInformation;
        }

        private static int? GetHeaderScoreValues(List<int?> headerColumnScoreValues)
        {
            // Calcuating the Score Value for Columns values =   1 10 Null 1 Null Null 1 1 1 Null
            // 1. Sum up all the score values for specific KRI if all the values are Numeric.
            // 2. If any of the value is Null then we need to calculate the value for such columns
            // a. NA = Sum of Numeric values / No. of Columns with numeric value = 15 / 6 = 2.5 (round to 0 decimal) = 3             
            // b. Overall Score = 1+10+3+1+3+3+1+1+1+3 = 27
            int? TotalScore = null;
            int kriValueLength = headerColumnScoreValues.Where(y => y.HasValue).Count(); //Check for nulls
            int kriScoreTotal = headerColumnScoreValues.Where(y => y.HasValue).Sum(y => y.Value);
            if (kriValueLength < 10 && kriValueLength != 0)
            {
                var emptyScore = Math.Round(Convert.ToDecimal(kriScoreTotal) / Convert.ToDecimal(kriValueLength));
                TotalScore = Convert.ToInt32(((10 - kriValueLength) * emptyScore) + kriScoreTotal);
            }
            else
            {
                if (kriValueLength == 0)
                {
                    TotalScore = null;
                }
                else
                    TotalScore = kriScoreTotal;
            }
            return TotalScore;
        }

        private RiskRadarRiskLevel GetRROverAllScoreRiskNameAndColor(int? riskValue)
        {
            List<RiskRadarRiskLevel> lstRiskRadaraRatings = GetRiskRadarRatings();
            RiskRadarRiskLevel rating = new RiskRadarRiskLevel();
            if (riskValue != null)
            {
                rating = lstRiskRadaraRatings.Where(r => riskValue >= r.MinOverAll && riskValue <= r.MaxOverAll).FirstOrDefault();
            }
            else
            {
                rating = lstRiskRadaraRatings.Where(r => r.RiskLevel == "No Rating").FirstOrDefault();
            }
            return rating;
        }

        private RiskRadarRiskLevel GetRRIndividuaScoreNameAndColor(decimal? scoreValue)
        {
            List<RiskRadarRiskLevel> lstRiskRadarRatings = GetRiskRadarRatings();
            RiskRadarRiskLevel rating = new RiskRadarRiskLevel();
            if (scoreValue != null)
            {
                rating = lstRiskRadarRatings.Where(r => scoreValue >= r.MinPoints && scoreValue <= r.MaxPoints).FirstOrDefault();
            }
            else
            {
                rating = lstRiskRadarRatings.Where(r => r.RiskLevel == "NA").FirstOrDefault();
            }
            return rating;
        }

        private List<RiskRadarRiskLevel> GetRiskRadarRatings()
        {
            List<RiskRadarRiskLevel> lstRiskRadarRatings = new List<RiskRadarRiskLevel>();

            lstRiskRadarRatings.Add(GetRiskRadarRating("Low", 10, 27, 1, 2, "#00b053", "Low", "#000000"));
            lstRiskRadarRatings.Add(GetRiskRadarRating("Low-Moderate", 28, 45, 3, 4, "#8ed157", "Low-Mod", "#000000"));
            lstRiskRadarRatings.Add(GetRiskRadarRating("Moderate", 46, 64, 5, 6, "#faff04", "Moderate", "#000000"));
            lstRiskRadarRatings.Add(GetRiskRadarRating("Moderate-High", 65, 82, 7, 8, "#eb7d38", "Mod-High", "#000000"));
            lstRiskRadarRatings.Add(GetRiskRadarRating("High", 83, 100, 9, 10, "#fc0100", "High", "#ffffff"));
            lstRiskRadarRatings.Add(GetRiskRadarRating("NA", 0, 0, 0, 0, "#d9d9d9", "No Rating", "#000000"));
            lstRiskRadarRatings.Add(GetRiskRadarRating("No Rating", 0, 0, 0, 0, "#d9d9d9", "No Rating", "#000000"));

            return lstRiskRadarRatings;
        }

        private RiskRadarRiskLevel GetRiskRadarRating(string rating, int minOverAll, int maxOverAll, int minPoints, int maxPoints, string bgrdColor, string riskLevelShortName, string fontcolor)
        {
            RiskRadarRiskLevel riskRadarRatings = new RiskRadarRiskLevel();
            riskRadarRatings.RiskLevel = rating;
            riskRadarRatings.MinOverAll = minOverAll;
            riskRadarRatings.MaxOverAll = maxOverAll;
            riskRadarRatings.MinPoints = minPoints;
            riskRadarRatings.MaxPoints = maxPoints;
            riskRadarRatings.BackGroundColor = bgrdColor;
            riskRadarRatings.RiskLevelShortName = riskLevelShortName;
            riskRadarRatings.FontColor = fontcolor;
            return riskRadarRatings;
        }

        //Below method is used to bind static / test data
        private RiskRadarChartData GetTestRiskRadarData()
        {
            RiskRadarChartData riskRadarChartData = new RiskRadarChartData();
            //Header Score Info.
            List<RRHeaderScoreInformation> lstRRHeaderScoreInformation = new List<RRHeaderScoreInformation>();
            RRHeaderScoreInformation rRHeaderScoreInformation = new RRHeaderScoreInformation();
            int[] overAllScoreValues = new int[] { 66, 63, 66, 62, 62 };
            for (int i = 0; i < 5; i++)
            {
                // Calcuating the Score Value for Columns values =   1 10 NA 1 NA NA 1 1 1 NA
                // 1. Sum up all the score values for specific KRI if all the values are Numeric.
                // 2. If any of the value is Null / NA / "" then we need to calculate the value for such columns
                // a. NA = Sum of Numeric values / No. of Columns with numeric value = 15 / 6 = 2.5 (round to 0 decimal) = 3             
                // b. Overall Score = 1+10+3+1+3+3+1+1+1+3 = 27
                rRHeaderScoreInformation.ScoreValue = 40;
                rRHeaderScoreInformation.ScoreValue = overAllScoreValues[i];
                rRHeaderScoreInformation.BackGroundColor = GetRROverAllScoreRiskNameAndColor(rRHeaderScoreInformation.ScoreValue)?.BackGroundColor;
                rRHeaderScoreInformation.RiskLevel = GetRROverAllScoreRiskNameAndColor(rRHeaderScoreInformation.ScoreValue)?.RiskLevelShortName;
                lstRRHeaderScoreInformation.Add(rRHeaderScoreInformation);
            }
            riskRadarChartData.HeaderScoreInformation = lstRRHeaderScoreInformation;

            decimal[,] multiDimensionalArray2 = {
                { 1.37m, 1.35m, 1.33m, 1.37m, 1.37m },
                { 3.46m, 3.54m, 3.40m, 3.33m, 3.48m } ,
                { 0.56m, 0.50m, 0.49m, 0.50m, 0.53m },
                { 9.0076m, 9.1424m, 8.6378m, 8.5266m, 8.6500m },
                { 0.10m, 0.13m, 0.24m, 0.19m, 0.16m },
                { 1.14m, 1.21m, 1.12m, 1.16m, 1.21m },
                { 0.10m, 0.00m, 0.01m, 0.00m, 0.03m },
                { 0.50m, 1.94m, 0.38m, 0.33m, 0.29m },
                { 1.40m, 1.28m, 1.18m, 1.11m, 1.06m },
                { 100.95m, 101.52m, 107.62m, 97.99m, 85.16m }
            };

            //KRI Table Values
            List<KRIValues> lstKRIValues = new List<KRIValues>();
            for (int i = 0; i < 10; i++)
            {
                KRIValues kriValue = new KRIValues();
                for (int j = 0; j < 5; j++)
                {
                    KRIValueData currentValue = new KRIValueData();
                    currentValue.CurrentDataValue = multiDimensionalArray2[i, j];
                    currentValue.CurrentPeerGroupAvgValue = 10;
                    currentValue.CurrentScoreValue = 2;
                    currentValue.BackGroundColor = GetRRIndividuaScoreNameAndColor(currentValue.CurrentScoreValue)?.BackGroundColor;

                    if (j == 0)
                        kriValue.CurrentKRIValue = currentValue;
                    if (j == 1)
                        kriValue.CurrentMinus1KRIValue = currentValue;
                    if (j == 2)
                        kriValue.CurrentMinus2KRIValue = currentValue;
                    if (j == 3)
                        kriValue.CurrentMinus3KRIValue = currentValue;
                    if (j == 4)
                        kriValue.CurrentMinus4KRIValue = currentValue;
                }
                kriValue.isHighScoreGood = true;
                if (i == 0)
                    kriValue.KRIMetricName = "ROAA";
                else if (i == 1)
                    kriValue.KRIMetricName = "NIM";
                else if (i == 2)
                    kriValue.KRIMetricName = "NII";
                else if (i == 3)
                    kriValue.KRIMetricName = "T1LVR";
                else if (i == 4)
                    kriValue.KRIMetricName = "NPA";
                else if (i == 5)
                    kriValue.KRIMetricName = "ACL";//"ALLL";
                else if (i == 6)
                    kriValue.KRIMetricName = "NCO";
                else if (i == 7)
                    kriValue.KRIMetricName = "30-89PD";
                else if (i == 8)
                    kriValue.KRIMetricName = "COF";
                else if (i == 9)
                    kriValue.KRIMetricName = "LDR";

                PeerGroupAverageValue peerGroupAverageValue = new PeerGroupAverageValue();

                peerGroupAverageValue.CurrentPeerGroupAvgValue = 10;
                peerGroupAverageValue.CurrentMinus1PeerGroupAvgValue = 20;
                peerGroupAverageValue.CurrentMinus2PeerGroupAvgValue = 30;
                peerGroupAverageValue.CurrentMinus3PeerGroupAvgValue = 25;
                peerGroupAverageValue.CurrentMinus4PeerGroupAvgValue = 10;

                kriValue.peerGroupAverageValue = peerGroupAverageValue;
                lstKRIValues.Add(kriValue);
            }

            riskRadarChartData.KRIValues = lstKRIValues;
            return riskRadarChartData;
        }

    }
}