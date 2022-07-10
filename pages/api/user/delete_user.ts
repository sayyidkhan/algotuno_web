import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST") {

        // check if username exists in body
        if (!req.body.username) {
            const errorMsg = "username Null or undefined";
            console.error(errorMsg);
            res.status(406).json({"message": errorMsg});
            return
        }

        try {

            const input_username = req.body.username;

            try{
                const delete_user = await prisma.user.delete({
                    where: {
                        username:input_username
                    }
                })

                const successMsg = `Deleted ${input_username} from Superuser`;
                console.log(successMsg);
                res.status(200).json({
                    "message" : successMsg,
                    "result" : delete_user
                });

            } catch (error) {
                const code = error.code;
                console.error(error.message)
                // error code for record not found
                if (code === 'P2025'){
                    res.status(406).json({"message":`Failed to delete ${input_username} from User; ${input_username} is not a User`});
                } else {
                    res.status(406).json({"message" : error.message});
                }
                return
            }


        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message": errorMsg});
        }

    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }


}