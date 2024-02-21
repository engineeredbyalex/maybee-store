import React from 'react'

function InputForm({ children }) {
    return (
        <div className='lg:w-[20rem] lg:h-[25rem] rounded-md flex flex-col items-center justify-center'>
            {children}
        </div>
    )
}

export default InputForm
