import {App_Settings} from "../../../pages/api/settings/get_all_settings";
import prisma from "../../../config/prisma";
import handler from "../../../pages/api/settings/get_all_settings";
import {createMocks} from "node-mocks-http";


describe("Test get_all_settings.ts", () => {

    test("PRISMA DB MOCKING", async () => {
        const settingsList: App_Settings[] = [{
            settingID: 1,
            settingName: "setting_1",
            settingValue: "setting_value_1",
        }];

        prisma.app_Settings.findMany = jest.fn().mockReturnValueOnce(settingsList);

        const result = await prisma.app_Settings.findMany();
        console.log(result);
        expect(result).toBeDefined();
    });

    test("When getting all settings passes", async () => {
        // 1. mock the data
        const settingsList: App_Settings[] = [{
            settingID: 1,
            settingName: "setting_1",
            settingValue: "setting_value_1",
        }];

        prisma.app_Settings.findMany = jest.fn().mockReturnValueOnce(settingsList);

        // 2. input api call
        const {req, res} = createMocks({method: 'GET'});

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output.result).toEqual(settingsList);
    });

    test("When getting all settings fails with error code P2025", async () => {
        // 1. mocking the data
        const errorMsg = {
            "code": "P2025"
        };

        prisma.app_Settings.findMany = jest.fn().mockRejectedValueOnce(errorMsg);

        // 2. input api call
        const {req, res} = createMocks({method: 'GET'});

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({"message": `Failed to find settings; record not found`});
    });

    test("When getting all settings fails with generic error", async () => {
        // 1. mocking the data
        const errorMsg = {
            "code": "",
            "message": "mocked error"
        };

        prisma.app_Settings.findMany = jest.fn().mockRejectedValueOnce(errorMsg);

        // 2. input api call
        const {req, res} = createMocks({method: 'GET'});

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({"message": errorMsg.message});
    });

    /*** test invalid endpoint ***/
    test("When using POST instead of GET", async () => {
        // 1. input api call
        const {req, res} = createMocks({method: 'POST'});

        // 2. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 3. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({"message": `ERROR: ${req.method} method used; this endpoint only accepts GET methods`});
    });

});