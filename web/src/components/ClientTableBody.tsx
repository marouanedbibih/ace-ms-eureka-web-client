/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { PencilIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid"; // Add EyeIcon and TrashIcon
import {
  Typography,
  CardBody,
  IconButton,
  Tooltip,
  Spinner,
} from "@material-tailwind/react";
import { IClient } from "../types/client";
import { useClientContext } from "../contexts/ClientProvider";

export function ClientTableBody() {
  const headers = ["Name", "Age", "Actions"];

  const { setClientId, setDeleteClientId } = useClientContext();
  const { toggleForm, toggleDeleteModal } = useClientContext();
  const { clients, loading, fetchClients } = useClientContext();

  React.useEffect(() => {
    fetchClients();
  }, []);

  // View Client function
  const viewClient = (clientId: number) => {
    console.log("Viewing client with ID:", clientId);
    // Redirect or open a modal to view the client details by ID
  };

  // Edit Client function
  const editClient = (clientId: number) => {
    console.log("Editing client with ID:", clientId);
    setClientId(clientId);
    toggleForm();
  };

  // Delete Client function
  const deleteClient = (clientId: number) => {
    console.log("Deleting client with ID:", clientId);
    setDeleteClientId(clientId);
    toggleDeleteModal();
  };

  return (
    <CardBody className="px-0 bg-white shadow-lg rounded-lg">
      {loading && (
        <div className="flex justify-center items-center py-4">
          <Spinner />
        </div>
      )}
      {clients.length === 0 && !loading && (
        <div className="flex justify-center items-center py-4">
          <Typography variant="h6" color="gray" className="font-normal">
            No data available
          </Typography>
        </div>
      )}
      {clients.length > 0 && (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {headers.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients.map((client: IClient, index) => {
              const isLast = index === clients.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={client.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {client.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {client.age}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex justify-start gap-2">
                      <Tooltip content="View User">
                        <IconButton
                          variant="text"
                          onClick={() => viewClient(client.id)}
                        >
                          <EyeIcon className="h-4 w-4 text-blue-500" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Edit User">
                        <IconButton
                          variant="text"
                          onClick={() => editClient(client.id)}
                        >
                          <PencilIcon className="h-4 w-4 text-green-500" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete User">
                        <IconButton
                          variant="text"
                          onClick={() => deleteClient(client.id)}
                        >
                          <TrashIcon className="h-4 w-4 text-red-500" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </CardBody>
  );
}
