import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthRedux from '../hooks/useAuthRedux';
import WelcomeMessage from '../components/WelcomeMessage';
import { Container, Typography, Paper, Button, TextField, Alert, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, CircularProgress, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import KeyIcon from '@mui/icons-material/Key';

export default function Login() {
  const { error, isLoading, login } = useAuthRedux();   
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ showPassword, setShowPassword ] = useState(false)

  const handleSubmit = (e) => {
      e.preventDefault();
      login({ username, password });
  }
  return (
    <Container sx={{display: 'flex', justifyContent:{xs:"space-between", md: "center"}, alignItems: {xs: "flex-start", md: "center"}, height: {xs: "100%", md: "75vh"}, flexDirection:{xs: "column-reverse", md: "row"}}}>
      <WelcomeMessage/>
      <Paper 
        sx={{
          py: {xs:2, sm:5}, 
          px: {xs: 2, md:8}, 
          width: "fit-content", 
          mx: "auto",
          background: "none",
          backdropFilter: "blur(10px) brightness(102%)"
        }} 
        elevation={4}
      >
        <Typography variant="h4" fontWeight={700} mb={{xs:1, md :4}} letterSpacing={1} fontSize={{xs: 20, md: 25}}><LoginIcon style={{verticalAlign:"middle"}} sx={{mr: 1}} fontSize="inherit"/>LOGIN</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{display: "flex", flexDirection: "column", my: 5}}>
                <TextField 
                    id="username" 
                    type="text" 
                    label={<p><AccountCircleIcon style={{verticalAlign:"middle"}} sx={{mr: 1}} />Username</p>} 
                    value={username} 
                    variant="outlined" 
                    onChange={e => setUsername(e.target.value)}
                    sx={{my: {xs: 1, md: 2}, minWidth: "320px"}}
                />
                <FormControl sx={{my: {xs: 1, md: 2}, minWidth: "320px"}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password"><p><KeyIcon style={{verticalAlign:"middle"}} sx={{mr: 1}}/>Password</p></InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(prevState => !prevState)}
                            onMouseDown={e => e.preventDefault()}
                            edge="end"
                            color="secondary"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label={<p><KeyIcon style={{verticalAlign:"middle"}} sx={{mr: 1}}/>Password</p>}
                    />
                </FormControl>
                {error && <Alert severity="error">{error}</Alert>}
                {!isLoading && <Button variant="contained" type="submit" size="large" sx={{ mt: {xs: 2.5, md: 5}}}>Login</Button>}
                {isLoading && <Button variant="contained" type="submit" size="large" sx={{ mt: {xs: 2.5, md: 5} }} disabled>
                    Logging in <CircularProgress color="secondary" size={16} thickness={6} sx={{ml: 2}}/>
                </Button>}                    
            </Box>
          <Typography variant="body2" mt={{xs: 2.5, md: 5}}>Not a member yet? <Button  to="/signup" LinkComponent={Link} sx={{textTransform: "none"}}>Click here to sign up.</Button></Typography>
      </Paper>
    </Container>

  )
}
