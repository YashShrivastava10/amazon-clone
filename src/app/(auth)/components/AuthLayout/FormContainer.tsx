import React from 'react'
import SignUpForm from './FormContainer/SignUpForm'
import SignInForm from './FormContainer/SignInForm'
import CreateAccountButton from './FormContainer/CreateAccountButton'
import ForgetPassword from './FormContainer/ForgetPassword'

const FormContainer = ({ status }: { status: string }) => {
  return (
    <div className='w-full'>
      {status === "signin" &&
        <SignInForm>
          <CreateAccountButton />
        </SignInForm>
      }
      {status === "signup" && <SignUpForm />}
      {status === "forgetPassword" && <ForgetPassword />}
    </div>
  )
}

export default FormContainer