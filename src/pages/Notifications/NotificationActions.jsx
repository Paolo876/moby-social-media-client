import React from 'react'
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const NotificationActions = () => {
  return (
    <Box py={{xs: 2, md:3}} align="center">
      <Button variant="contained" color="info" sx={{m: .5, fontSize:{xs: 11, md:13}}} startIcon={<TaskAltIcon />}>Mark all as read</Button>
      <Button variant="contained" color="error" sx={{m: .5, fontSize:{xs: 11, md:13}}}  startIcon={<DeleteForeverIcon />}>Delete All Notifications</Button>
    </Box>
  )
}

export default NotificationActions