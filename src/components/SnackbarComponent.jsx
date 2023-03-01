import React from 'react'
import { SnackbarContent } from 'notistack'

const SnackbarComponent = React.forwardRef((props, ref) => {
    const {
      // You have access to notistack props and options 👇🏼
      id,
      content,
      ...other
    } = props
  
    console.log(ref)
    return (
      <SnackbarContent ref={ref} {...other}>
      </SnackbarContent>
    )
  })

SnackbarComponent.displayName = "SnackbarComponent"

export default SnackbarComponent