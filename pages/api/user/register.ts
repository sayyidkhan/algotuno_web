import { registerBasicUser } from "../auth/[...nextauth]";


export default async (req, res) => {    
    let body = {};
    if(req.method === "GET") {
        body = JSON.stringify(
            { message: "welcome to register page"}
        );
        res.status(200).json(body);
    }
    else if(req.method === "POST") {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        
        try {
            const result = await registerBasicUser({ email, username, password });
            const successMsg = `Username ${username} Created Successfully`;
            console.log(successMsg);
            res.status(200).json({ "message" : successMsg });
        }
        catch(e) {
            const errorMsg = e.message;
            console.error(errorMsg);
            res.status(406).json({ "message" : errorMsg });
        }
    }
    
}
  