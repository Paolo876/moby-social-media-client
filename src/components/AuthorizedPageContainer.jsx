import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthRedux from '../hooks/useAuthRedux';
/**
 * @desc  this component checks if the user logged in already set up their profile. If not, redirects to /profile-setup
 */
const AuthorizedPageContainer = ({ children }) => {
  const { user } = useAuthRedux();
  const [ isReady, setIsReady ] = useState(false);
  const navigate = useNavigate();
  //check if user's profile is setup
  useEffect(() => {
    if(user){
        if(!user.UserData) {
          navigate("/profile-setup")
        }
    } else {
        navigate("/login")
    }
    setIsReady(true)
  }, [ user, navigate ])
  
  if(isReady) return <>{children}</>
}

export default AuthorizedPageContainer