CREATE TABLE StgUBPRFiles
(
StagingID int IDENTITY(1,1) PRIMARY KEY,
UBPRFile XML,
UBPRFileName varchar(255),
AuditInsertedDate DateTime DEFAULT GETDATE()
)

DECLARE @Query varchar(max), @FileName varchar(255),@FilePath varchar(255)='C:\CBR\UBPR\'

SET @FileName='FFIEC UBPR FI 10011 (FDICCertNumber) 9302015.xml'

SET @query='SELECT '''+@FileName+''', CONVERT(xml,BulkColumn) FROM OPENROWSET( BULK'''

SET @FilePath = @FilePath+@FileName
SET @Query= @Query+@FilePath+ ''',SINGLE_BLOB) X'
SELECT @query

INSERT INTO StgUBPRFiles
(
UBPRFileName,
UBPRFile

)
EXECUTE (@query)
SELECT * FROM StgUBPRFiles

CREATE TABLE StgUBPRRawData
(
StagingID int IDENTITY(1,1) PRIMARY KEY,
UBPRFieldName varchar(255),
UBPRFieldValue varchar(255),
CERTNumber varchar(55),
UBPRReportingPeriod varchar(25),
AuditInsertedDate datetime DEFAULT  GETDATE()
)
GO

DECLARE 
@FileName varchar(55);
SELECT @FileName= UBPRFileName
FROM [StgUBPRFiles]
WHERE StagingID=5
DECLARE @Query nvarchar(max)
SELECT @query='

DECLARE
@CERTNumber varchar(55),
@UBPRReportingPeriod varchar(25)
DECLARE @FileName varchar(255)
SET @FileName ='''+@FileName+'''
SET @FileName=REPLACE(@FileName,''.xml'','''')
SET @UBPRReportingPeriod = RIGHT(@FileName,8)
SELECT @CERTNumber = REPLACE(REPLACE(REPLACE(@FileName,RIGHT(@FIleName,8),''''),''FFIEC UBPR FI'',''''),''(FDICCertNumber)'','''')
SET @CERTNumber=LTRIM(RTRIM(@CERTNumber))
SET @UBPRReportingPeriod=LTRIM(RTRIM(@UBPRReportingPeriod))
DECLARE @idoc int, @doc varchar(max)
SELECT 
@doc=CONVERT(varchar(max),UBPRFile) FROM 
[StgUBPRFiles] WHERE UBPRFileName='''+@FileName+'''
  EXEC sp_xml_preparedocument @idoc OUTPUT, @doc; 
  WITH CTE AS (SELECT * FROM OPENXML(@idoc,'''')
  --WITH (text varchar(55))
  )
  INSERT INTO StgUBPRRawData
  (
    UBPRFieldName,

	UBPRFieldValue,
	CERTNumber ,
	UBPRReportingPeriod
  )
  SELECT CONVERT(Varchar(255),A.localname),CONVERT(Varchar(255),b.text)
  ,@CERTNumber
  ,@UBPRReportingPeriod
   FROM CTE A
  INNER JOIN CTE B
  ON A.id = B.ParentId
  AND A.nodetype=1 AND  A.parentid = 0
  
  AND B.localname=''#text'''
execute    sp_EXECUTESQL @Query
  
  
  DECLARE @PivotQuery varchar(max)='
  SELECT * FROM 
   (
  SELECT
  CERTNumber ,
UBPRReportingPeriod
  , UBPRFieldName
,CONVERT(Decimal(18,6),UBPRFieldValue)UBPRFieldValue
  FROM 
  StgUBPRRawData
  )
  AS A
  PIVOT
  (
  SUM(UBPRFieldValue)
  FOR UBPRFieldName IN ('
  
  DECLARE @PivotColumns varchar(max)=''
  SELECT @PivotColumns=@PivotColumns+'['+[TransposeColumn]+'] ,'
  FROM [dbo].[LKPPivotUBPR]
  SELECT @PivotColumns= LTRIM(RTRIM(@PivotColumns))
  SELECT  @PivotColumns= substring(@PivotColumns,0,len(@PivotColumns))

  
SET @PivotQuery=@PivotQuery+@PivotColumns+') )AS A'
INSERT INTO UBPRPivotData
EXECUTE (@PivotQuery)  