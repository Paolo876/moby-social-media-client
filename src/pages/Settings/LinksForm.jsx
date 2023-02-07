import { useState } from 'react'
import { Box, Button } from '@mui/material'
import AddLinkIcon from '@mui/icons-material/AddLink';
import MyTextField from '../../components/MyTextField';

const socialLinksArray = [ "default","facebook", "instagram", "linkedin", "twitter", "youtube", "web" ]

const LinksForm = () => {
  const [ showLinksForm, setShowLinksForm ] = useState(false)

  return (
    <Box my={1} py={1}>
      {!showLinksForm && <Button variant="outlined" color="info" size="small" onClick={() => setShowLinksForm(true)}><AddLinkIcon sx={{mr:1}}/> Add Links</Button>}
      {showLinksForm && <>
        <Box >
            <MyTextField
                id="linkInput" 
                name="linkInput"
                type="text" 
                label="URL"
                placeholder="https://www.example.com"
                fullWidth
                variant="outlined" 
                size="small"
            />
        </Box>

      </>}
  </Box>
  )
}

export default LinksForm