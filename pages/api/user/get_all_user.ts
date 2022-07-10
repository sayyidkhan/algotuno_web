import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "GET"){

        try{
            const all_users = await prisma.user.findMany({
                include:{
                    Superuser:{
                        select:{
                            superuserID: true
                        }
                    }
                }
            });

            try {
                all_users.forEach(e=>{
                    if (e.Superuser.length == 1){
                        e["superuserID"]= e.Superuser[0]["superuserID"];
                    }
                    
                    delete e.Superuser;
                    delete e.password;
                    delete e.image;

                })
            }catch(error){

            }

            const successMsg = `Found ${all_users.length} users`;
            console.log(successMsg);
            res.status(200).json({
              "message" : successMsg,
              "result"  : all_users 
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