import { useState, useEffect } from 'react'
import useImagekit from "../../hooks/useImagekit"
import useAuthRedux from '../../hooks/useAuthRedux';
import useSettingsActions from '../../hooks/useSettingsActions';
import UploadImageForm from '../../components/UploadImageForm'
import { Grid, Paper, Typography, Divider, Box, Button, Alert } from '@mui/material'
import defaultAvatar from "../../assets/default-profile.png"
import LoadingSpinner from "../../components/LoadingSpinner"


const UpdateProfilePictureForm = ({ imageData }) => {
  const [ image, setImage ] = useState(imageData && imageData.url)
  const [ isImageNew, setIsImageNew ] = useState(false)
  const [ authenticationEndpoint, setAuthenticationEndpoint ] = useState(null);
  const { getAuthenticationEndpoint, uploadImage, isLoading: isImagekitLoading, error: imagekitError } = useImagekit();
  const { isLoading, error, updateProfilePicture, success } = useSettingsActions();
  const { user, updateUserDataImage } = useAuthRedux();


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
        if(!imagekitError){
            const { fileId, name, url, thumbnailUrl } = res;
            const result = await updateProfilePicture({ image: JSON.stringify({fileId, name, url, thumbnailUrl}), isNewProfilePicture: true })
            updateUserDataImage(result.image)
        }
    } else if(isImageNew && !image) {
        //remove image from db
        await updateProfilePicture({isNewProfilePicture: false})
        updateUserDataImage(null)
    }
    setIsImageNew(false)
  }

  const handleCancel = () => {
    setIsImageNew(false)
    setImage(imageData && imageData.url)
  }
  return (
    <Grid item xs={12} md={8} py={.75}>
        {isLoading && <LoadingSpinner isModal={true}  message="Updating Profile Picture..."/>}
        <Paper sx={{py: 2, px: {xs: 2, md:8}, width: "100%", mx: "auto" }} elevation={2}>
        <Typography variant="h5" mt={2} fontWeight={600}>Profile Picture</Typography>
        <Divider/>
        <Box sx={{my: 4}}>
            {success && <Alert severity='success'>{success}</Alert>}
            {(error || imagekitError) && <Alert severity='error'>{error || imagekitError}</Alert>}
            <UploadImageForm
            setImage={handleImageChange} 
            isImageNew={isImageNew}
            image={image} 
            defaultImage={defaultAvatar}
            previewStyle={{ height: "130px", width: "130px", borderRadius: "50%" }}
            width={200}
            height={200}
            border={20}
            borderRadius={100}
            />
        </Box>
        <Box sx={{display: "flex", alignItems: "center", width: "100%", justifyContent: "center", my: 2, gap: 3, flexDirection: {xs: "column", md: "row"}}}>
           {image && isImageNew && 
                <Button 
                    sx={{maxWidth: 500}} 
                    variant="contained" 
                    size="medium" 
                    color="secondary" 
                    type="button" 
                    disabled={isLoading}
                    onClick={handleSubmit}
                >Update Profile Picture</Button>}
           {!image && imageData && isImageNew && 
                <Button 
                    sx={{maxWidth: 500}} 
                    variant="contained" 
                    size="medium" 
                    color="warning" 
                    type="button" 
                    disabled={isLoading}
                    onClick={handleSubmit}
                >Remove Profile Picture</Button>}
            {isImageNew && 
                <Button 
                    sx={{maxWidth: 500}} 
                    variant="outlined" 
                    size="medium" 
                    color="warning" 
                    type="button" 
                    disabled={isLoading}
                    onClick={handleCancel}
                >Cancel</Button>}
        </Box>
        </Paper>
    </Grid>
  )
}

export default UpdateProfilePictureForm