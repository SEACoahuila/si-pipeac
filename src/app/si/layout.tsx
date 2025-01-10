import { Navbar } from "./components/navbar";



export default function SiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div className="">
      <div className=" bg-slate-100">
        {/* <Navbar /> */}
        <Navbar />
        {children}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
