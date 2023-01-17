import React from 'react';
import { Grid, Paper, Button, Typography, useTheme } from '@mui/material';
import Image from '../../components/Image';

const PostItem = ({ title, image, isPublic, postText }) => {
  const { palette, transitions } = useTheme();
  return (
    <Grid item sx={{m:.5, mt: 2, p: 0, boxShadow: 1, mb: 3, borderRadius: "10px", transition: transitions.create('all', {duration: 800, delay: 0}), "&:hover": { boxShadow: 4 }}} xs={12}>
        <Button sx={{width: "100%", mr: "auto", p:0, textTransform: "none", textAlign: "left", borderRadius: "10px 10px 0 0"}} color="primary">
            <Paper sx={{width: "100%", p: 3, minHeight: 250, borderRadius: "10px 10px 0 0"}} variant="outlined">
                <Typography variant="h5" align='center' fontWeight={600}>{title}</Typography>
                <Typography variant="subtitle1" align='center'>{postText.length > 160 ? postText.substr(0,160) : postText}...</Typography>
                {image && <Image 
                  src={image}
                  alt={title}
                  style={{objectFit: "cover", margin: "0 auto"}}
                  transformation={[{
                      height: 300,
                      width: 300,
                  }]} 
                  />}
            </Paper>
        </Button>                  
        <Paper sx={{backgroundColor: palette.primary.main, p:1, py:2, borderRadius: "0 0 10px 10px"}}>
                  <Typography variant="body2" color="white">asdasd</Typography>
        </Paper>
    </Grid>
  )
}

export default PostItem