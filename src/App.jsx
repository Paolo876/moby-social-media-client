import { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthRedux from "./hooks/useAuthRedux";
//components
import Navbar from './components/Navbar';
//pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home/Home';
import ProfileSetup from './pages/ProfileSetup/ProfileSetup';

function App() {
  const { user, isAuthReady, authorizeToken } = useAuthRedux();

  useEffect(() => {
    authorizeToken()
  }, [])

  if(!isAuthReady) return <LoadingSpinner message="Loading Data..."/>
  if(isAuthReady) return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route element={ user ? <Home/> : <Navigate replace to="/login"/>} path="/"/>
        <Route element={ user ? <ProfileSetup/> : <Navigate replace to="/login"/>} path="/profile-setup"/>

        {/* auth routes */}
        <Route element={ user ? <Navigate replace to="/"/> : <Login/>} path="/login" />
        <Route element={ user ? <Navigate replace to="/"/> : <Signup/>} path="/signup" />

      </Routes>
    </div>
  )
}

export default App
