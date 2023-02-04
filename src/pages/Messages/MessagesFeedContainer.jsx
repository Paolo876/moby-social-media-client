import React from 'react'
import { Paper, Stack, Grid } from '@mui/material'

const MessagesFeedContainer = ({ children }) => {
  return (
    <Grid container  sx={{overflowY: "auto", p: .5}} >
      {children}
    </Grid>
  )
}

export default MessagesFeedContainer