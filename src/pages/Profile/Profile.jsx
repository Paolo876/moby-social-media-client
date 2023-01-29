import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useProfileActions from '../../hooks/useProfileActions';
import useAuthRedux from '../../hooks/useAuthRedux';
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import LoadingSpinner from "../../components/LoadingSpinner"
import { Container, Paper, Alert, Grid } from "@mui/material"
import ProfileHeader from './ProfileHeader';
import UserPostsList from './UserPostsList';

const Profile = () => {
  const UserId = useParams()["*"];
  const { getProfileById, isLoading, error } = useProfileActions();
  const { user: { id } } = useAuthRedux();
  const [ user, setUser ] = useState(null);
  
  useEffect(() => {
    getProfileById(UserId ? UserId : id ).then(res => setUser(res))
  }, [UserId])

  return (
    <AuthorizedPageContainer>
        {isLoading && <LoadingSpinner/>}
        {error && <Alert severity="error">{error}</Alert>}
        {user && <Container>
            <Grid container>
              <Grid item xs={12}><ProfileHeader id={user.id} username={user.username} createdAt={user.createdAt} userData={user.UserDatum} userBio={user.UserBio}/></Grid>
              <Grid item xs={12}><UserPostsList posts={user.Posts}/></Grid>
            </Grid>
        </Container>}
    </AuthorizedPageContainer>
  )
}

export default Profile