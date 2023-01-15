import AuthorizedPageContainer from "../../components/AuthorizedPageContainer";
import { Grid } from "@mui/material"
import UserNavigation from "./UserNavigation";
import PostsFeed from "./PostsFeed";
const Home = () => {

  return (
    <AuthorizedPageContainer>
      <Grid container>
        <Grid item xs={2.5}>
          <UserNavigation/>
        </Grid>
        <Grid item xs={9.5}>
          <PostsFeed/>
        </Grid>
      </Grid>
    </AuthorizedPageContainer>
  )
}

export default Home