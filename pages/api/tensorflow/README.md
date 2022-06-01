## Overview
Added the following scripts:
- run_model.ts


#### Usage
## run_model.ts
To run a forecast on a specific stock, send a POST request to the **/api/tensorflow/run_model** endpoint with the body contents as such:
NOTE: the `stock_metadata_list` should be prefilled with the stock data coming from the **/api/stock/get_hsp** api

Input Example: 

```
{
    "ticker_symbol" : "APPL",
    "stock_metadata_list" : []
}
```

Output Example:
```
{
    "message": "SUCCESS",
    "result": {
        "ticker_symbol": "APPL",
        "prediction": [
            {
                "2022-01-01T00:00:00.000Z": 177.87269592285156
            },
            {
                "2022-01-07T00:00:00.000Z": 178.38754272460938
            },
            {
                "2022-01-30T00:00:00.000Z": 178.56460571289062
            }
        ]
    }
}
```