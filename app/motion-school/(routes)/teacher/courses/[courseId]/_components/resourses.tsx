// "use client";

// import * as z from "zod";
// import axios from "axios";
// import { Pencil, PlusCircle, ImageIcon, File } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { Course } from "@prisma/client";
// import Image from "next/image";
// import {courseImageSchemaType} from "@/lib/validation/course"
// import { Button } from "@/components/ui/button";
// import { FileImageUpload } from "@/components/file-upload";
// import { CustomIcon } from "@/components/custom-icon";

// interface ResourcesFormProps{
//   initialData: Course
//   courseId: string;
// };



// const ResourcesForm = ({
//   initialData,
//   courseId
// }: ResourcesFormProps) => {
//   const [isEditing, setIsEditing] = useState(false);

//   const toggleEdit = () => setIsEditing((current) => !current);

//   const router = useRouter();

//   const onSubmit = async (values: courseImageSchemaType) => {
//     try {
//       await axios.patch(`/api/courses/${courseId}`, values);
//       toast.success("Course Thumbnail Updated");
//       toggleEdit();
//       router.refresh();
//     } catch {
//       toast.error("Something went wrong");
//     }
//   }

//   return (
//     <div className="mt-3">
//       <div className="text-sm flex items-center justify-between">
//       <div className="gap-x-2 flex items-center">
//           <CustomIcon size="md" icon={File} />
//           <h3 className="text-md text-slate-800">
//             {" "}
//             Resources
//           </h3>
       
//         </div>
//         <Button onClick={toggleEdit}  variant="ghost">
//           {isEditing && (
//             <>Cancel</>
//           )}
//           {!isEditing && !initialData.imageUrl && (
//             <>
//               <PlusCircle size={15} className="mr-2"/>
//               Add an resources
//             </>
//           )}
//           {!isEditing  &&(
//             <>
//               <Pencil size={15} className="mx-2" />
//               update resources
//             </>
//           )}
//         </Button>
//       </div>
//       {!isEditing && (
//         !initialData.imageUrl ? (
//           <div className="flex items-center justify-center h-60 bg-indigo-200 rounded-md">
//             <ImageIcon className="h-10 w-10 text-indigo-500" />
//           </div>
//         ) : (
//           <div className="relative aspect-video mt-2">
//             <Image
//               alt="Upload"
//               fill
//               className="object-cover rounded-md"
//               src={initialData.imageUrl}
//             />
//           </div>
//         )
//       )}
//       {isEditing && (
//         <div>
//           <FileImageUpload
//             endpoint="courseImage"
//             onChange={(url) => {
//               if (url) {
//                 onSubmit({ imageUrl: url });
//               }
//             }}
//           />
//           <div className="text-xs text-muted-foreground mt-4 text-center">
//            Good quality thumbnail is recommended 😀

//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ResourcesForm
"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileImageUpload } from "@/components/file-upload";

interface ResourcesFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

export const ResourcesForm = ({
  initialData,
  courseId
}: ResourcesFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.info("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-6  bg-transparent border border-white rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-indigo-100 border-indigo-200 border text-indigo-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs">
                    {attachment.name}..
                  </p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <Trash className="h-4 w-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileImageUpload

            endpoint="courseAttachments"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  )
}