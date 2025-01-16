import { Datatable } from "../components/datatable";
import { NewUserFrom } from "../components/newUserFrom";
import { Title } from "../components/title";

export default function UsuariosPage() {
  return (
    <div >
       <Title title="Usuarios" text="Datos " />
      <Datatable />
       <NewUserFrom />
      
    </div>
  );
}