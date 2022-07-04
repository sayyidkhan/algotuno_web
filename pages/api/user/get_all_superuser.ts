import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "GET"){

        try{
            const all_superusers = await prisma.superuser.findMany();

            const successMsg = `Found ${all_superusers.length} superusers`;
            console.log(successMsg);
            res.status(200).json({
              "message" : successMsg,
              "result"  : all_superusers 
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