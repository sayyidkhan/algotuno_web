import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        const userID = req.body.user_id;
        const list_of_stocks = req.body.stocks;
        let data = [];

        if(userID && list_of_stocks){

            try{
                await prisma.stock_Watchlist.deleteMany({
                    where: {
                        userID : userID
                    }
                });

                for(let i = 0; i < list_of_stocks.length; i++){

                    try{

                        data.push({
                            userID : userID,
                            stockID : Number(list_of_stocks[i])
                        });
    
                    } catch(error){
                        console.log(error)
                    }
                }
                
                const update_watchlist = await prisma.stock_Watchlist.createMany({data});

                const successMsg = `Updated ${userID}'s stock watchlist`;
                console.log(successMsg);
                res.status(200).json({
                    "message" : successMsg,
                    "result"  : update_watchlist 
                });

            } catch (error) {
                const errorMsg = error.message;
                console.error(errorMsg)
                res.status(406).json({"message" : errorMsg});                
            }

        } else{
            res.status(406).json({
                "message" : "Specify the user_id and list of stocks."
            });
        }
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}