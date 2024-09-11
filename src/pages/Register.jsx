import React, { useState } from 'react'
import { Link ,Navigate} from 'react-router-dom'
import axios from 'axios';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[redirect,setRedirect]=useState(false);

    async function registerUser(e){
        e.preventDefault();
        try{
          const user= await axios.post("/register",{
                name,
                email,
                password
            });
            setRedirect(true);
        }catch(err){
            alert("Registration failed. Try again!");
            console.log(err);
        }
            

        
    }

    if(redirect){
        return <Navigate to='/' />
    }
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-32'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form  className='max-w-md mx-auto ' onSubmit={registerUser}>
                    <input
                        type='text'
                        placeholder='John Doe'
                        value={name}
                        onChange={e=> setName(e.target.value)}

                    />

                    <input
                        type='email'
                        placeholder='your@email.com' 
                        value={email}
                        onChange={e=> setEmail(e.target.value)}

                        />
                    <input
                        type='password'
                        placeholder='password' 
                        value={password}
                        onChange={e=> setPassword(e.target.value)}

                        />
                    <button className='primary' >Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already a member? <Link className='underline text-black' to='/login' >Login</Link>
                    </div>
                </form>
            </div>

        </div>
    )

}

export default Register
