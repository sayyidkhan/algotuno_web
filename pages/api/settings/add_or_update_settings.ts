import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        const configName = req.body.config_name;
        const value = req.body.config_value;

        if(configName && value){

            try{
                const upsertSettings = await prisma.settings.upsert({
                    where:{
                        configName : configName 
                    }, 
                    update:{
                        value : value
                    },
                    create: {
                        configName: configName,
                        value: value
                    }
                });
                
                res.status(200).json({
                    "message" : `Successfully inserted/updated ${configName}`,
                    "result" : upsertSettings
                });
            } catch (error) {
                const errorMsg = error.message;
                console.error(errorMsg)
                res.status(406).json({"message" : errorMsg});                
            }

        } else{
            res.status(406).json({
                "message" : "Specify the config_name and config_value"
            });
        }

       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}