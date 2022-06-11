import prisma from '../../../config/prisma';

const is_date_same = (date1, date2) => {
    return (
    date1.getYear() === date2.getYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
    )
}
    
    
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
       
            // get today's date as epoch time
            var today = new Date().getTime();
            var hsp_start_epoch, hsp_end_epoch;

            // get latest_rec and get latest date
            const latest_rec = await prisma.historical_Stock_Price.findFirst({
                where:{
                    stockID:stock_id
                },
                orderBy:{
                    Date:'desc'
                }
            })

            // get latest record's Date obj, convert it into epoch time
            let latest_rec_DateObj = latest_rec.Date.getTime()/1000;

            try {
                console.log(`Pulling data from Yahoo Finance.`)
    
                hsp_end_epoch = Math.floor(today/1000); //today change sthis
                hsp_start_epoch = latest_rec_DateObj + 86400; //latest rec + 1 day to avoid db constraint

                var query_url = `https://query1.finance.yahoo.com/v7/finance/download/${ticker_symbol}?period1=${hsp_start_epoch}&period2=${hsp_end_epoch}&interval=1d&events=history&includeAdjustedClose=true`
                console.log(`Pulling ${ticker_symbol} data from ${query_url}`)
                
                const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                const csvParser = require("csv-parser");
                const needle = require("needle");
    
                let result = [];

                // get latest price from YF
                needle.get(query_url).pipe(csvParser()).on("data", (data) => {
                    
                    // parse each data field
                    const hsp_data_date = new Date(data.Date);
    
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
                    } else if (Object.keys(result).length == 0) {
                        // if YF latest == empty, dont execute
                        res.status(406).json({"message" : "Query returned no data"}); 
                    } else if (is_date_same(result.slice(-1)[0].Date, latest_rec.Date)){
                       // check results from YF, use slice(-1) to get last record
                       console.log(`Latest stock prices for ${ticker_symbol} already updated.`);
                       res.status(200).json({"message" : `Latest stock prices for ${ticker_symbol} already updated.`}); 
                    } else {
                        console.log(`Successfully pulled ${ticker_symbol} data; updating records.`);    

                        const insert_hsp = await prisma.historical_Stock_Price.createMany({data:result});
                        res.status(200).json({
                            "message" : `Successfully updated stock records for ${ticker_symbol}`,
                            result    : {ticker_symbol:insert_hsp.count}
                        });

                    }
    
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

