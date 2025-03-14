import GeneralBarChart from "./components/generalBarChart";
import GeneralBarPrioridades from "./components/generalBarPrioridades";
import { Title } from "./components/title";

export default function AdminPage() {

    
  return (
    <div className="">

<Title title="Panel general" text="Datos" />
  
     <GeneralBarChart />
    <GeneralBarPrioridades />
      

    </div>
  );
}