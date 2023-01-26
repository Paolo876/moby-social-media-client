import { useNavigate } from 'react-router-dom';
import usePostsRedux from '../../hooks/usePostsRedux';
import { Typography, Grid, Divider, Paper, Stack, Tooltip, IconButton } from '@mui/material';
import MaterialRoot from '../../components/MaterialRoot';
import NewCommentForm from './NewCommentForm';
import CommentItem from './CommentItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumIcon from '@mui/icons-material/Forum';


const PostComments = ({ comments, likes, setPost, isLiked }) => {
  const navigate = useNavigate();
  const { likePost, isLoading } = usePostsRedux();
  const handleLikeClick = () => {
    // if(!isLoading) likePost(id);
  };
  return (
    <Grid container my={2}>
      <Grid item xs={12} px={.5} my={2}>
        <Paper sx={{px:.5}}>
          <Stack flexDirection="row">
            <Tooltip title={isLiked ? "You liked this post." : "Like Post"} arrow leaveDelay={50}>
              <IconButton sx={{py:1.25, px: 2, mr:.25, borderRadius: 5}} onClick={handleLikeClick} disableRipple>
                {isLiked ? 
                  <FavoriteIcon fontSize="medium" sx={{color: "rgba(229, 85, 85, 1)"}}/> : 
                  <FavoriteBorderIcon fontSize="medium" sx={{color: "rgba(229, 85, 85, .85)"}}/>
                }
                <Typography variant="body2" color="rgba(255, 255, 255, .75)" sx={{ml:1}}>{likes > 0 && likes}</Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Show Comments" arrow leaveDelay={50}>
              <IconButton sx={{py:1.25, px: 2, mr:.25, borderRadius: 5}} onClick={() => console.log("click")}>
                <ForumIcon fontSize="medium" color="info" />
                <Typography variant="body2" color="rgba(255, 255, 255, .75)" sx={{ml:1}}>{comments > 0 && comments}</Typography>
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} px={.5}><NewCommentForm setPost={setPost}/></Grid>
      <Grid item xs={12} my={2}><MaterialRoot><Divider><Typography variant="body1">Comments</Typography></Divider></MaterialRoot></Grid>
      {comments.map(item => <CommentItem comment={item} key={item.id} setPost={setPost}/>)}
    </Grid>
  )
}

export default PostComments
