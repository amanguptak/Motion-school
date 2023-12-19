import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { DataTable } from './_components/course-data'
import { columns } from './_components/column'

async function getData(): Promise<any[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

const Courses = async() => {
  const data = await getData()
 
  return (
    <div>

      {/* <Button asChild>
        <Link href="/motion-school/teacher/create"> New Course</Link>
      </Button> */}
 <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </div>
  )
}

export default Courses