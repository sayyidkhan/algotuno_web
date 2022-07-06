import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        let query;

        // check if user_id, config_name and config_value
        try{
            query = {
                "userID"      : req.body.user_id,
                "configName"  : req.body.config_name, 
                "value"       : req.body.config_value
            }
        } catch (error) {
            const exceptionMsg = error.message;
            console.error(exceptionMsg)
            res.status(406).json({
                "message" : "Specify the user_id, config_name and config_value",
                "exception" : exceptionMsg
            });
        }

        try{
            const add_setting_result = await prisma.settings.create({data:query});
            const successMsg = `Inserted ${req.body.user_id}, ${req.body.config_name}, ${req.body.config_value}`;
            console.log(successMsg);
            res.status(200).json({
                "message" : successMsg,
                "result" : add_setting_result
            });

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
        }
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}