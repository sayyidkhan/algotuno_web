import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        
        var ticker_symbol, stock_id;

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

            // get latest, earliest rec from db
            const earliest_rec = await prisma.historical_Stock_Price.findFirst({
                where: {
                    stockID : stock_id
                },
                orderBy:{
                    Date:'asc'
                }
            })

            var earliest_rec_date = earliest_rec.Date;
        
            // get today's date as epoch time
            var today = Date.now();
            var hsp_start_epoch, hsp_end_epoch;

            // convert today's time to date obj
            let todayDateObj = new Date(today);

            const latest_rec = await prisma.historical_Stock_Price.findFirst({
                where:{
                    stockID:stock_id
                }
            })

            try {
                console.log(`Pulling data from Yahoo Finance.`)
    
                hsp_start_epoch = Math.floor(today/1000);
                hsp_end_epoch = hsp_start_epoch - 86400;

                var query_url = `https://query1.finance.yahoo.com/v7/finance/download/${ticker_symbol}?period1=${hsp_end_epoch}&period2=${hsp_start_epoch}&interval=1d&events=history&includeAdjustedClose=true`
                console.log(`Pulling ${ticker_symbol} data from ${query_url}`)
                
                const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                const csvParser = require("csv-parser");
                const needle = require("needle");
    
                var result;

                // get latest price from YF
                needle.get(query_url).pipe(csvParser()).on("data", (data) => {
                    
                    // parse each data field
                    const hsp_data_date = new Date(data.Date);
    
                    result = {
                        "stockID"   :   stock_id,
                        "Date"      :   hsp_data_date,
                        "DateString":   hsp_data_date.getDate() + "-" + months[hsp_data_date.getMonth()] + "-" + hsp_data_date.getFullYear(),
                        "Open"      :   parseFloat(data.Open),
                        "High"      :   parseFloat(data.High), 
                        "Low"       :   parseFloat(data.Low),
                        "Close"     :   parseFloat(data.Close),
                        "Volume"    :   parseFloat(data.Volume)
                    };
    
                }).on("end", async (err) => {
                    if (err) {
                        return res.status(406).json({"message" : err});
                    } else if (Object.keys(result).length == 0) {
                        // if YF latest == empty, dont execute
                        return  res.status(406).json({"message" : "query returned no data"}); 
                    } else if (result["Date"].getTime() === latest_rec.Date.getTime()) {
                       // if YF latest == latest rec from db, dont execute
                       console.log(`Latest stock prices for ${ticker_symbol} already updated.`);
                       return  res.status(406).json({"message" : `Latest stock prices for ${ticker_symbol} already updated.`}); 
                    } else {
                        console.log(`Successfully pulled ${ticker_symbol} data; updating records.`);    
                    }

                    // if YF latest != empty and != latest rec from db, update earliest rec from db with YF data
                    const update_hsp = await prisma.historical_Stock_Price.update({
                        where: {
                            stockID_Date: { stockID: stock_id, Date: earliest_rec_date }
                        },
                        data: result
                    });

                    // return instead of res
                    // res.status(200).json({"message" : `Successfully updated stock records for ${ticker_symbol}`,"result":update_hsp});
                    return update_hsp;
    
                });
                
            } catch (error) {
                const errorMsg = error.message;
                console.error(errorMsg)
                res.status(406).json({"message" : errorMsg});
                return
            }

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
            return
        }

       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}

