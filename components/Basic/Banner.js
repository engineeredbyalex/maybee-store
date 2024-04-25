

export default function Banner() {
    return (
        <div className="absolute top-0 h-[80px] lg:h-[50px] flex items-center justify-center w-full bg-red-600">
            <div>
                <div>
                    <p className="text-white text-[14px] lg:text-[16px] text-center  uppercase">Transportul este gratuit.</p>
                    <p className="text-white text-center  uppercase">Între 1 si 12 mai nu se fac livrări.</p>
                </div>
            </div>
        </div>
    )
}