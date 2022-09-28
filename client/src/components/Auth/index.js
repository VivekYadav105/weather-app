import Login from './login'
import Signup from './signup'
import './auth.css'
import React,{ useState } from 'react'

function Auth(){
    const [page,setPage] = useState(0)
    return(
        <div className='auth-wrapper'>
            <div className='auth-box'>
                <Login page={page} setPage={setPage}></Login>
                <Signup page={page} setPage={setPage}></Signup>
            </div>
        </div>
    )
}

export default Auth;