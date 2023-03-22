import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostActions from "../../hooks/usePostActions";
import { Divider, Paper, Typography, Stack, Box, Button, Tooltip, IconButton } from '@mui/material'
import MaterialRoot from '../../components/MaterialRoot'
import Image from "../../components/Image";
import defaultAvatar from "../../assets/default-profile.png";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

const PostPreview = ({ title, postText, user, image: coverImage, isPublic, createdAt, updatedAt, width, isBookmarked: _isBookmarked, id }) => {
  const navigate = useNavigate();
  const { bookmarkPost, isLoading } = usePostActions();
  
  const [ isBookmarked, setIsBookmarked ] = useState(_isBookmarked)
  let image;
  if(coverImage) image = JSON.parse(coverImage);
  let userImage;
  if(user.UserDatum.image) userImage = JSON.parse(user.UserDatum.image)

  const handleBookmarkClick = async () => {
    const result = await bookmarkPost(id)
    setIsBookmarked(result.isBookmarked)
  } 

  return (
    <Paper sx={{my: 2, py: {xs: 2.5, md:5}, px: {xs: 2, md:8}, mx: "auto", height: "fit-content", position: "relative"}} elevation={4}>
      <Tooltip title={isBookmarked ? "You bookmarked this post." : "Bookmark Post"} arrow leaveDelay={50}>
        <IconButton sx={{ borderRadius: 1, position: "absolute", zIndex: 20, right: 0, top: 0}} onClick={handleBookmarkClick} disabled={isLoading}>
          {isBookmarked ? 
            <BookmarkAddedIcon fontSize="medium" sx={{color: "rgba(239, 144, 60, 1)"}}/> : 
            <TurnedInNotIcon fontSize="medium" sx={{color: "rgba(239, 144, 60, 1)"}}/>
          }
        </IconButton>
      </Tooltip>
      {image && 
        <Box mb={{xs: 1, md:3}}>
          <Image 
            src={image.url}
            alt={image.name}
            style={{
              objectFit: "cover", 
              objectPosition: "center",
              width: "100%", 
              height: "100%", 
              zIndex: 1, 
              }}
            />
        </Box>
        }
      <Typography variant="h5" align="left" fontSize={{xs: 20, md:26}}>{title}</Typography>
      <MaterialRoot><Divider/></MaterialRoot>
      <Stack alignItems="center" flexDirection="row" justifyContent="space-between">
        <Typography variant="subtitle2" fontWeight="300" align="left" fontSize={{xs: 12, md:14}}>by {user.UserDatum.firstName} {user.UserDatum.lastName}</Typography>
        <Typography variant="body1" align='right' fontWeight={300} fontSize={{xs: 11, md:13}}>{new Date(createdAt).toLocaleDateString()}</Typography>
      </Stack>
      <Typography variant="body2" mt={{xs: 1.5, md:3}} sx={{overflowWrap: "break-word"}}>{postText}</Typography>

      <Stack width="fit-content" mt={{xs: 4, md:8}}>
          <Button color="secondary" sx={{ textTransform: "initial", color: "initial", py: 0 }} onClick={() => navigate(`/profile/${user.id}`)} >
            {userImage ? 
                <Image 
                    src={userImage.url} 
                    transformation={[{ height: 28, width: 28 }]} 
                    style={{borderRadius: "50%"}}
                    alt="profile-avatar"
                /> : <img src={defaultAvatar} style={{height: "28px", width: "28px"}} alt="profile-avatar"/>
              }
            <Stack ml={1} py={.5} alignItems="flex-start" sx={{opacity: .85}}>
              <Typography variant="body1" align='center' fontSize={13} fontWeight={500}>@{user.username}</Typography>
              <Typography variant="body1" align='center' fontSize={10.5} fontWeight={300} mt={.25}>{user.UserDatum.firstName} {user.UserDatum.lastName}</Typography>
            </Stack>
          </Button>
        </Stack>

    </Paper>
  )
}

export default PostPreview