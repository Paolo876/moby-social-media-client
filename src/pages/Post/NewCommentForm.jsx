import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Alert, Paper, Stack, Box, Typography, IconButton, Tooltip } from '@mui/material';
import useAuthRedux from '../../hooks/useAuthRedux';
import usePostActions from '../../hooks/usePostActions';
import useSocketIo from "../../hooks/useSocketIo";
import defaultAvatar from "../../assets/default-profile.png";
import Image from '../../components/Image';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const NewCommentForm = ({ setPost, setShowNewCommentForm, setShowComments, authorId }) => {
  const [ comment, setComment ] = useState("");
  const { id: PostId } = useParams();
  const { newComment, isNewCommentLoading: isLoading, newCommentError: error } = usePostActions();
  const { user } = useAuthRedux();
  const { emitComment } = useSocketIo();

  let image;
  if(user && user.UserData) image = JSON.parse(user.UserData.image);
  const handleKeyDown = async (e) => {
    if(e.key === "Enter") {
        e.preventDefault();
        const result = await newComment({comment, PostId})
        setPost(prevState => {
            const updatedPost = { ...prevState };
            updatedPost.Comments = [result, ...updatedPost.Comments];
            return updatedPost
        })
        emitComment({
            AuthorId : authorId, 
            PostId: parseInt(PostId), 
            User: {username: user.username, id: user.id, UserDatum: user.UserData}, 
            comment: comment.length > 20 ? `${comment.slice(0,17)}...`: comment,
        })
        setShowComments(true)
        setShowNewCommentForm(false)
        setComment("")
    }
  }
  return (
    <Paper sx={{px:.5, position: "relative"}}>
        <Typography variant="h5" fontWeight={400} fontSize={15} pl={1.5} pt={1.5} mb={1}>Write A Comment</Typography>
        <Tooltip title="Cancel" arrow><IconButton sx={{position: "absolute", top: 0, right: 0, opacity: .75}} onClick={() => setShowNewCommentForm(false)}><HighlightOffIcon/></IconButton></Tooltip>
        {error && <Alert severity='error'>{error}</Alert>}
        <Stack flexDirection="row"  px={1} pb={2} mb={2} mt={2}>
            <Box>
                {image ? 
                    <Image 
                    src={image.url} 
                    transformation={[{ height: 35, width: 35 }]} 
                    style={{borderRadius: "50%"}}
                    alt="profile-avatar"
                    /> : <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
                }
            </Box>
            <form style={{width: "100%", marginLeft: ".5em"}}>
                <TextField 
                    id="comment" 
                    name="comment"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text" 
                    label="say something..." 
                    variant="outlined" 
                    fullWidth
                    disabled={isLoading}
                    size="small"
                    inputProps={{ maxLength: 80 }}
                />
            </form>
        </Stack>
    </Paper>

  )
}

export default NewCommentForm