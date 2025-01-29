
import Image from 'next/image'

export const Navbar = () => {
  return (
    <nav
  className="relative flex w-full flex-wrap items-center justify-between bg-slate-800  shadow-dark-mild ">
  <div className="flex w-full flex-wrap items-center justify-between px-3">
    <div>
      <a className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0 text-white" href="#" >
      <Image src="https://firebasestorage.googleapis.com/v0/b/transparenciaseac.appspot.com/o/I7kmevbBVPO8yR9G0mK9%2FkyYlvOBrjgH7F3p5TbcE%2FLogo%20PIPEAC%20%20ampliado%20(2).png?alt=media&token=489a9dd1-844a-46c9-912b-099b51afcb80" 
       width={65}
       height={65}
      alt="PIPEAC" />
      </a>
    </div>
  </div>
</nav>
  )
}
