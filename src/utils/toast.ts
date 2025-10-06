import { toast } from "react-hot-toast";

export const showError = (message: string) => {
  toast.error(message, {
    duration: 4000,
    style: {
      background: "#fef2f2",
      color: "#b91c1c",
    },
  });
};

export const showSuccess = (message: string) => {
  toast.success(message, {
    duration: 4000,
    style: {
      background: "#ecfdf5",
      color: "#065f46",
    },
  });
};
