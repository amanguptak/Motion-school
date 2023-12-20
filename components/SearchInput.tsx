import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { useDebounce } from '@/hooks/use-debounce';

const SearchInput = () => {
    const [inputValue, setInputValue] = useState('');
   
    const debouncedValue = useDebounce(inputValue)
    // console.log("debounce",debouncedValue)
  return (
    <div className='relative '>
        <Search size={16} className=' left-3 top-3 absolute text-slate-700'/>
        <Input
  
        value={inputValue}
        onChange={(e)=>{setInputValue(e.target.value)}}
        placeholder='Search Course....'
        className='text-black w-full md:w-[350px] rounded-2xl pl-9 bg-indigo-50 focus-visible:ring-amber-500'
        />
    </div>
  )
}

export default SearchInput