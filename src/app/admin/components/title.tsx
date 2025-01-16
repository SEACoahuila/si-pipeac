import React from 'react'


interface Props {
    title: string
    text?: string
}
export const Title = ( {title = "Falta titulo", text = ""} : Props) => {
  return (
    <div className="max-w-4xl mx-auto text-center mt-10 mb-5 border-b-4 border-slate-400 border-l-2 border-r-2" >

  <h1 className="text-4xl md:text-3xl  my-1   font-sans font-bold  text-teal-600 dark:text-gray-700">
    {title}
  </h1>
  
  <p className="text-lg text-gray-800 ">{text} </p>
</div>
  )
}
