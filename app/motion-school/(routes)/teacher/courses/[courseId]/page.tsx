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
import { SelectBox } from "./_components/select-box";
import PriceForm from "./_components/price";
import { ResourcesForm } from "./_components/resourses";
import Lessons from "./_components/lessons";
const CourseId = async ({ params }: ParamsType) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
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
    <div className=" lg:h-screen  h-fit  overflow-y-scroll overflow-x-hidden scrollbar-thin  scrollbar-rounded-md scrollbar-thumb-[#e6e8fe] lg:scrollbar-track-indigo-500 p-7 m-5 shadow-lg items-center justify-center w-fit  bg-indigo-400  rounded-md bg-clip-padding backdrop-filter lg:backdrop-blur-sm bg-opacity-20 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-2xl font-semibold text-slate-800">
            Course SetUp
          </h1>
          <span className="text-sm text-slate-600">
            Please Complete all steps {progressText}{" "}
          </span>
        </div>
      </div>

      {/* course form setup */}

      <div className="grid grid-cols-1 md:grid-cols-12 mt-8 gap-x-6 space-y-4 md:space-y-0">
        <div className="col-span-6">
         
          <CustomizeCourse initialData={course} courseId={course.id} />

          <SelectBox
            initialData={course}
            courseId={course.id}
            options={category.map((cat) => ({
              label: cat.name,
              value: cat.id,
            }))}
          />
          <ImageForm initialData={course} courseId={course.id} />
        </div>

        <div className="col-span-6 space-y-6 ml-4">
       
          <PriceForm initialData={course} courseId={course.id} />

          <ResourcesForm initialData={course} courseId={course.id} />
          <Lessons initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseId;
