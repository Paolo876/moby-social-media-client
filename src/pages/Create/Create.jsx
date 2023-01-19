import React from 'react'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer';
import MyTextField from '../../components/MyTextField';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Container, Typography, Paper, Button, Alert, CircularProgress, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Create = () => {
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2).max(20).required(),
        postText: Yup.string().min(6).max(2000).required(),
    })
    const initialValues = {
        title: "",
        postText: "",
    }

    const handleSubmit = () => {
      
    }
  return (
    <AuthorizedPageContainer>
        <Container>
            <Grid container direction="row" alignItems="flex-start" sx={{justifyContent: {xs: "center"}, height: "75vh"}} mt={2}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{py: 5, px: {xs: 2, md:8}, width: "100%", mx: "auto" }} elevation={4}>
                        <Typography variant="h4" fontWeight={700} mb={2} letterSpacing={.5}>Create A New Post</Typography>
                        <Formik  
                            initialValues={initialValues}
                            onSubmit={handleSubmit} 
                            validationSchema={validationSchema}
                        >
                            <Form style={{display: "flex", flexDirection: "column", my: 5}}>
                                <MyTextField 
                                    id="title" 
                                    name="title"
                                    type="text" 
                                    label="Title"
                                    variant="standard" 
                                    sx={{my:3, width: "100%"}}
                                />
                                <MyTextField 
                                    id="postText" 
                                    name="postText"
                                    type="text" 
                                    label="Body"
                                    variant="outlined" 
                                    rows={12}
                                    multiline
                                    sx={{my:1, width: "100%"}}
                                />
                            </Form>
                        </Formik>
                    </Paper>
                </Grid>
            </Grid>
            
        </Container>
    </AuthorizedPageContainer>
  )
}

export default Create