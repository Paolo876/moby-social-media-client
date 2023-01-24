import React from 'react'
import { Divider, Paper, Typography, Stack } from '@mui/material'
import MaterialRoot from '../../components/MaterialRoot'

const PostPreview = ({ title, postText, user, image, isPublic, createdAt, updatedAt}) => {
  // console.log(user)
  return (
    <Paper sx={{my: 2, py: 5, px: {xs: 2, md:8}, mx: "auto", height: "fit-content"}} elevation={4}>
      <Typography variant="h5" align="left" fontSize="1.8em">{title}</Typography>
      <Stack alignItems="center" flexDirection="row" justifyContent="space-between">
        <Typography variant="subtitle2" fontWeight="300" align="left">by {user.UserDatum.firstName} {user.UserDatum.lastName}</Typography>
        <Typography variant="body1" align='right' fontWeight={300} fontSize={13}>{new Date(createdAt).toLocaleDateString()}</Typography>
      </Stack>
      <MaterialRoot><Divider/></MaterialRoot>
      <Typography variant="body2" mt={3}>{postText}</Typography>
    </Paper>
  )
}

export default PostPreview