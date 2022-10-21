import { useState } from "react"

export const useInput = (
    initialValue: any = '',
    callback: any = null
  ): any => {
    const [value, setValue] = useState(initialValue)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
  
      setValue(newValue)
      if (callback) callback(newValue)
    }
    const forceChange = (newValue: string | number) => {
      setValue(newValue)
      if (callback) callback(newValue)
    }
    return [value, onChange, forceChange]
  }
  
  export default useInput
