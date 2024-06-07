import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Login() {
  const [users, setUsers] = useLocalStorage('users')
  const [loggedin, setLoggedIn] = useLocalStorage('loggedin')

  const handleLogin = e => {
    e.preventDefault()

    const form = e.target.elements
    const email = form['email'].value
    const password = form['password'].value

    const ls_users = users.filter(user => (user.email == email && user.password == password))

    if(ls_users.length) {
      setLoggedIn(ls_users[0])
      window.location.href = 'http://localhost:3000/dashboard'
    } else {
      alert('Invalid credentials or/and user does not exist')
    }
  }

  return (
    <Container className='my-5'>
      <div className="card w-50 p-4 mx-auto">
        <h4 className='mb-4'>Login</h4>
        <form method="POST" onSubmit={handleLogin}>
          <input type='email' name='email' className='form-control mb-3' placeholder='Email' required />
          <input type='password' name='password' className='form-control mb-3' placeholder='Password' required minLength={8} />
          <button type="submit" className='btn btn-outline-primary'>Login</button>
          <Link to="/register" className='ms-2 btn btn-outline-link'>Register</Link>
        </form>
      </div>
    </Container>
  )
}

export default Login