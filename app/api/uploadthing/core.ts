import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = ()=>{
    const {userId} = auth()
    if(!userId){
        throw new Error("Unauthorized user")
    };
    return {userId}
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
   courseImage: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachments : f(["text" , "image" , "video" , "audio" , "pdf"])
  .middleware(()=>handleAuth())
  .onUploadComplete(()=>{}),
  chapterVideo : f({video: {maxFileSize : "1GB" , maxFileCount : 1}})
  .middleware(()=>handleAuth())
  .onUploadComplete(()=>{}),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;

