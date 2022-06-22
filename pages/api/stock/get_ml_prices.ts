import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST") {

        // check if ticker symbol exists in body
        if (!req.body.ticker_symbol) {
            const errorMsg = "ticker_symbol Null or undefined";
            console.error(errorMsg);
            res.status(406).json({"message": errorMsg});
            return
        }

        let ticker_symbol, stock_id, model_type;

        try {

            // check if ticker symbol exists in Stock database
            ticker_symbol = req.body.ticker_symbol;

            const stock_record = await prisma.stock.findFirst({
                where: {
                    tickerSymbol: ticker_symbol
                }
            });

            if (stock_record) {
                // return the corresponding stockID
                stock_id = stock_record.stockID;
            } else {
                console.log(`Stock ${ticker_symbol} does not exist`)
                return res.status(406).json({
                    "message": `Stock ${ticker_symbol} does not exist`
                });
            }

            try{
                model_type = parseInt(req.body.model_type);
            } catch (error) {
                const errorMsg = error.message;
                console.error(errorMsg)
                res.status(406).json({"message" : errorMsg});
                return
            }

            const ml_prices = await prisma.mL_Stock_Price.findMany({
                where:{
                    stockID : stock_id,
                    MLModelID : model_type
                }, orderBy: {
                    Date : "asc"
                }
            });

            const successMsg = `Found ${ml_prices.length} records for ${ticker_symbol}`;
            console.log(successMsg);
            res.status(200).json({
                "message": successMsg,
                "results": ml_prices
            });

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message": errorMsg});
        }

    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }


}