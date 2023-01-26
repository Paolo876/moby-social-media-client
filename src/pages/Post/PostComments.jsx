import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthRedux from '../../hooks/useAuthRedux';
import { Typography, Grid, Divider } from '@mui/material';
import MaterialRoot from '../../components/MaterialRoot';
import NewCommentForm from './NewCommentForm';
import CommentItem from './CommentItem';


const PostComments = ({ comments, likes, setPost }) => {

  return (
    <Grid container my={2}>
      <Grid item xs={12} px={.5}><NewCommentForm setPost={setPost}/></Grid>
      <Grid item xs={12} my={2}><MaterialRoot><Divider><Typography variant="body1">Comments</Typography></Divider></MaterialRoot></Grid>
      {comments.map(item => <CommentItem comment={item} key={item.id}/>)}
    </Grid>
  )
}

export default PostComments
