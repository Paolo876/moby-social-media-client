import { useSelector, useDispatch } from 'react-redux';
import { notificationActions } from '../redux/reducers/notificationSlice';
import { getNotifications } from '../redux/reducers/notificationReducer';

export default function useNotificationRedux() {
    const dispatch = useDispatch();
    const notificationRedux = useSelector(state => state.notification)
    if(notificationRedux) {
      return {
        ...notificationRedux,
        triggerSnackbar: (data) => dispatch(notificationActions.triggerSnackbar(data)),
        clearSnackbar: () => dispatch(notificationActions.clearSnackbar()),
        addNotification: (data) => dispatch(notificationActions.addNotification(data)),
        getNotifications: () => dispatch(getNotifications()),
      };
    } else {
      throw Error('Error accessing auth reducer.');
    }
  }