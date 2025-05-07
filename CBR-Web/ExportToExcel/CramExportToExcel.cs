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

namespace CBR.Web.ExportToExcel
{
    class CramExportToExcel
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
        public static byte[] CreateExcelDocument(DataTable[] lists, string filename, BankProfileIntroductionData Bankfinalres)
        {
            byte[] data1 = null;
            try
            {
                DataSet ds = new DataSet();
                foreach (DataTable t in lists)
                {
                    ds.Tables.Add(t);
                }

                data1 = CreateExcelDocumentAsStream(ds, filename, Bankfinalres);

            }
            catch (Exception ex)
            {
                Trace.WriteLine("Failed, exception thrown: " + ex.Message);

            }

            return data1;
        }
        public static byte[] CreateExcelDocumentAsStream(DataSet ds, string filename, BankProfileIntroductionData Bankfinalres)
        {
            byte[] data1 = null;
            try
            {
                System.IO.MemoryStream stream = new System.IO.MemoryStream();
                using (SpreadsheetDocument document = SpreadsheetDocument.Create(stream, SpreadsheetDocumentType.Workbook, true))
                {
                    WriteExcelFile(ds, document, Bankfinalres);
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
        private static void WriteExcelFile(DataSet ds, SpreadsheetDocument spreadsheet, BankProfileIntroductionData Bankfinalres)
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
                if (dt.TableName != "Information")
                {
                    MergeCells mergeCells = new MergeCells();
                    newWorksheetPart.Worksheet.InsertAfter(mergeCells, newWorksheetPart.Worksheet.Elements<SheetData>().First());
                    if (dt.TableName == "Dashboard")
                    {
                        MergeCell mergeCell1 = new MergeCell() { Reference = new StringValue("A1" + ":" + "G1") };                    
                        MergeCell mergeCell3 = new MergeCell() { Reference = new StringValue("A12" + ":" + "C12") };
                        MergeCell mergeCell4 = new MergeCell() { Reference = new StringValue("E12" + ":" + "G12") };
                        MergeCell mergeCell5 = new MergeCell() { Reference = new StringValue("A2" + ":" + "G2") };
                        MergeCell mergeCell8 = new MergeCell() { Reference = new StringValue("A3" + ":" + "G3") };
                        MergeCell mergeCell6 = new MergeCell() { Reference = new StringValue("A4" + ":" + "C4") };
                        MergeCell mergeCell7 = new MergeCell() { Reference = new StringValue("E4" + ":" + "G4") };                      
                        mergeCells.Append(mergeCell1);                       
                        mergeCells.Append(mergeCell3);
                        mergeCells.Append(mergeCell4);
                        mergeCells.Append(mergeCell5);
                        mergeCells.Append(mergeCell6);
                        mergeCells.Append(mergeCell7);
                        mergeCells.Append(mergeCell8);
                    }
                    else
                    {
                        MergeCell mergeCell1 = new MergeCell() { Reference = new StringValue("A1" + ":" + "G1") };
                        MergeCell mergeCell2 = new MergeCell() { Reference = new StringValue("A15" + ":" + "G15") };
                        MergeCell mergeCell3 = new MergeCell() { Reference = new StringValue("A16" + ":" + "E16") };
                        MergeCell mergeCell4 = new MergeCell() { Reference = new StringValue("A17" + ":" + "E17") };
                        MergeCell mergeCell5 = new MergeCell() { Reference = new StringValue("A18" + ":" + "E18") };
                        MergeCell mergeCell6 = new MergeCell() { Reference = new StringValue("A19" + ":" + "E19") };
                        MergeCell mergeCell7 = new MergeCell() { Reference = new StringValue("A20" + ":" + "E20") };
                        MergeCell mergeCell8 = new MergeCell() { Reference = new StringValue("A21" + ":" + "E21") };
                        MergeCell mergeCell9 = new MergeCell() { Reference = new StringValue("A22" + ":" + "E22") };
                        MergeCell mergeCell10 = new MergeCell() { Reference = new StringValue("A23" + ":" + "E23") };
                        MergeCell mergeCell11 = new MergeCell() { Reference = new StringValue("A24" + ":" + "G24") };
                        MergeCell mergeCell12 = new MergeCell() { Reference = new StringValue("A25" + ":" + "E25") };
                        MergeCell mergeCell13 = new MergeCell() { Reference = new StringValue("A26" + ":" + "E26") };
                        MergeCell mergeCell14 = new MergeCell() { Reference = new StringValue("A27" + ":" + "E27") };
                        MergeCell mergeCell17 = new MergeCell() { Reference = new StringValue("A28" + ":" + "E28") };
                        MergeCell mergeCell18 = new MergeCell() { Reference = new StringValue("A29" + ":" + "E29") };
                        MergeCell mergeCell15 = new MergeCell() { Reference = new StringValue("A2" + ":" + "G2") };
                        MergeCell mergeCell16 = new MergeCell() { Reference = new StringValue("A3" + ":" + "G3") };
                        mergeCells.Append(mergeCell1);
                        mergeCells.Append(mergeCell2);
                        mergeCells.Append(mergeCell3);
                        mergeCells.Append(mergeCell4);
                        mergeCells.Append(mergeCell5);
                        mergeCells.Append(mergeCell6);
                        mergeCells.Append(mergeCell7);
                        mergeCells.Append(mergeCell8);
                        mergeCells.Append(mergeCell9);
                        mergeCells.Append(mergeCell10);
                        mergeCells.Append(mergeCell11);
                        mergeCells.Append(mergeCell12);
                        mergeCells.Append(mergeCell13);
                        mergeCells.Append(mergeCell14);
                        mergeCells.Append(mergeCell15);
                        mergeCells.Append(mergeCell16);
                        mergeCells.Append(mergeCell17);
                        mergeCells.Append(mergeCell18);
                    }
                }
                else
                {
                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)1, (uint)1, 25 + 0.8), newWorksheetPart.Worksheet.SheetFormatProperties);
                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)2, (uint)2, 12 + 0.8), newWorksheetPart.Worksheet.SheetFormatProperties);
                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)3, (uint)3, 18 + 0.8), newWorksheetPart.Worksheet.SheetFormatProperties);
                }
                // save worksheet
                WriteDataTableToExcelWorksheet(dt, newWorksheetPart, Bankfinalres);
                //Add width to columns                
                int l = 1;
                var maxLength = 0;
                foreach (var item in dt.Columns)
                {
                    maxLength = item.ToString().Length;
                    if (item.ToString().Length <= 10)
                        maxLength = 12;
                    double width = GetWidth(maxLength);
                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)l, (uint)l, width + 0.5), newWorksheetPart.Worksheet.SheetFormatProperties);
                    l++;
                }
                //int i = 0;
                //for (i = 0; i < dt.Columns.Count; i++)
                //{
                //    int maxlength = dt.AsEnumerable().Where(r => r.Field<string>(i) != null).Select(r => r.Field<string>(i).Length).DefaultIfEmpty().Max();
                //    double width = GetWidth(maxlength);
                //    // CreateColumnData((uint)i + 1, (uint)i + 1, width);
                //    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)i + 1, (uint)i + 1, width), newWorksheetPart.Worksheet.SheetFormatProperties);

                //}

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
        private static Columns CreateColumnData(UInt32 StartColumnIndex, UInt32 EndColumnIndex, double ColumnWidth)
        {
            Columns columns = new Columns();

            Column column;
            column = new Column();
            column.Min = StartColumnIndex;
            column.Max = EndColumnIndex;
            column.Width = ColumnWidth;
            column.CustomWidth = true;
            column.BestFit = true;
            columns.Append(column);
            return columns;
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
            uint rowIndex;
            if (dt.TableName != "Information")
            {
                if (dt.TableName == "Dashboard")
                {
                    var headerRow1 = new Row { RowIndex = 1 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow1);
                    AppendTextCell(excelColumnNames[0] + "1", Bankfinalres.Name + "  FDIC #" + Bankfinalres.FDICCertificate, headerRow1, 8);

                    var headerRow2 = new Row { RowIndex = 2 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow2);
                    AppendTextCell(excelColumnNames[0] + "2", "Headquarters:  " + Bankfinalres.HeadQuarters, headerRow2, 8);

                    var headerRow5 = new Row { RowIndex = 3 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow5);
                    AppendTextCell(excelColumnNames[0] + "3", "Dashboard", headerRow5, 8);

                    var headerRow3 = new Row { RowIndex = 4 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow3);
                    var bold = new CellFormat() { FontId = 1, FillId = 0, BorderId = 0, ApplyFont = true };
                    DataColumn col1 = dt.Columns[0];
                    AppendTextCell(excelColumnNames[0] + "4", "Tier 1 leverage Capital Summary", headerRow3, 8);
                    sheetData.Append(bold);

                    var headerRow4 = new Row { RowIndex = 4 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow4);
                    AppendTextCell(excelColumnNames[4] + "4", " Common Equity Tier 1 Capital Summary", headerRow4, 8);                   
                }
                else if (dt.TableName == "Tier 1 Leverage Ratio")
                {
                    var headerRow1 = new Row { RowIndex = 1 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow1);
                    AppendTextCell(excelColumnNames[0] + "1", Bankfinalres.Name + "  FDIC #" + Bankfinalres.FDICCertificate, headerRow1, 8);

                    var headerRow3 = new Row { RowIndex = 2 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow3);
                    AppendTextCell(excelColumnNames[0] + "2", "Headquarters:  " + Bankfinalres.HeadQuarters, headerRow3, 8);

                    var headerRow2 = new Row { RowIndex = 3 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow2);
                    AppendTextCell(excelColumnNames[0] + "3", " Tier 1 Leverage Capital Buffer by Risk Category", headerRow2, 8);
                }
                else if (dt.TableName == "CET 1 Capital Ratio")
                {
                    var headerRow1 = new Row { RowIndex = 1 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow1);
                    AppendTextCell(excelColumnNames[0] + "1", Bankfinalres.Name + "  FDIC #" + Bankfinalres.FDICCertificate, headerRow1, 8);

                    var headerRow3 = new Row { RowIndex = 2 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow3);
                    AppendTextCell(excelColumnNames[0] + "2", "Headquarters:  " + Bankfinalres.HeadQuarters, headerRow3, 8);

                    var headerRow2 = new Row { RowIndex = 3 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow2);
                    AppendTextCell(excelColumnNames[0] + "3", " Common Equity Tier 1 (CET1) Capital Buffer by Risk Category", headerRow2, 8);
                }
                else if (dt.TableName == "Tier 1 Capital Ratio")
                {
                    var headerRow1 = new Row { RowIndex = 1 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow1);
                    AppendTextCell(excelColumnNames[0] + "1", Bankfinalres.Name + "  FDIC #" + Bankfinalres.FDICCertificate, headerRow1, 8);

                    var headerRow3 = new Row { RowIndex = 2 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow3);
                    AppendTextCell(excelColumnNames[0] + "2", "Headquarters:  " + Bankfinalres.HeadQuarters, headerRow3, 8);

                    var headerRow2 = new Row { RowIndex = 3 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow2);
                    AppendTextCell(excelColumnNames[0] + "3", "Tier 1 Risk-Based Capital by Risk Category", headerRow2, 8);
                }
                else if (dt.TableName == "Total Capital Ratio")
                {
                    var headerRow1 = new Row { RowIndex = 1 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow1);
                    AppendTextCell(excelColumnNames[0] + "1", Bankfinalres.Name + "  FDIC #" + Bankfinalres.FDICCertificate, headerRow1, 8);

                    var headerRow3 = new Row { RowIndex = 2 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow3);
                    AppendTextCell(excelColumnNames[0] + "2", "Headquarters:  " + Bankfinalres.HeadQuarters, headerRow3, 8);

                    var headerRow2 = new Row { RowIndex = 3 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow2);
                    AppendTextCell(excelColumnNames[0] + "3", "Total Capital Buffer by Risk Category", headerRow2, 8);
                }

            }
            string colIndex = "1";
            if (dt.TableName == "Information")
            {
                rowIndex = 1;
                colIndex = "1";
            }
            else if (dt.TableName == "Dashboard")
            {
                rowIndex = 6;
                colIndex = "6";
            }
            else
            {
                rowIndex = 5;
                colIndex = "5";
            }

            var headerRow = new Row { RowIndex = rowIndex };  // add a row at the top of spreadsheet           
            for (int colInx = 0; colInx < numberOfColumns; colInx++)
            {
                DataColumn col = dt.Columns[colInx];
                var index = GetSheetStyle(col.ColumnName, dt.TableName);
                AppendTextCell(excelColumnNames[colInx] + colIndex, col.ColumnName, headerRow, index);
                IsNumericColumn[colInx] = (col.DataType.FullName == "System.Decimal") || (col.DataType.FullName == "System.Int32");
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
                    cellValue = dr.ItemArray[colInx].ToString();
                    DocumentFormat.OpenXml.UInt32Value k = GetSheetStyle(cellValue, dt.TableName);
                    bool IsNumericColumn11 = false;
                    // cellValue = GetCellValue(cellValue);
                    var regex = @"^\$(\d{1,3},?(\d{3},?)*\d{3}(\.\d{1,3})?|\d{1,3}(\.\d{2})?)$|^\d{1,2}(\.\d{1,2})? *%$|^100%$";
                    var match = Regex.Match(cellValue, regex, RegexOptions.IgnoreCase);
                    // Create cell with data
                    IsNumericColumn11 = match.Success;
                    if (rowIndex >= 6)
                    {
                        if (rowIndex <= 13)
                            if (excelColumnNames[colInx].Contains("I"))
                                k = 18;
                            else if (excelColumnNames[colInx].Contains("J"))
                                k = 16;
                            else if (excelColumnNames[colInx].Contains("K"))
                                k = 17;
                            else if (excelColumnNames[colInx].Contains("L"))
                                k = 15;
                            else if (excelColumnNames[colInx].Contains("M"))
                                k = 19;
                    }
                    if (IsNumericColumn[colInx])
                    {
                        //  For numeric cells, make sure our input data IS a number, then write it out to the Excel file.
                        //  If this numeric value is NULL, then don't write anything to the Excel file.
                        cellNumericValue = 0;
                        if (double.TryParse(cellValue, out cellNumericValue))
                        {
                            cellValue = cellNumericValue.ToString();
                            AppendNumericCell(excelColumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, k);
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
                            // if(IsNumericColumn11)
                            //AppendNumericCell(excelColumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow);
                            //  else                            
                            AppendTextCell(excelColumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, k);
                        }

                    }
                    i++;
                }
            }
        }
        private static void AppendTextCell(string cellReference, string cellStringValue, Row excelRow, DocumentFormat.OpenXml.UInt32Value index)
        {

            //  Add a new Excel Cell to our Row 
            Cell cell = new Cell() { CellReference = cellReference, DataType = CellValues.String, StyleIndex = index };
            CellValue cellValue = new CellValue();
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
            cell.Append(cellValue);
            excelRow.Append(cell);
        }
        private static string GetExcelColumnName(int columnIndex)
        {
            if (columnIndex < 26)
                return ((char)('A' + columnIndex)).ToString();

            char firstChar = (char)('A' + (columnIndex / 26) - 1);
            char secondChar = (char)('A' + (columnIndex % 26));

            return string.Format("{0}{1}", firstChar, secondChar);
        }
        private static Stylesheet GenerateStyleSheet()
        {
            return new Stylesheet(
                new Fonts(
                    new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 0 – The default font.
                    new FontSize() { Val = 11 },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 1 – The bold font.
                    new Bold(),
                    new FontSize() { Val = 11 },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 2 – The bold font.
                    new Bold(),
                    new FontSize() { Val = 11 },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 3 – The bold font.
                    new Bold(),
                    new FontSize() { Val = 20 },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 4 – The Italic font.
                    new Italic(),
                    new FontSize() { Val = 11 },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                            // Index 2 – The Times Roman font. with 16 size
                    new FontSize() { Val = 16 },
                    new FontName() { Val = "Times New Roman" })
                ),
                new Fills(
               new Fill(                                                           // Index 0 – The green fill.
                    new PatternFill(
                    )
                    { PatternType = PatternValues.Solid }),
                new Fill(                                                           // Index 1 – The green fill.
                    new PatternFill(
                    )
                    { PatternType = PatternValues.Solid }),

                new Fill(                                                           // Index 2 – The green fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "00238b18" } }// green color
                    )
                    { PatternType = PatternValues.Solid }),

                new Fill(                                                           // Index 3 – The red fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "00A71D24" } }// red color
                    )
                    { PatternType = PatternValues.Solid }),

                 new Fill(                                                           // Index 4 – The yellow fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "00ffff00" } }// yellow color
                    )
                    { PatternType = PatternValues.Solid }),
                 new Fill(                                                           // Index 5 – The grey fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "00dddddd" } }// grey color
                    )
                    { PatternType = PatternValues.Solid }),
                 new Fill(                                                           // Index 6 – The orange fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "00ff9900" } }
                    )
                    { PatternType = PatternValues.Solid }),
                  new Fill(                                                           // Index 7 – The light-green fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "0092d050" } }
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
                    new CellFormat() { FontId = 0, FillId = 0, BorderId = 1, ApplyBorder = true },     // Index 9 – Border
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
                   new CellFormat() { FontId = 0, FillId = 6, BorderId = 0, ApplyFill = true },      // Index 12 – Orange Fill
                   new CellFormat() { FontId = 0, FillId = 7, BorderId = 0, ApplyFill = true },        // Index 13 – light-green  Fill
                   new CellFormat(                                                                   // Index 14 – Alignment left with bold
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                   { FontId = 1, FillId = 0, BorderId = 0, ApplyAlignment = true },
                   new CellFormat(                                                                   // Index 15 – Orange Fill Alignment left with bold
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Right },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                   { FontId = 0, FillId = 6, BorderId = 0, ApplyAlignment = true },

                      new CellFormat(                                                                   // Index 16 – light-green  Fill Alignment left with bold
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Right },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                      { FontId = 0, FillId = 7, BorderId = 0, ApplyFill = true },

                       new CellFormat(                                                                   // Index 17 – Yellow Fill Alignment left with bold
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Right },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                       { FontId = 0, FillId = 4, BorderId = 0, ApplyFill = true },
                        new CellFormat(                                                                   // Index 18 – Green Fill Alignment left with bold
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Right },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                        { FontId = 0, FillId = 2, BorderId = 0, ApplyFill = true },
                         new CellFormat(                                                                   // Index 19 – Red Fill Alignment left with bold
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Right },
                        new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                         { FontId = 0, FillId = 3, BorderId = 0, ApplyFill = true }

                )
            ); // return
        }

        private static DocumentFormat.OpenXml.UInt32Value GetSheetStyle(string cellValue, string tableName)
        {
            DocumentFormat.OpenXml.UInt32Value k = 10;
            if (tableName == "Dashboard")
            {
                if (cellValue.Equals("Regulatory Minimum (PCA Well-Capitalized)"))
                {
                    k = 1;
                }
                else if (cellValue.Contains("Actual Tier 1 Leverage Ratio"))
                {
                    k = 1;
                }
                else if (cellValue.Contains("Regulatory Minimum (PCA Well-Capitalized) "))
                {
                    k = 1;
                }
                else if (cellValue.Contains("Total Capital Summary"))
                {
                    k = 8;
                }
                else if (cellValue.Contains("Tier 1 Capital Summary"))
                {
                    k = 8;
                }
                else if (cellValue.Contains("Common Equity Tier 1 Capital Summary"))
                {
                    k = 14;
                }
            }
            else
            {
                if (cellValue.Contains("Regulatory Minimum (PCA Well-Capitalized)"))
                {
                    k = 11;
                }
                else if (cellValue.Contains("Actual Tier 1 Leverage Ratio"))
                {
                    k = 11;
                }
                else if (cellValue.Contains("Common Equity Tier 1 Capital Summary"))
                {
                    k = 14;
                }
                else if (cellValue.Contains("Tier 1 Capital Summary"))
                {
                    k = 14;
                }
                else if (cellValue.Contains("Total Capital Summary"))
                {
                    k = 14;
                }

            }


            if (cellValue.Contains("Actual CET1 Capital Ratio"))
            {
                k = 1;
            }
            else if (cellValue.Contains("Actual Tier 1 Risk-Based Capital Ratio"))
            {
                k = 1;
            }
            else if (cellValue.Contains("Actual Total Capital Ratio"))
            {
                k = 1;
            }

            else if (cellValue.Contains("Buffer:"))
            {
                k = 0;
            }
            else if (cellValue.Contains("Risk Categories"))
            {
                k = 1;
            }
            else if (cellValue.Contains("Composite Risk Score"))
            {
                k = 1;
            }
            else if (cellValue.Contains("Risk Rating"))
            {
                k = 1;
            }
            else if (cellValue.Contains("Risk-Weighting"))
            {
                k = 1;
            }
            else if (cellValue.Contains("Capital Risk Buffer"))
            {
                k = 1;
            }
            else if (cellValue.Contains("Weighted Risk Buffer"))
            {
                k = 1;
            }
            else if (cellValue.Contains("Tier 1 Capital (000)"))
            {
                k = 1;
            }
            else if (cellValue.Equals("Tier 1 Leverage Capital"))
            {
                k = 1;
            }
            else if (cellValue.Equals("Regulatory Minimum (PCA Well-Capitalized) for Tier 1 Leverage Ratio"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Implied Minimum for Tier 1 Leverage Ratio Based on Risk Assessment"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Bank’s Minimum (Policy) for Tier 1 Leverage Ratio"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Bank’s Tier 1 Leverage Ratio"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Tier 1 Leverage Capital Summary"))
            {
                k = 1;
            }
            else if (cellValue.Equals("Credit Risk"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Interest Rate Risk"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Liquidity Risk"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Operational Risk"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Compliance Risk"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Strategic Risk"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Reputation Risk"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Total:"))
            {
                k = 1;
            }
            else if (cellValue.Equals("Low"))
            {
                k = 4;
            }
            else if (cellValue.Equals("Low-Moderate"))
            {
                k = 13;
            }
            else if (cellValue.Equals("Moderate"))
            {
                k = 6;
            }
            else if (cellValue.Equals("High"))
            {
                k = 5;
            }
            else if (cellValue.Equals("Moderate-High"))
            {
                k = 12;
            }

            else if (cellValue.Equals("Common Equity Tier 1 Capital"))
            {
                k = 1;
            }
            else if (cellValue.Equals("Implied Minimum for CET1 Capital Ratio Based on Risk Assessment"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Bank’s Minimum (Policy) for CET1 Capital Ratio"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Bank’s CET1 Capital Ratio"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Tier 1 Capital"))
            {
                k = 1;
            }
            else if (cellValue.Equals("Bank’s Minimum (Policy) for Tier 1 RBC Ratio"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Bank’s Tier 1 RBC Ratio"))
            {
                k = 11;
            }

            else if (cellValue.Equals("Total Capital"))
            {
                k = 1;
            }
            else if (cellValue.Equals("Implied Minimum for Total Capital Ratio Based on Risk Assessment"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Bank’s Minimum (Policy) for Total Capital Ratio"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Bank’s Total Capital Ratio"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Implied Minimum for Tier 1 RBC Ratio Based on Risk Assessment"))
            {
                k = 11;
            }
            else if (cellValue.Equals("Bank"))
            {
                k = 14;
            }
            else if (cellValue.Equals("Period"))
            {
                k = 14;
            }
            else if (cellValue.Equals("Scenario"))
            {
                k = 14;
            }
            else if (cellValue.Equals("LOW"))
            {
                k = 8;
            }
            else if (cellValue.Equals("LOW - MOD"))
            {
                k = 8;
            }
            else if (cellValue.Equals("MODERATE"))
            {
                k = 8;
            }
            else if (cellValue.Equals("MOD-HIGH"))
            {
                k = 8;
            }
            else if (cellValue.Equals("HIGH"))
            {
                k = 8;
            }
            return k;
        }

        private static double GetWidth(int textsize)
        {
            double width;

            width = (double)((textsize * 7 + 5) / 7 * 256) / 256;
            width = (double)decimal.Round((decimal)width + 0.2M, 2);
            return width;
        }
    }
}
