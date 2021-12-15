import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core'
import { get } from '../lib'

export default function() {
  const [users, setUsers] = useState([])

  useEffect(async () => {
    console.log('API call users...');
    const {users: _users} = await get('/api/users')
    setUsers(_users)
  }, [])

  return (
    <>
      <h1>Users</h1>
      <Paper>
        <List>
          {users.map(u => (
            <ListItem key={u._id}>
              <ListItemText>{u.email}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  )
}