import React from 'react'
import LinkIcon from '@mui/icons-material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PublicIcon from '@mui/icons-material/Public';

// const socialLinksArray = [ "default","facebook", "instagram", "linkedin", "twitter", "youtube", "web" ]

const SocialLinksIconItem = ({ value="default", ...props }) => {
    if(value === "facebook") return <FacebookIcon {...props}/>
    if(value === "instagram") return <InstagramIcon {...props}/>
    if(value === "linkedin") return <LinkedInIcon {...props}/>
    if(value === "twitter") return <TwitterIcon {...props}/>
    if(value === "youtube") return <YouTubeIcon {...props}/>
    if(value === "web") return <PublicIcon {...props}/>
    if(value === "default") return <LinkIcon {...props}/>
}

export default SocialLinksIconItem