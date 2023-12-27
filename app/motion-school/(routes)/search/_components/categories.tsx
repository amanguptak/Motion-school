"use client"
import { Category } from "@prisma/client";
import React from "react";
import { IconType } from "react-icons";
interface CategoriesProps {
  items: Category[];
}

import {
  FcClapperboard,
  FcCommandLine,
  FcCompactCamera,
  FcMindMap,
  FcMultipleDevices,
  FcReadingEbook,
  FcSmartphoneTablet,
} from "react-icons/fc";
import CategoryType from "./categorytype";

// Record is utility type in ts


const iconMap: Record<Category["name"], IconType> = {
  Photography: FcCompactCamera,
  "Computer Engineering": FcCommandLine,
  "Web Development": FcMultipleDevices,
  "Mobile Development": FcSmartphoneTablet,
  Anime: FcClapperboard,
  "Cloud Programming": FcMindMap,
  Language: FcReadingEbook,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center overflow-x-auto overflow-y-hidden gap-x-2 p-2 scrollbar-thin scrollbar-rounded scrollbar-thumb-amber-200 scrollbar-track-indigo-300 scroll ">
      {items.map((item) => (
        <CategoryType
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          catId={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
