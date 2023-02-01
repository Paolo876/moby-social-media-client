import React from 'react'
import { Routes, Route } from 'react-router-dom'


const MessagesFeed = () => {
  return (
    <Routes>
      <Route path="/:id" element={<MessagesList/>}/>
      <Route path="/new/:id" element={<>new</>}/>
    </Routes>
  )
}

const MessagesList = () => {

  return (
    <div>list of messages</div>
  )
}
export default MessagesFeed