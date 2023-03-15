import React from 'react'
import useNotificationRedux from "../../hooks/useNotificationRedux"
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import { Alert, Container, Grid, Box, Paper, Typography, Divider, Button, ButtonBase, Stack } from '@mui/material'

const Notifications = () => {
  const { notifications, isLoading, error } = useNotificationRedux();

  return (
    <AuthorizedPageContainer>
      <Container>
        {error && <Box my={2}><Alert severity='error'>{error}</Alert></Box>}
          <Grid container>
            <Paper sx={{my: 2, py: 5, px: {xs: 2, md:8}, mx: "auto", height: "fit-content", position: "relative"}} elevation={4}>
            </Paper>
          </Grid>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default Notifications