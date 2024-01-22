import React from 'react'

function Layout({ children }) {
    return (
        <div className=' w-full flex items-center justify-center'>
            <div className='ml-[30px] lg:mr-[60px] mr-[30px] lg:ml-[60px]'>
                {children}
            </div>
        </div>
    )
}

export default Layout