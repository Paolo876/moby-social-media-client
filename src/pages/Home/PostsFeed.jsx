import React from 'react'
import { Paper, Typography, List, ListItem, ListItemButton, Stack, Divider, Grid, Chip, Button } from "@mui/material"
import useAuthRedux from '../../hooks/useAuthRedux';
import defaultAvatar from "../../assets/default-profile.png";
import Image from '../../components/Image';

const PostsFeed = () => {
  const { user: { UserData } } = useAuthRedux();
  let image;
  if(UserData) image = JSON.parse(UserData.image);

  return (
    <Grid container>
      <Grid item sx={{m:.5, mt: 1, p: 1}} xs={12}>
        <Button sx={{minWidth: "40em", mr: "auto", ml: 5, p:0, textTransform: "none", textAlign: "left"}}>
          <Paper sx={{width: "100%", p: 3}} variant="outlined">
            <Typography variant="h5" fontWeight={400}>Create A Post</Typography>
            <Stack flexDirection="row" sx={{width: "100%"}} alignItems="center" mt={1.75} ml={1}>
              {image ? 
                <Image 
                  src={image.url} 
                  transformation={[{
                      height: 35,
                      width: 35,
                  }]} 
                  style={{borderRadius: "50%"}}
                  alt="profile-avatar"
                /> :
                <img src={defaultAvatar} alt="profile-avatar" style={{height: "35px", width: "35px"}}/>
              }
              <Chip label="Write a post" sx={{flex: 1, ml:1.5, mr:4, cursor: "pointer"}}/>
            </Stack>
          </Paper>
        </Button>

      </Grid>
    </Grid>

  )
}

export default PostsFeed