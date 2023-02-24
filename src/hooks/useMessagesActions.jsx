import { useState } from 'react';
import axios from 'axios'
import useSocketIo from './useSocketIo';
/* @desc       A set of request functions for Messages (No redux)
*  @access     Private
*/
const useMessagesActions = () => {
  const { emitMessage } = useSocketIo();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);


 /*  @desc       Get all user's chatrooms 
  *  @access     Private
  *  @return     <Array>
  */
  const getChatRooms = async (id) => {
    setIsLoading(true)
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/chat`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }


 /*  @desc       Get chatMessages by id 
  *  @access     Private
  *  @return     <Array>
  */
  const getMessagesById = async (id) => {
    setIsLoading(true)
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/chat/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }


 /*  @desc       send a message
  *  @access     Private
  *  @return     <Array>
  */
  const sendMessage = async (data, ChatMembers = []) => {
    setIsLoading(true)
    try {
        const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/api/chat/send-message`, data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        emitMessage({...data, users: ChatMembers, messageData: res.data })
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }


 /*  @desc       find chat id, redirect user to link(chatRoomId)
  *  @access     Private
  *  @return     {ChatRoomId}
  */
 const findChat = async (id) => {
  setIsLoading(true)
  try {
      const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/chat/search/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
      setIsLoading(false)
      return res.data
  } catch(err) {
      setIsLoading(false)
      setError((err.response && err.response.data) ? err.response.data.message : err.message)
  }
}


 /*  @desc       search users
  *  @access     Private
  *  @return     <Array>
  */
 const searchUser = async (input) => {
  setIsLoading(true)
  try {
      const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/search/${input}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
      setIsLoading(false)
      return res.data
  } catch(err) {
      setIsLoading(false)
      setError((err.response && err.response.data) ? err.response.data.message : err.message)
  }
}

  return { isLoading, error, setError, getChatRooms, getMessagesById, sendMessage, findChat, searchUser }
}

export default useMessagesActions