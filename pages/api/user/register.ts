import { registerBasicUser } from "../auth/[...nextauth]";
import {BASE_URL} from '../../../config/db_prod_checker';

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
            const new_user_id = result.id;
            // console.log(`new user id is ${new_user_id}`)

            // add user to free subscription plan
            const update_subscription = await fetch(BASE_URL+`/api/subscription/update_user_subscription`, {
                method : 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "user_id" : new_user_id,
                  "subscription_plan_id" : 1
                })
            });

            const subs_result = await update_subscription.json();
            console.log(subs_result)
            
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
  