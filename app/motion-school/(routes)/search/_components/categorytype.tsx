import React from 'react'
import qs from "query-string";
import { IconType } from "react-icons";
import { cn } from '@/lib/utils';

interface CategoryTypeProps{
label: string;
value?:string;
icon?:IconType;

}

const CategoryType = ({label,value,icon:Icon}:CategoryTypeProps) => {
  return (
<>
    <button className={cn("py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-indigo-600 transition")}>
        {
            Icon && <Icon size={20}/>
        } <div className='truncate'>
            {label}
        </div>
    </button>
</>
  )
}

export default CategoryType