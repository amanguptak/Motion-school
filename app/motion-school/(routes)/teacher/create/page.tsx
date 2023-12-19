"use client";
import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import * as z from "zod"
import axios from "axios";
import { CourseSchema, courseSchema } from "@/lib/validation/course";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {useRouter} from "next/navigation"
import { toast } from "sonner";
const CreateCourse = () => {

  const router = useRouter()
  const form = useForm<CourseSchema>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
    },
  });

 

  const { isSubmitted, isValid } = form.formState;

  const onSubmit = async (values: CourseSchema) => {
    try{
      console.log(values);
      const res = await axios.post("/api/courses", values)
      form.reset()
      toast.success("title created")
      router.refresh()
      router.push(`/motion-school/teacher/courses/${res?.data.id}`)
     
    }catch(err){
      console.log(err);
      toast.error("something went wrong 😮")
    }

  };
  return (
    <div className=" lg:h-[600px] p-6 flex m-8 h-[700px] mx-5 lg:mx-auto shadow-lg items-center justify-center max-w-3xl  bg-indigo-400  rounded-md bg-clip-padding backdrop-filter lg:backdrop-blur-sm bg-opacity-20 border border-gray-100">
      <div className="w-full">
        <div className="ml-5">
          <h1 className="text-2xl font-semibold">Name Your Course</h1>
          <p className="text-sm text-slate-600">
            Don&apos;t worry you can change this later.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8  p-6 rounded-md"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. React Course" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Button asChild variant="ghost" type="button">
                <Link href="/motion-school/teacher/courses">Cancel</Link>
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCourse;
