import { useEffect} from 'react'
import useNotificationRedux from './hooks/useNotificationRedux'
import useChatRedux from './hooks/useChatRedux';
import { useSnackbar } from 'notistack';


const SnackbarListener = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { snackbarData, clearSnackbar } = useNotificationRedux();
    const { currentChatRoomId } = useChatRedux();

    useEffect(() => {
        if(snackbarData){
            if(snackbarData.type === "message"){
                if(currentChatRoomId !== parseInt(snackbarData.ChatRoomId)) enqueueSnackbar(snackbarData.messageData.message)

            }
            // console.log(currentChatRoomId, snackbarData)
            clearSnackbar()
        }
    }, [snackbarData])

    //   return
}

export default SnackbarListener