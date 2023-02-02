import React from 'react'
import { Paper, Stack, } from '@mui/material'

const MessagesFeedContainer = ({ children }) => {
  return (
    <Paper sx={{height: "100%" }} elevation={3}>
        <Stack sx={{height: "100%" }} justifyContent="space-between">
            {children}
        </Stack>
    </Paper>
  )
}

export default MessagesFeedContainer