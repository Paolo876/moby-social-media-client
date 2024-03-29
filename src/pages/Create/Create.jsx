import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import usePostsRedux from "../../hooks/usePostsRedux";
import useAuthRedux from '../../hooks/useAuthRedux';
import useImagekit from '../../hooks/useImagekit';
import useSocketIo from '../../hooks/useSocketIo';
import useCreatePostActions from '../../hooks/useCreatePostActions';
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer';
import MyTextField from '../../components/MyTextField';
import UploadImageForm from '../../components/UploadImageForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { Container, Typography, Paper, Button, CircularProgress, Grid, FormGroup, Checkbox, FormControlLabel, Alert, Divider } from '@mui/material';
import defaultImage from "../../assets/image-icon.png"
import LockIcon from '@mui/icons-material/Lock';

const Create = () => {
    const { user } = useAuthRedux();
    const { addPost } = usePostsRedux();
    const { createPost, isLoading, error } = useCreatePostActions();
    const { getAuthenticationEndpoint, uploadImage, isLoading: isImagekitLoading, error: imagekitError } = useImagekit();
    const { emitCreatedPost } = useSocketIo();
    const navigate = useNavigate();

    const [ image, setImage ] = useState(null);
    const [ authenticationEndpoint, setAuthenticationEndpoint ] = useState(null);
    const [ isPublic, setIsPublic ] = useState(true);

    useEffect(() => {
        getAuthenticationEndpoint().then(res => setAuthenticationEndpoint(res))
      }, [])

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2).max(30),
        postText: Yup.string().min(30).max(800),
    })
    const initialValues = {
        title: "",
        postText: "",
    }

    const handleSubmit = async (data) => {
        let result
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
                result = await createPost({...data, image: imageData, isPublic})
              }
        }else {
            result = await createPost({...data, image, isPublic})
        }

        addPost(result) //push to redux
        //emit to friends
        emitCreatedPost({
            title: `New Post from ${user.username}!`, 
            image: user.UserData.image, 
            header: result.title, 
            subheader: `${result.postText.slice(0,17)}...`, 
            id: result.id, 
            type: "post", 
            link: `/posts/${result.id}`,
        })
        navigate("/")
    }
  return (
    <AuthorizedPageContainer>
        {isImagekitLoading && <LoadingSpinner isModal={true} message="Uploading Image..."/>}
        {isLoading && <LoadingSpinner isModal={true} message="Creating Post..."/>}
        <Container>
            <Grid container direction="row" alignItems="flex-start" sx={{justifyContent: {xs: "center"}, height: "75vh"}} >
                <Grid item xs={12} md={8} py={2} >
                    <Paper sx={{py: {xs: 3, md:5}, px: {xs: 1.5, md:8}, width: "100%", mx: "auto" }} elevation={4}>
                    <Typography variant="h4" fontWeight={700} mb={{xs:.5, md :4}} fontSize={{xs: 20, md: 25}}>Create a New Post</Typography>
                        <Divider mb={2}/>
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
                                    required
                                    type="text" 
                                    label="Title"
                                    variant="standard" 
                                    sx={{my:{xs:1.5, md:4}, width: "100%"}}
                                    inputProps={{ maxLength: 30 }}
                                />
                                <MyTextField 
                                    id="postText" 
                                    name="postText"
                                    type="text" 
                                    label="Body"
                                    required
                                    variant="outlined" 
                                    rows={8}
                                    multiline
                                    sx={{my:{xs:.5, md:1}, width: "100%"}}
                                    inputProps={{ maxLength: 800 }}
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
                                    isStackOnMobile
                                />
                                <FormGroup>
                                    <Typography variant="body1" fontSize={17}>Post Privacy</Typography>
                                    <Typography variant="subtitle2" fontWeight={400} pl={{xs: 1, md:2}} mt={.75} sx={{opacity: .7}} color="secondary" fontSize={{xs: 12, md:14}}>
                                        {isPublic ? 
                                            "Public: Any user can access, view, and write a comment on the post." : 
                                            "Private: Only the author's friends can access, view, and write a comment on the post."}
                                    </Typography>
                                    <FormControlLabel 
                                        control={<Checkbox checked={isPublic} 
                                        onChange={() => setIsPublic(prevState => !prevState)} />} 
                                        label={<Typography varant="body1" fontWeight={400} sx={{opacity: isPublic ? 1 : .5}}>Set as Public {!isPublic && <small><LockIcon fontSize="inherit"/></small>}</Typography>}
                                        sx={{ml: 2, mt: .5}}   
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