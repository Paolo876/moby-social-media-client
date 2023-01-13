import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/reducers/authSlice';
import { authorizeToken, login, logout, signup, profileSetup } from '../redux/reducers/authReducers';

export default function useAuthRedux() {
    const dispatch = useDispatch();
    const authRedux = useSelector(state => state.auth)
    if(authRedux) {
      return {
        ...authRedux,
        //   setUserData: data => dispatch(userActions.setUserData(data)),
        //   setIsLoading: data => dispatch(userActions.setIsLoading(data)),
        //   setError: () => dispatch(userActions.setError()),
          login: data => dispatch(login(data)),
          signup: data => dispatch(signup(data)),
          profileSetup: data => dispatch(profileSetup(data)),
        //   updateProfile: data => dispatch(updateProfile(data)),
          logout: () => dispatch(logout()),
          authorizeToken: () => dispatch(authorizeToken()),
      };
    } else {
      throw Error('Error accessing auth reducer.');
    }
  }