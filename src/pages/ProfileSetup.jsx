import React, { useState, useEffect } from 'react';
import useAuthRedux from '../hooks/useAuthRedux';
import AuthorizedPageContainer from '../components/AuthorizedPageContainer';
import { Container, Typography, Paper, Button } from '@mui/material';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextField from '../components/MyTextField';
import UploadImageForm from '../components/UploadImageForm';
import useImagekit from '../hooks/useImagekit';
import axios from 'axios';

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
  const { isLoading, error, profileSetup, user: { username,id } } = useAuthRedux();
  const { getAuthenticationEndpoint } = useImagekit();
  const [ showDate, setShowDate ] = useState(false);
  const [ image, setImage ] = useState(null);
  const [ authenticationEndpoint, setAuthenticationEndpoint ] = useState(null);

  useEffect(() => {
    getAuthenticationEndpoint().then(res => setAuthenticationEndpoint(res))
  }, [])


  const handleSubmit = async (data) => {
    if(image){

      const res = await axios.post("https://upload.imagekit.io/api/v1/files/upload", {
        file: image,
        publicKey: process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY,
        signature: authenticationEndpoint.signature,
        expire: authenticationEndpoint.expire,
        token: authenticationEndpoint.token,
        fileName: `profile_${id}`,
        folder: "/moby/profile-images/"
      }, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
      console.log(res)

    } else {
      profileSetup({...data, image})
    }
  }
  return (
    <AuthorizedPageContainer>
      <Container>
        <Paper sx={{py: 5, px: {xs: 2, md:8}, width: "fit-content", mx: "auto"}} elevation={4}>
          <Typography variant="h4" fontWeight={700} mb={3} align="center">Account created successfully!</Typography>
          <Typography variant="body1" mb={5} fontWeight={400} letterSpacing={1} align="center" lineHeight={1.4}>Welcome to Moby, <strong>{username}</strong>! <br/>Before we get started, let's setup your profile.</Typography>
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
              <Button variant="contained" size="large" sx={{mt: 4}} type="submit">Submit</Button>
            </Form>
          </Formik>
        </Paper>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default ProfileSetup