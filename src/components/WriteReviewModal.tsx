import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Upload, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import type { Review } from '../types/review';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productName?: string;
  onReviewSubmitted: (newReview: Review) => void;
}

const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  productId = 'royalOud',
  productName = 'Royal Oud',
  onReviewSubmitted
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  
  const [longevity, setLongevity] = useState<Review['longevity']>('5–8 hours');
  const [projection, setProjection] = useState<Review['projection']>('Moderate');
  const [sillage, setSillage] = useState<Review['sillage']>('Moderate');
  const [occasion, setOccasion] = useState<Review['occasion']>('Daily');
  const [recommended, setRecommended] = useState<boolean>(true);
  
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...filesArray]);
      
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !reviewText.trim() || !customerName.trim()) {
      alert('Please complete all required fields.');
      return;
    }

    setSubmitting(true);

    const uploadedPhotoUrls: string[] = [];
    
    // Upload files to Supabase Storage if configured
    for (const photo of photos) {
      try {
        const fileExt = photo.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `review-photos/${fileName}`;

        const { data, error } = await supabase.storage
          .from('reviews')
          .upload(filePath, photo);

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage.from('reviews').getPublicUrl(filePath);
          if (publicUrlData?.publicUrl) {
            uploadedPhotoUrls.push(publicUrlData.publicUrl);
          }
        }
      } catch (err) {
        console.warn('Storage upload error, falling back to blob preview for current session', err);
      }
    }

    // Fallback if local previews exist but storage is not active
    const finalPhotoUrls = uploadedPhotoUrls.length > 0 ? uploadedPhotoUrls : photoPreviews;

    const isVerified = Boolean(orderId.trim());

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      productName,
      customerName,
      customerEmail,
      orderId,
      rating,
      title,
      reviewText,
      verifiedPurchase: isVerified,
      purchaseDate: isVerified ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date()) : undefined,
      reviewDate: new Date().toISOString(),
      photos: finalPhotoUrls,
      longevity,
      projection,
      sillage,
      occasion,
      recommended,
      helpfulYes: 0,
      helpfulNo: 0,
      status: 'approved', // Live ready
      isDemo: false
    };

    // Store in Supabase database if available
    try {
      await supabase.from('reviews').insert([{
        product_id: productId,
        user_name: customerName,
        user_email: customerEmail,
        order_id: orderId,
        rating,
        title,
        comment: reviewText,
        verified: isVerified,
        longevity,
        projection,
        sillage,
        occasion,
        recommended,
        photos: finalPhotoUrls,
        status: 'approved'
      }]);
    } catch (err) {
      console.warn('Supabase DB write omitted or unavailable', err);
    }

    setSubmitting(false);
    setSubmittedSuccess(true);
    onReviewSubmitted(newReview);

    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
      // Reset
      setTitle('');
      setReviewText('');
      setPhotos([]);
      setPhotoPreviews([]);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Drawer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--bg-ivory)] rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-10 text-[var(--matte-black)] z-10 scroll-hide"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors"
          >
            <X size={18} />
          </button>

          {submittedSuccess ? (
            <div className="py-16 text-center">
              <CheckCircle className="w-16 h-16 text-[var(--gold)] mx-auto mb-4 animate-bounce" />
              <h3 className="serif text-3xl mb-2 text-[var(--text-main)]">Thank You for Your Review</h3>
              <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
                Your genuine feedback helps our community discover how {productName} performs in real-life moments.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <span className="eyebrow block mb-1">WRITE A REVIEW</span>
                <h3 className="serif text-3xl text-[var(--text-main)]">{productName}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Share your olfactory experience from first spray to final dry-down.
                </p>
              </div>

              {/* Star Rating Select */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-gray-700 mb-2">Overall Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star 
                        size={28} 
                        className={(hoverRating || rating) >= star ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-gray-300'} 
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-xs font-mono uppercase tracking-wider text-gray-500">
                    {rating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-gray-700 mb-2">Review Headline *</label>
                <input 
                  type="text"
                  required
                  placeholder="Summarize your experience (e.g. Elegant woody trail, excellent longevity)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-gray-700 mb-2">Detailed Review *</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell us about the fragrance notes, performance, occasion, and your overall experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              {/* Fragrance Attributes Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                {/* Longevity */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-gray-600 mb-1">Longevity</label>
                  <select 
                    value={longevity}
                    onChange={(e) => setLongevity(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                  >
                    <option value="Under 3 hours">Under 3 hours</option>
                    <option value="3–5 hours">3–5 hours</option>
                    <option value="5–8 hours">5–8 hours</option>
                    <option value="8+ hours">8+ hours</option>
                  </select>
                </div>

                {/* Projection */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-gray-600 mb-1">Projection</label>
                  <select 
                    value={projection}
                    onChange={(e) => setProjection(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                  >
                    <option value="Soft">Soft (Close skin scent)</option>
                    <option value="Moderate">Moderate (Arm's length)</option>
                    <option value="Strong">Strong (Fills room)</option>
                  </select>
                </div>

                {/* Sillage */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-gray-600 mb-1">Sillage (Scent Trail)</label>
                  <select 
                    value={sillage}
                    onChange={(e) => setSillage(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                  >
                    <option value="Soft">Soft</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Strong">Strong</option>
                  </select>
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-gray-600 mb-1">When do you wear it?</label>
                  <select 
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                  >
                    <option value="Daily">Daily Wear</option>
                    <option value="Office">Office & Work</option>
                    <option value="Date Night">Date Night</option>
                    <option value="Party">Party & Evenings</option>
                    <option value="Special Occasion">Special Occasion</option>
                  </select>
                </div>
              </div>

              {/* Recommendation */}
              <div className="flex items-center gap-6 pt-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-gray-700">Would you recommend this fragrance?</span>
                <div className="flex gap-4 text-xs font-medium">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="recommended" 
                      checked={recommended === true} 
                      onChange={() => setRecommended(true)}
                      className="accent-[var(--gold)]"
                    /> YES
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="recommended" 
                      checked={recommended === false} 
                      onChange={() => setRecommended(false)}
                      className="accent-[var(--gold)]"
                    /> NO
                  </label>
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="pt-2 border-t border-gray-200">
                <label className="block text-xs uppercase tracking-widest font-semibold text-gray-700 mb-2">
                  Upload Real Customer Photos (Optional)
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-3 bg-white border border-dashed border-gray-400 rounded-lg text-xs cursor-pointer hover:border-[var(--gold)] transition-colors">
                    <Upload size={16} className="text-[var(--gold)]" />
                    <span>+ ADD PHOTOS</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={handlePhotoUpload} 
                      className="hidden" 
                    />
                  </label>

                  {photoPreviews.map((src, idx) => (
                    <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-300">
                      <img src={src} alt="Upload preview" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Identity Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-gray-600 mb-1">Your Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Julian B."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-gray-600 mb-1">Email Address</label>
                  <input 
                    type="email"
                    placeholder="name@domain.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-gray-600 mb-1">Order ID (For Verified Badge)</label>
                  <input 
                    type="text"
                    placeholder="e.g. ORD-98214"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="text-[11px] text-gray-500 italic bg-gray-100 p-3 rounded-lg border border-gray-200">
                Notice: Reviews may be moderated for spam, profanity, or irrelevant content to preserve a genuine, trustworthy customer community.
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[var(--matte-black)] text-white uppercase tracking-[0.25em] text-xs rounded-lg hover:bg-[var(--gold)] transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting Review...' : 'SUBMIT REVIEW'}
              </button>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WriteReviewModal;
