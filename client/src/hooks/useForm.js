import { useState } from "react";
import axios from "axios";

function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (formData.message.length < 10)
      newErrors.message = "Message must be 10+ characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback",
        formData
      );
      setStatus({ type: "success", message: response.data.message });
      setFormData(initialValues);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Submission failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.message.length >= 10
    );
  };

  return {
    formData,
    errors,
    status,
    isSubmitting,
    handleChange,
    handleSubmit,
    isFormValid,
  };
}

export default useForm;
