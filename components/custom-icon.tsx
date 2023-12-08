import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 hover:bg-indigo-500 cursor-pointer",
        success: "bg-emerald-100 hover:bg-emerald-200 cursor-pointer",

      },
      size: {
        default: "p-3",
        md:"p-2",
        sm: "p-1",
       
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-amber-300",
      success: "text-emerald-700",
    },
    size: {
      default: "h-8 w-8",
      md:"h-6 w-6",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface CustomIconProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

export const CustomIcon = ({ icon: Icon, variant, size }: CustomIconProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};
