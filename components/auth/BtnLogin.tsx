import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Loading from '../Loading';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';


const BtnLogin = ({ children, provider, bgColor, txtColor, csrfToken, options }) => {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await signIn(provider.id, options)
        setLoading(false)

        if (provider.id === "credentials") {
            if (res.error) {
                return toast.error(res.error)
            }
            toast.success("Successfully login...");
            setTimeout(() => {
                //Router.push("/");
                window.location.reload();
            }, 3000);
            return;
        }
    }
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <ToastContainer />
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

            {children}

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign in with {provider.name}
            </Button>

            {loading && <Loading />}

            <Grid container>
                <Grid item xs>
                    {
                        <Link href="/" variant="body2">
                            Go Back
                        </Link>
                    }
                    {/* todo: should i do forget password ? */}
                    {/* <Link href="#" variant="body2">
                        Forgot password?
                    </Link> */}
                </Grid>
                <Grid item>
                    <Link href="/account/register/" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </Box>
    )
}

BtnLogin.defaultProps = {
    txtColor: '#eee'
}
export default BtnLogin
