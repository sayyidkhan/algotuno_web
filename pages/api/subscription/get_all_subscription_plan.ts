import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "GET"){

        try{
            const all_plans = await prisma.subscription_Plan.findMany({
                include:{
                    Subscription: true
                }
            });

            all_plans.forEach(e=>{
                e['numberOfSubscribers'] = e.Subscription.length;
            })

            const successMsg = `Found ${all_plans.length} plans`;
            console.log(successMsg);
            res.status(200).json({
              "message" : successMsg,
              "result"  : all_plans
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