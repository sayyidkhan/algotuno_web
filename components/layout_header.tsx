import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import HeaderAdmin from "./header/header_admin";
import * as React from "react";


export default function LayoutHeader({children}) {
    return (
        <>
            <HeaderAdmin/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}