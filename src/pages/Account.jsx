import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';


import Places from './Places';
import AccountNavbar from '../components/AccountNavbar';

function Account() {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) subpage = 'profile';

  if (!ready) {
    return <h1>Loading...</h1>
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  if (ready && !user) {
    return <Navigate to='/login' />
  }

  async function handleClick() {
    const { data } = await axios.post('/logout');
    if (data) {
      setRedirect('/');
      setUser(null);
    }
  }




  return (
    <div>
     
    <AccountNavbar />
      {subpage == 'profile' && user && (
        <div className='text-center max-w-lg mx-auto'>
          <h1><span className='text-lg font-medium'>Email:</span> {user.email}</h1>
          <h1><span className='text-lg font-medium'>Username:</span>{user.name}</h1><br />
          <button onClick={handleClick} className='primary max-w-sm mt-2'>Log out</button>
        </div>)}

      {subpage == 'places' && (
        <Places />
      )
      }
    </div>

  )
}

export default Account;
