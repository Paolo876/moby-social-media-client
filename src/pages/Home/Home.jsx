import { useEffect } from "react";
import AuthorizedPageContainer from "../../components/AuthorizedPageContainer";
import UserNavigation from "./UserNavigation";
import PostsFeed from "./PostsFeed";
import { Grid, Container } from "@mui/material"
const Home = () => {
  return (
    <AuthorizedPageContainer>
      <Container maxWidth="xl" sx={{position: "relative"}}>
        <Grid container direction="row" alignItems="flex-start" sx={{justifyContent: {md: "initial", xs: "center"}}}>
          <Grid item xs={3} sm={2} md={4} lg={3} sx={{display: {md: "initial", xs: "none"}}}><UserNavigation/></Grid>
          <Grid item xs={12} sm={10} md={7} lg={5.5}><PostsFeed/></Grid>
        </Grid>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Home