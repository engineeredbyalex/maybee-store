
// importing axios
import axios from 'axios';
// importing useState and useEffect
import { useEffect, useState } from 'react';

export default function Banner() {
    const [bannerText, setBannerText] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("../api/customization");
                if (response && response.data) {
                    setBannerText(response.data.bannerText);
                    console.log(response.data);
                } else {
                    setBannerText("Banner text not found");
                }
            } catch (error) {
                setBannerText("Failed to fetch banner text");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-[36px] absolute top-0">
            <div className="bg-[#252525] text-white w-screen py-2 text-center flex items-center justify-center">
                <p className="font-extralight">{bannerText || "Banner not Found"}</p>
            </div>
        </div>
    );
}
