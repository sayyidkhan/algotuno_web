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

        let input_username, user_id;

        try {

            // check if ticker symbol exists in Stock database
            input_username = req.body.username;

            const user_record = await prisma.user.findFirst({
                where: {
                    username : input_username
                }
            });

            if (user_record) {
                // return the corresponding user ID
                user_id = user_record.id;
            } else {
                console.log(`User ${input_username} does not exist`)
                return res.status(406).json({
                    "message": `Stock ${input_username} does not exist`
                });
            }

            try{
                const add_superuser = await prisma.superuser.create({
                    data:{
                        userID : user_id
                    }
                })

                const successMsg = `Added ${input_username} to Superuser`;
                console.log(successMsg);
                res.status(200).json({
                    "message" : successMsg,
                    "result" : add_superuser
                });

            } catch (error) {
                const code = error.code;
                console.error(error.message)
                // error code for unique constraint issue
                if (code === 'P2002'){
                    res.status(406).json({"message":`Failed to add ${input_username} to Superuser; ${input_username} is already a Superuser`});
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