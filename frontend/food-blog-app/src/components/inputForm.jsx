import React, { useState } from 'react'
import axios from 'axios'

export default function InputForm({setIsOpen}) {           //this callback fn it get from navbar
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const [isSignUp,setIsSignUp]=useState(false) 
   const [error,setError]=useState("")

  const handleOnSubmit=async(e)=>{
    e.preventDefault()
    let endpoint=(isSignUp) ? "signUp" : "login"                //set endpoint according to user action tracked by isSignUp state
    await axios.post(` https://food-recipe-app-9aeddc513b74.herokuapp.com/${endpoint}`,{email,password})            //send email,password given by user from setState to backend that backend will track using req.body
    .then((res)=>{
        localStorage.setItem("token",res.data.token)                                        //check localStorage in inspect>application>storage>localStorage>http:localhost:5173
        localStorage.setItem("user",JSON.stringify(res.data.user))           //user and token we give in backend signUp and login route
        setIsOpen()                                                       //after successful submission, call the setIsOpen function and it will automatically close the dialog box or popup as falsy value see in navbar line 37
    })
    .catch(err=>setError(err.response?.data?.error))                  //.catch(err => setError(err.response.data.error)) without optional chaining wont work well 
    //  .catch(data=>setError(data.response?.data?.error))
  }

  return (
    <>
        <form className='form' onSubmit={handleOnSubmit}>
            <div className='form-control'>
                <label>Email</label>
                <input 
                type="email" 
                className='input' 
                onChange={(e)=>setEmail(e.target.value)} 
                value={email}
                required
                />
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input 
                type="password" 
                className='input' 
                onChange={(e)=>setPassword(e.target.value)} 
                value={password}
                required
                />
            </div>
            <button type='submit'> {(isSignUp) ? "Sign Up": "Login"} </button> <br/>
               {(error!="") && <h6 className="error">{error}</h6>} <br/>

         <p onClick={()=>setIsSignUp(pre=>!pre)}> {(isSignUp) ? "Already have an account":"Create new account"}</p>       {/*initially isSignUp false so create account show and once we click on it already have an account show */}
        </form>           {/*pre will take its previous value and then change it to another if we hardcode and put true here then only on time it change */}
    </>
  )
}