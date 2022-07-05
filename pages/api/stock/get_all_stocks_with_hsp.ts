import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "GET"){

        try{
            
            const hsp_range = await prisma.historical_Stock_Price.groupBy({
                by:['stockID'],
                _min:{Date:true},
                _max:{Date:true}
            })

            // const all_stocks = await prisma.stock.findMany({
            //     include:{
            //         _count:{
            //             select: {historicalStockPrice:true}
            //         }
            //     }
            // })

            // const all_stocks = await prisma.historical_Stock_Price.aggregate({
            //     _max:{
            //         Date:true
            //     }
            // })

            const successMsg = `Found ${hsp_range.length} stocks`;
            console.log(successMsg);
            res.status(200).json({
              "message" : successMsg,
              "result"  : hsp_range 
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