import React, { useEffect, useState } from 'react';
import { Paper, Grid } from '@material-ui/core'
import UserFrame from '../components/User/Frame'
import UserList from '../components/User/List'

import { get } from '../lib'

export default function () {
  const [users, setUsers] = useState([])

  useEffect(async () => {
    console.log('API call users...');
    const { users: _users } = await get('/api/users')
    setUsers(_users)
  }, [])

  return (
    <>
      <h1>Users</h1>
      <Grid container>
        <Grid item xs={4}>
          <UserList users={users}/>
        </Grid>
        <Grid item xs={8}>
          {users.map(u => (
            <UserFrame key={u._id} user={u}>
              Hello
            </UserFrame>
          ))}
        </Grid>
      </Grid>
    </>
  )
}