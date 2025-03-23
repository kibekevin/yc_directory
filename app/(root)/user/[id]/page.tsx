import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_SANITY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import UserStartupss from '@/components/UserStartupss';
import { StartupCardSkeleton } from '@/components/StartupCard';


export const experimental_ppr = true;

const page = async ( {params} : {params: Promise<{id:string}>} ) => {

    const id = (await params).id;

    const user = await client.fetch(AUTHOR_BY_SANITY_ID_QUERY, {id});

    if (!user) {
        return notFound;
    }

  return (
    <>
        <section className='profile_container'>
            <div className='profile_card'>
                <div className='profile_title'>
                    <h3 className='text-24-black uppercase text-center line-clamp-1'>
                        { user.name }
                    </h3>
                </div>

                <Image src={user.image} alt={user.name} width={150} height={150} className='profile_image' />
                <p className='text-30-extrabold mt-7 text-center'>@{ user.username }</p>
                <p className='text-14-normal mt-1 text-center'>{ user.bio }</p>

            </div>

            <div className='flex flex-col flex-1 gap-5 lg:-mt-5'>
                <p className='text-30-bold'>
                    { user._id===id ? 'Your' : 'All' } Startups
                </p>

                <ul className='card_grid-sm'>
                    <Suspense fallback={ <StartupCardSkeleton/> }>
                        <UserStartupss id={id}/>
                    </Suspense>
                    
                </ul>

            </div>

        </section>
    </>
)
}

export default page
