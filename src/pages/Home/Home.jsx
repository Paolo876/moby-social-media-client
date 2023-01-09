import { useEffect } from 'react';
import useAuthRedux from '../../hooks/useAuthRedux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const { user } = useAuthRedux();
  // const navigate = useNavigate();

  // useEffect(()=>{
  //   if(!user) navigate("/login")
  // },[ user ])
  
  return (
    <div>Home</div>
  )
}

export default Home