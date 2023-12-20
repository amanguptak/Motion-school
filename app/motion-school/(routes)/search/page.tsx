import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import Categories from './_components/categories';

interface SearchProps{
  searchParams:{
    title:string;
    categoryId:string;
  }
}

const Search = async({searchParams}:SearchProps) => {

  const {userId} = auth()
  if(!userId){
    return redirect("/motion-school")
  }

  const categories = await db.category.findMany({
    orderBy: {
      name:"asc"
    }
  })

  return (
    <>
    <div>
      <Categories
      items={categories}
      />
    </div>
    </>
  )
}

export default Search