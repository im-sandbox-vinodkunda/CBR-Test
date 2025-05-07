using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.Data;
using System.Reflection;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Presentation;
using DocumentFormat.OpenXml;
using System.Globalization;
using CBR.Web.Models;
using CBR.Common;
using System.Text.RegularExpressions;
using DocumentFormat.OpenXml.Drawing.Spreadsheet;
using Xdr = DocumentFormat.OpenXml.Drawing.Spreadsheet;
using A = DocumentFormat.OpenXml.Drawing;
using System.IO;
using System.Globalization;

namespace CBR.Web.ExportToExcel
{
    class CreateSingleBankProfileExportToExcel
    {
        public static DataTable ListToDataTable<T>(List<T> list, string tableName, string ubprDataValueColName)
        {
            DataTable dt = new DataTable();
            dt.TableName = tableName;

            foreach (PropertyInfo info in typeof(T).GetProperties())
            {
                if (info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "PropertyInclusion") != null && ((bool)(info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "PropertyInclusion").NamedArguments[0].TypedValue.Value)) == true)
                {
                    if (info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "CBRDescription") != null && !string.IsNullOrEmpty(info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "CBRDescription").ConstructorArguments[0].Value.ToString()))
                    {
                        if (string.Compare(info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "CBRDescription").ConstructorArguments[0].Value.ToString(), "UBPR Data Value") == 0)
                        {
                            dt.Columns.Add(ubprDataValueColName, GetNullableType(info.PropertyType));
                        }
                        else
                        {
                            dt.Columns.Add(new DataColumn(info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "CBRDescription").ConstructorArguments[0].Value.ToString(), GetNullableType(info.PropertyType)));
                        }
                    }
                    else
                    {
                        dt.Columns.Add(new DataColumn(info.Name, GetNullableType(info.PropertyType)));
                    }
                }
            }

            foreach (T t in list)
            {
                DataRow row = dt.NewRow();
                foreach (PropertyInfo info in typeof(T).GetProperties())
                {
                    if (info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "PropertyInclusion") != null && ((bool)(info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "PropertyInclusion").NamedArguments[0].TypedValue.Value)) == true)
                    {
                        string colName = string.Empty;
                        if (info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "CBRDescription") != null && !string.IsNullOrEmpty(info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "CBRDescription").ConstructorArguments[0].Value.ToString()))
                        {
                            if (string.Compare(info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "CBRDescription").ConstructorArguments[0].Value.ToString(), "UBPR Data Value") == 0)
                            {
                                colName = ubprDataValueColName;
                            }
                            else
                            {
                                colName = info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "CBRDescription").ConstructorArguments[0].Value.ToString();
                            }
                        }
                        else
                            colName = info.Name;

                        if (!IsNullableType(info.PropertyType))
                            row[colName] = info.GetValue(t, null);
                        else
                            row[colName] = (info.GetValue(t, null) ?? DBNull.Value);
                    }
                }

                dt.Rows.Add(row);
            }
            return dt;
        }
        private static bool IsNullableType(Type type)
        {
            return (type == typeof(string) ||
                    type.IsArray ||
                    (type.IsGenericType &&
                     type.GetGenericTypeDefinition().Equals(typeof(Nullable<>))));
        }
        private static Type GetNullableType(Type t)
        {
            Type returnType = t;
            if (t.IsGenericType && t.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                returnType = Nullable.GetUnderlyingType(t);
            }
            return returnType;
        }
        public static byte[] CreateExcelDocument(DataTable[] lists, string filename, BankProfileIntroductionData Bankfinalres,List<byte[]> img)
        {
            byte[] data1 = null;
            try
            {
                DataSet ds = new DataSet();
                foreach (DataTable t in lists)
                {
                    ds.Tables.Add(t);
                }

                data1 = CreateExcelDocumentAsStream(ds, filename, Bankfinalres, img);

            }
            catch (Exception ex)
            {
                Trace.WriteLine("Failed, exception thrown: " + ex.Message);

            }

            return data1;
        }
        public static byte[] CreateExcelDocumentAsStream(DataSet ds, string filename, BankProfileIntroductionData Bankfinalres, List<byte[]> img)
        {
            byte[] data1 = null;
            try
            {
                System.IO.MemoryStream stream = new System.IO.MemoryStream();
                using (SpreadsheetDocument document = SpreadsheetDocument.Create(stream, SpreadsheetDocumentType.Workbook, true))
                {
                    WriteExcelFile(ds, document,  Bankfinalres, img);
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
        private static void WriteExcelFile(DataSet ds, SpreadsheetDocument spreadsheet, BankProfileIntroductionData Bankfinalres,  List<byte[]> img)
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
            //  Loop through each of the DataTables in our DataSet, and create a new Excel Worksheet for each.
            uint worksheetNumber = 1;
            foreach (DataTable dt in ds.Tables)
            {
                //  For each worksheet you want to create
                string workSheetID = "rId" + worksheetNumber.ToString();
                string worksheetName = dt.TableName;

                WorksheetPart newWorksheetPart = spreadsheet.WorkbookPart.AddNewPart<WorksheetPart>();
                newWorksheetPart.Worksheet = new DocumentFormat.OpenXml.Spreadsheet.Worksheet();
                // create sheet data
                newWorksheetPart.Worksheet.AppendChild(new DocumentFormat.OpenXml.Spreadsheet.SheetData());
                newWorksheetPart.Worksheet.AppendChild(new Alignment { Horizontal = HorizontalAlignmentValues.Right });
                if (dt.TableName != "Information")
                {
                    MergeCells mergeCells = new MergeCells();
                    newWorksheetPart.Worksheet.InsertAfter(mergeCells, newWorksheetPart.Worksheet.Elements<SheetData>().First());
                    MergeCell mergeCell1 = new MergeCell() { Reference = new StringValue("B2" + ":" + "H2") };
                    MergeCell mergeCell2 = new MergeCell() { Reference = new StringValue("C3" + ":" + "H3") };
                    MergeCell mergeCell3 = new MergeCell() { Reference = new StringValue("C4" + ":" + "H4") };
                    MergeCell mergeCell5 = new MergeCell() { Reference = new StringValue("C5" + ":" + "H5") };

                    //MergeCell mergeCell6 = new MergeCell() { Reference = new StringValue("G2" + ":" + "L2") };
                    MergeCell mergeCell7 = new MergeCell() { Reference = new StringValue("I3" + ":" + "L3") };
                    MergeCell mergeCell8 = new MergeCell() { Reference = new StringValue("I4" + ":" + "L4") };
                    MergeCell mergeCell9 = new MergeCell() { Reference = new StringValue("I5" + ":" + "L5") };
                    MergeCell mergeCell10 = new MergeCell() { Reference = new StringValue("B78" + ":" + "K78") };
                    MergeCell mergeCell11 = new MergeCell() { Reference = new StringValue("B79" + ":" + "K79") };
                    MergeCell mergeCell12 = new MergeCell() { Reference = new StringValue("I80" + ":" + "K80") };
                    newWorksheetPart.Worksheet.AppendChild(new Alignment { Horizontal = HorizontalAlignmentValues.Center });
                    mergeCells.Append(mergeCell1);
                    mergeCells.Append(mergeCell2);
                    mergeCells.Append(mergeCell3);
                    mergeCells.Append(mergeCell5);

                    mergeCells.Append(mergeCell7);
                    mergeCells.Append(mergeCell8);
                    mergeCells.Append(mergeCell9);
                    mergeCells.Append(mergeCell10);
                    mergeCells.Append(mergeCell11);
                    mergeCells.Append(mergeCell12);
                }
              
                // save worksheet
                WriteDataTableToExcelWorksheet(dt, newWorksheetPart,  Bankfinalres);
                //Add width to columns
                int i = 0;
                for (i = 0; i < dt.Columns.Count; i++)
                {
                    int maxlength = dt.AsEnumerable().Where(r => r.Field<string>(i) != null).Select(r => r.Field<string>(i).Length).DefaultIfEmpty().Max();
                    double width = GetWidth(maxlength);
                    // CreateColumnData((uint)i + 1, (uint)i + 1, width);
                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)i + 2, (uint)i + 2, width), newWorksheetPart.Worksheet.SheetFormatProperties);

                }

                for (int j = 0; j < img.Count; j++)
                {
                    InsertImage(newWorksheetPart, img[j], j);
                }
                newWorksheetPart.Worksheet.Save();

                // create the worksheet to workbook relation
                if (worksheetNumber == 1)
                    spreadsheet.WorkbookPart.Workbook.AppendChild(new DocumentFormat.OpenXml.Spreadsheet.Sheets());

                spreadsheet.WorkbookPart.Workbook.GetFirstChild<DocumentFormat.OpenXml.Spreadsheet.Sheets>().AppendChild(new DocumentFormat.OpenXml.Spreadsheet.Sheet()
                {
                    Id = spreadsheet.WorkbookPart.GetIdOfPart(newWorksheetPart),
                    SheetId = (uint)worksheetNumber,
                    Name = dt.TableName
                });

                worksheetNumber++;
            }

            spreadsheet.WorkbookPart.Workbook.Save();
        }

        private static void WriteDataTableToExcelWorksheet(DataTable dt, WorksheetPart worksheetPart, BankProfileIntroductionData Bankfinalres)
        {
            var worksheet = worksheetPart.Worksheet;
            var sheetData = worksheet.GetFirstChild<SheetData>();

            string cellValue = "";

            //  Create a Header Row in our Excel file, containing one header for each Column of data in our DataTable.
            //
            //  We'll also create an array, showing which type each column of data is (Text or Numeric), so when we come to write the actual
            //  cells of data, we'll know if to write Text values or Numeric cell values.
            int numberOfColumns = dt.Columns.Count;
            bool[] IsNumericColumn = new bool[numberOfColumns];
            string[] excelColumnNames = new string[numberOfColumns];
            for (int n = 0; n < numberOfColumns; n++)
                excelColumnNames[n] = GetExcelColumnName(n);

            //
            //  Create the Header row in our Excel Worksheet
            //
            //var period = CommonFunctions.GetQuarterLabel(CommonFunctions.GetLastQuarterString());
            uint rowIndex;
            string period = string.Empty;
            if (dt.TableName == "YTD")
            {
                period = "Last 4 Years & Current Qtr";
            }
            else if (dt.TableName == "QTD")
            {
                period = "Last 5 Quarters";
            }

            string BHCName = string.Empty;
            string SubchapterS = string.Empty;
            BHCName = Bankfinalres.BHCName == null ? "N/A" : Bankfinalres.BHCName;
            SubchapterS = Bankfinalres.SubchapterS == 1 ? "Yes" : "No"; 

            if (dt.TableName != "Information")
            {
                var headerRow1 = new Row { RowIndex = 2 };  // add a row at the top of spreadsheet
                sheetData.Append(headerRow1);
                var bold = new CellFormat() { FontId = 1, FillId = 0, BorderId = 0, ApplyFont = true };
                DataColumn col1 = dt.Columns[0];
                AppendTextCell(excelColumnNames[0] + "2", Bankfinalres.Name, headerRow1, 2);
                sheetData.Append(bold);
                AppendTextCell("I" + "2", "SINGLE BANK PROFILE™", headerRow1, 3);

                var headerRow2 = new Row { RowIndex = 3};  // add a row at the top of spreadsheet
                sheetData.Append(headerRow2);
                AppendTextCell(excelColumnNames[0] + "3", "" + "FDIC Certificate " + " #: " + Bankfinalres.FDICCertificate + "", headerRow2, 1);
                AppendTextCell("C3", "BHC Name: " + BHCName + "", headerRow2, 1);
                AppendTextCell("I3", "FT Employees: " + Bankfinalres.FTEEmployees + "", headerRow2, 1);

                var headerRow3 = new Row { RowIndex = 4 };  // add a row at the top of spreadsheet
                sheetData.Append(headerRow3);
                AppendTextCell(excelColumnNames[0] + "4", "Headquarters: " + Bankfinalres.HeadQuarters + "", headerRow3, 1);
                AppendTextCell("C4", "Asset Concentration: " + Bankfinalres.AssetConcentrationHierarchy + "", headerRow3, 1);
                AppendTextCell("I4", "Subchapter S: " + SubchapterS + "", headerRow3, 1);

                var headerRow4 = new Row { RowIndex = 5};  // add a row at the top of spreadsheet
                sheetData.Append(headerRow4);
                AppendTextCell(excelColumnNames[0] + "5", "Number of Branches: " + Bankfinalres.Numberofbranches + "", headerRow4, 1);
                AppendTextCell("C5", "Established: " + Bankfinalres.Established.ToString("MM'/'dd'/'yyyy") + "", headerRow4, 1);
                AppendTextCell("I5", "Period: " + period + "", headerRow4, 1);

                var headerRow5 = new Row { RowIndex = 6 };  // add a row at the top of spreadsheet
                sheetData.Append(headerRow5);
                var headerRow6 = new Row { RowIndex = 7 };  // add a row at the top of spreadsheet
                sheetData.Append(headerRow6);
            }
            string colIndex = "1";
            if (dt.TableName == "Information")
            {
                rowIndex = 1;
                colIndex = "1";
            }
            else
            {
                rowIndex = 8;
                colIndex = "8";
            }

            var headerRow = new Row { RowIndex = rowIndex };  // add a row at the top of spreadsheet

            DocumentFormat.OpenXml.UInt32Value j = 1;
            for (int colInx = 0; colInx < numberOfColumns; colInx++)
            {

                DataColumn col = dt.Columns[colInx];
                var index = GetSheetStyle(col.ColumnName);
                if (index=="1")
                    col.ColumnName= GetCellValue(col.ColumnName);                              
                AppendTextCell(excelColumnNames[colInx] + colIndex, col.ColumnName, headerRow, index);
                IsNumericColumn[colInx] = (col.DataType.FullName == "System.Decimal") || (col.DataType.FullName == "System.Int32");
                j++;
            }
            sheetData.Append(headerRow);

             //
            //  Now, step through each row of data in our DataTable...
            //
            double cellNumericValue = 0;
            foreach (DataRow dr in dt.Rows)
            {
                // ...create a new row, and append a set of this row's data to it.
                ++rowIndex;
                var newExcelRow = new Row { RowIndex = rowIndex };  // add a row at the top of spreadsheet
                sheetData.Append(newExcelRow);
                DocumentFormat.OpenXml.UInt32Value i = 1;
                for (int colInx = 0; colInx < numberOfColumns; colInx++)
                {
                    bool IsNumericColumn11 = false;
                    cellValue = dr.ItemArray[colInx].ToString();
                    if(dr[0].ToString() != string.Empty)
                    {
                        if (cellValue == string.Empty)
                            cellValue = "N/A";
                    }
                    var regex = "^[0-9.,]*$";
                    //var regex = @"^[0-9]{1,3}(,%[0-9]{3})*(\.%[0-9]+)?$";
                    var match = Regex.Match(cellValue, regex, RegexOptions.IgnoreCase);
                    // Create cell with data
                    IsNumericColumn11 = match.Success;
                    DocumentFormat.OpenXml.UInt32Value k = GetSheetStyle(cellValue);
                    cellValue= GetCellValue(cellValue);
                    if (dt.TableName == "Information")
                        k = 0;
                    if (rowIndex == 2)
                            k = 1;
                    if (dt.TableName != "Information")
                    {
                        if (rowIndex >= 8)
                        {
                            if(k!=1)
                            {
                                if (colInx == 0)
                                    k = 11;
                            }
                          
                        }
                    }
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
                            AppendTextCell(excelColumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, k);
                            //AppendNumericCell(excelColumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow,k);
                        }
                    }
                    else
                    {
                        //  For text cells, just write the input data straight out to the Excel file.
                        DataColumn col = dt.Columns[colInx];
                        if (col.DataType.Name == "DateTime")
                        {
                            DateTime date;

                            if (DateTime.TryParse(cellValue, out date))
                            {
                                AppendTextCell(excelColumnNames[colInx] + rowIndex.ToString(), date.ToShortDateString(), newExcelRow, k);
                            }
                        }
                        else
                        {                           
                            AppendTextCell(excelColumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, k);
                        }

                    }
                    i++;
                }
            }

            var footerRow1 = new Row { RowIndex = 78};  // add a row at the bottom of spreadsheet
            sheetData.Append(footerRow1);
            AppendTextCell("B78", "" + "The data was compiled from financial data for the period noted, as reported to federal regulators. The financial data obtained from FFIEC,FDIC and other sources is consistently reliable, although; the accuracy", footerRow1, 12);
            var footerRow2 = new Row { RowIndex = 79};
            sheetData.Append(footerRow2);
            AppendTextCell("B79", "" + "and completeness of the data cannot be guaranteed by CB Resource, Inc. The information is presented in the form of financial ratios. Ratio definitions are provided at the end of this report. ", footerRow2, 12);
            var footerRow3 = new Row { RowIndex = 80 };
            AppendTextCell("B80", "" + "" + "Source: CB BankAnalytics™", footerRow3, 14);
            sheetData.Append(footerRow3);
            var footerRow4 = new Row { RowIndex = 80 };
            AppendTextCell("I80", "" + "" + "©2016 CB Resource, Inc.", footerRow4, 13);
            sheetData.Append(footerRow4);

        }
        private static void AppendTextCell(string cellReference, string cellStringValue, Row excelRow, DocumentFormat.OpenXml.UInt32Value index)
        {

            //  Add a new Excel Cell to our Row 
            Cell cell = new Cell() { CellReference = cellReference, DataType = CellValues.String, StyleIndex = index };
            CellValue cellValue = new CellValue();
            cellValue.Space = SpaceProcessingModeValues.Preserve;
            cellValue.Text = cellStringValue;
            cell.Append(cellValue);
            excelRow.Append(cell);
        }

        private static void AppendNumericCell(string cellReference, string cellStringValue, Row excelRow, DocumentFormat.OpenXml.UInt32Value index)
        {

            //  Add a new Excel Cell to our Row 
            Cell cell = new Cell() { CellReference = cellReference, DataType = CellValues.Number, StyleIndex = index };
            CellValue cellValue = new CellValue();
            cellValue.Text = cellStringValue;
            //cellValue.Text = string.Format("{0:#,##0.##}", Convert.ToDouble(cellStringValue));
            cell.Append(cellValue);
            excelRow.Append(cell);
        }
        private static string GetExcelColumnName(int columnIndex)
        {
            //  Convert a zero-based column index into an Excel column reference  (A, B, C.. Y, Y, AA, AB, AC... AY, AZ, B1, B2..)
            //
            //  eg  GetExcelColumnName(0) should return "A"
            //      GetExcelColumnName(1) should return "B"
            //      GetExcelColumnName(25) should return "Z"
            //      GetExcelColumnName(26) should return "AA"
            //      GetExcelColumnName(27) should return "AB"
            //      ..etc..
           
            //
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
                              { FontId = 0, FillId = 0, BorderId = 0, ApplyAlignment = true }


                )
            ); // return
        }

        private static DocumentFormat.OpenXml.UInt32Value GetSheetStyle(string cellValue)
        {
            DocumentFormat.OpenXml.UInt32Value k = 10;
            Category qtdCategory = CBR.Web.WebCommons.UtilityFunctions.GetQuarterlyCategories(); ;
            Category ytdCategory = CBR.Web.WebCommons.UtilityFunctions.GetYearlyCategories();

            if (cellValue.Equals(qtdCategory.CategoryLabels[0].Label))
            {
                k = 8;
            }
            else if (cellValue.Equals(qtdCategory.CategoryLabels[1].Label))
            {
                k = 8;
            }
            else if (cellValue.Equals(qtdCategory.CategoryLabels[2].Label))
            {
                k = 8;
            }
            else if (cellValue.Equals(qtdCategory.CategoryLabels[3].Label))
            {
                k = 8;
            }
            else if (cellValue.Equals(qtdCategory.CategoryLabels[4].Label))
            {
                k = 8;
            }
            else if (cellValue.Equals(ytdCategory.CategoryLabels[0].Label))
            {
                k = 8;
            }
            else if (cellValue.Equals(ytdCategory.CategoryLabels[1].Label))
            {
                k = 8;
            }
            else if (cellValue.Equals(ytdCategory.CategoryLabels[2].Label))
            {
                k = 8;
            }
            else if (cellValue.Equals(ytdCategory.CategoryLabels[3].Label))
            {
                k = 8;
            }
            else if (cellValue.Equals(ytdCategory.CategoryLabels[4].Label))
            {
                k = 8;
            }
            else if (cellValue.Equals("BalanceSheet"))
            {
                k = 1;
            }
            else if (cellValue.Equals("IncomeStatement"))
            {
                k = 1;
            }
            else if (cellValue.Equals("EarningsAndPerformance"))
            {
                k = 1;
            }
            else if (cellValue.Equals("AssetQuality"))
            {
                k = 1;
            }
            else if (cellValue.Equals("CapitalRatios"))
            {
                k = 1;
            }
            else if (cellValue.Equals("Liquidity"))
            {
                k = 1;
            }
            return k;
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
            // column.CustomWidth = true;
            column.BestFit = true;
            columns.Append(column);
            return columns;
        }
        private static double GetWidth(int textsize)
        {
            double width;

            width = (double)((textsize * 7 + 3) / 7 * 256) / 246;
            width = (double)decimal.Round((decimal)width + 0.2M, 2);
            return width;
        }

     
        public static void InsertImage(WorksheetPart worksheetPart, byte[] tmpBytes, int index)
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
               using (System.IO.MemoryStream ms = new System.IO.MemoryStream(tmpBytes))
                {
                    // imagePart.FeedData(stream);
                    bm = new System.Drawing.Bitmap(ms);
                    ms.Position = 0;
                    imagePart.FeedData(ms);
                }

               
                DocumentFormat.OpenXml.Drawing.Extents extents = new DocumentFormat.OpenXml.Drawing.Extents();
                //var extentsCx = (long)bm.Width * (long)((float)914400 / bm.HorizontalResolution);
                //var extentsCy = (long)bm.Height * (long)((float)914400 / bm.VerticalResolution);
                var extentsCx = (long)bm.Width * (long)((float)714400 / bm.HorizontalResolution);
                var extentsCy = (long)bm.Height * (long)((float)714400 / bm.VerticalResolution);

                bm.Dispose();

                var colOffset = 0;
                var rowOffset = 0;
                int colNumber = 0;
                int rowNumber = 0;
                switch (index)
                {
                    case 0:
                         colNumber = 9;
                         rowNumber = 8;
                        break;
                    case 1:
                         colNumber = 9;
                         rowNumber = 20;
                        break;
                    case 2:
                        colNumber = 9;
                        rowNumber = 32;
                        break;
                    case 3:
                        colNumber = 9;
                        rowNumber = 44;
                        break;
                    case 4:
                        colNumber = 2;
                        rowNumber = 57;
                        break;
                    case 5:
                        colNumber = 4;
                        rowNumber = 57;
                        break;
                    default:
                        Console.WriteLine("Default case");
                        break;
                }

                var nvps = worksheetDrawing.Descendants<Xdr.NonVisualDrawingProperties>();
                var nvpId = nvps.Count() > 0 ?
                    (UInt32Value)worksheetDrawing.Descendants<Xdr.NonVisualDrawingProperties>().Max(p => p.Id.Value) + 1 :
                    1U;

                var oneCellAnchor = new Xdr.OneCellAnchor(
                    new Xdr.FromMarker
                    {
                        ColumnId = new Xdr.ColumnId((colNumber - 1).ToString()),
                        RowId = new Xdr.RowId((rowNumber - 1).ToString()),
                        ColumnOffset = new Xdr.ColumnOffset(colOffset.ToString()),
                        RowOffset = new Xdr.RowOffset(rowOffset.ToString())
                    },
                    new Xdr.Extent { Cx = extentsCx, Cy = extentsCy },
                    new Xdr.Picture(
                        new Xdr.NonVisualPictureProperties(
                            new Xdr.NonVisualDrawingProperties { Id = nvpId, Name = "Picture " + nvpId, Description = "image" },
                            new Xdr.NonVisualPictureDrawingProperties(new A.PictureLocks { NoChangeAspect = true })
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

                worksheetDrawing.Append(oneCellAnchor);

              //  worksheetDrawing.Save();

                // Close the document. 
               // spreadsheetDocument.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }




    }
}
