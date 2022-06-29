import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Layout from "../components/layout";
import bg from '../public/landing_page/lp_1.jpg';


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Layout>
            <Grid container component="main" sx={{height: '88vh', marginBottom: '-1em', marginTop: '3em'}}>
                {/*<CssBaseline/>*/}
                <Grid item xs={12} sm={6}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Box sx={{mt: 1, ml: 3, mr: 3}}>
                            <Box sx={{ml: 3, mr: 3}}>
                                <h1 style={{
                                    color: 'gold',
                                    opacity: '0.8',
                                    borderColor: 'black',
                                    fontSize: '3em',
                                    textShadow: '1em',
                                    textDecorationColor: 'black',
                                }}>
                                    ALGOTUNO.IO
                                </h1>
                                <br/>
                                <h2>The <span style={{color: 'gold'}}>financial compass</span> you need to help
                                    you<br/> identify where the opportunities are
                                </h2>
                                <p>identifying the best stock to pick can be a monumental task in an uncertain world.
                                    With markets facing increased volatility & rising inflation, our AI models can help
                                    chart a course to help to navigate through the financial space to help you move
                                    between markets and stocks with ease.</p>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={7}>
                                    <Link href="/account/signin">
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{m: 2, height: '3em'}}
                                        >
                                            Get Started / Sign In
                                        </Button>
                                    </Link>
                                </Grid>
                                {/*<Box sx={{m: 1}}/>*/}
                                <Grid item xs={5}>
                                    <Link href="/about">
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="outlined"
                                            sx={{m: 2, height: '3em'}}
                                        >
                                            Learn More
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs>
                                    {/*<Link href="#" variant="body2">*/}
                                    {/*Forgot password?*/}
                                    {/*</Link>*/}
                                </Grid>
                                <Grid item>
                                    <Link href="/account/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={6}
                    sx={{
                        backgroundImage: `url(${bg.src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[100],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
        </Layout>
    );
}