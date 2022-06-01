import * as tf from "@tensorflow/tfjs-node";
import {forecast, get_stock_data, predict} from "./toolsets/core_ai_v4";


async function run_api_model(stock_data, _tf_model_dir) {
    /**
     * stock_data -> the stock data object in list format
     * model dir -> the url coming from microsoft azure or local storage
     **/

    /*** variables ***/
    const no_of_trading_days_in_a_year = 260; // no of trading days in a year
    const no_of_trading_days_in_a_year_multiplier = 2; // no of years / batches to cover
    const days_range = 5; // the number of days range to compute in


    /*** program logic ***/
    let stock_dataset = get_stock_data(
        stock_data,
        no_of_trading_days_in_a_year,
        days_range,
        no_of_trading_days_in_a_year_multiplier
    );

    /*** run model ***/
        // 2. load the neural network model
    const sample_model = tf.loadLayersModel(_tf_model_dir);

    // 3. train the model
    const predict_result = sample_model
        .then((_model) => {
            try {
                console.log("successfully loaded model");
                console.log(_model.summary());
                return _model;
            } catch (e) {
                console.log("unable to load model");
                console.log(e);
            }
        })
        .then(async (_model) => {
            // validation dataset results
            console.log("perform prediction");
            const validation_data_result = await predict(
                _model,
                stock_dataset.validation.tensor_xs_list,
                stock_dataset.validation.raw_ys_list
            );
            // testing dataset results
            console.log("perform forecasting");
            const result = await forecast(
                30,
                _model,
                stock_dataset.testing.raw_xs_list,
                stock_dataset.testing.raw_ys_list
            );
            // array format
            let day1 = result.output_ys_list[0]; // day 1
            let day7 = result.output_ys_list[6]; // day 7
            let day30 = result.output_ys_list[29]; // day 30
            function _convert_array_to_obj(_day_array) {
                const _obj = {};
                _obj[_day_array[1].toISOString()] = _day_array[0];
                return _obj;
            }

            // obj format
            day1 = _convert_array_to_obj(day1);
            day7 = _convert_array_to_obj(day7);
            day30 = _convert_array_to_obj(day30);

            // 3 days prediction
            return [day1, day7, day30];
        });

    return predict_result;
}

export {
    run_api_model
}