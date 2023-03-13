import { useEffect } from 'react';
import usePostsRedux from '../../hooks/usePostsRedux';
import { Typography, Grid, Divider, Alert } from "@mui/material"
import useAuthRedux from '../../hooks/useAuthRedux';
import PostItem from './PostItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import MaterialRoot from '../../components/MaterialRoot';
import CreatePostButton from '../../components/CreatePostButton';
import useFriendRedux from '../../hooks/useFriendRedux';

const PostsFeed = () => {
  const { isLoading, error, posts, getPosts, bookmarks, hasMore } = usePostsRedux();
  const { user: { id } } = useAuthRedux();
  const { friends } = useFriendRedux();
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <Grid container>
      {error && <Grid item xs={12} my={1}><Alert severity='error'>{error}</Alert></Grid>}
      <Grid item sx={{m:.5, mt: 1, mb: 2.5, py: 1}} xs={12} id="create-button"><CreatePostButton/></Grid>
      <MaterialRoot>
        <Divider><Typography variant="body1">{new Date().toLocaleDateString()}</Typography></Divider>
      </MaterialRoot>
      {posts.map((item, index) => <PostItem
        isObserver={posts.length === index + 2 ? true : false}
        key={item.id}
        id={item.id}
        title={item.title}
        image={item.image}
        isPublic={item.isPublic}
        postText={item.postText}
        likes={item.Likes.length}
        comments={item.Comments.length}
        isLiked={item.Likes.some(_item => _item.UserId === id)}
        isBookmarked={bookmarks.some(_item => _item.PostId === item.id)}
        user={item.User}
        createdAt={item.createdAt}
        disableActions={!item.isPublic && !friends.some(_item => _item.id === item.UserId)}
      />)}
      {isLoading && <Grid item xs={12}>
        <LoadingSpinner 
          style={{minHeight: "7em", backgroundColor: "initial", transform: "scale(.6)", opacity: .75}} message="Loading posts..." messageStyle={{color: "black", fontSize: 20}} />
        </Grid>}
      {!hasMore && <MaterialRoot>
        <Divider>
          <Typography 
            variant="body1" 
            sx={{cursor: "pointer"}}
            onClick={() => { window['scrollTo']({top: 0, behavior: 'smooth'})}}
          >Back To Top</Typography>
        </Divider>
      </MaterialRoot>}
    </Grid>

  )
}

export default PostsFeed