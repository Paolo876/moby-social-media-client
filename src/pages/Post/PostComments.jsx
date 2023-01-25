import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthRedux from '../../hooks/useAuthRedux';
import { Paper, Typography, Stack, Grid, ButtonBase, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import defaultAvatar from "../../assets/default-profile.png";
import Image from '../../components/Image';
import MaterialRoot from '../../components/MaterialRoot';
import NewCommentForm from './NewCommentForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentActionsMenu = ({ open, handleClose, anchorEl }) => {
  return (
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
  )
}
const PostComments = ({ comments, likes, setPost }) => {
  const navigate = useNavigate();
  const { user: { id } } = useAuthRedux();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;

  return (
    <Grid container my={2}>
      <Grid item xs={12} px={.5}><NewCommentForm setPost={setPost}/></Grid>
      <Grid item xs={12} my={2}><MaterialRoot><Divider><Typography variant="body1">Comments</Typography></Divider></MaterialRoot></Grid>

      {comments.map(item => <Grid item xs={12} mb={2} px={.5} key={item.id}>
        <Paper elevation={2} sx={{ width: "100%", position: "relative" }}>
          <Stack display="flex" flexDirection="row" p={1} alignItems="flex-start">
            <ButtonBase sx={{borderRadius: "50%"}} onClick={() => navigate(`/profile/${item.UserId}`)}>
              {item.User.UserDatum.image ? 
                <Image 
                  src={JSON.parse(item.User.UserDatum.image).url} 
                  transformation={[{ height: 35, width: 35 }]} 
                  style={{borderRadius: "50%"}}
                  alt="profile-avatar"
                /> : <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
              }
            </ButtonBase>

            <Stack ml={1} alignItems="flex-start">
              <Typography variant="body2" >{item.User.username} <small style={{opacity: .75, marginLeft: "1em"}}>{new Date(item.createdAt).toLocaleDateString()}</small></Typography>
              <Typography variant="body1" sx={{display: "block", mt:.5 }}>{item.comment}</Typography>
            </Stack>
          </Stack>

          {item.User.id === id && 
          <IconButton 
            sx={{ position: "absolute", top: 0, right: 0, transform: "scale(.9)", p:.75 }}
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            >
            <MoreVertIcon fontSize="small"/>
          </IconButton>}
        </Paper>
      </Grid>)}
      <CommentActionsMenu open={open} handleClose={() => setAnchorEl(null)} anchorEl={anchorEl}/>

    </Grid>
  )
}

export default PostComments
