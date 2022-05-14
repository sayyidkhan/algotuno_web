import prisma from '../../../lib/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        var ticker_symbol, stock_id;
        var hsp_start_date, hsp_end_date;
        var hsp_start_epoch, hsp_end_epoch;

        // check if ticker symbol exists in body
        if(!req.body.ticker_symbol){
            const errorMsg = "ticker_symbol Null or undefined";
            console.error(errorMsg);
            res.status(406).json({"message" : errorMsg});
            return
        }

        // check if ticker symbol exists in Stock database
        try{
            ticker_symbol = req.body.ticker_symbol;
            
            const stock_record = await prisma.stock.findFirst({
                where:{
                    tickerSymbol : ticker_symbol
                }
            })

            // return the corresponding stockID
            stock_id = stock_record.stockID

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
            return
        }

        // try converting the specified start and end date into Date objects and into epoch time
        try{
            hsp_start_date = new Date(req.body.start_date);
            hsp_end_date = new Date(req.body.end_date);

            hsp_start_epoch = Date.parse(hsp_start_date)/1000;
            hsp_end_epoch = Date.parse(hsp_end_date)/1000;

        } catch (error){
            const errorMsg = error.message;
            console.error(errorMsg);
            res.status(406).json({"message" : errorMsg});
            return
        }

        // query the Yahoo Finance endpoint with the ticker symbol, start and end epoch times
        try{
            var query_url = `https://query1.finance.yahoo.com/v7/finance/download/${ticker_symbol}?period1=${hsp_start_epoch}&period2=${hsp_end_epoch}&interval=1d&events=history&includeAdjustedClose=true`
            console.log(`Pulling ${ticker_symbol} data from ${query_url}`)

            const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const csvParser = require("csv-parser");
            const needle = require("needle");

            let result = [];
            
            
            // uses Needle to get the HTTP request and CSV-Parser to transform the incoming data 
            needle.get(query_url).pipe(csvParser()).on("data", (data) => {
                
                // parse each data field as a new variable
                const hsp_data_date = new Date(data.Date);
                const hsp_data_datestring = hsp_data_date.getDate() + "-" + months[hsp_data_date.getMonth()] + "-" + hsp_data_date.getFullYear();
                const hsp_data_open = parseFloat(data.Open);
                const hsp_data_high = parseFloat(data.High);
                const hsp_data_low = parseFloat(data.Low);
                const hsp_data_close = parseFloat(data.Close);
                const hsp_data_vol = parseFloat(data.Volume);

                // push a json object containing the new variables into the result array
                result.push({
                    "stockID"   :   stock_id,
                    "Date"      :   hsp_data_date,
                    "DateString":   hsp_data_datestring,
                    "Open"      :   hsp_data_open,
                    "High"      :   hsp_data_high, 
                    "Low"       :   hsp_data_low,
                    "Close"     :   hsp_data_close,
                    "Volume"    :   hsp_data_vol
                });

            }).on("end", async (err) => {
                if (err) {
                    return res.status(406).json({"message" : err});
                } else if (result.length == 0) {
                    return  res.status(406).json({"message" : "query returned no data"}); 
                } else {
                    console.log(`Successfully pulled ${ticker_symbol} data; data length ${result.length}`);    
                }

                const populate_hsp_results = await prisma.historical_Stock_Price.createMany({data:result});
                const successMsg = `Inserted ${populate_hsp_results.count} records for ${ticker_symbol}`
                console.log(successMsg);
                res.status(200).json({"message" : successMsg});

            });

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
        }
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}