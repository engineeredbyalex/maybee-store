import React, { useState, useEffect } from 'react';
import Input from '@/components/Layout/Input';
import WhiteBox from '@/components/Layout/WhiteBox';
import StarsRating from '@/components/Reviews/StarsRating';
import Textarea from '@/components/Layout/Textarea';
import Button from '@/components/Basic/Button';
import axios from 'axios';
import Center from '../Layout/Center';
import Wrapper from '../Layout/Wrapper';
import { BigSpacer, SmallSpacer } from '../Layout/Spacer';


const ProductReviews = ({ product }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const submitReview = () => {
    const data = { title, description, stars, product: product._id };
    axios.post('/api/reviews', data).then((res) => {
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
    <div className='flex w-full items-center justify-center flex-col mt-[3rem]'>
      {/* Review Add */}
      <div className=''>
        <div>
          <div className='flex flex-col items-center justify-center'>
            <h4 className='uppercase leading-[3rem] font-bold text-[#595959]'>Adaugă o recenzie</h4>
            <div>
              <StarsRating onChange={setStars} />
            </div>
            <Input
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Titlu"
              className="border text-base w-full"
            />
            <Textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Parerea dvs."
              className="border text-base w-full"
            />
            <div>
              <SmallSpacer>
                <Button primary onClick={submitReview}>
                  <p className='font-bold py-2'>Trimite recenzia</p>
                </Button>
              </SmallSpacer>
            </div>
          </div>
        </div>
        {/* All reviews*/}
        < BigSpacer >
          <div className='flex flex-col gap-10 text-[#595959]'>
            <h5 className='uppercase font-bold'>Toate recenzile :</h5>
            {reviews.length === 0 && <p>Nu există recenzii!</p>}
            {reviews.length > 0 &&
              reviews.map((review) => (
                <div key={review._id}>
                  <div >
                    <time >
                      {(new Date(review.createdAt)).toLocaleString('sv-SE')}
                    </time>
                  </div>
                  <p>{review.title}</p>
                  <p>{review.description}</p>
                </div>
              ))}
          </div>
        </ BigSpacer>
      </div>
    </div>
  );
};

export default ProductReviews;
