import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        let ticker_symbol, stock_id;

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

            if (stock_record) {
                // return the corresponding stockID
                stock_id = stock_record.stockID;
            } else {
                console.log(`Stock ${ticker_symbol} does not exist`)
                return res.status(406).json({
                    "message" : `Stock ${ticker_symbol} does not exist`
                });
            }

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
            return
        }

        // query the Yahoo Finance endpoint with the ticker symbol, start and end epoch times
        try{
            var query_url = `https://query1.finance.yahoo.com/v7/finance/download/${ticker_symbol}?period1=${req.body.start_date}&period2=${req.body.end_date}&interval=1d&events=history&includeAdjustedClose=true`
            console.log(`Pulling ${ticker_symbol} data from ${query_url}`)

            const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const csvParser = require("csv-parser");
            const needle = require("needle");

            let result = [];
            

            // uses Needle to get the HTTP request and CSV-Parser to transform the incoming data
            needle.get(query_url).pipe(csvParser()).on("data", (data) => {
                
                // parse each data field as a new variable
                const hsp_data_date = new Date(data.Date);

                // push a json object containing the new variables into the result array
                result.push({
                    "stockID"   :   stock_id,
                    "Date"      :   hsp_data_date,
                    "DateString":   hsp_data_date.getDate() + "-" + months[hsp_data_date.getMonth()] + "-" + hsp_data_date.getFullYear(),
                    "Open"      :   parseFloat(data.Open),
                    "High"      :   parseFloat(data.High), 
                    "Low"       :   parseFloat(data.Low),
                    "Close"     :   parseFloat(data.Close),
                    "Volume"    :   parseFloat(data.Volume)
                });

            }).on("end", async (err) => {
                if (err) {
                    res.status(406).json({"message" : err});
                } else if (result.length == 0) {
                    res.status(406).json({"message" : "query returned no data"}); 
                } else {
                    console.log(`Successfully pulled ${ticker_symbol} data; data length ${result.length}`);    
                }

                try{
                    const populate_hsp_results = await prisma.historical_Stock_Price.createMany({data:result});
                    const successMsg = `Inserted ${populate_hsp_results.count} records for ${ticker_symbol}`
                    console.log(successMsg);
                    res.status(200).json({"message" : successMsg});
                } catch (error){
                    const errorMsg = error.message;
                    console.error(errorMsg)
                    res.status(406).json({"message" : errorMsg});        
                }

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