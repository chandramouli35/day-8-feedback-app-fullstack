import InputField from "./InputField";
import Toast from "./Toast";
import useForm from "../hooks/useForm";

function FeedbackForm() {
  const initialValues = { name: "", email: "", message: "" };
  const {
    formData,
    errors,
    status,
    isSubmitting,
    handleChange,
    handleSubmit,
    isFormValid,
  } = useForm(initialValues);

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          id="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          id="message"
          label="Feedback"
          type="text"
          placeholder="Enter your feedback (10+ characters)"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
        />
        <button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className={`py-2 px-4 rounded-lg text-white ${
            isFormValid() && !isSubmitting
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          } transition-colors flex items-center justify-center`}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
          ) : null}
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
      <Toast type={status.type} message={status.message} />
    </div>
  );
}

export default FeedbackForm;
