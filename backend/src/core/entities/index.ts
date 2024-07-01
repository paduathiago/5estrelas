export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  favoriteEstablishments: string[];
}

export type Establishment = {
  id: string;
  name: string;
  address: string;
  category: string;
  description: string;
  rating: number;
  numberOfReviews: number;
  userId: string;
  workingHours: string;
  daysOpen: string;
  phone: string;
  mainImage: string;
  images: string;
}


export type Review = {
  id: string;
  userId: string;
  establishmentId: string;
  rating: number;
  comment?: string;
  timestamp: Date;
  likes: number;
  dislikes: number;
}

export type ReviewFeedback = {
  userId: string;
  reviewId: string;
  feedback: 'LIKE' | 'DISLIKE';
}

export type Comment = {
  id: string;
  reviewId: string;
  comment: string;
  timestamp: Date;
}