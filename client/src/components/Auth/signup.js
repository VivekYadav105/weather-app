import React,{useRef,useEffect} from 'react'
import {Navigate} from 'react-router'
import InputBar from '../main/inputbar'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
function Signup(props){
    const {page,setPage} = props
    const [signUpData,setSignUpData] = useState({username:'',password:''})

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value
        if(password!=confirmPassword){
            toast.error("passwords doesn't match",{
                position:'top-center',
                autoClose:4000,
                hideProgressBar:false,
                pauseOnFocusLoss:false
            })
            return
        }
        if(email&&password){
            setSignUpData((i)=>({...i,username:emailRef.current.value,password:passwordRef.current.value}))
        }
    }

    const postSignUpData = async ()=>{
        const response = await axios.post('http://localhost:5000/user/signup',signUpData)
        console.log(response)
        if(response.data.status==200||response.data.status==201||response.data.status==202){
            toast.success("User created successfully",{position:"top-center",autoClose:4000,hideProgressBar:false,pauseOnFocusLoss:false})
            setTimeout(()=>{
                <Navigate to="/verify"></Navigate>
            },1000)
        }
        else{
            toast.warn(response.data.message,{position:"top-center",autoClose:4000,hideProgressBar:false,pauseOnFocusLoss:false})
        }
    }

    useEffect(()=>{
        signUpData&&postSignUpData()
    },[signUpData])

    return(
        <div className="signup-wrapper" style={{transform:`translateX(-${page*350}px)`}}>
            <form className='signup' onSubmit = {handleSubmit}>
            <div className='auth-header'>
                <div className="logo">
                    <img src="/images/logo.png" alt="logo" />
                </div>
                <div className="logo-text-wrapper">
                    <h1>Signup</h1>
                </div>
                </div>
                <InputBar label={{name:"email"}} input={{id:'email',type:'email',placeholder:" ",ref:emailRef,required:true}}/>
                <InputBar label={{name:"password"}} input={{id:'password',type:'password',placeholder:" ",minLength:6,ref:passwordRef,required:true}}/>
                <InputBar label={{name:"confirm-password"}} input={{id:'confirm-password',type:'password',placeholder:" ",minLength:6,ref:confirmPasswordRef,required:true}}/>
                <div className='buttons'>
                    <button className='auth-button'>Signup</button>
                    <button className='auth-button' type='button' onClick={()=>{props.setPage(0)}}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Signup