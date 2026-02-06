import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, Upload, Loader2, User, Plus } from 'lucide-react';
import axios from 'axios';
import avatarPlaceholder from '../assets/avatar-placeholder.png';
import SEO from '../components/SEO';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newReview, setNewReview] = useState({
    name: '',
    reviewText: '',
    rating: 0, // Start with 0 stars
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch reviews function
  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get('/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

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

  // Helper function to upload to Cloudinary
  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Image upload failed");

    return await res.json();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.reviewText || !newReview.rating) {
        alert("Please fill in all required fields.");
        return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload image to Cloudinary first
      let photoUrl = '';
      if (photo) {
        const uploaded = await uploadToCloudinary(photo);
        photoUrl = uploaded.secure_url;
      }

      // 2. Send JSON payload to backend
      await axios.post('/api/reviews', {
        name: newReview.name,
        reviewText: newReview.reviewText, // Backend expects reviewText or message
        message: newReview.reviewText,    // Send both to be safe
        rating: newReview.rating,
        photoUrl: photoUrl
      });

      // Update UI by refetching
      await fetchReviews();
      
      // Reset and close
      setIsModalOpen(false);
      setNewReview({ name: '', reviewText: '', rating: 0 });
      setPhoto(null);
      setPhotoPreview(null);
      setHoverRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = newReview.name && newReview.reviewText && newReview.rating > 0;

  return (
    <div className="bg-brand-white min-h-screen">
      <SEO
        title="Client Reviews | Infrio Infotech"
        description="Client testimonials and reviews for Infrio Infotech. See what our customers say about our IT services and software solutions."
        canonical="https://infrioinfotech.qzz.io/testimonials"
        ogTitle="Client Reviews | Infrio Infotech"
        ogDescription="Testimonials about Infrio Infotech's services and solutions."
        ogImage="https://infrioinfotech.qzz.io/infrio/Logo.png"
        ogUrl="https://infrioinfotech.qzz.io/testimonials"
        robots="index,follow"
      />
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-red font-bold text-sm uppercase tracking-[0.3em] block mb-4">Community</span>
            <h1 className="text-4xl md:text-6xl font-black text-brand-black mb-6">
              Client <span className="text-brand-red">Stories</span>
            </h1>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
              We take pride in our work and the relationships we build. Here's what our clients have to say about their experience with Infrio Infotech.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Marquee Section */}
      <section className="py-24 border-y border-gray-100 bg-white overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-brand-red" size={32} />
          </div>
        ) : reviews.length === 0 ? (
           <div className="text-center py-12 text-brand-gray">
             <p className="mb-4">No reviews yet.</p>
             <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary"
              >
                Be the first to review
              </button>
           </div>
        ) : (
          <div className="w-full relative group">
             {/* Gradient Edges */}
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex overflow-hidden">
              <div className="animate-scroll-horizontal flex gap-8 whitespace-nowrap px-4 w-max">
                {/* We double the list to ensure smooth looping */}
                {[...reviews, ...reviews].map((t, index) => (
                  <div
                    key={`${t.id}-${index}`}
                    className="w-[350px] md:w-[400px] bg-brand-offwhite p-8 rounded-2xl flex-shrink-0 whitespace-normal border border-transparent hover:border-brand-red/20 transition-all duration-300 hover:shadow-lg relative group/card"
                  >
                    <Quote size={32} className="text-brand-red/10 absolute top-6 right-6 group-hover/card:text-brand-red/20 transition-colors" />
                    
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`${i < t.rating ? 'text-brand-red fill-brand-red' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-brand-gray italic mb-8 leading-relaxed line-clamp-4 text-base">
                      "{t.message || t.content || t.reviewText}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        <img 
                          src={t.photoUrl || t.image || avatarPlaceholder} 
                          alt={t.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="text-brand-black font-bold text-sm">{t.name}</h4>
                        <p className="text-brand-gray/60 text-xs uppercase tracking-widest">{t.role || 'Client'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-offwhite">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-brand-black mb-6">Have you worked with us?</h2>
          <p className="text-brand-gray mb-10 max-w-2xl mx-auto">
            Your feedback helps us grow and serve you better. We'd love to hear about your experience with Infrio Infotech.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-brand-black text-white px-8 py-4 rounded-full font-bold hover:bg-brand-red transition-all duration-300 shadow-lg hover:shadow-brand-red/25 transform hover:-translate-y-1"
          >
            <Plus size={20} />
            Leave a Review
          </button>
        </div>
      </section>

      {/* Modern Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-lg relative z-10 shadow-2xl rounded-3xl overflow-hidden"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="text-xl font-bold text-brand-black">Write a Review</h3>
                  <p className="text-gray-500 text-xs mt-1">Share your experience with us</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-brand-red transition-colors p-2 hover:bg-red-50 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Photo Upload & Rating Row */}
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    {/* Photo Upload */}
                    <div className="flex flex-col items-center">
                       <div className="relative group cursor-pointer">
                          <div className="w-20 h-20 rounded-full bg-brand-offwhite border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden group-hover:border-brand-red transition-all duration-300">
                            {photoPreview ? (
                              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="flex flex-col items-center text-gray-400">
                                 <User size={24} />
                              </div>
                            )}
                          </div>
                          <input 
                             type="file" 
                             accept="image/*" 
                             onChange={handleImageChange}
                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-brand-red text-white p-1.5 rounded-full shadow-md transform scale-90 group-hover:scale-110 transition-transform">
                             <Upload size={12} />
                          </div>
                       </div>
                       <span className="text-[10px] uppercase font-bold text-gray-400 mt-2">Photo</span>
                    </div>

                    {/* Rating */}
                    <div className="flex-1 flex flex-col items-center sm:items-start gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-black">Rate your experience</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => handleRatingChange(star)}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              size={28}
                              className={`${
                                star <= (hoverRating || newReview.rating)
                                  ? 'text-brand-red fill-brand-red'
                                  : 'text-gray-200'
                              } transition-colors duration-200`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-brand-red font-medium h-4">
                        {(hoverRating || newReview.rating) > 0 ? 
                          ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][(hoverRating || newReview.rating) - 1] 
                          : ''}
                      </span>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-5">
                    <div className="group">
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-brand-black mb-2 group-focus-within:text-brand-red transition-colors">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newReview.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-brand-offwhite border-b-2 border-gray-200 rounded-t-lg px-4 py-3 text-sm text-brand-black focus:outline-none focus:border-brand-red focus:bg-red-50/10 transition-all placeholder-gray-400"
                        placeholder="e.g. Sarah Connor"
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="reviewText" className="block text-xs font-bold uppercase tracking-widest text-brand-black mb-2 group-focus-within:text-brand-red transition-colors">Review</label>
                      <textarea
                        id="reviewText"
                        name="reviewText"
                        value={newReview.reviewText}
                        onChange={handleInputChange}
                        required
                        maxLength={500}
                        rows="4"
                        className="w-full bg-brand-offwhite border-b-2 border-gray-200 rounded-t-lg px-4 py-3 text-sm text-brand-black focus:outline-none focus:border-brand-red focus:bg-red-50/10 transition-all resize-none placeholder-gray-400"
                        placeholder="What did you like best about working with us?"
                      />
                      <div className="text-right text-[10px] text-gray-400 mt-1">
                        {newReview.reviewText.length}/500
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 bg-white border border-gray-200 text-brand-black font-bold py-3.5 px-6 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`flex-[2] font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 text-white transition-all shadow-lg ${
                        !isFormValid || isSubmitting
                          ? 'bg-gray-300 cursor-not-allowed shadow-none'
                          : 'bg-brand-red hover:bg-red-700 hover:shadow-brand-red/40 hover:-translate-y-0.5'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Posting...
                        </>
                      ) : (
                        'Post Review'
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
