
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

SELECT @PivotQuery