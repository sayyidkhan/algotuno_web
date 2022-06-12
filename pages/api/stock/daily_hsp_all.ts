import {BASE_URL} from '../../../config/db_prod_checker';

export default async (req, res) => {

    if (req.method === "GET"){

        const result = await fetch(BASE_URL+'/api/stock/get_all_stocks');
        let content = await result.json();

        let ticker_symbols = [];

        if (content.result !== null || content.result !== undefined){
            if (content.result.length > 0){
                ticker_symbols = content.result.map(e=>e.tickerSymbol);

            } else {
                return []
            }
        } else {
            return []
        }

        // uses Promise.all to wait for all the Promises
        // returned by updatePrices to resolve 
        // before returning status 200
        Promise.all(updatePrices(ticker_symbols)).then(
            (values)=>{
                console.log(values);
                res.status(200).json(values);
            }).catch((err)=>res.status(406).json(err));

    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts GET methods`});
    }
    

    function updatePrices(ticker_symbols: any[]) {

        return ticker_symbols.map(async (e) => {
            const response = await fetch(BASE_URL + `/api/stock/daily_hsp`,
                {
                    method: "POST",
                    body:   JSON.stringify({ "ticker_symbol": e }),
                            headers: {
                                'Content-Type': 'application/json'
                }
            });

            return response.json();

        });
    }
}