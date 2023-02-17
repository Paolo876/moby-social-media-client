import { Button } from '@mui/material';
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'


const Search = () => {
  const [ searchParams, setSearchParams ] = useSearchParams()
  const query = searchParams.get("q");


  useEffect(() => {
    if(query) {
      console.log(query)
    }
  }, [query])


  return (
    <div>
      <Button onClick={() => setSearchParams({"q" : "yoooo"})}>CLICK</Button>
    </div>

  )
}

export default Search