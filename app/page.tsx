import { Button } from "@/components/ui/button";
import { School } from "lucide-react";

import Banner from "@/public/images/bann.png";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className=" bg-[#f1f1f1] grid  grid-cols-12 place-items-center h-screen">
      <div className="col-span-6 space-y-2 p-9">
        <h2 className="font-bold text-4xl text-indigo-600">Motion School</h2>
        <p className="tracking-tight text-md">
          Embark on a Transformative Educational Journey at Motion School, Your
          Premier Online E-Learning Destination. Unleash Learning in Motion and
          Discover a Seamless Fusion of Innovation and Education. Explore a
          World of Knowledge Anytime, Anywhere, Elevating Your Learning
          Experience Beyond Boundaries.
        </p>
        <Button>
          {" "}
          <Link
            href="/motion-school"
            className="tracking-tight font-extrabold flex"
          >
            <School className="mr-2" size={20} />
            Continue
          </Link>
        </Button>
      </div>
      <div className="h-full w-full col-span-6 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100">
        <Image
          src={Banner}
          alt="banner"
          className=""
          height={700}
          width={700}
        />
      </div>
    </div>
  );
}
