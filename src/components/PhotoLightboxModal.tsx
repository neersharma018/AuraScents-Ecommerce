import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ThumbsUp, Star } from 'lucide-react';
import type { Review } from '../types/review';

interface PhotoLightboxModalProps {
  photoUrl: string | null;
  review: Review | null;
  onClose: () => void;
}

const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  photoUrl,
  review,
  onClose
}) => {
  if (!photoUrl || !review) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[350] flex items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl bg-[#161616] text-white rounded-2xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <X size={18} />
          </button>

          {/* Left: Customer Photo */}
          <div className="h-[350px] md:h-[550px] bg-black flex items-center justify-center p-4 relative">
            <img 
              src={photoUrl} 
              alt="Genuine customer submitted perfume moment" 
              className="w-full h-full object-contain"
            />
            {review.isDemo && (
              <span className="absolute bottom-4 left-4 bg-amber-500/80 text-black text-[9px] font-mono uppercase px-2 py-0.5 rounded tracking-widest">
                DEMO PHOTO PREVIEW
              </span>
            )}
          </div>

          {/* Right: Review Details */}
          <div className="p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[550px]">
            <div>
              {/* Product & User Header */}
              <div className="mb-4 pb-4 border-b border-white/10">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--gold)] font-bold block mb-1">
                  {review.productName || 'AURASCENTS FRAGRANCE'}
                </span>
                <h4 className="serif text-2xl text-white font-normal">{review.title}</h4>
              </div>

              {/* Customer Rating & Verified status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[var(--gold)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-[var(--gold)]" : "text-gray-600"} />
                  ))}
                  <span className="ml-2 text-xs font-mono text-gray-400">{review.rating}.0 / 5</span>
                </div>

                {review.verifiedPurchase && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium tracking-wider">
                    <CheckCircle size={14} /> Verified Purchase
                  </div>
                )}
              </div>

              {/* Review Text */}
              <p className="text-sm text-gray-300 leading-relaxed font-light mb-6">
                "{review.reviewText}"
              </p>

              {/* Performance Breakdown */}
              <div className="grid grid-cols-2 gap-3 bg-[#202020] p-4 rounded-xl text-xs mb-6 border border-white/5">
                <div>
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest block">Longevity</span>
                  <span className="text-gray-200 font-medium">{review.longevity}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest block">Projection</span>
                  <span className="text-gray-200 font-medium">{review.projection}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest block">Occasion</span>
                  <span className="text-gray-200 font-medium">{review.occasion}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest block">Recommendation</span>
                  <span className="text-gray-200 font-medium">{review.recommended ? 'Recommended ✓' : 'Not Recommended'}</span>
                </div>
              </div>
            </div>

            {/* Author & Date */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <div>
                <span className="font-semibold text-white block">{review.customerName}</span>
                <span className="text-[10px] text-gray-500 font-mono">
                  {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(review.reviewDate))}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                  <ThumbsUp size={14} /> {review.helpfulYes}
                </button>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PhotoLightboxModal;
