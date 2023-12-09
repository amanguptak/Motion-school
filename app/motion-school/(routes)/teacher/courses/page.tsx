import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const Courses = () => {
  return (
    <div>

      <Button asChild>
        <Link href="/motion-school/teacher/create"> New Course</Link>
      </Button>

    </div>
  )
}

export default Courses