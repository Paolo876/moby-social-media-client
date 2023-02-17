import { Button, Paper, Typography } from '@mui/material';
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
import axios from 'axios';

import { Container, Alert, Grid } from "@mui/material"


const Search = () => {
  const [ searchParams, setSearchParams ] = useSearchParams()
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
        setResult(res)
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
          <Grid item xs={12} my={2}>
            <Paper >
              <Typography variant="h5">Search results for "{query}"</Typography>

            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthorizedPageContainer>

  )
}

export default Search