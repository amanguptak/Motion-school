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
import { priceFormSchema, priceFormSchemaType } from "@/lib/validation/course";
import { CircleDollarSign, Pencil } from "lucide-react";
import { Course } from "@prisma/client";
import { CustomIcon } from "@/components/custom-icon";
import { priceFormatter } from "@/lib/price-formatter";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
}

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
 const  router = useRouter()
  const form = useForm<priceFormSchemaType>({
    resolver: zodResolver(priceFormSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: priceFormSchemaType) => {
    try {
      console.log("update", values);
      const res = await axios.patch(`/api/courses/${courseId}`, values);
      // form.reset()
      toast.success("Price Added");
      router.refresh();
      // router.push(`/motion-school/teacher/courses/${res?.data.id}`)
    } catch (err) {
      console.log(err);
      toast.error("something went wrong 😮");
    }
  };

  return (
    <>
      <div className="col-span-6 lg:space-y-5 mt-6 md:mt-0">
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

        <div className="gap-x-2 flex items-center">
          <CustomIcon size="md" icon={CircleDollarSign} />
          <h3 className="text-lg text-slate-800"> Course Pricing</h3>
        </div>

        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 text-xs">
                    Price {initialData.price ? priceFormatter(initialData.price) : 0}
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        disabled={isSubmitting}
                        {...field}
                      />
                     
                    </FormControl>
                    <FormDescription>You can also make it Free</FormDescription>
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

export default PriceForm;
