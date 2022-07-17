import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "GET") {

        try {
            const all_users = await prisma.user.findMany({
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

            const successMsg = `Found ${all_users.length} users`;
            console.log(successMsg);
            res.status(200).json({
                "message": successMsg,
                "result": all_users
            });

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({ "message": errorMsg });
        }

    } else {
        res.status(406).json({ "message": `ERROR: ${req.method} method used; this endpoint only accepts GET methods` });
    }


}