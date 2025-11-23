import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, AppBar, Toolbar, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import KeyboardIcon from '@mui/icons-material/Keyboard';

export default function LandingPage() {
    const router = useNavigate();
    const [open, setOpen] = useState(false);
    const [meetingCode, setMeetingCode] = useState("");

    const handleJoin = () => {
        if (meetingCode.trim()) {
            router(`/${meetingCode}`);
        }
    };

    const handleCreate = () => {
        // Generate a random 6-character string
        const randomCode = Math.random().toString(36).substring(2, 8);
        router(`/${randomCode}`);
    }

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            color: 'white',
            overflow: 'hidden'
        }}>
            {/* Navigation */}
            <AppBar position="static" color="transparent" elevation={0} sx={{ pt: 2 }}>
                <Container maxWidth="lg">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        {/* Logo */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => router('/')}>
                            <VideocamIcon sx={{ fontSize: 40, color: '#2196F3' }} />
                            <Typography variant="h5" sx={{ fontWeight: 'bold', background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                EasyConnect
                            </Typography>
                        </Box>

                        {/* Nav Links */}
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Button color="inherit" onClick={() => setOpen(true)} sx={{ textTransform: 'none', fontSize: '1rem' }}>
                                Join as Guest
                            </Button>
                            <Button color="inherit" onClick={() => router("/auth")} sx={{ textTransform: 'none', fontSize: '1rem' }}>
                                Register
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={() => router("/auth")}
                                sx={{ 
                                    borderRadius: 2, 
                                    textTransform: 'none', 
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    px: 3
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Hero Section */}
            <Container maxWidth="lg" sx={{ height: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={4} alignItems="center">
                    {/* Left Content */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.2 }}>
                            <span style={{ color: '#2196F3' }}>Connect</span> with your <br />
                            loved ones simply.
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#b0b0b0', mb: 4, fontWeight: 'normal' }}>
                            Experience high-quality video calls with zero lag. EasyConnect brings you closer, no matter the distance.
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button 
                                variant="contained" 
                                size="large"
                                onClick={handleCreate}
                                sx={{ 
                                    borderRadius: 2, 
                                    py: 1.5, 
                                    px: 4, 
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    background: 'linear-gradient(45deg, #FF416C 0%, #FF4B2B 100%)',
                                    boxShadow: '0 4px 15px rgba(255, 65, 108, 0.4)'
                                }}
                            >
                                Start Meeting
                            </Button>
                            <Button 
                                variant="outlined" 
                                size="large"
                                onClick={() => setOpen(true)}
                                startIcon={<KeyboardIcon />}
                                sx={{ 
                                    borderRadius: 2, 
                                    py: 1.5, 
                                    px: 4, 
                                    fontSize: '1.1rem', 
                                    textTransform: 'none',
                                    borderColor: 'rgba(255,255,255,0.5)',
                                    color: 'white',
                                    '&:hover': {
                                        borderColor: 'white',
                                        background: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                            >
                                Join with Code
                            </Button>
                        </Box>
                    </Grid>

                    {/* Right Image */}
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box 
                            component="img"
                            src="/mobile.png"
                            alt="Video Call Illustration"
                            sx={{
                                maxWidth: '100%',
                                height: 'auto',
                                maxHeight: '500px',
                                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
                                animation: 'float 6s ease-in-out infinite'
                            }}
                        />
                        <style>
                            {`
                                @keyframes float {
                                    0% { transform: translateY(0px); }
                                    50% { transform: translateY(-20px); }
                                    100% { transform: translateY(0px); }
                                }
                            `}
                        </style>
                    </Grid>
                </Grid>
            </Container>

            {/* Join Modal */}
            <Dialog 
                open={open} 
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        padding: 1,
                        minWidth: '350px'
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Join a Meeting
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                        Enter the meeting code shared with you.
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="code"
                        label="Meeting Code"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={meetingCode}
                        onChange={(e) => setMeetingCode(e.target.value)}
                        placeholder="e.g. abc-123-xyz"
                        InputProps={{
                            sx: { borderRadius: 2 }
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button onClick={() => setOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
                    <Button 
                        onClick={handleJoin} 
                        variant="contained"
                        disabled={!meetingCode.trim()}
                        sx={{ 
                            borderRadius: 2,
                            px: 4,
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                        }}
                    >
                        Join Now
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}