import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthRedux from '../../hooks/useAuthRedux';
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png";

import { Paper, Typography, Stack, Grid, ButtonBase, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentItem = ({ comment }) => {
  const navigate = useNavigate();
  const { user: { id } } = useAuthRedux();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
                onClick={handleClick}
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
                    onClose={handleClose}
                    >
                    <MenuItem sx={{ pr: 4 }}><EditIcon fontSize='inherit' sx={{mr: 1}} color="secondary"/><Typography variant="body2">Edit</Typography></MenuItem>
                    <MenuItem sx={{ pr: 4 }}><DeleteIcon fontSize='inherit' sx={{mr: 1}} color="warning"/><Typography variant="body2">Delete</Typography></MenuItem>
                </Menu>
          </>}
        </Paper>
      </Grid>
  )
}

export default CommentItem