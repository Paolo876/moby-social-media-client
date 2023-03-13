import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useNotificationRedux from '../../hooks/useNotificationRedux'
import usePostActions from '../../hooks/usePostActions'
import { Alert, Container, Grid, Box } from '@mui/material'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import LoadingSpinner from "../../components/LoadingSpinner"
import PostPreview from './PostPreview'
import PostComments from './PostComments'

const Post = () => {
  const { id } = useParams();
  const { getPostById, isLoading, error } = usePostActions();
  const [ post, setPost ] = useState(null);
  const { snackbarData, markAsReadByReferenceId } = useNotificationRedux();

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
                <>
                <Grid item xs={12} md={6.75} sx={{position: "relative"}}>
                    hello
                </Grid>

                </>
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