// importing axios
import axios from "axios";
// importing useState and useEffect
import { useEffect, useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("../api/reviewGet");
        if (response && response.data) {
          // Filter to only 5-star reviews and limit to 3
          const filteredReviews = response.data
            .filter((review) => review.stars === 5)
            .slice(0, 3);
          setReviews(filteredReviews);
        } else {
          setReviews([]);
        }
      } catch (error) {
        setReviews([]);
      }
    };

    fetchData();
  }, []);

  // If there are no reviews, return null (nothing rendered)
  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="py-14 ">
      <div className="w-full overflow-x-auto container flex gap-14 flex-col">
        <div className="flex flex-col items-start justify-center w-full gap-4">
          <h3 className="">Comandă pe categorii</h3>
          <div href="/categories">
            <h5 className="">Pentru ca experienta ta conteaza</h5>
          </div>
        </div>
        <div className="">
        <div className="gap-10 flex lg:flex-row flex-col lg:space-x-4 ">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="lg:w-1/3 border-black border px-2 py-2"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{review.name}</h4>
              </div>
              <h4 className="">{review.title}</h4>
              <p className="">{review.description}</p>
              <time className="text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleString("sv-SE")}
              </time>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
