export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type Establishment = {
  id: string;
  name: string;
  address: string;
  category: string;
  description: string;
  rating: number;
}

export type Review = {
  likes: number;
  dislikes: number;
  id: string;
  userId: string;
  establishmentId: string;
  rating: number;
  comment?: string;
  timestamp: Date;
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