"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import {courseImageSchemaType} from "@/lib/validation/course"
import { Button } from "@/components/ui/button";
import { FileImageUpload } from "@/components/file-upload";
import { CustomIcon } from "@/components/custom-icon";

interface ResourcesFormProps{
  initialData: Course
  courseId: string;
};



const ResourcesForm = ({
  initialData,
  courseId
}: ResourcesFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: courseImageSchemaType) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Thumbnail Updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-3">
      <div className="text-sm flex items-center justify-between">
      <div className="gap-x-2 flex items-center">
          <CustomIcon size="md" icon={File} />
          <h3 className="text-md text-slate-800">
            {" "}
            Resources & Attachments
          </h3>
       
        </div>
        <Button onClick={toggleEdit}  variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle size={15} className="mr-2"/>
              Add an resources
            </>
          )}
          {!isEditing  &&(
            <>
              <Pencil size={15} className="mx-2" />
              update resources
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-indigo-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-indigo-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileImageUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4 text-center">
           Good quality thumbnail is recommended 😀

          </div>
        </div>
      )}
    </div>
  )
}

export default ResourcesForm