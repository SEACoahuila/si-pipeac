'use client'
import Image from 'next/image';
import { configStore } from '../store/generalStore';
import { IoMdLogOut } from 'react-icons/io';
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const user = configStore((state) => state.user);
  const logout = configStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="relative flex w-full flex-wrap items-center justify-between bg-gradient-to-r from-slate-800 to-slate-700 shadow-lg border-b-2 border-slate-500">
      <div className="flex w-full flex-wrap items-center justify-between px-6 py-3">
        <div className='flex align-middle items-center'>
          <a className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0 text-white hover:text-blue-300 transition-colors duration-300" href="#">
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/transparenciaseac.appspot.com/o/I7kmevbBVPO8yR9G0mK9%2FkyYlvOBrjgH7F3p5TbcE%2FLogo%20PIPEAC%20(1).png?alt=media&token=9fd126ab-9790-4e2a-935a-a117ee6a2d15" 
              width={65}
              height={65}
              alt="PIPEAC"
              className="hover:scale-105 transition-transform duration-300"
            />
          </a>
          <h1 className='text-white'>Plataforma de Monitor SEA Coahuila</h1>
        </div>
      
        <div className="flex items-center space-x-4">
          <h3 className='text-amber-500 font-bold font-mono'>{ user ? user.correo : ""}</h3>
          { user ? <button onClick={handleLogout} className="text-white hover:text-blue-300 transition-colors duration-300"><IoMdLogOut size={30}/>Salir</button>: ""}
        
        </div>
      </div>
    </nav>
  );
};