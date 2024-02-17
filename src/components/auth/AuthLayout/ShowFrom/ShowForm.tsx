import React, { ReactNode } from 'react'
import SignInForm from './SignInForm/SignInForm'
import CreateAccountButton from './SignInForm/CreateAccountButton/CreateAccountButton'
import SignUpForm from './SignUpForm'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import SecurePasswordTip from './ForgetPassword/SecurePasswordTip'
import { FormStatusType } from '@/types/Form'

const ShowForm = ({status}: {status: FormStatusType}) => {
  
  const displayForm: Record<FormStatusType, ReactNode> = {
    "signin": <SignInForm><CreateAccountButton /></SignInForm>,
    "signup": <SignUpForm />,
    "forgetPassword": <ForgetPassword><SecurePasswordTip /></ForgetPassword>
  }

  if(!displayForm[status]) return <h1>Not Found</h1>

  return displayForm[status]
}

export default ShowForm