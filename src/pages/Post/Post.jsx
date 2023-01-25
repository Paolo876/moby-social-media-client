import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
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
  const previewRef = useRef()
  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_DOMAIN_URL}/api/posts/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
    .then(res => {
        setIsLoading(false)
        setPost(res.data)
    })
    .catch(err => {
        setIsLoading(false)
        setError(err.response.data.message)
    })
  }, [id])
  console.log(post)
  return (
    <AuthorizedPageContainer>
        <Container>
            {error && <Box xs={12} my={2}><Alert severity='error'>{error}</Alert></Box>}
            <Grid container wrap="nowrap" spacing={2}>
                {post && <>
                    <Grid item xs={6.5} sx={{position: "relative"}} ref={previewRef} mr={1}>
                        <PostPreview 
                            title={post.title} 
                            postText={post.postText} 
                            user={post.User} 
                            image={post.image} 
                            isPublic={post.isPublic}
                            createdAt={post.createdAt}
                            updatedAt={post.updatedAt}
                            width={previewRef.current && previewRef.current.offsetWidth}
                        />
                    </Grid>
                    <Grid item xs={5.5}>
                        <PostComments
                            comments={post.Comments}
                            likes={post.Likes}
                            setPost={setPost}
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