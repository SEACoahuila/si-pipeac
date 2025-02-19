export interface Totales {
  total_registros: number;
  con_cumplimiento: number;
  sin_cumplimiento: number;
  porcentaje_avance: number;
}

export interface Prioridad {
  numero_prioridad: string;
  total_registros: number;
  con_cumplimiento: number;
  sin_cumplimiento: number;
  porcentaje_avance: number;
}

export interface Entidad {
  nombre_entidad: string;
  totales: Totales;
  prioridades: Prioridad[];
}