import * as React from "react";
import {useState} from "react";
import {getSession} from "next-auth/react";


const SuperUserAuth = ({children}) => {


    useState(() => {
        getSession().then(res => {
            console.log(res);
        })
        //setItem("superuser",)
    });


    return (
        <span>
        </span>
    );
};


function getSessionStorageOrDefault(key, defaultValue) {
    const stored = global.sessionStorage.getItem(key);
    if (!stored) {
        return defaultValue;
    }
    return JSON.parse(stored);
}

async function setItem(key, user_id) {
    const res = await fetch(`/api/superuser/get_one_superuser?id=${user_id}`);
    const data = await res.json();
    if (data !== undefined && data !== null) {
        global.sessionStorage.setItem(key, JSON.stringify(data));
    }

}


export default SuperUserAuth;