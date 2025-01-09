import { IClient } from "./client";

// Represents the Car Data Transfer Object (DTO)
export interface ICar {
    id: number;
    marque: string;
    matricule: string;
    model: string;
    client: IClient; // References the associated client
  }
  
  // Represents the Car Request Object (REQ)
  export interface ICarREQ {
    marque: string;
    matricule: string;
    model: string;
    clientId: number | null; // References the ID of the associated client
  }