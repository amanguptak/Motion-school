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
import ReactPlayer from 'react-player'
import { Button } from "@/components/ui/button";
import {
    lessonYoutubeSchemaType,
    lessonYoutubeSchema,
} from "@/lib/validation/course";
import { LayoutDashboard, Pencil, PlusCircle, VideoIcon, Youtube } from "lucide-react";
import { Chapter, Course } from "@prisma/client";
import { CustomIcon } from "@/components/custom-icon";

import VideoPlayer from "@/components/videoPlayer";
import dynamic from 'next/dynamic';
import { cn } from '../../../../../../../../../lib/utils';
interface LessonYoutubeProps {
  initialData: Chapter
  courseId: string;
  lessonId:string
}

const LessonYoutube = ({ initialData, courseId ,lessonId }: LessonYoutubeProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
const router = useRouter()
  const form = useForm<lessonYoutubeSchemaType>({
    resolver: zodResolver(lessonYoutubeSchema),
    defaultValues: {
      youtubeUrl: initialData?.youtubeUrl || "",
    
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: lessonYoutubeSchemaType) => {
    try {
      console.log("update", values);
      const res = await axios.patch(`/api/courses/${courseId}/chapters/${lessonId}`, values);
      // form.reset()
      toast.success("Lesson info created");
      router.refresh()
      toggleEdit();
      // router.push(`/motion-school/teacher/courses/${res?.data.id}`)
    } catch (err) {
      console.log(err);
      toast.error("something went wrong 😮");
    }
  };

  return (
    <>
     



      <div className="col-span-6 mt-4">
        <div className="gap-x-2 flex items-center justify-between mb-2">
       <div className='flex items-center space-x-2'>
       <CustomIcon size="md" icon={Youtube} />
          <h3 className="lg:text-lg text-slate-800 text-sm">Add Youtube Link</h3>
       </div>
          <div>
          <Button onClick={toggleEdit}  variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.youtubeUrl && (
            <>
              <PlusCircle size={15} className="mr-2"/>
             Add Link
            </>
          )}
          {!isEditing && initialData.youtubeUrl && (
            <>
              <Pencil size={15} className="mx-2" />
              Edit Link
            </>
          )}
        </Button>
          </div>
        </div>
      
   
      {!isEditing && (
        !initialData.youtubeUrl ? (
          <div className="flex items-center justify-center h-60 bg-indigo-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-indigo-500" />
          </div>
        ) : (
          <div className="relative aspect-video h-fit w-fit mt-2 [&_iframe]:rounded-lg [&_iframe]:border-2 [&_iframe]:border-white">
            
            <div className="hidden lg:block">

            <ReactPlayer url={initialData?.youtubeUrl} height={280} width={435} controls={true}/>

            </div>
            <div className="block lg:hidden">

            <ReactPlayer url={initialData?.youtubeUrl} width={260} height={150} controls={true}/>
            </div>


      
          </div>
        )
      )}
      {isEditing && (
         <>
         <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
             <FormField
               control={form.control}
               name="youtubeUrl"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel className="text-slate-600 text-xs">
                     Youtube Url
                   </FormLabel>

                   <FormControl>
                     <Input
                       placeholder="Lesson Title"
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
      )}
    
    </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(LessonYoutube), { ssr: false });

