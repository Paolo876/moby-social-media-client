import { Box, IconButton, Paper, Typography, Tooltip } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';

const WelcomeMessage = () => {
  return (
    <Paper sx={{p:2, background: "none", display: {xs: "none", md: "initial"}, maxWidth: "40%"}} elevation={0}>
        <Typography variant="h4" mb={3} sx={{alignSelf: "flex-start"}}>Welcome to Moby!</Typography>
        <Typography variant="subtitle1" mb={2} sx={{alignSelf: "flex-start"}} lineHeight={1.45}>
            Moby is a social media web app that incorporates the essential features of a modern social media application. 
            <br/>This includes the implementation of CRUD operations and a realtime database management system (chat system, friend updates, notification system) using socket.io.
            <br/>Data encryption is implemented on passwords using <strong>bcryptjs</strong> to ensure privacy and security.
        </Typography>
        <Typography variant="subtitle2" mb={8} sx={{alignSelf: "flex-start"}}>
            This app is created using ReactJS, ReduxJSToolkit, ExpressJS, NodeJS, MySQL, Socket.io, and other related libraries.
        </Typography>
        <Typography variant="subtitle2" sx={{alignSelf: "flex-start"}}>
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