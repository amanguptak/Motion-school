import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CustomIcon } from "@/components/custom-icon";
import CustomizeCourse from "./_components/course_form";
import { LayoutDashboard } from "lucide-react";
import ImageForm from "./_components/image-form";
interface ParamsType {
  params: {
    courseId: string;
  };
}


const CourseId = async ({ params }: ParamsType) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  if (!course) {
    redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedField = requiredFields.filter(Boolean).length;
  const progressText = `(${completedField}/${totalFields})`;

  return (
    <div className=" lg:h-full p-7 m-6 h-fit mx-5 lg:mx-auto shadow-lg items-center justify-center max-w-5xl  bg-indigo-400  rounded-md bg-clip-padding backdrop-filter lg:backdrop-blur-sm bg-opacity-20 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-semibold text-slate-800">
            Course SetUp
          </h1>
          <span className="text-sm text-slate-600">
            Please Complete all steps {progressText}{" "}
          </span>
        </div>
      </div>

      {/* course form setup */}

      <div className="grid grid-cols-1 md:grid-cols-12 mt-10 ">
        <div className="flex items-center gap-x-2 col-span-12">
          <CustomIcon size='md' icon={LayoutDashboard}/>
          <h3 className="text-lg text-slate-800">
            {" "}
            Customize Your Course Here
          </h3>
        </div>
        <div className="col-span-6">
        <CustomizeCourse initialData={course} courseId={course.id}/>
      
        <ImageForm initialData={course} courseId={course.id}/>
        </div>
      

      </div>
    </div>
  );
};

export default CourseId;
