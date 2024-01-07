import { 
    Card, 
    CardContent, 
    CardHeader,
    CardTitle
  } from "@/components/ui/card";

import { priceFormatter } from "@/lib/price-formatter";
  
  interface DataProps {
    value: number;
    label: string;
    shouldFormat?: boolean;
  }
  
  export const Data = ({
    value,
    label,
    shouldFormat,
  }: DataProps) => {
    return (
     <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {shouldFormat ? priceFormatter(value) : value}
        </div>
      </CardContent>
     </Card>
    )
  }