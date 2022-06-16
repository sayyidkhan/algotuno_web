import LayoutHeader from "../../components/layout_header";
import styles from "../../styles/Home.module.css";
import * as React from "react";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";

export default function Page() {

    return (
        <LayoutHeader>
            <div className={styles.containers}>
                <Container maxWidth="sm">
                    <Box sx={{bgcolor: '#cfe8fc', height: '100vh'}}/>
                </Container>
                <h1>Protected Page</h1>
                <p>Hello world</p>
            </div>
        </LayoutHeader>
    )
}
