import { useState, useRef} from 'react';
import { Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Typography, Stack } from '@mui/material';
import { useTheme } from '@emotion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CircleIcon from '@mui/icons-material/Circle';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function UserStatusDropDown() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [ userStatus, setUserStatus ] = useState("online");
  const { palette } = useTheme();
  const handleMenuItemClick = (value) => {
    setUserStatus(value);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack  sx={{backgroundColor: "none", boxShadow: "none", display: "flex", alignItems: "center", flexDirection: "row"}}>
      <Typography variant="h6" fontWeight={400} fontSize={16} mr={2}>Status: </Typography>
      <Button
          aria-haspopup="menu"
          onClick={handleToggle}
          ref={anchorRef}
          sx={{width: "100%", display: "flex", alignItems: "center", flexDirection: "row"}}
        >
        <Typography 
          letterSpacing={.2} 
          fontWeight={500} 
          fontSize={15} 
          minWidth={120} 
          textAlign="left" 
          color="secondary" 
          textTransform="none"
        >
          {userStatus}
        </Typography>
        <ArrowDropDownIcon />
      </Button>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper elevation={3} >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem sx={{p:0}}>
                  <MenuItem onClick={() => handleMenuItemClick("online")} sx={{pr: 6, py:1.25, fontSize: 16}} divider><CircleIcon fontSize="xs" sx={{mr: 1, color: palette.userStatus.online}}/>online</MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("idle")} sx={{pr: 6, py:1.25, fontSize: 16}} divider><NightsStayIcon fontSize="xs" sx={{mr: 1, color: palette.userStatus.idle}}/>idle</MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("invisible")} sx={{pr: 6, py:1.25, fontSize: 16}}><VisibilityOffIcon fontSize="xs" sx={{mr: 1, color: palette.userStatus.invisible}}/>invisible</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}