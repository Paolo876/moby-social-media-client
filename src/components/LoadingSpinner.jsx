import React from 'react'
import "./LoadingSpinner.scss"

const LoadingSpinner = ({message}) => {
  return (
    <div className='loading-spinner-container'>
        <div className="spinner">
            <div className="spinner-item"></div>
            <div className="spinner-item"></div>
            <div className="spinner-item"></div>
            <div className="message">{message}</div>
        </div>
    </div>

  )
}

export default LoadingSpinner