"use client";
import React, { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import {
  customizeCourseSchemaType,
  customizeCourseSchema,
} from "@/lib/validation/course";
import { Pencil } from "lucide-react";
import { Course } from "@prisma/client";

interface CourseFormProps {
  initialData: Course
  courseId: string;
}

const CustomizeCourse = ({ initialData, courseId }: CourseFormProps) => {
 

  const form = useForm<customizeCourseSchemaType>({
    resolver: zodResolver(customizeCourseSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: customizeCourseSchemaType) => {
    try {
      console.log("update", values);
      const res = await axios.patch(`/api/courses/${courseId}`, values);
      // form.reset()
      toast.success("title created");
      // router.push(`/motion-school/teacher/courses/${res?.data.id}`)
    } catch (err) {
      console.log(err);
      toast.error("something went wrong 😮");
    }
  };

  return (
    <>
      <div className="col-span-6 mt-6">
        {/* <div className="font-medium flex items-center justify-between">
          Course title
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-full"
          >
            <Pencil size={15} />
          </Button>
        </div> */}
        {/* {!isEditing ? (
          <></>
        ) : (
         
        )} */}

        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 text-xs">
                      Title
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Course Title"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 text-xs">
                      Description
                    </FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Course Description"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2 justify-end">
                <Button type="submit" disabled={isSubmitting} size="sm">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </>
      </div>
    </>
  );
};

export default CustomizeCourse;
