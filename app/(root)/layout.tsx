import React, { ReactNode } from 'react'
// import Meeting from './meeting/[id]/pate'
import StreamVideoProvider from '@/providers/StreamClientProvider'

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>

      {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout
