using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Hosting;
using Aspose.Pdf;
using Aspose.Pdf.Text;
using CBR.Common.Models;

namespace CBR.Common
{
    public  class PdfCommon
    {
        public  Row generateEmptyRow(Table dataTable)
        {
            Row row = dataTable.Rows.Add();
            return row;
        }

        public Cell generateEmptyCell(Row row)
        {
            Cell cell = row.Cells.Add();
            return cell;
        }

        public  Table generateEmptyTable(PdfTableConfig tableConfig)
        {
            Table dataTable = new Table();
            dataTable.Margin = tableConfig.Margin;
            dataTable.ColumnWidths = tableConfig.ColumnWidths;
            return dataTable;
        }

        public  Cell generateTableCell(Row row, PdfCellConfig cellConfig)
        {
            Cell cell = row.Cells.Add();
            cell.Margin = cellConfig.Margin;//new MarginInfo(0, 3, 5, 5);
            cell.Alignment = cellConfig.HorizontalAlignment;
            cell.BackgroundColor = cellConfig.BackgroundColor;
            cell.Border = cellConfig.Border;
            return cell;
        }

        public  Cell generateTestFragmentAndAddToCell(Cell cell, PdfTextFragmentConfig textFragementConfig)
        {
            TextFragment textFragment = new TextFragment(textFragementConfig.Text != null ? textFragementConfig.Text  : "" );
            textFragment.TextState.FontSize = textFragementConfig.FontSize;
            textFragment.TextState.Font = FontRepository.FindFont(textFragementConfig.Font);
            textFragment.TextState.FontStyle = textFragementConfig.FontStyle;
            textFragment.TextState.ForegroundColor = textFragementConfig.ForeGroundColor;
            cell.Paragraphs.Add(textFragment);
            return cell;
        }

        public void generateTableCellWithArrowImage(Row row, string imageName)
        {
            Aspose.Pdf.Image img = new Aspose.Pdf.Image();
            //var dir = Directory.GetCurrentDirectory();
            //string path = Path.Combine(Application.StartupPath.ToString(), @"\..\Images\cbr-logo.png");
            //Set the path of image file
            img.File = HostingEnvironment.MapPath("~/Images/RiskRadar/" + imageName  + ".png");
            img.FixHeight = 7;
            img.FixWidth = 7;
            img.HorizontalAlignment = HorizontalAlignment.Center;
            Aspose.Pdf.Cell cell = row.Cells.Add();
            cell.Border = new Aspose.Pdf.BorderInfo(Aspose.Pdf.BorderSide.All, 0.1F, Aspose.Pdf.Color.Gray);
            cell.Margin = new Aspose.Pdf.MarginInfo(0, 2, 0, 2);
            //Add the image to the table cell
            cell.Paragraphs.Add(img);
        }

       
        public void genarateEmptyRowWithEmptyCellValue(Table table, Double rowHeight = 0)
        {
            Row row = table.Rows.Add();
            if (rowHeight > 0)
            {
                row.FixedRowHeight = rowHeight;
            }
            Cell cell = row.Cells.Add();
            TextFragment textFragment = new TextFragment("");
            cell.Paragraphs.Add(textFragment);
        }

    }
}
