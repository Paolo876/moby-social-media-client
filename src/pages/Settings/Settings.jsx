import { useEffect, useState } from 'react'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import { Container, Divider, Paper, Typography, Grid, InputAdornment, Stack, Button, Box, List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip } from '@mui/material'
import useProfileActions from '../../hooks/useProfileActions';
import useAuthRedux from '../../hooks/useAuthRedux';
import MyTextField from '../../components/MyTextField';
import UploadImageForm from '../../components/UploadImageForm';
import useImagekit from '../../hooks/useImagekit';
import defaultAvatar from "../../assets/default-profile.png"
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import LinksForm from './LinksForm';
import SocialLinksIconItem from '../../components/SocialLinksIconItem';
import ClearIcon from '@mui/icons-material/Clear';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(1).max(15).required(),
  lastName: Yup.string().min(1).max(20).required(),
  birthday: Yup.date(),
  userBioBody : Yup.string().min(1).max(255),
})


const Settings = () => {
  const { getProfileById, isLoading, error } = useProfileActions();
  const { user: { UserData } } = useAuthRedux();
  const [ isImageNew, setIsImageNew ] = useState(false)
  const [ image, setImage ] = useState(JSON.parse(UserData.image) ? JSON.parse(UserData.image).url : null)
  const [ showDate, setShowDate ] = useState(false);
  const [ initialValues, setInitialValues ] = useState(null)

  useEffect(() => {
    getProfileById().then(data => setInitialValues({
      firstName: data.UserDatum.firstName,
      lastName: data.UserDatum.lastName,
      birthday: data.UserDatum.birthday,
      userBioBody : data.UserBio ? data.UserBio.body : "",
      links: data.UserBio && data.UserBio.links ? JSON.parse(data.UserBio.links) : []
    }))
  }, [])

  const handleImageChange = (data) => {
    setImage(data)
    setIsImageNew(true)
  }

  const handleSubmit = () => {
    
  }

  return (
    <AuthorizedPageContainer>
      <Container sx={{pt: 1.5}}>
        <Grid container direction="row" alignItems="flex-start" sx={{justifyContent: {xs: "center"}, height: "75vh"}}>
        {initialValues && 
          <Grid item xs={12} md={8} py={2}>
              <Paper sx={{py: 5, px: {xs: 2, md:8}, width: "100%", mx: "auto" }} elevation={4}>
                <Typography variant="h4" fontWeight={700} mb={2} letterSpacing={1}>Settings</Typography>
                <Formik  
                    initialValues={initialValues}
                    onSubmit={handleSubmit} 
                    validationSchema={validationSchema}
                  >
                  <Form style={{display: "flex", flexDirection: "column", my: 5}}>
                    <Typography variant="h5" mt={2} fontWeight={500}>User Data</Typography>
                    <Divider/>
                    <UploadImageForm
                      setImage={handleImageChange} 
                      isImageNew={isImageNew}
                      image={image} 
                      title="Update Profile Picture"
                      defaultImage={defaultAvatar}
                      previewStyle={{ height: "100px", width: "100px", borderRadius: "50%" }}
                      width={200}
                      height={200}
                      border={20}
                      borderRadius={100}
                    />
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
                      error="First Name is Required."
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
                    <Typography variant="h5" mt={3} fontWeight={500}>User Bio</Typography>
                    <Divider/>
                    <MyTextField 
                      id="userBioBody" 
                      name="userBioBody"
                      type="text" 
                      label="User Bio"
                      variant="outlined" 
                      rows={4}
                      multiline
                      sx={{my:2, width: "100%"}}
                    />
                    <Typography variant="h5" mt={3} fontWeight={500}>User Social Links</Typography>
                    <Divider/>
                    <Grid container my={1}>
                      {initialValues.links.map(item => <Grid item xs={12} key={item.url} >
                        <Paper variant="outlined" sx={{display: "flex", flexDirection: "row", width: "100%", gap: 1, alignItems: "center", px:1, }} >
                          <SocialLinksIconItem value={item.icon} color="secondary"/>
                          <Divider orientation="vertical" flexItem />
                          <Stack>
                            <Typography variant="body2" fontSize={12}>title</Typography>
                            <Typography variant="body1" fontSize={14}>{item.title}</Typography>
                          </Stack>
                          <Stack>
                            <Typography variant="body2" fontSize={12}>url</Typography>
                            <Typography variant="body1" fontSize={14}>{item.url}</Typography>
                          </Stack>
                          <Tooltip title="Remove link" arrow>
                            <IconButton sx={{ml:"auto"}} color="error"><ClearIcon/></IconButton>
                          </Tooltip>
                        </Paper>
                      </Grid>)}
                      
                    </Grid>
                    <LinksForm links={initialValues.links}/>
                    <Box sx={{px: 5, mt:5}}>
                      <Button sx={{width: "100%"}} variant="contained" size="large" color="primary" type="submit">Save Changes</Button>
                    </Box>
                  </Form>
                </Formik>
            </Paper>
          </Grid>}
        </Grid>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Settings