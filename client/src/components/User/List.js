import React from "react";
import { List, ListItem, ListItemText } from '@mui/material'

export default function ({ users }) {

  return (
    <List>
      {users.map(user => (
        <ListItem key={user._id}>
          <ListItemText>{user.name} - {(new Date).valueOf()}</ListItemText>
        </ListItem>
      ))}
    </List>
  )
}
