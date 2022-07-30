import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        const settingID = req.body.setting_id;
        const settingName = req.body.setting_name;

        try{
            if(settingID){
                const delete_setting = await prisma.app_Settings.delete({
                    where:{
                        settingID : settingID
                    }
                })

                res.status(200).json({
                    "message" : `Deleted setting ${settingID}`,
                    "result"  : delete_setting
                });
            } else if (settingName){
                const delete_setting = await prisma.app_Settings.deleteMany({
                    where:{
                        settingName : settingName
                    }
                })

                if (delete_setting.count > 0){
                    res.status(200).json({
                        "message" : `Deleted setting ${settingName}`,
                        "result"  : delete_setting
                    });
                } else {
                    res.status(406).json({
                        "message" : `Failed to delete setting ${settingName}`,
                        "result"  : delete_setting
                    });
                }

            } else {
                res.status(200).json({
                    "message" : "Please specify either the setting_id OR setting_name"
                });
            }

        } catch (error) {
            const code = error.code;
            console.error(error.message)
            // error code for record not found
            if (code === 'P2025'){
                res.status(406).json({"message":`Failed to delete setting; record not found`});
            } else {
                res.status(406).json({"message" : error.message});
            }
        }
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}