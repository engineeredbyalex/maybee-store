export default function Container({ children }) {
    return (
        <div className="w-screen min-h-screen flex items-start justify-start ">
            <div className="w-full ml-[60px] mr-[60px]">
                {children}
            </div>
        </div>

    )
}