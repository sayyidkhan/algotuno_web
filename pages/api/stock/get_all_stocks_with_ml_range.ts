import prisma from '../../../config/prisma';

export default async (req, res) => {

    if (req.method === "GET"){

        try{

            const all_stocks = await prisma.stock.findMany({});

            Promise.all(get_hsp_range(all_stocks)).then((values)=>{
                const successMsg = "Retrieved stocks with ML predictions range"
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

        const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        return ticker_symbols.map(async (e)=>{
            const hsp_range = await prisma.mL_Stock_Price.aggregate({
                _max : {Date: true},
                _min : {Date: true},
                where:{stockID : e.stockID}
            })

            let stock = e;
            try{
                const max = hsp_range["_max"]["Date"];
                const min = hsp_range["_min"]["Date"];
                stock['latest_stock_date'] = max.getDate() + "-" + months[max.getMonth()] + "-" + max.getFullYear();
                stock['earliest_stock_date'] = min.getDate() + "-" + months[min.getMonth()] + "-" + min.getFullYear();
            } catch (error){
                console.log(error)
                stock['latest_stock_date'] = "No HSP found"
                stock['earliest_stock_date'] = "No HSP found"
            }
            return stock        
        })
    }


}