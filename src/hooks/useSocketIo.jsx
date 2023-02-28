import { useState, useRef } from 'react'
import io from 'socket.io-client';
import useFriendRedux from './useFriendRedux';
import useChatRedux from './useChatRedux';

const socket = io(`${process.env.REACT_APP_DOMAIN_URL}/`, { transports: ['websocket'], upgrade: false})


const useSocketIo = () => {

  const { setOnlineFriends, setLoggedInFriend, setLoggedOutFriend, setStatusChangedFriend, setFriendRequests } = useFriendRedux();
  const { receiveMessage, receiveNewMessage } = useChatRedux();
  const socketRef = useRef();
  socketRef.current = socket;
  const [isConnected, setIsConnected] = useState(socketRef.current);

  const triggerListeners = () => {
    socket.on("online-friends", data => setOnlineFriends(data))
    socket.on("logged-in-friend", data => setLoggedInFriend(data))
    socket.on("logged-out-friend", data => setLoggedOutFriend(data))
    socket.on("status-changed-friend", data => setStatusChangedFriend(data))
    socket.on("receive-message", data => handleReceiveMessage(data))
    socket.on("receive-friend-request", data => setFriendRequests(data))
  }

  const handleReceiveMessage = (data) => {
    if(data.isNew) {
      receiveNewMessage(data)
    } else {
      receiveMessage(data)

    }
    // snackbarMessage(data)
    // console.log("ASD", currentChatRoomId)
    // if(parseInt(currentChatRoomId) !== parseInt(data.ChatRoomId)) {
    //   console.log(currentChatRoomId, parseInt(data.ChatRoomId))
    //   enqueueSnackbar(data)
    // };  
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
    socket.off("logged-out-friend")
    socket.off("status-changed-friend")
    socket.off("receive-message")
    socket.off("receive-friend-request")
    socket.disconnect()
  }

  const emitStatusChange = (status) => {
    if(isConnected){
      socket.emit("status-change", status)
    }
  }

  const emitFriendRequest = (data) => {
    if(isConnected){
      socket.emit("send-friend-request", data)
    }
  }


  //chat events

  const emitMessage = (data) => {
    socket.emit("send-message", data)   // data = { users, ChatRoomId, message}
  }

  return { isConnected, emitLogin, emitLogout, emitStatusChange, emitMessage, handleReceiveMessage, emitFriendRequest, socketRef }
}

export default useSocketIo