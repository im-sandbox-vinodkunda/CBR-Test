#define INCLUDE_WEB_FUNCTIONS

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
using DocumentFormat.OpenXml.Presentation;
using System.Text.RegularExpressions;

namespace CBR.Web.ExportToExcel
{
    public class CreateExcelFile
    {
        #region HELPER_FUNCTIONS
        public static DataTable ListToDataTable<T>(List<T> list)
        {
            DataTable dt = new DataTable();

            foreach (PropertyInfo info in typeof(T).GetProperties())
            {
                if (info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "DescriptionAttribute") != null && !string.IsNullOrEmpty(info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "DescriptionAttribute").ConstructorArguments[0].Value.ToString()))
                    dt.Columns.Add(new DataColumn(info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "DescriptionAttribute").ConstructorArguments[0].Value.ToString(), GetNullableType(info.PropertyType)));
                else
                    dt.Columns.Add(info.Name, GetNullableType(info.PropertyType));
            }

            foreach (T t in list)
            {
                DataRow row = dt.NewRow();
                string colName = string.Empty;
                foreach (PropertyInfo info in typeof(T).GetProperties())
                {
                    if (info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "DescriptionAttribute") != null && !string.IsNullOrEmpty(info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "DescriptionAttribute").ConstructorArguments[0].Value.ToString()))
                        colName = info.CustomAttributes.FirstOrDefault(obj => obj.AttributeType.Name == "DescriptionAttribute").ConstructorArguments[0].Value.ToString();
                    else
                        colName = info.Name;

                    if (!IsNullableType(info.PropertyType))
                        row[colName] = info.GetValue(t, null);
                    else
                        row[colName] = (info.GetValue(t, null) ?? DBNull.Value);
                }

                dt.Rows.Add(row);
            }
            return dt;
        }

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

        private static Type GetNullableType(Type t)
        {
            Type returnType = t;
            if (t.IsGenericType && t.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                returnType = Nullable.GetUnderlyingType(t);
            }
            return returnType;
        }
        private static bool IsNullableType(Type type)
        {
            return (type == typeof(string) ||
                    type.IsArray ||
                    (type.IsGenericType &&
                     type.GetGenericTypeDefinition().Equals(typeof(Nullable<>))));
        }     

        #endregion

#if INCLUDE_WEB_FUNCTIONS
        /// <summary>
        /// Create an Excel file, and write it out to a MemoryStream (rather than directly to a file)
        /// </summary>
        /// <param name="list">List containing the data to be written to the Excel.</param>
        /// <param name="filename">The filename (without a path) to call the new Excel file.</param>
        /// <returns>True if it was created succesfully, otherwise false.</returns>

        public static byte[] CreateExcelDocument<T>(List<T> list, string filename)
        {
            byte[] data1 = null;
            try
            {
                DataSet ds = new DataSet();
                ds.Tables.Add(ListToDataTable(list));
                data1 = CreateExcelDocumentAsStream(ds, filename);

            }
            catch (Exception ex)
            {
                Trace.WriteLine("Failed, exception thrown: " + ex.Message);

            }

            return data1;
        }

        public static byte[] CreateExcelDocument(DataTable[] lists, string filename)
        {
            byte[] data1 = null;
            try
            {
                DataSet ds = new DataSet();
                foreach (DataTable t in lists)
                {
                    ds.Tables.Add(t);
                }

                data1 = CreateExcelDocumentAsStream(ds, filename);

            }
            catch (Exception ex)
            {
                Trace.WriteLine("Failed, exception thrown: " + ex.Message);

            }

            return data1;
        }

        /// <summary>
        /// Create an Excel file, and write it out to a MemoryStream (rather than directly to a file)
        /// </summary>
        /// <param name="ds">DataSet containing the data to be written to the Excel.</param>
        /// <param name="filename">The filename (without a path) to call the new Excel file.</param>
        /// <returns>Either a MemoryStream, or NULL if something goes wrong.</returns>
        public static byte[] CreateExcelDocumentAsStream(DataSet ds, string filename)
        {
            byte[] data1 = null;
            try
            {
                System.IO.MemoryStream stream = new System.IO.MemoryStream();
                using (SpreadsheetDocument document = SpreadsheetDocument.Create(stream, SpreadsheetDocumentType.Workbook, true))
                {
                    WriteExcelFile(ds, document);
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
#endif      //  End of "INCLUDE_WEB_FUNCTIONS" section


        private static void WriteExcelFile(DataSet ds, SpreadsheetDocument spreadsheet)
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
               // newWorksheetPart.Worksheet.AppendChild(new Alignment { Horizontal = HorizontalAlignmentValues.Right });
                newWorksheetPart.Worksheet.InsertAfter(CreateColumnData((uint)2, (uint)2, 60), newWorksheetPart.Worksheet.SheetFormatProperties);
                // save worksheet
                WriteDataTableToExcelWorksheet(dt, newWorksheetPart);                
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


        private static void WriteDataTableToExcelWorksheet(DataTable dt, WorksheetPart worksheetPart)
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
            uint rowIndex = 1;

            var headerRow = new Row { RowIndex = rowIndex };  // add a row at the top of spreadsheet
            sheetData.Append(headerRow);

            for (int colInx = 0; colInx < numberOfColumns; colInx++)
            {
                DataColumn col = dt.Columns[colInx];
                AppendTextCell(excelColumnNames[colInx] + "1", col.ColumnName, headerRow,1);
                IsNumericColumn[colInx] = (col.DataType.FullName == "System.Decimal") || (col.DataType.FullName == "System.Int32");
            }

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

                for (int colInx = 0; colInx < numberOfColumns; colInx++)
                {
                    bool IsNumericColumn11 = false;
                    cellValue = dr.ItemArray[colInx].ToString();
                    var regex = "^[0-9.,]*$";
                    var match = Regex.Match(cellValue, regex, RegexOptions.IgnoreCase);                 
                    IsNumericColumn11 = match.Success;
                    // Create cell with data
                    if (IsNumericColumn[colInx])
                    {
                        //  For numeric cells, make sure our input data IS a number, then write it out to the Excel file.
                        //  If this numeric value is NULL, then don't write anything to the Excel file.
                        cellNumericValue = 0;
                        if (double.TryParse(cellValue, out cellNumericValue))
                        {
                            cellValue = cellNumericValue.ToString();
                            AppendNumericCell(excelColumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow,0);
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
                                AppendTextCell(excelColumnNames[colInx] + rowIndex.ToString(), date.ToShortDateString(), newExcelRow,0);
                            }
                        }
                        else
                        {
                            if (IsNumericColumn11)
                            {
                                AppendNumericCell(excelColumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, 0);
                            }
                            else
                            {
                                AppendTextCell(excelColumnNames[colInx] + rowIndex.ToString(), cellValue, newExcelRow, 0);
                            }
                           
                        }

                    }
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
            Cell cell = new Cell() { CellReference = cellReference,DataType=CellValues.Number, StyleIndex = index };
            CellValue cellValue = new CellValue();
            cellValue.Text = cellStringValue;
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
                return ((char)('A' + columnIndex)).ToString();

            char firstChar = (char)('A' + (columnIndex / 26) - 1);
            char secondChar = (char)('A' + (columnIndex % 26));

            return string.Format("{0}{1}", firstChar, secondChar);
        }
        private static double GetWidth(int textsize)
        {
            double width;

            width = (double)((textsize * 7 + 5) / 7 * 256) / 256;
            width = (double)decimal.Round((decimal)width + 0.2M, 2);
            return width;
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
        private static Stylesheet GenerateStyleSheet()
        {            
            return new Stylesheet(
                new Fonts(
                    new DocumentFormat.OpenXml.Spreadsheet.Font(                                                           // Index 0 – The default font.
                         new FontSize() { Val = 11 }
                        ),  
                new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 1 – The default font.
                    new FontSize() { Val = 11 }
                   ),              
                 new DocumentFormat.OpenXml.Spreadsheet.Font(                                                               // Index 2 – The bold font.
                    new Bold(),
                    new FontSize() { Val = 11 }
                   )
                ),
                new Fills(              
               new Fill(                                                           // Index 1 – The green fill.
                    new PatternFill(
                    //  new ForegroundColor() { Rgb = new HexBinaryValue() { Value = "" } }// default color
                    )
                    { PatternType = PatternValues.Solid })),

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
                        { Style = BorderStyleValues.Thin }
                        )),

                new CellFormats(
                    new CellFormat() { FontId = 1, FillId = 0, BorderId = 0 },                         // Index 0 – The default cell style.  If a cell does not have a style index applied it will use this style combination instead
                    new CellFormat() { FontId = 2, FillId = 0, BorderId = 0 }                         // Index 1 – Bold                    
            )
            );
        }
    }
}
