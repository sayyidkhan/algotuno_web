import {run_api_model} from "../../../components/tensorflow/run_api_model_v4";
import {APPL_PRICE_LATEST} from "../../../components/tensorflow/dummy_dataset/app_price_latest";

export default async (req, res) => {
    /** dummy dataset to use **/
    const backup_stock_metadata_list = APPL_PRICE_LATEST;
    // const _tf_model_dir = 'https://algotunowebstorage.blob.core.windows.net/tfmodels/appl/model.json';
    // const ticker_symbol = "APPL";

    const build_path_url = (ticker_symbol) => `${process.env.NEXT_PUBLIC_AZURE_BLOB_STORAGE_TF_MODELS}${ticker_symbol}/model.json`;


    if (req.method === "POST") {
        let message = "SUCCESS";

        const {ticker_symbol, stock_metadata_list} = req.body;
        let stock_list = stock_metadata_list;

        // will fallback on dummy data when the list is empty
        if (stock_list !== undefined && stock_list.length === 0) {
            stock_list = backup_stock_metadata_list;
        }

        try {
            // tf url path in cloud
            const url_cloud_path = build_path_url(ticker_symbol.toLowerCase());
            console.log(url_cloud_path);
            const prediction_result = await run_api_model(stock_list, url_cloud_path);

            res.status(200).json({
                "message": message,
                "result": {
                    "ticker_symbol": `${ticker_symbol}`,
                    "prediction": prediction_result
                },
            });
        } catch (e) {
            res.status(400).json({
                "message": `ERROR processing forecasting result for ticker_symbol : ${ticker_symbol}`,
                "result": {
                    "ticker_symbol": `${ticker_symbol}`,
                    "prediction": []
                }
            });
        }
    } else {
        res.status(406).json({"message": `ERROR: ${req.method} method used; this endpoint only accepts POST methods`});
    }
}