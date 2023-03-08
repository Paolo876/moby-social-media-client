import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useNotificationRedux from '../../hooks/useNotificationRedux'
import axios from 'axios'
import { Alert, Container, Grid, Box } from '@mui/material'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import LoadingSpinner from "../../components/LoadingSpinner"
import PostPreview from './PostPreview'
import PostComments from './PostComments'

const Post = () => {
  const { id } = useParams();
  const [ post, setPost ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const { snackbarData } = useNotificationRedux();

  useEffect(() => {
    
    if(snackbarData && snackbarData.type === "post" && parseInt(snackbarData.postId) === parseInt(id)){
        console.log(snackbarData)
    }
  }, [snackbarData])
  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_DOMAIN_URL}/api/posts/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
    .then(res => {
        setIsLoading(false)
        setPost({...res.data.post, isBookmarked: res.data.isBookmarked})
    })
    .catch(err => {
        setIsLoading(false)
        setError(err.response.data.message)
    })
  }, [id])
  return (
    <AuthorizedPageContainer>
        <Container>
            {error && <Box my={2}><Alert severity='error'>{error}</Alert></Box>}
            <Grid container>
                {post && <>
                    <Grid item xs={12} md={6.75} sx={{position: "relative"}}>
                        <PostPreview 
                            title={post.title} 
                            postText={post.postText} 
                            user={post.User} 
                            image={post.image} 
                            isPublic={post.isPublic}
                            createdAt={post.createdAt}
                            updatedAt={post.updatedAt}
                            isBookmarked={post.isBookmarked}
                            id={post.id}
                        />
                    </Grid>
                    <Grid item xs={12} md={5.25} pl={{xs:0, md: 2}}>
                        <PostComments
                            comments={post.Comments}
                            likes={post.Likes}
                            setPost={setPost}
                            authorId={post.User.id}
                            postId={post.id}
                        />
                    </Grid>
                </>}
                {isLoading && <Grid item xs={12}>
                    <LoadingSpinner 
                        style={{minHeight: "8em", backgroundColor: "initial", opacity: .7, transform: "scale(.8)"}} 
                        message="Loading..."
                        messageStyle={{color: "black", fontSize: 20 }} 
                        />
                </Grid>}
            </Grid>

        </Container>
    </AuthorizedPageContainer>
  )
}

export default Post