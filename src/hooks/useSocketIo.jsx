import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_DOMAIN_URL}/`, { transports: ['websocket'], upgrade: false })
// const socket = io(`${process.env.REACT_APP_DOMAIN_URL}/`, { transports: ['websocket'], upgrade: false, extraHeaders: { Cookie: 'token'} })

const useSocketIo = () => {
  const socketRef = useRef();
  socketRef.current = socket;
  const [isConnected, setIsConnected] = useState(socketRef.current);
  // useEffect(() => {
  //   console.log("RUNNN")
  //   socket.on('connection', () => {
  //     setIsConnected(true);
  //   });
  //   socket.on('disconnect', () => {
  //     setIsConnected(false);
  //   });

  //   return () => {
  //     socket.off('connect');
  //     socket.off('disconnect');
  //   };
  // }, [])

  const emitLogin = () => {
    socket.connect();
    socket.emit("login")  //user data is transported with the httpcookie token
    setIsConnected(true)
  }

  const emitLogout = () => {
    setIsConnected(false)
    socket.disconnect()
  }


  return { isConnected, emitLogin, emitLogout }
}

export default useSocketIo