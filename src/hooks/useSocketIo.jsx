import { useState, useRef } from 'react'
import io from 'socket.io-client';
import useFriendRedux from './useFriendRedux';
import useChatRedux from './useChatRedux';

const socket = io(`${process.env.REACT_APP_DOMAIN_URL}/`, { transports: ['websocket'], upgrade: false})


const useSocketIo = () => {
  const { setOnlineFriends, setLoggedInFriend, setLoggedOutFriend, setStatusChangedFriend } = useFriendRedux();
  const { receiveMessage } = useChatRedux();
  const socketRef = useRef();
  socketRef.current = socket;
  const [isConnected, setIsConnected] = useState(socketRef.current);

  const triggerListeners = () => {
    socket.on("online-friends", data => setOnlineFriends(data))
    socket.on("logged-in-friend", data => setLoggedInFriend(data))
    socket.on("logged-out-friend", data => setLoggedOutFriend(data))
    socket.on("status-changed-friend", data => setStatusChangedFriend(data))
    socket.on("receive-message", data => handleReceiveMessage(data))
  }

  const handleReceiveMessage = (data) => {
    receiveMessage(data)
  }
  const emitLogin = () => {
    triggerListeners();
    socket.connect({ autoConnect: true })
    setIsConnected(true)
  }

  const emitLogout = () => {
    setIsConnected(false)
    socket.emit("logout")
    socket.off("online-friends")
    socket.off("logged-in-friend")
    socket.off("status-changed-friend")
    socket.off("receive-message")
    socket.disconnect()
  }

  const emitStatusChange = (status) => {
    if(isConnected){
      socket.emit("status-change", status)
    }
  }


  //chat events

  const emitMessage = (data) => {
    socket.emit("send-message", data)   // data = { users, ChatRoomId, message}
  }

  return { isConnected, emitLogin, emitLogout, emitStatusChange, emitMessage, handleReceiveMessage }
}

export default useSocketIo