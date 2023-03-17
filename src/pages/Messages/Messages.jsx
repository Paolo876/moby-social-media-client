import { useParams, useNavigate } from 'react-router-dom'
import useChatRedux from '../../hooks/useChatRedux'
import LoadingSpinner from '../../components/LoadingSpinner'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import { Grid, Box, Button } from "@mui/material";
import MessagesNavigation from './MessagesNavigation'
import MessagesFeed from './MessagesFeed'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
const Messages = () => {
  const { chatRooms } = useChatRedux();
  const params = useParams()["*"];
  const navigate = useNavigate();
  const isInChatRoom = Boolean(params)

  return (
    <AuthorizedPageContainer>
      {!chatRooms && <LoadingSpinner isModal={true} message="Loading Data..."/>}
      {chatRooms &&
        <Box sx={{position: "fixed", top: 0, left: 0, height: "100vh", width: "100%"}}>
            <Grid container my={1} sx={{height: "100%"}} maxWidth="xl" mx="auto">
              <Grid item xs={12} md={3} sx={{width: "100%", display: {xs: isInChatRoom ? "none" : "flex", md:"flex"}, flexDirection: "column", height: "100%", mt: "4em", pb: "5em", px: 1}} ><MessagesNavigation/></Grid>
              <Grid item xs={12} md={9} sx={{width: "100%", display: {xs: isInChatRoom ? "flex" : "none", md:"flex"}, flexDirection: "column", height: {xs: "94%", md:"100%"}, mt: "4em", pb: "5em", px: {xs: .75, md: 0}}} >
                <Box sx={{display: {xs: "initial", md: "none"}, opacity: ".9", pb: .75}}>
                  <Button 
                    onClick={() => navigate("/messages")}
                    startIcon={<ChevronLeftIcon/>} 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    sx={{textTransform: "none"}}
                    >Back to Messages</Button>
                </Box>
                <MessagesFeed />
              </Grid>
            </Grid>
        </Box>
        }
    </AuthorizedPageContainer>
  )
}

export default Messages