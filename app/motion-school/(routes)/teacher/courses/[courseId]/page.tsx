import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CustomIcon } from "@/components/custom-icon";
import CustomizeCourse from "./_components/course_form";
import { AlertTriangle, CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
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
import CoursePublish from "./_components/coursepublish";


import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
    course.chapters.some(chapter => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedField = requiredFields.filter(Boolean).length;
  const progressText = `(${completedField}/${totalFields})`;

  const isCompleted = requiredFields.every(Boolean);

  return (
    <>
 {!course.isPublished && (
        <Alert>
          <div className="flex items-center space-x-2">
            <AlertTriangle size={16} className="text-blue-700" />

            <AlertDescription>
              This Course is unpublished. It will not be visible in the course for Learners.
            </AlertDescription>
          </div>
        </Alert>
      )}

      <div className="  h-fit  p-7 m-6 mt-4 shadow-lg items-center justify-center   bg-indigo-400  rounded-md bg-clip-padding backdrop-filter lg:backdrop-blur-sm bg-opacity-20 border border-gray-100">
       
          <div className="flex gap-y-1 items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">
                Course SetUp
              </h1>
              <span className="text-sm text-slate-600">
                Please Complete all steps {progressText}{" "}
              </span>
            </div>
            <CoursePublish
              isPublished={course.isPublished}
              stepComplete={isCompleted}
              courseId={params.courseId}
            />
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
    </>
  );
};

export default CourseId;
