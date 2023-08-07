import { useState } from "react";


const useFormFieldChange = (initalState) => {
      // personal details state
  const [input, setInput] = useState({
    initalState
  });

  // handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetInput = () => {
    setInput(initalState)
  }
    
  return {input, handleInputChange, resetInput, setInput}
}

export default useFormFieldChange