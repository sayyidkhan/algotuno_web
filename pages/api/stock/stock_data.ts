//import {registerBasicUser} from "../auth/[...nextauth]";
import { PrismaClient } from '@prisma/client';

let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }

  prisma = global.prisma
}

export default async (req, res) => {
    let body = {};
    if (req.method === "GET") {
        // body = JSON.stringify({
        //     label : [1,2,3,4,5,6,7],
        //     data : [10, 20, 30, 40, 50, 60, 70]
        // });
        //     {message: "welcome to stock data page"}
        // );
        body = JSON.stringify({message: "welcome to stock data page"});
        res.status(200).json(body);
    }
    else if(req.method === "POST") {
        const tickerSymbol = req.body.ticker_symbol;
        const date = req.body.date;

        if (tickerSymbol === "") {
            res.status(406).json({"message": "ticker symbol cannot be empty"})
        }
        else {
            body = JSON.stringify({
                tickerSymbol : tickerSymbol,
                date : date
            });
            const user = await prisma.user.findUnique({
                where: { "id" : "cl2cx4qji0004s8ul8eigrch9" }
            });
            res.status(200).json({"message": user });
        }





        // try {
        //     const result = await registerBasicUser({ email, username, password });
        //     const successMsg = `Username ${username} Created Successfully`;
        //     console.log(successMsg);
        //     res.status(200).json({ "message" : successMsg });
        // }
        // catch(e) {
        //     const errorMsg = e.message;
        //     console.error(errorMsg);
        //     res.status(406).json({ "message" : errorMsg });
        // }
    }
}