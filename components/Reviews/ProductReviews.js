import React, { useState, useEffect } from 'react';
import Input from '@/components/Layout/Input';
import WhiteBox from '@/components/Layout/WhiteBox';
import StarsRating from '@/components/Reviews/StarsRating';
import Textarea from '@/components/Layout/Textarea';
import Button from '@/components/Basic/Button';
import axios from 'axios';
import Center from '../Layout/Center';
import Wrapper from '../Layout/Wrapper';


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
    <div className='flex w-full items-start justify-start flex-col mt-[3rem]'>
      {/* Review Add */}
      <div className='lg:ml-[10rem] ml-[2rem] lg:mr-[10rem] mr-[2rem]'>
        <div>
          <div>
            <h2>Adaugă o recenzie</h2>
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
              <Button primary onClick={submitReview}>
                Trimite recenzia
              </Button>
            </div>
          </div>
        </div>
        {/* All reviews*/}
        <div>
          <div>
            <h2>Toate recenzile :</h2>
            {reviews.length === 0 && <p>Nu există recenzii!</p>}
            {reviews.length > 0 &&
              reviews.map((review) => (
                <div key={review._id} className={ReviewWrapper}>
                  <div className={ReviewHeader}>
                    {/* <StarsRating size={'sm'} disabled={true} defaultHowMany={review.stars} /> */}
                    <time className={Time}>
                      {(new Date(review.createdAt)).toLocaleString('sv-SE')}
                    </time>
                  </div>
                  <h3>{review.title}</h3>
                  <p>{review.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
