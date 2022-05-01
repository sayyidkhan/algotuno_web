import { PrismaClient } from '@prisma/client';

let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }

  prisma = global.prisma
}

export default async (req, res) => {

    if (req.method === "GET"){

        if(!req.body.stockID){
            const errorMsg = "stockID Null or undefined";
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
            return
        }

        const data_stockid = req.body.stockID;

        try{
            const all_stocks = await prisma.historical_Stock_Price.findMany({
                where: {
                    stockID : data_stockid
                }
            });
            const successMsg = `Listed all stocks successfully`;
            console.log(successMsg);
            res.status(200).json({"message" : all_stocks});

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
        }
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts GET methods`});
    }
    

}