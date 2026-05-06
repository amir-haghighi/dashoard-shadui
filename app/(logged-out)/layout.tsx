import LightDarkToggle from "@/components/ui/LightDarkToggle"
type Props = {
    children?: React.ReactNode
}
export default function loggedOutLayout({ children }: Props) {
    return (
        <>
            <div className="flex flex-col   min-h-screen items-center  justify-center gap-4">
                {children}
            </div>
            <LightDarkToggle className="fixed right-0 top-1/2" />
        </>
    )
}