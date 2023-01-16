import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthRedux from '../hooks/useAuthRedux';
import AuthorizedPageContainer from '../components/AuthorizedPageContainer';
import { Container, Typography, Paper, Button, Alert, CircularProgress } from '@mui/material';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextField from '../components/MyTextField';
import UploadImageForm from '../components/UploadImageForm';
import useImagekit from '../hooks/useImagekit';
import LoadingSpinner from "../components/LoadingSpinner"
const initialValues = {
  firstName: "",
  lastName: "",
  birthday: "",
}
const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(1).max(15).required(),
  lastName: Yup.string().min(1).max(20).required(),
  birthday: Yup.date()
})

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { isLoading, error, profileSetup, user } = useAuthRedux();
  const { getAuthenticationEndpoint, uploadImage, isLoading: isImagekitLoading, error: imagekitError } = useImagekit();
  const [ showDate, setShowDate ] = useState(false);
  const [ image, setImage ] = useState(null);
  const [ authenticationEndpoint, setAuthenticationEndpoint ] = useState(null);
  useEffect(() => {
    if(user.UserData) navigate("/")
  }, [user, navigate])

  useEffect(() => {
    getAuthenticationEndpoint().then(res => setAuthenticationEndpoint(res))
  }, [])

  const handleSubmit = async (data) => {
    if(image){
      //upload to imagekit
      const res = await uploadImage({
        file: image,
        authenticationEndpoint,
        fileName: `profile_${user.id}`,
        folder: "/moby/profile-images/"
      })
      if(!imagekitError){
        const { fileId, name, url, thumbnail } = res;
        const imageData = JSON.stringify({fileId, name, url, thumbnail})
        profileSetup({...data, image: imageData})
      }
    } else {
      profileSetup({...data, image})
    }
  }

  return (
    <AuthorizedPageContainer>
      {isImagekitLoading && <LoadingSpinner isModal={true} message="Uploading Image..."/>}
      {isLoading && <LoadingSpinner isModal={true} message="Updating Profile..."/>}
      <Container sx={{pt: 1.5}}>
        <Paper sx={{py: 5, px: {xs: 2, md:8}, width: "fit-content", mx: "auto"}} elevation={4}>
          {imagekitError && <Alert severity="error">{imagekitError}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Typography variant="h5" fontWeight={700} mb={2} align="center">Welcome to Moby, {user.username}!</Typography>
          <Typography variant="body1" mb={5} fontWeight={400} letterSpacing={1} align="center" lineHeight={1.4}>Before we get started, let's setup your profile.</Typography>
          <Formik  
            initialValues={initialValues}
            onSubmit={handleSubmit} 
            validationSchema={validationSchema}
          >
            <Form style={{display: "flex", flexDirection: "column", my: 5}}>
              <MyTextField 
                id="firstName" 
                name="firstName"
                type="text" 
                label={<p>First Name</p>} 
                variant="standard" 
                sx={{my:1, minWidth: "320px"}}
                error="First Name is Required."
              />
              <MyTextField 
                id="lastName" 
                name="lastName"
                type="text" 
                label={<p>Last Name</p>} 
                variant="standard" 
                sx={{my:1, minWidth: "320px"}}
                error="Last Name is Required."
              />
              <MyTextField 
                id="birthday" 
                name="birthday"
                type={showDate ? "date" : "text" }
                onFocus={() => setShowDate(true)}
                onBlur={(e) => {
                  if(e.target.value === "") setShowDate(false)
                }}
                label={<p>Birthday</p>} 
                variant="standard" 
                sx={{my:1, minWidth: "320px"}}
                error="Last Name is Required."
              />
              <UploadImageForm
                setImage={setImage} 
                image={image} 
                title="Profile Picture"
              />
              {!isLoading && <Button variant="contained" size="large" sx={{mt: 4}} type="submit">Update profile</Button>}
              {isLoading && <Button variant="contained" type="submit" size="large" sx={{ mt: 5 }} disabled>
                Update profile<CircularProgress color="secondary" size={16} thickness={6} sx={{ml: 2}}/>
              </Button>}    
            </Form>
          </Formik>
        </Paper>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default ProfileSetup