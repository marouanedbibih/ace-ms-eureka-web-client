/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { createContext, useState, useContext, ReactNode } from "react";
import { IClient, IClientREQ } from "../types/client";
import { fetchClientsAPI } from "../services/ClientService";

// Define the shape of the context
interface ClientContextType {
  clients: IClient[];
  setClients: (clients: IClient[]) => void;
  request: IClientREQ;
  setRequest: (request: IClientREQ) => void;
  clientId: number | null;
  setClientId: (clientId: number | null) => void;
  isFormOpen: boolean;
  setFormOpen: (isFormOpen: boolean) => void;
  toggleForm: () => void;
  closeForm: () => void;
  isDeleteModalOpen: boolean;
  setDeleteModalOpen: (isDeleteModalOpen: boolean) => void;
  deleteClientId: number | null;
  setDeleteClientId: (deleteClientId: number | null) => void;
  toggleDeleteModal: () => void;
  closeDeleteModal: () => void;

  // Add loading state
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchClients: () => void;
}

// Create context
const ClientContext = createContext<ClientContextType | undefined>(undefined);

// Create a provider component
export const ClientProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [request, setRequest] = useState<IClientREQ>({
    name: "",
    age: 0,
  });

  const [clientId, setClientId] = useState<number | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);

  // Toggle form open/close
  const toggleForm = () => {
    setFormOpen(!isFormOpen);
  };

  const closeForm = () => {
    setFormOpen(false);
    setClientId(null);
    setRequest({ name: "", age: 0 });
  };

  // Delete Modal
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState<number | null>(null);

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteClientId(null);
  };

  // Fetch Londing
  const [loading, setLoading] = useState(false);

  const fetchClients = () => {
    setLoading(true);
    fetchClientsAPI()
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        setClients,
        request,
        setRequest,
        clientId,
        setClientId,
        isFormOpen,
        setFormOpen,
        toggleForm,
        closeForm,
        isDeleteModalOpen,
        setDeleteModalOpen,
        deleteClientId,
        setDeleteClientId,
        toggleDeleteModal,
        closeDeleteModal,
        loading,
        setLoading,
        fetchClients,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

// Custom hook to access client context
export const useClientContext = (): ClientContextType => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
};
