import React from 'react'
import { SnackbarContent } from 'notistack'

const SnackbarComponent = React.forwardRef((props, ref) => {
    const {
      // You have access to notistack props and options 👇🏼
      id,
      message,
      // as well as your own custom props 👇🏼
      allowDownload,
      ...other
    } = props
  
    console.log(message)
    return (
      <SnackbarContent ref={ref} {...other}>
        {/* {message} */}
        hello
      </SnackbarContent>
    )
  })

SnackbarComponent.displayName = "SnackbarComponent"

export default SnackbarComponent