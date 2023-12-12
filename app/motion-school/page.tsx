"use client"
import React, { useState } from 'react'

const Motion = () => {
 const  initialValue ={
    name : "",
    city : ""
  }
  const [formvalue , setFormValue] = useState(initialValue)
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name , value} = e.target
    console.log(e)
    setFormValue({...formvalue , [name]: value})
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setFormValue(initialValue)
console.log(formvalue)
  }
  return (
   <div className='flex border border-red-500 flex-col'>
   <form onSubmit={handleSubmit}>

    <input type="text" placeholder='Name' name="name" value={formvalue.name} onChange={handleChange} />
    <input type="text" placeholder='city'name="city" value ={formvalue.city} onChange={handleChange}/>

    <button type='submit'>Submit</button>

   </form>
   </div>
  )
}

export default Motion