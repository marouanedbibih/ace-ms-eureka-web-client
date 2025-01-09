import { Card } from "@material-tailwind/react";
import { ClientForm } from "../components/ClientForm";
import { ClientTableBody } from "../components/ClientTableBody";
import { ClientTableHeader } from "../components/ClientTableHeader";
import { ClientProvider } from "../contexts/ClientProvider";
import { DeleteClientModal } from "../components/DeleteClientModal";
import { SimpleNavbar } from "../components/SimpleNavbar";

export function ClientPage() {
  return (
    <ClientProvider>
      <div className="flex flex-col justify-center items-center p-16 pt-4 gap-4 bg-blue-gray-50">
        <SimpleNavbar />

        <Card className="h-full w-full">
          <ClientTableHeader />
          <ClientTableBody />
        </Card>
      </div>
      <ClientForm />
      <DeleteClientModal />
    </ClientProvider>
  );
}
