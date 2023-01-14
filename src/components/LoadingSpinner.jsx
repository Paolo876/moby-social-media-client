import React from 'react'
import "./LoadingSpinner.scss"
import { Modal } from '@mui/material'
const LoadingSpinner = ({message, isModal=false}) => {
  return (
    <>
      {isModal ? 
      <Modal open={true} hideBackdrop>
          <div className='loading-spinner-container modal'>
            <div className="spinner">
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
                <div className="message">{message}</div>
            </div>
        </div>
      </Modal>
      :
      <div className='loading-spinner-container'>
        <div className="spinner">
            <div className="spinner-item"></div>
            <div className="spinner-item"></div>
            <div className="spinner-item"></div>
            <div className="message">{message}</div>
        </div>
    </div>
      }
    </>


  )
}

export default LoadingSpinner