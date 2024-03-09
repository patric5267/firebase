import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <div className=" fixed h-full w-full flex gap-2 sm:gap-4 flex-col justify-center items-center">
      <h1 className=' sm:text-4xl'>Page Not found</h1>
      <Link to='/' className=' bg-black hover:bg-[#212121] text-white rounded px-4 py-2'>Go Back</Link>
    </div>
  )
}

export default Notfound 
