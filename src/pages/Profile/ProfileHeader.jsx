import React from 'react'
import { Grid, Typography, IconButton, Chip, Paper } from '@mui/material'
import Image from "../../components/Image"
import defaultAvatar from "../../assets/default-profile.png"
import ProfileHeaderActions from './ProfileHeaderActions';

const ProfileHeader = ({id, username, createdAt, userData, userBio }) => {
  let image;
  if(userData) image = JSON.parse(userData.image);

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
          </Grid>
          <Grid item xs={12} align="center" my={3}>
            <Typography variant="body1" align="center" maxWidth="75%">{ userBio && userBio.body ? userBio.body : "This user has no bio yet."}</Typography>
            {/* links to be inserted here */}
          </Grid>
          <Grid item xs={12} align="center" mt={2}>
              <ProfileHeaderActions/>
          </Grid>
        </Grid>
      </Paper>

    </>
  )
}

export default ProfileHeader