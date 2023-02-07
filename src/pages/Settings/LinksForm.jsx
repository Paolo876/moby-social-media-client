import { useState } from 'react'
import { Box, Button, Stack, Typography, TextField, Divider } from '@mui/material'
import AddLinkIcon from '@mui/icons-material/AddLink';
import MyTextField from '../../components/MyTextField';
import SplitButton from '../../components/SplitButton';
import SocialLinksIconItem from '../../components/SocialLinksIconItem';

const socialLinksArray = [ "default","facebook", "instagram", "linkedin", "twitter", "youtube", "web" ]


const LinksForm = () => {
  const [ showLinksForm, setShowLinksForm ] = useState(false)
  const [ url, setUrl ] = useState("")
  const [ title, setTitle ] = useState("")


  const handleSubmit = (item) => {
    console.log(item)
  }

  const handleCancelClick = () => {
    setUrl("")
    setTitle("")
    setShowLinksForm(false)
  }

  return (
    <Box my={1} py={1}>
      {!showLinksForm && <Button variant="outlined" color="info" size="small" onClick={() => setShowLinksForm(true)}><AddLinkIcon sx={{mr:1}}/> Add Links</Button>}
      {showLinksForm && <>
        <TextField
          id="url" 
          name="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          type="text" 
          label="URL"
          placeholder="https://www.example.com"
          fullWidth
          variant="outlined" 
          size="small"
          />
        <Box sx={{display: "flex", flexDirection:"row", alignItems: "flex-end", gap: 1, mt:.5}}>
          <Stack>
            <Typography variant="body1" mb={.5} sx={{width: "100%"}} fontSize={12}>Link Icon</Typography>
            <SplitButton options={socialLinksArray.map(item => <SocialLinksIconItem value={item} sx={{mx:.5}} fontSize="small"/>)}/>
          </Stack>
          <TextField
            id="title" 
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text" 
            label="Title"
            fullWidth
            variant="outlined" 
            size="small"
          />
        </Box>
        <Box sx={{display: "flex", flexDirection:"row", alignItems: "flex-end", gap: 1, mt:2.5, mb: 1.5, justifyContent:"right"}}>
          <Button type="button" variant="contained" color="info" onClick={handleSubmit} size="small">Add Link</Button>
          <Button type="button" variant="outlined" color="warning" onClick={handleCancelClick} size="small">Cancel</Button>
        </Box>
        <Divider/>
      </>}
  </Box>
  )
}

export default LinksForm