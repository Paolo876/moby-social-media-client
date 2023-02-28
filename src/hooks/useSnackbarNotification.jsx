import { useState, useEffect} from "react"
import { useSnackbar } from "notistack";
import useChatRedux from "./useChatRedux";
import { Typography, Paper } from "@mui/material";
import SnackbarComponent from "../components/SnackbarComponent";

const useSnackbarNotification = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { currentChatRoomId } = useChatRedux();
  const [ currentRoomId, setCurrentRoomId ] = useState(11)

  useEffect(() => {
    setCurrentRoomId(currentChatRoomId)
  }, [currentChatRoomId])


  const snackbarMessage = (message) => {
    console.log(currentRoomId, currentChatRoomId, message.ChatRoomId)
    // enqueueSnackbar(message)
  }

  // console.log(currentRoomId)
  return { snackbarMessage }
}

export default useSnackbarNotification