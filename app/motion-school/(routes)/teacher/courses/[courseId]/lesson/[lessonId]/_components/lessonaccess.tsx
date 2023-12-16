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

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { Button } from "@/components/ui/button";
import {
  chapterAccessSchema,
  chapterAccessSchemaType,
} from "@/lib/validation/course";
import { CircleDollarSign, Eye, Pencil } from "lucide-react";
import { Chapter, Course } from "@prisma/client";
import { CustomIcon } from "@/components/custom-icon";
import { priceFormatter } from "@/lib/price-formatter";

interface LessonAccessProps {
  initialData: Chapter;
  courseId: string;
  lessonId: string;
}

const LessonAccess = ({
  initialData,
  courseId,
  lessonId,
}: LessonAccessProps) => {
  const router = useRouter();
  const form = useForm<chapterAccessSchemaType>({
    resolver: zodResolver(chapterAccessSchema),
    defaultValues: {
      isFree: initialData?.isFree || false,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: chapterAccessSchemaType) => {
    try {
      console.log("update", values);
      const res = await axios.patch(
        `/api/courses/${courseId}/chapters/${lessonId}`,
        values
      );
      // form.reset()
      toast.success("Lesson Accessibility Changed");
      router.refresh();
      // router.push(`/motion-school/teacher/courses/${res?.data.id}`)
    } catch (err) {
      console.log(err);
      toast.error("something went wrong 😮");
    }
  };

  return (
    <>
      <div className="col-span-6">
        <div className="gap-x-2 flex items-center">
          <CustomIcon size="md" icon={Eye} />
          <h3 className="text-lg text-slate-800"> Lesson Accessibility</h3>
        </div>

        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 border border-white rounded-lg p-2 mt-2"
            >
              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 text-xs">
                      {/* Price {initialData.price ? priceFormatter(initialData.price) : 0} */}
                    </FormLabel>

                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="chapterFree"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />

                        <Label
                          htmlFor="chapterFree"
                          className="text-xs text-slate-700"
                        >
                          {" "}
                          Switch if you want to make this lesson{" "}
                          <span>
                            {initialData.isFree ? "not free" : "free"}
                          </span>{" "}
                          for preview
                        </Label>
                      </div>
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

export default LessonAccess;
