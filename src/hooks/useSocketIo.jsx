import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_DOMAIN_URL}/`, { transports: ['websocket'], upgrade: false })

const useSocketIo = () => {
  const socketRef = useRef();
  socketRef.current = socket;
  const [isConnected, setIsConnected] = useState(socketRef.current);

  useEffect(() => {
    socket.on('connection', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [])


  // console.log(socketRef.current.connected)


  return { isConnected }
}

export default useSocketIo