"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { cn } from '@/lib/utils';
import { priceFormatter } from "@/lib/price-formatter"




export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-[#f9f9fa] hover:text-indigo-500"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell : ({row})=>{
      const inDollar:number = row.getValue("price");
      return <>{inDollar ? priceFormatter(inDollar) : priceFormatter(0)}</>
    }
  },
  {
    accessorKey: "isPublished",
    header: "Publish",
    cell : ({row})=>{
      const status = row.getValue("isPublished");
       return <Badge className={cn(status ? "bg-amber-400 hover:bg-amber-500" : "bg-indigo-400 hover:bg-indigo-500" )}> {status ? "Publish" : "Draft"}</Badge>
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-[#f9f9fa] hover:text-indigo-500"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row})=>{
      const price: string = row.getValue("createdAt")
      const formatted = new Date(price).toDateString()
      return <> {formatted}</>
    }
  },
]
