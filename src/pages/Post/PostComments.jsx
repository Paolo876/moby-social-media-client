import useCommentActions from '../../hooks/useCommentActions';
import { Typography, Grid, Divider, Alert } from '@mui/material';
import MaterialRoot from '../../components/MaterialRoot';
import LoadingSpinner from '../../components/LoadingSpinner';
import NewCommentForm from './NewCommentForm';
import CommentItem from './CommentItem';


const PostComments = ({ comments, likes, setPost }) => {
  const { isLoading, error } = useCommentActions();

  return (
    <Grid container my={2}>
      <Grid item xs={12} px={.5}><NewCommentForm setPost={setPost}/></Grid>
      <Grid item xs={12} my={2}><MaterialRoot><Divider><Typography variant="body1">Comments</Typography></Divider></MaterialRoot></Grid>
      {error && <Grid item xs={12} my={2}><Alert severity='error'>{error}</Alert></Grid>}
      {isLoading && <Grid item xs={12}>
        <LoadingSpinner 
          style={{minHeight: "0", backgroundColor: "initial", transform: "scale(.5)", opacity: .8}} 
          message="Loading..." 
          messageStyle={{color: "black", fontSize: 20}}
          />
      </Grid>}
      {comments.map(item => <CommentItem comment={item} key={item.id} setPost={setPost}/>)}
    </Grid>
  )
}

export default PostComments
