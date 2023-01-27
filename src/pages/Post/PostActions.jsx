import { useNavigate, useParams } from 'react-router-dom';
import usePostActions from '../../hooks/usePostActions'
import useAuthRedux from '../../hooks/useAuthRedux';

import { Typography, Divider, Paper, Stack, Tooltip, IconButton, Alert } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumIcon from '@mui/icons-material/Forum';
const PostActions = ({ setPost, likes, commentsLength }) => {
  const { id: PostId } = useParams();
  const { user } = useAuthRedux();
  const { likePost, isLoading, error } = usePostActions();
  const isLiked = likes.some(item => item.UserId === user.id)
  const handleLikeClick = async () => {
    const result = await likePost(PostId);
    console.log(result)

    setPost(prevState => {
        const updatedPost = { ...prevState };
        if(result.isLiked){
            updatedPost.Likes = [{UserId: result.UserId, username: user.username, UserDatum: user.UserData}, ...updatedPost.Likes];
        } else {
            updatedPost.Likes = updatedPost.Likes.filter(item => item.UserId !== result.UserId)
        }
        return updatedPost
    })
  };

  return (
    <Paper sx={{px:.5}}>
        <Stack flexDirection="row">
            <Typography variant="body2" color="rgba(0, 0, 0, .6)" sx={{ml:1}}>Liked by: </Typography>
        </Stack>
        <Divider/>
        <Stack flexDirection="row">
        <Tooltip title={isLiked ? "You liked this post." : "Like Post"} arrow leaveDelay={50}>
            <IconButton sx={{py:1.25, px: 2, mr:.25, borderRadius: 5}} onClick={handleLikeClick} disableRipple disabled={isLoading}>
            {isLiked ? 
                <FavoriteIcon fontSize="medium" sx={{color: "rgba(229, 85, 85, 1)"}}/> : 
                <FavoriteBorderIcon fontSize="medium" sx={{color: "rgba(229, 85, 85, .85)"}}/>
            }
            <Typography variant="body2" color="rgba(0, 0, 0, .6)" sx={{ml:1}}>{likes.length > 0 && likes.length}</Typography>
            </IconButton>
        </Tooltip>
        <Tooltip title="Write a comment" arrow leaveDelay={50}>
            <IconButton sx={{py:1.25, px: 2, mr:.25, borderRadius: 5}} onClick={() => console.log("WRITE COMMENT")}>
            <ForumIcon fontSize="medium" color="info" />
            <Typography variant="body2" color="rgba(0, 0, 0, .6)" sx={{ml:1}}>{commentsLength > 0 && commentsLength}</Typography>
            </IconButton>
        </Tooltip>
        </Stack>
    </Paper>
  )
}

export default PostActions