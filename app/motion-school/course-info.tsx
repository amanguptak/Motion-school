import { LucideIcon } from "lucide-react";


import { CustomIcon } from "@/components/custom-icon";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {
  return (
    <div className="rounded-md flex items-center gap-x-2 shadow-md p-3 hover:shadow-lg">
      <CustomIcon
        variant={variant}
        icon={Icon}
        size="md"
      />
      <div>
        <p className="font-medium">
          {label}
        </p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  )
}