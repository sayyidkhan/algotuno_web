import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "GET"){

        try{
            const all_stocks = await prisma.stock.findMany({
                include:{
                    historicalStockPrice:{
                        orderBy : {
                            Date:'desc'
                        },
                        select: {
                            Close:true
                        },
                        take:2
                    }
                }
            });

            try{
                all_stocks.forEach(e=>{
                    const price_list = e.historicalStockPrice;
                    const todays_price = price_list[0]['Close'];
                    const yesterdays_price = price_list[1]['Close'];
                    const difference = todays_price - yesterdays_price;

                    const pctchange = (Math.abs(yesterdays_price - todays_price))/yesterdays_price * 100;

                    e['latestPrice'] = todays_price;
                    e['priceChange'] = difference;
                    e['percentChange'] = pctchange;
                    delete e.historicalStockPrice;

                })
            } catch (error){
                const successMsg = `Found ${all_stocks.length} stocks`;
                console.log(successMsg);
                res.status(200).json({
                    "message" : successMsg,
                    "result"  : all_stocks 
                  });
                return
            }

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