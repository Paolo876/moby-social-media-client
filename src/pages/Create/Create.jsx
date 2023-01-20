import { useState } from 'react'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer';
import MyTextField from '../../components/MyTextField';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Container, Typography, Paper, Button, Alert, CircularProgress, Grid, FormGroup, FormControl, Checkbox, FormControlLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UploadImageForm from '../../components/UploadImageForm';
import defaultImage from "../../assets/image-icon.png"
import usePostsRedux from "../../hooks/usePostsRedux";

const Create = () => {
    const { isLoading, error } = usePostsRedux();
    const [ image, setImage ] = useState(null);
    const [ isPublic, setIsPublic ] = useState(true);
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2).max(20),
        postText: Yup.string().min(6).max(2000),
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
            <Grid container direction="row" alignItems="flex-start" sx={{justifyContent: {xs: "center"}, height: "75vh"}} >
                <Grid item xs={12} md={8} py={2}>
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
                                <UploadImageForm
                                    setImage={setImage} 
                                    image={image} 
                                    title={<>Cover Image <small>(optional)</small></>}
                                    defaultImage={defaultImage}
                                    previewStyle={{height: "175px", width: "220px"}}
                                    width={500}
                                    height={400}
                                    border={20}
                                    borderRadius={0}
                                />
                                <FormGroup>
                                    <Typography variant="body1" fontSize={17}>Post Privacy</Typography>
                                    <Typography variant="subtitle2" fontWeight={400} pl={2} mt={.75} sx={{opacity: .7}}>
                                        {isPublic ? 
                                            "Public: Any user can access, view, and write a comment on the post." : 
                                            "Private: Only the author's friends can access, view, and write a comment on the post."}
                                    </Typography>
                                    <FormControlLabel 
                                        control={<Checkbox checked={isPublic} 
                                        onChange={() => setIsPublic(prevState => !prevState)} />} 
                                        label="Set as Public" 
                                        sx={{ml: 2, mt: 1}}   
                                        />

                                </FormGroup>
                                {!isLoading && <Button variant="contained" size="large" sx={{mt: 8}} type="submit">Create Post</Button>}
                                {isLoading && <Button variant="contained" type="submit" size="large" sx={{ mt: 8 }} disabled>
                                    <CircularProgress color="secondary" size={16} thickness={6} sx={{ml: 2}}/>
                                </Button>}   
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