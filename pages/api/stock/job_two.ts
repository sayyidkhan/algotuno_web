// import prisma from '../../../config/prisma';

// export default async (req, res) => {

//     if (req.method === "POST"){
        
//         let ticker_symbol, stock_id;
        
//         // check if ticker symbol exists in body
//         if(!req.body.ticker_symbol){
//             const errorMsg = "ticker_symbol Null or undefined";
//             console.error(errorMsg);
//             res.status(406).json({"message" : errorMsg});
//             return
//         }

//         // check if ticker symbol exists in Stock database
//         try{
//             ticker_symbol = req.body.ticker_symbol;
                       
//             const stock_record = await prisma.stock.findFirst({
//                 where:{
//                     tickerSymbol : ticker_symbol
//                 }
//             })
            
//             if (stock_record) {
//                 // return the corresponding stockID
//                 stock_id = stock_record.stockID;
//             } else {
//                 console.log(`Stock ${ticker_symbol} does not exist`)
//                 return res.status(406).json({
//                     "message" : `Stock ${ticker_symbol} does not exist`
//                 });
//             } 


//             const hsp_records = await prisma.historical_Stock_Price.findMany({
//                 where: {
//                     stockID : stock_id
//                 }
//             });

//             //2. SEND TO BACKEND AI WEBSERVICE
//             //3. RUN MODELS TO PREDICT PRICES
//             //4. GET PREDICTION PRICES AND SEND BACK TO PRISMADB


//         }catch(error){
//             return
//         }      
//     } else {
//         res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
//     }
    

// }
