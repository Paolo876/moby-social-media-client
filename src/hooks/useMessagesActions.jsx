import { useState } from 'react';
import axios from 'axios'

/* @desc       A set of request functions for Messages (No redux)
*  @access     Private
*/
const useMessagesActions = () => {
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
        setError(err.message)
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
        setError(err.message)
    }
  }


  return { isLoading, error, getChatRooms, getMessagesById }
}

export default useMessagesActions