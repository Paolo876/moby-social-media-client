import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthRedux from '../../hooks/useAuthRedux';
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png";
import useCommentActions from '../../hooks/useCommentActions';

import { Paper, Typography, Stack, Grid, ButtonBase, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentItem = ({ comment, setPost }) => {
  const { editComment, deleteComment, isLoading, error } = useCommentActions();

  const navigate = useNavigate();
  const { user: { id } } = useAuthRedux();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleEditClick = () => {
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

            <Stack ml={1} alignItems="flex-start">
              <Typography variant="body2" >{comment.User.username} <small style={{opacity: .75, marginLeft: "1em"}}>{new Date(comment.createdAt).toLocaleDateString()}</small></Typography>
              <Typography variant="body1" sx={{display: "block", mt:.5 }}>{comment.comment}</Typography>
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
        </Paper>
      </Grid>
  )
}

export default CommentItem