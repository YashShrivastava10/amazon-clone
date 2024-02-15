import React from 'react'
import ShowForm from './ShowFrom/ShowForm'
import { FormStatusType } from '@/types/Form'

const FormContainer = ({ status }: { status: FormStatusType }) => {
  return (
    <div className='w-full'>
      <ShowForm status={status}/>
    </div>
  )
}

export default FormContainer