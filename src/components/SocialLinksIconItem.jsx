import React from 'react'
import LinkIcon from '@mui/icons-material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PublicIcon from '@mui/icons-material/Public';

// const socialLinksArray = [ "default","facebook", "instagram", "linkedin", "twitter", "youtube", "web" ]

const SocialLinksIconItem = ({ item, ...props }) => {
    if(item === "facebook") return <FacebookIcon {...props}/>
    if(item === "instagram") return <InstagramIcon {...props}/>
    if(item === "linkedin") return <LinkedInIcon {...props}/>
    if(item === "twitter") return <TwitterIcon {...props}/>
    if(item === "youtube") return <YouTubeIcon {...props}/>
    if(item === "web") return <PublicIcon {...props}/>
    return <LinkIcon {...props}/>
}

export default SocialLinksIconItem