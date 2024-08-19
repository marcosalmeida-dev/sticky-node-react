import React, { useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        setEmailError(null); // Clear previous email error
        setLoginError(null); // Clear previous login error

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        try {
            const token = await loginUser(email, password);
            if (token) {
                console.log("Login successful:", token);
                navigate("/"); // Redirect to home page after successful login
            }
        } catch (error: any) {
            console.error("Login failed:", error);

            // Handle specific error messages from the server
            if (error.response && error.response.data) {
                if (error.response.data.msg) {
                    setLoginError(error.response.data.msg);
                } else if (error.response.data.errors) {
                    const errorMessages = error.response.data.errors
                        .map((err: { msg: string }) => err.msg)
                        .join(", ");
                    setLoginError(errorMessages);
                } else {
                    setLoginError("Login failed. Please try again.");
                }
            } else {
                setLoginError("Login failed. Please try again.");
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        mt: 20,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">Login</Typography>
                    <Box sx={{ mt: 1 }} onKeyDown={handleKeyPress}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError(null); // Clear the error as the user types
                            }}
                            error={!!emailError}
                            helperText={emailError}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />

                        {loginError && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {loginError}
                            </Alert>
                        )}

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        <Grid container justifyContent={"flex-end"}>
                            <Grid item>
                                <Link to="/register">Don't have an account? Register</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Login;
