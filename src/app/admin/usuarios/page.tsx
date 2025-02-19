'use client'
import { configStore } from "@/app/store/generalStore";
import { Datatable } from "../components/datatable";
import { NewUserFrom } from "../components/newUserFrom";
import { Title } from "../components/title";

export default function UsuariosPage() {
  const user = configStore((state) => state.user);
  if (!user) {
    return null;
  }


  return (
    <div >
       <Title title="Usuarios" text="Datos" />
       <NewUserFrom />
      <Datatable />
      
    </div>
  );
}