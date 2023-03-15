import { useNavigate, useParams } from 'react-router-dom'
import { Paper, Divider, List, ListItemButton, ListItem, Stack, Typography, Badge, Box } from '@mui/material'
import SearchUserForm from './SearchUserForm'
import { formatDistanceToNow } from 'date-fns'
import useChatRedux from '../../hooks/useChatRedux'
import useAuthRedux from '../../hooks/useAuthRedux'
import LoadingSpinner from '../../components/LoadingSpinner'
import Image from '../../components/Image'
import defaultAvatar from "../../assets/default-profile.png"
import { styled } from '@mui/material/styles';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.light,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


const MessagesNavigation = () => {
  const navigate = useNavigate();
  const params = useParams()["*"]
  const { isLoading, chatRooms } = useChatRedux();
  const { user: { id }} = useAuthRedux();
  return (
    <Paper sx={{width: "100%", display: "flex", flexDirection: "column", overflow: "hidden", height: "100%"}}>
      <Box sx={{width: "100%"}}><SearchUserForm/></Box>
      <Divider/>
        <List sx={{width: "100%", overflowY: "auto", display: "flex", flexDirection: "column"}}>
          <ListItem alignItems="flex-start" sx={{justifyContent: "center", p:0, overflow: "hidden"}}>
            {isLoading && <LoadingSpinner style={{minHeight: "0em", backgroundColor: "initial", transform: "scale(.45)", opacity: .75}}/>}
          </ListItem>
          {chatRooms.map(({ ChatRoom }) => 
            <ListItemButton 
              sx={{ background: ChatRoom.isLastMessageRead[0].isLastMessageRead ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.025)", position: "relative", }} 
              key={ChatRoom.id} 
              disabled={isLoading} 
              onClick={() => navigate(`/messages/${ChatRoom.id}`)} 
              selected={ChatRoom.id === parseInt(params)}
              >
              {ChatRoom.ChatMembers[0].User.UserDatum && ChatRoom.ChatMembers[0].User.UserDatum.image ? 
                <Image 
                  src={JSON.parse(ChatRoom.ChatMembers[0].User.UserDatum.image).url} 
                  transformation={[{
                      height: 40,
                      width: 40,
                  }]} 
                  style={{borderRadius: "50%"}}
                  alt="profile-avatar"
                /> : <img src={defaultAvatar} style={{height: "40px", width: "40px"}} alt="profile-avatar"/>
              }
              <Stack ml={1} width="100%">
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography 
                    variant="body2" 
                    align='left'
                    fontWeight={ChatRoom.isLastMessageRead[0].isLastMessageRead ? 500 : 600}
                  >
                    {ChatRoom.ChatMembers[0].User.username}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    align='right' 
                    fontSize={".7em"} 
                    fontWeight={ChatRoom.isLastMessageRead[0].isLastMessageRead ? 300 : 400}
                  >
                    {formatDistanceToNow(Date.parse(ChatRoom.ChatMessages[0].createdAt))} ago
                  </Typography>
                </Stack>
                <Typography 
                  variant="body1" 
                  align='left' 
                  fontSize={".8em"} 
                  fontWeight={ChatRoom.isLastMessageRead[0].isLastMessageRead ? 300 : 400}
                >
                  {ChatRoom.ChatMessages[0].UserId === id && "You: "}
                  {ChatRoom.ChatMessages[0].message.length > 45 ? `${ChatRoom.ChatMessages[0].message.substr(0,40)}...` : ChatRoom.ChatMessages[0].message}
                  </Typography>
              </Stack>
              {!ChatRoom.isLastMessageRead[0].isLastMessageRead &&
                <Box sx={{position: "absolute", top: 2, right: 12}}>
                  <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                  ></StyledBadge>
                </Box>
              }
            </ListItemButton>
          )}
        </List>

    </Paper>
  )
}

export default MessagesNavigation