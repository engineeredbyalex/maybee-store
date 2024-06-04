import { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai"

const ScrollButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (typeof window !== "undefined" && window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", toggleVisibility);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("scroll", toggleVisibility);
            }
        };
    }, []);

    return (
        <div className="scroll-to-top absolute right-0 ">
            {isVisible && (
                <div className="w-full flex items-center justify-end">
                    <button onClick={scrollToTop} className="w-[50px] h-[50px] text-[#000] font-bold  rounded-full bg-[#fff] flex items-center justify-center mr-[30px] mt-5 ">
                        <AiOutlineArrowUp size={30} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ScrollButton;
