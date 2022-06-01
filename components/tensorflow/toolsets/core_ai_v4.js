import * as tf from "@tensorflow/tfjs-node";
import {next_day} from "./date_util.js";

import lodash from 'lodash';

const {cloneDeep} = lodash;

const prep_stock_data = (_array_list) => {
    const extract_data = (_data) => {
        return _data.map(obj => {
            return {
                'Date': obj.Date,
                'Epoch': new Date(obj.Date).getTime(),
                'Close': parseFloat(parseFloat(obj.Close).toFixed(2)),
            };
        });

    };

    const convert_to_tensor_input_data = (_data) => {
        return _data.map(obj => {
            return [
                //price,
                obj['Close'],
                //date,
                obj['Date'],
            ]
        });
    };

    return convert_to_tensor_input_data(extract_data(_array_list));
}

function chunk(arr, chunkSize) {
    if (chunkSize <= 0) throw "Invalid chunk size";
    const R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize)
        R.push(arr.slice(i, i + chunkSize));
    return R;
}


const segregate_training_and_labelled_dataset = (_dataset, _days_range) => {
    const xs_list = [];
    const ys_list = [];

    const chunkSize = _days_range;
    const processed_list = chunk(_dataset, chunkSize);
    processed_list.forEach((e, index) => {
        // labelled data
        const labelled_data = e.pop();
        ys_list.push(labelled_data);
        // input data
        xs_list.push(e);
    });

    return {
        "raw_xs_list": xs_list,
        "raw_ys_list": ys_list,
    }
};

const truncate_historical_data = (_stock_data, _trading_days_for_the_year) => {
    const no_of_batches = Math.floor(_stock_data.length / _trading_days_for_the_year); // it could mean the no of years
    const total_stock_count = no_of_batches * _trading_days_for_the_year;
    return _stock_data.slice(-total_stock_count);
};


function add_next_day_slot_to_stock_data(_stock_data) {
    let most_recent_date = _stock_data.slice(-1)[0];
    most_recent_date = {...most_recent_date}; // deep clone
    most_recent_date['Date'] = next_day(most_recent_date['Date']); // assign the next day
    _stock_data.push(most_recent_date);
    _stock_data.shift(); // remove the oldest date to balance the entire list
    return _stock_data;
}

function get_stock_data(_stock_data, _trading_days_for_the_year, _days_range, _days_range_multiplier) {
    /**
     *  takes in the stock data and prepares the data in structure that the ML model can consume the data
     */




    const last_index = _stock_data.length - 1;
    const last_index_for_training_dataset = last_index - _trading_days_for_the_year;
    const start_index_for_training_dataset = last_index_for_training_dataset - (_trading_days_for_the_year * _days_range_multiplier);

    /**
     * data preparation
     *
     * 1. need to insert an empty list at the end of the list
     * 2. need to remove the first item from the list to balance back the entire list so the record will be balanced
     * **/
    // remove last item
    _stock_data = add_next_day_slot_to_stock_data(_stock_data);

    /** the raw validation dataset **/
    let validation_dataset = prep_stock_data(_stock_data).slice(-_trading_days_for_the_year);
    let raw_validation_dataset = segregate_training_and_labelled_dataset(validation_dataset, _days_range);
    /** the raw testing dataset **/
    let test_raw_xs_list = [raw_validation_dataset.raw_xs_list.pop()];
    let test_raw_ys_list = [raw_validation_dataset.raw_ys_list.pop()];
    /** the raw training dataset **/
    let training_dataset = prep_stock_data(_stock_data).slice(start_index_for_training_dataset, last_index_for_training_dataset);
    let raw_training_dataset = segregate_training_and_labelled_dataset(training_dataset, _days_range);

    /** convert to tensorflow object here **/

        // validation dataset
    const prep_tensor_validation_xs_list = raw_validation_dataset.raw_xs_list.map(_sub_list => _sub_list.map(el => el[0]));
    const prep_tensor_validation_ys_list = raw_validation_dataset.raw_ys_list.map(_sub_list => [_sub_list[0]]);
    let tensor_validation_xs_list = tf.tidy(() => tf.tensor2d(prep_tensor_validation_xs_list));
    let tensor_validation_ys_list = tf.tidy(() => tf.tensor2d(prep_tensor_validation_ys_list));
    // testing dataset
    const prep_tensor_testing_xs_list = test_raw_xs_list.map(_sub_list => _sub_list.map(el => el[0]));
    const prep_tensor_testing_ys_list = test_raw_ys_list.map(_sub_list => [_sub_list[0]]);
    let tensor_testing_xs_list = tf.tidy(() => tf.tensor2d(prep_tensor_testing_xs_list));
    let tensor_testing_ys_list = tf.tidy(() => tf.tensor2d(prep_tensor_testing_ys_list));
    // testing dataset
    const prep_tensor_training_xs_list = raw_training_dataset.raw_xs_list.map(_sub_list => _sub_list.map(el => el[0]));
    const prep_tensor_training_ys_list = raw_training_dataset.raw_ys_list.map(_sub_list => [_sub_list[0]]);
    let tensor_training_xs_list = tf.tidy(() => tf.tensor2d(prep_tensor_training_xs_list));
    let tensor_training_ys_list = tf.tidy(() => tf.tensor2d(prep_tensor_training_ys_list));

    return {
        "validation": {
            "raw_xs_list": raw_validation_dataset.raw_xs_list,
            "raw_ys_list": raw_validation_dataset.raw_ys_list,
            "tensor_xs_list": tensor_validation_xs_list,
            "tensor_ys_list": tensor_validation_ys_list,
        },
        "testing": {
            "raw_xs_list": test_raw_xs_list,
            "raw_ys_list": test_raw_ys_list,
            "tensor_xs_list": tensor_testing_xs_list,
            "tensor_ys_list": tensor_testing_ys_list,
        },
        "training": {
            "raw_xs_list": raw_training_dataset.raw_ys_list,
            "raw_ys_list": raw_training_dataset.raw_ys_list,
            "tensor_xs_list": tensor_training_xs_list,
            "tensor_ys_list": tensor_training_ys_list,
        }
    }
}

const nn_model = (training_data, labelled_data) => tf.tidy(() => {
    /**
     *
     * the machine learning model and configuration to machine learn the markets
     */
    const model = tf.sequential();
    model.add(
        tf.layers.inputLayer({
            inputShape: [training_data.shape[1]],
            //@ts-ignore
            units: training_data.size,
        })
    );
    model.add(
        tf.layers.dense({
            units: (training_data.size * 2),
            activation: 'relu'
        })
    );
    model.add(
        tf.layers.dense({
            units: (training_data.size * 1),
            activation: "elu",
        })
    );
    model.add(tf.layers.dense({
        units: labelled_data.shape[1],
        // here the input shape is "inferred from the previous shape"
        activation: 'linear',
    }));


    const ALPHA = 0.00001;
    model.compile({optimizer: tf.train.adam(ALPHA), loss: "meanSquaredError"});
    return model;
});

async function train(xs, ys, iterations, _model, print_training_log) {
    /**
     *
     * used to train the model with the training dataset
     */
    const loss_output = [];
    const config = {epochs: 1, verbose: print_training_log === true ? 1 : 0};
    for (let i = 0; i < iterations; i++) {
        const response = await _model.fit(xs, ys, config);
        const epochs_output = {"epoch": ((i + 1) * config.epochs), "loss": response.history.loss[0]};
        loss_output.push(epochs_output);
        // display error loss
        if (print_training_log === true) {
            console.log(epochs_output);
        }
    }

    return {
        "loss_output": loss_output
    }
}

async function predict(_model, _training_data, _labelled_data) {
    /**
     * use to verify the dataset against the validation dataset
     * to verify the accuracy of the dataset
     * **/
    const _prediction = await _model.predict(_training_data);
    let _predict = _prediction.arraySync().map(x => x[0]);


    function merge_dates_from_original_dataset(_original_dataset, _predicted_data) {
        return _predicted_data.map((element, index) => [element, new Date(_original_dataset[index][1])]);
    }

    _predict = merge_dates_from_original_dataset(_labelled_data, _predict);
    return _predict;
}

async function predict_type2(_model, _training_data, _labelled_data) {
    const _prediction = await _model.predict(_training_data);
    let _predict = _prediction.arraySync().map(x => x[0]);

    const latest_price = _predict.slice(-1)[0];
    const latest_date = _labelled_data[1];
    const outcome = [latest_price, latest_date];

    return outcome;
}

async function forecast(_epoch, _model, _testing_raw_xs_list, _testing_raw_ys_list) {
    function forecast_curr(_raw_xs_list, _raw_ys_list) {
        // testing dataset
        const prep_tensor_forecast_xs_list = _raw_xs_list.map(_sub_list => _sub_list.map(el => el[0]));
        const prep_tensor_forecast_ys_list = _raw_ys_list.map(_sub_list => [_sub_list[0]]);
        let tensor_forecast_xs_list = tf.tidy(() => tf.tensor2d(prep_tensor_forecast_xs_list));
        let tensor_forecast_ys_list = tf.tidy(() => tf.tensor2d(prep_tensor_forecast_ys_list));

        return {
            "raw_xs_list": _raw_xs_list,
            "raw_ys_list": _raw_ys_list,
            "tensor_xs_list": tensor_forecast_xs_list,
            "tensor_ys_list": tensor_forecast_ys_list,
        }
    }

    function forecast_next(_raw_xs_list, _ml_result) {
        /**
         _raw_xs_list -> the raw testing data
         #######################################################
         eg.
         [
         [
         [ 179.29, '2021-12-28T00:00:00.000Z' ],
         [ 179.38, '2021-12-29T00:00:00.000Z' ],
         [ 178.2, '2021-12-30T00:00:00.000Z' ],
         [ 177.57, '2021-12-31T00:00:00.000Z' ]
         ]
         ]
         #######################################################
         _testing_data_result -> prediction result for the next day
         eg. [ [ 177.87269592285156, 2022-01-01T00:00:00.000Z ] ]

         **/

        /** rebuild the xs list **/
            //1. extract out the next day price and date
        const next_day_price = parseFloat(parseFloat(_ml_result[0][0]).toFixed(2));
        const next_day_date = _ml_result[0][1].toISOString();
        // 2. create a brand new xs data array
        const deepCopyXSList = cloneDeep(_raw_xs_list);
        //3. remove the oldest record from the input data
        const first_record = deepCopyXSList[0];
        first_record.shift();
        //4. add the newest record into the intput data
        first_record.push([next_day_price, next_day_date]);

        /** rebuild the ys list **/
        const the_day_aft_tmr = next_day(next_day_date);
        const new_raw_ys_list = [0, the_day_aft_tmr];

        // testing dataset
        const prep_tensor_forecast_xs_list = deepCopyXSList.map(_sub_list => _sub_list.map(el => el[0]));
        const prep_tensor_forecast_ys_list = new_raw_ys_list.map(_sub_list => [_sub_list[0]]);
        let tensor_forecast_xs_list = tf.tidy(() => tf.tensor2d(prep_tensor_forecast_xs_list));
        let tensor_forecast_ys_list = tf.tidy(() => tf.tensor2d(prep_tensor_forecast_ys_list));

        return {
            "raw_xs_list": deepCopyXSList,
            "raw_ys_list": new_raw_ys_list,
            "tensor_xs_list": tensor_forecast_xs_list,
            "tensor_ys_list": tensor_forecast_ys_list,
        }
    }

    // predict_type2 the 2nd day onwards and insert the remaining predict_type2
    const _total_runs = _epoch;
    let consolidated_raw_xs_list = [];
    let consolidated_raw_ys_list = [];
    let curr_raw_xs_list = [];
    let curr_raw_ys_list = [];

    for (let i = 1; i <= _total_runs; i++) {
        // predict_type2 for the first day
        if (i === 1) {
            const forecast_first = forecast_curr(_testing_raw_xs_list, _testing_raw_ys_list);
            curr_raw_xs_list = forecast_first.raw_xs_list;
            curr_raw_ys_list = await predict(_model, forecast_first.tensor_xs_list, forecast_first.raw_ys_list);
            // add into consolidated list
            consolidated_raw_xs_list.push(curr_raw_xs_list[0]);
            consolidated_raw_ys_list.push(curr_raw_ys_list[0]);
        } else {
            // predict_type2 for the other days
            const forecast_next_record = forecast_next(consolidated_raw_xs_list, curr_raw_ys_list);
            // rebuild the predict_type2 list

            curr_raw_xs_list = forecast_next_record.raw_xs_list[0];
            curr_raw_xs_list = [curr_raw_xs_list];
            consolidated_raw_xs_list.push(curr_raw_xs_list[0]);

            const prep_tensor_forecast_xs_list = consolidated_raw_xs_list.map(
                _sub_list => _sub_list.map(el => el[0])
            );
            const forecast_on_consolidated_xs_list = tf.tidy(
                () => tf.tensor2d(prep_tensor_forecast_xs_list)
            );

            curr_raw_ys_list = await predict_type2(
                _model,
                forecast_on_consolidated_xs_list,
                forecast_next_record.raw_ys_list
            );
            // need to wrap in an array, since need to be a 2d array
            curr_raw_ys_list = [curr_raw_ys_list];
            consolidated_raw_ys_list.push(curr_raw_ys_list[0]);
        }
    }
    // console.log(consolidated_raw_xs_list);
    // console.log(consolidated_raw_ys_list);
    return {
        "input_xs_list": consolidated_raw_xs_list,
        "output_ys_list": consolidated_raw_ys_list,
    }
}


export {
    get_stock_data,
    nn_model,
    train,
    predict,
    predict_type2,
    forecast
}