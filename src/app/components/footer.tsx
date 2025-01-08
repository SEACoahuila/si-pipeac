import React from "react";

export const Footer: React.FC = () => {
  return (
    <div className="w-full shadow bg-slate-800  sticky top-[100vh] ">
      <footer className=" bg-slate-800 text-center dark:bg-slate-800 lg:text-left  ">
        <div className="bg-black/5 p-4 text-center text-surface text-white">
          © 2023 Copyright:
        </div>
      </footer>
    </div>
  );
};

export default Footer;
