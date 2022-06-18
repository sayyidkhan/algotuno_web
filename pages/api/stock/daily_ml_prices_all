import prisma from '../../../config/prisma';
import {BASE_URL} from '../../../config/db_prod_checker';

const TENSORFLOW_URL = "https://algotunotfjsv3.azurewebsites.net/tfjs_run_model/";
const SCITKITLEARN_URL = "https://q6p47mowxp5fy2dkeh6cvg6dwi0dykpt.lambda-url.us-east-1.on.aws/"

export default async (req, res) => {

    if (req.method === "GET"){
        
        const result = await fetch(BASE_URL+'/api/stock/get_all_stocks');
        let content = await result.json();

        let all_stocks = [];

        if (content.result !== null || content.result !== undefined){
            if (content.result.length > 0){
                all_stocks = content.result;

            } else {
                return []
            }
        } else {
            return []
        }
        
        Promise.all(getAndUpdatePrices(all_stocks)).then(
            (values)=>{
                console.log(values);
                res.status(200).json({"message":"Finished updating daily ML prices.", "result": values});
        }).catch((err)=>res.status(406).json(err));


    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts GET methods`});
    }

    async function updateDBPrices(ML_prices: any) {
        return await fetch(BASE_URL + `/api/stock/update_ml_prices`,
            {
                method: "POST",
                body: JSON.stringify(ML_prices.result),
                headers: { 'Content-Type': 'application/json' }
            });
    }

    async function getMLPrices(ML_API_URL: string, ticker_symbol: string, hsp_records) {
        return await fetch(ML_API_URL,
            {
                method: "POST",
                body: JSON.stringify({
                    "ticker_symbol": ticker_symbol,
                    "stock_metadata_list": hsp_records
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
    }

    function getAndUpdatePrices(stocks:any[]){
        return stocks.map(async(e)=>{

            const ts = e.tickerSymbol;
            const id = e.stockID;
            
            const hsp_records = await prisma.historical_Stock_Price.findMany({
                where: {
                    stockID: id
                }
            });
    
            console.log(`Found ${hsp_records.length} records for ${ts}.`);
    
            //2. SEND TO BACKEND AI WEBSERVICE
            console.log(`Getting Tensorflow prices for ${ts}.`);
            const get_tensorflow_prices = await getMLPrices(TENSORFLOW_URL, ts, hsp_records);
            console.log(`Getting Scitkitlearn prices for ${ts}.`);
            const get_scikitlearn_prices = await getMLPrices(SCITKITLEARN_URL, ts, hsp_records);
    
            const tensorflow_prices = await get_tensorflow_prices.json();
            console.log(tensorflow_prices);
    
            const scikitlearn_prices = await get_scikitlearn_prices.json();
            console.log(scikitlearn_prices);
    
            //3. GET PREDICTION PRICES AND SEND BACK TO PRISMADB
            const update_tsfl_prices = await updateDBPrices(tensorflow_prices);
            const update_skl_prices = await updateDBPrices(scikitlearn_prices);
    
            const tsflw_results = await update_tsfl_prices.json();
            const skl_results = await update_skl_prices.json();
    
            const final_res = [tsflw_results, skl_results];
            return final_res;

        });

        
    
    }
    
    
}