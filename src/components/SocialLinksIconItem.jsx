import React from 'react'
import LinkIcon from '@mui/icons-material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PublicIcon from '@mui/icons-material/Public';

// const socialLinksArray = [ "default","facebook", "instagram", "linkedin", "twitter", "youtube", "web" ]

const SocialLinksIconItem = ({ value, ...props }) => {
    switch (value) {
        case "facebook":
            return <FacebookIcon {...props}/>
        case "instagram":
            return <InstagramIcon {...props}/>
        case "linkedin":
            return <LinkedInIcon {...props}/>
        case "twitter":
            return <TwitterIcon {...props}/>
        case "youtube":
            return <YouTubeIcon {...props}/>
        case "web":
            return <PublicIcon {...props}/>
        default:
            return <LinkIcon {...props}/>
    }
}

export default SocialLinksIconItem