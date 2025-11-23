import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, IconButton, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VideoCallIcon from '@mui/icons-material/VideoCall';

function GetHistory() {

    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHistoryOfUser();
                setMeetings(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchHistory();
    }, []);

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
            
            {/* Navbar / Header */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '30px', 
                background: 'white', 
                padding: '15px 20px', 
                borderRadius: '15px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
                <IconButton onClick={() => routeTo('/')} style={{ marginRight: '10px', color: '#1976d2' }}>
                    <HomeIcon />
                </IconButton>
                <Typography variant="h5" style={{ fontWeight: 'bold', color: '#333' }}>
                    Meeting History
                </Typography>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {meetings.length !== 0 ? (
                    <Grid container spacing={3}>
                        {meetings.map((e, i) => (
                            <Grid item xs={12} sm={6} md={4} key={i}>
                                <Card variant="outlined" style={{ 
                                    borderRadius: '15px', 
                                    borderColor: '#e0e0e0',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                    <CardContent>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                            <VideoCallIcon style={{ color: '#555', marginRight: '10px' }} />
                                            <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                                {e.meetingCode}
                                            </Typography>
                                        </div>
                                        
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                            <CalendarTodayIcon fontSize="small" style={{ color: '#888', marginRight: '8px' }} />
                                            <Typography color="text.secondary" variant="body2">
                                                {formatDate(e.date)}
                                            </Typography>
                                        </div>

                                        <Button 
                                            fullWidth 
                                            variant="contained" 
                                            color="primary" 
                                            style={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }}
                                            onClick={() => routeTo(`/${e.meetingCode}`)}
                                        >
                                            Rejoin Meeting
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '100px', color: '#888' }}>
                        <Typography variant="h5" style={{ marginBottom: '10px' }}>No meetings yet.</Typography>
                        <Typography variant="body1">Join a meeting to see it here!</Typography>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            style={{ marginTop: '20px' }}
                            onClick={() => routeTo('/')}
                        >
                            Go Home
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GetHistory