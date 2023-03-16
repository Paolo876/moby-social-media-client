import { useState } from 'react'
import useNotificationRedux from "../../hooks/useNotificationRedux"
import { List } from '@mui/material'
import FilterMenuButton from './FilterMenuButton'
import NotificationItem from './NotificationItem'


const NotificationsList = () => {
  const { notifications } = useNotificationRedux();
  const [ filter, setFilter ] = useState("all")

  const filteredNotifications = notifications.filter(item => {
    if(filter === "unread" && !item.isRead) return item
    if(filter === "all") return item
  })

  
  return (
    <>
      <FilterMenuButton filter={filter} setFilter={setFilter}/>
      <List>
        {filteredNotifications.map(item => <NotificationItem key={item.id} item={item}/>)}
      </List>
    </>
  )
}

export default NotificationsList