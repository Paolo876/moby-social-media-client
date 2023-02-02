import React from 'react'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import { Container, Alert, Grid } from "@mui/material"
import MessagesNavigation from './MessagesNavigation'
import MessagesFeed from './MessagesFeed'


const Messages = () => {

  return (
    <AuthorizedPageContainer>
      <Container sx={{height: "85vh"}} maxWidth="xl">
        <Grid container my={1} sx={{height: "100%"}} spacing={1}>
          <Grid item md={3}><MessagesNavigation/></Grid>
          <Grid item md={9}><MessagesFeed/></Grid>
        </Grid>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Messages