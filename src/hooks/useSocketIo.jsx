import { useState, useRef } from 'react'
import io from 'socket.io-client';
import useFriendRedux from './useFriendRedux';
import useChatRedux from './useChatRedux';
import useNotificationRedux from './useNotificationRedux';

const socket = io(`${process.env.REACT_APP_DOMAIN_URL}/`, { transports: ['websocket'], upgrade: false})


const useSocketIo = () => {

  const { setOnlineFriends, setLoggedInFriend, setLoggedOutFriend, setStatusChangedFriend, setFriendRequests } = useFriendRedux();
  const { triggerSnackbar, addNotification } = useNotificationRedux();
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
    socket.on("receive-friend-request", data => handleReceiveFriendRequest(data))
    socket.on("receive-created-post", data => triggerSnackbar(data))
    socket.on("receive-comment", data => handleReceiveComment(data))
    socket.on("receive-like", data => handleReceiveLike(data))
  }

  const handleReceiveComment = (data) => {
    //triggersnackbar
    triggerSnackbar({
      title: `${data.User.username} commented on your post`, 
      image: data.User.UserDatum.image, 
      header: `${data.User.UserDatum.firstName} ${data.User.UserDatum.lastName}`,
      subheader: data.commentData.comment.length > 20 ? `${data.commentData.comment.slice(0,17)}...`: data.commentData.comment, 
      id: parseInt(data.NotificationId),
      type: "post",
      link: `/posts/${data.PostId}`,
      postId: data.PostId,
      comment: data.commentData,
      User: data.User
    })

    //update notification
    addNotification({
      id: data.NotificationId, 
      type: "comment", 
      link: `/posts/${data.PostId}`, 
      isRead: false, 
      createdAt: new Date().toString(), 
      updatedAt: new Date().toString(),
      ReferenceUser: data.User
    }) 
  }

  const handleReceiveLike = (data) => {
    //triggersnackbar
    //update notification
    //update posts redux
  }

  const handleReceiveFriendRequest = (data) => {
    setFriendRequests(data)
    triggerSnackbar({
      title: `You have a new Friend Request!`, 
      image: data.User.UserDatum.image, 
      header: data.User.username,
      subheader: `${data.User.UserDatum.firstName} ${data.User.UserDatum.lastName}`, 
      id: parseInt(data.FriendId),
      type: "friendRequest",
      link: `/profile/${data.FriendId}`,
    })
  }

  const handleReceiveMessage = (data) => {
    if(data.isNew) {
      receiveNewMessage(data)
      triggerSnackbar({
        title: "You have a New Message from a User", 
        image: data.sender.User.UserDatum.image, 
        header: data.sender.User.username,
        subheader: data.messageData.ChatRoom.ChatMessages[0].message, 
        id: parseInt(data.ChatRoomId),
        type: "message",
        link: `/messages/${data.ChatRoomId}`,
      })
    } else {
      receiveMessage(data)
      triggerSnackbar({
        title: `Message from ${data.sender.User.username}`, 
        image: data.sender.User.UserDatum.image, 
        subheader: data.messageData.message, 
        id: parseInt(data.ChatRoomId),
        type: "message",
        link: `/messages/${data.ChatRoomId}`,
      })
    }
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
    socket.off("receive-created-post")
    socket.off("receive-comment")
    socket.off("receive-like")
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
    if(isConnected){
      socket.emit("send-message", data)   // data = { users, ChatRoomId, message}
    }
  }

  //post events

  const emitCreatedPost = (data) => {
    if(isConnected){
      socket.emit("emit-created-post", data)   // data = { users, ChatRoomId, message}
    }
  }

  const emitComment = (data) => {
    if(isConnected){
      socket.emit("emit-comment", data)   // data = { AuthorId, PostId, User, comment<spliced to 20 chars.>}
    }
  }

  const emitLike = (data) => {
    if(isConnected){
      socket.emit("emit-like", data)   // data = { AuthorId, PostId, User }
    }
  }

  return { isConnected, emitLogin, emitLogout, emitStatusChange, emitMessage, handleReceiveMessage, emitFriendRequest, socketRef, emitCreatedPost, emitComment, emitLike }
}

export default useSocketIo