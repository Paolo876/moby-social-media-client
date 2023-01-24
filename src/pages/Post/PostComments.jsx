import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Stack, Grid, ButtonBase, Card, CardActionArea, CardContent, CardHeader, Divider  } from '@mui/material';
import defaultAvatar from "../../assets/default-profile.png";
import Image from '../../components/Image';
import MaterialRoot from '../../components/MaterialRoot';
import MyTextField from '../../components/MyTextField';

const PostComments = ({ comments, likes }) => {
  const navigate = useNavigate();

  return (
    <Grid container my={2}>
      <Grid item xs={12}>

      </Grid>
      <Grid item xs={12} my={2}><MaterialRoot><Divider><Typography variant="body1">Comments</Typography></Divider></MaterialRoot></Grid>

      {comments.map(item => <Grid item xs={12} mb={1} px={.5
      }>
        <Paper elevation={2} sx={{width: "100%"}}>
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
              <Typography variant="body2">{item.User.username} <small style={{opacity: .75, marginLeft: "1em"}}>{new Date(item.createdAt).toLocaleDateString()}</small></Typography>
              <Typography variant="body1" sx={{display: "block"}}>{item.comment}</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid>)}
      
    </Grid>
  )
}

export default PostComments

{/* <Paper elevation={2} sx={{width: "100%"}}>
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

<Stack ml={1}  sx={{display: "flex", width: "100%"}}>
  <Typography variant="body2">{item.User.username}</Typography>
  <Typography variant="body1" sx={{display: "block"}}>{item.comment}</Typography>

</Stack>
</Stack>

</Paper> */}
