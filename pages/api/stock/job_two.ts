import prisma from '../../../config/prisma';
import {BASE_URL} from '../../../config/db_prod_checker';

const TENSORFLOW_URL = "https://algotunotfjsv3.azurewebsites.net/tfjs_run_model/";
const SCITKITLEARN_URL = "https://q6p47mowxp5fy2dkeh6cvg6dwi0dykpt.lambda-url.us-east-1.on.aws/"

export default async (req, res) => {

    if (req.method === "POST"){
        
        let ticker_symbol, stock_id;
        
        // check if ticker symbol exists in body
        if(!req.body.ticker_symbol){
            const errorMsg = "ticker_symbol Null or undefined";
            console.error(errorMsg);
            res.status(406).json({"message" : errorMsg});
            return
        }

        // check if ticker symbol exists in Stock database
        try{
            ticker_symbol = req.body.ticker_symbol;
                       
            const stock_record = await prisma.stock.findFirst({
                where:{
                    tickerSymbol : ticker_symbol
                }
            })
            
            if (stock_record) {
                // return the corresponding stockID
                stock_id = stock_record.stockID;
            } else {
                console.log(`Stock ${ticker_symbol} does not exist`)
                return res.status(406).json({
                    "message" : `Stock ${ticker_symbol} does not exist`
                });
            } 

            const hsp_records = await prisma.historical_Stock_Price.findMany({
                where: {
                    stockID : stock_id
                }
            });
            console.log(`Found ${hsp_records.length} records for ${ticker_symbol}.`)

            //2. SEND TO BACKEND AI WEBSERVICE
            console.log(`Getting Tensorflow prices for ${ticker_symbol}.`)
            const get_tensorflow_prices = await getMLPrices(TENSORFLOW_URL, ticker_symbol, hsp_records);
            console.log(`Getting Scitkitlearn prices for ${ticker_symbol}.`)            
            const get_scikitlearn_prices = await getMLPrices(SCITKITLEARN_URL, ticker_symbol, hsp_records);
            
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

            console.log(final_res);
            res.status(200).json({"message":"Success!", "result":final_res});




        }catch(error){
            return
        }      
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
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
}



