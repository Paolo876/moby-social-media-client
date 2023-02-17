import React from 'react'
import AuthorizedPageContainer from '../components/AuthorizedPageContainer';
import { Container, Typography, Paper, Button, Alert, CircularProgress } from '@mui/material';
import WelcomeMessage from '../components/WelcomeMessage';

const About = () => {
  return (
    <AuthorizedPageContainer>
      <Container sx={{pt: 1.5}}>
        <WelcomeMessage/>
      </Container>
    </AuthorizedPageContainer>
  )
}

export default About