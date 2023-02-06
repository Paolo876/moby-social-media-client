import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthRedux from '../hooks/useAuthRedux';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, InputBase, Badge, MenuItem, Menu, Container, Tooltip, Divider } from '@mui/material';
import LoadingSpinner from './LoadingSpinner';
import Image from './Image';
//media
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../assets/logo_header.png"
import SettingsIcon from '@mui/icons-material/Settings';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));

const paperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}

const Navbar = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuthRedux();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    
    let image;
    if(user && user.UserData) image = JSON.parse(user.UserData.image);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
    
    const handleLogout = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
      handleMenuClose()
      logout()
    }

    const handleProfileClick = () => {
      navigate('/profile')
      handleMenuClose()
      setAnchorEl(null);
      handleMobileMenuClose();
    }

    const handleSettingsClick = () => {
      navigate("/settings")
      handleMenuClose()
      setAnchorEl(null);
      handleMobileMenuClose();
    }
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        id={menuId}
        keepMounted
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={paperProps}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfileClick} sx={{px: 2.5, py: .8}}><AccountCircle fontSize="sm" sx={{mr: 2}}/> Profile</MenuItem>
        <MenuItem onClick={handleSettingsClick} sx={{px: 2.5, py: .8}}><SettingsIcon fontSize="sm" sx={{mr: 2}}/> Settings</MenuItem>
        <Divider/>
        <MenuItem onClick={handleLogout} sx={{px: 2.5, py: .8}}><LogoutIcon fontSize="sm" sx={{mr: 2}}/> Logout</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={5} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={() => navigate("/messages")}>
            <Badge badgeContent={5} color="error">
              <ChatIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            {image ?  
              <Image 
                src={image.url} 
                transformation={[{ height: 25, width: 25 }]} 
                style={{borderRadius: "50%"}}
              />
              :
              <AccountCircle />}
          </IconButton>
          {user && user.UserData && <p>{user.UserData.firstName} {user.UserData.lastName}</p>}
        </MenuItem>
      </Menu>
    );
  
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Container maxWidth="lg" sx={{ px: 0 }}>
          {user ?
            <Toolbar>
              <IconButton
                  disableRipple
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                  LinkComponent={Link}
                  to="/"
              ><img src={logo} alt="logo" style={{objectFit: "cover", height: 40, filter: "invert(.9)"}}/></IconButton>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Tooltip title="Notifications" arrow>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={5} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Messages" arrow>
                  <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={() => navigate("/messages")}>
                    <Badge badgeContent={5} color="error">
                      <ChatIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Account" arrow>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    {image ?  
                      <Image 
                        src={image.url} 
                        transformation={[{
                          height: 25,
                          width: 25,
                        }]} 
                        style={{borderRadius: "50%"}}
                      />
                      :
                      <AccountCircle />}
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
            : <div style={{display: "flex", padding: ".25em"}}><img src={logo} alt="logo" style={{objectFit: "cover", height: 40, filter: "invert(.9)", margin: "0 auto"}}/></div>}
          </Container>
        </AppBar>
        <Toolbar sx={{py: .5}}>{/* space filler to shift components under the navbar */}</Toolbar> 
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );
  
}

export default Navbar