import Authenticator from '@/components/authenticator/Authenticator'
import React from 'react'

function Login() {
    return (
        <div className='flex items-center justify-center w-full'>
            <Authenticator mode="login" />
        </div>
    )
}

export default Login