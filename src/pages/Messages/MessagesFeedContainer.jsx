import React from 'react'
import { Paper, Stack, Grid } from '@mui/material'

const MessagesFeedContainer = ({ children }) => {
  return (
    <Grid item xs={12} sx={{height: "inherit" }} elevation={3}>
        <Stack sx={{height: "inherit" }} justifyContent="space-between">
            {children}
        </Stack>
    </Grid>
  )
}

export default MessagesFeedContainer