import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        const settingName = req.body.setting_name;
        const settingValue = req.body.setting_value;

        if(settingName && settingValue){

            try{
                const upsertSettings = await prisma.app_Settings.upsert({
                    where:{
                        settingName : settingName 
                    }, 
                    update:{
                        settingValue : settingValue
                    },
                    create: {
                        settingName: settingName,
                        settingValue: settingValue
                    }
                });
                
                res.status(200).json({
                    "message" : `Successfully inserted/updated ${settingName}`,
                    "result" : upsertSettings
                });
            } catch (error) {
                const errorMsg = error.message;
                console.error(errorMsg)
                res.status(406).json({"message" : errorMsg});                
            }

        } else{
            res.status(406).json({
                "message" : "Specify the setting_name and setting_value"
            });
        }

       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}