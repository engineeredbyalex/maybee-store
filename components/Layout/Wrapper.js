import React from 'react'


function Wrapper({ children }) {
    return (
        <div className='max-w-[1024px] flex items-center justify-evenly  overflow-x-hidden'>{children}</div>
    )
}

export default Wrapper