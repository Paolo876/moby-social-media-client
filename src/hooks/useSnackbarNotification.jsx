import { useSnackbar } from "notistack";
import { Typography, Paper } from "@mui/material";
import SnackbarComponent from "../components/SnackbarComponent";
const useSnackbarNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const snackbarMessage = (data) => {
    enqueueSnackbar(data)
  }
  return { snackbarMessage }
}

export default useSnackbarNotification