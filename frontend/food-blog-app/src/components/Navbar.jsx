import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputForm from './inputForm'
import {useNavigate, NavLink } from 'react-router-dom'

export default function Navbar() {
 const [isOpen,setIsOpen]= useState(false)                    //this state is for displaying or hiding dialog box also if this box hide or display component rerender and useEffect work (in Login) while in logout part this wont work so give explicitly
 let token=localStorage.getItem("token")            //authenticate user with token and can access routes if login
 const [isLogin,setIsLogin]= useState(false)              //assigning initial value to isLogin variable or do like useState(token ? true : false) 
 let user=JSON.parse(localStorage.getItem("user"))

 const navigate = useNavigate();

useEffect(()=> {
  setIsLogin(token ? true: false)                              //whenever token value changes useEffect called as token set as dependency and set isLogin variable value
},[token])

 const checkLogin=()=>{
  if(token){                                                    //if user is logged in means he has token and logout button is shown to him and if he click on logout this if block execute and if token is not there login button shown and else block execute
    localStorage.removeItem("token")                //remove the token and user from localStorage that we set in inputForm.jsx using setItem
    localStorage.removeItem("user")                
    setIsLogin(false)                                 //token will remove from localStorage but as no state change so no rerender so use effect wont work so change the state manually
    navigate("/")                                           //if user logOut then redirect to home screen
  }
  else{
    setIsOpen(true)                                     //if user logout means no token so open dialogue box when checkLogin triggers
  }
 }
  return (
    <>
        <header>
            <h2>Food Blog</h2>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li onClick={()=> !isLogin && setIsOpen(true)}><NavLink to={isLogin ? "/myRecipe": "/"}>My Recipe</NavLink></li>           {/*ref app.jsx for browser Router */}
                <li onClick={()=> !isLogin && setIsOpen(true)}><NavLink to={isLogin ? "/favRecipe": "/"}>Favorites</NavLink></li>
                <li onClick={checkLogin}>{(isLogin) ? "Logout": "Login"} {user?.email ? `(${user?.email})` : ""}</li>         {/*if user is logged in show him logout option and vice-versa*/}
            </ul>
        </header>

        {(isOpen) && <Modal onClose={()=> setIsOpen(false)}>     {/*Modal is used to open dialog box when not login */}
          <InputForm setIsOpen={()=>setIsOpen(false)}/>      {/*passing a callback function as prop to input form*/}  {/*setting InputForm as a child to Model component */}
        </Modal>}          {/*if isOpen true then render Model component also we are sending onClose fn as a prop to Model*/}
    </>
  )
}