import { useState } from "react"
import AuthorizedPageContainer from "../../components/AuthorizedPageContainer";
import UserNavigation from "./UserNavigation";
import PostsFeed from "./PostsFeed";
import { Grid, Container, Modal, IconButton, Slide ,Paper, Box } from "@mui/material"

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const Home = () => {
  const [ showModal, setShowModal ] = useState(false);

  return (
    <AuthorizedPageContainer>
      <Container maxWidth="xl" sx={{position: "relative"}}>
        <Slide direction="right" in={!showModal} mountOnEnter unmountOnExit>
          <Paper elevation={3} sx={{background: "rgba(46, 119, 157, .5)", position: "fixed", left: -7, top: "12%", zIndex: 5, display: {md: "none", xs: "initial"}}}>
            <IconButton  color="secondary" onClick={() => setShowModal(true)}><KeyboardDoubleArrowRightIcon /></IconButton>
          </Paper>
        </Slide>

        <Grid container direction="row" alignItems="flex-start" sx={{justifyContent: {md: "initial", xs: "center"}}}>
          <Grid item xs={12} md={4} lg={3} sx={{zIndex: 5, display: {md: "none", xs: "initial"}}}>
            <Modal open={showModal} onClose={() => setShowModal(false)}>
              <Slide direction="right" in={showModal} mountOnEnter unmountOnExit>
                <Box><UserNavigation/></Box>
              </Slide>
            </Modal>
          </Grid>
          <Grid item md={4} lg={3} sx={{display: {md: "initial", xs: "none"}}}><UserNavigation/></Grid>
          <Grid item xs={12} sm={10} md={7} lg={5.5}><PostsFeed/></Grid>
        </Grid>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Home