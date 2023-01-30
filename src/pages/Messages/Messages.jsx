import React from 'react'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import { Container, Alert, Grid } from "@mui/material"
import MessagesNavigation from './MessagesNavigation'
import MessagesFeed from './MessagesFeed'

const Messages = () => {
  return (
    <AuthorizedPageContainer>
      <Container>
        <Grid container my={1}>
          <Grid item md={3}><MessagesNavigation/></Grid>
          <Grid item md={9}><MessagesFeed/></Grid>
        </Grid>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Messages