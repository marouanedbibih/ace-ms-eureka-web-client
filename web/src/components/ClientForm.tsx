import * as React from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useClientContext } from "../contexts/ClientProvider";
import {
  createClientAPI,
  fetchClientByIdAPI,
  updateClientAPI,
} from "../services/ClientService";

export function ClientForm() {
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const { request, setRequest, clientId, setClientId } = useClientContext();
  const { isFormOpen, toggleForm,closeForm,fetchClients } = useClientContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientId) {
      updateClient();
    } else {
      createClient();
    }
  };

  const createClient = () => {
    setLoading(true);
    createClientAPI(request)
      .then((data) => {
        console.log("Client created:", data);
        setRequest({ name: "", age: 0 });
        toggleForm(); // Close modal after
        fetchClients(); // Fetch clients after creation
      })
      .catch((error) => {
        console.error("Error creating client:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateClient = () => {
    setLoading(true);
    if (clientId === null) {
      throw new Error("Client ID is required to update client");
    }
    updateClientAPI(clientId, request)
      .then((data) => {
        console.log("Client updated:", data);
        setClientId(null);
        setRequest({ name: "", age: 0 });
        toggleForm(); // Close modal after
        fetchClients(); // Fetch clients after update
      })
      .catch((error) => {
        console.error("Error updating client:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchClientById = (id: number) => {
    setFormLoading(true);
    fetchClientByIdAPI(id)
      .then((data) => {
        console.log("Client fetched:", data);
        setRequest(data);
      })
      .catch((error) => {
        console.error("Error fetching client:", error);
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  React.useEffect(() => {
    if (clientId) {
      fetchClientById(clientId);
    }
  }, [clientId]);

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
              {clientId ? "Edit Client" : "Create Client"}
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
                    Name
                  </Typography>
                  <Input
                    size="lg"
                    value={request.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRequest({ ...request, name: e.target.value });
                    }}
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Age
                  </Typography>
                  <Input
                    size="lg"
                    value={request.age}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRequest({
                        ...request,
                        age: parseInt(e.target.value, 10),
                      });
                    }}
                    placeholder="Enter client age"
                    type="number"
                  />
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
                    : clientId
                    ? "Update Client"
                    : "Create Client"}
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
