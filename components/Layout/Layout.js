import React from 'react'

function Layout({ children }) {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='mr-[60px] ml-[60px]'>
                {children}
            </div>
        </div>
    )
}

export default Layout