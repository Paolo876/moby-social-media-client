import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, List, ListItem, Stack, Divider, Button } from "@mui/material";
import { useTheme } from '@emotion/react';
import Image from '../../components/Image';
import useAuthRedux from '../../hooks/useAuthRedux';
import defaultAvatar from "../../assets/default-profile.png"
import UserStatusDropDown from './UserStatusDropDown';
import FriendsList from './FriendsList';
const UserNavigation = () => {
  const { user } = useAuthRedux();
  const navigate = useNavigate();
  const { palette } = useTheme();

  let image;
  if(user && user.UserData) image = JSON.parse(user.UserData.image);

  return (
    <Paper variant="outlined" sx={{m:.5, mt: 2, px: 1, py: 3, position: "fixed", width: "18.5em"}}>
        <List>
            <ListItem sx={{pl: 3}} >
                <Button  
                    sx={{border: 2, borderColor: palette.userStatus.online, minWidth: 0, borderRadius: 50, mr: 3, p:0.4}} 
                    color="secondary"  
                    onClick={() => navigate("/profile")}
                >
                    {image ? 
                        <Image 
                            src={image.url} 
                            transformation={[{
                                height: 40,
                                width: 40,
                            }]} 
                            style={{borderRadius: "50%"}}
                            alt="profile-avatar"
                            /> :
                        <img src={defaultAvatar} alt="profile-avatar" style={{height: "40px", width: "40px"}}/>
                    }
                </Button>
                <Stack>
                    <Typography variant="body1" align='left'>@{user.username}</Typography>
                    <Typography variant="body2" align='left'>{user.UserData.firstName} {user.UserData.lastName}</Typography>
                </Stack>
            </ListItem>
            <ListItem sx={{pl: 3}} >
                <UserStatusDropDown/> 
            </ListItem>
            <Divider/>
            <ListItem disablePadding   sx={{pl: 3, mt: 2, flexDirection: "column", alignItems: "flex-start"}} >
                <FriendsList/>
            </ListItem>
        </List>
        <List></List>
    </Paper>

  )
}

export default UserNavigation