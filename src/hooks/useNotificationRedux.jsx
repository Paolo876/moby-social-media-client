import { useSelector, useDispatch } from 'react-redux';
import { notificationActions } from '../redux/reducers/notificationSlice';
import { getNotifications, markAsRead, deleteAllNotifications, readAllNotifications, deleteById } from '../redux/reducers/notificationReducer';

export default function useNotificationRedux() {
    const dispatch = useDispatch();
    const notificationRedux = useSelector(state => state.notification)
    if(notificationRedux) {
      return {
        ...notificationRedux,
        triggerSnackbar: (data) => dispatch(notificationActions.triggerSnackbar(data)),
        clearSnackbar: () => dispatch(notificationActions.clearSnackbar()),
        addNotification: (data) => dispatch(notificationActions.addNotification(data)),
        markAsReadByReferenceId: (data) => dispatch(notificationActions.markAsReadByReferenceId(data)),
        getNotifications: () => dispatch(getNotifications()),
        markAsRead: (data) => dispatch(markAsRead(data)),
        deleteAllNotifications: (data) => dispatch(deleteAllNotifications(data)),
        readAllNotifications: (data) => dispatch(readAllNotifications(data)),
        deleteById: (data) => dispatch(deleteById(data)),
      };
    } else {
      throw Error('Error accessing auth reducer.');
    }
  }