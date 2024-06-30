import { EstablishmentType } from "@/backTypes";
import { establishment, establishments } from "./mocks";

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


export const createEstablishment = async (input: any): Promise<EstablishmentType> => {

  console.log("created: ", input);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(establishment);
    }, 500);
  });
};


export const login = async(email: string, password: string): Promise<void> => {
  console.log("login: ", email, password);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}