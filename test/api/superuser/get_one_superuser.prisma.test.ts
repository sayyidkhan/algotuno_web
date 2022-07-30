import handler from "../../../pages/api/superuser/get_one_superuser";
import prisma from "../../../config/prisma";
import {createMocks} from "node-mocks-http";

describe("Test get_one_superuser.ts.ts", () => {

    test("When getting one superusers passes", async () => {
        // 1. mock the data
        const app_result = {
            "message": "Found 3 superusers",
            "result": [
                {
                    "superuserID": 9,
                    "userID": "cl4b3657j000409jnig9yqzsu"
                },
                {
                    "superuserID": 17,
                    "userID": "cl53o3lkr000409mk6q3vyqxg"
                },
                {
                    "superuserID": 18,
                    "userID": "cl5tp104t00065su9mkayhmrr"
                }
            ]
        }

        prisma.superuser.findMany = jest.fn().mockReturnValueOnce(app_result);

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
        expect(res_output.result).toEqual(app_result);
    });

   
});