import { Button } from "@/components/ui/button";
import { School } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Banner from "@/public/images/bann.png";
import MobImg from "@/public/images/mob2.png"
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo-no-background.png"
export default function Home() {
  return (

    <div className=" bg-[#f1f1f1] grid  grid-cols-12 place-items-center h-screen overflow-hidden">
      <div className="col-span-12 h-full">
      <svg className="w-screen h-fit cursor-pointer transform  hover:scale-125  transition-transform duration-300 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#6366f1" fill-opacity="1" d="M0,64L40,96C80,128,160,192,240,208C320,224,400,192,480,170.7C560,149,640,139,720,160C800,181,880,235,960,234.7C1040,235,1120,181,1200,170.7C1280,160,1360,192,1400,208L1440,224L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
      {/* <svg className="w-screen h-fit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#6366f1" fill-opacity="1" d="M0,64L30,53.3C60,43,120,21,180,42.7C240,64,300,128,360,138.7C420,149,480,107,540,74.7C600,43,660,21,720,16C780,11,840,21,900,21.3C960,21,1020,11,1080,26.7C1140,43,1200,85,1260,90.7C1320,96,1380,64,1410,48L1440,32L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg> */}
      
      {/* <svg  className="w-screen h-fit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#6366f1" fill-opacity="1" d="M0,64L40,74.7C80,85,160,107,240,112C320,117,400,107,480,128C560,149,640,203,720,202.7C800,203,880,149,960,112C1040,75,1120,53,1200,80C1280,107,1360,181,1400,218.7L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg> */}
      </div>


      <div className="lg:col-span-6 lg:mt-[-300px] space-y-2 px-9 col-span-12 ">
       <div className="flex items-center justify-start">
       <Image src={Logo} alt="logo" height={225} width={225} className="cursor-pointer transform  hover:scale-125  transition-transform duration-300 ease-in-out"/>
        <h2 className="font-bold text-3xl text-indigo-600 ">Motion School</h2>
       </div>
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
