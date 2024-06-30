import axios from 'axios';
import { EstablishmentType, Review } from "@/backTypes";
import { establishment, establishments, reviews } from "./mocks";

const API_URL = 'http://localhost:3000';

export const fetchEstablishment = async (id?: string): Promise<EstablishmentType> => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3000/establishments/' + id,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching establishment:', error);
    throw error;
  }
};

type CreateEstablishmentInput = {
  name: string,
  address: string,
  category: string,
  description: string,
}

export const createEstablishment = async (input: CreateEstablishmentInput): Promise<EstablishmentType | undefined> => {
  console.log(input)
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/establishments',
      data: input
    });
    return response.data;
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.error('Error creating establishment:', error.message);
    throw error;
  }
};

export const fetchEstablishments = async (): Promise<EstablishmentType[]> => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3000/establishments',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching establishments:', error);
    throw error;
  }
};

export const getReviews = async (id?: string): Promise<Review[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reviews);
    }, 500);
  });
};


export const updateFeedback = async (userId: string, reviewId: string, feedback?: 'LIKE' | 'DISLIKE'): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export const answerReview = async (reviewId: string, comment: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export const favouriteEstablishment = async (establishmentId: string, favVal: boolean): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export const login = async (email: string, password: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};