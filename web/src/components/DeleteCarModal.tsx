import * as React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { useCarContext } from "../contexts/CarProvider"; // Use CarProvider context
import { deleteCarAPI } from "../services/CarService"; // CarService for car deletion

export function DeleteCarModal() {
  const {
    isDeleteModalOpen,
    closeDeleteModal,
    deleteCarId,
    toggleDeleteModal,
    fetchCars,
  } = useCarContext(); // Use car context

  const [loading, setLoading] = React.useState(false);

  const onDelete = () => {
    setLoading(true);
    if (deleteCarId === null) {
      throw new Error("Car ID is required to delete car");
    }
    deleteCarAPI(deleteCarId) // API call to delete car
      .then((data) => {
        console.log("Car deleted:", data);
        fetchCars(); // Fetch cars after deletion
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
      })
      .finally(() => {
        setLoading(false);
        closeDeleteModal(); // Close the modal after deletion
      });
  };

  const handleConfirmDelete = () => {
    onDelete(); // Trigger the delete logic
  };

  return (
    <Dialog open={isDeleteModalOpen} handler={toggleDeleteModal}>
      <DialogHeader>Confirm Delete</DialogHeader>
      <DialogBody>
        Are you sure you want to delete this car? This action cannot be undone.
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
