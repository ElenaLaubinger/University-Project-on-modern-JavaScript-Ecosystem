import { toast } from "react-toastify";

/**
 * Validates the form data for adding a book.
 * Checks if all required fields are filled and if the ISBN format is valid.
 *
 * @param {Object} formData - The form data containing book information.
 * @param {string} formData.author - The author of the book.
 * @param {string} formData.title - The title of the book.
 * @param {string} formData.isbn - The ISBN of the book.
 * @param {string} formData.description - The description of the book.
 *
 * @returns {boolean} - Returns `true` if the form data is valid, `false` otherwise.
 * If validation fails, it shows appropriate toast notifications.
 */
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

  if (!/^(?=[-0-9X ]{13}$)(?:[0-9]+[- ]){3}[0-9]*[X0-9]$/.test(formData.isbn)) {
    toast.error("ISBN must have 10 digits", {
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