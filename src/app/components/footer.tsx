import React from "react";

export const Footer: React.FC = () => {
  return (
    <div className="w-full shadow bg-slate-800  sticky top-[100vh] mt-10 ">
      <footer className="flex items-center justify-center bg-slate-800 text-center dark:bg-slate-800 lg:text-left  ">
        <div className=" p-4 text-center text-surface ml-8 text-white" >
       Contacto: <span className=" text-cyan-500">soporte.monitor@seacoahuila.org.mx</span>
       <div>Telefono: <span className=" text-cyan-500">(844) 688 2178 </span></div>
       <div>© 2025 Copyright: SEA Coahuila</div>
          
        </div>
        
 
      </footer>
    </div>
  );
};

export default Footer;
