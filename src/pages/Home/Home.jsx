import AuthorizedPageContainer from "../../components/AuthorizedPageContainer";
import UserNavigation from "./UserNavigation";
import PostsFeed from "./PostsFeed";
import { Grid, Container, Box } from "@mui/material"

const Home = () => {

  return (
    <AuthorizedPageContainer>
      {/* UserNavigation set to a fixed floating position */}
      <Box sx={{position: "fixed", top: "10%", left: 0, height: "100%", width: "100%", zIndex: 1, display: {md: "initial", xs: "none"}}}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={3} sm={2} md={4} lg={3}><UserNavigation/></Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="xl" sx={{position: "relative"}}>
        <Grid container direction="row" alignItems="center" sx={{justifyContent: {lg: "center", md: "right", xs: "center"}, pr: {lg: 0, md: 10}}}>
          <Grid item xs={12} sm={8} md={7} lg={6}><PostsFeed/></Grid>
        </Grid>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Home