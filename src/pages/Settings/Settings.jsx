import { useEffect } from 'react'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import { Container, Divider, Paper, Typography } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import useProfileActions from '../../hooks/useProfileActions';

const Settings = () => {
  const { getProfileById, isLoading, error } = useProfileActions();
  
  useEffect(() => {
    getProfileById().then(data => console.log(data))
  }, [])
  return (
    <AuthorizedPageContainer>
      <Container sx={{pt: 1.5}}>
      <Paper sx={{py: 5, px: 2, width: "fit-content", mx: "auto" }} elevation={4}>
        <Typography variant="h4" fontWeight={700} mb={4} letterSpacing={1}><SettingsIcon style={{verticalAlign:"middle"}} sx={{mr: 1}} fontSize="large"/>Settings</Typography>
        <Divider/>

      </Paper>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Settings