import { useState } from 'react'
import axios from 'axios'

const useCommentActions = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
    

 /*  @desc       create a new comment for a post
  *  @access     Private
  *  @return     <Object> --comment data
  */
  const newComment = async () => {
    setIsLoading(true)
    try {
        setIsLoading(true)
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/imagekit/`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError(err.message)
        console.log(err)
    }
  }

  return { isLoading, error, newComment}
}

export default useCommentActions