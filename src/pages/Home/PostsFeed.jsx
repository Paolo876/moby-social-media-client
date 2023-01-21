import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostsRedux from '../../hooks/usePostsRedux';
import { Paper, Typography, Stack, Grid, Chip, Button, Divider } from "@mui/material"
import { styled } from '@mui/material/styles';
import useAuthRedux from '../../hooks/useAuthRedux';
import defaultAvatar from "../../assets/default-profile.png";
import Image from '../../components/Image';
import PostItem from './PostItem';
import LoadingSpinner from '../../components/LoadingSpinner';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

const PostsFeed = () => {
  const { isLoading, error, posts, getPosts } = usePostsRedux();
  const { user: { UserData, id } } = useAuthRedux();
  const navigate = useNavigate();

  const [ isHovered, setIsHovered ] = useState(false)

  useEffect(() => {
    if(posts.length === 0) getPosts()
  }, [])

  let image;
  if(UserData) image = JSON.parse(UserData.image);

  return (
    <Grid container>
      <Grid item sx={{m:.5, mt: 1, mb: 2.5, p: 1}} xs={12} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Button 
          sx={{width: "100%", mr: "auto", p:0, textTransform: "none", textAlign: "left"}} 
          color="info"
          onClick={() => navigate("/create")}
          >
          <Paper sx={{width: "100%", p: 3, "&:hover": { boxShadow: 3 }}} variant="outlined">
            <Typography variant="h5" fontWeight={400}>Create A Post</Typography>
            <Stack flexDirection="row" sx={{width: "100%"}} alignItems="center" mt={1.75} ml={1}>
              {image ? 
                <Image 
                  src={image.url} 
                  transformation={[{
                      height: 35,
                      width: 35,
                  }]} 
                  style={{borderRadius: "50%"}}
                  alt="profile-avatar"
                /> :
                <img src={defaultAvatar} alt="profile-avatar" style={{height: "35px", width: "35px"}}/>
              }
              <Chip label="Write a post" sx={{flex: 1, ml:1.5, mr:4, cursor: "pointer", backgroundColor: !isHovered ? "rgba(0,0,0,0.075)" : "rgba(0,0,0,0.25)"}}/>
            </Stack>
          </Paper>
        </Button>
      </Grid>
      <Root>
        <Divider><Typography variant="body1">{new Date().toLocaleDateString()}</Typography></Divider>
      </Root>
      {posts.map(item => <PostItem
        key={item.id}
        id={item.id}
        title={item.title}
        image={item.image}
        isPublic={item.isPublic}
        postText={item.postText}
        likes={item.Likes.length}
        isLiked={item.Likes.some(item => item.UserId === id)}
        user={item.User}
        createdAt={item.createdAt}
      />)}
      {isLoading && <Grid item xs={12}>
        <LoadingSpinner 
          style={{minHeight: "7em", backgroundColor: "initial", transform: "scale(.6)", opacity: .75}} message="Loading posts..." messageStyle={{color: "black", fontSize: 20}} />
        </Grid>}
    </Grid>

  )
}

export default PostsFeed