import { useState, useEffect } from 'react';
import Input from '@/components/Layout/Input';
import StarsRating from '@/components/Reviews/StarsRating';
import Textarea from '@/components/Layout/Textarea';
import Button from '@/components/Basic/Button';
import axios from 'axios';
import { BigSpacer, SmallSpacer } from '../Layout/Spacer';

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
    <div className='flex w-full items-center justify-center flex-col mt-[3rem] px-4'>
      {/* Add Review */}
      <div className='w-full p-6'>
        <div className='gap-3 flex flex-col items-center'>
          <h4 className='uppercase leading-[3rem] text-center font-bold text-[#000]'>Adaugă o recenzie</h4>
          <StarsRating onChange={setStars} value={stars} />
          <div className='w-full'>
            <Input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="Nume"
              className="border text-base w-full bg-gray-100 p-2 mt-2"
            />
          </div>
          <div className='w-full'>
            <Input
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Titlu"
              className="border text-base w-full bg-gray-100 p-2 mt-2"
            />
          </div>
          <div className='w-full'>
            <Input
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Părerea dvs."
              className="border text-base w-full bg-gray-100 p-2 mt-2"
            />
          </div>
          <div className='w-full'>
            <Button
              onClick={submitReview}
              className='w-full bg-[#C23535] text-[#FDFCEA] px-3 py-2 rounded-lg hover:bg-[#A01C1C] transition-colors'
            >
              <p className='uppercase'>Trimite recenzia</p>
            </Button>
          </div>
        </div>
      </div>

      {/* All Reviews */}
      <div className='mb-10'>
        <div className='w-full flex flex-col items-center justify-center rounded-lg p-6 '>
          <h5 className='uppercase font-medium text-[#000] mb-4'>Toate recenziile:</h5>
          {reviews.length === 0 ? (
            <p className='text-[#595959]'>Fii primul care pune o recenzie.</p>
          ) : (
            reviews.map((review) => (
              <div className='border-b border-gray-200 py-4' key={review._id}>
                <p className='text-[#000] font-semibold'>{review.name}</p>
                <p className='text-[#000] font-medium'>{review.title}</p>
                <p className='text-[#000]'>{review.description}</p>
                <time className='text-[#000] text-sm'>
                  {(new Date(review.createdAt)).toLocaleString('sv-SE')}
                </time>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
