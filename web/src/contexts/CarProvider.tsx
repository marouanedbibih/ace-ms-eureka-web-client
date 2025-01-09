/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { createContext, useState, useContext, ReactNode } from "react";
import { ICar, ICarREQ } from "../types/car";
import { fetchCarsAPI } from "../services/CarService";

// Define the shape of the context
interface CarContextType {
  cars: ICar[];
  setCars: (cars: ICar[]) => void;
  request: ICarREQ;
  setRequest: (request: ICarREQ) => void;
  carId: number | null;
  setCarId: (carId: number | null) => void;
  isFormOpen: boolean;
  setFormOpen: (isFormOpen: boolean) => void;
  toggleForm: () => void;
  closeForm: () => void;
  isDeleteModalOpen: boolean;
  setDeleteModalOpen: (isDeleteModalOpen: boolean) => void;
  deleteCarId: number | null;
  setDeleteCarId: (deleteCarId: number | null) => void;
  toggleDeleteModal: () => void;
  closeDeleteModal: () => void;

  // Add loading state
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchCars: () => void;
}

// Create context
const CarContext = createContext<CarContextType | undefined>(undefined);

// Create a provider component
export const CarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [request, setRequest] = useState<ICarREQ>({
    marque: "",
    matricule: "",
    model: "",
    clientId: null,
  });

  const [carId, setCarId] = useState<number | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);

  // Toggle form open/close
  const toggleForm = () => {
    setFormOpen(!isFormOpen);
  };

  const closeForm = () => {
    setFormOpen(false);
    setCarId(null);
    setRequest({ marque: "", matricule: "", model: "", clientId: null });
  };

  // Delete Modal
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCarId, setDeleteCarId] = useState<number | null>(null);

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteCarId(null);
  };

  // Fetch Loading
  const [loading, setLoading] = useState(false);

  const fetchCars = () => {
    setLoading(true);
    fetchCarsAPI()
      .then((data) => {
        setCars(data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        setCars,
        request,
        setRequest,
        carId,
        setCarId,
        isFormOpen,
        setFormOpen,
        toggleForm,
        closeForm,
        isDeleteModalOpen,
        setDeleteModalOpen,
        deleteCarId,
        setDeleteCarId,
        toggleDeleteModal,
        closeDeleteModal,
        loading,
        setLoading,
        fetchCars,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

// Custom hook to access car context
export const useCarContext = (): CarContextType => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCarContext must be used within a CarProvider");
  }
  return context;
};
