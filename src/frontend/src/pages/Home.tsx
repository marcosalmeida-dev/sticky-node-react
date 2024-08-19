import React from "react";
import { Container, CssBaseline, Box, Typography } from "@mui/material";
import Sticky from '../components/Sticky';

const Home = () => {
    return (
        <>
            <Container maxWidth="lg">
                <CssBaseline />
                <Box
                    sx={{
                        mt: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: 'center', // Center text on all screen sizes
                    }}
                >
                    <Typography variant="h3" gutterBottom>
                        Welcome to the Sticky Note App
                    </Typography>
                </Box>
                <Sticky />
            </Container>
        </>
    );
};

export default Home;
