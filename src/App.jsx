import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import useAuthRedux from "./hooks/useAuthRedux";
//components
import Navbar from './components/Navbar';
//pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home/Home';

function App() {
  const { user, isAuthReady, authorizeToken } = useAuthRedux();

  const navigate = useNavigate();
  // useEffect(() => {
  //   authorizeToken()
  // }, [])

  useEffect(()=>{
    if(!user) navigate("/login")
  },[ user ])

  if(!isAuthReady) return <LoadingSpinner message="Loading Data..."/>
  if(isAuthReady) return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route element={ user ? <Home/> : <Navigate replace to="/login"/>} path="/" />
        <Route element={user ? <Navigate replace to="/"/> : <Login/>} path="/login" />
        <Route element={user ? <Navigate replace to="/"/> : <Signup/>} path="/signup" />

      </Routes>
    </div>
  )
}

export default App
