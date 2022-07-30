import handler from "../../../pages/api/superuser/delete_superuser";
import prisma from "../../../config/prisma";
import {createMocks} from "node-mocks-http";

describe("Test delete_superuser.ts", () => {

    test("Delete Superuser with valid username expecting success", async () => {
        // 1. mock the data
        const input_username = "user1"
        const superuserID = 1;

        const user_result = {
            "id" : superuserID
        }

        const result = {
            "superuserID" : superuserID,
            "userID"      : "userID1"
        }

        prisma.user.findFirst = jest.fn().mockReturnValueOnce(user_result);
        prisma.superuser.delete = jest.fn().mockReturnValueOnce(result);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                "username" : "user1"
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(200);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message"   : `Deleted ${input_username} from Superuser`,
            "result"    : result
        });
    });


    test("Delete Superuser with invalid username input expecting error", async () => {
        // 1. mock the data
        const input_username = "user1"

        prisma.user.findFirst = jest.fn().mockReturnValueOnce(null);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                "username" : "user1"
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message": `User ${input_username} does not exist`
        });
    
    });

    test("Delete Superuser with valid username but user is not a Superuser expecting P2025 error", async () => {
        // 1. mock the data
        const input_username = "user1"
        const superuserID = 1;

        const user_result = {
            "id" : superuserID
        }

        const error = {
            "code" : "P2025"
        }

        prisma.user.findFirst = jest.fn().mockReturnValueOnce(user_result);
        prisma.superuser.delete = jest.fn().mockRejectedValueOnce(error);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                "username" : "user1"
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message":`Failed to delete ${input_username} from Superuser; ${input_username} is not a Superuser`
        });
    });

    test("Delete Superuser with valid username but expecting generic error", async () => {
        // 1. mock the data
        const input_username = "user1"
        const superuserID = 1;

        const user_result = {
            "id" : superuserID
        }

        const error = {
            "code" : "P2025123456",
            "message" : "mock error"
        }

        prisma.user.findFirst = jest.fn().mockReturnValueOnce(user_result);
        prisma.superuser.delete = jest.fn().mockRejectedValueOnce(error);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                "username" : "user1"
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message" : "mock error"
        });
    });

    test("When omitting username in POST request expecting error", async () => {

        // 1. mock the data
        const errorMsg = "username Null or undefined";

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

    test("Other error", async () => {
        // 1. mock the data
        const input_username = "user1"

        const errorMsg = {
            "message": `User ${input_username} does not exist`
        }

        prisma.user.findFirst = jest.fn().mockRejectedValueOnce(errorMsg);

        // 2. input api call
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                "username" : "user1"
            }
        });

        // 3. call the api
        await handler(req, res);
        expect(res._getStatusCode()).toBe(406);

        // 4. verify its output
        const res_output = JSON.parse(res._getData());
        console.log(res_output);
        expect(res_output).toEqual({
            "message": `User ${input_username} does not exist`
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