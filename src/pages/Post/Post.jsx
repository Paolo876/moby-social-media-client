import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useNotificationRedux from '../../hooks/useNotificationRedux'
import usePostActions from '../../hooks/usePostActions'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import LoadingSpinner from "../../components/LoadingSpinner"
import Image from '../../components/Image'
import defaultAvatar from "../../assets/default-profile.png"
import PostPreview from './PostPreview'
import PostComments from './PostComments'

import { Alert, Container, Grid, Box, Paper, Typography, Divider, Button, ButtonBase, Stack } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';


const Post = () => {
  const { id } = useParams();
  const { getPostById, isLoading, error } = usePostActions();
  const [ post, setPost ] = useState(null);
  const { snackbarData, markAsReadByReferenceId } = useNotificationRedux();
  const navigate = useNavigate();


  useEffect(() => {
    if(snackbarData && (snackbarData.type === "post" || snackbarData.type === "like") && parseInt(snackbarData.postId) === parseInt(id)){
        if(snackbarData.comment){
            setPost(prevState => {
                const updatedPost = { ...prevState };
                updatedPost.Comments = [{...snackbarData.comment, User: snackbarData.User}, ...updatedPost.Comments];
                return updatedPost
            })
        }
        if(snackbarData.type === "like"){
            setPost(prevState => {
                const updatedPost = { ...prevState };
                if(snackbarData.isLiked){
                    updatedPost.Likes = [{UserId: snackbarData.User.id,  User: snackbarData.User}, ...updatedPost.Likes];
                } else {
                    updatedPost.Likes = updatedPost.Likes.filter(item => item.UserId !== snackbarData.User.id)
                }
                return updatedPost
            })
        }
    }
  }, [snackbarData])


  useEffect(() => {
    init();
  }, [id])

  const init = async () => {
    const result = await getPostById(id)
    if(result.isNotFriends) {
        setPost(result)
    } else {
        setPost({...result.post, isBookmarked: result.isBookmarked})
    }
    markAsReadByReferenceId(id) //clear notifications from this post(ReferenceId)
  }

  return (
    <AuthorizedPageContainer>
        <Container>
            {error && <Box my={2}><Alert severity='error'>{error}</Alert></Box>}
            <Grid container>
                {post && (post.isNotFriends ? 
                <Grid item xs={12} md={6.75} sx={{position: "relative", mx: "auto"}}>
                    
                    <Paper sx={{my: 2, py: 5, px: {xs: 2, md:8}, mx: "auto", height: "fit-content", position: "relative"}} elevation={4}>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <LockIcon fontSize="small" color="secondary"/>
                            <Typography variant="h6" align="left" fontSize="1.2em" ml={1.5}>This Post is Private </Typography>
                        </Box>
                        <Divider/>
                        <Typography variant="body1" align="left" mt={2}>You must be friends with the author to view this post. </Typography>
                        <Typography variant="body2" align="left" mt={3}>Post Author:</Typography>
                        <ButtonBase sx={{mt: .25, p:.5}} onClick={() => navigate(`/profile/${post.User.id}`)}>
                            {post.User.image ? 
                                <Image 
                                src={JSON.parse(post.User.image).url} 
                                transformation={[{
                                    height: 40,
                                    width: 40,
                                }]} 
                                style={{borderRadius: "50%"}}
                                alt="profile-avatar"
                                /> :
                                <img src={defaultAvatar} style={{height: "40px", width: "40px"}} alt="profile-avatar"/>
                            }
                            <Stack ml={1}>
                                <Typography variant="body1" align='left'>{post.User.username}</Typography>
                                <Typography variant="body2" align='left'>{post.User.UserDatum.firstName} {post.User.UserDatum.lastName}</Typography>
                            </Stack>
                        </ButtonBase>
                        
                    </Paper>
                    <Button variant="contained" color="secondary" onClick={() => navigate("/")}>Back To Home Page</Button>
                </Grid>
                    :
                <>
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
                </>)}
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