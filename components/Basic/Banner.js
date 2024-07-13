// Importing axios
import axios from "axios";
// Importing useState and useEffect
import { useEffect, useState } from "react";

export default function Banner() {
    const [bannerText, setBannerText] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/customization");
                const lastItem = response.data[response.data.length - 1];
                if (lastItem && lastItem.bannerText) {
                    setBannerText(lastItem.bannerText);
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
        <div className="w-full min-h-[5vh] bg-[#7F1515] flex items-center justify-center">
            <p className="text-white font-light uppercase">{bannerText}</p>
        </div>
    );
}
