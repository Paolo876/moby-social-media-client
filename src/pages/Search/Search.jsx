import { Button, Paper, Typography } from '@mui/material';
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'

import { Container, Alert, Grid } from "@mui/material"


const Search = () => {
  const [ searchParams, setSearchParams ] = useSearchParams()
  const query = searchParams.get("q");


  useEffect(() => {
    if(query) {
      console.log(query)
    }
  }, [query])


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