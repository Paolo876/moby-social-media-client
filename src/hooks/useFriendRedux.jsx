import { useSelector, useDispatch } from 'react-redux';
import { friendActions } from '../redux/reducers/friendSlice';
import { getFriends } from '../redux/reducers/friendReducers';

const useFriendRedux = () => {
  const dispatch = useDispatch();
  const friendRedux = useSelector(state => state.friends)
  if(friendRedux) {
    return {
        ...friendRedux,
        getFriends: () => dispatch(getFriends()),
    };
  } else {
    throw Error('Error accessing chat reducer.');
  }
}

export default useFriendRedux