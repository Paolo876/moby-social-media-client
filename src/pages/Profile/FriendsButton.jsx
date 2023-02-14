import { useState, } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Button, Menu, MenuItem, Divider, Modal } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import FriendsListModal from './FriendsListModal';

const StyledMenu = styled((props) => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(.5),
    minWidth: 150,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        // color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function FriendsButton({ }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [ showFriendsListModal, setShowFriendsListModal ] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (action) => {
    setAnchorEl(null);
    if(action === "friends") setShowFriendsListModal(true)
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        color="info"
        onClick={handleClick}
        startIcon={<PeopleIcon/>}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Friends
      </Button>
      <FriendsListModal open={showFriendsListModal} handleClose={() => setShowFriendsListModal(false)}/>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose("friends")}>
          <GroupsIcon />
          Friends List
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => handleClose("unfriend")} disableRipple>
          <PersonOffIcon color="error" />
          Unfriend
        </MenuItem>
      </StyledMenu>
    </>
  );
}