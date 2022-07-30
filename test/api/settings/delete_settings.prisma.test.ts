import {App_Settings} from "../../../pages/api/settings/get_all_settings";
import prisma from "../../../config/prisma";
import handler from "../../../pages/api/settings/delete_settings";
import {createMocks} from "node-mocks-http";

describe("Test delete_settings.ts", () =>{

    test("Deleting with setting_id expecting success", async () => {

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
                'setting_id': 1
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message" : `Deleted setting 1`,
            "result"  : app_result
        });
    });

    test("Deleting with setting_name expecting success", async () => {

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

    test("Deleting with setting_id as non-integer input expecting error", async () => {

        const setting_id = "asfas";

        // 1. mock the data
        const errorMsg = {
            "message" : "setting_id must be int, not string"
        };

        prisma.app_Settings.delete = jest.fn().mockRejectedValueOnce(errorMsg);

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
            "message" : "setting_id must be int, not string"
        });
    });

    test("Deleting with invalid setting_id expecting P2025 error", async () => {

        const setting_id = 12345;

        // 1. mock the data
        const errorMsg = {
            "code"   : "P2025",
            "message": "Failed to delete setting; record not found"
        };

        prisma.app_Settings.delete = jest.fn().mockRejectedValueOnce(errorMsg);

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



    test("Deleting with invalid setting_id expecting generic error", async () => {

        const setting_id = 12345;

        // 1. mock the data
        const errorMsg = {
            "message": "mock error"
        };

        prisma.app_Settings.delete = jest.fn().mockRejectedValueOnce(errorMsg);

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
            "message": "mock error"
        });
    });

    test("When omitting setting_id and setting_name in POST request expecting error", async () => {

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


});