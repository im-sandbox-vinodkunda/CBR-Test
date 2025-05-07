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
    public class CreateGapAnalyzerExportToExcel
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
        public static byte[] CreateExcelDocument(DataTable[] lists, string filename, BankProfileIntroductionData Bankfinalres, List<byte[]> img,string rptPeriod,DataTable dtstrengths, DataTable dtweeknesses,string QtdOrYtd)
        {
            byte[] data1 = null;
            try
            {
                DataSet ds = new DataSet();
                foreach (DataTable t in lists)
                {
                    ds.Tables.Add(t);
                }

                data1 = CreateExcelDocumentAsStream(ds, filename, Bankfinalres, img, rptPeriod, dtstrengths, dtweeknesses, QtdOrYtd);

            }
            catch (Exception ex)
            {
                Trace.WriteLine("Failed, exception thrown: " + ex.Message);

            }

            return data1;
        }
        public static byte[] CreateExcelDocumentAsStream(DataSet ds, string filename, BankProfileIntroductionData Bankfinalres, List<byte[]> img, string rptPeriod, DataTable dtstrengths, DataTable dtweeknesses,string QtdOrYtd)
        {
            byte[] data1 = null;
            try
            {
                System.IO.MemoryStream stream = new System.IO.MemoryStream();
                using (SpreadsheetDocument document = SpreadsheetDocument.Create(stream, SpreadsheetDocumentType.Workbook, true))
                {
                    WriteExcelFile(ds, document, Bankfinalres, img, rptPeriod, dtstrengths, dtweeknesses, QtdOrYtd);
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
        private static void WriteExcelFile(DataSet ds, SpreadsheetDocument spreadsheet, BankProfileIntroductionData Bankfinalres, List<byte[]> img, string rptPeriod, DataTable dtstrengths, DataTable dtweeknesses, string QtdOrYtd)
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
                //newWorksheetPart.Worksheet.AppendChild(new Alignment { Horizontal = HorizontalAlignmentValues.Right });
                if (dt.TableName != "Information")
                {
                    MergeCells mergeCells = new MergeCells();
                    newWorksheetPart.Worksheet.InsertAfter(mergeCells, newWorksheetPart.Worksheet.Elements<SheetData>().First());
                    if (dt.TableName == "Financial Highlights")
                    {
                        MergeCell mergeCell1 = new MergeCell() { Reference = new StringValue("B2" + ":" + "L2") };
                        MergeCell mergeCell2 = new MergeCell() { Reference = new StringValue("B3" + ":" + "L3") };
                        MergeCell mergeCell3 = new MergeCell() { Reference = new StringValue("B4" + ":" + "L4") };
                        MergeCell mergeCell5 = new MergeCell() { Reference = new StringValue("B5" + ":" + "L5") };
                        MergeCell mergeCell6 = new MergeCell() { Reference = new StringValue("B6" + ":" + "L6") };

                        mergeCells.Append(mergeCell1);
                        mergeCells.Append(mergeCell2);
                        mergeCells.Append(mergeCell3);
                        mergeCells.Append(mergeCell5);
                        mergeCells.Append(mergeCell6);
                    }
                    else if (dt.TableName == "Loans & Leases") //02-06-2017 - Lavanya - Headers span from B to S on Loans & Leases Tab
                    {
                        MergeCell mergeCell1 = new MergeCell() { Reference = new StringValue("B2" + ":" + "S2") };
                        MergeCell mergeCell2 = new MergeCell() { Reference = new StringValue("B3" + ":" + "S3") };
                        MergeCell mergeCell3 = new MergeCell() { Reference = new StringValue("B4" + ":" + "S4") };
                        MergeCell mergeCell5 = new MergeCell() { Reference = new StringValue("B5" + ":" + "S5") };
                        MergeCell mergeCell6 = new MergeCell() { Reference = new StringValue("B6" + ":" + "S6") };
                        MergeCell mergeCell39 = new MergeCell() { Reference = new StringValue("B7" + ":" + "S7") };

                        mergeCells.Append(mergeCell1);
                        mergeCells.Append(mergeCell2);
                        mergeCells.Append(mergeCell3);
                        mergeCells.Append(mergeCell5);
                        mergeCells.Append(mergeCell6);
                        mergeCells.Append(mergeCell39);
                    }

                    if (dt.TableName == "Financial Highlights")
                    {

                        MergeCell mergeCell36 = new MergeCell() { Reference = new StringValue("B7" + ":" + "H7") };
                        mergeCells.Append(mergeCell36);

                        MergeCell mergeCell7 = new MergeCell() { Reference = new StringValue("I7" + ":" + "L7") };
                        mergeCells.Append(mergeCell7);

                        MergeCell mergeCell22 = new MergeCell() { Reference = new StringValue("B17" + ":" + "L17") };
                        mergeCells.Append(mergeCell22);
                        MergeCell mergeCell29 = new MergeCell() { Reference = new StringValue("B18" + ":" + "L18") };
                        mergeCells.Append(mergeCell29);
                        MergeCell mergeCell23 = new MergeCell() { Reference = new StringValue("B24" + ":" + "L24") };
                        mergeCells.Append(mergeCell23);
                        MergeCell mergeCell30 = new MergeCell() { Reference = new StringValue("B25" + ":" + "L25") };
                        mergeCells.Append(mergeCell30);
                        MergeCell mergeCell24 = new MergeCell() { Reference = new StringValue("B32" + ":" + "L32") };
                        mergeCells.Append(mergeCell24);
                        MergeCell mergeCell31 = new MergeCell() { Reference = new StringValue("B33" + ":" + "L33") };
                        mergeCells.Append(mergeCell31);
                        MergeCell mergeCell25 = new MergeCell() { Reference = new StringValue("B41" + ":" + "L41") };
                        mergeCells.Append(mergeCell25);
                        MergeCell mergeCell32 = new MergeCell() { Reference = new StringValue("B42" + ":" + "L42") };
                        mergeCells.Append(mergeCell32);
                        MergeCell mergeCell26 = new MergeCell() { Reference = new StringValue("B47" + ":" + "L47") };
                        mergeCells.Append(mergeCell26);
                        MergeCell mergeCell33 = new MergeCell() { Reference = new StringValue("B48" + ":" + "L48") };
                        mergeCells.Append(mergeCell33);
                        MergeCell mergeCell27 = new MergeCell() { Reference = new StringValue("B62" + ":" + "L62") };
                        mergeCells.Append(mergeCell27);
                        MergeCell mergeCell34 = new MergeCell() { Reference = new StringValue("B63" + ":" + "L63") };
                        mergeCells.Append(mergeCell34);
                        MergeCell mergeCell28 = new MergeCell() { Reference = new StringValue("B70" + ":" + "L70") };
                        mergeCells.Append(mergeCell28);
                        MergeCell mergeCell35 = new MergeCell() { Reference = new StringValue("B71" + ":" + "L71") };
                        mergeCells.Append(mergeCell35);


                       // MergeCell mergeCell37 = new MergeCell() { Reference = new StringValue("E9" + ":" + "E78") };
                      }

                   // newWorksheetPart.Worksheet.AppendChild(new Alignment { Horizontal = HorizontalAlignmentValues.Center });

                  
                    if(dt.TableName == "Loans & Leases")
                    {
                        MergeCell mergeCell8 = new MergeCell() { Reference = new StringValue("G8" + ":" + "S8") };
                        MergeCell mergeCell9 = new MergeCell() { Reference = new StringValue("G9" + ":" + "L9") };
                        MergeCell mergeCell10 = new MergeCell() { Reference = new StringValue("N9" + ":" + "S9") };
                        MergeCell mergeCell11 = new MergeCell() { Reference = new StringValue("G16" + ":" + "S17") };

                        MergeCell mergeCell12 = new MergeCell() { Reference = new StringValue("I10" + ":" + "L10") };
                        MergeCell mergeCell13 = new MergeCell() { Reference = new StringValue("I11" + ":" + "L11") };
                        MergeCell mergeCell14 = new MergeCell() { Reference = new StringValue("I12" + ":" + "L12") };
                        MergeCell mergeCell15 = new MergeCell() { Reference = new StringValue("I13" + ":" + "L13") };
                        MergeCell mergeCell16 = new MergeCell() { Reference = new StringValue("I14" + ":" + "L14") };

                        MergeCell mergeCell17 = new MergeCell() { Reference = new StringValue("P10" + ":" + "S10") };
                        MergeCell mergeCell18 = new MergeCell() { Reference = new StringValue("P11" + ":" + "S11") };
                        MergeCell mergeCell19 = new MergeCell() { Reference = new StringValue("P12" + ":" + "S12") };
                        MergeCell mergeCell20 = new MergeCell() { Reference = new StringValue("P13" + ":" + "S13") };
                        MergeCell mergeCell21 = new MergeCell() { Reference = new StringValue("P14" + ":" + "S14") };

                        mergeCells.Append(mergeCell8);
                        mergeCells.Append(mergeCell9);
                        mergeCells.Append(mergeCell10);
                    
                        mergeCells.Append(mergeCell12);
                        mergeCells.Append(mergeCell17);
                        mergeCells.Append(mergeCell13);
                        mergeCells.Append(mergeCell18);
                        mergeCells.Append(mergeCell14);
                        mergeCells.Append(mergeCell19);
                        mergeCells.Append(mergeCell15);
                        mergeCells.Append(mergeCell20);
                        mergeCells.Append(mergeCell16);      
                        mergeCells.Append(mergeCell21);
                
                        MergeCell mergeCell38 = new MergeCell() { Reference = new StringValue("G15" + ":" + "S15") };
                        mergeCells.Append(mergeCell38);
                        mergeCells.Append(mergeCell11);
                    }

                }

                // save worksheet
               WriteDataTableToExcelWorksheet(dt, newWorksheetPart, Bankfinalres, rptPeriod, dtstrengths, dtweeknesses, QtdOrYtd);
                //Add width to columns
                int i = 0;
                if (dt.TableName == "Financial Highlights")
                {
                    for (i = 0; i < dt.Columns.Count; i++)
                    {
                        int columnIndx = 0;
                        columnIndx = i;

                        if (i > 4)
                            columnIndx = i + 2;
                        else if (i > 2)
                            columnIndx = i + 1;
                        else
                            columnIndx = i;

                        int maxlength = dt.AsEnumerable().Where(r => r.Field<string>(i) != null).Select(r => r.Field<string>(i).Length).DefaultIfEmpty().Max();
                        int maxcolheaderlength = dt.Columns[i].ToString().Length;

                        if (maxcolheaderlength > maxlength)
                            maxlength = maxcolheaderlength;

                        double width = GetWidth(maxlength);
                        // CreateColumnData((uint)i + 1, (uint)i + 1, width);
                        //if(i != 2 && i != 4)
                        newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)columnIndx + 2, (uint)columnIndx + 2, width), newWorksheetPart.Worksheet.SheetFormatProperties);
                        if(i == 2)
                            newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)5, (uint)5, 2), newWorksheetPart.Worksheet.SheetFormatProperties);
                        if(i == 4)
                            newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)8, (uint)8, 2), newWorksheetPart.Worksheet.SheetFormatProperties);

                    }
                }

                i = 0;
                if (dt.TableName == "Loans & Leases")
                {
                    for (i = 0; i < dt.Columns.Count; i++)
                    {

                        int maxlength = dt.AsEnumerable().Where(r => r.Field<string>(i) != null).Select(r => r.Field<string>(i).Length).DefaultIfEmpty().Max();
                        int maxcolheaderlength = dt.Columns[i].ToString().Length;

                        if (maxcolheaderlength > maxlength)
                            maxlength = maxcolheaderlength;

                        double width = GetWidth(maxlength);
                        // CreateColumnData((uint)i + 1, (uint)i + 1, width);
                            newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)i + 2, (uint)i + 2, width), newWorksheetPart.Worksheet.SheetFormatProperties);
                    }
                }
                if (dt.TableName == "Loans & Leases")
                {
                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)6, (uint)6, 2.5), newWorksheetPart.Worksheet.SheetFormatProperties);
                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)7, (uint)7, 3), newWorksheetPart.Worksheet.SheetFormatProperties);
                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)8, (uint)8, 8), newWorksheetPart.Worksheet.SheetFormatProperties);
                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)9, (uint)9, 13), newWorksheetPart.Worksheet.SheetFormatProperties);

                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)13, (uint)13, 2.5), newWorksheetPart.Worksheet.SheetFormatProperties);
                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)14, (uint)14, 3), newWorksheetPart.Worksheet.SheetFormatProperties);
                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)15, (uint)15, 8), newWorksheetPart.Worksheet.SheetFormatProperties);
                    newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)16, (uint)16, 13), newWorksheetPart.Worksheet.SheetFormatProperties);

                }
                if (dt.TableName != "Financial Highlights")
                {
                    for (int j = 0; j < img.Count; j++)
                    {
                        InsertImage(newWorksheetPart, img[j], j);
                    }
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

        private static void WriteDataTableToExcelWorksheet(DataTable dt, WorksheetPart worksheetPart, BankProfileIntroductionData Bankfinalres, string rptPeriod, DataTable dtstrengths, DataTable dtweeknesses,string QtdOrYtd)
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
            string[] excelColumnNames = new string[numberOfColumns+2];
            for (int n = 0; n < numberOfColumns + 2; n++)
                excelColumnNames[n] = GetExcelColumnName(n);

            string[] excelstrcolumnNames = new string[dtstrengths.Columns.Count];
            for (int n = 0; n < dtstrengths.Columns.Count; n++)
                excelstrcolumnNames[n] = GetStrExcelColumnName(n);
            
            string[] excelweakcolumnNames = new string[dtweeknesses.Columns.Count];
            for (int n = 0; n < dtweeknesses.Columns.Count; n++)
                excelweakcolumnNames[n] = GetWeakExcelColumnName(n);

            //
            //  Create the Header row in our Excel Worksheet
            //
            //var period = CommonFunctions.GetQuarterLabel(CommonFunctions.GetLastQuarterString());
            uint rowIndex;

            if (dt.TableName != "Information")
            {
                var headerRow1 = new Row { RowIndex = 2 };  // add a row at the top of spreadsheet
                sheetData.Append(headerRow1);
                AppendTextCell(excelColumnNames[0] + "2",  "  Gap Analyzer  " ,  headerRow1, 8);

                var headerRow2 = new Row { RowIndex = 3};  // add a row at the top of spreadsheet
                sheetData.Append(headerRow2);
                AppendTextCell(excelColumnNames[0] + "3", Bankfinalres.Name + "  FDIC #" + Bankfinalres.FDICCertificate, headerRow2, 8);

                var headerRow3 = new Row { RowIndex = 4 };  // add a row at the top of spreadsheet
                sheetData.Append(headerRow3);
                AppendTextCell(excelColumnNames[0] + "4", "Headquarters:  " + Bankfinalres.HeadQuarters, headerRow3, 8);

                var headerRow4 = new Row { RowIndex = 5 };  // add a row at the top of spreadsheet
                sheetData.Append(headerRow4); 
                AppendTextCell(excelColumnNames[0] + "5", "Report Period: " + rptPeriod, headerRow4, 8);

                if (dt.TableName == "Financial Highlights")
                {
                    var headerRow5 = new Row { RowIndex = 7 };  // add a row at the top of spreadsheet
                    sheetData.Append(headerRow5);
                    AppendTextCell("I" + "7", "Variance($000)", headerRow5, 8);
                }
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

            var headerRow = new Row { RowIndex = rowIndex };

            DocumentFormat.OpenXml.UInt32Value j = 1;
            for (int colInx = 0; colInx < numberOfColumns; colInx++)
            {

                DataColumn col = dt.Columns[colInx];
                string colName = string.Empty;
                var index = GetSheetStyle(col.ColumnName);
                if (index == "1")
                    col.ColumnName = GetCellValue(col.ColumnName);

                int columnIndx = 0;
                if (dt.TableName == "Financial Highlights")
                {
                    if (colInx > 4)
                        columnIndx = colInx + 2;
                    else if (colInx > 2)
                        columnIndx = colInx + 1;
                    else
                        columnIndx = colInx;
                }
                else
                {
                    columnIndx = colInx;
                }

                colName = col.ColumnName;
                switch (col.ColumnName)
                {
                    case "BenchMarkVar":
                        colName = "BenchMark";
                        break;
                    case "Peer1Var":
                        colName = "Peer1";
                        break;
                    case "Peer2Var":
                        colName = "Peer2";
                        break;
                }

                AppendTextCell(excelColumnNames[columnIndx] + colIndex, colName, headerRow, index);
                IsNumericColumn[colInx] = (col.DataType.FullName == "System.Decimal") || (col.DataType.FullName == "System.Int32");

                if (dt.TableName == "Financial Highlights")
                {
                    if (colInx == 2)
                    {
                        AppendTextCell(excelColumnNames[colInx + 1] + colIndex, "", headerRow, index);
                    }
                    if (colInx == 4)
                    {
                        AppendTextCell(excelColumnNames[colInx + 2] + colIndex, "", headerRow, index);
                    }
                }
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

                        int columnIndx = 0;
                        if (dt.TableName == "Financial Highlights")
                        {
                            if (colInx > 4)
                                columnIndx = colInx + 2;
                            else if (colInx > 2)
                                columnIndx = colInx + 1;
                            else
                                columnIndx = colInx;
                        }
                        else
                        {
                            columnIndx = colInx;
                        }
                        cellValue = dr.ItemArray[colInx].ToString();
                        if (cellValue == "")
                            cellValue = " ";
                        if (cellValue == "N/A")
                            cellValue = " ";
                  
                    
                        var regex = "^[0-9.,]*$";
                        //var regex = @"^[0-9]{1,3}(,%[0-9]{3})*(\.%[0-9]+)?$";
                        var match = Regex.Match(cellValue, regex, RegexOptions.IgnoreCase);
                        // Create cell with data
                        IsNumericColumn11 = match.Success;
                        DocumentFormat.OpenXml.UInt32Value k = GetSheetStyle(cellValue);
                        cellValue = GetCellValue(cellValue);
                        if (cellValue.IndexOf("-") == 0)
                        {
                         IsNumericColumn11 = true;
                        }
                    if (dt.TableName == "Information")
                            k = 0;
                        if (rowIndex == 2)
                            k = 1;
                        if (dt.TableName != "Information")
                        {
                            if (rowIndex >= 8)
                            {
                                if (k != 1)
                                {
                                    if (colInx == 0)
                                        k = 11;
                                    else if (colInx == 8)
                                        k = 11;
                                    if (dt.TableName == "Financial Highlights")
                                    {
                                        if (colInx == 2)
                                            k = 6;
                                        else if (colInx == 3 || colInx == 6)
                                            k = 4;
                                        else if (colInx == 4 || colInx == 7)
                                            k = 5;
                                    }
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
                            // cellValue = cellNumericValue.ToString();
                            // cellValue = string.Format("{0:#,##0.##}", Convert.ToDouble(cellValue));
                            if ((dt.TableName == "Financial Highlights" & (colInx == 5 || colInx == 6 || colInx == 7)) || (dt.TableName == "Loans & Leases" & colInx == 3))
                                cellValue = Math.Round(Convert.ToDouble(cellValue), 0, MidpointRounding.AwayFromZero).ToString();
                            else
                                cellValue = string.Format("{0:0.00}", cellValue);

                                //AppendTextCell(excelColumnNames[columnIndx] + rowIndex.ToString(), cellValue, newExcelRow, k);
                                AppendNumericCell(excelColumnNames[columnIndx] + rowIndex.ToString(), cellValue, newExcelRow,k);
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
                                    AppendTextCell(excelColumnNames[columnIndx] + rowIndex.ToString(), date.ToShortDateString(), newExcelRow, k);
                                }
                            }
                            else
                            {
                                //if (dr.ItemArray.Where(c => c != null && !c.Equals("")).ToArray().Length == 0)
                                //    AppendTextCell(excelColumnNames[colInx + 1] + rowIndex.ToString(), "", newExcelRow, 7);
                                //else
                                    AppendTextCell(excelColumnNames[columnIndx] + rowIndex.ToString(), cellValue, newExcelRow, k);
                            }

                        }
                        if (dt.TableName == "Financial Highlights")
                        {
                            if (colInx == 2)
                            {
                                AppendTextCell(excelColumnNames[colInx + 1] + rowIndex.ToString(), "", newExcelRow, 10);
                            }
                            if (colInx == 4)
                            {
                                AppendTextCell(excelColumnNames[colInx + 2] + rowIndex.ToString(), "", newExcelRow, 10);
                            }
                    }
                    i++;
                }
            }

            if(dt.TableName == "Loans & Leases")
            {
                var headerRow6 = GetRow(worksheetPart, 9);
                AppendTextCell("G" + "9", "STRENGTHS: Top Five ($000)", headerRow6, 13);

                var headerRow7 = GetRow(worksheetPart, 9);
                AppendTextCell("N" + "9", "WEAKNESSES: Top Five ($000)", headerRow7, 14);

                var headerRow8 = GetRow(worksheetPart, 8);
                AppendTextCell("G" + "8", "Strengths & Weaknesses (Portfolio Loan Types Only)", headerRow8, 7);

                var headerRow9 = GetRow(worksheetPart, 16);
                if (QtdOrYtd == "YTD")
                    AppendTextCell("G" + "16", "Variance:  5 Year Trend", headerRow9, 7);
                else
                    AppendTextCell("G" + "16", "Variance:  5 Quarter Trend", headerRow9, 7);

                rowIndex = 9;
                foreach (DataRow dr in dtstrengths.Rows)
                {
                    // ...create a new row, and append a set of this row's data to it.
                    ++rowIndex;
                    Row newExcelRow;
                    newExcelRow = GetRow(worksheetPart, Convert.ToInt16(rowIndex));
                    //var newExcelRow = new Row { RowIndex = rowIndex };  // add a row at the top of spreadsheet
                    //sheetData.Append(newExcelRow);
                    DocumentFormat.OpenXml.UInt32Value i = 1;
                    for (int colInx = 0; colInx < dtstrengths.Columns.Count; colInx++)
                    {
                        bool IsNumericColumn11 = false;
                        cellValue = dr.ItemArray[colInx].ToString();

                        var regex = "^[0-9.,]*$";
                        //var regex = @"^[0-9]{1,3}(,%[0-9]{3})*(\.%[0-9]+)?$";
                        var match = Regex.Match(cellValue, regex, RegexOptions.IgnoreCase);
                        // Create cell with data
                        IsNumericColumn11 = match.Success;
                        DocumentFormat.OpenXml.UInt32Value k = GetSheetStyle(cellValue);
                        cellValue = GetCellValue(cellValue);
                        if (cellValue.IndexOf("-") == 0)
                        {
                            IsNumericColumn11 = true;
                        }
                        if (rowIndex == 2)
                            k = 1;
                        if (dt.TableName != "Information")
                        {
                            if (rowIndex >= 8)
                            {
                                if (k != 1)
                                {
                                    if (colInx == 0)
                                        k = 11;
                                    else if (colInx == 8)
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
                                cellValue = Math.Round(Convert.ToDouble(cellValue), 0, MidpointRounding.AwayFromZero).ToString();
                               // AppendTextCell(excelstrcolumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, k);
                                AppendNumericCell(excelstrcolumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, k);
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
                                    AppendTextCell(excelstrcolumnNames[colInx] + rowIndex.ToString(), date.ToShortDateString(), newExcelRow, k);
                                }
                            }
                            else
                            {
                                AppendTextCell(excelstrcolumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, 10);
                            }

                        }
                        i++;
                    }
                }

                rowIndex = 9;
                foreach (DataRow dr in dtweeknesses.Rows)
                {
                    // ...create a new row, and append a set of this row's data to it.
                    ++rowIndex;
                    Row newExcelRow;
                    newExcelRow = GetRow(worksheetPart, Convert.ToInt16(rowIndex));
                    //var newExcelRow = new Row { RowIndex = rowIndex };  // add a row at the top of spreadsheet
                    //sheetData.Append(newExcelRow);
                    DocumentFormat.OpenXml.UInt32Value i = 1;
                    for (int colInx = 0; colInx < dtweeknesses.Columns.Count; colInx++)
                    {
                        bool IsNumericColumn11 = false;
                        cellValue = dr.ItemArray[colInx].ToString();

                        var regex = "^[0-9.,]*$";
                        //var regex = @"^[0-9]{1,3}(,%[0-9]{3})*(\.%[0-9]+)?$";
                        var match = Regex.Match(cellValue, regex, RegexOptions.IgnoreCase);
                        // Create cell with data
                        IsNumericColumn11 = match.Success;
                        DocumentFormat.OpenXml.UInt32Value k = GetSheetStyle(cellValue);
                        cellValue = GetCellValue(cellValue);
                        if (cellValue.IndexOf("-") == 0)
                        {
                            IsNumericColumn11 = true;
                        }
                        if (rowIndex == 2)
                            k = 1;
                        if (dt.TableName != "Information")
                        {
                            if (rowIndex >= 8)
                            {
                                if (k != 1)
                                {
                                    if (colInx == 0)
                                        k = 11;
                                    else if (colInx == 8)
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
                                cellValue = Math.Round(Convert.ToDouble(cellValue), 0, MidpointRounding.AwayFromZero).ToString();
                                //AppendTextCell(excelweakcolumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, k);
                                AppendNumericCell(excelweakcolumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, k);
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
                                    AppendTextCell(excelweakcolumnNames[colInx] + rowIndex.ToString(), date.ToShortDateString(), newExcelRow, k);
                                }
                            }
                            else
                            {
                                AppendTextCell(excelweakcolumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, 10);
                            }

                        }
                        i++;
                    }
                }
            }
        }

        private static Row GetRow(WorksheetPart worksheetPart, int rowIndex)
        {
            Row row = worksheetPart.Worksheet.GetFirstChild<SheetData>().
                                    Elements<Row>().FirstOrDefault(r => r.RowIndex == rowIndex);
            if (row == null)
            {
                throw new ArgumentException(String.Format("No row with index {0} found in spreadsheet", rowIndex));
            }
            return row;
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

        private static string GetStrExcelColumnName(int columnIndex)
        {
            if (columnIndex < 26)
                return ((char)('G' + columnIndex)).ToString();

            char firstChar = (char)('G' + (columnIndex / 26) - 1);
            char secondChar = (char)('G' + (columnIndex % 26));

            return string.Format("{0}{1}", firstChar, secondChar);
        }

        private static string GetWeakExcelColumnName(int columnIndex)
        {
            if (columnIndex < 26)
                return ((char)('N' + columnIndex)).ToString();

            char firstChar = (char)('N' + (columnIndex / 26) - 1);
            char secondChar = (char)('N' + (columnIndex % 26));

            return string.Format("{0}{1}", firstChar, secondChar);
        }
        private static Stylesheet GenerateStyleSheet()
        {
            return new Stylesheet(
                new Fonts(
                    new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 0 – The default font.
                    new FontSize() { Val = 8 },
                    //new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 1 – The bold font.
                    new Bold(),
                    new FontSize() { Val = 10 },
                    //new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 2 – The bold font.
                    new Bold(),
                    new FontSize() { Val = 16 },
                    //new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 3 – The bold font.
                    new Bold(),
                    new FontSize() { Val = 20 },
                  //  new Color() { Rgb = new HexBinaryValue() { Value = "1A5276" } },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 4 – The Italic font.
                    new Italic(),
                    new FontSize() { Val = 11 },
                    //new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Calibri" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                            // Index 5 – The Times Roman font. with 16 size
                    new FontSize() { Val = 16 },
                  //  new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Times New Roman" }),
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                            // Index 6 – The Times Roman font. with 16 size
                    new FontSize() { Val = 8 },
                   // new Color() { Rgb = new HexBinaryValue() { Value = "000000" } },
                    new FontName() { Val = "Calibri" }),
                    new DocumentFormat.OpenXml.Spreadsheet.Font(
                    new Bold(),                                                                   // Index 7 – The white font
                    new FontSize() { Val = 8 },
                    new Color() { Rgb = new HexBinaryValue() { Value = "00ffffff" } },
                    new FontName() { Val = "Calibri" })
                ),

                new Fills(
                    new Fill(
                   new PatternFill(
                    )
                   { PatternType = PatternValues.Solid }),
                new Fill(                                                           // Index 1 – The empty fill.
                    new PatternFill(
                    )
                    { PatternType = PatternValues.Solid }),

                new Fill(                                                           // Index 3 – The green fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "00e2efda" } }// green color
                    )
                    { PatternType = PatternValues.Solid }),

                new Fill(                                                           // Index 4 – The red fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "00fce4d6" } }// pink color
                    )
                    { PatternType = PatternValues.Solid }),

                 new Fill(                                                           // Index 5 – The red fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "00ffffcc" } }// yellow color
                    )
                    { PatternType = PatternValues.Solid }),
                 new Fill(                                                           // Index 6 – The red fill.
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "00f2f2f2" } }// grey color
                    )
                    { PatternType = PatternValues.Solid }),
                 new Fill(                                                           
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "00c00000" } }// red color
                    )
                    { PatternType = PatternValues.Solid }),
                  new Fill(                                                           
                    new PatternFill(
                        new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "00008000" } }// dark green color
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


                        , new Border(                                                         // Index 1 – Applies a Left, Right, Top, Bottom border to a cell
                        new LeftBorder(
                            new Color() { Auto = false }
                        )
                        { Style = BorderStyleValues.None },
                        new RightBorder(
                            new Color() { Auto = false }
                        )
                        { Style = BorderStyleValues.None },
                        new TopBorder(
                            new Color() { Auto = true }
                        )
                        { Style = BorderStyleValues.Thin },
                        new BottomBorder(
                            new Color() { Auto = false }
                        )
                        { Style = BorderStyleValues.None },
                        new DiagonalBorder())
                ),
                new CellFormats(
                    new CellFormat() { FontId = 0, FillId = 0, BorderId = 0 },                         // Index 0 – The default cell style.  If a cell does not have a style index applied it will use this style combination instead
                    new CellFormat() { FontId = 1, FillId = 0, BorderId = 0, ApplyFont = true },       // Index 1 – Bold 
                    new CellFormat() { FontId = 2, FillId = 0, BorderId = 0, ApplyFont = true },       // Index 2 – Italic
                    new CellFormat() { FontId = 3, FillId = 0, BorderId = 0, ApplyFont = true },       // Index 3 – Times Roman
                    new CellFormat(new Alignment() { Horizontal = HorizontalAlignmentValues.Right }) { FontId = 0, FillId = 2, BorderId = 0, ApplyFill = true },       // Index 4 – green Fill
                    new CellFormat(new Alignment() { Horizontal = HorizontalAlignmentValues.Right }) { FontId = 0, FillId = 3, BorderId = 0, ApplyFill = true },       // Index 5 – pink Fill
                    new CellFormat(new Alignment() { Horizontal = HorizontalAlignmentValues.Right }) { FontId = 0, FillId = 4, BorderId = 0, ApplyFill = true },       // Index 6 – Yellow Fill
                    new CellFormat() { FontId = 1, FillId = 5, BorderId = 0, ApplyFill = true },       // Index 7 – grey Fill
                    new CellFormat(                                                                   // Index 8 – Alignment
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Center }
                        //new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 1, FillId = 0, BorderId = 0, ApplyAlignment = true },
                    new CellFormat() { FontId = 0, FillId = 0, BorderId = 1, ApplyBorder = true },      // Index 9 – Border
                  
                    new CellFormat(                                                                   // Index 10 – Alignment right
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Right }
                       // new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                    { FontId = 0, FillId = 0, BorderId = 0, ApplyAlignment = true },
                     new CellFormat(                                                                   // Index 11 – Alignment left
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left }
                       // new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                     { FontId = 0, FillId = 0, BorderId = 0, ApplyAlignment = true },

                       //
                       new CellFormat(                                                                   // Index 12 – Alignment left
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Left }
                       // new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                       { FontId = 6, FillId = 5, BorderId = 0, ApplyAlignment = true },

                        new CellFormat(                                                                   // Index 13 –  green fill
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Center }
                        //new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                          { FontId = 7, FillId = 7, BorderId = 0, ApplyAlignment = true },
                       
                        new CellFormat(                                                                   // Index 14 – red fill
                        new Alignment() { Horizontal = HorizontalAlignmentValues.Center }
                        //new Underline() { Val = DocumentFormat.OpenXml.Spreadsheet.UnderlineValues.Double }
                        )
                              { FontId = 7, FillId = 6, BorderId = 0, ApplyAlignment = true }


                )
            ); // return
        }

        private static DocumentFormat.OpenXml.UInt32Value GetSheetStyle(string cellValue)
        {
            DocumentFormat.OpenXml.UInt32Value k = 10;

            if (cellValue.Equals("Bank"))
            {
                k = 8;
            }
            else if (cellValue.Equals("BenchMark"))
            {
                k = 8;
            }
            else if (cellValue.Equals("Peer1"))
            {
                k = 8;
            }
            else if (cellValue.Equals("Peer2"))
            {
                k = 8;
            }
            else if (cellValue.Equals("BenchMarkVar"))
            {
                k = 8;
            }
            else if (cellValue.Equals("Peer1Var"))
            {
                k = 8;
            }
            else if (cellValue.Equals("Peer2Var"))
            {
                k = 8;
            }
            else if (cellValue.Equals("LOANS & LEASES (% of Loans & Leases)"))
            {
                k = 1;
            }
            else if (cellValue.Equals("Variance ($000)"))
            {
                k = 8;
            }
            else if (cellValue.Equals("Category"))
            {
                k = 8;
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
            else if (cellValue.Equals("YieldsAndCosts"))
            {
                k = 1;
            }
            else if (cellValue.Equals("NonInterestExpense"))
            {
                k = 1;
            }
            else if (cellValue.Equals("LoanComposition"))
            {
                k = 1;
            }
            else if (cellValue.Equals("DepositComposition"))
            {
                k = 1;
            }
            return k;
        }
        private static string GetCellValue(string cellValue)
        {
           if (cellValue.Equals("EarningsAndPerformance"))
            {
                cellValue = "EARNINGS AND PERFORMANCE (%)";
            }
            else if (cellValue.Equals("AssetQuality"))
            {
                cellValue = "ASSET QUALITY (%)";
            }
            else if (cellValue.Equals("CapitalRatios"))
            {
                cellValue = "CAPITAL RATIOS (%)";
            }
            else if (cellValue.Equals("Liquidity"))
            {
                cellValue = "LIQUIDITY (%)";
            }
           else if (cellValue.Equals("YieldsAndCosts"))
            {
                cellValue = "YIELDS & COSTS (%)";
            }
            else if (cellValue.Equals("NonInterestExpense"))
            {
                cellValue = "NON-INTEREST EXPENSE (%)";
            }
            else if (cellValue.Equals("LoanComposition"))
            {
                cellValue = "LOAN COMPOSITON (% of avg. gross loans & leases)";
            }
            else if (cellValue.Equals("DepositComposition"))
            {
                cellValue = "DEPOSIT COMPOSITON (% of total deposits)";
            }
           else if(cellValue.Equals("BenchMarkVar"))
            {
                cellValue = "BenchMark";
            }
            else if (cellValue.Equals("Peer1Var"))
            {
                cellValue = "Peer1";
            }
            else if (cellValue.Equals("Peer2Var"))
            {
                cellValue = "Peer2";
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
                var extentsCx = (long)bm.Width * (long)((float)821400 / bm.HorizontalResolution);
                var extentsCy = (long)bm.Height * (long)((float)934400 / bm.VerticalResolution);

                bm.Dispose();

                var colOffset = 0;
                var rowOffset = 0;
                int colNumber = 0;
                int rowNumber = 0;
                switch (index)
                {
                    case 0:
                        colNumber = 7;
                        rowNumber = 18;
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