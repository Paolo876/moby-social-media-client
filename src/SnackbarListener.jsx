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
            if(!location.pathname.includes("/messages") || !snackbarData.type === "message") enqueueSnackbar(snackbarData, { persist:true, preventDuplicate: true }) 
            clearSnackbar()
        }
    }, [snackbarData])

    //   return
}

export default SnackbarListener