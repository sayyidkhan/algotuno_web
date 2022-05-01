import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {

    if (req.method === "POST"){

        const ticker_symbol = req.body.ticker_symbol;
        const company_name = req.body.company_name;
        const exchange_name = req.body.exchange;

        async function add (tickerSymbol, companyName, exchange) {
            const query = {
                "tickerSymbol"  : tickerSymbol,
                "companyName"   : companyName, 
                "exchange"      : exchange
            }

            const _add = await prisma.stock.create({data:query});
            return _add;
        }

        try{
            const result = await add(ticker_symbol, company_name, exchange_name);
            const successMsg = `Stock for ${company_name} added successfully`;
            console.log(successMsg);
            res.status(200).json({"message" : successMsg});

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
        }
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}