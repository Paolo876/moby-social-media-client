import { useState } from 'react';
import axios from 'axios'

/* @desc       A set of request functions for Posts (No redux)
*  @access     Private
*/
const usePostActions = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isNewCommentLoading, setIsNewCommentLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ newCommentError, setNewCommentError ] = useState(null);
  

 /*  @desc       like a post
  *  @access     Private
  *  @return     <Object> --{isLiked: <BOOLEAN>, id: <NUMBER>, UserId: <NUMBER>}
  */
  const likePost = async (id) => {
    setIsLoading(true)
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/posts/like/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }
  

 /*  @desc       bookmark a post
  *  @access     Private
  *  @return     <Object> --{isBookmarked: <BOOLEAN>, PostId: <NUMBER>, UserId: <NUMBER>}
  */
  const bookmarkPost = async (id) => {
    setIsLoading(true)
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/posts/bookmark/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }
  

 /*  @desc       create a new comment for a post
  *  @access     Private
  *  @return     <Object> --comment data
  */
  const newComment = async (data) => {
    setIsNewCommentLoading(true)
    try {
        const res = await axios.post(`${process.env.REACT_APP_DOMAIN_URL}/api/comments/new-comment`, data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsNewCommentLoading(false)
        return res.data
    } catch(err) {
        setIsNewCommentLoading(false)
        setNewCommentError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }


 /*  @desc       update/edit a comment  (always add PostId on data property -> data: {comment: <STRING>, PostId: <NUMBER>})
  *  @access     Private
  *  @return     <Object> --comment data
  */
  const editComment = async ({ id, data }) => {
    setIsLoading(true)
    try {
        const res = await axios.put(`${process.env.REACT_APP_DOMAIN_URL}/api/comments/${id}`, data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }


 /*  @desc       delete a comment
  *  @access     Private
  *  @return     <String> --comment id
  */
  const deleteComment = async (id) => {
    setIsLoading(true)
    try {
        const res = await axios.delete(`${process.env.REACT_APP_DOMAIN_URL}/api/comments/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }


 /*  @desc       delete post
  *  @access     Private
  *  @return     <String> --post id
  */
  const deletePost = async (id) => {
    setIsLoading(true)
    try {
        const res = await axios.delete(`${process.env.REACT_APP_DOMAIN_URL}/api/posts/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }


 /*  @desc       authorize post. check if the user logged in is the post's author
  *  @access     Private
  *  @return     <Object>
  */
  const authorizePost = async (id) => {
    setIsLoading(true)
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/posts/authorize/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }


 /*  @desc       edit/update post
  *  @access     Private
  *  @return     <Object>
  */
  const editPost = async ({data, id}) => {
    setIsLoading(true)
    try {
        const res = await axios.put(`${process.env.REACT_APP_DOMAIN_URL}/api/posts/${id}`, data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        return res.data
    } catch(err) {
        setIsLoading(false)
        setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }

  return { isLoading, error, newComment, editComment, deleteComment, isNewCommentLoading, newCommentError, likePost, bookmarkPost, deletePost, authorizePost, editPost }
}

export default usePostActions