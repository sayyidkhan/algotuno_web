import prisma from '../../../config/prisma';
import {authorization_check} from '../../../config/auth_check';

export default async (req, res) => {

    if (req.method === "POST"){

        if (authorization_check(req.headers.authorization)) {

            const date_time_now = new Date().toLocaleString("en-US", {
                timeZone: 'Asia/Singapore',
            });
            console.log(date_time_now);
        } else {
            return res.status(400).json({
                "message": `Not authorised`,
            });
        }
        
        var ticker_symbol, stock_id, predicted_prices, model_type;
        const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        // input =  {
        //     "ticker_symbol" : "GLD",
        //     "model_type"  : "1", 
        //     "prediction"   : [ {"epochtime"  : 10.12},
        //                         {"epochtime" : 15.23},
        //                         {"epochtime" : 20.42} ]
        // }

        // check if ticker symbol exists in body
        if(!req.body.ticker_symbol){
            const errorMsg = "ticker_symbol Null or undefined";
            console.error(errorMsg);
            res.status(406).json({"message" : errorMsg});
            return
        }

        try{
            model_type = parseInt(req.body.model_type);
        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
            return
        }

        // check if ticker symbol exists in Stock database
        try{
            ticker_symbol = req.body.ticker_symbol;
            predicted_prices = req.body.prediction;
            
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

            try{
                // purge all ML stock price records from db first            
                const purged_recs = await prisma.mL_Stock_Price.deleteMany({
                    where:{
                        stockID : stock_id, 
                        MLModelID : model_type
                    }})

                console.log(`Purged ${purged_recs.count} records for ${ticker_symbol}.`)

            } catch (error) {
                console.log(error);
            }

            let formatted_results = []

            for(let i = 0; i < predicted_prices.length; i++){
                //current format: predicted_prices[i] = {"epochtime" : 123.0}
                
                let prediction_obj = {}
                let formatted_DateObj, formattedDateString;
                
                // reassign Date field into the DateObj for storage
                // var formatted_DateObj = new Date(predicted_prices[i]["Date"]*1000);
                for (const [key, value] of Object.entries(predicted_prices[i])){
                    prediction_obj["stockID"] = stock_id;

                    formatted_DateObj = new Date(key);
                    formattedDateString = formatted_DateObj.getDate() + "-" + months[formatted_DateObj.getMonth()] + "-" + formatted_DateObj.getFullYear();

                    prediction_obj["Date"] = formatted_DateObj;
                    prediction_obj["DateString"] = formattedDateString;
                    prediction_obj["Price"] = value;
                    prediction_obj["MLModelID"] = model_type;
                }

                formatted_results.push(prediction_obj);
            }

            // after manipulation, formatted_results will look like this:
            // formatted_results = [
            //      {"stockID" : 1, "Date" : DateObj, "DateString":"22-MAY-2022", "Price" : 123.00, "MLModelID" : 1},
            //      {"stockID" : 1, "Date" : DateObj, "DateString":"22-MAY-2022", "Price" : 123.00, "MLModelID" : 1}
            //      {"stockID" : 1, "Date" : DateObj, "DateString":"22-MAY-2022", "Price" : 123.00, "MLModelID" : 1}]

            // repopulate with all predicted prices
            const insert_predictions = await prisma.mL_Stock_Price.createMany({data:formatted_results});
            const successMsg = `Inserted ${insert_predictions.count} records for ${ticker_symbol}`
            console.log(successMsg);
            res.status(200).json({"message":successMsg, "result":insert_predictions});

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