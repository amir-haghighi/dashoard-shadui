import MenuItems from './MenuItems'
import MenuTitle from './MenuTitle'
import { Avatar, AvatarFallback } from '../ui/avatar'
import Link from 'next/link'
import LightDarkToggle from '../ui/LightDarkToggle'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

function MainMenu({ className }: { className?: ClassNameValue }) {
    return (
        <nav className={cn("flex flex-col md:bg-muted overflow-auto p-4", className)}>

            <header className='border-b dark:border-b-black border-b-zinc-300 pb-4 '>
                <MenuTitle />
            </header>
            <ul className='py-4 grow'>
                <MenuItems href='/' >My Dashboard</MenuItems>
                <MenuItems href='/teams' >Teams</MenuItems>
                <MenuItems href='/employees' >Employees</MenuItems>
                <MenuItems href='/account' >Account</MenuItems>
                <MenuItems href='/settings' >Settings</MenuItems>
            </ul>
            <div className='flex gap-2 items-center '>
                <Avatar>
                    <AvatarFallback className='dark:bg-pink-800 dark:text-white  bg-pink-400 text-black' >
                        AH
                    </AvatarFallback>
                </Avatar>
                <Link href="/logged-out" className='underline'>Log out</Link>
                <LightDarkToggle className='ml-auto' />
            </div>
        </nav>
    )
}

export default MainMenu