import * as React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { useClientContext } from "../contexts/ClientProvider";
import { deleteClientAPI } from "../services/ClientService";

export function DeleteClientModal() {
  const {
    isDeleteModalOpen,
    closeDeleteModal,
    deleteClientId,
    toggleDeleteModal,
    fetchClients,
  } = useClientContext();

  const [loading, setLoading] = React.useState(false);

  const onDelete = () => {
    setLoading(true);
    if (deleteClientId === null) {
      throw new Error("Client ID is required to delete client");
    }
    deleteClientAPI(deleteClientId)
      .then((data) => {
        console.log("Client deleted:", data);
        fetchClients(); // Fetch clients after deletion
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
      })
      .finally(() => {
        setLoading(false);
        closeDeleteModal(); // Close the modal after the spinner completes
      });
  };

  const handleConfirmDelete = () => {
    onDelete(); // Trigger the delete logic
  };

  return (
    <Dialog open={isDeleteModalOpen} handler={toggleDeleteModal}>
      <DialogHeader>Confirm Delete</DialogHeader>
      <DialogBody>
        Are you sure you want to delete this client? This action cannot be
        undone.
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="gray"
          onClick={closeDeleteModal}
          className="mr-1"
          disabled={loading} // Disable the cancel button while loading
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="red"
          onClick={handleConfirmDelete}
          disabled={loading} // Prevent multiple clicks during loading
        >
          {loading ? (
            <Spinner size="sm" color="white" />
          ) : (
            <span>Delete</span>
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
