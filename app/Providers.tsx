import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

type Props = { children: ReactNode }
function Providers({ children }: Props) {
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </>
    )
}

export default Providers