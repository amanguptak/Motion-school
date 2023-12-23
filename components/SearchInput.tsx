import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [inputValue, setInputValue] = useState("");

  const debouncedValue = useDebounce(inputValue);
  // console.log("debounce",debouncedValue)

  // const currentTitle = searchParams.get("title");
  const currentCategory = searchParams.get("categoryId");

  useEffect(() => {
    const handleSearch = () => {
      const url = qs.stringifyUrl(
        {
          url: pathName,
          query: {
            title: debouncedValue,
            categoryId: currentCategory,
          },
        },
        { skipEmptyString: true, skipNull: true }
      );

      router.push(url);
    };
    handleSearch();
  }, [debouncedValue, pathName, router, currentCategory]);

  return (
    <div className="relative ">
      <Search size={16} className=" left-3 top-3 absolute text-slate-700" />
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="Search Course...."
        className="text-black w-full focus:outline-none md:w-[350px] rounded-2xl pl-9 bg-indigo-50 focus-visible:ring-amber-500"
      />
    </div>
  );
};

export default SearchInput;
