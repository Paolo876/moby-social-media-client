import { useState } from 'react'
import useAuthRedux from '../../hooks/useAuthRedux';
import { Typography, Stack, Tooltip, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


const SearchUserForm = () => {
  const { user } = useAuthRedux();
  const [ showModal, setShowModal ] = useState(false);


  return (
    <Stack flexDirection="row" alignItems="center" justifyContent="center" mx={2} my={1} >
        <Box backgroundColor="rgba(0,0,0,0.1)" borderRadius={4}  sx={{flex:1, height: "100%", py:.25, mx: .5}} >
            <Typography variant="h6" fontSize={16} align="center">{user.username}</Typography>
        </Box>
        <Tooltip title="Write a new message" arrow>
            <Button color="secondary" size="small" variant="contained" sx={{minWidth: 0, ml: 1}} onClick={() => setShowModal(true)}><EditIcon fontSize='small'/></Button>
        </Tooltip>
    </Stack>
  )
}

export default SearchUserForm