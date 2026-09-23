export interface Review {
  id: string;
  productId: string;
  productName?: string;
  customerName: string;
  customerEmail?: string;
  orderId?: string;
  rating: number; // 1 to 5
  title: string;
  reviewText: string;
  verifiedPurchase: boolean;
  purchaseDate?: string;
  reviewDate: string; // ISO string
  photos: string[]; // URLs of genuinely uploaded photos
  longevity: 'Under 3 hours' | '3–5 hours' | '5–8 hours' | '8+ hours';
  projection: 'Soft' | 'Moderate' | 'Strong';
  sillage: 'Soft' | 'Moderate' | 'Strong';
  occasion: 'Daily' | 'Office' | 'Date Night' | 'Party' | 'Special Occasion';
  recommended: boolean;
  helpfulYes: number;
  helpfulNo: number;
  status: 'pending' | 'approved' | 'rejected';
  isDemo?: boolean; // Flagged true if rendering sample demo data during development
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: { [stars: number]: number };
  attributes: {
    longevity: number; // 1 to 5
    projection: number; // 1 to 5
    sillage: number; // 1 to 5
    packaging: number; // 1 to 5
    value: number; // 1 to 5
  };
}

export interface ExperienceStats {
  packaging: number;
  delivery: number;
  customerService: number;
}
