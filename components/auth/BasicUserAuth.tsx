import * as React from "react";
import {useSession} from "next-auth/react";
import Router from "next/router";
import {useEffect, useState} from "react";

const BasicUserAuth = ({children}) => {
    const {data: session, status} = useSession();
    const [isLoggedIn, setLoggedIn] = useState<boolean>(null);

    const RedirectIfNotLoggedIn = async () => {
        setTimeout(async () => {
            await Router.push('/');
        }, 2000); // 2 seconds
    };

    useEffect(() => {
        if (status === "authenticated") {
            setLoggedIn(true);
        }
        else if(status === "unauthenticated") {
            setLoggedIn(false);
        }
    }, [status]);

    useEffect(() => {
        if (isLoggedIn === false) {
            RedirectIfNotLoggedIn().then(res => res);
        }
    }, [isLoggedIn]);

    return session ? children : (
        <div style={{marginTop: "23%", marginBottom: "23%", textAlign: "center"}}>
            <h4>
                you are not authorised to visit this page !
            </h4>
            <p>Redirecting you back to Main Page in 2 seconds...</p>
        </div>
    );
};


export default BasicUserAuth;