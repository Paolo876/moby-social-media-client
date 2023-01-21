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

const POSTS_DATA = [
  { id: 3, title: "Lorem ipsum dolor sit amet", image: null, isPublic: true, postText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet purus gravida quis blandit turpis. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Donec enim diam vulputate ut pharetra. Amet est placerat in egestas. Est ullamcorper eget nulla facilisi etiam dignissim diam quis. Sed arcu non odio euismod lacinia at. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Id eu nisl nunc mi ipsum faucibus vitae. Aliquam id diam maecenas ultricies mi eget mauris. Sit amet purus gravida quis blandit turpis. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Lectus sit amet est placerat in egestas erat imperdiet. Velit ut tortor pretium viverra. Faucibus pulvinar elementum integer enim neque volutpat ac. Odio aenean sed adipiscing diam donec adipiscing tristique risus. Turpis egestas integer eget aliquet nibh praesent tristique. Massa massa ultricies mi quis hendrerit. Ut sem viverra aliquet eget sit amet tellus cras adipiscing. Vel eros donec ac odio tempor orci dapibus ultrices." },
  { id: 4, title: "At consectetur lorem", image: "https://ik.imagekit.io/q5892cimh/moby/posts/DJI_0178_cMCdCdGt4.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673929790458", isPublic: false, postText: "At consectetur lorem donec massa sapien faucibus et. Integer feugiat scelerisque varius morbi. Neque vitae tempus quam pellentesque nec nam. Turpis egestas maecenas pharetra convallis posuere. Vitae sapien pellentesque habitant morbi. Et netus et malesuada fames. Leo duis ut diam quam nulla porttitor." },
  { id: 5, title: "Cursus euismod", image: null, isPublic: false, postText: "Cursus euismod quis viverra nibh. Vitae sapien pellentesque habitant morbi tristique. Ante metus dictum at tempor. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Eget sit amet tellus cras adipiscing enim eu turpis. Dui accumsan sit amet nulla facilisi morbi tempus. Tellus mauris a diam maecenas sed enim. Maecenas ultricies mi eget mauris pharetra et ultrices neque. Lorem ipsum dolor sit amet consectetur. Sed enim ut sem viverra aliquet." },
  { id: 6, title: "Euismod lacinia at quis", image: "https://ik.imagekit.io/q5892cimh/moby/posts/DJI_0141_i5KBArHpCt.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673929790378", isPublic: true, postText: "Euismod lacinia at quis risus. Sapien faucibus et molestie ac feugiat sed lectus. Posuere ac ut consequat semper viverra nam libero justo." },
  { id: 7, title: "Iaculis nunc sed", image: "https://ik.imagekit.io/q5892cimh/moby/posts/DJI_0127.DNG_n6WPiatu5.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673929789878", isPublic: true, postText: "Iaculis nunc sed augue lacus viverra vitae." },
];

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

      {/* {POSTS_DATA.map(item => <PostItem 
        key={item.id}
        title={item.title}
        image={item.image}
        isPublic={item.isPublic}
        postText={item.postText}
      />)} */}
      {posts.map(item => <PostItem
        key={item.id}
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