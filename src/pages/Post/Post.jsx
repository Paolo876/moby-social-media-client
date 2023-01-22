import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Typography, Container, Grid } from '@mui/material'
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
const Post = () => {
  const { id } = useParams();
  const [ post, setPost ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  return (
    <AuthorizedPageContainer>

    </AuthorizedPageContainer>
  )
}

export default Post