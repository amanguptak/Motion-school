"use client";
import React from "react";
import qs from "query-string";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategoryTypeProps {
  label: string;
  catId?: string;
  icon?: IconType;
}

const CategoryType = ({ label, catId, icon: Icon }: CategoryTypeProps) => {
  // here catID is categoryId which we are fetching form db in search page and passing as props
  const pathName = usePathname();
  // console.log("PathName", pathName);
  const router = useRouter();
  const searchParams = useSearchParams();
  // console.log("searchParams", searchParams.get("categoryId"));
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  /* isSelected is false it means that our original id (catId) 
  is not equal to id present in url or we can say it means there is no
   categoryId in url current time it means it is null
   
   so we need to assign catId in url which we are doing in Line 39

   if isSelected is true it means we have pushed the catId in url like this
    /motion-school/search?categoryId=5d0b3662-8c2b-4ebb-814f-9874cf8b4dc6

   */
  const isSelected = currentCategoryId === catId;
  const handleCategoryUrl = () => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : catId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <>
      <button
        onClick={handleCategoryUrl}
        className={cn(
          "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-indigo-600 transition",
          isSelected && "bg-amber-200 border border-indigo-400"
        )}
      >
        {Icon && <Icon size={20} />} <div className="truncate">{label}</div>
      </button>
    </>
  );
};

export default CategoryType;
