import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";
import teacher from "@/public/images/teacher.png";
import Image from "next/image";
import { toast } from "sonner";
import SearchInput from "./SearchInput";
import Link from "next/link";
const NavBarRoutes = () => {
  const router = useRouter();
  const path = usePathname();
  const { userId } = useAuth();

  const isTeacherPage = path?.startsWith("/motion-school/teacher");
  const isSearchPage = path === "/motion-school/search";
  const isStudentCourse = path?.startsWith("/course")
  const teacherMode = () => {
    if (isTeacherPage) {
      router.push("/motion-school");
      toast.info("Exited from teacher mode");
    } else {
      router.push("/motion-school/teacher");
      toast.success("Teacher mode activated");
    }
  };
  return (
    <>
      <div>
        {isSearchPage && (
          <>
            {" "}
            <SearchInput />{" "}
          </>
        )}
      </div>

      <div className="flex items-center justify-center space-x-2">
        {isTeacherPage || isStudentCourse ? (
          <Link href="/motion-school">
          <Button>
            Exit <DoorOpen className="ml-2" />{" "}
          </Button></Link>
        ) : (
          <Image
            title="Teacher Mode"
            className=" cursor-pointer rounded-md mx-2"
            height={40}
            width={40}
            src={teacher}
            alt="teacher-mode "
            onClick={teacherMode}
          />
        )}

        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavBarRoutes;
