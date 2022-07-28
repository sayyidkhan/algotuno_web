import handler from "../../../pages/api/settings/add_or_update_settings";
import {App_Settings} from "../../../pages/api/settings/get_all_settings";
import prisma from "../../../config/prisma";
import {createMocks} from "node-mocks-http";


describe("Test add_or_update_settings.ts", () => {

    test("PRISMA DB MOCKING", async () => {
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

    test("Inserting/Updating setting name expecting success", async () => {
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

    test("Mock Error", async () => {
        // 1. mock the data
        const errorMsg = {
            "message" : "mocked error"
        }

        prisma.app_Settings.upsert = jest.fn().mockRejectedValueOnce(errorMsg);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                'setting_name': 'setting_1',
                'setting_value': 'value_1'
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message": errorMsg.message
        });
    });

    test("When using GET instead of POST expecting error", async () => {
        // 1. input api call
        const {req, res} = createMocks({
            method: 'GET'
        });

        // 2. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 3. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message" : `ERROR: ${req.method} method used; this endpoint only accepts POST methods`
        });
    });

    test("When omitting setting_value in POST request expecting error", async () => {
        // 1. mock the data
        const errorMsg = {
            "message" : "Specify the setting_name and setting_value"
        }

        prisma.app_Settings.upsert = jest.fn().mockRejectedValueOnce(errorMsg);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                'setting_name': 'setting_1'
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message": errorMsg.message
        });
    });

    test("When omitting setting_name in POST request expecting error", async () => {
        // 1. mock the data
        const errorMsg = {
            "message" : "Specify the setting_name and setting_value"
        }

        prisma.app_Settings.upsert = jest.fn().mockRejectedValueOnce(errorMsg);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                'setting_value': 'value_1'
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message": errorMsg.message
        });
    });

});