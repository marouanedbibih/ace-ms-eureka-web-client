import {
    CardHeader,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
  import { MagnifyingGlassIcon, TruckIcon } from "@heroicons/react/24/outline"; // CarIcon for Add Car
  import { useCarContext } from "../contexts/CarProvider"; // Use CarProvider context
  
  export function CarTableHeader() {
    const { toggleForm } = useCarContext(); // Use CarProvider context
    return (
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Car List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage your cars here.
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                placeholder="Search cars..."
              />
            </div>
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={toggleForm} // Trigger form toggle to add a new car
            >
              <TruckIcon strokeWidth={2} className="h-4 w-4" /> Add Car
            </Button>
          </div>
        </div>
      </CardHeader>
    );
  }
  