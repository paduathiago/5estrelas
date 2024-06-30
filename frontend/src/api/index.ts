import { EstablishmentType, Review } from "@/backTypes";
import { establishment, establishments, reviews } from "./mocks";

export const fetchEstablishment = async (id?: string): Promise<EstablishmentType> => {

  return new Promise((resolve) => {
    setTimeout(() => {

      const foundEstablishment = establishments.find(e => e.id === id);

      if (foundEstablishment) {
        resolve(foundEstablishment);
      }
      resolve(establishment);
    }, 500);
  });
};


export const fetchEstablishments = async (): Promise<EstablishmentType[]> => {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(establishments);
    }, 500);
  });
};

export const getReviews = async (id?: string): Promise<Review[]> => {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reviews);
    }, 500);
  });
};


export const createEstablishment = async (input: any): Promise<EstablishmentType> => {

  console.log("created: ", input);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(establishment);
    }, 500);
  });
};


export const updateFeedback = async (userId: string, reviewId: string, feedback?: 'LIKE' | 'DISLIKE'): Promise<EstablishmentType> => {

  console.log("updating feedback: ", userId, reviewId, feedback);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(establishment);
    }, 500);
  });
};


export const answerReview = async ( reviewId: string, comment: string): Promise<void> => {

  console.log("updating feedback: ", reviewId, comment);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export const favouriteEstablishment = async ( establishmentId: string, favVal: boolean): Promise<void> => {

  console.log("updating favourite:", establishmentId, favVal);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};




export const login = async (email: string, password: string): Promise<void> => {
  console.log("login: ", email, password);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}