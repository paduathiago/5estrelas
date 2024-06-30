import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { EstablishmentType, Review } from "@/backTypes";
import { establishment, establishments, reviews } from "./mocks";
import { Cookies } from 'react-cookie'
const cookies = new Cookies();


const API_URL = 'http://localhost:3000';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  const token = cookies.get("AuthToken");
  config.headers["Authorization"] = token;
  return config;
});


export const fetchEstablishment = async (id?: string): Promise<EstablishmentType> => {
  try {
    const response = await api({
      method: 'get',
      url: '/establishments/' + id,
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
  try {
    const response = await api({
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
    const response = await api({
      method: 'get',
      url: 'http://localhost:3000/establishments',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching establishments:', error);
    throw error;
  }
};


type SignupInput = {
  name: string,
  password: string,
  image: string,
  email: string
}

export const signup = async (input: SignupInput): Promise<{ token: string }> => {
  try {
    const response = await api({
      method: 'post',
      url: 'http://localhost:3000/user/signup',
      data: input
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error in sign up:', error);
    throw error;
  }
};

type LoginInput = {
  password: string,
  email: string
}

export const login = async (input: LoginInput): Promise<{ token: string }> => {
  try {
    const response = await api({
      method: 'post',
      url: 'http://localhost:3000/user/login',
      data: input
    });
    return response.data;
  } catch (error) {
    console.error('Error in login:', error);
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
