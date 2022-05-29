import { authorization_check } from '../../../config/auth_check';
import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "GET"){

        if (authorization_check(req.headers.authorization)) {

            const date_time_now = new Date().toLocaleString("en-US", {
                timeZone: 'Asia/Singapore',
            });
            console.log(date_time_now);
        } else {
            return res.status(400).json({
                "message": `Not authorised`,
            });
        }

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