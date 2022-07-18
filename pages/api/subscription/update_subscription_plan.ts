import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        const subscriptionPlanID = req.body.subscription_plan_id;
        const planName = req.body.plan_name;
        const price = req.body.price;
        const watchlistLimit = req.body.watchlist_limit;
        let data = {};

        if(subscriptionPlanID){
            try{
                if (planName || price || watchlistLimit){
                    if(planName){
                        data["planName"] = planName;
                    }

                    if(price){
                        data["price"] = price;
                    }

                    if (watchlistLimit){
                        data["watchlistLimit"] = watchlistLimit ;
                    }

                    const update_subscription_plan = await prisma.subscription_Plan.update({
                        where : {
                            subscriptionPlanID : subscriptionPlanID
                        }, 
                        data: data
                    })

                    res.status(200).json({
                        "message" : `Successfully updated subscription plan ${subscriptionPlanID}'s details`,
                        "result" : update_subscription_plan
                    });

                } else {
                    res.status(406).json({
                        "message" : "Specify the plan_name OR price OR watchlist_limit."
                    });
                        
                }
            } catch (error){
                const code = error.code;
                console.error(error.message)
                // error code for record not found
                if (code === 'P2025'){
                    res.status(406).json({"message":`Failed to update subscription plan; record not found`});
                } else {
                    res.status(406).json({"message" : error.message});
                }
            }
        } else{
            res.status(406).json({
                "message" : "Specify the subscription_plan_id"
            });
        }

       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}