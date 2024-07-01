export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  }
  
  export type EstablishmentType = {
    id: string;
    name: string;
    address: string;
    category: string;
    description: string;
    rating: number;
    mainImage: string;
    images: string;
  }
  
  export type Review = {
    id: string;
    userId: string;
    establishmentId: string;
    userImage?: string;
    userName: string;
    rating: number;
    comment?: string;
    establishmentComment?: string;
    timestamp: Date;
    likes: number;
    dislikes: number;
    currentUserFeedback: 'LIKE' | 'DISLIKE' | undefined;
  }
  
  export type ReviewFeedback = {
    userId: string;
    reviewId: string;
    feedback: 'LIKE' | 'DISLIKE';
  }