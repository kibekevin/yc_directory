import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_ID_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'


const View = async ({ id }: {id:string}) => {

    const { views: totalviews } = await client.withConfig({ useCdn: false } ).fetch(STARTUP_ID_QUERY, {id})

    async function processAfterResponse() {
        //console.log('This runs after the main request is processed.');
        await writeClient.patch(id).set({ views: totalviews +1 }).commit();
    }

    processAfterResponse();

    

  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping/>
        </div>
        <p className='view-text'>
            <span className='font-black'>{totalviews}:views </span>
        </p>
    </div>
  )
}

export default View
