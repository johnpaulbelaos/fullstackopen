import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { logoutUser } from "../reducers/userReducer"

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const padding = {
    paddingRight: 5,
  }

  const menuStyle ={
    backgroundColor: 'gainsboro'
  }

  return (
    <div style={menuStyle}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <span style={padding}>{user.name} logged in</span>
      <button type='submit' onClick={ () => dispatch(logoutUser()) }>logout</button>
    </div>
  )
}

export default Login