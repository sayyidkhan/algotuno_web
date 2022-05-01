import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {

    if (req.method === "POST"){

        const ticker_symbol = req.body.ticker_symbol;

        try{
            const all_stocks = await prisma.stock.deleteMany({
                where:{
                    tickerSymbol:{
                        contains: ticker_symbol
                    }
                }
            })

            const successMsg = `Deleted all stocks successfully`;
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