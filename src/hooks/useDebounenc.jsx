import { useState, useEffect } from "react";

/**
 * Debounces a value by a specified delay
 * @param {any} value The value to debounce
 * @param {number} delay The debounce delay in milliseconds
 * @returns {any} The debounced value
 */
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Clear the timeout if value or delay changes
    };
  }, [value, delay]);

  return debouncedValue;
}
