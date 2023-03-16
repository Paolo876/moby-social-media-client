import { useState } from 'react'
import { Box, Button, Menu, MenuItem } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';

const FilterMenuButton = ({ filter, setFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (action) => {
    setFilter(action)
    handleClose()
  }


  return (
    <Box>
      <Button 
        startIcon={<FilterAltIcon/>} 
        size="small" 
        variant="outlined" 
        color="secondary"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >Filter</Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleItemClick("all")}>All</MenuItem>
        <MenuItem onClick={() => handleItemClick("unread")}>Unread</MenuItem>
      </Menu>

      {filter !== "all" && <Button
        variant="outlined"
        size="small" 
        color="inherit"
        sx={{fontSize: 8, color: "rgba(75,75,75,0.85)", position: "relative", ml: 2}}
        onClick={() => setFilter("all")}
      >{filter}
      <Box sx={{position: "absolute", top: 0, right: 0, color: "orangered"}}>
        <CloseIcon fontSize="inherit"/>
      </Box>
      </Button>}
    </Box>
  )
}

export default FilterMenuButton