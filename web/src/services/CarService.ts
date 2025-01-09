import { ICar, ICarREQ } from "../types/car";
import axiosInstance from "../utils/axios";

// Service to fetch list of cars
export const fetchCarsAPI = async (): Promise<ICar[]> => {
  try {
    const response = await axiosInstance.get("/cars");
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw new Error("Error fetching cars");
  }
};

// Service to fetch car by ID
export const fetchCarByIdAPI = async (carId: number): Promise<ICar> => {
  try {
    const response = await axiosInstance.get(`/car/${carId}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    throw new Error("Error fetching car by ID");
  }
};

// Service to create a new car
export const createCarAPI = async (req: ICarREQ): Promise<ICar> => {
  try {
    const response = await axiosInstance.post("/car", req);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating car:", error);
    throw new Error("Error creating car");
  }
};

// Service to update an existing car
export const updateCarAPI = async (
  carId: number,
  req: ICarREQ
): Promise<ICar> => {
  try {
    const response = await axiosInstance.put(`/car/${carId}`, req);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating car:", error);
    throw new Error("Error updating car");
  }
};

// Service to delete a car
export const deleteCarAPI = async (carId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/car/${carId}`);
    console.log("Car deleted:", carId);
  } catch (error) {
    console.error("Error deleting car:", error);
    throw new Error("Error deleting car");
  }
};
