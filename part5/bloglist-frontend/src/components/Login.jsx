const Login = ({ username, onClick }) => (
  <div>
    {username} logged in
    <button type='submit' onClick={onClick}>logout</button>
  </div>
)

export default Login