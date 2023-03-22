import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthRedux from '../../hooks/useAuthRedux';
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png";
import usePostActions from '../../hooks/usePostActions';
import { formatDistanceToNow } from 'date-fns'

import { Paper, Typography, Stack, Grid, ButtonBase, IconButton, Menu, MenuItem, TextField, Chip, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentItem = ({ comment, setPost }) => {
  const { editComment, deleteComment, isLoading, error } = usePostActions();
  const { id: PostId } = useParams();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { user: { id } } = useAuthRedux();
  const [anchorEl, setAnchorEl] = useState(null);
  const [ isEditMode, setIsEditMode ] = useState(false);
  const [ isEdited, setIsEdited ] = useState(comment.createdAt !== comment.updatedAt)
  const [ input, setInput ] = useState(comment.comment);
  const open = Boolean(anchorEl);
  useEffect(() => {
    if(isEditMode) inputRef.current.focus();
  }, [isEditMode])
  const handleEditClick = () => {
    setIsEditMode(true);
    setAnchorEl(null);
  };
  const handleDeleteClick = async () => {
    await deleteComment(comment.id)
    setPost(prevState => {
        const updatedPost = { ...prevState };
        updatedPost.Comments = updatedPost.Comments.filter(item => item.id !== comment.id);
        return updatedPost
    })
    setAnchorEl(null);
  };
  const handleKeyDown = async (e) => {
    if(e.key === "Enter") {
        e.preventDefault();
        if(comment.comment !== input){
            const result = await editComment({id: comment.id, data: {comment: input, PostId}})
            setPost(prevState => {
                const updatedPost = { ...prevState };
                const updatedComment = updatedPost.Comments.find(item => item.id === comment.id);
                updatedComment.comment = result.comment
                return updatedPost
            })
            setIsEdited(true)
        }
        setIsEditMode(false)
    }
  }

  const handleInputBlur = () => {
    setInput(comment.comment)
    setIsEditMode(false)
  }

  return (
    <Grid item xs={12} mb={2} px={.5} key={comment.id}>
        <Paper elevation={2} sx={{ width: "100%", position: "relative" }}>
          <Stack display="flex" flexDirection="row" p={1} alignItems="flex-start">
            <ButtonBase sx={{borderRadius: "50%"}} onClick={() => navigate(`/profile/${comment.UserId}`)}>
              {comment.User.UserDatum.image ? 
                <Image 
                  src={JSON.parse(comment.User.UserDatum.image).url} 
                  transformation={[{ height: 35, width: 35 }]} 
                  style={{borderRadius: "50%"}}
                  alt="profile-avatar"
                /> : <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
              }
            </ButtonBase>

            <Stack ml={1} alignItems="flex-start" sx={{width: "100%"}}>
              <Typography variant="body2" >{comment.User.username} <small style={{opacity: .75, marginLeft: "1em"}}>{formatDistanceToNow(Date.parse(comment.createdAt), { addSuffix: true, includeSeconds: true})}</small></Typography>
              {!isEditMode && <Typography variant="body1" sx={{maxWidth: "88%", mt:.5, overflowWrap: "break-word"}}>{comment.comment}</Typography>}
              {isEditMode && <TextField 
                    id="comment" 
                    name="comment"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text" 
                    variant="outlined" 
                    sx={{width: "100%", overflowWrap: "break-word"}}
                    maxRows={3}
                    multiline
                    inputProps={{ maxLength: 200 }}
                    size="small"
                    disabled={isLoading}
                    inputRef={inputRef}
                    onBlur={handleInputBlur}
                />}
            </Stack>
          </Stack>

          {comment.User.id === id && 
          <>
            <IconButton 
                sx={{ position: "absolute", top: 0, right: 0, transform: "scale(.9)", p:.75 }}
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={e => setAnchorEl(e.currentTarget)}
                >
                <MoreVertIcon fontSize="small"/>
            </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    >
                    <MenuItem sx={{ pr: 4 }} onClick={handleEditClick} disabled={isLoading}><EditIcon fontSize='inherit' sx={{mr: 1}} color="secondary"/><Typography variant="body2">Edit</Typography></MenuItem>
                    <MenuItem sx={{ pr: 4 }} onClick={handleDeleteClick} disabled={isLoading}><DeleteIcon fontSize='inherit' sx={{mr: 1}} color="warning"/><Typography variant="body2">Delete</Typography></MenuItem>
                </Menu>
          </>}
          {isEdited && <Tooltip title="The original comment has been edited by the user." arrow>
            <Chip 
            label={<Typography >edited</Typography>} 
            size="small"
            sx={{transform: "scale(.8)", position: "absolute", top: 3, right: 35}}/>
          </Tooltip>}
        </Paper>
      </Grid>
  )
}

export default CommentItem