import React from 'react'
import girlImg from "@/public/images/st.png";
import Image from "next/image";
const BeautyCard = () => {
  return (
    <div className="lg:mb-8 rounded-3xl relative h-fit w-fit bg-indigo-600 shadow-xl bg-clip-padding hover:shadow-indigo-400 backdrop-filter lg:backdrop-blur-sm bg-opacity-10 border border-gray-100">
          <Image
            src={girlImg}
            alt=""
            className=" transform md:-translate-y-[120px] -translate-y-[140px] hover:-translate-y-40 ease-out duration-300  absolute  md:w-52 md:h-52"
          />

          <div className="footer mt-8 p-4 duration-300 ease-linear ">
            <span className="text-slate-400  text-sm text-center ">
              Fueling Curiosity, Igniting Passion: Motion School, Where Learning
              Takes Flight.
            </span>
          </div>
        </div>
  )
}

export default BeautyCard