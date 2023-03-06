import { useState } from 'react'
import axios from 'axios'


const useCreatePostActions = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);


 /*  @desc       create a new post
  *  @access     Private
  *  @return     <Object> --{}
  */
  const createPost = async (data) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/api/posts/create`, data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true,});        
      setIsLoading(false)
      return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }

  return { createPost, isLoading, error }
}

export default useCreatePostActions