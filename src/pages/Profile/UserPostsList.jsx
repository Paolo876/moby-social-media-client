import { useEffect, useState } from 'react'
import PostItem from '../Home/PostItem'
import { Grid, Divider, Typography, ButtonBase } from "@mui/material"
import usePostsRedux from '../../hooks/usePostsRedux';
import CreatePostButton from "../../components/CreatePostButton"
import MaterialRoot from "../../components/MaterialRoot"
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import useAuthRedux from '../../hooks/useAuthRedux';
const UserPostsList = ({ posts: _posts, user, isOwnProfile }) => {
  const { user: { id: myId }} = useAuthRedux();
  const { bookmarks, getBookmarkedPosts } = usePostsRedux();
  const [ posts, setPosts ] = useState(_posts)
  const [ showPosts, setShowPosts ] = useState(true)
  useEffect(() => {
    getBookmarkedPosts()
  }, [])

  useEffect(() => {
    setPosts(_posts)
  }, [_posts])

  return (
    <Grid container maxWidth={680} mx="auto">
      {isOwnProfile && <Grid item xs={12} my={2}><CreatePostButton/></Grid>}
      <MaterialRoot>
        <Divider>
          <ButtonBase disabled={!isOwnProfile || showPosts} onClick={() => setShowPosts(true)}>
            <Typography variant="body1" my={1.5}>{posts.length !== 0 ? "Posts" : "No posts to show."}</Typography>
          </ButtonBase>
          
          {isOwnProfile && bookmarks.length > 0 && <>
            <span style={{margin: "0 .75em"}}>|</span>
            <ButtonBase disabled={!isOwnProfile || !showPosts} onClick={() => setShowPosts(false)}>
              <Typography variant="body1" my={1.5}><BookmarksIcon fontSize="inherit" color="warning"/>Bookmarked Posts</Typography>
            </ButtonBase>
          </>}
        </Divider>
      </MaterialRoot>
      {showPosts && posts.map(item => <PostItem
        key={item.id}
        id={item.id}
        title={item.title}
        image={item.image}
        isPublic={item.isPublic}
        postText={item.postText}
        likes={item.Likes.length}
        comments={item.Comments.length}
        isLiked={item.Likes.some(_item => _item.UserId === myId)}
        isBookmarked={bookmarks.some(_item => _item.PostId === item.id)}
        user={user}
        createdAt={item.createdAt}
        isFetchedFromProfile={true}
        setPosts={setPosts}
      />)}
      {!showPosts && bookmarks.map(({ Post: item}) => <PostItem
        key={item.id}
        id={item.id}
        title={item.title}
        image={item.image}
        isPublic={item.isPublic}
        postText={item.postText}
        likes={item.Likes.length}
        comments={item.Comments.length}
        isLiked={item.Likes.some(_item => _item.UserId === myId)}
        isBookmarked={bookmarks.some(_item => _item.PostId === item.id)}
        disableActions={true}
        user={item.User}
        createdAt={item.createdAt}
      />)}
    </Grid>
  )
}

export default UserPostsList