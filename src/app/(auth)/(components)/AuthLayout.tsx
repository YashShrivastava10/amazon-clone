import React from 'react'

const AuthLayout = ({status} : {status : string}) => {
  return (
    <div>
      <div>{status}</div>
    </div>
  )
}

export default AuthLayout