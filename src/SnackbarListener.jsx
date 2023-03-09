import { useEffect} from 'react'
import useNotificationRedux from './hooks/useNotificationRedux'
import { useSnackbar } from 'notistack';
import { useLocation } from "react-router-dom"

const SnackbarListener = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { snackbarData, clearSnackbar } = useNotificationRedux();
    const location = useLocation();


    useEffect(() => {
        if(snackbarData){
            // don't emit message snackbars if user is in messages page
            // don't emit unliked post
            if(
                (snackbarData.type === "message" && !location.pathname.includes("/messages")) ||
                (snackbarData.type === "like" && snackbarData.isLiked && !location.pathname.includes(`/posts/${snackbarData.postId}`)) ||
                (snackbarData.type === "post" && !location.pathname.includes(`/posts/${snackbarData.postId}`))
            ) enqueueSnackbar(snackbarData, { preventDuplicate: true })
            clearSnackbar()
        }
    }, [snackbarData])

    //   return
}

export default SnackbarListener