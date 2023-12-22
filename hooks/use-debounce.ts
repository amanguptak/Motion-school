import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
;
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);

      /* Cleanup Function: The useEffect hook returns a cleanup function.
       This cleanup function is responsible for clearing the timer using clearTimeout when the component unmounts 
       or when the dependencies of the effect (value or delay) change. This prevents any potential memory leaks or unnecessary 
       updates if the component is unmounted before the timer fires 
       
       The cleanup function, defined by () => clearTimeout(timer), will be executed under the following circumstances:

When the component is unmounted.
When the value or delay dependencies change.
So, if the value or delay props change, the cleanup function is triggered before 
the effect is re-run with the updated dependencies. This ensures that any ongoing asynchronous tasks
 or timers are properly cleared before the effect is re-initialized with the new values.
       
       */
    };
  }, [value, delay]);
  /* In the context of the useDebounce hook, this behavior is intentional and desired.
 The purpose of the useEffect is to set up a timer to update 
 the debounced value (setDebouncedValue(value)) after a specified
  delay. By including value in the dependency array, the effect is re-run whenever the input value changes, ensuring that 
  the debounced value reflects the most recent input. */

  return debouncedValue;
}
