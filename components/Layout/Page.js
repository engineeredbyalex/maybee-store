
export default function Page({ children }) {
    return (
        <div className="w-screen min-h-[screen] flex flex-col items-center justify-center mt-[4rem]">

            {children}

        </div>
    )
}