import { ButtonNav } from "./components/buttonNav";




export default function SiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div className="">
      <div className=" bg-slate-100">
        {/* <Navbar /> */}
        <ButtonNav />
        {children}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
