export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  }
  
  export type Etablishment = {
    id: string;
    name: string;
    address: string;
    category: string;
    description: string;
    rating: number;
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