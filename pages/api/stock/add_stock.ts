import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "POST"){

        const ticker_symbol = req.body.ticker_symbol;

        if(ticker_symbol){

            const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${ticker_symbol}&lang=en-US&fields=longName`;

            console.log(`Fetching stock details from ${url}`)
            const req_stock_details = await fetch(url);
            const stock_details = await req_stock_details.json();

            if (stock_details["quoteResponse"]["result"].length > 0){

                const query = {
                    "tickerSymbol"  : ticker_symbol,
                    "companyName"   : stock_details["quoteResponse"]["result"][0]["longName"], 
                    "exchange"      : stock_details["quoteResponse"]["result"][0]["fullExchangeName"]
                }

                try {
                    const add_stock_result = await prisma.stock.create({data:query});
                    const successMsg = `Inserted stock ${ticker_symbol}`;
                    console.log(successMsg);
                    res.status(200).json({
                        "message"   : successMsg,
                        "result"    : add_stock_result
                    });
                } catch (error) {
                    const errorMsg = error.message;
                    console.error(errorMsg)
                    res.status(406).json({"message" : errorMsg});
                }
  
            } else {
                console.log("Ticker Symbol not found in Yahoo Finance API.")
                res.status(406).json({
                    "message" : "Ticker Symbol not found in Yahoo Finance API.",
                    "result"  : ""
                })
            }

        } else{
            console.log(`Specify ticker_symbol`)
            res.status(406).json({
                "message": `Specify ticker_symbol`
            });
        }
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
    

}