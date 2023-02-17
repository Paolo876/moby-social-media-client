import { Stack, Divider, List, ListItem, ListItemButton, Paper, Typography } from '@mui/material';
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import LoadingSpinner from '../../components/LoadingSpinner';
import Image from '../../components/Image';
import defaultAvatar from "../../assets/default-profile.png";
import axios from 'axios';

import { Container, Alert, Grid, Box } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import FeedIcon from '@mui/icons-material/Feed';
import LockIcon from '@mui/icons-material/Lock';


const Search = () => {
  const [ searchParams ] = useSearchParams()
  const query = searchParams.get("q");
  const navigate = useNavigate();

  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ result, setResult ] = useState(null);


  useEffect(() => {
    if(query) fetchData();
  }, [query])

  const fetchData = async () => {
    setIsLoading(true)
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/main/search?${searchParams.toString()}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        setIsLoading(false)
        setResult(res.data)
    } catch(err) {
      setIsLoading(false)
      setError((err.response && err.response.data) ? err.response.data.message : err.message)
    }
  }


  return (
    <AuthorizedPageContainer>
      <Container>
        <Grid container>
          <Grid item xs={12} my={2}><Typography variant="h5" mb={.5}>Search results for "{query}"</Typography><Divider/></Grid>
          <Grid item xs={12} md={8} my={.5} mx="auto">
            {isLoading && <LoadingSpinner isModal={false} style={{minHeight: "0em", backgroundColor: "initial", transform: "scale(.6)", opacity: .5}}/>}
            {error && <Alert severity='error'>{error}</Alert>}
          </Grid>
          <Grid item xs={12} md={8} my={.5} mx="auto">
            <List>
            {result && 
              <>
              {result.users.map(item => 
                <ListItem key={item.id}>
                  <Paper sx={{width: "100%", overflow: "hidden"}} >
                    <ListItemButton sx={{width: "100%", p: 0, px:.5}}  onClick={() => navigate(`/profile/${item.id}`)}>
                      <PersonIcon sx={{mx:0, opacity: .5}}/>
                      <Divider orientation="vertical" flexItem sx={{ml:.5, mr: 1.5}}/>
                      {item.UserDatum && item.UserDatum.image ? 
                        <Image 
                          src={JSON.parse(item.UserDatum.image).url} 
                          transformation={[{
                              height: 35,
                              width: 35,
                          }]} 
                          style={{borderRadius: "50%"}}
                          alt="profile-avatar"
                        /> : <img src={defaultAvatar} style={{height: "35px", width: "35px"}} alt="profile-avatar"/>
                      }
                      <Stack ml={1} py={1.25}>
                        <Typography variant="body1" align='left'>{item.username}</Typography>
                        {item.UserDatum && <Typography variant="body2" align='left'>{item.UserDatum.firstName} {item.UserDatum.lastName}</Typography>}
                      </Stack>
                    </ListItemButton>
                  </Paper>
                </ListItem>
              )}
              {result.posts.map(item => 
                <ListItem key={item.id}>
                  <Paper sx={{width: "100%", overflow: "hidden"}} >
                    <ListItemButton sx={{width: "100%", p: 0, px:.5, pr: 5, display:"flex", alignItems: "flex-start"}}  onClick={() => navigate(`/posts/${item.id}`)}>
                      <FeedIcon sx={{mx:0, opacity: .5, alignSelf: "center"}}/>
                      <Divider orientation="vertical" flexItem sx={{ml:.5, mr: 1.5}}/>
                      {item.image && <Image 
                          src={JSON.parse(item.image).url} 
                          transformation={[{ height: 80 }]} 
                          alt="post-preview"
                          style={{margin: ".5em 0"}}
                        />}

                      <Stack ml={1} my=".5em" sx={{height: "100%"}} alignItems="flex-start">
                        <Typography variant="body2" align='left' lineHeight={1}>{item.title}</Typography>
                        <Typography variant="subtitle1" align='left' fontWeight={300} fontSize={13}>{item.postText.length > 50 ? item.postText.substr(0,50) : item.postText}...</Typography>
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} mt={1.5}>
                          <Box>
                            {item.User.UserDatum && item.User.UserDatum.image ? 
                              <Image 
                                src={JSON.parse(item.User.UserDatum.image).url} 
                                transformation={[{
                                    height: 25,
                                    width: 25,
                                }]} 
                                style={{borderRadius: "50%"}}
                                alt="profile-avatar"
                              /> : <img src={defaultAvatar} style={{height: "25px", width: "25px"}} alt="profile-avatar"/>
                            }
                          </Box>
                          <Typography variant="body1" align='left' fontSize={13} ml={.5}>{item.User.username}</Typography>
                        </Box>
                      </Stack>
                      {!item.isPublic && <LockIcon fontSize="small" sx={{position: "absolute", top: 10, right: 10, opacity: .9, zIndex: 5}} color="info"/>}
                    </ListItemButton>
                  </Paper>
                </ListItem>
              )}
              </>
            }

            </List>
          </Grid>
        </Grid>
      </Container>
    </AuthorizedPageContainer>

  )
}

export default Search