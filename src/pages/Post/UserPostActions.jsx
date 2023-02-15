import React from 'react'
import { Box, Paper, Tooltip, Typography, Button, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const UserPostActions = () => {
  const { palette } = useTheme();
  return (
    <Paper sx={{px:1, py:1.25, borderColor: palette.secondary.light }} variant="outlined">
      <Tooltip title="These actions are only available for the post's author." arrow  placement="left-start">
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Typography variant="h6" fontSize={16}>Post Settings:</Typography>
          <Box justifyContent="right" display="flex" gap={2}>
            <Button variant="contained" disableElevation color="secondary" size="small" startIcon={<EditIcon/>}>Edit Post</Button>
            <Button variant="outlined" color="error" size="small" startIcon={<DeleteIcon/>}>Delete Post</Button>
          </Box>
        </Box>
      </Tooltip>
    </Paper>
  )
}

export default UserPostActions