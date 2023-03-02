import { useState, forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SnackbarContent } from 'notistack'
import { Box, Paper, Stack, Typography, ButtonBase } from '@mui/material'
import defaultAvatar from "../assets/default-profile.png";
import Image from './Image';
import MessageIcon from '@mui/icons-material/Message';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const SnackbarComponent = forwardRef((props, ref) => {
    const { content: { title = null, image, header=null, subheader, id, type, link}, ...other } = props
    const navigate = useNavigate();
    const [ showSnackbar, setShowSnackbar ] = useState(true);

    let userImage = null;
    if(image) userImage = JSON.parse(image);


    const handleClick = () => {
      navigate(link)
      setShowSnackbar(false)
    }
    if(showSnackbar) return (
      <SnackbarContent ref={ref} {...other}>
        <ButtonBase  sx={{width:"100%", position: "relative"}} onClick={handleClick}>
          <Paper sx={{width:"100%", background: "rgba(100,100,100, .8)"}} elevation={4}>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1.5, py: .75, pl: 1, pr: 2}}>
              <Box>
                {/* image here */}
                {userImage ? 
                  <Image 
                      src={userImage.url} 
                      transformation={[{
                          height: 40,
                          width: 40,
                      }]} 
                      style={{borderRadius: "50%"}}
                      alt="profile-avatar"
                      /> :
                  <img src={defaultAvatar} alt="profile-avatar" style={{height: "40px", width: "40px"}}/>
                }
              </Box>
              <Stack alignItems="left" justifyContent="left">
                <Typography align="left" color="white" variant="h6" fontSize={14} lineHeight={1.4}>{title}</Typography>
                <Typography align="left" color="white" variant="body2" fontSize={13} lineHeight={1.2} sx={{opacity: .75}}>{header}</Typography>
                <Typography align="left" color="white" variant="body1" fontSize={11} lineHeight={1.2} sx={{opacity: .8}}>{subheader}</Typography>
              </Stack>
            </Box>
          </Paper>
          <Box sx={{position: "absolute", bottom: 4, right: 4, fontSize: 13, backgroundColor: "rgba(255,255,255, .95)", p: .35, m: 0, display: "flex", borderRadius: "50%"}} >
            {type === "message" && <MessageIcon fontSize='inherit' color="secondary" />}
            {type === "friendRequest" && <PersonAddIcon fontSize='inherit' color="secondary" />}
          </Box>
        </ButtonBase>
      </SnackbarContent>
    )
  })

SnackbarComponent.displayName = "SnackbarComponent"

export default SnackbarComponent

