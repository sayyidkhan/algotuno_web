import handler from "../../../pages/api/superuser/add_superuser";
import prisma from "../../../config/prisma";
import {createMocks} from "node-mocks-http";

describe("Test add_or_update_settings.ts", () => {

    test("Add Superuser with valid username expecting success", async () => {
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
        prisma.superuser.create = jest.fn().mockReturnValueOnce(result);

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
            "message"   : `Added ${input_username} to Superuser`,
            "result"    : result
        });
    });

    test("Add Superuser with invalid username input expecting error", async () => {
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

    test("Add Superuser with valid username input but Superuser already exists expecting P2002 error", async () => {
        // 1. mock the data
        const input_username = "user1"
        const superuserID = 1;

        const user_result = {
            "id" : superuserID
        }

        const error = {
            "code" : "P2002"
        }

        prisma.user.findFirst = jest.fn().mockReturnValueOnce(user_result);
        prisma.superuser.create = jest.fn().mockRejectedValueOnce(error);

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
            "message":`Failed to add ${input_username} to Superuser; ${input_username} is already a Superuser`
        });
    });

    test("Add Superuser with valid username input but Superuser already exists expecting generic error", async () => {
        // 1. mock the data
        const input_username = "user1"
        const superuserID = 1;

        const user_result = {
            "id" : superuserID
        }

        const error = {
            "code" : "P200212345",
            "message" : "mock error"
        }

        prisma.user.findFirst = jest.fn().mockReturnValueOnce(user_result);
        prisma.superuser.create = jest.fn().mockRejectedValueOnce(error);

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
        const {req, res} = createMocks({method: 'POST'});

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
        const {req, res} = createMocks({method: 'GET'});

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