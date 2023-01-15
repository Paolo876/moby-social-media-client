import React from 'react'
import { Paper, Typography, List, ListItem, ListItemButton, ListItemIcon, Stack, Divider } from "@mui/material"
import Image from '../../components/Image';
import useAuthRedux from '../../hooks/useAuthRedux';
import defaultAvatar from "../../assets/default-profile.png"
import UserStatusDropDown from './UserStatusDropDown';
import FriendsList from './FriendsList';

const UserNavigation = () => {
  const { user } = useAuthRedux();

  let image;
  if(user && user.UserData) image = JSON.parse(user.UserData.image);

  return (
    <Paper variant="outlined" sx={{m:.5, p: 1, height: "100%" }}>
        <List>
            <ListItem disablePadding>
                <ListItemButton sx={{pl: 3}} onClick={() => console.log("/profile")}>
                    <ListItemIcon sx={{border: 3, borderColor: "green", minWidth: 0, borderRadius: 50, mr: 3}}>
                        {image ? 
                            <Image 
                                src={image.url} 
                                transformation={[{
                                    height: 40,
                                    width: 40,
                                }]} 
                                style={{borderRadius: "50%"}}
                                /> :
                            <img src={defaultAvatar} style={{height: "40px", width: "40px"}}/>
                        }
                    </ListItemIcon>
                    <Stack>
                        <Typography variant="body1">@{user.username}</Typography>
                        <Typography variant="body2">{user.UserData.firstName} {user.UserData.lastName}</Typography>
                    </Stack>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton disableRipple={true} disableTouchRipple={true}  sx={{pl: 3}}>
                    <UserStatusDropDown/> 
                </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem disablePadding   sx={{pl: 3, mt: 2}}>
                <FriendsList/>
            </ListItem>
        </List>
    </Paper>

  )
}

export default UserNavigation