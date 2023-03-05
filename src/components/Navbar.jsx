import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthRedux from '../hooks/useAuthRedux';
import useChatRedux from '../hooks/useChatRedux';
import useNotificationRedux from '../hooks/useNotificationRedux';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Badge, MenuItem, Menu, Container, Tooltip, Divider } from '@mui/material';
import Image from './Image';
import SearchInput from './SearchInput';

//media
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../assets/logo_header.png"
import AccountMenu from './NavbarComponents/AccountMenu';


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
    const { user } = useAuthRedux();
    const { notifications } = useNotificationRedux();
    const { chatRooms } = useChatRedux();
    const [anchorEl, setAnchorEl] = useState(null);
    const [notiAnchorEl, setNotiAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    let image;
    if(user && user.UserData) image = JSON.parse(user.UserData.image);

    const unreadMessages = chatRooms ? chatRooms.filter(item => item.ChatRoom.isLastMessageRead[0].isLastMessageRead === false).length : 0
    const notificationsLength = notifications ? notifications.length : 0

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isNotificationOpen = Boolean(notiAnchorEl);


    if(isMobileMenuOpen) {

      paperProps.sx['&:before'] = {}
    }

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
      setNotiAnchorEl(null)
    };

    const handleNotificationMenuOpen = (event) => {
      setNotiAnchorEl(event.currentTarget)
      setAnchorEl(null);
    }
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      handleMobileMenuClose();
      setAnchorEl(null);
    };
  
    const handleNotificationMenuClose = () => {
      setNotiAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClick = (link) => {
      navigate(link)
      handleMobileMenuClose();

    }
    

    const handleItemClick = (option) => {
      if(option === "profile") navigate(`/${option}`)
      if(option === "settings") navigate(`/${option}`)
      if(option === "about") navigate(`/${option}`)
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
        anchorOrigin={{ horizontal: isMobileMenuOpen ? 'left' : 'right', vertical: isMobileMenuOpen ? 'top' : 'bottom' }}
        PaperProps={paperProps}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <AccountMenu setAnchorEl={setAnchorEl} handleMobileMenuClose={handleMobileMenuClose} handleItemClick={handleItemClick}/>
      </Menu>
    );
    
    const notificationMenuId = 'notification-menu'
    const renderNotificationMenu = (
      <Menu
        anchorEl={notiAnchorEl}
        id={notificationMenuId}
        keepMounted
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: isMobileMenuOpen ? 'left' : 'right', vertical: isMobileMenuOpen ? 'top' : 'bottom' }}
        PaperProps={paperProps}
        open={isNotificationOpen}
        onClose={handleNotificationMenuClose}
      >
      {/* map notifications here */}
        <MenuItem onClick={() => handleItemClick("profile")} sx={{px: 3, py: .8}}><AccountCircle fontSize="sm" sx={{mr: 2}}/> Profile</MenuItem>
  
      </Menu>
    );


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
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
        <MenuItem onClick={handleNotificationMenuOpen}>
          <IconButton
            size="large"
            color="inherit"
            aria-controls={notificationMenuId}
            aria-haspopup="true"
          >
            <Badge badgeContent={notificationsLength} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={() => handleMobileMenuClick("/messages")}>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={unreadMessages} color="error">
              <ChatIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-controls={menuId}
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
                  sx={{ mr: 2 }}
                  LinkComponent={Link}
                  to="/"
              ><img src={logo} alt="logo" style={{objectFit: "cover", height: 40, filter: "invert(.9)"}}/></IconButton>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <SearchInput/>
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Tooltip title="Notifications" arrow>
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-controls={notificationMenuId}
                    aria-haspopup="true"
                    onClick={handleNotificationMenuOpen}
                  >
                    <Badge badgeContent={notificationsLength} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Messages" arrow>
                  <IconButton size="large" color="inherit" onClick={() => navigate("/messages")}>
                    <Badge badgeContent={unreadMessages} color="error">
                      <ChatIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Account" arrow>
                  <IconButton
                    size="large"
                    edge="end"
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
        {renderNotificationMenu}

      </Box>
    );
  
}

export default Navbar