// importing useState and useEffect
import { useState, useEffect } from 'react';
// importing input
import Input from '@/components/Layout/Input';
// importing StarsRating
import StarsRating from '@/components/Reviews/StarsRating';
// importing Textarea
import Textarea from '@/components/Layout/Textarea';
// importing button
import Button from '@/components/Basic/Button';
// importing axios
import axios from 'axios';
// importing spacers
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
            <h4 className='uppercase leading-[3rem] text-center font-bold text-[#595959]'>Adaugă o recenzie</h4>
            <div>
              <StarsRating onChange={setStars} />
            </div>
            <Input
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Titlu"
              className="border text-base w-full bg-transparent"
            />
            <Textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Părerea dvs."
              className="border text-base w-full bg-transparent"
            />
            <div>
              <SmallSpacer>
                <Button primary onClick={submitReview}>
                  <p className='uppercase'>Trimite recenzia</p>
                </Button>
              </SmallSpacer>
            </div>
          </div>
        </div>
        {/* All reviews*/}
        < BigSpacer >
          <div className='flex flex-col text-[#595959] text-center'>
            <h5 className='uppercase font-medium'>Toate recenzile :</h5>
            {reviews.length === 0 && <p>Fii primul care  pune o recenzie.</p>}
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
