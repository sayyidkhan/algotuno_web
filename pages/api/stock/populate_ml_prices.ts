import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        var ticker_symbol, stock_id, predicted_prices;

        // input =  {
        //     "ticker_symbol" : "GLD",
        //     "predictions"   : [ {"DateString":"epochtime", "Price":10},
        //                         {"DateString":"epochtime", "Price":15},
        //                         {"DateString":"epochtime", "Price":20} ]
        // }

        // input ={ 
        //     ticker_symbol : “”, 
        //     prediction : [ 
        //     { date1 : price }, 
            
        //     ... 
        //     ] 
        //     } 

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
            predicted_prices = req.body.predictions;
            
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

            // purge all ML stock price records from db first            
            const purge_predictions = await prisma.mL_Stock_Price.deleteMany({
                where:{
                    stockID : stock_id
                }
            })

            // repopulate with all predicted prices
            const insert_predictions = await prisma.mL_Stock_Price.createMany({data:predicted_prices});


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