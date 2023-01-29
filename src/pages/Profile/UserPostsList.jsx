import { useEffect, useState } from 'react'
import PostItem from '../Home/PostItem'
import { Grid } from "@mui/material"
import usePostsRedux from '../../hooks/usePostsRedux';

const UserPostsList = ({ posts: _posts, user }) => {
  const { bookmarks, getBookmarkedPosts } = usePostsRedux();
  const [ posts, setPosts ] = useState(_posts)
  useEffect(() => {
    getBookmarkedPosts()
  }, [])

  return (
    <Grid container maxWidth={680} mx="auto">
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