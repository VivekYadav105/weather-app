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

    const handleSubmit = (e)=>{
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log("inside handle submit")
        console.log(email,password)
        if(email&&password){
            setLoginData((i)=>({...i,username:email,password:password}))
        }
    }

    const postLoginData = async ()=>{
        try{
            console.log("inside post request")
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
                toast.info("something went wrong try again",{
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
        console.log(loginData)
        if(loginData.username&&loginData.password)postLoginData()
    },[loginData])

    // useEffect(()=>{
    //     if(user){
    //         console.log(user)
    //         window.location.href='/day'
    //     }
    // },[])

    useEffect(()=>{
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(email&&password){
            setLoginData((i)=>({...i,username:email,password:password}))
        }
    },[emailRef,passwordRef])

    return(
        <div className="login-wrapper" style={{transform:`translateX(-${page*350}px)`}}>  
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