import React from 'react'
import { Paper, Typography } from '@mui/material'
const PostPreview = ({ title, postText, user, image, isPublic, createdAt, updatedAt}) => {
  console.log(user)
  return (
    <Paper sx={{my: 2, py: 5, px: {xs: 2, md:8}, mx: "auto", height: "100%"}} elevation={4}>
      <Typography variant="h5" align="left" fontSize="1.8em">{title}</Typography>
      <Typography variant="subtitle2" fontWeight="300" align="left">by {user.UserDatum.firstName} {user.UserDatum.lastName}</Typography>
    </Paper>
  )
}

export default PostPreview