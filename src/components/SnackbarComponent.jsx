import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SnackbarContent } from 'notistack'
import { Box, Paper, Stack, Typography, ButtonBase } from '@mui/material'
import defaultAvatar from "../assets/default-profile.png";

const SnackbarComponent = React.forwardRef((props, ref) => {
    const { content: { title = null, image, header, subheader, id, type, link}, ...other } = props
    const navigate = useNavigate();

    return (
      <SnackbarContent ref={ref} {...other}>
        <ButtonBase  sx={{width:"100%"}} onClick={() => navigate(link)}>
          <Paper sx={{width:"100%", background: "rgba(100,100,100, .95)"}} elevation={3}>
            <Stack>
              <Box>
                {/* image here */}
              </Box>
              <Stack alignItems="left" justifyContent="left">
                {title && <Typography align="left">{title}</Typography>}
                <Typography align="left" color="white" variant="body2">{header}</Typography>
                <Typography align="left" color="white" variant="body1">{subheader}</Typography>
              </Stack>
            </Stack>
          </Paper>
        </ButtonBase>
      </SnackbarContent>
    )
  })

SnackbarComponent.displayName = "SnackbarComponent"

export default SnackbarComponent

