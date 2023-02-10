import { useEffect, useState } from 'react'
import { Divider, Paper, Typography, Grid,  Button, Box, List, ListItem, ListItemText, IconButton, Tooltip } from '@mui/material'
import useProfileActions from '../../hooks/useProfileActions';
import useSettingsActions from '../../hooks/useSettingsActions';
import MyTextField from '../../components/MyTextField';
import LoadingSpinner from "../../components/LoadingSpinner"
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import LinksForm from './LinksForm';
import SocialLinksIconItem from '../../components/SocialLinksIconItem';
import ClearIcon from '@mui/icons-material/Clear';
import compareObject from '../../utils/compareObjectValues';


const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(1).max(15).required(),
  lastName: Yup.string().min(1).max(20).required(),
  birthday: Yup.date(),
  body : Yup.string().min(1).max(255),
})


const UserSettingsForm = ({ initialData}) => {
  const { getProfileById, isLoading: isProfileLoading, error: profileError } = useProfileActions();
  const { isLoading, error, success, updateSettings } = useSettingsActions();

  const [ initialValues, setInitialValues ] = useState(initialData)
  const [ links, setLinks ] = useState(initialData.UserBio && initialData.UserBio.links ? JSON.parse(initialData.UserBio.links) : [])
  const [ showDate, setShowDate ] = useState(false);


  const handleSubmit = async (values) => {
    values.links = links;
    if(!compareObject(initialValues, values)) {

      // const { firstName, lastName, birthday, body, links } = values;
      // const result = { 
      //   UserData: {firstName, lastName, birthday, image}, 
      //   UserBio: { body, links : JSON.stringify(links)}
      // }
      const response = await updateSettings(values)

      // //update redux
      // console.log(response)
    } else {
      console.log("none")
    }
  }


  return (
    <Grid item xs={12} md={8} py={.75}>
      <Paper sx={{py: 2, px: {xs: 2, md:8}, width: "100%", mx: "auto" }} elevation={2}>
        <Formik  
            initialValues={initialValues}
            onSubmit={handleSubmit} 
            validationSchema={validationSchema}
          >
          <Form style={{display: "flex", flexDirection: "column"}}>
            <Typography variant="h5" mt={4} fontWeight={600}>User Data</Typography>
            <Divider/>
            <MyTextField 
              id="firstName" 
              name="firstName"
              type="text" 
              label={<p>First Name</p>} 
              variant="standard" 
              sx={{m:1, mt: 4}}
              error="First Name is Required."
            />
            <MyTextField 
              id="lastName" 
              name="lastName"
              type="text" 
              label={<p>Last Name</p>} 
              variant="standard" 
              sx={{m:1}}
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
              sx={{m:1}}
              error="Last Name is Required."
            />
            <Typography variant="h5" mt={3} fontWeight={500}>User Bio</Typography>
            <Divider/>
            <MyTextField 
              id="body" 
              name="body"
              type="text" 
              label="User Bio"
              variant="outlined" 
              rows={4}
              multiline
              sx={{my:2, width: "100%"}}
              inputProps={{ maxLength: 250 }}
            />
            <Typography variant="h5" mt={3} fontWeight={500}>User Social Links</Typography>
            <Divider/>
            <Grid container my={1} px={1}>
              <Grid item xs={12}>
                <List>
                {links.map(item => <ListItem xs={12} key={item.url} dense>
                    <SocialLinksIconItem value={item.icon} color="secondary" fontSize="medium" sx={{mr:.5}}/>
                    <Divider orientation="vertical" flexItem />
                    <ListItemText sx={{ml:.5}}>
                      <Typography variant="body2" fontSize={14} noWrap>{item.title}</Typography>
                      <Typography variant="body1" fontSize={14} noWrap>{item.url}</Typography>
                    </ListItemText>
                    <Tooltip title="Remove link" arrow>
                    <IconButton 
                      sx={{ml:"auto"}} 
                      color="error" 
                      onClick={() => setLinks(prevState => prevState.filter(_item => _item.url !== item.url))}
                    >
                      <ClearIcon/>
                    </IconButton>
                  </Tooltip>
                  </ListItem>)}
                </List>
              </Grid>
            </Grid>
            <LinksForm links={links} setLinks={setLinks}/>
            <Box sx={{px: 5, mt:5}}>
              <Button sx={{width: "100%"}} variant="contained" size="large" color="primary" type="submit">Save Changes</Button>
            </Box>
          </Form>
        </Formik>
      </Paper>
  </Grid>  
)
}

export default UserSettingsForm