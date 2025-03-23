import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {

    const session = auth();

    if (!session) {
        redirect( "/" )
    }


  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>Submit Your Startup</h1>
      </section>
      <section>
        <StartupForm/>
      </section>
    </>
  )
}

export default page
