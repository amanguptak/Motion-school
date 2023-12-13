import React from 'react'
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
interface InputProps{

name: string
placeHolder: string
fieldLabel : string
form: HTMLFormElement
}

const CustomInput = ({name,placeHolder,fieldLabel,form}:InputProps) => {
  return (
  <>
   <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 text-xs">
                      Title
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Course Title"
                        // disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  </>
  )
}

export default CustomInput