import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { InputBase } from '@mui/material';


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



const SearchInput = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [ input, setInput ] = useState("");


  useEffect(() => {
    if(pathname === "/") setInput("")
  }, [pathname])

  
  const handleKeyDown = async (e) => {
    if(e.key === "Enter") {
        e.preventDefault();
        navigate(`/search?q=${input}`)
    }
  }


  return (
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}

export default SearchInput