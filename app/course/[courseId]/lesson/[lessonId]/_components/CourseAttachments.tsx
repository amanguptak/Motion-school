"use client"

import { Attachment } from "@prisma/client";
import { Download, File } from "lucide-react";
import React from "react";

interface AttachmentProps {
  attachments: Attachment[];
}

const CourseAttachments = ({ attachments }: AttachmentProps) => {
  
const downloadAttachment = (attachment:Attachment)=>{
    fetch(attachment.url)
    .then(response => response.blob())
    .then(blob => {
      // Create a temporary link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = attachment.name;
        // console.log(URL.createObjectURL(blob));
      // Trigger a click on the link to start the download
      link.click();

      // Clean up by revoking the Object URL
      URL.revokeObjectURL(link.href);
    })
    .catch(error => {
      console.error('Error fetching file:', error);
    });

    
}  
    return (
    <div className="p-4">
      {!!attachments.length && (
        <div>
            <h4 className="font-semibold text-indigo-500">Attachments</h4>
        
        <div className="flex  flex-col">
        {attachments.map((attachment) => (
           <div className="w-fit border border-amber-400 flex items-center bg-indigo-100 rounded-lg p-3">
            <a href={attachment.url} key={attachment.id}  className="flex items-center hover:underline line-clamp-1 text-blue-600">
             <File className="h-4 w-4 mr-2" /> {attachment.name}
            </a>
            <Download className="ml-3 text-green-500 hover:text-green-700 cursor-pointer lg:h-6 lg:w-6 h-8 w-8" 
            
            onClick={()=> downloadAttachment(attachment)}
            
            />
           </div>

          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default CourseAttachments;
