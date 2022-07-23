## Overview
Added the following scripts:
- add_stock.ts
- delete_stock.ts
- get_all_stocks.ts
- get_all_stocks_with_hsp.ts
- get_all_stocks_with_ml_range.ts
- populate_hsp.ts
- get_hsp.ts
- get_hsp_range.ts
- delete_hsp.ts
- daily_hsp.ts
- daily_hsp_all.ts
- get_ml_prices.ts
- update_ml_prices.ts
- update_tensorflow_prices.ts
- update_scikitlearn_prices.ts

#### NOTICE
Some endpoints expect an authorization key in the Headers of each request. The authorization key must be indicated in the Headers as "authorization" : "NEXT_PUBLIC_API_SECRET_KEY **INSERT SECRET KEY**"

#### Usage
## add_stock.ts
To add a new stock into the Stock table, send a POST request to the **/api/stock/add_stock** endpoint with the body contents as such:

Example: 

```
{
    "ticker_symbol" 	:   "GOOG",
}
```

## delete_stock.ts
To delete an existing stock from the Stock table, send a POST request to the **/api/stock/delete_stock** endpoint with the body contents:

Example:

```
{
	"ticker_symbol"	:	"GOOG"
}
```

Notes:
- This endpoint requires the correct "authorization" Headers field.

## get_all_stocks.ts
To get all stocks from the Stock table, send a GET request to the **/api/stock/get_all_stocks** endpoint.

## get_all_stocks_with_hsp.ts
To get all stocks from the Stock table with their HSP ranges, send a GET request to the **/api/stock/get_all_stocks_with_hsp** endpoint.

## get_all_stocks_with_ml_range.ts
To get all stocks from the Stock table with their ML price prediction dates, send a GET request to the **/api/stock/get_all_stocks_with_ml_range** endpoint.

## populate_hsp.ts
To populate a stock with historical stock prices, send a POST request to the **/api/stock/populate_hsp** endpoint with the body contents:

Example:
```
{
	"ticker_symbol" : 	"GOOG",
	"start_date"	:	"1500468798",
	"end_date"	:	"1658148798"
}
```

Notes:
- The stock that you wish to populate historical prices with must already exist in the Stock table
- The stock that you wish to populate historical prices with must not already have historical prices (historical_stock_price table has a PK constraint where PK=(StockID, Date))
- [Yahoo! Finance ](https://sg.finance.yahoo.com/) must have the historical stock prices for the specified date range
- The start and end dates **must** be specified in the **epoch time** in **seconds**. Not specifying the start/end dates will result in an error. 

## get_hsp.ts
To get the historical stock price for a stock, send a POST request to the **/api/stock/get_hsp** endpoint with the body contents:

Example:
```
{
	"ticker_symbol" : 	"GOOG",
	"start_date"	:	"2006-01-01",
	"end_date"	:	"2022-01-01",
	"sort"		:	"desc"
}
```

Notes:
- The stock that you wish to retrieve historical prices with must already exist in the Stock table
- The stock that you wish to retrieve historical prices of must already contain historical stock prices in the historical_stock_price table.
- The **start_date** and **end_date** fields are optional. If left empty, the query will return all available historical stock prices.
   - The **start_date** and **end_date** fields **must** be specified in the format **YYYY-MM-DD**. 
   - If the **start_date** field is left empty, the query will return all historical stock prices up until the specified **end_date**.
   - If the **end_date** field is left empty, the query will return all historical stock prices since the specified **start_date**.
- The **sort** field is optional. 
   - If left empty, the query will return results ordered by date in ascending (asc) order by default.

## get_hsp_range.ts
To get the historical stock price range for a stock, send a POST request to the **/api/stock/get_hsp_range** endpoint with the body contents:

Example:
```
{
	"ticker_symbol" : 	"GOOG",
}
```

Notes:
- This endpoint requires the correct "authorization" Headers field.
- The stock that you wish to retrieve historical prices with must already exist in the Stock table
- The stock that you wish to retrieve historical prices of must already contain historical stock prices in the historical_stock_price table.

## delete_hsp.ts
To delete the historical stock price for a stock, send a POST request to the **/api/stock/delete_hsp** endpoint with the body contents:

Example:

```
{
	"ticker_symbol"	:	"GOOG"
}
```

Notes:
- This endpoint requires the correct "authorization" Headers field.

## daily_hsp.ts
To update the historical stock price for a stock on a daily basis, send a POST request to the **/api/stock/daily_hsp** endpoint with the body contents:

Example:

```
{
	"ticker_symbol"	:	"GOOG"
}
```

## daily_hsp_all.ts
To update all the historical stock prices on a daily basis, send a GET request to the **/api/stock/daily_hsp_all.ts** endpoint.

## get_ml_prices.ts
To get the ML prices for a stock, send a POST request to the **/api/stock/get_ml_prices** endpoint with the body contents: 

Example:

```
{
	"ticker_symbol" : "GLD",
	"model_type"	: "1"
}
```

## update_ml_prices.ts
To update the ML prices for a stock, send a POST request to the **/api/stock/update_ml_prices** endpoint with the body contents:

Example:

```
{
    "ticker_symbol"   : "GLD",
    "model_type"      : "1", 
    "prediction"      : [ 
        {"epoch_time" : 1658552938000, "price" : 123.45, "confidence_score" : 95.01, "rate_of_error": 1.20},
        {"epoch_time" : 1659157597000, "price" : 135.55, "confidence_score" : 90.01, "rate_of_error": 5.23},
        {"epoch_time" : 1659848797000, "price" : 136.52, "confidence_score" : 85.01, "rate_of_error": 10.53}
    ]
}
```

## update_tensorflow_prices.ts
To get and update the Tensorflow prediction prices, send a GET request to the **/api/stock/update_tensorflow_prices** endpoint.

## update_scikitlearn_prices.ts
To get and update the ScikitLearn prediction prices, send a GET request to the **/api/stock/update_scikitlearn_prices** endpoint.