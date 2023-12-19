import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/course-data";
import { columns } from "./_components/column";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Courses = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/motion-school");
  }
  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={courses} />
      </div>
    </div>
  );
};

export default Courses;
