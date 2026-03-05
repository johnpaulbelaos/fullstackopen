import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../reducers/userReducer"

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  return (
    <div>
      {user.username} logged in
      <button type='submit' onClick={ () => dispatch(logoutUser()) }>logout</button>
    </div>
  )
}

export default Login