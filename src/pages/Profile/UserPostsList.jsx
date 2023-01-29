import { useEffect } from 'react'
import PostItem from '../Home/PostItem'
import { Grid } from "@mui/material"
import useAuthRedux from "../../hooks/useAuthRedux";
import usePostsRedux from '../../hooks/usePostsRedux';

const UserPostsList = ({ posts, user }) => {
  const { user: { id } } = useAuthRedux();
  const { bookmarks, getBookmarkedPosts } = usePostsRedux();

  useEffect(() => {
    getBookmarkedPosts()
  }, [])
  console.log(posts[0])
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
      />)}
    </Grid>
  )
}

export default UserPostsList