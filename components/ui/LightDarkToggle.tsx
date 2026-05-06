"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import { Button } from './button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
type Props = {
    className?: string
}
function LightDarkToggle({ className }: Props) {
    const { setTheme, resolvedTheme } = useTheme()
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild className={className} onClick={() => setTheme(
                    resolvedTheme === "light" ? "dark" : "light"
                )}>
                    <Button variant={"outline"}>
                        <SunIcon className='block dark:hidden' />
                        <MoonIcon className='hidden dark:block' />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <span className='light:hidden dark:inline '>Enable light mode </span>
                    <span className='light:inline dark:hidden'>Enable dark mode </span>
                </TooltipContent>



            </Tooltip>


        </TooltipProvider>
    )
}

export default LightDarkToggle