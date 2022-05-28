import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        let query;

        // check if ticker_symbol, company_name and exchange name is specified
        try{
            query = {
                "tickerSymbol"  : req.body.ticker_symbol,
                "companyName"   : req.body.company_name, 
                "exchange"      : req.body.exchange
            }
        } catch (error) {
            const exceptionMsg = error.message;
            console.error(exceptionMsg)
            res.status(406).json({
                "message" : "Specify the ticker_symbol, company_name and exchange_name",
                "exception" : exceptionMsg
            });
        }

        try{
            const add_stock_result = await prisma.stock.create({data:query});
            const successMsg = `Inserted stock ${req.body.ticker_symbol}, ${req.body.company_name}, ${req.body.exchange}`;
            console.log(successMsg);
            res.status(200).json({
                "message" : successMsg,
                "result" : add_stock_result
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