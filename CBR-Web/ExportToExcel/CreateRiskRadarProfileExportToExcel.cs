using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using System.Data;
using System.Reflection;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml;
using CBR.Web.Models;
using System.Text.RegularExpressions;
using DocumentFormat.OpenXml.Drawing.Spreadsheet;
using Xdr = DocumentFormat.OpenXml.Drawing.Spreadsheet;
using A = DocumentFormat.OpenXml.Drawing;
using System.IO;
using System.Web.Hosting;

namespace CBR.Web.ExportToExcel
{
    public class CreateRiskRadarProfileExportToExcel
    {
        public static byte[] CreateExcelDocument(string annualType, string filename, RiskRadarChartData riskRadarChartData, List<byte[]> imgs, List<RiskRadarRiskLevel> riskRadarRankAndPointsData, DefaultBankDetails SelectedBankDetails)
        {
            byte[] data1 = null;
            try
            {
                data1 = CreateExcelDocumentAsStream(annualType, filename, riskRadarChartData, imgs, riskRadarRankAndPointsData, SelectedBankDetails);
            }
            catch (Exception ex)
            {
                Trace.WriteLine("Failed, exception thrown: " + ex.Message);
            }
            return data1;
        }

        public static byte[] CreateExcelDocumentAsStream(string annualType, string filename, RiskRadarChartData riskRadarChartData, List<byte[]> imgs, List<RiskRadarRiskLevel> riskRadarRankAndPointsData, DefaultBankDetails SelectedBankDetails)
        {
            byte[] data1 = null;
            try
            {
                System.IO.MemoryStream stream = new System.IO.MemoryStream();
                using (SpreadsheetDocument document = SpreadsheetDocument.Create(stream, SpreadsheetDocumentType.Workbook, true))
                {
                    WriteExcelFile(annualType, document, riskRadarChartData, imgs, riskRadarRankAndPointsData, SelectedBankDetails);
                }
                stream.Flush();
                stream.Position = 0;

                data1 = new byte[stream.Length];
                stream.Read(data1, 0, data1.Length);
                stream.Close();
            }
            catch (Exception ex)
            {
                Trace.WriteLine("Failed, exception thrown: " + ex.Message);
            }
            return data1;
        }
        private static void WriteExcelFile(string annualType, SpreadsheetDocument spreadsheet, RiskRadarChartData riskRadarChartData, List<byte[]> imgs, List<RiskRadarRiskLevel> riskRadarRankAndPointsData, DefaultBankDetails SelectedBankDetails)
        {
            //  Create the Excel file contents.  This function is used when creating an Excel file either writing 
            //  to a file, or writing to a MemoryStream.
            spreadsheet.AddWorkbookPart();
            spreadsheet.WorkbookPart.Workbook = new DocumentFormat.OpenXml.Spreadsheet.Workbook();

            spreadsheet.WorkbookPart.Workbook.Append(new BookViews(new WorkbookView()));

            //  If we don't add a "WorkbookStylesPart", OLEDB will refuse to connect to this .xlsx file !
            WorkbookStylesPart workbookStylesPart = spreadsheet.WorkbookPart.AddNewPart<WorkbookStylesPart>("rIdStyles");
            Stylesheet stylesheet = new Stylesheet();
            workbookStylesPart.Stylesheet = stylesheet;
            workbookStylesPart.Stylesheet = GenerateStyleSheet();

            uint worksheetNumber = 1;

            WorksheetPart newWorksheetPart = spreadsheet.WorkbookPart.AddNewPart<WorksheetPart>();
            newWorksheetPart.Worksheet = new DocumentFormat.OpenXml.Spreadsheet.Worksheet();
            // create sheet data
            newWorksheetPart.Worksheet.AppendChild(new DocumentFormat.OpenXml.Spreadsheet.SheetData());
            newWorksheetPart.Worksheet.AppendChild(new Alignment { Horizontal = HorizontalAlignmentValues.Right });

            // save worksheet
            WriteDataTableToExcelWorksheet(newWorksheetPart, riskRadarChartData, riskRadarRankAndPointsData, imgs, SelectedBankDetails);
            //Add width to columns
            int i = 0;
            for (i = 0; i < 26; i++)
            {
                newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)i + 2, (uint)i + 2, (i == 8 ? 12 : 9)), newWorksheetPart.Worksheet.SheetFormatProperties);
            }

            newWorksheetPart.Worksheet.Save();

            // create the worksheet to workbook relation
            if (worksheetNumber == 1)
                spreadsheet.WorkbookPart.Workbook.AppendChild(new DocumentFormat.OpenXml.Spreadsheet.Sheets());

            spreadsheet.WorkbookPart.Workbook.GetFirstChild<DocumentFormat.OpenXml.Spreadsheet.Sheets>().AppendChild(new DocumentFormat.OpenXml.Spreadsheet.Sheet()
            {
                Id = spreadsheet.WorkbookPart.GetIdOfPart(newWorksheetPart),
                SheetId = (uint)worksheetNumber,
                Name = annualType
            });
            spreadsheet.WorkbookPart.Workbook.Save();
        }

        private static void WriteDataTableToExcelWorksheet(WorksheetPart worksheetPart, RiskRadarChartData riskRadarChartData, List<RiskRadarRiskLevel> riskRadarRankAndPointsData, List<byte[]> imgs, DefaultBankDetails SelectedBankDetails)
        {

            var worksheet = worksheetPart.Worksheet;
            var sheetData = worksheet.GetFirstChild<SheetData>();

            //  Create a Header Row in our Excel file, containing one header for each Column of data in our DataTable.
            //
            //  We'll also create an array, showing which type each column of data is (Text or Numeric), so when we come to write the actual
            //  cells of data, we'll know if to write Text values or Numeric cell values.
            int numberOfColumns = 6;//dt.Columns.Count;
            bool[] IsNumericColumn = new bool[numberOfColumns];
            string[] excelColumnNames = new string[numberOfColumns];
            for (int n = 0; n < numberOfColumns; n++)
                excelColumnNames[n] = GetExcelColumnName(n);

            //  Create the Header row in our Excel Worksheet            

            for (int i = 0; i < 50; i++)
            {
                Row row = checkAndCreateExcelRow(sheetData, Convert.ToUInt32(i));
                if (i == 0)
                {
                    for (char c = 'A'; c <= 'Z'; c++)
                    {
                        AppendTextCell(c + "1", "", row, 8);
                    }
                }
            }

            MergeCells mergeCells = new MergeCells();
            PrepareHeaderSection(sheetData, riskRadarChartData, ref mergeCells, SelectedBankDetails);

            UInt32Value rowIndex = 10;
            PrepareOverAllRatingTable(sheetData, riskRadarChartData, worksheetPart, ref rowIndex);

            rowIndex = rowIndex - 6;
            PrepareRankAndPointsTable(riskRadarRankAndPointsData, sheetData, ref rowIndex);

            rowIndex = rowIndex - 15;
            prepareKRICharts(sheetData, riskRadarChartData, worksheetPart, imgs, ref mergeCells, ref rowIndex);


            //var footerRow1 = checkAndCreateExcelRow(sheetData, 77);  // add a row at the bottom of spreadsheet
            prepareHeaderOfKri(ref worksheetPart, ref sheetData, 77, "The data was compiled from financial data for the period noted, as reported to federal regulators. The financial data obtained from FFIEC,FDIC and other sources is consistently reliable, although; the accuracy", new string[] { "B", "U" }, ref mergeCells, 12);
            //AppendTextCell("B77", "" + "The data was compiled from financial data for the period noted, as reported to federal regulators. The financial data obtained from FFIEC,FDIC and other sources is consistently reliable, although; the accuracy", footerRow1, 12);
            prepareHeaderOfKri(ref worksheetPart, ref sheetData, 78, "and completeness of the data cannot be guaranteed by CB Resource, Inc. The information is presented in the form of financial ratios. Ratio definitions are provided at the end of this report. ", new string[] { "B", "U" }, ref mergeCells, 12);
            var footerRow3 = checkAndCreateExcelRow(sheetData, 79);
            AppendTextCell("B79", "" + "" + "Source: CB BankAnalytics™", footerRow3, 14);
            AppendTextCell("I79", "" + "" + "©2016 CB Resource, Inc.", footerRow3, 13);
            worksheetPart.Worksheet.InsertAfter(mergeCells, worksheetPart.Worksheet.Elements<SheetData>().First());
        }
        private static Row checkAndCreateExcelRow(SheetData sheetData, UInt32Value rowIndex)
        {
            Row row = sheetData.Elements<Row>().Where(r => r.RowIndex == Int32.Parse(rowIndex)).FirstOrDefault();
            if (row == null)
            {
                row = new Row { RowIndex = rowIndex };
                sheetData.Append(row);
            }
            return row;
        }

        private static void prepareKRICharts(SheetData sheetData, RiskRadarChartData riskRadarChartData, WorksheetPart workSheetPart, List<byte[]> imgs, ref MergeCells mergeCells, ref UInt32Value rowIndex)
        {
            //UInt32Value rowIndex = 13;
            int[] colIndexArray = new int[] { 11, 1, 8, 15, 1, 8, 15, 1, 8, 15 };
            List<string[]> excelColumnNamesListByChart = prepareKriChartsConfigInfo(true);
            List<string[]> mergeCellsInfo = prepareKriChartsConfigInfo(false);
            List<int[]> imageReSizesInfo = prepareKriChartsImageConfigInfo();
            int[] resetRowIndex = new int[] { 2, 3, 5, 6, 8, 9 };
            UInt32Value resetRowNumberFor3And4Charts = 0; ;
            for (int kriOrder = 0; kriOrder < riskRadarChartData.KRIValues.Count; kriOrder++)
            {
                if (kriOrder == 1 || kriOrder == 4 || kriOrder == 7)
                {
                    resetRowNumberFor3And4Charts = rowIndex;
                }
                else if (resetRowIndex.Contains(kriOrder))
                {
                    rowIndex = resetRowNumberFor3And4Charts;
                }
                prepareHeaderOfKri(ref workSheetPart, ref sheetData, rowIndex, riskRadarChartData.KRIValues[kriOrder].KRIMetricDescription, mergeCellsInfo[kriOrder], ref mergeCells);
                rowIndex++;
                prepareTwoHeaderRowsOfKris(riskRadarChartData.KRIValues[kriOrder], sheetData, ref rowIndex, excelColumnNamesListByChart[kriOrder]);

                var imageRowIndex = rowIndex;

                InsertImage(workSheetPart, imgs[kriOrder], 0, Int32.Parse(rowIndex), colIndexArray[kriOrder], true, imageReSizesInfo[kriOrder]);
                prepare3BottomRowsOfKris(riskRadarChartData.KRIValues[kriOrder], sheetData, ref rowIndex, riskRadarChartData.TimePeriodHeaderLabels.CategoryLabels, excelColumnNamesListByChart[kriOrder]);

                rowIndex++;
                rowIndex++;
            }
        }

        private static List<string[]> prepareKriChartsConfigInfo(bool isColumnsInfo)
        {
            if (isColumnsInfo)
            {
                List<string[]> excelColumnNamesListByChart = new List<string[]>();
                excelColumnNamesListByChart.Add(new string[] { "L", "M", "N", "O", "P", "Q" });
                excelColumnNamesListByChart.Add(new string[] { "B", "C", "D", "E", "F", "G" });
                excelColumnNamesListByChart.Add(new string[] { "I", "J", "K", "L", "M", "N" });
                excelColumnNamesListByChart.Add(new string[] { "P", "Q", "R", "S", "T", "U" });
                excelColumnNamesListByChart.Add(new string[] { "B", "C", "D", "E", "F", "G" });
                excelColumnNamesListByChart.Add(new string[] { "I", "J", "K", "L", "M", "N" });
                excelColumnNamesListByChart.Add(new string[] { "P", "Q", "R", "S", "T", "U" });
                excelColumnNamesListByChart.Add(new string[] { "B", "C", "D", "E", "F", "G" });
                excelColumnNamesListByChart.Add(new string[] { "I", "J", "K", "L", "M", "N" });
                excelColumnNamesListByChart.Add(new string[] { "P", "Q", "R", "S", "T", "U" });
                return excelColumnNamesListByChart;
            }
            List<string[]> mergeCellsInfo = new List<string[]>();
            mergeCellsInfo.Add(new string[] { "L", "Q" });
            mergeCellsInfo.Add(new string[] { "B", "G" });
            mergeCellsInfo.Add(new string[] { "I", "N" });
            mergeCellsInfo.Add(new string[] { "P", "U" });
            mergeCellsInfo.Add(new string[] { "B", "G" });
            mergeCellsInfo.Add(new string[] { "I", "N" });
            mergeCellsInfo.Add(new string[] { "P", "U" });
            mergeCellsInfo.Add(new string[] { "B", "G" });
            mergeCellsInfo.Add(new string[] { "I", "N" });
            mergeCellsInfo.Add(new string[] { "P", "U" });
            return mergeCellsInfo;
        }

        private static List<int[]> prepareKriChartsImageConfigInfo()
        {
            List<int[]> imageReSizesInfo = new List<int[]>();
            imageReSizesInfo.Add(new int[] { 490, 195 });

            imageReSizesInfo.Add(new int[] { 490, 195 });
            imageReSizesInfo.Add(new int[] { 520, 195 });
            imageReSizesInfo.Add(new int[] { 490, 195 });

            imageReSizesInfo.Add(new int[] { 490, 215 });
            imageReSizesInfo.Add(new int[] { 520, 215 });
            imageReSizesInfo.Add(new int[] { 490, 215 });

            imageReSizesInfo.Add(new int[] { 490, 230 });
            imageReSizesInfo.Add(new int[] { 500, 230 });
            imageReSizesInfo.Add(new int[] { 490, 230 });
            return imageReSizesInfo;
        }

        private static void prepareHeaderOfKri(ref WorksheetPart workSheetPart, ref SheetData sheetData, UInt32Value rowIndex, string headerText, string[] mergableCellesInfo, ref MergeCells mergeCells, int sytleIndex = 8)
        {
            MergeCell mergeCell1 = new MergeCell() { Reference = new StringValue((mergableCellesInfo[0] + rowIndex) + ":" + (mergableCellesInfo[1] + rowIndex)) };
            mergeCells.Append(mergeCell1);
            var row = checkAndCreateExcelRow(sheetData, rowIndex);
            AppendTextCell((mergableCellesInfo[0] + rowIndex), headerText, row, Convert.ToUInt32(sytleIndex));
        }
        private static void prepareTwoHeaderRowsOfKris(KRIValues kriValue, SheetData sheetData, ref UInt32Value rowIndex, string[] excelColumnNames)
        {
            for (int i = 0; i < 2; i++)
            {
                var currentRowIndex = rowIndex;
                Row row = checkAndCreateExcelRow(sheetData, rowIndex);
                for (int j = 0; j <= 5; j++)
                {
                    string[] currentCellValues = getCurrentCellKriValue(j, kriValue, i == 0 ? "score" : "riskLevel");
                    AppendTextCell(excelColumnNames[j] + rowIndex.ToString(), currentCellValues[0], row, GetBGColorValueByColorCode(currentCellValues[1], j == 0 ? true : false));
                }
                rowIndex++;
            }
        }
        private static void prepare3BottomRowsOfKris(KRIValues kriValue, SheetData sheetData, ref UInt32Value rowIndex, List<CategoryLabel> headerLabels, string[] excelColumnNames)
        {
            rowIndex = rowIndex + 9;
            for (int i = 0; i < 3; i++)
            {
                var currentRowIndex = rowIndex;
                var row = checkAndCreateExcelRow(sheetData, rowIndex);
                for (int j = 0; j <= 5; j++)
                {
                    if (j == 0)
                    {
                        AppendTextCell(excelColumnNames[j] + rowIndex.ToString(), "", row, 8);
                    }
                    else
                    {
                        if (i == 0)
                        {
                            AppendTextCell(excelColumnNames[j] + rowIndex.ToString(), headerLabels[j - 1].Label, row, 8);
                        }
                        else
                        {
                            string[] currentCellValues = getCurrentCellKriValue(j, kriValue, "", i == 2 ? true : false);
                            bool isEven = (j % 2) == 0 ? true : false;
                            UInt32Value styleIndex;
                            if (isEven)
                                styleIndex = 8;
                            else
                                styleIndex = 20;
                            AppendTextCell(excelColumnNames[j] + rowIndex.ToString(), currentCellValues[0], row, styleIndex);
                        }
                    }
                }
                rowIndex++;
            }
        }
        private static void PrepareOverAllRatingTable(SheetData sheetData, RiskRadarChartData riskRadarChartData, WorksheetPart workSheetPart, ref UInt32Value rowIndex)
        {
            string downArrowRed = HostingEnvironment.MapPath("~/Images/RiskRadar/down-arrow-red.png");
            string downArrowGreen = HostingEnvironment.MapPath("~/Images/RiskRadar/down-arrow-green.png");
            string upArrowGreen = HostingEnvironment.MapPath("~/Images/RiskRadar/up-arrow-green.png");
            string upArrowRed = HostingEnvironment.MapPath("~/Images/RiskRadar/up-arrow-red.png");
            string dashesPng = HostingEnvironment.MapPath("~/Images/RiskRadar/3Dashes.png");
            System.Drawing.Image downArrowRedImg = System.Drawing.Image.FromFile(downArrowRed);
            System.Drawing.Image downArrowGreenImg = System.Drawing.Image.FromFile(downArrowGreen);
            System.Drawing.Image upArrowGreenImg = System.Drawing.Image.FromFile(upArrowGreen);
            System.Drawing.Image upArrowRedImg = System.Drawing.Image.FromFile(upArrowRed);
            System.Drawing.Image dashesPngImg = System.Drawing.Image.FromFile(dashesPng);
            byte[] downAarrowRedImgBytes = (byte[])(new System.Drawing.ImageConverter()).ConvertTo(downArrowRedImg, typeof(byte[]));
            byte[] downAarrowGreenImgBytes = (byte[])(new System.Drawing.ImageConverter()).ConvertTo(downArrowGreenImg, typeof(byte[]));
            byte[] upAarrowGreenImgBytes = (byte[])(new System.Drawing.ImageConverter()).ConvertTo(upArrowGreenImg, typeof(byte[]));
            byte[] upAarrowRedImgBytes = (byte[])(new System.Drawing.ImageConverter()).ConvertTo(upArrowRedImg, typeof(byte[]));
            byte[] dashesPngImgBytes = (byte[])(new System.Drawing.ImageConverter()).ConvertTo(dashesPngImg, typeof(byte[]));
            double cellNumericValue = 0;

            string cellValue = "";
            string[] excelColumnNames = { "B", "C", "D", "E", "F", "G", "H" };
            for (int i = 0; i <= 3; i++)
            {
                var newExcelRow = checkAndCreateExcelRow(sheetData, rowIndex);
                for (int j = 0; j < 7; j++)
                {
                    string[] cellValueWithBackGroundColor = getValusOfFirst3RowsOfOverAllTable(i, j, riskRadarChartData);
                    AppendTextCell(excelColumnNames[j] + rowIndex.ToString(), cellValueWithBackGroundColor[0], newExcelRow, GetBGColorValueByColorCode(cellValueWithBackGroundColor[1]));
                }
                rowIndex++;
            }

            foreach (KRIValues kriValue in riskRadarChartData.KRIValues)
            {
                // ...create a new row, and append a set of this row's data to it.
                var newExcelRow = checkAndCreateExcelRow(sheetData, rowIndex);
                for (int colInx = 0; colInx < 7; colInx++)
                {
                    bool IsNumericColumn11 = false;
                    string[] currentCellValues = getCurrentCellKriValue(colInx, kriValue);
                    cellValue = currentCellValues[0];
                    if (colInx == 6)
                    {
                        switch (cellValue)
                        {
                            case "down-arrow-green.png":
                                InsertImage(workSheetPart, downAarrowGreenImgBytes, 0, Int16.Parse(rowIndex.ToString()), 7, true, new int[] { 15, 15 }, true);
                                break;
                            case "down-arrow-red.png":
                                InsertImage(workSheetPart, downAarrowRedImgBytes, 0, Int16.Parse(rowIndex.ToString()), 7, true, new int[] { 15, 15 }, true);
                                break;
                            case "up-arrow-red.png":
                                InsertImage(workSheetPart, upAarrowRedImgBytes, 0, Int16.Parse(rowIndex.ToString()), 7, true, new int[] { 15, 15 }, true);
                                break;
                            case "up-arrow-green.png":
                                InsertImage(workSheetPart, upAarrowGreenImgBytes, 0, Int16.Parse(rowIndex.ToString()), 7, true, new int[] { 15, 15 }, true);
                                break;
                            default:
                                InsertImage(workSheetPart, dashesPngImgBytes, 0, Int16.Parse(rowIndex.ToString()), 7, true, new int[] { 15, 15 }, true);
                                break;
                        }
                    }
                    else
                    {
                        if (cellValue == string.Empty || cellValue == null)
                        {
                            cellValue = "NA";
                            AppendTextCell(excelColumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, GetBGColorValueByColorCode(currentCellValues[1]));
                        }
                        else
                        {
                            var regex = "^[0-9.,]*$";
                            var match = Regex.Match(cellValue, regex, RegexOptions.IgnoreCase);
                            // Create cell with data
                            IsNumericColumn11 = match.Success;
                            cellValue = GetCellValue(cellValue);
                            // Create cell with data
                            if (IsNumericColumn11)
                            {
                                //  For numeric cells, make sure our input data IS a number, then write it out to the Excel file.
                                //  If this numeric value is NULL, then don't write anything to the Excel file.
                                cellNumericValue = 0;
                                if (double.TryParse(cellValue, out cellNumericValue))
                                {
                                    cellValue = cellNumericValue.ToString();
                                    cellValue = string.Format("{0:#,##0.##}", Convert.ToDouble(cellValue));
                                    AppendTextCell(excelColumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, GetBGColorValueByColorCode(currentCellValues[1]));
                                }
                            }
                            else
                            {
                                AppendTextCell(excelColumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, GetBGColorValueByColorCode(currentCellValues[1]));
                            }
                        }
                    }
                }
                rowIndex++;
            }
        }

        private static string[] getValusOfFirst3RowsOfOverAllTable(int rowIndex, int colIndex, RiskRadarChartData riskRadarChartData)
        {
            string[] cellValueWithBgColor = new string[2];
            if (rowIndex == 3 && colIndex == 6)
            {
                cellValueWithBgColor[0] = "TREND";
                cellValueWithBgColor[1] = "";
            }
            else if (colIndex == 6)
            {
                cellValueWithBgColor[0] = "";
                cellValueWithBgColor[1] = "";
            }
            else if (rowIndex == 0)
            {
                if (colIndex == 0)
                {
                    cellValueWithBgColor[0] = "OVERALL";
                    cellValueWithBgColor[1] = "left";
                }
                else
                {
                    cellValueWithBgColor[0] = riskRadarChartData.TimePeriodHeaderLabels.CategoryLabels[colIndex - 1].Label;
                    cellValueWithBgColor[1] = "";
                }
            }
            else if (rowIndex == 1)
            {
                if (colIndex == 0)
                {
                    cellValueWithBgColor[0] = "Score";
                    cellValueWithBgColor[1] = "left";
                }
                else
                {
                    cellValueWithBgColor[0] = riskRadarChartData.HeaderScoreInformation[colIndex - 1].ScoreValue.ToString();
                    cellValueWithBgColor[1] = "#F2F2F2";
                }
            }
            else if (rowIndex == 2)
            {
                if (colIndex == 0)
                {
                    cellValueWithBgColor[0] = "Risk Level";
                    cellValueWithBgColor[1] = "left";
                }
                else
                {
                    cellValueWithBgColor[0] = riskRadarChartData.HeaderScoreInformation[colIndex - 1].RiskLevel;
                    cellValueWithBgColor[1] = riskRadarChartData.HeaderScoreInformation[colIndex - 1].BackGroundColor;
                }
            }
            else
            {
                cellValueWithBgColor[0] = "";
                cellValueWithBgColor[1] = "";
            }
            return cellValueWithBgColor;
        }
        private static string[] getCurrentCellKriValue(int index, KRIValues kriValue, string type = "", bool isBankAvarageValue = false)
        {
            string[] currentCellValue = new string[3];
            switch (index)
            {
                case 0:
                    {
                        if (type == "score")
                        {
                            currentCellValue[0] = "Score";
                            currentCellValue[1] = "#F2F2F2";
                        }
                        else if (type == "riskLevel")
                        {
                            currentCellValue[0] = "Risk Level";
                            currentCellValue[1] = "#F2F2F2";
                        }
                        else
                        {
                            currentCellValue[0] = kriValue.KRIMetricName;
                            currentCellValue[1] = "left";
                        }
                        break;
                    }
                case 1:
                    {
                        if (type == "score")
                        {
                            currentCellValue[0] = kriValue.CurrentMinus4KRIValue.CurrentScoreValue == null ? "NA" : kriValue.CurrentMinus4KRIValue.CurrentScoreValue.ToString();
                            currentCellValue[1] = "#F2F2F2";
                        }
                        else if (type == "riskLevel")
                        {
                            currentCellValue[0] = kriValue.CurrentMinus4KRIValue.RiskLevel;
                            currentCellValue[1] = kriValue.CurrentMinus4KRIValue.BackGroundColor;
                        }
                        else if (isBankAvarageValue)
                        {
                            currentCellValue[0] = kriValue.CurrentMinus4KRIValue.CurrentPeerGroupAvgValue == null ? "NA" :kriValue.CurrentMinus4KRIValue.CurrentPeerGroupAvgValue.ToString();
                            currentCellValue[1] = "";
                        }
                        else
                        {
                            currentCellValue[0] = kriValue.CurrentMinus4KRIValue.CurrentDataValue == null ? "NA" : kriValue.CurrentMinus4KRIValue.CurrentDataValue.ToString();
                            currentCellValue[1] = kriValue.CurrentMinus4KRIValue.BackGroundColor;
                        }
                        break;
                    }
                case 2:
                    {
                        if (type == "score")
                        {
                            currentCellValue[0] = kriValue.CurrentMinus3KRIValue.CurrentScoreValue == null ? "NA" :kriValue.CurrentMinus3KRIValue.CurrentScoreValue.ToString();
                            currentCellValue[1] = "#F2F2F2";
                        }
                        else if (type == "riskLevel")
                        {
                            currentCellValue[0] = kriValue.CurrentMinus3KRIValue.RiskLevel;
                            currentCellValue[1] = kriValue.CurrentMinus3KRIValue.BackGroundColor;
                        }
                        else if (isBankAvarageValue)
                        {
                            currentCellValue[0] = kriValue.CurrentMinus3KRIValue.CurrentPeerGroupAvgValue == null ? "NA" :kriValue.CurrentMinus3KRIValue.CurrentPeerGroupAvgValue.ToString();
                            currentCellValue[1] = "";
                        }
                        else
                        {
                            currentCellValue[0] = kriValue.CurrentMinus3KRIValue.CurrentDataValue == null ? "NA" :kriValue.CurrentMinus3KRIValue.CurrentDataValue.ToString();
                            currentCellValue[1] = kriValue.CurrentMinus3KRIValue.BackGroundColor;
                        }
                        break;
                    }
                case 3:
                    {
                        if (type == "score")
                        {
                            currentCellValue[0] = kriValue.CurrentMinus2KRIValue.CurrentScoreValue == null ? "NA" : kriValue.CurrentMinus2KRIValue.CurrentScoreValue.ToString();
                            currentCellValue[1] = "#F2F2F2";
                        }
                        else if (type == "riskLevel")
                        {
                            currentCellValue[0] = kriValue.CurrentMinus2KRIValue.RiskLevel;
                            currentCellValue[1] = kriValue.CurrentMinus2KRIValue.BackGroundColor;
                        }
                        else if (isBankAvarageValue)
                        {
                            currentCellValue[0] = kriValue.CurrentMinus2KRIValue.CurrentPeerGroupAvgValue == null ? "NA" :kriValue.CurrentMinus2KRIValue.CurrentPeerGroupAvgValue.ToString();
                            currentCellValue[1] = "";
                        }
                        else
                        {
                            currentCellValue[0] = kriValue.CurrentMinus2KRIValue.CurrentDataValue == null ? "NA" :kriValue.CurrentMinus2KRIValue.CurrentDataValue.ToString();
                            currentCellValue[1] = kriValue.CurrentMinus2KRIValue.BackGroundColor;
                        }
                        break;
                    }
                case 4:
                    {
                        if (type == "score")
                        {
                            currentCellValue[0] = kriValue.CurrentMinus1KRIValue.CurrentScoreValue == null ? "NA" :kriValue.CurrentMinus1KRIValue.CurrentScoreValue.ToString();
                            currentCellValue[1] = "#F2F2F2";
                        }
                        else if (type == "riskLevel")
                        {
                            currentCellValue[0] = kriValue.CurrentMinus1KRIValue.RiskLevel;
                            currentCellValue[1] = kriValue.CurrentMinus1KRIValue.BackGroundColor;
                        }
                        else if (isBankAvarageValue)
                        {
                            currentCellValue[0] = kriValue.CurrentMinus1KRIValue.CurrentPeerGroupAvgValue == null ? "NA" :kriValue.CurrentMinus1KRIValue.CurrentPeerGroupAvgValue.ToString();
                            currentCellValue[1] = "";
                        }
                        else
                        {
                            currentCellValue[0] = kriValue.CurrentMinus1KRIValue.CurrentDataValue == null ? "NA" :kriValue.CurrentMinus1KRIValue.CurrentDataValue.ToString();
                            currentCellValue[1] = kriValue.CurrentMinus1KRIValue.BackGroundColor;
                        }
                        break;
                    }
                case 5:
                    {
                        if (type == "score")
                        {
                            currentCellValue[0] = kriValue.CurrentKRIValue.CurrentScoreValue == null ? "NA" :kriValue.CurrentKRIValue.CurrentScoreValue.ToString();
                            currentCellValue[1] = "#F2F2F2";
                        }
                        else if (type == "riskLevel")
                        {
                            currentCellValue[0] = kriValue.CurrentKRIValue.RiskLevel;
                            currentCellValue[1] = kriValue.CurrentKRIValue.BackGroundColor;
                        }
                        else if (isBankAvarageValue)
                        {
                            currentCellValue[0] = kriValue.CurrentKRIValue.CurrentPeerGroupAvgValue == null ? "NA" :kriValue.CurrentKRIValue.CurrentPeerGroupAvgValue.ToString();
                            currentCellValue[1] = "";
                        }
                        else
                        {
                            currentCellValue[0] = kriValue.CurrentKRIValue.CurrentDataValue == null ? "NA" : kriValue.CurrentKRIValue.CurrentDataValue.ToString();
                            currentCellValue[1] = kriValue.CurrentKRIValue.BackGroundColor;
                        }
                        break;
                    }
                case 6:
                    {
                        currentCellValue[0] = kriValue.TrendImage;
                        currentCellValue[1] = "";
                        break;
                    }
            }
            return currentCellValue;
        }
        private static void PrepareRankAndPointsTable(List<RiskRadarRiskLevel> riskRadarRankAndPointsData, SheetData sheetData, ref UInt32Value rowNumber)
        {
            UInt32Value rowIndex = rowNumber;
            for (int index = 0; index < riskRadarRankAndPointsData.Count; index++)
            {
                var row = checkAndCreateExcelRow(sheetData, rowIndex);
                if (index == 0)
                {
                    AppendTextCell("J" + rowIndex.ToString(), "Ratings", row, GetBGColorValueByColorCode("left"));
                    rowIndex++;
                }
                row = sheetData.Elements<Row>().Where(r => r.RowIndex == Int16.Parse(rowIndex)).FirstOrDefault();
                AppendTextCell("J" + rowIndex.ToString(), riskRadarRankAndPointsData[index].RiskLevel, row, rowIndex.HasValue ? GetBGColorValueByColorCode(riskRadarRankAndPointsData[index].BackGroundColor, true) : 8);
                rowIndex++;
            }
            rowNumber = rowIndex;
        }

        private static UInt32Value GetBGColorValueByColorCode(string colorCode, bool isLeftAlignment = false)
        {
            UInt32Value index = 8;
            switch (colorCode)
            {
                case "#00b053":
                    {
                        if (isLeftAlignment)
                        {
                            index = 22;
                        }
                        else
                        {
                            index = 15;
                        }
                        break;
                    }
                case "#8ed157":
                    {
                        if (isLeftAlignment)
                        {
                            index = 23;
                        }
                        else
                        {
                            index = 16;
                        }
                        break;
                    }
                case "#faff04":
                    {
                        if (isLeftAlignment)
                        {
                            index = 24;
                        }
                        else
                        {
                            index = 17;
                        }
                        break;
                    }
                case "#eb7d38":
                    {
                        if (isLeftAlignment)
                        {
                            index = 25;
                        }
                        else
                        {
                            index = 18;
                        }
                        break;
                    }
                case "#fc0100":
                    {
                        if (isLeftAlignment)
                        {
                            index = 26;
                        }
                        else
                        {
                            index = 19;
                        }
                        break;
                    }
                case "#F2F2F2":
                    {
                        if (isLeftAlignment)
                        {
                            index = 27;
                        }
                        else
                        {
                            index = 20;
                        }
                        break;
                    }
                case "#d9d9d9":
                    {
                        if (isLeftAlignment)
                        {
                            index = 27;
                        }
                        else
                        {
                            index = 20;
                        }
                        break;
                    }
                case "left":
                    {
                        index = 21;
                        break;
                    }
                default:
                    {
                        index = 8;
                        break;
                    }
            }
            return index;
        }
        private static void PrepareHeaderSection(SheetData sheetData, RiskRadarChartData riskRadarChartData, ref MergeCells mergeCells, DefaultBankDetails SelectedBankDetails)
        {
            MergeCell mergeCell1 = new MergeCell() { Reference = new StringValue("B2" + ":" + "U2") };
            mergeCells.Append(mergeCell1);
            string columnValue = "B";
            var headerRow1 = checkAndCreateExcelRow(sheetData, 2);
            AppendTextCell(columnValue + "2", "CB Risk Radar™", headerRow1, 2);

            mergeCell1 = new MergeCell() { Reference = new StringValue("B3" + ":" + "U3") };
            mergeCells.Append(mergeCell1);
            var headerRow2 = checkAndCreateExcelRow(sheetData, 3);
            AppendTextCell(columnValue + "3", riskRadarChartData.KRIValues[0].InstitutionName, headerRow2, 2);

            mergeCell1 = new MergeCell() { Reference = new StringValue("B4" + ":" + "G4") };
            mergeCells.Append(mergeCell1);
            var InfoHeaderRow1 = checkAndCreateExcelRow(sheetData, 4);
            AppendTextCell(columnValue + "4", "" + "FDIC Certificate " + " #: " + SelectedBankDetails.CertNumber + "", InfoHeaderRow1, 1);

            mergeCell1 = new MergeCell() { Reference = new StringValue("H4" + ":" + "L4") };
            mergeCells.Append(mergeCell1);
            AppendTextCell("H4", "" + "Headquarter: " + SelectedBankDetails.HeadQuarters + "", InfoHeaderRow1, 1);


            mergeCell1 = new MergeCell() { Reference = new StringValue("M4" + ":" + "U4") };
            mergeCells.Append(mergeCell1);
            AppendTextCell("M4", "" + "Employess: " + SelectedBankDetails.FTEmployees + "", InfoHeaderRow1, 28);

            mergeCell1 = new MergeCell() { Reference = new StringValue("B5" + ":" + "G5") };
            mergeCells.Append(mergeCell1);
            var InfoHeaderRow4 = checkAndCreateExcelRow(sheetData, 5);
            AppendTextCell("B5", "" + "Branches: " + SelectedBankDetails.NumberofBranches + "", InfoHeaderRow4, 28);

            mergeCell1 = new MergeCell() { Reference = new StringValue("H5" + ":" + "L5") };
            mergeCells.Append(mergeCell1);
            AppendTextCell("H5", "" + "Sub-S: " + (SelectedBankDetails.SubchapterS) + "", InfoHeaderRow4, 28);

            mergeCell1 = new MergeCell() { Reference = new StringValue("M5" + ":" + "U5") };
            mergeCells.Append(mergeCell1);
            AppendTextCell("M5", "" + "Regulator: " + "FED" + "", InfoHeaderRow4, 28);

            mergeCell1 = new MergeCell() { Reference = new StringValue("B6" + ":" + "G6") };
            mergeCells.Append(mergeCell1);
            var InfoHeaderRow7 = checkAndCreateExcelRow(sheetData, 6);
            AppendTextCell("B6", "" + "Assets ($000): " + riskRadarChartData.AssetSize + "", InfoHeaderRow7, 28);

            mergeCell1 = new MergeCell() { Reference = new StringValue("H6" + ":" + "U6") };
            mergeCells.Append(mergeCell1);
            AppendTextCell("H6", "" + "Peer Group: " + riskRadarChartData.KRIValues[0].PeerGroup + "", InfoHeaderRow7, 28);
        }
        private static void AppendTextCell(string cellReference, string cellStringValue, Row excelRow, DocumentFormat.OpenXml.UInt32Value index)
        {
            //  Add a new Excel Cell to our Row 
            Cell cell = new Cell() { CellReference = cellReference, DataType = CellValues.String, StyleIndex = index };
            CellValue cellValue = new CellValue();
            cellValue.Space = SpaceProcessingModeValues.Preserve;
            cellValue.Text = cellStringValue == "none" ? "" : cellStringValue;
            cell.Append(cellValue);
            excelRow.Append(cell);
            CellStyles c = new CellStyles();
        }
        private static string GetExcelColumnName(int columnIndex)
        {
            if (columnIndex < 26)
                return ((char)('B' + columnIndex)).ToString();

            char firstChar = (char)('B' + (columnIndex / 26) - 1);
            char secondChar = (char)('B' + (columnIndex % 26));

            return string.Format("{0}{1}", firstChar, secondChar);
        }
        private static Stylesheet GenerateStyleSheet()
        {
            return new Stylesheet(
                new Fonts(
                    new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 0 – The default font.
                    new FontSize() { Val = 10 },
                    new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 1 – The bold font.
                    new Bold(),
                    new FontSize() { Val = 10 },
                    new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 2 – The bold font.
                    new Bold(),
                    new FontSize() { Val = 16 },
                    new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 3 – The bold font.
                    new Bold(),
                    new FontSize() { Val = 20 },
                    new Color() { Rgb = new HexBinaryValue() { Value = "1A5276" } },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 4 – The Italic font.
                    new Italic(),
                    new FontSize() { Val = 11 },
                    new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                            // Index 2 – The Times Roman font. with 16 size
                    new FontSize() { Val = 16 },
                    new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Times New Roman" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                            // Index 2 – The Times Roman font. with 16 size
                    new FontSize() { Val = 8 },
                    new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 7 – The bold font header.
                    new Bold(),
                    new FontSize() { Val = 10 },
                    new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Calibri" })
                ),


                new Fills(
               ////new Fill(                                                           // Index 0 – The default fill.
               ////    new PatternFill() { PatternType = PatternValues.None }),
               //new Fill(                                                               // Index 1 – The default fill of gray 125 (required)
               //         new PatternFill() { PatternType = PatternValues.Solid }),
               new Fill(                                                           // Index 1 – The green fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "" } }// default color
                    )
                    { PatternType = PatternValues.Solid }),
                new Fill(                                                           // Index 3 – The green fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "" } }// green color
                    )
                    { PatternType = PatternValues.Solid }),

                new Fill(                                                           // Index 3 – The green fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "238b18" } }// green color
                    )
                    { PatternType = PatternValues.Solid }),

                new Fill(                                                           // Index 4 – The red fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "A71D24" } }// red color
                    )
                    { PatternType = PatternValues.Solid }),

                 new Fill(                                                           // Index 5 – The red fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "FFC207" } }// yellow color
                    )
                    { PatternType = PatternValues.Solid }),
                 new Fill(                                                           // Index 6 – The red fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "dddddd" } }// grey color
                    )
                    { PatternType = PatternValues.Solid }),
                 ////////
                 new Fill(                                                           // Index 6 – The Dark Green fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "00b050" } }// Dark Green "low" color value
                    )
                    { PatternType = PatternValues.Solid }),
                 new Fill(                                                           // Index 7 – The Light Green fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "92d050" } }// Light Green "Low-Modarate" color value
                    )
                    { PatternType = PatternValues.Solid }),
                 new Fill(                                                           // Index 8 – The Yellow fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "ffff00" } }// Yellow "Modarate" color value
                    )
                    { PatternType = PatternValues.Solid }),
                 new Fill(                                                           // Index 9 – The Orange fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "ed7d31" } }// Orange "Modarate-High" color value
                    )
                    { PatternType = PatternValues.Solid }),
                 new Fill(                                                           // Index 10 – The Red fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "ff0000" } }// Red "High" color value
                    )
                    { PatternType = PatternValues.Solid }),
                  //
                  new Fill(                                                           // Index 11 – The Red fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "f2f2f2" } }// Greay color value
                    )
                    { PatternType = PatternValues.Solid })
                ),
                new Borders(
                    new Border(                                                         // Index 0 – The default border.
                        new LeftBorder(),
                        new RightBorder(),
                        new TopBorder(),
                        new BottomBorder(),
                        new DiagonalBorder()),
                    new Border(                                                         // Index 1 – Applies a Left, Right, Top, Bottom border to a cell
                        new LeftBorder(
                            new Color() { Auto = true }
                        )
                        { Style = BorderStyleValues.Thin },
                        new RightBorder(
                            new Color() { Auto = true }
                        )
                        { Style = BorderStyleValues.Thin },
                        new TopBorder(
                            new Color() { Auto = true }
                        )
                        { Style = BorderStyleValues.Thin },
                        new BottomBorder(
                            new Color() { Auto = true }
                        )
                        { Style = BorderStyleValues.Thin },
                        new DiagonalBorder())
                ),
                //new LeftBorder(new Color() { Rgb = "#FF0000" }) { Style = BorderStyleValues.None }//ApplyBorder= true
                new CellFormats(
                    new CellFormat() { FontId = 0, FillId = 0, BorderId = 0 },                         // Index 0 – The default cell style.  If a cell does not have a style index applied it will use this style combination instead
                    new CellFormat() { FontId = 1, FillId = 0, BorderId = 0, ApplyFont = true },       // Index 1 – Bold 
                    new CellFormat() { FontId = 2, FillId = 0, BorderId = 0, ApplyFont = true },       // Index 2 – Italic
                    new CellFormat() { FontId = 3, FillId = 0, BorderId = 0, ApplyFont = true },       // Index 3 – Times Roman
                    new CellFormat() { FontId = 0, FillId = 2, BorderId = 0, ApplyFill = true },       // Index 4 – green Fill
                    new CellFormat() { FontId = 0, FillId = 3, BorderId = 0, ApplyFill = true },       // Index 5 – red Fill
                    new CellFormat() { FontId = 0, FillId = 4, BorderId = 0, ApplyFill = true },       // Index 6 – Yellow Fill
                    new CellFormat() { FontId = 0, FillId = 5, BorderId = 0, ApplyFill = true },       // Index 7 – grey Fill
                    new CellFormat(                                                                   // Index 8 – Alignment
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Center },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 0, BorderId = 0, ApplyAlignment = true },
                    new CellFormat() { FontId = 0, FillId = 0, BorderId = 1, ApplyBorder = true },      // Index 9 – Border
                    new CellFormat(                                                                   // Index 10 – Alignment right
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Right },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 0, FillId = 0, BorderId = 0, ApplyAlignment = true },
                     new CellFormat(                                                                   // Index 11 – Alignment left
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                     { FontId = 0, FillId = 0, BorderId = 0, ApplyAlignment = true },

                       //
                       new CellFormat(                                                                   // Index 12 – Alignment left
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                       { FontId = 6, FillId = 5, BorderId = 0, ApplyAlignment = true },

                          new CellFormat(                                                                   // Index 13 – Alignment left
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Right },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                          { FontId = 0, FillId = 0, BorderId = 0, ApplyAlignment = true },
                              new CellFormat(                                                                   // Index 14 – Alignment left
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                              { FontId = 0, FillId = 0, BorderId = 0, ApplyAlignment = true },

                    //
                    new CellFormat(                                                                   // Index 15 – Alignment center and Dark Green
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Center },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 6, BorderId = 0, ApplyAlignment = true },
                    //
                    new CellFormat(                                                                   // Index 16 – Alignment center and Light Green
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Center },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 7, BorderId = 0, ApplyAlignment = true },
                    //
                    new CellFormat(                                                                   // Index 17 – Alignment center and Yellow
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Center },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 8, BorderId = 0, ApplyAlignment = true },
                    //
                    new CellFormat(                                                                   // Index 18 – Alignment center and Orange
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Center },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 9, BorderId = 0, ApplyAlignment = true },
                    //
                    new CellFormat(                                                                   // Index 19 – Alignment center and Red
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Center },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 10, BorderId = 0, ApplyAlignment = true },
                    //
                    new CellFormat(                                                                   // Index 20 – Alignment center and Gray 
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Center },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 11, BorderId = 0, ApplyAlignment = true },
                     //
                     new CellFormat(                                                                   // Index 21 – Alignment left same as 8 index execpt alginment
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                     { FontId = 1, FillId = 0, BorderId = 0, ApplyAlignment = true },
                    //
                    new CellFormat(                                                                   // Index 22 – Alignment left and Dark Green
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 6, BorderId = 0, ApplyAlignment = true },
                    //
                    new CellFormat(                                                                   // Index 23 – Alignment left and Light Green
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 7, BorderId = 0, ApplyAlignment = true },
                    //
                    new CellFormat(                                                                   // Index 24 – Alignment left and Yellow
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 8, BorderId = 0, ApplyAlignment = true },
                    //
                    new CellFormat(                                                                   // Index 25 – Alignment left and Orange
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 9, BorderId = 0, ApplyAlignment = true },
                    //
                    new CellFormat(                                                                   // Index 26 – Alignment left and Red
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 10, BorderId = 0, ApplyAlignment = true },
                    //
                    new CellFormat(                                                                   // Index 27 – Alignment left and Gray 
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 11, BorderId = 0, ApplyAlignment = true },
                    //
                    new CellFormat() { FontId = 7, FillId = 0, BorderId = 0, ApplyFont = true }  // Index 28 – For headers with bold 


                )
            ); // return
        }
        private static string GetCellValue(string cellValue)
        {
            if (cellValue.Equals("BalanceSheet"))
            {
                cellValue = "BALANCE SHEET";
            }
            else if (cellValue.Equals("IncomeStatement"))
            {
                cellValue = "INCOME STATEMENT";
            }
            else if (cellValue.Equals("EarningsAndPerformance"))
            {
                cellValue = "EARNINGS AND PERFORMANCE";
            }
            else if (cellValue.Equals("AssetQuality"))
            {
                cellValue = "ASSET QUALITY";
            }
            else if (cellValue.Equals("CapitalRatios"))
            {
                cellValue = "CAPITAL RATIOS";
            }
            else if (cellValue.Equals("Liquidity"))
            {
                cellValue = "LIQUIDITY";
            }
            return cellValue;
        }
        private static Columns CreateColumnData(UInt32 StartColumnIndex, UInt32 EndColumnIndex, double ColumnWidth)
        {
            Columns columns = new Columns();

            Column column;
            column = new Column();
            column.Min = StartColumnIndex;
            column.Max = EndColumnIndex;
            column.Width = ColumnWidth;
            column.BestFit = true;
            columns.Append(column);
            return columns;
        }

        public static void InsertImage(WorksheetPart worksheetPart, byte[] tmpBytes, int index, int rowIndex, int colIndex, bool canResizeImage = false, int[] imageReSizesInfo = null, bool isTrendIcon = false)
        {
            try
            {
                DrawingsPart drawingsPart;
                if (worksheetPart.DrawingsPart == null)
                {
                    drawingsPart = worksheetPart.AddNewPart<DrawingsPart>();
                }
                else
                {
                    drawingsPart = worksheetPart.DrawingsPart;
                }

                if (!worksheetPart.Worksheet.ChildElements.OfType<Drawing>().Any())
                {
                    worksheetPart.Worksheet.Append(new Drawing { Id = worksheetPart.GetIdOfPart(drawingsPart) });
                }

                if (drawingsPart.WorksheetDrawing == null)
                {
                    drawingsPart.WorksheetDrawing = new WorksheetDrawing();
                }

                var worksheetDrawing = drawingsPart.WorksheetDrawing;
                var imagePart = drawingsPart.AddImagePart(ImagePartType.Jpeg);
                System.Drawing.Bitmap bm;
                if (canResizeImage)
                {
                    tmpBytes = ResizeImagesOfbytes(tmpBytes, imageReSizesInfo);
                }
                using (System.IO.MemoryStream ms = new System.IO.MemoryStream(tmpBytes))
                {
                    bm = new System.Drawing.Bitmap(ms);
                    ms.Position = 0;
                    imagePart.FeedData(ms);
                }

                DocumentFormat.OpenXml.Drawing.Extents extents = new DocumentFormat.OpenXml.Drawing.Extents();

                var extentsCx = (long)bm.Width * (long)((float)714400 / bm.HorizontalResolution);
                var extentsCy = (long)bm.Height * (long)((float)714400 / bm.VerticalResolution);

                bm.Dispose();

                var colOffset = 0;
                var rowOffset = 0;

                if (isTrendIcon)
                    colOffset = 200000;//This is used to align the Trend column icon in the center

                var nvps = worksheetDrawing.Descendants<Xdr.NonVisualDrawingProperties>();
                var nvpId = nvps.Count() > 0 ?
                    (UInt32Value)worksheetDrawing.Descendants<Xdr.NonVisualDrawingProperties>().Max(p => p.Id.Value) + 1 : 1U;

                var oneCellAnchor = new Xdr.OneCellAnchor(
                    new Xdr.FromMarker
                    {
                        ColumnId = new Xdr.ColumnId((colIndex).ToString()),
                        RowId = new Xdr.RowId((rowIndex - 1).ToString()),
                        ColumnOffset = new Xdr.ColumnOffset(colOffset.ToString()),
                        RowOffset = new Xdr.RowOffset(rowOffset.ToString())
                    },
                    new Xdr.Extent { Cx = extentsCx, Cy = extentsCy },
                    new Xdr.Picture(
                        new Xdr.NonVisualPictureProperties(
                            new Xdr.NonVisualDrawingProperties { Id = nvpId, Name = "Picture " + nvpId, Description = "image" },
                            new Xdr.NonVisualPictureDrawingProperties(new A.PictureLocks { NoChangeAspect = true, NoAdjustHandles = true, NoChangeArrowheads = true, NoCrop = true, NoRotation = true, NoResize = true })
                        ),
                        new Xdr.BlipFill(
                            new A.Blip { Embed = drawingsPart.GetIdOfPart(imagePart), CompressionState = A.BlipCompressionValues.Print },
                            new A.Stretch(new A.FillRectangle())
                        ),
                        new Xdr.ShapeProperties(
                            new A.Transform2D(
                                new A.Offset { X = 0, Y = 0 },
                                new A.Extents { Cx = extentsCx, Cy = extentsCy }
                            ),
                            new A.PresetGeometry { Preset = A.ShapeTypeValues.Rectangle }
                        )
                    ),
                    new Xdr.ClientData()
                );
                oneCellAnchor.Append();
                worksheetDrawing.Append(oneCellAnchor);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public static byte[] ResizeImagesOfbytes(byte[] byteImageIn, int[] imageReSizesInfo)
        {
            byte[] currentByteImageArray = byteImageIn;
            int newWidth = imageReSizesInfo[0];
            int newHeight = imageReSizesInfo[1];

            MemoryStream inputMemoryStream = new MemoryStream(byteImageIn);
            System.Drawing.Image fullsizeImage = System.Drawing.Image.FromStream(inputMemoryStream);

            System.Drawing.Bitmap fullSizeBitmap = new System.Drawing.Bitmap(fullsizeImage, new System.Drawing.Size((int)(newWidth), (int)(newHeight)));
            MemoryStream resultStream = new MemoryStream();

            fullSizeBitmap.Save(resultStream, fullsizeImage.RawFormat);

            currentByteImageArray = resultStream.ToArray();
            resultStream.Dispose();
            resultStream.Close();

            return currentByteImageArray;
        }
    }
}