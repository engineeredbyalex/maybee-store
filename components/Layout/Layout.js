import React from 'react'

function Layout({ children }) {
    return (
        <div className='w-screen flex items-center justify-start'>
            <div className='w-full ml-[1.5rem] md:ml-[2rem] lg:ml-[2.5rem] mr-[1.5rem] md:mr-[2rem] lg:mr-[2.5rem]'>
                {children}
            </div>
        </div>
    )
}

export default Layout