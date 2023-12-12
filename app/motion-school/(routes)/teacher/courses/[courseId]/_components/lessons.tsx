"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { CustomIcon } from '@/components/custom-icon'
import { ListChecks } from 'lucide-react'


const lessons = () => {
  return (
    <div className="flex items-center gap-x-2 col-span-12">
          <CustomIcon size="md" icon={ListChecks} />
          <h3 className="text-lg text-slate-800">
            {" "}
            Course Chapters
          </h3>
        </div>
  )
}

export default lessons