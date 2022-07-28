import {App_Settings} from "../../../pages/api/settings/get_all_settings";
import prisma from "../../../config/prisma";
import handler from "../../../pages/api/settings/delete_settings";
import {createMocks} from "node-mocks-http";

describe("Test delete_settings.ts", () =>{

    test("Deleting with setting_id", async () => {

        const settingID = 1;

        // 1. mock the data
        const app_result: App_Settings = {
            settingID: 1,
            settingName: "setting_1",
            settingValue: "value_1"
        };

        prisma.app_Settings.delete = jest.fn().mockReturnValueOnce(app_result);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                'setting_id': settingID
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message" : `Deleted setting ${settingID}`,
            "result"  : app_result
        });
    });

    test("Deleting with setting_name", async () => {

        const settingName = "setting_1";

        // 1. mock the data
        const result = {"count" : 1}

        prisma.app_Settings.deleteMany = jest.fn().mockReturnValueOnce(result);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                'setting_name': settingName
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message" : `Deleted setting ${settingName}`,
            "result"  : result
        });
    });

    test("Deleting with invalid setting_id as non-integer input", async () => {

        const setting_id = "non-integer input";

        // 1. mock the data
        const errorMsg = {
            "message" : `Setting_id must be integer`
        };

        prisma.app_Settings.deleteMany = jest.fn().mockRejectedValueOnce(errorMsg);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                'setting_id': setting_id
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message" : "Setting_id must be integer"
        });
    });

    test("Deleting with invalid setting_id as record not found", async () => {

        const setting_id = 12345;

        // 1. mock the data
        const errorMsg = {
            "message": "Failed to delete setting; record not found"
        };

        prisma.app_Settings.deleteMany = jest.fn().mockRejectedValueOnce(errorMsg);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                'setting_id': setting_id
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message": "Failed to delete setting; record not found"
        });
    });


    test("Deleting with invalid setting_name, failing and returning count=0", async () => {

        const settingName = "some_fake_setting_name";

        // 1. mock the data
        const result = {"count" : 0}
        const errorMsg = {
            "message" : `Failed to delete setting ${settingName}`,
            "result"  : result
        };

        prisma.app_Settings.deleteMany = jest.fn().mockRejectedValueOnce(errorMsg);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                'setting_name': settingName
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message" : `Failed to delete setting ${settingName}`,
            "result"  : result
        });
    });

    test("When omitting setting_id and setting_name in POST request", async () => {

        // 1. mock the data
        const errorMsg = "Please specify either the setting_id OR setting_name";

        prisma.app_Settings.deleteMany = jest.fn().mockRejectedValueOnce(errorMsg);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST'
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message" : errorMsg
        });
    });

});