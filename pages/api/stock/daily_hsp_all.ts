import prisma from '../../../config/prisma';
import {BASE_URL} from '../../../config/db_prod_checker';
import { json } from 'stream/consumers';
import { makeStyles } from '@mui/material';


export default async (req, res) => {

    if (req.method === "GET"){

        const result = await fetch(BASE_URL+'/api/stock/get_all_stocks');
        const content = await result.json();

        let ticker_symbols = [];

        if (content.result !== null || content.result !== undefined){
            if (content.result.length > 0){
                ticker_symbols = content.result.map(e=>e.tickerSymbol);
                //return ticker_symbols;

            } else {
                return []
            }
        } else {
            return []
        }

        let status = true;
        ticker_symbols.forEach(async e=>{
            const call_api = await fetch(BASE_URL+`/api/stock/daily_hsp`,
                {
                    method:"POST", 
                    body:JSON.stringify({"ticker_symbol":e}),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                });
            console.log(await call_api.json());
        });
        
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts GET methods`});
    }
    

}