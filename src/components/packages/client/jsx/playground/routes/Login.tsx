import { user } from '../user'

const Login: JSX.Component = () => {
  let name = ''

  function login() {
    user.current = {
      name,
    }
  }

  return (
    <component>
      <input
        type="text"
        onChange={(e) => (name = (e.currentTarget as HTMLInputElement).value)}
      />
      <button onClick={login}>Log in</button>
    </component>
  )
}

export default Login
