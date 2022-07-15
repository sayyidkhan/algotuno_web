import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        let query;

        // check if planName and price are specified
        try{
            query = {
                "planName"  : req.body.plan_name,
                "price"   : req.body.price
            }
        } catch (error) {
            const exceptionMsg = error.message;
            console.error(exceptionMsg)
            res.status(406).json({
                "message" : "Specify the plan_name and price",
                "exception" : exceptionMsg
            });
        }

        try{
            const add_plan = await prisma.stock.create({data:query});
            const successMsg = `Inserted new plan ${req.body.plan_name}, ${req.body.price}`;
            console.log(successMsg);
            res.status(200).json({
                "message" : successMsg,
                "result" : add_plan
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