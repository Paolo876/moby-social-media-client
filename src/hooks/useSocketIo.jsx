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
    socket.emit("login")
    setIsConnected(true)
  }

  const emitLogout = () => {
    // socket.emit("disconnect")
    setIsConnected(false)
    socket.disconnect()
    // socket.off('connect');

    // socket.off('disconnect');

  }


  // console.log(socketRef.current.connected)


  return { isConnected, emitLogin, emitLogout }
}

export default useSocketIo