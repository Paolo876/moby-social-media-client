import React from 'react'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import { Container, Alert, Grid, Stack, Box} from "@mui/material"
import MessagesNavigation from './MessagesNavigation'
import MessagesFeed from './MessagesFeed'


const Messages = () => {

  return (
    <AuthorizedPageContainer>
      <Box sx={{position: "fixed", top: 0, left: 0, height: "100vh", width: "100%"}}>
          <Grid container my={1} sx={{height: "100%"}} spacing={1} maxWidth="xl" mx="auto">
            <Grid item md={3} sx={{width: "100%", display: "flex", flexDirection: "column", height: "100%", mt: "4em", pb: "5em"}} ><MessagesNavigation/></Grid>
            {/* <Grid item md={9}><MessagesFeed/></Grid> */}
          </Grid>
      </Box>
    </AuthorizedPageContainer>
  )
}

export default Messages