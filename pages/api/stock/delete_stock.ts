import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        let ticker_symbol, stock_id;

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

            // delete all instances where the ticker_symbol matches
            const delete_stock_result = await prisma.stock.deleteMany({
                where:{
                    tickerSymbol: ticker_symbol
                }
            })

            const successMsg = `Deleted stock ${ticker_symbol}`;
            console.log(successMsg);
            res.status(200).json({
                "message" : successMsg,
                "result"  : delete_stock_result
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