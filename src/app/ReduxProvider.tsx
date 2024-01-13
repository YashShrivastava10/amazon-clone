"use client";

import { Store } from '@/store'
import React from 'react'
import { Provider } from 'react-redux'

const ReduxProvider = ({children} : {children: React.ReactNode}) => <Provider store={Store}>{children}</Provider>

export default ReduxProvider