import { useState } from 'react';
import { Typography, Grid, Divider, ButtonBase, } from '@mui/material';
import MaterialRoot from '../../components/MaterialRoot';
import NewCommentForm from './NewCommentForm';
import CommentItem from './CommentItem';

import PostActions from './PostActions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UserPostActions from './UserPostActions';
import useAuthRedux from '../../hooks/useAuthRedux';

const PostComments = ({ comments, likes, setPost, authorId }) => {
  const { user } = useAuthRedux();
  const [ showNewCommentForm, setShowNewCommentForm ] = useState(false)
  const [ showComments, setShowComments ] = useState(false)


  return (
    <Grid container my={2}>
      {user.id === authorId && <Grid item xs={12} px={.5} my={1}><UserPostActions/></Grid>}
      <Grid item xs={12} px={.5} my={1}><PostActions likes={likes} setPost={setPost} setShowNewCommentForm={setShowNewCommentForm}/></Grid>
      {showNewCommentForm && <Grid item xs={12} px={.5}><NewCommentForm setPost={setPost} setShowNewCommentForm={setShowNewCommentForm} setShowComments={setShowComments}/></Grid>}
      <Grid item xs={12} my={2}>
        <MaterialRoot>
          <Divider>
            <ButtonBase disableRipple onClick={() => setShowComments(prevState => !prevState)}>
              <Typography variant="body1" mr={.5} fontWeight={400}>{comments.length > 0 ? `Show Comments (${comments.length})` : "No comments yet."}</Typography>
              {comments.length > 0 && (showComments ? <KeyboardArrowUpIcon fontSize='inherit'  color="secondary" sx={{verticalAlign: "middle"}}/> : <KeyboardArrowDownIcon fontSize='inherit'  color="secondary" sx={{verticalAlign: "middle"}}/>)}
            </ButtonBase>
          </Divider>
        </MaterialRoot>
      </Grid>
      {showComments && comments.map(item => <CommentItem comment={item} key={item.id} setPost={setPost}/>)}
    </Grid>
  )
}

export default PostComments
