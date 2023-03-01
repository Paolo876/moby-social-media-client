import React from 'react'
import { SnackbarContent } from 'notistack'
import { Box, Paper, Stack, Typography, ButtonBase } from '@mui/material'

const SnackbarComponent = React.forwardRef((props, ref) => {
    const { content: { title = null, image, header, subheader, id, type, link}, ...other } = props
  
    console.log(title)
    return (
      <SnackbarContent ref={ref} {...other}>
        <ButtonBase  sx={{width:"100%"}}>
          <Paper sx={{width:"100%", opacity: .8}} elevation={2}>
            <Stack>
              <Box>
                {/* image here */}
              </Box>
              <Stack>
                {title && <Typography>{title}</Typography>}
                <Typography>{header}</Typography>
                <Typography>{subheader}</Typography>
              </Stack>
            </Stack>
          </Paper>
        </ButtonBase>
      </SnackbarContent>
    )
  })

SnackbarComponent.displayName = "SnackbarComponent"

export default SnackbarComponent

