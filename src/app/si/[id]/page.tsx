"use client"
import Link from 'next/link'
import { Title } from "@/app/admin/components/title";
import LineaAccion from "../components/card-lineas-accion";
import { useParams } from "next/navigation";
import usePrioridadesStore from "@/app/store/generalStore";
import { useEffect } from "react";
import { TiArrowBack } from "react-icons/ti";





export default function LineasAccion() {

 const params = useParams< {id: string}>()
  const { prioridades, getPrioridades } = usePrioridadesStore();

  useEffect(() => {
    getPrioridades()
  }, [params])
  if (!prioridades) {
     
    return <p>Loading...</p>;
  }
  console.log(prioridades.Prioridades)

const prioriodadFiltrada = prioridades.Prioridades.filter( item => item.numero_prioridad === params.id)
const lineas = prioriodadFiltrada[0].lineas
  return (

    <div>
      <div className="bg-slate-800">
      <Link href="/si">
      <button 
      className=" flex ml-1 text-sm align-middle justify-center items-center p-1 rounded-lg hover:bg-slate-600 text-white"> <TiArrowBack size={30}
      />
      Prioridades Estratégicas</button>
      </Link>
      </div>
    
      <Title title="Líneas de Acción" text={"Prioridad Estratégica " + params.id}/>
    <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 p-2 bg-slate-150">
 

  { lineas.map( (item, index) =>
   ( <div key={index} className="lg:col-span-12 col-span-6">
    
    <hr className="m-6"/>
      <LineaAccion  linea={item} />
      
    </div>
    
  )
  ) 
    }


  </div>
    </div>

  );
}