import { CardVariables } from "../components/cardVariables";
import { Title } from "../components/title";


const institutionData = {
  name: "Municipio de *******",
  variables: [
    { name: "Variable 1", progress: 75 },
    { name: "Variable 2", progress: 50 },
    { name: "Variable 3", progress: 90 },
    { name: "Variable 4", progress: 60 },
    { name: "Variable 1", progress: 75 },
    { name: "Variable 2", progress: 50 },
    { name: "Variable 3", progress: 90 },
    { name: "Variable 4", progress: 60 },
    { name: "Variable 1", progress: 75 },
    { name: "Variable 2", progress: 50 },
    { name: "Variable 3", progress: 90 },
    { name: "Variable 4", progress: 60 },
  ],
};
export default function InstitucionesPage() {
  return (
    <div>
      <Title title="Instituciones" text="Creación de nueva institución y detalles de avance " />
      <h1>Admin page</h1>
      <ul>
        <li>
          Crear usuario nueva institucion
        </li>
        <li>
          Mis instituciones
        </li>
      </ul>
      <div className="p-5 bg-slate-700 text-center text-2xl text-white font-bold ">
      <p>Datos instituciones</p>
      <div className=" grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 ">
       
       <div className="p-6 ">
       <CardVariables name={institutionData.name} variables={institutionData.variables} />
     </div>
     <div className="p-6 ">
       <CardVariables name={institutionData.name} variables={institutionData.variables} />
     </div>
     <div className="p-6 ">
       <CardVariables name={institutionData.name} variables={institutionData.variables} />
     </div>
     <div className="p-6 ">
       <CardVariables name={institutionData.name} variables={institutionData.variables} />
     </div>
     <div className="p-6 ">
       <CardVariables name={institutionData.name} variables={institutionData.variables} />
     </div>
     
       </div>
      </div>
      
    </div>
  );
}