import { Button } from '@/components/ui/button'
import { PersonStandingIcon } from 'lucide-react'
import Link from 'next/link'
function Home() {
    return (
        <>

            <span className='flex gap-2 items-center'>
                <Link href={"/logged-out"}> <PersonStandingIcon size={50} className='text-pink-400' /></Link>
                <h1>SupportMe</h1>
            </span>
            <p>The best dashboard to manage customer support</p>
            <div className='flex gap-2 items-center'>
                <Button asChild variant={"default"}>
                    <Link href="/logged-out/login"> Log in</Link>
                </Button>
                <small>or</small>
                <Button asChild variant={"outline"}  >
                    <Link href="/logged-out/signup"> Sign up</Link>
                </Button>
            </div>
        </>
    )
}

export default Home