"use client";
import React, { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormDescription,
    FormItem,
    FormMessage,
    FormLabel

} from "@/components/ui/form"
import { Input } from "@/components/ui/input";


interface CourseFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const CustomizeCourse = ({ initialData, courseId }: CourseFormProps) => {

const [isEditing , setIsEditing] = useState(false);



  return <div>CustomizeCourse</div>;
};

export default CustomizeCourse;
