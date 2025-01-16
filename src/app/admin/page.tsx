import GeneralBarChart from "./components/generalBarChart";
import { Title } from "./components/title";

export default function AdminPage() {

    
  return (
    <div className="">

<Title title="Panel general" text="Datos" />
  
     <GeneralBarChart />
      
    
      <ol>
        <li>
            Entindades avance TABLA
        </li>
        <li>
            Boton elegir el periodo
        </li>
        <li>
            Boton descargar reporte avance
        </li>
      </ol>
    </div>
  );
}