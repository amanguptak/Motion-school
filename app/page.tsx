import { Button } from "@/components/ui/button";
import { School } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Banner from "@/public/images/bann.png";
import MobImg from "@/public/images/mob2.png";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo-no-background.png";
export default function Home() {
  return (
    <div className=" bg-[#f1f1f1] grid  grid-cols-12 place-items-center h-screen overflow-hidden">
      <div className="col-span-12 h-full">
        <svg
          className="w-screen h-fit cursor-pointer transform  hover:scale-125  transition-transform duration-300 ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#6366f1"
            fill-opacity="1"
            d="M0,64L40,96C80,128,160,192,240,208C320,224,400,192,480,170.7C560,149,640,139,720,160C800,181,880,235,960,234.7C1040,235,1120,181,1200,170.7C1280,160,1360,192,1400,208L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="lg:col-span-6 lg:mt-[-300px] space-y-2 lg:px-9 col-span-12 ">
        <Image
          src={Logo}
          alt="logo"
          height={225}
          width={225}
          className="ml-9 m-4 cursor-pointer transform  hover:scale-125  transition-transform duration-300 ease-in-out"
        />

        <div className="space-y-4 p-9 pt-0 ">
          <p className="tracking-tight text-md text-justify font-md">
            Embark on a transformative e-learning journey at Motion School, your
            premier online destination. Unleash learning in motion, experience
            innovation fused with education anytime, anywhere.
          </p>
          <Button className="cursor-pointer transform  hover:scale-125  transition-transform duration-300 ease-in-out">
            {" "}
            <Link
              href="/motion-school"
              className="tracking-tight font-extrabold flex"
            >
              <ArrowRight className="mr-2" size={20} />
              Continue
            </Link>
          </Button>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 lg:mt-[-300px] ">
        <Image
          src={MobImg}
          alt="banner"
          height={700}
          width={700}
          className=" lg:hidden block cursor-pointer transform  hover:scale-125  transition-transform duration-300 ease-in-out"
        />
        <Image
          src={Banner}
          alt="banner"
          height={700}
          width={700}
          className=" lg:block hidden cursor-pointer transform  hover:scale-125  transition-transform duration-300 ease-in-out"
        />
      </div>
    </div>
  );
}
