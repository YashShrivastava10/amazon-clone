import React from 'react'
import SignUpForm from './FormContainer/SignUpForm'
import SignInForm from './FormContainer/SignInForm'
import CreateAccountButton from './FormContainer/CreateAccountButton'

const FormContainer = ({ status }: { status: string }) => {
  return (
    <div className='w-full'>
      {status === "signin" ?
        <SignInForm>
          <CreateAccountButton />
        </SignInForm>
        :
        <SignUpForm />}
    </div>
  )
}

export default FormContainer