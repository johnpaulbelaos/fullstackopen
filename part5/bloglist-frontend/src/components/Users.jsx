import { Link } from 'react-router-dom'

import styled from 'styled-components'

const StyledLink = styled(Link)`
  &:visited {
    color: #393E46;
  }
`

const Users = ({ users }) => {
  if (!users) {
    return null
  }

  return (
    <div>
      <h2>
        Users
      </h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              blogs created
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users