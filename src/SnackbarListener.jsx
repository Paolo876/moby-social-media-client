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
            if(!location.pathname.includes("/messages")) enqueueSnackbar(snackbarData, { key: snackbarData.id})
            clearSnackbar()
        }
    }, [snackbarData])

    //   return
}

export default SnackbarListener