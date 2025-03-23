import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import { auth, signOut, signIn } from "@/auth";

export const experimental_ppr = true;


const md = markdownit();






const page = async({ params }: {params: Promise<{id:string}>}) => {

    const id = (await params).id;

    const [post,  { select:editorPosts } ] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, {id} ),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug:'editors-picks'})
    ]);


    if(!post) return notFound;

    const parsedContent = md.render(post?.pitch || "")


    const session = await auth();

 

  return (
    <>
        <section className='pink_container !min-h-[230px]'>
            <p className='tag'>{formatDate(post?._createdAt)}</p>
            <h1 className='heading'>{post.title}</h1>
            <p className='sub-heading !max-h-5xl'>{post.description}</p>
        </section>

        <section className='section_container'>
            <img src={post.image} alt="thumbnail" className='w-full h-auto rounded-xl' />
            <div className='space-y-5 mt-5 max-w-5xl mx-auto'>
                <div className='flex justify-between gap-5 items-center'>
                    <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>
                        <Image src={post.author?.image || '/robot.jpg'} alt='avator' width={64} height={64} className='rounded-full drop-shadow-lg'/>
                        <div>
                            <p className='text-20-medium'>{post.author?.name}</p>
                            <p className='text-16-medium !text-black-300'>@{post.author?.username}</p>
                        </div>
                    </Link>
                    <p className='category-tag'>{post?.category}</p>
                </div>
                <p className='text-30-bold'>Pitch Details</p>
                { parsedContent ? 
                    ( <article className='prose max-w-4xl font-work-sans break-all' dangerouslySetInnerHTML={{ __html:parsedContent }}/> ) : 
                    ( <p className='no-results'>No details provided</p> )
                }
            </div>

            <hr className='divider'/>

            { editorPosts?.length > 0 && (
                <div className='max-wid-4xl mx-auto'>
                    <p className='text-30-semibold'>Editor's pick</p>

                    <ul className='mt-7 card_grid-sm'>
                        { editorPosts.map( (post:StartupTypeCard) => (
                            <StartupCard key={post._id} post={post}/>
                        ) ) }
                    </ul>
                </div>
            ) }

            <Suspense fallback={<Skeleton className='view_sleleton'/>}>
                <View id={id}/>
            </Suspense>

        </section>
    </>
  )
}

export default page
