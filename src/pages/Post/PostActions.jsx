import { useState } from 'react';
import { useParams } from 'react-router-dom';
import usePostActions from '../../hooks/usePostActions'
import useAuthRedux from '../../hooks/useAuthRedux';

import { Typography, Divider, Paper, Stack, Tooltip, IconButton, AvatarGroup, Avatar, Alert } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LikersModal from './LikersModal';

const PostActions = ({ setPost, likes, setShowNewCommentForm }) => {
  const { id: PostId } = useParams();
  const { user } = useAuthRedux();
  const { likePost, isLoading, error } = usePostActions();
  const isLiked = likes.some(item => item.UserId === user.id);

  const [ showModal, setShowModal ] = useState(false);

  const handleLikeClick = async () => {
    const result = await likePost(PostId);
    setPost(prevState => {
        const updatedPost = { ...prevState };
        if(result.isLiked){
            updatedPost.Likes = [{UserId: result.UserId, id: result.id, User: { username: user.username, UserDatum: user.UserData }}, ...updatedPost.Likes];
        } else {
            updatedPost.Likes = updatedPost.Likes.filter(item => item.UserId !== result.UserId)
        }
        return updatedPost
    })
  };

  return (
    <Paper sx={{px:.5}}>
        {error && <Alert severity='error'>{error}</Alert>}
        {likes.length > 0 && <>
            <Stack flexDirection="row" alignItems="center" py={.5} ml={1}>
                
                <Typography variant="body2" color="rgba(0, 0, 0, .6)" sx={{mx:1}}>Liked by: </Typography>
                <Tooltip title="See users who liked this post." arrow>
                    <AvatarGroup 
                        total={likes.length} 
                        max={3}   
                        sx={{'& .MuiAvatar-root': { width: 25, height: 25, fontSize: 12, cursor: "pointer" },}}
                        onClick={() => setShowModal(true)}
                        >
                        {likes.map(item => <Avatar 
                            key={item.id} 
                            alt={item.User.username} 
                            src={item.User.UserDatum.image ? JSON.parse(item.User.UserDatum.image).url : null}
                            sx={{width: 25, height: 25}} 
                            />)}
                    </AvatarGroup>
                </Tooltip>
            </Stack>
            <LikersModal showModal={showModal} setShowModal={setShowModal} likes={likes}/>
            <Divider/>
        </>
        }
        <Stack flexDirection="row" alignItems="center" my={.5}>
          <IconButton sx={{my: .5, borderRadius: 5, width: "50%", opacity: isLoading ? .5: 1}} onClick={handleLikeClick} disabled={isLoading}>
            {isLiked ? 
              <FavoriteIcon fontSize="medium" sx={{color: "rgba(229, 85, 85, 1)"}}/> : 
              <FavoriteBorderIcon fontSize="medium" sx={{color: "rgba(229, 85, 85, .85)"}}/>
            }
            <Typography variant="body2" color="rgba(0, 0, 0, .6)" sx={{ml:1}}>{isLiked ? "You liked this post." : "Like Post"}</Typography>
          </IconButton>
          <IconButton sx={{my: .5, borderRadius: 5, width: "50%", opacity: isLoading ? .5: 1}} onClick={() => setShowNewCommentForm(prevState => !prevState)}>
            <PostAddIcon fontSize="medium" color="info" />
            <Typography variant="body2" color="rgba(0, 0, 0, .6)" sx={{ml:1}}>Write a comment</Typography>
          </IconButton>
        </Stack>
    </Paper>
  )
}

export default PostActions