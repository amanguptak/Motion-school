"use client"
import React, { useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { priceFormatter } from '@/lib/price-formatter';
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from '@/components/ui/button';

interface BuyButtonProps{
    isLocked : boolean,
    coursePrice : number,
    courseId:string,

}

const BuyButton = ({isLocked,coursePrice , courseId}:BuyButtonProps) => {
    const [isLoading , setLoading] = useState(false)

 


    const onPayment = async () => {
        try{
            setLoading(true)
            const res = await axios.post(`/api/courses/${courseId}/payment`)
            window.location.assign(res.data.url)

        }catch(err){
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    }

  return (
    <div>
      
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger  onClick={onPayment} disabled={isLoading} className="w-full lg:w-fit mt-2 lg:mt-0 bg-indigo-600 hover-bg-indigo-700 text-white text-sm p-2 rounded-lg">
                    Buy {priceFormatter(coursePrice)}
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Unlock All Chapters Of This Course</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
     
    </div>
  )
}

export default BuyButton