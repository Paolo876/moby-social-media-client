import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import AuthorizedPageContainer from '../../components/AuthorizedPageContainer'
const Profile = () => {
  const UserId = useParams()["*"];
  const [ user, setUser ] = useState(null);
  useEffect(() => {
    if(UserId){
      //fetch user data from UserId
    } else {

    }
  }, [])

  return (
    <AuthorizedPageContainer>
        <div>Profile</div>
    </AuthorizedPageContainer>
  )
}

export default Profile