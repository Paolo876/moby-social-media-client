import { useState, useEffect } from 'react'
import useImagekit from "../../hooks/useImagekit"
import useAuthRedux from '../../hooks/useAuthRedux';
import UploadImageForm from '../../components/UploadImageForm'
import { Grid, Paper, Typography, Divider, Box, Button } from '@mui/material'
import defaultAvatar from "../../assets/default-profile.png"
import LoadingSpinner from "../../components/LoadingSpinner"


const UpdateProfilePictureForm = ({ imageData }) => {
  const [ image, setImage ] = useState(imageData && imageData.url)
  const [ isImageNew, setIsImageNew ] = useState(false)
  const [ authenticationEndpoint, setAuthenticationEndpoint ] = useState(null);
  const { getAuthenticationEndpoint, uploadImage, isLoading, error } = useImagekit();
  const { user } = useAuthRedux();


  useEffect(() => {
    getAuthenticationEndpoint().then(res => setAuthenticationEndpoint(res))
  }, [])


  const handleImageChange = (data) => {
    setImage(data)
    setIsImageNew(true)
  }


  const handleSubmit = async () => {
    //upload to imagekit
    if(isImageNew && image) {
        const res = await uploadImage({
            file: image,
            authenticationEndpoint,
            fileName: `profile_${user.id}`,
            folder: "/moby/profile-images/"
        })
        if(!error){
            const { fileId, name, url, thumbnailUrl } = res;
            const result = JSON.stringify({fileId, name, url, thumbnailUrl})
        }
    } else if(isImageNew && !image) {
        //remove image from db
    }
    setIsImageNew(false)

  }
 console.log(image)
  return (
    <Grid item xs={12} md={8} py={.75}>
        <Paper sx={{py: 2, px: {xs: 2, md:8}, width: "100%", mx: "auto" }} elevation={2}>
        <Typography variant="h5" mt={2} fontWeight={600}>Profile Picture</Typography>
        <Divider/>
        <Box sx={{my: 4}}>
            <UploadImageForm
            setImage={handleImageChange} 
            isImageNew={isImageNew}
            image={image} 
            defaultImage={defaultAvatar}
            previewStyle={{ height: "100px", width: "100px", borderRadius: "50%" }}
            width={200}
            height={200}
            border={20}
            borderRadius={100}
            />
        </Box>
        <Box sx={{display: "flex", alignItems: "center", width: "100%", justifyContent: "center", my: 2}}>
           {image && isImageNew && <Button sx={{maxWidth: 500}} variant="contained" size="medium" color="secondary" type="button" disabled={isLoading}>Update Profile Picture</Button>}
           {!image && imageData && isImageNew && <Button sx={{maxWidth: 500}} variant="contained" size="medium" color="warning" type="button" disabled={isLoading}>Remove Profile Picture</Button>}
        </Box>
        </Paper>
    </Grid>
  )
}

export default UpdateProfilePictureForm