import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  return (
    <div className='h-screen'>
      <UserButton afterSignOutUrl='/' />
      Home!!!
    </div>
  )
}

export default Home
