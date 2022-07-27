import handler from "../../../pages/api/settings/add_or_update_settings";
import {App_Settings} from "../../../pages/api/settings/get_all_settings";
import prisma from "../../../config/prisma";
import {createMocks} from "node-mocks-http";


describe("test add_or_update_settings.ts", () => {

    test("", async () => {
        // 1. mock the data
        const app_result: App_Settings = {
            settingID: 1,
            settingName: "setting_1",
            settingValue: "value_1"
        };

        prisma.app_Settings.upsert = jest.fn().mockReturnValueOnce(app_result);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                'setting_name': 'setting_1',
                'setting_value': 'value_1'
            }
        });

        const settingName = req.body.setting_name;
        const settingValue = req.body.setting_value;

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message": `Successfully inserted/updated ${settingName}`,
            "result": app_result
        });
    });

});