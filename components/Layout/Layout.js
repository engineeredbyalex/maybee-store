import React from 'react'

function Layout({ children }) {
    return (
        <div className='w-full flex items-center justify-start'>
            <div className='ml-[1.5rem] md:ml-[2rem] lg:ml-[2.5rem] mr-[1.5rem] md:mr-[2rem] lg:mr-[2.5rem]'>
                {children}
            </div>
        </div>
    )
}

export default Layout