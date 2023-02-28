import { useSelector, useDispatch } from 'react-redux';
import { notificationActions } from '../redux/reducers/notificationSlice';
import { } from '../redux/reducers/notificationReducer';

export default function useAuthRedux() {
    const dispatch = useDispatch();
    const authRedux = useSelector(state => state.auth)
    if(authRedux) {
      return {
        ...authRedux,
        updateUserDataImage: (data) => dispatch(authActions.updateUserDataImage(data)),
        updateUserData: (data) => dispatch(authActions.updateUserData(data)),
        login: data => dispatch(login(data)),
        signup: data => dispatch(signup(data)),
        profileSetup: data => dispatch(profileSetup(data)),
        logout: () => dispatch(logout()),
        authorizeToken: () => dispatch(authorizeToken()),
        updateStatus: data => dispatch(updateStatus(data)),
      };
    } else {
      throw Error('Error accessing auth reducer.');
    }
  }