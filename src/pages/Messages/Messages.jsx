import React from 'react'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import { Container, Alert, Grid, Stack, Box} from "@mui/material"
import MessagesNavigation from './MessagesNavigation'
import MessagesFeed from './MessagesFeed'


const Messages = () => {

  return (
    <AuthorizedPageContainer>
      {/* <Box sx={{position: "absolute", top: 0, left: 0, width: "100%", mx: "auto"}}>
        <Container sx={{height: "100vh", display: "flex", flexDirection: "row", pt: "5em", pb: "2em"}} maxWidth="xl">
          <MessagesNavigation/>

        </Container>
      </Box> */}

      {/* ORIG */}
      {/* <Container sx={{height: "100vh", display: "flex", flexDirection: "row", pt: "4.5em", pb: ".5em"}} maxWidth="xl"> */}
      <Container maxWidth="xl">
        <Grid container my={1} sx={{height: "inherit"}} spacing={1}>
          <Grid item md={3}><MessagesNavigation/></Grid>
          <Grid item md={9}><MessagesFeed/></Grid>
        </Grid>
      </Container>

    </AuthorizedPageContainer>
  )
}

export default Messages