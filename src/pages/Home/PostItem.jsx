import React from 'react';
import { Grid, Paper, Button, Typography } from '@mui/material';

const PostItem = ({ title, image, isPublic, postText }) => {
  return (
    <Grid item sx={{m:.5, mt: 1, p: 1}} xs={12}>
        <Button sx={{width: "100%", mr: "auto", p:0, textTransform: "none", textAlign: "left"}} color="primary">
            <Paper sx={{width: "100%", p: 3}} variant="outlined" textAlign="center">
                <Typography variant="h5" align='center'>{title}</Typography>
            </Paper>
        </Button>
    </Grid>
  )
}

export default PostItem