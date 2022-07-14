import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        const userID = req.body.user_id;
        const subscriptionPlanID = req.body.subscription_plan_id;

        if(userID && subscriptionPlanID){

            try{
                const upsertSubscription = await prisma.subscription.upsert({
                    where:{
                        userID : userID 
                    }, 
                    update:{
                        subscriptionPlanID : subscriptionPlanID
                    },
                    create: {
                        userID : userID,
                        subscriptionPlanID : subscriptionPlanID
                    }
                });
                
                res.status(200).json({
                    "message" : `Successfully inserted/updated ${userID}'s plan`,
                    "result" : upsertSubscription
                });
            } catch (error) {
                const errorMsg = error.message;
                console.error(errorMsg)
                res.status(406).json({"message" : errorMsg});                
            }

        } else{
            res.status(406).json({
                "message" : "Specify the user_id and subscription_plan_id"
            });
        }

       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}