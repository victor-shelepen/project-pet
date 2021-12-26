import React, { useEffect, useState, useCallback } from 'react';
import { Grid } from '@mui/material'
import UserFrame from '../components/User/Frame'
import UserList from '../components/User/List'

import { get } from '../lib'

export default function () {
  const [users, setUsers] = useState([])

  useEffect(async () => {
    const { users: _users } = await get('/api/users')
    setUsers(_users)
  }, [])

  const _changed = useCallback((_user) => {
    const index = users.findIndex(u => _user._id == u._id)
    users[index] = _user
    const _users = [...users]
    setUsers(_users)
  })

  const _deleted  = useCallback((_user) => {
    const index = users.findIndex(u => _user._id == u._id)
    users.splice(index, 1)
    const _users = [...users]
    setUsers(_users)
  })

  return (
    <>
      <h1>Users</h1>
      <Grid container>
        <Grid item xs={4}>
          <UserList users={users}/>
        </Grid>
        <Grid item xs={8}>
          {users.map(u => (
            <UserFrame key={u._id} user={u} changed={_changed} deleted={_deleted}>
              Hello
            </UserFrame>
          ))}
        </Grid>
      </Grid>
    </>
  )
}