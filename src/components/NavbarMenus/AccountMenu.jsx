import React from 'react'
import { useNavigate } from 'react-router-dom'
import useSocketIo from '../../hooks/useSocketIo';
import useResetRedux from '../../hooks/useResetRedux';
import useAuthRedux from '../../hooks/useAuthRedux';
import { MenuItem, Divider } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';


const AccountMenu = ({ setAnchorEl, handleMobileMenuClose, handleItemClick }) => {
  const navigate = useNavigate();
  const { emitLogout } = useSocketIo();
  const { resetAllStates } = useResetRedux();
  const { logout } = useAuthRedux();

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    setAnchorEl(null);
    emitLogout();
    handleMobileMenuClose();
    logout()
    resetAllStates()
  }


  return (
    <>
      <MenuItem onClick={() => handleItemClick("profile")} sx={{px: 3, py: .8}}><AccountCircle fontSize="sm" sx={{mr: 2}}/> Profile</MenuItem>
      <MenuItem onClick={() => handleItemClick("settings")} sx={{px: 3, py: .8}}><SettingsIcon fontSize="sm" sx={{mr: 2}}/> Settings</MenuItem>
      <MenuItem onClick={() => handleItemClick("about")} sx={{px: 3, py: .8}}><InfoIcon fontSize="sm" sx={{mr: 2}}/> About</MenuItem>
      <Divider/>
      <MenuItem onClick={handleLogout} sx={{px: 3, py: .8}}><LogoutIcon fontSize="sm" sx={{mr: 2}}/> Logout</MenuItem>
    </>
  )
}

export default AccountMenu