import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST") {

        const id = req.body.user_id;
        const username = req.body.username;

        if(id || username){

            let data = {};
            if(id){
                data["id"] = id
            } else
            {
                data["username"] = username
            }

            try {
                const user_details = await prisma.user.findFirst({
                    where:data,
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        username: true,
                        emailVerified: true,
                        Superuser: {
                            select: {
                                superuserID: true
                            }
                        },
                        Subscription: {
                            select: {
                                subscriptionID: true,
                                Subscription_Plan: true
                            }
                        },
                        Stock_Watchlist: true,
                        User_Settings: true
                    }
                })
    
                const successMsg = `Query completed successfully`;
                console.log(successMsg);
                res.status(200).json({
                    "message": successMsg,
                    "result": user_details
                });
    
            } catch (error) {
                const errorMsg = error.message;
                console.error(errorMsg)
                res.status(406).json({ "message": errorMsg });
            }
    
        } else {
            res.status(406).json({ "message": "Specify user_id or username" });
        }


    } else {
        res.status(406).json({ "message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods` });
    }


}