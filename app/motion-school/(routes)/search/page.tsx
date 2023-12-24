import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import Categories from "./_components/categories";
import { getCourse } from "@/actions/getCourse";
import AllCourses from "@/components/AllCourses";

interface SearchProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const Search = async ({ searchParams }: SearchProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/motion-school");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  
  const courses = await getCourse({userId , ...searchParams})

  return (
    <>
      <div className="p-4 ">
        <Categories items={categories} />
        <AllCourses items={courses}/>
      </div>
    </>
  );
};

export default Search;
