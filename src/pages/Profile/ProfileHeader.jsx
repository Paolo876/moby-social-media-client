import React from 'react'
import { Grid, Typography, IconButton, Chip, Paper, Box, Tooltip } from '@mui/material'
import Image from "../../components/Image"
import defaultAvatar from "../../assets/default-profile.png"
import ProfileHeaderActions from './ProfileHeaderActions';
import SocialLinksIconItem from '../../components/SocialLinksIconItem';

const ProfileHeader = ({id, username, createdAt, userData, userBio, isOwnProfile }) => {

  let image;
  let links = [];
  if(userData) image = JSON.parse(userData.image);
  if(userBio) links = JSON.parse(userBio.links);

  return (
    <>
      <Paper elevation={3}>
        <Grid container my={1} py={3}>
          <Grid item xs={12} align="center">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              >
              {image ? 
                <Image 
                  src={image.url} 
                  transformation={[{ height: 100, width: 100 }]} 
                  style={{borderRadius: "50%"}}
                  alt="profile-avatar"
                /> : <img src={defaultAvatar} style={{height: "100px", width: "100px"}} alt="profile-avatar"/>
              }
            </IconButton>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5" align="center">@{username}</Typography>
            <Typography variant="h6" align="center">{userData.firstName} {userData.lastName}</Typography>
            <Typography variant="body2" align="center" fontWeight={400} fontSize={12} color="rgba(0,0,0,0.75)">member since {new Date(createdAt).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={12} align="center" my={1}>
            <Box>
              {links.map(item => <Tooltip title={item.title} arrow  key={item.url}>
                <IconButton key={item.url} color="secondary" sx={{ mx:.25 }} target="_blank" href={item.url}>
                  <SocialLinksIconItem value={item.icon} fontSize="small"/>
                </IconButton>
              </Tooltip>)}
            </Box>
            <Typography variant="body1" align="center" maxWidth="75%" my={1.5}>{ userBio && userBio.body ? userBio.body : `${isOwnProfile ? 'You have no bio yet. Set your bio by clicking the edit profile button below' : 'This user has no bio yet.'}`}</Typography>
          </Grid>
          <Grid item xs={12} align="center" mt={2}>
              <ProfileHeaderActions user={{id, username, UserDatum: userData}}/>
          </Grid>
        </Grid>
      </Paper>

    </>
  )
}

export default ProfileHeader