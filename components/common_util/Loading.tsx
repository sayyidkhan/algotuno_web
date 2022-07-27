import {LinearProgress} from "@mui/material";
import React from "react";

/*** common component used to display loading ***/
const LoadingComponent = ({is_loading}) => {
    return is_loading ? <LinearProgress style={{backgroundColor: "black"}}/> : <></>;
};

export default LoadingComponent;