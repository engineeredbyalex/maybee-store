import { useState, useEffect } from 'react';
import Input from '@/components/Layout/Input';
import StarsRating from '@/components/Reviews/StarsRating';
import Textarea from '@/components/Layout/Textarea';
import Button from '@/components/Basic/Button';
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
    <div className='w-full mt-[3.5rem] gap-3 flex items-center justify-between'>
      <div className='w-1/2 flex flex-col items-start'>
          <h5>Toate recenziile:</h5>
        <div className='gap-3 flex flex-col'>
          <div className='w-full'>
            <Input
            className="text-sm w-full"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Nume"
            />
          </div>
          <div className='w-full'>
            <Input
            className="text-sm w-full"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Titlu"
            />
          </div>
          <div className='w-full'>
            <Textarea
            className="text-sm w-full"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Părerea dvs."
            />
          </div>
          <div className='w-full'>
            <Button onClick={submitReview}>
              <p>Trimite recenzia</p>
            </Button>
          </div>
        </div>
      </div>

      {/* All Reviews */}
      <div className='w-1/2'>
        <div>
          <h5>Toate recenziile:</h5>
          {reviews.length === 0 ? (
            <p>Fii primul care pune o recenzie.</p>
          ) : (
            <div>
              {reviews.map((review) => (
                <div key={review._id}>
                  <p>{review.name}</p>
                  <p>{review.title}</p>
                  <p>{review.description}</p>
                  <time>
                    {(new Date(review.createdAt)).toLocaleString('sv-SE')}
                  </time>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
