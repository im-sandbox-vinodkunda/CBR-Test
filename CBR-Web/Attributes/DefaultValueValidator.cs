using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CBR.Web.Attributes
{
    public class DefaultValueValidator : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            string stringValue = value.ToString();
            if (string.Compare(stringValue, "What is your title?") == 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}