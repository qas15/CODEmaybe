import React, { useEffect, useState } from 'react';
import './Reviews.css';
import { getComments, NewComment } from '../http/userAPI';

const Reviews = () => {
  const [stars, setStars] = useState('');
  const [text, setText] = useState('');
  const [reviews, setReviews] = useState([
  ]);

  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const result = await getComments();
      setReviews(result);

    if (!newAuthor.trim() || !newRating === 0) {
      alert('Заполните все поля');
      return;
    }

    await NewComment(stars, text);

    const newReview = {
      id: Date.now(),
      author: newAuthor,
      text: newText,
      rating: newRating,
    };

    setReviews([...reviews, newReview]);
    setNewAuthor('');
    setNewText('');
    setNewRating(0);
  };

  const RatingStars = ({ rating, onRatingChange }) => {
    return (
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="star-button"
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => onRatingChange(star)}
          >
            {star <= rating ? '★' : '☆'}
          </button>
        ))}
      </div>
    );
  };

  const Review = ({ review }) => {
    return (
      <div className="review-card">
        <h4 className="review-author">{review.author}</h4>
        <div className="review-rating">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
          ))}
        </div>
        <p className="review-text">{review.text}</p>
      </div>
    );
  };

  return (
    <div className="reviews-container">
      <h1 className="reviews-title">ОТЗЫВЫ НАШИХ КЛИЕНТОВ</h1>
      
      <div className="reviews-list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>

      <h2 className="form-subtitle">Оставьте свой отзыв</h2>
      <RatingStars
          rating={newRating}
          onRatingChange={setNewRating}
        />
      <form onSubmit={handleSubmit} className="reviews-form">
        <input
          type="text"
          placeholder="Ваше имя"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          className="form-input"
        />
        <textarea
          placeholder="Текст отзыва"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="form-textarea"
        />
        <button type="submit" className="submit-button">
          Отправить отзыв
        </button>
      </form>
    </div>
  );
};

export default Reviews;