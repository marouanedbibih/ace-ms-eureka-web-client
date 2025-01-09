import * as React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Spinner,
  Select,
  Option,
} from "@material-tailwind/react";
import { useCarContext } from "../contexts/CarProvider"; // Use CarProvider context
import {
  createCarAPI,
  fetchCarByIdAPI,
  updateCarAPI,
} from "../services/CarService"; // Assume similar service methods for Car
import { fetchClientsAPI } from "../services/ClientService"; // Import the fetchClientsAPI
import { IClient } from "../types/client";

export function CarForm() {
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [clients, setClients] = useState<IClient[]>([]); // State to store the fetched clients
  const { request, setRequest, carId, setCarId } = useCarContext(); // Use CarContext
  const { isFormOpen, toggleForm, closeForm, fetchCars } = useCarContext(); // Use CarContext

  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
  }, []);

  // Fetch clients from the API
  const fetchClients = async () => {
    try {
      const clientsData = await fetchClientsAPI();
      setClients(clientsData);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (carId) {
      updateCar();
    } else {
      createCar();
    }
  };

  const createCar = () => {
    setLoading(true);
    createCarAPI(request)
      .then((data) => {
        console.log("Car created:", data);
        setRequest({ marque: "", matricule: "", model: "", clientId: null });
        toggleForm(); // Close modal after
        fetchCars(); // Fetch cars after creation
      })
      .catch((error) => {
        console.error("Error creating car:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateCar = () => {
    setLoading(true);
    if (carId === null) {
      throw new Error("Car ID is required to update car");
    }
    updateCarAPI(carId, request)
      .then((data) => {
        console.log("Car updated:", data);
        setCarId(null);
        setRequest({ marque: "", matricule: "", model: "", clientId: null });
        toggleForm(); // Close modal after
        fetchCars(); // Fetch cars after update
      })
      .catch((error) => {
        console.error("Error updating car:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchCarById = (id: number) => {
    setFormLoading(true);
    fetchCarByIdAPI(id)
      .then((data) => {
        console.log("Car fetched:", data);
        setRequest({
            marque: data.marque,
            matricule: data.matricule,
            model: data.model,
            clientId: data.client.id,
        }); // Populate the form with the fetched car data
      })
      .catch((error) => {
        console.error("Error fetching car:", error);
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  React.useEffect(() => {
    if (carId) {
      fetchCarById(carId);
    }
  }, [carId]);

  return (
    <>
      <Dialog
        size="md"
        open={isFormOpen}
        handler={toggleForm}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[28rem]">
          <CardBody>
            <Typography variant="h4" color="blue-gray" className="text-center">
              {carId ? "Edit Car" : "Create Car"}
            </Typography>
            {formLoading ? (
              <div className="flex justify-center items-center h-32">
                <Spinner className="h-12 w-12 text-blue-500" />
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-6"
              >
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Marque
                  </Typography>
                  <Input
                    size="lg"
                    value={request.marque}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRequest({ ...request, marque: e.target.value });
                    }}
                    placeholder="Enter car marque"
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Matricule
                  </Typography>
                  <Input
                    size="lg"
                    value={request.matricule}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRequest({ ...request, matricule: e.target.value });
                    }}
                    placeholder="Enter car matricule"
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Model
                  </Typography>
                  <Input
                    size="lg"
                    value={request.model}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRequest({ ...request, model: e.target.value });
                    }}
                    placeholder="Enter car model"
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Select Client
                  </Typography>
                  <Select
                    label="Client"
                    value={request.clientId?.toString() || ""}
                    onChange={(value: string) => {
                      setRequest({ ...request, clientId: value ? parseInt(value, 10) : null });
                    }}
                  >
                    {clients.map((client) => (
                      <Option key={client.id} value={client.id.toString()}>
                        {client.name} {/* You can adjust this to show any identifier */}
                      </Option>
                    ))}
                  </Select>
                </div>
                <Button
                  type="submit"
                  variant="gradient"
                  className="mt-4"
                  fullWidth
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : carId
                    ? "Update Car"
                    : "Create Car"}
                </Button>
              </form>
            )}
          </CardBody>
          <CardFooter className="pt-4 flex justify-center">
            <Button
              variant="text"
              color="red"
              onClick={closeForm}
              className="mr-2"
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
