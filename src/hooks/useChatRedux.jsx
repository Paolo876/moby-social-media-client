import { useSelector, useDispatch } from 'react-redux';
import { chatActions } from '../redux/reducers/chatSlice';
import { getChatRooms, receiveMessage, getMessagesById } from '../redux/reducers/chatReducers';

const useChatRedux = () => {
  const dispatch = useDispatch();
  const chatRedux = useSelector(state => state.chat)
  if(chatRedux) {
    return {
        ...chatRedux,
        getChatRooms: () => dispatch(getChatRooms()),
        getMessagesById: (data) => dispatch(getMessagesById(data)),
        // sendMessage: (data) => dispatch(sendMessage(data)),
        setNewChatUser: (data) => dispatch(chatActions.setNewChatUser(data)),
        addNewChatRoom: (data) => dispatch(chatActions.addNewChatRoom(data)),
        updateOnMessageSent: (data) => dispatch(chatActions.updateOnMessageSent(data)),
        // setLastMessageAsRead: (data) => dispatch(chatActions.setLastMessageAsRead(data)),
        clearNewChatUser: () => dispatch(chatActions.clearNewChatUser()),
        receiveMessage: (data) => dispatch(receiveMessage(data)),
    };
  } else {
    throw Error('Error accessing chat reducer.');
  }
}

export default useChatRedux