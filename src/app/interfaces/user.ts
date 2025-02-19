export interface Entidad {
    id_entidad: string;
    nombre_entidad: string;
    siglas: string;
  }
  
 export  interface User {
    id_usuario: string;
    nombre: string;
    correo: string;
    isActive: boolean;
    entidad: Entidad;
    token: string;
  }