



export default function SiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div className="">
      <div className=" bg-slate-100">
        {/* <Navbar /> */}
        
        {children}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
