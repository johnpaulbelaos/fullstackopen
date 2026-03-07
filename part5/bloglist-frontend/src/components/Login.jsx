import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { logoutUser } from "../reducers/userReducer"

import styled from "styled-components"
import Button from './Button'

const Navigation = styled.div`
  color: #EEEEEE;
  background: #393E46;
  padding: 1em;
`

const StyledLink = styled(Link)`
  padding-right: 5px;
  &:visited {
    color: #EEEEEE;
  }
`

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  return (
    <Navigation>
      <StyledLink to="/">blogs</StyledLink>
      <StyledLink to="/users">users</StyledLink>
      <span style={{paddingRight: 5}}>{user.name} logged in</span>
      <Button type='submit' onClick={ () => dispatch(logoutUser()) }>logout</Button>
    </Navigation>
  )
}

export default Login