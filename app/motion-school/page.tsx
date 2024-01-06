// "use client"
// import React, { useState } from 'react'

// const Motion = () => {
//  const  initialValue ={
//     name : "",
//     city : ""
//   }
//   const [formvalue , setFormValue] = useState(initialValue)
//   const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
//     const {name , value} = e.target
//     console.log(e)
//     setFormValue({...formvalue , [name]: value})
//   }
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
//     e.preventDefault();
//     setFormValue(initialValue)
// console.log(formvalue)
//   }
//   return (
//    <div className='flex border border-red-500 flex-col'>
//    <form onSubmit={handleSubmit}>

//     <input type="text" placeholder='Name' name="name" value={formvalue.name} onChange={handleChange} />
//     <input type="text" placeholder='city'name="city" value ={formvalue.city} onChange={handleChange}/>

//     <button type='submit'>Submit</button>

//    </form>
//    </div>
//   )
// }

// export default Motion

import { getDashboardCourse } from "@/actions/getDashboard";
import AllCourses from "@/components/AllCourses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { InfoCard } from "./course-info";
import { CheckCircle, Clock } from "lucide-react";

const LearnerDashBoard = async () => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const { completedCourses, inProgressCourses } = await getDashboardCourse(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={inProgressCourses.length}
       />
       <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
       />
      </div>

      <AllCourses items={[...inProgressCourses, ...completedCourses]} />
    </div>
  );
};

export default LearnerDashBoard;
