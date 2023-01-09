import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthRedux from '../../hooks/useAuthRedux'

const Home = () => {
  const { user } = useAuthRedux();
  const navigate = useNavigate();
  useEffect(() => {
    if(!user) navigate("/login")
  }, [user]);

  return (
    <div>Home</div>
  )
}

export default Home