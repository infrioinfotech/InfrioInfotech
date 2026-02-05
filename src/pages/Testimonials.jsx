import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, Upload, Loader2, User } from 'lucide-react';
import axios from 'axios';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newReview, setNewReview] = useState({
    name: '',
    content: '',
    rating: 5,
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should be less than 5MB');
        return;
      }
      setPhoto(file);
      // Create local preview
      const objectUrl = URL.createObjectURL(file);
      setPhotoPreview(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.content || !newReview.rating || !photo) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', newReview.name);
      formData.append('content', newReview.content);
      formData.append('rating', newReview.rating);
      formData.append('photo', photo);

      const response = await axios.post('/api/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update UI immediately with returned review
      setReviews((prev) => [response.data, ...prev]);
      
      // Reset and close
      setIsModalOpen(false);
      setNewReview({ name: '', content: '', rating: 5 });
      setPhoto(null);
      setPhotoPreview(null);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = newReview.name && newReview.content && newReview.rating && photo;

  return (
    <div className="bg-brand-white pb-24">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Social Proof</span>
            <h1 className="text-5xl md:text-7xl font-black text-brand-black mb-8">Feedback & <span className="text-brand-red">Reviews</span></h1>
            <p className="text-lg text-brand-gray leading-relaxed">
              Read what our early clients and collaborators say about working with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Infinite Horizontal Scroll Section */}
      <section className="py-24 bg-brand-offwhite border-y border-gray-100 overflow-hidden relative min-h-[400px]">
        <div className="w-full relative">
          {/* Gradient Overlays for smooth fade effect */}
          <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-brand-offwhite to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-brand-offwhite to-transparent z-10 pointer-events-none"></div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-brand-red" size={32} />
            </div>
          ) : reviews.length === 0 ? (
             <div className="text-center py-12 text-brand-gray">
               <p>No reviews yet. Be the first to share your experience!</p>
             </div>
          ) : (
            /* Scrolling Content */
            <div className="flex overflow-hidden">
              <div className="animate-scroll-horizontal flex gap-8 hover:paused whitespace-nowrap pl-8">
                {/* First Set */}
                {reviews.map((t, index) => (
                  <div
                    key={`original-${t.id}-${index}`}
                    className="card relative group w-[400px] flex-shrink-0 whitespace-normal"
                  >
                    <Quote size={40} className="text-brand-red/10 absolute top-6 right-6 group-hover:text-brand-red/20 transition-colors" />
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < t.rating ? 'text-brand-red fill-brand-red' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>
                    <p className="text-brand-gray italic mb-8 leading-relaxed line-clamp-4">"{t.content}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-white border border-gray-100 flex items-center justify-center font-black text-brand-red text-lg overflow-hidden shrink-0">
                        {t.image ? (
                          <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                        ) : (
                          t.name[0]
                        )}
                      </div>
                      <div>
                        <h4 className="text-brand-black font-bold">{t.name}</h4>
                        <p className="text-brand-gray/60 text-xs uppercase tracking-widest">{t.role || 'Client'}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Duplicate Set for Seamless Loop - Only if we have enough reviews or just duplicate anyway */}
                {reviews.length > 0 && reviews.map((t, index) => (
                  <div
                    key={`duplicate-${t.id}-${index}`}
                    className="card relative group w-[400px] flex-shrink-0 whitespace-normal"
                  >
                    <Quote size={40} className="text-brand-red/10 absolute top-6 right-6 group-hover:text-brand-red/20 transition-colors" />
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < t.rating ? 'text-brand-red fill-brand-red' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>
                    <p className="text-brand-gray italic mb-8 leading-relaxed line-clamp-4">"{t.content}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-white border border-gray-100 flex items-center justify-center font-black text-brand-red text-lg overflow-hidden shrink-0">
                        {t.image ? (
                          <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                        ) : (
                          t.name[0]
                        )}
                      </div>
                      <div>
                        <h4 className="text-brand-black font-bold">{t.name}</h4>
                        <p className="text-brand-gray/60 text-xs uppercase tracking-widest">{t.role || 'Client'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Review CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-brand-black mb-6">Worked With Us?</h2>
          <p className="text-brand-gray mb-8">We value every piece of feedback. It helps us learn and improve.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-outline"
          >
            Leave a Review
          </button>
        </div>
      </section>

      {/* Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content - Modern SaaS Style */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-brand-white w-full max-w-md relative z-10 shadow-2xl rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="text-xl font-bold text-brand-black">Write a Review</h3>
                  <p className="text-brand-gray text-xs mt-1">Share your experience with the world</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-brand-red transition-colors p-1 hover:bg-red-50 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Profile Photo Upload */}
                  <div className="flex flex-col items-center justify-center">
                     <div className="relative group cursor-pointer">
                        <div className="w-24 h-24 rounded-full bg-brand-offwhite border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-brand-red transition-colors">
                          {photoPreview ? (
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center text-gray-400">
                               <User size={32} />
                               <span className="text-[10px] uppercase font-bold mt-1">Upload</span>
                            </div>
                          )}
                        </div>
                        <input 
                           type="file" 
                           accept="image/*" 
                           onChange={handleImageChange}
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                           required
                        />
                        <div className="absolute bottom-0 right-0 bg-brand-red text-white p-1.5 rounded-full shadow-md">
                           <Upload size={12} />
                        </div>
                     </div>
                     <p className="text-xs text-brand-gray mt-2">Upload your profile photo</p>
                  </div>

                  {/* Rating */}
                  <div className="flex flex-col items-center gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-black">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => {}} // Could add hover preview state if needed
                          onClick={() => handleRatingChange(star)}
                          className="focus:outline-none transition-transform hover:scale-110 p-1"
                        >
                          <Star
                            size={24}
                            className={`${
                              star <= newReview.rating
                                ? 'text-brand-red fill-brand-red'
                                : 'text-gray-200 hover:text-brand-red/40'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-brand-black mb-1.5">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newReview.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-brand-offwhite border border-gray-200 rounded-lg p-3 text-sm text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="content" className="block text-xs font-bold uppercase tracking-widest text-brand-black mb-1.5">Review</label>
                      <textarea
                        id="content"
                        name="content"
                        value={newReview.content}
                        onChange={handleInputChange}
                        required
                        maxLength={500}
                        rows="3"
                        className="w-full bg-brand-offwhite border border-gray-200 rounded-lg p-3 text-sm text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all resize-none"
                        placeholder="Tell us about your experience... (Max 500 characters)"
                      />
                      <div className="text-right text-[10px] text-gray-400 mt-1">
                        {newReview.content.length}/500
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 bg-white border border-gray-200 text-brand-black font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`flex-1 font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-2 text-white transition-all ${
                        !isFormValid || isSubmitting
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-brand-red hover:bg-red-700 shadow-lg shadow-brand-red/30'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Review'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Testimonials;
