import { toast } from "react-toastify";

const validateInput = (formData) => {
  if (
    !formData.author ||
    !formData.title ||
    !formData.isbn ||
    !formData.description
  ) {
    toast.warning("Please fill in all fields", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: true,
      className: "bg-secondary text-white",
      icon: false,
    });
    return false;
  }

  if (!/^(?=[-\dX ]{13}$)(?:\d+[- ]){3}\d*[X\d]$/.test(formData.isbn)) {
    toast.error("ISBN must have 10 digits & 3 hypens", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: true,
      className: "bg-secondary text-white",
      icon: false,
    });
    return false;
  }

  return true;
};

export default validateInput;
