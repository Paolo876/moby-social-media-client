import { Box, IconButton, Paper, Typography, Tooltip } from "@mui/material";
import { useLocation } from "react-router-dom"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';

const WelcomeMessage = () => {
  const { pathname } = useLocation();
  const isSignupPage = pathname.includes("/signup")

  return (
    <Paper 
      sx={{
        p:{xs: .25, md: 2}, 
        pt:{xs: 1, md: 1}, 
        background: "none", 
        maxWidth: {xs: "320px", md: "40%"}, 
        mx:"auto"
      }} 
      elevation={0}
    >
      <Box sx={{display: {xs: isSignupPage ? "none" : "initial", md: "initial"}}}>
        <Typography variant="h4" sx={{alignSelf: "flex-start", display: {xs: "none", md: "initial"}, fontSize: {lg: 40}, letterSpacing: -.05}}>Welcome to Moby!</Typography>
        <Typography variant="subtitle1" mt={3} sx={{alignSelf: "flex-start", opacity: {xs : .95, md: 1}}} lineHeight={1.7} fontSize={{xs: 13, md: 14, lg: 15}}>
            Moby is a social media web app that incorporates the essential features of a modern social media application.             
            <br/>This includes the implementation of CRUD operations and a realtime database management system (chat system, friend updates, notification system).
            <br/>Data encryption is implemented on passwords using <strong>bcryptjs</strong> to ensure privacy and security.
        </Typography>
        <Box mt={6} sx={{display: {xs: "none", md: "block"}, transform: "skewX(-3deg)", opacity: .75}} >
          <Typography variant="subtitle2">
              This app is created using ReactJS, ReduxJSToolkit, ExpressJS, NodeJS, MySQL, Socket.io, and other related libraries.
          </Typography>
        </Box>

      </Box>
      <Typography variant="subtitle2" sx={{alignSelf: "flex-start"}} fontSize={{xs: isSignupPage ? 13 : 12, md: 15}}  mt={{xs: isSignupPage ? 4 : 2.5, md: 3.5}} >
          Designed and developed by <strong>Paolo Bugarin</strong>.
      </Typography>
      <Box mt={.75}>
        <Tooltip title="My Website" arrow><IconButton size="medium" color="secondary" target="_blank" href="https://paolobugarin.com/"><PublicIcon fontSize="inherit"/></IconButton></Tooltip>
        <Tooltip title="Github" arrow><IconButton size="medium" color="secondary" target="_blank" href="https://github.com/Paolo876"><GitHubIcon fontSize="inherit"/></IconButton></Tooltip>
        <Tooltip title="LinkedIn" arrow><IconButton size="medium" color="secondary" target="_blank" href="https://www.linkedin.com/in/paolo-bugarin/"><LinkedInIcon fontSize="inherit"/></IconButton></Tooltip>
      </Box>
    </Paper>

  )
}

export default WelcomeMessage