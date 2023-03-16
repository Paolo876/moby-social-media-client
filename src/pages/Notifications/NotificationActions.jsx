import React from 'react'
import { Box, Button } from '@mui/material'
import useNotificationRedux from '../../hooks/useNotificationRedux';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const NotificationActions = () => {
  const { deleteAllNotifications, readAllNotifications, notifications } = useNotificationRedux();
  const isUnreadNotifsExists = notifications.filter(item => !item.isRead).length !== 0;


  return (
    <Box py={{xs: 2, md:3}} align="center">
      <Button 
        variant="contained" 
        color="info" 
        sx={{m: .5, fontSize:{xs: 11, md:13}}} 
        startIcon={<TaskAltIcon />} 
        onClick={() => readAllNotifications()}
        disabled={!isUnreadNotifsExists}
        >Mark all as read
      </Button>
      <Button 
        variant="contained" 
        color="error" 
        sx={{m: .5, fontSize:{xs: 11, md:13}}}  
        startIcon={<DeleteForeverIcon />} 
        onClick={() => deleteAllNotifications()}
        >Delete All Notifications
      </Button>
    </Box>
  )
}

export default NotificationActions