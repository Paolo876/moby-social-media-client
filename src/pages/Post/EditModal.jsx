import { useState, useEffect } from 'react'
import usePostActions from '../../hooks/usePostActions';
import usePostsRedux from "../../hooks/usePostsRedux";
import useAuthRedux from '../../hooks/useAuthRedux';
import useImagekit from '../../hooks/useImagekit';
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer';
import MyTextField from '../../components/MyTextField';
import UploadImageForm from '../../components/UploadImageForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { Container, Typography, Paper, Button, CircularProgress, Grid, FormGroup, Checkbox, FormControlLabel, Alert, Modal, Box, Divider, Stack } from '@mui/material';
import defaultImage from "../../assets/image-icon.png"
import LockIcon from '@mui/icons-material/Lock';

  
const validationSchema = Yup.object().shape({
  title: Yup.string().min(2).max(30),
  postText: Yup.string().min(30).max(800),
})

const EditModal = ({ open, handleClose, post }) => {
  const { user } = useAuthRedux();
  const { getAuthenticationEndpoint, uploadImage, isLoading: isImagekitLoading, error: imagekitError } = useImagekit();
  const { isLoading, error, editPost } = usePostActions();

  const [ image, setImage ] = useState(JSON.parse(post.image) ? JSON.parse(post.image).url : null);
  const [ isImageNew, setIsImageNew ] = useState(false)

  const [ authenticationEndpoint, setAuthenticationEndpoint ] = useState(null);
  const [ isPublic, setIsPublic ] = useState(true);
  
  useEffect(() => {

    getAuthenticationEndpoint().then(res => setAuthenticationEndpoint(res))
  }, [])


  const initialValues = {
    title: post.title,
    postText: post.postText,
  }

  const handleClick = (isConfirmed) => {
    if(isConfirmed){

    }
    handleCancel();
  }

  const handleCancel = () => {
    setImage(JSON.parse(post.image) ? JSON.parse(post.image).url : null)
    setIsPublic(true)
    setIsImageNew(false)
    handleClose();
  }

  const handleImageChange = (data) => {
    setImage(data)
    setIsImageNew(true)
  }

  
  const handleSubmit = async (values) => {
    //upload to imagekit
    if(isImageNew && image) {
      const res = await uploadImage({
        file: image,
        authenticationEndpoint,
        fileName: `post_${user.id}`,
        folder: "/moby/posts/"
      })
      if(!imagekitError){
        const { fileId, name, url, thumbnailUrl } = res;
        editPost({data:{ data: {...values, isPublic, image: JSON.stringify({ fileId, name, url, thumbnailUrl })}, isImageNew }, id: post.id })
      }
    } else if(isImageNew && !image) {
      //remove image from db
      editPost({data:{ data: {...values, isPublic, image }, isImageNew }, id: post.id })
    } else {
      editPost({data:{ data: {...values, isPublic, image }, isImageNew }, id: post.id })
    }
  }
  return (
    <Modal open={open} >
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: "100%",
          height: "100vh",
          overflow: "auto"
        }}
      >
      <Container>
      <Grid container direction="row" alignItems="flex-start" sx={{justifyContent: {xs: "center"}, height: "75vh"}} >
          <Grid item xs={12} md={8} py={2}>
            <Paper sx={{py: 5, px: {xs: 2, md:8}, width: "100%", mx: "auto" }} elevation={4}>
              {error && <Alert severity='error'>{error}</Alert>}
              <Typography variant="h5" mx={1} p={.5} align="left">Edit Post</Typography>
              <Divider/>
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
                    inputProps={{ maxLength: 30 }}
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
                    inputProps={{ maxLength: 800 }}
                  />
                  <UploadImageForm
                    setImage={handleImageChange} 
                    isImageNew={isImageNew}
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
                    <Typography variant="subtitle2" fontWeight={400} pl={2} mt={.75} sx={{opacity: .7}} color="secondary">
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
                  <Stack flexDirection="row" alignItems="center" justifyContent="center" mt={4} gap={3}>
                    <Button variant="contained" type="submit" disabled={isLoading || isImagekitLoading}>Save Changes</Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleCancel()} disabled={isLoading || isImagekitLoading} type="button">Cancel</Button>
                  </Stack>
                </Form>
              </Formik>
            </Paper>
          </Grid>
        </Grid>
      </Container>


      </Box>
    </Modal>
      )
}

export default EditModal