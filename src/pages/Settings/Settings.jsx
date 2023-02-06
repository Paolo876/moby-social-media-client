import { useEffect, useState } from 'react'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import { Container, Divider, Paper, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import useProfileActions from '../../hooks/useProfileActions';
import useAuthRedux from '../../hooks/useAuthRedux';
import MyTextField from '../../components/MyTextField';
import UploadImageForm from '../../components/UploadImageForm';
import useImagekit from '../../hooks/useImagekit';
import defaultAvatar from "../../assets/default-profile.png"

import { Formik, Form } from "formik";
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(1).max(15).required(),
  lastName: Yup.string().min(1).max(20).required(),
  birthday: Yup.date()
})


const Settings = () => {
  const { getProfileById, isLoading, error } = useProfileActions();
  const { user: { UserData } } = useAuthRedux();
  const [ isImageNew, setIsImageNew ] = useState(false)
  const [ image, setImage ] = useState(JSON.parse(UserData.image) ? JSON.parse(UserData.image).url : null)
  const [ showDate, setShowDate ] = useState(false);

  const initialValues = {
    firstName: UserData.firstName,
    lastName: UserData.lastName,
    birthday: UserData.birthday,
  }

  // useEffect(() => {
  //   getProfileById().then(data => console.log(data))
  // }, [])

  const handleImageChange = (data) => {
    setImage(data)
    setIsImageNew(true)
  }

  const handleSubmit = () => {
    
  }

  return (
    <AuthorizedPageContainer>
      <Container sx={{pt: 1.5}}>
      <Paper sx={{py: 5, px: 2, width: "fit-content", mx: "auto" }} elevation={4}>
        <Typography variant="h4" fontWeight={700} mb={4} letterSpacing={1}><SettingsIcon style={{verticalAlign:"middle"}} sx={{mr: 1}} fontSize="large"/>Settings</Typography>
        <Divider/>
        <Formik  
            initialValues={initialValues}
            onSubmit={handleSubmit} 
            validationSchema={validationSchema}
          >
          <Form style={{display: "flex", flexDirection: "column", my: 5}}>
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
          </Form>
        </Formik>

      </Paper>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Settings