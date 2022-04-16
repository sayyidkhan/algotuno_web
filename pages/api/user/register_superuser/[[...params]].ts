import { loginUser, registerBasicUser } from "../../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// check existing record validation
async function validateUser(criteria, value) {
    const user = await prisma.user.findUnique({
        where: { [criteria]: value }
    });
    return user;
}


export default async (req, res) => {
    let body = {};

    if (req.method === "GET") {
        const { username , email } = req.query;
        if (username) {
            const user = await validateUser("username", username);
            if (user) {
                body = JSON.stringify({ message: "Username exist! please choose another username." });
            }
            else {
                body = JSON.stringify({ message: "Username not exist in database!" });
            }
        }
        else if (email) {
            const user = await validateUser("email", email);
            if (user) {
                body = JSON.stringify({ message: "Email exist! please choose another email." });
            }
            else {
                body = JSON.stringify({ message: "Email not exist in database!" });
            }
        }
        else {
            body = JSON.stringify({ message: "welcome to the secret superuser page" });
        }
        res.status(200).json(body);
    }
    else if (req.method === "POST") {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        try {
            const result = await registerBasicUser({ email, username, password });
            const successMsg = `Username ${result.username} is now a superuser!`;
            console.log(successMsg);
            res.status(200).json({ "message": successMsg });
        }
        catch (e) {
            const errorMsg = e.message;
            console.error(errorMsg);
            res.status(406).json({ "message": errorMsg });
        }
    }

}
