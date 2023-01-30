import React from 'react'
import { Paper, Grid } from '@mui/material'
import SearchUserForm from './SearchUserForm'
const MessagesNavigation = () => {
  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}><SearchUserForm/></Grid>
      </Grid>
    </Paper>
  )
}

export default MessagesNavigation