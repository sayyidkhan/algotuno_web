import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "GET") {
        const {query: {id}} = req;
        const user_id: string = id !== undefined ? id : -1;


        try {
            const user_entity = await prisma.user.findUnique({
                where: {
                    id: user_id,
                }
            });

            if (user_entity) {
                const superuser = await prisma.superuser.findUnique({
                    where: {
                        userID: user_entity.id,
                    }
                });

                let is_superuser = false;
                if (superuser) {
                    is_superuser = true;

                    delete user_entity.password;
                    delete user_entity.emailVerified;
                    delete user_entity.image;
                }
                res.status(200).json({
                    "is_superuser": is_superuser,
                    "username": user_entity,
                });
                return;
            }
            throw new Error("user does not exist in database!");
        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message": errorMsg});
        }

    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts GET methods`});
    }


}