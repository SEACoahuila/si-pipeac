'use client'

import { Title } from "../admin/components/title";
import { ProgressTable } from "./components/table-avance";
import usePrioridadesStore, { configStore } from '@/app/store/generalStore'
import { useEffect } from "react";


export default function LandingPage() {
  // const token = configStore((state) => state.pretoken)
  const trimestre = configStore((state) => state.trimestre)
  const { prioridades, getPrioridades } = usePrioridadesStore();

  
  useEffect(() => {
    getPrioridades()
  }, [trimestre])

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