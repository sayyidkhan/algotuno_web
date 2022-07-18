import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        const userID = req.body.user_id;

        if (userID) {
            try{
                const stocks_watchlist = await prisma.stock_Watchlist.findMany({
                    where:{
                        userID : userID
                    }
                });
    
                const successMsg = `Found ${stocks_watchlist.length} stocks in watchlist`;
                console.log(successMsg);
                res.status(200).json({
                  "message" : successMsg,
                  "result"  : stocks_watchlist
                });
    
            } catch (error) {
                const errorMsg = error.message;
                console.error(errorMsg)
                res.status(406).json({"message" : errorMsg});
            }

        } else {
            res.status(406).json({
                "message" : "Specify the user_id."
            });
        }
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts GET methods`});
    }
    

}