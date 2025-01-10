import LineaAccion from "../components/card-lineas-accion";

export default function LineasAccion() {
  const data = [
    
      {
        titulo: { nombre: "Línea de Acción 1.1.1.1", descripcion: "Adopción del Manifiesto de No conflicto de Intereses en los procesos de contratación de todas las instancias que forman parte del Sistema Anticorrupción del Estado de Coahuila."} ,
        datos: [
        { title: "Prioridad 1", content: "Promover el diseño e implementación de lineamientos para prevenir conflictos de interés." },
        { title: "Objetivo 1.1", content: " Prevenir conflictos de interés durante el proceso de contratación de servidores públicos." },
        { title: "Estrategia 1.1.1", content: " Incrementar la vigilancia por parte de las instituciones públicas para el cumplimiento de la presentación del Manifiesto de No Conflicto de Intereses." },
        { title: "Acción a Realizar", content: "Presentación del pronunciamiento de adopción del Manifiesto de No Conflicto de Intereses." },
        { title: "Evidencia a entregar", content: "Pronunciamiento de adopción por institución." },
      ]},
    
      {
        titulo: { nombre: "Línea de Acción 1.1.1.2", descripcion: " Implementación de la obligatoriedad en la presentación del Manifiesto de No conflicto de Intereses en el proceso de contratación de servidores públicos en todas las entidades del estado."} ,
        datos: [
        { title: "Prioridad 1", content: "Promover el diseño e implementación de lineamientos para prevenir conflictos de interés." },
        { title: "Objetivo 1.1", content: " Prevenir conflictos de interés durante el proceso de contratación de servidores públicos." },
        { title: "Estrategia 1.1.1", content: " Incrementar la vigilancia por parte de las instituciones públicas para el cumplimiento de la presentación del Manifiesto de No Conflicto de Intereses." },
        { title: "Acción a Realizar", content: "Presentación de oficio con la cantidad del personal que cumple con la presentación del manifiesto de no conflicto de intereses emitido por el OIC." },
        { title: "Evidencia a entregar", content: "Oficio con cantidad de personal que cumple." },
      ]},
      {
        titulo: { nombre: "Línea de Acción 1.1.1.3", descripcion: " Implementación de la obligatoriedad en la presentación del Manifiesto de No conflicto de Intereses en el proceso de contratación de servidores públicos en todas las entidades del estado."} ,
        datos: [
        { title: "Prioridad 1", content: "Promover el diseño e implementación de lineamientos para prevenir conflictos de interés." },
        { title: "Objetivo 1.1", content: " Prevenir conflictos de interés durante el proceso de contratación de servidores públicos." },
        { title: "Estrategia 1.1.1", content: " Incrementar la vigilancia por parte de las instituciones públicas para el cumplimiento de la presentación del Manifiesto de No Conflicto de Intereses." },
        { title: "Acción a Realizar", content: "Presentación de oficio con la cantidad del personal que cumple con la presentación del manifiesto de no conflicto de intereses emitido por el OIC." },
        { title: "Evidencia a entregar", content: "Oficio con cantidad de personal que cumple." },
      ]},
    
  ]


  return (

    <div>
    <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 p-2 bg-slate-150">
 
  { data.map( (item, index) =>
   ( <div key={index} className="lg:col-span-12 col-span-6">
    <hr className="m-6"/>
      <LineaAccion data={item}/>
      
    </div>
    
  )
  ) 
    }

  </div>
    </div>

  );
}