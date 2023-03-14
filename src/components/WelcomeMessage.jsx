import { Box, IconButton, Paper, Typography, Tooltip } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';

const WelcomeMessage = () => {
  return (
    <Paper sx={{p:{xs: .25, md: 2}, pt:{xs: 1, md: 2}, background: "none", maxWidth: {xs: "320px", md: "40%"}, mx:"auto"}} elevation={0}>
        <Typography variant="h4" sx={{alignSelf: "flex-start", display: {xs: "none", md: "initial"}}}>Welcome to Moby!</Typography>
        <Typography variant="subtitle1" mt={2} sx={{alignSelf: "flex-start", opacity: {xs : .95, md: 1}}} lineHeight={1.45} fontSize={{xs: 13, md: 16}}>
            Moby is a social media web app that incorporates the essential features of a modern social media application. 
            <br/>This includes the implementation of CRUD operations and a realtime database management system (chat system, friend updates, notification system) using socket.io.
            <br/>Data encryption is implemented on passwords using <strong>bcryptjs</strong> to ensure privacy and security.
        </Typography>
        <Typography variant="subtitle2" sx={{alignSelf: "flex-start", display: {xs: "none", md: "initial"}}}>
            This app is created using ReactJS, ReduxJSToolkit, ExpressJS, NodeJS, MySQL, Socket.io, and other related libraries.
        </Typography>
        <Typography variant="subtitle2" sx={{alignSelf: "flex-start"}} fontSize={{xs: 12, md: 15}}  mt={{xs: 2.5, md: 3.5}} >
            Designed and developed by <strong>Paolo Bugarin</strong>.
        </Typography>
        <Box>
          <Tooltip title="Facebook" arrow><IconButton size="medium" color="secondary" target="_blank" href="https://www.facebook.com/paolobugarin19/"><FacebookIcon fontSize="inherit"/></IconButton></Tooltip>
          <Tooltip title="Github" arrow><IconButton size="medium" color="secondary" target="_blank" href="https://github.com/Paolo876"><GitHubIcon fontSize="inherit"/></IconButton></Tooltip>
          <Tooltip title="LinkedIn" arrow><IconButton size="medium" color="secondary" target="_blank" href="https://www.linkedin.com/in/paolo-bugarin/"><LinkedInIcon fontSize="inherit"/></IconButton></Tooltip>
          <Tooltip title="My Website" arrow><IconButton size="medium" color="secondary" target="_blank" href="https://paolobugarin.com/"><PublicIcon fontSize="inherit"/></IconButton></Tooltip>
        </Box>
    </Paper>

  )
}

export default WelcomeMessage