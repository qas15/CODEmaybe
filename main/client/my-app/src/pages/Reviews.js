import React, { useEffect, useState } from 'react';
import './Reviews.css';
import { getComments, NewComment } from '../http/userAPI';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getComments();
        setReviews(comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newText.trim() || newRating === 0) {
      alert('Заполните все поля');
      return;
    }

    try {
      await NewComment(newRating, newText);
      const updatedComments = await getComments();
      setReviews(updatedComments);
      setNewText('');
      setNewRating(0);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const RatingStars = ({ rating, onRatingChange }) => {
    return (
        <div className="rating-container">
          {[1, 2, 3, 4, 5].map((star) => (
              <button
                  key={star}
                  type="button"
                  className={`star-button ${star <= rating ? 'active' : ''}`}
                  onClick={() => onRatingChange(star)}
              >
                ★
              </button>
          ))}
        </div>
    );
  };

  const Review = ({ review }) => {
    console.log(review);
    return (
        <div className="review-card">
          <div className="review-header">
            <h4 className="review-author">{review.name}</h4>
            <div className="review-rating">
              {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < review.stars ? 'active' : ''}>★</span>
              ))}
            </div>
          </div>
          <p className="review-text">{review.text}</p>
        </div>
    );
  };

  return (
      <div className="reviews-container">
        <h1 className="reviews-title">ОТЗЫВЫ НАШИХ КЛИЕНТОВ</h1>

        {isLoading ? (
            <div className="loading-spinner"></div>
        ) : (
            <>
              <div className="reviews-list">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Review key={review.id} review={review} />
                    ))
                ) : (
                    <p className="no-reviews">Пока нет отзывов. Будьте первым!</p>
                )}
              </div>

              <div className="review-form-section">
                <h2 className="form-subtitle">Оставьте свой отзыв</h2>
                <form onSubmit={handleSubmit} className="reviews-form">
                  <RatingStars
                      rating={newRating}
                      onRatingChange={setNewRating}
                  />
                  <textarea
                      placeholder="Напишите ваш отзыв здесь..."
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      className="form-textarea"
                      required
                  />
                  <button type="submit" className="submit-button">
                    Опубликовать отзыв
                  </button>
                </form>
              </div>
            </>
        )}
      </div>
  );
};

export default Reviews;