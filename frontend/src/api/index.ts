import { EstablishmentType } from "@/backTypes";
import { establishment } from "./mocks";

export const fetchEstablishment = async (id: string): Promise<EstablishmentType> => {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(establishment);
      }, 500);
    });
  };
  