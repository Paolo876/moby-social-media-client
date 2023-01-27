import { useState } from 'react';
import { Typography, Grid, Divider, } from '@mui/material';
import MaterialRoot from '../../components/MaterialRoot';
import NewCommentForm from './NewCommentForm';
import CommentItem from './CommentItem';

import PostActions from './PostActions';


const PostComments = ({ comments, likes, setPost }) => {
  const [ showNewCommentForm, setShowNewCommentForm ] = useState(false)

  return (
    <Grid container my={2}>
      <Grid item xs={12} px={.5} my={2}><PostActions likes={likes} commentsLength={comments.length} setPost={setPost} setShowNewCommentForm={setShowNewCommentForm}/></Grid>
      {showNewCommentForm && <Grid item xs={12} px={.5}><NewCommentForm setPost={setPost} setShowNewCommentForm={setShowNewCommentForm}/></Grid>}
      <Grid item xs={12} my={2}><MaterialRoot><Divider><Typography variant="body1">Comments</Typography></Divider></MaterialRoot></Grid>
      {comments.map(item => <CommentItem comment={item} key={item.id} setPost={setPost}/>)}
    </Grid>
  )
}

export default PostComments
