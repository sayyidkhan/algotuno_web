import {App_Settings} from "../../../pages/api/settings/get_all_settings";
import prisma from "../../../config/prisma";
import handler from "../../../pages/api/settings/get_all_settings";
import {createMocks} from "node-mocks-http";


describe("test get_all_settings.ts", () => {

    test("TEST PRISMA DB MOCKING", async () => {
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

    test("TEST HAPPY SCENARIO (PLS RENAME THIS)", async () => {
        // 1. mock the data
        const settingsList: App_Settings[] = [{
            settingID: 1,
            settingName: "setting_1",
            settingValue: "setting_value_1",
        }];

        prisma.app_Settings.findMany = jest.fn().mockReturnValueOnce(settingsList);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'GET',
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output.result).toEqual(settingsList);
    });

    test("TEST NOT HAPPY SCENARIO (TYPE-1) (PLS RENAME THIS)", async () => {
        // 1. mocking the data
        const errorMsg = {
            "code": "P2025"
        };

        prisma.app_Settings.findMany = jest.fn().mockRejectedValueOnce(errorMsg);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'GET',
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({"message": `Failed to find settings; record not found`});
    });

    test("TEST NOT HAPPY SCENARIO (TYPE-2) (PLS RENAME THIS)", async () => {
        // 1. mocking the data
        const errorMsg = {
            "code": "",
            "message": "mocked error"
        };

        prisma.app_Settings.findMany = jest.fn().mockRejectedValueOnce(errorMsg);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'GET',
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({"message": errorMsg.message});
    });

    /*** test invalid endpoint ***/
    test("TEST NOT HAPPY SCENARIO (TYPE-3) (PLS RENAME THIS)", async () => {
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