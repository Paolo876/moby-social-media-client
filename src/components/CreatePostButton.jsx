import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthRedux from '../hooks/useAuthRedux'
import { Button, Paper, Typography, Stack, Chip } from '@mui/material'
import Image from './Image'
import defaultAvatar from "../assets/default-profile.png"


const CreatePostButton = () => {
  const navigate = useNavigate();
  const { user: { UserData }} = useAuthRedux();
  const [ isHovered, setIsHovered ] = useState(false)

  let image;
  if(UserData) image = JSON.parse(UserData.image);

  return (
    <Button 
        sx={{width: "100%", mr: "auto", p:0, textTransform: "none", textAlign: "left"}} 
        color="info"
        onClick={() => navigate("/create")}
        onMouseOver={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
        >
        <Paper sx={{width: "100%", p: 3, "&:hover": { boxShadow: 3 }}} variant="outlined">
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
            <Chip label="Write a post" sx={{flex: 1, ml:1.5, mr:4, cursor: "pointer", backgroundColor: !isHovered ? "rgba(0,0,0,0.075)" : "rgba(0,0,0,0.25)"}}/>
        </Stack>
        </Paper>
    </Button>
  )
}

export default CreatePostButton