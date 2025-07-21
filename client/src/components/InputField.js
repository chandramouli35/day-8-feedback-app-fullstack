function InputField({ id, label, type, placeholder, value, onChange, error }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-semibold mb-1 text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default InputField;
