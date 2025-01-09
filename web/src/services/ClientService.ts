import { IClient, IClientREQ } from "../types/client";
import axiosInstance from "../utils/axios";

// Service to fetch list of clients
export const fetchClientsAPI = async (): Promise<IClient[]> => {
  try {
    const response = await axiosInstance.get("/clients");
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Error fetching clients");
  }
};

// Service to Create a new client
export const createClientAPI = async (req: IClientREQ): Promise<IClient> => {
  try {
    const response = await axiosInstance.post("/client", req);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw new Error("Error creating client");
  }
};

// Service to update an existing client
export const updateClientAPI = async (
  clientId: number,
  req: IClientREQ
): Promise<IClient> => {
  try {
    const response = await axiosInstance.put(`/client/${clientId}`, req);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw new Error("Error updating client");
  }
};

// Service to fetch client by id
export const fetchClientByIdAPI = async (
  clientId: number
): Promise<IClient> => {
  try {
    const response = await axiosInstance.get(`/client/${clientId}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    throw new Error("Error fetching client by ID");
  }
};

// Service to delete a client
export const deleteClientAPI = async (clientId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/client/${clientId}`);
    console.log("Client deleted:", clientId);
  } catch (error) {
    console.error("Error deleting client:", error);
    throw new Error("Error deleting client");
  }
};
