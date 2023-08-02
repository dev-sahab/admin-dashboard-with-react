import { useState } from "react";

const useToggle = () => {
  // show password
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  return { show, toggleShow };
};

export default useToggle;
