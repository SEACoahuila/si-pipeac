export interface Usuario {
    id_usuario: string;
    nombre: string;
    correo: string;
    isActive: boolean;
    entidad: {
      id_entidad: string;
      nombre_entidad: string;
      siglas: string;
    };
    rol: {
      id_rol: string;
      nombre_rol: string;
      acronimo_rol: string;
    };
  }
  
  export interface Linea {
    id_prioridad: string;
    numero_la: string;
    numero_prioridad: string;
    prioridad: string;
    objetivo: string;
    estrategia: string;
    linea_de_accion: string;
    accion_a_realizar: string;
    evidencia_necesaria: string;
    cumplimientos: object[]; // Puedes definir una interfaz más específica si es necesario
  }
  
  export interface Prioridad {
    numero_prioridad: string;
    datos: {
      lineNumber: number;
      progress: number;
      totalLines: number;
      completedLines: number;
      remainingLines: number;
    };
    lineas: Linea[];
  }
  
  export interface Data {
    usuario: Usuario;
    id: string;
    Prioridades: Prioridad[];
  }