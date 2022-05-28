import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        // check if ticker symbol exists in body
        if(!req.body.ticker_symbol){
            const errorMsg = "ticker_symbol Null or undefined";
            console.error(errorMsg);
            res.status(406).json({"message" : errorMsg});
            return
        }

        var ticker_symbol, stock_id;

        try{

            // check if ticker symbol exists in Stock database
            ticker_symbol = req.body.ticker_symbol;

            const stock_record = await prisma.stock.findFirst({
                where: {
                    tickerSymbol : ticker_symbol
                }
            });

            if (stock_record) {
                // return the corresponding stockID
                stock_id = stock_record.stockID;
            } else {
                console.log(`Stock ${ticker_symbol} does not exist`)
                return res.status(406).json({
                    "message" : `Stock ${ticker_symbol} does not exist`
                });
            }

            var successMsg;

            const hsp_range  = await prisma.historical_Stock_Price.aggregate({
                _max : {Date: true},
                _min : {Date: true},
                where:{stockID : stock_id}
            });

            successMsg = `Found the HSP range for ${ticker_symbol}`;
            console.log(successMsg);
            res.status(200).json({
                "message" : successMsg,
                "results" : hsp_range
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