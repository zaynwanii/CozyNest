import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', {
        username: email,
        password
      });
      
      // console.log(data.user);
      setUser(data.user);

      setRedirect(true);


    } catch (err) {
      console.log(err);

    }
  }

  if (redirect) {
    return <Navigate to='/' />
  }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-32'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto ' onSubmit={handleSubmit}>

          <input
            type='email'
            value={email}
            placeholder='your@email.com'
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='password'
          />
          <button className='primary' >Login</button>

          <div className='text-center py-2 text-gray-500'>
            Don't have an account yet? <Link className='underline text-black' to='/register' >Register now</Link>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login
