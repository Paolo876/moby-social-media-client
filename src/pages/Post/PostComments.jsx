import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Stack, Grid, ButtonBase } from '@mui/material';
import defaultAvatar from "../../assets/default-profile.png";
import Image from '../../components/Image';
const PostComments = ({ comments, likes }) => {
  const navigate = useNavigate();
  console.log(comments)
  return (
    <Grid sx={{my: 2, py: 5, px: {xs: 2, md:8}}} container>
      <Grid item>
        <Paper>

        </Paper>
      </Grid>
      {comments.map(item => 
      <Grid item xs={12} key={item.id} mb={2}>
        <Paper elevation={2}>
          <Stack display="flex" flexDirection="row" p={1}>
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
          
          <Stack ml={1}>
            <Typography variant="body2">{item.User.username}</Typography>
            <Typography variant="body1">{item.comment}</Typography>

          </Stack>
          </Stack>
          
        </Paper>
      </Grid>)}
    </Grid>
  )
}

export default PostComments