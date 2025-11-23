import React from 'react'
import { Route , BrowserRouter as Router, Routes} from 'react-router-dom'
import LandingPage from './pages/landing'
import Authentication from './pages/authentication'
import VideoMeetCOmponent from './pages/VideoMeet'
import HomeComponent from './pages/home'
import History from './pages/getHistory'
import { AuthProvider } from "./context/AuthContext";
import "./App.css"
function App() {
  

  return (

   <>
   
    <Router>
    <AuthProvider>
      <Routes>
        <Route path = '/' element ={<LandingPage/>}> </Route>
        <Route path = '/home' element ={<HomeComponent/>}></Route>
        <Route path = '/history' element ={<History/>}></Route>
        <Route path = '/auth' element = {<Authentication/>}></Route>
        <Route path='/:url' element ={<VideoMeetCOmponent/>}></Route>
      </Routes>
      </AuthProvider>
    </Router>


   </>
  )
}

export default App
