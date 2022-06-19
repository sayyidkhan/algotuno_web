import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import LayoutHeader from "../../../components/layout_header";
import {Checkbox, FormControlLabel, Grid, TextField} from "@mui/material";


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];


const theme = createTheme();

export function AddressForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Add Stock
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="ticker_symbol"
                        name="ticker_symbol"
                        label="Ticker Symbol"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <LayoutHeader>
            <Box sx={{ mt: 12.5 }} />
            <Container>
                <CssBaseline/>
                <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                    <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                        <AddressForm/>
                        <React.Fragment>
                            <React.Fragment>
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{mt: 3, ml: 1}}
                                    >
                                        Add Stock
                                    </Button>
                                </Box>
                            </React.Fragment>
                        </React.Fragment>
                    </Paper>
                </Container>
            </Container>
        </LayoutHeader>
    );
}