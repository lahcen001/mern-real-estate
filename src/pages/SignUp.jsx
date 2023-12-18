import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js'
import OAuth from '../components/OAuth.jsx'

function SignUp() {
  const [form , setForm] = useState({})
  const {error , loader}= useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch  = useDispatch()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
   e.preventDefault()
  // setLoader(true)
  dispatch(signInStart())
    const res= await fetch('http://localhost:3000/api/auth/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(form)
    })

    const data = await res.json()

    try {
if(data.success=== false){

// setError(data.message)
  //setLoader(false)
 
  dispatch(signInSuccess(data.message))
 return 

}
setLoader(false)
setError('')

navigate('/signin')

}catch {

  setForm({})

  //setError('')
  //setLoader(false)
  dispatch(signInFailure(data.message))

}

  }





  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
     <form  onSubmit={handleSubmit}   type='text' placeholder='username' className='flex flex-col gap-4'>

     <input type='text' onChange={handleChange} placeholder='username'
       className='border p-3 rounded-lg' id='username'
       />

        <input type='text' onChange={handleChange} placeholder='email'
       className='border p-3 rounded-lg' id='email'
       />
       
       <input type='password' onChange={handleChange} placeholder='password'
       className='border p-3 rounded-lg' id='password'
       />

<button disabled={loader} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loader ? 'Loading...' : 'Sign Up'}</button>
<OAuth/>
     </form>
<div className='flex gap-2 mt-5'>
<p>Already have an account?</p>
<Link to='/signin'>
  <span className='text-blue-700'>Sign In</span>
</Link>
</div>

<div className='text-red-500'>{error ? error : ''}</div>

    </div>
  )
}

export default SignUp
