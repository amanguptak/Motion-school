import React from 'react'
import girlImg from "@/public/images/st.png";
import Image from "next/image";
const BeautyCard = () => {
  return (
    <div className=" rounded-3xl relative h-fit w-60 bg-indigo-600 shadow-xl bg-clip-padding hover:shadow-indigo-400 backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
          <Image
            src={girlImg}
            alt=""
            className=" transform -translate-y-[140px] hover:-translate-y-40 ease-out duration-300  absolute "
          />

          <div className="footer mt-14 p-4">
            <span className="text-slate-400  text-sm text-center">
              Fueling Curiosity, Igniting Passion: Motion School, Where Learning
              Takes Flight.
            </span>
          </div>
        </div>
  )
}

export default BeautyCard