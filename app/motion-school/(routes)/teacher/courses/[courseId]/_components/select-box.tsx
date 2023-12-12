"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppWindow, AppleIcon, Check, ChevronsUpDown, ImageDown } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { courseCatSchemaType, courseCatSchema } from "@/lib/validation/course";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { Course } from "@prisma/client";
import { CustomIcon } from "@/components/custom-icon";

interface SelectBoxProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}
const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
});

export function SelectBox({ options, courseId, initialData }: SelectBoxProps) {
  const [open, setOpen] = React.useState(false);
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
   <>
    <div className="flex flex-row items-center space-x-2">
    <CustomIcon size="md" icon={AppWindow} />
    <h3 className="text-lg text-slate-800">Category</h3>
     
    </div>
    <div className="mt-3">
     
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
          
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? options.find((opt) => opt.value === field.value)
                              ?.label
                          : "Select Options..."}

                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search Options..." />
                      <CommandEmpty>No Options found.</CommandEmpty>
                      <CommandGroup>
                        {options.map((opt) => (
                          <CommandItem
                            value={opt.label}
                            key={opt.value}
                            onSelect={() => {
                              form.setValue("categoryId", opt.value);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                opt.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {opt.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

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
    </div></>
  );
}
