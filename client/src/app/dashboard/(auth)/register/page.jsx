"use client"
import axios from 'axios';
import Error from 'next/error';
import React, {useState} from 'react'


const Register =  () => {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const [message , setMessage ] = useState(null);
  const handleClick = async (event) => {
    event.preventDefault();
    try {
     const res = await axios.post("http://localhost:9000/api/auth/register",{username , email, password})
     if(res.status == 200) {
      setMessage("asd")
     }
    }catch(err) {
      throw new Error(err)
    }

  }
  return (
      <div>
      <form className='form' action="">
        <input type="text" placeholder="Username" value={username} required onChange={e => (setUsername(e.target.value))}/>
        <input type="text" placeholder="Email" value={email} required  onChange={e => (setEmail(e.target.value))}/>
        <input type="password" placeholder="Password" required value={password} onChange={e => (setPassword(e.target.value))}/>
        <button onClick={handleClick}>Dang ky</button>
        {message && <div>{message}</div>}
      </form>
    </div>
  )
}

export default Register
