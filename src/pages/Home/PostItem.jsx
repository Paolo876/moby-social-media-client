import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png";
import { Grid, Paper, Button, Typography, useTheme, Stack, IconButton } from '@mui/material';
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
const PostItem = ({ title, image, isPublic, postText, isLiked=false, isBookmarked=false, user=MOCK_USER, createdAt="2023-01-11 08:01:57" }) => {
  const navigate = useNavigate();
  const { palette, transitions } = useTheme();
  let userImage;
  if(user && user.UserData) userImage = JSON.parse(user.UserData.image);

  return (
    <Grid item sx={{m:.5, mt: 2, p: 0, boxShadow: 1, mb: 3, borderRadius: "10px", transition: transitions.create('all', {duration: 800, delay: 0}), "&:hover": { boxShadow: 4 }}} xs={12}>
        <Button sx={{width: "100%", mr: "auto", p:0, textTransform: "none", textAlign: "left", borderRadius: "10px 10px 0 0"}} color="primary">
            <Paper sx={{position: "relative", width: "100%", p: 3, minHeight: 250, borderRadius: "10px 10px 0 0"}} variant="outlined">
                <Typography variant="body2" align="right" fontWeight={300} fontSize={12} sx={{position:"absolute", top: 15, right: 15 }}>{new Date(createdAt).toLocaleDateString()}</Typography>
                <Typography variant="h5" align='center' fontWeight={600}>{title}</Typography>
                <Typography variant="subtitle1" align='center'>{postText.length > 160 ? postText.substr(0,160) : postText}...</Typography>
                {image && <Image 
                  src={image}
                  alt={title}
                  style={{objectFit: "cover", margin: "0 auto"}}
                  transformation={[{
                      height: 300,
                      width: 300,
                  }]} 
                  />}
            </Paper>
        </Button>                  
        <Paper sx={{backgroundColor: palette.primary.main, p:1, py:0.5, borderRadius: "0 0 10px 10px"}}>
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between" px={.5}>
            <Stack flexDirection="row">
              <IconButton sx={{p:.75, mr:2}}>
                {isLiked ? 
                  <FavoriteIcon fontSize="medium" sx={{color: "rgba(229, 85, 85, 1)"}}/> : 
                  <FavoriteBorderIcon fontSize="medium" sx={{color: "rgba(229, 85, 85, .85)"}}/>
                }
                <Typography variant="body2" color="rgba(0, 0, 0, .45)" sx={{ml:.5}}>Like</Typography>
              </IconButton>
              <IconButton sx={{p:.75}}>
                {isBookmarked ? 
                  <TurnedInIcon fontSize="medium" sx={{color: "rgba(239, 144, 60, 1)"}}/> : 
                  <TurnedInNotIcon fontSize="medium" sx={{color: "rgba(239, 144, 60, 1)"}}/>
                }
                <Typography variant="body2" color="rgba(0, 0, 0, .45)" sx={{ml:.5}}>Bookmark</Typography>
              </IconButton>
            </Stack>
            <Stack>
              <Button color="secondary" sx={{ textTransform: "initial", color: "initial", py: 0 }} onClick={() => navigate(`/profile/${user.id}`)}>
                <Stack mr={.5} p={.5} alignItems="flex-end">
                  <Typography variant="body1" align='right' color="rgba(255, 255, 255, .75)" fontSize={12} fontWeight={500} pb={.15}>@{user.username}</Typography>
                  <Typography variant="body1" align='right' color="rgba(255, 255, 255, .75)" fontSize={11} fontWeight={300}>{user.UserData.firstName} {user.UserData.lastName}</Typography>
                </Stack>
                {userImage ? 
                  <Image 
                      src={userImage.url} 
                      transformation={[{ height: 25, width: 25 }]} 
                      style={{borderRadius: "50%"}}
                      alt="profile-avatar"
                  /> : <img src={defaultAvatar} style={{height: "25px", width: "25px"}} alt="profile-avatar"/>
                }
              </Button>
            </Stack>
          </Stack>
        </Paper>
    </Grid>
  )
}

export default PostItem