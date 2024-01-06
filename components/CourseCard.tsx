import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CustomIcon } from "./custom-icon";
import { BookOpenText, CircleDollarSign } from "lucide-react";
import { priceFormatter } from "@/lib/price-formatter";
import CourseProgress from './CourseProgress';

interface CourseProps {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  chaptersLength: number;
  category ?: string;
  progress ?: number | null;
}

const CourseCard = ({
  id,
  title,
  description,
  price,
  imageUrl,
  chaptersLength,
  category,
  progress
}: CourseProps) => {

  return (
   <>
   <Link href={`/course/${id}`}>
   <div className="card shadow-md h-full  p-3 cursor-pointer overflow-hidden hover:shadow-indigo-400 hover:shadow-2xl group rounded-lg ">
      <div className="relative card-top aspect-video rounded-md w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt="course-img"
          fill
          className="object-cover hover:scale-125 ease-out duration-300 transition"
        />
      </div>
      <div className="content lg:h-28 h-30 flex flex-col mt-2 ">
        <p className="lg:text-lg text-md text-slate-800 font-semibold group-hover:text-indigo-600">
          {title}
        </p>
        
        <p className="text-sm text-slate-600 text-wrap line-clamp-2 lg:line-clamp-1">{description}</p>
        <p className="text-xs font-medium group-hover:text--400 text-slate-600">{category}</p>
        <div className="mt-2">

{
      progress !== null && <CourseProgress
      value={progress!}
      variant="success"
      />
    }
</div>
       
      </div>
    

      <div className=" footer md:flex items-center justify-between ">
        <span className="flex items-center space-x-2 ">
          <CustomIcon icon={BookOpenText} size="sm" />
          <span className="lg:text-[14px] text-sm text-slate-800 group-hover:text-amber-500">
            {chaptersLength > 1 ? "Chapters" : "Chapter"} : {chaptersLength}
          </span>
        </span>

       {
        progress === null && <>
         <span className="text-sm mt-1 group-hover:text-green-700 flex items-center group">
          {" "}
          <CircleDollarSign
            size={20}
            className="mr-2 bg-green-600 rounded-full text-white group-hover:text-amber-500"
          />{" "}
          {price === null ? "Free" : priceFormatter(price)}
        </span>
        </>
       }
      </div>
      
    </div>
   </Link>
   </>
  );
};

export default CourseCard;
