import { Card } from "@material-tailwind/react";
import { CarForm } from "../components/CarForm";
import { CarTableBody } from "../components/CarTableBody";
import { CarTableHeader } from "../components/CarTableHeader";
import { CarProvider } from "../contexts/CarProvider";
import { DeleteCarModal } from "../components/DeleteCarModal";
import { SimpleNavbar } from "../components/SimpleNavbar";

export function CarPage() {
  return (
    <CarProvider>
      <div className="flex flex-col justify-center items-center p-16 pt-4 bg-blue-gray-50 gap-4">
        <SimpleNavbar />

        <Card className="h-full w-full">
          <CarTableHeader />
          <CarTableBody />
        </Card>
      </div>
      <CarForm />
      <DeleteCarModal />
    </CarProvider>
  );
}
