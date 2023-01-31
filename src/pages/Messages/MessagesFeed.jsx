import React from 'react'
import { useParams } from 'react-router-dom'
const MessagesFeed = () => {
  const params = useParams()["*"];
  console.log(params)
  return (
    <div>MessagesFeed</div>
  )
}

export default MessagesFeed