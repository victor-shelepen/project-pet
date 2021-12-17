import React from "react";
import { List, ListItem, ListItemText } from '@material-ui/core'

export default function ({ users }) {

  return (
    <List>
      {users.map(user => (
        <ListItem key={user._id}>
          <ListItemText>{user.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  )
}
