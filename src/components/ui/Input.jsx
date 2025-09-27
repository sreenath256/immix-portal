export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none w-full ${className}`}
      {...props}
    />
  );
}
