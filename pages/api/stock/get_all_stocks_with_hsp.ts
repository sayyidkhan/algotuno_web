import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "GET"){

        try{

            const all_stocks = await prisma.stock.findMany({});

            Promise.all(get_hsp_range(all_stocks)).then((values)=>{
                console.log(values);
                const successMsg = "yes"
                console.log(successMsg);
                res.status(200).json({
                  "message" : successMsg,
                  "result"  : values 
                });
            })

        } catch (error) {
            const errorMsg = error.message;
            console.error(errorMsg)
            res.status(406).json({"message" : errorMsg});
        }
       
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts GET methods`});
    }
    
    function get_hsp_range(ticker_symbols:any[]){
        return ticker_symbols.map(async (e)=>{
            const hsp_range = await prisma.historical_Stock_Price.aggregate({
                _max : {Date: true},
                _min : {Date: true},
                where:{stockID : e.stockID}
            })

            let stock = e;
            stock['latest_stock_date'] = hsp_range["_max"]["Date"];
            stock['earliest_stock_date'] = hsp_range["_min"]["Date"];

            return stock        
        })
    }


}