import AuthorizedPageContainer from "../../components/AuthorizedPageContainer";
import { Grid, Container } from "@mui/material"
import UserNavigation from "./UserNavigation";
import PostsFeed from "./PostsFeed";
const Home = () => {

  return (
    <AuthorizedPageContainer>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={3}>
            <UserNavigation/>
          </Grid>
          <Grid item xs={9}>
            <PostsFeed/>
          </Grid>
        </Grid>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Home