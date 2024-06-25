import Authenticator from '@/components/authenticator/Authenticator'
import React from 'react'

function Register() {
    return (
        <div className='flex items-center justify-center w-full'>
            <Authenticator mode="register" />
        </div>
    )
}

export default Register