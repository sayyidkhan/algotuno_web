import prisma from '../../../lib/prisma';

export default async (req, res) => {

    if (req.method === "GET"){

        try{
            const all_stocks = await prisma.stock.findMany();
            const successMsg = `Found ${all_stocks.length} stocks`;
            console.log(successMsg);
            res.status(200).json({
              "message" : successMsg,
              "result"  : all_stocks 
            });

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
        }
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts GET methods`});
    }
    

}