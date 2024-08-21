import { useState, useEffect } from 'react';
import Input from 'postcss/lib/input';
import StarsRating from './StarsRating';
import axios from 'axios';

const ProductReviews = ({ product }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const submitReview = () => {
    const data = { name, title, description, stars, product: product._id };
    axios.post('/api/reviews', data).then((res) => {
      setName('');
      setTitle('');
      setDescription('');
      setStars(0);
      loadReviews();
    });
  };

  const loadReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await axios.get(`/api/reviews?product=${product._id}`);
      setReviews(response.data);
      setReviewsLoading(false);
    } catch (error) {
      console.error('Error loading reviews', error);
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [product]);

  return (
    <div className="w-full px-4 py-8 bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-4">Scrie o recenzie</h3>
        <div className="gap-3 flex flex-col">
          <Input
            className="text-sm w-full mb-2 p-2 border border-gray-300 rounded"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Nume"
          />
          <Input
            className="text-sm w-full mb-2 p-2 border border-gray-300 rounded"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Titlu"
          />
          <div
            className="text-sm w-full mb-2 p-2 border border-gray-300 rounded"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Părerea dvs."
          />
          <div className="w-full mb-4">
            <StarsRating
              stars={stars}
              setStars={setStars}
            />
          </div>
          <button onClick={submitReview} className="w-full bg-blue-600 text-white py-2 rounded">
            <p>Trimite recenzia</p>
          </button>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-8">
        <h3 className="text-xl font-semibold mb-4">Toate recenziile</h3>
        {reviewsLoading ? (
          <p>Se încarcă...</p>
        ) : reviews.length === 0 ? (
          <p>Fii primul care pune o recenzie.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">{review.name}</p>
                  <StarsRating stars={review.stars} readonly />
                </div>
                <p className="text-sm">{review.title}</p>
                <p className="text-sm text-gray-700">{review.description}</p>
                <time className="text-xs text-gray-500">
                  {(new Date(review.createdAt)).toLocaleString('sv-SE')}
                </time>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
