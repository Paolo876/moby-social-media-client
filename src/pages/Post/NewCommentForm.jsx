import { useState } from 'react'
import { TextField, Alert, Paper, Stack, Box, Typography } from '@mui/material';
import useAuthRedux from '../../hooks/useAuthRedux';
import defaultAvatar from "../../assets/default-profile.png";
import Image from '../../components/Image';

const NewCommentForm = () => {
  const [ comment, setComment ] = useState("");
  const { user } = useAuthRedux();

  let image;
  if(user && user.UserData) image = JSON.parse(user.UserData.image);

  const handleKeyDown = (e) => {
    if(e.key === "Enter") {
        e.preventDefault();
        console.log(comment)
        setComment("")
    }
  }
  return (
    <Paper>
        <Typography variant="h5" fontWeight={400} fontSize={15} pl={1.5} pt={1.5} mb={1.5}>Write A Comment</Typography>

        <Stack flexDirection="row"  px={1} pb={2} mb={2}>
            <Box>
                {image ? 
                    <Image 
                    src={image.url} 
                    transformation={[{ height: 35, width: 35 }]} 
                    style={{borderRadius: "50%"}}
                    alt="profile-avatar"
                    /> : <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
                }
            </Box>
            <form style={{width: "100%", marginLeft: ".5em"}}>
                <TextField 
                    id="comment" 
                    name="comment"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text" 
                    label="say something..." 
                    variant="outlined" 
                    fullWidth
                />
            </form>
        </Stack>
    </Paper>

  )
}

export default NewCommentForm