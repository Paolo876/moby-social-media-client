import React from 'react'
import { Paper, Grid, Divider } from '@mui/material'
import SearchUserForm from './SearchUserForm'
import MaterialRoot from '../../components/MaterialRoot'
const MessagesNavigation = () => {
  
  return (
    <Paper sx={{height: "100%"}}>
      <Grid container>
        <Grid item xs={12}><SearchUserForm/></Grid>
        <MaterialRoot><Divider/></MaterialRoot>

      </Grid>
    </Paper>
  )
}

export default MessagesNavigation