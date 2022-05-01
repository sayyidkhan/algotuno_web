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

        // convert ticker symbol to stockID
        // const ticker_symbol = req.body.ticker_symbol;
        const data_stockid = req.body.stockID;
        const data_date = new Date("2002-02-03")
        const stock_open = 10.0;
        const stock_high = 12.0;
        const stock_low = 9.0;
        const stock_close = 11.0;
        const stock_volume = 50; 

        async function add_shp_one (stockID, date, open, high, low, close, volume) {
            const query = {
                "stockID"   : stockID,
                "Date"      : date,
                "Open"      : open,
                "High"      : high, 
                "Low"       : low,
                "Close"     : close,
                "Volume"    : volume
            }

            const _add = await prisma.historical_Stock_Price.create({data:query});
            return _add;
        }

        try{
            const result = await add_shp_one(data_stockid, data_date, stock_open, stock_high, stock_low, stock_close, stock_volume);
            const successMsg = `Stock for ${data_stockid} on ${data_date} added successfully`;
            console.log(successMsg);
            res.status(200).json({"message" : successMsg});

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
        }
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}