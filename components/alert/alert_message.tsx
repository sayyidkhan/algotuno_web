import {Alert} from "@mui/material";
import React from "react";

const AlertComponent = (props) => {
    return props.display ? <Alert severity={props.status ? "success" : "error"}>{props.message}</Alert> : <></>;
};

export default AlertComponent;