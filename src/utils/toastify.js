import { toast } from "react-toastify";

// create toast
export const createToast = (msg, type = "default") => {
  toast(msg, {
    position: "top-center",
    type: type,
  });
};
