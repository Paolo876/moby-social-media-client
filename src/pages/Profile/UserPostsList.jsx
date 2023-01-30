import { useEffect, useState } from 'react'
import PostItem from '../Home/PostItem'
import { Grid, Divider, Typography } from "@mui/material"
import usePostsRedux from '../../hooks/usePostsRedux';
import CreatePostButton from "../../components/CreatePostButton"
import MaterialRoot from "../../components/MaterialRoot"


const UserPostsList = ({ posts: _posts, user, isOwnProfile }) => {
  const { bookmarks, getBookmarkedPosts } = usePostsRedux();
  const [ posts, setPosts ] = useState(_posts)
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
        <Divider><Typography variant="body1" my={1.5}>{posts.length !== 0 ? "Posts" : "No posts to show."}</Typography></Divider>
      </MaterialRoot>
      {posts.map(item => <PostItem
        key={item.id}
        id={item.id}
        title={item.title}
        image={item.image}
        isPublic={item.isPublic}
        postText={item.postText}
        likes={item.Likes.length}
        comments={item.Comments.length}
        isLiked={item.Likes.some(_item => _item.UserId === user.id)}
        isBookmarked={bookmarks.some(_item => _item.PostId === item.id)}
        user={user}
        createdAt={item.createdAt}
        isFetchedFromProfile={true}
        setPosts={setPosts}
      />)}
    </Grid>
  )
}

export default UserPostsList