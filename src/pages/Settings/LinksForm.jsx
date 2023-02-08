import { useState } from 'react'
import { Box, Button, Stack, Typography, TextField, Divider, Alert } from '@mui/material'
import AddLinkIcon from '@mui/icons-material/AddLink';
import SplitButton from '../../components/SplitButton';
import SocialLinksIconItem from '../../components/SocialLinksIconItem';

const socialLinksArray = [ "default","facebook", "instagram", "linkedin", "twitter", "youtube", "web" ]


const LinksForm = ({ setLinks }) => {
  const [ showLinksForm, setShowLinksForm ] = useState(false)
  const [ url, setUrl ] = useState("")
  const [ title, setTitle ] = useState("")
  const [ selectedIcon, setSelectedIcon ] = useState(0);
  const [ urlError, setUrlError ] = useState(null)
  const [ titleError, setTitleError ] = useState(null)

  const handleSubmit = () => {
    if(url.trim().length !== 0 && title.trim().length !== 0){
      //url regex check
      if(/(https?:\/\/)?\w+(\.\w+)+(\/\w+)*(\/\w+\.\w+)?(\?[\w%&=.]*)*(?=[^\w.?&%=])/.test(url)) {
        const result = {url, title, icon: socialLinksArray[selectedIcon]}
        // setData(prevState => ({...prevState, links: [...prevState.links, result]}))
        setLinks(prevState => [...prevState, result])
        handleCancelClick();
      } else {
        setUrlError("Invalid URL format.")
      }
    } else {
      url.trim().length === 0 && setUrlError("URL field required.")
      title.trim().length === 0 && setTitleError("Title field required.")
    }
  }

  const handleCancelClick = () => {
    setUrl("")
    setTitle("")
    setSelectedIcon(0)
    setUrlError(null)
    setTitleError(null)
    setShowLinksForm(false)
  }

  const handleIconChange = (index) => {
    if(socialLinksArray[index] !== "default" && socialLinksArray[index] !== "web") {
      setTitle(socialLinksArray[index])
    }
    setSelectedIcon(index)

  }
  return (
    <Box my={2} py={1}>
      {!showLinksForm && <Button variant="outlined" color="info" size="small" onClick={() => setShowLinksForm(true)} type="button"><AddLinkIcon sx={{mr:1}}/> Add Links</Button>}
      {showLinksForm && <>
        {urlError && <Alert severity='error' size="small" sx={{mb:.5}}>{urlError}</Alert>}

        <TextField
          id="url" 
          name="url"
          value={url}
          onChange={e => {setUrlError(null); setUrl(e.target.value)}}
          type="text" 
          label="URL"
          placeholder="https://www.example.com"
          fullWidth
          variant="outlined" 
          size="small"
          error={urlError && true}
          />
        {titleError && <Alert severity='error' size="small" sx={{mt:1.5, mb:.5}}>{titleError}</Alert>}
        <Box sx={{display: "flex", flexDirection:"row", alignItems: "flex-end", gap: 1, mt:1}}>
          <Stack>
            <Typography variant="body1" mb={.5} sx={{width: "100%"}} fontSize={12}>Link Icon</Typography>
            <SplitButton 
              options={socialLinksArray.map(item => <SocialLinksIconItem value={item} sx={{mx:.5}} fontSize="small"/>)}
              selectedIndex={selectedIcon} 
              setSelectedIndex={handleIconChange} 
              />
          </Stack>
          <TextField
            id="title" 
            name="title"
            value={title}
            onChange={e => {setTitleError(null); setTitle(e.target.value)}}
            type="text" 
            label="Title"
            fullWidth
            variant="outlined" 
            size="small"
            error={titleError && true}
            inputProps={{ maxLength: 20 }}
          />
        </Box>
        <Box sx={{display: "flex", flexDirection:"row", alignItems: "flex-end", gap: 1, mt:2.5, mb: 1.5, justifyContent:"right"}}>
          <Button type="button" variant="contained" color="info" onClick={handleSubmit} size="small" disabled={(urlError && true) || (titleError && true)}>Add Link</Button>
          <Button type="button" variant="outlined" color="warning" onClick={handleCancelClick} size="small">Cancel</Button>
        </Box>
        <Divider/>
      </>}
  </Box>
  )
}

export default LinksForm