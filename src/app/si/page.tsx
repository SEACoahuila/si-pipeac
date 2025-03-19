'use client'

import { Title } from "../admin/components/title";
import { ProgressTable } from "./components/table-avance";
import usePrioridadesStore, { configStore } from '@/app/store/generalStore'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


export default function LandingPage() {
  // const token = configStore((state) => state.pretoken)
    const router = useRouter();
  
  const trimestre = 1
  const { prioridades, getPrioridades } = usePrioridadesStore();
  const {user } = configStore()
  const [isHydrated, setIsHydrated] = useState(false); 
  
  
  useEffect(() => {
    setIsHydrated(true); // Marcamos como hidratado después del primer render
  }, []);
  
  useEffect(() => {

  
      getPrioridades()

  }, [trimestre])

  useEffect(() => { 
    if (!isHydrated) return;
    if (!user || user.entidad.nombre_entidad === "SEA") {
      router.push('/') 
    }
    getPrioridades()
  }   , [user, isHydrated])

  if (!prioridades) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-center items-center mt-10">
        <Title title={"Prioridades Estratégicas"} />
       < ProgressTable  datos={prioridades.Prioridades} />
        


      <h2></h2>
    </div>
  );
}