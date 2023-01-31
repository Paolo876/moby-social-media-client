import React from 'react'
import { useParams, Routes, Route } from 'react-router-dom'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import { Container, Alert, Grid } from "@mui/material"
import MessagesNavigation from './MessagesNavigation'
import MessagesFeed from './MessagesFeed'
import NewMessageFeed from './NewMessageFeed'
const Messages = () => {

  return (
    <AuthorizedPageContainer>
      <Container sx={{height: "85vh"}} maxWidth="xl">
        <Grid container my={1} sx={{height: "100%"}}>
          <Grid item md={3}><MessagesNavigation/></Grid>
          <Routes>
            <Route element={<Grid item md={9}><MessagesFeed/></Grid>} path="/*"/>
            <Route element={<Grid item md={9}><NewMessageFeed/></Grid>} path="/new/:id"/>
          </Routes>
        </Grid>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Messages