import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Link from 'next/link'




const Navbar = async () => {

    const session = await auth();



  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <img src="/logo.png" alt="logo" width={144} height={30} />
        </Link> 

        <div className='flex items-center gap-5 text-black'>
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden"/>
              </Link> 
              <Link href="/startup/registerAuthor">
                <span>BecomeAuthor</span>
              </Link>

                <form action={ async () =>{
                "use server";
                await signOut({redirectTo: '/'});
                } }>

                <button type='submit'>
                <span className="max-sm:hidden">Logout</span>
                <LogOut className="size-6 sm:hidden"/>
                </button>

                </form>

                <Link href={`/users/${session?.user.id}`}>
                    <span>{session?.user?.name}</span>
                </Link>

            </>
          
          ) : (
            <form action={ async () =>{
              "use server";
              await signIn('github');
            } }>

              <button type='submit'>
                <span>Login</span>
              </button>

            </form>
          )
        }
        </div>

      </nav>
    </header>
  )
}

export default Navbar
