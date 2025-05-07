FFIEC CDR Public Web Service Sample Client Readme

PURPOSE
This is a sample web service client for the FFIEC 
CDR Public Web Service.

DISCLAIMER
This sample web service client is intended to serve as an example to the users of the 
FFIEC Public Web Service for developing their own web service client applications and 
is presented only as an exhibit of the functionality of which the web service is capable.  
The sample client code itself is not supported and no guarantees are made or implied for 
its capabilities.  No questions can be answered about the design and implementation of 
this program.  Please use the code at your own discretion.

PREREQUISITES:
1) Microsoft .Net Framework 2.0 or later
2) Microsoft Web Services Enhancements (WSE) 3.0
3) To re-create Reference.sc file wsdl.exe version depending on which Visual Studio installed:
   C:\Program Files\Microsoft SDKs\Windows\v7.1\Bin>wsdl /out:Reference.cs http://localhost/pdd/pws/WebServices/RetrievalService.asmx?wsdl
4) Right click Web references file FFIECPublicWebService to update the web reference after updating the web service project
5) Right click Reference to add Microsoft.Web.Services3.dll from folder \\EcommerceSampleWebClientSourceCode\FFIECPublicWebServiceSampleClient
6) Change System.Web.Services3.WebServicesClientProtocol to Microsoft.Web.Services3.WebServicesClientProtocol
7) Change using Microsoft.Web.Services.Protocols to Microsoft.Web.Services3

