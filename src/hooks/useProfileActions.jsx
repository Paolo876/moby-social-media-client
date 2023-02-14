import { useState } from 'react';
import axios from 'axios'
import useAuthRedux from './useAuthRedux';


/* @desc       A set of request functions for Profile (No redux)
*  @access     Private
*/
const useProfileActions = () => {
  const { user: { id: userId }} = useAuthRedux();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  
  
 /*  @desc       get profile by id
  *  @access     Private
  *  @return     <Object> --{isLiked: <BOOLEAN>, id: <NUMBER>, UserId: <NUMBER>}
  */
  const getProfileById = async (id=userId) => {
    setIsLoading(true)
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/auth/profile/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
      setIsLoading(false)
      setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }
  

 /*  @desc       get friends list by user id
  *  @access     Private
  *  @return     <Array>
  */
  const getFriendsList = async (id) => {
    setIsLoading(true)
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/friends/friends-list/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
      setIsLoading(false)
      setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }


  return { isLoading, error, getProfileById, getFriendsList }
}

export default useProfileActions