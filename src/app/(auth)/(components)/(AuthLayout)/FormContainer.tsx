import React from 'react'
import SignUpForm from '../SignUpForm'
import SignInForm from '../SignInForm'

const FormContainer = ({status}: {status: string}) => {
  return (
      <div className='w-full'>
        {status === "signin" ? <SignInForm /> : <SignUpForm /> }
      </div>  )
}

export default FormContainer