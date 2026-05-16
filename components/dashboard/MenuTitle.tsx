import { PersonStandingIcon } from 'lucide-react'
import React from 'react'

function MenuTitle() {
    return (
        <h3 className='flex flex-center align-center'>
            <PersonStandingIcon className='text-primary' size={35} />
            Support Me
        </h3>
    )
}

export default MenuTitle