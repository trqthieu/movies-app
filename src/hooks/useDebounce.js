import { useEffect, useState } from 'react'

const useDebounce = (value, delay) => {
  const [debounce, setDebounce] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(value)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return debounce
}
export default useDebounce
