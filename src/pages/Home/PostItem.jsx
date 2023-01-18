import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png";
import { Grid, Paper, Button, Typography, useTheme, Stack, IconButton, Tooltip, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ForumIcon from '@mui/icons-material/Forum';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
const MOCK_USER = {
  username: "johndoe",
  id: 123,
  UserData: {
    firstName: "John", 
    lastName: "Doe", 
    image: `{"fileId":"63c267e6e809dd54b064181c","name":"profile_2_GohWaL7-8","url":"https://ik.imagekit.io/q5892cimh/moby/profile-images/profile_2_GohWaL7-8"}`
  }
}

const PostHover = ({ postText }) => {
  return <>
    <Typography variant="subtitle1" align='center'>{postText.length > 160 ? postText.substr(0,160) : postText}...</Typography>
    <Button variant="contained" color="secondary" sx={{borderRadius: 15}}>Read More</Button>
  </>
}

const PostBody = ({ isPublic, createdAt, title, user, image, isHovered }) => {
  return (
  <Button sx={{width: "100%", mr: "auto", p:0, textTransform: "none", textAlign: "left", borderRadius: "10px 10px 0 0"}} color="primary">
    <Box 
      sx={{
        position: "relative", 
        width: "100%", p: 0, color: "black", minHeight: 250, maxHeight: 350, borderRadius: "10px 10px 0 0", overflow: "hidden", backgroundColor: "background.paper"}} 
      variant="outlined"
      >
      {!isPublic && <Tooltip title="Post is Private" arrow><LockIcon fontSize="small" sx={{position: "absolute", top: 10, left: 10, opacity: .9}} color="info"/></Tooltip>}
      <Typography variant="body2" align="right" fontWeight={300} fontSize={12} sx={{position:"absolute", top: 15, right: 15 }}>{new Date(createdAt).toLocaleDateString()}</Typography>
      <Stack  sx={{position:"absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)" }}>
        <Typography variant="h5" align='center' fontWeight={600} pb={.5}>{title}</Typography>
        <Typography variant="body2" align='center' fontWeight={400} sx={{opacity: .7}}>-{user.UserData.firstName} {user.UserData.lastName}</Typography>
      </Stack>
      {/* <PostHover postText={postText}/> */}
      <Box sx={{height: "inherit", width: "auto", overflow: "hidden"}}>
        {image && <Image 
          src={image}
          alt={title}
          style={{objectFit: "cover"}}
          // transformation={[{
          //     height: 350,
          //     width: 300,
          // }]} 
          />}
      </Box>

    </Box>
  </Button>
  )
}

const PostActions = ({ palette, isLiked, isBookmarked, user, userImage}) => {
  const navigate = useNavigate();
  return (
    <Paper sx={{backgroundColor: palette.primary.main, p:1, py:0.5, borderRadius: "0 0 10px 10px", zIndex:1000}}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" px={.5}>
        <Stack flexDirection="row">
          <IconButton sx={{py:.75, px: 2, mr:.25, borderRadius: 5}} >
            {isLiked ? 
              <FavoriteIcon fontSize="medium" sx={{color: "rgba(229, 85, 85, 1)"}}/> : 
              <FavoriteBorderIcon fontSize="medium" sx={{color: "rgba(229, 85, 85, .85)"}}/>
            }
            <Typography variant="body2" color="rgba(0, 0, 0, .45)" sx={{ml:.5}}>Like</Typography>
          </IconButton>
          <IconButton sx={{py:.75, px: 2, mr:.25, borderRadius: 5}}>
            {isBookmarked ? 
              <TurnedInIcon fontSize="medium" sx={{color: "rgba(239, 144, 60, 1)"}}/> : 
              <TurnedInNotIcon fontSize="medium" sx={{color: "rgba(239, 144, 60, 1)"}}/>
            }
            <Typography variant="body2" color="rgba(0, 0, 0, .45)" sx={{ml:.5}}>Bookmark</Typography>
          </IconButton>
        </Stack>
        <Stack>
          <Button color="secondary" sx={{ textTransform: "initial", color: "initial", py: 0 }} onClick={() => navigate(`/profile/${user.id}`)}>
            <Stack mr={.15} p={.5} alignItems="flex-end">
              <Typography variant="body1" align='right' color="rgba(255, 255, 255, .75)" fontSize={13} fontWeight={500}>@{user.username}</Typography>
              {/* <Typography variant="body1" align='right' color="rgba(255, 255, 255, .75)" fontSize={11} fontWeight={300}>{user.UserData.firstName} {user.UserData.lastName}</Typography> */}
            </Stack>
            {userImage ? 
              <Image 
                  src={userImage.url} 
                  transformation={[{ height: 20, width: 20 }]} 
                  style={{borderRadius: "50%"}}
                  alt="profile-avatar"
              /> : <img src={defaultAvatar} style={{height: "20px", width: "20px"}} alt="profile-avatar"/>
            }
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

const PostItem = ({ title, image, isPublic, postText, isLiked=false, isBookmarked=false, user=MOCK_USER, createdAt="2023-01-11 08:01:57" }) => {
  const navigate = useNavigate();
  const [ isHovered, setIsHovered ] = useState(false)
  const { palette, transitions } = useTheme();
  let userImage;
  if(user && user.UserData) userImage = JSON.parse(user.UserData.image);

  return (
    <Grid 
      item 
      sx={{m:.5, mt: 2, p: 0, boxShadow: 1, mb: 3, borderRadius: "10px", transition: transitions.create('all', {duration: 800, delay: 0}), "&:hover": { boxShadow: 4 }}} 
      xs={12}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <PostBody isPublic={isPublic} createdAt={createdAt} title={title} user={user} image={image} isHovered={isHovered}/>
      <PostActions palette={palette} isLiked={isLiked} isBookmarked={isBookmarked} user={user} userImage={userImage}/>
    </Grid>
  )
}

export default PostItem