import { Login } from "./components/login";


export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {process.env.NEXT_PUBLIC_BASE_API}
      </main>
       
        
             <Login />
   
    </div>
  );
}
