"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, ImageDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import {courseImageSchemaType} from "@/lib/validation/course"
import { Button } from "@/components/ui/button";
import { FileImageUpload } from "@/components/file-upload";
import { CustomIcon } from '@/components/custom-icon';

interface ImageFormProps {
  initialData: Course
  courseId: string;
};

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

const ImageForm = ({
  initialData,
  courseId
}: ImageFormProps) => {
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
    <div className="mt-3 ">
      <div className="text-sm flex items-center justify-between">
     
     <div className="flex flex-row items-center space-x-2 mb-2">
     <CustomIcon size="md" icon={ImageDown} />
     <h3 className="text-lg text-slate-800">Image</h3>
      
     </div>
     <Button onClick={toggleEdit}  variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle size={15} className="mr-2"/>
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil size={15} className="mx-2" />
              Edit image
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

export default ImageForm