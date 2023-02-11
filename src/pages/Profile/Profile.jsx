import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useProfileActions from '../../hooks/useProfileActions';
import useAuthRedux from '../../hooks/useAuthRedux';
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import LoadingSpinner from "../../components/LoadingSpinner"
import { Container, Alert, Grid } from "@mui/material"
import ProfileHeader from './ProfileHeader';
import UserPostsList from './UserPostsList';

const Profile = () => {
  const UserId = useParams()["*"];
  const { getProfileById, isLoading, error } = useProfileActions();
  const { user: { id } } = useAuthRedux();
  const [ user, setUser ] = useState(null);
  const isOwnProfile = !UserId || parseInt(UserId) === id;

  
  useEffect(() => {
    getProfileById(UserId ? UserId : id ).then(res => setUser(res))
  }, [UserId])

  return (
    <AuthorizedPageContainer>
        {isLoading && <LoadingSpinner/>}
        {error && <Alert severity="error">{error}</Alert>}
        {user && <Container>
            <Grid container>
              <Grid item xs={12}><ProfileHeader id={user.id} username={user.username} createdAt={user.createdAt} userData={user.UserDatum} userBio={user.UserBio} isOwnProfile={isOwnProfile}/></Grid>
              <Grid item xs={12}><UserPostsList posts={user.Posts} user={{UserDatum: user.UserDatum, username: user.username, id: user.id}} isOwnProfile={isOwnProfile}/></Grid>
            </Grid>
        </Container>}
    </AuthorizedPageContainer>
  )
}

export default Profile