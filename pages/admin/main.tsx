import LayoutHeader from "../../components/layout_header";
import * as React from "react";
import {Container, Grid, Paper, styled} from "@mui/material";
import Box from "@mui/material/Box";
import VerticalTabs from "../../components/admin/main/main_tabs";



export default function Page() {

    return (
        <LayoutHeader>
            <Container maxWidth="xl">
                <Box style={{marginTop: "7.5em"}}/>

                <Box sx={{flexGrow: 1, bgcolor: 'white', height: '80vh'}}>
                    <h2 style={{margin: 1 , marginBottom : '2em'}}>Pipeline Health & Status</h2>
                    <VerticalTabs />
                </Box>

                <Box style={{marginBottom: "7.5em"}}/>

            </Container>
        </LayoutHeader>
    )
}


const styles = {
    grid_spacing: {
        margin: "1em",
    }
};