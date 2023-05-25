import React from 'react'

const Newslatter = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-3 w-full'>
       <h3 className=" text-xl">Subscribe Newslatter</h3>
      <input
        type="text"
        placeholder="Enter Your Email"
        className="text-sm block w-[60%] px-3 py-1 lg:mt-none bg-white text-gray-600  shadow-sm placeholder-slate-500  border border-slate-300 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500
              
              "
      />
      <button className="bg-yellow-500 rounded-full text-sm  px-12 py-1 text-white hover:bg-white hover:text-yellow-500 border hover:border-yellow-500">
        Subscribe
      </button>
    </div>
  )
}

export default Newslatter