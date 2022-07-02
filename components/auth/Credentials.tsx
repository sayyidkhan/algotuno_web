import { TextField } from '@mui/material'
import React, { useState } from 'react'
import BtnLogin from './BtnLogin'

const Credential = ({providers, csrfToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <BtnLogin 
      provider={providers.credentials}
      bgColor='gray'
      csrfToken={csrfToken}
      options={{redirect: false, username: username, password}}
    >
      <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
      />
      <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="password"
              name="password"
              autoComplete="password"
              type="password"
              autoFocus
              value={password}
              onChange={e => setPassword(e.target.value)}
      />
    </BtnLogin>
  )
}

export default Credential;