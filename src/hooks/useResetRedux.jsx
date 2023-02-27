import { useDispatch } from 'react-redux';
import { friendActions } from '../redux/reducers/friendSlice';
import { authActions } from '../redux/reducers/authSlice';
import { chatActions } from '../redux/reducers/chatSlice';
import { postsActions } from '../redux/reducers/postsSlice';
const useResetRedux = () => {
  const dispatch = useDispatch();

  const resetAllStates = () => {
    dispatch(friendActions.reset())
    dispatch(authActions.reset())
    dispatch(chatActions.reset())
    dispatch(postsActions.reset())
  }

  return { resetAllStates }
}

export default useResetRedux