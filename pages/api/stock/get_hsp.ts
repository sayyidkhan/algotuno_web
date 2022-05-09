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

    if (req.method === "POST"){

        // check if ticker symbol exists in body
        if(!req.body.ticker_symbol){
            const errorMsg = "ticker_symbol Null or undefined";
            console.error(errorMsg);
            res.status(406).json({"message" : errorMsg});
            return
        }

        var ticker_symbol, stock_id;
        var hsp_start_date, hsp_end_date;
        var sort = "asc";

        try{

            // check if ticker symbol exists in Stock database
            ticker_symbol = req.body.ticker_symbol;

            const stock_record = await prisma.stock.findFirst({
                where: {
                    tickerSymbol : ticker_symbol
                }
            });

            if (stock_record.length != 0) {
                // return the corresponding stockID
                stock_id = stock_record.stockID;
            } else {
                console.log(`Stock ${ticker_symbol} does not exist`)
                return res.status(406).json({
                    "message" : `Stock ${ticker_symbol} does not exist`
                });
            }

            hsp_start_date = new Date(req.body.start_date);
            hsp_end_date   = new Date(req.body.end_date);

            // check if sort type (asc/desc) is specified
            if(req.body.sort) {
                sort = req.body.sort.toLowerCase();
                if(sort == "desc" || sort == "asc"){
                    //pass
                } else {
                    sort = "asc";
                    console.log("Invalid sort type specified, results will be sorted based on ASC order");
                }
            } else {
                //pass 
            }

            var successMsg, all_records;

            // both start and end dates invalid / not specified
            if(isNaN(hsp_start_date) && isNaN(hsp_end_date)){
                console.log("Start and end dates invalid");
                all_records = await prisma.historical_Stock_Price.findMany({
                    where:{
                        stockID : stock_id
                    },
                    orderBy: {
                        Date : sort
                    }
                });
            } else if (isNaN(hsp_end_date)){
                // only start date is valid; get all records newer than start date
                console.log("End dates invalid");
                all_records = await prisma.historical_Stock_Price.findMany({
                    where:{
                        stockID : stock_id,
                        Date : {
                            gte: hsp_start_date
                        }
                    },
                    orderBy: {
                        Date : sort
                    }
                });
            } else if (isNaN(hsp_start_date)){
                // only end date is valid
                console.log("Start dates invalid");
                all_records = await prisma.historical_Stock_Price.findMany({
                    where:{
                        stockID : stock_id,
                        Date : {
                            lte: hsp_end_date
                        }
                    },
                    orderBy: {
                        Date : sort
                    }
                });
            } else {
                //both start and end dates are valid
                console.log("Start and end dates valid");
                all_records = await prisma.historical_Stock_Price.findMany({
                    where:{
                        stockID : stock_id,
                        Date : {
                            gte: hsp_start_date,
                            lte: hsp_end_date
                        }
                    },
                    orderBy: {
                        Date : sort
                    }
                });
            }

            successMsg = `Found ${all_records.length} records for ${ticker_symbol}`;
            console.log(successMsg);
            res.status(200).json({
                "message" : successMsg,
                "results" : all_records
            });

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
        }
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}