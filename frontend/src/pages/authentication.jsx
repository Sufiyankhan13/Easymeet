import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Professional Blue
        },
    },
    typography: {
        fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    }
});

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        if (loading) return;
        try {
            setError("");
            setLoading(true);
            if (formState === 0) {
                if (!username || !password) {
                    setError("Please fill in all fields");
                    setLoading(false); return;
                }
                let result = await handleLogin(username, password);
                console.log(result);
            }
            if (formState === 1) {
                if (!name || !username || !password) {
                    setError("Please fill in all fields");
                    setLoading(false); return;
                }
                if (name.trim().length < 2) {
                    setError("Name must be at least 2 characters");
                    setLoading(false); return;
                }
                if (username.trim().length < 3) {
                    setError("Username must be at least 3 characters");
                    setLoading(false); return;
                }
                if (password.length < 6) {
                    setError("Password must be at least 6 characters");
                    setLoading(false); return;
                }
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername(""); setMessage(result); setOpen(true); setError(""); setFormState(0); setPassword(""); setName("");
            }
        } catch (err) {
            console.log("Registration error:", err);
            let message = "Something went wrong";
            if (err.response && err.response.data && err.response.data.message) message = err.response.data.message;
            else if (err.message) message = err.message;
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden' }}>
                <CssBaseline />
                
                {/* Background Container */}
                <Grid 
                    container 
                    justifyContent="center" 
                    alignItems="center" 
                    sx={{ 
                        height: '100%', 
                        width: '100%', 
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        position: 'relative'
                    }}
                >
                    {/* Animated Card */}
                    <Paper 
                        elevation={10} 
                        sx={{ 
                            padding: 4, 
                            borderRadius: 4, 
                            width: '100%', 
                            maxWidth: 450, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                            }
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>
                        
                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: '#333', mt: 1 }}>
                            {formState === 0 ? "Welcome Back" : "Create Account"}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {formState === 0 ? "Sign in to continue your meetings" : "Join us and start connecting"}
                        </Typography>

                        {/* Toggle Buttons */}
                        <Box sx={{ display: 'flex', gap: 1, mb: 3, bgcolor: '#f0f2f5', p: 0.5, borderRadius: 2, width: '100%' }}>
                            <Button 
                                fullWidth 
                                variant={formState === 0 ? "contained" : "text"} 
                                onClick={() => { setFormState(0); setError(""); }}
                                sx={{ borderRadius: 1.5, textTransform: 'none', boxShadow: 'none' }}
                            >
                                Sign In
                            </Button>
                            <Button 
                                fullWidth 
                                variant={formState === 1 ? "contained" : "text"} 
                                onClick={() => { setFormState(1); setError(""); }}
                                sx={{ borderRadius: 1.5, textTransform: 'none', boxShadow: 'none' }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box component="form" noValidate sx={{ width: '100%' }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    autoComplete="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    sx={{ mb: 2 }}
                                    InputProps={{ sx: { borderRadius: 2 } }}
                                />
                            )}
                            
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus={formState === 0}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{ mb: 2 }}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />
                            
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ mb: 2 }}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />

                            {error && (
                                <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                                    {error}
                                </Typography>
                            )}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ 
                                    mt: 3, 
                                    mb: 2, 
                                    py: 1.5, 
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 600
                                }}
                                onClick={handleAuth}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : (formState === 0 ? "Sign In" : "Create Account")}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
                onClose={() => setOpen(false)}
            />
        </ThemeProvider>
    );
}