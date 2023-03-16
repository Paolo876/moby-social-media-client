import { useState } from 'react'
import useNotificationRedux from "../../hooks/useNotificationRedux"
import { List, ListItem, Box, Typography } from '@mui/material'
import LoadingSpinner from '../../components/LoadingSpinner'
import FilterMenuButton from './FilterMenuButton'
import NotificationItem from './NotificationItem'

const NotificationsList = () => {
  const { notifications, isLoading } = useNotificationRedux();
  const [ filter, setFilter ] = useState("all")

  const filteredNotifications = notifications.filter(item => {
    if(filter === "unread" && !item.isRead) return item
    if(filter === "all") return item
  })


  return (
    <>
      {notifications.length !== 0 && <FilterMenuButton filter={filter} setFilter={setFilter}/>}
      <List>
        {isLoading && <ListItem><Box mx="auto"><LoadingSpinner isModal={false} style={{minHeight: "0em", height: "1em", backgroundColor: "initial", transform: "scale(.3)", opacity: .5}}/></Box></ListItem>}
        {notifications.length === 0 && <ListItem><Typography align="center" fontWeight={300} fontSize={15} p={1} fontStyle="italic" sx={{width: "100%"}}>You have no notifications.</Typography></ListItem>}
        {filteredNotifications.map(item => <NotificationItem key={item.id} item={item}/>)}
      </List>
    </>
  )
}

export default NotificationsList