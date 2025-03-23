import { auth } from '@/auth'
import AuthorForm from '@/components/AuthorForm'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

    const session = await auth();

    if (!session) {
        redirect("/")
    }

  return (
    <>
        <section className='pink_container !min-h-[230px]'>
            <h1 className='heading'>Become An Author</h1>
        </section>

        <AuthorForm/>
    </>
  )
}

export default page
