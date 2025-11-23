import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../context/AuthContext';

function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");


    const {addToUserHistory} = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>
            <div className="navBar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", backgroundColor: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ color: "#1976d2", margin: 0 }}>EasyConnect</h2>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/history")}>
                        <IconButton>
                            <RestoreIcon />
                        </IconButton>
                        <p style={{ margin: 0, fontWeight: "500", color: "#555" }}>History</p>
                    </div>

                    <Button variant='outlined' onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>
                        Logout
                    </Button>
                </div>
            </div>


            <div className="meetContainer" style={{ display: "flex", height: "calc(100vh - 80px)", alignItems: "center", justifyContent: "center", padding: "0 50px" }}>
                <div className="leftPanel" style={{ flex: 1, paddingRight: "50px" }}>
                    <div>
                        <h2 style={{ fontSize: "3rem", marginBottom: "20px", lineHeight: "1.2", color: "#333" }}>Premium Video Meetings for Everyone</h2>
                        <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "40px" }}>
                            Connect, collaborate, and celebrate from anywhere with EasyConnect.
                        </p>

                        <div style={{ display: 'flex', gap: "15px", alignItems: "center" }}>
                            <TextField 
                                onChange={e => setMeetingCode(e.target.value)} 
                                id="outlined-basic" 
                                label="Enter Meeting Code" 
                                variant="outlined" 
                                style={{ backgroundColor: "white", minWidth: "250px" }}
                            />
                            <Button 
                                onClick={handleJoinVideoCall} 
                                variant='contained' 
                                size="large" 
                                style={{ padding: "15px 30px", fontSize: "1rem" }}
                            >
                                Join Now
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='rightPanel' style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <img srcSet='/logo3.png' alt="Conference Illustration" style={{ maxWidth: "100%", maxHeight: "60vh" }} />
                </div>
            </div>
        </>
    )
}


export default withAuth(HomeComponent)