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
  const status = user.UserStatus.status;

  let image;
  if(user && user.UserData) image = JSON.parse(user.UserData.image);

  return (
    <Paper variant="outlined" sx={{m:.5, mt: 2, px: 1, py: {xs: 1, md:3}, position: "fixed", width: {md:"18.5em"}}}>
        <List>
            <ListItem sx={{pl: 3}} >
                <Button  
                    sx={{border: 2, borderColor: palette.userStatus[status], width: 48, height: 48, minWidth: 48, borderRadius: 50, mr: 1}} 
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
                <Stack sx={{overflow: "hidden"}}>
                    <Typography variant="body1" align='left' noWrap>@{user.username}</Typography>
                    <Typography variant="body2" align='left' noWrap>{user.UserData.firstName} {user.UserData.lastName}</Typography>
                </Stack>
            </ListItem>
            <ListItem sx={{pl: 3}} >
                <UserStatusDropDown/> 
            </ListItem>
            <Divider/>
            <ListItem disablePadding   sx={{pl: 2, mt: 2, flexDirection: "column", alignItems: "flex-start"}} >
                <FriendsList/>
            </ListItem>
        </List>
        <List></List>
    </Paper>

  )
}

export default UserNavigation