import { useSelector, useDispatch } from 'react-redux';
import { chatActions } from '../redux/reducers/chatSlice';
import { getChatRooms } from '../redux/reducers/chatReducers';

const useChatRedux = () => {
  const dispatch = useDispatch();
  const chatRedux = useSelector(state => state.chat)
  if(chatRedux) {
    return {
        ...chatRedux,
        getChatRooms: () => dispatch(getChatRooms()),
        setNewChatUser: (data) => dispatch(chatActions.setNewChatUser(data)),
        addNewChatRoom: (data) => dispatch(chatActions.addNewChatRoom(data)),
        updateOnMessageSent: (data) => dispatch(chatActions.updateOnMessageSent(data)),
        clearNewChatUser: () => dispatch(chatActions.clearNewChatUser()),
    };
  } else {
    throw Error('Error accessing chat reducer.');
  }
}

export default useChatRedux