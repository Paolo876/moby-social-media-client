import { useState, useEffect } from 'react'
import usePostsRedux from "../../hooks/usePostsRedux";
import useAuthRedux from '../../hooks/useAuthRedux';
import useImagekit from '../../hooks/useImagekit';
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer';
import MyTextField from '../../components/MyTextField';
import UploadImageForm from '../../components/UploadImageForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { Container, Typography, Paper, Button, CircularProgress, Grid, FormGroup, Checkbox, FormControlLabel, Alert } from '@mui/material';
import defaultImage from "../../assets/image-icon.png"


const Create = () => {
    const { user } = useAuthRedux();
    const { isLoading, error, createPost } = usePostsRedux();
    const { getAuthenticationEndpoint, uploadImage, isLoading: isImagekitLoading, error: imagekitError } = useImagekit();
    const [ image, setImage ] = useState(null);
    const [ authenticationEndpoint, setAuthenticationEndpoint ] = useState(null);
    const [ isPublic, setIsPublic ] = useState(true);

    useEffect(() => {
        getAuthenticationEndpoint().then(res => setAuthenticationEndpoint(res))
      }, [])

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2).max(20),
        postText: Yup.string().min(6).max(2000),
    })
    const initialValues = {
        title: "",
        postText: "",
    }

    const handleSubmit = async (data) => {
        if(image){
            //upload to imagekit
            const res = await uploadImage({
              file: image,
              authenticationEndpoint,
              fileName: `post_${user.id}`,
              folder: "/moby/posts/"
            })
            if(!imagekitError){
                const { fileId, name, url, thumbnailUrl } = res;
                const imageData = JSON.stringify({fileId, name, url, thumbnailUrl})
                createPost({...data, image: imageData, isPublic})
              }
        }else {
            createPost({...data, image, isPublic})
        }
    }
  return (
    <AuthorizedPageContainer>
        {isImagekitLoading && <LoadingSpinner isModal={true} message="Uploading Image..."/>}
        {isLoading && <LoadingSpinner isModal={true} message="Creating Post..."/>}
        <Container>
            <Grid container direction="row" alignItems="flex-start" sx={{justifyContent: {xs: "center"}, height: "75vh"}} >
                <Grid item xs={12} md={8} py={2}>
                    <Paper sx={{py: 5, px: {xs: 2, md:8}, width: "100%", mx: "auto" }} elevation={4}>
                        <Typography variant="h4" fontWeight={700} mb={2} letterSpacing={.5}>Create A New Post</Typography>
                        {imagekitError && <Alert severity="error">{imagekitError}</Alert>}
                        {error && <Alert severity="error">{error}</Alert>}
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
                                    width={600}
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