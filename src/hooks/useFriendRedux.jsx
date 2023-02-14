import { useSelector, useDispatch } from 'react-redux';
import { friendActions } from '../redux/reducers/friendSlice';
import { getFriends, sendRequest, confirmRequest, unfriend } from '../redux/reducers/friendReducers';

const useFriendRedux = () => {
  const dispatch = useDispatch();
  const friendRedux = useSelector(state => state.friends)
  if(friendRedux) {
    return {
        ...friendRedux,
        getFriends: () => dispatch(getFriends()),
        sendRequest: (data) => dispatch(sendRequest(data)),
        confirmRequest: (data) => dispatch(confirmRequest(data)),
        unfriend: (data) => dispatch(unfriend(data)),
    };
  } else {
    throw Error('Error accessing friend reducer.');
  }
}

export default useFriendRedux