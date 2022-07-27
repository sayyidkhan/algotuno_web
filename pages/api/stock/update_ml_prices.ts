import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){
        
        var ticker_symbol, stock_id, predicted_prices, model_type;
        const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        // input =  {
        //     "ticker_symbol"   : "GLD",
        //     "model_type"      : "1", 
        //     "prediction"      : [ 
        //         {"epoch_time" : 10123132412, "price" : 123.22, "confidence_score" : 95.01, "rate_of_error": 12.23},
        //         {"epoch_time" : 10123132412, "price" : 123.22, "confidence_score" : 95.01, "rate_of_error": 12.23},
        //         {"epoch_time" : 10123132412, "price" : 123.22, "confidence_score" : 95.01, "rate_of_error": 12.23}
        //     ]
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
                //current format >
                    // predicted_prices[i] = {
                    //     "epoch_time"        : 10.12,
                    //     "price"             : 123.22,
                    //     "confidence_score"  : 95.01,
                    //     "rate_of_error"     : 12.23
                    // }
                
                let prediction_obj = {}
                const dateIntRep = parseInt(predicted_prices[i]["epoch_time"])
                const formatted_DateObj = new Date(dateIntRep); // convert epoch time to Date obj
                const formattedDateString = formatted_DateObj.getDate() + "-" + months[formatted_DateObj.getMonth()] + "-" + formatted_DateObj.getFullYear();

                prediction_obj["stockID"]    = stock_id;
                prediction_obj["Date"]       = formatted_DateObj;
                prediction_obj["DateString"] = formattedDateString;
                prediction_obj["Price"]      = predicted_prices[i]["price"];
                prediction_obj["Confidence"] = predicted_prices[i]["confidence_score"];
                prediction_obj["Error"]      = predicted_prices[i]["rate_of_error"];
                
                prediction_obj["MLModelID"] = model_type;

                formatted_results.push(prediction_obj);
            }

            console.log(formatted_results);

            // after manipulation, formatted_results will look like this:
            // formatted_results = [
            //      {"stockID" : 1, "Date" : DateObj, "DateString":"22-MAY-2022", "Price" : 123.00, "Confidence" : 95.01, "Error" : 12.01, "MLModelID" : 1},
            //      {"stockID" : 1, "Date" : DateObj, "DateString":"22-MAY-2022", "Price" : 123.00, "Confidence" : 95.01, "Error" : 12.01, "MLModelID" : 1},
            //      {"stockID" : 1, "Date" : DateObj, "DateString":"22-MAY-2022", "Price" : 123.00, "Confidence" : 95.01, "Error" : 12.01, "MLModelID" : 1}
            //     ]
            
            // repopulate with all predicted prices
            const insert_predictions = await prisma.mL_Stock_Price.createMany({data:formatted_results});
            const successMsg = `Updated ${insert_predictions.count} records from Model ${model_type} for ${ticker_symbol}`
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