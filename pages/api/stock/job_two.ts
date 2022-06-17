import prisma from '../../../config/prisma';
import {BASE_URL} from '../../../config/db_prod_checker';

export default async (req, res) => {

    if (req.method === "POST"){
        
        let ticker_symbol, stock_id;
        const TENSORFLOW_URL = "https://algotunotfjsv3.azurewebsites.net/tfjs_run_model/";
        
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
            const get_tensorflow_prices = await getTensorflowPrices(TENSORFLOW_URL, ticker_symbol, hsp_records);
                        
            let tensorflow_prices = null;

            try {
                tensorflow_prices = await get_tensorflow_prices.json();
            } catch (e) {
                tensorflow_prices = await get_tensorflow_prices.text();
            }

            console.log(tensorflow_prices);

            //3. GET PREDICTION PRICES AND SEND BACK TO PRISMADB
            const update_ml_prices = await fetch(BASE_URL + `/api/stock/update_ml_prices`,
            {
                method  : "POST",
                body    : JSON.stringify(tensorflow_prices.result),
                headers : {'Content-Type' : 'application/json'}   
            });

            let update_results = null;
            try{
                update_results = await update_ml_prices.json();
            } catch (e){
                update_results = await update_ml_prices.text();
            }

            console.log(update_results);
            res.status(200).json({"message":"Success!", "result":update_results});




        }catch(error){
            return
        }      
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }

}

async function getTensorflowPrices(TENSORFLOW_URL: string, ticker_symbol: any, hsp_records) {
    return await fetch(TENSORFLOW_URL,
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

