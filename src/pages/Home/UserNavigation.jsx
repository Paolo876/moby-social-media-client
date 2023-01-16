import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, List, ListItem, ListItemButton, Stack, Divider, Button } from "@mui/material"
import Image from '../../components/Image';
import useAuthRedux from '../../hooks/useAuthRedux';
import defaultAvatar from "../../assets/default-profile.png"
import UserStatusDropDown from './UserStatusDropDown';
import FriendsList from './FriendsList';

const UserNavigation = () => {
  const { user } = useAuthRedux();
  const navigate = useNavigate();

  let image;
  if(user && user.UserData) image = JSON.parse(user.UserData.image);

  return (
    <Paper variant="outlined" sx={{m:.5, p: 1, height: "100%" }}>
        <List>
            <ListItem sx={{pl: 3}} >
                <Button  
                    sx={{border: 2, borderColor: "green", minWidth: 0, borderRadius: 50, mr: 3, p:0.4}} 
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
                            /> :
                        <img src={defaultAvatar} style={{height: "40px", width: "40px"}}/>
                    }
                </Button>
                <Stack>
                    <Typography variant="body1">@{user.username}</Typography>
                    <Typography variant="body2">{user.UserData.firstName} {user.UserData.lastName}</Typography>
                </Stack>
            </ListItem>
            <ListItemButton disableRipple={true} disableTouchRipple={true}  sx={{pl: 3}} >
                <UserStatusDropDown/> 
            </ListItemButton>
            <Divider/>
            <ListItem disablePadding   sx={{pl: 3, mt: 2, flexDirection: "column", alignItems: "flex-start"}} >
                <FriendsList/>
            </ListItem>
        </List>
    </Paper>

  )
}

export default UserNavigation