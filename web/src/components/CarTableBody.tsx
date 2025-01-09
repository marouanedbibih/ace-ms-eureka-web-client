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
import { ICar } from "../types/car";
import { useCarContext } from "../contexts/CarProvider";

export function CarTableBody() {
  const headers = ["Marque", "Matricule", "Model", "Client", "Actions"];

  const { setCarId, setDeleteCarId } = useCarContext();
  const { toggleForm, toggleDeleteModal } = useCarContext();
  const { cars, loading, fetchCars } = useCarContext();

  React.useEffect(() => {
    fetchCars();
  }, []);

  // View Car function
  const viewCar = (carId: number) => {
    console.log("Viewing car with ID:", carId);
    // Redirect or open a modal to view the car details by ID
  };

  // Edit Car function
  const editCar = (carId: number) => {
    console.log("Editing car with ID:", carId);
    setCarId(carId);
    toggleForm();
  };

  // Delete Car function
  const deleteCar = (carId: number) => {
    console.log("Deleting car with ID:", carId);
    setDeleteCarId(carId);
    toggleDeleteModal();
  };

  return (
    <CardBody className="px-0 bg-white shadow-lg rounded-lg">
      {loading && (
        <div className="flex justify-center items-center py-4">
          <Spinner />
        </div>
      )}
      {cars.length === 0 && !loading && (
        <div className="flex justify-center items-center py-4">
          <Typography variant="h6" color="gray" className="font-normal">
            No data available
          </Typography>
        </div>
      )}
      {cars.length > 0 && (
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
            {cars.map((car: ICar, index) => {
              const isLast = index === cars.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={car.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {car.marque}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {car.matricule}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {car.model}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {car.client.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex justify-start gap-2">
                      <Tooltip content="View Car">
                        <IconButton
                          variant="text"
                          onClick={() => viewCar(car.id)}
                        >
                          <EyeIcon className="h-4 w-4 text-blue-500" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Edit Car">
                        <IconButton
                          variant="text"
                          onClick={() => editCar(car.id)}
                        >
                          <PencilIcon className="h-4 w-4 text-green-500" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete Car">
                        <IconButton
                          variant="text"
                          onClick={() => deleteCar(car.id)}
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
