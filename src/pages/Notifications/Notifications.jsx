import useNotificationRedux from "../../hooks/useNotificationRedux"
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import { Alert, Container, Grid, Box, Paper, Typography, Divider, Button, ButtonBase, Stack, List } from '@mui/material'
import NotificationActions from './NotificationActions'
import NotificationsList from './NotificationsList'

const Notifications = () => {
  const { isLoading, error } = useNotificationRedux();

  return (
    <AuthorizedPageContainer>
      <Container>
        {error && <Box my={2}><Alert severity='error'>{error}</Alert></Box>}
          <Grid container>
            <Grid item xs={12} md={6.75} sx={{position: "relative", mx: "auto"}}>
              <Paper sx={{my: 2, py: 5, px: {xs: 2, md:8}, mx: "auto", height: "fit-content", position: "relative"}} elevation={4}>
                <Typography variant="h4" align="left">Notifications </Typography>
                <Divider/>
                <NotificationActions/>
                <NotificationsList/>
              </Paper>
            </Grid>
          </Grid>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Notifications