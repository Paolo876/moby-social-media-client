import { useEffect, useState } from 'react'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import { Container, Grid, Alert } from '@mui/material'
import useProfileActions from '../../hooks/useProfileActions';
import LoadingSpinner from "../../components/LoadingSpinner"
import UpdateProfilePictureForm from './UpdateProfilePictureForm';
import UserSettingsForm from './UserSettingsForm';


const Settings = () => {
  const { getProfileById, isLoading, error } = useProfileActions();
  const [ imageData, setImageData ] = useState(null)
  const [ initialData, setInitialData ] = useState(null)


  useEffect(() => {
    getProfileById().then(data => {
      setInitialData({
        firstName: data.UserDatum.firstName,
        lastName: data.UserDatum.lastName,
        birthday: data.UserDatum.birthday,
        body : data.UserBio ? data.UserBio.body : "",
        links: data.UserBio && data.UserBio.links ? JSON.parse(data.UserBio.links) : [],
      })
      setImageData(JSON.parse(data.UserDatum.image) ? JSON.parse(data.UserDatum.image) : null)
    })
  }, [])


  return (
    <AuthorizedPageContainer>
      <Container sx={{pt: 1.5}}>
        {error && <Alert severity='error'>{error}</Alert>}
        {isLoading && <LoadingSpinner isModal={true}  message="Updating Data..."/>}
        <Grid container direction="row" alignItems="flex-start" sx={{justifyContent: {xs: "center"}, height: "75vh"}}>
          {initialData && <>
            <UpdateProfilePictureForm imageData={imageData}/>
            <UserSettingsForm initialData={initialData} setInitialData={setInitialData}/>
          </>
          }
        </Grid>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Settings