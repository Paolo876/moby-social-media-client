import { useState, useRef } from 'react'
import io from 'socket.io-client';
import useFriendRedux from './useFriendRedux';


const socket = io(`${process.env.REACT_APP_DOMAIN_URL}/`, { transports: ['websocket'], upgrade: true })


const useSocketIo = () => {
  const socketRef = useRef();
  socketRef.current = socket;
  const [isConnected, setIsConnected] = useState(socketRef.current);

  const triggerListeners = () => {
    socket.on("online-friends", data => console.log(data, "online friends"))
    socket.on("logged-in-friend", data => console.log(data, "just logged in"))
    socket.on("logged-out-friend", data => console.log(data, "just logged out"))
  }

  const emitLogin = () => {
    socket.connect(); //user data is transported with the httpcookie token
    triggerListeners();
    setIsConnected(true)
  }

  const emitLogout = () => {
    setIsConnected(false)
    console.log("LOGOUT")
    socket.emit("logout")
    socket.off("online-friends")
    socket.off("logged-in-friend")
    socket.disconnect()
  }


  return { isConnected, emitLogin, emitLogout }
}

export default useSocketIo