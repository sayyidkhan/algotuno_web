import {BASE_URL} from '../../../config/db_prod_checker';
import {authorization_check} from '../../../config/auth_check'


export default async (req, res) => {

    let result_message = [];

    if (req.method === "GET"){

        if (authorization_check(req.headers.authorization)) {

            const date_time_now = new Date().toLocaleString("en-US", {
                timeZone: 'Asia/Singapore',
            });
            console.log(date_time_now);
        } else {
            return res.status(400).json({
                "message": `Not authorised`,
            });
        }


        const result = await fetch(BASE_URL+'/api/stock/get_all_stocks');
        let content = await result.json();

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
            let msg = await call_api.json();
            result_message.push(msg);
        });
        
        return res.status(200).json({"message" : "Completed running the script.", "result" : result_message});
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts GET methods`});
    }
    

}