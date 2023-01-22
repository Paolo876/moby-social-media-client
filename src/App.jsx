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
import ProfileSetup from './pages/ProfileSetup';
import Profile from './pages/Profile/Profile';
import Create from './pages/Create/Create';
import Post from './pages/Post/Post';

function App() {
  const { user, isAuthReady, authorizeToken } = useAuthRedux();

  useEffect(() => {
    authorizeToken()
  }, [])

  if(!isAuthReady) return <LoadingSpinner message="Loading Data..."/>
  if(isAuthReady) return (
    <>
      <Navbar/>
      <Routes>
        <Route element={ user ? <ProfileSetup/> : <Navigate replace to="/login"/>} path="/profile-setup"/>
        <Route element={ user ? <Home/> : <Navigate replace to="/login"/>} path="/"/>
        <Route element={ user ? <Profile/> : <Navigate replace to="/login"/>} path="/profile"/>
        <Route element={ user ? <Create/> : <Navigate replace to="/login"/>} path="/create"/>
        <Route element={ user ? <Post/> : <Navigate replace to="/login"/>} path="/posts/:id"/>
        {/* auth routes */}
        <Route element={ user ? <Navigate replace to="/"/> : <Login/>} path="/login" />
        <Route element={ user ? <Navigate replace to="/"/> : <Signup/>} path="/signup" />
      </Routes>
    </>
  )
}

export default App
