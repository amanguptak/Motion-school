"use client";
import React from "react";
import axios from "axios";
import { SearchSelect } from "@/components/ui/search-select";
import { Course } from "@prisma/client";
import { courseCatSchemaType, courseCatSchema } from "@/lib/validation/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
interface SelectBoxProps {
  initialData: Course;
  courseId: string;
  Options: { label: string ; value: string }[];
}

const SelectBox = ({ initialData, courseId, Options }: SelectBoxProps) => {
  const router = useRouter();
  const form = useForm<courseCatSchemaType>({
    resolver: zodResolver(courseCatSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: courseCatSchemaType) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Category Added successfully");

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-600 text-sm">
                  Category
                </FormLabel>

                <FormControl>
                  <SearchSelect options={Options} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={isSubmitting} size="sm">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SelectBox;
