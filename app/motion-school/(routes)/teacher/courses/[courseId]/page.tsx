import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CustomIcon } from "@/components/custom-icon";
import CustomizeCourse from "./_components/course_form";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import ImageForm from "./_components/image-form";
// import SelectBox from "./_components/selectbox";
interface ParamsType {
  params: {
    courseId: string;
  };
}
import {SelectBox} from "./_components/select-box"
import PriceForm from "./_components/price";
import ResourcesForm from "./_components/resourses";
const CourseId = async ({ params }: ParamsType) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      
      attachments: {
        orderBy: {
          name: "desc",
        },
      },
    },
   
  });

  const category = await db.category.findMany({
    orderBy: {
      name: "asc",
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

      <div className="grid grid-cols-1 md:grid-cols-12 mt-10 space-y-4 md:space-y-0">
       
        <div className="col-span-6">
        <div className="flex items-center gap-x-2 col-span-12">
          <CustomIcon size="md" icon={LayoutDashboard} />
          <h3 className="text-lg text-slate-800">
            {" "}
            Customize Your Course Here
          </h3>
        </div>
          <CustomizeCourse initialData={course} courseId={course.id} />

          <ImageForm initialData={course} courseId={course.id} />
          {/* <SelectBox
            initialData={course}
            courseId={course.id}
            Options={category.map((cat) => ({
              label: cat.name,
              value: cat.id,
            }))}
          /> */}
          <SelectBox
          initialData={course}
          courseId={course.id}
          options={category.map((cat) => ({
            label: cat.name,
            value: cat.id,
          }))}
          />
        </div>

        <div className="col-span-6 lg:ml-6 space-y-3">
        <PriceForm initialData={course}
          courseId={course.id}/>

       <ResourcesForm 
       initialData={course}
       courseId={course.id}
       />

        <div className="flex items-center gap-x-2 col-span-12">
          <CustomIcon size="md" icon={ListChecks} />
          <h3 className="text-lg text-slate-800">
            {" "}
            Course Chapters
          </h3>
        </div>
       
<div>
  Todo chapters
</div>


   
        
       
       

        </div>
      </div>
    </div>
  );
};

export default CourseId;
