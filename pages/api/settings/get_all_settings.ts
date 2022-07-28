import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "GET") {

        try {

            const all_setting = await prisma.app_Settings.findMany({});

            const successMsg = `Found ${all_setting.length} settings`;
            console.log(successMsg);
            res.status(200).json({
                "message": successMsg,
                "result": all_setting
            });

        } catch (error) {
            const code = error.code;
            console.error(error.message);

            // error code for record not found
            if (code === 'P2025') {
                res.status(406).json({"message": `Failed to find settings; record not found`});
            } else {
                res.status(406).json({"message": error.message});
            }
        }

    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts GET methods`});
    }

}

export interface App_Settings {
    settingID: number,
    settingName: string,
    settingValue: string
}