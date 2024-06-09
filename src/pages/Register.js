import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react'
import { Container } from 'react-bootstrap'
import { Link, redirect } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

function Register() {
  const [users, setUsers] = useLocalStorage('users')

  const handleRegister = e => {
    e.preventDefault()

    const form = e.target.elements

    let user = {
      id: uuidv4(),
      fullname: form['fullname'].value,
      email: form['email'].value,
      password: form['password'].value
    }

    if(users != undefined) {
      setUsers([...users, user])
    } else {
      setUsers([user])
    }

    window.location.href = '/login'
  }

  return (
    <Container className='my-5'>
      <div className="card w-50 p-4 mx-auto">
        <h4 className='mb-4'>Register</h4>
        <form method="POST" onSubmit={handleRegister}>
          <input type='text' name='fullname' className='form-control mb-3' placeholder='Fullname' required />
          <input type='email' name='email' className='form-control mb-3' placeholder='Email' required />
          <input type='password' name='password' className='form-control mb-3' placeholder='Password' required minLength={8} />
          <button type="submit" className='btn btn-outline-primary'>Register</button>
          <Link to="/login" className='ms-2 btn btn-outline-link'>Login</Link>
        </form>
      </div>
    </Container>
  )
}

export default Register
