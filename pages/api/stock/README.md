##Overview
Added the following scripts:
- add_stock.ts
- delete_stock.ts
- get_all_stocks.ts
- populate_hsp.ts
- get_hsp.ts
- delete_hsp.ts

#### Usage
##add_stock.ts
To add a new stock into the Stock table, send a POST request to the /api/stock/add_stock endpoint with the body contents as such:

{
	"ticker_symbol"	: 	"<stock ticker symbol>",
	"company_name"	: 	"<stock company name>",
	"exchange"		: 	"<stock exchange name>"
}

Example: 

```
{
    "ticker_symbol" :   "GOOG",
    "company_name"  :   "Google",
    "exchange"      :   "NYSE"
}
```

##delete_stock.ts
To delete an existing stock from the Stock table, send a POST request to the /api/stock/delete_stock endpoint with the body contents:

{
	"ticker_symbol"	:	"<stock ticker symbol>"
}

Example:

```
{
	"ticker_symbol"	:	"GOOG"
}
```

##get_all_stocks.ts
To get all stocks from the Stock table, send a GET request to the /api/stock/get_all_stocks endpoint.

##populate_hsp.ts
To populate a stock with historical stock prices, send a POST request to the /api/stock/populate_hsp endpoint with the body contents:

{
	"ticker_symbol"	:	"<stock ticker symbol>",
	"start_date"	:	"<start date of historical data>",
	"end_date"		:	"<end date of historical data>"
}

Example:
```
{
	"ticker_symbol" : 	"GOOG",
	"start_date"	:	"2006-01-01",
	"end_date"		:	"2022-01-01"
}
```

Notes:
- The stock that you wish to populate historical prices with must already exist in the Stock table
- The stock that you wish to populate historical prices with must not already have historical prices (PK constraint where PK=(StockID, Date))
- [Yahoo! Finance ](https://sg.finance.yahoo.com/) must have the historical stock prices for the specified date range
- The start and end dates **must** be specified in the format **YYYY-MM-DD**. Not specifying the start/end dates will result in an error. 

##get_historical_stock_price.ts
To get the historical stock price for a stock, send a POST request to the /api/stock/get_hsp endpoint with the body contents:

{
	"ticker_symbol"	:	"<stock ticker symbol>",
	"start_date"	:	"<start date of historical data>",
	"end_date"		:	"<end date of historical data>",
	"sort"			:	"asc/desc"
}

Example:
```
{
	"ticker_symbol" : 	"GOOG",
	"start_date"	:	"2006-01-01",
	"end_date"		:	"2022-01-01",
	"sort"			:	"desc"
}
```

Notes:
- The stock that you wish to retrieve historical prices with must already exist in the Stock table
- The stock that you wish to retrieve historical prices of must already contain historical stock prices in the historical_stock_price table.
- The **start_date** and **end_date** fields are optional. If left empty, the query will return all available historical stock prices.
-- The **start_date** and **end_date** fields **must** be specified in the format **YYYY-MM-DD**. 
-- If the **start_date** field is left empty, the query will return all historical stock prices up until the specified **end_date**.
-- If the **end_date** field is left empty, the query will return all historical stock prices since the specified **start_date**.
- The **sort** field is optional. 
-- If left empty, the query will return results ordered by date in ascending order by default.

##delete_hsp.ts
To delete the historical stock price for a stock, send a POST request to the /api/stock/delete_hsp endpoint with the body contents:

{
	"ticker_symbol"	:	"<stock ticker symbol>"
}

Example:

```
{
	"ticker_symbol"	:	"GOOG"
}
```

