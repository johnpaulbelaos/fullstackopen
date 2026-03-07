import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


import { loadUser, loginUser } from "../reducers/userReducer"

import Button from "./Button"

const LoginForm = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  const handleLogin = async event => {
    event.preventDefault()
    
    dispatch(loginUser(username, password))
    if (user) {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <Button type="submit">login</Button>
    </form>
  )
}

export default LoginForm