using Aspose.Pdf;
using Aspose.Pdf.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CBR.Common.Models
{
    public class PdfTableConfig
    {
        public MarginInfo Margin;
        public string ColumnWidths;
    }

    public class PdfTextFragmentConfig
    {
        public string Text;
        public int FontSize = 6;
        public string Font = "Verdana";
        public FontStyles FontStyle;
        public HorizontalAlignment HorizontalAlignment;
        public Color ForeGroundColor = Color.Black;
    }

    public class PdfCellConfig
    {
        public MarginInfo Margin;
        public HorizontalAlignment HorizontalAlignment = HorizontalAlignment.Center;
        public BorderInfo Border;
        public Color BackgroundColor;
    }
}
