import { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthRedux from "./hooks/useAuthRedux";
import useFriendRedux from './hooks/useFriendRedux';
import useSocketIo from './hooks/useSocketIo';
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
import Messages from './pages/Messages/Messages';
import Settings from './pages/Settings/Settings';
import Search from './pages/Search/Search';
import About from './pages/About';

function App() {
  const { user, isAuthReady, authorizeToken } = useAuthRedux();
  const { getFriends } = useFriendRedux();
  const { emitLogin, emitLogout } = useSocketIo();


  useEffect(() => {
    authorizeToken()
  }, [])

  useEffect(() => {
    if(isAuthReady){
      if(user){
        emitLogin();
        getFriends();
      }      
    } else {
      emitLogout(); //cut existing connections
    }
  }, [isAuthReady, user])

  if(!isAuthReady) return <LoadingSpinner message="Loading Data..."/>
  if(isAuthReady) return (
    <>
      <Navbar/>
      <Routes>
        <Route element={ user ? <ProfileSetup/> : <Navigate replace to="/login"/>} path="/profile-setup"/>
        <Route element={ user ? <Home/> : <Navigate replace to="/login"/>} path="/"/>
        <Route element={ user ? <Profile/> : <Navigate replace to="/login"/>} path="/profile/*"/>
        <Route element={ user ? <Create/> : <Navigate replace to="/login"/>} path="/create"/>
        <Route element={ user ? <Post/> : <Navigate replace to="/login"/>} path="/posts/:id"/>
        <Route element={ user ? <Messages/> : <Navigate replace to="/login"/>} path="/messages/*"/>
        <Route element={ user ? <Settings/> : <Navigate replace to="/login"/>} path="/settings"/>
        <Route element={ user ? <Search/> : <Navigate replace to="/login"/>} path="/search"/>
        <Route element={ user ? <About/> : <Navigate replace to="/login"/>} path="/about"/>
        {/* auth routes */}
        <Route element={ user ? <Navigate replace to="/"/> : <Login/>} path="/login" />
        <Route element={ user ? <Navigate replace to="/"/> : <Signup/>} path="/signup" />
      </Routes>
    </>
  )
}

export default App
