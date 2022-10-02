import React, { useEffect, useRef } from 'react'
import InputBar from '../main/inputbar'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { UserContext } from '../../context'


function Login(props){
    const {page,setPage} = props

    const [loginData,setLoginData] = useState({username:null,password:null})
    const {user,setUser} = React.useContext(UserContext)

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    useEffect(()=>{
        console.log(emailRef.current.value)
    },[emailRef])

    const handleSubmit = (e)=>{
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email,password)
        if(email&&password){
            setLoginData((i)=>({...i,username:email,password:password}))
        }
    }

    const postLoginData = async ()=>{
        try{
            const response = await axios.post('http://localhost:5000/user/login',loginData)
            console.log(response.status)
            const {data} = response;
            if(data.status==200||data.status==201||data.status==202){
                toast.success("user is succesfully logged in",{
                    position:'top-center',
                    autoClose:true,
                    closeOnClick:true,
                    hideProgressBar:false,
                    pauseOnFocusLoss:false
                })
                console.log(data.user)
                setUser(data.user)
                setTimeout(() => {
                    window.location.href="/"
                }, 1000);
            }
            else if(data.status===400||data.status===404){
                toast.warn(data.message,{position:'top-center',
                        autoClose:true,
                        closeOnClick:true,
                        hideProgressBar:false,
                        pauseOnFocusLoss:false})
            }
            else{
                toast.info(data.message,{
                    position:'top-center',
                    autoClose:true,
                    closeOnClick:true,
                    hideProgressBar:false,
                    pauseOnFocusLoss:false
                })
            }
        }
        catch(err){
            toast.error(err.message||"something went wrong try again\nserver busy",
                {position:'top-center',
                autoClose:true,
                closeOnClick:true,
                hideProgressBar:false,
                pauseOnFocusLoss:false
            })
        }
    }

    useEffect(()=>{
        loginData.username&&postLoginData()
    },[loginData])

    return(
        <div className="login-wrapper" style={{transform:`translateX(-${page*355}px)`}}>  
            <form className='login' onSubmit={handleSubmit}>
                <div className='auth-header'>
                <div className="logo">
                    <img src="/images/logo.png" alt="logo" />
                </div>
                <div className="logo-text-wrapper">
                    <h1>Login</h1>
                </div>
                </div>
                <InputBar label={{name:"Username"}} input={{id:'username',type:'email',placeholder:" ",ref:emailRef,required:true}}/>
                <InputBar label={{name:"password"}} input={{id:'password',type:'password',placeholder:" ",minLength:6,ref:passwordRef,required:true}}/>
                <div className='buttons'>
                    <button className='auth-button' type='submit'>Login</button>
                    <button className='auth-button' type='button' onClick={()=>{setPage(1)}}>Signup</button>
                </div>
            </form>
        </div>
    )
}

export default Login