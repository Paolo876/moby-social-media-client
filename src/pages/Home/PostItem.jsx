import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png";
import { Grid, Paper, Button, Typography, useTheme, Stack, IconButton, Tooltip, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import usePostsRedux from '../../hooks/usePostsRedux';
import usePostActions from '../../hooks/usePostActions';
import InfinitePaginator from './InfinitePaginator';

const PostBody = ({ isPublic, title, user, image: coverImage, isHovered, transitions, isBookmarked, id, disableActions }) => {
  const { bookmarkPost, isLoading } = usePostsRedux();
  const navigate = useNavigate();
  let image;
  if(coverImage) image = JSON.parse(coverImage);


  return (
    <>
      {!disableActions && <Tooltip title={isBookmarked ? "You bookmarked this post." : "Bookmark Post"} arrow leaveDelay={50}>
        <Box sx={{ borderRadius: 1, position: "absolute", zIndex: 20, right: 0}} >
        <IconButton onClick={() => bookmarkPost(id)} disabled={isLoading}>
            {isBookmarked ? 
              <BookmarkAddedIcon fontSize="medium" sx={{color: "rgba(239, 144, 60, .8)"}}/> : 
              <TurnedInNotIcon fontSize="medium" sx={{color: "rgba(239, 144, 60, .9)"}}/>
            }
          </IconButton>
        </Box>
      </Tooltip>}
      <Button 
        sx={{
          width: "100%", mr: "auto", p:0, 
          textTransform: "none", textAlign: "left", 
          borderRadius: "10px 10px 0 0", 
          transition: transitions.create('filter', {duration: 1200, delay: 0})
          }} 
          color="primary"
          onClick={() => navigate(`/posts/${id}`)}
        >
        <Box 
          sx={{
            position: "relative", 
            width: "100%", p: 0, color: "black", minHeight: {xs: 170, sm:200}, maxHeight: {xs: 220, sm:300, md: 330, lg: 350}, borderRadius: "10px 10px 0 0", overflow: "hidden", backgroundColor: "white"
          }} 
          variant="outlined"
          >
          {!isPublic && <Tooltip title="Private posts are only visible to friends of the author." arrow >
            <LockIcon fontSize="medium" sx={{position: "absolute", top: 10, left: 10, zIndex: 5}} color="error"/>
          </Tooltip>}
          <Stack  
            sx={{
              position:"absolute", top: "48%", left: "50%", transform: "translate(-50%,-50%)", 
              zIndex: 2, width: "100%", 
              backgroundColor: isHovered ? "rgba(225,225,225,0.5)" : "", 
              py: 2,
              transition: transitions.create('all', {duration: 800, delay: 0}),
              textShadow: image ? "1px 1px 5px rgba(255,255,255,0.25)" : "initial",
              }}
            >
            <Typography variant="h5" align='center' fontWeight={600} pb={isHovered ? .75 :.5} color="primary.dark">{title}</Typography>
            {isHovered && !isPublic && <Typography variant="subtitle1" align='center' sx={{width: "100%", opacity: .9}} mb={2} px={2} fontStyle={isPublic ? "" : "italic"}>This post is private.</Typography>}
            {!isHovered && user && <Typography variant="body2" align='center' fontWeight={400} sx={{opacity: .6}} px={4}>-{user.UserDatum.firstName} {user.UserDatum.lastName}</Typography>}
          </Stack>
          {image && 
            <Image 
              src={image.url}
              alt={image.name}
              style={{
                objectFit: "cover", 
                objectPosition: "center",
                width: "100%", 
                height: "100%", 
                transform: "translate(0, 0)", 
                zIndex: 1, 
                transition: transitions.create('filter', {duration: 800, delay: 0}), filter: isPublic && isHovered ? "" : "blur(1px) opacity(0.5) grayscale(.5) brightness(0.65)"
                }}
              />}
        </Box>
      </Button>
    </>
  
  )
}

const PostActions = ({ palette, isLiked, isFetchedFromProfile, user, userImage, createdAt, id, likes, comments, setPosts, disableActions}) => {
  const navigate = useNavigate();
  const { updatePosts } = usePostsRedux();
  const { likePost, isLoading } = usePostActions();

  const handleLike = async () => {
    if(!isLoading) {
      //like post using usePostActions
      const res = await likePost(id);
      //update post redux
      updatePosts({PostId: parseInt(res.id), type: "like", isLiked: res.isLiked, UserId: res.UserId })

      if(isFetchedFromProfile) setPosts(prevState => {
        const updatedPost = [ ...prevState ]
        const post = updatedPost.find(item => item.id === parseInt(res.id))

        if(res.isLiked){
          post.Likes = [{UserId: res.UserId}, ...post.Likes];
        } else {
          post.Likes = post.Likes.filter(item => item.UserId !== res.UserId)
        }
        return updatedPost
      })
    };
  };

  const handleLikeClick = () => {
    if(disableActions){
      navigate(`/posts/${id}`)
    } else {
      handleLike()
    }
  }

  
  return (
    <Paper sx={{backgroundColor: palette.primary.main, p:1, py:0.5, borderRadius: "0 0 10px 10px", zIndex:1000}}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" px={.5}>
        <Stack flexDirection="row">
          <Tooltip title={isLiked ? "You liked this post." : "Like Post"} arrow leaveDelay={50}>
            <IconButton sx={{py:1.25, px: 2, mr:.25, borderRadius: 5}} onClick={handleLikeClick} disableRipple>
              {isLiked ? 
                <FavoriteIcon fontSize="medium" sx={{color: "rgba(229, 85, 85, 1)"}}/> : 
                <FavoriteBorderIcon fontSize="medium" sx={{color: "rgba(229, 85, 85, .85)"}}/>
              }
              <Typography variant="body2" color="rgba(255, 255, 255, .75)" sx={{ml:1}}>{likes > 0 && likes}</Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title="Comments" arrow leaveDelay={50}>
            <IconButton sx={{py:1.25, px: 2, mr:.25, borderRadius: 5}} onClick={() => navigate(`/posts/${id}`)}>
              <ForumIcon fontSize="medium" color="info" />
              <Typography variant="body2" color="rgba(255, 255, 255, .75)" sx={{ml:1}}>{comments > 0 && comments}</Typography>

            </IconButton>
          </Tooltip>
        </Stack>
        <Stack>
          <Button color="secondary" sx={{ textTransform: "initial", color: "initial", py: 0 }} onClick={() => navigate(`/profile/${user.id}`)}>
            <Stack mr={.75} py={.5} alignItems="flex-end">
              <Typography variant="body1" align='right' color="rgba(255, 255, 255, .75)" fontSize={13} fontWeight={500}>@{user.username}</Typography>
              <Typography variant="body1" align='right' color="rgba(255, 255, 255, .75)" fontSize={10.5} fontWeight={300} mt={.25}>{new Date(createdAt).toLocaleDateString()}</Typography>
            </Stack>
            {userImage ? 
              <Image 
                  src={userImage.url} 
                  transformation={[{ height: 28, width: 28 }]} 
                  style={{borderRadius: "50%"}}
                  alt="profile-avatar"
              /> : <img src={defaultAvatar} style={{height: "28px", width: "28px"}} alt="profile-avatar"/>
            }
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

const PostItem = ({ isObserver, title, image, isPublic, isLiked=false, isBookmarked=false, user, createdAt, id, likes, comments, isFetchedFromProfile=false, setPosts=null, disableActions=false}) => {
  const [ isHovered, setIsHovered ] = useState(false)
  const { palette, transitions } = useTheme();
  let userImage;
  if(user && user.UserDatum) userImage = JSON.parse(user.UserDatum.image);
  return (
    <>
    {isObserver && <InfinitePaginator/>}
    <Grid 
      item 
      sx={{m:.5, mt: 2, p: 0, boxShadow: 3, mb: 3, borderRadius: "10px", position: "relative", transition: transitions.create('all', {duration: 800, delay: 0}), "&:hover": { boxShadow: 5 }}} 
      xs={12}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <PostBody isPublic={isPublic} isBookmarked={isBookmarked} createdAt={createdAt} title={title} user={user} image={image} isHovered={isHovered} transitions={transitions} id={id} disableActions={disableActions}/>
      <PostActions palette={palette} isLiked={isLiked} user={user} userImage={userImage} createdAt={createdAt} id={id} likes={likes} comments={comments} isFetchedFromProfile={isFetchedFromProfile} setPosts={setPosts} disableActions={disableActions}/>
    </Grid>
    </>

  )
}

export default PostItem