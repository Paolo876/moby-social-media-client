import { Button, ButtonBase, Divider, Paper, Typography } from '@mui/material';
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import axios from 'axios';

import { Container, Alert, Grid } from "@mui/material"
import LoadingSpinner from '../../components/LoadingSpinner';


const Search = () => {
  const [ searchParams ] = useSearchParams()
  const query = searchParams.get("q");

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


  console.log(result)

  return (
    <AuthorizedPageContainer>
      <Container>
        <Grid container>
          <Grid item xs={12} my={2}><Typography variant="h5" mb={.5}>Search results for "{query}"</Typography><Divider/></Grid>
          <Grid item xs={12} md={8} my={.5} mx="auto">
            {isLoading && <LoadingSpinner isModal={false} style={{minHeight: "0em", backgroundColor: "initial", transform: "scale(.6)", opacity: .5}}/>}
          </Grid>
          {result && 
            <>
              {result.users.map(item => <Grid item xs={12} md={8} my={.5} mx="auto"><ButtonBase key={item.id} sx={{width: "100%"}}><Paper sx={{width: "100%"}}>asd</Paper></ButtonBase></Grid>)}
              {result.posts.map(item => <Grid item xs={12} md={8} my={.5} mx="auto"><ButtonBase key={item.id} sx={{width: "100%"}}><Paper sx={{width: "100%"}}>asd</Paper></ButtonBase></Grid>)}
            </>
          }
        </Grid>
      </Container>
    </AuthorizedPageContainer>

  )
}

export default Search