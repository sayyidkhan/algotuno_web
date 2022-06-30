import LayoutHeader from "../../components/layout_header";
import * as React from "react";
import {Container, Grid, Paper, styled} from "@mui/material";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Page() {

    return (
        <LayoutHeader>
            <Container maxWidth="xl">
                <Box style={{marginTop: "7.5em"}}/>

                <Box sx={{flexGrow: 1, bgcolor: '#cfe8fc', height: '80vh'}}>

                    <Grid container spacing={2}>
                        {/* item no 1 here */}
                        <Grid item xs={12}>
                            <div style={{margin: "2em"}}>
                                <h2>Testing</h2>
                                <Item style={{height: '40vh'}}>
                                    <iframe
                                        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRZPs5Qf_vdFi5xjOmKtcMmDErtzZc1G3GH2rHfReUUgIjpU4GE4hmOfQg2jcfx5kzaF0p3ZFszI7Wy/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"
                                        width="100%"
                                        allowTransparency={true}
                                        style={{height: "100%", background: "#F01446"}}
                                    >
                                    </iframe>
                                </Item>
                            </div>
                        </Grid>
                        {/* item no 2 here */}
                        <Grid item xs={12}>
                            <div style={{margin: "2em"}}>
                                <h2>Testing</h2>
                                <Item>xs=12</Item>
                            </div>
                        </Grid>
                    </Grid>
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