import React, { useState } from 'react';
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer';
import { Container, Typography, Paper, Button, TextField, Alert, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextField from '../../components/MyTextField';

const ProfileSetup = () => {
  const [ showDate, setShowDate ] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    birthday: "",
    image: null,
  }
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(1).max(15).required(),
    lastName: Yup.string().min(1).max(20).required(),
    birthday: Yup.date()
  })
  const handleSubmit = () => {
    
  }
  return (
    <AuthorizedPageContainer>
      <Container>
        <Paper sx={{py: 5, px: {xs: 2, md:8}, width: "fit-content", mx: "auto"}} elevation={4}>
          <Typography variant="h4" fontWeight={700} mb={2} letterSpacing={1} align="center">Welcome To Moby!</Typography>
          <Typography variant="body1" mb={4} fontWeight={400} letterSpacing={1} align="center">Before we get started, let's setup your profile.</Typography>
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
            </Form>
          </Formik>
        </Paper>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default ProfileSetup